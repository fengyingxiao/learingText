## ReactNative

### 安卓打包：

```js
npm run andorid-r
```

andorid-r的命令行实际上是在package.json里面的script里面配置了
	
```js
"android-r": "cd android && ./gradlew assembleRelease",
```

* 打完的包是在android/app/build/output/apk/app-release.apk

###reactnative页面之间的反向传值

首先在第一个页面里面的navigation里面写一个函数

```js
that.props.navigation.push('SearchConditions',{param:(params)=>{
            console.log('2222222222222222')
            console.log(params)
        }})
```

然后在第二个页面里面的返回函数里面调用此函数

```js
		let params = {
		    ccc:'111'
		};
		let {navigate} = this.props.navigation;
        this.props.navigation.state.params.param(params)
        navigate('AssetInquiry',{info:params});
```

###导入和引用方法需要注意的点

* 如果一个页面导出方法为export，则另一个页面的引用方法为：

```js
export{
	LoginSuccess
}
import {LoginSuccess} from '..'

```

* 如果一个页面导出方法为export default，则另一个页面的引用方法为：

```js
export default{
	LoginSuccess
}

import Protype from '..'
//那么引用LoginSuccess，则就是Protype.LoginSuccess
```

### react-navigation

* replace一般用于登陆页面跳转到有tabbar的页面
* pop是返回上一个页面
* push是在同一个路由下面找下一个页面，navigate既可以在同一个路由也可以跨路由

### setState的一种方法

```js
this.setState({

},()=>{
	console.log('122222222')
})

```
意为等setState里面赋值以后在进行下面的函数




	