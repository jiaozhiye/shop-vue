/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:28:56
 **/
import JsonToExcel from './jsonToExcel.js';

JsonToExcel.install = Vue => {
  Vue.component(JsonToExcel.name, JsonToExcel);
};

export default JsonToExcel;
export { JsonToExcel };
