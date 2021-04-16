<template>
  <div>
    <top-filter ref="topFilter" :list="filterList" @change="filterChangeHandle" />
    <VirtualTable
      ref="table"
      height="auto"
      uniqueKey="OrderManagementTable"
      :columns="columns"
      :fetch="fetch"
      :rowKey="record => record.id"
      :rowSelection="selection"
      :exportExcel="exportExcel"
      :tablePrint="tablePrint"
      :columnsChange="columns => (this.columns = columns)"
    >
      <template slot="default">
        <el-button type="danger" icon="el-icon-delete" @click="deleteHandle">删除</el-button>
      </template>
    </VirtualTable>
    <drawer :visible.sync="visible" title="查看订单" destroy-on-close :container-style="{ height: 'calc(100% - 52px)', paddingBottom: '52px' }">
      <ShowPanel :orderId="orderId" @close="closeHandle" />
    </drawer>
  </div>
</template>

<script>
import { dictionary } from '@/mixins/dictMixin';
import { getOrderList, delOrderRecord, updateOrderType } from '@shop/api/order';

import ShowPanel from './ShowPanel';

export default {
  name: 'OrderManagement',
  components: { ShowPanel },
  mixins: [dictionary],
  data() {
    this.selectedKeys = [];
    return {
      filterList: [
        {
          type: 'INPUT',
          label: '订单编号',
          fieldName: 'id'
        }
      ],
      columns: this.createTableColumns(),
      fetch: {
        api: getOrderList,
        params: {},
        dataKey: 'records'
      },
      selection: {
        type: 'checkbox',
        onChange: (val, rows) => {
          this.selectedKeys = val;
        }
      },
      exportExcel: {
        fileName: '导出文件.xlsx'
      },
      tablePrint: {
        showLogo: true
      },
      orderId: '',
      visible: false
    };
  },
  methods: {
    createTableColumns() {
      return [
        {
          title: '操作',
          dataIndex: '__action__', // 操作列的 dataIndex 的值不能改
          fixed: 'left',
          width: 80,
          render: (text, row) => {
            return (
              <div>
                <el-button type="text" onClick={() => this.showHandle(row)}>
                  查看
                </el-button>
              </div>
            );
          }
        },
        {
          title: '序号',
          dataIndex: 'pageIndex',
          width: 80,
          sorter: true,
          render: text => {
            return text + 1;
          }
        },
        {
          title: '订单编号',
          dataIndex: 'id',
          width: 300
        },
        {
          title: '联系人',
          dataIndex: 'name',
          width: 200
        },
        {
          title: '联系人电话',
          dataIndex: 'phone',
          width: 200
        },
        {
          title: '联系人地址',
          dataIndex: 'address'
        },
        {
          title: '订单状态',
          dataIndex: 'type',
          width: 200,
          editRender: row => {
            return {
              type: 'select',
              editable: true,
              items: this.createDictList('order_type'),
              onChange: val => {
                const [id] = Object.keys(val)[0].split('|');
                this.changeOrderType(id, Object.values(val)[0]);
              }
            };
          },
          dictItems: this.createDictList('order_type')
        },
        {
          title: '上架日期',
          dataIndex: 'create_on',
          width: 150,
          formatType: 'date'
        }
      ];
    },
    async changeOrderType(id, type) {
      const res = await updateOrderType({ id, type });
      if (res.code === 200) {
        this.$message.success('更新订单状态成功！');
      }
    },
    showHandle(row) {
      this.orderId = row.id;
      this.visible = true;
    },
    async deleteHandle() {
      if (!this.selectedKeys.length) {
        return this.$message.warning('请选择数据！');
      }
      const res = await delOrderRecord({ ids: this.selectedKeys.join(',') });
      if (res.code === 200) {
        this.$message.success('删除成功！');
        this.$refs[`table`].DO_REFRESH();
      }
    },
    filterChangeHandle(val) {
      this.fetch.params = Object.assign({}, this.fetch.params, val);
    },
    closeHandle(isReload) {
      this.visible = false;
      if (isReload) {
        this.$refs[`table`].DO_REFRESH();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
