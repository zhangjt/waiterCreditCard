webpackJsonp([32],{"70vr":function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("Dd8w"),o=e.n(a),r=e("NYxO"),n=e("L6bb"),i=e.n(n),l=e("7pK0"),c={name:"login",data:function(){return{title:"密码登录",passform:{username:localStorage.getItem("caiPhone"),password:""}}},computed:{btnDisabled:{get:function(){return!this.passform.username}}},methods:o()({},Object(r.b)(["getUserInfo"]),Object(r.c)(["SETLOGINSTATE"]),{toLogin:function(s){var t=this;this.$http.toLogin(s).then(function(s){if(!1!==s){localStorage.setItem("token",s.token),t.SETLOGINSTATE({loginState:!0}),t.getUserInfo();var e=t.$route.query.redirected;e?t.$router.push({path:e}):t.$router.go(-1)}})},checkForm:function(s){localStorage.setItem("caiPhone",this.passform.username||"");var t=l.a.validatePhoneNumber(this.passform.username);if(""===t)if(this.passform.password){var e={phone:this.passform.username,password:i()(this.passform.password),type:0,channel:"wapzc"};this.toLogin(e)}else this.$toast("密码不能为空");else this.$toast(t);s.preventDefault()}})},m=e("XyMi");var p=function(s){e("lKC7")},u=Object(m.a)(c,function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"login"},[e("form",{staticClass:"login-form",attrs:{action:""},on:{submit:s.checkForm},model:{value:s.passform,callback:function(t){s.passform=t},expression:"passform"}},[e("mt-field",{staticClass:"phone",attrs:{placeholder:"请输入手机号码",type:"tel"},model:{value:s.passform.username,callback:function(t){s.$set(s.passform,"username",t)},expression:"passform.username"}}),s._v(" "),e("mt-field",{staticClass:"password",attrs:{placeholder:"请输入登录密码",type:"password"},model:{value:s.passform.password,callback:function(t){s.$set(s.passform,"password",t)},expression:"passform.password"}}),s._v(" "),e("div",{staticClass:"btn-module"},[e("div",{staticClass:"btn-margin"},[e("mt-button",{staticClass:"common-btn",attrs:{disabled:s.btnDisabled}},[s._v("登录")])],1)])],1),s._v(" "),e("router-link",{staticClass:"forget",attrs:{to:"/user/forgetPassword"}},[s._v("忘记密码")])],1)},[],!1,p,"data-v-0c330ae4",null);t.default=u.exports},lKC7:function(s,t){}});
//# sourceMappingURL=32.0d1a2382d4395a772ede.js.map