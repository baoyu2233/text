/**
 * 送货信息模块 包括：
 * 快递（收货地址，配送公司，配送时间）和 自提（自提人联系方式，自提点信息）
 *
 */
$(function () {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
    if (isNotNeedPostAddr != 'true') {
        initOptionProvince();
        initShowAddress();
        //initMoreAddress();
        initDeliveryDetail();
        zitiInitOptionProvince();
    }
    defaultContactPhone();
    deliverSelfFetchShow();
    checkOrderInputInfo();
});
//点击查看更多地址是否需要重新从后台重新获取（地址编辑之后）
var needReload = "true";
//新疆，西藏 屏蔽
var shildProvinceCode = ['89', '79'];
// 收货地址信息
var addressListData = [];
// 选中的收货地址
var selectedPostId = "";
// 配送方式信息
var deliveryData = {};
//自提联系人、电话
var onlineActivateData = {};
//免登陆收货地址列表
var tempAddressInfo = [];
//免登陆收货地址编号
var tempAddressNo = 0;
//整体收货地址列表
//var allAddressInfo = [];
//收货地址初始化可选择省份
function initOptionProvince() {
    var provinceList = allArea.PROVINCE_LIST;
    var bigAreaProvinces = $.parseJSON(bigAreaProvince);
    //大区商品特殊处理
    if (isBigAreaGoods == '1') {
        for (var i = 0; i < bigAreaProvinces.length; i++) {
            for (var j = 0; j < provinceList.length; j++) {
                var temp = provinceList[j];
                if (bigAreaProvinces[i] == temp.ESS_PROVINCE_CODE) {
                    var option = $("<option></option>").attr("ESS_PROVINCE_CODE", temp.ESS_PROVINCE_CODE)
                        .val(temp.PROVINCE_CODE).html(temp.PROVINCE_NAME);
                    $(".addressProvince").append(option);
                }
            }
        }
    }
    //普通商品处理
    else {
        for (var i = 0; i < provinceList.length; i++) {
            var temp = provinceList[i];
            if (shildProvinceCode.indexOf(merchantProvice) == -1 && shildProvinceCode.indexOf(temp.ESS_PROVINCE_CODE) != -1 && TMPL_ID != "10000006" && TMPL_ID != "60000005" && TMPL_ID != "10000005") {
                continue;
            }
            else {
                if (portageJson.DIF_PLACE == "0") {
                    if (temp.ESS_PROVINCE_CODE == merchantProvice) {
                        var option = $("<option></option>").attr("ESS_PROVINCE_CODE", temp.ESS_PROVINCE_CODE)
                            .val(temp.PROVINCE_CODE).html(temp.PROVINCE_NAME);
                        $(".addressProvince option").remove();
                        $(".addressProvince").append("<option value=\"0\">省份/直辖市</option>");
                        $(".addressProvince").append(option);
                        //selectProvinceID('addressNewAreaDetail');
                        //$(".addressProvince").siblings(".seLectStSpan1").find(".seLectStLabel1").text(temp.PROVINCE_NAME);
                    }
                }
                else {
                    var option = $("<option></option>").attr("ESS_PROVINCE_CODE", temp.ESS_PROVINCE_CODE)
                        .val(temp.PROVINCE_CODE).html(temp.PROVINCE_NAME);
                    $(".addressProvince").append(option);
                }
            }
        }
    }
}

//自提地址初始化省份
function zitiInitOptionProvince() {
    provinceOptionClear('ziti');
    cityOptionClear('ziti');
    areaOptionClear('ziti');
    var provinceList = allArea.PROVINCE_LIST;
    var bigAreaProvinces = $.parseJSON(bigAreaProvince);
    //大区商品特殊处理
    if (isBigAreaGoods == '1') {
        for (var i = 0; i < bigAreaProvinces.length; i++) {
            for (var j = 0; j < provinceList.length; j++) {
                var temp = provinceList[j];
                if (bigAreaProvinces[i] == temp.ESS_PROVINCE_CODE) {
                    var option = $("<option></option>").attr("ESS_PROVINCE_CODE", temp.ESS_PROVINCE_CODE)
                        .val(temp.PROVINCE_CODE).html(temp.PROVINCE_NAME);
                    $(".ztProvince").append(option);
                }
            }
        }
    }
    else {
        for (var i = 0; i < provinceList.length; i++) {
            var temp = provinceList[i];
            if (shildProvinceCode.indexOf(merchantProvice) == -1 && shildProvinceCode.indexOf(temp.ESS_PROVINCE_CODE) != -1 && TMPL_ID != "10000006" && TMPL_ID != "60000005" && TMPL_ID != "10000005") {
                continue;
            }
            if (portageJson.DIF_PLACE == "0") {
                if (temp.ESS_PROVINCE_CODE == merchantProvice) {
                    var option = $("<option></option>").attr("ESS_PROVINCE_CODE", temp.ESS_PROVINCE_CODE)
                        .val(temp.PROVINCE_CODE).html(temp.PROVINCE_NAME);
                    $(".ztProvince option").remove()
                    $(".ztProvince").append(option);
                    selectProvinceID('ziti');
                }
            }
            else {
                var option = $("<option></option>").attr("ESS_PROVINCE_CODE", temp.ESS_PROVINCE_CODE)
                    .val(temp.PROVINCE_CODE).html(temp.PROVINCE_NAME);
                $(".ztProvince").append(option);
            }
        }
    }
}

