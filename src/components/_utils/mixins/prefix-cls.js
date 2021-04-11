/*
 * @Author: mashaoze
 * @Date: 2020-05-25 08:34:03
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-25 09:17:04
 */
export default {
  computed: {
    prefixCls() {
      return (this.$VDESIGN || {}).prefixCls || 'v';
    }
  },
  methods: {
    getPrefixCls(suffixCls) {
      return `${this.prefixCls}-${suffixCls}`;
    }
  }
};
