const jwt = require('jsonwebtoken')
const { constConfig } = require('../config')

const creatToken = (userName, passWord) => (jwt.sign({
  userName,
  passWord
}, constConfig.SECRET, {
  expiresIn: constConfig.TIMEOUT
}))

const checkToken = ctx => {
  const authToken = ctx.header.authorization
  if (!authToken) {
    ctx.body = {
      message: 'token过期或不存在!'
    }
    return
  }
  return new Promise(resolve => {
    jwt.verify(authToken, constConfig.SECRET, (err, decoded) => {
      if (!err) {
        resolve({
          ...decoded,
          timeOut: false
        })
      } else {
        resolve({
          timeOut: true,
          msg: '登录状态过期, 请重新登录!'
        })
      }
    })
  })
}

module.exports = {
  creatToken,
  checkToken
}
