<template>
    <div>
        <div class="bg bg-blur"></div>
        <div class="bg-content content-front">
            <!--        大屏-->
            <div class="big-title">采集平台</div>
            <panel-group />
            <el-row>
                <el-col :span="8">
                        <div class="first-item">
                            <dv-border-box-1 :color="['white', 'green']">
                                <div class="second_screen_a">
                                    <div ref="sunChart" class="second_chart"></div>
                                </div>
                            <!--                    <dv-charts :option="option" style="height: 220px;"/>-->
                            <!--                    <dv-active-ring-chart :config="config" style="width:200px;height:200px" />-->
                            </dv-border-box-1>
                        </div>

                </el-col>
                <el-col :span="8" class="col-item">
                    <div class="first-item">
                        <dv-border-box-1 :color="['white', 'green']">
                            <div class="second_screen_a">
                                <div ref="categoryChart" class="second_chart"></div>
                            </div>
                        </dv-border-box-1>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="first-item">
                        <dv-border-box-1 :color="['white', 'green']">
                            <div class="second_screen_a">
                                <div ref="suffixChart" class="second_chart"></div>
                            </div>
                        </dv-border-box-1>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="second-item">
                        <dv-border-box-1 :color="['white', 'green']">
                            <div class="second_screen_a">
                                <div ref="typeChart" class="second_chart"></div>
                            </div>
                        </dv-border-box-1>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="second-item">
                        <dv-border-box-1 :color="['white', 'green']">
                            <div class="title">不同创建者添加任务数据</div>
                            <dv-capsule-chart :config="userConfig" style="width:300px;height:200px" class="capsule-item"/>
                        </dv-border-box-1>
                    </div>
                </el-col>
                <el-col :span="12">
<!--                    <div class="first-item">-->
<!--                    <dv-border-box-1 :color="['white', 'green']">-->
                        <dv-scroll-board :config="configDown" style="width:90%;height:35vh" class="swapper-item"/>
<!--                    </div>-->
<!--                    </dv-border-box-1>-->
                </el-col>
            </el-row>
            <div class="next-page" @click="gotoManage">
                <i class="iconfont icon-xiangxiashuangjiantou-copy"></i>
            </div>
        </div>
    </div>
