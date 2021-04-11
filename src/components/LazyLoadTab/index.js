/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:30:07
 **/
import './style/index.scss';
import LazyLoadTab from './lazyLoadTab.js';

LazyLoadTab.install = Vue => {
  Vue.component(LazyLoadTab.name, LazyLoadTab);
};

export default LazyLoadTab;
export { LazyLoadTab };
