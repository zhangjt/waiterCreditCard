<template>
  <div class="bannerEdit">
    <div class="form-title">{{isAdd ? '新增' : '修改'}}</div>
    <!-- 查询块 -->
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px" class="common-form">
      <el-form-item label="发布位置" prop="position" ref="position">
        <el-select v-model="dataForm.position" placeholder="请选择" :disabled="!isAdd" @change="clearValid">
          <el-option v-for="item in positionOptions" :key="item.value" :label="item.text" :value="item.value" v-if="item.value!==null">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="rank" v-if="dataForm.position===1||dataForm.position===5">
        <el-input v-model="dataForm.rank"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-if="dataForm.position===3||dataForm.position===4" v-model="dataForm.title" maxlength="7" placeholder="最多输入7个字符"></el-input>
        <el-input v-else v-model="dataForm.title"></el-input>
      </el-form-item>
      <el-form-item label="子标题" prop="subTitle">
        <el-input v-if="dataForm.position===3||dataForm.position===4" v-model="dataForm.subTitle" maxlength="8" placeholder="最多输入8个字符"></el-input>
        <el-input v-else v-model="dataForm.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="image" ref="img">
        <img-upload :orgin-img="dataForm.image" :img-size="imgSize" :width="imgWidth" :height="imgHeight" @choose="chooseImg"></img-upload>
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="dataForm.url"></el-input>
      </el-form-item>
      <el-form-item label="展示时间" prop="longTerm">
        <el-radio-group v-model="dataForm.longTerm">
          <el-radio :label="1" >长期</el-radio>
          <el-radio :label="0" >选择时间段</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="dateOption" v-if="dataForm.longTerm===0" style="margin-top: -20px;">
        <el-date-picker
          v-model="dateOption"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="setFormTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="item.value" v-for="item in statusOptions" v-if="item.value!==null">{{ item.text }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-edit" @click="dataFormSubmit()">发布</el-button>
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
        var reg = /^[0-9]*[1-9][0-9]*$/
        if (!reg.test(value)) {
          callback(new Error('请输入不小于0的整数'))
        } else {
          callback()
        }
      }
      return {
        isAdd: true,
        imgSize: 100,
        imgWidth: null,
        imgHeight: null,
        imageUrl: '',
        positionOptions: this.option.positionOptions,
        statusOptions: this.option.statusOptions,
        dataForm: {
          id: null,
          position: '',
          rate: 0,
          type: 0,
          rank: '',
          title: '',
          subTitle: '',
          image: '',
          url: '',
          status: 1,
          longTerm: 1,
          beginTime: null,
          endTime: null,
          dateOption: []
        },
        dateOption: [],
        dataRule: {
          position: [
            { required: true, message: '发布位置不能为空', trigger: 'blur' }
          ],
          rank: [
            { required: true, message: '排位权重不能为空', trigger: 'blur' },
            { validator: checkInt, trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          image: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          dateOption: [
            { required: true, message: '时间段不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      'dataForm.position': function (val) {
        switch (val) {
          case 1:
            this.imgWidth = 945
            this.imgHeight = 336
            break
          case 2:
            this.imgWidth = 1242
            this.imgHeight = 2208
            break
          case 3:
            this.imgWidth = 278
            this.imgHeight = 218
            break
          case 4:
            this.imgWidth = 144
            this.imgHeight = 144
            break
          case 5:
            this.imgWidth = 680
            this.imgHeight = 114
            break
        }
      }
    },
    methods: {
      clearValid () {
        this.$refs['position'].clearValidate()
      },
      chooseImg (src) {
        this.dataForm.image = src
        this.$refs['img'].clearValidate()
      },
      init (row) {
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (row) {
            this.isAdd = false
            this.dataForm = row
            if (this.dataForm.longTerm === 0) {
              this.dateOption = [this.dataForm.beginTime, this.dataForm.endTime]
              this.dataForm.dateOption = this.dateOption
            } else {
              this.dateOption = []
            }
          } else {
            this.isAdd = true
            this.dateOption = []
            this.dataForm = {
              id: null,
              position: '',
              rate: 0,
              type: 0,
              rank: '',
              title: '',
              subTitle: '',
              image: '',
              url: '',
              status: 1,
              longTerm: 1,
              beginTime: null,
              endTime: null,
              dateOption: []
            }
          }
        })
      },
      setFormTime (val) {
        if (val) {
          this.dataForm.beginTime = val[0]
          this.dataForm.endTime = val[1]
          this.dataForm.dateOption = val
          this.$refs['dataForm'].clearValidate(['dateOption'])
        } else {
          this.dataForm.beginTime = ''
          this.dataForm.endTime = ''
          this.$refs['dataForm'].clearValidate(['dateOption'])
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.position === 2 || this.dataForm.position === 3 || this.dataForm.position === 4) {
              this.dataForm.rank = 0
            }
            this.$http({
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              url: this.$http.adornUrl(`banner/${!this.dataForm.id ? 'save' : 'update'}`),
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
