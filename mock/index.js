const express = require('express')
const cors = require('cors'); // 引入cors模块

const app = express()

const adminJson = require('./data/admin.json')
const tableJson = require('./data/table_data.json')
const permissionJson = require('./data/permission.json')
const translateJson = require('./data/translate.json')

const { checkToken } = require('./utils');

// 使用CORS中间件
app.use(cors());
app.post('/mock/login',(req,res)=>{
  res.send(adminJson)
})


// 使用中间件来检查 token
app.use(checkToken);
app.get('/mock/getPermission',(req,res)=>{
  res.send(permissionJson)
})

app.post('/mock/tableInfo',(req,res)=>{
  res.send(tableJson)
})

app.get('/mock/getTranslateInfo',(req,res)=>{
  res.send(translateJson)
})

app.listen(3000,()=>{
  console.log('3000端口已启动')
})