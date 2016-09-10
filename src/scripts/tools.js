/**
 * 工具集合
 */

 export function isObject(obj) {
 	return typeof(obj) == 'object';
 }

 export function isArray(arr) {
 	return typeof(arr) == "array";
 }

 export function isFunction(func) {
 	return typeof(func) == "function";
 }

 // 将带像素单位的转为数字
 export function px2num(px) {
 	px = px || "";
 	return px.substr(0, px.indexOf("px"));
 }