(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./src/components/People/__tests__/People.test.js":
/*!********************************************************!*\
  !*** ./src/components/People/__tests__/People.test.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_test_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-test-renderer */ \"./node_modules/react-test-renderer/index.js\");\n/* harmony import */ var react_test_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_test_renderer__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var enzyme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! enzyme */ \"./node_modules/enzyme/build/index.js\");\n/* harmony import */ var enzyme__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(enzyme__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _People__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../People */ \"./src/components/People/People.js\");\n/* harmony import */ var _common_ConfirmationModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/ConfirmationModal */ \"./src/components/common/ConfirmationModal.js\");\n/* harmony import */ var _lang_en__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lang/en */ \"./src/lang/en.js\");\n\n\n\n\n\n\njest.mock('react-redux', function () {\n  return {\n    connect: function connect(mapStateToProps, mapDispatchToProps) {\n      return function (ReactComponent) {\n        return {\n          mapStateToProps: mapStateToProps,\n          mapDispatchToProps: mapDispatchToProps,\n          ReactComponent: ReactComponent\n        };\n      };\n    },\n    useSelector: function useSelector() {\n      return {\n        loggedUser: {\n          email: 'alexanderlebed999@gmail.com'\n        },\n        translation: {\n          PEOPLE: {},\n          COMMON: {}\n        },\n        COMMON: {}\n      };\n    }\n  };\n});\ndescribe('<People/>', function () {\n  var props = {\n    user: {\n      _id: '111',\n      username: 'Current User',\n      email: 'alexanderlebed999@gmail.com',\n      password: 'password',\n      pictureUrl: '',\n      online: true,\n      lastTime: 1519294933743,\n      oauth: ''\n    },\n    users: [{\n      _id: '111',\n      username: 'Current User',\n      email: 'alexanderlebed999@gmail.com',\n      password: 'user-password',\n      pictureUrl: '',\n      online: true,\n      lastTime: 1519294933743,\n      oauth: ''\n    }, {\n      _id: '222',\n      username: 'Alice',\n      email: 'alice@gmail.com',\n      password: 'alice-password',\n      pictureUrl: '',\n      online: true,\n      lastTime: 1518346740388,\n      oauth: ''\n    }, {\n      _id: '333',\n      username: 'Bob',\n      email: 'bob@mail.com',\n      password: 'bob-password',\n      pictureUrl: '',\n      online: true,\n      lastTime: 1518346740388,\n      oauth: ''\n    }],\n    deleteUser: jest.fn(),\n    translation: _lang_en__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    history: {\n      push: jest.fn()\n    }\n  };\n  var targetUser = props.users[1];\n  test('should match snapshot', function () {\n    var wrapper = react_test_renderer__WEBPACK_IMPORTED_MODULE_1___default.a.create(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    var tree = wrapper.toJSON();\n    expect(tree).toMatchSnapshot();\n  });\n  test('should render people', function () {\n    var wrapper = Object(enzyme__WEBPACK_IMPORTED_MODULE_2__[\"shallow\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    var userRows = wrapper.find(_People__WEBPACK_IMPORTED_MODULE_3__[\"UserRow\"]);\n    expect(userRows.exists()).toEqual(true);\n    expect(userRows.length).toEqual(3);\n    expect(wrapper.instance().props.users).toEqual(props.users);\n  });\n  test('should alert confirmation on delete user', function () {\n    var wrapper = Object(enzyme__WEBPACK_IMPORTED_MODULE_2__[\"mount\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    var confirmation = wrapper.find(_common_ConfirmationModal__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    expect(confirmation.exists()).toEqual(false);\n    expect(wrapper.instance().state.deleteUserId).toEqual('');\n    var button = wrapper.find(\"button#delete-user-\".concat(targetUser._id));\n    expect(button.exists()).toEqual(true);\n    button.simulate('click');\n    confirmation = wrapper.find(_common_ConfirmationModal__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    expect(confirmation.exists()).toEqual(true);\n    expect(wrapper.instance().state.deleteUserId).toEqual(targetUser._id);\n  });\n  test('should route to conversation on \\'write message\\' click', function () {\n    var spyPush = jest.spyOn(props.history, 'push');\n    var wrapper = Object(enzyme__WEBPACK_IMPORTED_MODULE_2__[\"mount\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    expect(spyPush).toHaveBeenCalledTimes(0);\n    var button = wrapper.find(\"button#write-user-\".concat(targetUser._id));\n    expect(button.exists()).toEqual(true);\n    button.simulate('click');\n    expect(spyPush).toHaveBeenCalledTimes(1);\n    expect(spyPush).toHaveBeenLastCalledWith(\"/conversation?userIds=\".concat(targetUser._id));\n    spyPush.mockRestore();\n  });\n  test('should expand user image on image click', function () {\n    var wrapper = Object(enzyme__WEBPACK_IMPORTED_MODULE_2__[\"mount\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    var userPictureModal = wrapper.find(\".profile-modal\");\n    expect(userPictureModal.exists()).toEqual(false);\n    var userPicture = wrapper.find(\"img#user-picture-\".concat(targetUser._id));\n    expect(userPicture.exists()).toEqual(true);\n    userPicture.simulate('click');\n    userPictureModal = wrapper.find(\".profile-modal\");\n    expect(userPictureModal.exists()).toEqual(true);\n  });\n});\n\n//# sourceURL=webpack:///./src/components/People/__tests__/People.test.js?");

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