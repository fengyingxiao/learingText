# React项目实践

##开发环境的搭建

* create-react-app脚手架生成
* npm start 开启调试环境
* 安装redux环境
* 安装各种配置

```js
	create-react-app imooc //创建React框架项目
	npm install react-redux --save //引入redux
	npm run eject //安装各种配置
	npm start //开启调试环境
```

上述代码是在命令行进行
 

## Es6常用语法
###Es6包含什么？

####1.块级作用域，字符串，函数  
  * 作用域
      
  	(1)let和const： 
  	  
  	* 定义变量使用let代替var  
  	* Const定义不可修改的变量
  	* 作用域和{}   
  	
  	```js
  	const name = 'fengyingxiao'
  	name = 'fengfeng'
  	console.log(name)
  	
  	```
  	上述代码会报错，因为const定义的变量不可以被重新赋值
  	
 * 字符串  

 模版字符出纳：  
 
 	* 使用反引号，直接写变量 
 	* 多行字符串。
 	* 告别+拼接字符串   

 	```js
 	name = 'imooc'
 	course = 'React开发APP'
 	console.log('hello ' + name + ',course is ' + course)
 	console.log(`hello ${name}, course is ${course}`)
 	```
 	
 	上述代码打印出来的内容一样
 	
 	```js
 	console.log(`
 	
 	123
 	
 	`)
 	```
 	
 	上述代码打印出来会带着空格和换行
 	
* 函数的扩展

	ES6中函数的用法
	
	* 参数默认值
	* 箭头函数
	* 展开运算符

	```js
	function hello(name){
		console.log(`hello ${name}`)
	}
	const hello1 = (name)=>{
		console.log(`hello ${name}`)
	}
	hello('imooc') //hello imooc
	hello1('imooc') //hello imooc
	
	setTimeout(()=>{
		console.log('xxx')
	},1000)
	
	const double = x=>x*2
	console.log(double(5))//10
	
	```
	箭头函数首先可以简写，所以大大减少了代码量，其次如果里面只有return方法时，直接可以简写成上述x*2代码
	
	```js
	const hello = (name='imooc')=>{
		console.log(`hello ${name}`)
	}
	hello()//hello imooc
	hello('fengfeng')//hello fengfeng
	
	```
	以上是箭头函数有默认值时的传参
	
	```js
	const hello = (name1,name2)=>{
    console.log(name1,name2)
}
let arr = ['imooc','fengfeng']
// hello.apply(null,arr)
hello(...arr)
	
	```
	
	上述代码中多个参数传递调用，以前用apply方法，现在可以用扩展符
 

####2. 对象扩展，解构  

* Object扩展

	* Object.keys,values,entries
	* 对象方法简写，计算属性
	* 展开运算符（不是ES6标准，但是babel也支持）

	```js
	const obj = {name:'imooc',action:'React is a App'}
	console.log(Object.keys(obj))//["name", "action"]
	console.log(Object.values(obj))//["imooc", "React is a App"]
	console.log(Object.entries(obj))//[["name", "imooc"],["action, 	"React is a App"]]
	```
	
	上述代码解释了Object.keys,Object.values,Object.entries的几个属性
	
	```js
	//以前对obj对象里面属性赋值
	// const name = 'imooc'
	// const obj = {
	//     name:name
	// }
	// obj[name] = 'hello imooc'
	// console.log(obj)//{name: "imooc",imooc:'hello imooc'}
	
	//ES6写法
	const name = 'imooc'
	const obj = {
	    [name]:'hello',
	    hello:function(){

	    },
	    //Es6写法
	    hello1(){
	        
	    }
	}
	console.log(obj)//{imooc: "hello"}
	```
	
	上述代码是ES6和ES5对象属性赋值以及方法函数的写法的不同
	
	```js
	const obj = {name:'imooc',course:'React'}
	const obj2 = {type:'IT',name:'woniu'}
	console.log({...obj,...obj2,data:"2017"})//{name: "woniu", 	course: "React", type: "IT", data: ""}
	```
	
	上述代码是ES6展开运算符，babel也支持
	
* 解构赋值

	函数也可以多返回值了
	
	* 数组解构
	* 对象解构

	```js
	const arr = ['hello','imooc']
	//ES5写法
	// let arg1 = arr[0]
	// let arg2 = arr[1]
	// console.log(arg1,'|',arg2)
	
	//Es6写法 数组的解构赋值
	let [arg1,arg2] = arr
	console.log(arg1,'|',arg2)//hello | imooc
	
	//对象的解构赋值
	const obj = {name:'imooc',course:'React'}
	let {name,course} = obj
	console.log(name,'|',course)//imooc | React
	```
	
	上述代码是解构赋值的用法


