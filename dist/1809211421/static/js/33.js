webpackJsonp([33],{jLJV:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("csgp"),o={props:{option:{type:Object}},components:{ImgUpload:i.a},data:function(){return{isAdd:!0,imgSize:100,imgWidth:null,imgHeight:null,imageUrl:"",positionOptions:this.option.positionOptions,statusOptions:this.option.statusOptions,dataForm:{id:null,position:"",rate:0,type:0,rank:"",title:"",subTitle:"",image:"",url:"",status:1,longTerm:1,beginTime:null,endTime:null,dateOption:[]},dateOption:[],dataRule:{position:[{required:!0,message:"发布位置不能为空",trigger:"blur"}],rank:[{required:!0,message:"排位权重不能为空",trigger:"blur"},{validator:function(t,e,a){/^[0-9]*[1-9][0-9]*$/.test(e)?a():a(new Error("请输入不小于0的整数"))},trigger:"blur"}],title:[{required:!0,message:"标题不能为空",trigger:"blur"}],image:[{required:!0,message:"图片不能为空",trigger:"blur"}],dateOption:[{required:!0,message:"时间段不能为空",trigger:"blur"}]}}},watch:{"dataForm.position":function(t){switch(t){case 1:this.imgWidth=945,this.imgHeight=336;break;case 2:this.imgWidth=1242,this.imgHeight=2208;break;case 3:this.imgWidth=278,this.imgHeight=218;break;case 4:this.imgWidth=144,this.imgHeight=144;break;case 5:this.imgWidth=680,this.imgHeight=114}}},methods:{clearValid:function(){this.$refs.position.clearValidate()},chooseImg:function(t){this.dataForm.image=t,this.$refs.img.clearValidate()},init:function(t){var e=this;this.$nextTick(function(){e.$refs.dataForm.resetFields(),t?(e.isAdd=!1,e.dataForm=t,0===e.dataForm.longTerm?(e.dateOption=[e.dataForm.beginTime,e.dataForm.endTime],e.dataForm.dateOption=e.dateOption):e.dateOption=[]):(e.isAdd=!0,e.dateOption=[],e.dataForm={id:null,position:"",rate:0,type:0,rank:"",title:"",subTitle:"",image:"",url:"",status:1,longTerm:1,beginTime:null,endTime:null,dateOption:[]})})},setFormTime:function(t){t?(this.dataForm.beginTime=t[0],this.dataForm.endTime=t[1],this.dataForm.dateOption=t,this.$refs.dataForm.clearValidate(["dateOption"])):(this.dataForm.beginTime="",this.dataForm.endTime="",this.$refs.dataForm.clearValidate(["dateOption"]))},dataFormSubmit:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(2!==t.dataForm.position&&3!==t.dataForm.position&&4!==t.dataForm.position||(t.dataForm.rank=0),t.$http({headers:{"Content-Type":"application/json; charset=utf-8"},url:t.$http.adornUrl("banner/"+(t.dataForm.id?"update":"save")),method:"post",data:t.$http.adornData(t.dataForm)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.$emit("refreshDataList")}}):t.$message.error(a.msg)}))})},returnList:function(){this.$emit("return")}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bannerEdit"},[a("div",{staticClass:"form-title"},[t._v(t._s(t.isAdd?"新增":"修改"))]),t._v(" "),a("el-form",{ref:"dataForm",staticClass:"common-form",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"}},[a("el-form-item",{ref:"position",attrs:{label:"发布位置",prop:"position"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:!t.isAdd},on:{change:t.clearValid},model:{value:t.dataForm.position,callback:function(e){t.$set(t.dataForm,"position",e)},expression:"dataForm.position"}},t._l(t.positionOptions,function(e){return null!==e.value?a("el-option",{key:e.value,attrs:{label:e.text,value:e.value}}):t._e()}))],1),t._v(" "),1===t.dataForm.position||5===t.dataForm.position?a("el-form-item",{attrs:{label:"排序",prop:"rank"}},[a("el-input",{model:{value:t.dataForm.rank,callback:function(e){t.$set(t.dataForm,"rank",e)},expression:"dataForm.rank"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"标题",prop:"title"}},[3===t.dataForm.position||4===t.dataForm.position?a("el-input",{attrs:{maxlength:"7",placeholder:"最多输入7个字符"},model:{value:t.dataForm.title,callback:function(e){t.$set(t.dataForm,"title",e)},expression:"dataForm.title"}}):a("el-input",{model:{value:t.dataForm.title,callback:function(e){t.$set(t.dataForm,"title",e)},expression:"dataForm.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"子标题",prop:"subTitle"}},[3===t.dataForm.position||4===t.dataForm.position?a("el-input",{attrs:{maxlength:"8",placeholder:"最多输入8个字符"},model:{value:t.dataForm.subTitle,callback:function(e){t.$set(t.dataForm,"subTitle",e)},expression:"dataForm.subTitle"}}):a("el-input",{model:{value:t.dataForm.subTitle,callback:function(e){t.$set(t.dataForm,"subTitle",e)},expression:"dataForm.subTitle"}})],1),t._v(" "),a("el-form-item",{ref:"img",attrs:{label:"图片",prop:"image"}},[a("img-upload",{attrs:{"orgin-img":t.dataForm.image,"img-size":t.imgSize,width:t.imgWidth,height:t.imgHeight},on:{choose:t.chooseImg}})],1),t._v(" "),a("el-form-item",{attrs:{label:"URL",prop:"url"}},[a("el-input",{model:{value:t.dataForm.url,callback:function(e){t.$set(t.dataForm,"url",e)},expression:"dataForm.url"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"展示时间",prop:"longTerm"}},[a("el-radio-group",{model:{value:t.dataForm.longTerm,callback:function(e){t.$set(t.dataForm,"longTerm",e)},expression:"dataForm.longTerm"}},[a("el-radio",{attrs:{label:1}},[t._v("长期")]),t._v(" "),a("el-radio",{attrs:{label:0}},[t._v("选择时间段")])],1)],1),t._v(" "),0===t.dataForm.longTerm?a("el-form-item",{staticStyle:{"margin-top":"-20px"},attrs:{label:"",prop:"dateOption"}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},on:{change:t.setFormTime},model:{value:t.dateOption,callback:function(e){t.dateOption=e},expression:"dateOption"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-radio-group",{model:{value:t.dataForm.status,callback:function(e){t.$set(t.dataForm,"status",e)},expression:"dataForm.status"}},t._l(t.statusOptions,function(e){return null!==e.value?a("el-radio",{attrs:{label:e.value}},[t._v(t._s(e.text))]):t._e()}))],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(e){t.dataFormSubmit()}}},[t._v("发布")]),t._v(" "),a("el-button",{on:{click:function(e){t.returnList()}}},[t._v("返回")])],1)],1)],1)},staticRenderFns:[]},l=a("VU/8")(o,r,!1,null,null,null);e.default=l.exports}});