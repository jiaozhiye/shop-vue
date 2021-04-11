/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-25 15:46:11
 **/
import './style/index.scss';
import UploadCropper from './uploadCropper.js';

UploadCropper.install = Vue => {
  Vue.component(UploadCropper.name, UploadCropper);
};

export default UploadCropper;
export { UploadCropper };