####3. 类，模块化等

* 类

	提供class的语法糖
	
	* 是prototype的语法糖
	* Extends继承
	* Constructor 构造函数

	```js
	class MyApp{
    constructor() {
        this.name = 'imooc'
    }
    sayHello(){
        console.log(`hello ${this.name}`)
    }
	}
	const app = new MyApp()
	app.sayHello()//hello imooc
	```
	
	上述是class构建语法糖
	
* 新的数据结构

	Es6中新出现的数据结构
	
	* Set，元素不可重合 
	* Map
	* Symbol

* 模块化

	ES6中自带了模块化机制，告别seajs和require.js
	
	* Import,import{}
	* Export,Export default
	* Node现在还不支持，还需要用require来加载文件 

	```js
	//在一个新的module1.js里面
	export const name = 'imooc'
	export function sayHello(){
	    console.log('imooc rocks!')
	}

	//在es6.js里面
	import {name,sayHello} from './module1'
	console.log(name)//imooc
	sayHello()
	```
	上述代码是最基本的模块化
	
####4.其他  
* 还有一些特性，虽然不在Es6的范围，但是也被babel支持，普遍被大家接受和使用（需要安装插件）

	* 对象扩展符，函数绑定
	* 装饰器
	* Async await
	* Promise
	* 迭代器和生成器
	* 代理Proxy

##Express+mongodb基础

###Express+mongodb开发web后台接口

####1.Express开发web接口

* Express

	基于nodejs，快速，开放，极简的web开发框架
	
	```js
	npm install express --save //安装express
	```
	
	安装完express后，在根目录下创建server文件夹，在server文件夹里面创建server.js，在server.js里面写以下代码
	
	```js
	const express = require('express')//express里面现在还没有import方法
	
	const app = express()
	
	app.get('/',function(req,res){
		res.send('<h1>Hello world</h1>')
	})
	app.get('/data',function(req,res){
		res.json({name:'imooc',counter:'IT'})
	})
	app.listen(9093,function(){
		console.log('Node app start at port 9093')
	})
	```
	
	在命令行里面进入server文件夹，在里面执行node server.js命令，命令行中会打印出Node app start at port 9093,打开浏览器输入网址localhost:9093会出来helloworld的字样，如果输入网址localhost:9093/data,会出现{name:'imooc',counter:'IT'},如果在server.js里面继续输入app.get，如果想要获得返回的数据，则必须重启 node server.js命令，为了简化，则 安装
	npm install -g nodemon, 然后再命令行里面输入nodemon server.js，这样就不会需要重启才能刷新页面了

* Express 使用的其他特性

	* app.get,app.post分别开发get和post接口
	* app.use使用模块
	* 代res.send,res.json,res.sendfile响应不同的内容，分别返回文本，json，和文件
	

####2.非关系型数据库mongodb

* 非关系型数据库

	* 一种方法官网https://www.mongodb.com/下载安装mongodb
	* 另一种方法brew install mongodb，然后mongod --config/usr/local/etc/mongod.conf,这个命令是启动mongodb，然后输入mongo就会出现很多信息，证明安装成功
	* 在所在的项目里下载mongoose npm install mongoose --save
	* 通过mongoose操作mongodb，存储的就是json，相对mysql来说要简单的很多

	```js
	
	const mongoose = require('mongoose')
	//链接mongo,并且使用imooc这个集合，如果没有这个集合，则他会主动新建
	const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
	
	mongoose.connect(DB_URL)
	
	mongoose.connection.on('connected',function(){
	    console.log('mongo connect connected')
	})
	```
	
* Moogoose基础实用

   * Connect链接数据库
   * 定义文档模型，Schema和model新建模型
   * 代一个数据库文档对应一个模型，通过模型对数据库进行操作

   ```js
   const User = mongoose.model('user',new mongoose.Schema({
   		user:{type:String,require:true},
   		age:{type:Number,require:true}
   }))
   ```
   上述代码类似于mysql的表，mongo里有文档和字段的概念，Schema是定义一个文档类型，user里面type是指字段的类型，require是指是否必须有该字段
   
* Mongoose文档类型

	* String，Number等数据结构
	* 定create，remove，update分别用来增，删，改的操作
	* Find和findOne用来查询数据

	```js
	//新增数据
	User.create({ 
	    user:'笑话',
	    age:15
	},function(err,doc){
	     if(!err){
	         console.log(doc)
	     }else{
	         console.log(err)
	     }
	})
	
	//删除数据
	User.remove({
	    age:15
	},function(err,doc){
	    console.log(doc)
	})
	app.get('/data',function(req,res){
		//查找数据
	    User.find({},function(err,doc){
	        res.json(doc)
	    })
	})
	```
	
	```js
	//更新更改操作，将user名为xiaoming 的对象年龄变成26
	User.update({'user':'xiaoming'},{'$set':{age:26}},function(err,doc){
	    console.log(doc)
	})
	
	//只找到 user为xiaoming的信息，会返回数组，如果只想找一个可以用findOne这样	就会返回一个对象
    User.find({'user':'xiaoming'},function(err,doc){
        res.json(doc)
    })
	```
	
