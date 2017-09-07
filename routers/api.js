/**
 * Created by Administrator on 2017/5/24.
 */
var express = require('express');

var User = require('../models/User');

var router = express.Router();

router.post('/user/register', function(req, res, next){
    // console.log(req);
    // console.log(req.query);
    console.log(req.body);
    var params = req.body;
   // 用户名是否为空
//    密码不能为空
//    两次密码需要一样

    var responseData = {
        code: 0,  // 0               1               2              3                 4
        message: ''  //注册成功    用户名不能空    密码不能为空   两次密码不一样    该用户已存在
    };

    if(params.username == ''){
    //    告诉客户端用户名为空
        responseData.code = 1;
        responseData.message = '用户名不能空';
    //    将结果告诉客户端
        res.json(responseData);
        return;
    }
    else if(params.password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    else if(params.password != params.repassword){
        responseData.code = 3;
        responseData.message = '两次密码不一样';
        res.json(responseData);
        return;
    }
    else{
    //    查询数据库
    //    进行判断
    //    响应客户端

        //查找该用户名是否存在
        //参数1：查询条件
        User.findOne({
            username: params.username
        }).then(
            function(userInfo){
            //    如果查询成功，userInfo才有值
                if(userInfo){
                //    数据库中有该用户记录
                    responseData.code = 4;
                    responseData.message = '该用户已存在';
                    res.json(responseData);
                }
                else{
                //    没有该用户，进行注册，保存该用户信息
                    var user = new User({
                        username: params.username,
                        password: params.password
                    });
                    return user.save();
                }

            }
        ).then(function(newUserInfo){
            console.log(newUserInfo);
            responseData.code = 0;
            responseData.message = '注册成功';
            res.json(responseData);
        })

    }

})

router.post('/user/login', function(req, res, next){
    var params = req.body;

    var responseData = {
        code: 0,  // 0               1                       2
        message: ''  //登录成功    用户名或密码不能为空    用户名或密码错误
    };
    if(params.username && params.password){
    //    查询数据库
        var p = User.findOne({
            username: params.username,
            password: params.password
        }).exec();




        console.log(p)
        console.log(1)
            p.then(function(userInfo){
            // console.log(userInfo)
        //    userInfo查询的结果
            if(userInfo){
                //登录成功，将cookies信息添加到请求对象中
                //浏览器就能够得到cookies的信息。
                //浏览器以后只要访问该后台，都能将cookies告诉后台
                req.cookies.set('userId', userInfo._id);

                responseData.code = 0;
                responseData.isAdmin = userInfo
                responseData.message = '登录成功';
                res.json(responseData);

            //
            }else{
            //    登录失败
                responseData.code = 2;
                responseData.message = '用户名或密码错误';
                res.json(responseData);
            }
        })

    }
    else{
    //    提示
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
    }




})


//处理退出的请求
router.get('/user/exit', function(req, res, next){
    req.cookies.set('userId', '');

    res.json({
        code: 0,
        message: '退出成功'
    });

})


//修改用户数据
router.post('/user/modify', function(req, res, next){
    if(req.body.password != req.body.repassword){
        res.json({
            code: 2,
            message: '密码不一致'
        });
        return;
    }

    console.log(req.body);
//    对数据库中的这条数据执行修改
//    参数1:查询数据的条件
//    参数2：修改的内容
    User.update({username: req.body.username}, {
        password: req.body.password
    }).then(function(result){
        console.log('修改了');
        console.log(result);
        if(result.ok){
            res.json({
                code: 0,
                message: '修改成功'
            });
        }else{
            res.json({
                code: 1,
                message: '修改不成功'
            });
        }
    })


})


//删除用户数据的请求
router.get('/user/delete', function(req, res, next){
    console.log(req.query.id);
    if(req.query.id){
    //    删除
        User.remove({_id: req.query.id}).then(function(result){
            console.log('删除了');
            console.log(result);
            res.json({
                code: 0,
                message: '删除成功'
            })
        })

    }else{
    //
        res.json({
            code: 1,
            message: '删除失败'
        })
    }

})



module.exports = router;