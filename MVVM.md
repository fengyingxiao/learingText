# MVVM

* 说一下使用jQuery和使用框架的区别

	* jQuery实现todo-list

	```js
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div>
        <input type="text" name="" id="txt-title" />
        <button id="btn-submit">submit</button>
    </div>
    <div>
        <ul id="ul-list"></ul>
    </div>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript">
        var $txtTitle = $('#txt-title')
        var $btnSubmit = $('#btn-submit')
        var $ulList = $('#ul-list')
        $btnSubmit.click(function(){
            var title = $txtTitle.val()
            if(!title){
                return
            }
            var $li = $('<li>'+title+'</li>')
            $ulList.append($li)
            $txtTitle.val('')
        })
    </script>
</body>
</html>
	```
	
	* vue实现todo-list

	```js
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <div>
            <input v-model="title" />
            <button v-on:click="add">submit</button>
        </div>
        <div>
            <ul>
                <li v-for="item in list">{{item}}</li>
            </ul>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script type="text/javascript">
        var vm = new Vue({
            el:'#app',
            data:{
                title:'',
                list:[]
            },
            methods:{
                add:function(){
                    if(this.title != ''){
                        this.list.push(this.title)
                        this.title= ''
                    }
                }
            }
        })
    </script>
</body>
</html>
	```
	
	* jQuery和框架的区别

		* 数据和视图的分离，解耦（开放封闭原则）
		* 以数据驱动视图，只关心数据变化，DOM操作被封装
		

* 说一下对MVVM的理解

	* MVC（用户从View到Controller到Model，Model到View；或者用户直接到controller到Model，Model到View）
	* MVVM（Model，View，ViewModel），不算是一种创新，但是ViewModel算是一个创新
	* 关于ViewModel（链接View和Model的）

* vue中如何实现响应式

	* 什么是响应式

		* 修改data属性之后，vue立刻监听到
		* data属性被代理到vm上
	
	* Object.defineProperty

		```js
		<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>   
</head>
<body>
    <div id="app">
        <p>Object.defineProperty</p>
    </div>
    <script type="text/javascript">
        var obj = {}
        var _name = 'zhangsan'
        Object.defineProperty(obj,'name',{
            get:function(){
                console.log('get',_name) //监听
                return _name
            },
            set:function(newVal){
                console.log('set',newVal) //监听
                _name = newVal
            }
        })
    </script>
</body>
</html>
		```
	* 模拟怎么实现的

	```js
	 // var vm = new Vue({
        //     el:'#app',
        //     data:{
        //         name:'zhangsan',
        //         age:'20'
        //     }
        // })
        
        var vm = {}
        var data = {
            name:'zhangsan',
            age:20
        }
        var key,value
        for(key in data){
            (function(key){
                Object.defineProperty(vm,key,{
                    get:function(){
                        console.log('get',data[key])
                        return data[key]
                    },
                    set:function(newVal){
                        console.log('set',newVal)
                        data[key] = newVal
                    }
                })
            })(key)
        }
	```

