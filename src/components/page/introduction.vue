<template>
    <div>
        <el-container>
            <el-header>高考采集平台使用说明</el-header>
            <el-container>
                <el-aside>
                    <div class="step-item active" @click="gotoOption(0)">新建任务</div>
                    <div class="step-item" @click="gotoOption(1)">数据采集流程</div>
                    <div class="step-item" @click="gotoOption(2)">Json格式数据教程</div>
                </el-aside>
                <el-container>
                    <el-main>
                        <div class="main-item" v-if="index === 0">
                            <div class="right-item">1、进入首页后点击下方箭头进入新建任务页面</div>
                            <img src="../../assets/img/new.png" alt="">
                            <div class="right-item">2、点击箭头进入如下页面，此页面可以看到对应用户下的所有任务。</div>
                            <img src="../../assets/img/1.png" alt="">
                            <div class="right-item">3、点击右上角新建按钮</div>
                            <img src="../../assets/img/2.png" alt="">
                            <div class="right-item">4、填写新建任务的各项信息</div>
                            <img src="../../assets/img/3.png" alt="">
                            <div class="right-item">5、静态页面请在页面类型的选择静态页面，动态页面选择动态页面。</div>
                            <el-button @click="gotoNext" type="primary" class="next-step">下一步</el-button>
                        </div>
                        <div class="main-item" v-if="index === 1">
                            <div class="right-item">1、数据源要求必须为官方数据。即各学校官网，以及各省招生办。</div>
                            <div class="right-item">2、找到数据来源网页后，若是附件，严格按照附件后缀选择，若无对应选项，选择其他，并添写。</div>
                            <div class="right-item">3、任务添加成功后，会自动下载。可以刷新网页查看下载状态。下载成功后，点击查看，对下载后的网页进行检查，保证下载的内容中，包含了所要采集的数据源。</div>
                            <div class="right-item">4、若直接下载页面会导致数据缺失，查看页面中数据，是否是以图片等形式展示。重新编辑任务，切换静态、动态，或直接下载图片、或者F12查看是否有json数据可以直接采集。</div>
                            <div>
                                <el-button @click="gotoLast" type="primary" class="last-step">上一步</el-button>
                                <el-button @click="gotoNext" type="primary" class="next-step">下一步</el-button>
                            </div>
                        </div>
                        <div class="main-item" v-if="index === 2">
                            <div class="right-item">以北京科技大学为例，直接采集html页面会采集不到数据。</div>
                            <img src="../../assets/img/4.png" alt="">
                            <img src="../../assets/img/5.png" alt="">
                            <div class="right-item">因此，需要在浏览器中，按F12调出控制台，</div>
                            <div class="right-item">1)	点击network（网络），</div>
                            <div class="right-item">2)	刷新网页</div>
                            <div class="right-item">3)	查找列表中带json字样的数据，</div>
                            <div class="right-item">4)	点击右侧Response（预览）以查看数据</div>
                            <div class="right-item">Chrome示例：</div>
                            <img src="../../assets/img/6.png" alt="">
                            <div class="right-item">Microsoft Edge示例：</div>
                            <img src="../../assets/img/7.png" alt="">
                            <div class="right-item">若其中的数据为所需的数据，右键copy->copy link address（edge中右键 复制->复制链接地址），将复制的地址作为url进行新建任务，后缀选择其他并填入json。</div>
                            <img src="../../assets/img/8.png" alt="">
                            <img src="../../assets/img/9.png" alt="">
                            <el-button @click="gotoLast" type="primary" class="last-step">上一步</el-button>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
<!--            <el-footer>Footer</el-footer>-->
        </el-container>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                index: 0
            }
        },
        methods: {
            gotoOption(val) {
                this.index = val
                let steps = document.querySelectorAll('.step-item')
                for (let i in steps) {
                    console.log(i, typeof i, steps[i], steps[i].className, val.toString(), typeof val.toString())
                    steps[i].className = 'step-item'
                    steps[val].className = 'step-item active'
                }
                // console.log(11111, typeof val)
                // // steps['1'].className = 'step-item active'
                // console.log('dddddd', steps[val])
            },
            gotoNext() {
                this.index += 1
            },
            gotoLast() {
                this.index -= 1
            }
        }
    }
</script>
<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 100px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        /*text-align: center;*/
        line-height: 8vh;
    }
    .main-item .right-item {
        text-align: left!important;
        margin-left: 15%;
    }
    .main-item img {
        margin-left: 50%;
        transform: translateX(-50%);
        /*text-align: center;*/
        /*margin-left: 10%;*/
    }
    .main-item img {
        /*height: 50vh;*/
        width: 55vw;
    }
    .step-item {
        cursor: pointer;
    }
    .active {
        background-color: #9dbde3 !important;
        border-radius: 10px;
        color: #fff;
        font-weight: bold;
    }
    .next-step{
        float: right;
        /*text-align: right;*/
        margin-right: 5vw;
        /*display: inline-block;*/
    }
    .last-step {
        float: left;
        margin-left: 5vw;
        /*display: inline-block;*/
    }
</style>
