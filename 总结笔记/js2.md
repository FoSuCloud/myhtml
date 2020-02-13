## promise对象三种状态
1. 异步操作未完成(pending)
2. 异步操作已完成(resolved)
3. 异步操作失败(rejected)
* promise对象的状态变化情况只有两种，`从pending到resolved`,`从pending到rejected`

## 微任务
1. 例子:
```
	// 虽然setTimeout在前面,但是这是异步任务
	setTimeout(function(){
		console.log(3)
	},0)
	
	// 虽然promise也是异步任务,但是promise是微任务,在本轮循环中执行,而setTimeout是宏任务,在下一轮任务中执行
	new Promise(function(resolve,reject){
		resolve(2)
		// resolve执行成功后会把参数传递给then,然后就可以打印了
	}).then(console.log)

	// 这是同步任务,解析到这里就执行,所以首先执行这个
	console.log(1)
```
2. `对于js来说，有同步操作和异步操作，解析script标签内容的时候，先执行同步操作，再执行异步操作，但是任务又分为宏任务和微任务`
3. 异步任务(操作)指的是不进入主线程，而进入任务队列(task queue)的任务，只有任务队列通知主线程，某个异步任务可以执行了，异步任务才会进入主线程
4. `所有的同步任务都在主线程中执行，形成了执行栈`，除了主线程还有一个任务队列，只要异步任务有了结果，就在任务队列中放置一个事件
5. `所谓回调函数就是被主线程挂起来的代码，当主线程开始执行异步任务的时候，其实就是执行回调函数，所以必须指定回调函数`
6. 主线程从任务队列中读取异步任务的过程是循环不断的，所以也被称为`事件循环(event loop)`
7. `除了异步任务，任务队列还可以放置定时器事件(setTimeout,setInterval),定时器事件不属于异步任务，但是都是被放在任务队列中的`
8. 但是我们说了存在`宏任务与微任务`
* 宏任务一般是:整体代码script,setTimeout,setInterval
* 微任务:promise，process.nextTick
* `在我们首次执行完整体代码script的时候相当于第一次执行宏任务，执行完宏任务之后会先去执行微任务，然后再去执行下一轮宏任务(在例子中，setTimeout就是下一轮要被执行的宏任务，而promise属于本轮结束后立刻被执行的微任务，所以先执行promise的then函数再执行定时器任务)`

## hasOwnProperty
* obj.hasOwnProperty('val')方法是判断该对象obj中是否有val属性或者方法(`不能检测原型链中是否有该属性或者方法`)
* obj1.isPrototypeOf(obj2)方法是判断`obj2对象的实例是否在obj1对象的原型链中`

## Math
1. Math.round(11.5)==>12,Math.round(-11.5)==> -11
2. Math.max(..args),可以接受多个参数(`不支持直接传递一个数组，但是apply回调函数会把数组处理为一连串参数，所以可以使用apply传递数组`)，返回最大值，使用回调函数可以是`Math.max.call(1,3,2,5);Math.max.apply([5,3,2,7])`
```
	console.log(Math.max(2,3,542,55,4))
	console.log(Math.max.call(null,35,656,23,76))
	console.log(Math.max.apply(null,[5,3,12,7,23]))
```
3. -Math.ceil函数的用法Math.ceil(x) -- 返回`大于等于数字参数的最小整数`(取整函数)，对数字进行上舍入
```
	console.log(Math.ceil(6.5));//7
	console.log(Math.ceil(6.3));//7
	console.log(Math.ceil(6.7));//7
	console.log(Math.ceil(-6.7));//-6
	console.log(Math.ceil(-6.1));//-6
```
## of,in,forEach
```
	// 1. in方法可以遍历对象和数组,遍历对象的键,遍历数组的下标
	var obj={
		name:11,
		age:77,
		sex:'男'
	}
	var arr=[4,2,6,2]
	// 1.1 遍历对象的键
	for(i in obj){
		console.log(i);//打印属性(键)
	}
	// 1.2 使用in来遍历数组,遍历的是下标
	for(k in arr){
		console.log(k)
	}

	// 使用of方法来遍历数组的值,注意不能遍历对象
	// 2.1打印值,不能使用of打印对象的值,但是of可以遍历数组的值
	for(j of arr){
		console.log(j)
	}


	// forEach可以遍历数组,不可以遍历对象
	// 3.1错误,forEach不能遍历对象,只能遍历数组
	// arr.forEach( item => console.log(item))

	// 3.2 除非使用Object.keys().forEach()就可以遍历对象了
	Object.keys(obj).forEach(item => {
		console.log('1'+item)
	})
```

