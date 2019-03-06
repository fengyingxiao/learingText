## 组件自定义事件处理函数

* .default:绑定小程序冒泡型事件，如bindtap，.default后缀可省略不写
* .stop:绑定小程序捕获型事件，如catchtap
* .user：绑定用户自定义组件事件，通过$emit触发。如果用了自定义事件，则events中对应的监听函数不会再执行(具体例子看$emit那一块)


## slot组件内容分发插槽

在Panel自组件中写：

```js
<view>
	<slot name="title">默认标题</slot>
	<slot name="test"></slot>
</view>
```
在父组件中写：

```js
<panel>
    <view slot="title">新的标题</view>
    <view slot="test">
        <text>新的内容</text>
    </view>
</panel>
```
需要注意的是自组件template模版中声明slot标签的必须在name属性中指定名称，然后在父组件中声明该内容分发标签，如果父组件中用了这个自组件，但是没有写slot属性 ，则会展示自组件中默认的内容

## this.$parent

现在目前发现的是如果在app.wpy里面定义了方法 或者变量，在index.wpy里面可以用this.$parent调用该方法或者是出来所需要的变量,即在Page页面实例中，可以通过this.$parent来访问App实例

## .wpy文件包含三大部分

* 脚本部分，即<script></script>标签中的内容，里面有可以分为两部分：

	* 逻辑部分，除config对象之外的部分，对应于原生的.js文件
	* 配置部分，即config对象，对应于原生的.json文件

	```js
	//app.wpy
	config = {
    pages: [
      'pages/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
  
  //index.wpy
  config = {
      navigationBarTitleText: 'test'
    }
  
  
	```
* 结构部分，即<template></template>模版部分，对应于原生的.wxml文件
* 样式部分，即<style></style>样式部分，对应于原生的.wxss文件

小程序入口文件app.wpy不需要template，所以编译时会被忽略，.wpy文件中的script，template，style这三个标签都支持lang和src属性，lang决定了其代码编译过程，src决定了是否外联代码，存在src属性且有效时，会忽略内联代码

## page.wpy中所声明的页面属性

* config,页面配置对象，对应于原生的page.json文件，类似于app.wpy中的config
* components,页面组件列表对象，声明页面所引入的组件列表
* data，页面渲染数据对象，存放可用于页面模版绑定的渲染数据
* methods，wxml事件处理函数对象，存放响应wxml中所捕获到的事件的函数，如bindtap，bindchange
* events，wepy组件事件处理函数对象，存放响应组件之间通过$broadcast,$emit,$invoke所传递的事件的函数
* 其他，小程序页面生命周期函数，如onLoad，onReady等，以及其他自定义的方法与属性

```js
	<script>
		import wepy from 'wepy'
		import Panel from '../componets/panel'
		
		export default class Index extends wepy.page{
			config = {
				navigationBarTitleText:'test'
			}
			
			components = {
				panel:Panel
			}
			
			data = {
				mynum:20
			}
			
			methods = {
				plus () {
					console.log('方法')
				}
			}
			
			events = {
				
			}
			
			onLoad (){
				console.log('aaaa')
			}
		}
	</script>
```

## 实例

* 小程序实例APP
* 页面实例Page
* 组件实例Component

```js
import wepy from 'wepy'
//声明一个APP小程序实例
export default class MyApp extends wepy.app{
}

//声明一个Component组件实例
export default class MyComponent extends wepy.component{
}

//声明一个Page页面实例
export default class IndexPage extends wepy.page{
}
```

## APP小程序实例

```js
import wepy from 'wepy'
export default class MyApp extends wepy.app{
	customData = {};//自定义的数据
	customFunction(){} //自定义的函数
	onLaunch(){}
	onShow(){}
	config = {} //对应app.json文件
	globalData = {}
}
```

## Page页面实例和Component组件实例

```js
import wepy from 'wepy'
export default class MyPage extends wepy.page{
	customData = {} //自定义数据
	customFunction(){} //自定义方法
	onLoad(){} //在Page和Component共用的生命周期函数
	onShow(){} //只在Page中存在的页面生命周期函数
	config = {} //只在page实例中存在的配置数据，对应于原生的page.json文件
	data = {} //页面所需数据均需在这里声明，可用于模版数据绑定
	components = {} //声明页面中所引用的组件，或声明组件中所引用的子组件
	mixins = [] //声明页面所引用的Mixin实例
	computed = {} //声明计算属性
	watch = {} //声明数据watcher
	methods = {} //声明页面wxml中标签的事件处理函数，注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明
	events = {} // 声明组件之间的事件处理函数
}
```

