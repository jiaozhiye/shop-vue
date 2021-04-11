<template>
  <div>
    <div style="width: 60%">
      <form-panel ref="formPanel" :formType="type" :cols="1" :initial-value="initValue" :list="formList" />
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
      <multiuse-button type="primary" :click="saveHandle">保存</multiuse-button>
    </div>
  </div>
</template>

<script>
import { dictionary } from '@/mixins/dictMixin';
import { getConfigHeaders } from '@/api/fetch';

import { addGoddsRecord, updateGoodsInfo } from '@shop/api/goods';

export default {
  name: 'EditPanel',
  mixins: [dictionary],
  props: ['type', 'formData'],
  data() {
    return {
      formList: this.createFormList()
    };
  },
  computed: {
    initValue() {
      const data = Object.assign({}, this.formData);
      for (let key in data) {
        if (key === 'img_path') {
          data[key] = [{ name: data[key], url: data[key] }];
        }
      }
      return data;
    }
  },
  methods: {
    createFormList() {
      return [
        {
          type: 'INPUT',
          label: '商品名称',
          fieldName: 'title',
          rules: [{ required: true, message: '请输入商品名称', trigger: 'blur' }]
        },
        {
          type: 'TEXT_AREA',
          label: '商品描述',
          fieldName: 'description'
        },
        {
          type: 'SELECT',
          label: '商品类别',
          fieldName: 'type',
          options: {
            itemList: this.createDictList('goods_type')
          },
          rules: [{ required: true, message: '请选择商品类别', trigger: 'change' }]
        },
        {
          type: 'INPUT_NUMBER',
          label: '商品价格',
          fieldName: 'price',
          options: {
            precision: 2
          },
          style: { width: `calc(100% - 30px)` },
          descOptions: {
            content: '元'
          },
          rules: [{ required: true, message: '请输入商品价格', trigger: 'blur' }]
        },
        {
          type: 'INPUT_NUMBER',
          label: '会员价格',
          fieldName: 'vprice',
          options: {
            precision: 2
          },
          style: { width: `calc(100% - 30px)` },
          descOptions: {
            content: '元'
          },
          rules: [{ required: true, message: '请输入会员价格', trigger: 'blur' }]
        },
        {
          type: 'INPUT_NUMBER',
          label: '库存数量',
          fieldName: 'inventory',
          options: {
            precision: 0
          },
          rules: [{ required: true, message: '请输入库存数量', trigger: 'blur' }]
        },
        {
          type: 'UPLOAD_IMG',
          label: '上传图片',
          fieldName: 'img_path',
          upload: {
            headers: getConfigHeaders(),
            actionUrl: '/api/sys/upload',
            isCalcHeight: true,
            limit: 1
          },
          rules: [{ required: true, message: '请上传商品图片', trigger: 'change' }]
        }
      ];
    },
    async saveHandle() {
      const [err, data] = await this.$refs[`formPanel`].GET_FORM_DATA();
      if (err) return;
      for (let key in data) {
        if (key === 'img_path') {
          data[key] = data[key][0].url;
        }
      }
      // 新增
      if (!this.formData?.id) {
        const res = await addGoddsRecord(data);
        if (res.code === 200) {
          this.$message.success('新增成功！');
          this.cancelHandle(true);
        }
      } else {
        const res = await updateGoodsInfo({ id: this.formData.id, ...data });
        if (res.code === 200) {
          this.$message.success('更新成功！');
          this.cancelHandle(true);
        }
      }
    },
    cancelHandle(doReload) {
      this.$emit('close', doReload);
    }
  }
};
</script>
