/**
 * Created by Administrator on 2017/5/24.
 */


$(function(){

    $('#exit').on('click', function(){
        $.ajax({
            type: 'get',
            url: '/api/user/exit',
            success: function(result){
                console.log(result);
                if(result.code == 0){
                //    刷新当前页面
                    window.location.reload();
                }
            }
        })

    })



})

