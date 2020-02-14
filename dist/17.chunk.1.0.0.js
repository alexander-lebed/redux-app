(window.webpackJsonp=window.webpackJsonp||[]).push([[17,29,34],{149:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(29),l=a(328),i=a.n(l),o=a(86),c=a.n(o);t.default=function(e){var t=Object(s.c)(function(e){return e.translation});return r.a.createElement(i.a,{show:!0,onHide:e.onCancel},r.a.createElement(i.a.Header,null,r.a.createElement(i.a.Title,null,e.title)),r.a.createElement(i.a.Body,null,e.body),r.a.createElement(i.a.Footer,null,r.a.createElement(c.a,{variant:"success",size:"sm",onClick:e.onConfirm},t.COMMON.YES),r.a.createElement(c.a,{variant:"outline-dark",size:"sm",onClick:e.onCancel},t.COMMON.CANCEL)))}},165:function(e,t,a){"use strict";a.r(t),a.d(t,"People",function(){return Y}),a.d(t,"UserRow",function(){return G});var n=a(43),r=a.n(n),s=a(44),l=a.n(s),i=a(45),o=a.n(i),c=a(46),u=a.n(c),d=a(39),m=a.n(d),p=a(47),f=a.n(p),E=a(20),h=a.n(E),U=a(0),x=a.n(U),C=a(29),v=a(322),w=a.n(v),O=a(303),g=a.n(O),N=a(300),b=a.n(N),k=a(299),T=a.n(k),P=a(318),_=a.n(P),y=a(302),S=a.n(y),L=a(328),M=a.n(L),I=a(317),j=a.n(I),q=a(86),D=a.n(q),R=a(59),H=a.n(R),A=a(323),B=a.n(A),z=a(10),F=a(14),J=a(34),W=a(149),Y=function(e){function t(e){var a;return r()(this,t),a=o()(this,u()(t).call(this,e)),h()(m()(a),"state",void 0),h()(m()(a),"showUserProfile",function(e){return a.setState({clickedUser:e})}),h()(m()(a),"showDeleteConfirmation",function(e){return a.setState({deleteUserId:e})}),h()(m()(a),"hideDeleteConfirmation",function(){return a.setState({deleteUserId:""})}),h()(m()(a),"deleteUser",function(){a.props.deleteUser(a.state.deleteUserId),a.hideDeleteConfirmation()}),a.state={searchText:"",deleteUserId:"",clickedUser:null},a}return f()(t,e),l()(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.users,n=t.history,r=t.translation,s=r.PEOPLE,l=r.COMMON;return this.state.searchText&&(a=a.filter(function(t){return-1!==t.username.toLowerCase().indexOf(e.state.searchText.toLowerCase())})),x.a.createElement(g.a,{fluid:!0},x.a.createElement(b.a,null,x.a.createElement(T.a,{md:{span:10,offset:1},lg:{span:8,offset:2}},x.a.createElement(b.a,null,x.a.createElement(T.a,{xs:12,sm:6},x.a.createElement(j.a,{size:"sm",className:"search-container"},x.a.createElement(j.a.Prepend,null,x.a.createElement("i",{className:"fas fa-search"})),x.a.createElement(S.a.Control,{placeholder:s.SEARCH_PEOPLE,"aria-label":"Search people","aria-describedby":"search",className:"search-input",value:this.state.searchText,onChange:function(t){return e.setState({searchText:t.target.value})}})))),0===a.length?x.a.createElement(B.a,{className:"text-center"},l.NO_RESULTS):x.a.createElement(_.a,null,x.a.createElement("tbody",null,a.map(function(t){return x.a.createElement(G,{key:t._id,history:n,user:t,showUserProfile:function(t){return e.showUserProfile(t)},showDeleteConfirmation:function(t){return e.showDeleteConfirmation(t)}})}))),this.state.clickedUser&&x.a.createElement(M.a,{show:null!==this.state.clickedUser,className:"profile-modal",onHide:function(){return e.showUserProfile(null)}},x.a.createElement(M.a.Header,{closeButton:!0},x.a.createElement(M.a.Title,null,this.state.clickedUser.username)),x.a.createElement(M.a.Body,{style:{textAlign:"center"}},x.a.createElement(H.a,{className:"profile-modal-picture",src:this.state.clickedUser.pictureUrl?this.state.clickedUser.pictureUrl:"/images/default-profile.jpg"}))),this.state.deleteUserId&&x.a.createElement(W.default,{title:l.DELETE_CONFIRMATION,body:s.DELETE_CONFIRMATION,onConfirm:function(){return e.deleteUser()},onCancel:function(){return e.hideDeleteConfirmation()}}))))}}]),t}(x.a.Component);t.default=Object(C.b)(function(e){return{user:e.authentication.user,users:e.users.users,translation:e.translation}},{deleteUser:J.deleteUser})(Y);var G=function(e){var t=e.user,a=e.showUserProfile,n=e.showDeleteConfirmation,r=e.history,s=Object(C.c)(function(e){return{loggedUser:e.authentication.user,translation:e.translation}}),l=s.loggedUser,i=s.translation,o=l.email===z.adminEmail,c=t.online?z.ONLINE_STYLE:{};return x.a.createElement("tr",{key:t._id,id:t._id},x.a.createElement("td",{style:{padding:10}},x.a.createElement(b.a,null,x.a.createElement(T.a,{xs:12,sm:6},x.a.createElement("div",{className:"profile-picture-wrapper cursor",onClick:function(){return a(t)}},x.a.createElement(H.a,{id:"user-picture-".concat(t._id),roundedCircle:!0,style:c,className:"profile-picture",src:t.pictureUrl?t.pictureUrl:"/images/default-profile.jpg"})),x.a.createElement("div",null,t.username,x.a.createElement("div",{className:"last-seen"},!t.online&&"".concat(i.PEOPLE.LAST_SEEN," ").concat(Object(F.timestampToHumanDate)(t.lastTime,!1,i))))),x.a.createElement(T.a,{xs:12,sm:6},x.a.createElement("div",{className:"pull-right pt-1 pt-sm-2"},o&&x.a.createElement(x.a.Fragment,null,x.a.createElement(D.a,{id:"delete-user-".concat(t._id),size:"sm",variant:"outline-danger",onClick:function(){return n(t._id)}},x.a.createElement("i",{className:"far fa-trash-alt",style:{marginRight:5}})," ",i.COMMON.DELETE)," "),x.a.createElement(D.a,{id:"write-user-".concat(t._id),size:"sm",variant:"outline-dark",onClick:function(){return e=[t._id],a=w.a.stringify({userIds:e}),void r.push("/conversation?".concat(a));var e,a}},x.a.createElement("i",{className:"far fa-paper-plane",style:{marginRight:5}})," ",i.PEOPLE.WRITE_MESSAGE))))))};G.displayName="UserRow"},188:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(799),l=a.n(s),i=a(357),o=a(165),c=a(149),u=a(65);jest.mock("react-redux",function(){return{connect:function(e,t){return function(a){return{mapStateToProps:e,mapDispatchToProps:t,ReactComponent:a}}},useSelector:function(){return{loggedUser:{email:"alexanderlebed999@gmail.com"},translation:{PEOPLE:{},COMMON:{}},COMMON:{}}}}}),describe("<People/>",function(){var e={user:{_id:"111",username:"Current User",email:"alexanderlebed999@gmail.com",password:"password",pictureUrl:"",online:!0,lastTime:1519294933743,oauth:""},users:[{_id:"111",username:"Current User",email:"alexanderlebed999@gmail.com",password:"user-password",pictureUrl:"",online:!0,lastTime:1519294933743,oauth:""},{_id:"222",username:"Alice",email:"alice@gmail.com",password:"alice-password",pictureUrl:"",online:!0,lastTime:1518346740388,oauth:""},{_id:"333",username:"Bob",email:"bob@mail.com",password:"bob-password",pictureUrl:"",online:!0,lastTime:1518346740388,oauth:""}],deleteUser:jest.fn(),translation:u.default,history:{push:jest.fn()}},t=e.users[1];test("should match snapshot",function(){var t=l.a.create(r.a.createElement(o.People,e)).toJSON();expect(t).toMatchSnapshot()}),test("should render people",function(){var t=Object(i.shallow)(r.a.createElement(o.People,e)),a=t.find(o.UserRow);expect(a.exists()).toEqual(!0),expect(a.length).toEqual(3),expect(t.instance().props.users).toEqual(e.users)}),test("should alert confirmation on delete user",function(){var a=Object(i.mount)(r.a.createElement(o.People,e)),n=a.find(c.default);expect(n.exists()).toEqual(!1),expect(a.instance().state.deleteUserId).toEqual("");var s=a.find("button#delete-user-".concat(t._id));expect(s.exists()).toEqual(!0),s.simulate("click"),n=a.find(c.default),expect(n.exists()).toEqual(!0),expect(a.instance().state.deleteUserId).toEqual(t._id)}),test("should route to conversation on 'write message' click",function(){var a=jest.spyOn(e.history,"push"),n=Object(i.mount)(r.a.createElement(o.People,e));expect(a).toHaveBeenCalledTimes(0);var s=n.find("button#write-user-".concat(t._id));expect(s.exists()).toEqual(!0),s.simulate("click"),expect(a).toHaveBeenCalledTimes(1),expect(a).toHaveBeenLastCalledWith("/conversation?userIds=".concat(t._id)),a.mockRestore()}),test("should expand user image on image click",function(){var a=Object(i.mount)(r.a.createElement(o.People,e)),n=a.find(".profile-modal");expect(n.exists()).toEqual(!1);var s=a.find("img#user-picture-".concat(t._id));expect(s.exists()).toEqual(!0),s.simulate("click"),n=a.find(".profile-modal"),expect(n.exists()).toEqual(!0)})})},391:function(e,t){},397:function(e,t){},398:function(e,t){},428:function(e,t){}}]);