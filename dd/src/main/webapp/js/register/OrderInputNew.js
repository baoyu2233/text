var CertPhotoConfirmedFlag = false;
var time;
var supCod = true;// 当前地市是否支持货到付款

function CertPhotoConfirmed() {
    CertPhotoConfirmedFlag = true;
    checkOrderInputInfo();
}
function UnCertPhotoConfirmed() {
    CertPhotoConfirmedFlag = false;
    checkOrderInputInfo();
}
$(function () {
    $.subscribe("/CertPhoto/confirmed", CertPhotoConfirmed);
    $.subscribe("/CertPhoto/unConfirmed", UnCertPhotoConfirmed);
    $(".unChoice img").hide();
    $(".choice img").show();
    $(".monthFeeDetail").hide();
    $("#newUserInfo").show();
    $("#oldUserInfo").hide();
    $("#oldUserInfoFin").hide();
    $(".oldPhoneResult").hide();
    $("#addressNewAreaDetail").hide();
    $("#kuaidi").show();
    $("#ziti").hide();
    $("#online").show();
    $("#unOnline").hide();
    $(".deleBtn").hide();
    $(".deleBtn1").hide();
    $("#infoBoxUnBtn").show();
    $("#infoBoxBtn").hide();
    $("#zitiBtn").hide();
    if(merchantProvice=="79"){
        $("#kuaidi").hide();
        $("#ziti").show();  
        $("#zitiBtn").hide();
    }
    //商品清单 赠品信息居中
    if ($(".GoodsDetailContent #goodsPrensent").text().trim() == '无') {
        $(".GoodsDetailContent #goodsPrensent").css("text-align", "center");
    }
    var $buyDate = $("#buyDate").find("li");
    var $feeDetail = $("#feeDetail").find("li");
    var $TCDetail = $("#TCDetail").find("li");

    $("#netNotice").live("click", function () {
        checkNetwork();
    });
    $("#broAddInformationNotice").live("click", function () {
        checkInstallInfo();
    });
    var $jsHeight = $("#jsHeight");
    $jsHeight.css("margin-top", (34 - $jsHeight.height() / 2) + "px");


    //判断查看更多地址按钮是否出现
    if ($(".userInfoDetail").length == 8
    ) {
        $(".moreAddress").show();
    } else {
        $(".moreAddress").hide();
    }

    $(".infoTap li").click(function () {
        $(this).removeClass("unChoice");
        $(this).addClass("choice");
        $(this).siblings().removeClass("choice");
        $(this).siblings().addClass("unChoice");
        $(".unChoice img").hide();
        $(".choice img").show();
    });
    //月租选择
    $(".monthFee li").mouseover(function () {
        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");
    });
    $(".monthFee li").mouseleave(function () {
        $(this).removeClass("redSelect");

    });
    $(".monthFee li").click(function () {
        $(this).addClass("redSelectAction");
        $(this).siblings().removeClass("redSelectAction");
    });

    $(".monthFee1 li").mouseover(function () {
        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");
    });
    $(".monthFee1 li").mouseleave(function () {
        $(this).removeClass("redSelect");

    });
    $(".monthFee1 li").click(function () {
        $(this).addClass("redSelectAction");
        $(this).siblings().removeClass("redSelectAction");
    });

    $(".monthFee2 li").mouseover(function () {
        var count;
        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");
    });
    $(".monthFee2 li").mouseleave(function () {
        $(this).removeClass("redSelect");

    });
    $(".monthFee2 li").click(function () {
        $(this).addClass("redSelectAction");
        $(this).siblings().removeClass("redSelectAction");
        $(".monthFee2 li").each(function (index) {
            if ($(this).hasClass("redSelectAction")) {
                count = index;
            }
        });
        $buyDate.eq(count).addClass("redf60").siblings().removeClass("redf60");
        $feeDetail.eq(count).addClass("redf60").siblings().removeClass("redf60");
        $TCDetail.eq(count).addClass("redf60").siblings().removeClass("redf60");
        if(count==0){
            $("#contentAllDesc").show();
            $("#contentTotalDesc").hide();
        }else{
            $("#contentAllDesc").hide();
            $("#contentTotalDesc").show();
        }
    });
    //获取月租资费信息
   
    $(".monthFeeDetail1").click(function () {
        var count1 = 0;
        $(".monthFee li").each(function (index) {
            var $elment = $(this);
            if ($elment.hasClass("redSelectAction")) {
                count1 = index;
            }
        });
        $(".monthFeeDetail").show().center();
        $(".thickdiv").show().height($("body").outerHeight());
        $(".monthFee2 li").eq(count1).addClass("redSelectAction");
        $(".monthFee2 li").eq(count1).siblings().removeClass("redSelectAction");
        $buyDate.eq(count1).addClass("redf60").siblings().removeClass("redf60");
        $feeDetail.eq(count1).addClass("redf60").siblings().removeClass("redf60");
        $TCDetail.eq(count1).addClass("redf60").siblings().removeClass("redf60");
        if(count1==0){
            $("#contentAllDesc").show();
            $("#contentTotalDesc").hide();
        }else{
            $("#contentAllDesc").hide();
            $("#contentTotalDesc").show();
        }

    });
    $(".monthFeeDetail2").click(function () {
        var count1 = 0;
        $(".monthFee1 li").each(function (index) {
            var $elment = $(this);
            if ($elment.hasClass("redSelectAction")) {
                count1 = index;
            }
        });
        $(".monthFeeDetail").show();
        $(".monthFeeDetail").addClass("oldUserB");
        $(".thickdiv").show().height($("body").outerHeight());
        $(".monthFee2 li").eq(count1).addClass("redSelectAction");
        $(".monthFee2 li").eq(count1).siblings().removeClass("redSelectAction");
        $buyDate.eq(count1).addClass("redf60").siblings().removeClass("redf60");
        $feeDetail.eq(count1).addClass("redf60").siblings().removeClass("redf60");
        $TCDetail.eq(count1).addClass("redf60").siblings().removeClass("redf60");
        if(count1==0){
            $("#contentAllDesc").show();
            $("#contentTotalDesc").hide();
        }else{
            $("#contentAllDesc").hide();
            $("#contentTotalDesc").show();
        }
    });


//新用户信息修改


    $("#useNewNumChange").click(function () {
        var name = $(".inforname").text();
        var iden = $(".inforIden").text();
        $("#userName").val(name);
        $("#identify").val(iden);

        $("#infoBoxUnBtn").show();
        $("#infoBoxBtn").hide();
        $(".infoBoxBtn").show();
        $(".infoBoxBtn").closest(".table").show();
        isConfirmedNetWork = "false";
        checkOrderInputInfo();
    });


    $("#monthFeeDetailClose").click(function () {
        var count2 = 0;
        $(".monthFee2 li").each(function (index) {
            var $elment = $(this);
            if ($elment.hasClass("redSelectAction")) {
                count2 = index;
            }
        });
        //判断首月月租是新用户还是老用户
        if ($(".monthFeeDetail").hasClass("oldUserB")) {
            $(".monthFee1 li").eq(count2).addClass("redSelectAction");
            $(".monthFee1 li").eq(count2).siblings().removeClass("redSelectAction");
            $(".monthFeeDetail").removeClass("oldUserB")

        } else {
            $(".monthFee li").eq(count2).addClass("redSelectAction");
            $(".monthFee li").eq(count2).siblings().removeClass("redSelectAction");
        }
        $(".monthFeeDetail").hide();
        $(".thickdiv").hide();

    });

    $(".monthFeeDetailClose").click(function () {
        $(".monthFeeDetail").hide();
        $(".thickdiv").hide();

    });

    //SIM卡类型选择
    $(".simKind li").mouseover(function () {
        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");
    });
    $(".simKind li").mouseleave(function () {
        $(this).removeClass("redSelect");
    });
    $(".simKind li").click(function () {
        $(this).addClass("redSelectAction");
        $(this).siblings().removeClass("redSelectAction");
    });

    $(".simKind1 li").mouseover(function () {
        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");
    });
    $(".simKind1 li").mouseleave(function () {
        $(this).removeClass("redSelect");
    });
    $(".simKind1 li").click(function () {
        $(this).addClass("redSelectAction");
        $(this).siblings().removeClass("redSelectAction");
    });


    $(".simKind2 li").mouseover(function () {

        if ($(".moreModel").length == 0) {
            $(this).addClass("redSelect");
            $(this).siblings().removeClass("redSelect");
        }

    });
    $(".simKind2 li").mouseleave(function () {
        if ($(".moreModel").length == 0) {
            $(this).removeClass("redSelect");

        }
    });
    $(".simKind2 li").click(function () {

        if ($(".moreModel").length == 0) {
            $(this).addClass("redSelectAction");
            $(this).siblings().removeClass("redSelectAction");
        }
        $(".simKind2 li").each(function (index) {
            var $this = $(this);
            if ($this.hasClass("redSelectAction")) {
                count = index;
            }
        });

        $(".MKDp p").eq(count).addClass("redSelectAction").siblings().removeClass("redSelectAction");
    });
    $(".MKDp p").mouseover(function () {

        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");

    });
    $(".MKDp p").mouseleave(function () {

        $(this).removeClass("redSelect");

    });
    $(".MKDp p").click(function () {

        var count = 0;
        $(this).addClass("redSelectAction");
        $(this).siblings().removeClass("redSelectAction");
        $(".MKDp p").each(function (index) {
            var $this = $(this);
            if ($this.hasClass("redSelectAction")) {
                count = index;
            }
        });

        $(".simKind2 li").eq(count).addClass("redSelectAction").siblings().removeClass("redSelectAction");
    });
//物流公司选择
    $(".orderCartCom li,.distributionDay li").mouseover(function () {
        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");
    });
    $(".orderCartCom li,.distributionDay li").mouseleave(function () {
        $(this).removeClass("redSelect");
    });
//送货时间选择
    $(".orderCartTime li").mouseover(function () {
        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");
    });
    $(".orderCartTime li").mouseleave(function () {
        $(this).removeClass("redSelect");
    });
    $(".orderCartTime li").click(function () {
       $(this).addClass("redSelectAction");
       $(this).siblings().removeClass("redSelectAction");
    });
    
    /**
     * 配送时间的点击事件·
     */
    var selTimes,selTimesSucc;
    $(".distributionDay li").click(function () {
        var count=$(".distributionDay li").index($(this)[0]);
        //$(this).addClass("redSelectAction");
        //$(this).siblings().removeClass("redSelectAction");
        if(count==3){//判断是否指定时间
            $(".payment").each(function(){
                if($(this).css("display")!="none"){
                    $(this).addClass("showPayment");
                }
            });
            var initHtml=$(this).html();
            //日历选择框本月当日及之前日期不可选
            var today=new Date();
            var tom=new Date();
                tom.setDate(tom.getDate()+3);
            var todayY=tom.getFullYear();
            var todayM=tom.getMonth()+1;
            var todayD=tom.getDate();
            var end = today;
                end.setMonth(end.getMonth()+1,1);
            var endDayY = end.getFullYear();
            var endDayM = end.getMonth()+1;
            var endDayD = end.getDate();
            endDayM = endDayM<10?"0"+endDayM:endDayM;
            endDayD = new Date(endDayY,endDayM,0).getDate();
            todayM=todayM<10 ?"0"+todayM:todayM;
            todayD=todayD<10 ?"0"+todayD:todayD;
            var initTime=todayY+'-'+todayM+'-'+todayD+' 00:00:00';
            var endTime = endDayY+'-'+endDayM+'-'+endDayD+' 00:00:00';
            laydate({min:initTime,max:endTime});
            $("#laydate_box").show().css({
                position: "fixed",
                left: "50%", 
                top: "50%",
                margin:"-200px 0 0 -200px"
            });
            setTimeout(function () {
                $(".thickdiv").show().css({
                    width:"100%",
                    height:"100%"
                });

                //标记下一天
                var $table=$("#laydate_table");
                var laydate=$table.find(".laydate_click");
                var count=$table.find("td[AClass='AClass']").index(laydate[0]);

                var state=$(".distributionDay").find("li").eq(3).hasClass("isSureTime");
                if(!state){
                    laydate.removeClass("laydate_click isSure");
                    $table.find("td[AClass='AClass']").eq(count+3).addClass("laydate_click isSure");
                }else{
                    $table.find("td[AClass='AClass']").eq(count).addClass("laydate_click isSure");
                }


                laydate=$table.find(".isSure");
                var y=laydate.attr("y");
                var m=laydate.attr("m");
                var d=laydate.attr("d");
                selTimesSucc=m+"月"+d+"日之后";
                selTimes="将在您指定日期（"+y+"年"+m+"月"+d+"日）后尽快发货，如选择“指定日期配送”则仅支持在线支付。";
                $(".selTimeDesc").text(selTimes);
                //左右箭头选择日期(年份+月份)
                $(".laydate_choose").each(function () {
                    bindFun($(this));
                })
                //选择指定月份
                $("#laydate_ms").find("span").each(function () {
                    bindFun($(this));
                })
                //选择指定年份
                $("#laydate_YY").each(function () {
                    $(this).live("click", function () {
                        $("#laydate_ys").find("li").each(function () {
                            bindFun($(this));
                        })
                    });
                });
                //上、下一页年份
                $(".laydate_chtop").each(function () {
                    $(this).live("click", function () {
                        $("#laydate_ys").find("li").each(function () {
                            bindFun($(this));
                        })
                    });
                });
                
                $(".laydate_chdown").each(function () {
                    $(this).live("click", function () {
                        $("#laydate_ys").find("li").each(function () {
                            bindFun($(this));
                        })
                    });
                });
                
            },100);
            $(this).html(initHtml);
        }else{
            $(".payment").each(function(){
                if($(this).css("display")!="none"){
                    $(this).addClass("showPayment");
                }
            });
            $(this).addClass("redSelectAction");
            $(this).siblings().removeClass("redSelectAction");
            $(".showPayment").show();
            $("payment").removeClass("showPayment");
        }
    });

    /*入网信息切换*/
    $(".newUserInfo").click(function () {
        netWorkType = "new";
        $(".newOldChange").show();
        $("#newUserInfo").show();
        $("#oldUserInfo").hide();
        $(".userInformation .infoTap .bgA").animate({
            left: 0
        }, 300);
        $(".newUserInfo span").css("color", "white");
        $(".oldUserInfo span").css("color", "black");
        checkOrderInputInfo();
        if (isConfirmedNetWork == "true") {
            $("#invoiceTitle").text($(".inforname").text());
        } else {
            $("#invoiceTitle").text("默认为机主姓名");
        }
    });
    $(".oldUserInfo").click(function () {
        netWorkType = "old";
        $(".newOldChange").hide();
        $(".userInformation .infoTap .bgA").animate({
            left: 130
        }, 300);
        $(".oldUserInfo span").css("color", "white");
        $(".newUserInfo span").css("color", "black");

        if ($(".oldUserInfoFin").length > 0) {
            $("#oldUserInfo").hide();
        } else {
            $("#oldUserInfo").show();
        }
        $("#newUserInfo").hide();
        checkOrderInputInfo();
        if (isConfirmedOldNetWork == "true") {
            $("#invoiceTitle").text($(".oldNameShow").text());
        } else {
            $("#invoiceTitle").text("默认为机主姓名");
        }
    });
    if (isPhoneLogin == "true" && isNotNeedNetworkData != "true" && ((isMainSubFlag != "1" && isWoFamilyFlag != "1") || (isMainSubFlag == "1" && mainCardType == "1") || (isWoFamilyFlag == "1" && woFamilyMainCardType == "1" && woFamilyBroadBandType == '1') )) {
        $(".oldUserInfo").trigger("click");
    }

    //获取验证码按钮
    $(".captcha").attr("disabled", true);
    $(".captcha").live("click", function () {
        if (!checkOldMobel()) {
            $("#oldPhone").trigger("blur");
            return false;
        }

        var count = 60;
        $(".captcha").css("color", "black").css("background", "#ccc").css("border", "1px solid #ccc").attr("disabled", true);
        $(".captcha").val("(" + count + "s)重新获取");
        time = setInterval(function () {
            if (count == 0) {
                count = 60;
                $(".captcha").css("color", "white").css("background", "#f36f2a").css("border", "1px solid #f36f2a").attr("disabled", false);
                $(".captcha").val("获取验证码");
                clearInterval(time);
            } else {
                count--;
                $(".captcha").val("(" + count + "s)重新获取");
            }
        }, 1000);

        $.ajax({
            url: '/mall-web/CheckMessage/captcha',
            type: 'POST',
            data: {
                phoneVal: $.trim($("#oldPhone").val()),
                type: '4'
            },
            success: function (data) {
            }
        });
    });
    $("#oldPhone").keyup(function () {
        var phoneval = $("#oldPhone").val();
        if ($(".captcha").attr("disabled") == true && $(".captcha").val() != "获取验证码") {
            return false;
        }
        if (checkMobiles(phoneval)) {
            $(".captcha").css("color", "white").css("background", "#f36f2a")
                .css("border", "1px solid #f36f2a").attr("disabled", false);
        } else {
            $(".captcha").css("color", "black").css("background", "#ccc").
                css("border", "1px solid #ccc").attr("disabled", true);
        }
    });


    $(".oldPhoneResultOne").click(function () {
        $(".thickdiv").hide();
        $(".oldPhoneResult").hide();
        $("#newUserInfo").show();
        $(".newOldChange").show();
        netWorkType = "new";
        $("#oldUserInfo").hide();
        $(".divTwo").hide();
        $(".userInformation .infoTap .bgA").animate({
            left: 0
        }, 300);
        $(".newUserInfo span").css("color", "white");
        $(".oldUserInfo span").css("color", "black");
        checkOrderInputInfo();
        if (isConfirmedNetWork == "true") {
            $("#invoiceTitle").text($(".inforname").text());
        } else {
            $("#invoiceTitle").text("默认为机主姓名");
        }

    });

    $(".oldPhoneResultTwo").click(function () {
//        $(".thickdiv").hide();
        $(".divTwo").show().center();
        $(".oldPhoneResult").hide();
    });

    $(".oldPhoneResultClose").click(function () {
        $(".thickdiv").hide();
        $(".oldPhoneResult").hide();
    });


    /**
     *  电子协议相关
     *
     */


    /*协议开始*/
    $("#agree25").hide();
    $(".agree25").click(function () {
        $(".thickdiv").show().height($("body").outerHeight());
        $("#agree25").show().center();
    });

    $(".agree25Close").click(function () {
        $("#agree25").hide();
        $(".thickdiv").hide();
    });
    $("#agree25Close").click(function () {
        $("#agree25").hide();
        $(".thickdiv").hide();
    });


    $(".agree_main").hide();


    //电子协议展示
    $("#orderSubmitNewBtn[class=hasChecked]").live("click", function () {
      if ("true"==isChargeApple) {
       prepareSubmitParams();
       $("#orderSubmitForm").submit();
       return;
     }
        if (isNeedReloadPro == 'false') {
            $(".thickdiv").show().height($("body").outerHeight());
            $(".agree_main").center().show();
            return;
        }

        //冰激凌团购多号码多证件处理
        if(isGroupCardFlag == "1"){
            initMultiProtocol();
            return;
        }


        $(".thickdiv").show().height($("body").outerHeight());
        // 准备订单填写页出现的电子协议数据
        protocolParam.custTag = _custTag;
        if (netWorkType == "old") {
            protocolParam.custName = $.trim($(".oldNameShow").text()).replace(/▪/g, "·").replace(/•/g, "·").replace(/●/g, "·")
                .replace(/·/g, "·").replace(/\./g, "·").replace(/。/g, "·")
                .replace(/`/g, "·").replace(/,/g, "·").replace(/，/g, "·")
                .replace(/？/g, "·").replace(/\?/g, "·");
            protocolParam.psptTypeCode = $.trim($(".oldIdShow").text());
            protocolParam.custAddress = "";
        } else {
            protocolParam.custName = $.trim($("#userName").val()).replace(/▪/g, "·").replace(/•/g, "·").replace(/●/g, "·")
                .replace(/·/g, "·").replace(/\./g, "·").replace(/。/g, "·")
                .replace(/`/g, "·").replace(/,/g, "·").replace(/，/g, "·")
                .replace(/？/g, "·").replace(/\?/g, "·");
            protocolParam.psptTypeCode = $.trim($("#identify").val());
            protocolParam.custAddress = $("#idCardCity").val();
        }


        //protocolParam.psptType = $.trim($("#psptTypeCode option:selected").html());
        //证件类型
        protocolParam.psptType = '身份证';
        protocolParam.fstfeetype = $("#monthFeeArea .redSelectAction").text();
        protocolParam.cardtype = '';
        $(".thickdiv").css("height", $("body").height());
        $(".thickdiv").show();
        $(".loadingText").text("请稍候......");
        $(".loadingStyle").show().center();
        $.ajax({
            type: "post",
            url: queryNetProtocol,
            data: protocolParam,
            success: function (ret) {
                //isQueryProtocol = false;
                $(".loadingStyle").hide();
                $(".agree_main").html(ret).center().show();
                isNeedReloadPro = 'false';
            }
        });
    });


    $(".close").live("click", function () {
        $(".thickdiv").hide();
        $(".agree_main").hide();
    });

    //$(".confirm").live("click", function () {
    //    $(".thickdiv").hide();
    //    $(".agree_main").hide();
    //
    //});

    $(".change-agree .next").live("click", function () {
        var $cur = $(".cur-agree"), curNum = parseInt($cur.attr("data-cur-num")), nums = parseInt($cur.attr("data-nums"));
        var $textCon = $(".middle .textCon1");
        if (curNum >= nums) {
            return;
        }

        $(this).removeClass("next-no");
        $(".pre").removeClass("pre-no");
        $cur.attr("data-cur-num", curNum + 1);
        $cur.find(".cur-num").text(curNum + 1);

        var multiProtocolDiv = $(".agree_main .middle");
        if(multiProtocolDiv.length>1){
            multiProtocolDiv.each(function(){
                $(this).find(".textCon1").eq(curNum - 1).fadeOut(100);
                $(this).find(".textCon1").eq(curNum).fadeIn(100);
            });

        }else{
            $textCon.eq(curNum - 1).fadeOut(100);
            $textCon.eq(curNum).fadeIn(100);
        }

        $cur.find(".agree-title").text($textCon.eq(curNum).find(".title").text());
        if (curNum >= nums - 1) {
            $(this).addClass("next-no");
            return;
        }

    });
    $(".change-agree .pre").live("click", function () {
        var $cur = $(".cur-agree"), curNum = parseInt($cur.attr("data-cur-num"));
        var $textCon = $(".middle .textCon1");
        if (curNum <= 1) {
            return;
        }

        $(this).removeClass("pre-no");
        $(".next").removeClass("next-no");
        $cur.attr("data-cur-num", curNum - 1);
        $cur.find(".cur-num").text(curNum - 1);

        var multiProtocolDiv = $(".agree_main .middle");
        if(multiProtocolDiv.length>1){
            multiProtocolDiv.each(function(){
                $(this).find(".textCon1").eq(curNum - 1).fadeOut(100);
                $(this).find(".textCon1").eq(curNum - 2).fadeIn(100);
            });

        }else{
            $textCon.eq(curNum - 1).fadeOut(100);
            $textCon.eq(curNum - 2).fadeIn(100);
        }

        $cur.find(".agree-title").text($textCon.eq(curNum - 2).find(".title").text());
        if (curNum <= 2) {
            $(this).addClass("pre-no");
            return;
        }
    });
    var fixedBtnTimestamp = new Date().getTime();
    var fixedBtnHide = false;
    var fixedBtnHideTime = 2000;
    var show;
    $(".middle").live("mousemove", function (e) {
        $(".change-agree").css("filter", "alpha(opacity=50)");
        var top = e.clientY - $(this).offset().top;
        if (top >= $(".middle").height() - $(".change-agree").height()) {
            fixedBtnTimestamp = new Date().getTime();
            fixedBtnHide = false;
            $(".change-agree").fadeIn(200);
            clearTimeout(show);
            return;
        }

        var timestamp = new Date().getTime();
        if (fixedBtnHide || (fixedBtnTimestamp + fixedBtnHideTime) < timestamp) {
            fixedBtnTimestamp = new Date().getTime();
            return;
        }
        fixedBtnHide = true;
        $(".change-agree").fadeOut(200);
        show = setTimeout(function () {
            fixedBtnHide = false;
            $(".change-agree").fadeIn(200);

        }, fixedBtnHideTime);

    });


    /*协议结束*/


    $("input").keydown(function () {
        $(this).css("color", "#000");
    });


    $(".divTwo").hide();
    $(".divOneA").click(function () {
        $(".thickdiv").show().height($("body").outerHeight());
        $(".divTwo").show().center();
    });

    $(".divTwoClose").click(function () {
        $(".thickdiv").hide();
        $(".divTwo").hide();
        initCheckBox();
    });

    //去验证
    $(".divTwoBtn").click(function () {
        if (!checkOldMobel()) {
            $("#oldPhone").trigger("blur");
            return false;
        } else if (!checkOldCaptcha()) {
            $("#oldCaptcha").trigger("blur");
            return false;
        }
        isConfirmedOldNetWork = "false";
        $(".thickdiv").css("z-index", "10000002");
        $(".thickdiv").show();
        $(".loadingText").text("请稍候......");
        $(".loadingStyle").show().center()
        $.ajax({
            url: '/mall-web/RealNameCheck/check',
            type: 'POST',
            data: {
                phoneVal: $("#oldPhone").val(),
                captcha: $("#oldCaptcha").val(),
                bizType: 'normal',
                goodsId: goodsId
            },
            success: function (data) {
                if (data.RespCode == "0000") {
                    checkCustInfo();
                    $(".oldNumShow").text(data.realNameInfo.phone);
                    $(".oldNameShow").text(data.realNameInfo.hostName);
                    $(".oldIdShow").text(data.realNameInfo.idCard);
                    $("#oldUserInfoFin").show();
                    $(".thickdiv").hide();
                    $(".divTwo").hide();
                    $(".divOne").hide();
                    isConfirmedOldNetWork = "true";
                    formInfo.oldNetWorkNum = $("#oldPhone").val();
                    $("#invoiceTitle").text(data.realNameInfo.hostName);
                    initCheckBox();
                    //选中快捷认证对应收货地址
                    initCheckedAddress(data.realNameInfo.hostName);
                } else if (data.RespCode == "0001") {
                    $(".thickdiv").show().height($("body").outerHeight());
                    $(". poldPhoneResult").text(data.RespMsg);
                    $(".oldPhoneResult").show().center();
                    $(".divTwo").hide();
                    $("#oldUserInfoFin").hide();
                    $(".divOne").show();
                    initCheckBox();
                } else if (data.RespCode == "0002") {
                    $(".captcha").siblings(".error").text("验证码错误，请重新输入").show();
                    isConfirmedOldNetWork = "true";//验证码错误暂时不认为认证失败
                } else if(data.RespCode == "0304") {
                    //1证件5户校验
                    $(".thickdiv").show().height($("body").outerHeight());
                    $(".oldPhoneResult").find("p").text(data.RespMsg);
                    $(".oldPhoneResult").show().center();
                    $(".divTwo").hide();
                    $("#oldUserInfoFin").hide();
                    $(".divOne").show();
                    initCheckBox();
                }
                checkOrderInputInfo();
                $(".loadingStyle").hide();
                $(".thickdiv").css("z-index", "10000001");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $(".thickdiv").show().height($("body").outerHeight());
                $(".oldPhoneResult p").text("系统繁忙！");
                $(".oldPhoneResult").show().center();
                $(".divTwo").hide();
                $("#oldUserInfoFin").hide();
                $(".divOne").show();
                initCheckBox();
                checkOrderInputInfo();
                $(".loadingStyle").hide();
                $(".thickdiv").css("z-index", "10000001");
            }
        });

    });

    //使用其他老号码验证
    $("#useNewNum").click(function () {
        $(".thickdiv").show().height($("body").outerHeight());
        $(".divTwo").show().center();
    });


    $(".phoneModelKind li").live("mouseover", function () {
        $(this).addClass("redSelect");
        $(this).siblings().removeClass("redSelect");
    });
    $(".phoneModelKind li").live("mouseleave", function () {
        $(this).removeClass("redSelect");

    });
    $(".phoneModelKind li").live("click", function () {
        $(this).addClass("redSelectAction");
        $(this).siblings().removeClass("redSelectAction");
        var modelType = $(this).attr("code");
        if (orderInputModel_new.MODEL_MAP[modelType].nomal_model == "") {
            $("#normalCardType").text("").hide();
            $("#normalCard").hide();
        } else {
            $("#normalCardType").text(orderInputModel_new.MODEL_MAP[modelType].nomal_model).show();
            $("#normalCard").show();
        }
        if (orderInputModel_new.MODEL_MAP[modelType].micro_model == "") {
            $("#microCardType").text("").hide();
            $("#microCard").hide();
        } else {
            $("#microCardType").text(orderInputModel_new.MODEL_MAP[modelType].micro_model).show();
            $("#microCard").show();
        }
        if (orderInputModel_new.MODEL_MAP[modelType].nano_model == "") {
            $("#nanoCardType").text("").hide();
            $("#nanoCard").hide();
        } else {
            $("#nanoCardType").text(orderInputModel_new.MODEL_MAP[modelType].nano_model).show();
            $("#nanoCard").show();
        }
        reHeight(".MKDp p");
        $(".simKindDiv").find("li:visible").eq(0).trigger("click");
    });


    $(".modelKind").hide();


    $(".model").click(function () {

        var count3 = 0;
        $(".simKind li").each(function (index) {
            var $elment = $(this);
            if ($elment.hasClass("redSelectAction")) {
                count3 = index;
            }
        });
        $(".thickdiv").show().height($("body").outerHeight());
        $(".modelKind").show().center();
        $(".simKind2 li").eq(count3).addClass("redSelectAction").siblings().removeClass("redSelectAction");
        $(".MKDp p").eq(count3).addClass("redSelectAction").siblings().removeClass("redSelectAction");
        $(".modelKindBtn").show();
        $(".modelClose").hide();
        $(".phoneModelKind li").eq(0).trigger("click");

    });

    $(".modelKindBtn").click(function () {

        var count5 = 0;
        $(".simKind2 li").each(function (index) {
            var $elment = $(this);
            if ($elment.hasClass("redSelectAction")) {
                count5 = index;
            }
        });
        //判断首月月租是新用户还是老用户
        if (!($(".modelKind").hasClass("moreModel"))) {

            if ($(".modelKind").hasClass("modelKindOld")) {
                $(".simKind1 li").eq(count5).addClass("redSelectAction");
                $(".simKind1 li").eq(count5).siblings().removeClass("redSelectAction");
                $(".modelKind").removeClass("modelKindOld")
            } else {
                $(".simKind li").eq(count5).addClass("redSelectAction");
                $(".simKind li").eq(count5).siblings().removeClass("redSelectAction");
            }

        }


        if ($(".moreModel").length == 1) {
            $(".modelKind").removeClass("moreModel");
        }
        if ($(".modelKindOld").length == 1) {
            $(".modelKind").removeClass("modelKindOld");
        }


        $(".thickdiv").hide();
        $(".modelKind").hide();
    });

    $(".modelKindClose").click(function () {
        $(".thickdiv").hide();
        if ($(".moreModel").length == 1) {
            $(".modelKind").removeClass("moreModel");
        }
        if ($(".modelKindOld").length == 1) {
            $(".modelKind").removeClass("modelKindOld");
        }

        $(".modelKind").hide();
    });

    //是否启用发票
    $(".fp-sel").click(function () {
        var index=$(".fp-sel").index($(this)[0]);
        $(this).addClass("sel").siblings().removeClass("sel");
        if(index==0){
            $(".fp-div").hide();
        }else{
            $(".fp-div").show();
        }
        checkOrderInputInfo();
    });
    
    // 确认发票信息
    $("#invoice").click(function () {
    	if ($("#invoice-section .error:visible").length > 0 || $("#invoice-section .correct:visible").length == 0){
    		return;
    	}
    	var invoiceInfo = $.trim($("#invoiceInfo").val());
    	if (invoiceInfo == "") {
    		$("#invoice-section .correct").hide();
    		$("#invoice-section .error").hide();
    		$("#invoiceInfoErrorId").text("手机号码或电子邮件至少填写一个！").show();
    		return;
    	}
        var invoiceNum = "";
        if(/^(\d{11})$/.test(invoiceInfo)){
            invoiceNum = invoiceInfo;
        }
    	if (invoiceNum != "") {
    		$.ajax({
    			type: "post",
    			url: '/mall-web/OrderInputAjax/isUnicomNum',
    			data: {number: invoiceNum},
    			dataType: "json",
    			async: false,
    			success: function (data) {
    				var isUnicomNum = data.isUnicomNum;
    				if (isUnicomNum == "false") {
                        $("#invoiceInfoCorrectId").hide();
    					$("#invoiceInfoErrorId").text("请输入联通手机号码或电子邮件用于接收电子发票信息。").show();
    					return;
    				} 
    				$("#invoice-sure").hide();
    		        $("#invoice-section .input-area").hide();
    		        $("#invoiceInfoEdit p").text(invoiceNum == ""?"无":invoiceNum);
    		        $("#invoice-section .edit-area").show();
    		        checkOrderInputInfo();
    		        return;
    			},
    			error:function (data) {
                    $("#invoiceInfoCorrectId").hide();
					$("#invoiceInfoErrorId").text("请输入联通手机号码或电子邮件用于接收电子发票信息。").show();
					return;
    			}
    		});
    		return;
    	}
        $("#invoice-sure").hide();
        $("#invoice-section .input-area").hide();
        $("#invoiceInfoEdit p").text(invoiceInfo == ""?"无":invoiceInfo);
        $("#invoice-section .edit-area").show();
        checkOrderInputInfo();
    });
    // 编辑发票信息
    $("#invoice-section .edit-area a").click(function () {
        $("#invoice-sure").show();
        $("#invoice-section .input-area").show();
        $("#invoice-section .edit-area").hide();
        checkOrderInputInfo();
    });
    
});


