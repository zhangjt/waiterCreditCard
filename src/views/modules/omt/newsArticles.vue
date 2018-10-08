<template>
  <div class="omt-bannerAdmin">
    <div v-show="!dialogShow" class="bannerAdminWrap" >
      <!-- 查询块 -->
      <el-form :inline='true' :model="dataForm" @keyup.enter.native='getDataList(1)' class="demo-ruleForm">
        <el-form-item label="标题">
          <el-input v-model="dataForm.title"></el-input>
        </el-form-item>
        <el-form-item label="消息类型">
          <el-select v-model="dataForm.type" @change='getDataList(1)' clearable  placeholder="请选择">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="dataForm.status" @change='getDataList(1)' clearable  placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getDataList(1)">查询</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">发布消息</el-button>
        </el-form-item>
      </el-form>
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
          prop='type'
          header-align='center'
          align='center'
          width="150"
          label='消息类型'>
          <template scope="scope">
            <span v-if="scope.row.type===0">系统公告</span>
            <span v-else-if="scope.row.type===3">精选活动</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='addtime'
          header-align='center'
          align='center'
          width="200"
          label='创建时间'>
        </el-table-column>
        <el-table-column
          prop='title'
          header-align='center'
          align='center'
          label='标题'>
        </el-table-column>
        <el-table-column
          header-align='center'
          align='center'
          width="120"
          label='状态'>
          <template slot-scope='scope'>
            <el-tag v-if='scope.row.status === 0' size='small' type='danger'>已下架</el-tag>
            <el-tag v-else size='small'>发布中</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed='right'
          header-align='center'
          align='center'
          width='200'
          label='操作'>
          <template slot-scope='scope'>
            <el-button size='mini' @click='addOrUpdateHandle(scope.row)'>编辑</el-button>
            <el-button size='mini' v-if="scope.row.status===0" type="primary" @click='releaseOrcancel(scope.row.id,1)'>发布</el-button>
            <el-button size='mini' v-else type="danger" @click='releaseOrcancel(scope.row.id,0)'>取消发布</el-button>
            <!--<el-button size='mini' type="danger" @click='deleteHandle(scope.row.id)'>删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
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
    <dialog-articles v-show="dialogShow" ref="addOrUpdate" @refreshDataList="refreshDataList" @return="closeDialog()" :option="{positionOptions:positionOptions,statusOptions:statusOptions}"></dialog-articles>
  </div>
</template>
<script>
  // import http from '@/utils/httpRequest'
  import DialogArticles from './dialog-articles'
  import { formalDate } from '@/utils'
  export default {
    components: {
      DialogArticles
    },
    data () {
      let vm = this
      return {
        loading: false,
        // 添加/编辑数据
        dialogShow: false,
        dateOption: '',
        dataForm: {
          type: '',
          title: '',
          status: ''
        },
        pickerOptions: {
          onPick ({ maxDate, minDate }) {
            let min = formalDate(minDate)
            let max = formalDate(maxDate)
            vm.dataForm.dateBegin = min
            vm.dataForm.dateEnd = max
          }
        },
        // 回调数据
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        positionArr: ['系统公告', '精选活动'],
        // 发布位置
        positionOptions: [
          { value: null, text: '全部' },
          { value: 0, text: '系统公告' },
          { value: 3, text: '精选活动' }
        ],
        // 状态
        statusOptions: [
          { value: null, text: '全部' },
          { value: 1, text: '发布中' },
          { value: 0, text: '已下架' }
        ]
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
      getDataList (page) {
        this.loading = true
        let limit = {
          'page': page === 1 ? 1 : this.pageIndex,
          'limit': this.pageSize
        }
        let params = Object.assign(limit, this.dataForm)
        this.$http({
          url: this.$http.adornUrl('msg/list'),
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
          this.loading = false
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
      releaseOrcancel (id, status) {
        let data = {
          id: id,
          status: status
        }
        this.$http({
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          url: this.$http.adornUrl('msg/update'),
          method: 'post',
          data: this.$http.adornData(data, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.refreshDataList()
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
<style lang="scss">

</style>
