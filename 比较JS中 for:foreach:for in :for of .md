# 比较JS中 for/foreach/for in /for of 

![alesia-kazantceva-283285-unsplash (1).jpg](https://upload-images.jianshu.io/upload_images/5531021-11a77b2fa389e9fb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


本文翻译自 [作者：code_barbarian For vs forEach() vs for/in vs for/of in JavaScript](http://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript.html)


在JS中有许多方式去循环数组和对象。但在实际使用中容易产生使用上的混淆，这需要我们去权衡。在某些方式上甚至禁止某些循环结构。([详情请看](http://airbnb.io/javascript/#iterators--nope))，本文我将重点描述四个循环结构迭代的方式:

* `for (let i = 0; i < arr.length; ++i)`
* `arr.forEach((v, i) => { /* ... */ })`
* `for (let i in arr)`
* `for (const v of arr)`

我将使用几种不同的边缘情况概述这些循环结构之间的区别。我还将链接到相关的ESLint规则，您可以使用这些规则来强制在项目中执行从而达到循环的最佳实践。

**语法概述**

在for与for/in循环结构给你访问索引数组中，而不是实际的值。例如，假设您要打印出以下数组中存储的值：

```js 
const arr = ['a', 'b', 'c'];
```

使用for 和 for/in ,如果需要打印出值，则需要arr[i],例如：

```js
for (let i = 0; i < arr.length; ++i) {
  console.log(arr[i]);
}

for (let i in arr) {
  console.log(arr[i]);
}
```

与其他两个结构相比，forEach()并且for/of，您可以访问数组元素本身。有了forEach()你可以访问数组索引i，for/of不能。

```js
arr.forEach((v, i) => console.log(v));

for (const v of arr) {
  console.log(v);
}
```

**非数值属性**

js中数组是一种特殊的对象，这就意味着你可以添加string类型的属性值在你的数组里，不仅仅是数字。

```js
const arr = ['a', 'b', 'c'];

typeof arr; // 'object'

// Assign to a non-numeric property
arr.test = 'bad';

```

4种循环结构有3种忽视非值属性，但是，for/in 却会打印出“bad”

```js
function ab(){
	const arr = ['a','b','c'];
	arr.test = 'bad';

	
	for(let i in arr){
		console.log(arr[i]);
	}

	// for(let j of arr){
	// 	console.log(j);
	// }

	// for(let i=0;i<arr.length;i++){
	// 	console.log(arr[i]);
	// }

	// arr.forEach((v,i)=>{
	// 	console.log(v);
	// })

}
ab();
```

打印的结果只有for/in 会展示“bad”的值

显而易见，这也是为什么在循环的时候，通常我们不会去选择for/in的原因，因为其他的循环方式都可以正确的忽视非数值的值 。

**摘要**:除非你要确定要迭代非数字键和继承键，否则请避免使用`for/in`


**空元素**
js数组允许空元素，在语法中这是合法的，并且下面的例子长度是3.

```js
const arr = ['a',,'c'];

arr.length; //3

```
令人困惑的是，循环结构的处理```['a','c']``` 也有不同的```['a',undefined,'c']```。下面是4个循环结构如何处理的呢。for/in 、forEach会跳过空元素，但是for，for/of并不会。

```js
function ab(){
	const arr = ['a',,'c'];

	for(let i in arr){
		console.log(arr[i]);
	}

	arr.forEach((v,i)=>{
		console.log(v);
	})

	for(let i of arr){
		console.log(i);
	}

	for(let i=0;i<arr.length;i++){
		console.log(arr[i]);
	}
}
ab();
```
此外还有另一种方式将空元素添加到数组中:

```js
const arr = ['a', 'b', 'c'];
arr[5] = 'e';  //`['a', 'b', 'c',, 'e']`
```

forEach()并且for/in跳过在阵列中的空元素，for并且for/of没有。这种forEach()行为可能会导致问题，但JavaScript数组中的漏洞通常很少见，因为它们在JSON中不受支持：

```js
> JSON.parse('{"arr":["a","b","c"]}')
{ arr: [ 'a', 'b', 'c' ] }
> JSON.parse('{"arr":["a",null,"c"]}')
{ arr: [ 'a', null, 'c' ] }
> JSON.parse('{"arr":["a",,"c"]}')
SyntaxError: Unexpected token , in JSON at position 12
```

**函数上下文**

函数上下文是js中很其他的一种方式*this*。for for/in for/of都可以保持自身之外的this的值，但是forEach()却有些不同，除非你使用剪头函数。

```
'use strict'; //严格模式下

const arr = ['a'];

// Prints "undefined"
arr.forEach(function() {
  console.log(this);
});
```

**Async/Await and Generators**

另外一个边缘情况对于```forEach()```就是它不会很好的工作，当与async/await一起使用的时候，如果说你的forEach()的回调是异步的这没关系，但是你不能在await里使用forEach();

```js
async function run() {
  const arr = ['a', 'b', 'c'];
  arr.forEach(el => {
    // SyntaxError
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  });
}
```
同时你也不可以使用yield：

```js
function* run() {
  const arr = ['a', 'b', 'c'];
  arr.forEach(el => {
    // SyntaxError
    yield new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  });
}
```

但是上面的例子可以在for/of下很好的工作：

```js
async function asyncFn() {
  const arr = ['a', 'b', 'c'];
  for (const el of arr) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  }
}

function* generatorFn() {
  const arr = ['a', 'b', 'c'];
  for (const el of arr) {
    yield new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  }
}
```

*即使你将forEach回调标记位async，你也在异步中遇到很大的麻烦，下面这个列子将相反的顺序打印0-9*

```js
async function print(n) {
  // Wait 1 second before printing 0, 0.9 seconds before printing 1, etc.
  await new Promise(resolve => setTimeout(() => resolve(), 1000 - n * 100));
  // Will usually print 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 but order is not strictly
  // guaranteed.
  console.log(n);
}

async function test() {
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(print);
}

test();
```

###### 如果你正在使用async/await或者generator，请记住这forEach()是语法糖，你应该谨慎使用使用。


### 结论

通常，for/of是JavaScript中迭代数组的最强大的方法。它比传统的更简洁的for循环，并没有许多边缘事例 for/in和forEach()。主要的缺点fro/of是你需要做额外的工作来访问索引(1),forEach()有几个边缘案例，应该谨慎使用，但是很多情况下，它使代码更简洁。

**tips: 要在for/of循环中访问当前数组索引，可以使用Array#entries()函数。**

```js
for (const [i, v] of arr.entries()) {
  console.log(i, v); // Prints "0 a", "1 b", "2 c"
}
```








