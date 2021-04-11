/*
 * @Author: mashaoze
 * @Date: 2020-03-05 10:27:24
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-09-04 11:58:05
 */
import { isEmpty } from '../utils';
import { isFunction } from 'lodash';

const validateMixin = {
  methods: {
    // 表格中的表单校验
    createFieldValidate(rules, val, rowKey, columnKey) {
      if (!Array.isArray(rules)) {
        return console.error('[Table]: 可编辑单元格的校验规则 `rules` 配置不正确');
      }
      if (!rules.length) return;
      this.store.removeFromRequired({ x: rowKey, y: columnKey });
      this.store.removeFromValidate({ x: rowKey, y: columnKey });
      rules.forEach(x => {
        if (x.required && isEmpty(val)) {
          this.store.addToRequired({ x: rowKey, y: columnKey, text: x.message });
        }
        if (isFunction(x.validator) && !x.validator(val)) {
          this.store.addToValidate({ x: rowKey, y: columnKey, text: x.message });
        }
      });
    }
  }
};

export default validateMixin;
