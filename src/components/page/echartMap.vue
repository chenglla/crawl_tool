<template>
    <div class="EchartsBox" id="map"></div>
</template>

<script>
    import {getMap} from '@/api/index'
    import echarts from 'echarts'
    // import china from 'echarts/map/json/china.json'
    // // import axios from 'axios'
    // echarts.registerMap('china', china)
    // const provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'];
    // // const provincesText = ['上海', '河北', '山西', '青海', '宁夏'];
    // const provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'];
    export default {
        created () {
        },
        mounted () {
            this.getAllMap()
            // this.initMap()
        },
        data () {
            return {
                map: {},
                mapData: [],
                resultData: [],
                max: -1
            }
        },
        props: {},
        methods: {
            getAllMap() {
                getMap().then(res => {
                    console.log(res.data)
                    if (res.data.errno === 0) {
                        for (let i in res.data.data) {
                            this.resultData.push(res.data.data[i])
                        }
                        // this.resultData = res.data.data
                        var arr = this.resultData.map(x => x.val)
                        this.max = Math.max(...arr)
                        // this.max = Object.values(this.resultData).sort()[0]
                        console.log('max:', this.max, this.resultData)
                        this.$nextTick(() => {
                            this.initMap()
                        })
                    }
                })
            },
            initMap() {
                // this.resultData = [
                //     {city: "山东", val: -1},
                //     {city: "福建", val: 0},
                //     {city: "山东", val: -1},
                //     {city: "福建", val: -1},
                //     {city: "河北", val: -1},
                //     {city: "河南", val: -1},
                //     {city: "重庆", val: -1},
                //     {city: "湖北", val: -1},
                //     {city: "湖南", val: -1},
                //     {city: "江西", val: -1},
                //     {city: "海南", val: -1},
                //     {city: "黑龙江", val: -1},
                //     {city: "天津", val: -1},
                //     {city: "贵州", val: -1},
                //     {city: "陕西", val: -1},
                //     {city: "新疆", val: -1},
                //     {city: "江苏", val: -1},
                //     {city: "安徽", val: -1},
                //     {city: "西藏", val: 0},
                //     {city: "吉林", val: -1},
                //     {city: "上海", val: -1},
                //     {city: "山西", val: -1},
                //     {city: "甘肃", val: -1},
                //     {city: "宁夏", val: 0},
                //     {city: "四川", val: -1},
                //     {city: "浙江", val: -1},
                //     {city: "广西", val: -1},
                //     {city: "云南", val: -1},
                //     {city: "内蒙古", val: 0},
                //     {city: "辽宁", val: -1},
                //     {city: "广东", val: -1},
                //     {city: "青海", val: 0},
                //     {city: "北京", val: -1}];
                const seriesData = [];
                // 指定 visualMapContinuous 组件的允许的最大值
                // const max = 2;
                const max = this.max + 1;

                for(let i=0; i < this.resultData.length; i++){
                    console.log('val', this.resultData[i].val + 1)
                    seriesData.push({
                        name: this.resultData[i].city ,
                        value: this.resultData[i].val + 1,
                        // price: (+resultData[i].price).toFixed(2),
                        flags: this.resultData[i].flag
                    })
                }

                const option = {
                    tooltip: {//鼠标一上去的信息框
                        trigger: 'item'
                    },
                    backgroundColor: 'rgba(128, 128, 128, 0)', //rgba设置透明度0.1
                    visualMap: {//visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
                        show: false,//是否显示组件
                        max: max,//指定 visualMapContinuous 组件的允许的最大值
                        left: '5%',
                        top: 'bottom',
                        bottom: '5%',
                        text: ['高', '低'],//两端的文本，如 ['High', 'Low']
                        calculable: true,//是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
                        inRange: {//定义 在选中范围中 的视觉元素。
                            color: ['#5792bb', '#fff17b', '#ffd200'],//图元的颜色。
                        },
                        textStyle: {//设置文字颜色（Demo左下组件）
                            color: '#eee'
                        }
                    },
                    // 地图配置
                    geo: {
                        map: 'china',//地图类型
                        zoom: 1.24,//当前视角的缩放比例。(理解为地图放大缩小)
                        roam: false,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                        label: {//文本设置（Echarts其他图表都有这样的设置，值得多看）
                            normal: {//文字颜色
                                show: true,//是否显示文字
                                color: '#eee'
                            },
                            emphasis: {//hover各省时的文字颜色
                                show: true,
                                color: '#eee'
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#5792bb',//地图区域的颜色。
                                borderColor: '#fff',//图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
                                shadowColor: '#41587f',//阴影颜色。
                                shadowBlur: 10,//图形阴影的模糊大小。
                                opacity: 0.75//图形透明度

                            },
                            emphasis: {
                                areaColor: '#00deff'
                            }
                        }
                    },
                    series: [
                        {
                            name: '苹果',
                            type: 'map',
                            mapType: 'china',
                            geoIndex: 0,//理解就是多个组件都能用option里配置的geo地图，类似于坐标轴里的yAxisIndex:numder,也就是说你可以配置多个geo，也可以多个组件共用geo
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: seriesData,
                            tooltip: {
                                // 利用formatter来自定义tooltip展示的数据
                                formatter: function (params, ticket, callback) {
                                    // console.log('params:', params)
                                    // if (params.value) {
                                        return params.name + '<br/>采集状态：' + params.data.flags
                                    // } else {
                                    //     callback()
                                    // }
                                }
                            }
                        }
                    ]
                };
                const myChart = echarts.init(document.getElementById('map'), 'dark');
                myChart.setOption(option);
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .EchartsBox{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0px;
        /*background-color: black*/
    }
</style>