```js
import wepy from 'wepy';

export default class MyComponent extends wepy.component {
    methods = {
        bindtap () {
            let rst = this.commonFunc();
            // doSomething
        },

        bindinput () {
            let rst = this.commonFunc();
            // doSomething
        },
    }

    //正确：普通自定义方法在methods对象外声明，与methods平级
    customFunction () {
        return 'sth.';
    }

}
```

## 组件的引用

```js
<template>
    <view class="child1">
        <child></child>
    </view>

    <view class="child2">
        <anotherchild></anotherchild>
    </view>
</template>


<script>
    import wepy from 'wepy';
    import Child from '../components/child';

    export default class Index extends wepy.component {
        components = {
            //为两个相同组件的不同实例分配不同的组件ID，从而避免数据同步变化的问题
            child: Child,
            anotherchild: Child
        };
    }
</script>
```

## 组件的循环渲染

需要循环的时候必须使用WePy定义的辅助标签<repeat>

```js
// index.wpy

<template>
    <!-- 注意，使用for属性，而不是使用wx:for属性 -->
    <repeat for="{{list}}" key="index" index="index" item="item">
        <!-- 插入<script>脚本部分所声明的child组件，同时传入item -->
        <child :item="item"></child>
    </repeat>
</template>

<script>
    import wepy from 'wepy';
    // 引入child组件文件
    import Child from '../components/child';

    export default class Index extends wepy.component {
        components = {
            // 声明页面中要使用到的Child组件的ID为child
            child: Child
        }

        data = {
            list: [{id: 1, title: 'title1'}, {id: 2, title: 'title2'}]
        }
    }
</script>
```

## computed计算属性

```js
<template>
	<text>{{aPlus}}</text>
</template>
<script>

data = {
      a: 1
  }

  // 计算属性aPlus，在脚本中可通过this.aPlus来引用，在模板中可通过{{ aPlus }}来插值
  computed = {
      aPlus () {
          return this.a + 1
      }
  }
</script>
  
```
## this.$apply()

具体使用是在：

* 为data里面的数据进行绑定的时候
* 异步更新数据，手动刷新dom时就要使用

比如在data里面定义了一个x=‘’，然后在自定义的方法里用this.x=200之后，需要用this.$apply()来进行数据绑定，这样在view中绑定data中的x变量时，才会有200，不然为空；

method里面的方法是不用这个的，但自己自定义的其他方法，或者写在onshow里面的，就必须得用this.$apply()  

## Props传值

* 静态传值，父组件向子组件传递常量数据，因此只能传递String字符串类型

```js
//父组件中
<template>
	<TestMixin name="wode"></TestMixin>
</template>
<script>
 import TestMixin from '../components/wepy'
 components = {
      TestMixin:TestMixin
    }
</script>

<!--子组件中-->
<template>
  <text>{{name}}</text>
</template>
<script>
  import wepy from 'wepy'

  export default class TestMixin extends wepy.component{

    props = {
      name:String
    }
    onLoad(){
      console.log(this.name)
    }
  }
</script>
```
这样我们就可以在自组件中得到父组件传过来的值了

* 动态传值

指父组件向子组件传递动态数据内容，父子组件数据完全独立互不干扰，但可以通过使用.sync修饰符来达到父组件数据绑定至子组件的效果，也可以通过设置子组件的props的twoWay：true来达到子组件数据绑定至父组件的效果。那如果要实现数据的双向绑定，就可以既使用.sync修饰符，同时子组件props中添加的twoWay：true；

twoWay为true时，表示子组件向父组件单向动态传值，而twoWay为false（默认值，可不写）时，则表示子组件不向父组件传值

