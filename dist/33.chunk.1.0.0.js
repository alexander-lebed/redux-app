(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{163:function(e,t,a){"use strict";a.r(t),a.d(t,"MessageForm",function(){return A});var n=a(43),s=a.n(n),r=a(44),o=a.n(r),i=a(45),l=a.n(i),c=a(46),m=a.n(c),u=a(39),E=a.n(u),f=a(47),d=a.n(f),p=a(20),v=a.n(p),g=a(0),h=a.n(g),x=a(29),S=a(541),y=a(300),w=a.n(y),T=a(299),C=a.n(T),j=a(302),k=a.n(j),b=a(49),A=function(e){function t(e){var a;return s()(this,t),a=l()(this,m()(t).call(this,e)),v()(E()(a),"state",void 0),v()(E()(a),"textAreaRef",h.a.createRef()),v()(E()(a),"handleKeyPress",function(e){if("Enter"===e.key&&!e.shiftKey&&(e.preventDefault(),a.state.messageText)){var t=a.props,n=t.user,s=t.conversation,r={from:{_id:n._id,username:n.username},text:a.state.messageText,timestamp:null,read:!1,deleted:!1};s.messages.push(r),s.timestamp=null,a.props.saveConversation(s),a.setState({messageText:""})}}),v()(E()(a),"onEmojiClick",function(){return a.setState({showEmoji:!a.state.showEmoji})}),v()(E()(a),"setText",function(e){var t=a.textAreaRef.current,n=t.selectionStart,s=t.selectionEnd,r=t.value,o="".concat(r.substring(0,n)).concat(e).concat(r.substring(s));t.focus(),t.selectionEnd=s+7,a.setState({messageText:o})}),a.state={messageText:"",showEmoji:!1},a}return d()(t,e),o()(t,[{key:"render",value:function(){var e=this,t=this.props.translation,a=this.state,n=a.messageText,s=a.showEmoji,r=s?{paddingRight:0}:{},o=s?{paddingLeft:0}:{};return h.a.createElement(w.a,{noGutters:!0},h.a.createElement(C.a,{xs:12,sm:s?7:12,style:r},h.a.createElement(k.a,null,h.a.createElement(k.a.Group,{controlId:"message-form",className:"message-form",style:{display:"flex",marginBottom:2}},h.a.createElement("div",{style:{flex:1}},h.a.createElement(k.a.Control,{id:"message-textarea",ref:this.textAreaRef,as:"textarea",autoFocus:!0,className:"text-area",rows:4,placeholder:this.props.translation.MESSAGES.WRITE_MESSAGE,value:n,onKeyPress:this.handleKeyPress,onChange:function(t){return e.setState({messageText:t.target.value})}}),h.a.createElement(k.a.Text,{className:"text-muted d-none d-sm-block"},this.props.translation.MESSAGES.WRITE_MESSAGE_INFO)),h.a.createElement("div",{className:"emoji-select-area"},h.a.createElement(S.a,{set:"twitter",size:32,emoji:s?"grinning":"slightly_smiling_face",onClick:function(){return e.onEmojiClick()}}))))),h.a.createElement(C.a,{xs:12,sm:s?5:12,style:o},s&&h.a.createElement(S.b,{title:t.MESSAGES.PICK_EMOJI,emoji:"monkey",native:!0,onClick:function(t){return e.setText(t.native)}})))}}]),t}(h.a.Component);t.default=Object(x.b)(function(e){return{user:e.authentication.user,conversation:e.conversations.conversation,translation:e.translation}},{saveConversation:b.saveConversation})(A)}}]);