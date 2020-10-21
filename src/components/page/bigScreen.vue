<template>
    <div>
<!--        大屏-->
        <el-row>
            <el-col :span="8">
                <div class="first-item">
                    <div class="second_screen_a">
                        <div ref="sunChart" class="second_chart"></div>
                    </div>
<!--                    <dv-charts :option="option" style="height: 220px;"/>-->
<!--                    <dv-active-ring-chart :config="config" style="width:200px;height:200px" />-->
                </div>
            </el-col>
            <el-col :span="8">
                <div class="first-item">
                    shuju
                </div>
            </el-col>
            <el-col :span="8">
                <div class="first-item">
                    shuju
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import {getAllDown, getAllUser, getAllBySuffix} from '@/api/index'
    // import data from "echarts/src/visual/aria";
    export default {
        data () {
            return {
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
                sunCharts: '',
                downData: [], // 不同下载类型的数据
            }
        },
        mounted() {
            this.getAllDown()
            this.getInfoByUser() // 通过创建者查询数据
            this.getInfoBySuffix() // 根据后缀类型查询到的数据
        },
        methods: {
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
            getAllDown () {
                getAllDown().then(res => {
                    let list = Object.keys(res.data.data)
                    // console.log('allInfo', res.data.data, list)
                    for(let i in list) {
                        let temp = {value: res.data.data[list[i]].length - 1, name: list[i]}
                        this.downData.push(temp)
                    }
                    // console.log(this.downData)
                    this.drawDown(list)
                })
            },
            drawDown(val) {
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
                        top: '30%',
                        data: val
                    },
                    color: ['#f5b031','#7fc999','#fad797','#c3b4df'],
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '下载类型',
                            type: 'pie',
                            radius: [50, 70],
                            center: ['45%', '50%'],
                            // roseType: 'area',
                            data: this.downData
                        }
                    ]
                })
            },
            getInfoByUser() { // 通过创建者查询数据
                getAllUser().then(res => {
                    console.log('根据创建者获取的数据：', res.data.data)
                })
            },
            getInfoBySuffix() { // 用胶囊图
                getAllBySuffix().then(res => {
                    console.log('根据文件后缀获取数据：', res.data.data)
                })
            }
        }

    }
</script>
<style scoped>
.first-item {
    padding: 5vh 0;
    /*border: 1px solid #9c9c9c;*/
    /*background: url("../../assets/img/process_bg.png");*/
    background-size: 100% 100%;
}
.second_chart{
    height: 300px;
    width: 100%;
    display: inline-block;
    /*border-radius: 150px;*/
    /*box-shadow: 0 10px 9px rgba(66, 185, 130, 0.3);*/
}
</style>
