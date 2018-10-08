<template>
  <div class="mod-user">
    <div v-if="!addOrUpdateVisible">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList('1')">
      <el-form-item label="银行名称">
        <el-input v-model="dataForm.bankName" placeholder="银行名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="dataForm.status" @change="getDataList('1')" clearable placeholder="请选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="发布中" value="1"></el-option>
          <el-option label="已下架" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getDataList('1')">查询</el-button>
      <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
      <el-button type="success" @click="passHandle()" :disabled="dataListSelections.length <= 0">上架</el-button>
      <el-button type="warning" @click="notPassHandle()" :disabled="dataListSelections.length <= 0">下架</el-button>
      <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
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
        width="80">
      </el-table-column>
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="rank"
        header-align="center"
        align="center"
        label="排名权重">
      </el-table-column>
      <el-table-column
        prop="bankName"
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
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">已下架</el-tag>
          <el-tag v-else size="small">发布中</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="addOrUpdateHandle(scope.row.id,scope.row)">编辑</el-button>
          <!-- <el-button type="danger" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button> -->
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
  import AddOrUpdate from './followQuery-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          bankName: '',
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
          url: this.$http.adornUrl('/creditCardProgress/getList'),
          method: 'post',
          params: this.$http.adornParams({
            'page': page=='1'?'1':this.pageIndex,
            'limit': this.pageSize,
            'bankName': this.dataForm.bankName,
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
      // 上架
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
            this.$alert('您选择了含有发布中的记录，请先取消勾选再操作', '提示', {
              confirmButtonText: '确定',
            });
            return ;
          }
        }

        this.$confirm('是否确定上架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/creditCardProgress/editStatus'),
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
      // 下架
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
          if(status[i]=='0'){
            this.$alert('您选择了含有已下架的记录，请先取消勾选再操作', '提示', {
              confirmButtonText: '确定',
            });
            return ;
          }
        }

        this.$confirm('是否确定下架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/creditCardProgress/editStatus'),
            method: 'post',
            data: this.$http.adornData({'ids':ids,'status':0}, false,'form')
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
      // 删除
      deleteHandle (id) {
        let ids = this.dataListSelections.map(item => {
          return item.id
        })
        ids = ids.join(',');

        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/creditCardProgress/delete'),
            method: 'post',
            data: this.$http.adornData({'ids': ids}, false, 'form')
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

