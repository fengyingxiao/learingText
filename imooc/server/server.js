// const express = require('express')
//
// const mongoose = require('mongoose')
// //链接mongo,并且使用imooc这个集合，如果没有这个集合，则他会主动新建
// const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
//
// mongoose.connect(DB_URL)

// mongoose.connection.on('connected',function(){
//     console.log('mongo connect connected')
// })
//
// //类似于mysql的表，mongo里有文档，字段的概念
// const User = mongoose.model('user',new mongoose.Schema({
//   user:{type:String,require:true},
//   age:{type:Number,require:true}
// }))
//
// //新增数据
// // User.create({
// //     user:'xiaoming',
// //     age:15
// // },function(err,doc){
// //      if(!err){
// //          console.log(doc)
// //      }else{
// //          console.log(err)
// //      }
// // })
// //删除数据
// // User.remove({
// //     age:15
// // },function(err,doc){
// //     console.log(doc)
// // })
//
// //更新更改操作，将user名为xiaoming 的对象年龄变成26
// User.update({'user':'xiaoming'},{'$set':{age:26}},function(err,doc){
//     console.log(doc)
// })
//
// const app = express()
//
// app.get('/',function(req,res){
//     res.send('<h1>Hello world</h1>')
// })
// app.get('/data',function(req,res){
//     //只找到 user为xiaoming的信息，会返回数组，如果只想找一个可以用findOne这样就会返回一个对象
//     User.find({'user':'xiaoming'},function(err,doc){
//         res.json(doc)
//     })
// })

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './module'
const Chat = model.getModel('chat')
import path from 'path'
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook'
assethook({
    extensions:['png']
})
import React from 'react'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux'
import reducers from '../src/reducers'
import thunk from 'redux-thunk'
import App from '../src/app'
import {
    StaticRouter
} from 'react-router-dom'
import {renderToString} from 'react-dom/server'
import staticPath from '../build/asset-manifest'

const app = express()

//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection',function(socket){

    socket.on('sendmsg',function(data){
        // console.log(data)
        // io.emit('recvmsg',data)
        console.log(data)
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        const create_time = new Date().getTime()
        console.log(create_time,73)
        Chat.create({chatid,from,to,content:msg},function(err,doc){

            io.emit('recvmsg',Object.assign({},doc._doc))
        })

    })
})

const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function(req,res,next){
    if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
        return next()
    }
    const store = createStore(reducers,compose(
        applyMiddleware(thunk)
    ))
    let context = {}
    const markup = renderToString(
        <Provider store={store}>
            <StaticRouter
                location ={req.url}
                context={context}
            >
                <App></App>
            </StaticRouter>
        </Provider>
    )

    const pageHtml = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <title>React App</title>
            <link rel="stylesheet" href="/${staticPath['main.css']}" />
          </head>
          <body>
            <noscript>
              You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">${markup}</div>
            <script src="/${staticPath['main.js']}"></script>
          </body>
        </html>`
    // const htmlRes=(<App></App>)
    res.send(pageHtml)
    // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function(){
    console.log('Node appp start at port 9093')
})