## 变量类型和计算

* JS中使用typeof能得到哪些类型

	undefined;string;number;boolean;object;function;

* 何时使用=== 何时使用==

	```js
	if(obj.a == null){
		//这里相当于obj.a === null || obj.a ===undefined 的简写形式
		//这是jquery源码中推荐的写法
	}
	```
	
* JS中有哪些内置函数

	* Object
	* Array
	* Boolean
	* Number
	* String
	* Function
	* Date
	* RegExp（正则表达式）
	* Error
* JS变量按照存储方式区分为哪些类型，并描述其特点

	按照存储方式分为值类型和引用类型，值类型赋值后不会相互影响，引用类型赋值后会相互影响
	
* 如何理解JSON

	就是一个JS对象，Math也是JS内置对象

	```js
	JSON.stringify({a:10,b:20})
	JSON.parse('{"a":10,"b":20}')
	```

* **变量类型**

	* 值类型vs引用类型

	引用类型：对象、数组、函数

	```js
	<!--值类型-->
	var a = 20
	var b = a
	b = 100
	console.log(a) //20
	
	<!--引用类型-->
	var a = {age:20}
	var b = a
	b.age = 21
	console.log(a.age) //21
	
	var arr = [1,2,3]
	arr.age = 21
	console.log(arr) //[1,2,3,age:21]
	
	function fn(){}
	fn.age = 21
	var fn1 = fn
	fn1.age = 22
	console.log(fn.age) //22
	```
	* typeof运算符详解

	```js
	typeof undefined //undefined
	typeof 'abc' // string
	typeof 123 // number
	typeof true //boolean
	typeof {} //object
	typeof [] // object
	typeof null //object
	typeof console.log // function
	```
* **变量计算**

	* 强制类型转换

		* 字符串拼接

		```js
		100+10 //110
		100 + ‘10’ //10010
		```
		* ==运算符

		```js
		100 == '100'  //true
		0 == '' //true
		null == undefined //true
		```
		* if 语句

		```js
		if(100){
		console.log(100)
		}
		if(''){
		console.log(123)
		}
		```
		* 逻辑运算

		```js
		10 && 0 //0
		```
		* **用最简单的方式知道一个变量是true还是false**

		```js
		var a = 100
		!!a //true
		```
		
## 原型和原型链

* 如何准确判断一个变量是数组类型

	```js
	 var arr = []
    console.log(arr instanceof Array,11)  //true 11
    console.log(typeof arr,12) //object 12
    ```
    
* 写一个原型链继承的例子

	```js
	<!--最基础的-->
    function Animal(){
        this.eat = function(){
            console.log('animal eat')
        }
    }
    function Dog(){
        this.bark = function(){
            console.log('dog bark')
        }
    }
    Dog.prototype = new Animal()
    var dog = new Dog()
    
    <!--封装DOM查询的例子-->
    function Elem(id){
        this.elem = document.getElementById(id)
    }


    Elem.prototype.html = function(val){
        var elem = this.elem
        if(val){
            elem.innerHTML = val
            return this //链式操作 为了下面的可以连续操作 returnthis，如果不return则不可以进行链式操作
        }else{
            return elem.innerHTML
        }
    }

    Elem.prototype.on = function(type,fn){
        var elem = this.elem
        elem.addEventListener(type,fn)
    }
    var div1 = new Elem('abTest')
    console.log(div1.html())
    // div1.html('<p>hello fengyingxiao</p>')
    // div1.on('click',function(){
    //     alert('成功了')
    // })
    //下面就是链式操作
    div1.html('<p>hello fengyingxiao</p>').on('click',function(){
        alert('chenggongle')
    })

	```
	
* 描述new一个对象的过程

	* 创建一个新对象
	* this指向这个新对象
	* 执行代码，即对this赋值
	* 返回this
* zepto或其他框架源码中如何使用原型链

	* 阅读源码可以高效提高技能的方式
	* **慕课网搜索“zepto设计和源码分析”（免费的，两三个小时）**
	

* **构造函数**

	```js
	    function Foo(name,age){
	        this.name = name
	        this.age = age
	        this.class = 'class-1'
	        // return this //默认有这一行
	    }
	    var f = new Foo('zhangsan',20)
	```
* **构造函数-扩展**

	* var a = {} 其实是var a = new Object()的语法糖
	* var a = []其实是var a = new Array()的语法糖
	* function Foo(){...}其实是var Foo = new Function(...)
	* 使用instanceof判断一个函数是否是一个变量的构造函数；**判断一个变量是否为数组，instanceof Array**
