##CSS3

##边框

* border-radius圆角
* border-shadow阴影
* border-image

```js
div{
	box-shadow:10px 10px 5px #888
	}
div{
	box-image:url(border.png) 30 30 round
	}
```

##CSS3背景

* background-image
* background-size
* background-origin指定背景图像的位置区域，分为border-box，padding-box，和border-box三个属性，这三个的区域是从那向外可以放置背景图片
* background-clip

```js
div{
	background-image:url(image.png);
	background-position:right bottom left top;
	background-repeat:no-repeat,repeat
}
<!--简便写法-->
div{
	background:url(image.gif) right bottom no-repeat
}

div{
	background:url(img.gif);
	background-repeat:no-repeat;
	background-size:100% 100%;
	background-origin:content-box;
}
```

css3允许在元素上添加多个背景图片,第一个z-index在最上边

```js
div{
	background-image:url(img1.png),url(paper.png);
	background-position:right bottom,left top;
	background-repeat:no-repeat,repeat;
}
```

background-clip背景剪裁属性是指从指定位置开始绘制

```js
div{
	border:10px solid black;
	padding:35px;
	background:yellow;
	background-clip:content-box;
}
```

##CSS3渐变

* 线性渐变：向下／向上／向左／向右／对角方向
* 径向渐变：由它们的中心定义

为了创建一个线性渐变，必须至少定义两种颜色结点，颜色结点即想要呈现平稳过渡的颜色，同时也可以设置一个起点和一个方向（或一个角度），语法：

```js
background:linear-gradient(direction,color-stop1,color-stop2,...);
```
一般如果不写方向，默认从上到下

```js
#grad1 {
    height: 200px;
    background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(red, blue); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(red, blue); /* Firefox 3.6 - 15 */
    background: linear-gradient(red, blue); /* 标准的语法（必须放在最后） */
    }
```
线性渐变从左边到右，从红到蓝

```js
#grad {
  background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, red , blue); /* 标准的语法 */
}
```

线性渐变对角，从左上角开始到右下角，从红到蓝

```js
#grad1 {
    height: 200px;
    background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, red , blue); /* 标准的语法（必须放在最后） */
}
```
也可以定义角度来渐变，而不用预定义方向，0deg将创建一个从下到上的渐变，90deg将创建一个从左到右的渐变，注意有很多浏览器使用了旧的标准，即从0deg将创建一个从左到右的渐变，90deg将创建一个从下到上的渐变语法：

```js
background:linear-gradient(angle,color1,color2)
```

使用多个颜色结点

```js
#grad {
  /* Safari 5.1 - 6.0 */
  background: -webkit-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
  /* Opera 11.1 - 12.0 */
  background: -o-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
  /* Firefox 3.6 - 15 */
  background: -moz-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
  /* 标准的语法 */
  background: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet); 
}
```
使用透明度的渐变

```js
#grad1 {
    height: 200px;
    background: -webkit-linear-gradient(left, rgba(255,0,0,0), rgba(255,0,0,1)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, rgba(255,0,0,0), rgba(255,0,0,1)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, rgba(255,0,0,0), rgba(255,0,0,1)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); /* 标准的语法（必须放在最后） */
}
```
repeating-linear-gradient() 函数用于重复线性渐变

```js
#grad1 {
    height: 200px;
    background: -webkit-repeating-linear-gradient(red, yellow 10%, green 20%); /* Safari 5.1 - 6.0 */
    background: -o-repeating-linear-gradient(red, yellow 10%, green 20%); /* Opera 11.1 - 12.0 */
    background: -moz-repeating-linear-gradient(red, yellow 10%, green 20%); /* Firefox 3.6 - 15 */
    background: repeating-linear-gradient(red, yellow 10%, green 20%); /* 标准的语法（必须放在最后） */
}
```

css3径向渐变：为了创建一个径向渐变，你也必须至少定义两种颜色结点。同时，你也可以指定渐变的中心、形状（圆形或椭圆形）、大小。默认情况下，渐变的中心是 center（表示在中心点），渐变的形状是 ellipse（表示椭圆形），渐变的大小是 farthest-corner（表示到最远的角落）。语法：

```js
background:radial-gradient(center,shape size,start-color,...,last-color)
```
颜色结点均匀分布的径向渐变实例

```js
#grad1 {
    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(red, green, blue); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red, green, blue); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red, green, blue); /* Firefox 3.6 - 15 */
    background: radial-gradient(red, green, blue); /* 标准的语法（必须放在最后） */
}
```
颜色结点不均匀的径向渐变实例

