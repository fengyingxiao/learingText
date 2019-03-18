const mongoose = require('mongoose')
//链接mongo,并且使用imooc这个集合，如果没有这个集合，则他会主动新建
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat'

mongoose.connect(DB_URL)

const models = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String},//头像
        'desc':{type:String}, //个人简介，或职位简介
        'title':{type:String}, //职位名
        'company':{type:String} ,//公司
        'money':{type:String} //钱
    },
    chat:{

    }
}
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}