* 后续进阶

  Express和mongodb结合
  
  * mongodb独立工具函数
  * express实用body-parse支持post参数
  * 实用cookie-parser存储登录信息cookie



####3.使用nodejs的mongoose模块链接和操作mongodb
	* 


##React基础知识

### 1.React是什么

* 帮助构建UI的库

	* Facebook出品，专注View层
	* 一切皆组件
	* 全部使用ES6语法，最新版本为16

* React基础语法

	React的HelloWorld
	
	* import React
	* class语法新建组件，render里直接使用
	* render函数返回值就是输出JSX语法，会把JSX转成js执行

* JSX基础语法
	
	React的View层语法
	
	* Js里直接写html
	* Class要写成className
	* 变量用{}包裹即可
	
* React相当于一个独立团

	* 块一切都是组件
	* 对组件件通信通过属性传递
	* 类实现组件，使用JSX语法

	```js
	import React from 'react'
	class App extends React.Component{
	  render(){
	    const boss = '李韵蓉'
	    return (
	      <div>
	        <h2>独立团,团长{boss}</h2>
	        <Yiying></Yiying>
	      </div>
	    )
	    
	    
	  }
	}
	
	class Yiying extends React.Component{
	  render(){
	    const boss = 'zhangdamiao'
	    return <h2>一影一那个，{boss}</h2>
	  }
	}
	
	export default App
	```
	
	上述代码主要是解释了React的语法和组件通信

### 2.使用React实现组件化

* 组件之间传递数据

  组件之间用props传递数据
  
  * 使用<组建 数据=“值” >的形式传递
  * 组间里使用this.props获取值
  * 如果组件只有render函数，还可以用函数的形式写组件

  ```js
  class App extends React.Component{
	  render(){
	    const boss = '李韵蓉'
	    return (
	      <div>
	        <h2>独立团,团长{boss}</h2>
	        <Yiying laoda='zhangdamiao'></Yiying>
	        <Qibing laoda='孙大使' />
	      </div>
	    )
	    
	    
	  }
	}
	function Qibing(props){
	  return <h2>骑兵连{props.laoda}</h2>
	}
  ```
  
  注意组件的首字母必须大写，否则会报错

* 组件内部state

	组件内部通过state管理状态
	
	* JSX本质就是js，所以直接数组.map渲染列表
	* Constructor设置出事状态，记得执行super(props)
	* 如State就是一个不可变的对象，使用this.state获取

	```js
	class Yiying extends React.Component{
	  constructor(props){
	    super(props)
	    this.state = {
	      solders:['胡子','珠子','王跟随']
	    }
	  }
	  render(){
	    return (
	      <div>
	        <h2>一影一那个，{this.props.laoda}</h2>
	        <ul>
	          {this.state.solders.map(v=>{
	            return <li key={v}>{v}</li>
	          })}
	        </ul>
	
	      </div>
	    )
	  }
	}
	```
	constructor是初始数据，li里面的key是因为列表渲染要每一个设置一个不同key值
	
* 事件

	onClick点击事件
	
	* JSX里，onClick={this.函数名}来绑定事件
	* this引用的问题，需要在构造函数里用bind绑定this
	* this.setState修改state，记得返回新的state，而不是修改

	```js
	class Yiying extends React.Component{
	  constructor(props){
	    super(props)
	    this.state = {
	      solders:['胡子','珠子','王跟随']
	    }
	    this.addSolder = this.addSolder.bind(this)
	  }
	  addSolder(){
	    console.log("hello add solder")
	    this.setState({
	      solders:[...this.state.solders,'新兵单子'+Math.random()]
	    })
	  }
	  render(){
	    return (
	      <div>
	        <h2>一影一那个，{this.props.laoda}</h2>
	        <button onClick={()=>this.addSolder()}>新兵入伍</button>
	        <ul>
	          {this.state.solders.map(v=>{
	            return <li key={v}>{v}</li>
	          })}
	        </ul>
	
	      </div>
	    )
	  }
	}
	```
	
	上述绑定事件会有this指向不明的问题，第一种解决方法是在onClick里面写箭头函数，第二种则是在constructor里面使用bind绑定this
	
