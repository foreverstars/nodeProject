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
                    // window.location.reload();
                }
            }
        })

    })


})