//初始化展示收货地址
function initShowAddress() {
    initShowAddressAJAX("0");
}
//初始化更多收获地址（隐藏框）
function initMoreAddress() {
    initShowAddressAJAX("1");
}
//获取收获地址 "0":普通展示 "1"：更多展示
function initShowAddressAJAX(flag) {
    if (loginType == "2") {
        joinShowAddress(tempAddressInfo);
        return;
    }
    var joinAddress = flag == "0" ? joinShowAddress : joinMoreAddress;
    //  地址展示类型 bigArea:大区   noDis 普通不支持异地  yesDis 普通支持异地
    var showType = isBigAreaGoods == "1" ? "bigArea" : portageJson.DIF_PLACE == "0" ? "noDis" : "yesDis";
    $.ajax({
        type: "post",
        url: addressShowList,
        data: {showType: showType, merchantProvice: merchantProvice, bigAreaProvince: bigAreaProvince},
        dataType: "json",
        success: function (data) {
            if (data[0] == "0") {
                loginType = "2";
                joinShowAddress(tempAddressInfo);
            } else {
                joinAddress(data);
            }
        }
    });
};
// 拼接页面展示收获地址
function joinShowAddress(data) {
    tempAddressInfo = data;
    if (data.length > 0) {
        $(".userInfo .addressShow .userInfoDetail").remove();
        addressListData = data;
        var bigAreaProvinces = $.parseJSON(bigAreaProvince);
        for (var i = 0, index = 0; index < data.length; index++) {
            var tempAddress = data[index];
            //屏蔽新疆西藏(大区商品不屏蔽)
            if (isBigAreaGoods != '1' && shildProvinceCode.indexOf(merchantProvice) == -1 && shildProvinceCode.indexOf(tempAddress.ESS_PROVINCE_CODE) != -1 && TMPL_ID != "10000006" && TMPL_ID != "60000005" && TMPL_ID != "10000005") {
                continue;
            }
            if (isBigAreaGoods == '1') {
                var flag = bigAreaProvinces.indexOf(tempAddress.EssProvinceCode) == -1 ? "unavailable" : "available";
            } else {
                var flag = (portageJson.DIF_PLACE == "0" && tempAddress.EssProvinceCode != merchantProvice) ? "unavailable" : "available";
            }
            var style = flag == "unavailable" ? "color:silver" : "";
            var unavailableTips = flag == "unavailable" ? "<span class='unUser'>此地区不支持配送</span>" : "";
            var postAddr = "";
            if (tempAddress.PostAddr != null) {
                postAddr = tempAddress.PostAddr.length > 35 ? tempAddress.PostAddr.substring(0, 32) + "..." : tempAddress.PostAddr;
            }
            var newhtm = "<div class='userInfoDetail' postid='" + tempAddress.PostId + "' flag='" + flag + "'  style='" + style + "'>";
            newhtm += "<p class='naPh'><span class='consignee'>" + tempAddress.ReceiverName + "</span>";
            newhtm += "<span class='consigneePhone'>" + tempAddress.MobilePhone + "</span></p>";
            newhtm += "<div class='middleLine'></div>";
            newhtm += "<p class='consigneeAddress'><span class='province'>" + tempAddress.ProvinceName + "</span>，<span class='city'>"
            + tempAddress.CityName + "</span>，<span class='county'>" + tempAddress.DistrictName + "</span><span class='address' title='" + tempAddress.PostAddr + "'>"
            + postAddr + "</span>" + "</p>" + unavailableTips + "</div>";

            $(".userInfo .addressShow").append(newhtm);
        }
        //展示地址不能超过七个
        var $addressShow = $(".userInfo .addressShow .userInfoDetail");
        if ($addressShow.length > 7) {
            $addressShow.slice(7).hide();
            $(".moreAddress").show();
        } else {
            $(".moreAddress").hide();
        }
        //初始化选中第一个有效地址
        $(".userInfoDetail[flag=available]").eq(0).click();
    } else {
        $(".userInfo .addressShow .userInfoDetail").remove();
        $("#deliverNotice").show();
        var paramTmp = {};
        paramTmp.AddrCityCode = EssNumberCity;
        paramTmp.NumberCityCode = EssNumberCity;
        paramTmp.goodsId = GoodsId;
        $.ajax({
            type: "post",
            url: hasReceivePay,
            dataType: "json",
            data: paramTmp,
            success: hasReceivePayCallBack
        });
        checkOrderInputInfo();
    }
}

//拼接隐藏的更多收获地址
function joinMoreAddress(data) {
    tempAddressInfo = data;
    if (data.length > 0) {
        addressListData = data;
        var bigAreaProvinces = $.parseJSON(bigAreaProvince);
        $('.moreAddressDetailContent ul li').remove();
        for (var i = 0, index = 0; index < data.length; index++) {
            var tempAddress = data[index];
            var flag = "available";
            var style = "";
            var isDisable = "";
            //普通商品不支持配送
            if (isBigAreaGoods != '1' && portageJson.DIF_PLACE == "0" && tempAddress.EssProvinceCode != merchantProvice) {
                flag = "unavailable";
                style = "color:silver";
                isDisable = "disabled";
            }
            //大区商品不支持配送
            if (isBigAreaGoods == '1' && bigAreaProvinces.indexOf(tempAddress.EssProvinceCode) == -1) {
                flag = "unavailable";
                style = "color:silver";
                isDisable = "disabled";
            }
            var receiverName = tempAddress.ReceiverName.length > 10 ? tempAddress.ReceiverName.substring(0, 7) + "..." : tempAddress.ReceiverName;
            var titleInfo = tempAddress.ProvinceName + '，' + tempAddress.CityName + '，' + tempAddress.DistrictName + '，' + tempAddress.PostAddr + tempAddress.MobilePhone;
            var newHtml = '<li class="moreAddressList" postid="' + tempAddress.PostId + '" flag="' + flag + '" style="' + style + '"><div class="moreAddressLeft"> <input type="radio" checked="unchecked" name="usersName" ' + isDisable + ' > ' +
                '<label class="usersName" title="' + tempAddress.ReceiverName + '">' + receiverName + '</label></div><div class="moreAddressMiddle" title="' + titleInfo + '"> ' +
                '<span class="moreAddressProvince">' + tempAddress.ProvinceName + '</span>，' +
                '<span class="moreAddressCity">' + tempAddress.CityName + '</span>，' +
                '<span class="moreAddressCounty">' + tempAddress.DistrictName + '</span>，' +
                '<span class="moreAddressDe">' + tempAddress.PostAddr + '</span>' +
                '<span class="moreAddressPhone">' + tempAddress.MobilePhone + '</span></div>' +
                '<div class="moreAddressRight"> <a class="moreAddressEdit" href="javascript:void(0)">编辑</a> ' +
                '<a class="moreAddressDel" href="javascript:void(0)">删除</a> </div> </li>';

            $('.moreAddressDetailContent ul').append(newHtml);

        }
        SynchSelected();
    } else {
        $(".moreAddressDetailContent ul li").remove();
    }
    needReload = "false";
}


/**
 *  页面展示地址上的鼠标移入，移出，点击事件  开始
 */
var buttonImage = "<div class='addressAction'>" +
    "<img class='addressDel' src='" + Esf.resPath + "/front/images/orderInput_new/addressDel.png'>" +
    "<img class='addressEdit' src='" + Esf.resPath + "/front/images/orderInput_new/addressEdit.png'>" +
    "</div>";

$(".userInfo .userInfoDetail ,#addressNewArea").live("mouseover", function () {
    if ($(this).attr("flag") != "unavailable") {
        $(this).addClass("redSelect1");
    }
    if ($(this).attr("id") != "addressNewArea") {
        if ($(".addressAction").length == 0) {
            $(this).append(buttonImage);
            $(".addressAction").css("display", "block");
        }
    }
});
$(".userInfo .userInfoDetail,#addressNewArea").live("mouseleave", function () {
    $(".addressAction").remove();
    $(this).removeClass("redSelect1");
});

