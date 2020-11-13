<template>
  <div class="app-container">
    <el-row>
<!--      <el-card class="box-card">-->
        <div class="add-title">采集任务管理</div>
<!--      </el-card>-->
      <div>
        <el-button type="primary" class="add-crawl" icon="el-icon-plus" @click="gotoAdd">新建</el-button>
        <el-button type="primary" class="add-crawl" @click="gotoView">查看采集说明</el-button>
        <el-button type="primary" class="add-crawl" @click="gotoVideo">查看视频教程</el-button>
        <el-button type="primary" class="add-crawl" icon="el-icon-edit" @click="gotoFeedback">问题反馈</el-button>
      </div>
    </el-row>
    <el-row v-if="crawlList.length > 0">
      <el-table :data="crawlList.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="700" border
                class="table" style="width: 100%">
<!--                class="table" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">-->
<!--        <el-table-column type="selection" width="55" align="center"></el-table-column>-->
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
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.id, scope.row, scope.$index)">编辑
                </el-button>
                <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.id, scope.row, scope.$index)">删除
                </el-button>
              <el-button type="text" icon="el-icon-delete" class="red" @click="handleOpen(scope.row.id, scope.row['download_url'], scope.$index)">打开
                </el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!--                {{currentPage}}-->
        <el-pagination
                @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-sizes="[5, 20, 50, 100]"
               :page-size="pagesize"
               layout="total, sizes, prev, pager, next, jumper"
               background
               :total="sumData">
        </el-pagination>
      </div>
    </el-row>
    <el-dialog title="采集任务" :visible.sync="showCrawl">
      <el-form ref="form" :model="form" label-width="100px" class="add-form">
        <el-form-item label="添加任务者">
          <el-input v-model="form.user" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="采集页面url">
          <el-input v-model="form.url"></el-input>

        </el-form-item>
        <el-form-item label="页面分类">
            <el-checkbox-group v-model="checkList" @change="changeCategory">
<!--            <el-checkbox-group v-model="form.category">-->
                <el-checkbox label="录取分数"></el-checkbox>
                <el-checkbox label="招生计划"></el-checkbox>
                <el-checkbox label="选课要求 "></el-checkbox>
<!--                <el-checkbox label="禁用" disabled></el-checkbox>-->
<!--                <el-checkbox label="选中且禁用" disabled></el-checkbox>-->
            </el-checkbox-group>
<!--          <el-input v-model="form.category" placeholder="录取分数、招生计划等" ></el-input>-->
        </el-form-item>
        <el-form-item label="页面主题">
          <el-input v-model="form.title" placeholder="大学名称或省份，如：山东大学、北京市等"></el-input>
        </el-form-item>
        <el-form-item label="任务年份">
          <el-input v-model="form.year" placeholder="如：2019-2020"></el-input>
        </el-form-item>
          <el-form-item label="采集内容后缀">
              <el-radio-group v-model="form.suffix">
                  <el-radio label="html"></el-radio>
                  <el-radio label="jpg"></el-radio>
                  <el-radio label="png"></el-radio>
                  <el-radio label="pdf"></el-radio>
                  <el-radio label="其他"></el-radio>
              </el-radio-group>
              <el-input v-model="form.otherSuffix" placeholder="选择其他时，请填写" style="width: 100%;"></el-input>
          </el-form-item>
        <el-form-item label="页面类型" v-if="form.suffix === 'html'">
          <el-select v-model="form.type" placeholder="请选择类型" @change="gotoChange">
            <el-option label="静态页面" value="static"></el-option>
            <el-option label="动态页面" value="dynamic"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="页面类型" v-if="form.suffix !== 'html'">
              <el-input v-model="form.type='静态页面'" placeholder="如：静态页面" disabled="true"></el-input>
          </el-form-item>
        <el-form-item label="新建时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.insert_time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>

        <div slot="footer" class="dialog-footer">
          <i style="font-size: 10px" class="el-icon-question"></i>
          <span class="helpText" @click="gohelpWord">查看帮助文档</span>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>

    </el-dialog>
      <el-dialog :visible.sync="showVideo" class="video-dialog">
          <div class='video-item demo'>
