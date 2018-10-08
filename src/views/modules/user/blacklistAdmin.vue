<template>
  <div class='mod-user'>
    <div v-show='!createOrDetailVisible'>
      <el-form :inline='true' :model='dataForm' @keyup.enter.native='getDataList(1)'>
        <el-form-item label='用户id'>
          <el-input v-model='dataForm.uid' placeholder='用户id' clearable></el-input>
        </el-form-item>
        <el-form-item label='手机号码'>
          <el-input v-model='dataForm.phone' placeholder='渠道来源' clearable></el-input>
        </el-form-item>
        <el-form-item label='限制条件'>
          <el-checkbox v-model="dataForm.rule">限制活动</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' icon="el-icon-search" @click='getDataList(1)'>查询</el-button>
          <el-button @click='resetForm()'>重置</el-button>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button type='primary' @click='createOrDetail()'>新增</el-button>
        <el-button type='success' @click='importExcel()'>批量导入</el-button>
      </div>
      <el-table
        :data='dataList'
        border
        v-loading='dataListLoading'
        style='width: 100%;'>
        <el-table-column
          type="index"
          label='序号'
          width="50">
        </el-table-column>
        <el-table-column
          prop='uid'
          header-align='center'
          align='center'
          label='用户ID'>
        </el-table-column>
        <el-table-column
          prop='nickname'
          header-align='center'
          align='center'
          label='用户昵称'>
        </el-table-column>
        <el-table-column
          prop='phone'
          header-align='center'
          align='center'
          label='手机号码'>
        </el-table-column>
        <el-table-column
          prop='uid'
          header-align='center'
          align='center'
          label='注册时间'>
        </el-table-column>
        <el-table-column
          prop='second_num'
          header-align='center'
          align='center'
          label='限制活动'>
        </el-table-column>
        <el-table-column
          prop='second_num'
          header-align='center'
          align='center'
          label='备注'>
        </el-table-column>
        <el-table-column
          fixed='right'
          header-align='center'
          align='center'
          width='150'
          label='操作'>
          <template slot-scope='scope'>
            <el-button size='mini' @click='createOrDetail(scope.row)'>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change='sizeChangeHandle'
        @current-change='currentChangeHandle'
        :current-page='pageIndex'
        :page-sizes='[10, 20, 50, 100]'
        :page-size='pageSize'
        :total='totalPage'
        layout='total, sizes, prev, pager, next, jumper'>
      </el-pagination>
    </div>
    <!-- 用户详情 -->
    <add-or-detail v-show='createOrDetailVisible' ref='createOrDetail' @return="closeDetail()"></add-or-detail>
  </div>
</template>

<script>
  import AddOrDetail from './blacklist-add-or-detail'
  import { formalDate } from '@/utils'
  export default {
    data () {
      let vm = this
      return {
        dataForm: {
          uid: '',
          phone: '',
          checked: null
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        createOrDetailVisible: false
      }
    },
    components: {
      AddOrDetail
    },
    activated () {
      this.getDataList()
    },
    methods: {
      resetForm () {
        this.dataForm = {
          beginAddtime: '',
          endAddtime: '',
          beginAuditTime: '',
          endAuditTime: '',
          beginPaymentTime: '',
          endPaymentTime: '',
          auditStatus: '',
          isPay: '',
          uid: '',
          phone: ''
        }
        this.getDataList()
      },
      // 获取数据列表
      getDataList (page) {
        this.dataListLoading = true
        let limit = {
          'page': page === 1 ? 1 : this.pageIndex,
          'limit': this.pageSize
        }
        let params = Object.assign(limit, this.dataForm)
        console.log(params)
        this.$http({
          url: this.$http.adornUrl('users/list'),
          method: 'post',
          data: this.$http.adornData(params, false, 'form')
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalNum
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 显示详情块
      createOrDetail (row) {
        this.createOrDetailVisible = true
        this.$nextTick(() => {
          this.$refs.createOrDetail.init(row)
        })
      },
      closeDetail () {
        this.createOrDetailVisible = false
      },
      importExcel () {
        console.log('导入')
      },
      returnList () {
        this.activeName = 'rebate'
        this.$emit('return')
      }
    }
  }
</script>
