const express = require('express')

const mongoose = require('mongoose')
//链接mongo,并且使用imooc这个集合，如果没有这个集合，则他会主动新建
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'

mongoose.connect(DB_URL)

mongoose.connection.on('connected',function(){
    console.log('mongo connect connected')
})

//类似于mysql的表，mongo里有文档，字段的概念
const User = mongoose.model('user',new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}  
}))

// //新增数据
// User.create({ 
//     user:'xiaoming',
//     age:15
// },function(err,doc){
//      if(!err){
//          console.log(doc)
//      }else{
//          console.log(err)
//      }
// })
//删除数据
// User.remove({
//     age:15
// },function(err,doc){
//     console.log(doc)
// })

//更新更改操作，将user名为xiaoming 的对象年龄变成26
User.update({'user':'xiaoming'},{'$set':{age:26}},function(err,doc){
    console.log(doc)
})

const app = express()

app.get('/',function(req,res){
    res.send('<h1>Hello world</h1>')
})
app.get('/data',function(req,res){
    //只找到 user为xiaoming的信息，会返回数组，如果只想找一个可以用findOne这样就会返回一个对象
    User.find({'user':'xiaoming'},function(err,doc){
        res.json(doc)
    })
})

app.listen(9093,function(){
    console.log('Node appp start at port 9093')
})