var isEmpty = function(cookieValue) {
    return typeof cookieValue === 'undefined' || cookieValue === 'undefined|undefined' || cookieValue === null
        || cookieValue === '' || cookieValue === '|';
};
function limitEndtime(){
    $(".limit").each(function(){
        var lxfday=$(this).attr("lxfday");//用来判断是否显示天数的变量
        var endtime = $(this).attr("endtime");//取结束日期(毫秒值)
        var nowtime = new Date().getTime();        //今天的日期(毫秒值)
        var youtime = endtime-nowtime;//还有多久(毫秒值)
        var seconds = youtime/1000;
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);
        var CDay= days ;
        var CHour= hours % 24;
        var CMinute= minutes % 60;
        var CSecond= Math.floor(seconds%60);//
        if(endtime<=nowtime){
            $(this).html("已过期")//如果结束日期小于当前日期就提示过期啦
        }else{
            if($(this).attr("lxfday")=="no"){
                $(this).html("<em>剩余</em><span>"+CMinute+"</span><em>分</em><span>"+CSecond+"</span><em>秒</em>");          //输出没有天数的数据
            }else{
                $(this).html("<em>剩余</em><span>"+CMinute+"</span><em>分</em><span>"+CSecond+"</span><em>秒</em>");          //输出有天数的数据
            }
        }
    });
    setTimeout("limitEndtime()",1000);
};
//**************************代金券**begin***************************
//当用户点击激活代金券按钮时
function tipsNumber(){
    var myNum=$("#myNumber");
    myNum.show().center().find(".content p").hide().filter(".defaultP").show();
    myNum.find(".successCon,.content").hide().filter(".content").show();
    myNum.find(".inputWidth183px").val("");
    $(".thickdiv").show().height($("body").outerHeight());
    $("#inputCode").val("");
    $(".numberDl .verifyError").hide();
}
function checkVoucherUseCondition(){
    var param = {};
    param.orderMoney = parseFloat($("#Price").text())+parseFloat($("#freight").text());
    var $payMent = $("#payMentEdit li.payment.choice");
    param.payType =  $payMent.attr("valueof");
    if("01" ==  param.payType && "02" == $payMent.attr("data-pay-way")){
        param.payWay = $("input[name='payMentMode']:checked").val();
    }else{
        param.payWay = $(".payWayItem" + param.payType + ".redSelectAction").attr("valueof");
    }
    function disableVoucher($this){
        $this.attr("checked","").attr("disabled","disabled");
        $this.parents("tr").removeClass("bgcoupon").addClass("bgcouponGray");
    }

    $("input:radio[name='custVoucherRadio']").each(function(){
        $(this).attr("disabled","");
        $(this).parents("tr").removeClass("bgcouponGray").addClass("bgcoupon");
        var  _thisMoneyLimit = parseFloat( $(this).attr("voucherMoneyLimit"));
        var isCanUse = $(this).attr("isCanUseVoucher");
        var isSupSelectGoods = $(this).attr("isSupSelectGoods");
        var isSupSelectMerchant = $(this).attr("isSupSelectMerchant");
        var isSupportDividePay = $(this).attr("isSupportDividePay");

        if(isCanUse == 'false' || isSupSelectGoods == 'false' || isSupSelectMerchant == 'false'){
            disableVoucher($(this));
            return true;
        }
        if(_thisMoneyLimit > param.orderMoney){
            disableVoucher($(this));
            return true;
        }
        if(param.payType == '01' &&  param.payWay == '02'){
            param.installLimitMoney = parseFloat($("input[name='payMentAlloted']:checked").attr("data-limit-price"))/1000;
            param.faceFee = parseFloat($(this).attr("voucherfacefee"));
            if( ( isSupportDividePay =='0' ) || (param.installLimitMoney > param.orderMoney-param.faceFee)){
                disableVoucher($(this));
            }
        }
    });
    if($("input:radio[name='custVoucherRadio']:checked").length == 0){
        $("#noUserVoucherTR td").click();
    }
    $("#voucherNoUseRemind").toggle($("input:radio[name='custVoucherRadio']:disabled").length != 0);
    voucherSort();
}
//代金券排序：可用的在上面，不可用的排在下面
function voucherSort(){
    var maxFaceMoneyValue = 0;
    $("#couponList .tBodyList table tr").each(function(){
        var _disabled = $(this).find("input:radio[name='custVoucherRadio']").attr("disabled");
        var faceMoneyValue = parseFloat($(this).find(".two").attr("faceMoney"));
        if(_disabled == true || _disabled == "disabled"){
            $("#noUserVoucherTR").before($(this));
        }else if(faceMoneyValue > maxFaceMoneyValue){
            maxFaceMoneyValue = faceMoneyValue;
            $(this).find("td").click();
        }
    });
}
//*************************代金券******end****************************

