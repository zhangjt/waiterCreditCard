<template>
  <div class='mod-user'>
    <el-button class="return-btn" type='primary' size="mini" @click='returnList()'>返回</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="返利信息" name="rebate">
        <el-row :gutter="20" class="row-form-static">
          <el-col :span="6">累计返利笔数：<span class="highlight">{{ sumTime }}</span> 笔</el-col>
          <el-col :span="6">累计返利金额：<span class="highlight">{{ sumFee|formalMoney }}</span> 元</el-col>
        </el-row>
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
            prop='recordDate'
            header-align='center'
            align='center'
            label='办卡日期'>
          </el-table-column>
          <el-table-column
            prop='bankName'
            header-align='center'
            align='center'
            label='信用卡/银行名称'>
          </el-table-column>
          <el-table-column
            prop='phone'
            header-align='center'
            align='center'
            label='办卡手机号'>
          </el-table-column>
          <el-table-column
            prop='rebate'
            header-align='center'
            align='center'
            label='返利金额(元)'>
            <template slot-scope='scope'>
              {{ scope.row.rebate|formalMoney }}
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
      </el-tab-pane>
      <el-tab-pane label="钱包信息" name="wallet">
        <el-row :gutter="20" class="row-form-static">
          <el-col :span="6">钱包余额：<span class="highlight">{{ walletBalance }}</span> 元</el-col>
          <el-col :span="6">累计支出：<span class="highlight">{{ walletSum }}</span> 元</el-col>
          <el-col :span="6">累计收入：<span class="highlight">{{ withdrawal }}</span> 元</el-col>
        </el-row>
        <el-table
          :data='walletDataList'
          border
          v-loading='walletDataListLoading'
          style='width: 100%;'>
          <el-table-column
            type="index"
            label='序号'
            width="50">
          </el-table-column>
          <el-table-column
            prop='addtime'
            header-align='center'
            align='center'
            label='时间'>
          </el-table-column>
          <el-table-column
            prop='fee'
            header-align='center'
            align='center'
            label='类型'>
            <template slot-scope='scope'>
              <el-tag v-if='scope.row.fee < 0' size='small' type='danger'>支出</el-tag>
              <el-tag v-else size='small'>收入</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop='con'
            header-align='center'
            align='center'
            label='交易摘要'>
          </el-table-column>
          <el-table-column
            prop='fee'
            header-align='center'
            align='center'
            label='金额(元)'>
            <template slot-scope='scope'>
              {{ scope.row.fee }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change='WalletSizeChangeHandle'
          @current-change='WalletCurrentChangeHandle'
          :current-page='walletPageIndex'
          :page-sizes='[10, 20, 50, 100]'
          :page-size='walletPageSize'
          :total='walletTotalPage'
          layout='total, sizes, prev, pager, next, jumper'>
        </el-pagination>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        activeName: 'rebate',
        sumTime: '', // 返利笔数
        sumFee: '',  // 累计返利金额
        walletBalance: '',
        walletSum: '',
        withdrawal: '',
        dataListLoading: false,
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        walletDataListLoading: false,
        walletDataList: [],
        walletPageIndex: 1,
        walletPageSize: 20,
        walletTotalPage: 0
      }
    },
    components: {
    },
    activated () {
      this.init()
    },
    methods: {
      returnList () {
        this.activeName = 'rebate'
        this.$emit('return')
      },
      handleClick (tab, event) {
        console.log(tab)
        if (tab.name === 'wallet') {
          this.getWalletData()
        }
      },
      // 获取返利数据列表
      init (id) {
        if (id) {
          this.id = id
        }
        this.dataListLoading = true
        let params = {
          'uid': this.id,
          'page': this.pageIndex,
          'limit': this.pageSize
        }
        this.$http({
          url: this.$http.adornUrl('creditCardRecord/getRebateByUid'),
          method: 'post',
          data: this.$http.adornData({'uid': this.id}, false, 'form')
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.sumTime = data.count
            this.sumFee = data.sum
          }
        })
        this.$http({
          url: this.$http.adornUrl('creditCardRecord/getListByUid'),
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
        this.init()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.init()
      },
      // 获取钱包数据列表
      getWalletData () {
        this.walletDataListLoading = true
        let params = {
          'uid': this.id,
          'page': this.walletPageIndex,
          'limit': this.walletPageSize
        }
        console.log(params)
        this.$http({
          url: this.$http.adornUrl('users/usersMoneyCount'),
          method: 'post',
          data: this.$http.adornData({'uid': this.id}, false, 'form')
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.walletBalance = data.result.balance
            this.walletSum = data.result.totalDraw
            this.withdrawal = data.result.totalGot
          }
        })
        this.$http({
          url: this.$http.adornUrl('users/usersMoneyList'),
          method: 'post',
          data: this.$http.adornData(params, false, 'form')
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.walletDataList = data.page.list
            this.walletTotalPage = data.page.totalNum
          } else {
            this.walletDataList = []
            this.walletTotalPage = 0
          }
          this.walletDataListLoading = false
        })
      },
      // 钱包每页数
      WalletSizeChangeHandle (val) {
        this.walletPageSize = val
        this.walletPageIndex = 1
        this.getWalletData()
      },
      // 钱包当前页
      WalletCurrentChangeHandle (val) {
        this.walletPageIndex = val
        this.getWalletData()
      }

    }
  }
</script>

<style lang="scss" scoped>
  .row-form-static{
    margin-bottom: 15px;
  }
  .highlight{
    color: #a94442;
    font-weight: bold;
  }
  .return-btn{
    position: absolute;
    left: 250px;
    top: 26px;
    z-index: 10;
  }
</style>

