<template>
  <div class="bannerEdit">
    <div class="form-title">{{isAdd ? '新增' : '修改'}}</div>
    <!-- 查询块 -->
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px" class="common-form">
      <el-form-item label="位置序号" prop="position">
        <el-input v-model="dataForm.position"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img" ref="img">
        <img-upload :orgin-img="dataForm.img" :img-size="imgSize" :width="imgWidth" :height="imgHeight" @choose="chooseImg"></img-upload>
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="dataForm.url"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="item.value" v-for="(item,index) in statusOptions" :key="index" v-if="item.value!==null">{{ item.text }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dataFormSubmit()">发布</el-button>
        <el-button @click='returnList()'>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import ImgUpload from '@/components/img-upload'
  export default {
    props: {
      option: {
        type: Object
      }
    },
    components: {
      ImgUpload
    },
    data () {
      var checkInt = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback()
        } else {
          var reg = /^[0-9]*[1-9][0-9]*$/
          if (!reg.test(value)) {
            callback(new Error('请输入不小于0的整数'))
          } else {
            callback()
          }
        }
      }
      return {
        isAdd: true,
        imgSize: 100,
        imgWidth: 200,
        imgHeight: 128,
        positionOptions: this.option.positionOptions,
        statusOptions: this.option.statusOptions,
        dataForm: {
          id: null,
          position: null,
          title: '',
          img: '',
          url: '',
          status: 1
        },
        dataRule: {
          position: [
            { validator: checkInt, trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: 'URL不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
    },
    methods: {
      chooseImg (src) {
        this.dataForm.img = src
        this.$refs['img'].clearValidate()
      },
      init (row) {
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        if (row) {
          this.isAdd = false
          this.dataForm = row
        } else {
          this.isAdd = true
          this.dataForm = {
            id: null,
            position: null,
            title: '',
            img: '',
            url: '',
            status: 1
          }
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.dataForm)
            this.$http({
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              url: this.$http.adornUrl(`infoflow/${!this.dataForm.id ? 'advSave' : 'advUpdate'}`),
              method: 'post',
              data: this.$http.adornData(this.dataForm)
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      returnList () {
        this.$emit('return')
      }
    }
  }
</script>