* vue中如何解析模版

	* 模版是什么
		* 本质：字符串
		* 有逻辑，如v-if v-for等
		* 与html格式很像，但是有很大区别
		* 最终还是要转换为html来显示
		* 模版最终必须转化成JS代码，因为：
		* 有逻辑（v-if v-for），必须用JS才能实现（图灵完备）
		* 转换为html渲染页面，必须用JS才能实现
		* 因此，模版最重要转换成一个JS函数（render函数）
	
	* render函数

		* render函数-with的用法（实际开发中with尽量不要用；with会给开发排查错误带来很多成本；vue内部使用了with不要紧）

		```js
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <title>Title</title>
		</head>
		<body>
		    <p>test</p>
		
		    <script type="text/javascript">
		        var obj ={
		            name:'zhangsan',
		            age:20,
		            getAddress:function(){
		                alert('BEIJING')
		            }
		        }
		        // function fn(){
		        //     alert(obj.name)
		        //     alert(obj.age)
		        //     obj.getAddress()
		        // }
		        // fn()
		        function fn1(){
		            with(obj){
		                alert(name)
		                alert(age)
		                getAddress()
		            }
		        }
		        fn1()
		    </script>
		
		</body>
		</html>
		```
		
	* render函数与vdom

		* updateComponent中实现了vdom的patch
		* 页面首次渲染执行updateComponent
		* data中每次修改属性，执行updateComponent

		```js
		<!DOCTYPE html>
		<html lang="en">
		<head>
		    <meta charset="UTF-8">
		    <title>Title</title>
		    <script src="./vue-2.5.13.js"></script>
		</head>
		<body>
		    <div id="app">
		        <p>{{price}}</p>
		    </div>
		
		    <script>
		        var vm = new Vue({
		            el:'#app',
		            data:{
		                price:100
		            }
		        })
		    //    以下是手写的ppt中的render函数
		        function render(){
		            with(this){ //this就是vm
		                return _c(
		                    'div',
		                    {
		                        attrs:{'id':'app'}
		                    },
		                    [
		                        _c('p',[_v(_s(price))])
		                    ]
		                )
		            }
		        }
		        function render1(){
		            return vm._c(
		                'div',
		                {
		                  attrs:{'id':'app'},
		                }
		                [
		                    vm._c('p',[vm._v(vm._s(vm.price))])
		                ]
		            )
		        }
		    //    vm._cj
		    //     ƒ (a, b, c, d) { return createElement(vm, a, b, c, d, false); }
		    //     vm._v
		    //     ƒ createTextVNode (val) {
		    //         return new VNode(undefined, undefined, undefined, String(val))
		    //     }
		    //     vm._s
		    //     ƒ toString (val) {
		    //         return val == null
		    //             ? ''
		    //             : typeof val === 'object'
		    //                 ? JSON.stringify(val, null, 2)
		    //                 : String(val)
		    //     }
		    //     vm.price
		    //     100
		    </script>
		</body>
		</html>
		```

		* 模版中所有信息都包含在了render函数中
		* this即vm
		* price即this.price即vm.price，即data中的price
		* _c即this._c即vm._c

	* v-model是双向数据绑定
	* 模版：字符串，有逻辑，嵌入JS变量
	* 模版必须转换为JS代码（有逻辑、渲染html、JS变量）
	* render函数是什么样子的
	* render函数执行是返回vnode
	* updateComponent	

* vue的整个实现流程

	* 第一步：解析模版成render函数

		* with的用法
		* 模版中的所有信息都被render函数包含
		* 模版中用到的data中的属性，都变成了JS变量
		* 模版中的v-model v-for v-on都变成了Js逻辑
		* render函数返回vnode

	```js
	with(this){ //this就是vm
    return _c(
        'div',
        {
            attrs:{"id":"app"}
        },
        [_c(
            'div',
            [
                _c(
                    'input',
                    {
                        directives:[
                            {
                                name:"model",
                                rawName:"v-model",
                                value:(title),
                                expression:"title"
                            }],domProps:{"value":(title)},on:{"input":function($event){if($event.target.composing)return;title=$event.target.value}}}),_v(" "),_c('button',{on:{"click":add}},[_v("submit")])]),_v(" "),_c('div',[_c('ul',_l((list),function(item){return _c('li',[_v(_s(item))])}))])])}

	```	
	
	* 第二步：响应式开始监听

		* Object.defineProperty
		* 将data的属性代理到vm上
		
		
	* 第三步：首次渲染，显示页面，且绑定依赖

		* 初次渲染，执行updateComponent，执行vm._render()
		* 执行render函数，会访问到vm.list和vm.title
		* 会被响应式的get方法监听到
		* 执行updateComponent，会走到vdom的patch方法
		* patch将vnode渲染成DOM，初次渲染完成
	* 第四步：data属性变化，触发rerender

		* 修改属性，被响应式的set监听到
		* set中执行updateComponent
		* updateComponent重新执行vm._render()
		* 生成的vnode和prevVnode，通过patch进行对比
		* 渲染到html中

## 如何理解MVVM
	
* MVVM-Model View ViewModel
* 三者之间的联系，以及如何对应到各段代码
* ViewModel的理解，联系View和Model

## MVVM框架的三大要素
* 响应式：vue如何监听到data的每个属性变化
* 模版引擎：vue的模板如何被解析，指令如何处理
* 渲染：vue的模版如何被渲染成html，以及渲染过程
	 
##  如何实现MVVM
## vue的源码