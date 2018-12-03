<template>
  <div class="mod-user">
    <div v-if="!addOrUpdateVisible">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList('1')">
      <el-form-item label="银行名称">
        <el-input v-model="dataForm.name" placeholder="银行名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="dataForm.status" @change="getDataList('1')" clearable placeholder="请选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="展示中" value="1"></el-option>
          <el-option label="已隐藏" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getDataList('1')">查询</el-button>
      <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      <el-button type="success" @click="passHandle()" :disabled="dataListSelections.length <= 0">展示</el-button>
      <el-button type="danger" @click="notPassHandle()" :disabled="dataListSelections.length <= 0">隐藏</el-button>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="index"
        label='序号'
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <!-- <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="80"
        class-name="myhide"
        label="ID">
      </el-table-column> -->
      <el-table-column
        prop="weight"
        header-align="center"
        align="center"
        label="排名权重">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="银行名称">
      </el-table-column>
      <el-table-column
        prop="icon"
        header-align="center"
        align="center"
        label="银行icon">
        <template slot-scope="scope">
          <div v-if="scope.row.icon == ''"></div>
          
          <div v-else><img :src="scope.row.icon" alt=""></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="rebate"
        header-align="center"
        align="center"
        label="返利金额(元)">filter
        <template slot-scope='scope'>
          {{ scope.row.rebate|formalMoney }}
        </template>
      </el-table-column>
      <el-table-column
        prop="rebateDescription"
        header-align="center"
        align="center"
        label="返利标识">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 2" size="small" type="danger">已隐藏</el-tag>
          <el-tag v-else size="small">展示中</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="addOrUpdateHandle(scope.row.id,scope.row)">编辑</el-button>
          <!-- <el-button type="danger" size="mini" @click="deleteHandle(scope.row.userId)">删除</el-button> -->
        </template>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-else ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './bankList-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          name: '',
          status: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList (page) {
        this.dataListLoading = true
        this.addOrUpdateVisible = false
        this.$http({
          url: this.$http.adornUrl('/bank/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': page=='1'?'1':this.pageIndex,
            'limit': this.pageSize,
            'name': this.dataForm.name,
            'status': this.dataForm.status
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
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id, row) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id, row)
        })
      },
      // 展示
      passHandle () {
        let ids = this.dataListSelections.map(item => {
          return item.id
        })
        ids = ids.join(',');

        let status = this.dataListSelections.map(item => {
          return item.status
        })
        console.log(status)
        for(let i=0;i<status.length;i++){
          if(status[i]=='1'){
            // alert('您选择了含有展示中的记录，请先取消勾选再操作');
            this.$alert('您选择了含有展示中的记录，请先取消勾选再操作', '提示', {
              confirmButtonText: '确定',
            });
            return ;
          }
        }

        this.$confirm('是否确定展示?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bank/updateStatus'),
            method: 'post',
            data: this.$http.adornData({'ids':ids,'status':1}, false,'form')
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
      },
      // 隐藏
      notPassHandle () {
        let ids = this.dataListSelections.map(item => {
          return item.id
        })
        ids = ids.join(',');

        let status = this.dataListSelections.map(item => {
          return item.status
        })
        console.log(status)
        for(let i=0;i<status.length;i++){
          if(status[i]=='2'){
            // alert('您选择了含有已隐藏的记录，请先取消勾选再操作');
            this.$alert('您选择了含有已隐藏的记录，请先取消勾选再操作', '提示', {
              confirmButtonText: '确定',
            });
            return ;
          }
        }

        this.$confirm('是否确定隐藏?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bank/updateStatus'),
            method: 'post',
            data: this.$http.adornData({'ids':ids,'status':2}, false,'form')
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
      }
    }
  }
</script>

