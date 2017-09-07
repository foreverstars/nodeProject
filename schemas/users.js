/**
 * Created by Administrator on 2017/5/25.
 */
//连接数据库的表结构

var moogoose = require('mongoose');

//创建用户的表结构
module.exports = new moogoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});