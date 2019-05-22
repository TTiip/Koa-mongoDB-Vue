<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <div>
        <el-button size="small" type="primary" @click="signOut">退出</el-button>
      </div>
      <span>
        欢迎：{{name}}！你的待办事项是：
      </span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.EventDone === false" :key="index">
                  <span class="item">
                    {{ index + 1 }}. {{ item.EventName }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="finished(item, index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(item, index)">删除</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.EventDone === true" :key="index">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.EventName }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="restore(item, index)">还原</el-button>
                  <el-button size="small" :plain="true" type="danger" @click="remove(item, index)">删除</el-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      todos: '',
      activeName: 'first',
      list: [],
      count: 0
    }
  },
  mounted () {
    this.$http({
      url: 'http://localhost:3001/data/getData',
      method: 'post'
    }).then(res => {
      res.data.code === 200 && (this.name = res.data.message.user)
      res.data.code === 200 && (this.list = [...res.data.message.data])
    })
  },
  computed: { // 计算属性用于计算是否已经完成了所有任务
    Done () {
      let count = 0
      let length = this.list.length
      for (let i in this.list) {
        this.list[i].EventDone === true ? count += 1 : ''
      }
      this.count = count
      if (count === length || length === 0) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    addTodos () {
      if (this.todos === '') {
        return
      }
      this.$http({
        url: 'http://localhost:3001/data/save',
        method: 'post',
        data: {
          EventDone: false,
          EventName: this.todos
        }
      })
        .then(res => {
          this.list.push(res.data.data)
          this.todos = ''
        })
    },
    finished (item, index) {
      this.$http({
        url: 'http://localhost:3001/data/change',
        method: 'post',
        data: {
          index: item._id,
          value: true
        }
      })
        .then(res => {
          this.$set(this.list[index], 'EventDone', true) // 通过set的方法让数组的变动能够让Vue检测到
          this.$message({
            type: 'success',
            message: '任务完成'
          })
        })
    },
    remove (item, index) {
      this.$http({
        url: 'http://localhost:3001/data/remove',
        method: 'post',
        data: {
          index: item._id
        }
      })
        .then(res => {
          this.list.splice(index, 1)
          this.$message({
            type: 'info',
            message: '任务删除'
          })
        })
    },
    restore (item, index) {
      this.$http({
        url: 'http://localhost:3001/data/change',
        method: 'post',
        data: {
          index: item._id,
          value: false
        }
      })
        .then(res => {
          this.$set(this.list[index], 'EventDone', false)
          this.$message({
            type: 'info',
            message: '任务还原'
          })
        })
    },
    signOut () {
      localStorage.removeItem('jwt')
      this.$router.push('/Login')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-input
    margin 20px auto

  .todo-list
    width 100%
    margin-top 8px
    padding-bottom 8px
    border-bottom 1px solid #eee
    overflow hidden
    text-align left

    .item
      font-size 20px

      &.finished
        text-decoration line-through
        color #ddd

  .pull-right
    float right
</style>
