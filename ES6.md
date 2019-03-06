# ES6

* 开发环境已经普及使用
* 浏览器环境支持不好（需要开发环境编译）

## ES6模块化如何使用，开发环境如何打包

* 模块化的基本语法

```js
<!--util1.js-->
export default {
    a:100
}
<!--util2.js-->
export function fn1(){
    console.log('是fn1')
}
export function fn2(){
    console.log('是fn2')
}
<!--index.js-->
import util1 from './util1'
import {fn1,fn2} from './util2'
console.log(util1)
fn1()
fn2()
```
如果抛出的是方法 则引入的时候需要带大括号，而如果是整体抛出的话，则在抛出时加上default，然后直接引进就可以了。

* 开发环境配置

	### 开发环境-babel
	* 电脑有node环境，运行 npm init
	* npm install --save-dev babel-core babel-preset-es2015 babel-preset-latest
	* 创建.babelrc文件
	* npm install --galbal babel-cli
	* babel --version

	运行npm init 会在目标文件夹生成一个package.json文件，然后在目标文件夹npm install众多babel环境。在电脑全局安装babel-cli，在目标文件夹下建.babelrc，在该文件上写入
	
	```js
	{
	    "presets": [
	        "es2015",
	        "latest"
	    ],
	    <!--插件-->
	    "plugins": [
	        
	    ]
	}
	```
	这样就可以使es6在浏览器中识别
	
	### 开发环境-webpack
	
	* npm install webpack babel-loader --save-dev
	* 配置webpack.config.js
	* 配置package.json中的scripts
	* 运行npm start

	创建webpack.config.js文件，在webpack.config.js里面写入
	
	```js
	module.exports = {
    entry:'./src/index.js', //入口文件
    output:{
        path:__dirname,
        filename:'./build/bundle.js' //出口文件，这个是写完以后webpack自己创建出来的
    },
    module:{
    //定义规则rules：
        rules:[{
            test:/\.js?$/,//意思是正则表达式去检测所有后缀是js的文件
            exclude:/(node_modules)/,//意思是检测的文件中除去node_modules里面的文件
            loader:'babel-loader'//意思是检测过的文件都用babel编译
        }]
    }
}
	```
	在package.json中的scripts里面添加一句话
	
	```js
	 "scripts": {
	    "start": "webpack",
	  },
	```
	这个意思是当运行npm start命令时 即为运行webapck，有可能因为babel的版本问题报错 ，在这个运行时我的babel-loader下载的为8版本，但是需要的是7的，所以在重新npm install webpack-loader@7 --save-dev;新建一个index.html文件，在文件里面引入‘./build/bundle.js’,然后运行index.html文件就成功了
	
	```js
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Title</title>
	</head>
	<style>
	
	</style>
	<body>
	    <p>text</p>
	<script type="text/javascript" src="./build/bundle.js"></script>
	</body>
	</html>
	```
	有一个小知识点，就是http-server,它是一个基于node.js的简单零配置命令行HTTP服务器，我们可以npm install http-server -g,然后在命令行里面http-server -p 8881,就可以监听本地的8881端口，在本次测试中即打开了html文件;如果想要关闭http-server，最简单的方法是control+c，但是如果不小心关闭了该命令行，则 在命令行中查看线程：ps -ef  | grep http-server，就可以看到现在的打开的端口号，然后杀死线程：kill -9 +（线程号）
	
	### 开发环境-rollup（我们常见的react和vue都是用它来打包的）
	
	它是可以尽量简化输出之后的内容大小，对于代码很复杂，很多人维护的代码库很重要：
	
	* rollup功能单一，webpack功能强大
	* 参考设计原则和《Linux/Unix设计思想》
	* 工具要尽量功能单一，可集成，可扩展
	
	使用方法：
	
	* npm init
	* npm i babel-core rollup rollup-plugin-node-resolve rollup-plugin-babel babel-plugin-external-helpers babel-preset-latest --save-dev
	* 配置.babelrc
	* 配置rollup.config.js
	* 修改package.json的scripts
	* npm start
	
	在.babelrc：
	
	```js
	{
	    "presets": [
	        ["latest",{
	            "es2015":{
	                "modules":false
	            }
	        }]
	    ],
	    "plugins": [
	        "external-helpers"
	    ]
	}
	```
	在rollup.config.js:
	
	```js
	import babel from 'rollup-plugin-babel'
	import resolve from 'rollup-plugin-node-resolve'
	
	export default{
	    entry:'src/index.js', 
	    format:'umd',
	    plugins:[
	        resolve(),
	        babel({
	            exclude:'node/modules/**'
	        })
	    ],
	    dest:'build/bundle.js'
	}
	```
	修改package.json的scripts:
	
	```js
	"scripts": {
    	"start": "rollup -c rollup.config.js"
  },
	```
	
	###我自己测试时没有运行成功 一直报找不到@babel/core
	
