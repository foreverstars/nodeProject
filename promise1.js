/**
 * Created by Administrator on 2017/5/25.
 */
var fs = require('fs');



//Promise功能：
// 1.执行异步的回调，resolve成功的回调方法，reject失败回调方法
// 2.如果Promise中代码执行有错，那么会抛出异常到reject方法中
var promise = new Promise(function(resolve, reject){
//    Promise构造函数中传入的这个方法，当Promise对象一创建就执行
//    在这个方法中可以做异步操作
//    在这个方法中可以做耗时操作

//    读文件
    var path = 'C:/Users/Administrator/Downloads/mongodb-win32-x86_64-2008plus-ssl-3.4.2-signed.msi';
    var buffer =  fs.readFileSync(path);

    console.log(buffer);

    if(buffer){
        resolve(buffer);
    }else{
        // reject();
    }
//    成功操作

//    失败操作

});

promise.then(
    function(buffer){//对应的resolve方法
        console.log('成功');
        console.log(buffer);
    },
    function(error){//对应的reject方法
        console.log('失败');
        console.log(error);
    }
);




