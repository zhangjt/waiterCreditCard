webpackJsonp([19],{OoB9:function(t,e){},QB7s:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"LoansDetailItem",props:{title:{type:String},details:{type:String}}},a=i("XyMi");var n=function(t){i("n4xg")},s={data:function(){return{loanDetail:{},flowTitle:"<b>贷款流程</b>",flow:"<ul><li>1、提交申请</li><li>2、绑银行卡</li><li>3、机构审批</li><li>4、确定贷款</li></ul>",costTitle:"<b>费用说明</b>",Title:"<b>还款说明</b>",repaymentTitle:"还款方式：",prepaymentTitle:"提前还款：",overdueTitle:"逾期政策："}},components:{LoansDetailItem:Object(a.a)(l,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"item"},[e("div",{staticClass:"item-title",domProps:{innerHTML:this._s(this.title)}}),this._v(" "),e("div",{staticClass:"item-content",domProps:{innerHTML:this._s(this.details)}})])},[],!1,n,"data-v-07a4feb0",null).exports},created:function(){this.isPC()?this.loanDetail=this.$route.query:this.loanDetail=this.getQuery("query"),this.title="产品详情",this.getLoanDetail()},computed:{},mounted:function(){},methods:{getLoanDetail:function(){var t=this,e=this.loanDetail.id;if(0!=e.length){var i={id:e};http.postWithoutCode("/loan/plat/detail",i).then(function(e){console.log(e),t.loanDetail=e.loanPlat})}}}};var o=function(t){i("OoB9")},r=Object(a.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"title",rawName:"v-title",value:t.title,expression:"title"}],staticClass:"loan-state-detail"},[i("loans-detail-item",{attrs:{title:t.flowTitle,details:t.loanDetail.flow}}),t._v(" "),i("loans-detail-item",{attrs:{title:t.costTitle,details:t.loanDetail.cost}}),t._v(" "),i("loans-detail-item",{attrs:{title:t.Title}}),t._v(" "),i("loans-detail-item",{attrs:{title:t.repaymentTitle,details:t.loanDetail.repayment}}),t._v(" "),i("loans-detail-item",{attrs:{title:t.prepaymentTitle,details:t.loanDetail.prepayment}}),t._v(" "),i("loans-detail-item",{attrs:{title:t.overdueTitle,details:t.loanDetail.overdue}})],1)},[],!1,o,"data-v-db82f314",null);e.default=r.exports},n4xg:function(t,e){}});
//# sourceMappingURL=19.4003ff44c15e7fd54655.js.map