//计算手机信号高度，取最大值。
function reHeight(id) {
    var MKDpHeight = [];
    var $MKDp = $(id);

    $MKDp.each(function (index) {
        $(this).css("height", "auto");
        MKDpHeight[index] = $(this).height();
    });
    var reheight = Math.max.apply(null, MKDpHeight);
    $MKDp.css("height", reheight + "px");

};

/**
 * 订单提交参数准备
 */
function prepareSubmitParams() {
	
    prepareNetInfoParams();
    prepareDeliverParams();
    prepareContactInfoParams();
    PrepareWWoHomeAddressParams();
    preparePaymentParams();
    prepareSettlementParams();
    prepareAddActParams();
    prepareBaseParams();

};

//校验入网信息

function checkNetInfo() {
    if (isNotNeedNetworkData == "true" || (isMainSubFlag == '1' && mainCardType != '1') || (isWoFamilyFlag == '1' && woFamilyMainCardType != '1') || (isWoFamilyFlag == '1' && woFamilyMainCardType == '1' && woFamilyBroadBandType != '1')) {
        isConfirmedNetWork = "true";
        return true;
    }
    if ((isConfirmedNetWork != "true" && netWorkType == "new") || (isConfirmedOldNetWork != "true" && netWorkType == "old")) {
        return false;
    }
    return true;
}

