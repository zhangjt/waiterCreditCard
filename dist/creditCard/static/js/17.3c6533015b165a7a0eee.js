webpackJsonp([17],{"6FYp":function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=n("Dd8w"),e=n.n(a),i=n("NYxO"),c=(n("Au9i"),{data:function(){return{}},props:{cardInfo:{type:Object}},created:function(){},components:{},computed:{},methods:{goAddCard:function(){this.cardInfo.isBind>0?this.$router.push({name:"bankcards",params:{cardInfo:this.cardInfo.cardInfo}}):this.$router.push({path:"/mineSetting/addCard"})},getBankDesc:function(){if(this.cardInfo.cardInfo&&this.cardInfo.cardInfo.account.length>4){var t=this.cardInfo.cardInfo.account.substr(-4);return this.cardInfo.cardInfo.bankName+"("+t+")"}}}}),o=n("XyMi");var r=function(t){n("jTGn")},d={data:function(){return{loginCode:"--/--"}},created:function(){this.getUserInfo()},components:{AccountBind:Object(o.a)(c,function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"account-bind-container"},[n("div",{staticClass:"bind-item-container",on:{click:t.goAddCard}},[n("div",{staticClass:"bind-item-style"},[t._m(0),t._v(" "),n("div",{staticClass:"right-container"},[n("span",[t._v(t._s(t.cardInfo.isBind>0?t.getBankDesc():"未绑定"))]),t._v(" "),n("img",{attrs:{src:"/static/images/personal_enter.png"}})])])])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"left-container"},[s("span",[this._v("我的银行卡")])])}],!1,r,"data-v-c2b15852",null).exports},computed:e()({},Object(i.d)({nickName:function(t){return t.accountInfo.nickname},phoneNum:function(t){return t.accountInfo.phone},passwordSet:function(t){return t.accountInfo.passwordSet},cardInfo:function(t){return t.accountInfo.cardInfo}})),methods:e()({},Object(i.c)(["SETLOGINSTATE"]),Object(i.b)(["getUserInfo"]),{goToCodeReset:function(){this.passwordSet>"0"?this.$router.push({path:"/user/forgetPassword",query:{isFromMineSetting:!0}}):this.$router.push({path:"/user/codeSet"})},goModifyNickname:function(){this.$router.push({path:"/mineSetting/modifyNickname"})},logOut:function(){this.$toast("成功退出登录"),this.$router.push({path:"/"}),this.SETLOGINSTATE({loginState:!1}),localStorage.removeItem("session_id")}})};var l=function(t){n("ODOs")},u=Object(o.a)(d,function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"mine-setting-container"},[n("mt-header",{staticClass:"boder-header",attrs:{title:"个人设置"}},[n("router-link",{attrs:{slot:"left",to:"/mine"},slot:"left"},[n("mt-button",{attrs:{icon:"back"}})],1)],1),t._v(" "),n("div",{staticClass:"item-container"},[t._m(0),t._v(" "),n("div",{staticClass:"space-line"}),t._v(" "),n("div",{staticClass:"item-style",on:{click:t.goModifyNickname}},[n("span",{staticClass:"left-text"},[t._v("昵称")]),t._v(" "),n("div",{staticClass:"right-container"},[n("span",[t._v(t._s(t.nickName))]),t._v(" "),n("img",{attrs:{src:"/static/images/personal_enter.png"}})])]),t._v(" "),n("div",{staticClass:"space-line"}),t._v(" "),n("div",{staticClass:"item-style"},[n("span",{staticClass:"left-text"},[t._v("手机")]),t._v(" "),n("div",{staticClass:"right-container"},[n("span",[t._v(t._s(t.phoneNum))]),t._v(" "),n("img",{attrs:{src:"/static/images/personal_enter.png"}})])]),t._v(" "),n("div",{staticClass:"space-line"}),t._v(" "),n("account-bind",{attrs:{cardInfo:t.cardInfo}}),t._v(" "),n("div",{staticClass:"item-style",on:{click:t.goToCodeReset}},[n("span",{staticClass:"left-text"},[t._v("登录密码")]),t._v(" "),n("div",{staticClass:"right-container"},[n("span",[t._v(t._s(t.passwordSet>"0"?"修改密码":"未设置"))]),t._v(" "),n("img",{attrs:{src:"/static/images/personal_enter.png"}})])])],1),t._v(" "),n("div"),t._v(" "),n("div",{staticClass:"logout-container",on:{click:t.logOut}},[t._v("\n    退出当前账号\n  ")])],1)},[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"item-style-1"},[s("span",{staticClass:"left-text"},[this._v("头像")]),this._v(" "),s("img",{staticClass:"head-img",attrs:{src:"/static/images/photo_f.png"}})])}],!1,l,"data-v-1d1ab782",null);s.default=u.exports},ODOs:function(t,s){},jTGn:function(t,s){}});
//# sourceMappingURL=17.3c6533015b165a7a0eee.js.map