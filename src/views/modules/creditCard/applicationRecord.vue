<template>
  <div class="mod-user">
    <div v-if="!detailOrUpdateVisible">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList('1')" style="margin-bottom:15px;">
      <!-- <el-form-item label="导入时间">
        <el-date-picker
          v-model="dataForm.startImportDate"
          type="date"
          placeholder="开始时间">
        </el-date-picker>
        <span>~</span>
        <el-date-picker
          v-model="dataForm.endImportDate"
          type="date"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label='导入时间'>
        <el-date-picker
          v-model='dateTime'
          type='daterange'
          range-separator='~'
          start-placeholder='开始时间'
          end-placeholder='结束时间'
          @change="setDateTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="银行/信用卡名称">
        <el-input v-model="dataForm.bankName" placeholder="银行/信用卡名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="财喵账号">
        <el-input v-model="dataForm.account" placeholder="财喵账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="发放状态">
        <el-select v-model="dataForm.status" @change="getDataList('1')" clearable placeholder="请选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待发放" value="0"></el-option>
          <el-option label="已发放" value="1"></el-option>
          <el-option label="发放失败" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="getDataList('1')">查询</el-button>
      <el-button type="success" @click="grantHandle()" :disabled="dataListSelections.length <= 0">发放</el-button>
      <el-button type="primary" @click="downloadHandle()">银行数据模板下载</el-button>
      <a :href="downloadUrl" download="银行数据模板下载.xlsx" ref="downloadBtn" class="hidden"></a>
      <el-button type="primary" @click="importHandle()">导入银行数据</el-button>
      <input class="hidden" ref="importExecl" type="file" @change="selExcelFile($event)">
      <el-button type="primary" @click="downloadRebateHandle()">申请数据模板下载</el-button>
      <a :href="downloadRebateUrl" download="申请数据模板下载.xlsx" ref="downloadRebateBtn" class="hidden"></a>
      <el-button type="primary" @click="importRebateHandle()">导入excel</el-button>
      <input class="hidden" ref="importRebateExecl" type="file" @change="selRebateExcelFile($event)">
      <el-button type="primary" @click="exportExcelHandle()">导出excel</el-button>
      <a :href="excelUrl" download="信用卡申请记录列表.xlsx" ref="excelBtn" class="hidden"></a>
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
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="60"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="importDate"
        header-align="center"
        align="center"
        label="导入时间">
      </el-table-column>
      <el-table-column
        prop="applyDate"
        header-align="center"
        align="center"
        label="申请时间">
      </el-table-column>
      <el-table-column
        prop="account"
        header-align="center"
        align="center"
        label="财喵账号">
      </el-table-column>
      <el-table-column
        prop="creditAccount"
        header-align="center"
        align="center"
        label="登记账号">
      </el-table-column>
      <el-table-column
        prop="recordDate"
        header-align="center"
        align="center"
        label="登记时间">
      </el-table-column>
      <el-table-column
        prop="bankName"
        header-align="center"
        align="center"
        label="银行/信用卡名称">
      </el-table-column>
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="银行注册号码">
      </el-table-column>
      <el-table-column
        prop="rebate"
        header-align="center"
        align="center"
        width="70"
        label="返利金额(元)">filter
        <template slot-scope='scope'>
          {{ scope.row.rebate|formalMoney }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        width="90"
        label="发放状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="warning">待发放</el-tag>
          <el-tag v-else-if="scope.row.status === 1" size="small" type="success">已发放</el-tag>
          <el-tag v-else size="small" type="danger">发放失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="operator"
        header-align="center"
        align="center"
        width="100"
        label="操作员">
      </el-table-column>
      <el-table-column
        prop="review"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status==0||scope.row.status==2" type="success" size="mini" @click="detailOrUpdateHandle(scope.row.id,scope.row,'true')">编辑</el-button>
          <el-button type="warning" size="mini" @click="detailOrUpdateHandle(scope.row.id,scope.row,'false')">详情</el-button>
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
    <detail-or-update v-else ref="detailOrUpdate" @refreshDataList="getDataList"></detail-or-update>
  </div>
</template>

<script>
  import DetailOrUpdate from './applicationRecord-detail-or-update'
  import { formalDate } from '@/utils'
  export default {
    data () {
      let vm = this
      return {
        dataForm: {
          startImportDate: '',
          endImportDate: '',
          bankName: '',
          account: '',
          status: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        detailOrUpdateVisible: false,
        downloadUrl: '',
        downloadRebateUrl: '',
        excelUrl: '',
        dateTime: []
      }
    },
    components: {
      DetailOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      setDateTime (val) {
        if (val) {
          this.dataForm.startImportDate = formalDate(val[0])
          this.dataForm.endImportDate = formalDate(val[1])
        } else {
          this.dataForm.startImportDate = ''
          this.dataForm.endImportDate = ''
        }
      },
      // 获取数据列表
      getDataList (page) {
        this.dataListLoading = true
        this.detailOrUpdateVisible = false
        // if(this.dataForm.startImportDate>this.dataForm.endImportDate){
        //   this.$alert('选择的开始时间不能大于结束时间', '提示', {
        //     confirmButtonText: '确定',
        //   });
        //   return ;
        // }
        // if(this.dataForm.startImportDate){
        //   this.dataForm.startImportDate = formalDate(this.dataForm.startImportDate)
        // }
        // if(this.dataForm.endImportDate){
        //   this.dataForm.endImportDate = formalDate(this.dataForm.endImportDate)
        // }
        this.$http({
          url: this.$http.adornUrl('/creditCardRecord/getList'),
          method: 'post',
          params: this.$http.adornParams({
            'page': page=='1'?'1':this.pageIndex,
            'limit': this.pageSize,
            'startImportDate': this.dataForm.startImportDate,
            'endImportDate': this.dataForm.endImportDate,
            'bankName': this.dataForm.bankName,
            'account': this.dataForm.account,
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
      // 详情 / 修改
      detailOrUpdateHandle (id, row, isEdit) {
        this.detailOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.detailOrUpdate.init(id, row, isEdit)
        })
      },
      // 发放
      grantHandle () {
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
            this.$alert('您选择了含有已发放的记录，请先取消勾选再操作', '提示', {
              confirmButtonText: '确定',
            });
            return ;
          }
        }

        this.$confirm('是否确定发放?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/creditCardRecord/rebate'),
            method: 'post',
            data: this.$http.adornData({'ids':ids}, false,'form')
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
      //模板下载
      downloadHandle () {
        let token = this.$cookie.get('token')
        let url = this.$http.adornUrl('fetchdata/creditcard/downExcel')
        this.downloadUrl = url + '?' + 'token=' + token
        this.$nextTick(() => {
          this.$refs.downloadBtn.click()
        })
      },
      //导入匹配前数据
      selExcelFile: function (e) {
          let files = e.target.files;
          let fileObj = files[0];
          if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
              alert("请选择文件");
              return;
          }
          let formFile = new FormData();
          formFile.append("action", "UploadVMKImagePath");
          formFile.append("file", fileObj); //加入文件对象
          let data = formFile;
          let token = this.$cookie.get('token')
          this.$http({
            // headers: {
            //   'Content-Type': 'application/json; charset=utf-8'
            // },
            url: this.$http.adornUrl('fetchdata/creditcard/importData'),
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            method: 'post',
            data: data
          }).then(({data}) => {
            this.$refs.importExecl.value='';
            if (data && data.code === 0) {
              // this.$message({
              //   message: '上传成功',
              //   type: 'success',
              //   duration: 1500,
              //   onClose: () => {
              //     this.getDataList()
              //   }
              // })
              this.$alert(`数据匹配完成<br /><br /><a class="primary" style="margin-left:45px;" href="${data.file}?token=${token}">导出查看</a>`, '提示', {
                dangerouslyUseHTMLString: true
                // confirmButtonText: '确定'
              });
            } else {
              // this.$message.error(data.msg)
              this.$alert(`${data.msg}<br /><br /><a class="primary" style="margin-left:45px;" href="${data.file}?token=${token}">下载查看</a>`, '提示', {
                dangerouslyUseHTMLString: true
                // confirmButtonText: '确定'
              });
            }
          })
      },
      importHandle: function () {
          this.$refs.importExecl.click();
      },
      // 导出excel
      exportExcelHandle () {
        let token = this.$cookie.get('token')
        let url = this.$http.adornUrl('creditCardRecord/exportData')
        this.excelUrl = url + '?' + 'startImportDate=' + this.dataForm.startImportDate + '&endImportDate=' + this.dataForm.endImportDate + '&bankName=' + this.dataForm.bankName + '&account=' + this.dataForm.account + '&status=' + this.dataForm.status + '&token=' + token
        this.$nextTick(() => {
          this.$refs.excelBtn.click()
        })
      },
      //银行模板下载
      downloadRebateHandle () {
        let token = this.$cookie.get('token')
        let url = this.$http.adornUrl('creditCardRecord/downloadTemlete')
        this.downloadRebateUrl = url + '?' + 'token=' + token
        this.$nextTick(() => {
          this.$refs.downloadRebateBtn.click()
        })
      },
      //导入修改好返利数据
      selRebateExcelFile: function (e) {
        let files = e.target.files;
        let fileObj = files[0];
        if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
            alert("请选择文件");
            return;
        }
        let formFile = new FormData();
        formFile.append("action", "UploadVMKImagePath");
        formFile.append("file", fileObj); //加入文件对象
        let data = formFile;
        let token = this.$cookie.get('token')
        this.$http({
          // headers: {
          //   'Content-Type': 'application/json; charset=utf-8'
          // },
          url: this.$http.adornUrl('creditCardRecord/importData'),
          cache: false,//上传文件无需缓存
          processData: false,//用于对data参数进行序列化处理 这里必须false
          contentType: false, //必须
          method: 'post',
          data: data
        }).then(({data}) => {
          this.$refs.importRebateExecl.value='';
          if (data && data.code === 0) {
            this.$message({
              message: '上传成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            // this.$message.error(data.msg)
            this.$alert(`${data.msg}<br /><br /><a class="primary" style="margin-left:45px;" href="${data.file}?token=${token}">下载查看</a>`, '提示', {
              dangerouslyUseHTMLString: true
              // confirmButtonText: '确定'
            });
          }
        })
      },
      importRebateHandle: function () {
          this.$refs.importRebateExecl.click();
      },
    }
  }
</script>

<style lang="scss">
.hidden{
  display: none;
}
</style>

