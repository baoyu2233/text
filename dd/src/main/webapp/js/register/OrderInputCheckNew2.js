/**

 ******介绍******
 网厅 校验input输入框
 正确展示对勾，错误展示错误提示
 注意input框后面留下足够的空间

 ******使用******
 标准html：
 <label for="device-name">机主姓名</label>
 <input type="text" id="device-name" data-hasBlur="0"/>
 <div class="correct" style="display:none;"></div>
 <div class="error" style="display: none;"></div>

 标准js：
 //校验
 .delegate("#device-name", "keyup blur", function (e) {
    _CheckInput.checkAndShow($(this), e, "checkName");
 })

 标准css：
 label {
    float: left;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
 }
 .correct {
    float: left;
    width: 18px;
    height: 18px;
    margin-top: 4px;
    background: url(../images/fillout_order_info.png) -23px -2px;
 }
 .error {
    float: left;
    background: url(../images/scatch_cancel.gif) 3px 2px #ffeaea no-repeat;
    height: 19px;
    border: 1px solid #ff8080;
    padding: 3px 5px 0 25px;
    color: #c00;
 }

 **/


/**新版订单填写页  入网资料begin**/
var boolCheckCustInfo = true;
var boolNeedAddr = false;
var errorTip = '客户资料不合法';
var errorCardCityText = '为方便核对您的证件信息，请留下您的证件地址';

//点击确认入网资料时的校验
function confirmNetinCheck2(obj) {
    $(".confirmInfo").hide();
    var parentObj = $(obj).closest(".messageDetail");
    if (checkReceiverName2(parentObj.find(".name"))&& checkIdCard2(parentObj.find(".idCert"))) {
        checkCustInfo2(obj);
    }
}

//机主姓名验证
function checkReceiverName2(obj) {
    var nameVal = $(obj).val();
    $(obj).closest(".messageDetail").removeClass("customeMessageError");
    var nameErrorObj  = $(obj).closest(".messageDetail").find(".nameError");
    var nameCorrect = $(obj).closest(".messageDetail").find(".nameInfo .checkSuccess");
    if ($.trim(nameVal) == "" || $.trim(nameVal) == " 2-20个汉字") {
        nameErrorObj.show().find("span").text("请准确填写机主姓名");
        nameCorrect.hide();
        return false;
    }
    if (stringHelper.chineseLen($.trim(nameVal)) < 2) {
        nameErrorObj.show().find("span").text("机主姓名需不小于2个汉字");
        nameCorrect.hide();
        return false;
    }
    if (cnLength(nameVal) > 30) {
        nameErrorObj.show().find("span").text("机主姓名过长，请您最多输入15个汉字");
        nameCorrect.hide();
        return false;
    }
    var sentiveInfo = $.trim(stringHelper.checkScript(nameVal));
    if (sentiveInfo != null && sentiveInfo != "") {
        nameErrorObj.show().find("span").text("包含“" + sentiveInfo + "”非法字符");
        nameCorrect.hide();
        return false;
    }

    nameErrorObj.hide();
    nameCorrect.show();
    return true;
}

//校验身份证号码
function checkIdCard2(obj) {
    var varInput = $(obj).val();//input change to number
    var idCardError = $(obj).closest(".messageDetail").find(".idError");
    $(obj).closest(".messageDetail").removeClass("customeMessageError");
    var idCardCorrect =  $(obj).closest(".messageDetail").find(".idInfo .checkSuccess");
    //获取证件类型
    var sentiveInfo = $.trim(stringHelper.checkScript(varInput));
    if (sentiveInfo != null && sentiveInfo != "") {
        idCardError.show().find("span").text("包含“" + sentiveInfo + "”非法字符");
        idCardCorrect.hide();
        return false;
    }
    //判断是够为身份证
    var ret = "";
    if (varInput == "" || varInput == '18位有效的身份证号码') {
        ret = "身份证不能为空"
    } else {
        ret = checkIdcard2(varInput);
    }

    if (ret.indexOf("验证通过") == -1) {
        idCardError.show().find("span").text(ret);
        idCardCorrect.hide();
        return false;
    }
    idCardError.hide();
    idCardCorrect.show();
    return true;
}

