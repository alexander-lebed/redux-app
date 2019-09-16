(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./src/components/common/ConfirmationModal.js":
/*!****************************************************!*\
  !*** ./src/components/common/ConfirmationModal.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Modal */ \"./node_modules/react-bootstrap/Modal.js\");\n/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Button */ \"./node_modules/react-bootstrap/Button.js\");\n/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nvar ConfirmationModal = function ConfirmationModal(props) {\n  var translation = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"useSelector\"])(function (state) {\n    return state.translation;\n  });\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    show: true,\n    onHide: props.onCancel\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a.Header, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a.Title, null, props.title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a.Body, null, props.body), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a.Footer, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    variant: \"success\",\n    size: \"sm\",\n    onClick: props.onConfirm\n  }, translation.COMMON.YES), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    variant: \"outline-dark\",\n    size: \"sm\",\n    onClick: props.onCancel\n  }, translation.COMMON.CANCEL)));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ConfirmationModal);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tb24vQ29uZmlybWF0aW9uTW9kYWwuanM/MjgzZiJdLCJuYW1lcyI6WyJDb25maXJtYXRpb25Nb2RhbCIsInRyYW5zbGF0aW9uIiwidXNlU2VsZWN0b3IiLCJzdGF0ZSIsInByb3BzIiwib25DYW5jZWwiLCJvbkNvbmZpcm0iXSwibWFwcGluZ3MiOiJBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFXQSxJQUFNQSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLFFBQWtCO0FBQ3hDLE1BQU1DLFdBQXdCLEdBQUdDLCtEQUFXLENBQUMsaUJBQUs7QUFBQSxXQUFJQyxLQUFLLENBQVQ7QUFBbEQsR0FBNEMsQ0FBNUM7QUFDQSxTQUNJO0FBQU8sUUFBSSxFQUFYO0FBQVksVUFBTSxFQUFFQyxLQUFLLENBQUNDO0FBQTFCLEtBQ0ksMkRBQUMsNERBQUQsZUFDSSwyREFBQyw0REFBRCxjQUNLRCxLQUFLLENBSGxCLEtBRVEsQ0FESixDQURKLEVBTUksMkRBQUMsNERBQUQsYUFDS0EsS0FBSyxDQVBkLElBTUksQ0FOSixFQVNJLDJEQUFDLDREQUFELGVBQ0k7QUFDSSxXQUFPLEVBRFg7QUFFSSxRQUFJLEVBRlI7QUFHSSxXQUFPLEVBQUVBLEtBQUssQ0FBQ0U7QUFIbkIsS0FLS0wsV0FBVyxDQUFYQSxPQU5ULEdBQ0ksQ0FESixFQVFJO0FBQ0ksV0FBTyxFQURYO0FBRUksUUFBSSxFQUZSO0FBR0ksV0FBTyxFQUFFRyxLQUFLLENBQUNDO0FBSG5CLEtBS0tKLFdBQVcsQ0FBWEEsT0F2QmpCLE1Ba0JZLENBUkosQ0FUSixDQURKO0FBRko7O0FBZ0NBIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvY29tbW9uL0NvbmZpcm1hdGlvbk1vZGFsLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IE1vZGFsIGZyb20gJ3JlYWN0LWJvb3RzdHJhcC9Nb2RhbCdcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICdyZWFjdC1ib290c3RyYXAvQnV0dG9uJztcclxuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zbGF0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICAgIHRpdGxlOiBOb2RlIHwgc3RyaW5nLFxyXG4gICAgYm9keTogTm9kZSB8IHN0cmluZyxcclxuICAgIG9uQ29uZmlybTogRnVuY3Rpb24sXHJcbiAgICBvbkNhbmNlbDogRnVuY3Rpb24sXHJcbn1cclxuXHJcbmNvbnN0IENvbmZpcm1hdGlvbk1vZGFsID0gKHByb3BzOiBQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gc3RhdGUudHJhbnNsYXRpb24pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8TW9kYWwgc2hvdyBvbkhpZGU9e3Byb3BzLm9uQ2FuY2VsfT5cclxuICAgICAgICAgICAgPE1vZGFsLkhlYWRlciA+XHJcbiAgICAgICAgICAgICAgICA8TW9kYWwuVGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAge3Byb3BzLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbC5UaXRsZT5cclxuICAgICAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XHJcbiAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxyXG4gICAgICAgICAgICAgICAge3Byb3BzLmJvZHl9XHJcbiAgICAgICAgICAgIDwvTW9kYWwuQm9keT5cclxuICAgICAgICAgICAgPE1vZGFsLkZvb3Rlcj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICB2YXJpYW50PSdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemU9J3NtJ1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQ29uZmlybX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7dHJhbnNsYXRpb24uQ09NTU9OLllFU31cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9J291dGxpbmUtZGFyaydcclxuICAgICAgICAgICAgICAgICAgICBzaXplPSdzbSdcclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkNhbmNlbH1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7dHJhbnNsYXRpb24uQ09NTU9OLkNBTkNFTH1cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L01vZGFsLkZvb3Rlcj5cclxuICAgICAgICA8L01vZGFsPlxyXG4gICAgKVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybWF0aW9uTW9kYWw7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/common/ConfirmationModal.js\n");

/***/ })

}]);