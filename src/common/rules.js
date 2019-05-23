const rules = { // 注册、登陆验证规则
  account: [ // 用户名
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' },
    { pattern: /^[A-Z]\w{3,7}$/, message: '包含字母、数字、下划线的 4 到 10 位且必须以大写字母开头', trigger: 'blur' }
  ],
  password: [ // 密码
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
    { pattern: /^\w{6,12}$/, message: '包含字母、数字、下划线的 6 到 12 位', trigger: 'blur' }
  ]
}
export default rules
