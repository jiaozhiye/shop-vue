/*
 * @Author: mashaoze
 * @Date: 2020-05-27 15:20:11
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-05-27 15:23:01
 */
const warning = (valid, message) => {
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
    console.error(`Warning: ${message}`);
  }
};

export default (valid, component, message = '') => {
  warning(valid, `[${component}]: ${message}`);
};