```js
#grad1 {
    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(red 5%, green 15%, blue 60%); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red 5%, green 15%, blue 60%); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red 5%, green 15%, blue 60%); /* Firefox 3.6 - 15 */
    background: radial-gradient(red 5%, green 15%, blue 60%); /* 标准的语法（必须放在最后） */
}
```
shape参数定义了形状，circle表示圆形，ellipse表示椭圆形，默认值是ellipse

```js
#grad1 {
    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(red, yellow, green); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(red, yellow, green); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(red, yellow, green); /* Firefox 3.6 - 15 */
    background: radial-gradient(red, yellow, green); /* 标准的语法（必须放在最后） */
}

#grad2 {
    height: 150px;
    width: 200px;
    background: -webkit-radial-gradient(circle, red, yellow, green); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(circle, red, yellow, green); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(circle, red, yellow, green); /* Firefox 3.6 - 15 */
    background: radial-gradient(circle, red, yellow, green); /* 标准的语法（必须放在最后） */
}
```

size参数定义了渐变的大小，closest-side,farthest-side,closest-corner,farthest-corner

```js
#grad1 {
  /* Safari 5.1 - 6.0 */
  background: -webkit-radial-gradient(60% 55%, closest-side,blue,green,yellow,black); 
  /* Opera 11.6 - 12.0 */
  background: -o-radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
  /* Firefox 3.6 - 15 */
  background: -moz-radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
  /* 标准的语法 */
  background: radial-gradient(60% 55%, closest-side,blue,green,yellow,black);
}
 
#grad2 {
  /* Safari 5.1 - 6.0 */
  background: -webkit-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
  /* Opera 11.6 - 12.0 */ 
  background: -o-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
  /* Firefox 3.6 - 15 */
  background: -moz-radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
  /* 标准的语法 */
  background: radial-gradient(60% 55%, farthest-side,blue,green,yellow,black);
}
```
##CSS3文本效果

* hanging-punctuation,规定标点自负是否位于线框之外
* punctuation-trim，规定是否对标点字符进行修剪
* text-align-last，设置如何对齐最后一行或紧挨着强制换行符之前的行
* text-emphasis，向元素的文本应用重点标记以及重点标记的前景色
* text-justify，规定党text-align设置为‘justify’时所使用的对其方法
* text-outline，规定文本的轮廓
* text-overflow，规定当文本溢出包含元素时发生的事情
* text-shadow，向文本添加阴影，适用于文本阴影
* box-shadow，属于盒子阴影
* text-wrap，规定文本的换行规则
* word-break，规定非中日韩文本的换行规则
* word-wrap，允许对长的不可分割的单词进行分割并换行到下一行

```js
h1{
	text-shadow:5px 5px 5px #ff0000;//分别为水平阴影，垂直阴影，模糊的距离，以及阴影的颜色
}
div{
	box-shadow:10px 10px 5px #888
}
```
text-overflow最常用的一个实例

```js
p.test1{
	white-space:nowrap;
	width:200px;
	overflow:hidden;
	text-overflow:ellipsis
}
```
word-wrap里面属性有break-word,keep-all,break-all

##CSS3字体

* css3 @font-face规则，以前必须使用用户计算机上已经安装的字体，现在可以使用@font-face，在里面规定所需要的字体，然后打开浏览器时就会自动下载，在这个规则里面首先必须定义字体的名称，url请使用小写字母的字体，大写字母在IE中会产生意外的结果

```js
@font-face{
	font-family:myFirstFont;
	src:url(san.woff)；
	font-weight:bold;//使用粗体
}
div{
	font-family:myFirstFont
}
```
注意src后面可以有多个url，用逗号隔开

* font-stretch，是定义如何拉伸字体的，属性值有normal,condensed,ultra-condensed,extra-condensed,semi-condensed,expanded,semi-exanded,extra-expanded,ultra-expanded

##CSS3 2D转换transform

* translate()，根据左（X轴）和顶部（Y轴）位置给定的参数，从当前元素位置移动

```js
div{
	transform:translate(50px,100px);//向左移动50个像素，并从顶部移动100像素
	-ms-transform:translate(50px,100px;
	-webkit-transform:translate(50px,100px)
}
```

* rotate()方法,给一个度数顺时针旋转的元素，负值时允许的，这样是元素逆时针旋转