* 关于js众多模块化标准
	
	* 没有模块化
	* AMD成为标准，require.js(也有CMD)
	* 前端打包工具，nodejs模块化可以被使用
	* ES6出现，想统一现在所有模块化标准
	* nodejs积极支持，浏览器尚未统一
	* 可以自造lib，但是不要自造标准

	### 问题解答
	
	* 语法：import export(注意有无default)
	* 环境：babel编译ES6语法，模块化可用webpack和rollup

## Class和普通构造函数有何区别

* JS构造函数

```js
function MathHandle(x,y){
	this.x = x
	this.y = y
}
MathHandle.prototype.add =  function(){
	return this.x + this.y
};  
var m = new MathHandle(1,2)
console.log(m.add()) //3
```

* Class基本语法

```js
class MathHandle {
    constructor(x,y){
        this.x = x
        this.y = y
    }

    add(){
        return this.x+this.y
    }
}

const m = new MathHandle(1,2)
console.log(m.add()) //3 
console.log(typeof MathHandle) //function
console.log(MathHandle.prototype.constructor === MathHandle) //true
console.log(m.__proto__ === MathHandle.prototype) //true
```

* 语法糖

```js
class MathHandle{
	//...
}
typeof MathHandle // function
MathHandle === MathHandle.prototype.constructor //true
``` 
* 继承

```js
function Animal(){
    this.eat = function(){
        console.log('Animal eat')
    }
}
function Dog(){
    this.bark = function(){
        console.log('Dog bark')
    }
}
// 绑定原型，实现继承
Dog.prototype = new Animal()
var hashiqi = new Dog()
hashiqi.bark() //Dog bark
hashiqi.eat() //Animal eat
```

```js
class Animal {
    constructor(name){
        this.name = name
    }
    eat(){
        console.log(this.name+'eat')
    }
}
class Dog extends Animal{
    constructor(name){
        super(name)//只要class后面有extends  都要有super这个东西
        this.name = name
    } 
    say(){
        alert(this.name + 'say')
    }
}
const dog  = new Dog('哈士奇')
dog.say()//哈士奇say
dog.eat()//哈士奇eat
```
	
* 问题解答

	* Class在语法上更加贴合面向对象的写法
	* Class实现继承更加易读，易理解
	* 更易于写java等后端语言的使用
	* 本质还是语法糖，使用prototype

## Promise的基本使用和原理

* Callback Hell
* Promise语法

首先js里面的调用是：

```js
function loadImg(src,callback,fail){
    var img = document.createElement('img')
    img.onload = function(){
        console.log('111111')
        callback(img)
    }
    img.onerror = function(){
        fail()
    }
    img.src = src
}
var src = 'http://www.imooc.com/static/img/index/logo_new.png'
loadImg(src,function(img){
    console.log(img.width)
},function(){
    console.log("failed")
})
```
用promise语法写则变为：

```js
function loadImg(src){
    const promise = new Promise(function(resolve,reject){
        var img = document.createElement('img')
        img.onload = function(){
            console.log('11111')
            resolve(img)
        }
        img.onerror = function(){
            reject()
        }
        img.src = src
    })
    return promise
}
var src = 'http://www.imooc.com/static/img/index/logo_new.png'
var result = loadImg(src)
result.then(function(img){
    console.log(img.width) //252
},function(){
    console.log('failed')
})
result.then(function(img){
    console.log(img.height) //144
})
```

* 问题解答

	* new Promise实例，而且要return
	* new Promise时要传入函数，函数有resolve reject两个参数
	* 成功时执行resolve(),失败时执行reject()
	* then监听结果

