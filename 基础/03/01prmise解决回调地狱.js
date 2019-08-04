const fs=require('fs')
const path=require('path')
<!-- // 回调地狱其实就是一个函数嵌套一个函数(前一个函数不结束),一层层嵌套
// 而promise解决回调地狱就是执行完一个函数再执行一个
 -->
function getFile(path){
	return 	new Promise(function(resolve,reject){
		fs.readFile(path,'utf-8',(err,data)=>{
			if(err) return reject(err)
			resolve(data)
		})
	})
}

// 普通调用方式
getFile(path.join(__dirname,'../txt/1.txt'))


// 解决回调地狱
getFile(path.join(__dirname,'../txt/4.txt'))
.then(function(data){
	console.log(data+'成功啦')
	return getFile(path.join(__dirname,'../txt/2.txt'))
})
.then(function(data){
	console.log(data+'成功啦')
	return getFile(path.join(__dirname,'../txt/3.txt'))
}
)
.catch(function(err){
	console.log(err)
})

