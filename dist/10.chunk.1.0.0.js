(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./src/components/People/People.js":
/*!*****************************************!*\
  !*** ./src/components/People/People.js ***!
  \*****************************************/
/*! exports provided: People, default, UserRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"People\", function() { return People; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserRow\", function() { return UserRow; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! query-string */ \"./node_modules/query-string/index.js\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap/Container */ \"./node_modules/react-bootstrap/Container.js\");\n/* harmony import */ var react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap/Row */ \"./node_modules/react-bootstrap/Row.js\");\n/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-bootstrap/Col */ \"./node_modules/react-bootstrap/Col.js\");\n/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-bootstrap/Table */ \"./node_modules/react-bootstrap/Table.js\");\n/* harmony import */ var react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-bootstrap/Form */ \"./node_modules/react-bootstrap/Form.js\");\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-bootstrap/Modal */ \"./node_modules/react-bootstrap/Modal.js\");\n/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-bootstrap/InputGroup */ \"./node_modules/react-bootstrap/InputGroup.js\");\n/* harmony import */ var react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-bootstrap/Button */ \"./node_modules/react-bootstrap/Button.js\");\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-bootstrap/Image */ \"./node_modules/react-bootstrap/Image.js\");\n/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var react_bootstrap_Jumbotron__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-bootstrap/Jumbotron */ \"./node_modules/react-bootstrap/Jumbotron.js\");\n/* harmony import */ var react_bootstrap_Jumbotron__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Jumbotron__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../constants */ \"./src/constants.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n/* harmony import */ var _redux_reducers_users__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../redux/reducers/users */ \"./src/redux/reducers/users.js\");\n/* harmony import */ var _common_ConfirmationModal__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../common/ConfirmationModal */ \"./src/components/common/ConfirmationModal.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar People =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(People, _React$Component);\n\n  function People(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, People);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(People).call(this, props));\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"state\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"showUserProfile\", function (user) {\n      return _this.setState({\n        clickedUser: user\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"showDeleteConfirmation\", function (userId) {\n      return _this.setState({\n        deleteUserId: userId\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"hideDeleteConfirmation\", function () {\n      return _this.setState({\n        deleteUserId: ''\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"deleteUser\", function () {\n      _this.props.deleteUser(_this.state.deleteUserId);\n\n      _this.hideDeleteConfirmation();\n    });\n\n    _this.state = {\n      searchText: '',\n      deleteUserId: '',\n      clickedUser: null\n    };\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(People, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var _this$props = this.props,\n          users = _this$props.users,\n          history = _this$props.history,\n          translation = _this$props.translation;\n      var PEOPLE = translation.PEOPLE,\n          COMMON = translation.COMMON;\n\n      if (this.state.searchText) {\n        users = users.filter(function (e) {\n          return e.username.toLowerCase().indexOf(_this2.state.searchText.toLowerCase()) !== -1;\n        });\n      }\n\n      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Container__WEBPACK_IMPORTED_MODULE_10___default.a, {\n        fluid: true\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_11___default.a, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_12___default.a, {\n        md: {\n          span: 10,\n          offset: 1\n        },\n        lg: {\n          span: 8,\n          offset: 2\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_11___default.a, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_12___default.a, {\n        xs: 12,\n        sm: 6\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_16___default.a, {\n        size: \"sm\",\n        className: \"search-container\"\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_16___default.a.Prepend, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"i\", {\n        className: \"fas fa-search\"\n      })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_14___default.a.Control, {\n        placeholder: PEOPLE.SEARCH_PEOPLE,\n        \"aria-label\": \"Search people\",\n        \"aria-describedby\": \"search\",\n        className: \"search-input\",\n        value: this.state.searchText,\n        onChange: function onChange(e) {\n          return _this2.setState({\n            searchText: e.target.value\n          });\n        }\n      })))), users.length === 0 ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Jumbotron__WEBPACK_IMPORTED_MODULE_19___default.a, {\n        className: \"text-center\"\n      }, COMMON.NO_RESULTS) : react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_13___default.a, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"tbody\", null, users.map(function (user) {\n        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(UserRow, {\n          key: user._id,\n          history: history,\n          user: user,\n          showUserProfile: function showUserProfile(u) {\n            return _this2.showUserProfile(u);\n          },\n          showDeleteConfirmation: function showDeleteConfirmation(userId) {\n            return _this2.showDeleteConfirmation(userId);\n          }\n        });\n      }))), this.state.clickedUser && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_15___default.a, {\n        show: this.state.clickedUser !== null,\n        className: \"profile-modal\",\n        onHide: function onHide() {\n          return _this2.showUserProfile(null);\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_15___default.a.Header, {\n        closeButton: true\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_15___default.a.Title, null, this.state.clickedUser.username)), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_15___default.a.Body, {\n        style: {\n          textAlign: 'center'\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_18___default.a, {\n        className: \"profile-modal-picture\",\n        src: this.state.clickedUser.pictureUrl ? this.state.clickedUser.pictureUrl : '/images/default-profile.jpg'\n      }))), this.state.deleteUserId && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_common_ConfirmationModal__WEBPACK_IMPORTED_MODULE_23__[\"default\"], {\n        title: COMMON.DELETE_CONFIRMATION,\n        body: PEOPLE.DELETE_CONFIRMATION,\n        onConfirm: function onConfirm() {\n          return _this2.deleteUser();\n        },\n        onCancel: function onCancel() {\n          return _this2.hideDeleteConfirmation();\n        }\n      }))));\n    }\n  }]);\n\n  return People;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__[\"connect\"])(function (state) {\n  return {\n    user: state.authentication.user,\n    users: state.users.users,\n    translation: state.translation\n  };\n}, {\n  deleteUser: _redux_reducers_users__WEBPACK_IMPORTED_MODULE_22__[\"deleteUser\"]\n})(People));\nvar UserRow = function UserRow(props) {\n  var user = props.user,\n      showUserProfile = props.showUserProfile,\n      showDeleteConfirmation = props.showDeleteConfirmation,\n      history = props.history;\n\n  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_8__[\"useSelector\"])(function (state) {\n    return {\n      loggedUser: state.authentication.user,\n      translation: state.translation\n    };\n  }),\n      loggedUser = _useSelector.loggedUser,\n      translation = _useSelector.translation;\n\n  var isAdmin = loggedUser.email === _constants__WEBPACK_IMPORTED_MODULE_20__[\"adminEmail\"];\n  var imageStyle = user.online ? _constants__WEBPACK_IMPORTED_MODULE_20__[\"ONLINE_STYLE\"] : {};\n\n  var goToConversationWith = function goToConversationWith(userIds) {\n    var query = query_string__WEBPACK_IMPORTED_MODULE_9___default.a.stringify({\n      userIds: userIds\n    });\n    history.push(\"/conversation?\".concat(query));\n  };\n\n  return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"tr\", {\n    key: user._id,\n    id: user._id\n  }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"td\", {\n    style: {\n      padding: 10\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_11___default.a, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_12___default.a, {\n    xs: 12,\n    sm: 6\n  }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n    className: \"profile-picture-wrapper cursor\",\n    onClick: function onClick() {\n      return showUserProfile(user);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_18___default.a, {\n    id: \"user-picture-\".concat(user._id),\n    roundedCircle: true,\n    style: imageStyle,\n    className: \"profile-picture\",\n    src: user.pictureUrl ? user.pictureUrl : '/images/default-profile.jpg'\n  })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", null, user.username, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n    className: \"last-seen\"\n  }, !user.online && \"\".concat(translation.PEOPLE.LAST_SEEN, \" \").concat(Object(_utils__WEBPACK_IMPORTED_MODULE_21__[\"timestampToHumanDate\"])(user.lastTime, false, translation))))), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_12___default.a, {\n    xs: 12,\n    sm: 6\n  }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n    className: \"pull-right pt-1 pt-sm-2\"\n  }, isAdmin && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_17___default.a, {\n    id: \"delete-user-\".concat(user._id),\n    size: \"sm\",\n    variant: \"outline-danger\",\n    onClick: function onClick() {\n      return showDeleteConfirmation(user._id);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"i\", {\n    className: \"far fa-trash-alt\",\n    style: {\n      marginRight: 5\n    }\n  }), \" \", translation.COMMON.DELETE), ' '), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_17___default.a, {\n    id: \"write-user-\".concat(user._id),\n    size: \"sm\",\n    variant: \"outline-dark\",\n    onClick: function onClick() {\n      return goToConversationWith([user._id]);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"i\", {\n    className: \"far fa-paper-plane\",\n    style: {\n      marginRight: 5\n    }\n  }), \" \", translation.PEOPLE.WRITE_MESSAGE))))));\n};\nUserRow.displayName = 'UserRow';\n\n//# sourceURL=webpack:///./src/components/People/People.js?");

