# Koa-mongoDB-Vue

> 使用Koa、mongoDB、Vue开发的一个建议的账户登录版本todoList

> 项目运行必备：node、mongoDB、robot3T

> node为运行必备环境、mongoDB为数据库、robot 3T为数据库可视化工具

> 前端在注册登录以后，后台使用JsonWebToken进行加密，返回token给前端，前端利用localstorage存储token

> 每次请求前利用axios拦截器携带token后台校验token，如果过期返回特定字段

> 提示用户重新登录bin直接跳转登录页面,默认时间为1h

## 目录结构
> 简单说明一下: 使用vue2.x脚手架生成基本目录

> src文件下开发前端页面相关文件

> 根目录下koa文件存放后台接口相关代码

> 所有后台参数在koa/common文件夹下配置,然后统一导出使用

> koa/routers 存放接口相关文件

> koa/serve/database 存放链接数据库的js

> koa/serve/schema 存放mongoose映射模型，通过这个模型设置数据表的key值
## Build Setup

``` bash
>>>>前端项目

# 安装依赖
  npm install 或 yarn

# 服务端口 localhost:8080
  npm run dev 或 yarn run serve

>>>>后台项目

#mongoDB环境配置
  > 下载好mongDB以后自定义安装路径，或者默认安装在C盘
  > 在安装路径根目录（切记是根目录）下新建一个data文件夹
  > 在data文件夹中新建一个db文件夹，这个db文件夹就是启动数据库以后数据存放的地址。
  > 配置环境变量
  >（也可以不配置在安装目录下找到bin文件夹mongod.exe文件打开，启动数据库，浏览器输出http://localhost:27017）
  > 可以看到“It looks like you are trying to access MongoDB over HTTP on the native driver port.”
  > 即代表数据库启动成功
  
# 安装依赖
  npm install 或 yarn

# 服务端口 localhost:3001
  node app.js
```


> 

## 登录界面 | 注册页面
![登录界面](./doc/login.png)![注册页面](./doc/register.png)

## 代办事项 | 已完成事项
![登录界面](./doc/list1.png)![注册页面](./doc/list2.png)

## token
![登录界面](./doc/jwt.png)

## robot 3T 用户表
![登录界面](./doc/user.png)

## robot 3T 事项表
![登录界面](./doc/listData.png)
