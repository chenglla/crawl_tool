<template>
    <div class="content row-flex-start" style="min-width:40vw;">
        <div class="left_map" id="left_map"  @click="showChinaMap"></div>
<!--        <div class="right_opetate row-center" id="right_opetate">-->
<!--        </div>-->
    </div>
</template>

<script>
    import {getMap} from '@/api/index'
    import echarts from 'echarts'
    import china from 'echarts/map/json/china.json'
    // import axios from 'axios'
    echarts.registerMap('china', china)
    const provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'];
    // const provincesText = ['上海', '河北', '山西', '青海', '宁夏'];
    const provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'];
    export default {
        created () {
        },
        mounted () {
            this.getAllShow()
            this.$nextTick(() => {
                this.initMap()
            })
        },
        data () {
            return {
                map: {},
                mapData: []
            }
        },
        props: {},
        methods: {
            getAllShow() {
                getMap().then(res => {
                    console.log('6666', res.data, Object.keys(res.data.data))
                    this.mapData = res.data.data
                })
            },
            getMapOpt (place) {
                const option = {
                    // backgroundColor: '#F3F3F3', //地图背景颜色
                    //以下是地图标题，我在此处设空，需要的可以自己加上
                    title: {
                        text: '',
                        subtext: '',
                        left: 'center'
                    },
                    visualMap: {//visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
                        show: false,//是否显示组件
                        max: 1,//指定 visualMapContinuous 组件的允许的最大值
                        left: '5%',
                        top: 'bottom',
                        bottom:'5%',
                        text: ['高', '低'],//两端的文本，如 ['High', 'Low']
                        calculable: true,//是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
                        inRange: {//定义 在选中范围中 的视觉元素。
                            color: [ '#416cbb' ,'#00b4ff', '#00deff' ,'#00ffe4', '#79fff1', '#fff17b', '#ffd200'],//图元的颜色。
                        },
                        textStyle: {//设置文字颜色（Demo左下组件）
                            color: '#eee'
                        }
                    },
                    geo: {
                        // map: place || 'china',
                        label: {
                            emphasis: {
                                show: false
                            },
                            // 不需要显示地名可直接删除normal此项
                            normal: {
                                show: true, // 是否显示对应地名
                                textStyle: {
                                    color: 'rgba(0,0,0)'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#6FA7CE', //地图颜色
                                borderColor: '#fff' //地图边线颜色
                            },
                            emphasis: {
                                areaColor: '#B7DFED' //鼠标移入颜色
                            }
                        }
                    },
                    series: [
                        {
                            name: '数据名称',
                            type: 'map',
                            mapType: 'china',
                            selectedMode: 'multiple',
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}<br/>{c} (件)'
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,
                                    borderColor: '#0e94eb',
                                    background: '#f00',
                                    label: {
                                        show: true
                                    }
                                },
                                emphasis: { // 也是选中样式
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    areaColor: 'rgb(179, 167, 104)',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    }
                                }
                            },
                            data: provincesText,
                            // tooltip: {
                            //     // 利用formatter来自定义tooltip展示的数据
                            //     formatter: function (params,ticket,callback) {
                            //         if (params.value) {
                            //             return params.name+'<br/>成交量：' + params.value + '单<br/>' + '平均标签价格：' + params.data.price + '元<br/>' + '商品数量：' + params.data.amount+'家'
                            //         } else {
                            //             callback()
                            //         }
                            //     }
                            // }
                        }
                    ]
                }
                return option
            },
            // 显示中国地图
            showChinaMap () {
                const option = this.getMapOpt()
                this.map.setOption(option, true)
            },
            // 显示各省地图，这里使用axios请求本地文件，provice文件夹存在的位置为public/province（旧版本是static）
            getProvinceMapOpt (provinceAlphabet) {
                this.$axios.get('province/' + provinceAlphabet + '.json').then((s) => {
                    this.echarts.registerMap(provinceAlphabet, s.data)
                    const option = this.getMapOpt(provinceAlphabet)
                    this.map.setOption(option, true)
                })
            },
            initMap () {
                console.log('map')
                var dom = document.getElementById('left_map')
                this.map = echarts.init(dom)
                const option = this.getMapOpt()
                if (option && typeof option === 'object') {
                    this.map.setOption(option, true)
                }
                this.map.on('click', (param) => {
                    // console.log(param)
                    event.stopPropagation()// 阻止冒泡
                    // 找到省份名
                    const provinceIndex = provincesText.findIndex(x => {
                        return param.name === x
                    })
                    //在这里判断provincesText中是否包含点击的省份名，有则渲染省级地图，无则无处理（需要可从此获得）
                    if (provinceIndex === -1) return
                    const provinceAlphabet = provinces[provinceIndex]
                    // 重新渲染各省份地图
                    this.getProvinceMapOpt(provinceAlphabet)
                })
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .left_map {
        width: 40vw; /*//此处设置地图大小*/
        height: 100%; /*//注意，如果父组件没有设置高度，此处可设置为px单位的高度，否则塌陷*/
    }
    .right_opetate {
        flex: 1;
        height: 100%;
        background: #404a59
    }
    .content {
        width: auto;
        height: 100%;
        padding-top: 1vh;
        overflow-y: unset;
        box-sizing: border-box;
    }
</style>
