(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ "./node_modules/react-bootstrap/InputGroup.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/InputGroup.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.default = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\"));\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _createWithBsPrefix = _interopRequireDefault(__webpack_require__(/*! ./utils/createWithBsPrefix */ \"./node_modules/react-bootstrap/utils/createWithBsPrefix.js\"));\n\nvar _ThemeProvider = __webpack_require__(/*! ./ThemeProvider */ \"./node_modules/react-bootstrap/ThemeProvider.js\");\n\n/**\n *\n * @property {InputGroupAppend} Append\n * @property {InputGroupPrepend} Prepend\n * @property {InputGroupText} Text\n * @property {InputGroupRadio} Radio\n * @property {InputGroupCheckbox} Checkbox\n */\nvar InputGroup =\n/*#__PURE__*/\nfunction (_React$Component) {\n  (0, _inheritsLoose2.default)(InputGroup, _React$Component);\n\n  function InputGroup() {\n    return _React$Component.apply(this, arguments) || this;\n  }\n\n  var _proto = InputGroup.prototype;\n\n  _proto.render = function render() {\n    var _this$props = this.props,\n        bsPrefix = _this$props.bsPrefix,\n        size = _this$props.size,\n        className = _this$props.className,\n        _this$props$as = _this$props.as,\n        Component = _this$props$as === void 0 ? 'div' : _this$props$as,\n        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [\"bsPrefix\", \"size\", \"className\", \"as\"]);\n    return _react.default.createElement(Component, (0, _extends2.default)({}, props, {\n      className: (0, _classnames.default)(className, bsPrefix, size && bsPrefix + \"-\" + size)\n    }));\n  };\n\n  return InputGroup;\n}(_react.default.Component);\n\nvar InputGroupAppend = (0, _createWithBsPrefix.default)('input-group-append');\nvar InputGroupPrepend = (0, _createWithBsPrefix.default)('input-group-prepend');\nvar InputGroupText = (0, _createWithBsPrefix.default)('input-group-text', {\n  Component: 'span'\n});\n\nvar InputGroupCheckbox = function InputGroupCheckbox(props) {\n  return _react.default.createElement(InputGroupText, null, _react.default.createElement(\"input\", (0, _extends2.default)({\n    type: \"checkbox\"\n  }, props)));\n};\n\nvar InputGroupRadio = function InputGroupRadio(props) {\n  return _react.default.createElement(InputGroupText, null, _react.default.createElement(\"input\", (0, _extends2.default)({\n    type: \"radio\"\n  }, props)));\n};\n\nvar DecoratedInputGroup = (0, _ThemeProvider.createBootstrapComponent)(InputGroup, 'input-group');\nDecoratedInputGroup.Text = InputGroupText;\nDecoratedInputGroup.Radio = InputGroupRadio;\nDecoratedInputGroup.Checkbox = InputGroupCheckbox;\nDecoratedInputGroup.Append = InputGroupAppend;\nDecoratedInputGroup.Prepend = InputGroupPrepend;\nvar _default = DecoratedInputGroup;\nexports.default = _default;\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/react-bootstrap/InputGroup.js?");

/***/ }),

/***/ "./node_modules/react-bootstrap/Table.js":
/*!***********************************************!*\
  !*** ./node_modules/react-bootstrap/Table.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.default = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\"));\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _ThemeProvider = __webpack_require__(/*! ./ThemeProvider */ \"./node_modules/react-bootstrap/ThemeProvider.js\");\n\nvar Table =\n/*#__PURE__*/\nfunction (_React$Component) {\n  (0, _inheritsLoose2.default)(Table, _React$Component);\n\n  function Table() {\n    return _React$Component.apply(this, arguments) || this;\n  }\n\n  var _proto = Table.prototype;\n\n  _proto.render = function render() {\n    var _this$props = this.props,\n        bsPrefix = _this$props.bsPrefix,\n        className = _this$props.className,\n        striped = _this$props.striped,\n        bordered = _this$props.bordered,\n        borderless = _this$props.borderless,\n        hover = _this$props.hover,\n        size = _this$props.size,\n        variant = _this$props.variant,\n        responsive = _this$props.responsive,\n        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [\"bsPrefix\", \"className\", \"striped\", \"bordered\", \"borderless\", \"hover\", \"size\", \"variant\", \"responsive\"]);\n    var classes = (0, _classnames.default)(bsPrefix, className, variant && bsPrefix + \"-\" + variant, size && bsPrefix + \"-\" + size, striped && bsPrefix + \"-striped\", bordered && bsPrefix + \"-bordered\", borderless && bsPrefix + \"-borderless\", hover && bsPrefix + \"-hover\");\n\n    var table = _react.default.createElement(\"table\", (0, _extends2.default)({}, props, {\n      className: classes\n    }));\n\n    if (responsive) {\n      var responsiveClass = bsPrefix + \"-responsive\";\n\n      if (typeof responsive === 'string') {\n        responsiveClass = responsiveClass + \"-\" + responsive;\n      }\n\n      return _react.default.createElement(\"div\", {\n        className: responsiveClass\n      }, table);\n    }\n\n    return table;\n  };\n\n  return Table;\n}(_react.default.Component);\n\nvar _default = (0, _ThemeProvider.createBootstrapComponent)(Table, 'table');\n\nexports.default = _default;\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack:///./node_modules/react-bootstrap/Table.js?");

/***/ }),

/***/ "./src/components/common/PeopleSelector.js":
/*!*************************************************!*\
  !*** ./src/components/common/PeopleSelector.js ***!
  \*************************************************/
