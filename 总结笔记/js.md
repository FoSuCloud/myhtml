## 1.Boolean类型判断
* `let bool1=false ;typeof bool1  => boolean `
* `let bool2=new Boolean(false);typeof bool2 => Object  ;console.log(bool2) =>false`
* 可以看出构造函数的布尔类型实例为对象，该实例的值也是false,但是使用==或者!==判断类型的时候需要先转换为Number类型，所以bool2==true =>false;bool2==false;=>true
* 布尔值为false的只有:`null,undefined,"",false,0,NaN`
