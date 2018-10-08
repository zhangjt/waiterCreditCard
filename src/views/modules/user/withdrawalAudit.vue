<template>
  <div class='mod-user'>
    <div v-show='!showDetailModule'>
      <el-form :inline='true' ref="dataForm" :model='dataForm' @keyup.enter.native='getDataList(1)'>
        <el-form-item label='申请时间'>
          <el-date-picker
            v-model='applyTime'
            type='daterange'
            range-separator='~'
            start-placeholder='起始时间'
            end-placeholder='结束时间'
            @change='setApplyTime'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label='审核状态'>
          <el-select v-model='dataForm.auditStatus' @change='getDataList(1)' clearable placeholder='请选择' style='width: 100px'>
            <el-option
              v-for='item in auditOption'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='手机号码'>
          <el-input v-model='dataForm.phone' placeholder='手机号码' clearable></el-input>
        </el-form-item>
        <el-form-item label='付款日期'>
          <el-date-picker
            v-model='payTime'
            type='daterange'
            range-separator='~'
            start-placeholder='起始时间'
            end-placeholder='结束时间'
            @change='setPayTime'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label='审核日期'>
          <el-date-picker
            v-model='auditTime'
            type='daterange'
            range-separator='~'
            start-placeholder='起始时间'
            end-placeholder='结束时间'
            @change='setAuditTime'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label='付款状态'>
          <el-select v-model='dataForm.isPay' @change='getDataList(1)' clearable placeholder='请选择' style='width: 100px'>
            <el-option
              v-for='item in payOption'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' icon="el-icon-search" @click='getDataList(1)'>查询</el-button>
          <el-button @click='resetForm()'>重置</el-button>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button type='primary' @click='auditPassOrRefused(1)'>审核通过</el-button>
        <el-button type='danger' @click='auditPassOrRefused(-1)'>审核不通过</el-button>
        <el-button type='success' @click='payPass()'>付款</el-button>
        <el-button type='warning' @click='allPay()'>一键付款</el-button>
        <el-button type='info' @click='exportExcel()'>导出</el-button>
        <a :href="excelUrl" download="提现审核列表.xlsx" ref="excelBtn" class="hidden"></a>
        <span>总计<b class="highlight">{{ sumFee }}</b>元</span>
        <span>总计<b class="highlight">{{ totalPage }}</b>条</span>
      </div>
      <el-table
        :data='dataList'
        border
        v-loading='dataListLoading'
        @selection-change="selectionChangeHandle"
        style='width: 100%;'>
        <el-table-column
          type='index'
          label='序号'
          width='50'>
        </el-table-column>
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop='phone'
          header-align='center'
          align='center'
          label='手机号码'
          width='110'>
        </el-table-column>
        <el-table-column
          prop='addtime'
          header-align='center'
          align='center'
          label='申请时间'
          width='160'>
        </el-table-column>
        <el-table-column
          prop='fee'
          header-align='center'
          align='center'
          label='提现金额(元)'
          width='80'>
        </el-table-column>
        <el-table-column
          prop='audit_admin'
          header-align='center'
          align='center'
          label='审核操作员'
          width='100'>
        </el-table-column>
        <el-table-column
          prop='audit_time'
          header-align='center'
          align='center'
          label='审核日期'
          width='160'>
        </el-table-column>
        <el-table-column
          prop='pay_admin'
          header-align='center'
          align='center'
          label='付款操作员'
          width='100'>
        </el-table-column>
        <el-table-column
          prop='payment_time'
          header-align='center'
          align='center'
          label='付款日期'
          width='160'>
        </el-table-column>
        <el-table-column
          prop='content'
          header-align='center'
          align='center'
          label='来源'>
        </el-table-column>
        <el-table-column
          fixed='right'
          header-align='center'
          align='center'
          width='150'
          label='审核操作'>
          <template slot-scope='scope'>
            <div v-if="scope.row.audit_status===0">
              <el-button v-if="isAuth('user:withdrawalAudit:pass')"  size='mini' @click='auditPassOrRefused(1,scope.row.id)'>通过</el-button>
              <el-button v-if="isAuth('user:withdrawalAudit:refused')"  size='mini' @click='auditPassOrRefused(-1,scope.row.id)'>拒绝</el-button>
            </div>
            <span v-else-if="scope.row.audit_status===1" class="text-success">已通过</span>
            <span v-else class="text-danger">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed='right'
          header-align='center'
          align='center'
          width='100'
          label='付款操作'>
          <template slot-scope='scope'>
            <div v-if="scope.row.is_pay===-1">
              <span class="text-danger">付款失败</span>
            </div>
            <div v-else>
              <span v-if="scope.row.audit_status===0" text-info>待付款</span>
              <div v-else-if="scope.row.audit_status===1">
                <span v-if="scope.row.is_pay===1" class="text-success">已付款</span>
                <div v-else>
                  <el-button v-if="isAuth('user:withdrawalAudit:pay')"  size='mini' @click='payPass(scope.row.id)'>付款</el-button>
                </div>
              </div>
            </div>
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
    <user-detail v-show='showDetailModule' ref='detailModule' @return='closeDetail()'></user-detail>
  </div>