<!--              <div class="video-title">采集视频教程</div>-->
<!--              <video src="http://59.110.233.116:11005/static/video/readme.mp4" controls="controls" class="video-text"></video>-->
              <video-player class="video-player vjs-custom-skin"
                            ref="videoPlayer"
                            :playsinline="true"
                            :options="playerOptions">
              </video-player>
          </div>

      </el-dialog>
      <el-dialog :visible.sync="showFeed" class="video-dialog">
          <div class="feed-title">问题反馈</div>
          <div class="selected-item">
              <el-radio-group v-model="feed" @change="selectFeed">
                  <el-radio-button label="缺失信息" class="btn-item"></el-radio-button>
                  <el-radio-button label="问题反馈" class="btn-item"></el-radio-button>
              </el-radio-group>
          </div>
        <div v-if="feed==='缺失信息'">
            <el-form ref="form" label-width="100px" class="add-form">
                <el-form-item label="任务者">
                    <el-input v-model="userName" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="页面分类">
                    <el-checkbox-group v-model="feedList" @change="changeCategory">
                        <el-checkbox label="录取分数"></el-checkbox>
                        <el-checkbox label="招生计划"></el-checkbox>
                        <el-checkbox label="选课要求 "></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="页面主题">
                    <el-input v-model="feedTitle" placeholder="大学名称或省份，如：山东大学、北京市等"></el-input>
                </el-form-item>
                <el-form-item label="任务年份">
                    <el-input v-model="feedYear" placeholder="如：2019-2020"></el-input>
                </el-form-item>
            </el-form>

        </div>
        <div v-if="feed==='问题反馈'">
            <el-form ref="form" label-width="100px" class="add-form">
                <el-form-item label="任务者">
                    <el-input v-model="userName" readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="问题描述">
                    <el-input v-model="feedQues" type="textarea"></el-input>
                </el-form-item>
            </el-form>

        </div>
          <el-button class="btn-submit" @click="gotoSubmit" type="primary">提交</el-button>
      </el-dialog>
  </div>
</template>

<script>
  import {selectTask, insertTask, updateTask, deleteTask, loopDownloadPage, goFeedback, goFeedQues} from '@/api/index'
  import {formatDate} from '../../utils/date.js'
