/**
 * Created by Administrator on 2017/5/24.
 */
$(function(){

//    给登录按钮添加点击事件
    $('.btn-success').on('click', function(){
    //    实现注册功能
    //    前端 各种逻辑判断 （是否为空）
    //    发送请求
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $('[name="username"]').val(),
                password: $('[name="psd"]').val()
            },
            dataType: 'json',
            success: function(result){
                console.log(result);
                if(result.code == 0){
                    window.location.href = '/';

                }else{
                    alert(result.message);
                }
            }
        })

    })


})

