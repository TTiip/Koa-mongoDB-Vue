const mongoose = require('mongoose')
const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const dataSchema = new Schema({
  Id: objectId,
  UserName: String,
  EventName: String,
  EventDone: Boolean,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'Data', // 这里是为了避免新建的表会带上 s 后缀直接命名为Data
  versionKey: false // 不需要 __v 字段，默认是加上的
})

mongoose.model('Data', dataSchema)
