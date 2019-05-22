const jwt = require('jsonwebtoken')
const { constConfig } = require('../config')

const creatToken = (userName, passWord) => (jwt.sign({
  userName,
  passWord
}, constConfig.SECRET, {
  expiresIn: constConfig.TIMEOUT
}))

const checkToken = ctx => new Promise(resolve => {
  jwt.verify(ctx.header.authorization, constConfig.SECRET, (err, decoded) => {
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

module.exports = {
  creatToken,
  checkToken
}
