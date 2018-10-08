<template>
  <div class='mod-user'>
    <div v-show='!showDetailModule'>
    <el-form :inline='true' :model='dataForm' @keyup.enter.native='getDataList(1)'>
      <el-form-item label='申请时间'>
        <el-date-picker
          v-model='selTime'
          type='daterange'
          range-separator='~'
          start-placeholder='起始时间'
          end-placeholder='结束时间'
          @change="setFormTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label='渠道来源'>
        <el-input v-model='dataForm.channel' placeholder='渠道来源' clearable></el-input>
      </el-form-item>
      <el-form-item label='用户id'>
        <el-input v-model='dataForm.uid' placeholder='用户id' clearable></el-input>
      </el-form-item>
      <el-form-item label='参与返利'>
        <el-select v-model='dataForm.flag' @change='getDataList(1)' clearable placeholder='请选择' style="width: 100px">
          <el-option
            v-for='item in yerOrNOOptions'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='手机号码'>
        <el-input v-model='dataForm.phone' placeholder='手机号码' clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' icon="el-icon-search" @click='getDataList(1)'>查询</el-button>
        <el-button type='success' @click='exportExcel()'>导出</el-button>
        <a :href="excelUrl" download="用户信息列表.xlsx" ref="excelBtn" class="hidden"></a>
      </el-form-item>
    </el-form>
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
        prop='create_time'
        header-align='center'
        align='center'
        label='申请时间'>
      </el-table-column>
      <el-table-column
        prop='channel'
        header-align='center'
        align='center'
        label='渠道来源'>
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
        prop='flag'
        header-align='center'
        align='center'
        label='参与返利'>
        <template slot-scope='scope'>
          <el-tag v-if='scope.row.flag === 0' size='small' type='danger'>否</el-tag>
          <el-tag v-else size='small'>是</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop='credit_card_count'
        header-align='center'
        align='center'
        label='办卡张数'>
      </el-table-column>
      <el-table-column
        prop='total_money'
        header-align='center'
        align='center'
        label='返利总额(元)'>filter
        <template slot-scope='scope'>
          {{ scope.row.total_money|formalMoney }}
        </template>
      </el-table-column>
      <el-table-column
        fixed='right'
        header-align='center'
        align='center'
        width='150'
        label='操作'>
        <template slot-scope='scope'>
          <el-button size='mini' @click='showDetail(scope.row.uid)'>详情</el-button>
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
    <user-detail v-if='showDetailModule' ref='detailModule' @return="closeDetail()"></user-detail>
  </div>
</template>

<script>
  import UserDetail from './user-detail'
  import { formalDate } from '@/utils'
  export default {
    data () {
      return {
        excelUrl: '',
        dataForm: {
          beginTime: '',
          endTime: '',
          channel: '',
          uid: '',
          flag: '',
          phone: ''
        },
        yerOrNOOptions: [
          {value: '', label: '全部'},
          {value: 1, label: '是'},
          {value: 0, label: '否'}
        ],
        selTime: '',
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        showDetailModule: false
      }
    },
    components: {
      UserDetail
    },
    activated () {
      this.getDataList()
    },
    methods: {
      setFormTime (val) {
        if (val) {
          this.dataForm.beginTime = formalDate(val[0])
          this.dataForm.endTime = formalDate(val[1])
        } else {
          this.dataForm.beginTime = ''
          this.dataForm.endTime = ''
        }
      },
      // 获取数据列表
      getDataList (page) {
        this.dataListLoading = true
        let limit = {
          'page': page === 1 ? 1 : this.pageIndex,
          'limit': this.pageSize
        }
        let params = Object.assign(limit, this.dataForm)
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 显示详情块
      showDetail (id) {
        this.showDetailModule = true
        this.$nextTick(() => {
          this.$refs.detailModule.init(id)
        })
      },
      closeDetail () {
        this.showDetailModule = false
      },
      exportExcel () {
        let token = this.$cookie.get('token')
        let url = this.$http.adornUrl('users/export')
        this.excelUrl = url + '?' + 'beginTime=' + this.dataForm.beginTime + '&endTime=' + this.dataForm.endTime + '&channel=' + this.dataForm.channel + '&uid=' + this.dataForm.uid + '&phone=' + this.dataForm.phone + '&flag=' + this.dataForm.flag + '&token=' + token
        this.$nextTick(() => {
          this.$refs.excelBtn.click()
        })
      }
    }
  }
</script>
