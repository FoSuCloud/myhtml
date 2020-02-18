## 两栏布局
```
		<div class="one">
			<!-- 浮动+margin-left -->
			<div class="outer1">
				<div class="left left1"></div>
				<div class="right right1"></div>
			</div>
			<!-- flex -->
			<div class="outer2">
				<div class="left left2"></div>
				<div class="right right2"></div>
			</div>
			<!-- 左absolute定位+margin-left -->
			<div class="outer3">
				<div class="left left3"></div>
				<div class="right right3"></div>
			</div>
			<!-- 右absolute -->
			<div class="outer4">
				<div class="left left4"></div>
				<div class="right right4"></div>
			</div>
		</div>
		
		.left{
			width: 200px;
			height: 100px;
		}
		.right{
			height: 100px;
		}
		/* 浮动+margin-left */
		.outer1{
			background: black;
		}
		.left1{
			float: left;
		}
		.right1{
			background-color: red;
			margin-left: 200px;
		}
		/* flex */
		.outer2{
			display: flex;
		}
		.left2{
			width: 200px;
			background-color: green;
		}
		.right2{
			flex: 1;
			background: yellow;
		}
		/* 左定位absolute+margin-left */
		.outer3{
			position: relative;
		}
		.left3{
			position: absolute;
			left: 0;
			top: 0;
			width: 200px;
			background: red;
		}
		.right3{
			margin-left: 200px;
			background: gray;
		}
		/* 右定位absolute */
		.outer4{
			position: relative;
		}
		.left4{
			width: 200px;
			background: yellow;
		}
		.right4{
			position: absolute;
			left: 200px;
			background-color: red;
			top: 0;
			right: 0;
		}
```

## 三栏布局
```
			<!-- 1.左右绝对定位，中间margin -->
			<div class="outer1">
				<div class="left1"></div>
				<div class="mid1"></div>
				<div class="right1"></div>
			</div>
			<!-- 2.左右浮动+中间margin -->
			<div class="outer2">
				<div class="left2"></div>
				<div class="right2"></div>
				<!-- 中间需要放在最后，否则mid2的margin会占据位置,float不能出现在右边而是出现在下一行 -->
				<div class="mid2"></div>
			</div>
			<!-- 3.左右flex:0+中间flex1 -->
			<div class="outer3">
				<div class="left3"></div>
				<div class="mid3"></div>
				<div class="right3"></div>
			</div>
			
			div{
				height: 100px;
			}
			/* 左右absolute+中间margin */
			.outer1{
				position: relative;
			}
			.left1{
				position: absolute;
				left: 0;
				top: 0;
				width: 100px;
				background-color: red;
			}
			.right1{
				position: absolute;
				right: 0;
				width: 200px;
				top: 0;
				background-color: green;
			}
			.mid1{
				margin: 0 200px 0 100px;
				background-color: black;
			}
			/* 左右浮动+中间margin */
			.left2{
				float: left;
				background-color: gray;
				width: 100px;
			}
			.right2{
				float: right;
				background-color: #FF0000;
				width: 200px;
			}
			.mid2{
				margin: 0 200px 0 100px;
				background-color: yellow;
			}
			/* 左右flex0+中间flex1 */
			.outer3{
				display: flex;
			}
			.left3{
				flex: 0 0 100px;
				background-color: yellow;
			}
			.right3{
				flex: 0 0 200px;
				background-color: blue;
			}
			.mid3{
				flex: 1 0 auto;
				background-color: antiquewhite;
			}
```

