const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const routes = require('./routes/')
const { constConfig } = require('./common')
const { connect, importSchemas } = require('./serve')

// 链接数据库
connect()
// 导入所有schema模块
importSchemas()

const app = new Koa()
const router = new Router()

;[
  cors(),
  bodyParser(), // 这里要注意一下,js 是单线程语言，中间件是有执行先后顺序的，所以 cors() 的使用必须在 router 之前，不然就无法解决跨域的问题
  router.routes(),
  router.allowedMethods()
].map(item => app.use(item))

router.use('/user', routes['user'].routes(), routes['user'].allowedMethods())
router.use('/data', routes['data'].routes(), routes['data'].allowedMethods())

app.listen(constConfig.PORT, () => console.log(constConfig.SUCC(`serve start at ${constConfig.PORT}`)))