* React生命周期

	React组件有若干钩子函数，在组件不同的状态执行
	
	* 初始化周期
	* 组件重新渲染生命周期
	* 组件卸载生命周期

	```js
	  componentWillMount(){
	    console.log("组件马上就要加载了")
	  }
	  componentDidMount(){
	    console.log("组件已经挂载了")
	  }
	  componentWillReceiveProps(nextProps){
	    console.log("组件要接收父组件的值了")
	  }
	  shouldComponentUpdate(){
	    console.log("判断是不是要更新组件")
	    return true;
	  }
	  componentWillUpdate(){
	    console.log("马上就要更新组件了")
	  }
	  componentDidUpdate(){
	    console.log("组件更新完毕")
	  }
	  componentWillUnmount(){
	    console.log("组件卸载了")
	  }
	```
	
	以上代码叙述了生命周期做的事情
	
* 安装chrome扩展

	打开vpn，然后在谷歌扩展程序里面搜索react，安装第一个插件，这样以后我们就可以看到react元素
	

### 3.React进阶使用

* antd-mobile组件的使用

	蚂蚁金服出品的UI组件库
	
	* 使用npm install antd-mobile@next --save安装最新版
	* 兼容Web和ReactNative
	* npm install babel-plugin-import --save. 这个是用来按需加载组件代码和样式的插件

		babel-plugin-import这个插件主要是解决引入css样式问题，如果只有antd-mobile则需要在js里面引入node_modules里面的antd-mobile/dist/antd-mobile.css,有了babel-plugin-import以后就不用引入了 文件会自动引入，它首先要配置一下，在package.json里面的babel里面加入
		
	```js
	"babel": {
	    "presets": [
	      "react-app"
	    ],
	    "plugins":[
	      ["import", { "libraryName": "antd-mobile", "style": "css" }]
	    ]
	  },
	```
	
	常用组件
	
	* Layout布局组件
	* 表单组件，数据展示组件，选择器等等
	* 操作组件

	组件常规使用方法
	
	* import{组件}from 'antd-mobile'
	* 组件直接使用

	```js
		import {List} from 'antd-mobile'
		<List renderHeader={()=>'士兵列表'}>
          {this.state.solders.map(v=>{
            return (
              <List.Item key={v} >
                {v}
              </List.Item>
            )
          })}
       </List>
	```
	
##Redux

###Redux是什么  

* 专注于状态管理的库

	* Redux专注于状态管理，和react结合
	* 单一状态，单向数据流
	* 核心概念：store，state，action，reducer；store是管理存储所有状态state；action是改变state；reducer是数据模型，接受动作并且进行处理；需要改变的时候，需要告诉dispatch去通知action

* 使用方法
	
	* 首先通过reducer新建store，随时通过store.getState获取状态
	* 需要状态变更，state.dispatch(action)来修改状态
	* Reducer函数接受state和action，返回新的state，可以用store.subscribe监听每次修改
	
	```js
	import {createStore} from 'redux'
	// 新建store
	
	//通过reducer建立
	//根据老的state和action生成新的state
	function counter(state=0,action){
	    switch(action.type){
	        case '加机关枪':
	            return state+1
	        case '减机关枪':
	            return state-1
	        default:
	            return 10
	    }
	}
	//新建store
	const store = createStore(counter)
	
	const init = store.getState()
	console.log(init)
	
	function listener(){
	    const current = store.getState()
	    console.log(`现在有机关枪${current}把`)
	}
	store.subscribe(listener)//若有改变，收到问题就会运行  11，12，13，12
	
	//派发事件 传递action
	store.dispatch({type:'加机关枪'})//相当于发送监听
	store.dispatch({type:'加机关枪'})
	store.dispatch({type:'加机关枪'})
	store.dispatch({type:'减机关枪'})
	```
	
	###Redux与React的结合
	
	* 把store.dispatch方法传递给组件，内部可以调用修改状态
	* Subscribe订阅render函数，每次修改都重新渲染
	* Redux相关内容，移到单独的文件index.redux.js单独管理

	在index.redux.js里面输入
	
	```js
	
	//创建type类型
	const ADD_GUN = '加机关枪'
	const REMOVE_GUN = '减机关枪'
	
	//创建数据模型并且抛出
	export function counter(state=0,action){
	    switch(action.type){
	        case ADD_GUN:
	            return state + 1
	        case REMOVE_GUN:
	            return state - 1
	        default:
	            return 10
	    }
	
	}
	
	//创建方法
	export function addGun(){
	    return {type:ADD_GUN}
	}
	
	export function removeGun(){
	    return {type:REMOVE_GUN}
	}
	```
	
	在index.js里面输入
	
	```js
	import React from 'react'
	import ReactDom from 'react-dom'
	import App from './App'
	import {createStore} from 'redux'
	import {counter} from './index.redux'
	
	const store = createStore(counter)
	
	function render(){
	    ReactDom.render(<App store={store} />,document.getElementById('root'))
	}
	store.subscribe(render)
	render()
	```
	
	在App.js里面输入
	
	```js
	
	import React from 'react'
	import {addGun} from './index.redux'
	
	class App extends React.Component{
	    render(){
	        const store = this.props.store
	        const num = store.getState()
	        return(
	            <div>
	                <h1>现在有机关枪{num}把</h1>
	                <button onClick={()=>store.dispatch(addGun())}>申请机关枪</button>
	            </div>
	        )
	    }
	}
	export default App
	```
	但是为了减少耦合性，不建议在组子件里面引入index.redux.js，所以我们在index.js里面引入addGun，并将addGun=addGun放入<App />里面，然后在app.js里面const addGun = this.props.addGun,这样就可以用了
	
