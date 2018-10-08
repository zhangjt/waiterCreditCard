<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList('1')" style="margin-bottom:15px;">
      <el-form-item label="财喵账号">
        <el-input v-model="dataForm.phone" placeholder="财喵账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="银行/信用卡名称">
        <el-input v-model="dataForm.platName" placeholder="银行/信用卡名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="登记账号">
        <el-input v-model="dataForm.regAccount" placeholder="登记账号" clearable></el-input>
      </el-form-item>
      <el-form-item label='登记时间'>
        <el-date-picker
          v-model='dateTime'
          type='daterange'
          range-separator='~'
          start-placeholder='开始时间'
          end-placeholder='结束时间'
          @change="setDateTime">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="getDataList('1')">查询</el-button>
      <el-button type="primary" @click="exportExcelHandle()">导出excel</el-button>
      <a :href="excelUrl" download="信用卡登记记录.xlsx" ref="excelBtn" class="hidden"></a>
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
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="财喵账号">
      </el-table-column>
      <el-table-column
        prop="regAccount"
        header-align="center"
        align="center"
        label="登记账号">
      </el-table-column>
      <el-table-column
        prop="addtime"
        header-align="center"
        align="center"
        label="登记时间">
      </el-table-column>
      <el-table-column
        prop="p2pName"
        header-align="center"
        align="center"
        label="银行/信用卡名称">
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
          phone: '',
          platName: '',
          regAccount: '',
          dateBegin: '',
          dateEnd: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        // dataListSelections: [],
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
          this.dataForm.dateBegin = formalDate(val[0])
          this.dataForm.dateEnd = formalDate(val[1])
        } else {
          this.dataForm.dateBegin = ''
          this.dataForm.dateEnd = ''
        }
      },
      // 获取数据列表
      getDataList (page) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/userRebateReg/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': page=='1'?'1':this.pageIndex,
            'limit': this.pageSize,
            'type': 23,
            'phone': this.dataForm.phone,
            'platName': this.dataForm.platName,
            'regAccount': this.dataForm.regAccount,
            'dateBegin': this.dataForm.dateBegin,
            'dateEnd': this.dataForm.dateEnd
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
        let url = this.$http.adornUrl('userRebateReg/export')
        this.excelUrl = url + '?' + 'phone=' + this.dataForm.phone + '&platName=' + this.dataForm.platName + '&regAccount=' + this.dataForm.regAccount + '&dateBegin=' + this.dataForm.dateBegin + '&dateEnd=' + this.dataForm.dateEnd + '&type=23&token=' + token
        this.$nextTick(() => {
          this.$refs.excelBtn.click()
        })
      }
    }
  }
</script>