## 圣杯布局和双飞翼布局
1. `圣杯布局和双飞翼布局也是三栏布局，不同之处在于圣杯布局和双飞翼布局是先渲染中间栏！`
2. `圣杯布局通过父元素margin+中间栏float+左右栏负margin+relative实现`
3. `双飞翼布局比圣杯布局的中间栏多了一层div,inner div width:100% float；mid: padding `
4. `某种程度上，双飞翼布局更好一点，代码也更简洁一点`
```
<!-- 圣杯布局 父元素margin+中间栏float width100%+左右栏float 负margin relative实现 -->
			<div class="outer1">
				<div class="mid1"></div>
				<div class="left1"></div>
				<div class="right1"></div>
			</div>
			<!-- 双飞翼布局 父元素不需要设置margin +中间栏比圣杯布局多了一层div -->
			<div class="outer2">
				<div class="inner2">
					<div class="mid2"></div>
				</div>
				<div class="left2"></div>
				<div class="right2"></div>
			</div>
			
			div{
				height: 100px;
			}
			/* 圣杯布局 父元素margin+中间栏float width 100%+左右栏负margin+relative */
			.outer1{
				margin: 0 200px 0 100px;
			}
			.mid1{
				float: left;
				width: 100%;
				background-color: red;
			}
			/* 相当于 | 100px|   |200px, 然后float，继续margin-left:100%就是从 |200px这个位置开始移动  */
			.left1{
				float: left;
				width: 100px;
				position: relative;
				left: -100px;
				margin-left: -100%;
				background: gray;
			}
			.right1{
				float: left;
				width: 200px;
				background-color: blue;
				/* 此处设置margin-left -100%的话 如果宽度太小可能导致三栏变两行 */
				margin-left: -200px;
				<!-- 注意:margin-left为负，left为正，margin-left为负才能相对原来位置移动！ -->
				position: relative;
				left: 200px;
			}
			
			/* 双飞翼布局 */
			.outer2{
				margin-top: 200px;
			}
			.inner2{
				float: left;
				width: 100%;
			}
			.mid2{
				background: gray;
				margin: 0 200px 0 100px;
			}
			/* 因为双飞翼布局的结构不太一样，所以 |100px|   |200px| */
			/* float的元素是从200px| 这里开始时移动，所以不需要position:relative了！ */
			.left2{
				float: left;
				margin-left: -100%;
				background-color: red;
				width: 100px;
			}
			.right2{
				float: left;
				margin-left: -200px;
				background-color: yellowgreen;
				width: 200px;
			}
```

## border-width绘制三角形及三角形的组合
```
			<div class="angle1"></div>
			<div class="angle2"></div>
			<div class="angle3"></div>
			
			div{
				height: 0px;
				width: 0;
				margin: 20px;
				border-style: solid;
				border-color: blue transparent transparent transparent;
			}
			/* 等腰直角三角形 */
			.angle1{
				border-width: 10px;
			}
			/* 等边三角形 */
			/* 需要先进行计算，底边长设为10,高就是 (10^2-(10/2)^2)^(1/2)=10*根号3 也就是17.3 */
			.angle2{
				/* border-width:  10px 17.3px; 这样是错误的，因为设置之后，高度=20px,宽度=34.6px*/
				border-top-width: 17.3px;
				border-bottom-width: 17.3px;
				border-left-width: 10px;
				border-right-width: 10px;
				/* 需要注意，当不存在宽高时 相当于堆积面积，不是传统的上下左右边距！ */
				/* 高度=border-top-width+border-bottom-width */
				/* 宽度=border-left-width+border-right-width */
			}
			/* 绘制收藏图标，也就是上三角+左右三角 */
			.angle3{
				/* 左右宽度一致，下面更宽点，为了下面空白处更长点 */
				border-width: 80px  70px 100px;
				border-color: blue blue transparent;
			}
```
* `需要注意:border不是margin/padding,不是外边距或者内填充，相当于面积的堆积！！`
* `在宽高为0时：高度=border-top-width+border-bottom-width；宽度=border-left-width+border-right-width`
* `所以等边三角形才会那样设置宽度`

