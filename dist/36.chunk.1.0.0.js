(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

/***/ "./src/redux/reducers/__tests__/authentication.test.js":
/*!*************************************************************!*\
  !*** ./src/redux/reducers/__tests__/authentication.test.js ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ \"./node_modules/@babel/runtime/helpers/objectSpread.js\");\n/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var redux_mock_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-mock-store */ \"./node_modules/redux-mock-store/lib/index.js\");\n/* harmony import */ var redux_mock_store__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_mock_store__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mock_socket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mock-socket */ \"./node_modules/mock-socket/dist/mock-socket.js\");\n/* harmony import */ var mock_socket__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mock_socket__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var axios_mock_adapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios-mock-adapter */ \"./node_modules/axios-mock-adapter/src/index.js\");\n/* harmony import */ var axios_mock_adapter__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios_mock_adapter__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../constants */ \"./src/constants.js\");\n/* harmony import */ var _authentication__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../authentication */ \"./src/redux/reducers/authentication.js\");\n\n\n\n\n\n\n\n\n\n\nglobal.WebSocket = mock_socket__WEBPACK_IMPORTED_MODULE_4__[\"WebSocket\"];\njest.mock('hellojs', function () {\n  return {\n    use: function use() {\n      return {\n        api: function api() {\n          return {\n            id: '12345',\n            first_name: 'FirstName',\n            email: 'newname@email.com',\n            thumbnail: '/images/default-profile.jpg'\n          };\n        },\n        login: function login() {\n          return Promise.resolve(true);\n        },\n        logout: function logout() {\n          return Promise.resolve(true);\n        }\n      };\n    }\n  };\n});\nvar middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_5__[\"default\"]];\nvar mockStore = redux_mock_store__WEBPACK_IMPORTED_MODULE_3___default()(middleware);\ndescribe('Authentication reducer', function () {\n  var getOfflineUser = function getOfflineUser() {\n    return {\n      _id: '111',\n      username: 'Current User',\n      email: 'user@mail.com',\n      password: 'user-password',\n      online: false,\n      lastTime: 1519294933743,\n      oauth: ''\n    };\n  };\n\n  var getOnlineUser = function getOnlineUser() {\n    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, getOfflineUser(), {\n      online: true\n    });\n  };\n\n  var USERS_PUT_API = \"\".concat(_constants__WEBPACK_IMPORTED_MODULE_8__[\"USERS_URL\"], \"/\").concat(getOfflineUser()._id);\n  var initialState = {\n    authentication: {\n      user: null\n    },\n    users: {\n      users: [getOfflineUser(), {\n        _id: '222',\n        username: 'Alice',\n        email: 'alice@gmail.com',\n        password: 'alice-password',\n        online: true,\n        lastTime: 1518346740388,\n        oauth: ''\n      }, {\n        _id: '333',\n        username: 'Bob',\n        email: 'bob@mail.com',\n        password: 'bob-password',\n        online: true,\n        lastTime: 1518346740388,\n        oauth: 'facebook'\n      }]\n    }\n  };\n  var mockAdapter = new axios_mock_adapter__WEBPACK_IMPORTED_MODULE_7___default.a(axios__WEBPACK_IMPORTED_MODULE_6___default.a);\n  var store = mockStore(initialState);\n  afterEach(function () {\n    store.clearActions();\n  });\n  test('check initial state',\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            expect(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(undefined, {})).toEqual(initialState.authentication);\n\n          case 1:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  })));\n  test('should login existing user',\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {\n    var setUserAction, expectedActions, isLoggedIn;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            mockAdapter.onPut(USERS_PUT_API).reply(200, getOnlineUser()); // TEST ACTION\n\n            setUserAction = {\n              type: 'SET_USER',\n              payload: getOnlineUser()\n            };\n            expectedActions = [setUserAction];\n            _context2.next = 5;\n            return store.dispatch(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"login\"])({\n              email: getOnlineUser().email,\n              password: getOnlineUser().password,\n              oauth: getOnlineUser().oauth\n            }));\n\n          case 5:\n            isLoggedIn = _context2.sent;\n            expect(isLoggedIn).toBe(true);\n            expect(store.getActions()).toEqual(expectedActions); // TEST REDUCER\n\n            expect(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"default\"])({}, setUserAction)).toEqual({\n              user: getOnlineUser()\n            });\n\n          case 9:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  })));\n  test('should login new OAUTH user',\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {\n    var oauthUser, setUserAction, expectedActions, isLoggedIn;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            oauthUser = {\n              _id: '3132333435xxxxxxxxxxxxxx',\n              username: 'New Name',\n              email: 'newname@email.com',\n              password: '',\n              online: true,\n              pictureUrl: '/images/default-profile.jpg',\n              lastTime: null,\n              oauth: 'google'\n            };\n            mockAdapter.onPut(\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_8__[\"USERS_URL\"], \"/\").concat(oauthUser._id)).reply(200, oauthUser); // TEST ACTION\n\n            setUserAction = {\n              type: 'SET_USER',\n              payload: oauthUser\n            };\n            expectedActions = [setUserAction];\n            _context3.next = 6;\n            return store.dispatch(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"login\"])({\n              oauth: oauthUser.oauth\n            }));\n\n          case 6:\n            isLoggedIn = _context3.sent;\n            expect(isLoggedIn).toBe(true);\n            expect(store.getActions()).toEqual(expectedActions); // TEST REDUCER\n\n            expect(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"default\"])({}, setUserAction)).toEqual({\n              user: oauthUser\n            });\n\n          case 10:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3);\n  })));\n  test('should login existing OAUTH user',\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {\n    var getOauthUser, setUserAction, expectedActions, isLoggedIn;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            getOauthUser = function getOauthUser() {\n              return initialState.users.users[2];\n            };\n\n            mockAdapter.onPut(\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_8__[\"USERS_URL\"], \"/\").concat(getOauthUser()._id)).reply(200, getOauthUser()); // TEST ACTION\n\n            setUserAction = {\n              type: 'SET_USER',\n              payload: getOauthUser()\n            };\n            expectedActions = [setUserAction];\n            _context4.next = 6;\n            return store.dispatch(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"login\"])(getOauthUser()));\n\n          case 6:\n            isLoggedIn = _context4.sent;\n            expect(isLoggedIn).toBe(true);\n            expect(store.getActions()).toEqual(expectedActions); // TEST REDUCER\n\n            expect(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"default\"])({}, setUserAction)).toEqual({\n              user: getOauthUser()\n            });\n\n          case 10:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4);\n  })));\n  test('should go user offline',\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {\n    var setUserAction, expectedActions;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {\n      while (1) {\n        switch (_context5.prev = _context5.next) {\n          case 0:\n            store = mockStore(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, initialState, {\n              authentication: {\n                user: getOnlineUser() // mock logged-in user\n\n              }\n            }));\n            mockAdapter.onPut(USERS_PUT_API).reply(200, getOfflineUser()); // TEST ACTION\n\n            setUserAction = {\n              type: 'SET_USER',\n              payload: getOfflineUser()\n            };\n            expectedActions = [setUserAction];\n            _context5.next = 6;\n            return store.dispatch(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"online\"])(false));\n\n          case 6:\n            expect(store.getActions()).toEqual(expectedActions); // TEST REDUCER\n\n            expect(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"default\"])({}, setUserAction)).toEqual({\n              user: getOfflineUser()\n            });\n\n          case 8:\n          case \"end\":\n            return _context5.stop();\n        }\n      }\n    }, _callee5);\n  })));\n  test('should logout user',\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6() {\n    var setUserAction, expectedActions;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {\n      while (1) {\n        switch (_context6.prev = _context6.next) {\n          case 0:\n            mockAdapter.onPut(USERS_PUT_API).reply(200, getOfflineUser()); // TEST ACTION\n\n            setUserAction = {\n              type: 'SET_USER',\n              payload: null\n            };\n            expectedActions = [setUserAction];\n            _context6.next = 5;\n            return store.dispatch(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"logout\"])());\n\n          case 5:\n            expect(store.getActions()).toEqual(expectedActions); // TEST REDUCER\n\n            expect(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"default\"])({}, setUserAction)).toEqual({\n              user: null\n            });\n\n          case 7:\n          case \"end\":\n            return _context6.stop();\n        }\n      }\n    }, _callee6);\n  })));\n  test('should logout OAUTH user',\n  /*#__PURE__*/\n  _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(\n  /*#__PURE__*/\n  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7() {\n    var getOauthUser, setUserAction, expectedActions;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {\n      while (1) {\n        switch (_context7.prev = _context7.next) {\n          case 0:\n            getOauthUser = function getOauthUser() {\n              return initialState.users.users[2];\n            };\n\n            store = mockStore(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, initialState, {\n              authentication: {\n                user: getOauthUser() // mock logged-in user\n\n              }\n            }));\n            mockAdapter.onPut(\"\".concat(_constants__WEBPACK_IMPORTED_MODULE_8__[\"USERS_URL\"], \"/\").concat(getOauthUser()._id)).reply(200, getOauthUser()); // TEST ACTION\n\n            setUserAction = {\n              type: 'SET_USER',\n              payload: null\n            };\n            expectedActions = [setUserAction];\n            _context7.next = 7;\n            return store.dispatch(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"logout\"])());\n\n          case 7:\n            expect(store.getActions()).toEqual(expectedActions); // TEST REDUCER\n\n            expect(Object(_authentication__WEBPACK_IMPORTED_MODULE_9__[\"default\"])({}, setUserAction)).toEqual({\n              user: null\n            });\n\n          case 9:\n          case \"end\":\n            return _context7.stop();\n        }\n      }\n    }, _callee7);\n  })));\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVkdXgvcmVkdWNlcnMvX190ZXN0c19fL2F1dGhlbnRpY2F0aW9uLnRlc3QuanM/NWJlMyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJqZXN0IiwidXNlIiwiYXBpIiwiaWQiLCJmaXJzdF9uYW1lIiwiZW1haWwiLCJ0aHVtYm5haWwiLCJsb2dpbiIsIlByb21pc2UiLCJsb2dvdXQiLCJtaWRkbGV3YXJlIiwibW9ja1N0b3JlIiwiY29uZmlndXJlTW9ja1N0b3JlIiwiZGVzY3JpYmUiLCJnZXRPZmZsaW5lVXNlciIsIl9pZCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJvbmxpbmUiLCJsYXN0VGltZSIsIm9hdXRoIiwiZ2V0T25saW5lVXNlciIsIlVTRVJTX1BVVF9BUEkiLCJpbml0aWFsU3RhdGUiLCJhdXRoZW50aWNhdGlvbiIsInVzZXIiLCJ1c2VycyIsIm1vY2tBZGFwdGVyIiwic3RvcmUiLCJhZnRlckVhY2giLCJ0ZXN0IiwiZXhwZWN0IiwicmVkdWNlciIsInNldFVzZXJBY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCIsImV4cGVjdGVkQWN0aW9ucyIsImlzTG9nZ2VkSW4iLCJvYXV0aFVzZXIiLCJwaWN0dXJlVXJsIiwiZ2V0T2F1dGhVc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxNQUFNLENBQU5BO0FBRUFDLElBQUksQ0FBSkEsZ0JBQXFCO0FBQUEsU0FBTztBQUN4QkMsT0FBRyxFQUFFO0FBQUEsYUFBTztBQUNSQyxXQUFHLEVBQUU7QUFBQSxpQkFBTztBQUNSQyxjQUFFLEVBRE07QUFFUkMsc0JBQVUsRUFGRjtBQUdSQyxpQkFBSyxFQUhHO0FBSVJDLHFCQUFTLEVBQUU7QUFKSCxXQUFQO0FBREc7QUFPUkMsYUFBSyxFQUFFO0FBQUEsaUJBQU1DLE9BQU8sQ0FBUEEsUUFBTixJQUFNQSxDQUFOO0FBUEM7QUFRUkMsY0FBTSxF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Q0FBWkEsWUFBTixDQUFNQSxDQUFOO0FBRFEsYUFDdkJpQjs7QUFDTlosaUJBQUssR0FBR2pCLFNBQVMsOEZBRVY7QUFBQ2EsNEJBQWMsRUFBRTtBQUFDQyxvQkFBSSxFQUFFZSxZQUFZLEVBQW5CLENBQXdCOztBQUF4QjtBQUFqQixhQUZVLEVBQWpCWjtBQUlBRCx1QkFBVyxDQUFYQSxrRkFBa0NhLFlBQVksR0FBOUNiLGlCQUFtRWEsWUFOdEMsRUFNN0JiLEVBTjZCLENBTzdCOztBQUNNTSx5QkFSdUIsR0FRUDtBQUFDQyxrQkFBSSxFQUFMO0FBQW1CQyxxQkFBTyxFQUFFO0FBQTVCLGFBQWhCRjtBQUNBRywyQkFUdUIsR0FTTCxDQVRLLGFBU0wsQ0FBbEJBO0FBVHVCO0FBQUEsbUJBVXZCUixLQUFLLENBQUxBLFNBQWVuQiw4REFWUSxFQVV2Qm1CLENBVnVCOztBQUFBO0FBVzdCRyxrQkFBTSxDQUFDSCxLQUFLLENBQVpHLFVBQU9ILEVBQUQsQ0FBTkcsU0FYNkIsZUFXN0JBLEVBWDZCLENBWTdCOztBQUNBQSxrQkFBTSxDQUFDQywrREFBTyxLQUFkRCxhQUFjLENBQVIsQ0FBTkEsU0FBMkM7QUFBQ04sa0JBQUksRUFBRTtBQUFQLGFBQTNDTTs7QUFiNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWpDRCxHQUFJLEdBQUpBO0FBL0hKakIsQ0FBUSxDQUFSQSxDIiwiZmlsZSI6Ii4vc3JjL3JlZHV4L3JlZHVjZXJzL19fdGVzdHNfXy9hdXRoZW50aWNhdGlvbi50ZXN0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZ3VyZU1vY2tTdG9yZSBmcm9tICdyZWR1eC1tb2NrLXN0b3JlJztcclxuaW1wb3J0IHsgV2ViU29ja2V0IH0gZnJvbSAnbW9jay1zb2NrZXQnO1xyXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xyXG5pbXBvcnQgJGh0dHAgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgTW9ja0FkYXB0ZXIgZnJvbSAnYXhpb3MtbW9jay1hZGFwdGVyJztcclxuaW1wb3J0IHsgVVNFUlNfVVJMIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHJlZHVjZXIsIHsgbG9naW4sIG9ubGluZSwgbG9nb3V0IH0gZnJvbSAnLi4vYXV0aGVudGljYXRpb24nO1xyXG5cclxuZ2xvYmFsLldlYlNvY2tldCA9IFdlYlNvY2tldDtcclxuXHJcbmplc3QubW9jaygnaGVsbG9qcycsICgpID0+ICh7XHJcbiAgICB1c2U6ICgpID0+ICh7XHJcbiAgICAgICAgYXBpOiAoKSA9PiAoe1xyXG4gICAgICAgICAgICBpZDogJzEyMzQ1JyxcclxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJ0ZpcnN0TmFtZScsXHJcbiAgICAgICAgICAgIGVtYWlsOiAnbmV3bmFtZUBlbWFpbC5jb20nLFxyXG4gICAgICAgICAgICB0aHVtYm5haWw6ICcvaW1hZ2VzL2RlZmF1bHQtcHJvZmlsZS5qcGcnXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbG9naW46ICgpID0+IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcclxuICAgICAgICBsb2dvdXQ6ICgpID0+IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcclxuICAgIH0pXHJcbn0pKTtcclxuXHJcbmNvbnN0IG1pZGRsZXdhcmUgPSBbdGh1bmtdO1xyXG5jb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVNb2NrU3RvcmUobWlkZGxld2FyZSk7XHJcblxyXG5kZXNjcmliZSgnQXV0aGVudGljYXRpb24gcmVkdWNlcicsICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBnZXRPZmZsaW5lVXNlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBfaWQ6ICcxMTEnLFxyXG4gICAgICAgICAgICB1c2VybmFtZTonQ3VycmVudCBVc2VyJyxcclxuICAgICAgICAgICAgZW1haWw6ICd1c2VyQG1haWwuY29tJyxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6ICd1c2VyLXBhc3N3b3JkJyxcclxuICAgICAgICAgICAgb25saW5lOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFzdFRpbWU6IDE1MTkyOTQ5MzM3NDMsXHJcbiAgICAgICAgICAgIG9hdXRoOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBnZXRPbmxpbmVVc2VyID0gKCkgPT4gKHsuLi5nZXRPZmZsaW5lVXNlcigpLCAuLi57b25saW5lOiB0cnVlfX0pO1xyXG4gICAgY29uc3QgVVNFUlNfUFVUX0FQSSA9IGAke1VTRVJTX1VSTH0vJHtnZXRPZmZsaW5lVXNlcigpLl9pZH1gO1xyXG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgICAgIGF1dGhlbnRpY2F0aW9uOiB7XHJcbiAgICAgICAgICAgIHVzZXI6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVzZXJzOiB7XHJcbiAgICAgICAgICAgIHVzZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBnZXRPZmZsaW5lVXNlcigpLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZDogJzIyMicsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6J0FsaWNlJyxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJ2FsaWNlQGdtYWlsLmNvbScsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdhbGljZS1wYXNzd29yZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb25saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RUaW1lOiAxNTE4MzQ2NzQwMzg4LFxyXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoOiAnJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfaWQ6ICczMzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOidCb2InLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAnYm9iQG1haWwuY29tJyxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ2JvYi1wYXNzd29yZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb25saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RUaW1lOiAxNTE4MzQ2NzQwMzg4LFxyXG4gICAgICAgICAgICAgICAgICAgIG9hdXRoOiAnZmFjZWJvb2snXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgbW9ja0FkYXB0ZXIgPSBuZXcgTW9ja0FkYXB0ZXIoJGh0dHApO1xyXG4gICAgbGV0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBzdG9yZS5jbGVhckFjdGlvbnMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRlc3QoJ2NoZWNrIGluaXRpYWwgc3RhdGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgZXhwZWN0KHJlZHVjZXIodW5kZWZpbmVkLCB7fSkpLnRvRXF1YWwoaW5pdGlhbFN0YXRlLmF1dGhlbnRpY2F0aW9uKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGVzdCgnc2hvdWxkIGxvZ2luIGV4aXN0aW5nIHVzZXInLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja0FkYXB0ZXIub25QdXQoVVNFUlNfUFVUX0FQSSkucmVwbHkoMjAwLCBnZXRPbmxpbmVVc2VyKCkpO1xyXG4gICAgICAgIC8vIFRFU1QgQUNUSU9OXHJcbiAgICAgICAgY29uc3Qgc2V0VXNlckFjdGlvbiA9IHt0eXBlOiAnU0VUX1VTRVInLCBwYXlsb2FkOiBnZXRPbmxpbmVVc2VyKCl9O1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkQWN0aW9ucyA9IFtzZXRVc2VyQWN0aW9uXTtcclxuICAgICAgICBjb25zdCBpc0xvZ2dlZEluID0gYXdhaXQgc3RvcmUuZGlzcGF0Y2gobG9naW4oe2VtYWlsOiBnZXRPbmxpbmVVc2VyKCkuZW1haWwsIHBhc3N3b3JkOiBnZXRPbmxpbmVVc2VyKCkucGFzc3dvcmQsIG9hdXRoOiBnZXRPbmxpbmVVc2VyKCkub2F1dGh9KSk7XHJcbiAgICAgICAgZXhwZWN0KGlzTG9nZ2VkSW4pLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KHN0b3JlLmdldEFjdGlvbnMoKSkudG9FcXVhbChleHBlY3RlZEFjdGlvbnMpO1xyXG4gICAgICAgIC8vIFRFU1QgUkVEVUNFUlxyXG4gICAgICAgIGV4cGVjdChyZWR1Y2VyKHt9LCBzZXRVc2VyQWN0aW9uKSkudG9FcXVhbCh7dXNlcjogZ2V0T25saW5lVXNlcigpfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0ZXN0KCdzaG91bGQgbG9naW4gbmV3IE9BVVRIIHVzZXInLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2F1dGhVc2VyID0ge1xyXG4gICAgICAgICAgICBfaWQ6ICczMTMyMzMzNDM1eHh4eHh4eHh4eHh4eHgnLFxyXG4gICAgICAgICAgICB1c2VybmFtZTogJ05ldyBOYW1lJyxcclxuICAgICAgICAgICAgZW1haWw6ICduZXduYW1lQGVtYWlsLmNvbScsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgICAgICAgICAgb25saW5lOiB0cnVlLFxyXG4gICAgICAgICAgICBwaWN0dXJlVXJsOiAnL2ltYWdlcy9kZWZhdWx0LXByb2ZpbGUuanBnJyxcclxuICAgICAgICAgICAgbGFzdFRpbWU6IG51bGwsXHJcbiAgICAgICAgICAgIG9hdXRoOiAnZ29vZ2xlJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbW9ja0FkYXB0ZXIub25QdXQoYCR7VVNFUlNfVVJMfS8ke29hdXRoVXNlci5faWR9YCkucmVwbHkoMjAwLCBvYXV0aFVzZXIpO1xyXG4gICAgICAgIC8vIFRFU1QgQUNUSU9OXHJcbiAgICAgICAgY29uc3Qgc2V0VXNlckFjdGlvbiA9IHt0eXBlOiAnU0VUX1VTRVInLCBwYXlsb2FkOiBvYXV0aFVzZXJ9O1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkQWN0aW9ucyA9IFtzZXRVc2VyQWN0aW9uXTtcclxuICAgICAgICBjb25zdCBpc0xvZ2dlZEluID0gYXdhaXQgc3RvcmUuZGlzcGF0Y2gobG9naW4oe29hdXRoOiBvYXV0aFVzZXIub2F1dGh9KSk7XHJcbiAgICAgICAgZXhwZWN0KGlzTG9nZ2VkSW4pLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KHN0b3JlLmdldEFjdGlvbnMoKSkudG9FcXVhbChleHBlY3RlZEFjdGlvbnMpO1xyXG4gICAgICAgIC8vIFRFU1QgUkVEVUNFUlxyXG4gICAgICAgIGV4cGVjdChyZWR1Y2VyKHt9LCBzZXRVc2VyQWN0aW9uKSkudG9FcXVhbCh7dXNlcjogb2F1dGhVc2VyfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0ZXN0KCdzaG91bGQgbG9naW4gZXhpc3RpbmcgT0FVVEggdXNlcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBnZXRPYXV0aFVzZXIgPSAoKSA9PiBpbml0aWFsU3RhdGUudXNlcnMudXNlcnNbMl07XHJcbiAgICAgICAgbW9ja0FkYXB0ZXIub25QdXQoYCR7VVNFUlNfVVJMfS8ke2dldE9hdXRoVXNlcigpLl9pZH1gKS5yZXBseSgyMDAsIGdldE9hdXRoVXNlcigpKTtcclxuICAgICAgICAvLyBURVNUIEFDVElPTlxyXG4gICAgICAgIGNvbnN0IHNldFVzZXJBY3Rpb24gPSB7dHlwZTogJ1NFVF9VU0VSJywgcGF5bG9hZDogZ2V0T2F1dGhVc2VyKCl9O1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkQWN0aW9ucyA9IFtzZXRVc2VyQWN0aW9uXTtcclxuICAgICAgICBjb25zdCBpc0xvZ2dlZEluID0gYXdhaXQgc3RvcmUuZGlzcGF0Y2gobG9naW4oZ2V0T2F1dGhVc2VyKCkpKTtcclxuICAgICAgICBleHBlY3QoaXNMb2dnZWRJbikudG9CZSh0cnVlKTtcclxuICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0QWN0aW9ucygpKS50b0VxdWFsKGV4cGVjdGVkQWN0aW9ucyk7XHJcbiAgICAgICAgLy8gVEVTVCBSRURVQ0VSXHJcbiAgICAgICAgZXhwZWN0KHJlZHVjZXIoe30sIHNldFVzZXJBY3Rpb24pKS50b0VxdWFsKHt1c2VyOiBnZXRPYXV0aFVzZXIoKX0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGVzdCgnc2hvdWxkIGdvIHVzZXIgb2ZmbGluZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBzdG9yZSA9IG1vY2tTdG9yZSh7XHJcbiAgICAgICAgICAgIC4uLmluaXRpYWxTdGF0ZSxcclxuICAgICAgICAgICAgLi4ue2F1dGhlbnRpY2F0aW9uOiB7dXNlcjogZ2V0T25saW5lVXNlcigpfX0gLy8gbW9jayBsb2dnZWQtaW4gdXNlclxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1vY2tBZGFwdGVyLm9uUHV0KFVTRVJTX1BVVF9BUEkpLnJlcGx5KDIwMCwgZ2V0T2ZmbGluZVVzZXIoKSk7XHJcbiAgICAgICAgLy8gVEVTVCBBQ1RJT05cclxuICAgICAgICBjb25zdCBzZXRVc2VyQWN0aW9uID0ge3R5cGU6ICdTRVRfVVNFUicsIHBheWxvYWQ6IGdldE9mZmxpbmVVc2VyKCl9O1xyXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkQWN0aW9ucyA9IFtzZXRVc2VyQWN0aW9uXTtcclxuICAgICAgICBhd2FpdCBzdG9yZS5kaXNwYXRjaChvbmxpbmUoZmFsc2UpKTtcclxuICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0QWN0aW9ucygpKS50b0VxdWFsKGV4cGVjdGVkQWN0aW9ucyk7XHJcbiAgICAgICAgLy8gVEVTVCBSRURVQ0VSXHJcbiAgICAgICAgZXhwZWN0KHJlZHVjZXIoe30sIHNldFVzZXJBY3Rpb24pKS50b0VxdWFsKHt1c2VyOiBnZXRPZmZsaW5lVXNlcigpfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0ZXN0KCdzaG91bGQgbG9nb3V0IHVzZXInLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja0FkYXB0ZXIub25QdXQoVVNFUlNfUFVUX0FQSSkucmVwbHkoMjAwLCBnZXRPZmZsaW5lVXNlcigpKTtcclxuICAgICAgICAvLyBURVNUIEFDVElPTlxyXG4gICAgICAgIGNvbnN0IHNldFVzZXJBY3Rpb24gPSB7dHlwZTogJ1NFVF9VU0VSJywgcGF5bG9hZDogbnVsbH07XHJcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRBY3Rpb25zID0gW3NldFVzZXJBY3Rpb25dO1xyXG4gICAgICAgIGF3YWl0IHN0b3JlLmRpc3BhdGNoKGxvZ291dCgpKTtcclxuICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0QWN0aW9ucygpKS50b0VxdWFsKGV4cGVjdGVkQWN0aW9ucyk7XHJcbiAgICAgICAgLy8gVEVTVCBSRURVQ0VSXHJcbiAgICAgICAgZXhwZWN0KHJlZHVjZXIoe30sIHNldFVzZXJBY3Rpb24pKS50b0VxdWFsKHt1c2VyOiBudWxsfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0ZXN0KCdzaG91bGQgbG9nb3V0IE9BVVRIIHVzZXInLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2V0T2F1dGhVc2VyID0gKCkgPT4gaW5pdGlhbFN0YXRlLnVzZXJzLnVzZXJzWzJdO1xyXG4gICAgICAgIHN0b3JlID0gbW9ja1N0b3JlKHtcclxuICAgICAgICAgICAgLi4uaW5pdGlhbFN0YXRlLFxyXG4gICAgICAgICAgICAuLi57YXV0aGVudGljYXRpb246IHt1c2VyOiBnZXRPYXV0aFVzZXIoKX19IC8vIG1vY2sgbG9nZ2VkLWluIHVzZXJcclxuICAgICAgICB9KTtcclxuICAgICAgICBtb2NrQWRhcHRlci5vblB1dChgJHtVU0VSU19VUkx9LyR7Z2V0T2F1dGhVc2VyKCkuX2lkfWApLnJlcGx5KDIwMCwgZ2V0T2F1dGhVc2VyKCkpO1xyXG4gICAgICAgIC8vIFRFU1QgQUNUSU9OXHJcbiAgICAgICAgY29uc3Qgc2V0VXNlckFjdGlvbiA9IHt0eXBlOiAnU0VUX1VTRVInLCBwYXlsb2FkOiBudWxsfTtcclxuICAgICAgICBjb25zdCBleHBlY3RlZEFjdGlvbnMgPSBbc2V0VXNlckFjdGlvbl07XHJcbiAgICAgICAgYXdhaXQgc3RvcmUuZGlzcGF0Y2gobG9nb3V0KCkpO1xyXG4gICAgICAgIGV4cGVjdChzdG9yZS5nZXRBY3Rpb25zKCkpLnRvRXF1YWwoZXhwZWN0ZWRBY3Rpb25zKTtcclxuICAgICAgICAvLyBURVNUIFJFRFVDRVJcclxuICAgICAgICBleHBlY3QocmVkdWNlcih7fSwgc2V0VXNlckFjdGlvbikpLnRvRXF1YWwoe3VzZXI6IG51bGx9KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/redux/reducers/__tests__/authentication.test.js\n");

/***/ })

}]);