```js
div{
	transform:rotate(30deg)
}
```

* scale()方法，该元素增加或减少的大小，取决于宽度(X轴)和高度(Y轴)的参数

```js
div{
	transform:scale(2,3);
}
```

* skew()方法，包含两个参数，分别表示X轴和Y轴倾斜的角度，如果第二个参数为空，则默认为0，参数为负表示向相反方向倾斜

```js
div{
	transform:skew(30deg,20deg)
}
```

* matrix()方法，是和2D变换方法合并成一个，有六个参数，包含旋转，缩放，移动(平移)和倾斜功能

```js
div{
	transform:matrix(0.866,0.5,-0.5,0.866,0,0)
}
```

##CSS3 3D转换

* rotateX()方法，围绕其在一个给定度数X轴旋转的元素,rotateY()方法，围绕在一个给定度数Y轴旋转的元素

```js
div{
	transform:rotateX(120deg)
}
```

* 转换属性

	* transfrom：向元素应用2D或3D转换
	* transform-origin：允许你改变被转换元素的位置
	* transform-style：规定被嵌套元素如何在3D空间中显示
	* perpective：规定3D元素的透视效果
	* perspective-origin：规定3D元素的底部位置
	* backface-visibility：定义元素在不面对屏幕时是否可见

* 3D转换方法

	* matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n):定义3D转换，使用16个值的4X4矩阵
	* translate3d(x,y,z):定义3D转化
	* translateX(x):定义3D转化，仅使用用于X轴的值
	* translateY(y):定义3D转化，仅使用用于Y轴的值
	* translateZ(z):定义3D转化，仅使用用于Z轴的值
	* scale3d(x,y,z):定义3D缩放转换
	* scaleX(x):定义3D缩放转换，通过给定一个X轴的值
	* scaleY(y):定义3D缩放转换，通过给定一个Y轴的值
	* scaleZ(z):定义3D缩放转换，通过给定一个Z轴的值
	* rotateX(angle):定义沿X轴的3D旋转
	* rotateY(angle):定义沿Y轴的3D旋转
	* rotateZ(angle):定义沿Z轴的3D旋转
	* perspective():定义3D转换元素的透视视图

##CSS3过渡

css3过渡是元素从一种样式逐渐改变为另一种的效果，必须规定两个内容，第一是指定要添加效果的css属性，第二是指定效果的持续时间

```js
div
{
	width:100px;
	height:100px;
	background:red;
	transition:width 2s;
	-webkit-transition:width 2s; /* Safari */
}

div:hover
{
	width:300px;
}
```

* 多项改变，添加多个样式的变换效果，添加的属性由逗号分隔

```js
div {
    width: 100px;
    height: 100px;
    background: red;
    -webkit-transition: width 2s, height 2s, -webkit-transform 2s; /* For Safari 3.1 to 6.0 */
    transition: width 2s, height 2s, transform 2s;
}

div:hover {
    width: 200px;
    height: 200px;
    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
    transform: rotate(180deg);
}
```
* 过渡属性

	* transition：简写属性，用于在一个属性中设置四个过渡属性
	* transition-property：规定应用过渡的css属性的名称
	* transition-duration：定义过渡效果花费的时间，默认是0
	* transition-timing-function：规定过渡效果的时间曲线，默认是‘ease’
	* transition-delay：规定过渡效果何时开始，默认是0

	```js
	div{
	    transition-property: width;
	    transition-duration: 1s;
	    transition-timing-function: linear;
	    transition-delay: 2s;
	    /* Safari */
	    -webkit-transition-property:width;
	    -webkit-transition-duration:1s;
	    -webkit-transition-timing-function:linear;
	    -webkit-transition-delay:2s;
	}
	```
	
	## CSS3动画
	
	* CSS3 @keyframes规则是创建动画，在规则内指定一个CSS样式和动画将逐步从目前的样式更改为新的样式,在创建动画时，要将它绑定到一个选择器上，否则动画不会有任何效果

	```js
	@keyframes myfirst{
		from {background:red;}
		to {background:yellow}
	}
	```
	* 规定动画的名称和，规定动画的时长

	```js
	div{
		animation:myfirst 5s;
	}
	```
	
	* 可以用百分比来规定变化发生的时间，活用关键词‘from’和‘to’，等同于0%和100%，0%是动画的开始，100%是动画的完成

	```js
	@keyframes myfirst{
		0% {background:red;}
		25% {background:yellow;}
		50% {background:blue;}
		100% {background:green;}
	}
	@keyframes two{
		0% {background:red;left:0px;top:0px;}
		25% {background:yellow;left:200px;top:0px;}
		50% {background:blue;left:200px;top:200px;}
		75% {background:green;left:0px;top:200px;}
		100% {background:red;left:0px;top:0px;}
	}
	```
	
	* css3动画属性

		* @keyframes：规定动画
		* animation：所有动画属性的简写属性，除了animation-play-state属性
		* animation-name：规定@keyframes动画的名称
		* animation-duration：规定动画完成一个周期所花费的秒或毫秒，默认是0
		* animation-timing-function：规定动画的速度曲线，默认是‘ease’
		* animation-delay：规定动画何时开始，默认是0
		* animation-iteration-count：规定动画被播放的次数，默认是1
		* animation-direction：规定动画是否在下一周期逆向的播放，默认是normal
		* animation-play-state：规定动画是否正在运行或暂停，默认是‘running’