* **原型规则和示例**

	5条原型规则，原型规则是学习原型链的基础
	
	* 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（除了“null‘意外，下面的几条也除去null；null虽然是object，但是什么都没有）
	* 所有引用类型，都有一个__proto__属性（隐式原型属性），属性值是一个普通的对象
	* 所有的函数，都有一个prototype属性（显式原型属性），属性值也是一个普通的对象
	* 所有的引用类型，__proto__属性指向它的构造函数的“prototype”属性值（即完全等于）
	* 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么回去它的__proto__（即它的构造函数的prototype）中寻找

	```js
	 	 var obj = {};obj.a = 100;
        var arr = [];arr.a = 100;
        function fn(){}
        fn.a = 100;
        console.log(obj.__proto__)
        console.log(arr.__proto__)
        console.log(fn.__proto__) //ƒ () { [native code] }
        console.log(fn.prototype) //{constructor: ƒ}
        console.log(obj.prototype) //undefined
        console.log(arr.prototype) //undefined
        console.log(obj.__proto__ ===obj.prototype) // false
        console.log(obj.__proto__ ===Object.prototype) // true

        //构造函数
        function Foo(name,age){
            this.name = name
        }
        Foo.prototype.alertName = function(){
            alert(this.name)
        }
        //创建示例
        var f = new Foo('zhangsan')
        f.printName = function(){
            console.log(this.name)
        }

        f.printName()
        f.alertName()
        
        var item;
        for(item in f){
        //    高级浏览器已经在forin中屏蔽了来自原型的属性
        //    但在这里建议加上下面的判断，保证程序的健壮性
            if(f.hasOwnProperty(item)){
                console.log(item) // name printName
            }
        }
	```
* **原型链**

	```js
	//构造函数
        function Foo(name,age){
            this.name = name
        }
        Foo.prototype.alertName = function(){
            alert(this.name)
        }
        //创建示例
        var f = new Foo('zhangsan')
        f.printName = function(){
            console.log(this.name)
        }

        f.printName()
        f.alertName()
        f.toString() //要去f.__proto__.__proto__中查找
	```
* **instanceof**

	用于判断引用类型属于哪个构造函数的方法
	
	* f instanceof Foo的判断逻辑是：
	* f的__proto__一层一层往上，能否对应到Foo.prototype
	* 再试着判断 f instanceof Object

## 作用域和闭包

```js
fn()//不会报错
function fn(){
//    声明
}
    
fn1() //会报错，因为fn1还没有出来
var fn1 = function(){
//    函数表达式
}

console.log(a) //undefined
var a = 100

fn2('zhangsan')
function fn2(name){
    age = 20
    console.log(name,age) //zhangsan 20
    var age
    bar(100)
    function bar(num){
        console.log(num) //100
    }
}
```

* 说一下对变量提升的理解

	* 变量定义
	* 函数声明（注意和函数表达式的区别）
* 说明this几种不同的使用场景

	* 作为构造函数执行
	* 作为对象属性执行
	* 作为普通函数执行
	* call apply bind
* 创建10个<a></a>标签，点击的时候弹出来对应的序号

	```js
   // var i,a
	// for(i=0;i<10;i++){
	//     a = document.createElement('a')
	//     a.innerHTML = i + '<br>'
	//     a.addEventListener('click',function(e){
	//         e.preventDefault()
	//         alert(i) //自由变量，要去父作用域取值 所以弹出的一直为10
	//     })
	//     document.body.appendChild(a)
	// }
	
	var i,a
	for(i=0;i<10;i++){
	    (function(i){
	        a = document.createElement('a')
	        a.innerHTML = i + '<br>'
	        a.addEventListener('click',function(e){
	            e.preventDefault()
	            alert(i)//自由变量，要去父作用域取值 所以弹出的会是 0 1 2 3 4...
	        })
	        document.body.appendChild(a)
	    }(i))
	
	}
	```
* 如何理解作用域

	* 自由变量
	* 作用域链，即自由变量的查找
	* 闭包的两个场景
