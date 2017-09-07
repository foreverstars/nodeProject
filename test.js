/**
 * Created by Administrator on 2017/5/25.
 */
var express = require('express');


var app = new express();

app.get('/', function(req, res, next){
    console.log(1);
    next();
})

app.get('/user', function(req, res, next){
    console.log(2);
    next();
})

app.get('/user/headImg', function(req, res, next){
    console.log(3);
    // res.send('响应');
    next();
})

app.get('/user/headImg', function(req, res, next){
    console.log(4);
    res.send('响应');
})


app.listen(8000);