## CSS3 多列

	* column-count：指定元素应该被分割的列数
	* column-fill：指定如何填充列
	* column-gap：指定列与列之间的间隙
	* column-rule：所有column-rule-*属性的简写
	* column-rule-color：指定两列间边框的颜色
	* column-rule-style：指定两列间边框的样式
	* column-rule-width：指定两列间边框的厚度
	* column-span：指定元素要跨越多少列
	* column-width：指定列的宽度
	* columns：设置column-width和column-count的简写

##CSS3 多媒体查询

多媒体查询，意为针对不同的媒体类型制定不同的样式规则，媒体查询可用于检测很多，例如：

* viewport(视图)的宽度与高度
* 设备的宽度与高度
* 朝向(智能手机横屏，竖屏)
* 分辨率

多媒体查询语法：可以包含一个或多个表达式，表达式根据条件是否成立返回true或false

```js
@media not|only mediatype and (expressions){
	CSS 代码...;
}
```

如果指定的多媒体类型匹配设备类型则查询结果返回true，文档会在匹配的设备上显示指定样式效果，除非用了not或only操作符，否则所有的样式会适应在所有设备上显示效果

* not：not是用来排除掉某些特定的设备的，比如@media not print（非打印设备）
* only:用来定某种特别的媒体类型，对于支持Media Queries的移动设备来说，如果存在only关键字，移动设备的Web浏览器会忽略only关键字并直接根据后面的表达式应用样式文件。对于不支持Media Queries的设备单能够读取Media Type类型的web浏览器，遇到only关键字时会忽略这个样式文件
* all：所有设备

多媒体类型

* all：用于所有多媒体类型设备
* print：用于打印机
* screen：用于电脑屏幕，平板，智能手机等
* speech：用于屏幕阅读器

以下实例在屏幕可视窗口大于480像素的设备上修改背景颜色：

```js
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title></title> 
<style>
body {
    background-color: pink;
}

@media screen and (min-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
</style>
</head>
<body>

<h1>重置浏览器窗口查看效果！</h1>
<p>如果媒体类型屏幕的可视窗口宽度小于 480 px ，背景颜色将改变。</p>

</body>
</html>
```

以下实例在屏幕可视窗口尺寸大于480像素时将菜单浮动到页面左侧：

```js
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
<style>
.wrapper {overflow:auto;}

#main {margin-left: 4px;}
#leftsidebar {float: none;width: auto;}
#menulist {margin:0;padding:0;}

.menuitem {
    background:#CDF0F6;
    border:1px solid #d4d4d4;
    border-radius:4px;
    list-style-type:none;
    margin:4px;
    padding:2px;
}

@media screen and (min-width: 480px) {
    #leftsidebar {width:200px;float:left;}
    #main {margin-left:216px;}
}
</style>
</head>
<body>

<div class="wrapper">
  <div id="leftsidebar">
    <ul id="menulist">
      <li class="menuitem">Menu-item 1</li>
      <li class="menuitem">Menu-item 2</li>
      <li class="menuitem">Menu-item 3</li>
      <li class="menuitem">Menu-item 4</li>
      <li class="menuitem">Menu-item 5</li>
   </ul>
  </div>
  <div id="main">
    <h1>重置浏览器窗口查看效果！</h1>
    <p>在屏幕可视窗口尺寸大于 480 像素时将菜单浮动到页面左侧。</p>
  </div>
</div>

</body>
</html>
```



	
	