* 实际开发中闭包的应用

	* 封装变量，收敛权限

	```js
    function isFirstLoad() {
        var _list = [] //变量前面如果加下划线，则代表是私有变量 不给别人用的
        return function(id){
            if(_list.indexOf(id)>=0){
                console.log(false)
                return false
            }else{
                _list.push(id)
                console.log(true)
                return true
            }
        }
    }
    var firstLoad = isFirstLoad()
    firstLoad(10) //true
    firstLoad(10) //false
    firstLoad(20) //true
    firstLoad(20) //false
	```

* **执行上下文**

	* 范围：一段全局或者一个函数
	* 全局：变量定义，函数声明
	* 函数：变量定义，函数声明、this、arguments
	* **一定要注意函数声明和函数表达式的区别**

	```js
	console.log(a) //undefined
	var a = 100
	
	fn2('zhangsan')
	function fn2(name){
	    age = 20
	    console.log(name,age) //zhangsan 20
	    var age
	    bar(100)
	    function bar(num){
	        console.log(num) //100
	    }
	}

	```
	
* **this**

	* this要在执行时才能确认值，定义时无法确认

	```js
	var a = {
        name:'A',
        fn:function(){
            console.log(this)
            console.log(this.name)
        }
    }
    a.fn() //{name: "A", fn: ƒ} A
    a.fn.call({name:'B'}) //{name: "B"} B
    var fn1 = a.fn
    fn1() //this此时指向的是window this===window
	```
	* 作为构造函数执行
	* 作为对象属性执行
	* 作为普通函数执行
	* call apply bind
* **作用域**

	* js没有块级作用域
	* 只有函数和全局作用域

	```js
  //无块级作用域
    if(true){
        var name = 'zhangsan'
    }
    console.log(name) //zhangsan

    //函数和全局作用域
    var a = 100
    function fn(){
        var a = 200
        console.log('fn',a) //fn 200
    }
    console.log('global',a) //global 100
    fn()
	```
* **作用域链**

	```js
	var a = 100
	function fn(){
	var b =200
	//当前作用域没有定义的变量，即'自由变量',a是自由变量；
	console.log(a) //100
	console.log(b) //200
	}
	fn()
	```
* **闭包**

	* 函数作为返回值

		```js
		function F1(){
		    var a = 100
		
		    return function(){
		        console.log(a)//自由变量，去父作用域中去寻找
		    }
		}
		
		var f1 = F1()
		var a = 200
		f1() //100
		```
	* 函数作为参数传递

		```js
		function F1(){
			var a = 100
			
			return function(){
			    console.log(a) //自由变量，去父作用域中去寻找
			}
		}
	
		var f1 = F1()
		function F2(fn){
		    var a = 200
		    fn()
		}
		F2(f1) //100
		```
		
## 其他知识

* 获取2017-06-10格式的日期

	```js
    function formatDate(dt){
	    if(!dt){
	        dt = new Date()
	    }
	    var year = dt.getFullYear()
	    var month = dt.getMonth()+1
	    var date = dt.getDate()
	    if(month <10){
	        month = '0'+month
	    }
	    if(date<10){
	        date = '0'+date
	    }
	    return year + '-' + month + '-' + date
	}
	var dt = new Date()
	var formatDate = formatDate(dt)
	console.log(formatDate) //2019-03-11
	```
* 获取随机数，要求是长度一致的字符串格式

	```js
    var random = Math.random()
    random = random + '0000000000'
    random = random.slice(0,10)
    console.log(random)
	```
* 写一个能遍历对象和数组的通用forEach函数

	```js
    var arr = [1,2,3]
    forEach(arr,function(index,item){
        console.log(index,item)
    })

    var obj = {x:100,y:200}
    forEach(obj,function(key,value){
        console.log(key,value)
    })

    function forEach(obj,fn){
        var key
        if(obj instanceof Array){
        //    判断是否是数组
            obj.forEach(function(item,index){
                fn(index,item)
            })
        }else{
            for(key in obj){
                fn(key,obj[key])
            }
        }
    }
	```

* **日期**

	```js
	Date.now() //获取当前时间的毫秒数
	var  dt = new Date()
	dt.getTime() //获取毫秒数
	dt.getFullYear() //年
	dt.getMonth() //月
	dt.getDate() //日
	dt.getHours() //小时
	dt.getMinutes() //分钟
	dt.getSeconds() //秒
	```
* **Math**

	* 获取随机数 Math.random()
	