## 总结一下ES6其他常用功能

* let/const
* 多行字符串/模版变量
* 解构赋值
* 块级作用域
* 函数默认参数
* 箭头函数

##let和const命令

* let命令，用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效
*  const命令，声明一个只读懂常量，一旦声明，常量的值就不能改变了。这里指的意为变量指向的内存地址不得改动。一旦声明变量，就必须立即初始化，不能留到以后赋值，否则就会报错。const命令与let命令相同，只在声明所在的块级作用域内有效
*  块级作用域，外层作用域无法读取内层作用域的变量，内层作用域可以定义外层作用域的同名变量
*  顶层对象的属性，在浏览器环境中指的是window对象，在Node指的是global对象。在ES5之中，顶层对象的属性与全局变量是等价的，在ES6中，全局变量逐步与顶层对象的属性脱钩
*  global对象，以前很难有一种方法，可以在所有的环境中都能取到顶层对象，现在引入global做为顶层对象

## 变量的解构赋值

* 数组的解构赋值

```js
//以前的写法
let a = 1;
let b = 2;
let c = 3;

//ES6
let [a,b,c] = [1,2,3]

```
这种写法属于模式匹配，只要等号两边的模式相同，左边的变量就会被赋予对应的值，下面也是例子

```js
	let [foo,[[bar],baz]] = [1,[[2],3]]
	console.log(foo +'--'+bar+'----'+baz) // 1--2----3

	let [,,third]=['foo','bar','baz']
    console.log(third)  //baz
    
    let [x,,y]=[1,2,3]
    console.log(x+'---'+y) //1---3
    
    let [head,...tail] = [1,2,3,4];
    console.log(head) //1
    console.log(tail) //[2,3,4]
    
    let [x,y,...z]=['a']
    console.log(x) //'a'
    console.log(y) // undefind,如果解构的值不成功，则就会为undefined
    console.log(z) //[]
```
如果解构不成功，变量的值就等于undefined，以下两种情况分别为解构不成功

```js
let [foo] = []
console.log(foo) ////undefined

let [bar,foo] =[1]
console.log(bar) //1
console.log(foo) // undefined
```
还有一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组，这种情况是可以解构成功的

```js
let [x,y]=[1,2,3]
console.log(x+'----'+y) //1----2

let [a,[b],d] = [1,[2,3],4]
console.log(a+'--'+b+'--'+d) //1--2--4
```
如果等号的右边不是数组（或者严格讲，不是可遍历的结构，则将会报错），以下为例子

```js
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
console,log(foo) //以上结果都会报错的
```
对于Set结构，也可以使用数组的解构赋值

```js
let [x,y,z] = new Set(['a','b','c'])
console.log(x + '----'+y+'----'+z)  //a----b----c
```
默认值，解构赋值允许指定默认值

```js
let [foo = true] =[];
console.log(foo) //true

let [x,y='b'] = ['a']
console.log(x+'----'+y) //a----b

let [x,y ='b'] = ['a',undefined]
console.log(x +'----'+y) //a----b
```
注意：ES6内部使用严格相等运算符(===),判断一个位置是否有值，所以，只有当一个数组成员内部严格等于undefined，默认值才会生效

```js
let [x=1]=[undefined]
console.log(x) //1

let [x=1] = [null]
console.log(x) //null
```
上述代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

如果默认值是一个表达式，那么这个表达式是惰性求值，即只有在用到的时候才会求值，比如以下代码，因为x能取到值，所以函数f根本不会执行，

```js
	function f(){
        console.log('aaaa')
    }
    let [x = f()] =[1]
    console.log(x) //1,以上f（）函数不会运行
    
    //下面的代码等同于上面的代码
    let x;
    if([1][0] ===undefined){
        x = f()
    }else{
        x = [1][0]
    }
    console.log(x) //1
```
默认值可以引用解构赋值的其他变量，但该变量必须已经声明

```js
let [x=1,y=x] =[]
console.log(x+'---'+y) //1---1

let [x=1,y=x]=[2]
console.log(x+'-----'+y) //2-----2

let [x=1,y=x] = [1,2]
console.log(x+'----'+y) //1----2

let [x=y,y=1] =[]
console.log(x+'-----'+y) //报错 因为x用y做默认值时，y还没有声明
```

