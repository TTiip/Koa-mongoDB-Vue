const Router = require('koa-router')
const mongoose = require('mongoose')
const { creatToken } = require('../common/token')

const router = new Router()
router.post('/login', async ctx => {
  const { userName, passWord } = ctx.request.body
  const User = mongoose.model('User')
  try {
    const res = await User.findOne({userName}).exec()
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
        message: '用户名未找到，请核对用户名或稍后再试!'
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
  //取得Model
  const User = mongoose.model('User')
  //把从前端接收的POST数据封装成一个新的user对象
  const newUser = new User(ctx.request.body)
  //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  try {
    const res = await newUser.save()
    //成功返回code=200，并返回成功信息
    res && (ctx.body={
      code: 200,
      message: '注册成功,快去登录吧!'
    })
  } catch (e) {
    ctx.body={
      code: 500,
      message: '出现错误稍后重试!'
    }
    console.log(e)
  }
})

module.exports = router
