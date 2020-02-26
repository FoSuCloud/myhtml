## 1.Boolean类型判断
* `let bool1=false ;typeof bool1  => boolean `
* `let bool2=new Boolean(false);typeof bool2 => Object  ;console.log(bool2) =>false`
* 可以看出构造函数的布尔类型实例为对象，该实例的值也是false,但是使用==或者!==判断类型的时候需要先转换为Number类型，所以bool2==true =>false;bool2==false;=>true
* 布尔值为false的只有:`null,undefined,"",false,0,NaN`

## 2.js事件的三个阶段
1.首先事件从根节点流向目标节点，途中会经过各级DOM节点，在各个节点上触发捕获事件，还没有流到目标节点的这段时间被称为捕获阶段
2.当事件从根节点流到目标节点就触发目标节点的事件，这个阶段称为目标阶段
* `捕获阶段的主要任务是建立传播路经，等到了冒泡阶段就沿着这个路径流向根节点`
3.当事件在目标节点上被触发之后不会停止，而是会沿着捕获阶段建立的传播路径一层层流向根节点，触发节点的事件
* `注意:我们平时一般只阻止冒泡事件，因为捕获阶段默认是不触发事件的(或者说触发的是捕获的事件)，而冒泡事件是默认触发的`

## 3.clientHeight,offsetHeight,scrollHeight
* clientHeight:仅仅是内容区域，不包括border,滚动条
* offsetHeight:内容区域+padding+滚动条
* scrollHeight:该高度仅在有滚动条的时候才有用处,因为这个高度指的是滚动条隐藏高度+内容高度
* scrollTop:代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度
* offsetTop:当前元素顶部距离最近父元素顶部的距离,和有没有滚动条没有关系
* [参考链接](https://blog.csdn.net/qq_35430000/article/details/80277587)

## 4.解决setTimeout定时器在for循环错误的三个办法
```
	// 1.创建i变量的副本
	function me(i){
		// 箭头函数体内的 this 对象, 就是定义时所在的对象, 而不是使用时所在的对象;
		setTimeout( ()=> {
			console.log(i);
		} ,1000);
	}
	for(var i=0;i<5;i++){
		me(i);
	}
	
	// 2.使用闭包
	for(var i=0;i<5;i++){
		function you(i){
			setTimeout( ()=> {
				console.log(i);
			} ,1000);
		}
		you(i);
	}
	
	// 3.使用let作用域
	for(let i=0;i<5;i++){
		setTimeout( ()=> {
			console.log(i);
		} ,1000);
	}
```

## 5.this指向(与原型链继承区分开)
1. `隐式window调用函数`，举个例子:
```
	function fn(){
		var a=1111111;
		console.log(this.a);//4
	};
	var a=4;
	fn();
```
* 函数执行结果为4，因为此时相当于 `window.fn()`,也即是window对象去调用fn函数,his指向的也就是调用函数的对象此时就是window
2. `变量表达式调用函数`，举个例子
```
	var obj={
		fn:function (){
			var a=1111111;
			console.log(this.a);//4
		}
	}
	var a=4;
	var obj1=obj.fn;//obj1仅仅指代fn函数
	obj1();//此时相当于window.obj1();所以this指向的还是window
```
3.`函数嵌套`,举个例子
```
	function fn(){
		var a=1111111;
		function fn2(){
			console.log(this.a);//4
		}
		fn2();//2.注意这里不是fn.fn2(),这里隐式表达的是window.fn2();
	}
	var a=4;
	fn();//1.此时相当于window.fn()
```
4.`点击事件`
```
document.addEventListener('click', function(e){
    console.log(this);
    setTimeout(function(){
        console.log(this);
    }, 200);
}, false);
```
* `document.addEventListener('click'function(){})其实就相当于obj.function(),就是对象调用方法，所以第一个This指的即是document这个对象`
* `但是setTimeout(function(){})定时器函数没有被document当做方法调用，还是函数调用的形式,相当于window.setTmeout(),所以setTimeout()函数里面的this一般指的都是window`
5.`html元素对象`
```
	<span id="app">点我</span>

	var app=document.getElementById('app');
	app.addEventListener('click',function(){
		console.log(this);//<span id="app">点我</span>
	})
```
* 当我们使用html元素绑定函数的形式时，函数是被html元素所调用，所以this指向的是html元素


## 6.call,apply,bind指定调用函数的对象
* 想要指定调用函数的对象，可以使用`call,apply,bind`，`通过调用方法的形式调用函数`
1. 语法:function.call(obj),obj是调用函数的对象,相当于 obj.function,也就是相当于window.function一样把函数当做了方法来调用
```
		function fn2(){
			var a=1111111;
			console.log(this.a);//4
		}
		var b={a:4,p:444};
		fn2.call(b);
```
* call 方法第一个参数是要绑定给this的值，后面传入的是一个参数列表。`当第一个参数为null、undefined的时候，默认指向window`
* 例子:`对象包裹着函数  obj1.fn2() == obj1.fn2.call(obj1),此时fn2函数的this指向的都是obj1`
```
var obj1={
				a:111111,
				fn2:function (){
					console.log(this.a);//11111
				}
			}
			obj1.fn2();
			obj1.fn2.call(obj1);
			var a=4;
			obj1.fn2.call(null);//此时fn2函数的this指向的是window
```
* 例子:`函数调用形式: fn() == fn.call(null) 指向的都是window`
* `函数带参数时: fn(a,b) == fn.call(null,44,3) 第一个参数依旧是null代表指向window,其余参数都是原函数所需要的参数`

2. apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个`参数数组`。当第一个参数为null、undefined的时候，默认指向window
* `call与apply的区别就在于apply只有两个参数，且第二个参数必须是参数数组，而call的参数不是参数数组`
* 举个例子:
```
	function fn(a,b){
		console.log(this.name+a+b);
	}
	var obj={name:'我是对象'};
	fn.call(obj,2,3);
	fn.apply(obj,[33,22]);//使用数组
	
	function fn2(c){
		console.log(c)
	}
	fn2.apply(null,[4]);//只有一个参数时也是用数组
	// fn2.apply(null,4);//不使用数组,报错
```
* apply,call可以借用其他对象的方法或属性
```
	var person=function (){
		this.name='我是要被借用的属性';//3.此时相当于me.name
	}
	
	var Human=function (){
		person.call(this);//2.把该函数的实例me作为调用person函数的对象
		// console.log(this.name);
		this.getname=function(){
			console.log(this.name);//5.此时this指的是调用该方法的me,所以也即是me.name
		}
	}
	
	var me=new Human();//1.me是Human函数实例
	// me();//虽然可以出现结果，但是会报错me is not a function
	me.getname();//所以实例调用函数还是调用函数内部属性或者方法吧
	// 4.调用方法
```


3. bind: `和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表`
* `bind方法的区别在于bind方法不会立即执行，而是返回了一个改变执行上下文this指向后的函数，而原函数的this没有被改变，依旧指向window`
* 举个例子:
```
	var person=function (a,b,c){
		console.log(this.name+a+b+c)
	}
	
	var obj={name:'my'}
	var boy=person.bind(obj,33);//bind方法不会立即执行
	console.log(boy);//bind方法返回的是原函数
	boy('i','love','qiqi');//返回的是 my33ilove
	// 我们之前使用bind方法传递的参数虽然不全,但是依旧会覆盖后面传递的参数,因为优先级更高
	
```

4. `在 ES6 的箭头函数下, call 和 apply 将失效，因为箭头函数体内的 this 对象, 就是定义时所在的对象, 而不是使用时所在的对象`
5. [参考链接](https://www.jianshu.com/p/bc541afad6ee)


## 7.深拷贝与浅拷贝
* 浅拷贝就是b复制了a,但是b只是引用了a,a和b指向的地址一样，所以a/b改变都会引起b/a改变
* 深拷贝就是b复制了a的本体,当修改a的时候,b不会改变,修改b的时候,a也不会改变,a与b引用的地址不一样
---
* 对于js来说,基本数据类型是没有深拷贝浅拷贝之分的,基本数据类型每创建一个变量都会在`栈`中新开辟空间
* 而创建的变量是引用数据类型的时候,在`栈内存`中的变量名称仅仅存储指向的`堆内存地址`,所以只有对于引用数据类型(对象)才有深拷贝与浅拷贝之分,
* 当我们使用 `var a={name:111};var b=a;`时,变量b和a都在栈内存中有一个变量名，但是栈中指向的堆内存地址却是同一个，所以改变b/a的值，a/b的值也会随之改变，因为堆中的值改变了，被引用的变量自然也会改变，这就是`浅拷贝`
* 而`深拷贝`就是我们使用
 ```
	var a=[3,4,1];
	var b=a.slice(0);//slice(0)返回的是新建的一个数组
	//修改b数组的值
	b[0]=333333;
	console.log(a);//[ 3, 4, 1 ]
	console.log(b);//[ 333333, 4, 1 ]
```
* 我们把a数组的本体拷贝给了b数组,数组也是引用数据类型(对象),但是我们使用arr.slice(0)是返回一个新的数组对象,虽然值和a数组一致，但是引用的堆地址不一样，数组b引用的是一个新创建的`堆内存`
* [深拷贝浅拷贝](https://blog.csdn.net/qq_41635167/article/details/82943223)
* [数组方法slice splice](https://blog.csdn.net/rsylqc/article/details/45113859)


## 8.undifned与报错
```
	// 1.调用对象未声明的属性会undifned
	var user={};
	console.log(user.name);//undifned
	
	// 2.使用未赋值只声明的基本数据类型会undifned
	var one;
	console.log(one);//undifned
	
	// 3.使用未声明的变量会报错
	console.log(two);//new_file.html:15 Uncaught ReferenceError: two is not defined

```


## 9.闭包保存变量内存
* 闭包会保存闭包内部使用的变量，不会立马释放内存
```
	function Foo(){
		 var i=0;
		 document.write(i+'a');//这个会在var f1=Foo();的时候就执行
		 return function(){
			 document.write(i++);
		 }
	}
	var f1=Foo();//f1只是保存Foo()函数执行后的结果，即return 的函数
	document.write(f1);、、 function(){document.write(i++);}
	f1();//0, 0++ 闭包变量的内存不会被释放,依旧保存,所以执行f1();使用的都是同一个i变量
	f1();//1,1++
	f1();//2
	f1();//3
	// f2=Foo();//f2也是Foo()函数的结果，但是和f1不一样，变量保存的地址不一样
	// f2();//0 ,和f1使用的变量不一样,所以i依旧为0
```

## 10.js的数字
* 在JavaScript中，`基本数据类型的变量都是存储为八字节8Bytes`,`而引用数据类型存储的是对对象的引用地址`
* `换句话说，js中没有int,float,double之分`

## 11.js中的同名变量/函数优先级
* `变量声明<函数声明<变量赋值`
* 也就是函数声明可以覆盖同名的变量声明,但是函数声明没办法覆盖被赋值之后的变量,赋值变量反而会覆盖函数,但是需要注意变量赋值的顺序
```
	// var a=3;
	// function a(){
	// 	console.log('i am')
	// }
	// console.log(a);
```
* 相当于
```
	function a(){
	console.log('i am')
	}
	var a;
	a=3;
	console.log(a);//3
	// 因为函数声明没办法覆盖被赋值的变量
```
* 变量赋值在函数声明之前与之后		
```
	function a(){
		console.log('i am')
	}
	console.log(a);//fn(){}
	var a=3;
	console.log(a);//3
```
* 此时预解析顺序为
```
	function a(){
	console.log('i am')
	} 
	var a;//虽然再次声明了a，但是存在了同名函数，所以等于没用
	console.log(a);
	a=3;//虽然存在同名变量赋值，但是执行顺序在打印之后，所以还是打印函数
	console.log(a);//而在此时，变量a已经被赋值了，而变量赋值会覆盖函数声明，所以打印变量a
```

## 11.let.const
* 举个例子，`for(let i=0;i<10;i++){}    在花括号之外！  console.log(i) `输出 " i not defined" 因为let存在块级作用域，当在它的作用域外使用它的时候是不行，然后全局作用域又没有定义过i,所以not defined
* `const 的值是基本数据类型的时候不可以被修改，但是const的值是引用数据类型的话，可以修改对象属性`
* const a=3;a=4; console.log(a);//输出为 TypeError,因为const的值都是常量，常量不可以被直接改变值
* const b={name:one},console.log(b.name);//one ; b.name=two;console.log(b.name);//two;但是const的常量时对象的时候可以通过改变对象的属性来改变对象
* 注意:直接修改const的常量的值会报错  `b={age:2},	console.log(b);//Missing initializer in const declaration`
* `常量指的是在程序正常运行过程中不能被修改的值。它的值不能通过二次赋值来改变，同时也不能被再次声明`		

## 12.基本数据类型string与String对象
```
		var str1='i am string';//基本数据类型string
		var str2=new String('i am String对象');
		//使用new String()方式得到的是String对象
		console.log(str1);
		console.log(str2);//数组
		console.log(str1.length);
		//虽然基本数据类型string不是数组,但是js执行该语句的时候会把它包装成一个String对象,所以string才具有length属性
```

## 13.数组的各个方法
* 1. join(param),以`数组的每一项组起一个字符串`，以参数作为分隔符，如果省略的话就用,逗号作为分隔符
* ` arr=[1,2,3]  console.log(arr.join('e')) => 1e2e3e`
* `创建重复字符串数组  new Array(3).join(abc) => abcabcabc`,意味着创建了有三项的数组，然后每一项以abc作为分隔符
* 2. push => 添加到末尾, pop删除末尾元素; shift 删除数组头部元素, unshift添加元素到头部
* 3. sort()默认是从小到大排序,`会改变原数组`
* `arr=[33,2,4] ; console.log(arr.sort()) => [2,33,4]; console.log(arr) => [2,33,4];`
* 可以看到原数组被改变了，而且排序有问题，这是因为`默认转化为字符串进行排序`了,解决方法，使用parseInt()自定义一个排序函数
* 4. reverse()方法是把数组顺序颠倒(无论大小排序)
* 5. concat()将数组或者值`逐个添加到原数组`中去，返回结果，`不改变原数组的值`,注意二维数组
```
	var arr=[33,2,4] ;
	console.log(arr.concat(5));//[33,2,4,5]
	console.log(arr.concat([3,44]));//[33,2,4,3,44]
	console.log(arr.concat(5,[3,44]));//[33,2,4,5,3,44]
	console.log(arr.concat([3,44,[5,6,7,8]]));//二维数组[33,2,4,3,44,[5,6,7,8]]
```
* 6. slice():返回从原数组中指定开始下标到结束下标之间的项组成的`新数组`,不会改变原数组
* ` var arr=[33,2,4] ;console.log(arr.slice(1));//[2,4]  ; console.log(arr); [33,2,4]`
* 7. splice()可以实现插入删除替换,`会改变原数组的值`;删除:输入两个参数(0,2)表示删除0,1下标两个值;
* 插入/替换:第一参数是下标，第二参数是删除的项数，第三参数及后面的是插入的值
* 如果是替换的话就输入三个参数(0,1,3),就是把下标为0的数删除，然后插入3；如果是(0,0,4)那就是在下标为0的值那里直接插入4
* `注意:返回的是删除的值，当然，原数组也改变了`
* 8. indexOf(从数组开头查找),lastIndexOf(表示从数组末尾开始查找)接收两个参数,索引，还有可选的参数(表示起点位置的索引),
* 太多了。。。[慢慢看吧](https://www.cnblogs.com/obel/p/7016414.html)


## 14.children与childNodes
* 对于DOM元素，children指的是DOM Object类型的子对象，不包括tag之间隐式存在的TextNode;
* childNodes指的是DOM Object类型的子对象，以及tag之间隐式存在的TextNode
`对于 div{span}  使用children,tagname输出span;使用childNodes,tagname输出undefined,span,undifned`

## 15.js null的一个bug
* `typeof null => object; js的其他基本数据类型都是对应的类型`
```
console.log(typeof null);//object
console.log(typeof 1);//number
console.log(typeof undefined);//undefined
console.log(typeof '11');//string 
console.log(typeof true);//boolean
```

## 16.函数执行完毕之后?
```
	function output(str){
		console.log(str);
	};
	
	output(typeof (function(){
		output('hello world');
	})());
	// 任何函数执行完一次，如果没有 return 返回值和声明变量接受返回值，都会立即消失，永远找不到值！
	//所以在立即执行函数执行完毕之后，typeof 之后的代码相当于为空,所以就是相当于未赋值
	//如果在output('hello world');后面添加一个return 'i am'则会打印string
```

## 17.隐式类型转换
* [记得去看!](https://blog.csdn.net/itcast_cn/article/details/82887895)
```
	// 隐式类型转换一:  转换成string类型,只要+加号两边有一个是字符串,那就会都转换为字符串
	// 字符串连接符+,转换为string仅在使用加号且两边至少有一个字符串的时候才有用
	console.log('2'+'33');//233
	console.log(2+'33');//233
	console.log(2+'true');//2true
	// 注意,加号两边都是数字..则自然不需要转换
	console.log(2+33);//35
	
	
	
	// 隐式类型转换二:转换成number类型
	// 自增自减运算符,算术运算符,> < >> << 
	// 2.1加号,只要加号两边都不是字符串,那么统一转换为number类型
	console.log(1+true);//2
	console.log(1+false);//1
	console.log(1+null);//1
	console.log(1+undefined);//NaN
	console.log(1+NaN);//NaN
	
	// NaN,undefined转换为number类型是NaN
	
	// 2.2关系运算符,转换为number类型
	console.log(1>true);//false 
	console.log(1>=true);//true 
	console.log(1>null);//true 
	console.log(1>undefined);//false,undefined=>NaN
	console.log(1>NaN);//false,NaN=>NaN
	
	console.log('2'>'1');//true,关系运算符两边都是字符串的时候,此时不是按照Number()形式转换为数字,而是按照字符串的unicode编码进行比较
	console.log('2'>'11');//true,uniconde编码比较
	console.log('2'>11);//false,当关系运算符只有一边是字符串的时候,会使用Number()形式转换然后再比较
	
	// null,undefined,NaN之间的比较按照特定的规则!
	console.log(null==null);//true
	console.log(undefined==undefined);//true
	console.log(NaN==NaN);//true,NaN和任何数比较都是NaN 
	
	console.log(null>undefined);//false
	console.log(null==undefined);//true
	
	// 2.3 复杂数据类型(不是基本数据类型，所以用法不一样)转换成number 
	// 2.3.1 先使用valueOf()取得原始值；
	// 2.3.2 如果原始值不是number类型则使用toString方法获取字符串类型,
	// 2.3.3 然后把string类型转换为number类型运算
	
	console.log(['1,2']=='1,2');
	//true ,此时的运算经过了valueOf(),toString()运算,最后再对两个字符串进行unicode编码比较
	console.log(['1,2'].valueOf());//"1,2"
	console.log("1,2".toString());//1,2
	console.log(typeof  "1,2".toString());//string
	
	var a={};
	console.log(a.valueOf());//{}
	console.log({}.toString());//[object Object]
	console.log({}=='[object Object]');//true,
	// 关系运算符两边都是字符串的时候,此时不是按照Number()形式转换为数字,而是按照字符串的unicode编码进行比较
	
	// 单目加法?(单目的时候,无论是普通数据类型还是引用数据类型都会直接转换为数值类型)
	console.log(+[]);//0,[]转换为数值类型
	console.log(+[,,]);//NaN,',,'转换为数值类型就是NaN
	console.log(+ new Array(017));//NaN,0开头的是八进制，相等于new Array(15),建立了一个15长度的空数组,[,,,,,]=>',,,,,,'不被识别，是NaN
	console.log(+[1,2]);//'1,2',转换为数值类型也是NaN,因为是字符串而且没有分离,，所以不被识别，是NaN
	console.log(+{});//NaN,'[object Object]'不被识别，转为Number类型是NaN
	console.log(undefined++);// NaN
	console.log(+undefined);// NaN 
	console.log(+null);// 0 
	
	
	<!-- 加号当做双目运算符 -->
	//`数组与对象遇到加法会经过valueOf().toString()步骤，转换为字符串进行字符串拼接`
	console.log([1,2]+1);// 相等于数组使用valueOf()再使用toString() =》 '1,2'+'1' => '1,21' 
	console.log({a:11}+2);// [objct Object]2
	console.log([1,2]+[2,1]);// '1,22,1'
	// `空格遇到加法`
	console.log(('b'+'a'+ +'a'+'a').toLowerCase());//banana
	// 首先字符串拼接 'ba'+(' '+'a')+'a',(' '+'a')里面的空格不知道为什么会转换为NaN,NaN加任何数都是NaN,所以括号里面转换为NaN
	// 然后就变成了baNaNa,再使用toLowerCase()就可以转换为小写
	
	// b变量同时为1,2,3？
	var b={
		i:0,
		valueOf:function(){
			// 相当于重写了b变量的valueOf()方法,每次调用都自增1
			return ++b.i;
		}
	};
	//关系运算符两边都是字符串的时候,此时不是按照Number()形式转换为数字,而是按照字符串的unicode编码进行比较
	// console.log(b=='1');//true;
	// console.log(b=='2');//true;
	// console.log(b=='3');//true;
	
	if(b==1 && b==2 && b==3){
		console.log(b);//此时的b.i为3,因为调用了三次valueOf()方法
	}
	
	
	// 隐式类型转换三:转换成boolean类型,逻辑非运算符!
	// !改变true,false ; !!则是单纯的转换为boolean类型
	console.log(!"");//true,
	console.log(!!"");//false
	console.log(![]);//false
	console.log(!![]);//true
	console.log(!![]==0);//false,先把!![]转换为布尔值,也就是true
	console.log(![]==0);//true,先把![]转换为布尔值,也就是false
	console.log([]==true);//false,因为此时[]返回的是valueOf,toString()转换之后的字符串"",""转换为number就是0
	
	// 注意,在boolean类型转换中,null,""空字符串,undefined,0,-0,NaN,false,document.all()会被转换为false
	//  []虽然在复杂类型转换中,经过valueOf(),toString()会转换为空字符串;
	// 但是对于布尔转换来说,还是会转换为true;使用![] => false; !![]=>true 
	// 对于空对象来说,经过valueOf(),toString()会转换为[object Object], !!{} => true; !{} => false 
	console.log(!!{});//true 
	console.log(!![]);//true 
	console.log(!{});//false 
	
	console.log([]==0);//true,先转为""再转换为0
	console.log(![]==0);//true
	
	console.log(![]==[]);//true,![]转换为布尔值是false再转为数字为0,[]转换为数字为0
	
	// 注意:对于两边都是对象来说,他们都是引用类型,不会转换为number;而引用类型的值存储在堆中,栈中存储的是地址,而==比较的就是他们的地址,因为两个[]是不一样的,所以地址不一样,返回false 
	console.log([]==[]);//false 
	console.log(function(){}==function(){});//false 
	// 同理
	console.log({}=={});//对象存储的堆地址不同,所以返回false 
	console.log(!{}=={});//!{}转换为boolean类型是false,但是和[]不同的是，{}经过valueOf(),toString转换之后是[obejct Object];返回false
```

## 18.错误的函数表达式
```
var f = function g() {
        return 23;
    };
typeof g();//报错
<!-- 如果是 -->
typeof g;//undefined,因为这样仅仅是查询该变量的类型并没有去使用，而g();则是去调用该函数，但是该函数并不存在，所以报错
```
* var a=function b(){};这种函数声明方式是错误的，因为函数已经被变量a所引用了，又给函数命名为b,这样是错误的！
* 这样做的结果就是b();这种调用得不到结果,因为并不存在这个函数，所以调用的后果就是报错


## 19.改变计时器this指向
* 计时器定时器默认的this指向是window,但是我们需要在计时器里面使用vue实例作为this,那么就需要改变计时器的this指向
1. 使用箭头函数
```
	// 1.使用箭头函数,箭头函数的this指向只能是函数最近的父级函数,不能被call,apply,bind改变
	var a=6;
	var timer;
	// timer=setInterval(() => {
	// 	console.log(this.a)
	// 	this.a--;
	// 	if(this.a===0){
	// 		clearInterval(timer)
	// 	}
	// },1000)
```
2. 使用call,apply,bind这些回调函数
```
	// 2.使用回调函数
	// timer=setInterval(function(){
	// 	this.a--;
	// 	console.log(this.a)
	// 	// if(this.a===0){
	// 	// 	clearInterval(timer)
	// 	// }
	// }.call(this),1000)
	存在一个重大问题，this的指向被改变了，但是计时器只执行一次？！！！		
```
3. 使用变量指代this
```
	// 3. 直接用一个变量指代this
	var new_this=this;
	timer=setInterval(function(){
		console.log(this.a)
		this.a--;
		if(this.a===0){
			clearInterval(timer)
		}
	},1000)
```

## 20.isNaN方法
* 对任何不能转换为数值的值使用 isNaN()都会返回true,否则返回false

## 21.in表示索引，下标
* `对于  1 in [1]来说，1这个数的确在数组中，但是in索引的是下标，该数组只有一个数，所以下标最大为0，因此是错误的,返回false`
* ` 1 && 2>1 虽然没有加括号，但是先判断 2>1，所以返回true`

## 22.严格模式下禁止this关键字指向全局对象(此时函数内的this就是undefined)
```
function Foo(){
	'use strict'
	console.log(this.location);
}
Foo()
```
* 所以改代码返回的是`TypeError`

## 23.js进制
* JavaScript 会把`前缀为 0x` 的数值常量解释为十六进制。0x12 => 18
* 一些 JavaScript 版本会把带有`前导零`的数解释为八进制。017 => 15
* [进制转换](https://blog.csdn.net/lk188/article/details/4317459)

## 24.js由es,dom,bom组成
* JavaScript包括三个部分：ECMAScript、DOM和BOM
* ECMAScript是JavaScript的规格，标准，定义了脚本语言的所有属性、方法和对象
* DOM是文档对象模型，是 HTML 和 XML 的应用程序接口(API)，把整个页面规划成由节点层级构成的树形文档
* BOM是浏览器对象模型，主要处理浏览器窗口和框架，浏览器对象有window,history,location,screen
* [JS组成](https://blog.csdn.net/J080624/article/details/72840954)

## 25.var声明重申！
```
		// 第一步:在全局作用域 var c=d=10;
		// // var c=d=10;
		// // 相当于
		// var c;
		// d=10;
		// c=d;
		// console.log(c);//10
		// console.log(d);//10
		
		// 第二步:在全局作用域没有报错,但是在函数作用域会报错
		var b;//在函数内部直接使用 b=5;就相等于 还要在函数外部使用var b
		function one(){
			// var a=b=5;
			// 相等于
			var a;
			b=5;//相当于定义了全局变量
			a=b;//从右开始赋值,所以是先 b=5,再 a=b
			// console.log(a);//在函数内部可以访问到a变量为5
		}
		// one();
		// console.log(b);
		// console.log(a);//但是在函数外部访问函数内定义的a变量却报错,所以我们之前记错啦!
		// var声明的变量可以在块作用域外访问到,但是不可以在函数作用域外部访问到
		
		// 第三步:在块级作用域
		{
			var e=f=20;
		}
		console.log(e);//20
		console.log(f);//20
		// 在全局作用域访问var声明的变量没有错
```

## 26.js字符串的方法
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

## 27.数组遍历方法
* 如果数组中存在空值?`那么无论是map,forEach还都不会作用到空值,filter的话是筛选出数值所以也是没用`
```
	var arr=new Array(3);
		// console.log(arr);
		arr[0]=3;
		var result=arr.map((item) => {
			// console.log(item)// ["1", empty × 2]
			return '1'
		})
		console.log(result)
		arr.forEach(function(item,index){
			arr[index]='1'
		})
		console.log(arr)// ["1", empty × 2]
```
+ `map,filter都是返回一个新的数组，map返回一个映射后的新数组，filter返回符合条件的数组部分`
+ `forEach其实是利用数组的值进行操作，但是可以使用arr[index]='1'这种赋值方式改变原数组`
1. map:普通式:var new_arr=arr.map(function(item){	return	item });还可以使用箭头函数使得this指向外部对象;还可以使用ar.map(function(){},obj)`指定this指向的对象`
2. forEach
3. filter
* [参考](https://www.cnblogs.com/pengshengguang/p/9807831.html)

## 28.js对象封装方法
```
function Student(name,age,sex){
			this.name=name;
			this.age=age;
			this.sex=sex;
		}
		
		// 给函数原型添加方法
		Student.prototype={
			constructor:Student,//应该要声明构造器
			printAge:function(){
				console.log(this.age)
			},
			printName:function(){
				console.log(this.name)
			},
			printSex:function(){
				console.log(this.sex)
			}
		}
		// 实例化(先给原型添加方法再实例化对象，否则实例化之后的对象没有该方法)
		var stu=new Student('张三',22,'男');
		stu.printAge();//通过原型链去查找方法,stu._proto_ => Student.prototype
		stu.printName();
		stu.printSex();
```
* [参考](https://www.cnblogs.com/libin-1/p/6178003.html)