//页面展示的有效地址
$(".userInfo .userInfoDetail[flag=available]").live("click", function () {
    var postId = $(this).attr('postid');
    var selectedShowAddress;
    for (var i = 0; i < addressListData.length; i++) {
        if (postId == addressListData[i].PostId) {
            selectedShowAddress = addressListData[i];
        }
    }
    $(".submitMassageA .mleft").text("收货人：" + selectedShowAddress.ReceiverName);
    $(".submitMassageA .mmiddle").text(selectedShowAddress.MobilePhone);
    $(".submitMassageA .mright").text(selectedShowAddress.ProvinceName + "，" + selectedShowAddress.CityName + "，" + selectedShowAddress.DistrictName + selectedShowAddress.PostAddr);
    postId = selectedShowAddress.PostId;
    selectProvice = selectedShowAddress.EssProvinceCode;

    var paramTmp = {};
    paramTmp.AddrCityCode = selectedShowAddress.EssCityCode;
    paramTmp.NumberCityCode = EssNumberCity;
    paramTmp.goodsId = GoodsId;
    $.ajax({
        type: "post",
        url: hasReceivePay,
        dataType: "json",
        data: paramTmp,
        success: hasReceivePayCallBack
    });
    $(this).addClass("redSelectAction1");
    $(this).siblings().removeClass("redSelectAction1");
    SynchSelected();
    checkOrderInputInfo();
    computerDeliverFee(selectProvice);
    addressFirstClick = "false";
    //选中的地址信息
    selectedPostId = postId;
});

/**
 *
 * 计算配送费用
 */
function computerDeliverFee(selectProvice) {
    var fee = 0;
    if (selectProvice == merchantProvice) {
        fee = (portageJson.LOCAL_FEE / 1000).toFixed(2);
    }
    else {
        fee = (portageJson.REMOTE_FEE / 1000).toFixed(2);
    }
    $(".addressInformation .kuaidi").attr("fee", fee);
    changeDeliverFee();
}


/**
 * 物流公司选中事件
 *
 */
$(".orderCartCom li,.distributionDay li").live("click", function () {
    $(this).addClass("redSelectAction");
    $(this).siblings().removeClass("redSelectAction");
    checkOrderInputInfo();
    deliverFirstClick = "false";
    deliverDateFirstClick = "false";
});

/**
 *  页面展示地址上的鼠标移入，移出，点击事件 结束
 */

/**
 * 页面展示地址的 添加，修改，删除  开始
 */
//页面展示收货地址新增
$("#addressNewArea").live("click", function () {
    // 清空编辑框信息
    provinceOptionClear('addressNewAreaDetail');
    cityOptionClear('addressNewAreaDetail');
    areaOptionClear('addressNewAreaDetail');
    initOptionProvince();
    $("#addressNewAreaDetail").find(".error,.correct").hide();
    //新增地址姓名默认入网资料姓名
    $("#consignee").val($("#infoBoxBtn").is(":visible") ? $("#infoBoxBtn .inforname").text() : "");
    $("#consigneePhone").val("");
    $("#consigneeAddress").val("");
    $("#editPostId").val("");
    $(".AgBtn").addClass("AgBtnNew");//控制编辑完成后操作
    $("#addressNewAreaDetail").show();
    $(".thickdiv").show().height($("body").outerHeight());
});

//页面展示确认新增地址
$(".AgBtnNew").live("click", function () {
    if (!validationAddress())
        return false;
    if (loginType == "2") {
        localAddressAdd();
    } else {
        $.ajax({
            type: "post",
            url: addressAddPostAddr,
            async: false,
            dataType: "json",
            data: addressJSON("add"),
            success: function (data) {
                if (data[0] == "0") {
                    loginType = "2";
                    localAddressAdd();
                } else {
                    joinShowAddress(data);
                }
            }
        });
    }

    $(".AgBtn").removeClass("AgBtnNew");
    $("#addressNewAreaDetail").hide();
    $(".thickdiv").hide();
    needReload = "true";
    checkOrderInputInfo();
});

//页面展示收货地址编辑
$(".addressEdit").live("click", function () {
    var $editFrame = $(".addressEdit").parent().parent();
    //是否有效地址的编辑
    var flag = $editFrame.attr("flag");
    var postId = $editFrame.attr("postid");
    var name = $editFrame.find(".consignee").text();
    var phone = $editFrame.find(".consigneePhone").text();
    var province = $editFrame.find(".province").text();
    var city = $editFrame.find(".city").text();
    var county = $editFrame.find(".county").text();
    var address = $editFrame.find(".address").text();

    $(".thickdiv").show().height($("body").outerHeight());
    $("#addressNewAreaDetail").show();
    $("#addressTop label").text("编辑地址");
    synchAddress(province, city, county, flag, postId);
    $("#consignee").val(name);
    $("#consigneePhone").val(phone);
    $("#consigneeAddress").val(address);
    $("#editPostId").val(postId);
    $(".AgBtn").addClass("AgBtnEdit");//控制编辑完成后操作
    return false;
});

//页面展示收货地址编辑后确定
$(".AgBtnEdit").live("click", function () {
    if (!validationAddress())
        return false;
    if (loginType == "2") {
        localAddressModify();
    } else {
        $.ajax({
            type: "post",
            url: addressModPostAddr,
            async: false,
            dataType: "json",
            data: addressJSON("modify"),
            success: function (data) {
                if (data[0] == "0") {
                    loginType = "2";
                    localAddressModify();
                } else {
                    SynchMoreAndShow(data);
                }
            }
        });
    }
    $("#addressNewAreaDetail").hide();
    $(".AgBtn").removeClass("AgBtnEdit");
    $("#addressTop label").text("添加新地址");
    if ($(".moreAddressDetail").is(":hidden")) {
        $(".thickdiv").hide();
    }
    $(".thickdiv").css("z-index", 10000001);
    needReload = "true";

});
//编辑后同步
function SynchMoreAndShow(data) {
    joinShowAddress(data);
    joinMoreAddress(data);
}

