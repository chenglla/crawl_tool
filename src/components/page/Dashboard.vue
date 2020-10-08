<template>
    <div>
        <el-row>
            <el-card class="box-card">
                <h2 class="add-title">新建采集任务</h2>
                <el-form ref="form" :model="form" label-width="100px" class="add-form">
                    <el-form-item label="添加任务者">
                        <el-input v-model="form.user"></el-input>
                    </el-form-item>
                    <el-form-item label="采集页面url">
                        <el-input v-model="form.url"></el-input>

                    </el-form-item>
                    <el-form-item label="页面分类">
                        <el-input v-model="form.category"></el-input>
                    </el-form-item>
                    <el-form-item label="页面主题">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="页面类型">
                        <el-select v-model="form.type" placeholder="请选择类型">
                            <el-option label="静态页面" value="static"></el-option>
                            <el-option label="动态页面" value="dynamic"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="采集内容后缀">
                        <el-radio-group v-model="form.suffix">
                            <el-radio label="HTML"></el-radio>
                            <el-radio label="JPG"></el-radio>
                            <el-radio label="PNG"></el-radio>
                            <el-radio label="其他"></el-radio>
                        </el-radio-group>
                        <el-input v-model="form.otherSuffix" placeholder="选择其他时，请填写" style="display: inline-block;width: 30%;margin-left: 5%"></el-input>
                    </el-form-item>
                    <el-form-item label="新建时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" v-model="form.date" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" class="add-btn">立即新建</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    import {formatDate} from '../../../src/utils/date.js'
    import {insertTask} from '@/api/index'
    export default {
        name: 'dashboard',
        data() {
            return {
                form: {
                    user: '',
                    url: '',
                    category: '',
                    title: '',
                    type: '',
                    suffix: '',
                    otherSuffix: '',
                    date: ''
                },

            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        mounted () {
            // let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
            // this.timer = setInterval(() => {
            //     _this.date = new Date(); // 修改数据date
            // }, 1000)
        },
        // beforeDestroy() {
        //     if (this.timer) {
        //         clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        //     }
        // },
        methods: {
            onSubmit() {
                console.log(this.form)
                let suffix = ''
                if (this.form.suffix === '其他') {
                    suffix = this.form.otherSuffix
                } else {
                    suffix = this.form.suffix
                }
                insertTask({
                    user: this.form.user,
                    url: this.form.url,
                    category: this.form.category,
                    title: this.form.title,
                    type: this.form.type,
                    suffix: suffix,
                }).then(res => {
                    console.log(res.data)
                    if (res.data.errno === 0) {
                        this.$message({
                            message: '恭喜您，新建采集任务成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('错了哦，新建采集任务失败');
                    }
                })
            }
        }
    }

</script>


<style scoped>
    /*.box-card {*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*}*/
    .add-title {
       text-align: center;
        margin-bottom: 5vh;
    }
    .add-form {
        width: 50%;
        margin-left: 25%;
    }
    .add-btn {
        float: right;
    }
</style>
<style>
    /*.el-scrollbar__wrap{*/
    /*    overflow-x: hidden;*/
    /*}*/
    .add-form .el-form-item__content {
        margin-left: 120px!important;
    }
    .el-form-item {
        margin-bottom: 22px;
        margin-top: 15px;
    }
    .el-form-item--small.el-form-item {
        margin-bottom: 24px;
    }
    .el-input--small .el-input__inner {
        height: 40px;
        line-height: 40px;
        /*width: 70%;*/
    }
</style>
