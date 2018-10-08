<template>
<div class="addOrUpdate">
    <div class="title">{{title}}</div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="180px">
      <el-form-item label="排名权重" prop="rank">
        <el-input v-model="dataForm.rank" placeholder="排名权重"></el-input>
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName">
        <el-input v-model="dataForm.bankName" placeholder="银行名称"></el-input>
      </el-form-item>
      <el-form-item label="银行icon" prop="icon" ref="icon">
        <img-upload :orgin-img="dataForm.icon" :img-size="imgSize" :width="imgWidth" :height="imgHeight" @choose="chooseImg"></img-upload>
      </el-form-item>
      <el-form-item label="URL" prop="link">
        <el-input v-model="dataForm.link" placeholder="URL"></el-input>
      </el-form-item>
      <el-form-item label="跳转类型" size="mini" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio :label="0">内链</el-radio>
          <el-radio :label="1">外链</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="margin-left:20%;">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      <el-button @click='returnList()'>返回</el-button>
    </div>
</div>
</template>

<script>
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
          bankName: '',
          icon: '',
          link: '',
          type: 0
        },
        dataRule: {
          rank: [
            { required: true, message: '排名权重不能为空', trigger: 'blur' },
            { validator: validateNum, trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '银行名称不能为空', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '银行icon不能为空', trigger: 'blur' }
          ],
          link: [
            { required: true, message: 'URL不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '跳转类型不能为空', trigger: 'blur' }
          ]
        },
        imgWidth: 88,
        imgHeight: 88,
        imgSize: 200
      }
    },
    components: {
      ImgUpload
    },
    methods: {
      chooseImg (src) {
        this.dataForm.icon = src
        this.$refs['icon'].clearValidate(['icon'])
      },
      init (id, row) {
        this.dataForm.id = id || 0
        this.title = !this.dataForm.id ? '新增' : '编辑'
        if (this.dataForm.id) {
          this.dataForm = row
        }
      },
      returnList () {
        this.$emit('refreshDataList')
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              url: this.$http.adornUrl(`/creditCardProgress/${!this.dataForm.id ? 'add' : 'edit'}`),
              method: 'post',
              data: this.$http.adornData(this.dataForm, false)
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
</style>
