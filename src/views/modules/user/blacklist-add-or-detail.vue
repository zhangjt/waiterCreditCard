<template>
  <div>
    <div class="form-title">{{isAdd ? '新增' : '详情'}}</div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px" class="common-form">
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户ID" :disabled="!isAdd"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-autocomplete
          v-model="dataForm.mobile"
          ref="autocomplete"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          value-key="phone"
          @select="handleSelect"
          style="width: 100%"
          :disabled="!isAdd"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="用户昵称">
        <span>{{dataForm.name}}</span>
      </el-form-item>
      <el-form-item label="注册时间">
        <span>{{dataForm.registTime}}</span>
      </el-form-item>
      <el-form-item label="限制条件" prop="rule">
        <el-checkbox v-model="dataForm.rule"  :disabled="!isAdd">限制活动</el-checkbox>
      </el-form-item>
      <el-form-item label="备注" prop="rule">
        <el-input type="textarea" v-model="dataForm.mark" :disabled="!isAdd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dataFormSubmit()" v-if="isAdd">确定</el-button>
        <el-button @click='returnList()'>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { isMobile } from '@/utils/validate'
  export default {
    data () {
      var validateMobile = (rule, value, callback) => {
        console.log(rule)
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        isAdd: true,
        visible: false,
        roleList: [],
        queryList: [],
        dataForm: {
          id: null,
          userId: '',
          mobile: '',
          name: '',
          registTime: '',
          rule: '',
          mark: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户ID不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.queryList = this.loadAll()
    },
    methods: {
      init (row) {
        console.log(row)
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        if (row) {
          this.isAdd = false
          this.dataForm = row
        } else {
          this.isAdd = true
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              },
              url: this.$http.adornUrl(`sys/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'salt': this.dataForm.salt,
                'email': this.dataForm.email,
                'mobile': this.dataForm.mobile,
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList
              })
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
      },
      loadAll () {
        return [
          { phone: '13648484427', name: '梁琪', registTime: '2015-05-15 12:15:16' },
          { phone: '15015497642', name: '叶青', registTime: '2015-05-15 12:15:16' },
          { phone: '13465145955', name: '王昭昭', registTime: '2015-06-15 12:25:16' },
          { phone: '13558686454', name: '刘强东', registTime: '2015-03-15 12:15:16' },
          { phone: '13648599627', name: '雷斯蒂', registTime: '2015-05-15 12:15:16' },
          { phone: '15654548786', name: '澄澈', registTime: '2015-06-15 12:15:16' },
          { phone: '13657854545', name: '沈长妮', registTime: '2015-05-15 12:15:16' },
          { phone: '15055587877', name: '程思安', registTime: '2015-05-15 12:15:16' },
          { phone: '15677454454', name: '黄思琪', registTime: '2015-05-15 12:15:16' },
          { phone: '15015417874', name: '刘德福', registTime: '2015-05-15 12:15:16' },
          { phone: '13568845454', name: '李兴强', registTime: '2015-05-15 12:15:16' },
          { phone: '16454854544', name: '黄石', registTime: '2015-05-15 12:15:16' },
          { phone: '18745434435', name: '刘诗诗', registTime: '2015-05-15 12:15:16' }
        ]
      },
      querySearchAsync (queryString, cb) {
        var queryList = this.queryList
        var results = queryString ? queryList.filter(this.createStateFilter(queryString)) : queryList
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.phone.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        console.log(item)
        let { phone, name, registTime } = item
        this.dataForm.mobile = phone
        this.dataForm.name = name
        this.dataForm.registTime = registTime
        this.$refs['dataForm'].clearValidate(['mobile'])
      }
    }
  }
</script>
