<template>
  <div class="omt-bannerAdmin">
    <div v-show="!dialogShow" class="bannerAdminWrap" >
      <!-- 内容块 -->
      <el-table
        :data='dataList'
        border
        style='width: 100%;'>
        <el-table-column
          type="index"
          label='序号'
          width="50">
        </el-table-column>
        <el-table-column
          prop='name'
          header-align='center'
          align='center'
          width="150"
          label='名称'>
        </el-table-column>
        <el-table-column
          prop='version'
          header-align='center'
          align='center'
          width="200"
          label='版本号'>
        </el-table-column>
        <el-table-column
          header-align='center'
          align='center'
          label='安卓'>
          <template slot-scope='scope'>
            <span v-if="scope.row.android===1">展示</span>
            <span v-else>隐藏</span>
          </template>
        </el-table-column>
        <el-table-column
          header-align='center'
          align='center'
          label='ios'>
          <template slot-scope='scope'>
            <span v-if="scope.row.ios===1">展示</span>
            <span v-else>隐藏</span>
          </template>
        </el-table-column>
        <el-table-column
          header-align='center'
          align='center'
          label='icon'>
          <template scope="scope">
            <img :src="scope.row.iconUrl" height="40" />
          </template>
        </el-table-column>
        <el-table-column
          header-align='center'
          align='center'
          label='选中icon'>
          <template scope="scope">
            <img :src="scope.row.selectedIconUrl" height="40" />
          </template>
        </el-table-column>
        <el-table-column
          fixed='right'
          header-align='center'
          align='center'
          width='250'
          label='操作'>
          <template slot-scope='scope'>
            <el-button size='mini' @click='addOrUpdateHandle(scope.row)'>编辑</el-button>
            <el-button size='mini' type="primary" @click='changeState(scope.row, 1)'>展示</el-button>
            <el-button size='mini' type="danger" @click='changeState(scope.row, 0)'>隐藏</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dialog-entrance v-show="dialogShow" ref="addOrUpdate" @refreshDataList="refreshDataList" @return="closeDialog()"></dialog-entrance>
  </div>
</template>
<script>
  import DialogEntrance from './dialog-entrance'
  export default {
    components: {
      DialogEntrance
    },
    data () {
      return {
        loading: false,
        // 添加/编辑banner数据
        dialogShow: false,
        // 回调数据
        dataList: []
      }
    },
    watch: {
    },
    activated () {
      this.getDataList()
    },
    methods: {
      closeDialog () {
        this.dialogShow = false
        this.getDataList()
      },
      resetForm () {
        this.dataForm = {
          dateBegin: '',
          dateEnd: '',
          title: '',
          position: '',
          status: ''
        }
        this.dateOption = ''
      },
      // 获取数据列表
      getDataList () {
        this.loading = true
        let params = {
          'page': this.pageIndex,
          'limit': this.pageSize
        }
        this.$http({
          url: this.$http.adornUrl('hotSpotManage/entrySetList'),
          method: 'get',
          data: this.$http.adornParams(params, false)
        }).then(({data}) => {
          this.dataList = data
          this.loading = false
        })
      },
      refreshDataList () {
        this.dialogShow = false
        this.getDataList()
      },
      addOrUpdateHandle (row) {
        this.dialogShow = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row)
        })
      },
      changeState (row, status) {
        let params = row
        params.ios = status
        params.android = status
        this.$http({
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          url: this.$http.adornUrl('hotSpotManage/saveEntrySet'),
          method: 'post',
          data: this.$http.adornData(params)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
</script>
