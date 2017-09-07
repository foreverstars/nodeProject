/**
 * Created by Administrator on 2017/5/25.
 */
var express = require('express');


var app = new express();

app.use('/user/headImg', function(req, res, next){
    console.log(4);
    res.send('响应');
})

app.use(function(req, res, next){
    console.log(0);
    next();
})

app.use('/', function(req, res, next){
    console.log(1);
    next();
})

app.use('/user', function(req, res, next){
    console.log(2);
    next();
})

app.use('/user/headImg', function(req, res, next){
    console.log(3);
    // res.send('响应');
    next();
})




app.listen(7000);