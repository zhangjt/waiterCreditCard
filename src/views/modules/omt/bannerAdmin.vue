<template>
  <div class="omt-bannerAdmin">
    <div v-show="!dialogShow" class="bannerAdminWrap" >
      <!-- 查询块 -->
      <el-form :inline='true' :model="dataForm" @keyup.enter.native='getDataList(1)' class="demo-ruleForm">
        <el-form-item label="创建日期" prop="name">
          <el-date-picker
            v-model="dateOption"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="setFormTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="dataForm.title"></el-input>
        </el-form-item>
        <el-form-item label="发布位置">
          <el-select v-model="dataForm.position" @change='getDataList(1)' clearable  placeholder="请选择">
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
          <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">发布banner</el-button>
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
          prop='position'
          header-align='center'
          align='center'
          width="130"
          label='发布位置'>
          <template scope="scope">
            <span>{{ positionArr[scope.row.position-1] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='createTime'
          header-align='center'
          align='center'
          width="160"
          label='创建时间'>
        </el-table-column>
        <el-table-column
          prop='rank'
          header-align='center'
          align='center'
          width="60"
          label='排序'>
        </el-table-column>
        <el-table-column
          header-align='center'
          align='center'
          label='图片'>
          <template scope="scope">
            <img :src="scope.row.image" height="40" />
          </template>
        </el-table-column>
        <el-table-column
          prop='title'
          header-align='center'
          align='center'
          label='标题'>
        </el-table-column>
        <el-table-column
          prop='subTitle'
          header-align='center'
          align='center'
          label='子标题'>
        </el-table-column>
        <el-table-column
          prop='click'
          header-align='center'
          align='center'
          width="80"
          label='点击次数'>
        </el-table-column>
        <el-table-column
          prop='title'
          header-align='center'
          align='center'
          label='展示时间'>
          <template scope="scope">
            <span v-if='scope.row.longTerm === 1'>长期</span>
            <span v-else>{{ scope.row.beginTime }} 至 {{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          header-align='center'
          align='center'
          width="80"
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
          width='150'
          label='操作'>
          <template slot-scope='scope'>
            <el-button size='mini' @click='addOrUpdateHandle(scope.row)'>编辑</el-button>
            <el-button size='mini' type="danger" @click='deleteHandle(scope.row.id)'>删除</el-button>
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
    <dialog-banner v-show="dialogShow" ref="addOrUpdate" @refreshDataList="refreshDataList" @return="closeDialog()" :option="{positionOptions:positionOptions,statusOptions:statusOptions}" ></dialog-banner>
  </div>
</template>
<script>
import DialogBanner from './dialog-banner'
import { formalDate } from '@/utils'
export default {
  components: {
    DialogBanner
  },
  data () {
    return {
      loading: false,
      // 添加/编辑banner数据
      dialogShow: false,
      bannerRow: {},
      dateOption: '',
      dataForm: {
        dateBegin: '',
        dateEnd: '',
        title: '',
        position: '',
        status: ''
      },
      // 回调数据
      dataList: [],
      pageIndex: 1,
      pageSize: 20,
      totalPage: 0,
      positionArr: ['APP首页', '开屏广告', '主题精选(大广告)', '主题精选(小广告)', 'app首页中部'],
      // 发布位置
      positionOptions: [
        { value: null, text: '全部' },
        { value: 1, text: 'APP首页' },
        { value: 2, text: '开屏广告' },
        { value: 3, text: '主题精选(大广告)' },
        { value: 4, text: '主题精选(小广告)' },
        { value: 5, text: 'app首页中部' }
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
    setFormTime (val) {
      if (val) {
        this.dataForm.dateBegin = formalDate(val[0])
        this.dataForm.dateEnd = formalDate(val[1])
      } else {
        this.dataForm.dateBegin = ''
        this.dataForm.dateEnd = ''
      }
    },
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
        url: this.$http.adornUrl('banner/list'),
        method: 'post',
        data: this.$http.adornData(params, false, 'form')
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
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
    addOrUpdateHandle (id) {
      this.dialogShow = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // // 删除
    deleteHandle (id) {
      this.$confirm(`确定进行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('banner/delete'),
          method: 'post',
          data: this.$http.adornData({id: id}, false, 'form')
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
<style lang="scss">

</style>