## 自适应正方形
```
			/* 1.如果父元素是块级元素，那么可以通过设置宽度百分比(相当于百分比vw)+高度vw */
			.squre1{
				width: 10%;
				height: 10vw;
				background-color: red;
			}
			/* 2.只设置宽度百分比，高度根据padding-top设置，因为padding/margin的百分比是根据父元素宽度设置的！ */
			.squre2{
				width: 10%;
				height: 0;
				padding-top: 10%;
				background-color: green;
			}
			/* 3.设置元素宽度百分比，height不设置！,overflow:hidden生成BFC然后通过元素伪元素设置margin-top,因为margin的颜色随父元素，padding的颜色随子元素 */
			.squre3{
				width: 10%;
				background-color: blue;
				overflow: hidden;
			}
			.squre3::after{
				content: '';
				display: block;
				/* 设置margin-top也就是高度=宽度 */
				margin-top: 100%;
			}
```
* `四分之一圆`
```
			/* 1/4圆 border-color+border-radius */
			.sector1{
				border-width: 100px;
				border-radius: 50%;
				border-style: solid;
				border-color: blue transparent transparent transparent;
				width: 0;
				height: 0;
			}
```


## 水平居中
1. `文字，图片等行内元素水平居中使用text-align: center;`
2. `确定宽度的块级元素水平居中使用margin-left:auto;margin-right:auto;`
3. `不确定宽度！不确定宽度的块级元素对父元素使用float:left;position:relative;left:50%;子元素使用position:relative;left:-50%;实现水平居中`
* `对父元素使用float:left之后，父元素的类型变为display:inline-block;所以宽度随子元素变化，父元素的left:50%还是对他的父元素宽度的百分比`
* `子元素的left:50%是对父元素的宽度的百分比，也就是自己宽度的一半！！！`
```
		<div class="father">
			<div class="child">我是子元素，水平居中</div>
		</div>
		.father{
			position: relative;
			left: 50%; 
			/* 50%相对父元素的父元素宽度 */
			float: left;
			/* float:left在此处的作用就是把父元素变为行内块元素，所以直接用display:inline-block;也是可以的 */
			/* display: inline-block; */
			top: 0;
		}
		.child{
			position: relative;
			/* 50%相对父元素的宽度，而父元素是行内块元素，所以宽度由子元素撑开，也就是相对于自己的一半宽度！ */
			left: -50%;
			top: 0;
		}
```

## 垂直居中
1. `父元素高度不确定的情况下，文本图片等行内元素和块级元素都可以使用 父相子绝 来实现垂直居中`
```
.one{
	width: 200px;
	background-color: aliceblue;
	height: 50%;
	position: relative;
}
.sector1{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	width: 50px;
	height: 50px;
	background-color: red;
}
```
2. `父元素高度确定的单行单行单行文本可以通过设置line-height行高来设置垂直居中`
3. `但是父元素高度确定的！情况下，文本图片等行内元素和块级元素设置垂直居中很麻烦`
* 但是父元素高度确定的！情况下，`一种笨方法是给父元素设置相对定位，子元素设置绝对定位，但是脱离了文档流，不利于维护！`

## 水平垂直居中
```
		<div>
			<div class="one">
				<div class="rel"></div>
			</div>
			<div class="two">
				<div class="flex"></div>
			</div>
			<div class="three">
				<div class="relt"></div>
			</div>
			<div class="four">
				<div class="fc">
					<span class="relf">43543543543543</span>
				</div>
			</div>
			<div class="five">
				<span class="textf">435435</span>
			</div>
		</div>
		
		/* 父相子绝(子元素宽度确定) */
		.one{
			width: 200px;
			background-color: aliceblue;
			height: 100px;
			position: relative;
		}
		.rel{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 50px;
			height: 50px;
			background-color: red;
		}
		
		/* flex定位 */
		.two{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 300px;
			height: 200px;
			background-color: greenyellow;
			margin-top: 50px;
		}
		.flex{
			background-color: antiquewhite;
			width: 50px;
			height: 50px;
		}
		
		/* 父相子绝+margin(子元素宽度确定) */
		.three{
			position: relative;
			width: 200px;
			height: 100px;
			background-color: aliceblue;
		}
		.relt{
			position: absolute;
			/* 由于margin-top与margin-left的百分比都是相对于父元素宽度的·
			 所以百分比设置在left top*/
			margin-top: -25px;
			margin-left: -25px;
			width: 50px;
			height: 50px;
			background-color: red;
			left: 50%;
			top: 50%;
		}
		
		/* 父相子绝(子元素宽度不确定) */
		.four{
			width: 200px;
			height: 100px;
			background-color: red;
			margin-bottom: 100px;
		}
		/* 给子元素额外添加一个父元素，父元素设置相对定位，
		display:inline-block；宽度跟随子元素自适应 */
		.fc{
			position: relative;
			top: 50%;
			left: 50%;
			/* 需要注意一点，需要知道父元素的高度，否则垂直居中此时失效 */
			height: 20px;
			background-color: green;
			display: inline-block;
		}
		/* 子元素设置相对定位，margin-left,margin-top跟随父元素 */
		.relf{
			position: relative;
			display: inline-block;
			left: -50%;
			top: -50%;
			background-color: aqua;
			font-size: 12px;
		}
		
		/* 父相子绝(文本不确定宽度)+text-align+lien-height */
		.five{
			position: relative;
			width: 200px;
			height: 100px;
			background-color: gray;
			margin-bottom: 100px;
		}
		.textf{
			text-align: center;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			height: 50px;
			line-height: 50px;
			background-color: bisque;
		}
```

