(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n\nmodule.exports = _arrayWithHoles;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/arrayWithHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _iterableToArrayLimit(arr, i) {\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n  var _e = undefined;\n\n  try {\n    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nmodule.exports = _iterableToArrayLimit;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");\n}\n\nmodule.exports = _nonIterableRest;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/nonIterableRest.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ \"./node_modules/@babel/runtime/helpers/arrayWithHoles.js\");\n\nvar iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ \"./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js\");\n\nvar nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ \"./node_modules/@babel/runtime/helpers/nonIterableRest.js\");\n\nfunction _slicedToArray(arr, i) {\n  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();\n}\n\nmodule.exports = _slicedToArray;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/slicedToArray.js?");

/***/ }),

/***/ "./src/components/CV/Section.js":
/*!**************************************!*\
  !*** ./src/components/CV/Section.js ***!
  \**************************************/
/*! exports provided: Left, Middle, Right, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Left\", function() { return Left; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Middle\", function() { return Middle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Right\", function() { return Right; });\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/toConsumableArray.js\");\n/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap_Collapse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Collapse */ \"./node_modules/react-bootstrap/Collapse.js\");\n/* harmony import */ var react_bootstrap_Collapse__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Collapse__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap/Button */ \"./node_modules/react-bootstrap/Button.js\");\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nvar Left = react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment,\n    Middle = react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment,\n    Right = react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment; // just for readability\n\nvar Section = function Section(props) {\n  var title = props.title,\n      _props$opened = props.opened,\n      opened = _props$opened === void 0 ? true : _props$opened,\n      _props$rows = props.rows,\n      rows = _props$rows === void 0 ? 1 : _props$rows,\n      _props$cols = props.cols,\n      cols = _props$cols === void 0 ? 2 : _props$cols;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(opened),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),\n      open = _useState2[0],\n      setOpen = _useState2[1];\n\n  var sectionRows = [];\n\n  if (rows === 1) {\n    if (props.children.length > 3) {\n      console.log(\"--- You should specify number of rows for \".concat(String(title), \" section\"));\n    }\n\n    var left, middle, right;\n    var childrenLength = props.children.length;\n\n    if (!childrenLength || childrenLength === 1) {\n      middle = props.children;\n    } else if (childrenLength === 2) {\n      var _props$children = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(props.children, 2);\n\n      left = _props$children[0];\n      middle = _props$children[1];\n    } else if (childrenLength === 3) {\n      var _props$children2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(props.children, 3);\n\n      left = _props$children2[0];\n      middle = _props$children2[1];\n      right = _props$children2[2];\n    }\n\n    sectionRows[0] = {\n      left: left,\n      middle: middle,\n      right: right\n    };\n  } else {\n    var elements = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(props.children);\n\n    if (rows >= 2 && elements.length > 1) {\n      var _left, _middle, _right;\n\n      if (elements.length === 2) {\n        for (var i = 0; elements.length !== 0; i++) {\n          var _elements = elements;\n\n          var _elements2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_elements, 1);\n\n          _middle = _elements2[0];\n          sectionRows[i] = {\n            middle: _middle\n          };\n          elements = elements.splice(1);\n        }\n      } else if (cols === 2 && elements.length >= 4) {\n        for (var _i = 0; elements.length !== 0; _i++) {\n          var _elements3 = elements;\n\n          var _elements4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_elements3, 2);\n\n          _left = _elements4[0];\n          _middle = _elements4[1];\n          sectionRows[_i] = {\n            left: _left,\n            middle: _middle\n          };\n          elements = elements.splice(2);\n        }\n      } else if (cols === 3 && elements.length >= 6) {\n        for (var _i2 = 0; elements.length !== 0; _i2++) {\n          var _elements5 = elements;\n\n          var _elements6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_elements5, 3);\n\n          _left = _elements6[0];\n          _middle = _elements6[1];\n          _right = _elements6[2];\n          sectionRows[_i2] = {\n            left: _left,\n            middle: _middle,\n            right: _right\n          };\n          elements = elements.splice(3);\n        }\n      }\n    }\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, title && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n    className: \"flex-container\"\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n    className: \"flex-left-column\"\n  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n    className: \"flex-middle-column\"\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    block: true,\n    variant: \"outline-secondary\",\n    size: \"sm\",\n    \"aria-controls\": \"collapse-text\",\n    \"aria-expanded\": open,\n    className: \"section-title\",\n    onClick: function onClick() {\n      return setOpen(!open);\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"i\", {\n    className: \"section-title-icon fas fa-angle-\".concat(open ? 'down' : 'right', \" fa-lg\")\n  }), title.toUpperCase())), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n    className: \"flex-right-column\"\n  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap_Collapse__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    \"in\": open\n  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", null, sectionRows.map(function (row, index) {\n    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n      key: index,\n      className: \"flex-container\"\n    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n      className: \"flex-left-column\"\n    }, row.left), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n      className: \"flex-middle-column\"\n    }, row.middle), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(\"div\", {\n      className: \"flex-right-column\"\n    }, row.right));\n  }))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Section);\n\n//# sourceURL=webpack:///./src/components/CV/Section.js?");

/***/ })

}]);