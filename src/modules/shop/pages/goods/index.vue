<template>
  <div>
    <top-filter ref="topFilter" :list="filterList" @change="filterChangeHandle" />
    <VirtualTable
      ref="table"
      height="auto"
      uniqueKey="GoodsManagementTable"
      :columns="columns"
      :fetch="fetch"
      :rowKey="record => record.id"
      :rowSelection="selection"
      :exportExcel="exportExcel"
      :tablePrint="tablePrint"
      :columnsChange="columns => (this.columns = columns)"
    >
      <template slot="default">
        <el-button type="primary" icon="el-icon-plus" @click="addHandle">新建</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteHandle">删除</el-button>
      </template>
    </VirtualTable>
    <drawer :visible.sync="actions.visible" :title="actions.title" destroy-on-close :container-style="{ height: 'calc(100% - 52px)', paddingBottom: '52px' }">
      <EditPanel :type="actions.type" :formData="actions.data" @close="closeHandle" />
    </drawer>
  </div>
</template>

<script>
import { dictionary } from '@/mixins/dictMixin';
import { getGoodsList, delGoodsRecord } from '@shop/api/goods';

import EditPanel from './editPanel';

export default {
  name: 'GoodsManagement',
  components: { EditPanel },
  mixins: [dictionary],
  data() {
    this.selectedKeys = [];
    return {
      filterList: [
        {
          type: 'INPUT',
          label: '商品名称',
          fieldName: 'title'
        }
      ],
      columns: this.createTableColumns(),
      fetch: {
        api: getGoodsList,
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
      // 交互页面
      actions: {
        type: 'default',
        title: '',
        visible: false,
        data: null
      }
    };
  },
  methods: {
    createTableColumns() {
      return [
        {
          title: '操作',
          dataIndex: '__action__', // 操作列的 dataIndex 的值不能改
          fixed: 'left',
          width: 100,
          render: (text, row) => {
            return (
              <div>
                <el-button type="text" onClick={() => this.editHandle(row)}>
                  编辑
                </el-button>
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
          title: '商品名称',
          dataIndex: 'title',
          width: 200
        },
        {
          title: '商品描述',
          dataIndex: 'description',
          width: 400
        },
        {
          title: '商品类别',
          dataIndex: 'type',
          width: 150,
          dictItems: this.createDictList('goods_type')
        },
        {
          title: '商品图片',
          dataIndex: 'img_path',
          width: 200,
          render: (text, row) => {
            return <img src={text} height="40" />;
          }
        },
        {
          title: '商品价格',
          dataIndex: 'price',
          precision: 2,
          width: 100
        },
        {
          title: '会员价格',
          dataIndex: 'vprice',
          precision: 2,
          width: 100
        },
        {
          title: '库存数量',
          dataIndex: 'inventory',
          precision: 0,
          width: 100
        },
        {
          title: '上架日期',
          dataIndex: 'create_on',
          width: 150,
          formatType: 'date'
        }
      ];
    },
    filterChangeHandle(val) {
      this.fetch.params = Object.assign({}, this.fetch.params, val);
    },
    addHandle() {
      this.actions = Object.assign({}, { type: 'default', title: '新建商品', visible: true, data: null });
    },
    editHandle(row) {
      this.actions = Object.assign({}, { type: 'default', title: '编辑商品', visible: true, data: row });
    },
    showHandle(row) {
      this.actions = Object.assign({}, { type: 'onlyShow', title: '查看商品', visible: true, data: row });
    },
    async deleteHandle() {
      if (!this.selectedKeys.length) {
        return this.$message.warning('请选择数据！');
      }
      const res = await delGoodsRecord({ ids: this.selectedKeys.join(',') });
      if (res.code === 200) {
        this.$message.success('删除成功！');
        this.$refs[`table`].DO_REFRESH();
      }
    },
    closeHandle(isReload) {
      this.actions.visible = false;
      if (isReload) {
        this.$refs[`table`].DO_REFRESH();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
