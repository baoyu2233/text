/**
 * Created by Genep on 15-10-26.
 */
var paymentData = {};
$(function () {
    // 显示支付方式
    initPayType();
})
 function initPayType(){
     $("#payMentEdit .payInformation li").eq(0).addClass("choice").siblings("li").removeClass("choice");
     var $payTypeDom = $("#payMentEdit .payInformation .choice");
     // 支付方式
     //paymentData.payTypeCode = payTypeDom.attr("valueof");
     paymentData.payWayCode = "";
     paymentData.payTypeCode = $payTypeDom.attr("valueof");
     paymentData.payWayCode = $(".payWayItem" + paymentData.payTypeCode + ".redSelectAction").attr("valueof");
     paymentData.payWayCode = paymentData.payWayCode == null ? '' : paymentData.payWayCode;
     formInfo.payment = paymentData;

     $(".payment[payTypeName=货到付款]").hide();
     $("#unOnline").hide();
     if($("#payMentEdit div:eq(0) li:visible").length != 0){
         $("#payMentEdit div:eq(0) li:visible")[0].click();
     }

 }

// 支付方式
// 在线支付点击事件
$(".online").live("click",function () {
    $("#online").show();
    $("#unOnline, #unOnlineB, #unOnlineC").hide();

    $(".payInformation .infoTap .bgA").animate({
        left: 0
    }, 300, function () {
        $(".online span").css("color", "white");
        $(".installmentGoodSet span, .cmbInstallment span, .unOnline span").css("color", "black");
    });

    payWayChoose($(this));
});

// 货到付款点击事件
$(".unOnline").live("click",function () {
    $("#unOnline").show();
    $("#online, #unOnlineB, #unOnlineC").hide();

    if($("li[paytypename='在线支付']").is(":hidden") || $("li[paytypename='在线支付']").length == 0){
        $(".payInformation .infoTap .bgA").animate({
            left: 0
        }, 300, function() {
            $(".unOnline span").css("color", "white");
            $(".online span, .installmentGoodSet span, .cmbInstallment span").css("color", "black");
        });
    }else {
        $(".payInformation .infoTap .bgA").animate({
            left: 130
        }, 300, function() {
            $(".unOnline span").css("color", "white");
            $(".online span, .installmentGoodSet span, .cmbInstallment span").css("color", "black");

        });
    }

    $("#payMentModeRadio").attr("checked", false);
    payWayChoose($(this));
});

// 招联零零花分期付款点击事件
$(".cmbInstallment").live("click", function () {
    $("#unOnlineC").show();
    $("#online, #unOnlineB, #unOnline").hide();

    $("#payMentModeRadio").attr("checked", true);
    if(($("li[paytypename='在线支付']").is(":hidden") || $("li[paytypename='在线支付']").length == 0) && ($("li[paytypename='货到付款']").is(":hidden") || $("li[paytypename='货到付款']").length == 0)){
        $(".payInformation .infoTap .bgA").animate({
            left: 0
        }, 300, changeCmbColor);
    }else if(($("li[paytypename='在线支付']").is(":hidden") || $("li[paytypename='在线支付']").length == 0) || ($("li[paytypename='货到付款']").is(":hidden") || $("li[paytypename='货到付款']").length == 0)) {
        $(".payInformation .infoTap .bgA").animate({
            left: 130
        }, 300, changeCmbColor);
    } else {
        $(".payInformation .infoTap .bgA").animate({
            left: 260
        }, 300, changeCmbColor);
    }

    var price = parseFloat($("#billingResult").text());
    // 重置每期金额
    $(".unOnlineC .payMentInstallTerm span[name='payMentAlloted']").each(function (i) {
        var term = $(this).attr("data-bank-term");
        var perTerm = parseFloat(price / term).toFixed(2);
        $(this).html( term + "期<i></i> ");
        $(this).next().html("每期￥" + perTerm + "，手续费￥0.00 ");
    });

    paymentData.payInstalmentBankCode = 'WOYFIOU';
    $(".payMentInstallTerm").hide();
    var $payBankItem = $(".payWayItem_01_02_" + paymentData.payInstalmentBankCode);
    var $termHasChoiced = $payBankItem.find("span").hasClass("redSelectAction");
    if($termHasChoiced) {
        $payBankItem.show();
    } else {
        $payBankItem.show();
        $(".creditCardDetail span[name='payMentAlloted']").removeClass("redSelectAction");
        $payBankItem.eq(0).find("span").addClass("redSelectAction");
    }

});

function changeCmbColor() {
    $(".cmbInstallment span").css("color", "white");
    $(".online span, .unOnline span, .installmentGoodSet span").css("color", "black");
}

function changeInstallColor() {
    $(".installmentGoodSet span").css("color", "white");
    $(".online span, .unOnline span, .cmbInstallment span").css("color", "black");
}