* **数组API**

	* forEach 遍历所有元素

		```js
		 var arr =[1,2,3]
	    arr.forEach(function(item,index){
	        //遍历数组的所有元素
	        console.log(index,item)
	    })
		```
	* every 判断所有元素是否都符合条件

		```js
		  var arr = [1,2,3,4,5]
        var result = arr.every(function(item,index){
            //用来判断所有的数组元素，都满足一个条件
            if(item<4){
                return true
            }
        })
        console.log(result,254) //false
		```
	* some 判断是否有至少一个元素符合条件

		```js
		 var arr = [1,2,3]
        var result = arr.some(function(item,index){
            // 用来判断所有的数组元素，只要有一个满足条件即可
            if(item<2){
                return true
            }
        })
        console.log(result) //true
		```
	* sort 排序

		```js
		  var arr = [1,4,3,2,5]
        var arr2 = arr.sort(function(a,b){
            //从小到大排序
            return a-b

            //从大到小排序
            //return b-a
        })
        console.log(arr2) //[1, 2, 3, 4, 5]
		```
	* map 对元素重新组装，生成新数组

		```js
		 var arr = [1,2,3,4]
        var arr2 = arr.map(function(item,index){
            return item+1
        })
        console.log(arr2) //[2, 3, 4, 5]
		```
	* filter过滤符合条件的元素

		```js
		  var arr = [1,2,3]
        var arr2 = arr.filter(function(item,index){
            //通过某个条件过滤数组
            if(item>=2){
                return true
            }
        })
        console.log(arr2) //[2, 3]
		```
* **对象API**

	```js
    var obj = {
	    x:100,
	    y:200,
	    z:300
    }
    var key
    for(key in obj){
        if(obj.hasOwnProperty(key)){
            console.log(key,obj[key]) //x 100  y 200  z 300
        }
    }
	```
	
## JS-Web-API

常说的Js（浏览器执行的JS）包含两部分：

* JS基础知识：ECMA 262标准
* JS-Web_API：W3C标准


## 事件绑定

* 编写一个通用的事件监听函数

	```js
	        //事件的完善封装
    function bindEvent(elem,type,selector,fn){
        //下面这个判断是如果selector没有的情况
        if(fn == null){
            fn = selector
            selector = null
        }
        elem.addEventListener(type,function(e){
            var target
            if(selector){
                //代理
                target = e.target
                if(target.matches(selector)){
                    fn.call(target,e)
                }
            }else{
            //    不是代理
                fn(e)

            }
        })

    }
	```
* 描述事件冒泡流程

	* DOM树形结构
	* 事件冒泡
	* 阻止冒泡
	* 冒泡的应用 就是代理
* 对于一个无限下拉加载图片的页面，如何给每个图片绑定页面

	* 使用代理

* **通用事件绑定**

	* 关于IE低版本的兼容性

		* IE低版本使用attachEvent绑定事件，和W3C标准不一样
		* IE低版本使用量已经非常少，很多网站早已不支持
		* 建议对IE低版本的兼容性：了解即可，无需深究

	```js
	 var btn = document.getElementById('btn1')
    btn.addEventListener('click',function(event){
        console.log('clicked')
    })

    function bindEvent(elem,type,fn){
        elem.addEventListener(type,fn)
    }
    var a = document.getElementById('link1')
    bindEvent(a,'click',function(e){
        e.preventDefault() //阻止默认行为 因为a是链接，所以一点击就会跳转，现在不让他跳转
        alert('clicked')
    })
	```
