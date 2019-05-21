const mongoose = require('mongoose')
const Router = require('koa-router')
const { constConfig } = require('../common')
const { checkToken } = require('../common/token')

const router = new Router()

router.post('/getData', async ctx => {
  const user = await checkToken(ctx)
  if (user.timeOut) {
    ctx.body = {
      code: 401,
      message: '登录过期请重新登录!'
    }
  } else {
    const Data = mongoose.model('Data')
    await Data.find({UserName: user.userName}).then(res => {
      ctx.body = {
        code: 200,
        message: {
          data: [...res],
          user: user.userName
        }
      }
    })
  }
})

router.post('/save', async ctx => {
  let user = await checkToken(ctx)
  if (user.timeOut) {
    ctx.body = {
      code: 401,
      message: '登录过期请重新登录!'
    }
  } else {
    const Data = mongoose.model('Data')
    const objInsert = {
      UserName: user.userName,
      EventName: ctx.request.body.EventName,
      EventDone: ctx.request.body.EventDone
    }
    let newData = new Data(objInsert)
    try {
      await newData.save().then(res => {
        ctx.body = {
          code: 200,
          message: '保存成功!',
          data: res
        }
        console.log(constConfig.SUCC('success'))
      })
    } catch (e) {
      console.log(e)
    }
  }
})

router.post('/change', async ctx => {
  let user = await checkToken(ctx)
  if (user.timeOut) {
    ctx.body = {
      code: 401,
      message: '登录过期请重新登录!'
    }
  } else {
    const Data = mongoose.model('Data')
    const params = ctx.request.body
    const where = {
      _id: params.index
    }
    const newVal = {
      $set: {
        EventDone: params.value
      }
    }
    try {
      await Data.updateOne(where, newVal).exec().then(() => {
        ctx.body = {
          code: 200,
          message: 'success'
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
})

router.post('/remove', async ctx => {
  let user = await checkToken(ctx)
  if (user.timeOut) {
    ctx.body = {
      code: 401,
      message: '登录过期请重新登录!'
    }
  } else {
    const Data = mongoose.model('Data')
    const params = ctx.request.body
    const where = {
      _id: params.index
    }
    try {
      await Data.deleteOne(where).exec().then(res => {
        ctx.body = {
          code: 200,
          message: 'success'
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
})

module.exports = router
