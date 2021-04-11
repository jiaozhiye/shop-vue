/*
 * @Author: mashaoze
 * @Date: 2020-03-05 10:27:24
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 23:13:25
 */
import { t } from './index';

const langMixin = {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};

export default langMixin;
