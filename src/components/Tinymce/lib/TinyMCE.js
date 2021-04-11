/*
 * @Author: mashaoze
 * @Date: 2020-06-13 12:52:23
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-06-13 12:53:05
 */
var getGlobal = function() {
  return typeof window !== 'undefined' ? window : global;
};
var getTinymce = function() {
  var global = getGlobal();
  return global && global.tinymce ? global.tinymce : null;
};
export { getTinymce };
