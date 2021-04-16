<template>
  <div>
    <div>
      <table cellspacing="0" cellpadding="0" class="order-table">
        <tr>
          <td width="100" align="right">订单编号</td>
          <td colspan="4">{{ order.id }}</td>
        </tr>
        <tr>
          <td align="right">订单状态</td>
          <td colspan="4">{{ createDictText(order.type, 'order_type') }}</td>
        </tr>
        <tr v-for="(item, index) in order.list" :key="item.id">
          <td align="right">商品{{ index + 1 }}</td>
          <td width="200">
            <img :src="item.img_path" height="80" />
          </td>
          <td>{{ item.title }}</td>
          <td>单价：{{ item.price }} 元</td>
          <td>数量：{{ item.buyNumber }}</td>
        </tr>
        <tr>
          <td align="right">总价</td>
          <td colspan="4">{{ createTotalPrice(order.list).toFixed(2) }} 元</td>
        </tr>
      </table>
    </div>
    <div
      :style="{
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9,
        borderTop: '1px solid #d9d9d9',
        padding: '10px 15px',
        background: '#fff',
        textAlign: 'right'
      }"
    >
      <el-button @click="cancelHandle()">关闭</el-button>
    </div>
  </div>
</template>

<script>
import { dictionary } from '@/mixins/dictMixin';
import { getOrderById } from '@shop/api/order';

export default {
  name: 'ShowPanel',
  mixins: [dictionary],
  props: ['orderId'],
  data() {
    return {
      order: {}
    };
  },
  mounted() {
    this.getOrderInfo();
  },
  methods: {
    createTotalPrice(list = []) {
      return list.reduce((prev, curr) => {
        curr = curr.buyNumber * curr.price;
        return prev + curr;
      }, 0);
    },
    async getOrderInfo() {
      if (!this.orderId) return;
      const res = await getOrderById({ id: this.orderId });
      if (res.code === 200) {
        this.order = res.data || {};
      }
    },
    cancelHandle(doReload) {
      this.$emit('close', doReload);
    }
  }
};
</script>

<style lang="scss" scoped>
.order-table {
  width: 100%;
  border: 1px solid #d9d9d9;
  tr td {
    padding: 8px 4px;
    border: 1px solid #d9d9d9;
  }
}
</style>
