<template>
<div class="addOrUpdate">
    <div class="title">{{title}}</div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="180px">
      <el-form-item label="排名权重" prop="rank">
        <el-input v-model="dataForm.rank" placeholder="权重范围为1-1000"></el-input>
      </el-form-item>
      <el-form-item label="信用卡图片" prop="imgUrl" ref="imgUrl">
        <img-upload :orgin-img="dataForm.imgUrl" :img-size="imgSize" :width="imgWidth" :height="imgHeight" @choose="chooseImg"></img-upload>
      </el-form-item>
      <el-form-item label="信用卡名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="信用卡名称"></el-input>
      </el-form-item>
      <el-form-item label="信用卡宣传语" prop="propaganda">
        <el-input v-model="dataForm.propaganda" placeholder="信用卡宣传语" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="返利金额(元)" prop="rebate">
        <el-input v-model="dataForm.rebate" placeholder="返利金额(元)"></el-input>
      </el-form-item>
      <el-form-item label="返利标识" prop="rebateDescription">
        <el-input v-model="dataForm.rebateDescription" placeholder="返利标识" maxlength="5"></el-input>
      </el-form-item>
      <el-form-item label="标签1" prop="tab1">
        <el-input v-model="dataForm.tab1" placeholder="标签1" maxlength="8"></el-input>
      </el-form-item>
      <el-form-item label="标签2" prop="tab2">
        <el-input v-model="dataForm.tab2" placeholder="标签2" maxlength="8"></el-input>
      </el-form-item>
      <el-form-item label="标签3" prop="tab3">
        <el-input v-model="dataForm.tab3" placeholder="标签3" maxlength="8"></el-input>
      </el-form-item>
      <div class="title">基本信息</div>
      <el-form-item label="年费" prop="annualFee">
        <el-input v-model="dataForm.annualFee" placeholder="年费"></el-input>
      </el-form-item>
      <el-form-item label="免息期限" prop="interestFeePeriod">
        <el-input v-model="dataForm.interestFeePeriod" placeholder="免息期限"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="grade">
        <el-input v-model="dataForm.grade" placeholder="等级"></el-input>
      </el-form-item>
      <el-form-item label="发卡组织" prop="organization">
        <el-input v-model="dataForm.organization" placeholder="发卡组织"></el-input>
      </el-form-item>
      <el-form-item label="币种" prop="currency">
        <el-input v-model="dataForm.currency" placeholder="币种"></el-input>
      </el-form-item>
      <el-form-item label="类目名称" prop="categoryName1">
        <el-input v-model="dataForm.categoryName1" placeholder="类目名称"></el-input>
      </el-form-item>
      <el-form-item label="" prop="categoryContent1">
        <!-- <el-input v-model="dataForm.categoryContent1"></el-input> -->
        <editor @editor="getEditor1" :editorCon="editorCon1"></editor>
      </el-form-item>
      <el-form-item label="类目名称" prop="categoryName2">
        <el-input v-model="dataForm.categoryName2" placeholder="类目名称"></el-input>
      </el-form-item>
      <el-form-item label="" prop="categoryContent2">
        <!-- <el-input v-model="dataForm.categoryContent2"></el-input> -->
        <editor @editor="getEditor2" :editorCon="editorCon2"></editor>
      </el-form-item>
      <el-form-item label="URL" prop="link">
        <el-input v-model="dataForm.link" placeholder="URL"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">展示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="跳转类型" size="mini" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio :label="0">内链</el-radio>
          <el-radio :label="1">外链</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="多少人申请" prop="cardManyPeople">
        <el-input v-model="dataForm.cardManyPeople" placeholder="多少人申请"></el-input>
      </el-form-item> -->
      <div class="title">筛选数据项</div>
      <el-form-item label="银行名称" prop="cardBankName">
        <el-select v-model="dataForm.cardBankName" clearable filterable placeholder="请选择银行名称">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option v-for="(item,index) in bankList" :label="item.name" :value="item.name" :key="index+1"></el-option>
        </el-select>
        <!-- <el-input class="myinput" v-model="dataForm.bankName" clearable placeholder="银行名称"></el-input>
        <div class="red">提示：下拉框和输入框选其中一个，如若两个都填，以输入框为准，可都不填写！</div> -->
      </el-form-item>
      <el-form-item label="等级" prop="cardGrade">
        <el-select v-model="dataForm.cardGrade" clearable placeholder="请选择等级">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="普卡" value="1"></el-option>
          <el-option label="金卡" value="2"></el-option>
          <el-option label="白金卡" value="3"></el-option>
        </el-select>
        <!-- <el-input class="myinput" v-model="dataForm.bankName" clearable placeholder="等级"></el-input>
        <div class="red">提示：下拉框和输入框选其中一个，如若两个都填，以输入框为准，可都不填写！</div> -->
      </el-form-item>
      <el-form-item label="用途" prop="cardUse">
        <el-select v-model="dataForm.cardUse" clearable placeholder="请选择用途">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="大额取现" value="1"></el-option>
          <el-option label="超市购物" value="2"></el-option>
          <el-option label="商旅人士" value="3"></el-option>
          <el-option label="主题卡" value="4"></el-option>
          <el-option label="航空联名" value="5"></el-option>
          <el-option label="境外刷卡" value="6"></el-option>
          <el-option label="女性专属" value="7"></el-option>
          <el-option label="联名卡" value="8"></el-option>
        </el-select>
        <!-- <el-input class="myinput" v-model="dataForm.bankName" clearable placeholder="用途"></el-input>
        <div class="red">提示：下拉框和输入框选其中一个，如若两个都填，以输入框为准，可都不填写！</div> -->
      </el-form-item>
      <div class="title">更多</div>
      <el-form-item label="年费" prop="cardAnnual">
        <el-select v-model="dataForm.cardAnnual" clearable placeholder="请选择年费">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="永久免年费" value="1"></el-option>
          <el-option label="交易累计免年费" value="2"></el-option>
          <el-option label="不免年费" value="3"></el-option>
        </el-select>
        <!-- <el-input class="myinput" v-model="dataForm.bankName" clearable placeholder="年费"></el-input>
        <div class="red">提示：下拉框和输入框选其中一个，如若两个都填，以输入框为准，可都不填写！</div> -->
      </el-form-item>
      <el-form-item label="卡组织(多选)" prop="cardOrganization">
        <el-checkbox-group v-model="dataForm.cardOrganization">
          <el-checkbox label="1" name="cardOrganization">银联</el-checkbox>
          <el-checkbox label="2" name="cardOrganization">VISA</el-checkbox>
          <el-checkbox label="3" name="cardOrganization">运通</el-checkbox>
          <el-checkbox label="4" name="cardOrganization">JCB</el-checkbox>
          <el-checkbox label="5" name="cardOrganization">万事达</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="币种" prop="cardCurrency">
        <el-select v-model="dataForm.cardCurrency" clearable placeholder="请选择币种">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="人民币" value="1"></el-option>
          <el-option label="美元" value="2"></el-option>
          <el-option label="双币种" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="特权(多选)" prop="cardExtral">
        <el-checkbox-group v-model="dataForm.cardExtral">
          <el-checkbox label="1" name="cardExtral">新户有礼</el-checkbox>
          <el-checkbox label="2" name="cardExtral">购物返现</el-checkbox>
          <el-checkbox label="3" name="cardExtral">购物保险</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div style="margin-left:20%;">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      <el-button @click='returnList()'>返回</el-button>
    </div>