//编辑页面展示收货地址框时同步 省市地
function synchAddress(province, city, county, flag, postId) {
    if (flag != "available") {
        //var $provinceSelected = $(".addressProvince option[value!=0]").eq(0);
        //$provinceSelected.attr("selected", "selected");
        $(".addressProvince").siblings(".seLectStSpan1").find(".seLectStLabel1").text(province);
        $(".addressCity").siblings(".seLectStSpan1").find(".seLectStLabel1").text(city);
        $(".addressCounty").siblings(".seLectStSpan1").find(".seLectStLabel1").text(county);

        //收货信息
        var len = addressListData.length;
        var selectedInfo;
        for (var i = 0; i < len; i++) {
            if (addressListData[i].PostId == postId) {
                selectedInfo = addressListData[i];
                break;
            }
        }
        $("#addressNewAreaDetail #provinceId option[flag=hidden]").remove();
        $("#addressNewAreaDetail").find("#provinceId").append(
            "<option  style='display:none' flag='hidden' selected='selected' value=\"" + selectedInfo.ProvinceCode + "\" ESS_PROVINCE_CODE = \"" + selectedInfo.EssProvinceCode + "\">"
            + selectedInfo.ProvinceName + "</option>");

        $("#addressNewAreaDetail").find("#cityId").html(
            "<option  style='display:none' selected='selected'  value=\"" + selectedInfo.CityCode + "\" ESS_CITY_CODE = \"" + selectedInfo.EssCityCode + "\">"
            + selectedInfo.CityName + "</option>");

        $("#addressNewAreaDetail").find("#areaId").html(
            "<option style='display:none'  selected='selected'  value=\"" + selectedInfo.DistrictCode + "\">" + selectedInfo.DistrictName + "</option>");

        //selectProvinceID('addressNewAreaDetail');
        //checkProvinceId('addressNewAreaDetail');
    } else {
        var provinceList = $(".addressProvince option");
        for (var i = 0; i < provinceList.length; i++) {
            if (provinceList.eq(i).text() == province) {

                provinceList.eq(i).attr("selected", "selected");
                //provinceList.eq(i).parent().siblings(".seLectStSpan1").find(".seLectStLabel1").text(province);
                selectProvinceID('addressNewAreaDetail');
                checkProvinceId('addressNewAreaDetail');
                break;
            }
        }
        var cityList = $(".addressCity option");
        for (var i = 0; i < cityList.length; i++) {
            if (cityList.eq(i).text() == city) {
                cityList.eq(i).attr("selected", "selected");
                //cityList.eq(i).parent().siblings(".seLectStSpan1").find(".seLectStLabel1").text(city);
                selCityID('addressNewAreaDetail');
                checkCityId('addressNewAreaDetail');
                break;
            }
        }
        var countyList = $(".addressCounty option");
        for (var i = 0; i < countyList.length; i++) {
            if (countyList.eq(i).text() == county) {
                countyList.eq(i).attr("selected", "selected");
                //countyList.eq(i).parent().siblings(".seLectStSpan1").find(".seLectStLabel1").text(county);
                checkAreaId('addressNewAreaDetail');
                break;
            }
        }
    }
}

//页面展示收货地址删除
$(".addressDel").live("click", function () {
    var postId = $(this).parent().parent().attr("postid");
    $("#editPostId").val(postId);
    $(".deleBtn").show();
    $(".thickdiv").show().height($("body").outerHeight());

});

//页面展示确认删除收货地址
$(".deleBtnAgree").live("click", function () {
    $(".deleBtn").hide();
    if ($(".moreAddressDetail").is(":hidden")) {
        $(".thickdiv").hide();
    }
    $(".thickdiv").css("z-index", 10000001);

    if (loginType == "2") {
        localAddressDelete();
        return false;
    }
    $.ajax({
        type: "post",
        url: addressDelPostAddr,
        dataType: "json",
        data: addressJSON("delete"),
        success: function (data) {
            if (data[0] == "0") {
                loginType = "2";
                localAddressDelete();
            } else {
                SynchMoreAndShow(data);
            }
        }
    });
    needReload = "true";
});

/**
 * 页面展示地址的 添加，修改，删除  结束
 */


/**
 * 更多地址   修改，删除  开始
 */
//查看更多收获地址 （没有增删改时，直接展示，否则重新从后台查询）
$(".moreAddress").live("click", function () {
    if (needReload == "false") {
        SynchSelected();
        $(".thickdiv").show().height($("body").outerHeight());
        $(".moreAddressDetail").show();
    }
    else {
        $(".thickdiv").show().height($("body").outerHeight());
        initMoreAddress();
        $(".moreAddressDetail").show();
    }
});

//更多地址  选择地址
$(".moreAddressDetailContent ul li").live("click", function () {
    var $li = $(".moreAddressDetailContent ul li");
    var $selectedLi = $(this);
    if ($selectedLi.find("input").attr("disabled")) {
        return;
    }
    $li.each(function () {
        $(this).find(".moreAddressLeft input").attr("checked", "unchecked");
        $(this).removeClass("liChecked1");

    });
    $selectedLi.find(".moreAddressLeft input").attr("checked", "checked");
    $selectedLi.addClass("liChecked1");
});


//更多地址 确认选择收货地址
$(".moreAddressBtn").live("click", function () {
    var addr = $(".moreAddressDetailContent ul li").find(".moreAddressLeft input:checked");
    //判断有没有选择
    if (addr.length > 0) {
        var name = addr.siblings("label").text();
        var mpro = addr.parents().siblings(".moreAddressMiddle").children(".moreAddressProvince").text();
        var mcity = addr.parents().siblings(".moreAddressMiddle").children(".moreAddressCity").text();
        var mcou = addr.parents().siblings(".moreAddressMiddle").children(".moreAddressCounty").text();
        var mdetail = addr.parents().siblings(".moreAddressMiddle").children(".moreAddressDe").text();
        var mphon = addr.parents().siblings(".moreAddressMiddle").children(".moreAddressPhone").text();
        var postId = addr.parent().parent().attr("postid");

        var $showInfo = $(".userInfo .userInfoDetail:visible");

        var number;
        for (number = 0; number < $showInfo.length; number++) {
            var $temp = $(".userInfo .userInfoDetail[flag=available]:visible").eq(number);
            if (postId == $temp.attr("postid")) {
                $temp.click();
                break;
            }
        }
        //更多地址中选中项不在展示项中，将此项添加到展示项第一项，如果此时展示项超过7项，将第七项移除
        var newhtm = "<div class='userInfoDetail' postid='" + postId + "' flag='available'>";
        newhtm += "<p><span class='consignee'>" + name + "</span>";
        newhtm += "<span class='consigneePhone'>" + mphon + "</span></p>";
        newhtm += "<div style='width: 95%;height:1px;text-align: center;margin-left: 5px;border-bottom:1px solid #ccc'></div>";
        newhtm += "<p class='consigneeAddress'><span class='province'>" + mpro + "，</span><span class='city'>"
        + mcity + "，</span><span class='county'>" + mcou + "</span><span class='address'>"
        + mdetail + "</span>" + "</p></div>";

        if (number == $showInfo.length) {
            if ($(".userInfo .userInfoDetail:visible").length == 8) {
                $(".userInfo .userInfoDetail:visible").eq(6).remove();
                $(".userInfo .addressShow").prepend(newhtm);
            }
            else {
                $(".userInfo .addressShow").prepend(newhtm);
            }
            $(".userInfo .addressShow .userInfoDetail[flag=available]").eq(0).click();
        }
    }
    $(".moreAddressDetail").hide();
    $(".thickdiv").hide();
});