* 对象的解构赋值

解构不仅可以用于数组，还可用于对象

```js
let {foo,bar} = {foo:'aaa',bar:'bbbb'}
console.log(foo) //aaa
console.log(bar) //bbbb
```
对象的解构与数组有一个重要的不同，数组的元素是按次序排列的，变量的取值由他的位置决定，而对象的属性没有次序，变量必须与属性同名，才能取到正确的值

```js
	let {bar,foo} = {foo:'aaa',bar:'bbb'}
    console.log(foo) //aaa
    console.log(bar) //bbb
    
    let {baz} = {foo:'aaa',bar:'bbb'}
    console.log(baz) //undefined
```
上述第二个例子的变量没有对应的同名属性，导致取不到值，最后等于undefined，如果变量名与属性名不一致，必须写成下面这样：

```js
	let {foo:baz} = {foo:'aaa',bar:'bbb'}
    console.log(baz) //aaa
    
    let obj = {first:'hello',last:'world'};
    let {first:f,last:l} = obj
    console.log(f) //hello
    console.log(l) //world
    
    let {foo:foo,bar:bar} = {foo:'aaa',bar:'bbb'}
    console.log(foo)
    console.log(bar)
    
    let {foo:baz} = {foo:'aaa',bar:'bbb'}
    console.log(baz) //aaa
    console.log(foo) //报错
```
第四个例子说明对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量，真正被赋值的是后者，而不是前者。foo是匹配的模式，而baz才是变量，真正被赋值的是baz，而不是foo。

与数组一样，解构也可以用于嵌套解构的对象

```js
    let obj = {
        p:[
                'hello',
            {y:'world'}
        ]
    }
    let {p:[x,{y}]} = obj
    console.log(x) //hello
    console.log(y)  //world
```
注意这时p是模式，不是变量，因此不会被赋值，若p也要作为变量赋值，则可以写写成以下这种：

```js
	let obj ={
        p:[
                'Hello',
            {y:'world'}
        ]
    }
    let{p,p:[x,{y}]} = obj
    console.log(x)  //hello
    console.log(y) //world
    console.log(p) // ["hello", {y: "world"}]
```

```js
    const node ={
        loc: {
            start: {
                line:1,
                column:5
            }
        }
    }
    let {loc,loc:{start},loc:{start:{line}}} = node
    console.log(line) //1
    console.log(loc) //start: {line: 1, column: 5}
    console.log(start) //{line: 1, column: 5}
```
上述代码有三次解构赋值，分别是对loc，start，line三个属性的解构赋值。注意，最后一次对line属性的解构赋值中，只有line是变量，loc和start都是模式不是变量

下面是嵌套赋值的例子：

```js
let obj = {};
let arr =[];
({foo:obj.prop, bar:arr[0]} ={foo:123,bar:true})
console.log(obj)  //{prop: 123}
console.log(arr) //[true]
```
对象的解构也可以指定默认值:

```js
 var {x =3} ={}
 console.log(x) //3
 
var {x,y=5} = {x:1}
console.log(x+'-----'+y) //1-----5

var {x:y=3} = {}
console.log(x) //报错
console.log(y) //3

var {message:msg ='something went wrong'} ={}
console.log(msg) //something went wrong
```
默认值生效的条件是，对象的属性值严格等于undefined：

```js
var {x=3} = {x:undefined}
console.log(x)  //3

var {x=3} = {x:null}
console.log(x)  //null
```
如果解构失败，变量的值等于undefined

```js
    let {foo} = {bar :'baz'}
    console.log(foo) //undefined
```

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错

```js
    let {foo:{bar}} = {baz:'baz'}
    console.log(bar) //报错
```
上述代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时代码会报错，因为foo此时等于undefined，再取子属性就会报错。

```js
    let x;
{x} = {x:1}
```
上述代码的写法会报错，因为js引擎会将{x}理解成一个代码块，从而发生语法错误，只有不降大括号写在行首，避免将其解释为代码块，才能解决这个问题，正确写法是：

