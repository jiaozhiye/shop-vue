/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-01-28 15:58:20
 **/
import './style/index.scss';
import Drawer from './baseDrawer.js';

Drawer.install = Vue => {
  Vue.component(Drawer.name, Drawer);
};

export default Drawer;
export { Drawer };