//校验证件照片
function checkCertPhoto() {
    if (isNotNeedNetworkData == "true" || CertPhotoConfirmedFlag || realNameType == "2" || netWorkType == "old" || isNotNeedPhoto == "true") {
        return true;
    }
    if ((isMainSubFlag == '1' && mainCardType != '1') || (isWoFamilyFlag == '1' && woFamilyMainCardType != '1') || (isWoFamilyFlag == '1' && woFamilyMainCardType == '1' && woFamilyBroadBandType != '1')) {
        return false;
    }
    if (!$(".upload-after").hasClass("uploadBtnLink-clicked") && ($("#uploadTokenUuid").val() == "" || $("#uploadTokenUuid").val() == null) && merchantProvice != '89') {
        return false;
    }
    return true;
}


//校验送货信息
function checkDeliver() {
    //选择快递
    if ($("#kuaidi").is(":visible")) {
        if ($(".userInfo .redSelectAction1").length != 1 || $("#orderCartComLi .redSelectAction").length != 1 || $("#distributionDayList .redSelectAction").length != 1) {
            return false;
        }
        return true;
    } else { //选择自提
        if ($("#zitiBtn").is(":hidden")) {
            return false;
        }
        //自提信息错误
        if (!checkContactName() || !checkContactMobel() || !checkZitiAddress()) {
            return false;
        }
        return true;
    }
};

