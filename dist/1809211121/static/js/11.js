webpackJsonp([11],{Q0Dt:function(a,t,e){(a.exports=e("FZ+f")(!1)).push([a.i,"\n.addOrUpdate .title {\n  font-size: 16px;\n}\n.addOrUpdate .el-form-item__content {\n  width: 50%;\n}\n.myinput {\n  width: 60%;\n  margin-left: 20px;\n}\n.red {\n  color: red;\n}\n",""])},QkHV:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__=__webpack_require__("mvHQ"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_1__components_Editor__=__webpack_require__("iTKD"),__WEBPACK_IMPORTED_MODULE_2__components_img_upload__=__webpack_require__("csgp"),__WEBPACK_IMPORTED_MODULE_3__utils_validate__=__webpack_require__("E4LH");__webpack_exports__.a={data:function(){return{title:null,dataForm:{id:0,rank:"",imgUrl:"",name:"",propaganda:"",rebate:"",rebateDescription:"",color:1,tab1:"",tab2:"",tab3:"",annualFee:"",interestFeePeriod:"",grade:"",organization:"",currency:"",categoryName1:"",categoryContent1:"",categoryName2:"",categoryContent2:"",link:"",status:1,type:0,cardManyPeople:"",cardBankName:"",cardBankId:"",cardGrade:"",cardUse:"",cardAnnual:"",cardOrganization:"",cardCurrency:"",cardExtral:""},dataRule:{rank:[{required:!0,message:"排名权重不能为空",trigger:"blur"},{validator:function(a,t,e){Object(__WEBPACK_IMPORTED_MODULE_3__utils_validate__.c)(t)?e():e(new Error("您输入的排名权重不是正整数"))},trigger:"blur"}],imgUrl:[{required:!0,message:"信用卡图片不能为空",trigger:"blur"}],name:[{required:!0,message:"信用卡名称不能为空",trigger:"blur"}],propaganda:[{required:!0,message:"信用卡宣传语不能为空",trigger:"blur"}]},editorCon1:"",editorCon2:"",imgWidth:608,imgHeight:380,imgSize:200,bankList:[]}},components:{ImgUpload:__WEBPACK_IMPORTED_MODULE_2__components_img_upload__.a,Editor:__WEBPACK_IMPORTED_MODULE_1__components_Editor__.a},created:function(){this.getBankList()},methods:{getBankList:function(){var a=this;this.$http({url:this.$http.adornUrl("/bank/list"),method:"post",params:this.$http.adornParams({limit:1e3})}).then(function(t){var e=t.data;e&&0===e.code?a.bankList=e.page.list:a.bankList=[]})},chooseImg:function(a){this.dataForm.imgUrl=a,this.$refs.imgUrl.clearValidate(["imgUrl"])},init:function(a,t){this.dataForm.id=a||0,this.title=this.dataForm.id?"编辑":"新增",this.dataForm.id&&(this.dataForm=t,this.dataForm.rebate=t.rebate/100,this.editorCon1=this.dataForm.categoryContent1,this.editorCon2=this.dataForm.categoryContent2,console.log(this.dataForm.cardOrganization),null!=this.dataForm.cardOrganization&&(this.dataForm.cardOrganization=this.dataForm.cardOrganization.split(",")),console.log(this.dataForm.cardExtral),null!=this.dataForm.cardExtral&&(this.dataForm.cardExtral=this.dataForm.cardExtral.split(",")))},returnList:function(){this.$emit("refreshDataList")},getEditor1:function(a){this.dataForm.categoryContent1=a},getEditor2:function(a){this.dataForm.categoryContent2=a},dataFormSubmit:function dataFormSubmit(){var _this2=this;this.$refs.dataForm.validate(function(valid){if(valid){if(_this2.dataForm.rank<1||_this2.dataForm.rank>1e3)return void _this2.$alert("您输入的排名权重范围不是1-1000","提示",{confirmButtonText:"确定"});if(_this2.dataForm.rebate<0)return void _this2.$alert("您输入的返利金额不能小于0","提示",{confirmButtonText:"确定"});var dataForm=_this2.dataForm,bankList=_this2.bankList.find(function(a){if(a.name==dataForm.cardBankName)return!0});bankList&&(_this2.dataForm.cardBankId=bankList.id),console.log(_this2.dataForm.cardOrganization),console.log(_this2.dataForm.cardExtral);var params=eval("("+(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(_this2.dataForm)+__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()({rebate:Math.round(100*_this2.dataForm.rebate),cardOrganization:null==_this2.dataForm.cardOrganization?"":_this2.dataForm.cardOrganization.join(","),cardExtral:null==_this2.dataForm.cardExtral?"":_this2.dataForm.cardExtral.join(",")})).replace(/}{/,",")+")");_this2.$http({headers:{"Content-Type":"application/json; charset=utf-8"},url:_this2.$http.adornUrl("/creditCard/"+(_this2.dataForm.id?"edit":"add")),method:"post",data:_this2.$http.adornData(params,!1)}).then(function(a){var t=a.data;t&&0===t.code?_this2.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){_this2.$emit("refreshDataList")}}):_this2.$message.error(t.msg)})}})}}}},W03O:function(a,t,e){var r=e("Q0Dt");"string"==typeof r&&(r=[[a.i,r,""]]),r.locals&&(a.exports=r.locals);e("rjj0")("c561f3fe",r,!0)},ZNQ9:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("QkHV"),o={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"addOrUpdate"},[e("div",{staticClass:"title"},[a._v(a._s(a.title))]),a._v(" "),e("el-form",{ref:"dataForm",attrs:{model:a.dataForm,rules:a.dataRule,"label-width":"180px"}},[e("el-form-item",{attrs:{label:"排名权重",prop:"rank"}},[e("el-input",{attrs:{placeholder:"权重范围为1-1000"},model:{value:a.dataForm.rank,callback:function(t){a.$set(a.dataForm,"rank",t)},expression:"dataForm.rank"}})],1),a._v(" "),e("el-form-item",{ref:"imgUrl",attrs:{label:"信用卡图片",prop:"imgUrl"}},[e("img-upload",{attrs:{"orgin-img":a.dataForm.imgUrl,"img-size":a.imgSize,width:a.imgWidth,height:a.imgHeight},on:{choose:a.chooseImg}})],1),a._v(" "),e("el-form-item",{attrs:{label:"信用卡名称",prop:"name"}},[e("el-input",{attrs:{placeholder:"信用卡名称"},model:{value:a.dataForm.name,callback:function(t){a.$set(a.dataForm,"name",t)},expression:"dataForm.name"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"信用卡宣传语",prop:"propaganda"}},[e("el-input",{attrs:{placeholder:"信用卡宣传语",maxlength:"15"},model:{value:a.dataForm.propaganda,callback:function(t){a.$set(a.dataForm,"propaganda",t)},expression:"dataForm.propaganda"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"返利金额(元)",prop:"rebate"}},[e("el-input",{attrs:{placeholder:"返利金额(元)"},model:{value:a.dataForm.rebate,callback:function(t){a.$set(a.dataForm,"rebate",t)},expression:"dataForm.rebate"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"返利标识",prop:"rebateDescription"}},[e("el-input",{attrs:{placeholder:"返利标识",maxlength:"5"},model:{value:a.dataForm.rebateDescription,callback:function(t){a.$set(a.dataForm,"rebateDescription",t)},expression:"dataForm.rebateDescription"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"标签1",prop:"tab1"}},[e("el-input",{attrs:{placeholder:"标签1",maxlength:"8"},model:{value:a.dataForm.tab1,callback:function(t){a.$set(a.dataForm,"tab1",t)},expression:"dataForm.tab1"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"标签2",prop:"tab2"}},[e("el-input",{attrs:{placeholder:"标签2",maxlength:"8"},model:{value:a.dataForm.tab2,callback:function(t){a.$set(a.dataForm,"tab2",t)},expression:"dataForm.tab2"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"标签3",prop:"tab3"}},[e("el-input",{attrs:{placeholder:"标签3",maxlength:"8"},model:{value:a.dataForm.tab3,callback:function(t){a.$set(a.dataForm,"tab3",t)},expression:"dataForm.tab3"}})],1),a._v(" "),e("div",{staticClass:"title"},[a._v("基本信息")]),a._v(" "),e("el-form-item",{attrs:{label:"年费",prop:"annualFee"}},[e("el-input",{attrs:{placeholder:"年费"},model:{value:a.dataForm.annualFee,callback:function(t){a.$set(a.dataForm,"annualFee",t)},expression:"dataForm.annualFee"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"免息期限",prop:"interestFeePeriod"}},[e("el-input",{attrs:{placeholder:"免息期限"},model:{value:a.dataForm.interestFeePeriod,callback:function(t){a.$set(a.dataForm,"interestFeePeriod",t)},expression:"dataForm.interestFeePeriod"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"等级",prop:"grade"}},[e("el-input",{attrs:{placeholder:"等级"},model:{value:a.dataForm.grade,callback:function(t){a.$set(a.dataForm,"grade",t)},expression:"dataForm.grade"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"发卡组织",prop:"organization"}},[e("el-input",{attrs:{placeholder:"发卡组织"},model:{value:a.dataForm.organization,callback:function(t){a.$set(a.dataForm,"organization",t)},expression:"dataForm.organization"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"币种",prop:"currency"}},[e("el-input",{attrs:{placeholder:"币种"},model:{value:a.dataForm.currency,callback:function(t){a.$set(a.dataForm,"currency",t)},expression:"dataForm.currency"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"类目名称",prop:"categoryName1"}},[e("el-input",{attrs:{placeholder:"类目名称"},model:{value:a.dataForm.categoryName1,callback:function(t){a.$set(a.dataForm,"categoryName1",t)},expression:"dataForm.categoryName1"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"",prop:"categoryContent1"}},[e("editor",{attrs:{editorCon:a.editorCon1},on:{editor:a.getEditor1}})],1),a._v(" "),e("el-form-item",{attrs:{label:"类目名称",prop:"categoryName2"}},[e("el-input",{attrs:{placeholder:"类目名称"},model:{value:a.dataForm.categoryName2,callback:function(t){a.$set(a.dataForm,"categoryName2",t)},expression:"dataForm.categoryName2"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"",prop:"categoryContent2"}},[e("editor",{attrs:{editorCon:a.editorCon2},on:{editor:a.getEditor2}})],1),a._v(" "),e("el-form-item",{attrs:{label:"URL",prop:"link"}},[e("el-input",{attrs:{placeholder:"URL"},model:{value:a.dataForm.link,callback:function(t){a.$set(a.dataForm,"link",t)},expression:"dataForm.link"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"状态",size:"mini",prop:"status"}},[e("el-radio-group",{model:{value:a.dataForm.status,callback:function(t){a.$set(a.dataForm,"status",t)},expression:"dataForm.status"}},[e("el-radio",{attrs:{label:1}},[a._v("展示")]),a._v(" "),e("el-radio",{attrs:{label:0}},[a._v("隐藏")])],1)],1),a._v(" "),e("el-form-item",{attrs:{label:"跳转类型",size:"mini",prop:"type"}},[e("el-radio-group",{model:{value:a.dataForm.type,callback:function(t){a.$set(a.dataForm,"type",t)},expression:"dataForm.type"}},[e("el-radio",{attrs:{label:0}},[a._v("内链")]),a._v(" "),e("el-radio",{attrs:{label:1}},[a._v("外链")])],1)],1),a._v(" "),e("div",{staticClass:"title"},[a._v("筛选数据项")]),a._v(" "),e("el-form-item",{attrs:{label:"银行名称",prop:"cardBankName"}},[e("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择银行名称"},model:{value:a.dataForm.cardBankName,callback:function(t){a.$set(a.dataForm,"cardBankName",t)},expression:"dataForm.cardBankName"}},a._l(a.bankList,function(a,t){return e("el-option",{key:t+1,attrs:{label:a.name,value:a.name}})}))],1),a._v(" "),e("el-form-item",{attrs:{label:"等级",prop:"cardGrade"}},[e("el-select",{attrs:{clearable:"",placeholder:"请选择等级"},model:{value:a.dataForm.cardGrade,callback:function(t){a.$set(a.dataForm,"cardGrade",t)},expression:"dataForm.cardGrade"}},[e("el-option",{attrs:{label:"普卡",value:"1"}}),a._v(" "),e("el-option",{attrs:{label:"金卡",value:"2"}}),a._v(" "),e("el-option",{attrs:{label:"白金卡",value:"3"}})],1)],1),a._v(" "),e("el-form-item",{attrs:{label:"用途",prop:"cardUse"}},[e("el-select",{attrs:{clearable:"",placeholder:"请选择用途"},model:{value:a.dataForm.cardUse,callback:function(t){a.$set(a.dataForm,"cardUse",t)},expression:"dataForm.cardUse"}},[e("el-option",{attrs:{label:"大额取现",value:"1"}}),a._v(" "),e("el-option",{attrs:{label:"超市购物",value:"2"}}),a._v(" "),e("el-option",{attrs:{label:"商旅人士",value:"3"}}),a._v(" "),e("el-option",{attrs:{label:"主题卡",value:"4"}}),a._v(" "),e("el-option",{attrs:{label:"航空联名",value:"5"}}),a._v(" "),e("el-option",{attrs:{label:"境外刷卡",value:"6"}}),a._v(" "),e("el-option",{attrs:{label:"女性专属",value:"7"}}),a._v(" "),e("el-option",{attrs:{label:"联名卡",value:"8"}})],1)],1),a._v(" "),e("div",{staticClass:"title"},[a._v("更多")]),a._v(" "),e("el-form-item",{attrs:{label:"年费",prop:"cardAnnual"}},[e("el-select",{attrs:{clearable:"",placeholder:"请选择年费"},model:{value:a.dataForm.cardAnnual,callback:function(t){a.$set(a.dataForm,"cardAnnual",t)},expression:"dataForm.cardAnnual"}},[e("el-option",{attrs:{label:"永久免年费",value:"1"}}),a._v(" "),e("el-option",{attrs:{label:"交易累计免年费",value:"2"}}),a._v(" "),e("el-option",{attrs:{label:"不免年费",value:"3"}})],1)],1),a._v(" "),e("el-form-item",{attrs:{label:"卡组织(多选)",prop:"cardOrganization"}},[e("el-checkbox-group",{model:{value:a.dataForm.cardOrganization,callback:function(t){a.$set(a.dataForm,"cardOrganization",t)},expression:"dataForm.cardOrganization"}},[e("el-checkbox",{attrs:{label:"1",name:"cardOrganization"}},[a._v("银联")]),a._v(" "),e("el-checkbox",{attrs:{label:"2",name:"cardOrganization"}},[a._v("VISA")]),a._v(" "),e("el-checkbox",{attrs:{label:"3",name:"cardOrganization"}},[a._v("运通")]),a._v(" "),e("el-checkbox",{attrs:{label:"4",name:"cardOrganization"}},[a._v("JCB")]),a._v(" "),e("el-checkbox",{attrs:{label:"5",name:"cardOrganization"}},[a._v("万事达")])],1)],1),a._v(" "),e("el-form-item",{attrs:{label:"币种",prop:"cardCurrency"}},[e("el-select",{attrs:{clearable:"",placeholder:"请选择币种"},model:{value:a.dataForm.cardCurrency,callback:function(t){a.$set(a.dataForm,"cardCurrency",t)},expression:"dataForm.cardCurrency"}},[e("el-option",{attrs:{label:"人民币",value:"1"}}),a._v(" "),e("el-option",{attrs:{label:"美元",value:"2"}}),a._v(" "),e("el-option",{attrs:{label:"双币种",value:"3"}})],1)],1),a._v(" "),e("el-form-item",{attrs:{label:"特权(多选)",prop:"cardExtral"}},[e("el-checkbox-group",{model:{value:a.dataForm.cardExtral,callback:function(t){a.$set(a.dataForm,"cardExtral",t)},expression:"dataForm.cardExtral"}},[e("el-checkbox",{attrs:{label:"1",name:"cardExtral"}},[a._v("新户有礼")]),a._v(" "),e("el-checkbox",{attrs:{label:"2",name:"cardExtral"}},[a._v("购物返现")]),a._v(" "),e("el-checkbox",{attrs:{label:"3",name:"cardExtral"}},[a._v("购物保险")])],1)],1)],1),a._v(" "),e("div",{staticStyle:{"margin-left":"20%"}},[e("el-button",{attrs:{type:"primary"},on:{click:function(t){a.dataFormSubmit()}}},[a._v("确定")]),a._v(" "),e("el-button",{on:{click:function(t){a.returnList()}}},[a._v("返回")])],1)],1)},staticRenderFns:[]};var l=function(a){e("W03O")},i=e("VU/8")(r.a,o,!1,l,null,null);t.default=i.exports}});