```js
let x;
({x}={x:4})
console.log(x) //4
```
解构赋值允许等号左边的模式之中，不放置任何变量名，因此可以写出非常古怪的赋值表达式，下面的表达式虽然毫无意义，但是语法是合法的，可以执行

```js
({}=[true,false])
({} = 'abc')
({}=[])
```
对象的解构赋值，可以很方便的将现有对象的方法，赋值到某个变量

```js
let {log,sin,cos} = Math

let {sS,cC} = this.state
```
由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构

```js
    let arr =[1,2,3]
    let {0:first,[arr.length-1]:last} = arr
    console.log(first) //1
    console.log(last) //3
```
上述代码对数组进行对象解构，数组arr的0键对应的值为1，[arr.length-1]就是2键，对应的值是3，方括号这种写法属于属性名表达式

* 字符串的解构赋值

字符串也可以解构赋值，被转换成了一个类似数组的对象

```js
    const [a,b,c,d,e] = 'hello'
    console.log(a+'--'+b+'--'+c+'---'+d+'---'+e) //h--e--l---l---o
```
类似数组的对象都有一个length属性，因此可以对这个属性解构赋值

```js
let {length:len} = 'hello';
console.log(len) //5
```

* 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转化为对象

```js
    let {toString:s} = 123
    console.log(s === Number.prototype.toString) //true
    
    let {toString: s} = true;
	 console.log(s === Boolean.prototype.toString) // true
```
上述代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

```js
let {prop:x} = undefined
    console.log(x) //报错
    
        let {prop:y} = null
    console.log(y) //报错
```
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象，由于undefined和null无法转为对象，所以对他们进行解构赋值，都会报错

* 函数参数的解构赋值

函数的参数也可以使用解构赋值

```js
	function add([x,y]){
        return x+y
    }

    console.log(add([1,2])) //3
```
上述代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y，对于函数内部的代码来讲，他们能感受到的参数是x和y，下面是另一个例子：

```js
    let n =[[1,2],[3,4]].map(([a,b])=>a+b)
    console.log(n) //[3,7]
```
函数参数的解构也可以使用默认值

```js
    function move({x=0,y=0} = {}){
        return [x,y]
    }
    let n = move({x:3,y:8})
    let m = move({x:3})
    let y = move({})
   let z = move()
    console.log(n)//[3,8]
    console.log(m) //[3,0]
    console.log(y) //[0,0]
    console.log(z) //[0,0]
```
上面代码中，函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值，如果解构失败，x和y等于默认值

```js
    function move({x,y}= {x:0,y:0}){
        return [x,y]
    }
    console.log(move({x:3,y:8})) //[3,8]
    console.log(move({x:3})) //[3,undefined]
    console.log(move({})) //[undefined,undefined]
    console.log(move())  //[0,0]
```
上述代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果

undefined会出发函数参数的默认值

```js
    let n = [1,undefined,3].map((x='yes')=>x)
    console.log(n) //[1, "yes", 3]
```

* 圆括号问题

不能使用圆括号的情况： 
	
（1）变量声明语句

```js
    let [(a)] = [1];
    let {x:(c)} ={};
    let ({x:c})= {}
    let {(x:c)} ={}
    let {(x):c} = {}
    let {o:({p:p})} = {o:{px:2}}
```
上述语句全部都会报错，因为他们都是变量声明语句，模式不能使用圆括号

（2）函数参数

函数参数也属于变量声明，因此不能带有圆括号

```js
  function f([(z)]){
        return z;
    }
    function f([z,(x)]){
        return x;
    }
```
（3）赋值语句的模式

```js
({ p: a }) = { p: 42 };
([a]) = [5];
[({ p: a }), { x: c }] = [{}, {}];
```

可以使用圆括号的情况

可以使用圆括号的情况只有一种，赋值语句的非模式部分，可以使用圆括号

```js
    [(b)] =[3]
    ({p:(d)} = {})
    [(parseInt.prop)] = [3]
```
上述语句都可以正常运行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行种，模式是取数组的第一个成员，和圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致