function checkCustInfo2(obj) {
    $(".thickdiv").css("height", $("body").height());
    $(".thickdiv").show();
    $(".loadingText").text("请稍候......");
    $(".loadingStyle").show().center();
    var idErrorObj  = $(obj).closest(".messageDetail").find(".idError");
    var idCardCorrect =  $(obj).closest(".messageDetail").find(".idCert .checkSuccess");
    var idCardVal = $(obj).closest(".messageDetail").find(".idCert").val();
    var receiverNameVal = $(obj).closest(".messageDetail").find(".name").val();
    var goodsId = $("#identify").attr("goodsId");
    var psptTypeCode = "02";
    var CertAdress = $("#idCardCity").val();
    var phoneNum = $(obj).closest(".customeMessage").find(".phoneNumber span").text();
    var params = {
        'phoneNum':phoneNum,
        'certNum': idCardVal,
        'certName': receiverNameVal,
        'goodsId': goodsId,
        'psptTypeCode': psptTypeCode,
        'CertAdress': CertAdress,
        'goodsId': goodsId
    };
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: checkCustInfoUrl4GroupBuy,
            data: params,
            async: false,
            success: function (retMessage) {
                if (retMessage.code != '0000'&&(TMPL_ID!='60000031'||(retMessage.code != '0203'&&TMPL_ID=='60000031'))) {
                    errorTip = retMessage.msg;
                    $(idErrorObj).show().find("span").text(errorTip);
                    idCardCorrect.hide();
                    $(".thickdiv").hide();
                    $(".loadingStyle").hide();
                    boolCheckCustInfo = false;
                    return false;
                }
                $(obj).closest(".customeMessage").removeClass("errorAll");
                checkOrderInputInfo();
                setUserAmountInfo(obj,retMessage.userAmount);
                checkNetWorkSuccess2(params,obj);
                return true;
            },
            error: function () {
                boolCheckCustInfo = true;
                boolNeedAddr = true;
                $(obj).closest(".customeMessage").removeClass("errorAll");
                $(".thickdiv").hide(); 
                $(".loadingStyle").hide();
                $("#invoiceTitle").text($("#userName").val());
                setUserAmountInfo(obj,0);
                checkOrderInputInfo();
                checkNetWorkSuccess2(params,obj);
                //initProtocol();
                return true;
            }
        });
    }, 300);

}

//flag:false来源于证件类型切换的校验，若地址为空不校验地址 true:其余的均为默认校验

//function checkCustInfoFinally2(errorTip,obj) {
//    $(obj).show().find("span").text(errorTip);
//    $("#idCardCorrect").hide();
//    $(".thickdiv").hide();
//    $(".loadingStyle").hide();
//    boolCheckCustInfo = false;
//}