$(function() {
    if($(".limit").length > 0) {
        $(".limit").attr("endtime",new Date().getTime()+30*60*1000);
        limitEndtime();
    }

    // 入网资料点击不保存关闭
    $(".networkOpen").live('click', function() {
        $(this).text("【修改】");
        $(this).addClass("networkClose").removeClass("networkOpen");
        $("#networkInfo").show();

        $("#receiverName").val(formInfo.networkData.hostName);
        $("#idCard").val(formInfo.networkData.idCard);
        $("#idCardCity").val(formInfo.networkData.idCardAddress);

        //$(".network .correct").show();
        // 电子协议 : 入网资料点击保存不关闭的时候,隐藏确认协议的错误提示
        $("#protocol_error").hide();

        $(".network .error").hide();
        $("#networkEdit").hide();
        if (checkSubmit()) {
            $("#comfirmNetworkInfo").hide();
            $("#orderSubmit").removeClass("orderSubmitHery").addClass("orderSubmit");
        }
    });

    // 入网资料点击修改
    $(".networkClose").live('click', function() {
        $(this).text("【不保存关闭】");
        $(this).addClass("networkOpen").removeClass("networkClose");
        $("#networkInfo").hide();
        $("#networkEdit").show();
        $("#contactWayEdit").show();
        $("#contactWayInfo, #contactWayText").hide();
        $("#contactWayText").addClass("contactWayOpen").removeClass("contactWayClose");
        if (checkSubmit()) {
            $("#comfirmNetworkInfo").hide();
            $("#orderSubmit").removeClass("orderSubmitHery").addClass("orderSubmit");
        }
        //证件照片上传
        if($("#front").val()==""){
            $(".uploadPhotoBtn").show();
            $(".uploadIdShow").hide();
        }else{
            $(".uploadPhotoBtn").hide();
            $(".uploadIdShow").show();
        }
    });

    // 联系方式点击不保存关闭
    $(".contactWayOpen").live('click', function() {
        $(this).text("【修改】");
        $(this).addClass("contactWayClose").removeClass("contactWayOpen");
        $("#contactWayInfo").show();

        $("#contactName").val(activateMethod.contactName);
        $("#contactMobile").val(activateMethod.contactMobile);

        $(".contactWay .error").hide();
        $("#contactWayEdit").hide();
        if (checkSubmit()) {
            $("#comfirmNetworkInfo").hide();
            $("#orderSubmit").removeClass("orderSubmitHery").addClass("orderSubmit");
        }
    });
    //联系方式点击修改
    $(".contactWayClose").live('click',function(){
        $(this).text("【不保存关闭】");
        $(this).addClass("contactWayOpen").removeClass("contactWayClose");
        $("#contactWayInfo").hide();
        $("#contactWayEdit").show();
        if (checkSubmit()) {
            $("#comfirmNetworkInfo").hide();
            $("#orderSubmit").removeClass("orderSubmitHery").addClass("orderSubmit");
        }
    });

    // 确认入网资料
//    $("#networkInfoSave").click(function(){
//        //if(checkNetwork()){}
//            // 当需要确认入网资料且商户不支持发票抬头
//            //if(isSupportInvoiceHead=='0') {
//                $("#invoiceTitle").text($("#receiverName").val());
//            //}
//            //$("#comfirmNetworkInfo").hide();    
//            return true;
//        
//    });

    $(".sfBody td:not('td.radioBox')").live("click",function(){
        $(this).parent().find(".radioBox input").attr("checked",true);
        $(this).parents("tr").addClass("trBlue").siblings().removeClass("trBlue");
    });

    $(".sfBody td").live({
        mouseover:function(){
            $(this).parents("tr").addClass("trBlue");
        },
        mouseout:function(){
            if($(this).parent().find("input[type='radio']").attr("checked")==false)
            {
                $(this).parents("tr").removeClass("trBlue");
            }
        }
    });

    $(".radioBox input[type='radio']").live("click",function(){
        $(this).parents("tr").addClass("trBlue").siblings().removeClass("trBlue");
    });

    // 保存收货地址
    $("#saveAddress").live('click', function() {
        saveAddressInfo();
    })

    $(".quitChangeBtn").live("click",function(){
        $("#addressListInfo").hide();
        if (checkSubmit()) {
            $("#comfirmNetworkInfo").hide();
            $("#orderSubmit").removeClass("orderSubmitHery").addClass("orderSubmit");
        }
    });

    $(".addressAdd").live("click",function(){
        var _hasAddressListInfo=$(this).find("div").hasClass("addressListInfoArea");
        if(_hasAddressListInfo){
            $("#addressListInfo").show();
        }else{
            var k=$("#addressListInfo").clone().show();
            $("#addressListInfo").remove();
            $(this).after(k);
        }
        selectProvinceID();
        addAfterClearInput();
        if(portageJson.DIF_PLACE == "0"){
            $("#provinceId").val($("#provinceId option").eq(0).val());
            $("#provinceId").change();
        }
        $(".quitChangeBtn").hide();
        $("#addressInfoSave").html("确认收货信息");
        checkSubmit();
        $(this).addClass("dqNew").siblings(".addressList").find("li").removeClass("dq");
        $(this).find("input").attr("checked",true);
    });

    $("#provinceId").live('change', function() {
        var addProvinceId = $(this).find("option:selected").text();
        $(".provinceText").html(addProvinceId);
        $(".provinceTextDelimiter").show();
    });

    $("#cityId").live('change', function() {
        var addCityId = $(this).find("option:selected").text();
        $(".cityText").html(addCityId);
        $(".cityTextDelimiter").show();
    });

    $("#areaId").live('change', function() {
        var addAreaId = $(this).find("option:selected").text();
        $(".areaText").html(addAreaId);
        $(".areaTextDelimiter").show();
    });

    // 选中地址列表地址
    $('.addressCursor').live('click', function() {
        if($(this).find("input").attr("disabled")){
            return;
        }
        $(this).parents("li").addClass("dq").siblings("li").removeClass("dq");
        $(this).find("input").attr("checked", "checked");
        $("#addressListInfo").hide();
        if (checkSubmit()) {
            $("#comfirmNetworkInfo").hide();
            $("#orderSubmit").removeClass("orderSubmitHery").addClass("orderSubmit");
        }
        comfirmAddress();
        $(this).parents("#addressList").siblings(".addressAdd").removeClass("dqNew");
    })

    $(".addressAdd").hover(function(){
        $(this).addClass("dqHoverNew");
    },function(){
        $(this).removeClass("dqHoverNew");
    });

    // 支付方式
    //$("#payMentEdit .payWayList4Cs").live("click", function(){
    //    if($(this).attr("id")=="installmentGoodSet"){
    //        return;
    //    }
    //    $(this).find("input").attr("checked", "checked");
    //    showPayWayItem($(this).find("input").val(), null);
    //    $(this).addClass("chooseBc").siblings(".payWayList4Cs").removeClass("chooseBc");
    //    if($(this).find("input").val()=='02'){
    //        $(".payWayItem02").eq(0).click();
    //        $("#deliveryDate04").attr("disabled", "disabled");
    //        $(".hide4School").show();
    //        $(".show4School").hide();
    //    }else{
    //        $("#deliveryDate04").attr("disabled", "");
    //        $(".show4School").show();
    //        $(".hide4School").hide();
    //    }
    //});

    // 货到付款下级菜单
    //$(".payWayItem02").live("click", function(){
    //    $(this).find("input").attr("checked", "checked");
    //    $(this).addClass("chooseBc").siblings(".payWayItem02").removeClass("chooseBc");
    //});

    // 配送方式
    $("#deliveryEdit .distributionWay").live("click", function(){
        $(this).find("input").attr("checked", "checked");
        $(this).addClass("chooseBc").siblings(".distributionWay").removeClass("chooseBc");
        var delMode=$(this).find("input[name='deliveryMode']").val();
        if(delMode=="01")
        {
            $(".divcompany-list").show();
            $("#express").show();
            $("#selfFetch").hide();
        }else{
            $(".divcompany-list").hide();
            $("#express").hide();
            $("#selfFetch").show();
        }
    });

    $(".divcompany-list .dispatch").bind("click",function() {
        $(this).find("input").attr("checked", "checked");
        $(".divcompany-list .chooseBc").removeClass("chooseBc");
        $(this).addClass("chooseBc");
    });

    // 配送日期
    //$("#deliveryEdit .distributionDay").live("click", function(){
    //    if($(this).find("input").attr("disabled")){
    //        return;
    //    }
    //    $(this).find("input").attr("checked", "checked");
    //    $(this).addClass("chooseBc").siblings(".distributionDay").removeClass("chooseBc");
    //    var deliveryDate=$(this).find("input[name='deliveryDate']").val();
    //    if(deliveryDate=="04"){
    //        deliveryData.distributionTime = $("#sendTimeShow").attr("defaultDate");
    //        // 隐藏货到付款
    //        hideCod();
    //    }else{
    //        deliveryData.distributionTime = "";
    //        showCod();
    //    }
    //});

    // 卡类型
    $(".phoneCardType4Cs").live("click", function(){
        $(this).find("input").attr("checked", "checked");
        $(this).addClass("chooseBc").siblings(".phoneCardType4Cs").removeClass("chooseBc");
    });
    // 首月资费
    $(".firstMonthFee4Cs").live("click", function(){
        $(this).find("input").attr("checked", "checked");
        $(this).addClass("chooseBc").siblings(".firstMonthFee4Cs").removeClass("chooseBc");
    });



    // 配送方式
    $("#deliveryInfoSave").click(function() {
        var deliveryMode = $("input[name='deliveryMode']:checked");
        var deliveryDate = $("input[name='deliveryDate']:checked");
        var selfFetchChecked = $("input[name='selfFetchAddr']:checked");
        if("01"==deliveryMode.attr('value')){
            if(deliveryDate.length == 0){
                alert("请选择送货时间");
                return;
            }
        }
        else if("03"==deliveryMode.attr('value')){
            if(selfFetchChecked.length == 0){
                alert("请选择自提点");
                return;
            }
        }
        var deliveryEdit = $("#deliveryEdit");
        if(deliveryMode != null && "03"==deliveryMode.attr('value')){
            $(".selfFetchAddrSelect").val(selfFetchChecked.val());
        }
        changeFreight();
    });

    //结算信息 展开关闭
    $(".checkoutLeft h6").toggle(function() {
        if($(this).find("span").hasClass("invoiceTitle") && isNotNeedPostAddr == "true"){//全国套餐老用户发票抬头
            return;
        }
        var click = $(this).find("span");
        click.addClass("close").removeClass("open");
        $(this).next().slideDown(300);
    },function(){
        var click = $(this).find("span");
        click.addClass("open").removeClass("close");
        $(this).next().slideUp(300);
    });

    /**
     * *************新逻辑：客户绑定代金券信息 begin ***********************
     */
        //隐藏验证码
    $("#voucherCaptchaId").hide();
    $(".voucherTitle").attr("data-is-loaded","false");
    //当用户在订单填写页点击使用我的代金券时：查询该用户下绑定的且未使用的代金券
    $(".voucherTitle,#voucherH6").click(function(){
        loadVoucher();
    });
    function loadVoucher(){
        var isLoaded = $(".voucherTitle").attr("data-is-loaded");
        if("true" == isLoaded){
            return;
        }
        $(".thickdiv").css("height", $("body").height()).show();
        $(".loadingText").text("请稍候......");
        $(".loadingStyle").show().center();
        var paramTmp = {};
        paramTmp.goodsId = GoodsId;
        paramTmp.merchantId = MERCHANT_ID;
        paramTmp.saleActType = SALEACT_TYPE;
        paramTmp.activityType = ACTIVITY_TYPE;
        paramTmp.custTag = _custTag;
        $.ajax({
            type : "post",
            url : queryCustVoucherUrl,
            dataType : "json",
            data: paramTmp,
            success : function(data){
                $(".voucherTitle").attr("data-is-loaded","true");
                $(".thickdiv").hide();
                $(".loadingStyle").hide();
                showCustVoucherInfo(data);
            }
        });
    }
    $(".voucherTitle").toggle(function() {
        $(this).addClass("close").removeClass("open");
        $("#couponList").slideDown(300);
    }, function() {
        $(this).addClass("open").removeClass("close");
        $("#couponList").slideUp(300);
    });

    function showCustVoucherInfo(data){
        var len = data.length;
        if(len > 0){
            $("#noUserVoucherTR").siblings().remove();
            for ( var i = 0; i < len; i++) {
                $("#custVoucherTmpl" ).tmpl(data[i]).insertBefore($("#noUserVoucherTR" ));
            }
            $(".coupon .tBodyList").show();
            $(".coupon .noContent").hide();
            checkVoucherUseCondition();
        }else{
            $(".coupon .tBodyList").hide();
            $(".coupon .noContent").show();
        }
    }
    //当用户点击代金券弹出层上的激活按钮时
    $("#tipsNumberCon").click(function(){
        var _this=$(this), _parent=_this.closest(".content"),valS=$.trim(_parent.find(".inputWidth183px").val());
        if(valS=="" || !valS.match(/^[0-9]{19}$/)){
            $("#activateErrPInfo").html("<i></i>对不起,您输入的代金券不存在或已经过期或不能用于该商品，请重新输入。");
            _parent.children("p").hide().filter(".errorP").show();
            return;
        }
        $("#thickdiv").css("height", $("body").height()).show();
        $("#loadingText").text("请稍候......");
        $("#loadingStyle").show().center();

        var param = {};
        param.goodsId = GoodsId;
        param.merchantId = MERCHANT_ID;
        param.saleActType = SALEACT_TYPE;
        param.activityType = ACTIVITY_TYPE;
        param.custTag = _custTag;
        param.voucherPWD = valS;
        param.inputCode = $("#voucherCaptchaId #inputCode").val();
        param.configKey ="ZJ2t2ofiM9Ikpv4JE8Dctg==";
        $.ajax({
            type:"post",
            url:activateVoucherUrl,
            dataType:"json",
            data: param,
            success:function(data){
                $("#thickdiv").hide();
                $("#loadingStyle").hide();
                if(data){
                    var respCode = data.respCode;
                    //先这样点击下换验证码，以后再加个条件判断
                    $('#changeVerifyCode').click();
                    if(respCode == "OK"){
                        $("#custVoucherTmpl" ).tmpl(data).insertBefore($(".tBodyList table tr:first" ));
                        $('.successCon-ul .successCon-mval').html('代金券面值：¥'+data.detailFee);
                        $('.successCon-ul .successCon-time').html('有效期：'+data.endDate);
                        _parent.hide().next().show();
                        $(".coupon .tBodyList").show();
                        $(".coupon .noContent").hide();
                        checkVoucherUseCondition();
                        if($("input[name='custVoucherRadio']").attr("disabled") == true  ||
                            $("input[name='custVoucherRadio']").attr("disabled") == "disabled"){
                            return ;
                        }
                        $("input[name='custVoucherRadio'][detailId='"+data.detailId+"']").parents("td").click();
                    }else if(respCode == '0000' || respCode == '0006' || respCode == '0007'){
                        $("#activateErrPInfo").html("<i></i>对不起，激活失败，您输入的代金券不存在\已经过期，请重新输入。");
                        _parent.children("p").hide().filter(".errorP").show();
                    }else if(respCode == '0004'){
                        $("#activateErrPInfo").html("<i></i>您已有同样密码的代金券还没有使用，请使用后再来激活吧。");
                        _parent.children("p").hide().filter(".errorP").show();
                    }else if(respCode == '0005'){
                        $("#activateErrPInfo").html("<i></i>您已经使用过该代金券密码激活了，不能再次激活。");
                        _parent.children("p").hide().filter(".errorP").show();
                    }else if(respCode == '1000'){
                        $("#voucherCaptchaId").show();
                        $("#voucherCapcheErrInfo").html("激活失败超过次数，请输入验证码");
                        $(".numberDl .verifyError").show();
                    }else if(respCode == '1001'){
                        $("#voucherCapcheErrInfo").html("输入的验证码错误");
                        $(".numberDl .verifyError").show();
                    }else if(respCode == '1002'){
                        Message.showFailMsgDef("对不起，激活失败，你今天激活失败的次数超过最大限制，请明天再试。");
                        $(".thickdiv,#myNumber").hide();
                    }else if(respCode == '1003'){
                        $("#activateErrPInfo").html("<i></i>你输入的代金券密码为空，请输入代金券密码。");
                        _parent.children("p").hide().filter(".errorP").show();
                    }

                }else{
                    $("#activateErrPInfo").html("<i></i>对不起，激活失败，您输入的代金券不存在\已经过期，请重新输入。");
                    _parent.children("p").hide().filter(".errorP").show();
                }
            }
        });
    });


    //当代金券不可用的时候提示不可用的原因
    $(".bgcouponGray").live({
        mouseenter:function(){
            var pos=$(this).offset(),left=pos.left+150,top=pos.top+27;
            //判断是否支持该商品 或 是否支持该商户
            var isSupSelectGoods = $(this).find("input:radio[name='custVoucherRadio']").attr("isSupSelectGoods");
            var isSupSelectMerchant = $(this).find("input:radio[name='custVoucherRadio']").attr("isSupSelectMerchant");
            if(isSupSelectGoods == "false" || isSupSelectMerchant == "false"){
                $(".noUseTips").show().offset({top:top,left:left}).find("span").html("该代金券不能用于该商品");
                return ;
            }
            //判断是否可用
            var isCanUse = $(this).find("input:radio[name='custVoucherRadio']").attr("isCanUseVoucher");
            if(isCanUse == "false"){
                $(".noUseTips").show().offset({top:top,left:left})
                    .find("span").html("该代金券与促销、合约、老用户优惠购机互斥，不能同时使用");
                return ;
            }
            //判断是否是所需商品总额的钱不满足分期付款的所需消费金额的限制
            var $payMent = $("#payMentEdit li.payment.choice");
            var payType =  $payMent.attr("valueof");
            var orderMoney = parseFloat($("#Price").text())+parseFloat($("#freight").text());
            if("01" ==  payType && "02" == $payMent.attr("data-pay-way")){
                payWay = $("input[name='payMentMode']:checked").val();
            }else{
                payWay = $(".payWayItem" +payType + ".redSelectAction").attr("valueof");
            }
            if(payType == '01' &&  payWay == '02'){
                var isSupportDividePay = $(this).find("input:radio[name='custVoucherRadio']").attr("isSupportDividePay");
                //判断是否支持分期付款
                if(isSupportDividePay == '0'){
                    $(".noUseTips").show().offset({top:top,left:left}).find("span").html("该代金券与分期付款互斥，如需使用请更改您的支付方式");
                    return ;
                }
                var installLimitMoney = parseFloat($("span[name='payMentAlloted'].redSelectAction").attr("data-limit-price"))/1000;
                var faceFee = parseFloat($(this).find("input:radio[name='custVoucherRadio']").attr("voucherfacefee"));
                if(installLimitMoney > orderMoney -faceFee){
                    $(".noUseTips").show().offset({top:top,left:left}).find("span").html("使用该代金券后将不满足分期付款最低消费"+installLimitMoney+"元要求，您可以调整支付方式后再使用该代金券");
                    return ;
                }
            }

            //判断是否是代金券所需消费金额的限制
            var _thisMoneyLimit = parseFloat( $(this).find("input:radio[name='custVoucherRadio']").attr("voucherMoneyLimit"));
            if(_thisMoneyLimit > orderMoney){
                $(".noUseTips").show().offset({top:top,left:left}).find("span").html("该代金券要求满"+_thisMoneyLimit+"元才能使用");
                return ;
            }
        },
        mouseleave:function(){
            $(".noUseTips").hide();
        }
    });
    //验证码提示关闭按钮
    $(".errorText b ").live("click",function(){
        $(".verifyError").hide();
    });
    //当用户点击输入验证码时，隐藏错误提示
    $("#inputCode").focus(function(){
        $(".verifyError").hide();
    });
    //当用户点击代金券弹出层上的关闭按钮时
    $(".layerBox .closeCityLayer,.layerBox .closeLay").click(function(){
        $(".thickdiv,#myNumber").hide();
    });
    //当用户点击选择代金券单选框时
    $("#couponList .tBodyList tr td").live("click",function(){
        if($(this).parents("tr").attr("id") != "noUserVoucherTR" && $(".payMentClose").length > 0 ){
            Message.showFailMsgDef("对不起，请先确认支付方式，谢谢您的配合!");
            return false;
        }
        var _this=$(this),table=_this.parents("table"),input=_this.parent().find("input"),attrs=input.attr("checked");
        if(input.attr("disabled") == true  ||  input.attr("disabled") == "disabled"){
            return;
        }
        table.find("tr").removeClass("bgcoupon");
        if(!attrs){input.attr("checked",true)}
        input.parents("tr").addClass("bgcoupon");

        var goodsPrice = parseFloat($(".checkoutRight #Price").attr("goodsPrice"));
        var voucherPrice = parseFloat($("input[name='custVoucherRadio']:checked").attr("voucherFaceFee"));
        var postPrice = parseFloat($(".checkoutRight #freight").html())||0;
        var addActPrice = parseFloat($(".addActPay").text())||0;
        if( $("input[name='custVoucherRadio']").attr("userVoucherFlag")=="noUseVoucher"){
            var totalPrice = goodsPrice + postPrice + addActPrice;
            $("#billingResult").html(totalPrice.toFixed(2));
            $(".checkoutRight .couMoneyPay").html("0.00");

            restBankTermPrice(totalPrice);//分期付款重置价格
        }else{
            var minusGoodsPrice = goodsPrice - voucherPrice < 0 ? 0 : goodsPrice - voucherPrice;
            // 还需支付的价格
            var totalPrice = minusGoodsPrice + postPrice + addActPrice;
            $("#billingResult").html(totalPrice.toFixed(2));

            // 代金券冲抵价格
            var minusPrice = goodsPrice - minusGoodsPrice;
            $(".checkoutRight .couMoneyPay").html(minusPrice.toFixed(2));

            restBankTermPrice(totalPrice);//分期付款重置价格
        }
    });
    //*************新逻辑：客户绑定代金券信息  end ***********************



    // 发票
    $(".invoiceTitle").toggle(function() {
        if(isNotNeedPostAddr == "true"){//全国套餐老用户发票抬头
            return;
        }
        $(this).addClass("close").removeClass("open");
        $("#invoiceTitleList").slideDown(300);
    }, function() {
        $(this).addClass("open").removeClass("close");
        $("#invoiceTitleList").slideUp(300);
    });

    // 订单备注
    $(".oderMessage").toggle(function() {
        $(this).addClass("close").removeClass("open");
        $(".remark").slideDown(300);
    }, function() {
        $(this).addClass("open").removeClass("close");
        $(".remark").slideUp(300);
    });

    //推荐人信息
    $(".recommendInfo").toggle(function(){
        $(this).addClass("close").removeClass("open");
        $("#recommendList").slideDown(300);
    } ,function(){
        $(this).addClass("open").removeClass("close");
        $("#recommendList").slideUp(300);
    });

    //入网协议
    $(".agreementBtn").live("click",function(){
        var height = $("body").height();
        $(".thickdiv").css("height",height);
        $(".thickdiv").show();
        $(".buyNotice").hide();
        $(".netWork").show().center();
        return false;
    });

    //相关协议——人大
    $(".renda").live("click",function(){
        var height = $("body").height();
        $(".thickdiv").css("height",height);
        $(".thickdiv").show();
        $(".agree_renda").show().center();
        return false;
    });
    // 相关协议——25号令
    $(".order25").live("click",function(){
        var height = $("body").height();
        $(".thickdiv").css("height",height);
        $(".thickdiv").show();
        $(".agree_order25").show().center();
        return false;
    });

    //购买须知
    $(".know").live("click",function(){
        var height = $("body").height();
        $(".thickdiv").css("height",height);
        $(".thickdiv").show();
        $(".buyNotice").show().center();
        return false;
    });
    //退换货政策
    $(".returnedGoods").live("click",function(){
        var height = $("body").height();
        $(".thickdiv2").show();
        $(".returnedGoodsPopup").show().center();
        return false;
    });

    var liNum = $(".goodListZs").find("li").length;
    if (liNum=="1") {
        $(".goodListZs").find("li").css("width","320").css("text-align","center");
    }
    //关闭
    $(".closeCityLayer,.cloBtn").live("click",function(){
        $(this).parents(".layerBox").hide();
        $(".thickdiv").hide();
    });
    //关闭
    $(".closeReturnedGoods").live("click",function(){
        $(this).parents(".layerBox").hide();
        $(".thickdiv2").hide();
    });

    //号码预占
    $("p.numClose").live("click",function(){
        $(".numberBox").hide();
    });


    // 附加活动
    $(".activeCheckbox").live("click",function(){
        var addActPrice = parseFloat($(".addActPay").text());
        var orderPrice = parseFloat($("#billingResult").text());
        if(this.checked){
            if($(this).attr("hasRemark")==1){
                $(this).parents("tr").next(".activityTips").show();
            }
            addActPrice = addActPrice + parseFloat($(this).attr("addActPrice"));// 可选活动价格计算
            orderPrice = orderPrice + parseFloat($(this).attr("addActPrice"));// 订单价格计算
        }else{
            $(this).parents("tr").next(".activityTips").hide();
            addActPrice = addActPrice - parseFloat($(this).attr("addActPrice"));
            orderPrice = orderPrice - parseFloat($(this).attr("addActPrice"));
        }
        // 订单总价
        $("#billingResult").text(orderPrice.toFixed(2));
        // 可选活动总价
        $(".addActPay").text(addActPrice.toFixed(2));
        // 显示or隐藏附加活动费用信息
        if(addActPrice == 0){
            $(".addActPay").parent().hide();
        }else{
            $(".addActPay").parent().show();
        }
    });

    $(".span-mode a").toggle(function(){
        var _text=$(this).text();
        $(this).siblings("span").removeClass("ellipsis");
        $(this).text("【收起】");
    },function(){
        var _text=$(this).text();
        $(this).siblings("span").addClass("ellipsis");
        $(this).text("【展开】");
    });
});