* 用途

	* 交换变量的值

	```js
	 let x = 1;
    let y = 2;
    [x,y] = [y,x] ;
    console.log(x + '------' +y)
	```
	注意上述代码必须带有分号，否则会报错，意为交换变量的值
	
	* 从函数返回多个值

	```js
    function example(){
    	return [1,2,3]
    }
    let [a,b,c] = example()
    console.log([a,b,c]) //[1,2,3]
    
    function example(){
        return {
            foo:1,
            bar :2
        }
    }
    let {foo,bar} = example()
    console.log({foo,bar}) //{foo: 1, bar: 2}
	```
	函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回，有了解构赋值，取出这些值就非常方便
	
	* 函数参数的定义

	```js
	//参数是一组有次序的值
	function f([x,y,z]){
        return x+y+z
    }
    f([1,2,3])
    
    //参数是一组无次序的值
    function f({x,y,z}){
        return x+y+z
    }
    f({z:3,y:2,x:1})
	```
	解构赋值可以方便的将一组参数与变量名对应起来
	
	* 提取JSON数据

	```js
	    let jsonData = {
        id:42,
        status:'OK',
        data:[867,5309]
    }
    let {id,status,data:number} = jsonData

    console.log(id,status,number) //42 'ok' [867,5309]
	```
	
	* 函数参数的默认值

	```js
	    jQuery.ajax = function (url,{
        async = true,
            beforeSend = function(){},
            cache = true,
            complete = function(){},
            crossDomain = false,
            global = true,
    } ={}){
        
    }
	```
	指定参数的默认值，就避免了在函数体内部再写var foo = config.foo ||'default foo';这样的语句
	
	* 遍历Map结构

	任何部署了Iterator接口的对象，都可以用for...of循环遍历，Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便
	
	```js
	 const map = new Map()
    map.set('first','hello');
    map.set('second','world');
    for (let [key,value] of map){
        console.log(key+' is ' + value)
    }
    //first is hello
    //second is world
	```
	如果只想获取键名，或者只想获取键值，可以写成下面这个样子
	
	```js
	    for(let [key] of map){
        console.log(key)
        //first
        //second
    }
    for(let [,value] of map){
        console.log(value)
        //hello
        //world
    }
	```
	第二个如果value前面没有逗号，打印的还是key的值
	
	* 输入模块的指定方法

	加载模块时，往往需要指定输入哪些方法，解构赋值使得输入语句非常清晰
	
	```js
	import {source} from '../protuype
	```
	
## 字符串的扩展

### 字符的Unicode表示法

JavaScript允许使用\uxxxx形式表示一个字符，其中xxxx表示字符的Unicode码点,这种表示法只限于码点在\u0000~\uFFFF之间的字符，超出这个范围的字符，必须用两个双字节的形式表示，ES6可以将码点放入大括号，就能正确解读该字符

### codePointAt()

ES6提供了codePointAt方法，能够正确处理4个字节存储的字符，返回一个字符的码点，返回的是码点的十进制值，如果想要十六进制的值可以用toString方法转换一下

###String.fromCodePoint()

ES5中提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符，String.fromCodePoint()方法弥补了这个方法的不足

### 字符串的遍历器接口

ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历，这个遍历器最大的优点是可以识别大于OxFFFF的码点，传统的for循环无法识别这样的码点

```js
let text = String.fromCodePoint(0x20BB7)
    for (let i=0;i<text.length;i++){
    console.log(text[i]) 
        //�
        //�
    }
    
      for (let i of text){
        console.log(i) //𠮷
    }
```
上述代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符(都不可打印)，而for...of循环会正确识出这一个字符

### at()

ES5对字符串对象提供charAt方法，返回字符串给定位置的字符，该方法不能识别码点大于0xFFFF的字符，用at方法，可以识别Unicode编号大于0xFFFF的字符，返回正确的字符

```js
    let n = 'abc'.charAt(0)
    let m = '𠮷'.charAt(0)
    console.log(n)  //a
    console.log(m) //�
    
       let n = 'abc'.at(0)
    let m = '𠮷'.at(0);
    console.log(n)  //a
    console.log(m) //𠮷
```
下面这个方法现在还不可以直接使用，如果要用需要垫片库

###normalize()

许多欧洲语言有语调符号和重音符号，为了表示她们，Unicode提供了两种直接提供带重音符号的字符，这两种字符在视觉和语义上都等价，但是js不能识别。ES6提供字符串实例等normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化

