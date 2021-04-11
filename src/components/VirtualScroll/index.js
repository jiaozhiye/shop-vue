/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:46:31
 **/
import './style/index.scss';
import VirtualScroll from './VirtualScroll.vue';

VirtualScroll.install = Vue => {
  Vue.component(VirtualScroll.name, VirtualScroll);
};

export default VirtualScroll;
export { VirtualScroll };
