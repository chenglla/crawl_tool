<template>
  <div class="app-container">
    <el-row>
      <el-card class="box-card">
        <h2 class="add-title">任务列表</h2>
      </el-card>
    </el-row>
    <el-row v-if="crawlList.length > 0">
      <el-table :data="crawlList.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="700" border
                class="table" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" width="80" type="index">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pagesize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="id" width="80" type="index">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="主题">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采集链接">
          <template slot-scope="scope">
            <span>{{scope.row.url}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="label" label="类别">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类">
          <template slot-scope="scope">
            <span>{{scope.row.category}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采集后缀">
          <template slot-scope="scope">
            <span>{{scope.row.suffix}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="label" label="用户">
          <template slot-scope="scope">
            <span>{{scope.row.user}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="label" label="采集状态">
          <template slot-scope="scope">
            <span>{{scope.row.statuss}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="label" label="新建时间">
          <template slot-scope="scope">
            <span>{{scope.row.insert_time | formatDate}}</span>
          </template>
        </el-table-column>
        <!--                <el-table-column label="操作" align="center">-->
        <!--                    <template slot-scope="scope">-->
        <!--                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.id, scope.row)">编辑-->
        <!--                        </el-button>-->
        <!--                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.id, scope.row)">删除-->
        <!--                        </el-button>-->
        <!--                    </template>-->
        <!--                </el-table-column>-->
      </el-table>
      <div class="pagination">
        <!--                {{currentPage}}-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[5, 20, 50, 100]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       background
                       :total="sumData">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
  import {selectTask} from '@/api/index'
  import {formatDate} from '../../utils/date.js'
export default {
  data() {
    return {
      problemTitle: '',
      problemContent: '',
      crawlList: [], // 查询到的采集任务
      currentPage: 1,
      pagesize: 20,
    }
  },
  mounted () {
    this.getCrawlList()
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    // uploadMyFeedback() {},
    getCrawlList () {
      selectTask({
        sql: 'select * from task;'
      }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
          this.crawlList = res.data.list
          this.$message({
            message: '查询成功',
            type: 'success'
          });
        } else {
          this.crawlList = []
          this.$message.error('查询失败');
        }
      })
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      // console.log(currentPage)
    },
  }
}
</script>

<style scoped>
.buttonContainer {
  width: 100px;
  margin: 10px auto;
}
</style>
