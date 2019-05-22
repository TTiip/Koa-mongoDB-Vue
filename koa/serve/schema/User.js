const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') // 加盐加密库
const { constConfig } = require('../../common')
const Shcema = mongoose.Schema
const objectId = Shcema.Types.ObjectId

const userSchema = new Shcema({ // 配置schema参数
  UserId: objectId,
  userName: {
    unique: true,
    type: String
  },
  passWord: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'User', // 这里是为了避免新建的表会带上 s 后缀直接命名为User
  versionKey: false // 不需要 __v 字段，默认是加上的
})

userSchema.pre('save', function (next) { // 每次保存都经过加盐加密，最外层不可使用箭头函数
  if (!this.isModified('passWord')) { // 检测是否密码有修改
    return next()
  }

  bcrypt.genSalt(constConfig.SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(this.passWord, salt, (err, hash) => {
      if (err) {
        return next(err)
      }

      this.passWord = hash
      next()
    })
  })
})

userSchema.methods = { // 校验加密以后的密码
  comparePassWord: (_passWord, passWord) => new Promise((resolve, reject) => {
    bcrypt.compare(_passWord, passWord, (err, isMatch) => {
      !err ? resolve(isMatch) : reject(isMatch)
    })
  })
}

mongoose.model('User', userSchema)
