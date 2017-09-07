/**
 * Created by Administrator on 2017/5/24.
 */

var express = require('express');

var User = require('../models/User');
//创建路由对象
//可以对请求路径进行处理
//处理方式 router.get()    router.post()
var router = express  .Router();

router.get('/', function(req, res, next){
    // res.send('用户首页');
    console.log(req.cookies.get('userId'));
    var userId = req.cookies.get('userId');
    if(userId){
        //查询数据库
        User.findOne({
            _id: userId
        }).then(function(userInfo){
            res.render('main/index',{
                userInfo: "千峰教育",
                isLogin: true,
                username: userInfo.username
            });
        })


    }
    else{
        res.render('main/index',{
            userInfo: "千峰教育",
            isLogin: false
        });
    }


})
router.get('/login', function(req, res, next){
    res.render('main/login');
})
router.get('/register', function(req, res, next){
    res.render('main/register');
})

module.exports = router;

