<template>
    <div>
        <el-row>
            <el-card>
                <h2 class="add-title">操作采集任务</h2>
                <el-form :model="formInline" class="demo-form-inline" label-width="150px">
                    <el-form-item label="查询任务" class="form-item">
                        <el-input v-model="formInline.sql" placeholder="请输入sql语句"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="gotoOption('select')" class="item-btn">查询</el-button>
                    <el-form-item label="删除任务" class="form-item">
                        <el-input v-model="formInline.deleteSql" placeholder="请输入sql语句"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="gotoOption('delete')" class="item-btn">删除</el-button>
                    <el-form-item label="更新任务" class="form-item">
                        <el-input v-model="formInline.updateSql" placeholder="请输入sql语句"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="gotoOption('update')" class="item-btn">更新</el-button>
                </el-form>
                <el-button @click="gotoLoop" type="primary" class="loop-btn">启动循环下载</el-button>
            </el-card>
        </el-row>
        <el-row v-if="crawlList.length > 0">
            <el-table :data="crawlList.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border
                      class="table" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
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
                <el-table-column prop="label" label="新建时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.insert_time | formatDate}}</span>
                    </template>
                </el-table-column>
<!--                <el-table-column label="操作" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row.id, scope.row)">编辑-->
<!--                        </el-button>-->
<!--                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.id, scope.row)">删除-->
<!--                        </el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
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
        </el-row>
    </div>
</template>
<script type="text/javascript">
    import {selectTask, deleteTask, updateTask, loopDownloadPage} from '@/api/index'
    import {formatDate} from '../../utils/date.js'

    export default {
        data () {
            return {
                formInline: {
                    sql: '',
                    deleteSql: '',
                    updateSql: ''
                },
                crawlList: [], // 查询到的采集任务
                currentPage: 1,
                pagesize: 5,
            }
        },
        mounted () {
        },
        filters: {
            formatDate (time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
        methods: {
            gotoOption(option) { // 查询数据
                if (option === 'select') {
                    selectTask({
                        sql: this.formInline.sql
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.errno === 0) {
                            this.crawlList = res.data.list
                            this.$message({
                                message: '查询成功',
                                type: 'success'
                            });
                        } else {
                            this.crawlList = []
                            this.$message.error('查询失败');
                        }
                    })
                } else if (option === 'delete') {
                    deleteTask({
                        sql: this.formInline.deleteSql
                    }).then(res => {
                        if (res.data.errno === 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error('删除失败');
                        }
                    })
                } else if (option === 'update') {
                    updateTask({
                        sql: this.formInline.updateSql
                    }).then(res => {
                        if (res.data.errno === 0) {
                            this.$message({
                                message: '更新成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error('更新失败');
                        }
                    })
                }

            },
            gotoLoop () {
                loopDownloadPage().then(res => {
                    console.log('循环下载完毕')
                })
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
<style scoped lang="less">
    .add-title {
        text-align: center;
        margin-bottom: 5vh;
    }
    .demo-form-inline {
        margin-left: 20%;
        margin-top: 5vh;
        .item-btn {
            margin-left: 5%;
        }
        .form-item {
            width: 60%;
            display: inline-block;
        }
    }
    .loop-btn {
        margin-top: 3vh;
        margin-left: 50%;
        transform: translateX(-50%);
    }
</style>
<style>
    body {
        margin: 0;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .demo-form-inline .el-form-item__content .el-input{
        /*width: 50%;*/
        margin-left: 20px;
        line-height: 50px;
    }
    .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
        line-height: 50px;
    }
    .demo-form-inline .el-form-item__label {
        font-size: 16px;
    }
    .demo-form-inline .el-form-item__content {
        /*margin-left: 50%;*/
    }
</style>
