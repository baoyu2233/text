$(document).ready(function(){
            searchInit(); // 控制搜索框切换
            // Android下载
    //添加Android_load pv日志数据
    $(".Android_load").attr("_bamboo_rep_transid","180184001");
    $(".Android_load").attr("_bamboo_rep_menuid","http://iservice.10010.com/lt/database/clientdownload/index.jsp");
    $(".Android_load").attr("_bamboo_rep_title",$.trim($(".Android_load").html()));
    $(".Android_load").attr("_bamboo_rep_productlink","http://iservice.10010.com/lt/database/clientdownload/index.jsp");
            // Ios下载
    //添加ios pv日志数据
    $(".Ios_load").attr("_bamboo_rep_transid","180184001");
    $(".Ios_load").attr("_bamboo_rep_menuid","http://iservice.10010.com/lt/database/clientdownload/index.jsp");
    $(".Ios_load").attr("_bamboo_rep_title",$.trim($(".Ios_load").html()));
    $(".Ios_load").attr("_bamboo_rep_productlink","http://iservice.10010.com/lt/database/clientdownload/index.jsp");
            // 微博关注
    //添加微博pv日志数据
    $(".cur_pointer .WeChat_Sina_pic2").attr("_bamboo_rep_transid","180184001");
    $(".cur_pointer .WeChat_Sina_pic2").attr("_bamboo_rep_menuid","http://weibo.com/dianziqudao");
    $(".cur_pointer .WeChat_Sina_pic2").attr("_bamboo_rep_title","微博");
    $(".cur_pointer .WeChat_Sina_pic2").attr("_bamboo_rep_productlink","http://weibo.com/dianziqudao");
    //添加左侧 pv日志数据
            $(".bottom_nav_div li a").each(function(i,j){
                var skipIndex = "";
                var _bamboo_rep_menuid="";
                if (i < 14) {
                    $(this).attr("htmlIndex",(i+1));
                    skipIndex = $(this).attr("htmlIndex");
                    _bamboo_rep_menuid="http://mall.10010.com/mall-web/HelpCenter/init?skipIndex="+skipIndex;
                }else if (i == 14) { // 营业厅分布查询
                    _bamboo_rep_menuid="http://iservice.10010.com/e4/query/service/search_hall-iframe.html?menuId=000400010001";
                }else if (i == 15) { // 号码归属地查询
                    _bamboo_rep_menuid="http://iservice.10010.com/e4/query/others/service_belong-iframe.html?menuCode=000400010003";
                }else if (i == 16) { // 常见问题
                    _bamboo_rep_menuid="http://iservice.10010.com/e4/transact/basic/common_question_iframe.html?menuCode=000500020002";
                }else{
                    //skipIndex = $(this).attr("htmlIndex");
                    //_bamboo_rep_menuid="http://www.10010.com/mall-web/HelpCenter/init?skipIndex="+skipIndex;
                }
                var _bamboo_rep_transid="180184001";
                var _bamboo_rep_title=$(this).html();
                $(j).attr("_bamboo_rep_transid",_bamboo_rep_transid);
                $(j).attr("_bamboo_rep_menuid",_bamboo_rep_menuid);
                $(j).attr("_bamboo_rep_title",_bamboo_rep_title);
                $(j).attr("_bamboo_rep_productlink",_bamboo_rep_menuid);
            });

            //$(".mynavFooter li a").click(function(){
            //    if($(this).attr("htmlIndex")!=undefined) {
            //        var skipIndex = $(this).attr("htmlIndex");
            //        window.open("http://www.10010.com/mall-web/HelpCenter/init?skipIndex="+skipIndex);
            //    }
            //});
            });

