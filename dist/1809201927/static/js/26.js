webpackJsonp([26],{aW6g:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("E4LH"),i={data:function(){return{isAdd:!0,visible:!1,roleList:[],queryList:[],dataForm:{id:null,userId:"",mobile:"",name:"",registTime:"",rule:"",mark:""},dataRule:{userId:[{required:!0,message:"用户ID不能为空",trigger:"blur"}],mobile:[{required:!0,message:"手机号不能为空",trigger:"blur"},{validator:function(e,t,a){console.log(e),Object(r.b)(t)?a():a(new Error("手机号格式错误"))},trigger:"blur"}]}}},mounted:function(){this.queryList=this.loadAll()},methods:{init:function(e){var t=this;console.log(e),this.$nextTick(function(){t.$refs.dataForm.resetFields()}),e?(this.isAdd=!1,this.dataForm=e):this.isAdd=!0},dataFormSubmit:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&e.$http({headers:{"Content-Type":"application/json; charset=utf-8"},url:e.$http.adornUrl("sys/user/"+(e.dataForm.id?"update":"save")),method:"post",data:e.$http.adornData({userId:e.dataForm.id||void 0,username:e.dataForm.userName,password:e.dataForm.password,salt:e.dataForm.salt,email:e.dataForm.email,mobile:e.dataForm.mobile,status:e.dataForm.status,roleIdList:e.dataForm.roleIdList})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}):e.$message.error(a.msg)})})},returnList:function(){this.$emit("return")},loadAll:function(){return[{phone:"13648484427",name:"梁琪",registTime:"2015-05-15 12:15:16"},{phone:"15015497642",name:"叶青",registTime:"2015-05-15 12:15:16"},{phone:"13465145955",name:"王昭昭",registTime:"2015-06-15 12:25:16"},{phone:"13558686454",name:"刘强东",registTime:"2015-03-15 12:15:16"},{phone:"13648599627",name:"雷斯蒂",registTime:"2015-05-15 12:15:16"},{phone:"15654548786",name:"澄澈",registTime:"2015-06-15 12:15:16"},{phone:"13657854545",name:"沈长妮",registTime:"2015-05-15 12:15:16"},{phone:"15055587877",name:"程思安",registTime:"2015-05-15 12:15:16"},{phone:"15677454454",name:"黄思琪",registTime:"2015-05-15 12:15:16"},{phone:"15015417874",name:"刘德福",registTime:"2015-05-15 12:15:16"},{phone:"13568845454",name:"李兴强",registTime:"2015-05-15 12:15:16"},{phone:"16454854544",name:"黄石",registTime:"2015-05-15 12:15:16"},{phone:"18745434435",name:"刘诗诗",registTime:"2015-05-15 12:15:16"}]},querySearchAsync:function(e,t){var a=this.queryList,r=e?a.filter(this.createStateFilter(e)):a;clearTimeout(this.timeout),this.timeout=setTimeout(function(){t(r)},3e3*Math.random())},createStateFilter:function(e){return function(t){return 0===t.phone.toLowerCase().indexOf(e.toLowerCase())}},handleSelect:function(e){console.log(e);var t=e.phone,a=e.name,r=e.registTime;this.dataForm.mobile=t,this.dataForm.name=a,this.dataForm.registTime=r,this.$refs.dataForm.clearValidate(["mobile"])}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"form-title"},[e._v(e._s(e.isAdd?"新增":"详情"))]),e._v(" "),a("el-form",{ref:"dataForm",staticClass:"common-form",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"用户ID",prop:"userId"}},[a("el-input",{attrs:{placeholder:"用户ID",disabled:!e.isAdd},model:{value:e.dataForm.userId,callback:function(t){e.$set(e.dataForm,"userId",t)},expression:"dataForm.userId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[a("el-autocomplete",{ref:"autocomplete",staticStyle:{width:"100%"},attrs:{"fetch-suggestions":e.querySearchAsync,placeholder:"请输入内容","value-key":"phone",disabled:!e.isAdd},on:{select:e.handleSelect},model:{value:e.dataForm.mobile,callback:function(t){e.$set(e.dataForm,"mobile",t)},expression:"dataForm.mobile"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户昵称"}},[a("span",[e._v(e._s(e.dataForm.name))])]),e._v(" "),a("el-form-item",{attrs:{label:"注册时间"}},[a("span",[e._v(e._s(e.dataForm.registTime))])]),e._v(" "),a("el-form-item",{attrs:{label:"限制条件",prop:"rule"}},[a("el-checkbox",{attrs:{disabled:!e.isAdd},model:{value:e.dataForm.rule,callback:function(t){e.$set(e.dataForm,"rule",t)},expression:"dataForm.rule"}},[e._v("限制活动")])],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"rule"}},[a("el-input",{attrs:{type:"textarea",disabled:!e.isAdd},model:{value:e.dataForm.mark,callback:function(t){e.$set(e.dataForm,"mark",t)},expression:"dataForm.mark"}})],1),e._v(" "),a("el-form-item",[e.isAdd?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")]):e._e(),e._v(" "),a("el-button",{on:{click:function(t){e.returnList()}}},[e._v("返回")])],1)],1)],1)},staticRenderFns:[]},s=a("VU/8")(i,o,!1,null,null,null);t.default=s.exports}});