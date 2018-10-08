<template>
  <div class="bannerEdit">
    <div class="form-title">修改</div>
    <!-- 查询块 -->
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px" class="common-form">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="版本号" prop="version">
        <el-input v-model="dataForm.version"></el-input>
      </el-form-item>
      <el-form-item label="icon" prop="iconUrl" ref="icon">
        <img-upload :orgin-img="dataForm.iconUrl" :img-size="imgSize" :width="imgWidth" :height="imgHeight" @choose="chooseImg"></img-upload>
      </el-form-item>
      <el-form-item label="选中icon" prop="selectedIconUrl" ref="selectedIcon">
        <img-upload :orgin-img="dataForm.selectedIconUrl" :img-size="imgSize" :width="imgWidth" :height="imgHeight" @choose="chooseSelectImg"></img-upload>
      </el-form-item>
      <el-form-item label="H5链接" prop="webUrl">
        <el-input v-model="dataForm.webUrl"></el-input>
      </el-form-item>
      <el-form-item label="安卓" prop="android">
        <el-radio-group v-model="dataForm.android">
          <el-radio :label="item.value" v-for="item in statusOptions" v-if="item.value!==null">{{ item.text }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="IOS" prop="ios">
        <el-radio-group v-model="dataForm.ios">
          <el-radio :label="item.value" v-for="item in statusOptions" v-if="item.value!==null">{{ item.text }}</el-radio>
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
    components: {
      ImgUpload
    },
    data () {
      return {
        isAdd: true,
        imgSize: 100,
        imgWidth: 48,
        imgHeight: 48,
        dataForm: {
          id: '',
          name: '',
          version: null,
          android: 1,
          ios: 1,
          iconUrl: '',
          selectedIconUrl: '',
          webUrl: ''
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          version: [
            { required: true, message: '版本号不能为空', trigger: 'blur' }
          ],
          iconUrl: [
            { required: true, message: 'icon不能为空', trigger: 'blur' }
          ],
          selectedIconUrl: [
            { required: true, message: '选中icon不能为空', trigger: 'blur' }
          ]
        },
        statusOptions: [
          { value: 1, text: '展示' },
          { value: 0, text: '隐藏' }
        ]
      }
    },
    created () {
    },
    methods: {
      chooseImg (src) {
        this.dataForm.iconUrl = src
        this.$refs['icon'].clearValidate()
      },
      chooseSelectImg (src) {
        this.dataForm.selectedIconUrl = src
        this.$refs['selectedIcon'].clearValidate()
      },
      init (row) {
        this.dataForm.id = row.id
        this.dataForm.name = row.name
        this.dataForm.version = row.version
        this.dataForm.android = row.android
        this.dataForm.ios = row.ios
        this.dataForm.iconUrl = row.iconUrl
        this.dataForm.selectedIconUrl = row.selectedIconUrl
        this.dataForm.webUrl = row.webUrl
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              url: this.$http.adornUrl('hotSpotManage/saveEntrySet'),
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