function checkPaymentInfo() {
    //秒杀提示
    if ($(".payInformation li.choice").attr("valueof") == "01") {
        $("#releaseTime").show();
    } else {
        $("#releaseTime").hide();
    }
    if (!checkOderMessage()) {
        return false;
    }
    if (!checkInvoice()) {
        Message.showFailMsgDef("对不起，请先确认发票抬头是否正确，谢谢您的配合!");
        return false;
    }
    
    //是否满足支持分期付款的要求
    if (!checkBankTermLimitPrice()) {
        return false;
    }
    return true;

};

function checkSettlementInfo() {
    if (!checkRecommended() || !checkRecommendCode()) {
        return false;
    }
    return true;
};

//校验联系信息
function checkContactInfo() {
    if (!isContactInfoConfirm() || !checkContactInfoName() || !checkContactInfoMobel()) {
        return false;
    }
    return true;
}

//校验电子发票联系信息
function checkInvoiceInfo() {
	return supportEleInvoiceFalg == "false" || $("#noNeedInvoiceId").hasClass("sel") || ($("#needInvoiceId").hasClass("sel") && $("#invoiceInfoEdit").is(":visible"));
}

function isContactInfoConfirm() {
    return $("#arrConInfo").is(":visible");
}

function isInstallInfoConfirm() {
    if (isNotNeedPostAddr != "true" && isNewBroadBand == "true") {
        return true;
    } else {
        return $("#arrInstallInfo").is(":visible");
    }
}


