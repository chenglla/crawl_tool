<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
<!--      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">-->
        <div class="card-panel-icon-wrapper icon-people">
            <i class="iconfont iconshuliang"></i>
<!--          <svg-icon icon-class="peoples" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">未下载</div>
          <count-to :start-val="0" :end-val="Object.keys(sumList['未下载']).length - 1" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
<!--      <div class="card-panel" @click="handleSetLineChartData('messages')">-->
        <div class="card-panel-icon-wrapper icon-message">
            <i class="iconfont iconxiazaichenggong"></i>
<!--          <svg-icon icon-class="message" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">下载成功</div>
          <count-to :start-val="0" :end-val="Object.keys(sumList['下载成功']).length - 1" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
<!--      <div class="card-panel" @click="handleSetLineChartData('purchases')">-->
        <div class="card-panel-icon-wrapper icon-money">
<!--          <svg-icon icon-class="money" class-name="card-panel-icon" />-->
            <i class="iconfont iconshujuyuan"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">下载失败</div>
          <count-to :start-val="0" :end-val="Object.keys(sumList['下载失败']).length - 1" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
<!--      <div class="card-panel" @click="handleSetLineChartData('shoppings')">-->
        <div class="card-panel-icon-wrapper icon-shopping">
<!--          <svg-icon icon-class="shopping" class-name="card-panel-icon" />-->
            <i class="iconfont iconshuliang1"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">所有任务</div>
          <count-to :start-val="0" :end-val="count" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {getAllDown} from '@/api/index'
export default {
  components: {
    CountTo
  },
    data () {
      return {
          sumList: [],
          count: 0
      }
    },
    mounted () {
      this.getAllDownSum()
    },
  methods: {
      getAllDownSum() {
          getAllDown().then(res => {
              this.sumList = res.data.data
              this.count = res.data.total -1
              console.log('下载', res.data)
              // let temp = this.option
          })
      }
    // handleSetLineChartData(type) {
    //   this.$emit('handleSetLineChartData', type)
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin: 20px 0 10px!important;
  .card-panel-col{
    /*margin-bottom: 32px;*/
    border-radius: 10px;
  }
  .card-panel {
    border-radius: 10px;
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 20px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
        .iconfont {
            font-size: 44px;
        }
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 30px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