//更多地址编辑
$(".moreAddressEdit").live("click", function () {
    var $editFrame = $(this).parent().parent();
    //是否有效地址的编辑
    var flag = $editFrame.attr("flag");
    var postId = $editFrame.attr("postid");
    $(".thickdiv").show().height($("body").outerHeight());
    $(".thickdiv").css("z-index", 10000003);
    var name = $editFrame.find(".usersName").text();
    var phone = $editFrame.find(".moreAddressPhone").text();
    var province = $editFrame.find(".moreAddressProvince").text();
    var city = $editFrame.find(".moreAddressCity").text();
    var county = $editFrame.find(".moreAddressCounty").text();
    var address = $editFrame.find(".moreAddressDe").text();

    //$(".moreAddressDetail").hide();
    //$("#addressNewAreaDetail").show();
    $("#addressNewAreaDetail").show().css("z-index", 10000004);

    $("#addressTop label").text("编辑地址");
    synchAddress(province, city, county, flag, postId);
    $("#consignee").val(name);
    $("#consigneePhone").val(phone);
    $("#consigneeAddress").val(address);
    $("#editPostId").val(postId);
    $(".AgBtn").addClass("AgBtnEdit");//控制编辑完成后操作
    return false;

});

//更多地址删除
$(".moreAddressDel").live("click", function () {
    var postId = $(this).parent().parent().attr("postid");
    $("#editPostId").val(postId);
    $(".deleBtn").show();
    $(".thickdiv").show().height($("body").outerHeight());
    $(".thickdiv").css("z-index", 10000003);
    return false;
});

/**
 * 更多地址   修改，删除  结束
 */

// 取消编辑框
$(".unagBtn").live("click", function () {
    $("#addressNewAreaDetail").find(".error,.correct").hide();
    $("#addressNewAreaDetail").hide();
    $(".AgBtn").removeClass("AgBtnNew AgBtnEdit");
    $("#addressTop label").text("添加新地址");
    if ($(".moreAddressDetail").is(":hidden")) {
        $(".thickdiv").hide();
    }
    $(".thickdiv").css("z-index", 10000001);

});
//关闭编辑框
$(".addressCloseO").live("click", function () {

    $("#addressNewAreaDetail").find(".error,.correct").hide();
    $("#addressNewAreaDetail").hide();
    $(".AgBtn").removeClass("AgBtnNew AgBtnEdit");
    $("#addressTop label").text("添加新地址");

    if ($(".moreAddressDetail").is(":hidden")) {
        $(".thickdiv").hide();
    }
    $(".thickdiv").css("z-index", 10000001);

});

// 取消删除框
$(".deleBtnunAgree").live("click", function () {
    if ($(".moreAddressDetail").is(":hidden")) {
        $(".thickdiv").hide();
    }
    $(".thickdiv").css("z-index", 10000001);
    $(".deleBtn").hide();
});
//关闭删除框
$(".deleBtnClose").live("click", function () {
    $(".deleBtn").hide();
    if ($(".moreAddressDetail").is(":hidden")) {
        $(".thickdiv").hide();
    }
    $(".thickdiv").css("z-index", 10000001);
});

$(".deleBtnClose1").click(function () {
    $(".deleBtn1").hide();
    $(".delUserInfo").removeClass("delUserInfo");
    $(".thickdiv").hide();
});


//关闭展示框
$(".moreAddressDetailClose").live("click", function () {
    $(".thickdiv").hide();
    $(".moreAddressDetail").hide();
});

//取消展示框
$(".unMoreAddressBtn").live("click", function () {
    $(".thickdiv").hide();
    $(".moreAddressDetail").hide();
});

/**
 * 传入后台JOSN信息 type: delete 删除地址  modify ：修改地址   add：新增地址
 *
 * @returns 收货地址
 */
function addressJSON(type) {
    var addAddress = {};
    if (type == "delete") {
        addAddress.PostId = $("#editPostId").val();
    }
    else {
        if (type == "modify") {
            addAddress.PostId = $("#editPostId").val();
        }
        addAddress.ReceiverName = $.trim($("#consignee").val());
        addAddress.MobilePhone = $.trim($("#consigneePhone").val());

        addAddress.ProvinceCode = $("#provinceId").val();
        addAddress.PROVINCE_NAME = $("#provinceId").find("option:selected").text();
        addAddress.ProvinceName = addAddress.PROVINCE_NAME;
        addAddress.EssProvinceCode = $("#provinceId").find("option:selected").attr("ESS_PROVINCE_CODE");

        addAddress.CityCode = $("#cityId").val();
        addAddress.CITY_NAME = $("#cityId").find("option:selected").text();
        addAddress.CityName = addAddress.CITY_NAME;
        addAddress.EssCityCode = $("#cityId").find("option:selected").attr("ESS_CITY_CODE");

        addAddress.DistrictCode = $("#areaId").val();
        addAddress.DISTRICT_NAME = $("#areaId").find("option:selected").text();
        addAddress.DistrictName = addAddress.DISTRICT_NAME;

        addAddress.PostCode = "";
        addAddress.PostAddr = $.trim($("#consigneeAddress").val());
        addAddress.Email = $.trim($("#email").val());
    }

    addAddress.merchantProvice = merchantProvice;
    addAddress.showType = isBigAreaGoods == "1" ? "bigArea" : portageJson.DIF_PLACE == "0" ? "noDis" : "yesDis";
    addAddress.bigAreaProvince = bigAreaProvince;
    return addAddress;
}


//隐藏的更多地址与页面展示选择的地址同步
function SynchSelected() {
    var $showSelected = $(".redSelectAction1")
    var postId = $showSelected.attr("postid");
    var $selected;
    for (var i = 0; i < $(".moreAddressDetailContent ul li").length; i++) {
        if (postId == $(".moreAddressDetailContent ul li").eq(i).attr("postid")) {
            $selected = $(".moreAddressDetailContent ul li").eq(i);
        }
    }
    if ($selected != undefined) {
        $selected.click();
    }
};


/**
 * 地址编辑框 省，市，地 的选中和校验
 */

/**
 * 选中省份
 */
function selectProvinceID(frameId) {
    var $frameId = $('#' + frameId);
    var provinceID = $frameId.find("#provinceId").val();
    if (provinceID == 0) {
        cityOptionClear(frameId);
        areaOptionClear(frameId);
        $frameId.find("#provinceId").val('0');

    } else if (provinceID != "" && provinceID != 0) {
        var provinceMap = allArea.PROVINCE_MAP;
        var cityList = provinceMap[provinceID];
        cityOptionClear(frameId);
        areaOptionClear(frameId);

        $.each(cityList, function (i, city) {
            $frameId.find("#cityId").append(
                "<option value=\"" + city.CITY_CODE + "\" ESS_CITY_CODE = \"" + city.ESS_CITY_CODE + "\">"
                + city.CITY_NAME + "</option>");
        });

    }
    $frameId.find("#cityId").val('0');
    $frameId.find("#areaId").val('0');
    var selectedProvince = $frameId.find("#provinceId :checked").text();
    if (frameId == 'addressNewAreaDetail') {
        $(".addressProvince").siblings(".seLectStSpan1").find(".seLectStLabel1").text(selectedProvince);
    }
    if (frameId == 'ziti') {
        $(".addressSelectTab tbody tr[class!=firstList]").remove();
        $("#addressSelectBtn").hide();
    }
};
/**
 * 校验省份
 */
