webpackJsonp([10],{"0lIC":function(t,e,s){"use strict";var a={components:{},props:{htmlContent:String,imgSrc:String,desc:String},data:function(){return{}},watch:{},computed:{},methods:{},created:function(){},mounted:function(){}},o=s("XyMi");var i=function(t){s("TTjy")},n=Object(o.a)(a,function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.htmlContent?s("div",{staticClass:"base-info"},[s("div",[s("img",{attrs:{src:t.imgSrc}}),t._v(" "),s("span",{staticClass:"desc"},[t._v(t._s(t.desc))])]),t._v(" "),s("div",{domProps:{innerHTML:t._s(t.htmlContent)}})]):t._e()},[],!1,i,"data-v-681770d9",null);e.a=n.exports},"194r":function(t,e){},OdQL:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("0lIC"),o=s("V9e1"),i=s("N+NQ"),n=s("M4fF"),c=s.n(n),r={components:{CardInfoSegment:a.a,CardInfoDialog:o.a,Toast:i.a},props:{},data:function(){return{bankInfo:{id:"",icon:"",categoryName1:"",categoryContent1:"",categoryName2:"",categoryContent2:"",propaganda:"",name:"",rebate:0,status:"",tag1:"",tag2:"",tag3:"",url:"",color:"",inners:1},baseRightsImgSrc:"/static/images/king_icon.png",baseRebateImgSrc:"/static/images/money_icon.png",dialogPhoneVisible:!1,dialogSmsVisible:!1,verifyImg:"",verifyCode:"",smsCode:"",phoneNo:"",phoneNoTemp:"",toastShow:!1,toastContent:"",countDownStr:"获取短信验证码",smsBtnDisable:!1}},watch:{},computed:{showMid:function(){return this.categoryName1||this.bankInfo.categoryName2}},methods:{loadImg:function(){this.bankInfo.color;this.$refs.topBg.style.backgroundColor=this.getColor(this.bankInfo.color)},getColor:function(t){return["#2371FF","#2371FF","#FF3F46","#43C6CD ","#FF821A"," #6E46DD"][t]},defaultClick:function(){this.dialogPhoneVisible=!1,this.dialogSmsVisible=!1},actionApply:c.a.debounce(function(){var t=this.$store.state.accountInfo.uid;t?this.$toast("uid是："+t):(this.$toast("未登录"),this.$router.push({name:"login"}))},500),phoneClick:c.a.debounce(function(){this.checkPhone()&&(this.dialogPhoneVisible=!1,this.phoneNoTemp===this.phoneNo?this.nextStep(!1):this.GeneralGetData({url:"/app/rebate/addreg/needCode",reqData:{phone:this.phoneNo,type:2},callback:"loadIsNeedCodeCallBack"}))},500),loadIsNeedCodeCallBack:function(t){this.dialogPhoneVisible=!1,0==t.isSuccess?1==t.responseData.code?this.dialogSmsVisible=!0:0==t.responseData.code?this.nextStep(!1):t.responseData.msg&&this.showToast(t.responseData.msg):this.showToast(t.responseData)},checkPhone:function(){var t=this.validaePhoneNumber(this.phoneNo);return!t||(this.showToast(t),!1)},getVerifyImg:c.a.debounce(function(){this.checkPhone()&&this.GeneralGetData({url:"/app/imagecode/index2",reqData:{phone:this.phoneNo},callback:"onGetVerifyImg"})},500),onGetVerifyImg:function(t){0==t.isSuccess?t.responseData.image&&(this.verifyImg="data:image/png;base64,"+t.responseData.image):this.showToast(t.responseData)},getSmsCode:function(){this.smsBtnDisable||(this.checkPhone()&&this.verifyCode?(this.smsCountDown(),this.GeneralGetData({url:"/app/captcha",reqData:{phone:this.phoneNo,type:"3",imgcode:this.verifyCode},callback:"onGetSmsCode"})):this.showToast("请输入图形验证码"))},onGetSmsCode:function(t){0==t.isSuccess?this.showToast("验证码已发送至手机"):this.showToast(t.responseData)},smsCountDown:function(){var t=this;this.timer||(this.count=60,this.timer=setInterval(function(){t.count>0&&t.count<=60?(t.smsBtnDisable=!0,t.count--,t.countDownStr=t.count+"s"):(t.smsBtnDisable=!1,clearInterval(t.timer),t.countDownStr="重新发送",t.timer=null)},1e3))},smsClick:c.a.debounce(function(){this.checkPhone()&&(this.smsCode?this.nextStep(!0):this.showToast("请输入短信验证码"))},500),finalStep:function(){this.bankInfo.url&&(this.bankInfo.inners&&1==this.bankInfo.inners?this.ToAppPage(this.bankInfo.url):this.ToBrowserFromAppPage(this.bankInfo.url,""))},nextStep:function(t){var e={type:2,p2p_name:this.bankInfo.name,reg_account:this.phoneNo};t&&(e.code=this.smsCode),this.GeneralGetData({url:"/app/rebate/addregNew",reqData:e,callback:"addregNewCallback"})},addregNewCallback:function(t){0==t.isSuccess?this.finalStep():this.showToast(t.responseData)},dismiss:function(){this.toastShow=!1},showToast:function(t){t&&(this.toastContent=t,this.toastShow=!0)},getUserUidCallBack:function(t){t?this.GetUserPhone():this.ToAppPage("/home/loginActivity","",!0)},getUserPhoneCallBack:function(t){this.phoneNo=t,this.phoneNoTemp=t,this.dialogPhoneVisible=!0}},created:function(){console.log(this.$route),this.bankInfo=this.$route.query.id,top.window.getUserUidCallBack=this.getUserUidCallBack,top.window.getUserPhoneCallBack=this.getUserPhoneCallBack,top.window.onGetVerifyImg=this.onGetVerifyImg,top.window.onGetSmsCode=this.onGetSmsCode,top.window.loadIsNeedCodeCallBack=this.loadIsNeedCodeCallBack,top.window.addregNewCallback=this.addregNewCallback},mounted:function(){this.loadImg()}},l=s("XyMi");var d=function(t){s("194r")},p=Object(l.a)(r,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"title",rawName:"v-title",value:t.bankInfo.name,expression:"bankInfo.name"}],staticClass:"bk-info-container"},[s("div",{ref:"topBg",staticClass:"bank-top"},[s("div",{staticClass:"card-img"},[t.bankInfo.icon?s("img",{ref:"myImg",attrs:{src:t.bankInfo.icon,onerror:"javascript:this.src='/static/images/bank_default.jpg';"}}):t._e()]),t._v(" "),s("div",{staticClass:"top-right"},[s("div",{staticClass:"top"},[s("span",{staticClass:"bank-name"},[t._v(t._s(t.bankInfo.name))]),t._v(" "),s("span",{staticClass:"bank-divider"},[t._v("|")]),t._v(" "),t.bankInfo.propaganda?s("span",{staticClass:"rights"},[t._v(t._s(t.bankInfo.propaganda))]):t._e()]),t._v(" "),s("div",{staticClass:"tag-class"},[t.bankInfo.tag1?s("span",{staticClass:"tag1"},[t._v(t._s(t.bankInfo.tag1))]):t._e(),t._v(" "),t.bankInfo.tag2?s("span",{staticClass:"tag2"},[t._v(t._s(t.bankInfo.tag2))]):t._e(),t._v(" "),t.bankInfo.tag3?s("span",{staticClass:"tag3"},[t._v(t._s(t.bankInfo.tag3))]):t._e()])])]),t._v(" "),t.showMid?s("div",{staticClass:"mid-class"},[s("card-info-segment",{attrs:{desc:t.bankInfo.categoryName1,imgSrc:t.baseRightsImgSrc,htmlContent:t.bankInfo.categoryContent1}}),t._v(" "),s("card-info-segment",{attrs:{desc:t.bankInfo.categoryName2,imgSrc:t.baseRebateImgSrc,htmlContent:t.bankInfo.categoryContent2}})],1):t._e(),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"apply-class",on:{click:t.actionApply}},[t._v("\n        立即申请\n    ")]),t._v(" "),s("card-info-dialog",{attrs:{dialogTitle:"办卡预登记",dialogVisible:t.dialogPhoneVisible},on:{"update:dialogVisible":function(e){t.dialogPhoneVisible=e},defaultClick:t.defaultClick,primaryClick:t.phoneClick}},[s("div",{staticClass:"d-content-phone"},[s("span",[t._v("请输入您申请信用卡的手机号码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneNo,expression:"phoneNo"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入手机号"},domProps:{value:t.phoneNo},on:{input:function(e){e.target.composing||(t.phoneNo=e.target.value)}}})])]),t._v(" "),s("card-info-dialog",{attrs:{dialogTitle:"办卡预登记",dialogVisible:t.dialogSmsVisible},on:{"update:dialogVisible":function(e){t.dialogSmsVisible=e},defaultClick:t.defaultClick,primaryClick:t.smsClick}},[s("div",{staticClass:"d-content-sms"},[s("span",[t._v("请输入您申请信用卡的手机号码")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneNo,expression:"phoneNo"}],staticClass:"weui-input input-sms",attrs:{type:"tel",placeholder:"请输入手机号"},domProps:{value:t.phoneNo},on:{input:function(e){e.target.composing||(t.phoneNo=e.target.value)}}}),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.verifyCode,expression:"verifyCode"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入图形验证码"},domProps:{value:t.verifyCode},on:{input:function(e){e.target.composing||(t.verifyCode=e.target.value)}}}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!t.verifyImg,expression:"!verifyImg"}],staticClass:"get-verify-btn",on:{click:t.getVerifyImg}},[t._v("获取图形验证码")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.verifyImg,expression:"verifyImg"}],staticClass:"verify-img",on:{click:t.getVerifyImg}},[s("img",{attrs:{src:t.verifyImg,alt:"单击图片刷新"}})])]),t._v(" "),s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.smsCode,expression:"smsCode"}],staticClass:"weui-input",attrs:{type:"tel",placeholder:"请输入短信验证码"},domProps:{value:t.smsCode},on:{input:function(e){e.target.composing||(t.smsCode=e.target.value)}}}),t._v(" "),s("span",{staticClass:"get-verify-btn",on:{click:t.getSmsCode}},[t._v(t._s(t.countDownStr))])])])]),t._v(" "),s("toast",{attrs:{showToast:t.toastShow,toastContent:t.toastContent},on:{"update:showToast":function(e){t.toastShow=e},dismiss:t.dismiss}})],1)},[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flow-class"},[s("div",[s("img",{attrs:{src:"/static/images/process-icon.png"}}),t._v(" "),s("span",[t._v("返利流程")])]),t._v(" "),s("div",{staticClass:"flow-step"},[s("img",{attrs:{src:"/static/images/apply.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/write.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/great.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/next.png"}}),t._v(" "),s("img",{attrs:{src:"/static/images/get.png"}})]),t._v(" "),s("div",{staticClass:"flow-step-text"},[s("span",[t._v("申请卡片")]),t._v(" "),s("span",[t._v("官网填写")]),t._v(" "),s("span",[t._v("成功办卡")]),t._v(" "),s("span",[t._v("获得返利")])])])}],!1,d,"data-v-1490d613",null);e.default=p.exports},TTjy:function(t,e){}});
//# sourceMappingURL=10.3d581db6cadbdb46d46d.js.map