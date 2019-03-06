# 虚拟DOM virtual dom

* vdom是vue和React的核心
* vdom比较独立，使用也比较简单

## vdom是什么？为何会存在vdom？
	
* virtual dom，虚拟DOM
* 用JS模拟DOM结构
* DOM变化的对比，放在JS层来做
* 提高重绘性能

## vdom的如何应用，核心API是什么

* 介绍snabbdom，是个开源的vdom的库，vue2.0就借用了snabbdom的代码

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
    <div id="container"></div>
    <button id="btn-change">change</button>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/h.js"></script>
    <script type="text/javascript">
        var snabbdom = window.snabbdom

// 定义patch
         var patch = snabbdom.init([
             snabbdom_class,
             snabbdom_props,
             snabbdom_style,
             snabbdom_eventlisteners
         ])
        //  定义h
        var h = snabbdom.h
        var container = document.getElementById('container')
        // 生成vnode
        var vnode = h('ul#list',{},[
            h('li.item',{},'Item1'),
            h('li.item',{},'Item2')
        ])

        patch(container,vnode)
        // 做改变
        document.getElementById('btn-change').addEventListener('click',function(){
            var newVnode = h('ul#list',{},[
                h('li.item',{},'Item1'),
                h('li.item',{},'ItemB'),
                h('li.item',{},'Item3'),
                h('li.item',{},'Item4')
            ])
            patch(vnode,newVnode)
        })
    </script>
</body>
</html>
```


* 重做之前的demo

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
    <div id="container"></div>
    <button id="btn-change">change</button>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.2/h.js"></script>
    <script type="text/javascript">
        var snabbdom = window.snabbdom

// 定义patch
         var patch = snabbdom.init([
             snabbdom_class,
             snabbdom_props,
             snabbdom_style,
             snabbdom_eventlisteners
         ])
        //  定义h
        var h = snabbdom.h
        var data = [
            {
                name:'章三',
                age:'20',
                address:'北京'
            },
            {
                name:'李四',
                age:'21',
                address:'上海'
            },
            {
                name:'王五',
                age:'22',
                address:'广州'
            }
        ]
        // 把表头放在数组的最前面
        data.unshift({
            name:'姓名',
            age:'年龄',
            address:'地址'
        })
        var container = document.getElementById('container')
        var btnChange = document.getElementById('btn-change')
   
        //    渲染函数
        var vnode 

        function render(data){
            var newVnode = h('table',{},data.map(function(item){
                var tds = []
                var id
                for(i in item){
                    if(item.hasOwnProperty(i)){
                        tds.push(h('td',{},item[i]+''))
                    }
                }
                return h('tr',{},tds)
            }))
            if(vnode){
                patch(vnode,newVnode)
            }else{
                patch(container,newVnode)
            }
            // 存储当前vode的结果
            vnode = newVnode
        }
        // 初次渲染
        render(data)
        btnChange.addEventListener('click',function(){
            data[1].age = 30
            data[2].address = '深圳'
            render(data)
        })
    </script>
</body>
</html>
```

* 核心API

	* h('<标签名>',{...属性}，[...子元素...])
	* h('<标签名>',{...属性...},'...')
	* patch(container,vnode)
	* patch(vnode,newVnode)


## 介绍一下diff算法

* 什么是diff算法
	
	是一个简单的对比两个文件的，比如在命令行中输入diff log1.txt log2.txt，结果就是得出两个文件的不同；git diff index.html就是看一下git库中这一次和上一次改动的不同之处
* 去繁就简

	* diff算法非常复杂，实现难度很大，源码量很大
	* 去繁就简，讲明白核心流程，不关心细节
	
* vdom为何用diff算法

	* DOM操作是昂贵的，因此尽量减少DOM操作
	* 找出本次DOM必须更新的节点来更新，其他的不更新
	* 这个找出的过程，就需要diff算法
* diff算法的实现流程

	* patch(container,vnode)
	* patch(vnode,newVnode)
	