</template>

<script>
  import UserDetail from './user-detail'
  import { formalDate } from '@/utils'
  export default {
    data () {
      return {
        excelUrl: '',
        sumFee: 0,
        dataForm: {
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
        },
        auditOption: [
          {value: null, label: '全部'},
          {value: 0, label: '待审核'},
          {value: 1, label: '已通过'},
          {value: -1, label: '已拒绝'}
        ],
        payOption: [
          {value: null, label: '全部'},
          {value: 0, label: '待付款'},
          {value: 1, label: '已付款'},
          {value: -1, label: '付款失败'}
        ],
        applyTime: '',
        payTime: '',
        auditTime: '',
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
    computed: {
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      setApplyTime (val) {
        if (val) {
          this.dataForm.beginAddtime = formalDate(val[0])
          this.dataForm.endAddtime = formalDate(val[1])
        } else {
          this.dataForm.beginAddtime = ''
          this.dataForm.endAddtime = ''
        }
      },
      setPayTime (val) {
        if (val) {
          this.dataForm.beginPaymentTime = formalDate(val[0])
          this.dataForm.endPaymentTime = formalDate(val[1])
        } else {
          this.dataForm.beginPaymentTime = ''
          this.dataForm.endPaymentTime = ''
        }
      },
      setAuditTime (val) {
        if (val) {
          this.dataForm.beginAuditTime = formalDate(val[0])
          this.dataForm.endAuditTime = formalDate(val[1])
        } else {
          this.dataForm.beginAuditTime = ''
          this.dataForm.endAuditTime = ''
        }
      },
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
        this.applyTime = ''
        this.auditTime = ''
        this.payTime = ''
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
          url: this.$http.adornUrl('commissionPay/list'),
          method: 'post',
          data: this.$http.adornData(params, false, 'form')
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalNum
            this.sumFee = data.sumFee
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
      // 审核操作
      auditPassOrRefused (status, id) {
        var ids = []
        if (id) {
          ids.push(id)
        } else {
          var ids = []
          this.dataListSelections.map(item => {
            if (item.audit_status === 0 || item.audit_status === -status) {
              ids.push(item.id)
            }
          })
        }
        if (ids.length > 0) {
          this.$confirm(`确定进行[${id ? '审核' : '批量审核'}]操作?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              ids: ids.toString(),
              auditStatus: status,
              auditAdmin: this.userName
            }
            this.$http({
              url: this.$http.adornUrl('commissionPay/audit'),
              method: 'post',
              data: this.$http.adornData(params, false, 'form')
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.getDataList()
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }).catch(() => {})
        } else {
          this.$message('请筛选有效数据')
        }
      },
      // 付款操作
      payPass (id) {
        var ids = []
        if (id) {
          ids.push(id)
        } else {
          var ids = []
          this.dataListSelections.map(item => {
            if (item.audit_status === 1 && item.is_pay !== 1) {
              ids.push(item.id)
            }
          })
        }
        if (ids.length > 0) {
          this.$confirm(`确定进行[${id ? '付款' : '批量付款'}]操作?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              ids: ids.toString(),
              payAdmin: this.userName
            }
            this.$http({
              url: this.$http.adornUrl('commissionPay/pay'),
              method: 'post',
              data: this.$http.adornData(params, false, 'form')
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.getDataList()
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }).catch(() => {})
        } else {
          this.$message('请筛选有效数据')
        }
      },
      // 一键审核付款操作
      allPay () {
        this.$confirm(`确定执行一键付款操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message('系统正在执行付款操作...')
          let params = {
            payAdmin: this.userName
          }
          this.$http({
            url: this.$http.adornUrl('commissionPay/pay/all'),
            method: 'post',
            data: this.$http.adornData(params, false, 'form')
          }).then(({data}) => {
            if (data && data.code === 0) {
              // 一个新的临时数组
              var temp = []
              for (var i = 0; i < data.msg.length; i++) {
                if (temp.indexOf(data.msg[i]) === -1) {
                  temp.push(data.msg[i])
                }
              }
              let msg = ''
              for (let i of temp) {
                msg += i
              }
              this.$message({
                message: msg,
                type: 'warning',
                duration: 3000,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },
      exportExcel () {
        let token = this.$cookie.get('token')
        let url = this.$http.adornUrl('commissionPay/list/export')
        this.excelUrl = url + '?' + 'beginAddtime=' + this.dataForm.beginAddtime + '&endAddtime=' + this.dataForm.endAddtime + '&beginAuditTime=' + this.dataForm.beginAuditTime + '&endAuditTime=' + this.dataForm.endAuditTime + '&beginPaymentTime=' + this.dataForm.beginPaymentTime + '&endPaymentTime=' + this.dataForm.endPaymentTime + '&uid=' + this.dataForm.uid + '&phone=' + this.dataForm.phone + '&auditStatus=' + this.dataForm.auditStatus + '&isPay=' + this.dataForm.isPay + '&token=' + token
        this.$nextTick(() => {
          this.$refs.excelBtn.click()
        })
      }
    }
  }
</script>

