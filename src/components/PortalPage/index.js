/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:32:29
 **/
import './style/index.scss';
import PortalPage from './portalPage.js';

PortalPage.install = Vue => {
  Vue.component(PortalPage.name, PortalPage);
};

export default PortalPage;
export { PortalPage };