```js
//父组件
<TestMixin name="parentTitle" :title="parentTitle" :syncTitle.sync="parentTitle" :twoWayTitle="parentTitle"></TestMixin>

//子组件
<!--import wepy from 'wepy';-->

<!--export default class TestMixin extends wepy.mixin {-->
<!--data = {-->
<!--foo: 'foo defined by page',-->
<!--bar: 'bar defined by testMix'-->
<!--};-->
<!--methods = {-->
<!--tap () {-->
<!--console.log('mix tap');-->
<!--}-->
<!--}-->
<!--}-->
<template>
  <text>{{name}}</text>
</template>
<script>
  import wepy from 'wepy'

  export default class TestMixin extends wepy.component{

    props = {
      name:String,
      title: String,

      // 父向子单向动态传值
      syncTitle: {
        type: String,
        default: 'null'
      },

      // 子向父单向动态传值
      twoWayTitle: {
        type: String,
        default: 'nothing',
        twoWay: true
      }
    }
    onLoad(){
      console.log(this.name)//parentTitle
      console.log(this.title) //想清楚动态传值和静态传值的这几个区别
      console.log(this.syncTitle)//想清楚动态传值和静态传值的这几个区别
      console.log(this.twoWayTitle)//想清楚动态传值和静态传值的这几个区别
      this.title = 'c-title';
      console.log(this.$parent.parentTitle) //想清楚动态传值和静态传值的这几个区别
      this.twoWayTitle='sync-title'
      console.log(this.$parent.parentTitle)//想清楚动态传值和静态传值的这几个区别
      this.$apply() //表示绑定数据，手动刷新dom
      console.log(this.$parent.parentTitle) //如果twoWay为true，则为sync-title ，如果twoWay里面为false，则不变
      this.$parent.parentTitle="现在改变父组件里面的值"
      this.$parent.$apply()
      console.log(this.title) //c-title
      console.log(this.syncTitle)//现在改变父组件里面的值,后缀有.sync的里面，只要父组件改变，子组件里面的也会改变

    }
  }
</script>


```

首先 如果前面不加冒号，则代表父组件传到子组件的为一个字符，如果加了：则代表父组件传到子组件的可以为一个变量，但是他的值不会随父子组件的改变而改变；

## 组件通信与交互

wepy.component基类提供$broadcast,$emit,$invoke三个方法用于组件之间的通信和交互，用于监听组件之间的通信与交互事件的事件处理函数需要写在组件和页面的events对象中

* $broadcast事件是由父组件发起，所有子组件会收到此广播事件，除非事件被手动取消
* $emit与$broadcast正好相反，事件发起组件的所有祖先组件会依次接收到$emit事件
* $invoke是一个页面或组件对另一个组件中的方法的直接调用，通过传入组件路径找到相应的组件，然后再调用其方法

$emit的例子

```js
//pageIndex
<template>
	    <panel>
      <view class="title" slot="title">自己测试加减法1</view>
      <TestCounter :number.sync="testNum"></TestCounter>
    </panel>

    <panel>
      <view class="title" slot="title">自己测试加减法2</view>
      <TestCounter1 @testEmit.user="we_test_counter"></TestCounter1>
    </panel>
</template>
<script>
	methods = {
		we_test_counter (){
    		console.log('这是自己自定义的方法，只要发送监听，都走这一个')
		}
	}
	events = {
		'testEmit':() => {
        console.log('自己测试的组件接收到了监听')
      }
	}
</script>

<!--testcounter.wpy-->
<style lang="less">
  .counter {
    text-align: left;
    font-size: 12px;
  }
  .count {
    font-size: 18px;
    font-weight: bold;
    &.red {
      color: red;
    }
    &.green {
      color: green;
    }
  }
  .defaultText{
    color:red;
    font-size: 22px;
  }
</style>
<template>
  <view class="counter {{style}}">
    <button @tap="addBtn" size="mini">  +  </button>
    <button @tap="subBtn" size="mini">  -  </button>
    <text class="count" :class="{red: number > 55, green: number < 45}"> {{number}} </text>
  </view>
</template>
<script>
  import wepy from 'wepy'

  export default class TestCounter extends wepy.component {
    props = {
      number:{
        type:[Number,String],
        default:40
      }
    }

    watch={
      number(newVal,oleVal){
        console.log(`值将要改变了啊,新值是${newVal},旧值是${oleVal}`)
      }
    }

    methods = {
      addBtn(){
        this.number = this.number +1
        this.$emit('testEmit',4)
      },
      subBtn(){
        this.number = this.number -1

      }
    }
  }
</script>

```
$invoke的例子：

```js
//pageIndex
 <view @tap="testInvoke">
      测试一下Invoke
 </view>
 
 <script>
 	methods = {
 		 testInvoke(){
        console.log('测试一下Invoke')
        this.$invoke('TestCounter','invokeTest',1)
      },
 	}
 </script>
 
 <!--testcounter-->
 methods = {
	  invokeTest(){
	    console.log('调用别的组件中的方法')
	  }
}
```
$broadcast的例子

