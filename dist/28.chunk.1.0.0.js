(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{153:function(e,t,n){"use strict";n.r(t),n.d(t,"PeopleSelector",function(){return j});var a=n(43),r=n.n(a),s=n(44),c=n.n(s),i=n(45),l=n.n(i),o=n(46),u=n.n(o),d=n(39),m=n.n(d),p=n(47),f=n.n(p),E=n(20),h=n.n(E),v=n(0),C=n.n(v),b=n(29),N=n(300),g=n.n(N),y=n(299),O=n.n(y),S=n(318),_=n.n(S),T=n(302),x=n.n(T),w=n(317),U=n.n(w),k=n(86),L=n.n(k),P=n(59),I=n.n(P),M=n(14),A=n(10),j=function(e){function t(e){var n;r()(this,t),n=l()(this,u()(t).call(this,e)),h()(m()(n),"state",void 0),h()(m()(n),"toggleUser",function(e){var t=n.state.people;t.map(function(e){return e._id}).includes(e._id)?n.setState({people:t.filter(function(t){return t._id!==e._id})}):n.setState({people:t.concat(e)})});var a=e.selectedUserIds,s=e.users,c=[];return a.length>0&&(c=s.filter(function(e){return a.includes(e._id)})),n.state={searchText:"",people:c},n}return f()(t,e),c()(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.people,a=t.searchText,r=this.props,s=r.users,c=r.excludedUserIds,i=r.submitButtonText,l=r.onSubmit,o=r.onCancel,u=r.translation;return s=s.filter(function(e){return!c.includes(e._id)}),a&&(s=s.filter(function(e){return-1!==e.username.toLowerCase().indexOf(a.toLowerCase())})),s=Object(M.orderBy)(s,["username"]),C.a.createElement("div",null,C.a.createElement("div",{className:"people-select-header"},C.a.createElement(U.a,{size:"sm",className:"search"},C.a.createElement(U.a.Prepend,null,C.a.createElement("i",{className:"fas fa-search"})),C.a.createElement(x.a.Control,{placeholder:u.PEOPLE.SEARCH_PEOPLE,"aria-label":"Search people","aria-describedby":"search",className:"search-input",value:a,onChange:function(t){return e.setState({searchText:t.target.value})}})),C.a.createElement("div",{className:"actions"},C.a.createElement(L.a,{size:"sm",variant:"outline-secondary",onClick:o},u.COMMON.CANCEL)," ",C.a.createElement(L.a,{size:"sm",variant:"success",disabled:0===n.length,onClick:function(){return l(n)}},i||u.COMMON.SUBMIT))),0===s.length?C.a.createElement("div",{className:"text-center"},u.COMMON.NO_RESULTS):C.a.createElement(_.a,{hover:!0},C.a.createElement("tbody",null,s.map(function(t){var a=n.map(function(e){return e._id}).includes(t._id);return C.a.createElement("tr",{key:t._id,id:t._id},C.a.createElement("td",{className:a?"active":"",style:{padding:5},onClick:function(){return e.toggleUser(t)}},C.a.createElement(g.a,{noGutters:!0},C.a.createElement(O.a,{xs:10},C.a.createElement("div",{className:"profile-picture-wrapper"},C.a.createElement(I.a,{roundedCircle:!0,style:t.online?A.ONLINE_STYLE:{},className:"profile-picture",src:t.pictureUrl?t.pictureUrl:"/images/default-profile.jpg"})),C.a.createElement("div",{style:{fontSize:13}},C.a.createElement("span",{style:{fontWeight:700}},t.username),C.a.createElement("div",{style:{color:"grey"}},!t.online&&"".concat(u.PEOPLE.LAST_SEEN," ").concat(Object(M.timestampToHumanDate)(t.lastTime,!1,u))))),C.a.createElement(O.a,{xs:2},C.a.createElement("div",{className:"material-switch pull-right",style:{marginTop:12}},C.a.createElement("input",{type:"checkbox",checked:a,onChange:function(){}}),C.a.createElement("label",{className:"label-success"}))))))}))))}}]),t}(C.a.PureComponent);h()(j,"defaultProps",{excludedUserIds:[],selectedUserIds:[],submitButtonText:""}),t.default=Object(b.b)(function(e){return{users:e.users.users,translation:e.translation}})(j)},186:function(e,t,n){"use strict";n.r(t),n.d(t,"CreateConversation",function(){return U});var a=n(43),r=n.n(a),s=n(44),c=n.n(s),i=n(45),l=n.n(i),o=n(46),u=n.n(o),d=n(39),m=n.n(d),p=n(47),f=n.n(p),E=n(20),h=n.n(E),v=n(0),C=n.n(v),b=n(29),N=n(322),g=n.n(N),y=n(303),O=n.n(y),S=n(300),_=n.n(S),T=n(299),x=n.n(T),w=n(153),U=function(e){function t(){var e,n;r()(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return n=l()(this,(e=u()(t)).call.apply(e,[this].concat(s))),h()(m()(n),"createConversation",function(e){var t="/conversation?".concat(g.a.stringify({userIds:e.map(function(e){return e._id})}));n.props.history.push(t)}),n}return f()(t,e),c()(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.user,a=t.translation,r=t.history,s=a.CONVERSATIONS;return C.a.createElement(O.a,{fluid:!0},C.a.createElement(_.a,{noGutters:!0},C.a.createElement(x.a,{md:{span:10,offset:1},lg:{span:8,offset:2}},C.a.createElement(w.default,{excludedUserIds:[n._id],submitButtonText:s.CREATE,onSubmit:function(t){return e.createConversation(t)},onCancel:function(){return r.push("/conversations")}}))))}}]),t}(C.a.Component);t.default=Object(b.b)(function(e){return{user:e.authentication.user,translation:e.translation}})(U)}}]);