function checkProvinceId(frameId) {
    var $frameId = $('#' + frameId);
    var provinceId = $frameId.find("#provinceId").val();
    if (provinceId == 0) {
        $frameId.find("#detailcityError").show().html("请选择省份");
        $frameId.find("#detailcityCorrect").hide();
        return false;
    }
    else {
        $frameId.find("#detailcityError").hide();
        $frameId.find("#detailcityCorrect").show();
    }
    return true;
};
/**
 * 选中城市
 */
function selCityID(frameId) {
    var $frameId = $('#' + frameId);
    var cityID = $frameId.find("#cityId").val();
    if (cityID == 0) {
        areaOptionClear(frameId);
        $frameId.find("#cityId").val('0');
        //$(".cityText").html('');
        //$(".cityTextDelimiter").hide();
    } else if (cityID != "" && cityID != 0) {
        var cityMap = allArea.CITY_MAP;
        var areaList = cityMap[cityID];
        areaOptionClear(frameId);
        $.each(areaList, function (i, area) {

            $frameId.find("#areaId").append("<option value=\"" + area.DISTRICT_CODE + "\">" + area.DISTRICT_NAME + "</option>");
        });
    }
    $frameId.find("#areaId").val('0');
    var selectedCity = $frameId.find("#cityId :checked").text();
    if (frameId == 'addressNewAreaDetail') {
        $(".addressCity").siblings(".seLectStSpan1").find(".seLectStLabel1").text(selectedCity);
    }
    if (frameId == 'ziti') {
        $(".addressSelectTab tbody tr[class!=firstList]").remove();
        $("#addressSelectBtn").hide();
    }
};
/**
 *校验城市
 */
function checkCityId(frameId) {
    var $frameId = $('#' + frameId);
    var cityId = $frameId.find("#cityId").val();
    if (cityId == 0) {
        $frameId.find("#detailcityError").show().html("请选择城市");
        $frameId.find("#detailcityCorrect").hide();
        return false;
    }
    else {
        $frameId.find("#detailcityError").hide();
        $frameId.find("#detailcityCorrect").show();
    }
    return true;
}
/**
 *校验区县
 */
function checkAreaId(frameId) {
    var $frameId = $('#' + frameId);
    var selectedArea = $frameId.find("#areaId :checked").text();

    var areaId = $frameId.find("#areaId").val();
    if (areaId == 0) {
        $frameId.find("#detailcityError").show().html("请选择区县");
        $frameId.find("#detailcityCorrect").hide();
        $(".addressCounty").siblings(".seLectStSpan1").find(".seLectStLabel1").text(selectedArea);
        return false;
    }
    else {
        $frameId.find("#detailcityError").hide();
        $frameId.find("#detailcityCorrect").show();
    }
    if (frameId == 'addressNewAreaDetail') {
        $(".addressCounty").siblings(".seLectStSpan1").find(".seLectStLabel1").text(selectedArea);
    }
    return true;
}

/**
 * 清空省份下拉数据
 */
function provinceOptionClear(frameId) {
    var $frameId = $('#' + frameId);
    $frameId.find("#provinceId").empty();
    $frameId.find("#provinceId").append("<option value=\"0\">省份/直辖市</option>");
    if (frameId = 'addressNewAreaDetail') {
        $(".addressProvince").siblings(".seLectStSpan1").find(".seLectStLabel1").text("省份/直辖市");
    }
}

/**
 * 清空城市下拉数据
 */
function cityOptionClear(frameId) {
    var $frameId = $('#' + frameId);
    $frameId.find("#cityId").empty();
    $frameId.find("#cityId").append("<option value=\"0\">--市--</option>");
    if (frameId = 'addressNewAreaDetail') {
        $(".addressCity").siblings(".seLectStSpan1").find(".seLectStLabel1").text("--市--");
    }
}

/**
 * 清空区县下拉数据
 */
function areaOptionClear(frameId) {
    var $frameId = $('#' + frameId);
    $frameId.find("#areaId").empty();
    $frameId.find("#areaId").append("<option value=\"0\">--县/区--</option>");
    if (frameId = 'addressNewAreaDetail') {
        $(".addressCounty").siblings(".seLectStSpan1").find(".seLectStLabel1").text("--县/区--");
    }

}


function sele(ele, elechild) {
    for (var i = 0; i < ele.find("option").length; i++) {
        if (ele.find("option").eq(i).text() == elechild) {
            $(".addressProvince").siblings(".seLectStSpan1").find(".seLectStLabel1").text(elechild);
        }
        selectProvinceID('addressNewAreaDetail');
        selCityID('addressNewAreaDetail');
    }
}


/**
 * 物流信息
 */
function initDeliveryDetail() {
    //if ($("#orderCartComLi li").length != 0) {
    //    //默认选中第一个物流公司
    //    $("#orderCartComLi li").eq(0).click();
    //}
    if ($("#distributionDayList li").length != 0) {
        //默认选中第一个送货时间
        $("#distributionDayList li").eq(0).addClass("redSelectAction");
    }
}

/**
 * 自提信息相关
 */
//选中自提点
$(".secondList").live("click", function () {
    var $li = $(".secondList");
    $li.each(function () {
        $li.find(".listOne input").attr("checked", false);

    });
    $(this).find(".listOne input").attr("checked", true);
    $(this).addClass("liChecked");
    $(this).siblings().removeClass("liChecked");
    //支付方式屏蔽
    if ($("#ziti #addressSelect .liChecked").find("input").attr("self_type") == "1") {
        $(".payment[payTypeName=货到付款]").hide();
        $("#unOnline").hide();
        if ($("#payMentEdit div:eq(0) li:visible").length != 0) {
            $("#payMentEdit div:eq(0) li:visible")[0].click();
        }
    } else {
        if (supCod == true) {
            $(".payment[payTypeName=货到付款]").show();
        }
        if ($("#payMentEdit div:eq(0) li:visible").length != 0) {
            $("#payMentEdit div:eq(0) li:visible")[0].click();
        }
    }
});


