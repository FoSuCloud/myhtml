## 1.选择器权重
* 内联 权重1000 ;ID 选择器 权重：100; 类 伪类 属性选择器 权重：10 ; 元素选择器 权重：1 
* 属性选择器权重10，a[href] {color:red;}，只对有href属性的a标签应用该样式
* `通用选择器（*），子选择器（>）和相邻同胞选择器（+）0...`并不在这四个等级中，所以他们的权值都为0
* +兄弟择器需要选择紧邻某个元素之后`一个元素`，而且两者有相同的父元素，如 .one+p{color:red}; .one和p元素的父元素为div
* ~兄弟选择器选择某个元素之后的`所有兄弟节点`。
* 除!important 外，内联权重最大！

## 2.line-height,font-size,vertical-align
* 1. 对于对齐来说，一个div内包裹着一个图片与单行短文本，图片默认对准着文本的基线(基线之下有一丢丢像素)，所以实际上是没有对齐的
* 解决方法: 图片:vertical-align:bottom,设置图片对齐文本的底部
* 这样子勉强还可以，但是文本默认有一定的line-height(文本内容区+文本框内高度),所以要直接对准文字需要对文本使用line-height:0
* 2. 对于间距上来说，一个div内包裹着一个图片与单行短文本，图片与文本的左右间距是存在的，当我们需要精确的屏幕像素时是不允许的
* 解决方法: 对父元素div,font-size:0;使得内联非置换元素的直接消失，所以我们需要给文本元素添加font-size:12px这样，然后我们再看水平方向，图片与文本之间的左右间距就消失了
* [参考链接](https://blog.csdn.net/u010250808/article/details/78347814)
`这方面的知识还比较薄弱~`

## 3.display与visibility
* 使用display:none是把元素从视觉角度消失掉，而且元素出现时候占据的位置不会依旧占据，而visibility:none虽然也是会隐藏，但是依旧占据之前的位置
* visibility依旧在文档流中占据位置，可以视为透明度为0，浏览器也会解析这个元素;而使用display:none的话，浏览器不会解析这个元素；
* 而我们使用display:none有一个坏处就是会消耗资源，因为切换display:none会导致浏览器重排，重新绘制及重新排布位置；而visibility:none仅仅是触发重绘，因为位置及元素大小没有改变

## 4.BFC
* BFC（block formatting context）块级格式化上下文,明确一点:块级格式化上下文依旧在普通文档流中，区别就在于BFC中的元素布局不会影响到外部，而且外部也不会影响到里面的元素布局；
* 创建BFC块级格式化上下文有几种方式: 1. float的值不是none; 2. position的值不是relative,static；3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex； 4.`最常用的是overflow:hidden，这也是创建一个块级格式化上下文`
* 1. 引用场景`margin外边距折叠`:当我们创建一个结构为 : div-{ p p} 其中p元素有margin：10px的时候，我们两个p元素的边距不是预计的20px而是10px,因为发生了`margin外边距折叠`,解决这个问题可以用BFC，因为此时的两个p元素同属于一个块级元素(div是块级元素),同时p元素也是块级元素，所以就是一个块级元素中嵌套着两个块级元素,由于两个p块级元素是在div块级元素里面的,所以margin范围也在div中，而两个p元素的margin范围不在自己的范围内，所以也会发生margin外边距重叠的问题，而给p元素嵌套一个div就可以让p元素的margin处于自己的范围内，所以解决方法就是 ： div{p div{p}}，然后第一个p元素与子元素的div就会有20px的边距，因为子元素的div宽高已经包括了内在的p元素的margin范围
* 2. `父元素高度坍塌`:例子结构为 div{div,div},给子元素div设置浮动，然后给子元素div设置宽高，然后给父元素div设置一个背景色，可以发现父元素的背景不包括子元素，因为子元素浮动脱离了文档流，然后父元素没有设置高度，所以父元素没有包裹住的元素，因此父元素就产生了`高度坍塌`，如果要让父元素包裹住子元素的话，有两种方式，第一种是`给父元素一个浮动`，那么我们就会发现父元素会包裹住子元素，并且宽度不再是独占一行了，因为此时的父元素仅仅是一个宽高依靠子元素撑开的块级格式化上下文；第二种方式:`给父元素使用overflow:hidden清除浮动`，overflow:hidden本质上就是寻找子元素的高度，然后计算出父元素的高度，因为得到了父元素的高度，那么自然也就撑开了高度；在另一种场景中，如果我设置父元素的高度，然后设置overflow:hidden,那么父元素的高度只能是这么多，超出的子元素部分就会隐藏掉

## 5.flex-basis
* `content-width-flx-basis`,当有content,width属性的时候，flx-basis默认为width的大小；当有content,没有width属性的时候，flx-basis默认为content大小
* 当设置了width,flex-basis的时候，宽度为flx-basis的设置值；flex非常适用用于响应式网页设计，特别是使用max-width,min-width可以限制最大最小宽度，flex-grow,flex-shrink设置扩大缩小比例

## 6.utf8/gbk
* gbk编码是国内使用较多的编码，但是`只能用于简体中文`
* utf-8编码是国际上用的多的编码，可以识别简体中文，繁体中文，日文，韩文，英文，阿拉丁文等语言

## 7.link和@import的区别
1.link是xhtml标签，没有兼容性问题，而@import是css2.1才被提出的，低版本的浏览器不支持
2.link支持加载css,js，而@import只能加载css
3.link加载的内容是和页面一起加载的，而@import加载的内容要页面加载之后才被加载

## 8.css伪类选择器
* 静态伪类选择器
1. link:超链接点击之前
2. visited:链接被访问之后
* 动态伪类选择器
1. hover:鼠标放到标签上的时候
2. active:鼠标点击标签，不松手
3. focus:某个标签获得焦点的时候
---
* blur不是伪类选择器，但是在jq中blur()函数是失去焦点的意思

## 9. css中的色彩
1. rgb色彩
* 例子: color:rgb(255,0,0)指的是red:100%,green:0,blue:0,所以就出现了全红色
* rgb(0,0,0)指的就是红绿蓝都不亮，那就是黑了；如果是rgb(255,255,255)那就是全都亮了，所以就是亮瞎了，白色
2. HSL色彩
* HSL(Hue Saturation Lightness)分别指的是色相，色彩饱和度，色彩亮度
* 而Hue色相分为240度，0度的时候是红色，120度是绿色，240度是蓝色
3. HEX色彩
* HEX色彩其实也就是使用十六进制来表示色彩程度
* `一般来说，HEX色彩有六位，每两位表示一种色彩，分别是红绿黄`
* 例子:`#FF0000 => 红色； #00FF00绿色 ；#000000 黑色`
* `HEX色彩还可以用缩的形式(仅当每两位中的每一位都一样的时候可以缩写)`
* 例子: 	` #FF0000 => #F00 ; #338899 => #389`
* 但是，还存在一种情况，使用四位的HEX色彩，最后一位表示透明度
* 例子:` #FF0000 => #F00F 表示的是红色透明度为1的颜色 ；#F000 表示的是红色透明度为0的颜色(透明度为0也就看不见啦)`

## 10.input输入框内容位置颜色
1. 改变placeholder(默认内容)位置(`此处一定要使用两个冒号::`)
* `使用伪类 input::placeholder{position:relative left:20px}`
* 但是我错啦！其实直接对输入框使用padding-left就可以了，value的位置问题也解决了，之前一直弄不好
2. 改变value(值)位置
* `直接对输入框样式加上padding-left,这样placeholder内容也改变了(不需要设置relative了，变颜色就好了)，一举两得`

## 11.box-shadow/outline/border
1. box-shadow：阴影，大小`不会`影响到原来的元素大小，例子:`box-shadow:10px 10px blue`
2. outline:轮廓,大小也`不会`影响到原来的元素大小，例子:`outline:10px solid red`，而且随着focus会有相应的出现效果，随着blur会有离开效果
* `一个很重要的应用:在输入框input中使用outline:0 使得输入框被聚焦不会出现聚焦的效果`
3. border:边框，大小会影响到原来的元素大小,例子:`border:1px solid green`

## 12.animation-timing-function
1. linear：animation-timing-function
2. ease 默认：动画以低速开始，然后加快，在结束前变慢。
3. ease-in：动画以低速开始。
4. ease-out：动画以低速结束。
5. ease-in-out：动画以低速开始和结束
6. cubic-bezier(n,n,n,n)：	在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。

## 13.css百分比参考问题
1. `padding参考的也是父元素的宽度`,margin,width,text-indent`参考父元素的宽度`
2. height,`参考父元素高度`
3. line-height,font-size,`参考父元素属性`
* 虽然是参考父元素，但是不一定是`继承属性`
```
		<div class="one">
			<div class="two"></div>
		</div>
		.one{
			height: 100px;
			width: 50px;
			background-color: red;
		}
		.two{
			height: 30px;
			width: 30px;
			background-color: green;
			/* padding-top,margin-top都是相对于父元素的width的！ */
			/* 下面的50%都是25px */
			padding-top: 50%; 
			margin-bottom: 50%;
			display: inline-block;
		}
```
4. `注意:如果是一个元素设置overflow:hidden;产生BFC,然后设置伪元素after/before,那么就相当于伪元素是元素的子元素，::after的百分比就是相对于元素的`
5. `border-radius的百分比是相对于自身的宽度的`


## 14.css的calc()函数
* calc() 函数用于动态计算长度值。`但是兼容性有要求，所以尽量少用吧`
1. 需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
2. 任何长度值都可以使用calc()函数进行计算；
3. calc()函数支持 "+", "-", "*", "/" 运算；
4. calc()函数使用标准的数学运算优先级规则；

## 15.css盒子透明
* 对于盒子来说，margin和padding都会有背景透明，不同的是，`margin透明颜色取决于父元素；padding透明颜色取决于自己的颜色`

## 16.scoped
* `vue组件中的style标签标有scoped属性时表明style里的css样式只适用于当前组件元素 `
* 所以我们之前在vue项目中存在同名的class,id类名时才会发生样式混乱，样式被复用啦!

## 17.继承属性与不可继承属性
* html元素可以从父元素中继承一部分属性，即使该元素没有定义这个属性
1. 不可继承属性:background,display,margin,border,padding,`height`,min-height,float,clear,position
2. 所有元素可继承:visibility,cursor
3. 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
4. 终端块状元素可继承：text-indent和text-align。
5. 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。
6. 表格元素可继承：border-collapse。
7. 可以继承的属性很少，只有`颜色，文字，字体间距行高对齐方式，和列表的样式`可以继承

## 18.圣杯布局与双飞翼布局
* 圣杯布局和双飞翼布局都是把中间一栏先放前面，让文档流先解析
* 圣杯布局三栏使用左浮动float:left,注意三栏的父元素使用padding:0 100px有左右填充(这是左右栏的位置)，左边使用margin-left:-100%向左边移动100%宽度(一个middle大小)，右边使用margin-right:-100%向右移动一个middle大小(位于adding-right位置)
* `注意:此时左边栏还有左填充的位置，所以需要把左边栏加上position:relative,left:100px`
* `但是难以理解，所以左右都使用margin-left，左边移动父元素宽度，也就是左边移动到最左边，而右边使用marin-left:自己的宽度，移动到最右边`
* 可以看做都是从第一行的padding边缘开始移动，以右边缘接触子元素的左边距(出现颜色的地方)
```
	<div class="one">	
		<div class="middle"></div>
		<div class="left"></div>
		<div class="right"></div>
	</div>
```
* css样式
```
	.one{
			padding: 0 100px;
		}
		.middle,.left,.right{
			height: 50px;
			float: left;
		}
		.middle{
			//这里的width:100%的确是占据了整个屏幕宽度，但是content部分需要减去padding部分宽度
			width: 100%;
			background: red;
		}
		.left{
			width:100px;
			background: green;
			margin-left: -100%;
			position: relative;
			left: -100px;
		}
		.right{
			width: 100px;
			background: blue;
			margin-left: -300px;
			position: relative;
			left: 300px;
		}
```
* `圣杯布局需要一定的宽度才会是三栏布局(否则换行)，也就是左宽度*2+右宽度，因为左宽度需要左移一个父元素content宽度也就是左边至少可以覆盖content，然后才可以left移动到padding位置，而右边的话直接覆盖padding位置就可以了`
---
* `双飞翼布局:和圣杯布局的区别就在于双飞翼布局对中间一栏使用嵌套，对父元素不使用padding,对中间一栏使用margin，然后左右两栏还是使用margin-left移动，但是不需要left相对定位了`
```
		.one{
			height: 50px;
		}
		.container,.left,.right{
			height: 50px;
			float: left;
		}
		.container{
			width: 100%;
		}
		.middle{
			background: #FF0000;
			margin: 0 300px 0 200px;
			height: 50px;
		}
		.left{
			width: 200px;
			background: green;
			margin-left: -100%;
		}
		.right{
			width: 300px;
			background: #00F;
			margin-left: -300px;
		}
```
* html
```
 <div class="one">	
		<div class="container">
			<div class="middle"></div>
		</div>
		<div class="left"></div>
		<div class="right"></div>
	</div>
```

## 19.media queries
* media queries的条件:`设备类型，设备像素比，设备高度,设备宽度，设备宽高比`。
* `width指的是浏览器宽度,device-width指的是设备最大宽度，不会随浏览器宽度变化而变化`
* media queries有两种使用方法,一种是:`link标签引入css文档，在这里判断media`，还有一种是`style标签中使用@media使用不同的样式`
* media queries有`and,or,not关键字负责逻辑`;媒体类型有`all,print,screen媒体类型`
* 例子:`有and关键字才能有与条件`
```
	<link rel="stylesheet" type="text/css" media="screen and (min-width:600px)" href="one.css"/>
	<link rel="stylesheet" type="text/css" media="all and (max-width:500px)" href="two.css"/>
```
* [参考](https://www.cnblogs.com/asqq/archive/2012/04/13/2445912.html)
* [MDN重要！](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)


## 20.盒子模型
* 标准W3C盒子模型
`content的宽度不包括padding,border`
* IE经典盒子模型
`content的宽度包括padding,border`
* 例子:
`一个div容器,content:200px,border:1px,padding:10px,margin:20px;`
* 对于W3C标准盒子模型来说,`容器占据的宽度为content+(border+padding+margin)*2=200+(1+10+20)*2=262`，`盒子的实际宽度width为content+border+padding=222px`
* 对于IE经典盒子模型来说,`容器占据的宽度为content(因为IE盒子模型的content就包含了padding+border)+margin*2=240px`,`IE盒子的实际宽度width为content=200px`
---
* `<div style="width:100px;height="100px;border:10px;padding:10px;"></div>`
* 对于W3C标准盒子模型,`实际宽度`为 100+(10+10)*2=140px
* 对于IE怪异盒子模型,`实际宽度`为content(包括了padding+border)=100px
---
* `实际中，仅仅设置padding:1px，padding是无效的，不会出现宽度，至少要设置边框样式如solid`

## 21.border
1. border:none表示没有边框样式，也就不会对该元素渲染边框，不会在这里消耗内存
2. border:0表示边框宽度为0，`虽然还是在浏览器上看不到边框，但是浏览器还是会对边框进行渲染，消耗内存`
3. `如border:1px,我们仅仅设置边框大小是不会显示出边框的，还必须设置边框的样式`
4. `我们使用border:none就是不存在边框，浏览器不会对边框进行渲染，宽度也就不存在了，没有实际宽度，宽度为0的说法是错误的!!!`


## box-sizing(控制元素的解析模型是W3C标准盒子模型还是IE怪异盒子模型)
1. 使用`content-box`表示使用W3C标准盒子模型，实际宽度=content+padding+border
2. 使用`border-box`表示使用IE怪异盒子模型，实际宽度=content,content就是content+padding+border的宽度了
```
	.one{
		box-sizing: content-box;
		width: 200px;
		border: 10px solid green;
		padding: 5px;
		margin: 20px;
		background: red;
		height: 200px;
	}
```
* 使用`box-sizing:content-box时，width=content+padding+border,也就是width=230px`
* 使用`box-sizing:border-box时，width=content,此时的content内部包含了padding和border,所以width=200px`

## css3新增伪类
1. :checked单选框或者复选框被选中
2. :enabled表示可用表单控件
3. :disabled表示`禁用`表单控件

## css3新增特性
1. 透明度opacity和颜色RGBA
2. 文字阴影text-shadow
3. 盒子模型阴影box-shadow
4. 背景图片background-image


## 不可读表单控件
* 在网页制作中，经常会用到表单控件，但是有时候我们希望表单是`不可修改的或者是禁用的`
1. `input readonly="readonly"`表示控件是只读的，`用户和键盘不可以修改控件的值，但是程序员可以通过js来修改，而且提交表单时这个控件的值也会提交到服务器，也就是说对服务器是可见的`
2. `input disabled="disabled"`表示控件是被禁用的，`用户不可以修改控件的值，也不会随着表单提交给服务器，所以对服务器是不可见的，但是程序员依旧可以修改这个控件!`

## div水平居中
```
	.one{
		border: 1px solid red;
		margin: 0 auto;
		width: 100px;
		height: 100px;
	}
```

## 浮动元素水平垂直都居中
```
	.one{
		border: 1px solid red;
		width: 100px;
		height: 100px;
		float: left;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -50px 0 0 -50px;
	}
```

## 非浮动元素绝对定位水平垂直居中
```
`.one{
	border: 1px solid red;
	width: 100px;
	height: 100px;
	position: absolute;
	<!-- 不设置margin:auto的话就会默认优先left,top为0，那么错了，所以必须让外边距自由 -->
	margin: auto;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
```

## 元素的border是由三角形组合而成!
1. 使用border画出三角形
```
.two{
	border-top:40px solid red;
	border-left: 40px solid transparent;
	border-right: 40px solid transparent;
	border-bottom: 40px solid transparent;
	width:0;
	height:0;
}
```
2. `transparent表示的是全透明黑色，相等于rgba(0,0,0,0)，也就是隐藏其他三个方向的元素border,显示出元素的border是由三角形构成的`
3. 另外需要给元素设置宽度高度为0，排除掉宽高影响
4. `当设置了宽度和高度之后，border的三角形就消失了`

## 为什么要初始化css样式
* 因为不同浏览器对一些标签的默认值是不同的，所以需要提前设定好默认值，例如*{padding:0,margin:0}

## visibility:hidden,display:none,opacity:0
1. 渲染上的区别: display:none后的元素在页面上彻底消失，渲染树也不渲染;visibility:none后的元素虽然也会消失，但是依旧占据着空间，所以只会导致重绘不会导致重排(reflow);opacity:0 虽然也是看不到元素，但是元素没有消失，还存在，空间也依旧被占有，只是看不见罢了，所以也不会触发重排(reflow)
2. 事件绑定上的区别:display:none 元素彻底消失，不会触发绑定事件(点击没反应); visibility:hidden 无法触发点击事件,因为`元素也是消失了，只是空间依旧被占据`罢了;opacity:0 可以触发点击事件，因为元素没有消失，只是看不见罢了
3. 动画属性的差异: display:none 完全不会被transition束胸影响，元素立即消失； visibility:hidden 元素消失的时间和transition属性设置的时间一样，但是没有动画效果；opacity:0 会出现正常的动画效果

## 选择器叠加
* 例子: 对h3标签的id选择器和class选择器进行叠加，权重也会叠加
```
<div class="one">
	<h3 id="two" class="twoclass">我是红色</h3>
</div>
.one h3#two.twoclass{
	color: red;
}
```
`虽然使用了id选择器，但是还是可以加上class选择器一起叠加使用`