## 清除浮动
```
		<div>
			<div class="one">
				<div class="two"></div>
			</div>
			<div class="three">
				<div class="four"></div>
			</div>
			<div class="five">
				<div class="six"></div>
			</div>
			<div class="seven">
				<div class="eight"></div>
				<div></div>
			</div>
		</div>
		
		/* 清除浮动 */
		/* 1. 父元素float,但是不可取，因为会影响到父元素这一层，不稳定 */
		.one{
			float: left;
			background: red;
			padding: 10px;
		}
		.two{
			float: left;
			width: 100px;
			height: 20px;
			background-color: gainsboro;
		}
		/* 2.父元素设置overflow:hidden */
		.three{
			overflow: hidden;
			padding: 10px;
			background-color: black;
		}
		.four{
			background-color: green;
			width: 100px;
			height: 20px;
			float: left;
		}
		/* 3. 设置父元素伪元素after清除浮动 clear:both */
		.five{
			background-color: blue;
			margin-top: 10px;
			padding: 10px;
		}
		.six{
			width: 100px;
			height: 20px;
			background-color: antiquewhite;
			float: left;
		}
		.five::after{
			clear: both;
			display: block;
			content: '';
		}
		/* 4.给子元素添加一个空标签设置clear:both */
		.seven{
			padding: 10px;
			background-color: gray;
			width: 300px;
			margin-top: 10px;
		}
		.eight{
			float: left;
			width: 100px;
			height: 20px;
			background-color: yellow;
		}
		.eight +div{
			clear: both;
		}
```

## 横向滚动
```
		<div class="nav">
		        <div class="item">item1</div>
		        <div class="item">item2</div>
		        <div class="item">item3</div>
		        <div class="item">item4</div>
		        <div class="item">item5</div>
		        <div class="item">item6</div>
		        <div class="item">item7</div>
		        <div class="item">item8</div>
		        <div class="item">item9</div>
		</div>
		
		/* flex+scroll-x 实现 */
		/* .nav{
			height: 30px;
			padding: 3px;
			border: 1px solid black;
			display: flex;
			flex-wrap: nowrap;
			overflow-x: scroll;
		}
		.item{
			background-color: aqua;
			font-size: 12px;
			line-height: 30px;
			margin-right: 15px;
			width: 100px;
			text-align: center;
			flex: 1 0 auto;
		}
		.item:last-child{
			margin: 0;
		} */
		
		/* inline-block 和 white-space: nowrap; 实现 */
		.nav{
			white-space: nowrap;
			overflow-x: scroll;
			border: 1px solid red;
			padding: 5px;
			height: 30px;
		}
		.item{
			background-color: aliceblue;
			font-size: 12px;
			text-align: center;
			line-height: 30px;
			display: inline-block;
			margin-right: 15px;
			width: 100px;
		}
		/* 对于webkit内核的浏览器可以隐藏滚动条 */
		.nav::-webkit-scrollbar {
			display: none;
		}
```
