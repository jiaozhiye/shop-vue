/*
 * @Author: mashaoze
 * @Date: 2020-07-01 11:27:39
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-08 18:00:33
 */
import { on } from './tool';

const nodeList = [];
const ctx = '__clickOutsideContext__';

let startClick;
let seed = 0;

on(document, 'mousedown', ev => (startClick = ev));
on(document, 'mouseup', ev => nodeList.forEach(node => node[ctx].documentHandler(ev, startClick)));

const createDocumentHandler = (el, binding, vnode) => {
  return function(mouseup = {}, mousedown = {}) {
    if (
      !vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm && (vnode.context.popperElm.contains(mouseup.target) || vnode.context.popperElm.contains(mousedown.target)))
    )
      return;
    if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx]?.bindingFn(mousedown.target, mouseup.target);
    }
  };
};

/**
 * v-clickOutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```
 *   <div v-clickOutside="handleClose">
 *
 * ```
 */
export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },
  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },
  unbind(el) {
    let len = nodeList.length;
    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
};
