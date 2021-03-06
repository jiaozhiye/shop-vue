/*
 * @Author: mashaoze
 * @Date: 2020-02-28 23:01:43
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-07 17:16:33
 */
import { pickBy, intersection, isFunction } from 'lodash';
import Locale from '../locale/mixin';
import config from '../config';
import { where } from '../filter-sql';
import { hasOwn, convertToRows, deepFindColumn, getCellValue, createWhereSQL, isEmpty } from '../utils';

import Resizable from './resizable';
import AllSelection from '../selection/all';
import SvgIcon from '../../../SvgIcon';
import THeadFilter from '../filter';

export default {
  name: 'TableHeader',
  mixins: [Locale],
  props: ['tableColumns', 'flattenColumns'],
  provide() {
    return {
      $$header: this
    };
  },
  inject: ['$$table'],
  data() {
    return {
      filters: {},
      sorter: {},
      ascend: config.sortDirections[0],
      descend: config.sortDirections[1]
    };
  },
  computed: {
    isClientSorter() {
      return !this.$$table.isFetch;
    },
    isClientFilter() {
      return !this.$$table.isFetch;
    }
  },
  watch: {
    filters(val) {
      this.filterHandle();
      // if (this.isClientFilter) return;
      this.$$table.filters = this.formatFilterValue(val);
    },
    sorter(val) {
      this.sorterHandle();
      // if (this.isClientSorter) return;
      this.$$table.sorter = this.formatSorterValue(val);
    }
  },
  methods: {
    renderColgroup() {
      const {
        layout: { gutterWidth },
        scrollY
      } = this.$$table;
      return (
        <colgroup>
          {this.flattenColumns.map(column => {
            const { dataIndex, width, renderWidth } = column;
            return <col key={dataIndex} style={{ width: `${width || renderWidth}px`, minWidth: `${width || renderWidth}px` }} />;
          })}
          {scrollY && <col style={{ width: `${gutterWidth}px`, minWidth: `${gutterWidth}px` }} />}
        </colgroup>
      );
    },
    renderRows(columnRows) {
      const { scrollY, isIE, rightFixedColumns } = this.$$table;
      const cls = [
        `gutter`,
        {
          [`v-cell-fix-right`]: !!rightFixedColumns.length
        }
      ];
      const stys = !isIE
        ? {
            right: !!rightFixedColumns.length ? 0 : null
          }
        : null;
      return columnRows.map((columns, rowIndex) => (
        <tr key={rowIndex} class="v-header--row">
          {columns.map((column, cellIndex) => this.renderColumn(column, columns, rowIndex, cellIndex))}
          {scrollY && <th class={cls} style={stys}></th>}
        </tr>
      ));
    },
    renderColumn(column, columns, rowIndex, cellIndex) {
      const {
        getStickyLeft,
        getStickyRight,
        layout: { gutterWidth },
        resizable,
        scrollY,
        sorter,
        isIE
      } = this.$$table;
      const { dataIndex, colSpan, rowSpan, fixed, align: tbodyAlign, theadAlign, sorter: isSorter, filter, required, lastFixedLeft, firstFixedRight } = column;
      if (colSpan === 0) {
        return null;
      }
      // ??????????????????
      const align = theadAlign || tbodyAlign;
      const cls = [
        `v-header--column`,
        `col--ellipsis`,
        {
          [`col--center`]: align === 'center',
          [`col--right`]: align === 'right',
          [`v-column--required`]: !!required,
          [`v-column-has-sorter`]: isSorter,
          [`v-column-has-filter`]: filter,
          [`v-column--sort`]: Object.keys(sorter).includes(dataIndex),
          [`v-cell-fix-left`]: fixed === 'left',
          [`v-cell-fix-right`]: fixed === 'right',
          [`v-cell-fix-left-last`]: !isIE && fixed === 'left' && lastFixedLeft,
          [`v-cell-fix-right-first`]: !isIE && fixed === 'right' && firstFixedRight
        }
      ];
      const stys = !isIE
        ? {
            left: fixed === 'left' ? `${getStickyLeft(dataIndex)}px` : null,
            right: fixed === 'right' ? `${getStickyRight(dataIndex) + (scrollY ? gutterWidth : 0)}px` : null
          }
        : null;
      const isResizable = resizable && !['__expandable__', '__selection__'].includes(dataIndex);
      return (
        <th key={dataIndex} class={cls} style={{ ...stys }} colspan={colSpan} rowspan={rowSpan} onClick={ev => this.thClickHandle(ev, column)}>
          <div class="v-cell--wrapper">
            <div class="v-cell--text">{this.renderCell(column)}</div>
            {filter ? this.renderFilter(column) : null}
          </div>
          {isResizable && <Resizable column={column} />}
        </th>
      );
    },
    renderCell(column) {
      const { dataIndex, type, sorter, title } = column;
      const { selectionKeys } = this.$$table;
      if (dataIndex === '__selection__' && type === 'checkbox') {
        return (
          <div class="v-cell">
            <AllSelection selectionKeys={selectionKeys} />
          </div>
        );
      }
      const vNodes = [];
      vNodes.push(
        <div class="v-cell" title={title}>
          {title}
        </div>
      );
      if (sorter) {
        vNodes.push(this.renderSorter(this.sorter[dataIndex]));
      }
      return vNodes;
    },
    renderSorter(order) {
      const ascCls = [
        `v-sort--asc-btn`,
        {
          [`sort--active`]: order === this.ascend
        }
      ];
      const descCls = [
        `v-sort--desc-btn`,
        {
          [`sort--active`]: order === this.descend
        }
      ];
      return (
        <div class="v-cell--sorter" title={this.t('table.sorter.text')}>
          <SvgIcon class={ascCls} icon-class="caret-up" />
          <SvgIcon class={descCls} icon-class="caret-down" />
        </div>
      );
    },
    renderFilter(column) {
      return <THeadFilter column={column} filters={this.filters} />;
    },
    thClickHandle(ev, column) {
      const { multipleSort } = this.$$table;
      const { sorter, dataIndex } = column;
      if (sorter) {
        const current = this.sorter[dataIndex];
        const order = current ? (current === this.descend ? null : this.descend) : this.ascend;
        // ???????????????
        if (!multipleSort) {
          this.sorter = Object.assign({}, { [dataIndex]: order });
        } else {
          // ????????????????????????key ????????????
          delete this.sorter[dataIndex];
          this.sorter = Object.assign({}, this.sorter, { [dataIndex]: order });
        }
      }
    },
    // ????????????
    sorterHandle() {
      if (!this.isClientSorter) return;
      this.clientSorter();
    },
    // ???????????????
    clientSorter() {
      const validSorter = pickBy(this.sorter);
      for (let key in validSorter) {
        let column = this.flattenColumns.find(column => column.dataIndex === key);
        this.doSortHandle(column, validSorter[key]);
      }
      if (!Object.keys(validSorter).length) {
        this.doResetHandle();
      }
    },
    // ??????????????????
    doResetHandle() {
      const { tableFullData, tableOriginData } = this.$$table;
      this.$$table.tableFullData = intersection(tableOriginData, tableFullData);
    },
    // ????????????
    doSortHandle(column, order) {
      const { dataIndex, sorter } = column;
      if (isFunction(sorter)) {
        this.$$table.tableFullData.sort(sorter);
      } else {
        this.$$table.tableFullData.sort((a, b) => {
          const start = getCellValue(a, dataIndex);
          const end = getCellValue(b, dataIndex);
          if (!!Number(start - end)) {
            return order === this.ascend ? start - end : end - start;
          }
          return order === this.ascend ? start.toString().localeCompare(end.toString()) : end.toString().localeCompare(start.toString());
        });
      }
    },
    // ????????????
    filterHandle() {
      if (!this.isClientFilter) return;
      this.clientFilter();
    },
    // ???????????????
    clientFilter() {
      const { tableOriginData, superFilters } = this.$$table;
      const sql = !superFilters.length ? createWhereSQL(this.filters) : createWhereSQL(superFilters);
      this.$$table.tableFullData = sql !== '' ? where(tableOriginData, sql) : [...tableOriginData];
      // ????????????
      this.sorterHandle();
    },
    // ?????????????????????
    formatSorterValue(sorter) {
      const result = {};
      for (let key in sorter) {
        if (sorter[key] === null) continue;
        result[key] = sorter[key];
      }
      return result;
    },
    // ?????????????????????
    formatFilterValue(filters) {
      const result = {};
      for (let key in filters) {
        if (!key.includes('|')) continue;
        let [type, property] = key.split('|');
        for (let mark in filters[key]) {
          if (isEmpty(filters[key][mark])) {
            delete filters[key][mark];
          }
        }
        // result[`${type}|${property}`]
        result[config.showFilterType ? `${type}|${property}` : property] = filters[key];
      }
      return result;
    },
    // ??????????????????
    clearTheadSorter() {
      this.sorter = {};
    },
    // ??????????????????
    clearTheadFilter() {
      this.filters = {};
    },
    // ???????????????
    setFixedColumns(columnRows) {
      columnRows.forEach((columns, depth) => {
        const leftFixedColumns = [];
        const rightFixedColumns = [];
        columns.forEach(x => {
          hasOwn(x, 'lastFixedLeft') && delete x.lastFixedLeft;
          hasOwn(x, 'firstFixedRight') && delete x.firstFixedRight;
          x.fixed === 'left' && leftFixedColumns.push(x);
          x.fixed === 'right' && rightFixedColumns.push(x);
        });
        const lastColumn = leftFixedColumns[leftFixedColumns.length - 1];
        const firstColumn = rightFixedColumns[0];
        if (lastColumn) {
          lastColumn.lastFixedLeft = depth === 0 ? !0 : deepFindColumn(this.tableColumns, lastColumn.parentDataIndex).lastFixedLeft;
        }
        if (firstColumn) {
          firstColumn.firstFixedRight = depth === 0 ? !0 : deepFindColumn(this.tableColumns, firstColumn.parentDataIndex).firstFixedRight;
        }
      });
    }
  },
  render() {
    const { tableColumns } = this;
    const {
      layout: { tableBodyWidth }
    } = this.$$table;
    const columnRows = convertToRows(tableColumns);
    // ????????????????????????
    this.$$table.isGroup = columnRows.length > 1;
    // ????????????????????????
    this.setFixedColumns(columnRows);
    return (
      <div class="v-table--header-wrapper">
        <table class="v-table--header" cellspacing="0" cellpadding="0" border="0" style={{ width: tableBodyWidth ? `${tableBodyWidth}px` : null }}>
          {this.renderColgroup()}
          <thead>{this.renderRows(columnRows)}</thead>
        </table>
      </div>
    );
  }
};
