webpackJsonp([24,32],{"/bbW":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={components:{ImgUpload:a("csgp").a},data:function(){return{isAdd:!0,imgSize:100,imgWidth:48,imgHeight:48,dataForm:{id:"",name:"",version:null,android:1,ios:1,iconUrl:"",selectedIconUrl:"",webUrl:""},dataRule:{name:[{required:!0,message:"名称不能为空",trigger:"blur"}],version:[{required:!0,message:"版本号不能为空",trigger:"blur"}],iconUrl:[{required:!0,message:"icon不能为空",trigger:"blur"}],selectedIconUrl:[{required:!0,message:"选中icon不能为空",trigger:"blur"}]},statusOptions:[{value:1,text:"展示"},{value:0,text:"隐藏"}]}},created:function(){},methods:{chooseImg:function(t){this.dataForm.iconUrl=t,this.$refs.icon.clearValidate()},chooseSelectImg:function(t){this.dataForm.selectedIconUrl=t,this.$refs.selectedIcon.clearValidate()},init:function(t){this.dataForm.id=t.id,this.dataForm.name=t.name,this.dataForm.version=t.version,this.dataForm.android=t.android,this.dataForm.ios=t.ios,this.dataForm.iconUrl=t.iconUrl,this.dataForm.selectedIconUrl=t.selectedIconUrl,this.dataForm.webUrl=t.webUrl},dataFormSubmit:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&t.$http({headers:{"Content-Type":"application/json; charset=utf-8"},url:t.$http.adornUrl("hotSpotManage/saveEntrySet"),method:"post",data:t.$http.adornData(t.dataForm)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.$emit("refreshDataList")}}):t.$message.error(a.msg)})})},returnList:function(){this.$emit("return")}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bannerEdit"},[a("div",{staticClass:"form-title"},[t._v("修改")]),t._v(" "),a("el-form",{ref:"dataForm",staticClass:"common-form",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"版本号",prop:"version"}},[a("el-input",{model:{value:t.dataForm.version,callback:function(e){t.$set(t.dataForm,"version",e)},expression:"dataForm.version"}})],1),t._v(" "),a("el-form-item",{ref:"icon",attrs:{label:"icon",prop:"iconUrl"}},[a("img-upload",{attrs:{"orgin-img":t.dataForm.iconUrl,"img-size":t.imgSize,width:t.imgWidth,height:t.imgHeight},on:{choose:t.chooseImg}})],1),t._v(" "),a("el-form-item",{ref:"selectedIcon",attrs:{label:"选中icon",prop:"selectedIconUrl"}},[a("img-upload",{attrs:{"orgin-img":t.dataForm.selectedIconUrl,"img-size":t.imgSize,width:t.imgWidth,height:t.imgHeight},on:{choose:t.chooseSelectImg}})],1),t._v(" "),a("el-form-item",{attrs:{label:"H5链接",prop:"webUrl"}},[a("el-input",{model:{value:t.dataForm.webUrl,callback:function(e){t.$set(t.dataForm,"webUrl",e)},expression:"dataForm.webUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"安卓",prop:"android"}},[a("el-radio-group",{model:{value:t.dataForm.android,callback:function(e){t.$set(t.dataForm,"android",e)},expression:"dataForm.android"}},t._l(t.statusOptions,function(e){return null!==e.value?a("el-radio",{attrs:{label:e.value}},[t._v(t._s(e.text))]):t._e()}))],1),t._v(" "),a("el-form-item",{attrs:{label:"IOS",prop:"ios"}},[a("el-radio-group",{model:{value:t.dataForm.ios,callback:function(e){t.$set(t.dataForm,"ios",e)},expression:"dataForm.ios"}},t._l(t.statusOptions,function(e){return null!==e.value?a("el-radio",{attrs:{label:e.value}},[t._v(t._s(e.text))]):t._e()}))],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dataFormSubmit()}}},[t._v("发布")]),t._v(" "),a("el-button",{on:{click:function(e){t.returnList()}}},[t._v("返回")])],1)],1)],1)},staticRenderFns:[]},n=a("VU/8")(i,r,!1,null,null,null);e.default=n.exports},YFSE:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={components:{DialogEntrance:a("/bbW").default},data:function(){return{loading:!1,dialogShow:!1,dataList:[]}},watch:{},activated:function(){this.getDataList()},methods:{closeDialog:function(){this.dialogShow=!1,this.getDataList()},resetForm:function(){this.dataForm={dateBegin:"",dateEnd:"",title:"",position:"",status:""},this.dateOption=""},getDataList:function(){var t=this;this.loading=!0;var e={page:this.pageIndex,limit:this.pageSize};this.$http({url:this.$http.adornUrl("hotSpotManage/entrySetList"),method:"get",data:this.$http.adornParams(e,!1)}).then(function(e){var a=e.data;t.dataList=a,t.loading=!1})},refreshDataList:function(){this.dialogShow=!1,this.getDataList()},addOrUpdateHandle:function(t){var e=this;this.dialogShow=!0,this.$nextTick(function(){e.$refs.addOrUpdate.init(t)})},changeState:function(t,e){var a=this,i=t;i.ios=e,i.android=e,this.$http({headers:{"Content-Type":"application/json; charset=utf-8"},url:this.$http.adornUrl("hotSpotManage/saveEntrySet"),method:"post",data:this.$http.adornData(i)}).then(function(t){var e=t.data;e&&0===e.code?a.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){a.visible=!1,a.getDataList()}}):a.$message.error(e.msg)})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"omt-bannerAdmin"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.dialogShow,expression:"!dialogShow"}],staticClass:"bannerAdminWrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataList,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name","header-align":"center",align:"center",width:"150",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"version","header-align":"center",align:"center",width:"200",label:"版本号"}}),t._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:"安卓"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.android?a("span",[t._v("展示")]):a("span",[t._v("隐藏")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:"ios"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.ios?a("span",[t._v("展示")]):a("span",[t._v("隐藏")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:"icon"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.iconUrl,height:"40"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:"选中icon"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{attrs:{src:t.row.selectedIconUrl,height:"40"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"250",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.addOrUpdateHandle(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.changeState(e.row,1)}}},[t._v("展示")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.changeState(e.row,0)}}},[t._v("隐藏")])]}}])})],1)],1),t._v(" "),a("dialog-entrance",{directives:[{name:"show",rawName:"v-show",value:t.dialogShow,expression:"dialogShow"}],ref:"addOrUpdate",on:{refreshDataList:t.refreshDataList,return:function(e){t.closeDialog()}}})],1)},staticRenderFns:[]},n=a("VU/8")(i,r,!1,null,null,null);e.default=n.exports}});