const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const { constConfig, letConfig } = require('../../common')
const db = constConfig.DB

const connect = () => {
  mongoose.connect(db, { useNewUrlParser: true })

  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log(constConfig.ERR('***********数据库断开***********'))
      if (letConfig.MAXCONNECTTIME < 3) {
        letConfig.MAXCONNECTTIME++
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        reject()
        console.log(constConfig.ERR('数据库出现问题，程序无法搞定，请人为修理......'))
      }

    })

    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if (letConfig.MAXCONNECTTIME < 3) {
        letConfig.MAXCONNECTTIME++
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        reject(err)
        console.log(constConfig.ERR('数据库出现问题，程序无法搞定，请人为修理......'))
      }

    })
    //链接打开的时
    mongoose.connection.once('open', () => {
      console.log(constConfig.SUCC('MongoDB connected successfully'))
      resolve()
    })
  })
}
// 导入Schema
const importSchemas = () => glob.sync(resolve(__dirname, '../schema/', '**/*.js')).map(require)

module.exports = {
  connect,
  importSchemas
}
