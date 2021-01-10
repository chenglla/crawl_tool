<template>
  <div class="app-container">
    <el-row>
<!--      <el-card class="box-card">-->
        <div class="add-title">解析数据</div>
<!--      </el-card>-->
      <div>
<!--        <el-button type="primary" class="add-crawl" icon="el-icon-plus" @click="gotoAdd">新建</el-button>-->
<!--        <el-button type="primary" class="add-crawl" @click="gotoView">查看采集说明</el-button>-->
<!--        <el-button type="primary" class="add-crawl" @click="gotoVideo">查看视频教程</el-button>-->
<!--        <el-button type="primary" class="add-crawl" icon="el-icon-edit" @click="gotoFeedback">问题反馈</el-button>-->
      </div>
    </el-row>
    <el-row v-if="list.length > 0">
        <el-col :span="16">
            <el-table :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"  border
                      class="table" style="width: 90%;margin-left: 5%;">
                <!--        <el-table-column label="序号" width="80" type="index">-->
                <!--          <template slot-scope="scope">-->
                <!--            {{ (currentPage - 1) * pagesize + scope.$index + 1 }}-->
                <!--          </template>-->
                <!--        </el-table-column>-->
                <el-table-column :label="item" v-for="(item, index) in listkeys" :key="index" :prop="item" min-width="80">
                    <!--            <template slot-scope="scope">-->
                    <!--                <el-button @click="tanPi(item)">{{scope.row[item]}}</el-button>-->
                    <!--            </template>-->
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
        </el-col>
        <el-col :span="8">
            <p class="second-title">字段匹配选择:</p>
            <div class="type-item">
                <el-select v-model="type" placeholder="请先选择相匹配类型" @change="onChangeType">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="two-second">
                <p>匹配规则：</p>
                <div v-for="(item, index) in listkeys" :key="index" class="second-item">
                    <span>列名：{{item}}</span>
                    字段名：
                    <el-select v-model="value[index]" placeholder="请选择相匹配字段" @change="onChange(item)">
                        <el-option
                                v-for="item in optionsFields"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="three-second">
                <el-button type="primary" @click="submitAnalysis">提交</el-button>
            </div>
        </el-col>
    </el-row>
      <!-- 没有出现在可视区域的图片链接为默认地址，data-src为真实地址 -->
<!--      <img src="../../assets/img/default.jpg" alt="" :data-src="realSrc" class="lazy-pic">-->
  </div>
</template>

<script>
  import {getAnalysisList, chooseTemplate, enrollTemplate, majorTemplate} from '@/api/index'
  import {formatDate} from '../../utils/date.js'
export default {
  data() {
    return {
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
      // id: -1, // 表示当前编辑或者删除的任务的id
      index: -1, // 表示当前任务所在的当前列表的索引
      showVideo: false, // 播放视频
      showFeed: false,
      feed: '缺失信息',
        list: [],
        listkeys: [],
        value: [],
        optionsList: [],
        type: 0,
        options: [{
            value: 0,
            label: '录取分数线'
        }, {
            value: 1,
            label: '招生计划'
        }, {
            value: 2,
            label: '选课要求'
        }],
        optionsFields: [],
        submitKey: []
    }
  },
    computed: {
      id () {
          return this.$route.query.id
      }
    },
  mounted () {
      console.log('sdfsdfsdfs')
      this.getAnalysisList()
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
      // scrollHandle() {
      //     // 监听屏幕滚动
      //   },
      // // 对出现在可视区域内的图片替换真实地址
      // lazyLoad(pic) {
      //   // 替换真实地址
      //   pic.src = pic.getAttribute('data-src')
      //   // 去掉已加载图片的懒加载样式
      //   pic.className = pic.className.replace('lazy-pic', '')
      // },
      getAnalysisList() {
          getAnalysisList({
              id: this.id
          }).then(res => {
              console.log('res.data', res.data)
              if (res.data.code === 200) {
                  // this.list.push(res.data.data.data)
                  let temp = res.data.data.data
                  // let temp = res.data.data.sheet1
                  this.listkeys = Object.keys(temp[0])
                  let len = Object.keys(temp).length
                  this.sumData = len
                  for (let i = 0; i < len; i++) {
                    this.list.push(temp[i])
                  }
                  this.optionsList = res.data.dataCol
                  this.$nextTick(() => {
                      this.onChangeType()
                  })
              }

              console.log(this.list, this.listkeys)
              console.log('this.optionsList:', this.optionsList)
          })
      },
      tanPi(item) {
          console.log('item:', item)
      },
      onChange(item) {
          console.log('value:', item, this.value)
          // let fiel = this.value[this.value.length - 1]
          // let temp = {}
          // temp.key = this.value[this.value.length - 1]
          // temp.value = item
          let temp = this.value[this.value.length - 1] + '=' + item
          // this.submitKey.push(this.value[this.value.length - 1])
          // this.submitKey[this.value[this.value.length - 1]] = item
          this.submitKey.push(temp)
          console.log('提交的对应的列表：', this.submitKey)
      },
      submitAnalysis() {
          console.log('提交解析:', this.type, this.submitKey)
          // console.log('提交解析:', this.value, this.type, this.submitKey)
          if (this.type === 0) {
              majorTemplate(this.submitKey.join('&')).then(res => {
                  console.log(res.data)
              })
          } else if (this.type === 1) {
              enrollTemplate(this.submitKey.join('&')).then(res => {
                  console.log(res.data)
              })
          } else if (this.type === 2) {
              chooseTemplate(this.submitKey.join('&')).then(res => {
                  console.log(res.data)
              })
          }
      },
      onChangeType() {
          this.submitKey = []
          this.optionsFields = []
          console.log('this.optionsList[this.type]:', this.optionsList[this.type])
          let arr = Object.values(this.optionsList[this.type])[0]
          console.log('arr:', arr)
          for (let i = 0; i < arr.length; i++) {
              let temp = {value: arr[i], label: arr[i]}
              this.optionsFields.push(temp)
          }
          console.log('this.optionsFields:', this.optionsFields)
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

<style scoped lang="scss">
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
    .table {
        margin-top: 2vh;
    }
    .second-title {
        font-weight: bold;
        margin-top: 1vh;
        margin-bottom: 2vh;
        display: inline-block;
    }
    .type-item {
        display: inline-block;
        margin-left: 1vw;
    }
    .two-second {
        margin-top: 3vh;
    }
    .second-item {
        margin: 2vh 0;
        span {
            margin-right: 1vw;
        }
    }
    .three-second {
        margin-top: 3vh;
        text-align: center;
    }
</style>
<style>
    /*.video-dialog .el-dialog {*/
    /*    !*width: 65%;*!*/
    /*}*/
</style>
