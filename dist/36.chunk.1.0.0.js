(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

/***/ "./src/components/Messages/MessageForm.js":
/*!************************************************!*\
  !*** ./src/components/Messages/MessageForm.js ***!
  \************************************************/
/*! exports provided: MessageForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MessageForm\", function() { return MessageForm; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var emoji_mart__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! emoji-mart */ \"./node_modules/emoji-mart/dist-es/index.js\");\n/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-bootstrap/Row */ \"./node_modules/react-bootstrap/Row.js\");\n/* harmony import */ var react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap/Col */ \"./node_modules/react-bootstrap/Col.js\");\n/* harmony import */ var react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-bootstrap/Form */ \"./node_modules/react-bootstrap/Form.js\");\n/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _redux_reducers_conversations__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../redux/reducers/conversations */ \"./src/redux/reducers/conversations.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar MessageForm =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(MessageForm, _React$Component);\n\n  function MessageForm(params) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MessageForm);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(MessageForm).call(this, params));\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"state\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"textAreaRef\", react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef());\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"handleKeyPress\", function (evt) {\n      if (evt.key === 'Enter' && !evt.shiftKey) {\n        evt.preventDefault();\n\n        if (_this.state.messageText) {\n          var _this$props = _this.props,\n              user = _this$props.user,\n              conversation = _this$props.conversation;\n          var emptyTime = null; // mark as null to set time on backend\n\n          var message = {\n            from: {\n              _id: user._id,\n              username: user.username\n            },\n            text: _this.state.messageText,\n            timestamp: emptyTime,\n            read: false,\n            deleted: false\n          };\n          conversation.messages.push(message);\n          conversation.timestamp = emptyTime;\n\n          _this.props.saveConversation(conversation);\n\n          _this.setState({\n            messageText: ''\n          });\n        }\n      }\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"onEmojiClick\", function () {\n      return _this.setState({\n        showEmoji: !_this.state.showEmoji\n      });\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), \"setText\", function (text) {\n      var input = _this.textAreaRef.current;\n      var selectionStart = input.selectionStart,\n          selectionEnd = input.selectionEnd,\n          value = input.value;\n      var updatedText = \"\".concat(value.substring(0, selectionStart)).concat(text).concat(value.substring(selectionEnd));\n      input.focus();\n      input.selectionEnd = selectionEnd + 7;\n\n      _this.setState({\n        messageText: updatedText\n      });\n    });\n\n    _this.state = {\n      messageText: '',\n      showEmoji: false\n    };\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(MessageForm, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var translation = this.props.translation;\n      var _this$state = this.state,\n          messageText = _this$state.messageText,\n          showEmoji = _this$state.showEmoji;\n      var messageStyle = showEmoji ? {\n        paddingRight: 0\n      } : {};\n      var emojiStyle = showEmoji ? {\n        paddingLeft: 0\n      } : {};\n      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Row__WEBPACK_IMPORTED_MODULE_10___default.a, {\n        noGutters: true\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_11___default.a, {\n        xs: 12,\n        sm: showEmoji ? 7 : 12,\n        style: messageStyle\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_12___default.a, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_12___default.a.Group, {\n        controlId: \"message-form\",\n        className: \"message-form\",\n        style: {\n          display: 'flex',\n          marginBottom: 2\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        style: {\n          flex: 1\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_12___default.a.Control, {\n        id: \"message-textarea\",\n        ref: this.textAreaRef,\n        as: \"textarea\",\n        autoFocus: true,\n        className: \"text-area\",\n        rows: 4,\n        placeholder: this.props.translation.MESSAGES.WRITE_MESSAGE,\n        value: messageText,\n        onKeyPress: this.handleKeyPress,\n        onChange: function onChange(e) {\n          return _this2.setState({\n            messageText: e.target.value\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_12___default.a.Text, {\n        className: \"text-muted d-none d-sm-block\"\n      }, this.props.translation.MESSAGES.WRITE_MESSAGE_INFO)), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(\"div\", {\n        className: \"emoji-select-area\"\n      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(emoji_mart__WEBPACK_IMPORTED_MODULE_9__[\"Emoji\"], {\n        set: \"twitter\",\n        size: 32,\n        emoji: showEmoji ? 'grinning' : 'slightly_smiling_face',\n        onClick: function onClick() {\n          return _this2.onEmojiClick();\n        }\n      }))))), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_bootstrap_Col__WEBPACK_IMPORTED_MODULE_11___default.a, {\n        xs: 12,\n        sm: showEmoji ? 5 : 12,\n        style: emojiStyle\n      }, showEmoji && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(emoji_mart__WEBPACK_IMPORTED_MODULE_9__[\"Picker\"], {\n        title: translation.MESSAGES.PICK_EMOJI,\n        emoji: \"monkey\",\n        \"native\": true,\n        onClick: function onClick(emoji) {\n          return _this2.setText(emoji[\"native\"]);\n        }\n      })));\n    }\n  }]);\n\n  return MessageForm;\n}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__[\"connect\"])(function (state) {\n  return {\n    user: state.authentication.user,\n    conversation: state.conversations.conversation,\n    translation: state.translation\n  };\n}, {\n  saveConversation: _redux_reducers_conversations__WEBPACK_IMPORTED_MODULE_13__[\"saveConversation\"]\n})(MessageForm));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9NZXNzYWdlcy9NZXNzYWdlRm9ybS5qcz84YzhjIl0sIm5hbWVzIjpbIk1lc3NhZ2VGb3JtIiwiUmVhY3QiLCJldnQiLCJ1c2VyIiwiY29udmVyc2F0aW9uIiwiZW1wdHlUaW1lIiwibWVzc2FnZSIsImZyb20iLCJfaWQiLCJ1c2VybmFtZSIsInRleHQiLCJ0aW1lc3RhbXAiLCJyZWFkIiwiZGVsZXRlZCIsIm1lc3NhZ2VUZXh0Iiwic2hvd0Vtb2ppIiwiaW5wdXQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInZhbHVlIiwidXBkYXRlZFRleHQiLCJ0cmFuc2xhdGlvbiIsIm1lc3NhZ2VTdHlsZSIsInBhZGRpbmdSaWdodCIsImVtb2ppU3R5bGUiLCJwYWRkaW5nTGVmdCIsImRpc3BsYXkiLCJtYXJnaW5Cb3R0b20iLCJmbGV4IiwiZSIsImVtb2ppIiwic3RhdGUiLCJzYXZlQ29udmVyc2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFlQSxJQUFhQSxXQUFiO0FBQUE7QUFBQTtBQUFBOztBQUtJLCtCQUEyQjtBQUFBOztBQUFBOztBQUN2Qjs7QUFEdUI7O0FBQUEsNExBRmJDLDRDQUFLLENBQUxBLFdBRWE7O0FBQUEsK0xBUVYsZUFBYztBQUMzQixVQUFJQyxHQUFHLENBQUhBLG1CQUF1QixDQUFDQSxHQUFHLENBQS9CLFVBQTBDO0FBQ3RDQSxXQUFHLENBQUhBOztBQUNBLFlBQUksWUFBSixhQUE0QjtBQUFBLDRCQUNLLE1BREw7QUFBQSxjQUNqQkMsSUFEaUI7QUFBQSxjQUNYQyxZQURXO0FBRXhCLGNBQU1DLFNBQVMsR0FGUyxJQUV4QixDQUZ3QixDQUVBOztBQUN4QixjQUFNQyxPQUFnQixHQUFHO0FBQ3JCQyxnQkFBSSxFQUFFO0FBQUNDLGlCQUFHLEVBQUVMLElBQUksQ0FBVjtBQUFnQk0sc0JBQVEsRUFBRU4sSUFBSSxDQUFDTTtBQUEvQixhQURlO0FBRXJCQyxnQkFBSSxFQUFFLFlBRmU7QUFHckJDLHFCQUFTLEVBSFk7QUFJckJDLGdCQUFJLEVBSmlCO0FBS3JCQyxtQkFBTyxFQUFFO0FBTFksV0FBekI7QUFPQVQsc0JBQVksQ0FBWkE7QUFDQUEsc0JBQVksQ0FBWkE7O0FBQ0E7O0FBQ0EseUJBQWM7QUFDVlUsdUJBQVcsRUFBRTtBQURILFdBQWQ7QUFHSDtBQUNKO0FBNUJzQjs7QUFBQSw2TEErQlo7QUFBQSxhQUFNLGVBQWM7QUFBQ0MsaUJBQVMsRUFBRSxDQUFDLFlBQVdBO0FBQXhCLE9BQWQsQ0FBTjtBQS9CWTs7QUFBQSx3TEFpQ2pCLGdCQUFVO0FBQ2hCLFVBQU1DLEtBQUssR0FBRyxrQkFBZDtBQURnQixVQUVUQyxjQUZTLEdBRThCRCxLQUY5QjtBQUFBLFVBRU9FLFlBRlAsR0FFOEJGLEtBRjlCO0FBQUEsVUFFcUJHLEtBRnJCLEdBRThCSCxLQUY5QjtBQUdoQixVQUFNSSxXQUFXLGFBQU1ELEtBQUssQ0FBTEEsYUFBTixjQUFNQSxDQUFOLHNCQUFrREEsS0FBSyxDQUFMQSxVQUFuRSxZQUFtRUEsQ0FBbEQsQ0FBakI7QUFDQUgsV0FBSyxDQUFMQTtBQUNBQSxXQUFLLENBQUxBLGVBQW9CRSxZQUFZLEdBQWhDRjs7QUFDQSxxQkFBYztBQUFDRixtQkFBVyxFQUFFTTtBQUFkLE9BQWQ7QUF2Q3VCOztBQUV2QixrQkFBYTtBQUNUTixpQkFBVyxFQURGO0FBRVRDLGVBQVMsRUFBRTtBQUZGLEtBQWI7QUFGdUI7QUFNMUI7O0FBWEw7QUFBQTtBQUFBLDZCQStDYztBQUFBOztBQUFBLFVBQ0VNLFdBREYsR0FDa0IsS0FEbEIsS0FDa0IsQ0FEbEI7QUFBQSx3QkFFNkIsS0FGN0I7QUFBQSxVQUVFUCxXQUZGO0FBQUEsVUFFZUMsU0FGZjtBQUdOLFVBQU1PLFlBQVksR0FBR1AsU0FBUyxHQUFHO0FBQUNRLG9CQUFZLEVBQUU7QUFBZixPQUFILEdBQTlCO0FBQ0EsVUFBTUMsVUFBVSxHQUFHVCxTQUFTLEdBQUc7QUFBQ1UsbUJBQVcsRUFBRTtBQUFkLE9BQUgsR0FBNUI7QUFDQSxhQUNJO0FBQUssaUJBQVM7QUFBZCxTQUNJO0FBQUssVUFBRSxFQUFQO0FBQWEsVUFBRSxFQUFFVixTQUFTLE9BQTFCO0FBQXFDLGFBQUssRUFBRU87QUFBNUMsU0FDSSwrSEFDSSwyREFBQyw0REFBRDtBQUFZLGlCQUFTLEVBQXJCO0FBQXFDLGlCQUFTLEVBQTlDO0FBQThELGFBQUssRUFBRTtBQUFDSSxpQkFBTyxFQUFSO0FBQWtCQyxzQkFBWSxFQUFFO0FBQWhDO0FBQXJFLFNBQ0k7QUFBSyxhQUFLLEVBQUU7QUFBQ0MsY0FBSSxFQUFFO0FBQVA7QUFBWixTQUNJLDJEQUFDLDREQUFEO0FBQ0ksVUFBRSxFQUROO0FBRUksV0FBRyxFQUFFLEtBRlQ7QUFHSSxVQUFFLEVBSE47QUFJSSxpQkFBUyxFQUpiO0FBS0ksaUJBQVMsRUFMYjtBQU1JLFlBQUksRUFOUjtBQU9JLG1CQUFXLEVBQUUsZ0NBUGpCO0FBUUksYUFBSyxFQVJUO0FBU0ksa0JBQVUsRUFBRSxLQVRoQjtBQVVJLGdCQUFRLEVBQUUscUJBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUosU0FBYztBQUFDZCx1QkFBVyxFQUFFZSxDQUFDLENBQURBLE9BQVNWO0FBQXZCLFdBQWQsQ0FBSjtBQUFBO0FBVmYsUUFESixFQWFJLDJEQUFDLDREQUFEO0FBQVcsaUJBQVMsRUFBQztBQUFyQixTQUNLLGdDQWZiLGtCQWNRLENBYkosQ0FESixFQWtCSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQ0ksV0FBRyxFQURQO0FBRUksWUFBSSxFQUZSO0FBR0ksYUFBSyxFQUFFSixTQUFTLGdCQUhwQjtBQUlJLGVBQU8sRUFBRTtBQUFBLGlCQUFNLE1BQUksQ0FBVixZQUFNLEVBQU47QUFBQTtBQUpiLFFBREosQ0FsQkosQ0FESixDQURKLENBREosRUFnQ0k7QUFBSyxVQUFFLEVBQVA7QUFBYSxVQUFFLEVBQUVBLFNBQVMsT0FBMUI7QUFBcUMsYUFBSyxFQUFFUztBQUE1QyxTQUNLVCxTQUFTLElBQ1Y7QUFDSSxhQUFLLEVBQUVNLFdBQVcsQ0FBWEEsU0FEWDtBQUVJLGFBQUssRUFGVDtBQUdJLGtCQUhKO0FBSUksZUFBTyxFQUFFLHdCQUFLO0FBQUEsaUJBQUksTUFBSSxDQUFKLFFBQWFTLEtBQUssQ0FBdEIsUUFBc0IsQ0FBbEIsQ0FBSjtBQUFBO0FBSmxCLFFBRkosQ0FoQ0osQ0FESjtBQTZDSDtBQWpHTDs7QUFBQTtBQUFBLEVBQWlDN0IsNENBQUssQ0FBdEM7QUFvR2UsMEhBQU8sQ0FDbEIsaUJBQUs7QUFBQSxTQUFLO0FBQ05FLFFBQUksRUFBRTRCLEtBQUssQ0FBTEEsZUFEQTtBQUVOM0IsZ0JBQVksRUFBRTJCLEtBQUssQ0FBTEEsY0FGUjtBQUdOVixlQUFXLEVBQUVVLEtBQUssQ0FBQ1Y7QUFIYixHQUFMO0FBRGEsR0FNbEI7QUFBRVcsa0JBQWdCLEVBQWhCQSwrRUFBZ0JBO0FBQWxCLENBTmtCLENBQVAsQ0FBZixXQUFlLENBQWYiLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9NZXNzYWdlcy9NZXNzYWdlRm9ybS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFBpY2tlciwgRW1vamkgfSBmcm9tICdlbW9qaS1tYXJ0JztcclxuaW1wb3J0IFJvdyBmcm9tICdyZWFjdC1ib290c3RyYXAvUm93JztcclxuaW1wb3J0IENvbCBmcm9tICdyZWFjdC1ib290c3RyYXAvQ29sJztcclxuaW1wb3J0IEZvcm0gZnJvbSAncmVhY3QtYm9vdHN0cmFwL0Zvcm0nO1xyXG5pbXBvcnQgeyBzYXZlQ29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vcmVkdXgvcmVkdWNlcnMvY29udmVyc2F0aW9ucyc7XHJcbmltcG9ydCB0eXBlIHtDb252ZXJzYXRpb24gYXMgQ29udmVyc2F0aW9uVHlwZSwgTWVzc2FnZSwgVHJhbnNsYXRpb24sIFVzZXJ9IGZyb20gJy4uLy4uL3R5cGVzJztcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgICB1c2VyOiBVc2VyLFxyXG4gICAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlLFxyXG4gICAgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uLFxyXG4gICAgc2F2ZUNvbnZlcnNhdGlvbjogRnVuY3Rpb24sXHJcbn1cclxuXHJcbnR5cGUgU3RhdGUgPSB7XHJcbiAgICBtZXNzYWdlVGV4dDogc3RyaW5nLFxyXG4gICAgc2hvd0Vtb2ppOiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcywgU3RhdGU+IHtcclxuXHJcbiAgICBzdGF0ZTogU3RhdGU7XHJcbiAgICB0ZXh0QXJlYVJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VUZXh0OiAnJyxcclxuICAgICAgICAgICAgc2hvd0Vtb2ppOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlS2V5UHJlc3MgPSAoZXZ0OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoZXZ0LmtleSA9PT0gJ0VudGVyJyAmJiAhZXZ0LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5tZXNzYWdlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3VzZXIsIGNvbnZlcnNhdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHlUaW1lID0gbnVsbDsgLy8gbWFyayBhcyBudWxsIHRvIHNldCB0aW1lIG9uIGJhY2tlbmRcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbToge19pZDogdXNlci5faWQsIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lfSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnN0YXRlLm1lc3NhZ2VUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZW1wdHlUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24udGltZXN0YW1wID0gZW1wdHlUaW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zYXZlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlVGV4dDogJyd9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBvbkVtb2ppQ2xpY2sgPSAoKSA9PiB0aGlzLnNldFN0YXRlKHtzaG93RW1vamk6ICF0aGlzLnN0YXRlLnNob3dFbW9qaX0pO1xyXG5cclxuICAgIHNldFRleHQgPSAodGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy50ZXh0QXJlYVJlZi5jdXJyZW50O1xyXG4gICAgICAgIGNvbnN0IHtzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kLCB2YWx1ZX0gPSBpbnB1dDtcclxuICAgICAgICBjb25zdCB1cGRhdGVkVGV4dCA9IGAke3ZhbHVlLnN1YnN0cmluZygwLCBzZWxlY3Rpb25TdGFydCl9JHt0ZXh0fSR7dmFsdWUuc3Vic3RyaW5nKHNlbGVjdGlvbkVuZCl9YDtcclxuICAgICAgICBpbnB1dC5mb2N1cygpO1xyXG4gICAgICAgIGlucHV0LnNlbGVjdGlvbkVuZD0gc2VsZWN0aW9uRW5kICsgNztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlVGV4dDogdXBkYXRlZFRleHR9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICBjb25zdCB7IHRyYW5zbGF0aW9uIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZVRleHQsIHNob3dFbW9qaSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlU3R5bGUgPSBzaG93RW1vamkgPyB7cGFkZGluZ1JpZ2h0OiAwfSA6IHt9O1xyXG4gICAgICAgIGNvbnN0IGVtb2ppU3R5bGUgPSBzaG93RW1vamkgPyB7cGFkZGluZ0xlZnQ6IDB9IDoge307XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFJvdyBub0d1dHRlcnM+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHhzPXsxMn0gc209e3Nob3dFbW9qaSA/IDcgOiAxMn0gc3R5bGU9e21lc3NhZ2VTdHlsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtLkdyb3VwIGNvbnRyb2xJZD0nbWVzc2FnZS1mb3JtJyBjbGFzc05hbWU9J21lc3NhZ2UtZm9ybScgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCcsIG1hcmdpbkJvdHRvbTogMn19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2ZsZXg6IDF9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybS5Db250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwibWVzc2FnZS10ZXh0YXJlYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy50ZXh0QXJlYVJlZn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXM9J3RleHRhcmVhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dC1hcmVhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXs0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy50cmFuc2xhdGlvbi5NRVNTQUdFUy5XUklURV9NRVNTQUdFfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bWVzc2FnZVRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHRoaXMuc2V0U3RhdGUoe21lc3NhZ2VUZXh0OiBlLnRhcmdldC52YWx1ZX0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm0uVGV4dCBjbGFzc05hbWU9J3RleHQtbXV0ZWQgZC1ub25lIGQtc20tYmxvY2snPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50cmFuc2xhdGlvbi5NRVNTQUdFUy5XUklURV9NRVNTQUdFX0lORk99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtLlRleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdlbW9qaS1zZWxlY3QtYXJlYSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVtb2ppXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldD0ndHdpdHRlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZT17MzJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtb2ppPXtzaG93RW1vamkgPyAnZ3Jpbm5pbmcnIDogJ3NsaWdodGx5X3NtaWxpbmdfZmFjZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMub25FbW9qaUNsaWNrKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm0uR3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtPlxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8Q29sIHhzPXsxMn0gc209e3Nob3dFbW9qaSA/IDUgOiAxMn0gc3R5bGU9e2Vtb2ppU3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG93RW1vamkgJiZcclxuICAgICAgICAgICAgICAgICAgICA8UGlja2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0cmFuc2xhdGlvbi5NRVNTQUdFUy5QSUNLX0VNT0pJfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbW9qaT0nbW9ua2V5J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmU9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Vtb2ppID0+IHRoaXMuc2V0VGV4dChlbW9qaS5uYXRpdmUpfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgIDwvUm93PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIHN0YXRlID0+ICh7XHJcbiAgICAgICAgdXNlcjogc3RhdGUuYXV0aGVudGljYXRpb24udXNlcixcclxuICAgICAgICBjb252ZXJzYXRpb246IHN0YXRlLmNvbnZlcnNhdGlvbnMuY29udmVyc2F0aW9uLFxyXG4gICAgICAgIHRyYW5zbGF0aW9uOiBzdGF0ZS50cmFuc2xhdGlvblxyXG4gICAgfSksXHJcbiAgICB7IHNhdmVDb252ZXJzYXRpb24gfVxyXG4pKE1lc3NhZ2VGb3JtKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Messages/MessageForm.js\n");

/***/ })

}]);