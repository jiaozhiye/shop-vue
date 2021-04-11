/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:35:10
 **/
import './style/index.scss';
import Spin from './spin.js';

Spin.install = Vue => {
  Vue.component(Spin.name, Spin);
};

export default Spin;
export { Spin };