//自提点确认
$("#addressSelectBtn").live("click", function () {

    if (!checkContactName() || !checkContactMobel() || !checkProvinceId("ziti") || !checkCityId("ziti") || !checkAreaId("ziti") || !checkZitiAddress()) {
        return;
    }
    $("#ziti").hide();
    $("#zitiBtn").show();
    $("#zitiBtn #confirmFlag").val('confirm');
    var editName = $("#ztConsignee").val();
    var editPhone = $("#ztConsigneePhone").val();    //自提人联系电话
    var editProvince = $("#ziti #provinceId option:selected").text();
    var editCity = $("#ziti #cityId option:selected").text();
    var editCounty = $("#ziti #areaId option:selected").text();
    var editaddreee = $(".liChecked .listTwo").text();
    var editaddreeeDet = $(".liChecked .listThree").text();
    var editPhone1 = $(".liChecked .listFour").text(); //自提点联系电话
    var editRoute = $(".liChecked .listFive").text();
    $(".zitiBtnPerson").text(editName);
    $(".zitiBtnPhone").text(editPhone);
    $(".zitiBtnProvince").text(editProvince + '，');
    $(".zitiBtnCity").text(editCity + '，');
    $(".zitiBtnCounty").text(editCounty + '，');
    $(".zitiBtnAddress").text(editaddreee);
    $(".zitiBtnAddressDetail").text(editaddreeeDet);
    $(".zitiBtnPhone1").text(editPhone1);
    $(".zitiBtnRoute").text(editRoute);

    var specialProvince = ['11', '13', '31', '83'];
    if (specialProvince.indexOf($("#ziti #provinceId option:selected").attr('ess_province_code')) != -1) {
        $(".zitiBtnCity").text('');
    }
    //联动商品清单
    synchBillingInfo("ziti");
    checkOrderInputInfo();

});

//校验自提地址地址
function checkZitiAddress() {
    var flag = $(".addressSelectTab .liChecked").length == 1 ? true : false;
    //if (!flag) {
    //    $(".addressSelectTab tbody").append("<tr class='secondList'><td>请选择正确的自提点</td></tr>")
    //}
    return flag;
}


function initSelfFetchInfo() {
    var cityCode = $(".ztCity option:checked").attr('ess_city_code');
    var countyCode = $(".ztCounty option:checked").attr('value');
    $(".thickdiv").show().height($("body").outerHeight());
    $(".loadingText").text("请稍候......");
    $(".loadingStyle").show().center();
    $("#addressSelectBtn").hide();
    toGetSelfFetchInfo(merchantProvice, cityCode, countyCode, GoodsId);
}

function toGetSelfFetchInfo(merchantProvice, cityCode, countyCode, goodsId) {
    $.ajax({
        type: "post",
        url: selfFetchInfoUrl,
        dataType: "json",
        data: {merchantProvice: merchantProvice, cityCode: cityCode, countyCode: countyCode, goodsId: goodsId},
        success: function (root) {
            $(".loadingStyle").hide();
            $(".thickdiv").hide();
            $(".addressSelectTab tbody tr[class!=firstList]").remove();
            selfFetchRspJson = eval('(' + root + ')');
            if (selfFetchRspJson.selfFetchFlag != "1") {
                $(".addressSelectTab tbody tr[class!=firstList]").remove();
                var errorMessage = '<tr style=" height: 40px;"><td colspan="5">没有相应县 / 区的自提点</td></tr>';
                $(".addressSelectTab tbody").append(errorMessage);
                $("#addressSelectBtn").hide();
                $(".zitiTips").hide();
                return;
            } else {
                $(".addressSelectTab tbody tr[class!=firstList]").remove();
                for (var i = 0; i < selfFetchRspJson.selfFetchInfo.length; i++) {
                    var selfFetchInfoDetail = selfFetchRspJson.selfFetchInfo[i];
                    var telNum = isEmpty(selfFetchInfoDetail.CONTACT_NUMBER2) ? '暂无' : selfFetchInfoDetail.CONTACT_NUMBER2; //(isEmpty(selfFetchInfoDetail.CONTACT_NUMBER2) ? selfFetchInfoDetail.CONTACT_NUMBER1 : (selfFetchInfoDetail.CONTACT_NUMBER1 + '&nbsp;&nbsp;<br>' + selfFetchInfoDetail.CONTACT_NUMBER2));
                    var selfFectionName = selfFetchInfoDetail.SELFGET_NAME;
                    var selfFectionAddress = selfFetchInfoDetail.SELFGET_ADDRESS;
                    var trafficRoute = selfFetchInfoDetail.TRAFFIC_ROUTE;
                    var selfFetchHtml = '<tr class="secondList">' +
                        '<td class="listOne"><input ' + (i == 0 ? 'checked="checked"' : '') + ' type="radio" name="selfFetchAddr" value="' + selfFetchInfoDetail.ADDRESS_ID + '" self_type = "' + selfFetchInfoDetail.SELF_TYPE + '" id="radioBtn" name="add"></td>' +
                            //'<td class="listOne"><input ' + (i == 0 ? 'checked="checked"' : '') + ' id="radioBtn" type="radio" name="add" value="1" ></td> ' +
                        '<td class="listTwo">' + selfFectionName + '</td>' +
                        '<td class="listThree">' + selfFectionAddress + '</td>' +
                        '<td class="listFour">' + telNum + '</td>' +
                        '<td class="listFive">' + trafficRoute + '</td></tr>';

                    $(".addressSelectTab tbody").append(selfFetchHtml);
                }
                if ($(".secondList").length != 0) {
                    $(".secondList").eq(0).click();
                    $("#addressSelectBtn").show();
                }
                $(".zitiTips .context").text(selfFetchRspJson.selfFetchPrompt);
                $(".zitiTips").show();
            }
        }
    });
}

//自提点修改
$(".zitiBtnEdit").live("click", function () {
    $("#ziti").show();
    $("#zitiBtn").hide();
    //自提点确认标志置为为确认
    $("#zitiBtn #confirmFlag").val('unconfirm');
    checkOrderInputInfo();
});

/**
 * 送货地址和自提切换
 */

$(".kuaidi").live("click", function () {
    $("#kuaidi").show();
    $("#ziti").hide();
    $("#zitiBtn").hide();
    synchBillingInfo("post");
    changeDeliverFee();
    checkOrderInputInfo();
    $(".addressInformation .infoTap .bgA").animate({
        left: 0
    }, 300);
    $(".kuaidi span").css("color", "white");
    if ($(".addressInformation li[name=deliveryMode]").size() > 1) {
        $(".ziti span").css("color", "black");
    }
    if ($(".userInfoDetail[flag='available']").length != 0) {
        $(".userInfoDetail.redSelectAction1").click();
    }
});

$(".ziti").live("click", function () {
    //zitiInitOptionProvince();
    $("#kuaidi").hide();
    if ($("#zitiBtn #confirmFlag").val() == 'confirm') {
        synchBillingInfo("ziti");
        $("#zitiBtn").show();
        //自提点屏蔽货到付款
        if ($("#ziti #addressSelect .liChecked").find("input").attr("self_type") == "1") {
            $(".payment[payTypeName=货到付款]").hide();
            $("#unOnline").hide();
            if ($("#payMentEdit div:eq(0) li:visible").length != 0) {
                $("#payMentEdit div:eq(0) li:visible")[0].click();
            }
        }
    } else {
        $("#ziti").show();
    }
    changeDeliverFee();
    checkOrderInputInfo();
    //if (merchantProvice != 79) {
    //    $(".addressInformation .infoTap .bgA").animate({
    //        left: 130
    //    }, 300);
    //}
    $(".ziti span").css("color", "white");
    if ($(".addressInformation li[name=deliveryMode]").size() > 1) {
        $(".addressInformation .infoTap .bgA").animate({
            left: 130
        }, 300);
        $(".kuaidi span").css("color", "black");
    }
});