</div>
</template>

<script>
  import Editor from '@/components/Editor'
  // import Vue from 'vue'
  import ImgUpload from "@/components/img-upload"
  import { isNum } from '@/utils/validate'
  export default {
    data () {
      let validateNum = (rule, value, callback) => {
        if (!isNum(value)) {
          callback(new Error('您输入的排名权重不是正整数'))
        } else {
          callback()
        }
      }

      return {
        title: null,
        dataForm: {
          id: 0,
          rank: '',
          imgUrl: '',
          name: '',
          propaganda: '',
          rebate: '',
          rebateDescription: '',
          color: 1,
          tab1: '',
          tab2: '',
          tab3: '',
          annualFee: '',
          interestFeePeriod: '',
          grade: '',
          organization: '',
          currency: '',
          categoryName1: '',
          categoryContent1: '',
          categoryName2: '',
          categoryContent2: '',
          link: '',
          status: 1,
          type: 0,
          cardManyPeople: '',
          cardBankName: '',
          cardBankId: '',
          cardGrade: '',
          cardUse: '',
          cardAnnual: '',
          cardOrganization: [],
          cardCurrency: '',
          cardExtral: []

        },
        dataRule: {
          rank: [
            { required: true, message: '排名权重不能为空', trigger: 'blur' },
            { validator: validateNum, trigger: 'blur' }
          ],
          imgUrl: [
            { required: true, message: '信用卡图片不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '信用卡名称不能为空', trigger: 'blur' }
          ],
          propaganda: [
            { required: true, message: '信用卡宣传语不能为空', trigger: 'blur' }
          ]
        },
        editorCon1: '',
        editorCon2: '',
        imgWidth: 608,
        imgHeight: 380,
        imgSize: 200,
        // imageUrl: '',
        bankList: []
      }
    },
    components: {
      ImgUpload,
      Editor
    },
    created () {
      this.getBankList()
    },
    methods: {
      // 获取银行列表
      getBankList () {
        this.$http({
          url: this.$http.adornUrl('/bank/list'),
          method: 'post',
          params: this.$http.adornParams({
            'limit': 1000
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.bankList = data.page.list
            // console.log(this.bankList)
          } else {
            this.bankList = []
          }
        })
      },
      chooseImg (src) {
        this.dataForm.imgUrl = src
        this.$refs['imgUrl'].clearValidate(['imgUrl'])
      },
      init (id, row) {
        this.dataForm.id = id || 0
        this.title = !this.dataForm.id ? '新增' : '编辑'
        if (this.dataForm.id) {
          this.dataForm = row
          this.dataForm.rebate = row.rebate/100
          this.editorCon1 = this.dataForm.categoryContent1
          this.editorCon2 = this.dataForm.categoryContent2
          // this.formatArray(this.dataForm.cardOrganization)
          console.log(this.dataForm.cardOrganization)
          if(this.dataForm.cardOrganization!=null){
            this.dataForm.cardOrganization = this.dataForm.cardOrganization.split(',')
          }         
          // this.formatArray(this.dataForm.cardExtral)
          console.log(this.dataForm.cardExtral)
          if(this.dataForm.cardExtral!=null){
            this.dataForm.cardExtral = this.dataForm.cardExtral.split(',')
          }
        }
      },
      returnList () {
        this.$emit('refreshDataList')
      },
      getEditor1 (data) {
        // console.log(data)
        this.dataForm.categoryContent1 = data
      },
      getEditor2 (data) {
        // console.log(data)
        this.dataForm.categoryContent2 = data
      },
      // 格式化checkbox
      // formatString (val) {
      //   val = val.join(',');
      // },
      // formatArray (val) {
      //   val = val.split(',');
      // },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(this.dataForm.rank<1||this.dataForm.rank>1000){
              this.$alert('您输入的排名权重范围不是1-1000', '提示', {
                confirmButtonText: '确定',
              });
              return ;
            }

            if(this.dataForm.rebate<0){
              this.$alert('您输入的返利金额不能小于0', '提示', {
                confirmButtonText: '确定',
              });
              return ;
            }

            // if(this.dataForm.cardManyPeople){
            //   if(!isNum(this.dataForm.cardManyPeople)){
            //     this.$alert('您输入的申请人数不是正整数', '提示', {
            //       confirmButtonText: '确定',
            //     });
            //     return ;
            //   }
            // }

            // // this.formatString(this.dataForm.cardOrganization)
            // if(this.dataForm.cardOrganization.length==0){
            //   this.dataForm.cardOrganization = ''
            // }else{
            //   this.dataForm.cardOrganization = this.dataForm.cardOrganization.join(',')
            // }
            // // this.formatString(this.dataForm.cardExtral)
            // if(this.dataForm.cardExtral.length==0){
            //   this.dataForm.cardExtral = ''
            // }else{
            //   this.dataForm.cardExtral = this.dataForm.cardExtral.join(',')
            // }

            let dataForm = this.dataForm
            let bankList = this.bankList.find(function(item){
              if(item.name == dataForm.cardBankName){
                  return true;
              }
            });
            if(bankList){
              this.dataForm.cardBankId = bankList.id;
            }
            console.log(this.dataForm.cardOrganization)
            console.log(this.dataForm.cardExtral)

            let params = eval('('+(JSON.stringify(this.dataForm)+JSON.stringify({"rebate": Math.round(this.dataForm.rebate*100),"cardOrganization": this.dataForm.cardOrganization==null||this.dataForm.cardOrganization==''?'':this.dataForm.cardOrganization.join(','),"cardExtral": this.dataForm.cardExtral==null||this.dataForm.cardExtral==''?'':this.dataForm.cardExtral.join(',')})).replace(/}{/,',')+')');

            this.$http({
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              url: this.$http.adornUrl(`/creditCard/${!this.dataForm.id ? 'add' : 'edit'}`),
              method: 'post',
              data: this.$http.adornData(params, false)
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.addOrUpdate{
  .title{
    font-size: 16px;
  }
  .el-form-item__content{
    width: 50%;
  }
}
.myinput{
  width: 60%;
  margin-left: 20px;
}
.red{
  color: red;
}
</style>
