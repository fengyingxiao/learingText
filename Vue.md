## 搭建VUE项目
* npm install -g vue-cli
* vue init webpack vueProject
* cd vueProject
* npm install 或者是yarn
* npm run dev

## 介绍

* 声明式渲染

```js
<template>
  <div class="hello">
    <h1 v-bind:title="msg">鼠标悬浮在这里</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'+new Date().toLocaleString()
    }
  }
}
</script>
```
上述代码意思为 当鼠标停在网页中的文字时，会出现悬浮的文字‘welcome to Your Vue.js....’

## Vue实例

每个Vue应用都是通过用Vue函数创建一个新的Vue实例来开始的

```js
var vm = new Vue({
})
```
* 数据与方法

当一个Vue实例被创建时，它向Vue的相应系统中加入了其data对象中能找到的所有属性。当这些属性的值发生改变时，视图将会产生‘响应’，即匹配更新为新的值

```js
import Vue from 'vue'
var data = {
  a:1
}
var vm = new Vue({
  el: '#app',
  data:data
})
console.log(vm.a == data.a) //true
vm.a = 2
console.log(data.a) //2
data.a = 3
console.log(vm.a) //3
```
当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时data中存在的属性才是响应式的，如果增加一个新的属性，是不会触动的。

使用Object.freeze()，这会阻止修改现有的属性，也意味着响应系统无法在追踪变化

```js
var obj = {
  foo:'bar'
}
Object.freeze(obj)
var vm = new Vue({
  el: '#app',
  data:obj,
  template: `<div>
    <p>{{foo}}</p>
    <button v-on:click="foo ='baz'">Change it</button>
  </div>`
})
```
除了数据属性，Vue实例还暴露了一些有用的实例属性与方法，他们都有前缀$，以便与用户定义的属性区分开来

```js
var vm = new Vue({
  el: '#app',
  data:data
})

console.log(vm.$data === data) //true
console.log(vm.$el) //<div id="app"></div>
console.log(document.getElementById('app'))
console.log(vm.$el === document.getElementById('app')) //true
```

* 实例生命周期钩子

每个Vue实例在被创建时都要经过一系列的初始化过程，比如需要设置数据监听、编译模版、将实例挂载到DOM并在数据变化时更新DOM等。同时在这个过程中也会运行一些叫做生命周期钩子的函数。

比如created钩子可以用来在一个实例被创建之后执行代码，还有mounted、updated和destroyed，生命周期钩子的this上下文指向调用它的Vue实例；

注意不要再选项属性或回调上使用箭头函数，因为箭头函数是和父级上下文绑定在一起的，this不会是Vue实例，会导致报错

## 模版语法

* 插值

	* 文本：数据绑定最常见的形式就是使用Mustache(双大括号)的文本插值，若使用v-once指令，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其他数据绑定；

	```js
	<span v-once>这个将不会改变: {{ msg }}</span>
	```
	* 原始HTML：双大括号会将数据解释为普通文本，而非HTML代码。为了输出真正的HTML，需要使用v-html指令：

	```js
	<template>
	  <div class="hello">
	    <p>Using mustaches:{{rawHtml}}</p>
	    <p>Using v-html directive:<span v-html="rawHtml"></span></p>
	  </div>
	</template>

	<script>
		export default {
		  name: 'HelloWorld',
		  data () {
		    return {
		      rawHtml:"<span style='color:red;'>This should be red</span>"
		    }
		  }
		}
	</script>
	```
	页面展示为第一个是span标签的html，第二个展示的则是This should be red，并且颜色为红色。
	
	注意，不能使用v-html来复合局部模版，因为Vue不是基于字符串的模版引擎，反之对于用户界面，组件更适合作为可重用和可组合的基本单位；你的站点上动态渲染的任意HTML可能会非常危险，因为它很容易导致xss攻击，请只对可信内容使用HTML插值，绝不要对用户提供的内容使用插值
	
	* 特性：Mustache语法不能作用在HTML特性上，遇到这种情况应该使用v-bind指令

	```js
		<button v-bind:disabled="isButtonDisabled">Button</button>
	```
	
	在布尔特性的情况下，他们的存在即暗示为true，，v-bind工作起来略有不同，在这个例子中如果isButtonDisabled的值是null、undefined或者false，则disabled特性甚至不会被包含在渲染出来的button元素中
	
	* 使用JavaScript表达式：对于所有的数据绑定，Vue.js都提供了完全的JavaScript表达式支持

	```js
	{{ number + 1 }}

	{{ ok ? 'YES' : 'NO' }}
	
	{{ message.split('').reverse().join('') }}
	
	<div v-bind:id="'list-' + id"></div>
		<!-- 这是语句，不是表达式 -->
	{{ var a = 1 }}
	
	<!-- 流控制也不会生效，请使用三元表达式 -->
	{{ if (ok) { return message } }}
	```
	需要注意的是：每个绑定都只能包含单个表达式
	