// 银行卡分期付款点击事件
$(".installmentGoodSet").live("click", function () {

    $("#unOnlineB").show();
    $("#online, #unOnlineC, #unOnline").hide();

    $("#payMentModeRadio").attr("checked", true);

    var isCmbExists = $(".payment[payTypeName='招联零零花分期']").length > 0, leftInstallment = 0;

    if(($("li[paytypename='在线支付']").is(":hidden") || $("li[paytypename='在线支付']").length == 0) && ($("li[paytypename='货到付款']").is(":hidden") || $("li[paytypename='货到付款']").length == 0)){
        leftInstallment = isCmbExists ? 130 : 0;
        $(".payInformation .infoTap .bgA").animate({
            left: leftInstallment
        }, 300, changeInstallColor);
    }else if(($("li[paytypename='在线支付']").is(":hidden") || $("li[paytypename='在线支付']").length == 0) || ($("li[paytypename='货到付款']").is(":hidden") || $("li[paytypename='货到付款']").length == 0)) {
        leftInstallment = isCmbExists ? 260 : 130;
        $(".payInformation .infoTap .bgA").animate({
            left: leftInstallment
        }, 300, changeInstallColor);
    } else {
        leftInstallment = isCmbExists ? 390 : 260;
        $(".payInformation .infoTap .bgA").animate({
            left: leftInstallment
        }, 300, changeInstallColor);
    }

    var price = parseFloat($("#billingResult").text());
    // 重置每期金额
    $(".unOnlineB .payMentInstallTerm span[name='payMentAlloted']").each(function (i) {
        var term = $(this).attr("data-bank-term");
        var perTerm = parseFloat(price / term).toFixed(2);
        $(this).html( term + "期<i></i> ");
        $(this).next().html("每期￥" + perTerm + "，手续费￥0.00 ");
    });
    changeBank();
});

function payWayChoose($this){
    if($this.attr("id")=="payMentInstall") {
        return;
    }
    showPayWayItem($this.attr("valueof"), null);
    $this.addClass("choice").siblings("li").removeClass("choice");
    if($this.attr("valueof")=='02'){
        $(".payWayItem02").eq(0).click();
    }
}

/**
 * 点击支付方式显示子项
 *
 * @param payTypeCode
 */
function showPayWayItem(payTypeCode, payWayCode) {
    $(".payMentInstallSub").hide();
    $(".payWayItem" + payTypeCode).show();
    $(".cashOnDeliveryModeNew").removeClass("redSelectAction");
  //秒杀提示
    if(payTypeCode=="01"){
        $("#releaseTime").show();
    }else{
        $("#releaseTime").hide();
    }
    var item = $(".payWayItem" + payTypeCode);
    if (item.size() > 0) {
        if (payWayCode == 'NULL') {
            $(item[0]).addClass("redSelectAction");
            return;
        }
        for (var i = 0; i < item.size(); i++) {
            if ($(item[i]).attr("valueof") == payWayCode) {
                $(item[i]).addClass("redSelectAction");
                return;
            }
        }
        $(item[0]).addClass("redSelectAction");
    }
}

/**
    收货地址是否支持货到付款
 */
function hasReceivePayCallBack(flag) {
    //$(".thickdiv").hide();
    $(".loadingStyle").hide();
    if (VIPTag == "1" && flag) {
        initAddress = false;
        supCod = true;
        $(".payment[payTypeName=在线支付]").hide();
        $("#online").hide();
        $(".payment[payTypeName=货到付款]").show();
        $("#payMentEdit .payment:visible").eq(0).click();
        return;
    } else {
        $(".payment[payTypeName=在线支付]").show();
    }

    if (flag && $(".payment[payTypeName=货到付款]").css("display") == "none") {
        initAddress = false;
        supCod = true;
        $(".payment[payTypeName=货到付款]").show();
        $("#payMentEdit .payment:visible").eq(0).click();
    } else if (!flag && $(".pay[payTypeName=货到付款]").css("display") != "none") {// 不支持货到付款将上一次选中值设为在线支付并隐藏货到付款
        supCod = false;
        $(".payment[payTypeName=货到付款]").hide();
        $(".unOnline").hide();
        $("#payMentEdit .payment:visible").eq(0).click();
        //if (!initAddress) {
        //    Message.showFailMsgDef("您修改了收货信息，请重新确认支付方式!");
        //}
        //initAddress = false;
        paymentData.payTypeCode = $("#payMentEdit .payInformation li:visible").eq(0).attr("valueof");
        paymentData.payWayCode = $(".payWayItem" + paymentData.payTypeCode).eq(0).attr("valueof");
        paymentData.payWayCode = paymentData.payWayCode == null ? '' : paymentData.payWayCode;
        formInfo.payment = paymentData;
    } else {
        $(".payWayItem02").hide();
        $("#unOnline").hide();
        $("#payMentEdit .choice").click();
    }

    //分期付款重置价格信息
    /*if ($("#payMentInstall").length) {
        $("#payMentInstall").click();
    }*/
}