```js
//pageIndex.wpy
<view @tap="testBroadCast">
  测试一下Broadcast
</view>

methods = {
      testBroadCast(){
        this.$broadcast('test-broad-cast',1,2,3)
      },
}

//testcounter.wpy
    events={
      'test-broad-cast':(...args) => {
        console.log('子组件得到了父组件传过来的值呢')
        console.log(args)
      }
    }
```

## 计数加减法


```js
//pageIndex
<template>
	<TestCounter :number.sync="testNum"></TestCounter>
</template>
<script>
	export default class Index extends wepy.page{
		data = {
			textNum:30
		}
	}
</script>

//testcounter.wpy

<style lang="less">
  .counter {
    text-align: left;
    font-size: 12px;
  }
  .count {
    font-size: 18px;
    font-weight: bold;
    &.red {
      color: red;
    }
    &.green {
      color: green;
    }
  }
  .defaultText{
    color:red;
    font-size: 22px;
  }
</style>
<template>
  <view class="counter {{style}}">
    <button @tap="addBtn" size="mini">  +  </button>
    <button @tap="subBtn" size="mini">  -  </button>
    <text class="count" :class="{red: number > 55, green: number < 45}"> {{number}} </text>
  </view>
</template>
<script>
  import wepy from 'wepy'

  export default class TestCounter extends wepy.component {
    props = {
      number:{
        type:[Number,String],
        default:40
      }
    }

    methods = {
      addBtn(){
        this.number = this.number +1
      },
      subBtn(){
        this.number = this.number -1
      }
    }
  }
</script>

```

## watch监听

通过监听器watcher能够监听到任何属性的更新，监听在watch对象中声明，类型为函数，函数名与需要被监听的data对象中的属性要同名，每当被监听的属性改变一次，监听函数就会被自动调用执行一次， 监听器适用于当属性改变时需要进行某些额外处理的情形

```js
<style lang="less">
  .counter {
    text-align: left;
    font-size: 12px;
  }
  .count {
    font-size: 18px;
    font-weight: bold;
    &.red {
      color: red;
    }
    &.green {
      color: green;
    }
  }
  .defaultText{
    color:red;
    font-size: 22px;
  }
</style>
<template>
  <view class="counter {{style}}">
    <button @tap="addBtn" size="mini">  +  </button>
    <button @tap="subBtn" size="mini">  -  </button>
    <text class="count" :class="{red: number > 55, green: number < 45}"> {{number}} </text>
  </view>
</template>
<script>
  import wepy from 'wepy'

  export default class TestCounter extends wepy.component {
    props = {
      number:{
        type:[Number,String],
        default:40
      }
    }

    watch={
      number(newVal,oleVal){
        console.log(`值将要改变了啊,新值是${newVal},旧值是${oleVal}`)
      }
    }

    methods = {
      addBtn(){
        this.number = this.number +1
      },
      subBtn(){
        this.number = this.number -1

      }
    }
  }
</script>

```

## 第三方组件

比如wepy-com-toast的应用

```js
<template>
	<view @tap="testTap">测试一下toast</view>
	<toast />
</template>
<script>
	import Toast from 'wepy-com-toast'
	export default class Index extends wepy.page{
		components = {
			toast:Toast
		}
		
		methods = {
			testTap(){
				this.$invoke('toast','show',{
					title:'自定义标题',
					img:'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
				})
			}
		}
	}
</script>

```

## Mixin混合

* 默认式混合，对于组件data数据，components组件，events事件以及其他自定义方法采用默认式混合，即如果组件未声明该数据，组件，事件，自定义方法等，那么将混合对象中的选项将注入组件之中。对于组件已声明的选项将不受影响

* 兼容式混合，对于组件methods响应事件，以及小程序页面事件将采用兼容式混合，即先响应组件本身响应事件，然后再响应混合对象中响应事件

## wepy中页面反向传值

* wepy.$instance.globalData，使用wepy中的全局变量形式

```js
//index.wpy
wepy.$instance.globalData.hhh = '嘻嘻'

//second.wpy
wepy.$instance.globalData.hhh ='哈哈哈哈'
```

* getCurrentPages(),以下这个例子从index页面跳到second页面，在跳转回来后wanttochange的值就变成了10

```js
//index.wpy

onShow(){
	let self = this
	let pages = getCurrentPages()
	self.wanttochange = pages[0].data.wanttochange
}

//second.wpy
pages[0].data.wanttochange = 10
```










