const Router = require('koa-router')
const mongoose = require('mongoose')
const { creatToken } = require('../common/token')

const router = new Router()
router.post('/login', async ctx => {
  const { userName, passWord } = ctx.request.body
  const User = mongoose.model('User')
  try {
    const res = await User.findOne({ userName }).exec()
    if (res) {
      try {
        const newUser = new User()
        const isMatch = await newUser.comparePassWord(passWord, res.passWord)
        if (isMatch) {
          const token = creatToken(userName, passWord)
          ctx.body = {
            code: 200,
            message: '登录成功',
            token
          }
        } else {
          ctx.body = {
            code: 201,
            message: '用户名或密码错误'
          }
        }
      } catch (err) {
        console.log(err)
        ctx.body = {
          code: 500,
          message: err
        }
      }
    } else {
      ctx.body = {
        code: 201,
        message: '用户名未找到，请核对用户名或先注册!'
      }
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 500,
      message: err
    }
  }
})

router.post('/register', async ctx => {
  const { userName } = ctx.request.body
  const User = mongoose.model('User')
  const res = await User.findOne({ userName }).exec()
  if (!res) {
    const newUser = new User(ctx.request.body)
    try {
      const res = await newUser.save()
      res && (ctx.body = {
        code: 200,
        message: '注册成功,快去登录吧!'
      })
    } catch (e) {
      ctx.body = {
        code: 500,
        message: '出现错误稍后重试!'
      }
      console.log(e)
    }
  } else {
    ctx.body = {
      code: 555,
      message: '用户名已被注册，快换个名字吧!'
    }
  }
})

module.exports = router
