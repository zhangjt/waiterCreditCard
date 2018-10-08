<template>
<div class="detailOrUpdate">
    <div class="title">{{title}}</div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="180px">
      <el-form-item label="导入时间" prop="importDate">
        <el-input v-model="dataForm.importDate" placeholder="导入时间" disabled></el-input>
      </el-form-item>
      <el-form-item label="财喵账号" prop="account">
        <el-input v-model="dataForm.account" placeholder="财喵账号" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="登记账号" prop="creditAccount">
        <el-input v-model="dataForm.creditAccount" placeholder="登记账号" maxlength="20" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="登记时间" prop="recordDate">
        <el-input v-model="dataForm.recordDate" placeholder="登记时间" maxlength="4" disabled></el-input>
      </el-form-item>
      <el-form-item label="银行/信用卡名称" prop="bankName">
        <el-input v-model="dataForm.bankName" placeholder="银行/信用卡名称" maxlength="8" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="银行注册号码" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="银行注册号码" maxlength="8" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="返利金额(元)" prop="rebate">
        <el-input v-model="dataForm.rebate" placeholder="返利金额(元)" maxlength="8" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="review">
        <el-input v-model="dataForm.review" placeholder="备注" :disabled="disabled"></el-input>
      </el-form-item>
    </el-form>
    <div style="margin-left:20%;">
      <el-button type="primary" v-show="title=='编辑'" @click="dataFormSubmit()">确定</el-button>
      <el-button @click='returnList()'>返回</el-button>
    </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        title: null,
        disabled: true,
        dataForm: {
          id: 0,
          importDate: '',
          account: '',
          creditAccount: '',
          recordDate: '',
          bankName: '',
          phone: '',
          rebate: '',
          review: ''
        },
        dataRule: {
          account: [
            { required: true, message: '财喵账号不能为空', trigger: 'blur' }
          ],
          creditAccount: [
            { required: true, message: '登记账号不能为空', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '银行/信用卡名称不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '银行注册号码不能为空', trigger: 'blur' }
          ],
          rebate: [
            { required: true, message: '返利金额不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id, row, isEdit) {
        this.dataForm.id = id || 0
        this.title = isEdit=='true' ? '编辑' : '详情'
        if (this.dataForm.id) {
          this.dataForm = row
          this.dataForm.rebate = row.rebate/100
        }
        if(isEdit=='true'){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
      },
      returnList () {
        this.$emit('refreshDataList')
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // let rebate = {
            //   'rebate': this.dataForm.rebate*100
            // }
            // let params = Object.assign(this.dataForm, rebate)
            // console.log(params)
            if(this.dataForm.rebate<0){
              this.$alert('您输入的返利金额不能小于0', '提示', {
                confirmButtonText: '确定',
              });
              return ;
            }
            let params = eval('('+(JSON.stringify(this.dataForm)+JSON.stringify({"rebate": Math.round(this.dataForm.rebate*100)})).replace(/}{/,',')+')');

            this.$http({
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              url: this.$http.adornUrl('/creditCardRecord/edit'),
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
.detailOrUpdate{
  .title{
    font-size: 16px;
  }
  .el-form-item__content{
    width: 50%;
  }
}
</style>