function prepareNetInfoParams() {
    var cardInfoData = {};// 手机卡类型信息数据
    var firstMonFeeData = {};// 套餐生效时间信息数据
    formInfo.netWorkType = netWorkType;
    if (netWorkType == "new") {
        formInfo.networkData = networkData;
        formInfo.networkDataList = networkDataList;
    } else {
        formInfo.networkData = {};
        formInfo.networkDataList = [];
    }
    //准备套餐生效时间
    if (cardInfoFlag != "0" && cardInfoFlag != "3") {
        var effectTime = $("#monthFeeArea").find(".redSelectAction").attr("monthFee");
        firstMonFeeData.firstMonthFee = effectTime;
        formInfo.firstMonFeeData = firstMonFeeData;
    }
    //准备卡类型
    if (cardInfoFlag != "1" && cardInfoFlag != "3") {
        if (productId == '89014704') {
            var str = '';
            $('.simKinds li').each(function () {
                var _this = $(this);
                if (str == '') {
                    str = _this.find('option:selected').val();
                } else {
                    str = str + '^' + _this.find('option:selected').val();
                }
            });
            cardInfoData.cardInfo = str;
            formInfo.woxCardInfoData = cardInfoData;
        } else if (isMainSubFlag == '1' || isWoFamilyFlag == '1') {//主副卡，卡信息 新带新：以 主^副^副^副 形式    老：以 副^副^副 形式
            var str = '';
            $('.simKinds li').each(function () {
                var _this = $(this);
                if (str == '') {
                    str = _this.find('option:selected').val();
                } else {
                    str = str + '^' + _this.find('option:selected').val();
                }
            });
            cardInfoData.cardInfo = str;
            formInfo.hostAssistantCardInfoData = cardInfoData;

        }
        else {
            var cardType = $(".simKind").find(".redSelectAction");
            cardInfoData.cardInfo = cardType.attr("cardType");
            formInfo.cardInfoData = cardInfoData;
        }
    }


};
function preparePaymentParams() {
    // 发票信息
    var invoiceInfo = $.trim($("#invoiceTitle").text());
    billingInfoData.invoiceTitle = invoiceInfo == "请输入个人或单位名称" ? "" : invoiceInfo;// 发票抬头
    billingInfoData.invoiceContent = $.trim($("#fpCont").val());// 发票内容
    // 留言
    var oder_bz = $.trim($("#oderMessage").val());
    billingInfoData.orderRemarks = oder_bz == '限100个字，请勿填写支付、收货相关的信息' ? '' : oder_bz;
    // 电子发票信息
    if ($("#needInvoiceId").hasClass("sel") && $("#invoiceInfoEdit").is(":visible")) {
        var invoiceInfo = $.trim($("#invoiceInfoEdit p").text());
        var invoiceNum = "";
        var invoiceEmail = "";
        if(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(invoiceInfo)){
            invoiceEmail = invoiceInfo;
        }else if(/^(\d{11})$/.test(invoiceInfo)){
            invoiceNum = invoiceInfo;
        }
    	billingInfoData.invoiceNum = (invoiceNum == "无"?"":invoiceNum);
    	billingInfoData.invoiceEmail = (invoiceEmail == "无"?"":invoiceEmail);
    }
    //支付方式
    payMentParams();
};


