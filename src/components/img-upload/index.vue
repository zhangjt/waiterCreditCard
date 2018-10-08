<template>
  <div class="avatar-module">
    <div class="relative-module">
      <el-upload
        class="avatar-uploader"
        action="string"
        :show-file-list="false"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadImg">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <i v-if="imageUrl" class="el-icon-close" @click.prevent="handleRemove"></i>
    </div>
    <div slot="tip" class="el-upload__tip">上传要求：像素要求{{ width }}x{{ height }}，大小{{imgSize}}k以内</div>
  </div>
</template>

<script>
  export default {
    name: 'img-upload',
    data () {
      return {
        addData: ''
      }
    },
    props: {
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      imgSize: {
        type: Number
      },
      orginImg: {
        type: String
      }
    },
    computed: {
      imageUrl: {
        get: function () {
          this.addData = this.orginImg
          return this.addData
        },
        // setter
        set: function (newValue) {
          // console.log('重新设置图片');
          this.addData = newValue
        }
      }
    },
    methods: {
      handleRemove () {
        this.imageUrl = ''
        this.$emit('choose', '')
      },
      handleAvatarSuccess (res, file) {
        console.log(res)
        this.imageUrl = URL.createObjectURL(file.raw)
        this.$emit('choose', res.fileUrl)
      },
      upload (file) {
        let formData = new FormData()
        formData.append('action', 'UploadVMKImagePath')
        formData.append('file', file)
        console.log('上传图片接口-参数', file)
        this.$http({
          url: this.$http.adornUrl('/file/upload'),
          method: 'post',
          data: formData
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.imageUrl = data.fileUrl
            this.$emit('choose', data.fileUrl)
            this.$message({
              message: '上传成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      uploadImg (item) {
        console.log('调用自定义上传事件')
        var file = item.file
        if (file && this.width !== null || this.height !== null) {
          let that = this
          let reader = new FileReader()
          reader.onload = function (e) {
            var data = e.target.result
            let image = new Image()
            image.src = data
            image.onload = function () {
              var width = image.width
              var height = image.height
              console.log(width, height)
              console.log(that.width, that.height)
              if (width !== that.width || height !== that.height) {
                that.$message.error('上传图片图片尺寸不符合，请按要求重新上传!')
              } else {
                that.upload(file)
              }
            }
          }
          reader.readAsDataURL(file)
        } else {
          this.upload(file)
        }
      },
      beforeAvatarUpload (file) {
        console.log('选取前判断')
        const isLtm = file.size < this.imgSize * 1024
        if (!isLtm) {
          this.$message.error('上传图片大小不能超过 ' + this.imgSize + 'kb !')
        }
        return isLtm
      }
    }
  }
</script>
<style lang="scss" scoped>
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .relative-module{
    position: relative;
    display: inline-block;
  }
  .el-icon-close{
    font-size: 18px;
    color: #fff;
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 10;
    top: 0px;
    right: -19px;
    background-color: #ccc;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    line-height: 20px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar-module {

    .avatar-uploader{
      min-width: 120px;
      height: 122px;
      display: inline-block;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
    }
    img{
      height: 120px;
    }
    .el-upload__tip{
      line-height: 22px;
      margin-bottom: -5px;
    }
  }
</style>
