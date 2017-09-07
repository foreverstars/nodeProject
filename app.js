//项目入口文件
var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
//操作数据库的模块
var mongoose = require('mongoose');
//引入cookies操作的模块
var cookies = require('cookies');



var adminRouter = require('./routers/admin');
var apiRouter = require('./routers/api');
var mainRouter = require('./routers/main');

var User = require('./models/User');

//创建服务器，
//相当于node的http.createServer()
var app = express();

//使用bodyParser解析请求对象中的请求参数
app.use(bodyParser.urlencoded({extended: false}));

//对所有的请求添加cookies
// 拦截请求，将cookies中userId取出，查询数据库，得到用户数据
//给请求对象设置自定义的属性  req.isadmin
app.use(function(req, res, next){
    req.cookies = new cookies(req, res);
    if(req.cookies.get('userId')){
    //    请求对象中有userId的cookies值，就查询数据库
        User.findOne({
            _id: req.cookies.get('userId')
        }).then(function(userInfo){
            if(userInfo){
                req.userInfo = userInfo;
            }
            next();
        })
    }else{
        next();
    }

})

//1.配置应用模板
//参数1：模板引擎的名称，同时也是模板文件的后缀名
//参数2：解析处理模板的方法
app.engine('html', swig.renderFile);

//2.设置模板文件存放的路径
//参数1：固定参数
//参数2：存放的路径
app.set('views', './views');

//3.注册使用的模板
//参数1：固定字段
//参数2：于app.engine 的模板引擎名字保存一致
app.set('view engine', 'html');

//swig模板引擎会对读取过得文件进行缓存。
//生产环境：需要
//开发环境：关闭
swig.setDefaults({cache: false});

//由于css,js,image等静态文件，不需要逻辑处理。
//怎么请求，怎么返回这个文件
//静态文件托管
//凡是以‘/public’开头的请求，都会被参数2方法处理
//express.static(参数):得到路径后，直接读取文件，给客户端，参数：读取静态资源的路径
app.use('/public', express.static(__dirname+'/public'));


//客户端请求
//html（前端页面，后台管理系统页面）  api
//划分模块 --- 管理路径
// 前端 (/)  管理系统(/admin)    api(/api)
app.use('/', mainRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);


//用户访问localhost：8080   ---- 404
//服务器根据路径进行响应

/*
//根据路径进行拦截
//通过app.get()或者是app.post()等方法可以把url路径跟对应的函数(可以是一个或多个)绑定，进行处理
app.get('/', function(request, response, next){
//    request客户端请求对象（有请求的数据）
//    response 服务端响应对象  (将处理逻辑的结果写入响应对象，客户端才能接收)
//    next : 方法  用于执行下一个路径匹配的函数

    // response.send('<h1>欢迎光临</h1>');

    //'views/index.html'
    response.render('index');

})
*/


//服务器连接数据库
//数据库地址： mongodb://localhost:27017
mongoose.connect('mongodb://localhost:27018', function(error){
//    连接数据库之后的回调
    if(error){
        console.log('连接数据库失败');
        console.log(error);
    }
    else{
        console.log('连接数据库成功');
    //    如果连接成功，就可以通过mongoose模块操作数据库

        //连接成功，再启动服务
        app.listen(8888);
    }

});