/**
 * 基础参数准备
 */
function prepareBaseParams() {
    var cityCookieCode = $.cookie("mallcity");
    var area = cityCookieCode.split('|');
    formInfo.province = area[0];
    formInfo.city = area[1];
    $("#paramStr").val(jQuery.toJSON(formInfo));
}


/**
 * 送货信息模块参数准备
 */
function prepareDeliverParams() {
    //收货信息
    var len = addressListData.length;
    for (var i = 0; i < len; i++) {
        if (addressListData[i].PostId == selectedPostId) {
            formInfo.postAddr = addressListData[i];
            break;
        }
    }

    // 配送信息
    if (isNotNeedPostAddr != 'true') {
        //自提
        if ($("#zitiBtn").is(":visible")) {
            deliveryData.dispachCode = $(".addressInformation ul .choice").attr("flag");
            deliveryData.deliveryCompanyCode = "";
            deliveryData.selfFetchCode = $(".addressSelectTab tr input:checked").val();
            deliveryData.dlvTypeCode = '';

            //自提收货人 和 联系电话
            var postAddr = {};
            var contactName = $.trim($("#ziti #ztConsignee").val());
            postAddr.ReceiverName = contactName == ' 2-20个汉字' ? '' : contactName;
            var contactMobile = $.trim($("#ziti #ztConsigneePhone").val());
            postAddr.MobilePhone = contactMobile == '请填写手机号码' ? '' : contactMobile;
            postAddr.ProvinceCode = $("#ziti #provinceId option:selected").val();
            postAddr.EssProvinceCode = $("#ziti #provinceId option:selected").attr("ess_province_code");
            postAddr.ProvinceName = $("#ziti #provinceId option:selected").text();
            postAddr.CityCode = $("#ziti #cityId option:selected").val();
            postAddr.EssCityCode = $("#ziti #cityId option:selected").attr("ess_city_code");
            postAddr.CityName = $("#ziti #cityId option:selected").text();
            postAddr.DistrictCode = $("#ziti #areaId option:selected").val();
            ;
            postAddr.DistrictName = $("#ziti #areaId option:selected").text();
            ;
            //自提类型
            postAddr.Selftype = $("#ziti #addressSelect .liChecked").find("input").attr("self_type")
            postAddr.PostAddr = $("#ziti #addressSelect .liChecked").find(".listTwo").text();
            formInfo.postAddr = postAddr;
        } else {
            deliveryData.dispachCode = $(".addressInformation ul .choice").attr("flag");
            deliveryData.dlvTypeCode = $("#distributionDayList .redSelectAction").attr("flag") + "";
            deliveryData.deliveryCompanyCode = $("#orderCartComLi .redSelectAction").attr("flag") + "";
            deliveryData.selfFetchCode = '';
            //指定日期配送特殊处理
            deliveryData.distributionTime = deliveryData.dlvTypeCode=="04"?$(".isSure").attr("y")+"-"+$(".isSure").attr("m")+"-"+$(".isSure").attr("d"):'';
            onlineActivateData.contactName = "";
            onlineActivateData.contactMobile = "";
            formInfo.onlineActivateData = onlineActivateData;
        }
    } else {
        deliveryData = {};
    }
    formInfo.delivery = deliveryData;

};

