/*
 * @Author: mashaoze
 * @Date: 2020-06-13 12:52:23
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-06-13 12:53:00
 */
import { uuid } from './Utils';
var createState = function() {
  return {
    listeners: [],
    scriptId: uuid('tiny-script'),
    scriptLoaded: false
  };
};
var CreateScriptLoader = function() {
  var state = createState();
  var injectScriptTag = function(scriptId, doc, url, callback) {
    var scriptTag = doc.createElement('script');
    scriptTag.referrerPolicy = 'origin';
    scriptTag.type = 'application/javascript';
    scriptTag.id = scriptId;
    scriptTag.src = url;
    var handler = function() {
      scriptTag.removeEventListener('load', handler);
      callback();
    };
    scriptTag.addEventListener('load', handler);
    if (doc.head) {
      doc.head.appendChild(scriptTag);
    }
  };
  var load = function(doc, url, callback) {
    if (state.scriptLoaded) {
      callback();
    } else {
      state.listeners.push(callback);
      if (!doc.getElementById(state.scriptId)) {
        injectScriptTag(state.scriptId, doc, url, function() {
          state.listeners.forEach(function(fn) {
            return fn();
          });
          state.scriptLoaded = true;
        });
      }
    }
  };
  // Only to be used by tests.
  var reinitialize = function() {
    state = createState();
  };
  return {
    load: load,
    reinitialize: reinitialize
  };
};
var ScriptLoader = CreateScriptLoader();
export { ScriptLoader };