* 更进一步，让Redux可以处理异步

	处理异步，调试工具，更优雅的和react结合
	
	* Redux处理异步，需要redux-thunk插件
	* npm install redux-devtools-extension并且开启
	* 使用react-redux优雅的链接react和redux

	处理异步，redux默认只处理同步，异步任务需要react-thunk中间件
	
	* npm install redux-thunk --save
	* 使用applyMiddleware开启thunk中间件
	* Action可以返回函数，使用dispatch提交action

	在index.redux.js里面添加一个函数
	
	```js
	export function addGunAsync(){
	    return (dispatch)=>{
	        setTimeout(()=>{
	            dispatch(addGun())
	        },2000)
	    }
	}
	```
	然后在index.js里面
	
	```js
	import {createStore,applyMiddleware} from 'redux'
	import thunk from 'redux-thunk'
	import {counter,addGun,removeGun,addGunAsync} from './index.redux'
	const store = createStore(counter,applyMiddleware(thunk))
	function render(){
		 ReactDom.render(<App store={store} 	addGunAsync={addGunAsync}  />,document.getElementById('root'))
		}
	```
	
	然后在app.js里面像以前一样引入addGunAsync这个函数就可以了
	

	调试工具，Chrome搜索redux安装
	
	* 新建store的时候判断window.devToolsExtension
	* 使用compose结合thunk和window.devToolsExtension
	* 调试窗的redux选项卡，实时看到state
	
	首先在谷歌扩展程序里面搜索redux，然后安装第一个，然后在index.js里面
	
	```js
	import {createStore,applyMiddleware,compose} from 'redux'
	const store = createStore(counter,compose(
	    applyMiddleware(thunk),
	    window.devToolsExtension?window.devToolsExtension():f=>f
	))
	```
	
	这样我们就可以在浏览器中找到redux，然后查看她的各个状态了
	
###使用react-redux

* npm install react-redux --save
* 忘记subscribe(接受监听)，记住reducer，action和dispatch即可
* React-redux提供Provider和connect两个接口来链接

	React-redux的具体使用
	
	* Provider组件在应用最外层，传入store即可，只用一次
	* Connect负责从外部获取组件需要的参数
	* Connect可以用装饰器的方式来写

	在index.js里面写
	
	```js
	import React from 'react'
	import ReactDom from 'react-dom'
	import App from './App'
	import {createStore,applyMiddleware,compose} from 'redux'
	import {counter} from './index.redux'
	import thunk from 'redux-thunk'
	import {Provider} from 'react-redux'
	
	const store = createStore(counter,compose(
	    applyMiddleware(thunk),
	    window.devToolsExtension?window.devToolsExtension():f=>f
	))
	
	ReactDom.render(
	    (
	        <Provider store={store}>
	            <App />
	        </Provider>
	    ),
	    document.getElementById('root')
	)
	```
	在App.js里面写
	
	```js
	import React from 'react'
	import {connect} from 'react-redux'
	import {addGun,removeGun,addGunAsync} from './index.redux'
	class App extends React.Component{
	    render(){
	        return(
	            <div>
	                <h1>现在有机关枪{this.props.num}把</h1>
	                <button onClick={this.props.addGun}>申请机关枪</button>
	                <button onClick={this.props.removeGun}>上交武器</button>
	                <button onClick={this.props.addGunAsync}>推迟两天得到机关枪</button>
	            </div>
	        )
	    }
	}
	const mapStatetoProps=(state)=>{
	    return {num:state}
	}
	const actionCreators = {addGun,removeGun,addGunAsync}
	App = connect(mapStatetoProps,actionCreators)(App)
	
	export default App
	```
	
	这样就使用了provider和connect来管理数据了
	
	用装饰器的方式来写的话，首先要在package.json里面的babel里面添加：
	
	```js
	"plugins": [
      [
        "transform-decorators-legacy"
      ],
   	]
	```
	然后app.js里面内容更改如下
	
	```js
	import React from 'react'
	import {connect} from 'react-redux'
	import {addGun,removeGun,addGunAsync} from './index.redux'
	// const mapStatetoProps=(state)=>{
	//     return {num:state}
	// }
	// const actionCreators = {addGun,removeGun,addGunAsync}
	
	// @connect(mapStatetoProps,actionCreators)
	@connect(
	    //你要state什么属性放到props
	    state=>({num:state}),
	    //你要什么方法放到props，会自动放到dispatch 
	    {addGun,removeGun,addGunAsync}
	)
	class App extends React.Component{
	    render(){
	        return(
	            <div>
	                <h1>现在有机关枪{this.props.num}把</h1>
	                <button onClick={this.props.addGun}>申请机关枪</button>
	                <button onClick={this.props.removeGun}>上交武器</button>
	                <button onClick={this.props.addGunAsync}>推迟两天得到机关枪</button>
	            </div>
	        )
	    }
	}
	
	export default App
	```
	
