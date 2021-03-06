/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:59:52
 **/
import FilterTable from './filterTable.vue';

FilterTable.install = Vue => {
  Vue.component(FilterTable.name, FilterTable);
};

export default FilterTable;
export { FilterTable };