//自提切换时运费变化
function changeDeliverFee() {

    var fee = $(".addressInformation .choice").attr("fee");
    //var fee = $("input[name='deliveryMode']:checked").attr("fee");
    if (fee == undefined) {
        fee = 0;
    }
    if (isNotNeedPostAddr == "true") {
        fee = 0;
    }
    $("#freight").text(parseFloat(fee).toFixed(2));
    var billingResult = parseFloat(fee) + parseFloat($("#Price").text())
        - parseFloat($(".checkoutRight .couMoneyPay").html());
    $("#billingResult").text(billingResult.toFixed(2));
    $("#noUserVoucherTR td").click();
}


//同步清单中收货信息
function synchBillingInfo(flag) {
    var name = flag == "post" ? "收货人：" + $(".redSelectAction1 .consignee").text() : "自提人：" + $("#ztConsignee").val();
    var phone = flag == "post" ? $(".redSelectAction1 .consigneePhone").text() : $("#ztConsigneePhone").val();
    var address = flag == "post" ? $(".redSelectAction1 .consigneeAddress").text() : $(".liChecked .listThree").text();
    $(".submitMassageA .mleft").text(name);
    $(".submitMassageA .mmiddle").text(phone);
    $(".submitMassageA .mright").text(address);
}


//地市信息过长处理
$(".addressCity").live("mouseover", function (e) {
    var kinds = $(this).next().find("label").text();
    if (kinds.length >= 6) {
        var html = "<span id='Ptips'>" + kinds + "</span>";
        $("body").append(html);
        $("#Ptips").css({
            "left": 600 + "px",
            "top": 270 + "px"
        })
    }

});
$(".addressCity").live("mouseleave", function () {
    $("#Ptips").remove();
});

$(".addressCity option").mouseleave(function () {
    $("#Ptips").remove();
});
$(".addressCity").click(function () {
    $("#Ptips").remove();
});
$(".addressCity option").click(function () {
    $("#Ptips").remove();
});

$(".addressCounty").live("mouseover", function (e) {
    var kinds = $(this).next().find("label").text();
    if (kinds.length >= 6) {
        var html = "<span id='Ptips'>" + kinds + "</span>";
        $("body").append(html);
        $("#Ptips").css({
            "left": 710 + "px",
            "top": 270 + "px"
        })
    }


});
$(".addressCounty").live("mouseleave", function () {
    $("#Ptips").remove();
});

$(".addressCounty option").mouseleave(function () {
    $("#Ptips").remove();
});
$(".addressCounty").click(function () {
    $("#Ptips").remove();
});
$(".addressCounty option").click(function () {
    $("#Ptips").remove();
});


/**
 * 联系信息模块
 */
/*联系方式确定*/
$("#conInfoSave").live("click", function () {
    if (!checkContactInfoMobel() || !checkContactInfoName()) {
        return;
    }
    var conName = $("#conName").val();
    var conPhone = $("#conPhone").val();
    $("#preConInfo").hide();
    $("#arrConInfo").show();
    $("#conNameBtn").text(conName);
    $("#conPhoneBtn").text(conPhone);
    checkOrderInputInfo();
});
/*联系方式修改*/
$("#conInfoEdit").live("click", function () {
    var conName = $("#conNameBtn").text();
    var conPhone = $("#conPhoneBtn").text();
    $("#arrConInfo").hide();
    $("#preConInfo").show();
    $("#conName").val(conName);
    $("#conPhone").val(conPhone);
    checkOrderInputInfo();
});

/**
 * 宽带地址模块
 */
$("#installInfoSave").live("click", function () {
    if (!checkInstallName() || !checkInstallPhone()) {
        return;
    }
    var conName = $("#installName").val();
    var conPhone = $("#installPhone").val();
    $("#preInstallInfo").hide();
    $("#arrInstallInfo").show();
    $("#installNameBtn").text(conName);
    $("#installPhoneBtn").text(conPhone);
    checkOrderInputInfo();
});
/*装机联系人修改*/
$("#installInfoEdit").live("click", function () {
    var conName = $("#installNameBtn").text();
    var conPhone = $("#installPhoneBtn").text();
    $("#arrInstallInfo").hide();
    $("#preInstallInfo").show();
    $("#installName").val(conName);
    $("#installPhone").val(conPhone);
    checkOrderInputInfo();
});

/**
 * 实名认证后选中对应收获地址
 */
function initCheckedAddress(name) {
    if (name == null || name == '') {
        return;
    }
    var addressLists = $(".userInfo .addressShow .userInfoDetail[flag=available]");
    for (var i = 0; i < addressLists.length; i++) {
        if (addressLists.eq(i).find(".consignee").text() == name) {
            if (addressLists.eq(i).is(":hidden")) {
                addressLists.eq(i).remove();
                $(".userInfo .addressShow .userInfoDetail").eq(6).hide();
                $(".userInfo .addressShow").prepend(addressLists.eq(i).show());
                addressLists.eq(i).click();
                return;
            } else {
                addressLists.eq(i).click();
                return;
            }
        }
    }
}

function localAddressAdd() {
    var tempAddress = addressJSON("add");
    tempAddress.PostId = ++tempAddressNo + "";
    tempAddressInfo.unshift(tempAddress);
    SynchMoreAndShow(tempAddressInfo);
}
function localAddressModify() {
    var tempAddress = addressJSON("modify");
    $.each(tempAddressInfo, function (i, temp) {
        if (temp.PostId == tempAddress.PostId) {
            tempAddressInfo.splice(i, 1);
            return false;
        }
    });
    tempAddressInfo.unshift(tempAddress);
    SynchMoreAndShow(tempAddressInfo);
}
function localAddressDelete() {
    var PostId = $("#editPostId").val();
    $.each(tempAddressInfo, function (i, tempAddress) {
        if (tempAddress.PostId == PostId) {
            tempAddressInfo.splice(i, 1);
            return false;
        }
    });
    SynchMoreAndShow(tempAddressInfo);
}

//全国套餐老用户默认联系号码
function defaultContactPhone() {
    if (oldUserNumber != '') {
        $("#contactInfoTarget #conPhone").val(oldUserNumber).blur();
    }
}
//初始化展示配送自提
function deliverSelfFetchShow() {
    $(".addressInformation li[name=deliveryMode]").eq(0).click();
}




