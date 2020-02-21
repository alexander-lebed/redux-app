(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{152:function(e,t,a){"use strict";a.r(t),a.d(t,"PeopleSelector",function(){return L});var l=a(43),r=a.n(l),s=a(44),n=a.n(s),u=a(45),d=a.n(u),i=a(46),o=a.n(i),f=a(39),c=a.n(f),m=a(47),p=a.n(m),v=a(20),x=a.n(v),b=a(0),N=a.n(b),h=a(29),E=a(299),y=a.n(E),P=a(298),_=a.n(P),C=a(317),g=a.n(C),k=a(301),I=a.n(k),w=a(316),M=a.n(w),O=a(86),F=a.n(O),S=a(59),T=a.n(S),B=a(14),R=a(10),L=function(e){function t(e){var a;r()(this,t),a=d()(this,o()(t).call(this,e)),x()(c()(a),"state",void 0),x()(c()(a),"toggleUser",function(e){var t=a.state.people;t.map(function(e){return e._id}).includes(e._id)?a.setState({people:t.filter(function(t){return t._id!==e._id})}):a.setState({people:t.concat(e)})});var l=e.selectedUserIds,s=e.users,n=[];return l.length>0&&(n=s.filter(function(e){return l.includes(e._id)})),a.state={searchText:"",people:n},a}return p()(t,e),n()(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.people,l=t.searchText,r=this.props,s=r.users,n=r.excludedUserIds,u=r.submitButtonText,d=r.onSubmit,i=r.onCancel,o=r.translation;return s=s.filter(function(e){return!n.includes(e._id)}),l&&(s=s.filter(function(e){return-1!==e.username.toLowerCase().indexOf(l.toLowerCase())})),s=Object(B.orderBy)(s,["username"]),N.a.createElement("div",null,N.a.createElement("div",{className:"people-select-header"},N.a.createElement(M.a,{size:"sm",className:"search"},N.a.createElement(M.a.Prepend,null,N.a.createElement("i",{className:"fas fa-search"})),N.a.createElement(I.a.Control,{placeholder:o.PEOPLE.SEARCH_PEOPLE,"aria-label":"Search people","aria-describedby":"search",className:"search-input",value:l,onChange:function(t){return e.setState({searchText:t.target.value})}})),N.a.createElement("div",{className:"actions"},N.a.createElement(F.a,{size:"sm",variant:"outline-secondary",onClick:i},o.COMMON.CANCEL)," ",N.a.createElement(F.a,{size:"sm",variant:"success",disabled:0===a.length,onClick:function(){return d(a)}},u||o.COMMON.SUBMIT))),0===s.length?N.a.createElement("div",{className:"text-center"},o.COMMON.NO_RESULTS):N.a.createElement(g.a,{hover:!0},N.a.createElement("tbody",null,s.map(function(t){var l=a.map(function(e){return e._id}).includes(t._id);return N.a.createElement("tr",{key:t._id,id:t._id},N.a.createElement("td",{className:l?"active":"",style:{padding:5},onClick:function(){return e.toggleUser(t)}},N.a.createElement(y.a,{noGutters:!0},N.a.createElement(_.a,{xs:10},N.a.createElement("div",{className:"profile-picture-wrapper"},N.a.createElement(T.a,{roundedCircle:!0,style:t.online?R.ONLINE_STYLE:{},className:"profile-picture",src:t.pictureUrl?t.pictureUrl:"/images/default-profile.jpg"})),N.a.createElement("div",{style:{fontSize:13}},N.a.createElement("span",{style:{fontWeight:700}},t.username),N.a.createElement("div",{style:{color:"grey"}},!t.online&&"".concat(o.PEOPLE.LAST_SEEN," ").concat(Object(B.timestampToHumanDate)(t.lastTime,!1,o))))),N.a.createElement(_.a,{xs:2},N.a.createElement("div",{className:"material-switch pull-right",style:{marginTop:12}},N.a.createElement("input",{type:"checkbox",checked:l,onChange:function(){}}),N.a.createElement("label",{className:"label-success"}))))))}))))}}]),t}(N.a.PureComponent);x()(L,"defaultProps",{excludedUserIds:[],selectedUserIds:[],submitButtonText:""}),t.default=Object(h.b)(function(e){return{users:e.users.users,translation:e.translation}})(L)},297:function(e,t,a){"use strict";var l=a(4);t.__esModule=!0,t.default=void 0;var r=l(a(0)).default.createContext({controlId:void 0});t.default=r,e.exports=t.default},298:function(e,t,a){"use strict";var l=a(4);t.__esModule=!0,t.default=void 0;var r=l(a(6)),s=l(a(7)),n=l(a(11)),u=l(a(0)),d=a(16),i=["xl","lg","md","sm","xs"],o=u.default.forwardRef(function(e,t){var a=e.bsPrefix,l=e.className,o=e.as,f=void 0===o?"div":o,c=(0,s.default)(e,["bsPrefix","className","as"]),m=(0,d.useBootstrapPrefix)(a,"col"),p=[],v=[];return i.forEach(function(e){var t,a,l,r=c[e];if(delete c[e],null!=r&&"object"==typeof r){var s=r.span;t=void 0===s||s,a=r.offset,l=r.order}else t=r;var n="xs"!==e?"-"+e:"";null!=t&&p.push(!0===t?""+m+n:""+m+n+"-"+t),null!=l&&v.push("order"+n+"-"+l),null!=a&&v.push("offset"+n+"-"+a)}),p.length||p.push(m),u.default.createElement(f,(0,r.default)({},c,{ref:t,className:n.default.apply(void 0,[l].concat(p,v))}))});o.displayName="Col";var f=o;t.default=f,e.exports=t.default},299:function(e,t,a){"use strict";var l=a(4);t.__esModule=!0,t.default=void 0;var r=l(a(6)),s=l(a(7)),n=l(a(28)),u=l(a(11)),d=l(a(0)),i=a(16),o=function(e){function t(){return e.apply(this,arguments)||this}return(0,n.default)(t,e),t.prototype.render=function(){var e=this.props,t=e.bsPrefix,a=e.noGutters,l=e.as,n=void 0===l?"div":l,i=e.className,o=(0,s.default)(e,["bsPrefix","noGutters","as","className"]);return d.default.createElement(n,(0,r.default)({},o,{className:(0,u.default)(i,t,a&&"no-gutters")}))},t}(d.default.Component);o.defaultProps={noGutters:!1};var f=(0,i.createBootstrapComponent)(o,"row");t.default=f,e.exports=t.default},300:function(e,t,a){"use strict";var l=a(4);t.__esModule=!0,t.default=void 0;var r=l(a(6)),s=l(a(7)),n=l(a(11)),u=l(a(0)),d=l(a(1)),i={type:d.default.string.isRequired,as:d.default.elementType},o=u.default.forwardRef(function(e,t){var a=e.as,l=void 0===a?"div":a,d=e.className,i=e.type,o=(0,s.default)(e,["as","className","type"]);return u.default.createElement(l,(0,r.default)({},o,{ref:t,className:(0,n.default)(d,i&&i+"-feedback")}))});o.displayName="Feedback",o.propTypes=i,o.defaultProps={type:"valid"};var f=o;t.default=f,e.exports=t.default},301:function(e,t,a){"use strict";var l=a(4);t.__esModule=!0,t.default=void 0;var r=l(a(6)),s=l(a(7)),n=l(a(11)),u=l(a(0)),d=l(a(87)),i=a(16),o=l(a(304)),f=l(a(305)),c=l(a(306)),m=l(a(309)),p=l(a(310)),v=u.default.forwardRef(function(e,t){var a=e.bsPrefix,l=e.inline,d=e.className,o=e.validated,f=e.as,c=void 0===f?"form":f,m=(0,s.default)(e,["bsPrefix","inline","className","validated","as"]);return a=(0,i.useBootstrapPrefix)(a,"form"),u.default.createElement(c,(0,r.default)({},m,{ref:t,className:(0,n.default)(d,o&&"was-validated",l&&a+"-inline")}))});v.displayName="Form",v.defaultProps={inline:!1},v.Row=(0,d.default)("form-row"),v.Group=o.default,v.Control=f.default,v.Check=c.default,v.Label=m.default,v.Text=p.default;var x=v;t.default=x,e.exports=t.default},304:function(e,t,a){"use strict";var l=a(27),r=a(4);t.__esModule=!0,t.default=void 0;var s=r(a(6)),n=r(a(7)),u=r(a(11)),d=l(a(0)),i=r(a(297)),o=a(16),f=d.default.forwardRef(function(e,t){var a=e.bsPrefix,l=e.className,r=e.children,f=e.controlId,c=e.as,m=void 0===c?"div":c,p=(0,n.default)(e,["bsPrefix","className","children","controlId","as"]);a=(0,o.useBootstrapPrefix)(a,"form-group");var v=(0,d.useMemo)(function(){return{controlId:f}},[f]);return d.default.createElement(i.default.Provider,{value:v},d.default.createElement(m,(0,s.default)({},p,{ref:t,className:(0,u.default)(l,a)}),r))});f.displayName="FormGroup";var c=f;t.default=c,e.exports=t.default},305:function(e,t,a){"use strict";var l=a(27),r=a(4);t.__esModule=!0,t.default=void 0;var s=r(a(6)),n=r(a(7)),u=r(a(11)),d=l(a(0)),i=(r(a(8)),r(a(300))),o=r(a(297)),f=a(16),c=d.default.forwardRef(function(e,t){var a,l,r=e.bsPrefix,i=e.type,c=e.size,m=e.id,p=e.className,v=e.isValid,x=e.isInvalid,b=e.plaintext,N=e.readOnly,h=e.as,E=void 0===h?"input":h,y=(0,n.default)(e,["bsPrefix","type","size","id","className","isValid","isInvalid","plaintext","readOnly","as"]),P=(0,d.useContext)(o.default).controlId;if(r=(0,f.useBootstrapPrefix)(r,"form-control"),b)(l={})[r+"-plaintext"]=!0,a=l;else if("file"===i){var _;(_={})[r+"-file"]=!0,a=_}else{var C;(C={})[r]=!0,C[r+"-"+c]=c,a=C}return d.default.createElement(E,(0,s.default)({},y,{type:i,ref:t,readOnly:N,id:m||P,className:(0,u.default)(p,a,v&&"is-valid",x&&"is-invalid")}))});c.displayName="FormControl",c.Feedback=i.default;var m=c;t.default=m,e.exports=t.default},306:function(e,t,a){"use strict";var l=a(27),r=a(4);t.__esModule=!0,t.default=void 0;var s=r(a(6)),n=r(a(7)),u=r(a(11)),d=l(a(0)),i=a(16),o=r(a(297)),f=r(a(300)),c=r(a(307)),m=r(a(308)),p=d.default.forwardRef(function(e,t){var a=e.id,l=e.bsPrefix,r=e.inline,p=e.disabled,v=e.isValid,x=e.isInvalid,b=e.feedback,N=e.className,h=e.style,E=e.title,y=e.type,P=e.label,_=e.children,C=e.custom,g=(0,n.default)(e,["id","bsPrefix","inline","disabled","isValid","isInvalid","feedback","className","style","title","type","label","children","custom"]);l=(0,i.useBootstrapPrefix)(l,"form-check");var k=(0,d.useContext)(o.default).controlId,I=(0,d.useMemo)(function(){return{controlId:a||k,custom:C}},[k,C,a]),w=null!=P&&!1!==P&&!_,M=d.default.createElement(c.default,(0,s.default)({},g,{type:y,ref:t,isValid:v,isInvalid:x,isStatic:!w,disabled:p}));return d.default.createElement(o.default.Provider,{value:I},d.default.createElement("div",{style:h,className:(0,u.default)(N,!C&&l,C&&"custom-control custom-"+y,r&&(C?"custom-control":l)+"-inline")},_||d.default.createElement(d.default.Fragment,null,M,w&&d.default.createElement(m.default,{title:E},P),(v||x)&&d.default.createElement(f.default,{type:v?"valid":"invalid"},b))))});p.displayName="FormCheck",p.defaultProps={type:"checkbox",inline:!1,disabled:!1,isValid:!1,isInvalid:!1,title:""},p.Input=c.default,p.Label=m.default;var v=p;t.default=v,e.exports=t.default},307:function(e,t,a){"use strict";var l=a(27),r=a(4);t.__esModule=!0,t.default=void 0;var s=r(a(6)),n=r(a(7)),u=r(a(11)),d=l(a(0)),i=a(16),o=r(a(297)),f=d.default.forwardRef(function(e,t){var a=e.id,l=e.bsPrefix,r=e.className,f=e.isValid,c=e.isInvalid,m=e.isStatic,p=(0,n.default)(e,["id","bsPrefix","className","isValid","isInvalid","isStatic"]);l=(0,i.useBootstrapPrefix)(l,"form-check-input");var v=(0,d.useContext)(o.default),x=v.controlId,b=v.custom;return d.default.createElement("input",(0,s.default)({},p,{ref:t,id:a||x,className:(0,u.default)(r,!b&&l,b&&"custom-control-input",f&&"is-valid",c&&"is-invalid",m&&"position-static")}))});f.displayName="FormCheckInput",f.defaultProps={type:"checkbox"};var c=f;t.default=c,e.exports=t.default},308:function(e,t,a){"use strict";var l=a(27),r=a(4);t.__esModule=!0,t.default=void 0;var s=r(a(6)),n=r(a(7)),u=r(a(11)),d=l(a(0)),i=a(16),o=r(a(297)),f=d.default.forwardRef(function(e,t){var a=e.bsPrefix,l=e.className,r=e.htmlFor,f=(0,n.default)(e,["bsPrefix","className","htmlFor"]);a=(0,i.useBootstrapPrefix)(a,"form-check-label");var c=(0,d.useContext)(o.default),m=c.controlId,p=c.custom;return d.default.createElement("label",(0,s.default)({},f,{ref:t,htmlFor:r||m,className:(0,u.default)(l,!p&&a,p&&"custom-control-label")}))});f.displayName="FormCheckLabel",f.defaultProps={type:"checkbox"};var c=f;t.default=c,e.exports=t.default},309:function(e,t,a){"use strict";var l=a(27),r=a(4);t.__esModule=!0,t.default=void 0;var s=r(a(6)),n=r(a(7)),u=r(a(11)),d=l(a(0)),i=(r(a(8)),r(a(298))),o=r(a(297)),f=a(16),c=d.default.forwardRef(function(e,t){var a=e.bsPrefix,l=e.column,r=e.srOnly,c=e.className,m=e.htmlFor,p=(0,n.default)(e,["bsPrefix","column","srOnly","className","htmlFor"]),v=(0,d.useContext)(o.default).controlId;a=(0,f.useBootstrapPrefix)(a,"form-label");var x=(0,u.default)(c,a,r&&"sr-only",l&&"col-form-label");return m=m||v,l?d.default.createElement(i.default,(0,s.default)({as:"label",className:x,htmlFor:m},p)):d.default.createElement("label",(0,s.default)({ref:t,className:x,htmlFor:m},p))});c.displayName="FormLabel",c.defaultProps={column:!1,srOnly:!1};var m=c;t.default=m,e.exports=t.default},310:function(e,t,a){"use strict";var l=a(4);t.__esModule=!0,t.default=void 0;var r=l(a(6)),s=l(a(7)),n=l(a(11)),u=l(a(0)),d=a(16),i=u.default.forwardRef(function(e,t){var a=e.bsPrefix,l=e.className,i=e.as,o=void 0===i?"small":i,f=(0,s.default)(e,["bsPrefix","className","as"]);return a=(0,d.useBootstrapPrefix)(a,"form-text"),u.default.createElement(o,(0,r.default)({},f,{ref:t,className:(0,n.default)(l,a)}))});i.displayName="FormText";var o=i;t.default=o,e.exports=t.default},316:function(e,t,a){"use strict";var l=a(4);t.__esModule=!0,t.default=void 0;var r=l(a(6)),s=l(a(7)),n=l(a(28)),u=l(a(11)),d=l(a(0)),i=l(a(87)),o=a(16),f=function(e){function t(){return e.apply(this,arguments)||this}return(0,n.default)(t,e),t.prototype.render=function(){var e=this.props,t=e.bsPrefix,a=e.size,l=e.className,n=e.as,i=void 0===n?"div":n,o=(0,s.default)(e,["bsPrefix","size","className","as"]);return d.default.createElement(i,(0,r.default)({},o,{className:(0,u.default)(l,t,a&&t+"-"+a)}))},t}(d.default.Component),c=(0,i.default)("input-group-append"),m=(0,i.default)("input-group-prepend"),p=(0,i.default)("input-group-text",{Component:"span"}),v=(0,o.createBootstrapComponent)(f,"input-group");v.Text=p,v.Radio=function(e){return d.default.createElement(p,null,d.default.createElement("input",(0,r.default)({type:"radio"},e)))},v.Checkbox=function(e){return d.default.createElement(p,null,d.default.createElement("input",(0,r.default)({type:"checkbox"},e)))},v.Append=c,v.Prepend=m;var x=v;t.default=x,e.exports=t.default},317:function(e,t,a){"use strict";var l=a(4);t.__esModule=!0,t.default=void 0;var r=l(a(6)),s=l(a(7)),n=l(a(28)),u=l(a(11)),d=l(a(0)),i=a(16),o=function(e){function t(){return e.apply(this,arguments)||this}return(0,n.default)(t,e),t.prototype.render=function(){var e=this.props,t=e.bsPrefix,a=e.className,l=e.striped,n=e.bordered,i=e.borderless,o=e.hover,f=e.size,c=e.variant,m=e.responsive,p=(0,s.default)(e,["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"]),v=(0,u.default)(t,a,c&&t+"-"+c,f&&t+"-"+f,l&&t+"-striped",n&&t+"-bordered",i&&t+"-borderless",o&&t+"-hover"),x=d.default.createElement("table",(0,r.default)({},p,{className:v}));if(m){var b=t+"-responsive";return"string"==typeof m&&(b=b+"-"+m),d.default.createElement("div",{className:b},x)}return x},t}(d.default.Component),f=(0,i.createBootstrapComponent)(o,"table");t.default=f,e.exports=t.default}}]);