//分期付款选择银行事件
$("#payMentEdit li[name='payMentBank']").live("click", function () {
    $(this).addClass("redSelectAction");
    $(this).siblings().find(".ccSelectAction").removeClass("redSelectAction");
    $(this).siblings(".creditCardDetail").show();
    $(this).parents("li").siblings().find(".creditCardDetail").hide();
    changeBank();
}).live("mouseover", function(){
    $(this).addClass("redSelect");
    $(this).parents("li").siblings().find(".ccSelectAction").removeClass("redSelect");
}).live("mouseleave", function(){
    $(this).removeClass("redSelect");
});

//还款期数点击事件
$(".creditCardDetail li span[name='payMentAlloted']").live("click", function () {
    $(this).addClass("redSelectAction");
    $(this).parent("li").siblings().find("span").removeClass("redSelectAction");
    //$(this).siblings(".creditCardDetail").show();
    //$(this).parents("li").siblings().find(".creditCardDetail").hide();
}).live("mouseover", function(){
    $(this).addClass("redSelect");
    $(this).parent("li").siblings().find(".ccSelectAction").removeClass("redSelect");
}).live("mouseleave", function(){
    $(this).removeClass("redSelect");
});

function changeBank() {
    paymentData.payInstalmentBankCode = $("#creditCard li[name='payMentBank'].redSelectAction").attr("valueof");
    $(".payMentInstallTerm").hide();
    //var $payBankItem = $(".payWayItem_01_02_" + paymentData.payInstalmentBankCode).parent("ul").siblings().filter(".redSelectAction").next().find(".payWayItem_01_02_" + paymentData.payInstalmentBankCode);
    var $payBankItem = $(".payWayItem_01_02_" + paymentData.payInstalmentBankCode);
    var $termHasChoiced = $payBankItem.find("span").hasClass("redSelectAction");
    if($termHasChoiced) {
        $payBankItem.show();
    } else {
        $payBankItem.show();
        $(".creditCardDetail span[name='payMentAlloted']").removeClass("redSelectAction");
        $payBankItem.eq(0).find("span").addClass("redSelectAction");
    }
}


/**
 * 重置分期付款分期信息
 *
 * @param price
 *            单位元
 */
function restBankTermPrice(price) {
    var $payMentInstall = $("#payMentInstall");
    if ($payMentInstall.length <= 0) {
        return;
    }
    if (!checkBankTermLimitPrice(price)) {
        return;
    }
    // 重置每期金额
    $(".payMentInstallTerm span[name='payMentAlloted']").each(function (i) {
        var term = $(this).attr("data-bank-term");
        var perTerm = parseFloat(price / term).toFixed(2);
        //$(this).html(term + "期<i></i></span>  每期￥" + perTerm + "，手续费￥0.00 ");
        $(this).html( term + "期<i></i> ");
        $(this).next().html("每期￥" + perTerm + "，手续费￥0.00 ");
    });
};

function checkBankTermLimitPrice(orderPrice) {
    var $payMentInstall = $("#payMentInstall");
    // 当前支付方式是分期付款，需要校验是否满足最低价格
    if (!$payMentInstall.hasClass("choice")) {
        return true;
    }
    var price = orderPrice || parseFloat($(".checkoutRight #billingResult").text());
    var $payMentBankChecked = $("#payMentEdit li[name='payMentBank'].redSelectAction");
    var $payMentAlloted = $(".payWayItem_01_02_" + $payMentBankChecked.attr("valueof") + " span[name='payMentAlloted'].redSelectAction");
    var dataLimitPrice = $payMentAlloted.attr("data-limit-price");
    if (parseFloat(dataLimitPrice / 1000) > parseFloat(price)) {
        Message.showFailMsgDef("对不起，您需支付的现金不满足分期付款的最低价格要求：" + parseFloat(dataLimitPrice / 1000) + "元，请重新选择支付方式。");
        //$(".payMentOpen").click();
        return false;
    }
    return true;
};

function payMentParams(){
    var $payMent = $("#payMentEdit .payInformation .payment.choice");
    paymentData.payTypeCode = $payMent.attr("valueof");

    // 分期付款配置信息
    if ("01" == paymentData.payTypeCode && "02" == $payMent.attr("data-pay-way")) {
        paymentData.payWayCode = $("input[name='payMentMode']:checked").val();
        var isCmbHidden = $(".installmentGoodSet").hasClass("choice");
        paymentData.payInstalmentBankCode = isCmbHidden ? $("#creditCard li[name='payMentBank'].redSelectAction").attr("valueof") : "WOYFIOU";
        paymentData.payInstalmentTerm = $(".creditCardDetail span[name='payMentAlloted'].redSelectAction").attr("valueof");
    } else {
        paymentData.payWayCode = $(".payWayItem" + paymentData.payTypeCode + ".redSelectAction").attr("valueof");
        paymentData.payInstalmentBankCode = "";
        paymentData.payInstalmentTerm = "";
    }
    paymentData.payWayCode = paymentData.payWayCode == null ? '' : paymentData.payWayCode;
    formInfo.payment = paymentData;
} 


