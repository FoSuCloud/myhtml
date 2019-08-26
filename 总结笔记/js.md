## 1.Boolean类型判断
* `let bool1=false ;typeof bool1  => boolean `
* `let bool2=new Boolean(false);typeof bool2 => Object  ;console.log(bool2) =>false`
* 可以看出构造函数的布尔类型实例为对象，该实例的值也是false,但是使用==或者!==判断类型的时候需要先转换为Number类型，所以bool2==true =>false;bool2==false;=>true
* 布尔值为false的只有:`null,undefined,"",false,0,NaN`

## 2.js事件的三个阶段
* 1.首先事件从根节点流向目标节点，途中会经过各级DOM节点，在各个节点上触发捕获事件，还没有流到目标节点的这段时间被称为捕获阶段
* 2.当事件从根节点流到目标节点就触发目标节点的事件，这个阶段称为目标阶段
* `捕获阶段的主要任务是建立传播路经，等到了冒泡阶段就沿着这个路径流向根节点`
* 3.当事件在目标节点上被触发之后不会停止，而是会沿着捕获阶段建立的传播路径一层层流向根节点，触发节点的事件
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
* 1. `隐式window调用函数`，举个例子:
```
	function fn(){
		var a=1111111;
		console.log(this.a);//4
	};
	var a=4;
	fn();
```
* 函数执行结果为4，因为此时相当于 `window.fn()`,也即是window对象去调用fn函数,his指向的也就是调用函数的对象此时就是window
* 2. `变量表达式调用函数`，举个例子
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
* 3.`函数嵌套`,举个例子
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
* 4.`点击事件`
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
* 5.`html元素对象`
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
* 1. 语法:function.call(obj),obj是调用函数的对象,相当于 obj.function,也就是相当于window.function一样把函数当做了方法来调用
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

* 2. apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个`参数数组`。当第一个参数为null、undefined的时候，默认指向window
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


* 3. bind: `和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表`
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

* 4. `在 ES6 的箭头函数下, call 和 apply 将失效，因为箭头函数体内的 this 对象, 就是定义时所在的对象, 而不是使用时所在的对象`
* 5. [参考链接](https://www.jianshu.com/p/bc541afad6ee)


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

## 8.this指向(与原型链继承区分开)
* 1. `隐式window调用函数`，举个例子:
```
	function fn(){
		var a=1111111;
		console.log(this.a);//4
	};
	var a=4;
	fn();
```
* 函数执行结果为4，因为此时相当于 `window.fn()`,也即是window对象去调用fn函数,his指向的也就是调用函数的对象此时就是window
* 2. `变量表达式调用函数`，举个例子
```
	var obj={
		fn:function (){
			var a=1111111;
			console.log(this.a);//4
		}
	}
	var a=4;
	var obj1=obj.fn;//obj1仅仅指代fn函数,跟2.2对比一下
	obj1();//此时相当于window.obj1();所以this指向的还是window
```
* 2.2 `立即执行函数`
```
	var obj={
		fn:function (){
			console.log(this);//4
		}
	}
	obj.fn();//fn,不是window ，因为调用fn方法的对象1有了，是obj
	(obj.fn)();//fn,不是window
	// 因为不是表达式,没有使用window.变量的形式来调用,而是作为函数方法来调用了
```
* 3.`函数嵌套`,举个例子
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
* 4.`点击事件`
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
* 5.`html元素对象`
```
	<span id="app">点我</span>

	var app=document.getElementById('app');
	app.addEventListener('click',function(){
		console.log(this);//<span id="app">点我</span>
	})
```
* 当我们使用html元素绑定函数的形式时，函数是被html元素所调用，所以this指向的是html元素


## 9.call,apply,bind指定调用函数的对象
* 想要指定调用函数的对象，可以使用`call,apply,bind`，`通过调用方法的形式调用函数`
* 1. 语法:function.call(obj),obj是调用函数的对象,相当于 obj.function,也就是相当于window.function一样把函数当做了方法来调用
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

* 2. apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个`参数数组`。当第一个参数为null、undefined的时候，默认指向window
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


* 3. bind: `和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表`
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

* 4. `在 ES6 的箭头函数下, call 和 apply 将失效，因为箭头函数体内的 this 对象, 就是定义时所在的对象, 而不是使用时所在的对象`
* 5. [参考链接](https://www.jianshu.com/p/bc541afad6ee)


## 10.解决setTimeout定时器在for循环错误的三个办法
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
``

## 11.undifned与报错
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


## 12.闭包保存变量内存
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

## 13.js的数字
* 在JavaScript中，`基本数据类型的变量都是存储为八字节8Bytes`,`而引用数据类型存储的是对对象的引用地址`
* `换句话说，js中没有int,float,double之分`

## 14.js中的同名变量/函数优先级
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

## 15.let.const
* 举个例子，`for(let i=0;i<10;i++){}    在花括号之外！  console.log(i) `输出 " i not defined" 因为let存在块级作用域，当在它的作用域外使用它的时候是不行，然后全局作用域又没有定义过i,所以not defined
* `const 的值是基本数据类型的时候不可以被修改，但是const的值是引用数据类型的话，可以修改对象属性`
* const a=3;a=4; console.log(a);//输出为 TypeError,因为const的值都是常量，常量不可以被直接改变值
* const b={name:one},console.log(b.name);//one ; b.name=two;console.log(b.name);//two;但是const的常量时对象的时候可以通过改变对象的属性来改变对象
* 注意:直接修改const的常量的值会报错  `b={age:2},	console.log(b);//Missing initializer in const declaration`
* `常量指的是在程序正常运行过程中不能被修改的值。它的值不能通过二次赋值来改变，同时也不能被再次声明`		




