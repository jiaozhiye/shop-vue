/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:42:35
 **/
import './style/index.scss';
import TopFilter from './topFilter.js';

TopFilter.install = Vue => {
  Vue.component(TopFilter.name, TopFilter);
};

export default TopFilter;
export { TopFilter };
