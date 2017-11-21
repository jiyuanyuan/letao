/**
 * Created by Administrator on 2017/11/21.
 */

NProgress.configure({ showSpinner:false });
$(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();
});
$(document).ajaxStop(function () {
    //完成进度条
    setTimeout(function () {
        NProgress.done();
    },500);

});