</template>
<script>
    import {getAllDown, getAllUser, getAllBySuffix, getAllParams} from '@/api/index'
    import PanelGroup from '@/components/common/PanelGroup'
    // const lineChartData = {
    //     newVisitis: {
    //         expectedData: [100, 120, 161, 134, 105, 160, 165],
    //         actualData: [120, 82, 91, 154, 162, 140, 145]
    //     }
    // }
    export default {
        components: {
            PanelGroup,
        },
        data () {
            return {
                id:null,
                // lineChartData: lineChartData.newVisitis,
                downSucceed: [], // 下载成功
                option: { // 下载完成的一共有多少任务
                    title: {
                        text: '下载成功',
                        style: {
                            fill: '#fff'
                        }
                    },
                    series: [
                        {
                            type: 'gauge',
                            data: [],
                            center: ['50%', '60%'],
                            axisLabel: {
                                formatter: '{value}',
                                style: {
                                    fill: '#fff'
                                }
                            },
                            min: 0,
                            max: 0,
                            pointer: {
                                show: false,
                                valueIndex: 0
                            },
                            axisTick: {
                                style: {
                                    stroke: '#fff'
                                }
                            },
                            animationCurve: 'easeInOutBack'
                        }
                    ]
                },
                config: {
                    data: []
                },
                configDown: {
                    header: [],
                    data: []
                },
                userConfig: {
                    data: [],
                    showValue: true
                },
                sunCharts: '',
                suffixCharts: '',
                typeCharts: '',
                categoryCharts: '',
                downData: [], // 不同下载类型的数据
                userList: [], // 不同用户类型的数据
                yearList: [], // 不同年份类型的数据
                suffixList: [], // 不同后缀类型的数据
                categoryList: [], // 不同分类类型的数据
                categoryDict: [], // 不同分类类型的数据字典
                typeList: [], // 动静态类型的数据
                timeList: [], // 添加时间类型的数据
            }

        },
        mounted() {
          this.id=localStorage.getItem('groupId')
          console.log("拿到的id",this.id)
            this.getAllParams()
            getAllDown({userId:this.id}).then(res => {
                console.log('下载', res.data)
                // let temp = this.option
            })
            // this.getAllDown()
            // this.getInfoByUser() // 通过创建者查询数据
            // this.getInfoBySuffix() // 根据后缀类型查询到的数据
        },
        methods: {
            // handleSetLineChartData(type) {
            //     this.lineChartData = lineChartData[type]
            // },
            // getAllDown () {
            //     getAllDown().then(res => {
            //         this.downSucceed = res.data.data['下载成功']
            //         let temp = this.option
            //
            //         temp.series[0].max = res.data.total - 1
            //         temp.series[0].data.push( { name: '治湿', value: res.data.data['下载成功'].length - 1 })
            //         this.$set(this.option,temp)
            //         // let succeed = res.data.data['下载成功'].length || 0
            //         // // let failed = res.data.data['下载失败'].length || 0
            //         // let downing = res.data.data['未下载'].length || 0
            //         // let config = this.config
            //         //
            //         // let data = [{name: '下载成功', value: succeed}, {name: '下载失败', value: 0},{name: '未下载', value: downing}]
            //         // config.data = data
            //         // this.$set(this.config,config)
            //         // this.config.data = data
            //     })
            // }
            gotoManage() {
                this.$router.push('/feedback')
            },
            getAllParams() {
                getAllParams({userId:this.id}).then(res => {
                    console.log('全部信息：', res.data)
                    if (res.status === 200) {
                        this.downData = res.data.statuss // 下载的不同状态数据
                        this.getAllDown()
                        this.userList = res.data.users // 不同用户数据
                        this.getAllUser()
                        this.suffixList = res.data.suffix // 不同后缀类型数据
                        this.getAllSuffix()
                        this.categoryList = res.data.category // 不同分类类型数据
                        this.getAllCategory()
                        this.categoryDict = res.data.categoty_dict // 不同分类类型字典数据
                        this.typeList = res.data.type // 不同类型（动静态）数据
                        this.getAllType()
                        this.yearList = res.data.year // 不同年份数据
                        this.getAllYear()
                        this.timeList = res.data.insert_time // 不同时间新建的数据
                        this.getAllTime()
                    }
                })
            },
            getAllDown () {
                let list = Object.keys(this.downData.data)
                let downList = ['主题', '分类', '后缀', '下载链接', '动静态', '创建者', '状态']
                let showList = []
                for(let i in list) {
                    // let len = this.downData.data[list[i]].length - 1
                    // console.log('1111', i)
                    let temp = this.downData.data[list[i]]
                    // console.log(len, temp)
                    for (let j in temp) {
                        // console.log('heheh', temp[j])
                        if (j !== 'len' && parseInt(j) !== temp.length - 1) {
                        // if (parseInt(j) !== temp.length - 1) {
                        //     console.log('j', j)
                            let content = [temp[j].title, temp[j].category, temp[j].suffix, temp[j].url, temp[j].type, temp[j].user, temp[j]['statuss']]
                            // let content = [temp[j].title, temp[j].category, temp[j].suffix, temp[j].url, temp[j].type, temp[j].statuss, temp[j].user]
                            showList.push(content)
                        }
                    }
                    console.log('fish: ', showList, downList)
                    let config = this.configDown
                    config.data = showList
                    config.header = downList
                    config.headerBGC = 'rgba(238, 102, 67, 0.5)'
                    config.oddRowBGC = 'rgba(59, 129, 245, 0.5)'
                    config.evenRowBGC = 'rgba(237, 141, 55, .5)'
                    console.log(this.configDown, config)
                    this.$set(this.configDown,config)
                }
                // this.drawDown(list, downList)
            },
            drawDown(val, downList) {
                this.sunCharts = this.echarts.init(this.$refs.sunChart)
                this.sunCharts.setOption({
                    title: {
                        text: '不同下载状态',
                        subtext: '真实数据',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        // left: 'center',
                        // top: 'bottom',
                        orient: 'vertical',
                        left: '10%',
                        top: '20%',
                        data: val
                    },
                    color: ['#f5b031','#7fc999','#fad797','#c3b4df'],
                    // toolbox: {
                    //     show: true,
                    //     feature: {
                    //         mark: {show: true},
                    //         dataView: {show: true, readOnly: false},
                    //         magicType: {
                    //             show: true,
                    //             type: ['pie', 'funnel']
                    //         },
                    //         restore: {show: true},
                    //         saveAsImage: {show: true}
                    //     }
                    // },
                    series: [
                        {
                            name: '下载类型',
                            type: 'pie',
                            radius: [50, 70],
                            center: ['45%', '50%'],
                            // roseType: 'area',
                            data: downList
                        }
                    ]
                })
            },
            getAllUser() { // 通过创建者查询数据
                let list = Object.keys(this.userList.data)
                let userList = []
                for(let i in list) {
                    let temp = {name: list[i], value: this.userList.data[list[i]].length}
                    userList.push(temp)
                }
                this.$nextTick(() => {
                    this.drawUser(list, userList)
                })
            },
            drawUser(list, userList) {
                console.log(userList)
                let config = this.userConfig
                config.data = userList
                config.showValue = true
                console.log(this.userConfig, config)
                this.$set(this.userConfig,config)
// console.log(this.userConfig)
                // this.userConfig.data = userList
            },
            getAllSuffix() { // 用雷达图
                let list = Object.keys(this.suffixList.data)
                let listTitles = []
                let suffixList = []
                for(let i in list) {
                    let title = {text: list[i]}
                    // let temp = {name: list[i], value: this.suffixList.data[list[i]].length}
                    suffixList.push(this.suffixList.data[list[i]].length)
                    listTitles.push(title)
                }
                this.$nextTick(() => {
                    this.drawSuffix(list, listTitles, suffixList)
                })
            },
            drawSuffix(list, listTitles, suffixList) {
                this.suffixChart = this.echarts.init(this.$refs.suffixChart)
                this.suffixChart.setOption({
                    title: {
                        text: '不同后缀类型的采集数据',
                        left: 'center'
                    },
                    // legend: {
                    //     data: list
                    // },
                    radar: [
                        {
                            indicator: listTitles,
                            center: ['50%', '60%'],
                            radius: 100,
                            startAngle: 90,
                            splitNumber: 4,
                            shape: 'circle',
                            name: {
                                formatter: '【{value}】',
                                textStyle: {
                                    color: '#72ACD1'
                                }
                            },
                            splitArea: {
                                areaStyle: {
                                    color: ['rgba(114, 172, 209, 0.2)',
                                        'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                                        'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                                    shadowBlur: 10
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }
                            }
                        },
                    ],
                    series: [
                        {
                            name: '雷达图',
                            type: 'radar',
                            emphasis: {
                                lineStyle: {
                                    width: 4
                                }
                            },
                            data: [
                                {
                                    value: suffixList,
                                    // name: '图一',
                                    label: {
                                        show: true,
                                    },
                                    symbol: 'rect',
                                    symbolSize: 5,
                                    lineStyle: {
                                        type: 'dashed'
                                    }
                                },
                                // {
                                //     value: [60, 5, 0.30, -100, 1500],
                                //     name: '图二',
                                //     areaStyle: {
                                //         color: 'rgba(255, 255, 255, 0.5)'
                                //     }
                                // }
                            ]
                        },
                    ]
                })

            },
            getAllType() {
                let list = Object.keys(this.typeList.data)
                let typeList = []
                for(let i in list) {
                    let temp = {value: this.typeList.data[list[i]].length, name: list[i]}
                    typeList.push(temp)
                }
                this.drawType(list, typeList)
            },
            drawType(val, typeList) {
                this.typeCharts = this.echarts.init(this.$refs.typeChart)
                this.typeCharts.setOption({
                    title: {
                        text: '不同数据类型',
                        subtext: '真实数据',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        // left: 'center',
                        // top: 'bottom',
                        orient: 'vertical',
                        left: '25%',
                        top: '20%',
                        data: val
                    },
                    color: ['#f5b031','#7fc999','#fad797','#c3b4df'],
                    // toolbox: {
                    //     show: true,
                    //     feature: {
                    //         mark: {show: true},
                    //         dataView: {show: true, readOnly: false},
                    //         magicType: {
                    //             show: true,
                    //             type: ['pie', 'funnel']
                    //         },
                    //         restore: {show: true},
                    //         saveAsImage: {show: true}
                    //     }
                    // },
                    series: [
                        {
                            name: '下载数量',
                            type: 'pie',
                            radius: [50, 70],
                            center: ['50%', '55%'],
                            // roseType: 'area',
                            data: typeList
                        }
                    ]
                })
            },
            getAllCategory() {
                let list = Object.keys(this.categoryList.data)
                let categoryList = []
                for(let i in list) {
                    let temp = {value: this.categoryList.data[list[i]].length, name: list[i]}
                    categoryList.push(temp)
                }
                this.drawCategory(list, categoryList)
            },
            drawCategory(list, categoryList) {
                this.categoryCharts = this.echarts.init(this.$refs.categoryChart)
                this.categoryCharts.setOption( {
                    title: {
                        text: '不同主题数据下载数量',
                        // subtext: '纯属虚构'
                        left: 'center'

                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    // toolbox: {
                    //     feature: {
                    //         dataView: {readOnly: false},
                    //         restore: {},
                    //         saveAsImage: {}
                    //     }
                    // },
                    color: ['rgb(238, 102, 67)','rgb(59, 129, 245)','rgb(237, 141, 55)','rgb(96, 210, 106)'],
                    legend: {
                        left: '10%',
                        top: '20%',
                        data: list
                    },
                    series: [
                        {
                            name: '主题',
                            type: 'funnel',
                            left: '10%',
                            height: '45%',
                            top: '35%',
                            width: '75%',
                            label: {
                                formatter: '{b}'
                            },
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                opacity: 0.7
                            },
                            emphasis: {
                                label: {
                                    position: 'inside',
                                    formatter: '{b}: {c}%'
                                }
                            },
                            data: categoryList
                        }
                    ]
                })
            },
            getAllYear() {
                let list = Object.keys(this.yearList.data)
                let yearList = []
                for(let i in list) {
                    // let temp = {value: this.yearList.data[list[i]].length, name: list[i]}
                    yearList.push(this.yearList.data[list[i]].length)
                }
                // this.drawYear(list, yearList)
            },
            // drawYear(list, yearList) {
            //     this.sunCharts = this.echarts.init(this.$refs.sunChart)
            //     this.sunCharts.setOption({
            //         title: {
            //             text: '不同年份下载数据',
            //             // subtext: '纯属虚构'
            //             left: 'center'
            //         },
            //         xAxis: {
            //             type: 'category',
            //             data: list,
            //             // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            //             boundaryGap: false,
            //             axisTick: {
            //                 show: false
            //             }
            //         },
            //         grid: {
            //             left: 10,
            //             right: 10,
            //             bottom: 20,
            //             top: 30,
            //             containLabel: true
            //         },
            //         tooltip: {
            //             trigger: 'axis',
            //             axisPointer: {
            //                 type: 'cross'
            //             },
            //             padding: [5, 10]
            //         },
            //         yAxis: {
            //             axisTick: {
            //                 show: false
            //             }
            //         },
            //         legend: {
            //             data: ['年份']
            //         },
            //         series: [{
            //             name: '年份',
            //             lineStyle: {
            //                 color: 'green',
            //                 width: 4,
            //                 type: 'dashed'
            //             },
            //             itemStyle: {
            //                 borderWidth: 2,
            //                 borderColor: 'yellow',
            //                 color: 'blue'
            //             },
            //             top: '35%',
            //             symbol: 'triangle',
            //             symbolSize: 20,
            //             left: '10%',
            //             height: '45%',
            //
            //             width: '75%',
            //             smooth: true,
            //             type: 'line',
            //             data: yearList,
            //             // animationDuration: 2800,
            //             animationEasing: 'cubicInOut'
            //         }]
            //     })
            // },
            getAllTime() {
                let list = Object.keys(this.timeList.data)
                let timeList = []
                for(let i in list) {
                    // let temp = {value: this.yearList.data[list[i]].length, name: list[i]}
                    timeList.push(this.timeList.data[list[i]].length)
                }
                this.drawTime(list, timeList)
            },
            drawTime(list, timeList) {
                this.sunCharts = this.echarts.init(this.$refs.sunChart)
                this.sunCharts.setOption({
                    title: {
                        text: '不同日期下载数据',
                        // subtext: '纯属虚构'
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: list,
                        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                            },
                        },
                        // //设置轴线的属性
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                                // width:8,//这里是为了突出显示加上的
                            }
                        }
                    },
                    grid: {
                        // left: 10,
                        // right: 10,
                        // bottom: 20,
                        // top: 30,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        padding: [5, 10]
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                            },
                        },
                        splitLine: {     //网格线
                            show: false
                        },
                        // //设置轴线的属性
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                                // width:8,//这里是为了突出显示加上的
                            }
                        }

                    },
                    // xAxis: {
                    //     type : 'value',
                    //     axisLabel: {
                    //         textStyle: {
                    //             color: '#fff',
                    //         },
                    //     }
                    // },
                    legend: {
                        data: ['日期'],
                        top: '10%',
                        right: '15%'
                    },
                    series: [{
                        name: '数量',
                        // lineStyle: {
                        //     color: 'green',
                        //     width: 4,
                        //     type: 'dashed'
                        // },
                        // itemStyle: {
                        //     borderWidth: 2,
                        //     borderColor: 'yellow',
                        //     color: 'blue'
                        // },
                        // top: '35%',
                        // symbol: 'triangle',
                        symbolSize: 6,
                        // left: '10%',
                        // height: '45%',
                        color: 'rgba(59, 129, 245, .7)',
                        width: '75%',
                        smooth: true,
                        type: 'line',
                        data: timeList,
                        // animationDuration: 2800,
                        animationEasing: 'cubicInOut'
                    }]
                })
            }
        }

    }