* **事件冒泡**
* **代理**

	* 代理的好处：

		* 代码简介
		* 减少浏览器的运算量

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="div1">
        <a href="http://imooc.com" id ='link3'>imooc.com</a>
        <a href="http://imooc.com" id ='link2'>imooc.com</a>
        <a href="http://imooc.com" id ='link1'>imooc.com</a>
        <a href="http://imooc.com" id ='link4'>imooc.com</a>
        <p id="p1">激活</p>
        <p id="p2">取消</p>
    </div>
    <div id="div2">
        <p id="p3">取消</p>
        <p id="p4">取消</p>

    </div>
    <script type="text/javascript">

        // var p1 = document.getElementById('p1')
        // p1.addEventListener('click',function(){
        //     alert(123)
        // })
        // var link1 = document.getElementById('link1')
        // link1.addEventListener('click',function(e){
        //     e.preventDefault() //阻止了浏览器的默认行为
        //     alert('阻止默认事件') //这样就会只有alert出来 不会跳转页面
        // })

        //事件的简单封装
        // function bindEvent(elem,type,fn){
        //     elem.addEventListener(type,fn)
        // }

        // var p1 = document.getElementById('p1')
        // bindEvent(p1,'click',function(){
        //     alert(123)
        // })
        // var link1 = document.getElementById('link1')
        // bindEvent(link1,'click',function(e){
        //     e.preventDefault()
        //     alert('阻止默认事件')
        // })

        //冒泡事件
        // var p1 = document.getElementById('p1')
        // bindEvent(p1,'click',function(e){
        //     e.stopPropagation() //阻止冒泡
        //     alert('激活')
        // })
        // var body = document.body
        // bindEvent(body,'click',function(e){
        //     alert('取消')
        // })

        // 事件代理
        // var div1 = document.getElementById('div1')
        // bindEvent(div1,'click',function(e){
        //     e.preventDefault()
        //     console.log(e.target)
        //     var target = e.target
        //     if(target.nodeName === 'A'){
        //         console.log('不是a标签')
        //     }
        // })

        //事件的完善封装
        function bindEvent(elem,type,selector,fn){
            //下面这个判断是如果selector没有的情况
            if(fn == null){
                fn = selector
                selector = null
            }
            elem.addEventListener(type,function(e){
                var target
                if(selector){
                    //代理
                    target = e.target
                    if(target.matches(selector)){
                        fn.call(target,e)
                    }
                }else{
                //    不是代理
                    fn(e)

                }
            })

        }
        var div1 = document.getElementById('div1')
        bindEvent(div1,'click','a',function (e) {
            e.preventDefault()
            console.log(this.innerHTML) //imooc.com
        })
        var p1 = document.getElementById('p1')
        bindEvent(p1,'click',function(e){
            console.log(p1.innerHTML)
        })
    </script>