* 后续进阶

	React后续
	
	* 什么数据应该放在React里
	* Redux管理ajax
	* Redux管理聊天数据

## React-router4

###Readux-router4是什么

* React官方推荐路由库，4是最新版本

	* 4是全新的版本，和之前版本不兼容，浏览器和RN均兼容
	* React开发单页应用必备，践行路由即组件的概念
	* 核心概念：动态路由，Route，Link，Switch

* 初始Router4

	* npm install react-router-dom --save
	* Router4使用react-router-dom作为浏览器端的路由
	* 忘记Router2的内容，拥抱Router4

* 入门组件

	* BrowserRouter，包裹整个应用
	* Router路由对应渲染的组件，可嵌套，
	* Link跳转专用

	```js
	import React from 'react'
	import ReactDom from 'react-dom'
	import App from './App'
	import {createStore,applyMiddleware,compose} from 'redux'
	import {counter} from './index.redux'
	import thunk from 'redux-thunk'
	import {Provider} from 'react-redux'
	import {BrowserRouter,Route,Link} from 'react-router-dom'
	const store = createStore(counter,compose(
	    applyMiddleware(thunk),
	    window.devToolsExtension?window.devToolsExtension():f=>f
	))
	function Erying(){
	    return(
	        <h2>二营</h2>
	    )
	}
	
	function Qibinglian(){
	    return (
	        <h2>骑兵连</h2>
	    )
	}
	
	ReactDom.render(
	    (
	        <Provider store={store}>
	            <BrowserRouter>
	                <div>
	                    {/* 跳转到指定的路由 */}
	                    <ul>
	                        <li>
	                            <Link to="/">一营</Link>
	                        </li>
	                        <li>
	                            <Link to='/erying'>二营</Link>
	                        </li>
	                        <li>
	                            <Link to='/qibinglian'>骑兵连</Link>
	                        </li>
	                    </ul>
	                    {/* exact表明比如完全匹配，路由对应渲染模版 */}
	                    <Route path='/' exact component={App}></Route>
	                    <Route path='/erying' component={Erying}></Route>
	                    <Route path='/qibinglian' component={Qibinglian}></Route>
	                </div>
	            </BrowserRouter>
	        </Provider>
	    ),
	    document.getElementById('root')
	)

	```
	
* 其他组件

	* url参数，Route组件参数可用冒号标识参数
	* Redirect组件跳转
	* Switch只渲染一个子Route组件

	```js
	class Test extends React.Component{
    
	    render(){
	        console.log(this.props)
	        return <h2>测试组件</h2>
	    }
	}
	<BrowserRouter>
        <div>
	        {/* 跳转到指定的路由 */}
	        <ul>
	            <li>
	                <Link to="/">一营</Link>
	            </li>
	            <li>
	                <Link to='/erying'>二营</Link>
	            </li>
	            <li>
	                <Link to='/qibinglian'>骑兵连</Link>
	            </li>
	        </ul>
	        {/* exact表明比如完全匹配，路由对应渲染模版 */}
	        <Route path='/' exact component={App}></Route>
	        <Route path='/:location' component={Test}></Route>
        </div>
    </BrowserRouter>
	```
	
	```js
	import {
	    BrowserRouter,
	    Route,
	    Link,
	    Redirect,
	    Switch
	} from 'react-router-dom'
	<Redirect to='qibinglian'></Redirect>
	```
	Redirect如果没有在Switch里面意思是指不管最后留在哪个页面，只要一刷新都回到qibinglian页面，如果他是放在Switch里面，则代表如果前面的Route都没有，则跳转到Redirect指向的路径
	
	```js
	<Switch>
        {/* 只渲染命中的第一个Route */}
        <Route path='/' exact component={App}></Route>
        <Route path='/erying' component={Erying}></Route>
        <Route path='/qibinglian' component={Qibinglian}></Route>
        <Route path='/:location' component={Test}></Route>

    </Switch>
	```
	这个意思为如果你去找一个没有的路径，那么他就会跳转到Test组件
	
