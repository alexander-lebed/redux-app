(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./src/__tests__/App.spec.js":
/*!***********************************!*\
  !*** ./src/__tests__/App.spec.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var enzyme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! enzyme */ \"./node_modules/enzyme/build/index.js\");\n/* harmony import */ var enzyme__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(enzyme__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var axios_mock_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios-mock-adapter */ \"./node_modules/axios-mock-adapter/src/index.js\");\n/* harmony import */ var axios_mock_adapter__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios_mock_adapter__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var mock_socket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mock-socket */ \"./node_modules/mock-socket/dist/mock-socket.js\");\n/* harmony import */ var mock_socket__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mock_socket__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _redux_configureStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../redux/configureStore */ \"./src/redux/configureStore.js\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../App */ \"./src/App.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar localStorageMock = {\n  getItem: jest.fn(),\n  setItem: jest.fn(),\n  removeItem: jest.fn(),\n  clear: jest.fn()\n};\nvar Notification = {\n  requestPermission: jest.fn()\n};\nglobal.localStorage = localStorageMock;\nglobal.WebSocket = mock_socket__WEBPACK_IMPORTED_MODULE_7__[\"WebSocket\"];\nglobal.Notification = Notification;\njest.mock('hellojs', function () {\n  return {\n    init: function init() {}\n  };\n});\ndescribe('App integration test', function () {\n  var mockAdapter;\n  var store;\n  beforeEach(\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            mockAdapter = new axios_mock_adapter__WEBPACK_IMPORTED_MODULE_6___default.a(axios__WEBPACK_IMPORTED_MODULE_5___default.a);\n            _context.next = 3;\n            return Object(_redux_configureStore__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n\n          case 3:\n            store = _context.sent;\n\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  })));\n  test('should land on Login page',\n  /*#__PURE__*/\n  function () {\n    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n    /*#__PURE__*/\n    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(done) {\n      var wrapper;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              mockAdapter.onGet(_constants__WEBPACK_IMPORTED_MODULE_10__[\"IMGUR_AUTH_GET_API\"]).reply(200);\n              mockAdapter.onGet(_constants__WEBPACK_IMPORTED_MODULE_10__[\"USERS_URL\"]).reply(200, []);\n              _context2.next = 4;\n              return Object(enzyme__WEBPACK_IMPORTED_MODULE_3__[\"mount\"])(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"Provider\"], {\n                store: store\n              }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null)));\n\n            case 4:\n              wrapper = _context2.sent;\n              setTimeout(function () {\n                wrapper.update();\n                var LoginPage = wrapper.find('Login');\n                expect(LoginPage.exists()).toEqual(true);\n                done();\n              }, 500);\n\n            case 6:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n\n    return function (_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvX190ZXN0c19fL0FwcC5zcGVjLmpzPzExNDUiXSwibmFtZXMiOlsibG9jYWxTdG9yYWdlTW9jayIsImdldEl0ZW0iLCJqZXN0Iiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJjbGVhciIsIk5vdGlmaWNhdGlvbiIsInJlcXVlc3RQZXJtaXNzaW9uIiwiZ2xvYmFsIiwiaW5pdCIsImRlc2NyaWJlIiwiYmVmb3JlRWFjaCIsIm1vY2tBZGFwdGVyIiwiY29uZmlndXJlU3RvcmUiLCJzdG9yZSIsInRlc3QiLCJtb3VudCIsIndyYXBwZXIiLCJzZXRUaW1lb3V0IiwiTG9naW5QYWdlIiwiZXhwZWN0IiwiZG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsZ0JBQWdCLEdBQUc7QUFDckJDLFNBQU8sRUFBRUMsSUFBSSxDQURRLEVBQ1pBLEVBRFk7QUFFckJDLFNBQU8sRUFBRUQsSUFBSSxDQUZRLEVBRVpBLEVBRlk7QUFHckJFLFlBQVUsRUFBRUYsSUFBSSxDQUhLLEVBR1RBLEVBSFM7QUFJckJHLE9BQUssRUFBRUgsSUFBSSxDQUFKQTtBQUpjLENBQXpCO0FBTUEsSUFBTUksWUFBWSxHQUFHO0FBQ2pCQyxtQkFBaUIsRUFBRUwsSUFBSSxDQUFKQTtBQURGLENBQXJCO0FBR0FNLE1BQU0sQ0FBTkE7QUFDQUEsTUFBTSxDQUFOQTtBQUNBQSxNQUFNLENBQU5BO0FBRUFOLElBQUksQ0FBSkEsZ0JBQXFCO0FBQUEsU0FBTztBQUN4Qk8sUUFBSSxFQUFFLGdCQUFNLENBQUU7QUFEVSxHQUFQO0FBQXJCUDtBQUlBUSxRQUFRLHlCQUF5QixZQUFNO0FBRW5DO0FBQ0E7QUFFQUMsWUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUEMsdUJBQVcsR0FBRyw4REFBZEEsNENBQWMsQ0FBZEE7QUFETztBQUFBLG1CQUVPQyxxRUFGUDs7QUFBQTtBQUVQQyxpQkFGTyxnQkFFUEE7O0FBRk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQVhILEdBQVUsR0FBVkE7QUFLQUksTUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkVBQThCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM5QkgseUJBQVcsQ0FBWEE7QUFDQUEseUJBQVcsQ0FBWEE7QUFGOEI7QUFBQSxxQkFHUkksb0RBQUssQ0FDdkI7QUFBVSxxQkFBSyxFQUFFRjtBQUFqQixpQkFDSSx5R0FMc0IsSUFLdEIsQ0FESixDQUR1QixDQUhHOztBQUFBO0FBR3hCRyxxQkFId0IsaUJBR3hCQTtBQUtOQyx3QkFBVSxDQUFDLFlBQU07QUFDYkQsdUJBQU8sQ0FBUEE7QUFDQSxvQkFBTUUsU0FBUyxHQUFHRixPQUFPLENBQVBBLEtBQWxCLE9BQWtCQSxDQUFsQjtBQUNBRyxzQkFBTSxDQUFDRCxTQUFTLENBQWhCQyxNQUFPRCxFQUFELENBQU5DO0FBQ0FDLG9CQUFJO0FBSkUsaUJBQVZILEdBQVUsQ0FBVkE7O0FBUjhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE5Qjs7QUFBQTtBQUFBO0FBQUE7QUFBSkgsR0FBSSxHQUFKQTtBQVZKTCxDQUFRLENBQVJBLEMiLCJmaWxlIjoiLi9zcmMvX190ZXN0c19fL0FwcC5zcGVjLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgbW91bnQgfSBmcm9tICdlbnp5bWUnO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0ICRodHRwIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IE1vY2tBZGFwdGVyIGZyb20gJ2F4aW9zLW1vY2stYWRhcHRlcic7XHJcbmltcG9ydCB7IFdlYlNvY2tldCB9IGZyb20gJ21vY2stc29ja2V0JztcclxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4uL3JlZHV4L2NvbmZpZ3VyZVN0b3JlJztcclxuaW1wb3J0IEFwcCBmcm9tICcuLi9BcHAnO1xyXG5pbXBvcnQgeyBJTUdVUl9BVVRIX0dFVF9BUEksIFVTRVJTX1VSTCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcblxyXG5jb25zdCBsb2NhbFN0b3JhZ2VNb2NrID0ge1xyXG4gICAgZ2V0SXRlbTogamVzdC5mbigpLFxyXG4gICAgc2V0SXRlbTogamVzdC5mbigpLFxyXG4gICAgcmVtb3ZlSXRlbTogamVzdC5mbigpLFxyXG4gICAgY2xlYXI6IGplc3QuZm4oKSxcclxufTtcclxuY29uc3QgTm90aWZpY2F0aW9uID0ge1xyXG4gICAgcmVxdWVzdFBlcm1pc3Npb246IGplc3QuZm4oKVxyXG59O1xyXG5nbG9iYWwubG9jYWxTdG9yYWdlID0gbG9jYWxTdG9yYWdlTW9jaztcclxuZ2xvYmFsLldlYlNvY2tldCA9IFdlYlNvY2tldDtcclxuZ2xvYmFsLk5vdGlmaWNhdGlvbiA9IE5vdGlmaWNhdGlvbjtcclxuXHJcbmplc3QubW9jaygnaGVsbG9qcycsICgpID0+ICh7XHJcbiAgICBpbml0OiAoKSA9PiB7fVxyXG59KSk7XHJcblxyXG5kZXNjcmliZSgnQXBwIGludGVncmF0aW9uIHRlc3QnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IG1vY2tBZGFwdGVyO1xyXG4gICAgbGV0IHN0b3JlO1xyXG5cclxuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tBZGFwdGVyID0gbmV3IE1vY2tBZGFwdGVyKCRodHRwKTtcclxuICAgICAgICBzdG9yZSA9IGF3YWl0IGNvbmZpZ3VyZVN0b3JlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0ZXN0KCdzaG91bGQgbGFuZCBvbiBMb2dpbiBwYWdlJywgYXN5bmMgKGRvbmUpID0+IHtcclxuICAgICAgICBtb2NrQWRhcHRlci5vbkdldChJTUdVUl9BVVRIX0dFVF9BUEkpLnJlcGx5KDIwMCk7XHJcbiAgICAgICAgbW9ja0FkYXB0ZXIub25HZXQoVVNFUlNfVVJMKS5yZXBseSgyMDAsIFtdKTtcclxuICAgICAgICBjb25zdCB3cmFwcGVyID0gYXdhaXQgbW91bnQoXHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgICAgICAgICAgPEFwcCAvPlxyXG4gICAgICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHdyYXBwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IExvZ2luUGFnZSA9IHdyYXBwZXIuZmluZCgnTG9naW4nKTtcclxuICAgICAgICAgICAgZXhwZWN0KExvZ2luUGFnZS5leGlzdHMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/__tests__/App.spec.js\n");

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVhZGFibGUtc3RyZWFtIChpZ25vcmVkKT9lNTM5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vdXRpbCAoaWdub3JlZCk/ODg4NiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vdXRpbCAoaWdub3JlZCk/ZmRhNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n");

/***/ }),

/***/ 3:
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlsLmluc3BlY3QgKGlnbm9yZWQpP2IzZmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3\n");

/***/ })

}]);