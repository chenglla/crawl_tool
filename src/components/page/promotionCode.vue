<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 推广码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="handle_item">
                    代理号：
                    <el-input
                            class="handle-input"
                            placeholder="请输入代理号"
                            v-model="groupId"
                            :disabled="true"
                            clearable>
                    </el-input>
                </div>
                <div class="handle_item">
                    数   量：
                    <el-input
                            class="handle-input"
                            placeholder="请输入要生成个个数"
                            v-model="num"
                            clearable>
                    </el-input>
                </div>
                <el-button type="primary" icon="search" @click="downLoadCode" class="search_pc">下载</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getGenerateCode} from '@/api/index'

    export default {
        name: 'basetable',
        data() {
            return {
                // groupId: '',
                num: 0
            }
        },
        mounted () {
            if (this.groupId === undefined) {
                location.href = 'http://www.kgai.tech/cee_pc/#/login'
                // return
            }
        },
        computed: {
            groupId () {
                console.log('groupId:', this.$store.state.user.groupId)
                // return this.$route.query.groupId
                return localStorage.groupId
                // return this.$store.state.user.groupId
            },
        },
        methods: {
            downLoadCode () {
                getGenerateCode({
                    groupid: this.groupId,
                    nums: this.num
                }).then(res => {
                    if (res.data.code === 0) {
                        console.log('下载路径；', res.data)
                        // window.location.href = res.data.data
                        window.open(res.data.data, '_blank')
                    } else {
                        this.$message.error('下载失败！');
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .handle-box {
        margin: 20px 30% 0 30px;
    }
    .handle_item {
        color: #6c6c6c;
    }

    .handle-input {
        margin-top: 25px;
        width: 300px;
        display: inline-block;
    }
    .search_pc {
        width: 100px;
        margin: 30px 20px 0 40%;
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
    .handle-select[data-v-252c0e0c] {
        width: 300px;
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
    .item_tip {
        margin-top: 3px;
        color: #2d8cf0;
    }
</style>
