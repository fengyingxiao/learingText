## Taro介绍

我们可以只书写一套代码，再通过Taro的编译工具，将源代码分别编译出可以在不同端（微信小程序、百度小程序、H5、RN等）运行的代码；具有React语法风格；支持使用CSS预编译器，支持使用Redux，支持使用Typescript

## 安装及使用

* 安装：安装Taro开发工具@tarojs/cli，使用npm或者yarn全局安装，或者使用npx

```js
$ npm install -g @tarojs/cli
$ yarn global add @tarojs/cli
```
* 使用：使用命令创建模版项目

```js
$ taro init myApp
```
* 运行

	* 微信小程序：微信小程序编译预览及打包（去掉 --watch 将不会监听文件修改，并会对代码进行压缩打包）

	```js
	# npm script
	$ npm run dev:weapp
	$ npm run build:weapp
	# 仅限全局安装
	$ taro build --type weapp --watch
	$ taro build --type weapp
	# npx 用户也可以使用
	$ npx taro build --type weapp --watch
	$ npx taro build --type weapp
	```
	* 百度小程序：百度小程序编译预览及打包（去掉 --watch 将不会监听文件修改，并会对代码进行压缩打包）

	```js
	# npm script
	$ npm run dev:swan
	$ npm run build:swan
	# 仅限全局安装
	$ taro build --type swan --watch
	$ taro build --type swan
	# npx 用户也可以使用
	$ npx taro build --type swan --watch
	$ npx taro build --type swan
	```
	* 支付宝小程序：支付宝小程序编译预览及打包（去掉 --watch 将不会监听文件修改，并会对代码进行压缩打包）

	```js
	# npm script
	$ npm run dev:alipay
	$ npm run build:alipay
	# 仅限全局安装
	$ taro build --type alipay --watch
	$ taro build --type alipay
	# npx 用户也可以使用
	$ npx taro build --type alipay --watch
	$ npx taro build --type alipay
	```
	* H5模式：无需特定的开发者工具，在执行完下述命令之后即可通过浏览器进行预览

	```js
	# npm script
	$ npm run dev:h5
	# 仅限全局安装
	$ taro build --type h5 --watch
	# npx 用户也可以使用
	$ npx taro build --type h5 --watch
	```
	H5打包项目
	
	```js
	# npm script
	$ npm run build:h5
	# 仅限全局安装
	$ taro build --type h5
	# npx 用户也可以使用
	$ npx taro build --type h5
	```
	