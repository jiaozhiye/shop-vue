/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:17:21
 **/
import './style/index.scss';
import BreakSpace from './breakSpace.js';

BreakSpace.install = Vue => {
  Vue.component(BreakSpace.name, BreakSpace);
};

export default BreakSpace;
export { BreakSpace };
