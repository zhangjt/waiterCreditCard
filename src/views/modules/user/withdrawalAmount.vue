<template>
  <div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px" class="withdraw-table">
      <el-form-item label="最低提现金额" prop="minFee">
        <el-input v-model="dataForm.minFee" placeholder="最低提现金额"></el-input><span class="unit">元</span>
      </el-form-item>
      <el-form-item label="提现金额小于" prop="minFeeCash">
        <el-input v-model="dataForm.minFeeCash" placeholder="最低提现金额"></el-input><span class="unit">元</span>
      </el-form-item>
      <el-form-item label="手续费" prop="fee">
        <el-input v-model="dataForm.fee" placeholder="最低提现金额"></el-input><span class="unit">元</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dataFormSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      var checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('金额不能为空'))
        }
        if (!Number.isInteger(parseInt(value)) || value < 0) {
          callback(new Error('请输入不小于0的数字'))
        } else {
          callback()
        }
      }
      var checkInt = (rule, value, callback) => {
        var reg = /^[0-9]*[1-9][0-9]*$/
        if (!reg.test(value)) {
          callback(new Error('请输入正整数'))
        } else {
          callback()
        }
      }
      return {
        dataForm: {
          minFee: '',
          minFeeCash: '',
          fee: ''
        },
        dataRule: {
          minFee: [
            { validator: checkNum, trigger: 'blur' },
            { validator: checkInt, trigger: 'blur' }
          ],
          minFeeCash: [
            { validator: checkNum, trigger: 'blur' }
          ],
          fee: [
            { validator: checkNum, trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        // 获取最低提现金额
        this.$http({
          url: this.$http.adornUrl('commonConfig/queryMinFee'),
          method: 'post'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.minFee = data.minFee
          }
        })
        this.$http({
          url: this.$http.adornUrl('commonConfig/queryMinFeeCash'),
          method: 'post'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.minFeeCash = data.minFeeCash
          }
        })
        this.$http({
          url: this.$http.adornUrl('commonConfig/queryFee'),
          method: 'post'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.fee = data.fee
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确定更新最低提现金额为' + this.dataForm.minFee + '吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http({
                url: this.$http.adornUrl('commonConfig/updateMinFee'),
                method: 'post',
                data: this.$http.adornData(this.dataForm, false, 'form')
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500
                  })
                } else {
                  this.$message.error(data.msg)
                }
              })
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .withdraw-table{
    width: 500px;
    margin-top: 15px;
  }
  .unit{
    position: absolute;
    margin-left: 5px;
  }
</style>