/***/ }),

/***/ "./src/components/People/__tests__/People.test.js":
/*!********************************************************!*\
  !*** ./src/components/People/__tests__/People.test.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_test_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-test-renderer */ \"./node_modules/react-test-renderer/index.js\");\n/* harmony import */ var react_test_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_test_renderer__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var enzyme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! enzyme */ \"./node_modules/enzyme/build/index.js\");\n/* harmony import */ var enzyme__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(enzyme__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _People__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../People */ \"./src/components/People/People.js\");\n/* harmony import */ var _common_ConfirmationModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/ConfirmationModal */ \"./src/components/common/ConfirmationModal.js\");\n/* harmony import */ var _lang_en__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lang/en */ \"./src/lang/en.js\");\n\n\n\n\n\n\njest.mock('react-redux', function () {\n  return {\n    connect: function connect(mapStateToProps, mapDispatchToProps) {\n      return function (ReactComponent) {\n        return {\n          mapStateToProps: mapStateToProps,\n          mapDispatchToProps: mapDispatchToProps,\n          ReactComponent: ReactComponent\n        };\n      };\n    },\n    useSelector: function useSelector() {\n      return {\n        loggedUser: {\n          email: 'alexanderlebed999@gmail.com'\n        },\n        translation: {\n          PEOPLE: {},\n          COMMON: {}\n        },\n        COMMON: {}\n      };\n    }\n  };\n});\ndescribe('<People/>', function () {\n  var props = {\n    user: {\n      _id: '111',\n      username: 'Current User',\n      email: 'alexanderlebed999@gmail.com',\n      password: 'password',\n      pictureUrl: '',\n      online: true,\n      lastTime: 1519294933743,\n      oauth: ''\n    },\n    users: [{\n      _id: '111',\n      username: 'Current User',\n      email: 'alexanderlebed999@gmail.com',\n      password: 'user-password',\n      pictureUrl: '',\n      online: true,\n      lastTime: 1519294933743,\n      oauth: ''\n    }, {\n      _id: '222',\n      username: 'Alice',\n      email: 'alice@gmail.com',\n      password: 'alice-password',\n      pictureUrl: '',\n      online: true,\n      lastTime: 1518346740388,\n      oauth: ''\n    }, {\n      _id: '333',\n      username: 'Bob',\n      email: 'bob@mail.com',\n      password: 'bob-password',\n      pictureUrl: '',\n      online: true,\n      lastTime: 1518346740388,\n      oauth: ''\n    }],\n    deleteUser: jest.fn(),\n    translation: _lang_en__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    history: {\n      push: jest.fn()\n    }\n  };\n  var targetUser = props.users[1];\n  test('should match snapshot', function () {\n    var wrapper = react_test_renderer__WEBPACK_IMPORTED_MODULE_1___default.a.create(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    var tree = wrapper.toJSON();\n    expect(tree).toMatchSnapshot();\n  });\n  test('should render people', function () {\n    var wrapper = Object(enzyme__WEBPACK_IMPORTED_MODULE_2__[\"shallow\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    var userRows = wrapper.find(_People__WEBPACK_IMPORTED_MODULE_3__[\"UserRow\"]);\n    expect(userRows.exists()).toEqual(true);\n    expect(userRows.length).toEqual(3);\n    expect(wrapper.instance().props.users).toEqual(props.users);\n  });\n  test('should alert confirmation on delete user', function () {\n    var wrapper = Object(enzyme__WEBPACK_IMPORTED_MODULE_2__[\"mount\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    var confirmation = wrapper.find(_common_ConfirmationModal__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    expect(confirmation.exists()).toEqual(false);\n    expect(wrapper.instance().state.deleteUserId).toEqual('');\n    var button = wrapper.find(\"button#delete-user-\".concat(targetUser._id));\n    expect(button.exists()).toEqual(true);\n    button.simulate('click');\n    confirmation = wrapper.find(_common_ConfirmationModal__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    expect(confirmation.exists()).toEqual(true);\n    expect(wrapper.instance().state.deleteUserId).toEqual(targetUser._id);\n  });\n  test('should route to conversation on \\'write message\\' click', function () {\n    var spyPush = jest.spyOn(props.history, 'push');\n    var wrapper = Object(enzyme__WEBPACK_IMPORTED_MODULE_2__[\"mount\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    expect(spyPush).toHaveBeenCalledTimes(0);\n    var button = wrapper.find(\"button#write-user-\".concat(targetUser._id));\n    expect(button.exists()).toEqual(true);\n    button.simulate('click');\n    expect(spyPush).toHaveBeenCalledTimes(1);\n    expect(spyPush).toHaveBeenLastCalledWith(\"/conversation?userIds=\".concat(targetUser._id));\n    spyPush.mockRestore();\n  });\n  test('should expand user image on image click', function () {\n    var wrapper = Object(enzyme__WEBPACK_IMPORTED_MODULE_2__[\"mount\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_People__WEBPACK_IMPORTED_MODULE_3__[\"People\"], props));\n    var userPictureModal = wrapper.find(\".profile-modal\");\n    expect(userPictureModal.exists()).toEqual(false);\n    var userPicture = wrapper.find(\"img#user-picture-\".concat(targetUser._id));\n    expect(userPicture.exists()).toEqual(true);\n    userPicture.simulate('click');\n    userPictureModal = wrapper.find(\".profile-modal\");\n    expect(userPictureModal.exists()).toEqual(true);\n  });\n});\n\n//# sourceURL=webpack:///./src/components/People/__tests__/People.test.js?");

/***/ }),

/***/ "./src/components/common/ConfirmationModal.js":
/*!****************************************************!*\
  !*** ./src/components/common/ConfirmationModal.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Modal */ \"./node_modules/react-bootstrap/Modal.js\");\n/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Button */ \"./node_modules/react-bootstrap/Button.js\");\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nvar ConfirmationModal = function ConfirmationModal(props) {\n  var translation = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"useSelector\"])(function (state) {\n    return state.translation;\n  });\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    show: true,\n    onHide: props.onCancel\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a.Header, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a.Title, null, props.title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a.Body, null, props.body), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a.Footer, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    variant: \"success\",\n    size: \"sm\",\n    onClick: props.onConfirm\n  }, translation.COMMON.YES), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    variant: \"outline-dark\",\n    size: \"sm\",\n    onClick: props.onCancel\n  }, translation.COMMON.CANCEL)));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ConfirmationModal);\n\n//# sourceURL=webpack:///./src/components/common/ConfirmationModal.js?");

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