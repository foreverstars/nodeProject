/**
 * Created by Administrator on 2017/5/24.
 */
$(function(){

//    给注册按钮添加点击事件
    $('#register').on('click', function(){
    //    实现注册功能
    //    前端 各种逻辑判断 （是否为空， 两次密码是否一致， 密码是否过于简单， 用户名是否合法）
    //    发送请求
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $('[name="username"]').val(),
                password: $('[name="psd"]').val(),
                repassword: $('[name="rePsd"]').val()
            },
            dataType: 'json',
            success: function(result){
                console.log(result);
                if(result.code == 0){
                    // window.location.href = '/';
                }else{
                    alert(result.message);
                }

            }
        })

    })


})

