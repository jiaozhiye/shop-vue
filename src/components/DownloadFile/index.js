/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-23 16:20:19
 **/
import DownloadFile from './downloadFile.js';

DownloadFile.install = Vue => {
  Vue.component(DownloadFile.name, DownloadFile);
};

export default DownloadFile;
export { DownloadFile };
