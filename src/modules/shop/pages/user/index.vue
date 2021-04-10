<template>
  <div>
    <top-filter ref="topFilter" :list="filterList" @change="filterChangeHandle" />
    <VirtualTable
      ref="table"
      height="auto"
      uniqueKey="UserManagementTable"
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
    <base-dialog :visible.sync="visible" title="用户编辑" width="50%" destroyOnClose>
      <EditPanel :formData="formData" @close="closeHandle" />
    </base-dialog>
  </div>
</template>

<script>
import { dictionary } from '@/mixins/dictMixin';
import { getCustomerList, delCustomerRecord } from '@shop/api/user';

import EditPanel from './editPanel';

export default {
  name: 'UserManagement',
  components: { EditPanel },
  mixins: [dictionary],
  data() {
    this.selectedKeys = [];
    return {
      filterList: [
        {
          type: 'INPUT',
          label: '用户名称',
          fieldName: 'name'
        }
      ],
      columns: this.createTableColumns(),
      fetch: {
        api: getCustomerList,
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
      visible: false,
      formData: null
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
                <el-button type="text" onClick={() => this.editHandle(row)}>
                  编辑
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
          title: '账号',
          dataIndex: 'account',
          width: 150
        },
        {
          title: '用户名称',
          dataIndex: 'name',
          width: 150
        },
        {
          title: '电话号码',
          dataIndex: 'phone',
          width: 150
        },
        {
          title: '收货地址',
          dataIndex: 'address'
        },
        {
          title: '是否会员',
          dataIndex: 'is_vip',
          width: 150,
          dictItems: this.createDictList('is_VIP')
        },
        {
          title: '会员积分',
          dataIndex: 'integral',
          width: 150
        },
        {
          title: '注册日期',
          dataIndex: 'create_on',
          width: 150,
          formatType: 'date'
        }
      ];
    },
    filterChangeHandle(val) {
      this.fetch.params = Object.assign({}, this.fetch.params, val);
    },
    editHandle(row) {
      this.visible = true;
      this.formData = Object.assign({}, row);
    },
    async deleteHandle() {
      if (!this.selectedKeys.length) {
        return this.$message.warning('请选择数据！');
      }
      const res = await delCustomerRecord({ ids: this.selectedKeys.join(',') });
      if (res.code === 200) {
        this.$message.success('删除成功！');
        this.$refs[`table`].DO_REFRESH();
      }
    },
    closeHandle(isReload) {
      this.visible = false;
      this.formData = null;
      if (isReload) {
        this.$refs[`table`].DO_REFRESH();
      }
    }
  }
};
</script>
