<template>
    <div style="height: 90%;width: 100%;display:flex;flex-direction: column;background-color:#fff;">
        <div class="content" ref="content">
            <div>
                <div class="agent_all" v-show="groupid === ''">
                    <div class="agent_province">
                        <p>所有代理引入信息(总付款{{sum}}人):</p>
                        <el-select v-model="province" placeholder="筛选地区" class="handle-select mr10 agent_popup" value="" @change="onChangePro">
                            <div v-for="(item, index) in provinceList" :key="index">
                                <el-option :key="index" :label="item" :value="item"></el-option>
                            </div>
                        </el-select>
<!--                        <popup-picker class="agent_popup" :data="[provinceList]" :value="province" @on-change="onChangePro" placeholder="请选择"></popup-picker>-->
                    </div>
                    <div v-if="agentList.length > 0" class="schoolScoreLine">
                        <el-table :data="agentList" stripe style="width: 100%">
                            <caption style="text-align: center;color: #0c5ddc;border-bottom: 1px solid #ececec;border-right: 1px solid #ececec">引入用户清单</caption>
                            <el-table-column
                                    label="代理名称">
                                <template slot-scope="scope">
                                    <span>{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="groupId"
                                    label="代理号">
                            </el-table-column>
                            <el-table-column
                                    prop="province"
                                    label="地区">
                            </el-table-column>
                            <el-table-column
                                    prop="paymentcount"
                                    label="付款人数">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="agent_current" v-show="groupid !== ''">
                    <div class="second">
                        <p class="one__p--top">当前代理号：{{groupid}}</p>
                        <p>引入用户总数：{{userCounts}}</p>
                        <p>引入用户付费总数：{{payCount}} <span v-if="payCount > 0" @click="getPayList" class="get_pay_list">查看详情</span></p>
                        <p>引入用户付费总额：{{sumMoney}} 元</p>
                        <i class="iconfont icondaili1"></i>
                    </div>
                    <div class="third">
                        <h3 style="margin: 25px auto 15px;text-align: center">引入用户清单</h3>
                        <el-table :data="list" stripe border style="width: 100%">
                            <el-table-column
                                    type="index"
                                    width="100"
                                    label="序号">
                            </el-table-column>
                            <el-table-column
                                    prop="username"
                                    label="用户微信名">
                            </el-table-column>
                            <el-table-column label="引入时间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.createTime | formatDate}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="付费次数">
                                <template slot-scope="scope">
                                    {{scope.row.paycount}}
                                    <span class="pay_detail" v-if="scope.row.paycount > 0" @click="gotoPayDetail(scope.row.openid)" >详情</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
<!--                    <div class="predict__tips" v-show="showPayInfo">-->
                        <el-dialog title="收益类别清单" :visible.sync="showPayInfo">
                            <el-table :data="payList">
                                <el-table-column property="cate" label="类别"></el-table-column>
                                <el-table-column property="price" label="金额"></el-table-column>
                                <el-table-column property="num" label="人数"></el-table-column>
                            </el-table>
                        </el-dialog>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="showEachPayInfo" title="个人收益订单详情">
            <div class="tips__body_pay">
                <div v-if="predictPayDetail.length > 0" class="schoolScoreLine">
                    <div v-for="(item, index) in predictPayDetail" :key="index">
                        <div class="school-item__info">
                            <div class="school-item__name">
                                <div>
                                    订单号：{{item.arr.orderId}}
                                </div>
                                <div>
                                    <span>{{item.arr.province}}</span>
                                    <span>{{item.arr.category}}</span>
                                    <span>{{item.arr.batch}}</span>
                                </div>
                            </div>
                            <div class="school-item_rank">
                                <div class="school-item_rank_left">
                                    金额:
                                    <span>{{item.arr.money}}</span>
                                </div>
                                <div class="school-item_rank_right">
                                    {{item.arr.createTime | formatDate}}
                                    <div>创建时间</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="no_pay">暂无付费订单</div>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/javascript">
    import {findAgentInfo, getAllAgent, getVipPayInfo, getPredictInfo, getOneScoreProvince} from '@/api/index'
    import {formatDate} from '../../utils/date.js'
    // import BScroll from 'better-scroll'
    import _ from 'underscore'

    export default {
        data () {
            return {
                payList: [],
                showPayInfo: false,
                showEachPayInfo: false,
                isEnd: false,
                majorScroll: null,
                payScroll: null,
                list: [],
                page: 0,
                loading: false,
                userName: '',
                userCounts: '',
                payCount: '',
                vipmap: [],
                yucemap: [],
                sumMoney: '',
                profit: '',
                nowTime: '',
                nowWeekSummoney: '',
                preWeekSummoney: '',
                province: '',
                agentList: [],
                provinceList: [],
                sum: 0,
                vipPayDetail: [],
                predictPayDetail: [],
                level: 0
            }
        },
        computed: {
            groupid () {
                console.log('groupid:', this.$route.query.groupId || '')
                return this.$route.query.groupId || ''
            }
        },
        mounted () {
            if (this.groupid === '') {
                this.getOneScoreProvince()
                this.getAllAgent()
            } else {
                this.getList()
            }
            // this.init()
        },
        filters: {
            formatDate (time) {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
        methods: {
            getPayList () { // 获取付费详情
                this.showPayInfo = true
            },
            gotoPayDetail (openid) {
                this.predictPayDetail = []
                console.log('付费详情')
                getPredictInfo({
                    openid: openid
                }).then(res => {
                    // this.predictPayDetail = res.data.data.data
                    res.data.data.data.map(item => {
                        let temp = {cate: '预测页面', arr: item}
                        this.predictPayDetail.push(temp)
                    })
                    // this.initPay()
                    console.log(res.data.data, res.data.data.data)
                })
                console.log('11111', this.predictPayDetail)
                getVipPayInfo({
                    openid: openid
                }).then(resp => {
                    // this.vipPayDetail = resp.data.data
                    if (resp.data.data.data !== null) {
                        resp.data.data.data.map(item => {
                            let temp = {cate: 'vip用户', arr: item}
                            this.predictPayDetail.push(temp)
                        })
                    }
                    // this.vipPayDetail = resp.data.data.map()
                })
                this.showEachPayInfo = true
                console.log('个人付费详情：', this.predictPayDetail)
            },
            nextPage: _.debounce(function () {
                console.log(this.isEnd, this.loading)
                if (this.isEnd || this.loading) {
                    return
                }
                this.page++
                if (this.groupid === '') {
                    this.getAllAgent()
                } else {
                    this.getList()
                }
            }, 50, true),
            reList: _.debounce(function () {
            }, 50, true),
            getList () {
                findAgentInfo({
                    // groupId: this.groupId,
                    b: 0.6,
                    groupId: this.groupid,
                    page: this.page
                }).then(res => {
                    this.payList = []
                    this.yucemap = res.data.data.yucemap
                    this.vipmap = res.data.data.vipmap
                    this.level = res.data.data.level
                    this.userName = res.data.data.username
                    this.userCounts = res.data.data.usercounts
                    this.payCount = res.data.data.paycount
                    this.sumMoney = res.data.data.summoney
                    this.profit = res.data.data.profit
                    this.preWeekSummoney = res.data.data.preWeekSummoney
                    this.nowWeekSummoney = res.data.data.nowWeekSummoney
                    this.nowTime = res.data.data.nowTime
                    // if (this.list.length > 0) {
                    //   this.list.push(res.data.data.agentusers)
                    // }
                    for (let item in Object.keys(this.yucemap)) {
                        console.log('temp:', item, this.yucemap)
                        let temp = {'cate': '预测页面', 'price': Object.keys(this.yucemap)[item], 'num': this.yucemap[Object.keys(this.yucemap)[item]]}
                        this.payList.push(temp)
                    }
                    // for (let itemVip in Object.keys(this.vipmap)) {
                    //     let temp = {'cate': 'vip用户', 'price': Object.keys(this.vipmap)[itemVip], 'num': this.vipmap[Object.keys(this.vipmap)[itemVip]]}
                    //     this.payList.push(temp)
                    // }
                    if (res.data.data.agentusers.length < 10) {
                        this.isEnd = true
                    }
                    const userName = this.list.map(item => item.username)
                    res.data.data.agentusers.map(item => {
                        if (userName.indexOf(item.username) === -1) {
                            this.list.push(item)
                        }
                    })
                    this.nextPage()
                })
            },
            getAllAgent () {
                getAllAgent({
                    province: this.province,
                    page: this.page,
                    pageSize: 20
                }).then(res => {
                    if (res.data.code === 0) {
                        console.log('获取所有代理：', res.data)
                        this.sum = res.data.data.sum
                        if (res.data.data.data.length < 20) {
                            this.isEnd = true
                        }
                        const userName = this.agentList.map(item => item.groupId)
                        res.data.data.data.map(item => {
                            if (userName.indexOf(item.groupId) === -1) {
                                this.agentList.push(item)
                            }
                        })
                        this.nextPage()
                        // this.$nextTick(() => {
                        //     this.majorScroll && this.majorScroll.refresh()
                        // })
                        // this.agentList = res.data.data.data
                    }
                })
            },
            getOneScoreProvince () {
                console.log(this.province)
                getOneScoreProvince().then(res => {
                    // console.log(res.data)
                    this.provinceList = res.data
                })
            },
            onChangePro (val) {
                this.province = val
                this.page = 0
                this.agentList = []
                this.getAllAgent()
            }
        }
    }
</script>
<style scoped lang="less">
    .header {
        /*background: #647cfb;*/
        background: linear-gradient(to right, #4a8ef9 0%, #5292f7 15%, #347ff4 70%, #0c5ddc 100%);;
        color: #fff;
        /*background: linear-gradient(to right, #647cfb 0%, #7188fb 25%, #4758ac 100%);*/
        flex: none;
        z-index: 1;
        height: 45px;
    }
    .agent_first {
        font-size: 18px;
        text-align: center;
        line-height: 45px;
    }
    .content {
        position: relative;
        margin: 18px 0 15px 0;
        height: calc(100% - 76px);
    }
    .agent_all {
        p {
            color: #9c9c9c;
            text-indent: 1em;
        }
    }
    .agent_province {
        /*display: flex;*/
        p {
            height: 40px;
            line-height: 40px;
            display: inline-block;
            /*flex: 2;*/
        }
        .agent_popup {
            margin-left: 8%;
            /*flex: 1;*/
            width: 200px;
        }
    }
    .vux-cell-box:not(:first-child):before {
        border: unset;
    }
    .first {
        /*font-size: large;*/
        /*position: absolute;*/
        /*border: 1px solid red;*/
        margin: 5px 10px;
        padding: 12px 10px 12px 20px;
        box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        .icondaili1 {
            font-size: 40px;
            position: absolute;
            top: 0;
            right: 0;
            opacity: .2;
            color: #FF9933;
        }
        .iconshuxian2 {
            color: #ec8b89;
        }
    }
    .second .one__p--top {
        /*text-indent: 0;*/
        margin-left: 0;
        /*padding-left: 30px;*/
        line-height: 40px;
        position: relative;
        color: #0c5ddc;
        /*text-align: center;*/
        font-size: 20px;
        &:before {
            content: "\e66b";
            font-family: "iconfont" !important;
            font-size: 16px;
            font-style: normal;
            opacity: 0.2;
            color: #FF9933;
            position: absolute;
            left: -20px;
            top: -10px;
        }
    }
    .vipMap {
        margin-left: 2em;
    }
    .second {
        /*border: 1px dashed #4db94d;*/
        margin: 5px 10px 15px;
        padding: 5px 10px 5px 10px;
        box-shadow: 1px 6px 6px rgba(75, 92, 178, 0.1);
        border-radius: 10px;
        text-align: center;
        position: relative;
        p {
            /*margin-left: 50%;
            transform: translateX(-50%);*/
            display: inline-block;
            color: #9c9c9c;
            margin-right: 10%;
            /*margin-left: 20%;*/
            /*text-indent: 4em;*/
            line-height: 36px;
        }
        .iconshuxian2 {
            color: #ec8b89;
        }
        .icondaili1 {
            font-size: 70px;
            position: absolute;
            bottom: -20px;
            right: 0;
            opacity: .1;
            color: #FF9933;
        }
    }
    .get_pay_list {
        color: #417dda;
        font-size: 12px;
        font-weight: bold;
        margin-left: 5px;
    }
    .predict__tips {
        position: fixed;
        top: 0;
        /*top: 56px;*/
        left: 0;
        width: 100%;
        height: 100%;
    }
    .predict__tips_each {
        position: fixed;
        top: 0;
        /*top: 56px;*/
        left: 0;
        width: 100%;
        height: 100%;
    }
    .predict__tips__overlay {
        background: rgba(0, 0, 0, .3);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        /*z-index: 100;*/
    }
    .predict__tips__overlay_each {
        background: rgba(0, 0, 0, .3);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        /*z-index: 99;*/
    }
    .predict__tips__content_volunteer {
        width: 200px;
        background: rgb(255, 255, 255);
        position: absolute;
        top: 15%;
        left: 50%;
        margin-left: -120px;
        padding: 20px;
        border-radius: 10px;
    }
    .each_pay_content {
        height: 50%;
        /*height: 20%;*/
        width: 75%;
        background: rgb(255, 255, 255);
        position: fixed;
        top: 20%;
        margin-left: 50%;
        transform: translateX(-50%);
        padding: 20px;
        border-radius: 10px;
        /*z-index: 100;*/
    }
    .tips__header {
        margin-bottom: 10px;
        padding-bottom: 3px;
        border-bottom: 1px solid #ececec;
        text-align: center;
    }
    .tips_summary {
        text-indent: 2em;
        font-size: 13px;
        line-height: 25px;
    }
    .tips__body {
        font-size: 13px;
        p {
            margin-bottom: 10px;
            text-align: justify;
        }
    }
    .tips__body_pay {
        font-size: 13px;
        height: calc(100% - 20px);
        overflow: hidden;
        p {
            margin-bottom: 10px;
            text-align: justify;
        }
    }
    .third {
        /*border: 1px solid black;*/
        margin: 15px 10px;
        /*padding: 5px 10px 5px 20px;*/
        box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
        border-radius: 10px;
    }
    .pay_detail {
        color: #417dda;
    }
    .no_pay {
        margin-top: 20px;
        text-align: center;
        color: #9c9c9c;
    }
    .four {
        border: 1px solid pink;
        margin: 15px 10px;
        padding: 5px 10px 5px 20px;
        box-shadow: 0 6px 6px rgba(75, 92, 178, 0.1);
        border-radius: 10px;
    }
    .trcontent {
        /*border: 1px dashed red;*/
        width: 100%;
        height: 30px;
    }

    .tdclass {
        border: 1px dashed black;
        font-size: 13px
    }
    .schoolScoreLine {
        color: #767c98;
        padding-top: 2px;
        margin: 10px 8px 10px;
        /*text-align: center;*/
        border-radius: 10px;
        background-color: #fff;
    }
    tbody tr:nth-child(2n) {
        /*background-color: rgb(229,253,239);*/
        /*background-color: rgba(46,122,241,0.2);*/
        background-color: rgb(242, 242, 242);
    }
    tbody tr td {
        /*border: 1px solid rgba(46,122,241,0.2);*/
        font-size: 13px;
    }
    thead tr th {
        /*border: 1px solid rgba(46,122,241,0.2);*/
        color: #0c5ddc;
        background-color: rgb(242, 242, 242);
        /*font-weight: bold;*/
        font-size: 14px;
    }
    table.vux-table.schoolScoreLineTable {
        line-height: 33px;
    }
    .td_major {
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
    }
    .td_info {
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
    }
    .school-item__info {
        width: 80%;
        margin-left: 14%;
        padding-left: 0;
        position: relative;
        margin-bottom: 8%;
    }
    .school-item__name {
        margin-top: 4px;
        font-size: 15px;
        color: #000;
        padding-bottom: 5px;
        border-bottom: 1px solid #ececec;
        padding-top: 2px;
        position: relative;
        div {
            display: inline-block;
        }
        div:nth-child(1) {
            margin-right: 12%;
        }
        .major_name {
            /*display: inline;*/
            overflow: hidden;
            white-space: nowrap;
            width: 80%;
            text-overflow: ellipsis;
        }
        .goal_city {
            /*z-index: 10;*/
            position: absolute;
            /*background-color: #FF6666;*/
            background-color: rgba(245, 108, 108, 0.5);
            font-size: 12px;
            color: #fff;
            padding: 0 5px;
            top: -13px;
            left: 30%;
            border-width:0;
            border-style:solid;
            border-color:transparent;
            /*border-top-width:10px;*/
            /*border-top-color:currentColor;*/
            border-radius: 10px 0 0 0;
            /*!*border-top-left-radius: 10px;*/
            border-bottom-left-radius: -10px;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
        }
        span {
            font-size: 12px;
            border: 1px solid rgb(26, 134, 241);
            padding: 1px 1px;
            margin-left: 13px;
            color: rgb(26, 134, 241);
            border-radius: 4px;
            letter-spacing: 0;
        }
        span:first-child {
            margin-left: 3px;
        }
    }
    .school-item_rank {
        /*letter-spacing: 0;*/
        display: flex;
        margin-top: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ececec;
        position: relative;
        .school-item_rank_left, .school-item_rank_right {
            /*display: inline-block;*/
            flex: 1;
            /*position: absolute;*/
        }
        .school-item_rank_left {
            font-weight: bolder;
            color: #000;
            font-size: 17px;
            border-right: 1px solid #ececec;
            .school_name {
                margin-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            div {
                font-weight: normal;
                font-size: 12px;
                color: #9c9c9c;
            }
            span {
                color: rgb(255, 158, 0);
            }
        }
        .school-item_rank_right {
            padding-left: 15px;
            color: #000;
            div {
                font-size: 12px;
                color: #9c9c9c;
                span {
                    color: #000;
                }
            }
            div:nth-child(3) {
                margin-top: 3px;
                color: rgb(0, 115, 231);
            }
        }
    }
    .school-item_score {
        color: #000;
        margin-top: 5px;
        font-size: 13px;
    }
</style>
