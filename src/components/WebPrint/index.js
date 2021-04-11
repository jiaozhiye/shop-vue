/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:48:36
 **/
import './style/index.scss';
import WebPrint from './webPrint.js';

WebPrint.install = Vue => {
  Vue.component(WebPrint.name, WebPrint);
};

export default WebPrint;
export { WebPrint };