###includes(),startsWith(),endsWith()

传统上，javaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中，ES6又提供了三种新方法

* includes():返回布尔值，表示是否找到了参数字符串
* startsWith():返回布尔值，表示参数字符串是否在原字符串的头部
* endsWith():返回布尔值，表示参数字符串是否在原字符串的尾部

```js
	let s = 'Hello World'

    console.log(s.startsWith('Hello')) //true
    console.log(s.endsWith('World'))  //true
    console.log(s.includes('o'))  //true
```

这三个方法都支持第二个参数，表示开始搜索的位置

```js
 	let s = 'Hello world!'
    console.log(s.startsWith('world',6)) // true
    console.log(s.endsWith('Hello',5))  //true
    console.log(s.includes('Hello',6))  //false
```

上述代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同，它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束

### repeat()

repeat方法返回一个新字符串，表示将原字符串重复n次

```js
	let a = 'x'.repeat(3)
    console.log(a)  //'xx'
    let b = 'hello'.repeat(2)
    console.log(b)  //'hellohello'
    let c = 'na'.repeat(0)
    console.log(c) //''
```
参数如果是小数，则会被取整

```js
 	let a = 'na'.repeat(2.9)
    console.log(a)  //'nana'
```
如果repeat的参数是负数或者Infinity，则会报错。如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于-0，repeat视同为0。
参数NaN等同于0

### padStart(),padEnd()

如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全

```js
 	let c ='x'.padStart(5,'ab')
    console.log(c) //ababx
    let d = 'x'.padStart(4,'ab')
    console.log(d) //abax
    let x = 'x'.padEnd(5,'ab')
    console.log(x) //xabab
    let y = 'x'.padEnd(4,'ab')
    console.log(y) //xaba
```
一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串，如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串

```js
	let c = 'xxx'.padStart(2,'ab')
    console.log(c) //xxx
    let d = 'xxx'.padEnd(2,'ab')
    console.log(d) //xxx
```
如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串

```js
	let c = 'abc'.padStart(10,'0123456789')
    console.log(c) //0123456abc
```
如果省略第二个参数，默认使用空格补全长度

```js
	let c = 'x'.padStart(4)
    console.log(c) //'   x'
    let d = 'x'.padEnd(4)
    console.log(d) //'x   '
```
padStart的常见用途是为数值补全指定位数， 比如以下代码生成10位的数值字符串

```js
    let c = '12'.padStart(10,'0')
    console.log(c) //0000000012
    let d = '123456'.padStart(10,'0')
    console.log(d) //0000123456
```

### matchAll()

matchAll方法返回一个正则表达式在当前字符串的所有匹配，详见正则扩展

### 模版字符串

模版字符串是增强版的字符串，用反引号(`)标识，模版字符串中所有的空格和缩进都保留在输出之中，若模版字符串中嵌入变量，则需要将变量名写在${}中

```js
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());

function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      // 传统写法为
      // 'User '
      // + user.name
      // + ' is not authorized to do '
      // + action
      // + '.'
      `User ${user.name} is not authorized to do ${action}.`);
  }
}
```
大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性，模版字符串中还可以调用函数

```js
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"

