<template>
  <div>
    <form-panel ref="formPanel" :cols="2" :initial-value="formData" :list="formList" />
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
      <multiuse-button type="primary" :click="saveHandle">保存</multiuse-button>
    </div>
  </div>
</template>

<script>
import { updateCustomerInfo } from '@shop/api/user';

export default {
  name: 'EditPanel',
  props: ['formData'],
  data() {
    return {
      formList: this.createFormList()
    };
  },
  methods: {
    findFormItem(val) {
      return this.formList.find(x => x.fieldName === val);
    },
    createFormList() {
      return [
        {
          type: 'CHECKBOX',
          label: '是否会员',
          fieldName: 'is_vip',
          options: {
            trueValue: '1',
            falseValue: '0'
          },
          onChange: val => {
            this.findFormItem('integral').disabled = val === '0';
          }
        },
        {
          type: 'INPUT_NUMBER',
          label: '会员积分',
          fieldName: 'integral',
          disabled: this.formData.is_vip === '0',
          style: { width: `calc(100% - 30px)` },
          descOptions: {
            content: '个'
          }
        }
      ];
    },
    async saveHandle() {
      const [err, data] = await this.$refs[`formPanel`].GET_FORM_DATA();
      if (err) return;
      const res = await updateCustomerInfo({ id: this.formData.id, ...data });
      if (res.code === 200) {
        this.$message.success('更新成功！');
        this.cancelHandle(true);
      }
    },
    cancelHandle(doReload) {
      this.$emit('close', doReload);
    }
  }
};
</script>
