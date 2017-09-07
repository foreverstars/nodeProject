/**
 * Created by Administrator on 2017/5/24.
 */


$(function(){

    $('.btn-danger').on('click', function(){
        console.log(this)
        $.ajax({
            type: 'get',
            url: '/api/user/delete',
            data: {
                id: this.id
            },
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

