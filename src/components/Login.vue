<template>
  <div>
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录
      </span>
        <el-row>
          <el-form :model="loginObj" ref="login" class="demo-ruleForm">
            <el-form-item
              prop="account"
              :rules='rules.account'>
              <el-input
                ref="loginFocus"
                v-model="loginObj.account"
                placeholder="账号"
                type="text">
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules='rules.password'>
              <el-input
                v-model="loginObj.password"
                placeholder="密码"
                type="password"
                @keyup.enter.native="loginToDo('login')">
              </el-input>
            </el-form-item>
          </el-form>
          <!-- 增加一个click方法 loginToDo -->
          <el-button type="primary" @click="toRegisterToDo">注册</el-button>
          <el-button type="primary" @click="loginToDo('login')">登录</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { rules } from '../common'
export default {
  data () {
    return {
      loginObj: {
        account: '',
        password: ''
      },
      rules
    }
  },
  mounted () {
    this.$refs['loginFocus'].focus()
  },
  methods: {
    toRegisterToDo () {
      this.$router.push('/Register')
    },
    loginToDo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: 'http://localhost:3001/user/login',
            method: 'post',
            data: {
              userName: this.loginObj.account,
              passWord: this.loginObj.password
            }
          }).then(res => {
            if (res.data.code === 200) {
              localStorage.jwt = res.data.token
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.$router.push('/TodoList')
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px

  .title
    font-size 28px

  .el-button
    width 100%
    margin-top 12px
    margin-left: 0
</style>