function prepareContactInfoParams() {
    if (isNotNeedPostAddr == 'true') {
        var contactName = $("#preConInfo #conName ").val();
        var contactMobile = $("#preConInfo #conPhone ").val();
        onlineActivateData.contactName = contactName == ' 2-20个汉字' ? '' : contactName;
        onlineActivateData.contactMobile = contactMobile == '请填写手机号码' ? '' : contactMobile;
        formInfo.onlineActivateData = onlineActivateData;
    }
}


function prepareSettlementParams() {

    //var oder_bz = $.trim($("#oderMessage").val());// 留言
    //billingInfoData.orderRemarks = oder_bz == '限100个字，请勿填写支付、收货相关的信息' ? '' : oder_bz;

    //代金券 编号
    billingInfoData.moneyCardNum = $.trim($("input[name='custVoucherRadio']:checked").attr("detailId"));
    // 推荐人姓名
    var referrerName = $.trim($("#recommend").val());
    billingInfoData.referrerName = referrerName == '请输入推荐人姓名' ? '' : referrerName;
    // 推荐人联系电话
    var referrerCode = $.trim($("#recommendCode").val());
    billingInfoData.referrerCode = referrerCode == '请输入11位手机号码' ? '' : referrerCode;
    formInfo.billingInfo = billingInfoData;

};

function prepareAddActParams() {
    var addActData = new Array();
    $(".chooseActivity input:checked").each(function (i) {
        var addAct = {};
        $addactInfo = $(this).parents("tr");
        addAct.ADDACT_ID = $(this).attr("addactid");
        addAct.ADDACT_NAME = $addactInfo.find(".addActName").text();
        addAct.ADDACT_DESC = $addactInfo.find(".addActDesc").text();
        addAct.ADDACT_PRICE = $addactInfo.find(".addActPrice").text();
        addAct.REMARK_TIPS = $addactInfo.next(".activityTips").attr("addActTips");
        addAct.REMARK = $addactInfo.next(".activityTips").find("input").val();
        addActData[i] = addAct;
    });
    if (addActData.length != 0) {
        formInfo.addActData = addActData;
    }
}

/**
 * 阅读协议后提交
 */
$("#confirmOrderSubmit").live("click", function () {
    //$(".thickdiv").hide();
    $(".agree_main").hide();
    if(presentId==undefined||presentId==null||presentId==""){
        var presentId="";
    }
    if (presentId.length > 0) {
        checkPresent();
    } else {
        prepareSubmitParams();
        $("#orderSubmitForm").submit();
    }
});

//=========赠品校验==========

function checkPresent() {
    $.ajax({
        type: "post",
        url: checkPresentAmount,
        data: {goodsId: GoodsId, merchantId: MERCHANT_ID, presentIds: '[' + presentId.join() + ']'},
        dataType: "json",
        async: false,
        success: function (ps) {
            var name = '', count = 0;
            for (var i = 0, len = ps.length; i < len; i++) {
                var p = ps[i];
                if (p && p['REMAIN_PRES'] < p['ORDER_PRESENT_NUM']) {
                    if (count > 0) {
                        name += '、';
                    }
                    name += p['PRESENT_NAME'];
                    ++count;
                }
            }
            if (name) {
                Message.showDialogMsg("提示", "很抱歉，赠品<span class=\"cOrange\">" + name + "</span>已赠完，您可以继续提交订单", "继 续", "取 消", function (confirm) {
                    if (confirm) {
                        prepareSubmitParams();
                        $("#orderSubmitForm").submit();
                    }
                });
            } else {
                prepareSubmitParams();
                $("#orderSubmitForm").submit();
            }
        }
    });


}


function checkOrderInputInfo() {
    if (checkNetInfo()) {
        $("#netNotice").hide();
    } else {
        $("#netNotice").show();
        $("#checkInfoNotice").show();
    }

    if (!checkCertPhoto()) {
        $("#certPhotoNotice").show();
        $("#checkInfoNotice").show();
    } else {
        $("#certPhotoNotice").hide();
    }

    //智慧沃家
    if (isNotNeedPostAddr == 'true' && isNewBroadBand == "true") {
        checkWoHomeInstallInfo();
    } else if (isNotNeedPostAddr == 'true' && isNewBroadBand != "true") {
        if (!checkContactInfo()) {
            $("#contactInfoNotice").show();
            $("#checkInfoNotice").show();
        } else {
            $("#contactInfoNotice").hide();
        }
    } else if (isNotNeedPostAddr != 'true' && isNewBroadBand == "true") {
        if (!checkDeliver()) {
            $("#deliverNotice").show();
            $("#checkInfoNotice").show();
        } else {
            $("#deliverNotice").hide();
        }
        checkWoHomeInstallInfo();
    } else if (isNotNeedPostAddr != 'true' && isNewBroadBand != "true") {
        if (!checkDeliver()) {
            $("#deliverNotice").show();
            $("#checkInfoNotice").show();
        } else {
            $("#deliverNotice").hide();
        }
    }


    if (!checkPaymentInfo()) {
        $("#paymentNotice").show();
        $("#checkInfoNotice").show();
    } else {
        $("#paymentNotice").hide();
    }

    if (!checkSettlementInfo()) {
        $("#billingNotice").show();
        $("#checkInfoNotice").show();
    } else {
        $("#billingNotice").hide()
    }
    
    if (!checkInvoiceInfo()) {
        $("#invoiceNotice").show();
        $("#checkInfoNotice").show();
    } else {
        $("#invoiceNotice").hide()
    }

    if ($("#checkInfoNotice a:visible").length == 0) {
        $("#orderSubmitNewBtn").removeClass("unChecked").addClass("hasChecked");
        $("#orderSubmitNewBtn").removeAttr('disabled');
        $("#checkInfoNotice").hide();
    } else {
        $("#orderSubmitNewBtn").removeClass("hasChecked").addClass("unChecked");
        $("#orderSubmitNewBtn").attr('disabled', 'disabled');
        $("#checkInfoNotice").show();
    }

}

