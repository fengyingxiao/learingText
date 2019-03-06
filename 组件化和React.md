## 组件化

* **对组件化的理解**

	* 组件的封装

		* 视图
		* 数据
		* 变化逻辑（数据驱动视图变化）
	* 组件的复用

		* props传递
		* 复用
* **JSX本质是什么**

	* JSX语法

		* html形式
		* 引入JS变量和表达式
		* if...else...
		* 循环
		* style和className
		* 事件
		* JSX语法根本无法被浏览器所解析
	* JSX解析成JS

		* JSX其实是语法糖
		* 开发环境会将JSX解析成JS代码
		* JSX的写法大大降低了学习成本和编码工作量
		* 同时，JSX也会增加debug成本
	* 独立的标准

		* JSX是React引入的，但不是React独有的
		* React已经将它作为一个独立标准开放，其他项目也可用
		* React.createElement是可以自定义修改的
		* 说明：本身功能已经完备；和其他标准兼容和扩展性没问题
* **JSX和vdom的关系**

	* 分析：为何需要vdom

		* vdom是React初次推广开来的，结合JSX
		* JSX就是模版，最终要渲染成html
		* 初次渲染+修改state后的re-render
		* 正好符合vdom的应用场景
	* React.createElement和h
	* 何时patch

		* 初次渲染-ReactDOM.render(<App/>,container)
		* 会触发patch(container,vnode)
		* re-render-setState
		* 会触发patch(vnode,newVnode)
	* 自定义组件的解析

		* 'div'直接渲染成<div>即可，vdom可以做到
		* Input和List是自定义组件（class），vdom默认不认识
		* 因此Input和List定义的时候必须声明render函数
		* 根据props初始化实例，然后执行实例的render函数
		* render函数返回的还是vnode对象
* **setState的过程**

	* setState的异步（setState为何需要异步）

		* 可能会一次执行多次setState
		* 无法规定、限制用户如何使用setState
		* 没必要每次setState都重新渲染，考虑性能
		* 即便是每次重新渲染，用户也看不到中间的效果
		* 只看到最后的结果即可
	* vue修改属性也是异步

		* 效果、原因和setState一样
	* setState的过程

		* 每个组件实例，都有renderComponent方法
		* 执行renderComponent会重新执行实例的render
		* render函数返回newVnode，然后拿到preVnode
		* 执行patch（preVnode，newVnode）
* **React和vue的认识**

	* 两者的本质区别

		* vue-本质是MVVM框架，由MVC发展而来
		* React-本质是前端组件化框架，由后端组件发展而来
	* 模块和组件化的区别

		* vue-使用模版（最初由angular提出）
		* React-使用JSX
		* 模版语法上，更加倾向于JSX，
		* 模版分离上，更加倾向于vue
		* React模版和JS混在一起未分离
		* React本身就是组件化，没有组件化就不是React
		* Vue也支持组件化，不过是在MVVM上的扩展
		* 对于组件化，React更彻底
		* 国内使用，首推vue。文档更易读，易学，社区够大
		* 如果团队水平较高，推荐使用React。组件化和JSX
	* 两者共同点

		* 都支持组件化
		* 都是数据驱动视图
		
