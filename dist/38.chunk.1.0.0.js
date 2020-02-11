(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./src/helpers/inputValidation.js":
/*!****************************************!*\
  !*** ./src/helpers/inputValidation.js ***!
  \****************************************/
/*! exports provided: isUsernameInvalid, isEmailInvalid, isPasswordInvalid, isConfirmPasswordInvalid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isUsernameInvalid\", function() { return isUsernameInvalid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isEmailInvalid\", function() { return isEmailInvalid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isPasswordInvalid\", function() { return isPasswordInvalid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isConfirmPasswordInvalid\", function() { return isConfirmPasswordInvalid; });\n/* eslint-disable no-useless-escape */\nfunction isUsernameInvalid() {\n  var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n  if (username.length === 0 || username.length >= 3) {\n    return false;\n  } else if (username.length < 3) {\n    return true;\n  }\n}\nfunction isEmailInvalid() {\n  var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  var emailRegEx = /^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n  return !(email.length === 0 || emailRegEx.test(email));\n}\nfunction isPasswordInvalid() {\n  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  return !(password.length === 0 || password.length >= 5 && /^\\S*$/.test(password));\n}\nfunction isConfirmPasswordInvalid() {\n  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  var confirmPassword = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n\n  if (password.length === 0 || confirmPassword.length === 0) {\n    return false;\n  }\n\n  return password !== confirmPassword;\n} // export function getUrlValidationState(url = '') {\n//     if (url.length === 0) {\n//         return null;\n//     }\n//     const expr = /^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#]\\S*)?$/i;\n//     return expr.test(url) ? 'success' : 'error';\n// }\n\n//# sourceURL=webpack:///./src/helpers/inputValidation.js?");

/***/ })

}]);