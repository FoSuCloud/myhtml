## 1.ajax和flash优缺点
* ajax:Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）;使得网页实现异步更新
* 优点:ajax比flash更加开放,flash需要收费；ajax的SEO更好，因为针对的是html文本，而flash主要是用于视频等多媒体调用的，SEO不好；

## 2.ajax工作流程
* ajax技术的核心其实就是`XMLHttpRequest对象`
* ajax工作原理分为三步:
1. 创建ajax对象 :var xhr=new XMLHttpRequst();
2. xhr发送请求:xhr.open('get','test.html','true');
* xhr.send(); `先open打开要发送的文件再send发送文件`
3. xhr获取响应
```
xhr.onreadystatechange=function(){
	if(xhr.readystate===4){
		/* 
		 ajax请求的状态码(和网络状态码不一样)
		 0:请求还没有建立(open还没有执行)
		 1:请求建立了还没发送(open执行啦~)
		 2:请求正式发送(send执行)
		 3:请求已经受理，部分数据可用，但是还没有完成
		 4:请求已经完成
		 */
		alert(xhr.responseText);//返回的数据
	}
}
```
