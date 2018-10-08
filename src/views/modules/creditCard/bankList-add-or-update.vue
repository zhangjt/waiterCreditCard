<template>
<div class="addOrUpdate">
  <!-- <el-dialog -->
    <!-- :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"> -->
    <div class="title">{{title}}</div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="180px">
      <el-form-item label="排名权重" prop="weight">
        <el-input v-model="dataForm.weight" placeholder="排名权重"></el-input>
      </el-form-item>
      <el-form-item label="银行名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="银行名称"></el-input>
      </el-form-item>
      <el-form-item label="银行icon" prop="icon" ref="icon">
        <!-- <el-input v-model="dataForm.icon" placeholder="银行icon"></el-input> -->
        <!-- <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="handleBeforeUpload"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :headers="postData"
          :file-list="fileList"
          :multiple="false"
          :limit="limit"
          list-type="picture">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">上传要求：像素要求{{width}} X {{height}}，大小{{imgSize}}k以内</div>
        </el-upload> -->
        <img-upload :orgin-img="dataForm.icon" :img-size="imgSize" :width="imgWidth" :height="imgHeight" @choose="chooseImg"></img-upload>
      </el-form-item>
      <el-form-item label="宣传语" prop="propaganda">
        <el-input v-model="dataForm.propaganda" placeholder="宣传语" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="返利金额(元)" prop="rebate">
        <el-input v-model="dataForm.rebate" placeholder="返利金额(元)"></el-input>
      </el-form-item>
      <el-form-item label="返利标识" prop="rebateDescription">
        <el-input v-model="dataForm.rebateDescription" placeholder="返利标识" maxlength="5"></el-input>
      </el-form-item>
      <el-form-item label="银行背景颜色" size="mini" prop="color">
        <el-radio-group v-model="dataForm.color">
          <el-radio :label="1"><span class="myspan"></span></el-radio>
          <el-radio :label="2"><span class="myspan" style="background: #FF3F46;"></span></el-radio>
          <el-radio :label="3"><span class="myspan" style="background: #43C6CD;"></span></el-radio>
          <el-radio :label="4"><span class="myspan" style="background: #FF821A;"></span></el-radio>
          <el-radio :label="5"><span class="myspan" style="background: #6E46DD;"></span></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签1" prop="tag1">
        <el-input v-model="dataForm.tag1" placeholder="标签1" maxlength="8"></el-input>
      </el-form-item>
      <el-form-item label="标签2" prop="tag2">
        <el-input v-model="dataForm.tag2" placeholder="标签2" maxlength="8"></el-input>
      </el-form-item>
      <el-form-item label="标签3" prop="tag3">
        <el-input v-model="dataForm.tag3" placeholder="标签3" maxlength="8"></el-input>
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
      <el-form-item label="URL" prop="url">
        <el-input v-model="dataForm.url" placeholder="URL"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">展示</el-radio>
          <el-radio :label="2">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="跳转类型" size="mini" prop="inners">
        <el-radio-group v-model="dataForm.inners">
          <el-radio :label="1">内链</el-radio>
          <el-radio :label="2">外链</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="margin-left:20%;">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      <el-button @click='returnList()'>返回</el-button>
    </div>
  <!-- </el-dialog> -->
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
        // visible: false,
        title: null,
        dataForm: {
          id: 0,
          weight: '',
          name: '',
          icon: '',
          propaganda: '',
          rebate: '',
          rebateDescription: '',
          color: 1,
          tag1: '',
          tag2: '',
          tag3: '',
          categoryName1: '',
          categoryContent1: '',
          categoryName2: '',
          categoryContent2: '',
          url: '',
          status: 1,
          inners: 1
        },
        dataRule: {
          weight: [
            { required: true, message: '排名权重不能为空', trigger: 'blur' },
            { validator: validateNum, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '银行名称不能为空', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '银行icon不能为空', trigger: 'blur' }
          ],
          propaganda: [
            { required: true, message: '宣传语不能为空', trigger: 'blur' }
          ],
          color: [
            { required: true, message: '银行背景颜色不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: 'URL不能为空', trigger: 'blur' }
          ]
        },
        editorCon1: '',
        editorCon2: '',
        // fileList: [],
        // uploadUrl: '',
        uploadUrl: this.$http.adornUrl('file/upload'),
        // postData: {
        //   token: ''
        // },
        // limit: 1,
        imgWidth: 88,
        imgHeight: 88,
        imgSize: 200,
        // imageUrl: ''
      }
    },
    components: {
      ImgUpload,
      Editor
    },
    methods: {
      chooseImg (src) {
        this.dataForm.icon = src
        this.$refs['icon'].clearValidate(['icon'])
      },
      init (id, row) {
        this.dataForm.id = id || 0
        this.title = !this.dataForm.id ? '新增' : '编辑'
        // this.uploadUrl = this.$http.adornUrl('/file/upload')
        // this.postData.token = Vue.cookie.get('token');
        // console.log(this.postData.token)
        if (this.dataForm.id) {
          this.dataForm = row
          this.dataForm.rebate = row.rebate/100
          this.dataForm.color = parseInt(row.color)
          this.editorCon1 = this.dataForm.categoryContent1
          this.editorCon2 = this.dataForm.categoryContent2
          // console.log(this.dataForm.icon)
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
      // 成功
      // handleSuccess(response, file, fileList) {
      //   console.log(response);
      //   this.dataForm.icon = response.fileUrl
      // },
      // // 失败
      // handleError(err, file, fileList) {
      //   console.log(err);
      //   this.$alert(err, '提示', {
      //     confirmButtonText: '确定',
      //   });
      // },
      // // 上传前
      // handleBeforeUpload(file) {
      //   // console.log(file);
      //   // // const isJPG = file.type === 'image/jpeg';
      //   const isLimit = file.size / 1024  < 200;

      //   // // if (!isJPG) {
      //   // //   this.$message.error('上传头像图片只能是 JPG 格式!');
      //   // // }
      //   if (!isLimit) {
      //     this.$alert('上传图片大小不符合要求!', '提示', {
      //       confirmButtonText: '确定',
      //     });
      //   }
      //   return isLimit;
      // },
      // // 删除
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      // // 超过数量
      // handleExceed(file, fileList) {
      //   console.log(file, fileList);
      //   if(fileList.length>=1){
      //     this.$alert('当前限制选择1张图片，如若更换图片请先删除再上传', '提示', {
      //       confirmButtonText: '确定',
      //     });
      //   }
      // },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
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
              url: this.$http.adornUrl(`/bank/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData(params, false)
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    // this.visible = false
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
  .myspan{
    background: #2371FF; width: 20px; height: 20px; display: inline-block; vertical-align: middle;
  }
}
</style>