## 鼠标移入移出
1. `ie浏览器`:有onmouseenter,onmouseleace属性，表示鼠标移入和鼠标移出，`不会冒泡`
2. `其他浏览器`:有onmouseover,onmouseout属性，表示鼠标移入和鼠标移出，`会冒泡`

## 阻止冒泡及默认事件
1. IE浏览器:阻止冒泡e.cancelBubble=true;取消默认事件:e.returnValue=false;
2. 其他浏览器:阻止冒泡:e.stopPropagation;取消默认事件:e.preventDefault

## js的继承
* 有六种:`原型链继承，构造函数继承，组合继承，原型式继承，组合式继承，寄生组合式继承`
* [参考](https://www.cnblogs.com/Leophen/p/11401734.html)

## DOM树中的节点类型
1. element元素节点: 所有的元素节点(html标签)都是element nodes
2. text node文本节点:在html中的文本内容都是text nodes
3. comment注释节点:comments属于注释节点
4. document节点:可以说`是一种节点格式，但是节点数的根节点也是document`

## 创建对象(还不懂)
1. Object.create(obj,propertiesObject)：`obj是新创建的对象的原型`，`propertiesObject是新创建的对象的名称或者属性`
* Object.create的实现方式
```
Object.create=function(o){
	var F=function(){};
	F.prototype=o;
	return new F()
}
Object.create是内部定义一个对象，并且让F.prototype对象 赋值为引进的对象/函数 o，并return出一个新的对象
```
2. new func();实际上就是
```
var o=new Object();
o.__proto__=Base.prototype
Base.call(o)
```
* [参考](https://blog.csdn.net/blueblueskyhua/article/details/73135938)

## isNaN,parseInt函数
```
	// 1. isNaN()函数用来判断一个数是否是NaN;
	// 只有一个值是NaN或者能被转换为NaN的时候才返回true 
	console.log(isNaN('e'));//true,因为e可以被转换为NaN 
	console.log(isNaN('11'));//false,因为字符串可以被转换为数字,不能被转为NaN 
	console.log(isNaN(null));//false,因为null可以被转换为0,不能被转为NaN 
	console.log(isNaN(NaN));// true,NaN返回true
	
	// 2. parseInt(string,raix)函数有两个参数
	// 2.1 注意:string字符串只会被解析从第一个字符开始直到不是数字的字符部分
	console.log(parseInt('223'));//223
	// 2.2 当字符串中间存在非数字,那么就只解析前面是数字的部分字符
	console.log(parseInt('22e3'));//22
	// 2.3 如果字符串中第一个字符就不是数字,那么返回NaN 
	console.log(parseInt('e21'));//NaN
	
	// 对于parseInt()函数还有一个易考点,就是利用数组的下标,还记得parseInt()函数的第二个参数吗？
	// 2.4 parseInt()函数的第二个参数指的就是进制,这个参数小于2或者大于36的时候,都会返回NaN 
	console.log(parseInt(1,1));//NaN ,因为第二个参数是1表示1进制<2,所以错误
	console.log(parseInt(1,2));//1,因为表示二进制 =2,在范围内
	// 2.5 我们一般都是省略这个参数的,这个时候就是默认为10进制
	console.log(parseInt(99));//99
	// 2.6 我们第二个参数使用0的时候也是使用十进制
	console.log(parseInt(99,0));//99
	// 2.7 如果第一个参数前缀使用0x/0X则表示使用16进制
	console.log(parseInt(0x99));//153=16*9+9
	console.log(parseInt(0x99,10));//如果第一个参数使用了0x表示十六进制,那么第二个参数设置了值也无效
	// 2.8如果第一个参数前缀是0 则表示8进制
	console.log(parseaInt(017));//15 =1*8+7
	
	// 2.8 看一个实例,对于数组
	var arr=[1,2,3,2,5];
	console.log(arr.map(parseInt));//[1, NaN, NaN, 2, NaN]
	// arr.map方法就是对于数组arr里面的每一项都去使用方法里面的函数,最后返回新数组
	// 因为map方法会有索引,所以实际上就是 
	parseInt(1,0);//1,因为0表示十进制
	parseInt(2,1);//1进制<2，所以错啦!
	parseInt(3,2);// 2进制,但是3不在0——2范围内(3应该改为11),所以不符合2进制要求
	parseInt(2,3);//符合,因为三进制是0-3,而2在范围内
	parseInt(5,4);//4进制不包括5,所以NaN
```

## 暂时性死区(temporal dead zone)
* js引擎在扫描代码的时候，如果发现`var 声明就把声明放到所在作用域的顶部`，`如果是let/const声明 就把声明语句放到暂时性死区，只有等到执行变量声明之后变量才会从tdz中移出，移出之后才能被正常访问`
* 如果`提前使用了暂时性死区中的变量，那么就会报错referenerror`


## 模板字面量``
1. 多行字符串不需要用 + 加号隔开了，直接换行就可以
2. 变量嵌入字符串中也不需要用加号了，直接用 ${}
3. 可以在反字符串中进行简单的逻辑运算

## 默认参数也存在暂时性死区
```
	<!-- 1. -->
	function one(a=b,b=5){
		console.log(a,b)
	}
	// one();//ReferenceError: Cannot access 'b' before initialization
	// 2.相等于
	// let a=b;
	// let b=5;
	// console.log(a,b);//ReferenceError: Cannot access 'b' before initialization
	
	<!-- 3.使用var声明提前 -->
	var c=d;
	var d=5;
	console.log(c,d);//undefined 5 因为var存在声明提前
	
	<!-- 4.改变顺序就不会出错 -->
	function two(a=5,b=a){
		console.log(a,b)
	}
	// two();//5 5
```

## 默认参数值
* es6中新增了默认参数值，例如time(a,b=3,callback){},当我们使用time(1,2,3)时，b=2。当我们使用`time(1,2)时，a=1,b=2,callback=undefined`。
* 注意！当我们使用undefined，`time(1,undefined,function(){})的时候，b不变`，因为`使用undefined相当于没有赋值`，所以b还是使用默认值。
* 当我们使用null,time(1,null,function(){})的时候，b不使用默认值，因为此时`b使用传递过来的合法值null `

## 解释性语言
* 效率低:js就是解释性语言，解释性语言的程序不需要编译，`在运行程序的时候每执行一次编译一次`，所以`效率较低`
* `非独立`:js语言依赖于外部执行环境，不能独立存在，对于客户端来说就是浏览器，对于服务器来说就是node环境

## 阻止冒泡/默认事件
1.如果是IE浏览器
* 阻止冒泡:window.event.cancelBuble=true;
* 阻止默认事件:window.event.returnValue=false;
2. 阻止非IE浏览器
* 阻止冒泡:event.stopPropagation()
* 阻止默认事件:event.preventDafault();
3. 但是火狐浏览器不太一样,虽然火狐也是使用W3C标准的用法，但是注意火狐使用的`event一定是要从参数中传递过来的`

## js字符串方法
1. charAt:返回指定索引的字符
2. charCodeAt:返回指定索引出的unicode字符
3. indexOf:判断一个出现在字符串中的索引，如果不存在索引则返回1
4. lastindexOf:返回一个字符最后一次出现在字符串中的索引，没有则返回-1
5. concat:拼接两个字符串，`返回新字符串,也就可以深拷贝`，不影响旧的字符串
6. substr(n,m):从索引n开始，截取`m个字符`，返回截取的字符，不影响旧的字符串
7. substring(n,m):从索引n开始，截取到`索引为m`的地方，返回截取的字符，不影响旧的字符串；
`注意:如果n>m，那么就改为从m开始，截取到索引n的字符，如果n/m是负数那就会被改为0`
8. slice(n,m):slice和substring一样,n/m都是索引，返回截取的字符，都不会影响到旧的字符串
`不同之处在于，slice会把负数作为从尾部开始数起,如str.slice(1,-4)表示从索引为1的字符截取到索引为4的字符;str.slice(-3,-1)表示从索引为-3的字符截取到索引为-1的字符，第一个索引必须是在第二个索引左边的！`
[参考](https://www.cnblogs.com/langu/p/3518605.html)
9. split():分割字符串，不会改变原字符串
10. replace('a',1):替换字符串中相应的值，例如把a字符替换成1，`会改变原字符串的值!!!`
* [参考](https://www.cnblogs.com/zhangxin2540/p/7054835.html)

## js数组方法
1. splice(index,howmany,value)`会改变原来的数组`:表示从索引index那个值开始，删除howmany个数,然后用value替换在howmany个数的位置
`要和slice(n,m)区别开，例子 var arr=['i','am','love','you','haha'] arr.splice(1,2,'hello') =》["i", "hello", "you", "haha"]`
`index,howmany都是必须项，howmany可以为0，表示不删除元素，只在Index索引位置添加元素 如:arr.splice(1,0,'hello') => ["i", "hello", "am", "love", "you", "haha"]`
`可以使用splice(index,howmany)删除元素不添加元素,arr.splice(1,2) =>["i", "you", "haha"]`
2. sort,reverse方法会`改变原数组`
```
var arr=[5,2,6,44,77];
console.log(arr.sort());
console.log(arr);//数组在原数组上进行排序，不生成副本
// 所以使用sort()方法后的旧数组改变了!

// 使用reverse()方法后的原数组也改变了,因为sort/reverse方法都不会创建新的内存地址
console.log(arr.reverse());
console.log(arr);
```
3. map方法(`不会改变`原有数组)对数组的每一项都应用一个函数,然后返回新数组,不会改变原有数组
```
var arr2=arr.map(item => {
	return item+100
})
console.log(arr2);//[177, 102]
console.log(arr);//[77, 2]
```
4. join不会改变数组的值,生成字符串
```
console.log(arr.join(','));//77, 2
console.log(arr);//[77, 2]
```
5. toString生成字符串
```
console.log(arr.toString());//默认以,分割 77, 2
console.log(arr)//[77, 2]
```
6. concat数组拼接,不改变原有数组
```
console.log(arr.concat([4,2,5]));
console.log(arr);
// concat还可以用于字符串拼接
var str='33'
console.log(str.concat('hello'));
console.log(str)
```
7. valueOf()返回数组的原始值
8. toSource() 方法表示对象的源代码
9. 把数组转换为本地字符串
* [参考](https://www.w3school.com.cn/jsref/jsref_toLocaleString_array.asp)

## 会改变原有的字符串的方法
1. replace替换

## 不会改变原有字符串的方法
1. substr(长度)，substring,slice,indexOf,lastIndexOf,concat(新子串)，charAt,charCodeAt,
2. split(分割出新数组，不会改变字符串)

## 会改变原有数组的方法
1. pop,push,shift,unshift
2. `sort`,reverse,splice

## 不会改变原有数组的方法
1. join(生成字符串)，`map(新数组)`,toString(生成字符串),concat(数组拼接)

## DOCTYPE声明
1. DOCTYPE声明位于文档的最前面，处于标签之前，在解析文档之前需要告诉浏览器，使用什么文档类型规范来解析这个文档
2. 严格模式:严格模式是按照该浏览器支持的最高版本运行
3. 混杂模式:向下兼容那些老旧版本的浏览器。
4. 意义:如果不定义DOCTYPE或者DOCTYPE的格式不正确会导致文档以混杂模式呈现。

## sup/sub
1. sup上标标签，例如`10<sup>2</sup>表示10的二次方`
2. sub下标标签，例如`10<sub>2</sub>的2在下面，无意义`
3. sup/sub也是行内元素

## h5的data-*属性
1. h5中新增了data-*属性，data-之后的属性是开发者自定义的属性名称，里面可以放置想存储的数据，然后通过数据集dataset来使用
```
// var id=document.getElementsByClassName('one')[0].dataset.id;
// 如果浏览器不支持dataset属性,可以通过setAttribute方法获取
var id=document.getElementsByClassName('one')[0].getAttribute('data-id')
console.log(id)
```
2. `可以在列表li中使用data-id,然后每个元素使用方法传递event的时候就会自动传递自己的id，方便选择，在小程序中也可以用`

## label标签
1. label标签也是文本标签的一种，主要和表单控件结合使用，`for属性必须和需要对应的表单控件的id属性一致`
2. 效果就是`点击label标签位置，对应的表单控件相当于被聚焦(边框outline凸起特效)`
```
<label for="name">Name:</label>
<input type="text"  id="name" />
```

## 生成圆形的点击区域
1. `虽然使用border-radius后的元素占据宽高还是原来那么多，但是实际有效区域改变了`
```
.one{
	background: #0000FF;
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
<div class="one" onclick="change()">
</div>
function change(){
	console.log('1432')
}
```
* `使用border-radius后，原来点击生效的区域不生效了`
2. 使用原生js+canvas来绘制一个圆形，然后使用勾股定理确定位置在不在范围内
```
<canvas id="one" width="300" height="300"></canvas>

// 获取画布canvas
var canvas=document.getElementById('one').getContext('2d');
var radius=50;
canvas.fillStyle='#00f'
canvas.arc(150,150,radius,0,2*Math.PI,false)
canvas.fill();//必须使用fill方法填充才有颜色

document.onmousemove=function(e){
	var e=e?e:window.event;
	// 根据鼠标的x,y轴位置判断是否在元素上
	var x=Math.abs(150-e.clientX);
	var y=Math.abs(150-e.clientY);
	// 使用勾股定理
	if(Math.sqrt(Math.pow(x,2)+Math.pow(y,2))<radius){
		console.log('323')
	}
}
```

## offsetx/clientx/screenx
1. offsetx:指的是鼠标点击的位置相对于发生点击事件的元素的左边缘的距离
2. clientx:指的是鼠标点击的位置相对于浏览器可视区域的距离
3. screenx:指的是鼠标点击的位置相对于屏幕可视区域的距离

## localStorage/sessionStorage
1. localStorage和sessionStorage都是用来存储客户端临时信息的
2. localStorage和sessionStorage都是只能存储字符串类型的对象
3. localStorage的生命周期是永久的，这意味着除非主动去秦楚这些localStorage信息，否则这些信息会永远存在
4. sessionStorage的生命周期是当前窗口或者标签页，一旦窗口或者标签页被关闭了，那么sessionStorage存储的数据也就被清空了
5. `资源共享`
```
1. 相同浏览器的不同页面(同源页面)可以共享localStorage数据
2. 不同页面或者标签页之间没办法共享sessionStorage的信息
注意:不同页面和标签页指的是顶级窗口，如果一个标签页包含多个iframe标签而且都属于同源页面，那么可以进行sessionStorage共享
```

## undefined与defined
1.undefined指的是`声明了但是还没有赋值后的结果`
`var one;console.log(one);//undefined`
2.defined指的是`使用了还没有声明的变量`
`console.log(who);//who is not defined`
3.使用 对象.xx是`隐式声明对象的属性或者方法`
`var obj={};console.log(obj.a);//undefined`
4.同理使用window.xx形式会在`window对象中隐式的声明变量`
```
console.log(window.foo || (window.foo="bar"))
// 所以左边是undefined,由于是||或,左边相等于false,可以执行右边,右边进行赋值操作
console.log(window.foo);//bar 已被赋值
```	
5. `函数的name属性不需要声明，创建函数就自带name属性,相当于隐式声明了`
```
function foo(){
				
}
var old=foo.name;
console.log(foo.age);//undefined
console.log(foo.name);//foo
foo.name='bar';
console.log(old,foo.name);//foo,foo
```

## form标签的enctype属性
1. enctype属性规定在将表单数据发送到服务器之前如何对其进行编码
2. `application/x-www-form-urlencodeed`默认在发送前对所有字符进行编码(空格转为+号，特殊字符转为ASCLL码)
3. `multipart/form-data`不对字符编码，`但是当使用有文件上传控件的表单时，该值是必须的`
4. `text/plain`将空格转为+号，不编码其他特殊字符。

## 浏览器前缀打包
1. 使用webpack打包的时候，会给css自动添加浏览器前缀，但是需要先安装一个loader
2. 需要使用`postcss-loader 和一个插件autoprefixer`，注意需要在webpack.config.js文件中配置rules
3. rules需要注意user调用loader的顺序是从右向左，所以postcss-loadr应该写在最后面
4. `貌似现在会自动生成.postcss.js文件来编辑postcss打包规则`
5. `然后loader的配置在build.util.js中使用`

## 滚动
1. `注意注意注意！！！要想滚动，必须先设置根元素或者父元素高度超过屏幕高度，而且当滚动到最底部之后，屏幕高度不会变化，所以无法继续向下滚动了`
2. `注意，scrollTo,scrollBy都是不使用px,直接用数字的`
3. scrollTo(left,top)=> scroolTo({left:left,top:top})`scrollTo是绝对位置滚动，滚动到该位置`;
4. scrollBy(left,top)=> scrollBy({left:left,top:top})`scrollBy是相对位置滚动，如果一直使用scrollBy(0,100)那就每次都向下滚动100px`
5. `document.scrollingElement.scrollTop`也是绝对定位，但是一次只能设置一次x/y

## ==与===
```
// 1.对于基本数据类型来说,==就是值相等就可以了,而===需要值和类型相等
// ==和===都需要先转换为数字
console.log('4'==4);//true
console.log('4'===4);//false,因为类型不同
console.log(false==0);//true,都先转为数字

// 2.null,undefined,NaN之间的比较按照特殊的规则
console.log(null=="");//false，但是null,undefined,NaN之间的比较按照特定的规则
console.log(null==null);//true

// 3.对于左右两边都是引用数据类型来说,==和===没有区别,都需要指向同一个内存地址才行
console.log([]==[]);//false
console.log([]===[]);//false
console.log([]=={});//false
console.log({}=={});//false

//4.如果是引用数据类型和基本数据类型比较，那么引用数据类型先toString,再valueOf
//只有一边是引用数据类型的话，那么就是比较值是否相等了，===就是比较数据类型了
			console.log({}.toString());//[object Object]
			console.log({}=='[object Object]');//true
			// 因为typeof null=object,所以这也算是比较内存地址
			console.log({}==null);//false
			
			console.log([].toString());//'',空。。
			console.log([]=='');//true
			console.log([]==0);//true 
			console.log([]==null);//false,因为typeof null=object,所以这也算是比较内存地址
			console.log([]==undefined);//因为null/undefined/NaN的比较方式不一样！
```

## !!是转换数据为布尔值
1. 引用数据类型转换为布尔值都是true
```
			console.log(!![]);//true
			console.log(!!{});//true
```
2. NaN,'',null,undefined,0转换为布尔值都是false
```
			console.log(!!null);
			console.log(!!'');
			console.log(!!undefined);
			console.log(!!NaN);
			console.log(!!0);
```