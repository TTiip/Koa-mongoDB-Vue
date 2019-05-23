<template>
  <div>
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎注册
      </span>
        <el-form :model="loginObj" ref="register" class="demo-ruleForm">
          <el-form-item
            prop="account"
            :rules='rules.account'>
            <el-input
              ref="registerFocus"
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
              @keyup.enter.native="registerTodo('register')">
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-button type="primary" @click="registerTodo('register')">注册</el-button>
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
    this.$refs['registerFocus'].focus()
  },
  methods: {
    registerTodo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.loginObj.account.trim() && this.loginObj.password.trim()) {
            this.$http({
              url: 'http://localhost:3001/user/register',
              method: 'post',
              data: {
                userName: this.loginObj.account.trim(),
                passWord: this.loginObj.password.trim()
              }
            }).then(res => {
              this.$message({
                type: res.data.code !== 555
                  ? 'success'
                  : 'error',
                message: res.data.message
              })
              res.data.code !== 555
                ? this.$router.push('/Login')
                : this.$router.push('/Register')
            })
          }
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
</style>
