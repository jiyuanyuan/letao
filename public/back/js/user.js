/**
 * Created by Administrator on 2017/11/22.
 */
//去后台获取数据，渲染到页面中
$(function () {
    var currentPage = 1;
    var pageSize = 5;
//    分页渲染数据
    function render() {
    //    发送ajax请求
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (info) {
                console.log(info);
                var html = template("tpl", info);
                $("tbody").html(html);
            //    渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total/pageSize),
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
//    页面加载一次就渲染一次
    render();
//    启用禁用功能
//    给表格中所有按钮注册点击事件（事件委托）
    $("tbody").on("click",".btn",function () {
    //    显示模态框
        $("#userModal").modal("show");
    //    获取到对应的ID
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-danger")?0:1;

    //    给确定按钮注册事件
        $(".btn_confirm").off().on("click",function () {
        //    发送ajax请求
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function (info) {
                    if(info.success){
                    //    关闭模态框
                        $("#userModal").modal("hide");
                    //    重新渲染
                        render();
                    }
                }
            })
        })
    })
});




















