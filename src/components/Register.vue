<template>
  <div>
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎注册
      </span>
        <el-row>
          <el-input
            :autofocus='true'
            v-model="account"
            placeholder="账号"
            type="text">
          </el-input>
          <el-input
            v-model="password"
            placeholder="密码"
            type="password"
            @keyup.enter.native="registerTodo">
          </el-input>
          <!-- 增加一个click方法 loginToDo -->
          <el-button type="primary" @click="registerTodo">注册</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        account: '',
        password: ''
      }
    },
    methods: {
      registerTodo () {
        this.$http({
          url: 'http://localhost:3001/user/register',
          method: 'post',
          data: {
            userName: this.account,
            passWord: this.password
          }
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.data.message
          })
          this.$router.push('/Login')
        })
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px

  .title
    font-size 28px

  .el-input
    margin 12px 0

  .el-button
    width 100%
    margin-top 12px
</style>
