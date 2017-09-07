/**
 * Created by Administrator on 2017/5/25.
 */

//提供给node.js后台操作数据库的模型

var moogoose = require('mongoose');

var userSchemas = require('../schemas/users');

//该模型给表结构相连接
//创建模型：参数1：表的名字，参数2：表结构
module.exports = moogoose.model('User', userSchemas);


