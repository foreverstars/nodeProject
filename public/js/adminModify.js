/**
 * Created by Administrator on 2017/5/26.
 */


$(function(){

    $('.btn-success').on('click', function(){
        $.ajax({
            type: 'POST',
            url: '/api/user/modify',
            data: {
                username: $('#user').text(),
                password: $('[name="psd"]').val(),
                repassword: $('[name="repsd"]').val()
            },
            success: function(result){
                console.log(result);
                if(result.code == 0){
                    window.location.href = '/admin/user';
                }else{
                    alert(result.message);
                }
            }
        })

    })



})

