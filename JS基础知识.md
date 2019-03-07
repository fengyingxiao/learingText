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
* 说明this几种不同的使用场景
* 创建10个<a></a>标签，点击的时候弹出来对应的序号
* 如何理解作用域
* 实际开发中闭包的应用

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
* **作用域链**
* **闭包**
