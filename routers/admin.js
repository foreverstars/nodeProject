/**
 * Created by Administrator on 2017/5/24.
 */

var express = require('express');
var url = require('url');
var qs = require('querystring');

var User = require('../models/User');

//创建路由对象
//可以对请求路径进行处理
//处理方式 router.get()    router.post()
var router = express.Router();

router.get('/', function(req, res, next){
    console.log(req.userInfo);
    if(req.userInfo){
        res.render('admin/index', {
            username: req.userInfo.username,
            isAdmin: req.userInfo.isAdmin
        });
    }else{
        res.render('admin/index');
    }

})

router.get('/login', function(req, res, next){

    res.render('admin/login');


})

router.get('/user', function(req, res, next){
    //先从数据库中取出用户列表
    if(req.userInfo){

        //查询数据库用户总共有多少条用户数据
        User.count().then(function(count){
            var limit = 5;
            //    计算总页数
            var pages = Math.ceil(count/limit);
            //当前页
            var query = req.query;
            console.log(query);
             var page = Number(query.page || 1);

            var skip = (page - 1)*limit;
        //    根据条件查询
            User.find().limit(limit).skip(skip).then(function(result){
                console.log('用户列表');
                // console.log(result)
                //将查询的用户列表给用户页面展示
                res.render('admin/user', {
                    username: req.userInfo.username,
                    isAdmin: req.userInfo.isAdmin,
                    listData: result,
                    page: page,
                    pages: pages
                });
            })

        })



    //    0~4         page=1
    //    5~9         page=2
    //    10~14       page=3
    //    15~19       page=4

    //    限制查询用户数据的条数
    //    limit(count)    5    7
    //    给到查询的起始位置
    //    skip(7)





    }else{
        res.render('admin/user');
    }

})

router.get('/modify', function(req, res, next){

    console.log(req.query.userId.toString());
    var id = req.query.userId;
    //查询数据库，查询对应的用户
    User.findById(id).then(function(result){
        console.log(result);
        res.render('admin/modify', {
            username: result.username,
            psd: result.password
        });
    })




})





module.exports = router;

