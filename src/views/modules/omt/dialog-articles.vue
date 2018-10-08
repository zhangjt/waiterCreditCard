<template>
  <div class="bannerEdit">
    <div class="form-title">{{isAdd ? '新增' : '修改'}}</div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px" class="common-form">
      <el-form-item label="消息类型" prop="type" ref="type">
        <el-select v-model="dataForm.type" placeholder="请选择" :disabled="!isAdd" @change="clearValid">
          <el-option v-for="item in positionOptions" :key="item.value" :label="item.text" :value="item.value" v-if="item.value!==null">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <img-upload :orgin-img="dataForm.image" :img-size="imgSize" :width="imgWidth" :height="imgHeight" @choose="chooseImg"></img-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content" v-show="dataForm.type!==3">
        <div ref="editor" class="editor"></div>
      </el-form-item>
      <el-form-item label="宣传语" prop="content" v-if="dataForm.type===3">
        <el-input v-model="dataForm.content" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="URL" prop="url" v-if="dataForm.type===3">
        <el-input v-model="dataForm.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dataFormSubmit()">发布</el-button>
        <el-button @click='returnList()'>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

  // import E from '@/utils/wangeditor'
  import E from 'wangeditor'
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
      return {
        isAdd: true,
        editorCon: '',
        imgSize: 100,
        imgWidth: 690,
        imgHeight: 216,
        positionOptions: this.option.positionOptions,
        statusOptions: this.option.statusOptions,
        dataForm: {
          id: null,
          type: 0,
          title: '',
          rate: null,
          image: '',
          content: '',
          status: 0,
          url: ''
        },
        editor: null,
        dataRule: {
          type: [
            { required: true, message: '消息类型不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: 'URL不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.zIndex = 1
      this.editor.customConfig.menus = [
        'justify',  // 对齐方式
        'fontSize',  // 字号
        'foreColor',  // 文字颜色
        'image',  // 插入图片
        'link'  // 链接
      ]
      this.editor.customConfig.customUploadImg = (files, insert) => {
        if (files.size >= 1 * 1024) {
          this.$message.error('图片大小超过1M，请按要求重新上传')
        } else {
          var formFile = new FormData()
          formFile.append('action', 'UploadVMKImagePath')
          formFile.append('file', files[0]) // 加入文件对象
          this.$http({
            url: this.$http.adornUrl('/file/upload'),
            method: 'post',
            data: formFile
          }).then(({data}) => {
            if (data && data.code === 0) {
              insert(data.fileUrl)
              this.$message({
                message: '上传成功',
                type: 'success',
                duration: 1500
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      }
      this.editor.create()
      this.editor.txt.html(this.dataForm.content)
    },
    methods: {
      clearValid () {
        this.$refs['type'].clearValidate()
      },
      chooseImg (src) {
        this.dataForm.image = src
        this.$refs['dataForm'].clearValidate(['image'])
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
            type: 0,
            title: '',
            rate: null,
            image: '',
            content: '',
            status: 0,
            url: ''
          }
        }
        if (this.dataForm.type === 0) {
          this.editor.txt.html(this.dataForm.content)
        }
      },
      // 表单提交
      dataFormSubmit () {
        console.log(this.editor.txt.text() === '')
        if (this.dataForm.type === 0) {
          if (this.editor.txt.text() === '' || this.editor.txt.text() === null) {
            this.dataForm.content = ''
          } else {
            this.dataForm.content = this.editor.txt.html()
          }
        }
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.dataForm)
            this.$http({
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              url: this.$http.adornUrl(`msg/${!this.dataForm.id ? 'save' : 'update'}`),
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
