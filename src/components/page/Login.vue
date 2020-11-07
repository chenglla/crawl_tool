<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">高考数据采集平台</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
<!--                <p class="login-tips">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    import {login} from '@/api/index'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  console.log('登录信息：', this.ruleForm, valid)
                  console.log('登录信息：', this.ruleForm.username)
                  console.log('登录信息：', this.ruleForm.password)
                  console.log('登录信息：',  valid)


                    if (valid) {
                      console.log('接口被调用')
                        login({
                            userName: this.ruleForm.username,
                            password: this.ruleForm.password
                        }).then(res => {
                            if (res.data.errmsg === 'succeed') {
                                console.log(res.data.data[0].id)
                                //this.$store.commit('SET_LEVEL', res.data.data.level)


                                localStorage.setItem('groupId', res.data.data[0].id)
                                console.log("存入的id",localStorage.getItem('groupId'))
                                // this.$store.commit('SET_GROUPID', res.data.data.groupId)
                                // this.$store.commit('SET_GROUPID', res.data.data.groupId)
                                this.$message({
                                    message: '恭喜你，登录成功',
                                    type: 'success'
                                });
                                localStorage.setItem('ms_username',this.ruleForm.username);
                                this.$router.push({
                                  name: 'bigScreen',
                                  query: {
                                    userName: res.data.data.userName
                                  }
                                });
                                // if (res.data.data.level === 1) {
                                //     this.$router.push({
                                //         name: 'table',
                                //         query: {
                                //             groupId: res.data.data.groupId
                                //         }
                                //     });
                                // } else {
                                //     this.$router.push({
                                //         name: 'tableTwo',
                                //         query: {
                                //             groupId: res.data.data.groupId
                                //         }
                                //     });
                                //     // this.$router.push('/tableTwo');
                                // }

                            } else {
                                this.$message.error('用户名或者密码错误');
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:22px;
        color: #1f2f3d;
        margin-bottom: 20px;
        border-bottom: 4px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
