/**
 * Created by Administrator on 2017/5/25.
 */

function fun(){

    setTimeout(function(){
    //   请求成功
        if(成功){
            //成功操作
        //    dom操作
        }

    //    请求失败
        else{
        //    失败
        //    提醒用户
        }


    }, 2000);

}

function fun(successCallback, failcallBack){
    if(成功){
        successCallback(data);
    }else{
        failcallBack(error);
    }
}

fun(
    function(data){
        //dom操作
    },
    function(error){
    //    提醒用户
    }

);