* 指令

	指令是带有v-前缀的特殊特性。指令特性的值预期是单个JavaScript表达式（v-for例外），指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式作用于DOM
	
	```js
		<div v-if="seen">{{msg}}</div>
	```
	
	* 参数：一些指令能够接收到一个‘参数’，在指令名称之后以冒号表示。例如，v-bind指令可以用于响应式的更新HTML特性：

	```js
	<a v-bind:href="url">这是个链接</a>
	<a v-on:click="doSomething">...</a>
	```
	在这里href是参数，告知v-bind指令将元素的href特性与表达式url的值绑定。另一个例子是v-on指令，它用来监听DOM事件，参数是监听的事件名
	
	* 修饰符：是以半角句号.指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如.prevent修饰符告诉v-on指令对于触发的事件调用event.preventDefault()

	```js
	<form v-on:submit.prevent="onSubmit">...</form>
	```
	
	* 缩写：v-前缀作为一种视觉提示，用来识别模版中Vue特定的特性

		v-bind缩写:
		
		```js
			<!-- 完整语法 -->
			<a v-bind:href="url">...</a>
			
			<!-- 缩写 -->
			<a :href="url">...</a>
		```
		
		v-on缩写：
		
		```js
		<!-- 完整语法 -->
		<a v-on:click="doSomething">...</a>
		
		<!-- 缩写 -->
		<a @click="doSomething">...</a>
		```
		
## 计算属性和侦听器

* 计算属性

	模版内的表达式非常便利，但是设计它们的初衷是用于简单计算的。在模版中放入太多的逻辑会让模版过重且难以维护，所以对于任何复杂逻辑，都应当使用计算属性

	* 基础例子

	```js
	<template>
	  <div class="hello">
	    <p>Original message:{{message}}</p>
	    <p>Computed reversed message:"{{reversedMessage}}"</p>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data () {
	    return {
	      message:'Hello World'
	    }
	  },
	  computed:{
	    reversedMessage:function(){
	        return this.message.split('').reverse().join('')
	    }
	  }
	}
	</script>
	```
	结果：
	
	Original message:Hello World

	Computed reversed message:"dlroW olleH"
	
	* 计算属性缓存vs方法

	```js
	<template>
	  <div class="hello">
	    <p>Original message:{{message}}</p>
	    <p>Computed reversed message:"{{reversedMessage()}}"</p>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data () {
	    return {
	      message:'Hello World'
	    }
	  },
	  methods:{
	    reversedMessage:function(){
	      return this.message.split('').reverse().join('')
	    }
	  }
	}
	</script>
	```
	这种通过在表达式中调用方法也可以达到同样的效果。我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而不同的是计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。这就意味着只要message还没有发生改变，多次访问reversedMessage计算属性会立刻返回之前的计算结果，而不必再次执行函数。相比之下，每当触发重新渲染，调用方法将总会再次执行函数
	
	* 计算属性vs侦听属性

	Vue提供了一种更通用的方式来观察和响应Vue实例上的数据变动：侦听属性；当有一些数据需要随着其他数据变动而变动时，会很容易滥用watch，所以通常更好的做法是使用计算属性而不是命令式的watch回调；
	
	```js
	<template>
	  <div class="hello">
	    <p>{{fullName}}</p>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      firstName:'Foo',
	      lastName:'Bar',
	      fullName:'Foo Bar'
	    }  
	    
	  },
	  watch:{
	    firstName:function(val){
	      this.fullName = val + ' ' + this.lastName
	    },
	    lastName:function(val){
	      this.fullName = this.firstName + ' '+ val
	    }
	  }
	}
	</script>
	```
	上述代码是命令式且重复的，将它与计算属性的版本进行比较,计算属性更好
	
	```js
	var vm = new Vue({
	  name: 'HelloWorld',
	  data: {
	    firstName: 'Foo',
	    lastName: 'Bar'
	  },
	  computed: {
	    fullName: function () {
	      return this.firstName + ' ' + this.lastName
	    }
	  }
	})
	```
	
	* 计算属性的setter

	计算属性默认只有getter，不过在需要时也可以提供一个setter：
	
	```js
	computed: {
	  fullName: {
	    // getter
	    get: function () {
	      return this.firstName + ' ' + this.lastName
	    },
	    // setter
	    set: function (newValue) {
	      var names = newValue.split(' ')
	      this.firstName = names[0]
	      this.lastName = names[names.length - 1]
	    }
	  }
	}
	```
	现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新
	
* 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么Vue通过watch选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方法最有用
	
## Class与Style绑定