### React-router4和redux配合

* 复杂redux应用，多个reducer，用combineReducers合并
* Redirect组件跳转
* Switch只渲染一个子Route组件

下面是一个登录功能的展示：

index.js:

```js
import React from 'react'
import ReactDom from 'react-dom'

import {createStore,applyMiddleware,compose} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import Auth from './Auth'
import Dashboard from './Dashboard'
import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
// console.log(store.getState())



//登录没有登录信息则统一跳转到login
//页面


ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    {/* 只渲染命中的第一个Route */}
                    <Route path='/login'  component={Auth}></Route>
                    <Route path='/dashboard' component={Dashboard}></Route>
                    <Redirect to="/dashboard" />
                </Switch>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)
```

Auth.js:

```js
/**
 * Created by fengyingxiao on 2018/3/30.
 */
import React from 'react'
import {connect} from 'react-redux'
import {login} from './Auth.redux'
import {Link,Route,Redirect} from 'react-router-dom'
//
@connect(
    state=>state.auth,
    {login}

)
class Auth extends  React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h2>Auth page</h2>
                <button onClick={this.props.login}>登录</button>
                {this.props.isAuth?<Redirect to="/dashboard" />:null}
            </div>
        )
    }
}

export  default Auth
```

reducers.js

```js
import {combineReducers} from 'redux'
import {counter} from './index.redux'
import {auth} from './Auth.redux'

export default combineReducers({counter,auth})
```
Auth.redux.js:

```js
const LOGIN = 'LOGIN'

const LOGOUT = 'LOGOUT'

export function auth(state={isAuth:false,user:'李云龙'},action){
    switch (action.type){
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
            return {...state,isAuth:false}
        default:
            return state
    }
}


export function login(){
    return {type:LOGIN}
}

export function logout(){
    return {type:LOGOUT}
}
```

Dashboard.js

```js
import React from 'react'
import {Link,Route,Redirect} from 'react-router-dom'
import App from './App'
import {connect} from 'react-redux'
import {logout} from './Auth.redux'
function Erying(){
    return(
        <h2>二营</h2>
    )
}

function Qibinglian(){
    return (
        <h2>骑兵连</h2>
    )
}

@connect(
    state=>state.auth,
    {logout}
)

class Dashboard extends  React.Component{
    constructor(props){
        super(props)

    }

    render(){
        console.log(this.props.isAuth)

        return(
        this.props.isAuth?<div>
                                <button onClick={this.props.logout}>注销</button>
                                <ul>
                                    <li>
                                        <Link to="/dashboard">一营</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/erying'>二营</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/qibinglian'>骑兵连</Link>
                                    </li>
                                </ul>
                                <Route path="/dashboard" exact component={App} />
                                <Route path="/dashboard/erying" component={Erying} />
                                <Route path="/dashboard/qibinglian" component={Qibinglian} />

                            </div>:<Redirect to="/login" />
        )
    }
}

export  default Dashboard
```

App.js:

```js
import React from 'react'
import {connect} from 'react-redux'
import {addGun,removeGun,addGunAsync} from './index.redux'
const mapStatetoProps=(state)=>{
    return {num:state}
}
const actionCreators = {addGun,removeGun,addGunAsync}

@connect(
    //你要state什么属性放到props
    state=>({num:state.counter}),
    //你要什么方法放到props，会自动放到dispatch 
    {addGun,removeGun,addGunAsync}
)
class App extends React.Component{
    render(){
        return(
            <div>
                <h1>现在有机关枪{this.props.num}把</h1>
                <button onClick={this.props.addGun}>申请机关枪</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>推迟两天得到机关枪</button>
            </div>
        )
    }
}

export default App
```

在dashboard.js里面，我们可以改变将linkto里面的内容 用更简便的方法改变一下

```js
class Dashboard extends  React.Component{


    render(){
        console.log(this.props.isAuth)
        const match = this.props.match
        console.log(match)
        return(
        this.props.isAuth?<div>
                                <button onClick={this.props.logout}>注销</button>
                                <ul>
                                    <li>
                                        <Link to={`${match.url}/`}>一营</Link>
                                    </li>
                                    <li>
                                        <Link to={`${match.url}/erying`}>二营</Link>
        </li>
                                    <li>
                                        <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
                                    </li>
                                </ul>
                                <Route path={`${match.url}/`} exact component={App} />
                                <Route path={`${match.url}/erying`} component={Erying} />
                                <Route path={`${match.url}/qibinglian`} component={Qibinglian} />

                            </div>:<Redirect to="/login" />
        )
    }
}

```

