## 1.块级元素与内联元素
* 块级元素(默认block)可以设置宽高，独占一行
* 内联元素(默认inline)不可以设置宽高，和其他内联元素同一行
* 内联元素:a,span,td,input,button
* 而display可以让内联元素和块级元素进行转化

## 2.新窗口打开
* 对于a标签来说，有一个属性target,默认为_self,就是在本窗口打开
* 设置为_blank就是在新窗口打开,另外iframe的name属性配合a标签的target属性实现页面局部刷新
* _parent -- 在父窗体中打开链接
* _top -- 在当前窗体打开链接，并替换当前的整个窗体(框架页)

## 3.置换元素与不可置换元素
* 置换元素:内容不受css视觉格式化模型控制，css渲染也不考虑对该元素的内容渲染，该元素本身拥有一定尺寸(宽度高度)
* 不可置换元素:html中的大多数元素都是不可置换元素，内容可以直接表现在浏览器端
* `为什么有些元素是内联元素却可以设置宽高?例如图片img`
* 这是因为img是置换元素，浏览器会根据它的标签和属性来决定元素的显示位置和大小，而且即使只设置了宽度，图片高度也会自适应显示
* 置换元素:img,textarea,input,button,select
* `内联的不可置换元素设置宽高是没用的，如span,内联的不可置换元素的宽高默认为内容大小,所以想要改变span宽高需要设置的是width和line-height`
```		
<span style="width: 1000px;background: rgba(7,17,27,.5);height: 100px;">内联的不可置换元素设置宽高是没用的，如span</span>
<img src="../小米/img/after/2.png" style="width: 300px;">
```

## 4.h5新增元素
1. article元素:代表文档，页面或者应用程序中独立的，完整的，可以独立被外部引用的内容；
2. aside元素:代表页面或者文章的附属信息部分
3. nav元素:用作页面导航的连接组,h5中不要用menu元素代替nav元素,menu元素使用在发出命令的菜单中，是一个交互的元素
4. section元素:用于对网站或者应用程序页面上的内容进行分块
5. header元素:定义文档的页眉，介绍内容
6. footer内容:定义文档的页脚
7. figure元素:用作文档中插图的图像,标签规定独立的流内容
8. figcaption:figcaption元素可以被添加到figure标签内部，包含了对图片的完整说明

## 5.h5废除元素
1. 能被css代替的元素:basefont,big,center,font,s,strike,tt,u
2. 不再使用frameset框架,fraameset,frame,noframes。h5只支持iframe框架

## 6.标签语义化
* h5的语义化是对文本内容和意义的补充说明，也就是告诉我们这一块内容是什么意义；至于内在样式，以及表现由css来执行

## 7.响应式网页设计
* 响应式网页设计就是一个网站能够兼容多个终端，而不是为每个终端做一个特定的版本。这样，我们就可以不必为不断到来的新设备做专门的版本设计和开发了。

## 8.部分元素
* hr元素表示一条横线
* br元素表示换行
* p元素表示段落
* b元素表示粗体
* `em,strong元素表示强调，不是粗体！`
* tr表示一行
* td表示一个单元格

## 9.html元素显示优先级
* 在html元素中，帧元素(frameset)的优先级最高，然后是表单元素，最后是非表单元素
1. 表单元素有:select列表框 输入框 密码框 textarea文本框 复选框
2. 非表单元素:剩下的都是！
---
* 根据有无窗口，Html元素又可以分为有窗口元素，无窗口元素，有窗口元素的优先级大于无窗口元素
1. 有窗口元素:select object frames等
2. 无窗口元素:剩下的

## 10.DHTML
* DHTML(dynamic html)是指动态html，是相对传统的静态html而言的。
* dynamic html其实是css,html4.0,js的组合，并不是一门新的语言，DHTML是一种让页面具有动态特性的艺术
* DHTML不是W3C的标准，而是网景公司和微软用来描述4.x代浏览器应该支持的技术

## 11.xhtml
* xhtml可拓展超文本标记语言和html类似，也是一门标记语言，不过更加严格
* XHTML在2000年成为W3C的一个标准，但是与html相比，xhtml还是太小众了

## 12.table元素
* tr指的是行
* td/th指的是一个单元格，th就是td的加粗形式(header嘛，所以大点粗点)
* table元素默认有三个样式：border指的是元素格之间的边缘线；cellspacing指的是单元格之间的间隙；cellpadding指的是单元格内部的内边距

## 13.修改月份
```
	var date=new Date('2019-05-16');
	console.log(date);//May
	// 修改月份第一种方式
	date.setMonth(5);//修改为6月
	// 在月份中是以0为起始索引的,所以5指的就是6月!
	console.log(date);//June
	
	// 第二种方式
	date.setDate(30);
	// 如果这个月只有30天,那么setDate(1~30)指的都是直接修改日期中的日就可以了
	// 但是如果设置的n>30,那么就会到下一个月啦!
	console.log(date);
	//  下个月几号=n-30,如果是40-30,那么就是下一个月10号!
	date.setDate(40);
	console.log(date);
```


