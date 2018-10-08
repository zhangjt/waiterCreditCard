<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList('1')" style="margin-bottom:15px;">
      <el-form-item label="财喵账号">
        <el-input v-model="dataForm.account" placeholder="财喵账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="银行名称">
        <el-input v-model="dataForm.bankName" placeholder="银行名称" clearable></el-input>
      </el-form-item>
      <el-form-item label='申卡日期'>
        <el-date-picker
          v-model='dateTime'
          type='daterange'
          range-separator='~'
          start-placeholder='开始时间'
          end-placeholder='结束时间'
          @change="setDateTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="dataForm.phone" placeholder="电话号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="dataForm.userName" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="快递单号">
        <el-input v-model="dataForm.trackingNumber" placeholder="快递单号" clearable></el-input>
      </el-form-item>
      <el-button type="primary" @click="getDataList('1')">查询</el-button>
      <el-button type="primary" @click="exportExcelHandle()">导出excel</el-button>
      <a :href="excelUrl" download="申卡提单记录.xlsx" ref="excelBtn" class="hidden"></a>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        type="index"
        label='序号'
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="account"
        header-align="center"
        align="center"
        label="财喵账号">
      </el-table-column>
      <el-table-column
        prop="bankName"
        header-align="center"
        align="center"
        label="银行名称">
      </el-table-column>
      <el-table-column
        prop="applyDate"
        header-align="center"
        align="center"
        label="申卡日期">
      </el-table-column>
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="trackingNumber"
        header-align="center"
        align="center"
        label="快递单号">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </div>
</template>

<script>
  import { formalDate } from '@/utils'
  export default {
    data () {
      let vm = this
      return {
        dataForm: {
          account: '',
          bankName: '',
          startDate: '',
          endDate: '',
          phone: '',
          userName: '',
          trackingNumber: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        excelUrl: '',
        dateTime: []
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      setDateTime (val) {
        if (val) {
          this.dataForm.startDate = formalDate(val[0])
          this.dataForm.endDate = formalDate(val[1])
        } else {
          this.dataForm.startDate = ''
          this.dataForm.endDate = ''
        }
      },
      // 获取数据列表
      getDataList (page) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/creditCardApply/getList'),
          method: 'post',
          params: this.$http.adornParams({
            'page': page=='1'?'1':this.pageIndex,
            'limit': this.pageSize,
            'account': this.dataForm.account,
            'bankName': this.dataForm.bankName,
            'startDate': this.dataForm.startDate,
            'endDate': this.dataForm.endDate,
            'phone': this.dataForm.phone,
            'userName': this.dataForm.userName,
            'trackingNumber': this.dataForm.trackingNumber
          })
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
      // 多选
      // selectionChangeHandle (val) {
      //   this.dataListSelections = val
      // },
      // 导出excel
      exportExcelHandle () {
        let token = this.$cookie.get('token')
        let url = this.$http.adornUrl('/creditCardApply/exportData')
        this.excelUrl = url + '?' + 'account=' + this.dataForm.account + '&bankName=' + this.dataForm.bankName + '&startDate=' + this.dataForm.startDate + '&endDate=' + this.dataForm.endDate + '&phone=' + this.dataForm.phone + '&userName=' + this.dataForm.userName + '&trackingNumber=' + this.dataForm.trackingNumber + '&token=' + token
        this.$nextTick(() => {
          this.$refs.excelBtn.click()
        })
      }
    }
  }
</script>