## 前后端连调

### 使用axios发送异步请求

* 如何发送，端口不一致，使用proxy配置转发
* axios拦截器，统一loading处理
* redux里使用异步数据，渲染页面

### axios

* npm install axios --save
* 然后在package.json里面添加请求的地址,在babel下面添加

	```js
	"proxy": "http://localhost:9093",
	```
* 然后在Auth.js里面引用axios，用get方法去请求server里面得到的数据；

	```js
	import axios from 'axios'
	
	
	componentDidMount(){
        axios.get('/data')
            .then(res=>{
                console.log(res)
                //这样就会打印到从server里面请求的内容
            })
    }
	```
	
* 如果用redux做，那么则在Auth.js里面添加

	```js
	import axios from 'axios'
	const USER_DATA = 'USER_DATA'
	const initState = {
	    isAuth:false,
	    user:'李云龙',
	    age:20
	}
	
	export function auth(state=initState,action){
	    console.log(state,action)
	    switch (action.type){
	        case LOGIN:
	            return {...state,isAuth:true}
	        case LOGOUT:
	            return {...state,isAuth:false}
	        case USER_DATA:
	            return {...state,user:action.payload.user,age:action.payload.age}
	        default:
	            return state
	    }
	}
	
	export function getUserData(){
	    //dispatch用来通知数据修改
	    return dispatch=>{
	        axios.get('/data')
	                .then(res=>{
	                    if(res.status === 200){
	                        dispatch(userData(res.data[0]))
	                    }
	                    console.log(res)
	                })
	    }
	}
	export function userData(data) {
	    return {
	        type: USER_DATA,
	        payload:data
	    }
	}
	```
	
* axios的拦截器 ，主要是为了展示加载的时候的动画效果;新建config.js文件，然后在config文件中写： 

	```js
	import axios from 'axios'
	import {Toast} from 'antd-mobile'
	//拦截请求
	axios.interceptors.request.use(function(config){
	    Toast.loading('加载中',0)
	    return config
	})
	//拦截响应
	axios.interceptors.response.use(function(config){
	    setTimeout(()=>{
	        Toast.hide()
	    },2000)
	
	    return config
	})
	```
	在index.js里面引入config.js


## 登陆和注册

### 页面文件结构
* 骨架结构实现

	* 组件放在Component文件夹下面
	* 页面放在Container文件夹下面
	* 页面入口处获取用户信息，决定跳转到哪个页面

### web开发模式
* 基于cookie用户验证

	* express依赖cookie-parse，需要npm install cookie-parser --save安装
	* cookie类似于一张身份卡，登陆后服务器端返回，你带着cookie就可以访问受限资源
	* 页面cookie的管理浏览器会自动处理

### 前后端实现

### 高阶函数

```js
function hello(){
    console.log('hello imooc I love React')
}
function WrapperHello(fn){
    return function(){
        console.log('before say hello')
        fn()
        console.log('after say hello')
    }
}

hello = WrapperHello(hello)
hello() //before say hello  hello imooc I love React    after say hello
```
分为属性代理和反向继承，下面介绍的是属性代理

```js
class Hello extends React.Component{
    render(){
        return <h2>hello imooc Ilove imooc</h2>
    }
}
function WrapperHello(Comp){
    class WrapComp extends React.Component{
        render(){
            return(
                <div>
                    <p>这是HO高阶组件特有的元素</p>
                    <Comp {...this.props}></Comp>
                </div>
            )

        }
    }
    return WrapComp
}

Hello = WrapperHello(Hello)
```
上述代码也可以用下面的@符号，是一样的效果

```js
function WrapperHello(Comp){
    class WrapComp extends React.Component{
        render(){
            return(
                <div>
                    <p>这是HO高阶组件特有的元素</p>
                    <Comp {...this.props}></Comp>
                </div>
            )

        }
    }
    return WrapComp
}
@WrapperHello
class Hello extends React.Component{
    render(){
        return <h2>hello imooc Ilove imooc</h2>
    }
}
```

反向继承：

```js
function WrapperHello(Comp){
    class WrapComp extends Comp{
        componentDidMount(){
            console.log('高阶组件新增的生命周期， 加载完成')
        }
        render(){
            return <Comp/>
        }
    }
    return WrapComp
}
@WrapperHello
class Hello extends React.Component{
    render(){
        return <h2>hello imooc Ilove imooc</h2>
    }
}
```

	
	
	




	