function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
```
如果模版字符串中的变量没有声明，将报错。如果{}内是一个字符串，则会原样输出。模版字符串还可以嵌套

## 数值的扩展

### Math对象的扩展

* Math.trunc(),用于去除一个数的小数部分，返回整数部分

```js
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
```
对于非数值，Math.trunc内部使用Number方法将其先转为数值

```js
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
```
对于空值和无法截取整数的值，返回NaN

```js
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
```

* Math.sign(),用来判断一个数到底是正数，负数，还是零，对于非数值，会将其转化为数值。他会返回五种值：

-参数为正数，返回+1

-参数为负数，返回-1

-参数为0，返回0

-参数为-0，返回-0

-其他值，返回NaN

```js
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
```
如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN

```js
Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN
```

* Math.cbrt(),用于计算一个数的立方根

```js
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734
```
对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值

```js
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
```

* Math.imul(),返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号的整数

```js
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4
```

* Math.hypot(),方法返回所有参数的平方和的平方根

## 函数的扩展

* 函数参数的默认值

	ES6之前不能直接为函数的参数指定默认值，只能采用变通的方法，ES6允许为函数的参数设置默认值，可以直接写在参数定义的后面
	
	```js
	//Es5
		
		function log(x,y){
		    y = y || 'World'
		    console.log(x,y)
		}
		log('Hello') //Hello World
		log('Hello','China') //Hello China
		log('Hello','') //Hello World
		
	<!--Es6-->
	
	function log(x,y='World'){
	    console.log(x,y)
	}
	log('Hello') //Hello World
	log('Hello','China') //Hello China
	log('Hello','') //Hello 
	
	function Point(x=0,y=0){
	    this.x = x
	    this.y = y
	}
	const p = new Point()
	console.log(p) //{x: 0, y: 0}
	```
	
* 与解构赋值默认值结合使用

```js
function foo({x,y=5}){
    console.log(x,y)
}
foo({}) //undefined 5
foo({x:1}) //1 5
foo({x:1,y:2}) //1 2
foo() //报错
```
上述代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值，只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。如果函数foo调用时没提供参数，变量x和y就不会生成，所以会报错。通过提供函数参数的默认值，就可以避免这种情况

```js
function foo({x,y=5} = {}){
    console.log(x,y)
}
foo() //undefined 5
```

```js
function fetch(url,{body='',method='GET',headers={}}){
    console.log(method)
}
fetch('http://we',{}) //GET
fetch('http://we') //报错

function fetch(url,{body='',method='gET',header={}} = {}){
    console.log(method)
}
fetch('http://we') //gET
```

```js
function m1({x=0,y=0} = {}){
    console.log([x,y])
}

function m2({x,y} = {x:0,y:0}){
    console.log([x,y])
}

m1() //[0, 0]
m2() //[0, 0]

m1({x:3}) //[3, 0]
m2({x:3}) //[3, undefined]

m1({}) //[0, 0]
m2({}) //[undefined, undefined]

m1({z:3}) //[0, 0]
m2({z:3}) //[undefined, undefined]
```

* 参数默认值的位置

	通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的
	
* 函数的length属性

	指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数，即指定了默认值后，length属性将失真
	
	```js
	console.log((function (a){}).length) //1
	console.log((function(a=5){}).length)  //0
	console.log((function (a,b,c=5){}).length) //2
	```
	但如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数
	
	```js
	(function (a = 0, b, c) {}).length // 0
	(function (a, b = 1, c) {}).length // 1
	```
* 作用域

	一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
	
	```js
	var x = 1
	function f(x,y=x){
	    console.log(y)
	}
	f(2) //2
	```
	
	上述代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2
	
   ```js
   let x =1 ;
	function f(y=x){
	    let x =2 
	    console.log(y)
	}
	f() //1
   ```
   上面代码中，函数f调用时，参数y=x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。如果此时全局变量x不存在，就会报错
   
   ```js
   let foo = 'outer'
	function bar(func = () => foo) {
	    let foo ='inner'
	    console.log(func())
	}
	bar() //outer
   ```
   上述代码中，函数bar的参数func的默认值是一个匿名函数，返回值为变量foo。函数参数形成的单独作用域里面，并没有定义变量foo，所以foo指向外层的全局变量foo，因此输出outer
   
  	```js
  	var x =1
	function foo(x,y=function(){x=2}){
	    var x = 3
	    y()
	    console.log(x) 
	}
	foo() //3
	console.log(x) //1
  	```
  	函数foo的参数形成一个单独作用域。这个作用域里面，首先声明了变量x，然后声明了变量y，y的默认值是一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数。函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。
  	
  	如果将var x = 3 的var去除，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2，而外层的全局变量x依然不受影响
  	
  	```js
  	var x =1
	function foo(x,y=function(){x=2}){
	    x = 3
	    y()
	    console.log(x) 
	}
	foo() //2
	console.log(x) //1
  	```
 
* rest参数

	ES6引入rest参数，用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中
	
	```js
	function add(...values){
	    let sum =0
	    for(var val of values){
	        sum += val
	    }
	    console.log(sum) 
	}
	add(2,5,3) //10
	```
	需注意的是rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
	函数的length属性不包括rest参数
	
* 箭头函数

	

	
	

	