* 绑定HTML Class

	* 对象语法

	```js
	<template>
	  <div class="hello">
	   <div class="example" v-bind:class="{active:isActive,textdanger:hasError}">我哦喔喔哦我</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      isActive:true,
	      hasError:true
	    }  
	    
	  }
	}
</script>
	```
	上述语法表示 给div添加class名，如active这个class存在与否和isActive这个属性有关，动态添加的class可以与本来就有的class共存。当isActive或hasError变化时class列表将相应的更新。
	
	```js
	<template>
	  <div class="hello">
	   <div class="example" v-bind:class="classObject">我哦喔喔哦我</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      classObject:{
	        active:true,
	        'text-danger':false
	      }
	    }  
	    
	  }
	}
	</script>
	```
	绑定的数据对象不必内联定义在模版里，如上述代码一样，我们也可以在这里绑定一个个返回对象的计算属性,这是一个常用且强大的模式
	
	```js
	<template>
	  <div class="hello">
	   <div class="example" v-bind:class="classObject">我哦喔喔哦我</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      isActive:true,
	      error:null
	    } 
	    },
	    computed: {
	      classObject: function(){
	       return{
	         active:this.isActive && !this.error,
	         'text-danger':this.error
	       }
	      }
	    } 
	}
	</script>
	```
	
	* 数组语法

	```js
	<template>
	  <div class="hello">
	   <div v-bind:class="[activeClass,errorClass]">我哦喔喔哦我</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      activeClass:'active',
	      errorClass:'text-danger'
	    } 
	    }
	}
	</script>
	```
	我们把一个数组传给v-bind：class，以应用一个class列表，上面就会渲染为div有两个class名分别为active和text-danger
	
	```js
	<template>
	  <div class="hello">
	   <div v-bind:class="[isActive?activeClass:'',errorClass]">我哦喔喔哦我</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      isActive:true,
	      activeClass:'active',
	      errorClass:'text-danger'
	    } 
	    }
	}
	</script>
	```
	也可以像上述写法使用条件写法，但是当有多个条件class时这样写会有些繁琐，所以在数组语法中也可以使用过对象语法
	
	```js
	<template>
	  <div class="hello">
	   <div v-bind:class="[{active:isActive},errorClass]">我哦喔喔哦我</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      isActive:true,
	      errorClass:'text-danger'
	    } 
	    }
	}
	</script>
	```
	
	* 用在组件上：当在一个自定义组件上使用class属性时，这些类将被添加到该组件的根元素上面，这个元素上已经存在的类不会被覆盖，大概意思是，组件自己有class名，当我们用这个组件的时候给它添加class名，那么它本身原有的class名和现在有的都会存在，对于带数据绑定的class也同样适用

* 绑定内联样式

	* 对象用法：v-bind:style的对象语法十分直观，看着非常像css，但其实是一个JavaScript对象，CSS属性名可以用驼峰式或者短横线分割（需要用单引号括起来）来命名
	
	```js
	<template>
	  <div class="hello">
	   <div v-bind:style="{color:activeColor,fontSize:fontSize}">我哦喔喔哦我</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      activeColor:'red',
	      fontSize:'50px'
	    } 
	    }
	}
	</script>
	```
	也可以直接绑定到一个样式对象上，这样通常更好，会让模版更清晰
	
	```js
	<template>
	  <div class="hello">
	   <div v-bind:style="styleObject">我哦喔喔哦我</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      styleObject:{
	        color:'orange',
	        fontSize:'40px'
	      }
	    } 
	    }
	}
	</script>
	```
	同样的，对象语法常常结合返回对象的计算属性使用
	
	* 数组语法

	v-bind:style的数组语法可以将多个样式对象应用到同一个元素上
	
	```js
	<div v-bind:style="[baseStyles, overridingStyles]"></div>
	```
	
	* 自动添加前缀

	当v-bind：style使用需要添加浏览器引擎的css属性时，如transform，Vue.js会自动侦测并添加相应的前缀
	
	* 多重值

	从2.3.0起你可以为style绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值
	
	```js
	<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
	```
	这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex
	
## 条件渲染

* v-if

	* 在template元素上使用v-if条件渲染分组

	```js
	<template v-if="ok">
	  <h1>Title</h1>
	  <p>Paragraph 1</p>
	  <p>Paragraph 2</p>
	</template>
	```
	
	* v-else

	```js
	<template>
	  <div class="hello">
	    <div v-if="Math.random()>0.5">随机数大于0.5</div>
	    <div v-else>随机数小于0.5</div>
	  </div>
	</template>
	```
	v-else元素必须紧跟在带v-if或者v-else-if的元素的后面，否则它将不会被识别
	
	* v-else-if

	```js
	<template>
	  <div class="hello">
	    <div v-if="type === 'A'">A</div>
	    <div v-else-if="type === 'B'">B</div>
	    <div v-else-if="type === 'C'">C</div>
	    <div v-else>Not A/B/C</div>
	  </div>
	</template>
	
	<script>
	export default {
	  name: 'HelloWorld',
	  data(){
	    return{
	      type:'A'
	    } 
	    }
	}
	</script>
	```
	
	* 用key管理可复用的元素

	Vue会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染，这么做除了使Vue变得非常快之外，使用key可以让各个重复使用的元素相互独立
	
* v-show

	用于根据条件展示元素的v-show指令，用法与v-if相同，与v-if不同的是带有v-show的元素始终会被渲染并保留在DOM中，v-show只是简单地切换元素的css属性display，需要注意的是v-show不支持template元素，也不支持v-else

* v-if和v-show

	v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

	v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

	相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

	一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

* v-if 与 v-for 一起使用

	当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

## 列表渲染

