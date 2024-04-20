const express = require('express')
const cors = require('cors'); // 引入cors模块

const app = express()

const adminJson = require('./data/admin.json')
const tableJson = require('./data/table_data.json')

// 使用CORS中间件
app.use(cors());

// app.get('/login',(req,res)=>{
//   res.send(adminJson)
// })
app.post('/login',(req,res)=>{
  res.send(adminJson)
})
app.post('/tableInfo',(req,res)=>{
  res.send(tableJson)
})

app.listen(3000,()=>{
  console.log('3000端口已启动')
})