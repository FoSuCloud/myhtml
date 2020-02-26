## 形参的几种形式
```
			    // 1. Arguments(2) ["a", 11, callee: ƒ, Symbol(Symbol.iterator): ƒ]
				console.log(arguments);
				// 2. a 11 形参的字符串表示 a 11
				console.log(...arguments);
				// 3. 数组表示形式 ["a", 11] 
				console.log([...arguments])
```

## 手写bind
```
			// 手写bind 
			Function.prototype.bind=function(context,...bindments){
				// 绑定调用该函数的对象
				context=context||window;//{name: "yiyi", age: 11}
				// 绑定好this 使用闭包，到时候返回原来的this
				const func=this;// 被调用的函数!
				
				// 如果不是函数使用bind则提示错误
				if(!(func instanceof Function)){
					console.log('bind方法必须是函数使用')
				}
				return function F(...callArgs){
					let allArgs=bindments.concat(callArgs);// concat返回数组
					// 如果此时是创建实例，new func 而不是调用方法，那么返回实例
					if(this instanceof F){
						console.log("new一个实例")
						return new func(...allArgs)
					}
					// 注意：返回的是对数组展开之后的结果 字符串。。
					return func.call(context,...allArgs)
				}
			}
```
* bind绑定的优先级低于new，所以先bind再new也可以，但是绑定的this会失去
```
			// 1. 直接使用bind方式
			function one(a,b){
				console.log(this.name);
				console.log(a)
				console.log(b)
			}
			var obj={name:'yiyi',age:11}
			var two=one.bind(obj,'a')
			console.log(two);// 回调函数
			two(11);// 执行one函数内容
			
			// 2. 构造函数形式(但是会失去bind(obj,arguments)的obj,arguments依旧有效)
			function three(a,b){
				this.a=a
				this.b=b
				console.log(this)
			}
			var bindf=three.bind(obj,'b');
			bindf(1);// {name: "yiyi", age: 11, a: "b", b: 1}
			// new绑定this的优先级高于bind绑定,所以之前this绑定的对象无效了
			var four=new bindf(33); // 但是之前bind传的值还有效
			console.log(four);// {a: "b", b: 33}
```
* 简洁版
```
			// 手写bind 
			Function.prototype.bind=function(context,...bindments){
				context=context||window;
				const func=this;
				
				return function F(...callments){
					let args=bindments.concat(callments);
					if(this instanceof F){
						return new func(...args);
					}
					return func.call(context,...args)
				}
			}
			
			function one(a,b){
				this.a=a;
				this.b=b;
				console.log(this)
			}
			var obj={name:'yiyi'}
			var child=one.bind(obj,2);
			child(3);
			
			var two=new child(4);
			console.log(two)
```

## 手写call
```
			// 手写call 
			Function.prototype.call=function(context,...callargs){
				context=context||window;
				context.func=this;
				if(typeof context.func !=='function'){
					throw new TypeError("必须是函数调用call");
				}
				// 使用绑定的对象去调用方法
				let res=context.func(...callargs);
				// 因为绑定的时候算是给对象添加了属性func,所以需要删除该属性
				// 因为该属性不会再被用到
				delete context.func;
				return res
			}
```

## 手写apply
```
			Function.prototype.apply=function(context,arr){
				context=context||window;
				context.func=this;
				if(typeof context.func !=='function'){
					throw new TypeError("必须是函数调用apply");
				}
				let res=context.func(...arr);
				delete context.func;
				return res
			}
```