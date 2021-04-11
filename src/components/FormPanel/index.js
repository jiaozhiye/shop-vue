/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:27:09
 **/
import './style/index.scss';
import FormPanel from './formPanel.js';

FormPanel.install = Vue => {
  Vue.component(FormPanel.name, FormPanel);
};

export default FormPanel;
export { FormPanel };
