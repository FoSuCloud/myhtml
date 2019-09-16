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
