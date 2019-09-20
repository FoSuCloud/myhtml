## 1.websocket
1. websocket是基于`tcp协议`的
2. websocket只需要客户端与服务器端进行`握手一次就可以进行数据传输与接收`
3. `允许服务器主动发送数据，不需要轮询`

## 2.iframe
* iframe就是在一个页面内显示另一个页面(这个页面可能是外部网页也可能是站内页面)，因此使用iframe会创建包含另一个文档的内联框架，还会出创建多一个window对象(也就是子窗口)
`iframe是有ajax长轮询的，和websocket不一样,所以websocket和ajax不一样`
1. iframe用来嵌入广告:`如果我们直接在div下面嵌套广告，会造成布局紊乱，而且还需要额外引入css/js文件，降低网页安全性，所以可以通过iframe的方式进行解决，因为ifarme内部算是一个沙盒，里面的内容不会侵入到主页样式`
2. ifarme具有`click优先权`：当有人在伪造的主页进行点击的时候，如果点击在iframe页面上就会默认点击在iframe页面上，而钓鱼网站就是通过这个技术来诱导用户点击的，可以通过`if window!=window.top来防止网站被钓鱼`
---
* iframe的局限性:
1. iframe的创建比DOM元素慢了一两个数量级
2. 因为页面的window.onload事件需要等到iframe页面加载完毕才会执行，所以iframe会阻塞页面
3. iframe与顶层window对象共享连接池，但是iframe页面里面的内容可能会消耗太多连接池内容，从而阻塞主页面的加载
4. SEO无法解析iframe
[参考](https://www.cnblogs.com/Leophen/p/11403800.html)

## 3.ul与ol
1. ol(olderly有序列表)
`list-style-type:upper-roman每列前面都是大写的罗马数字`
`list-style-type:lower-alpha每列前面都是小写的字母`
2. ul(unolderly无序列表)
`list-style-type:circle每列前面都是圆圈`
`listy-style-type:square每列前面都是正方形`

## 4.h5不闭合标签
1. br:换行标签
2. img:图片标签
3. input:表单输入标签，有多种类型
4. meta:媒体标签，用来说明文档，例如字符编码，响应式布局等

## 5.h5的嵌套规则
1. 块级元素可以包含内联元素或者`某些块元素`，但是`内联元素不能包含块级元素,内联元素只能包含其他内联元素`
* 例子:块级元素嵌套
```
<div id="app">
	<!-- 1.1块级元素div嵌套块级元素p -->
	<p></p>
	<!-- 1.2块级元素div嵌套内联元素span -->
	<span id="app"></span>
</div>
```
* 例子:错误！内联元素不能嵌套块级元素
`<span><div>i am</div></span>`
* `内联元素可以嵌套其他内联元素`
`<span><a href="#">one</a></span>`
2. p块级元素不可以嵌套其他块级元素
3. 除了p元素，还有这些块级元素也不能包含块级元素，如:p,h1-6,dt
4. 注意 li元素也是块级元素，可以包含ol,ul,div等块级元素

## 6.元素内外文本及自身
1. innerHTML:在读模式下，innerHTML返回元素的所有子节点(包括注释，文本，标签)，在写模式下会创建一个新的子节点代替原来的子节点
2. outerHTML:在读模式下是获取该元素本身，在写模式下是创建一个新的节点代替原来的节点
```
如: <div id="app">
		我是父元素div的内容
		<span>我是子元素span的内容</span>
    </div>
使用innerHTML:输出 我是父元素div的内容 <span>我是子元素span的内容</span>
使用outerHTML:输出 <div id="app">  我是父元素div的内容 <span>我是子元素span的内容</span> </div>
```
3. innerText/outerText:在读模式下，都是获取该元素(包括子元素)的文本，但是在写模式下完全不同！
`在写模式下，innerText使用文本替换整个节点的所有子节点，例如上面的例子被 one 替换就会变成<div id="app"> one </div> `
`在写模式下，outerText使用文本正欢整个节点！！！再用one替换就成了 one 所以也就是只剩下一个文本了`
* [参考](https://www.cnblogs.com/jongsuk0214/p/6930876.html)
