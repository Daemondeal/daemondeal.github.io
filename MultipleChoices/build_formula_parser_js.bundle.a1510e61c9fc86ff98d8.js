"use strict";
(self["webpackChunkmultiple_choices"] = self["webpackChunkmultiple_choices"] || []).push([["build_formula_parser_js"],{

/***/ "./build/formula_parser.js":
/*!*********************************!*\
  !*** ./build/formula_parser.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__wbg_alert_d671ee8ea6ef967c": () => (/* reexport safe */ _formula_parser_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_alert_d671ee8ea6ef967c),
/* harmony export */   "add": () => (/* reexport safe */ _formula_parser_bg_js__WEBPACK_IMPORTED_MODULE_1__.add),
/* harmony export */   "test": () => (/* reexport safe */ _formula_parser_bg_js__WEBPACK_IMPORTED_MODULE_1__.test)
/* harmony export */ });
/* harmony import */ var _formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formula_parser_bg.wasm */ "./build/formula_parser_bg.wasm");
/* harmony import */ var _formula_parser_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formula_parser_bg.js */ "./build/formula_parser_bg.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__, _formula_parser_bg_js__WEBPACK_IMPORTED_MODULE_1__]);
([_formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__, _formula_parser_bg_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./build/formula_parser_bg.js":
/*!************************************!*\
  !*** ./build/formula_parser_bg.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "test": () => (/* binding */ test),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "__wbg_alert_d671ee8ea6ef967c": () => (/* binding */ __wbg_alert_d671ee8ea6ef967c)
/* harmony export */ });
/* harmony import */ var _formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formula_parser_bg.wasm */ "./build/formula_parser_bg.wasm");
/* module decorator */ module = __webpack_require__.hmd(module);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);
_formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

var lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
var cachedTextDecoder = new lTextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(_formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
*/


function test() {
  _formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.test();
}
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/

function add(a, b) {
  var ret = _formula_parser_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.add(a, b);
  return ret;
}
function __wbg_alert_d671ee8ea6ef967c(arg0, arg1) {
  alert(getStringFromWasm0(arg0, arg1));
}
;
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./build/formula_parser_bg.wasm":
/*!**************************************!*\
  !*** ./build/formula_parser_bg.wasm ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

var __webpack_instantiate__ = ([WEBPACK_IMPORTED_MODULE_0]) => {
	return __webpack_require__.v(exports, module.id, "0daec36dd8a29ca408b7", {
		"./formula_parser_bg.js": {
			"__wbg_alert_d671ee8ea6ef967c": WEBPACK_IMPORTED_MODULE_0.__wbg_alert_d671ee8ea6ef967c
		}
	});
}
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => {
	try {
	/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./formula_parser_bg.js */ "./build/formula_parser_bg.js");
	var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([WEBPACK_IMPORTED_MODULE_0]);
	var [WEBPACK_IMPORTED_MODULE_0] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;
	await __webpack_require__.v(exports, module.id, "0daec36dd8a29ca408b7", {
		"./formula_parser_bg.js": {
			"__wbg_alert_d671ee8ea6ef967c": WEBPACK_IMPORTED_MODULE_0.__wbg_alert_d671ee8ea6ef967c
		}
	});
	__webpack_async_result__();
	} catch(e) { __webpack_async_result__(e); }
}, 1);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfZm9ybXVsYV9wYXJzZXJfanMuYnVuZGxlLmExNTEwZTYxYzlmYzg2ZmY5OGQ4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBRUEsSUFBTUMsWUFBWSxHQUFHLE9BQU9DLFdBQVAsS0FBdUIsV0FBdkIsR0FBcUMsQ0FBQyxHQUFHQyxNQUFNLENBQUNDLE9BQVgsRUFBb0IsTUFBcEIsRUFBNEJGLFdBQWpFLEdBQStFQSxXQUFwRztBQUVBLElBQUlHLGlCQUFpQixHQUFHLElBQUlKLFlBQUosQ0FBaUIsT0FBakIsRUFBMEI7QUFBRUssRUFBQUEsU0FBUyxFQUFFLElBQWI7QUFBbUJDLEVBQUFBLEtBQUssRUFBRTtBQUExQixDQUExQixDQUF4QjtBQUVBRixpQkFBaUIsQ0FBQ0csTUFBbEI7QUFFQSxJQUFJQyxvQkFBb0IsR0FBRyxJQUEzQjs7QUFDQSxTQUFTQyxlQUFULEdBQTJCO0FBQ3ZCLE1BQUlELG9CQUFvQixLQUFLLElBQXpCLElBQWlDQSxvQkFBb0IsQ0FBQ0UsTUFBckIsS0FBZ0NYLGtFQUFyRSxFQUF5RjtBQUNyRlMsSUFBQUEsb0JBQW9CLEdBQUcsSUFBSUksVUFBSixDQUFlYixrRUFBZixDQUF2QjtBQUNIOztBQUNELFNBQU9TLG9CQUFQO0FBQ0g7O0FBRUQsU0FBU0ssa0JBQVQsQ0FBNEJDLEdBQTVCLEVBQWlDQyxHQUFqQyxFQUFzQztBQUNsQyxTQUFPWCxpQkFBaUIsQ0FBQ0csTUFBbEIsQ0FBeUJFLGVBQWUsR0FBR08sUUFBbEIsQ0FBMkJGLEdBQTNCLEVBQWdDQSxHQUFHLEdBQUdDLEdBQXRDLENBQXpCLENBQVA7QUFDSDtBQUNEO0FBQ0E7OztBQUNPLFNBQVNFLElBQVQsR0FBZ0I7QUFDbkJsQixFQUFBQSx5REFBQTtBQUNIO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxTQUFTbUIsR0FBVCxDQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQjtBQUN0QixNQUFJQyxHQUFHLEdBQUd0Qix3REFBQSxDQUFTb0IsQ0FBVCxFQUFZQyxDQUFaLENBQVY7QUFDQSxTQUFPQyxHQUFQO0FBQ0g7QUFFTSxTQUFTQyw0QkFBVCxDQUFzQ0MsSUFBdEMsRUFBNENDLElBQTVDLEVBQWtEO0FBQ3JEQyxFQUFBQSxLQUFLLENBQUNaLGtCQUFrQixDQUFDVSxJQUFELEVBQU9DLElBQVAsQ0FBbkIsQ0FBTDtBQUNIO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tdWx0aXBsZS1jaG9pY2VzLy4vYnVpbGQvZm9ybXVsYV9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vbXVsdGlwbGUtY2hvaWNlcy8uL2J1aWxkL2Zvcm11bGFfcGFyc2VyX2JnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdhc20gZnJvbSBcIi4vZm9ybXVsYV9wYXJzZXJfYmcud2FzbVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vZm9ybXVsYV9wYXJzZXJfYmcuanNcIjsiLCJpbXBvcnQgKiBhcyB3YXNtIGZyb20gJy4vZm9ybXVsYV9wYXJzZXJfYmcud2FzbSc7XG5cbmNvbnN0IGxUZXh0RGVjb2RlciA9IHR5cGVvZiBUZXh0RGVjb2RlciA9PT0gJ3VuZGVmaW5lZCcgPyAoMCwgbW9kdWxlLnJlcXVpcmUpKCd1dGlsJykuVGV4dERlY29kZXIgOiBUZXh0RGVjb2RlcjtcblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IGxUZXh0RGVjb2RlcigndXRmLTgnLCB7IGlnbm9yZUJPTTogdHJ1ZSwgZmF0YWw6IHRydWUgfSk7XG5cbmNhY2hlZFRleHREZWNvZGVyLmRlY29kZSgpO1xuXG5sZXQgY2FjaGVnZXRVaW50OE1lbW9yeTAgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkwKCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQ4TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQ4TWVtb3J5MC5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5MCA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQ4TWVtb3J5MDtcbn1cblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20wKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGNhY2hlZFRleHREZWNvZGVyLmRlY29kZShnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIsIHB0ciArIGxlbikpO1xufVxuLyoqXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgd2FzbS50ZXN0KCk7XG59XG5cbi8qKlxuKiBAcGFyYW0ge251bWJlcn0gYVxuKiBAcGFyYW0ge251bWJlcn0gYlxuKiBAcmV0dXJucyB7bnVtYmVyfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGQoYSwgYikge1xuICAgIHZhciByZXQgPSB3YXNtLmFkZChhLCBiKTtcbiAgICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX193YmdfYWxlcnRfZDY3MWVlOGVhNmVmOTY3YyhhcmcwLCBhcmcxKSB7XG4gICAgYWxlcnQoZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpKTtcbn07XG5cbiJdLCJuYW1lcyI6WyJ3YXNtIiwibFRleHREZWNvZGVyIiwiVGV4dERlY29kZXIiLCJtb2R1bGUiLCJyZXF1aXJlIiwiY2FjaGVkVGV4dERlY29kZXIiLCJpZ25vcmVCT00iLCJmYXRhbCIsImRlY29kZSIsImNhY2hlZ2V0VWludDhNZW1vcnkwIiwiZ2V0VWludDhNZW1vcnkwIiwiYnVmZmVyIiwibWVtb3J5IiwiVWludDhBcnJheSIsImdldFN0cmluZ0Zyb21XYXNtMCIsInB0ciIsImxlbiIsInN1YmFycmF5IiwidGVzdCIsImFkZCIsImEiLCJiIiwicmV0IiwiX193YmdfYWxlcnRfZDY3MWVlOGVhNmVmOTY3YyIsImFyZzAiLCJhcmcxIiwiYWxlcnQiXSwic291cmNlUm9vdCI6IiJ9