export default {
  data() {
    return {
        playerOptions: {
            //播放速度
            playbackRates: [0.5, 1.0, 1.5, 2.0],
            //如果true,浏览器准备好时开始回放。
            autoplay: false,
            // 默认情况下将会消除任何音频。
            muted: false,
            // 导致视频一结束就重新开始。
            loop: false,
            // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            preload: 'auto',
            language: 'zh-CN',
            // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            aspectRatio: '16:9',
            // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            fluid: true,
            sources: [{
                //类型
                type: "video/mp4",
                //url地址
                // src: '../../assets/video/movie.mp4'
                src: 'http://59.110.233.116:11005/static/video/readme.mp4'
            }],
            //你的封面地址
            poster: '',
            //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            notSupportedMessage: '此视频暂无法播放，请稍后再试',
            controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                //全屏按钮
                fullscreenToggle: true
            }
        },
        checkList: [],
        feedList: [],
        feedQues: '',
        feedYear: '',
        feedTitle: '',
      userName:'',
      id1:null,
      problemTitle: '',
      problemContent: '',
      crawlList: [], // 查询到的采集任务
      currentPage: 1,
      pagesize: 20,
      sumData: 0,
      showCrawl: false,
      form: {},
      formLabelWidth: '110px',
      flag: '', // 标志是新建还是编辑
      id: -1, // 表示当前编辑或者删除的任务的id
      index: -1, // 表示当前任务所在的当前列表的索引
      showVideo: false, // 播放视频
      showFeed: false,
      feed: '缺失信息'
    }
  },
  mounted () {
    this.id1=localStorage.getItem('groupId')
    console.log("拿到的id",this.id1)
    this.userName = localStorage.getItem('ms_username')
    console.log("userName",this.userName, this.feed, this.feed === '缺失信息')
    this.getCrawlList()
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
      selectFeed() {
          console.log(this.feed)
      },
      gotoChange() {
          console.log('change:', this.form.type)
      },
      gotoSubmit() {
          if (this.feed === '缺失信息') {
              goFeedback({
                year: this.feedYear,
                title: this.feedTitle,
              userId: this.id1,
              user: this.userName,
              category: this.feedList.join('_'),
              insertTime: ''
              }).then(res => {
                  console.log(res.data)
                  this.$message({
                      type: 'success',
                      message: '反馈成功!'
                  })
              })
          } else if (this.feed === '问题反馈') {
              goFeedQues({
                  userId: this.id1,
                  user: this.userName,
                  insertTime: '',
                  question: this.feedQues
              }).then(res => {
                console.log(res.data)
                  this.$message({
                      type: 'success',
                      message: '反馈成功!'
                  })
              })
          }
          this.showFeed = false
      },
      changeCategory() {
          console.log('改变后', this.checkList)
      },
    // uploadMyFeedback() {},
    gotoAdd() { // 新建
      this.flag = '新建'
      this.form = {}
      this.form.user = this.userName
      this.showCrawl = true
      // this.$router.push('/dashboard')
    },
      gotoView(){
        this.$router.push('/introduction')
    },
      gotoVideo() {
          this.showVideo = true
      },
      gotoFeedback() {
          this.showFeed = true
      },
    // gotoLoop() { // 启动循环下载
    //   loopDownloadPage().then(res => {
    //     console.log('循环下载完毕')
    //   })
    // },
    handleOpen(id, url, index) { // 在线打开页面
      let list = url.split('static')
      console.log(list)
      let newUrl = 'http://59.110.233.116:11005/static' + list[1]
      window.open(newUrl, '_blank')
    },
    handleEdit(id, item, index) { // 编辑
        this.checkList = []
      console.log('edit:', item)
        // console.log('1111', this.form.category, this.checkList)
      const temp = JSON.stringify(item)
      this.form = JSON.parse(temp)
        this.checkList = []
        // console.log('222', this.form.category, this.checkList)
        let list = this.form.category.split('_')
        for (let i in list) {
            if (this.checkList.indexOf(list[i]) === -1 && list[i] !== '') {
                this.checkList.push(list[i])
            }
        }
      this.index = index
      this.id = id
      this.flag = '编辑'
      this.showCrawl = true
    },
    handleDelete(id, item, index) {
      this.$confirm('确定去删除？', '提示框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        console.log('id:', id)
        // this.tableData.splice(index, 1)
        deleteTask({
          id: id
        }).then(res => {
          if (res.data.errno === 0) {
            this.crawlList.splice(index, 1)
            // this.gotoSelect()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      })
        .catch(err => { console.error(err) })
    },
    onCancel () {
      this.showCrawl = false
    },
    onSubmit() {
      console.log(this.form)
      if (this.flag === '新建') {
        this.confirmAdd()
      } else if (this.flag === '编辑') {
        this.confirmEdit()
      }
    },
    confirmAdd () {
      let suffix = ''
        let type = ''
      if (this.form.suffix === '其他') {
        suffix = this.form.otherSuffix
      } else {
        suffix = this.form.suffix
      }
      if (this.form.suffix === 'html') {
          type = this.form.type
      } else {
          type = 'static'
      }
        this.form.category = ''
        this.form.category = this.checkList.join('_')
      // for (let i in this.checkList) {
      //     this.form.category = this.checkList[i] + '_'
      // }
      insertTask({
        userId:this.id1,
        user: this.form.user,
        url: this.form.url,
        category: this.form.category,
        title: this.form.title,
        type: type,
        suffix: suffix,
        year: this.form.year,
        insertTime: this.form.insert_time
      }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
          this.$message({
            message: '恭喜您，新建采集任务成功',
            type: 'success'
          });
        } else {
          this.$message.error('错了哦，' + res.data.errmsg);
        }
      this.getCrawlList()
      this.showCrawl = false
      })
    },
    confirmEdit() {
      let suffix = ''
        let type = ''
      if (this.form.suffix === '其他') {
        suffix = this.form.otherSuffix
      } else {
        suffix = this.form.suffix
      }
        if (this.form.suffix === 'html') {
            type = this.form.type
        } else {
            type = 'static'
        }
        // this.form.category = ''
        console.log('分类列表：', this.checkList)
        this.form.category = this.checkList.join('_')
        // for (let i in this.checkList) {
        //     this.form.category += this.checkList[i] + '_'
        // }
      updateTask({
        userId:this.id1,
        id: this.id,
        user: this.form.user,
        url: this.form.url,
        category: this.form.category,
        title: this.form.title,
        type: type,
        year: this.form.year,
        suffix: suffix,
        insertTime: this.form.insert_time
      }).then(res => {
        if (res.data.errno === 0) {
          // this.crawlList = res.data.list
          // this.sumData = res.data.list.length
          this.$message({
            message: '修改成功',
            type: 'success'
          },

        );
          this.getCrawlList()
        } else {
          // this.crawlList = []
          this.$message.error('修改失败');
        }
        this.showCrawl = false
        console.log(res.data)
      })
    },
    getCrawlList () {
      selectTask({
        userId:this.id1,
        //sql: 'select * from task;'
      }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
          this.crawlList = res.data.list
          this.sumData = res.data.list.length
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
    gohelpWord(){
      console.log('点击了查看帮助文档')
    },
  }
}
</script>

<style scoped>
.buttonContainer {
  width: 100px;
  margin: 10px auto;
}
.add-title {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  /*display: inline;*/
}
.add-crawl {
  float: right;
  margin: 0 0 4vh 1vw;
  /*position: absolute;*/
}
.add-form {
  width: 70%;
  margin-left: 15%;
}
/*.add-btn {*/
/*  float: right;*/
/*  margin: 0 10vw;*/
/*}*/
.helpText{
  font-size: 10px;
  color:darkgrey;
  margin-right: 10px;
  margin-left: 6px;
}
.helpText:hover{
  text-decoration:underline;
}
.video-item {
    text-align: center;
    /*width: 800px;*/
}
.video-text {
    width: 1000px;
}
.demo{
    /*display: inline-block;*/
    margin-left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 338px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #eee;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
}

.demo:hover{
    display: block;
}
.feed-title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
}
.selected-item {
    margin: 3vh 0;
    text-align: center;
}
.btn-item {
    /*width: 100%;*/
}
    /*.video-title {*/
    /*    text-align: center;*/
    /*    font-size: 20px;*/
    /*    font-weight: bold;*/
    /*}*/
.btn-submit {
    /*text-align: right;*/
    margin-left: 80%;
    margin-bottom: 2vh;
    margin-top: 1vh;
}
</style>
<style>
    /*.video-dialog .el-dialog {*/
    /*    !*width: 65%;*!*/
    /*}*/
</style>