/*! exports provided: PeopleSelector, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PeopleSelector\", function() { return PeopleSelector; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Row */ \"./node_modules/react-bootstrap/Row.js\");\n/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Col */ \"./node_modules/react-bootstrap/Col.js\");\n/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap/Table */ \"./node_modules/react-bootstrap/Table.js\");\n/* harmony import */ var react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap/Form */ \"./node_modules/react-bootstrap/Form.js\");\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap/InputGroup */ \"./node_modules/react-bootstrap/InputGroup.js\");\n/* harmony import */ var react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap/Button */ \"./node_modules/react-bootstrap/Button.js\");\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap/Image */ \"./node_modules/react-bootstrap/Image.js\");\n/* harmony import */ var react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../constants */ \"./src/constants.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\nvar PeopleSelector =\n/*#__PURE__*/\nfunction (_React$PureComponent) {\n  _inherits(PeopleSelector, _React$PureComponent);\n\n  function PeopleSelector(props) {\n    var _this;\n\n    _classCallCheck(this, PeopleSelector);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(PeopleSelector).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_this), \"state\", void 0);\n\n    _defineProperty(_assertThisInitialized(_this), \"toggleUser\", function (user) {\n      var people = _this.state.people;\n\n      if (people.map(function (e) {\n        return e._id;\n      }).includes(user._id)) {\n        _this.setState({\n          people: people.filter(function (e) {\n            return e._id !== user._id;\n          })\n        });\n      } else {\n        _this.setState({\n          people: people.concat(user)\n        });\n      }\n    });\n\n    var selectedUserIds = props.selectedUserIds,\n        users = props.users;\n    var selectedUsers = [];\n\n    if (selectedUserIds.length > 0) {\n      selectedUsers = users.filter(function (e) {\n        return selectedUserIds.includes(e._id);\n      });\n    }\n\n    _this.state = {\n      searchText: '',\n      people: selectedUsers\n    };\n    return _this;\n  }\n\n  _createClass(PeopleSelector, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var _this$state = this.state,\n          people = _this$state.people,\n          searchText = _this$state.searchText;\n      var _this$props = this.props,\n          users = _this$props.users,\n          excludedUserIds = _this$props.excludedUserIds,\n          submitButtonText = _this$props.submitButtonText,\n          onSubmit = _this$props.onSubmit,\n          onCancel = _this$props.onCancel,\n          translation = _this$props.translation;\n      users = users.filter(function (e) {\n        return !excludedUserIds.includes(e._id);\n      });\n\n      if (searchText) {\n        users = users.filter(function (e) {\n          return e.username.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;\n        });\n      }\n\n      users = Object(_utils__WEBPACK_IMPORTED_MODULE_9__[\"orderBy\"])(users, ['username']);\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"people-select-header\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_6___default.a, {\n        size: \"sm\",\n        className: \"search\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_6___default.a.Prepend, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"fas fa-search\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_5___default.a.Control, {\n        placeholder: translation.PEOPLE.SEARCH_PEOPLE,\n        \"aria-label\": \"Search people\",\n        \"aria-describedby\": \"search\",\n        className: \"search-input\",\n        value: searchText,\n        onChange: function onChange(e) {\n          return _this2.setState({\n            searchText: e.target.value\n          });\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"actions\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        size: \"sm\",\n        variant: \"outline-secondary\",\n        onClick: onCancel\n      }, translation.COMMON.CANCEL), ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {\n        size: \"sm\",\n        variant: \"success\",\n        disabled: people.length === 0,\n        onClick: function onClick() {\n          return onSubmit(people);\n        }\n      }, submitButtonText || translation.COMMON.SUBMIT))), users.length === 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"text-center\"\n      }, translation.COMMON.NO_RESULTS) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Table__WEBPACK_IMPORTED_MODULE_4___default.a, {\n        hover: true\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tbody\", null, users.map(function (user) {\n        var selected = people.map(function (e) {\n          return e._id;\n        }).includes(user._id);\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", {\n          key: user._id,\n          id: user._id\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          className: selected ? 'active' : '',\n          style: {\n            padding: 5\n          },\n          onClick: function onClick() {\n            return _this2.toggleUser(user);\n          }\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_2___default.a, {\n          noGutters: true\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_3___default.a, {\n          xs: 10\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"profile-picture-wrapper\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Image__WEBPACK_IMPORTED_MODULE_8___default.a, {\n          roundedCircle: true,\n          style: user.online ? _constants__WEBPACK_IMPORTED_MODULE_10__[\"ONLINE_STYLE\"] : {},\n          className: \"profile-picture\",\n          src: user.pictureUrl ? user.pictureUrl : '/images/default-profile.jpg'\n        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          style: {\n            fontSize: 13\n          }\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          style: {\n            fontWeight: 700\n          }\n        }, user.username), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          style: {\n            color: 'grey'\n          }\n        }, !user.online && \"\".concat(translation.PEOPLE.LAST_SEEN, \" \").concat(Object(_utils__WEBPACK_IMPORTED_MODULE_9__[\"timestampToHumanDate\"])(user.lastTime, false, translation))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_3___default.a, {\n          xs: 2\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"material-switch pull-right\",\n          style: {\n            marginTop: 12\n          }\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n          type: \"checkbox\",\n          checked: selected,\n          onChange: function onChange() {}\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n          className: \"label-success\"\n        }))))));\n      }))));\n    }\n  }]);\n\n  return PeopleSelector;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);\n\n_defineProperty(PeopleSelector, \"defaultProps\", {\n  excludedUserIds: [],\n  selectedUserIds: [],\n  submitButtonText: ''\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(function (state) {\n  return {\n    users: state.users.users,\n    translation: state.translation\n  };\n})(PeopleSelector));\n\n//# sourceURL=webpack:///./src/components/common/PeopleSelector.js?");

/***/ })

}]);