</body>
</html>
```

## Ajax

* 手动编写一个ajax，不依赖第三方库
* 跨域的几种实现方式


* **XMLHttpRequest**

	* IE低版本使用ActiveXObject，和W3C标准不一样

	```js
    var xhr = new XMLHttpRequest()
    xhr.open('GET','/api',false) //通过get方式打开api这个地址

    xhr.onreadystatechange = function(){//相当于监听 
        //这里的函数异步执行
        if(xhr.readyState == 4){
            //说明已经完成
            if(xhr.status == 200){
                //status是200 则返回成功
                alert(xhr.responseText)
            }
        }
    }
    xhr.send(null)
	```
* **状态码说明**

	* readyState

		* 0-（未初始化） 还没有调用send（）方法
		* 1-（载入）已调用send（）方法，正在发送请求
		* 2-（载入完成）send方法执行完成，已经接收到全部响应内容
		* 3-（交互）正在解析响应内容
		* 4-（完成）响应内容解析完成，可以在客户端调用了

	* status

		* 2xx -表示成功处理请求。如200，201等
		* 3xx-需要重定向，浏览器直接跳转
		* 4xx-客户端请求错误，如404
		* 5xx-服务器端错误
* **跨域**

	* 什么是跨域

		* 浏览器有同源策略，不允许ajax访问其他域接口
		* http://www.yourname.com/page1.html yourname是域名
		* 跨域条件：协议，域名，端口，有一个不同就算跨域

	* 可以跨域的三个标签

		* img标签 但有一些网站做了图片防链接处理 就不能用
		* link标签
		* script标签
	* 三个标签的场景

		* img标签用于打点统计，统计网站可能是其他域
		* link标签 script标签可以使用CDN，CDN的也是其他域，比如BootCDN
		* script标签可以用于JSONP

	* 跨域注意事项
	
		* 所有的跨域请求都必须经过信息提供方允许
		* 如果未经允许即可获取，那都是浏览器同源策略出现漏洞
	* JSONP

		* 加载http://coding.m.imooc.com/classindex.html
		* 不一定服务器端真正有一个classindex.html文件
		* 服务器可以根据请求，动态生成一个文件，返回
		* 同理于script标签
	* 服务器设置http header

		* 另外一个解决跨域的简洁方法，需要服务器端来做

## 存储

* 请描述一下cookie，sessionStorage和localStorage的区别

	* 容量
	* 是否携带到服务器通信中
	* API的应用

* **cookie**

	* 本来用于客户端和服务器端通信
	* 但是他有本地存储的功能，于是就被借用
	* 使用document.cookie = ...获取和修改
	* cookie用于存储的缺点

		* 存储量太小，只有4kb
		* 所有http请求都带着，会影响获取资源的xiaolv
		* API简单，需要封装才能用document.cookie=...

* **localStorage和sessionStorage**

	* html5专门为存储设计，最大容量5M
	* API简单易用
	* localStorage.setItem(key,value);localStorage.getItem(key)
	* ios safari隐藏模式下，localStorage.getItem会报错，建议用try catch包起来

## 关于开发环境

* IDE（写代码的效率）（就是写代码的工具）必须要有插件

	* webstorm插件
* git（代码版本管理，多人协作开发）

	* git和linux是一个作者
	* 常用Git命令
	
       * git status
		* git add .
		* git checkout xxx
		* git commit -m "xxx"
		* git push origin master (master是分支名，如果dev是分支名，则就是git push origin dev)
		* git pull origin master
		* git branch (查看分支)
		* git checkout -b xxx(创建新分支) /git checkout xxx(转换到已有的分支)
		* git merge xxx (合并分支)（在master分支上，git merge dev,就是将dev分支合并到master分支上）
* JS模块化

	* 不使用模块化的情况

		* 全局变量会污染
		* 加载顺序决定着是否可以引用成功
	* 使用模块化
	* AMD 

		* require.js
		* 全局define函数
		* 全局require函数
		* 依赖JS会自动，异步加载

		```js
		<!--require.html-->
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <title>requireJSAMDddd</title>
		</head>
		<body>
		    <p>AMD Test</p>
		    <script data-main="./main.js" src="https://cdn.bootcss.com/require.js/2.3.3/require.min.js"></script>
		</body>
		</html>
		
		<!--main.js-->
		require(['./a.js'],function(a){
		    var date = new Date()
		    console.log('1111')
		     a.printDate(date)
		})
		
		<!--a.js-->
		define(['./a-util.js'],function(aUtil){
		    var a = {
		        printDate:function(date){
		            console.log(aUtil.aGetFormatDate(date))
		        }
		    }
		    return a
		})
		
		<!--a-util.js-->
		define(['./util.js'],function(util){
		    var aUtil = {
		        aGetFormatDate:function(date){
		            return util.getFormatDate(date,2)
		        }
		    }
		    return aUtil
		})
		
		<!--util.js-->
		define(function (){
		    var util = {
		        getFormatDate: function(date,type){
		            if(type === 1){
		                return '2017-09-90'
		            }
		            if(type ===2){
		                return '2017年'
		            }
		        }
		    }
		    return util
		})
		```
	* CommonJS

		* nodejs模块化规范，现在被大量用于前端，原因：
		* 前端开发依赖的插件和库，都可以从npm中获取
		* 构建工具的高度自动化，使得使用npm的成本非常低
		* CommonJs不会异步加载JS，而是同步一次性加载出来；CommonJS设置以后也可以使用异步

	* AMD和CommonJS的使用场景

		* 需要异步加载JS，使用AMD
		* 使用了npm以后建议使用CommonJS

		
* 打包工具

	* **webpack**

		* 在目录下 npm init,然后目录下就会出现一个package.json
		* npm install webpack --save-dev (**save意思是保存起来，dev是只用于开发环境**)
		* npm i jquery --save
		* npm uninstall xxx (卸载安装的某个环境)
		* 代码压缩：在webpack.config.js里面增加一个plugin，可以去官网查

		具体详细代码可以看learning/webpack这个文件夹

		```js
		<!--webpack.config.js-->
		var path = require('path')
		var webpack = require('webpack')
		
		module.exports = {
		    context: path.resolve(__dirname,'./src'), //要去解决找到一个src的文件
		    entry:{
		        app:'./app.js' //入口是app。js
		    },
		    output:{
		        path:path.resolve(__dirname,'./dist') ,//输出到dist目录
		        filename:'bundle.js'
		    },
		    plugins:[
		        new webpack.optimize.UglifyJsPlugin()
		    ]
		}
		```
* 上线回滚的流程

	
	* 上线和回滚的基本流程

		* 由专门的工具或者系统完成，无需关心细节
		* 将当前服务器的代码全部打包并记录版本号，备份
		* 将新代码提交覆盖到线上服务器，产生新的版本号
		* 如果出现问题 则将最新的版本号打包备份，将上一个版本解压，覆盖到线上服务器，并产生新的版本号
	* linux基本命令

		* 服务器使用linux居多，server版，只有命令行
		* 测试环境要匹配线上环境，因此也是linux

		* ssh name@server 首先要去登陆账号
		* mkdir a (创建a文件夹)
		* ls 来看a下面的文件名字
		* ll 是看a下面的文件
		* pwd 是看当前文件的目录
		* cd ../ 返回上一级目录
		* rm -rf a (删除a文件夹)
		* cp a.js a1.js 拷贝一个js
		* mv a1.js src/a1.js 移动a1.js到src里面去
		* rm a.js 删除一个文件
		* vi编辑器

			* vim a.js(创建a.js,并且在命令行中编辑；或者是vi a.js)
			* 然后在命令行中输入i，这样就可以在a.js里面随意写东西了
			* 写完 点击esc，这样就不能写了，然后:wq保存并退出，如果只是保存就:w,如果只是退出就:q
			* cat a.js可以在命令行中查看a.js的内容
			* tail a.js是查看文件的尾部
			* head a.js是查看文件的头部
			* head -n 1 a.js 查看a.js的第一行
			* tail -n 2 a.js 查看a.js的后两行
			* grep '2' a.js 是在a.js里面搜索2

## 关于运行环境

* **页面加载过程**

	* 从输入url到得到html的详细过程
	* window.onload和DOMContentLoaded的区别

		```js
		window.addEventListener('load',function(){
			//页面的全部资源加载完才会执行，包括图片，视频等
		})
		document.addEventListener('DOMContentLoaded',function(){
			//DOM 渲染完即可执行，此时图片、视频还可能没有加载完
		})
		```

	
	* **加载资源的形式**

		* 输入url或跳转页面加载html
		* 加载html中的静态资源 ，比如script标签引入的js
	* 加载一个资源的过程

		* 浏览器根据DNS服务器得到域名的IP地址
		* 向这个IP的机器发送http请求
		* 服务器收到、处理并返回http请求
		* 浏览器得到返回内容
	* 浏览器渲染页面的过程

		* 根据HTML结构生成DOM Tree
		* 根据CSS生成CSSOM
		* 将DOM和CSSOM整合形成RenderTree
		* 根据RenderTree开始渲染和展示
		* 遇到script时，会执行并阻塞渲染

		* 为何把css放在head中？因为浏览器可以先去知道css规则，渲染完以后后面的dom结构就可以按规则去渲染
		* 为何把script放到body的即将结束的位置？这样不会阻塞上面的结构的渲染，可以让页面更快的出来。
		
* **性能优化**

	* 多使用内存、缓存或者其他方法
	* 减少CPU计算、减少网络请求
	* 从哪里入手

		* 加载页面和静态资源

			* 静态资源的压缩合并
			* 静态资源缓存
			* 使用CDN让资源加载更快，因为CDN是不同区域的一个
			* 使用SSR后端渲染，数据直接输出到html中
		* 页面渲染

			* CSS放前面，JS放后面
			* 懒加载（图片懒加载，下拉加载更多）

				```js
				<img id = "img1" src="preview.png" data-realsrc="abc.png" />
			    <script>
			        var img1 = document.getElementById('img1')
			        img1.src = img1.getAttribute('data-realsrc')
			    </script>
				```
			* 减少DOM查询，对DOM查询做缓存
			* 减少DOM操作，多个操作尽量合并在一起执行
			* 事件节流

				```js
				var textarea = document.getElementById('textarea')
		        var timeoutId
		        textarea.addEventListener('keyup',function(){
		            if(timeoutId){
		                clearTimeout(timeoutId)
		            }
		            timeoutId = setTimeout(function(){
		                //触发change事件
		            },100)
		        })
				```
			* 尽早执行操作  
* **安全性**

	* 场景的前端安全问题有哪些

	
		* Xss跨站请求攻击

			* 比如在某某博客写一篇文章，同时偷偷插入一段script代码
			* 攻击代码中，获取cookie（自己的账户信息），发送自己的服务器
			* 有人查看博客内容，就会把查看者的cookie发送到攻击者的服务器

			* **前端替换关键字，例如替换<为&lt等；但更建议后端替换**
			
		* XSRF跨站请求伪造

			* 你已登陆一个购物网站，正在浏览商品
			* 该网站付费接口是xxx.com/pay?id=100,但是没有任何验证
			* 然后你收到一封邮件，隐藏着img src=xxx.com/pay?id=100
			* 你查看邮件的时候，就已经悄悄的付费购买了

			* 解决方法：增加验证流程，如输入指纹，密码，短信验证码等