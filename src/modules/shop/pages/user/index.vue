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
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
      </template>
    </VirtualTable>
  </div>
</template>

<script>
import { getCustomerList } from '@shop/api/user';

export default {
  name: 'UserManagement',
  data() {
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
        type: 'checkbox'
      },
      exportExcel: {
        fileName: '导出文件.xlsx'
      },
      tablePrint: {
        showLogo: true
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
          render: () => {
            return (
              <div>
                <el-button type="text">编辑</el-button>
                <el-button type="text">查看</el-button>
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
          title: '用户名称',
          dataIndex: 'name',
          width: 200
        },
        {
          title: '电话号码',
          dataIndex: 'phone',
          width: 150
        },
        {
          title: '收获地址',
          dataIndex: 'address',
          width: 300
        },
        {
          title: '是否会员',
          dataIndex: 'is_vip',
          width: 150
        },
        {
          title: '会员积分',
          dataIndex: 'create_on',
          width: 150
        },
        {
          title: '注册日期',
          dataIndex: 'integral',
          width: 150,
          formatType: 'date'
        }
      ];
    },
    filterChangeHandle(val) {
      this.fetch.params = Object.assign({}, this.fetch.params, val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
