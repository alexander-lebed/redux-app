(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./src/__tests__/App.spec.js":
/*!***********************************!*\
  !*** ./src/__tests__/App.spec.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var enzyme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! enzyme */ \"./node_modules/enzyme/build/index.js\");\n/* harmony import */ var enzyme__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(enzyme__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var axios_mock_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios-mock-adapter */ \"./node_modules/axios-mock-adapter/src/index.js\");\n/* harmony import */ var axios_mock_adapter__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios_mock_adapter__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var mock_socket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mock-socket */ \"./node_modules/mock-socket/dist/mock-socket.js\");\n/* harmony import */ var mock_socket__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mock_socket__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _redux_configureStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../redux/configureStore */ \"./src/redux/configureStore.js\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../App */ \"./src/App.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar localStorageMock = {\n  getItem: jest.fn(),\n  setItem: jest.fn(),\n  removeItem: jest.fn(),\n  clear: jest.fn()\n};\nvar Notification = {\n  requestPermission: jest.fn()\n};\nglobal.localStorage = localStorageMock;\nglobal.WebSocket = mock_socket__WEBPACK_IMPORTED_MODULE_7__[\"WebSocket\"];\nglobal.Notification = Notification;\njest.mock('hellojs', function () {\n  return {\n    init: function init() {}\n  };\n});\ndescribe('App integration test', function () {\n  var mockAdapter;\n  var store;\n  beforeEach(\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            mockAdapter = new axios_mock_adapter__WEBPACK_IMPORTED_MODULE_6___default.a(axios__WEBPACK_IMPORTED_MODULE_5___default.a);\n            _context.next = 3;\n            return Object(_redux_configureStore__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n\n          case 3:\n            store = _context.sent;\n\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  })));\n  test('should land on Login page',\n  /*#__PURE__*/\n  function () {\n    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(done) {\n      var wrapper;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              mockAdapter.onGet(_constants__WEBPACK_IMPORTED_MODULE_10__[\"IMGUR_AUTH_GET_API\"]).reply(200);\n              mockAdapter.onGet(_constants__WEBPACK_IMPORTED_MODULE_10__[\"USERS_URL\"]).reply(200, []);\n              _context2.next = 4;\n              return Object(enzyme__WEBPACK_IMPORTED_MODULE_3__[\"mount\"])(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"Provider\"], {\n                store: store\n              }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null)));\n\n            case 4:\n              wrapper = _context2.sent;\n              setTimeout(function () {\n                wrapper.update();\n                var LoginPage = wrapper.find('Login');\n                expect(LoginPage.exists()).toEqual(true);\n                done();\n              }, 500);\n\n            case 6:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n\n    return function (_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/__tests__/App.spec.js?");

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///readable-stream_(ignored)?");

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 3:
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///./util.inspect_(ignored)?");

/***/ })

}]);