</script>
<style scoped>
.bg {
    background: url("../../assets/img/banner.png");
    background-size: 100%, 100%;
    height:900px;
    text-align: center;
    line-height: 600px;
}
.bg-blur {
    float: left;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);
}
.content-front {
    position:absolute;
    left: 10px;
    right: 10px;
    /*height:600px;*/
    /*line-height: 600px;*/
    text-align: center;
}
.big-title {
    font-size: 45px;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.7);
}
.col-item {
    text-align: center;
}
.first-item {
    /*background-color: #fff;*/
    border-radius: 10px;
    position: relative;
    padding: 3vh 0;
    margin: 2vh;
    /*background-color: #4c566b;*/
    text-align: center;
    /*border: 1px solid #9c9c9c;*/
    /*background: url("../../assets/img/process_bg.png");*/
    background-size: 100% 100%;
}
.second-item {
    margin: 2vh;
    text-align: center;
}
.second_screen_a {
    text-align: center;
}
.title {
    font-size: 18px;
    font-weight: bold;
    color: rgb(51, 51, 51);
    margin-bottom: 8vh;
}
.capsule-item {
    /*position: absolute;*/
    /*margin-top: 50%;*/
    margin-left: 50%;
    transform: translateX(-50%);
}
.second_chart{
    height: 300px;
    width: 100%;
    display: inline-block;
}
    .swapper-item {
        margin-left: 5%;
    }
    .next-page {
        position: absolute;
        bottom: 4vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        -webkit-animation: next-page 1.5s infinite;
        animation: next-page 1.5s infinite;
        -webkit-animation-fill-mode: both;
    }
    @-webkit-keyframes next-page {
        from
        {
            bottom: 0%;
            opacity: 0;
        }
        to
        {
            bottom: 5%;
            opacity: 1;
        }
    }
    .next-page  i {
        font-size: 40px;
        color: rgba(255, 255, 255, 0.5);
    }
</style>
<style>
    /*.dv-capsule-chart .label-column div {*/
    /*    color: #000;*/
    /*}*/
    /*.dv-capsule-chart .unit-label {*/
    /*    color: #000;*/
    /*}*/
    /*.dv-capsule-chart .capsule-item .capsule-item-column .capsule-item-value {*/
    /*    color: #000;*/
    /*}*/
    /* .dv-scroll-board .rows {*/
    /*     color: #666;*/
    /* }*/
    /*.dv-scroll-board .header .header-item {*/
    /*    color: #666;*/
    /*}*/
</style>