//证件信息校验成功页面变化
function checkNetWorkSuccess2(params,obj) {
    $("#infoBoxUnBtn").hide();
    $("#infoBoxBtn").show();
    $("#idCardCorrect,#receiverNameCorrect").show();
    $("#idCardError,#receiverNameError").hide();
    var parentobj = $(obj).closest(".customeMessage");
    parentobj.find(".identifyName span").text(params.certName);
    parentobj.find(".identifyCard span").text(params.certNum);
    showCardInfo(obj);

    $(".infoBoxBtn").hide();
    $(".infoBoxBtn").closest(".table").hide();
    isNeedReloadPro = "true";
    isConfirmedNetWork = "true";
    var networkDataTemp = {};
    networkDataTemp.hostName = params.certName;
    networkDataTemp.idCard = params.certNum;
    networkDataTemp.psptTypeCode = params.psptTypeCode;
    networkDataTemp.idCardAddress = params.CertAdress;
    networkDataTemp.telNumber = parentobj.find(".phoneNumber span").text();
    networkDataList.push(networkDataTemp);
};
function checkIdcard2(idcard) {
    var Errors = new Array(
        "验证通过",
        "请输入18位身份证号",
        "身份证号码出生日期超出范围或含有非法字符",
        "身份证号码校验错误",
        "身份证地区非法"
    );
    var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    }
    var idcard, Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    //地区检验 
    if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
    //身份号码位数及格式检验 
    switch (idcard.length) {
        /*case 15:
         if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
         ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
         } else {
         ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
         }
         if (ereg.test(idcard)) return Errors[0];
         else return Errors[2];
         break;*/
        case 18:
            //18位身份号码检测 
            //出生日期的合法性检查 
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式 
            } else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式 
            }
            if (ereg.test(idcard)) {//测试出生日期的合法性 
                //计算校验位 
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                + parseInt(idcard_array[7]) * 1
                + parseInt(idcard_array[8]) * 6
                + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1); //判断校验位 
                if (M == idcard_array[17]) return Errors[0]; //检测ID的校验位 
                else return Errors[3];
            }
            else return Errors[2];
            break;
        default:
            return Errors[1];
            break;
    }
}


/**
 *
 *
 */

/**
 * 字符串校验工具类
 */
/*var stringHelper = {
    //过滤敏感字符 正则表达式
    checkScript: function (text) {
        var r = new RegExp("<|>|script|alert|{|}|#|\\$|'|\"|:|;|&|\\*|@@|%|\\^|\\?", 'g');
        if (text != undefined) {
            var arr = text.match(r);
            return this.uniqueness(arr);
        }
    },
    //去重复 方法
    uniqueness: function (a) {
        var toObject = function (a) {

            var o = {};
            for (var i = 0, j = a.length; i < j; i = i + 1) {
                o[a[i]] = true;
            }
            return o;
        };
        var keys = function (o) {
            var a = [], i;
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    a.push(i);
                }
            }
            return a;
        };

        if (a == null) {
            return null;
        }
        return keys(toObject(a));
    },
    //判断汉字个数
    chineseLen: function (txt) {
        var n = 0;
        for (var i = 0, len = txt.length; i < len; i++) {
            if (/[\u4E00-\u9FA5]/.test(txt.charAt(i)))n++;
        }
        return n;
    }
};

*/
/**
 *  返回字符串字节数
 */
function cnLength(Str) {
    var escStr = escape(Str);
    var numI = 0;
    var escStrlen = escStr.length;
    for (var i = 0; i < escStrlen; i++)
        if (escStr.charAt(i) == '%')
            if (escStr.charAt(++i) == 'u')
                numI++;
    return Str.length + numI;
}




/*//统一提交验证一证五户
function confirmAllNetinCheck(){

    var checkTag = true;
    var msgBoxDiv = $(".customeMessage");
    for (var i = 0; i < msgBoxDiv.length; i++) {
        var msgBox = $(".customeMessage").eq(i);
        msgBox.removeClass("customeMessageError");
        if(msgBox.find(".identifyMessage:visible").length<1){
            checkReceiverName2($(msgBox).find(".name"));
            checkIdCard2($(msgBox).find(".idCert"));
            msgBox.addClass('errorAll');
        }

        if($(".errorAll:visible").length>=1) return false;
        if($(".error:visible").length>=1) return false;
        var na = msgBox.find(".identifyName span").text();
        var num = msgBox.find(".identifyCard span").text();
        if (na === '' || num === '') {
            msgBox.addClass('errorAll');
            checkTag = false;
        }
    }

    if(!checkTag){
        return false;
    }

    var allCheckOK = true;
    $(".errorTips").hide();
    $(".customeMessage").each(function(){
        var userAmout = $(this).find(".identifyCard").next().val();
        var identifyCard = $(this).find(".identifyCard span").text();
        var allSameIDAmout = $(".messageBox").find(".identifyCard span:contains('"+identifyCard+"')").length;
        if(parseInt(userAmout)+parseInt(allSameIDAmout)>5){
            allCheckOK = false;
            $(".normalTips").hide();
            $(".errorTips").show();
            $(".errorTips span").text(identifyCard);
            $(this).addClass('errorAll');
            return false;
        }
    });

    if(allCheckOK){
        $("#netNotice2").hide();
        $(".infoTips").hide();
        $(".infoOK").show();
        $(".normalTips").show();
        checkOrderInputInfo();
    }

}
*/
/*证件已开户数据*/
/*function setUserAmountInfo(obj,userAmount){
    var identifyCardObj = $(obj).closest(".customeMessage").find(".identifyCard");
    identifyCardObj.next().val(userAmount);
    $(".thickdiv").hide();
    $(".loadingStyle").hide();
}*/