//初始化老用户校验弹窗
function initCheckBox() {
    $("#oldPhone").val("");
    $("#oldPhone").siblings(".correct").hide();
    $("#oldPhone").siblings(".error").hide();
    $("#oldCaptcha").val("");
    $("#oldCaptcha").siblings(".error").hide();
    $(".captcha").css("color", "black").css("background", "#ccc").css("border", "1px solid #ccc").attr("disabled", true);
    $(".captcha").val("获取验证码");
    clearInterval(time);
}
function checkWoHomeInstallInfo() {
    if (!isInstallInfoConfirm() || !checkInstallInfoEasy()) {
        $("#broAddInformationNotice").show();
        $("#checkInfoNotice").show();
    } else {
        $("#broAddInformationNotice").hide();
    }
}

//智慧沃家 地址
function checkInstallInfoEasy() {
    if (!checkInstallNameEasy() || !checkInstallPhoneEasy()) {
        return false;
    }
    return true;
}
function checkInstallInfo() {
    if (!checkInstallName() || !checkInstallPhone()) {
        return false;
    }
    return true;
}

function PrepareWWoHomeAddressParams() {
    var WWoHomeAddressData = {};
    if (isNewBroadBand == "true") {
        if (isNotNeedPostAddr == "true") {
            WWoHomeAddressData.contactName = $("#installName").val();
            WWoHomeAddressData.contactMobile = $("#installPhone").val();
            formInfo.onlineActivateData = WWoHomeAddressData;
        }
    }
}

function checkInvoiceNumOrEmail(){
    $("#invoiceInfoErrorId").hide();
    $("#invoiceInfoCorrectId").hide();
    var invoiceInfo = $.trim($("#invoiceInfo").val());
    if (invoiceInfo == ""){
        return;
    }
    var sentiveInfo = $.trim(stringHelper.checkScript(invoiceInfo));
    if (sentiveInfo != null && sentiveInfo != "") {
        $("#invoiceInfoErrorId").show().html("包含“" + sentiveInfo + "”非法字符。");
        $("#invoiceInfoCorrectId").hide();
        return;
    }
    if(/^(\d{11})$/.test(invoiceInfo) || /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(invoiceInfo)){
        $("#invoiceInfoCorrectId").show();
    }else{
        if(/^([0-9]*)$/.test(invoiceInfo)){
            $("#invoiceInfoErrorId").text("手机号码至少为11位数字！").show();
        }else{
            $("#invoiceInfoErrorId").text("邮箱格式不正确！").show();
        }
    }
}


/**选择时间控件开始**/
//获取选择的时间
$("#laydate_table").find("td[AClass='AClass']").live("click",function () {
   var $_this=$(this);
   var isState=$_this.hasClass("laydate_void");
   if(!isState){
       $_this.addClass("laydate_click isSure").siblings().removeClass("laydate_click isSure");
       $_this.parent().siblings().find("td[AClass='AClass']").removeClass("laydate_click isSure");
       var y=$(".isSure").attr("y");
       var m=$(".isSure").attr("m");
       var d=$(".isSure").attr("d");
       selTimesSucc=m+"月"+d+"日之后";
       $(".selTimeDescErr").hide();
       $(".selTimeDesc").show();
       selTimes="将在您指定日期（"+y+"年"+m+"月"+d+"日）后尽快发货，如选择“指定日期配送”则仅支持在线支付。";
       $(".selTimeDesc").text(selTimes);
   }
});

//关闭选择日期弹框
$(".selTimesClose").live("click", function () {
   $("#laydate_box").hide();
   $(".thickdiv").hide();
   $(".distributionDay").find("li").eq(3).addClass("isSureTime");
})
//选择日期确认
    $(".selTimeBtn").find("button").live("click", function () {
        var end = new Date();
        var tom1=new Date();
        var finTime;
        tom1.setDate((new Date(tom1).getDate())+3);
        var todayY=tom1.getFullYear();
        var todayM=tom1.getMonth()+1;
        var todayD=tom1.getDate();

        end.setMonth(end.getMonth()+1,1);
        var endDayY = end.getFullYear();
        var endDayM = end.getMonth()+1;
        var endDayD = new Date(endDayY,endDayM,0).getDate();

        var y=parseInt($("#laydate_table").find(".laydate_click").attr("y"));
        var m=parseInt($("#laydate_table").find(".laydate_click").attr("m"));
        var d=parseInt($("#laydate_table").find(".laydate_click").attr("d"));

        //判断选择是否明日之前的时间，若是，则默认选择明日时间
        if(((y>todayY)||(y==todayY&&m>todayM)||(y==todayY&&m==todayM&&d>=todayD))&&((y<endDayY)||(y==endDayY&&m<endDayM)||(y==endDayY&&m==endDayM&&d<=endDayD))){
            selTimesSucc=m+"月"+d+"日之后";
            finTime=selTimesSucc+"<i></i>";
            //$(".distributionDay").find("li").eq(3).addClass("isSureTime");
            $("#laydate_table").find(".laydate_click").addClass("isSure");
            $("#laydate_box").hide();
            $(".thickdiv").hide();
            $(".distributionDay").find("li").eq(3).html(finTime).addClass("redSelectAction isSureTime").siblings().removeClass("redSelectAction");
        }else{
            selTimesSucc=todayM+"月"+todayD+"日之后";
            finTime=selTimesSucc+"<i></i>";
            $(".distributionDay").find("li").eq(3).removeClass("isSureTime");
            $(".selTimeDescErr").show();
            $(".selTimeDesc").hide(); 
        }
        $("#payMent01").click();
        $(".payment ").hide();
        $("#payMent01").show();
    });
    
    function bindFun(obj) {
        obj.live("click", function () {
            var y=$("td.laydate_click").attr("y");
            var m=$("td.laydate_click").attr("m");
            var d=$("td.laydate_click").attr("d");
            selTimesSucc=m+"月"+d+"日之后";
            selTimes="将在您指定日期（"+y+"年"+m+"月"+d+"日）后尽快发货，如选择“指定日期配送”则仅支持在线支付。";
            $(".selTimeDesc").text(selTimes);

        })
    }



















