webpackJsonp([31],{"0d7Q":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("csgp"),o={props:{option:{type:Object}},components:{ImgUpload:a.a},data:function(){return{isAdd:!0,imgSize:100,imgWidth:200,imgHeight:128,positionOptions:this.option.positionOptions,statusOptions:this.option.statusOptions,dataForm:{id:null,position:null,title:"",img:"",url:"",status:1},dataRule:{position:[{validator:function(t,e,i){""===e||null===e?i():/^[0-9]*[1-9][0-9]*$/.test(e)?i():i(new Error("请输入不小于0的整数"))},trigger:"blur"}],title:[{required:!0,message:"标题不能为空",trigger:"blur"}],img:[{required:!0,message:"图片不能为空",trigger:"blur"}],url:[{required:!0,message:"URL不能为空",trigger:"blur"}]}}},created:function(){},methods:{chooseImg:function(t){this.dataForm.img=t,this.$refs.img.clearValidate()},init:function(t){var e=this;this.$nextTick(function(){e.$refs.dataForm.resetFields()}),t?(this.isAdd=!1,this.dataForm=t):(this.isAdd=!0,this.dataForm={id:null,position:null,title:"",img:"",url:"",status:1})},dataFormSubmit:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(console.log(t.dataForm),t.$http({headers:{"Content-Type":"application/json; charset=utf-8"},url:t.$http.adornUrl("infoflow/"+(t.dataForm.id?"advUpdate":"advSave")),method:"post",data:t.$http.adornData(t.dataForm)}).then(function(e){var i=e.data;i&&0===i.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.$emit("refreshDataList")}}):t.$message.error(i.msg)}))})},returnList:function(){this.$emit("return")}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bannerEdit"},[i("div",{staticClass:"form-title"},[t._v(t._s(t.isAdd?"新增":"修改"))]),t._v(" "),i("el-form",{ref:"dataForm",staticClass:"common-form",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"位置序号",prop:"position"}},[i("el-input",{model:{value:t.dataForm.position,callback:function(e){t.$set(t.dataForm,"position",e)},expression:"dataForm.position"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"标题",prop:"title"}},[i("el-input",{model:{value:t.dataForm.title,callback:function(e){t.$set(t.dataForm,"title",e)},expression:"dataForm.title"}})],1),t._v(" "),i("el-form-item",{ref:"img",attrs:{label:"图片",prop:"img"}},[i("img-upload",{attrs:{"orgin-img":t.dataForm.img,"img-size":t.imgSize,width:t.imgWidth,height:t.imgHeight},on:{choose:t.chooseImg}})],1),t._v(" "),i("el-form-item",{attrs:{label:"URL",prop:"url"}},[i("el-input",{model:{value:t.dataForm.url,callback:function(e){t.$set(t.dataForm,"url",e)},expression:"dataForm.url"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"状态",prop:"status"}},[i("el-radio-group",{model:{value:t.dataForm.status,callback:function(e){t.$set(t.dataForm,"status",e)},expression:"dataForm.status"}},t._l(t.statusOptions,function(e,a){return null!==e.value?i("el-radio",{key:a,attrs:{label:e.value}},[t._v(t._s(e.text))]):t._e()}))],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dataFormSubmit()}}},[t._v("发布")]),t._v(" "),i("el-button",{on:{click:function(e){t.returnList()}}},[t._v("返回")])],1)],1)],1)},staticRenderFns:[]},s=i("VU/8")(o,r,!1,null,null,null);e.default=s.exports}});