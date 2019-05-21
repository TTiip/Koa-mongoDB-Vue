const chalk = require('chalk')
const constConfig = {
  PORT: 3001, /* 端口号 */
  DB: 'mongodb://localhost/tolist', // 数据库地址
  SALT_WORK_FACTOR: 10, // 注册密码加盐加密等级
  SECRET: '划船不用桨，全靠浪', // jwt加密时加盐字段
  TIMEOUT: '1h', // jwt过期时间
  SUCC: chalk.bgGreen, // 成功背景提示
  ERR: chalk.bgRed // 失败背景提示
}

let letConfig = {
  MAXCONNECTTIME: 0 // 数据库出现错误最大重连次数
}

module.exports = {
  constConfig,
  letConfig
}
