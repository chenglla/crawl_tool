<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 数据表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <el-select v-model="province" placeholder="筛选地区" class="handle-select mr10" value="" @change="changePro">
                    <div v-for="(item, index) in provinceList" :key="index">
                        <el-option :key="index" :label="item" :value="item"></el-option>
                    </div>
                </el-select>
                <el-select v-model="year" placeholder="筛选年份" class="handle-select mr10" value="" @change="changeYear">
                    <div v-for="(item, index) in yearList" :key="index">
                        <el-option :key="index" :label="item" :value="item"></el-option>
                    </div>
                </el-select>
                <el-select v-model="subject" placeholder="筛选科目" class="handle-select mr10" value="" @change="changeCate">
                    <div v-for="(item, index) in categoryList" :key="index">
                        <el-option :key="index" :label="item" :value="item"></el-option>
                    </div>
                </el-select>
                <!--                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>-->
                <el-button type="primary" icon="search" @click="searchOneScore">搜索</el-button>
                <el-button class="addNewData" @click="addNewData"><i class="el-icon-plus"></i></el-button>
            </div>
            <el-table :data="selectList.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border
                      class="table" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="序号" width="80" type="index">
                    <template slot-scope="scope">
                        {{ (currentPage - 1) * pagesize + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column label="地区">
<!--                <el-table-column label="地区" sortable width="140">-->
                    <template slot-scope="scope">
                        <span>{{scope.row.city}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="年份">
<!--                <el-table-column label="年份" sortable width="120">-->
                    <template slot-scope="scope">
                        <span>{{scope.row.year}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类别">
<!--                <el-table-column label="类别" sortable width="120">-->
                    <template slot-scope="scope">
                        <span>{{scope.row.subject}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="分数区间上">
<!--                <el-table-column label="分数区间上" sortable width="120">-->
                    <template slot-scope="scope">
                        <span>{{scope.row.supscore}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="label" label="分数区间下">
<!--                <el-table-column prop="label" label="分数区间下" width="120">-->
                    <template slot-scope="scope">
                        <span>{{scope.row.subscore}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="label" label="区间人数">
<!--                <el-table-column prop="label" label="区间人数" width="120">-->
<!--                <el-table-column prop="url" label="区间人数" :formatter="formatter">-->
                    <template slot-scope="scope">
                        <span>{{scope.row.nownumber}}</span>
<!--                        <a :href="scope.row.subscore" target="_blank" class="a_content">{{scope.row.supscore}}</a>-->
                        <!--                        <span>{{scope.row.fields.url}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column prop="label" label="累计排名">
<!--                <el-table-column prop="label" label="累计排名" width="120" fit>-->
                    <template slot-scope="scope">
                        <span>{{scope.row.sumnumber}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="label" label="插入时间">
<!--                <el-table-column prop="label" label="累计排名" width="120" fit>-->
                    <template slot-scope="scope">
                        <span>{{scope.row.updateTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.id, scope.row)">编辑
                        </el-button>
<!--                        <el-button type="text" icon="el-icon-delete" class="red"-->
<!--                                   @click="handleDelete(scope.row.pk, scope.row)">删除-->
<!--                        </el-button>-->
                    </template>
                </el-table-column>
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
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" class="el-dialog_info">
<!--        <el-dialog title="编辑" :visible.sync="editVisible" class="el-dialog_info">-->
            <el-form ref="form" :model="form">
<!--            <el-form ref="form" :model="form" label-width="50px">-->
                <el-form-item label="地区" label-width="100px">
                    <el-select v-model="form.city" placeholder="筛选地区" class="handle-select mr10" value="" @change="changePro">
                        <div v-for="(item, index) in provinceList" :key="index">
                            <el-option :key="index" :label="item" :value="item"></el-option>
                        </div>
                    </el-select>

                    <!--                    <el-input v-model="form.city"></el-input>-->
<!--                    <el-input v-model="form.city" style="width: 100%;"></el-input>-->
                </el-form-item>
                <el-form-item label="年份" label-width="100px">
                    <el-select v-model="form.year" placeholder="筛选年份" class="handle-select mr10" value="" @change="changeYear">
                        <div v-for="(item, index) in yearList" :key="index">
                            <el-option :key="index" :label="item" :value="item"></el-option>
                        </div>
                    </el-select>
                    <!--                    <el-input v-model="form.year"></el-input>-->
                </el-form-item>
                <el-form-item label="类别" label-width="100px">
                    <el-select v-model="form.subject" placeholder="筛选科目" class="handle-select mr10" value="" @change="changeCate">
                        <div v-for="(item, index) in categoryList" :key="index">
                            <el-option :key="index" :label="item" :value="item"></el-option>
                        </div>
                    </el-select>

                    <!--                    <el-input v-model="form.subject"></el-input>-->
                </el-form-item>
                <el-form-item label="分数区间上" label-width="100px">
                    <el-input v-model="form.supscore" class="input_width_info"></el-input>
                </el-form-item>
                <el-form-item label="分数区间下" label-width="100px">
                    <el-input v-model="form.subscore" class="input_width_info"></el-input>
                </el-form-item>
                <el-form-item label="区间人数" label-width="100px">
                    <el-input v-model="form.nownumber" class="input_width_info"></el-input>
                </el-form-item>
                <el-form-item label="累计排名" label-width="100px">
                    <el-input v-model="form.sumnumber" class="input_width_info"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import request from '../../../src/utils/request'
    import {getOneScoreProvince, getOneScoreYear, getOneScoreCategory, getOneScoreByCity, updateOneScore} from '@/api/index'

    export default {
        name: 'basetable',
        data() {
            return {
                show: false,
                currentPage: 1,
                pagesize: 20,
                crawlStatus: false,
                // url: './vuetable.json',
                data_message: '',
                data_content: [],
                // tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                edit_data: [],
                form: {
                    year: '',
                    city: '',
                    subject: '',
                    subscore: '',
                    supscore: '',
                    nownumber: '',
                    sumnumber: '',
                    insertTime: ''
                },
                idx: -1,
                title: '编辑',
                provinceList: [],
                province: '',
                year: '',
                yearList: [],
                categoryList: [],
                subject: '',
                selectList: [],
                page: 1,
                sumData: 0,
                index: -1
            }
        },
        // created() {
        //     this.getData();
        // },
        mounted() {
            // this.getData()
            this.getOneScoreProvince()
        },
        computed: {},
        methods: {
            getOneScoreProvince() {
                console.log(this.province)
                getOneScoreProvince().then(res => {
                    this.provinceList = res.data
                })
            },
            getOneScoreYear () {
                if (this.editVisible === true) {
                    getOneScoreYear({city: this.form.city}).then(res => {
                        this.yearList = res.data
                    })
                } else {
                    getOneScoreYear({city: this.province}).then(res => {
                        this.yearList = res.data
                    })
                }
                console.log('yearlist', this.yearList)
            },
            getOneScoreCategory () {
                if (this.editVisible === true) {
                    getOneScoreCategory({city: this.form.city, year: this.form.year}).then(res => {
                        this.categoryList = res.data
                        console.log(res.data)
                    })
                } else {
                    getOneScoreCategory({city: this.province, year: this.year}).then(res => {
                        this.categoryList = res.data
                        console.log(res.data)
                    })
                }
            },
            // changeEditPro () {
            //     this.form.city = val
            // },
            changePro (val) {
                if (this.editVisible === true) {
                    this.form.city = val
                } else {
                    this.province = val
                    // this.page = 1
                    // this.selectList = []
                }
                console.log('城市：', val)
                this.getOneScoreYear()
                console.log('pro:', val)
            },
            changeYear (val) {
                if (this.editVisible === true) {
                    this.form.year = val
                } else {
                    // this.page = 1
                    // this.selectList = []
                    this.year = val
                }
                // this.year = val
                this.getOneScoreCategory()
            },
            changeCate (val) {
                if (this.editVisible === true) {
                    this.form.subject = val
                } else {
                    // this.page = 1
                    // this.selectList = []
                    this.subject = val
                }
                // this.subject = val
            },
            searchOneScore () {
                // if (this.title !== '编辑' || this.title !== '添加') {
                //
                // }
                this.currentPage = 1
                // console.log('当前页码：', this.titlethis.currentPage)
                this.page = 1
                this.selectList = []
                this.getOneScoreByCity()
            },
            getOneScoreByCity () {
                getOneScoreByCity({
                    city: this.province,
                    yaer: this.year,
                    subject: this.subject,
                    page: this.page,
                    pageSize: 20
                }).then(res => {
                    if (res.data.code === 0) {
                        this.sumData = res.data.data.totalElements
                        const id = this.selectList.map(item => item.id)
                        res.data.data.content.map(item => {
                            if (id.indexOf(item.id) === -1) {
                                this.selectList.push(item)
                            }
                        })
                        // this.selectList = res.data.data.content
                        if (this.page < res.data.data.totalPages) {
                            this.page ++
                            this.getOneScoreByCity()
                        }
                    }
                    console.log('查询数据：', res.data)
                })
            },
            addNewData () {
                this.title = '添加'
                this.form.year = ''
                this.form.city = ''
                this.form.subject = ''
                this.form.subscore = ''
                this.form.supscore = ''
                this.form.nownumber = ''
                this.form.sumnumber = ''
                this.editVisible = true
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                console.log(currentPage)
            },
            // 分页导航
            // handleCurrentChange(val) {
            //     this.cur_page = val;
            //     this.getData();
            // },
            // getData() {
            //     // this.$axios({
            //     request({
            //         url: '/api/selectData/',
            //         method: 'GET',
            //         params: {
            //             page: this.cur_page
            //         }
            //     }).then(response => {
            //         this.data_message = response.data.message
            //         this.data_content = JSON.parse(response.data.data)
            //     })
            //     console.log('data_ocntent:', this.data_content)
            // },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.url;
            },
            // filterTag(value, row) {
            //     return row.tag === value;
            // },
            handleEdit(index, row) {
                console.log('index:', index)
                console.log(row)
                this.index = index // 将id赋值给index
                this.form.year = row.year
                this.form.city = row.city
                this.form.subject = row.subject
                this.form.subscore = row.subscore
                this.form.supscore = row.supscore
                this.form.nownumber = row.nownumber
                this.form.sumnumber = row.sumnumber
                this.form.insertTime = row.insertTime
                // }
                this.title = '编辑'
                this.editVisible = true
            },
            // handleDelete(index, row) {
            //     this.idx = index;
            //     this.delVisible = true;
            // },
            // delAll() {
            //     const length = this.multipleSelection.length;
            //     let str = '';
            //     this.del_list = this.del_list.concat(this.multipleSelection);
            //     for (let i = 0; i < length; i++) {
            //         str += this.multipleSelection[i].name + ' ';
            //     }
            //     this.$message.error('删除了' + str);
            //     this.multipleSelection = [];
            // },
            handleSelectionChange(val) { // 序号前面的小选择框，可以添加进去，序号
                console.log(1111111111, val)
                this.multipleSelection = val;
            },
            saveEdit () {
                if (this.title === '添加') {
                    updateOneScore({
                        year: this.form.year,
                        city: this.form.city,
                        subject: this.form.subject,
                        subscore: this.form.subscore,
                        supscore: this.form.supscore,
                        nownumber: this.form.nownumber,
                        sumnumber: this.form.sumnumber
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.editVisible = false
                            this.$message.success('添加成功！')
                            // this.searchOneScore()
                        }
                    })
                } else if (this.title === '编辑') {
                    updateOneScore({
                        year: this.form.year,
                        city: this.form.city,
                        subject: this.form.subject,
                        subscore: this.form.subscore,
                        supscore: this.form.supscore,
                        nownumber: this.form.nownumber,
                        sumnumber: this.form.sumnumber,
                        insertTime: this.form.insertTime,
                        id: this.index
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.editVisible = false
                            this.$message.success('修改成功！')
                            // this.searchOneScore()
                        }
                    })
                }
                this.page = 1
                this.selectList = []
                this.getOneScoreByCity()
            },
            // 保存编辑
            // saveEdit() {
            //     this.editVisible = false;
            //     request({
            //         url: '/api/saveEdit/',
            //         method: 'GET',
            //         params: {
            //             name: this.form.name,
            //             url: this.form.url,
            //             label: this.form.label,
            //             id: this.form.id,
            //         }
            //     }).then(response => {
            //         // this.editVisible = false;
            //         this.getData()
            //
            //     })
            //     // this.$message.success('修改成功！');
            // },
            // 确定删除
            deleteRow() {
                // const item = this.data_content[this.idx]
                // console.log('1',this.data_content[this.idx])
                // console.log('item:',item)
                request({
                    url: '/api/delData/',
                    method: 'GET',
                    params: {
                        id: this.idx
                    }
                }).then(response => {
                    // this.form = response.data.data
                    this.delVisible = false;
                    this.getData()
                })
                this.$message.success('删除成功')

            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .a_content {
        color: #606266;
    }
    .addNewData {
        float: right;
        background-color: #409eff;
        border-radius: 4px;
    }
    .addNewData .el-icon-plus {
        color: #fff;
        /*font-size: 20px;*/
    }
    .handle-select[data-v-31c7c926] {
        width: 200px;
    }
    .input_width_info {
        width: 80%;
    }
    .el-form-item .el-form-item__content .el-select {
        width: 80%;
    }
    .el-form {
        margin-left: 10%;
    }
</style>