//新入网信息
/*$(".identifyMessage").live('click',function(){
    $(this).hide();
    $(this).removeClass("errorAll");
    $(this).next('.messageDetail').show();
    $(".infoTips").show();
    $(".infoOK").hide();
    $("#checkInfoNotice,#netNotice2").show();
    $("#orderSubmitNewBtn").removeClass("hasChecked").addClass("unChecked");
});

function showCardInfo(obj){
    const name = $(obj).parent().find($(".name")).val();
    const number = $(obj).parent().find($(".number")).val();
    $(obj).parent().hide();
    $(obj).parent().prev().find($(".identifyName span")).empty().text(name);
    $(obj).parent().prev().find($(".identifyCard span")).empty().text(number);
    $(obj).parent().prev().show();
}*/

/*function initMultiProtocol(){

    $(".thickdiv").show().height($("body").outerHeight());
    $(".thickdiv").css("height", $("body").height());
    $(".thickdiv").show();
    $(".loadingText").text("请稍候......");
    $(".loadingStyle").show().center();

    var msgBoxDiv = $(".customeMessage");
    for (var i = 0; i < msgBoxDiv.length; i++) {
        var msgBox = $(".customeMessage").eq(i);
        if(msgBox.find(".identifyMessage:visible").length<1){
            checkReceiverName2($(msgBox).find(".name"));
            checkIdCard2($(msgBox).find(".idCert"));
        }
        if($(".error:visible").length>=1) return false;

        // 准备订单填写页出现的电子协议数据
        protocolParam.custTag = _custTag;

        protocolParam.custName = $.trim($(msgBox).find(".name").val()).replace(/▪/g, "·").replace(/•/g, "·").replace(/●/g, "·")
                .replace(/·/g, "·").replace(/\./g, "·").replace(/。/g, "·")
                .replace(/`/g, "·").replace(/,/g, "·").replace(/，/g, "·")
                .replace(/？/g, "·").replace(/\?/g, "·");
        protocolParam.psptTypeCode = $.trim($(msgBox).find(".idCert").val());
        protocolParam.custAddress = $("#idCardCity").val();
        protocolParam.number = $(msgBox).find(".phoneNumber span").text();


        protocolParam.psptType = '身份证';
        protocolParam.fstfeetype = "A000011V000003";
        protocolParam.cardtype = '';
        protocolParam.isGroupCardFlag = '1';
        $.ajax({
            type: "post",
            url: queryNetProtocol,
            data: protocolParam,
            async: false,
            success: function (ret) {
                //isQueryProtocol = false;
                if($(".agree_main").find(".middle").length>=1){
                    $(".agree_main2").html(ret)
                    $(".agree_main").find(".middle:last").after($(".agree_main2").find(".middle"));
                    $(".agree_main2").empty();
                }else{
                    $(".agree_main").html(ret);
                }
            }
        });
    }
    isNeedReloadPro = 'false';
    $(".loadingStyle").hide();
    $(".agree_main").center().show();
}*/

//错误提示过长鼠标展示隐藏
/*$(".nameError,.idError").live("mouseover",function(){
    $(this).attr("title",$(this).find("span").text());
});*/


/**新版订单填写页  入网资料end**/