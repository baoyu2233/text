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

var _CheckShow = (function () {
    var retFn, Check;
    retFn = {

        //校验方法对应的错误提示语
        errorShowMap: {
            checkName: {
                patternError: "姓名至少为2个汉字",
                nullError: "姓名不能为空",
                checkNull: true
            },
            checkIdCard: {
                patternError: "身份证号码错误",
                nullError: "身份证号不能为空",
                checkNull: true
            },
            checkAddr: {
                patternError: "地址长度过短",
                nullError: "地址不能为空",
                checkNull: true
            },
            checkPhone: {
                patternError: "手机号格式错误",
                nullError: "手机号不能为空",
                checkNull: true
            },
            checkEmail: {
                patternError: "邮箱格式错误",
                nullError: "邮箱不能为空",
                checkNull: true
            },
            checkPostalCode: {
                patternError: "邮政编码只能为6位数字",
                nullError: "邮编不能为空",
                checkNull: true
            }
        },

        //用户输入校验逻辑
        //$t：$(this) this为input输入框
        //e：触发的事件对象
        //checkArr：数组/字符串（包含："checkName","checkIdCard","checkAddr","checkPhone"）
        //          对应分别校验：姓名、身份证号、地址、电话号码
        checkAndShow: function ($t, e, checkArr) {
            var val = $t.val(), that = this;

            //校验内容是否符合要求
            var checkRet = that._check(checkArr, val), bl = checkRet.check;

            //在第一次blur事件触发之前，keyup事件被触发后不进行错误提示
            var type = e.type, hasBlur = $t.attr("data-hasBlur") == "1";
            if (type == "blur" || type == "focusout") {
                $t.attr("data-hasBlur", "1");
            }
            if (type == "keyup" && !hasBlur && !bl) {
                $t.siblings(".correct").hide();
                return;
            }
            //根据校验结果，展示错误提示
            that._showError(checkRet, $t);
        },

        _check: function (checkArr, val) {
            var bl = true, i = 0, errorObj = {}, errorStr = "", checkFun, that = this;
            checkArr = checkArr || [];
            if (!$.isArray(checkArr)) {
                checkArr = [checkArr];
            }
            for (; i < checkArr.length; i++) {
                checkFun = checkArr[i];
                bl = bl && Check[checkFun](val);
                if (!bl) {
                    errorObj = that.errorShowMap[checkFun];
                    errorStr = errorObj.patternError;
                }
            }
            if (val == "" && !bl && errorObj.checkNull) {
                errorStr = errorObj.nullError;
            }
            return {check: bl, error: errorStr};
        },

        //展示错误提示
        _showError: function (checkRet, $t) {
            var check = checkRet.check, error = checkRet.error;
            if (check) {
                $t.siblings(".correct").show();
                $t.siblings(".error").hide();
            } else {
                $t.siblings(".error").text(error).show();
                $t.siblings(".correct").hide();
            }
        }
    };

    //校验方法（可扩展）
    Check = {
        // 姓名验证
        checkName: function (name) {
            return cnLength($.trim(name)) <= 50 && cnLength($.trim(name)) >= 4;
        },
        // 身份证号验证
        checkIdCard: function (idCardVal) {
            return IdCardValidate(idCardVal);
        },
        checkAddr: function (addr) {
            return cnLength($.trim(addr)) >= 10;
        },
        // 手机号码验证
        checkPhone: function (phoneNum) {
            return /^(\d{11})$/.test(phoneNum);
        },
        // 邮箱验证
        checkEmail: function(email){
            return /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(email);
        },
        // 邮编验证
        checkPostalCode: function(postalCode){
            return /^\d{6}$/.test(postalCode);
        }
    };

    //校验身份证号码
    function IdCardValidate(idcard) {
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
        };
        var idcard, Y, JYM;
        var S, M;
        var idcard_array = new Array();
        idcard_array = idcard.split("");
        //地区检验
        if (area[parseInt(idcard.substr(0, 2))] == null) return false;
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
                    if (M == idcard_array[17]) return true; //检测ID的校验位
                    else return false;
                }
                else return false;
                break;
            default:
                return false;
                break;
        }
    }

    //计算字符串的个数
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


    return retFn;

})();

/**新版订单填写页  入网资料begin**/
var boolCheckCustInfo = true;
var boolNeedAddr = false;
var errorTip = '客户资料不合法';
var errorCardCityText = '为方便核对您的证件信息，请留下您的证件地址';
//点击确认入网资料时的校验
function confirmNetinCheck() {
    $(".confirmInfo").hide();
    if (checkReceiverName()&& checkIdCard() && checkIdCardCity(boolNeedAddr) /*&& checkedNetworkProtocol()*/) {
        /*if (!$(".upload-after").hasClass("uploadBtnLink-clicked") && ($("#uploadTokenUuid").val() == "" || $("#uploadTokenUuid").val() == null) && merchantProvice != '89') {
            $(".thickdiv").css({"z-index": 10000001});
            $(".thickdiv").css("height", $("body").height());
            $(".thickdiv").show();
            $("#outIdLayer").show().center();
            picIframe.window.$("#tipsLayer").show().center();
            $(".upload-after").addClass("uploadBtnLink-clicked").removeClass("uploadBtnLink");
            return;
        }*/
        //清空已经上传的照片
        $(".upload-after").show();
        $(".upload-now").text("立即上传");
        $(".hasSend").hide();
        $("#uploadTokenUuid").attr("state", "1");
        $("#uploadTokenUuid").val("");
        $("#uploadTokenUuidTemp").attr("state", "1");
        $("#uploadTokenUuidTemp").val("");
        $.publish("/CertPhoto/unConfirmed", []);
        checkCustInfo(checkNetwork);
    }
}

//机主姓名验证
function checkReceiverName() {
    var name = document.getElementById("userName");
    if ($.trim(name.value) == "" || $.trim(name.value) == "2-20个汉字") {
        $("#receiverNameError").show().html("请准确填写机主姓名");
        $("#receiverNameCorrect").hide();
        return false;
    }
    if (stringHelper.chineseLen($.trim(name.value)) < 2) {
        $("#receiverNameError").show().html("机主姓名需不小于2个汉字");
        $("#receiverNameCorrect").hide();
        return false;
    }
    if (cnLength(name.value) > 40) {
        $("#receiverNameError").show().html("机主姓名过长，请您最多输入20个汉字");
        $("#receiverNameCorrect").hide();
        return false;
    }
    var sentiveInfo = $.trim(stringHelper.checkScript(name.value));
    if (sentiveInfo != null && sentiveInfo != "") {
        $("#receiverNameError").show().html("包含“" + sentiveInfo + "”非法字符");
        $("#receiverNameCorrect").hide();
        return false;
    }

    $("#receiverNameError").hide();
    $("#receiverNameCorrect").show();
    return true;
}

//校验身份证号码
function checkIdCard() {
    var varInput = $("#identify").val();//input change to number
    var idCardError = $("#idCardError");
    var idCardCorrect = $("#idCardCorrect");
    //获取证件类型
    var sentiveInfo = $.trim(stringHelper.checkScript(varInput));
    if (sentiveInfo != null && sentiveInfo != "") {
        idCardError.show().html("包含“" + sentiveInfo + "”非法字符");
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
        idCardError.show().html(ret);
        idCardCorrect.hide();
        return false;
    }
    idCardError.hide();
    idCardCorrect.show();
    return true;
}

function checkCustInfo(fn) {
    $(".thickdiv").css("height", $("body").height());
    $(".thickdiv").show();
    $(".loadingText").text("请稍候......");
    $(".loadingStyle").show().center();
    var idCardVal = $("#identify").val();
    var receiverNameVal = $("#userName").val();

    receiverNameVal= receiverNameVal.replace(/▪/g, "·").replace(/•/g, "·").replace(/●/g, "·")
        .replace(/·/g, "·").replace(/\./g, "·").replace(/。/g, "·")
        .replace(/`/g, "·").replace(/,/g, "·").replace(/，/g, "·")
        .replace(/？/g, "·").replace(/\?/g, "·");
    ;

    var psptTypeCode = "02";
    var CertAdress = $("#idCardCity").val();
    var provinceCode = $("#identify").attr("province");
    var cityCode = $("#identify").attr("city");
    var goodsId = $("#identify").attr("goodsId");
    var tmplId = $("#identify").attr("tmplId");
    //var identifyType = $("#identifyType input[name='identifyType']:checked").val() == "XS" ? "XS" : "XX";
    var params = {
        'psptTypeCode': psptTypeCode,
        'idCardVal': idCardVal,
        'receiverNameVal': receiverNameVal,
        'provinceCode': provinceCode,
        'cityCode': cityCode,
        'CertAdress': CertAdress,
        'goodsId': goodsId,
        'tmplId': tmplId,
        'bizType': 'normal',
        'opeSysType': opeSysType
    };
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: checkCustInfoUrl,
            data: params,
            async: false,
            success: function (retMessage) {
                if (retMessage == '0200') {
                    errorTip = '证件格式不合法';
                    $("#idCardError").show().html(errorTip);
                    $("#idCardCorrect").hide();
                    $(".thickdiv").hide();
                    $(".loadingStyle").hide();
                    boolCheckCustInfo = false;
                    return false;
                } else if (retMessage == '0201') {
                    errorTip = '证件格式不合法';
                    $("#idCardError").show().html(errorTip);
                    $("#idCardCorrect").hide();
                    $(".thickdiv").hide();
                    $(".loadingStyle").hide();
                    boolCheckCustInfo = false;
                    return false;
                }
                else if (retMessage == '0202') {
                    errorTip = '证件格式不合法';
                    $("#idCardError").show().html(errorTip);
                    $("#idCardCorrect").hide();
                    $(".thickdiv").hide();
                    $(".loadingStyle").hide();
                    boolCheckCustInfo = false;
                    return false;
                }
                else if (retMessage == '0203' || retMessage == '9999') {
                    errorTip = '很抱歉，您的证件号码为黑名单，暂不能办理';
                    $("#idCardError").show().html(errorTip);
                    $("#idCardCorrect").hide();
                    $(".thickdiv").hide();
                    $(".loadingStyle").hide();
                    boolCheckCustInfo = false;
                    return false;
                }
                else if (retMessage == '0204') {
                    errorTip = '很抱歉，您的证件号码办理的联通号码数过多，暂不能办理';
                    $("#idCardError").show().html(errorTip);
                    $("#idCardCorrect").hide();
                    $(".thickdiv").hide();
                    $(".loadingStyle").hide();
                    boolCheckCustInfo = false;
                    return false;
                }
                else if (retMessage == '0205') {
                    errorTip = '很抱歉，您的证件号码下有联通号码为欠费，暂不能办理';
                    $("#idCardError").show().html(errorTip);
                    $("#idCardCorrect").hide();
                    $(".thickdiv").hide();
                    $(".loadingStyle").hide();
                    boolCheckCustInfo = false;
                    return false;
                }
                else if (retMessage == '0304') {
                    errorTip = '非常抱歉，您的证件下办理的号码数已超过最大限制，暂不能办理该业务';
                    $("#idCardError").show().html(errorTip);
                    $("#idCardCorrect").hide();
                    $(".thickdiv").hide();
                    $(".loadingStyle").hide();
                    boolCheckCustInfo = false;
                    return false;
                }
                else if (retMessage == '01') {
                    errorTip = '非常抱歉，您的入网证件未在公安系统登记，可到附近营业厅办理，您可以拨打10010了解详情';
                    checkCustInfoFinally(errorTip);
                    return false;
                } else if (retMessage == '02') {
                    errorTip = '姓名与证件号码不一致，请重新输入';
                    checkCustInfoFinally(errorTip);
                    return false;
                } else if (retMessage == '03' || retMessage == '04') {
                    errorTip = '非常抱歉，公安系统暂时关闭，暂时无法为您提供服务，您可以拨打10010了解详情';
                    checkCustInfoFinally(errorTip);
                    return false;
                } else if (retMessage == '99') {
                    errorTip = '尊敬的客户目前办理的用户较多，暂时无法为您提供服务，请稍后再试';
                    checkCustInfoFinally(errorTip);
                    return false;
                }
                boolCheckCustInfo = true;
                fn && fn();
                //证件校验完成页面变化
                checkNetWorkSuccess(params);
                $(".thickdiv").hide();
                $(".loadingStyle").hide();
                $("#invoiceTitle").text($("#userName").val());
                //initProtocol();
                return true;
            },
            error: function () {
                boolCheckCustInfo = true;
                boolNeedAddr = true;
                $(".thickdiv").hide(); 
                $(".loadingStyle").hide();
                $("#invoiceTitle").text($("#userName").val());
                fn && fn();
                checkNetWorkSuccess(params);
                //initProtocol();
                return true;
            }
        });
    }, 200);

}

function checkNetwork() {
    var hasAddr = boolNeedAddr;
    var mobilePhone = $("#mobilePhone").val();
    if (mobilePhone == 'YES') {
        return true;
    }
    if (!checkReceiverName()) return false;
    if (!checkIdCard()) return false;
    if (!checkIdCardCity(hasAddr)) return false;
    if (!checkCustInfoFun()) return false;
    return true;
}

//flag:false来源于证件类型切换的校验，若地址为空不校验地址 true:其余的均为默认校验
function checkIdCardCity(flag) {
    var idCardValue = $("#idCardCity").val();
    if (!flag && !boolNeedAddr) {
        return true;
    } else if (idCardValue == "" || $.trim(idCardValue).length <= 0) {
        $("#idCardCityError").show().html(errorCardCityText);
        $("#idCardCityCorrect").hide();
        return false;
        //if(boolNeedAddr)
    }

    var name = document.getElementById("idCardCity");

    if ((name.value == "" || $.trim(name.value).length <= 0))
        return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.IdCardNullMsg, "idCardCityError", "idCardCityCorrect", "idCardCity");

    var selectOptionValue = "02";
    var num = selectOptionValue == "11" ? 3 : (selectOptionValue == "08" ? 2 : 8);

    if (!CheckInfoUtils.checkChineseLenContain(idCardValue, num))
        return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.inCorrectIdCardFormError(num), "idCardCityError", "idCardCityCorrect", "idCardCity");

    var sentiveInfo = $.trim(stringHelper.checkScript(name.value));
    if (sentiveInfo != null && sentiveInfo != "")
        return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.hasSentiveInfoMsgError(sentiveInfo), "idCardCityError", "idCardCityCorrect", "idCardCity");

    if (cnLength(name.value) > 100)
        return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.IdCardBeyondMsg, "idCardCityError", "idCardCityCorrect", "idCardCity");

    $("#idCardCityError").hide();
    $("#idCardCityCorrect").show();
    return true;

}
function checkCustInfoFun() {
    if (boolCheckCustInfo) {
        return true;
    } else {
        $("#idCardError").show().html(errorTip);
        $("#idCardCorrect").hide();
        return false;
    }
}
function checkCustInfoFinally(errorTip) {
    $("#idCardError").show().html(errorTip);
    $("#idCardCorrect").hide();
    $(".thickdiv").hide();
    $(".loadingStyle").hide();
    boolCheckCustInfo = false;
}
//校验是否同意入网协议和购前须知
function checkedNetworkProtocol() {
    if ($(".agreementBtn").length > 0 && !$("#networkProtocol").attr("checked")) {
        $("#networkProtocolError").show().html("请同意入网协议");
        return false;
    }
    $("#networkProtocolError").hide();
    return true;
};

//证件信息校验成功页面变化
function checkNetWorkSuccess(params) {
    $("#infoBoxUnBtn").hide();
    $("#infoBoxBtn").show();
    $("#idCardCorrect,#receiverNameCorrect").show();
    $("#idCardError,#receiverNameError").hide();
    var name = $("#userName").val();
    name = name.replace(/▪/g, "·").replace(/•/g, "·").replace(/●/g, "·")
        .replace(/·/g, "·").replace(/\./g, "·").replace(/。/g, "·")
        .replace(/`/g, "·").replace(/,/g, "·").replace(/，/g, "·")
        .replace(/？/g, "·").replace(/\?/g, "·");
    ;


    var identify = $("#identify").val();
    $(".inforIden").text(identify);
    $(".inforname").text(name);
    $(".infoBoxBtn").hide();
    $(".infoBoxBtn").closest(".table").hide();
    isNeedReloadPro = "true";
    isConfirmedNetWork = "true";
    networkData.hostName = params.receiverNameVal;
    networkData.idCard = params.idCardVal;
    networkData.psptTypeCode = params.psptTypeCode;
    networkData.idCardAddress = params.CertAdress;
    checkOrderInputInfo();
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
var stringHelper = {
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


//自提校验联系人姓名
function checkContactName() {
    var name = document.getElementById("ztConsignee");
    if ($.trim(name.value) == "" || $.trim(name.value) == " 2-20个汉字") {
        $("#ztContactNameError").show().html("请准确填写联系人姓名");
        $("#ztContactNameCorrect").hide();
        //checkFocus("contactName");
        return false;
    }
    if (stringHelper.chineseLen($.trim(name.value)) < 2) {
        $("#ztContactNameError").show().html("联系人姓名需不小于2个汉字");
        $("#ztContactNameCorrect").hide();
        //checkFocus("contactName");
        return false;
    }
    if (cnLength(name.value) > 40) {
        $("#ztContactNameError").show().html("联系人姓名过长，请您最多输入20个汉字");
        $("#ztContactNameCorrect").hide();
        //checkFocus("contactName");
        return false;
    }
    var sentiveInfo = $.trim(stringHelper.checkScript(name.value));
    if (sentiveInfo != null && sentiveInfo != "") {
        $("#ztContactNameError").show().html("包含“" + sentiveInfo + "”非法字符");
        $("#ztContactNameCorrect").hide();
        //checkFocus("contactName");
        return false;
    }

    $("#ztContactNameError").hide();
    /*$("#contactNameCorrect").show();*/
    return true;
};

//自提校验联系方式
function checkContactMobel() {
    var mobile = document.getElementById("ztConsigneePhone");
    if ($.trim(mobile.value) == "" || $.trim(mobile.value) == "请填写手机号码") {
        $("#ztContactMobelError").show();
        $("#ztContactMobelError").html("手机号码不能为空");
        $("#ztContactMobelCorrect").hide();
        //checkFocus("contactMobile");
        return false;
    }
    if (!checkMobiles($.trim(mobile.value))) {
        $("#ztContactMobelError").show();
        $("#ztContactMobelError").html("手机格式不正确");
        $("#ztContactMobelCorrect").hide();
        //checkFocus("contactMobile");
        return false;
    }
    $("#ztContactMobelCorrect").show();
    $("#ztContactMobelError").hide();
    return true;
};


/**
 * 联系信息校验
 */
function checkContactInfoName() {
    var name = document.getElementById("conName");
    if ($.trim(name.value) == "" || $.trim(name.value) == " 2-20个汉字") {
        $("#contactNameError").show().html("请准确填写联系人姓名");
        $("#contactNameCorrect").hide();
        //checkFocus("contactName");
        return false;
    }
    if (stringHelper.chineseLen($.trim(name.value)) < 2) {
        $("#contactNameError").show().html("联系人姓名需不小于2个汉字");
        $("#contactNameCorrect").hide();
        //checkFocus("contactName");
        return false;
    }
    if (cnLength(name.value) > 40) {
        $("#contactNameError").show().html("联系人姓名过长，请您最多输入20个汉字");
        $("#contactNameCorrect").hide();
        //checkFocus("contactName");
        return false;
    }
    var sentiveInfo = $.trim(stringHelper.checkScript(name.value));
    if (sentiveInfo != null && sentiveInfo != "") {
        $("#contactNameError").show().html("包含“" + sentiveInfo + "”非法字符");
        $("#contactNameCorrect").hide();
        //checkFocus("contactName");
        return false;
    }

    $("#contactNameError").hide();
    /*$("#contactNameCorrect").show();*/
    return true;
};


function checkContactInfoMobel() {
    var mobile = document.getElementById("conPhone");
    if ($.trim(mobile.value) == "" || $.trim(mobile.value) == "请填写手机号码") {
        $("#contactMobelError").show();
        $("#contactMobelError").html("手机号码不能为空");
        $("#contactMobelCorrect").hide();
        //checkFocus("contactMobile");
        return false;
    }
    if (!checkMobiles($.trim(mobile.value))) {
        $("#contactMobelError").show();
        $("#contactMobelError").html("手机格式不正确");
        $("#contactMobelCorrect").hide();
        //checkFocus("contactMobile");
        return false;
    }
    $("#contactMobelCorrect").show();
    $("#contactMobelError").hide();
    return true;
};


/**
 * 智慧沃家装机地址
 */
function checkInstallNameEasy(){
    if(document.getElementById("installName")){
        var name = document.getElementById("installName");
        if ($.trim(name.value) == "" || $.trim(name.value) == " 2-20个汉字") return false;
        if (stringHelper.chineseLen($.trim(name.value)) < 2) return false;
        if (cnLength(name.value) > 30) return false;
        var sentiveInfo = $.trim(stringHelper.checkScript(name.value));
        if (sentiveInfo != null && sentiveInfo != "")return false;
        return true;
    }else{
        return true;
    }
}
function checkInstallName() {
    if(document.getElementById("installName")){
        var name = document.getElementById("installName");
        if ($.trim(name.value) == "" || $.trim(name.value) == " 2-20个汉字") {
            $("#installNameError").show().html("请准确填写联系人姓名");
            $("#installNameCorrect").hide();
            //checkFocus("contactName");
            return false;
        }
        if (stringHelper.chineseLen($.trim(name.value)) < 2) {
            $("#installNameError").show().html("联系人姓名需不小于2个汉字");
            $("#installNameCorrect").hide();
            //checkFocus("contactName");
            return false;
        }
        if (cnLength(name.value) > 40) {
            $("#installNameError").show().html("联系人姓名过长，请您最多输入20个汉字");
            $("#installNameCorrect").hide();
            //checkFocus("contactName");
            return false;
        }
        var sentiveInfo = $.trim(stringHelper.checkScript(name.value));
        if (sentiveInfo != null && sentiveInfo != "") {
            $("#installNameError").show().html("包含“" + sentiveInfo + "”非法字符");
            $("#installNameCorrect").hide();
            //checkFocus("contactName");
            return false;
        }

        $("#installNameError").hide();
        $("#installNameCorrect").show();
        return true;
    }else{
        return true;
    }
}

function checkInstallPhoneEasy() {
    if(document.getElementById("installPhone")){
        var mobile = document.getElementById("installPhone");
        if ($.trim(mobile.value) == "" || $.trim(mobile.value) == "请填写手机号码") return false;
        if (!checkMobiles($.trim(mobile.value))) return false;
        return true;
    }else{
        return true;
    }
}
function checkInstallPhone() {
    if(document.getElementById("installPhone")){
        var mobile = document.getElementById("installPhone");
        if ($.trim(mobile.value) == "" || $.trim(mobile.value) == "请填写手机号码") {
            $("#installPhoneError").show();
            $("#installPhoneError").html("手机号码不能为空");
            $(".installPhoneCorrect").hide();
            //checkFocus("contactMobile");
            return false;
        }
        if (!checkMobiles($.trim(mobile.value))) {
            $("#installPhoneError").show();
            $("#installPhoneError").html("手机格式不正确");
            $(".installPhoneCorrect").hide();
            //checkFocus("contactMobile");
            return false;
        }
        $("#installPhoneCorrect").show();
        $("#installPhoneError").hide();
        return true;
    }else{
        return true;
    }
}






/**
 * 收货地址校验
 * @returns {Boolean}
 */
function validationAddress() {
    return checkConsignee() && checkProvinceId('addressNewAreaDetail') && checkCityId('addressNewAreaDetail') && checkAreaId('addressNewAreaDetail') && checkAddressInfo()
        && checkMobel();
}

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


/**
 *校验手机
 */
function checkMobel() {
    var mobile = document.getElementById("consigneePhone");
    if ($.trim(mobile.value) == "" || $.trim(mobile.value) == "请填写手机号码") {
        $("#mobelError").show();
        $("#mobelError").html("手机号码不能为空");
        $("#mobelCorrect").hide();
        //checkFocus("mobile");
        return false;
    }
    if (!checkMobiles($.trim(mobile.value))) {
        $("#mobelError").show();
        $("#mobelError").html("手机格式不正确");
        $("#mobelCorrect").hide();
        //checkFocus("mobile");
        return false;
    }
    $("#mobelCorrect").show();
    $("#mobelError").hide();
    return true;
}
/**
 *校验老用户手机
 */
function checkOldMobel() {
    var mobile = document.getElementById("oldPhone");
    if ($.trim(mobile.value) == "") {
        $("#oldPhone").siblings(".error").html("手机号码不能为空").show();
        $("#oldPhone").siblings(".correct").hide();
        return false;
    }
    if (!checkMobiles($.trim(mobile.value))) {
        $("#oldPhone").siblings(".error").html("手机格式不正确").show();
        $("#oldPhone").siblings(".correct").hide();
        return false;
    }
    $("#oldPhone").siblings(".error").hide();
    $("#oldPhone").siblings(".correct").show();
    return true;
}
/**
 *校验验证码
 */
function checkOldCaptcha() {
    var captcha = document.getElementById("oldCaptcha");
    if ($.trim(captcha.value) == "") {
        $(".captcha").siblings(".error").html("验证码不能为空").show();
        return false;
    }
    if (!/^(\d{4})$/.test($.trim(captcha.value))) {
        $(".captcha").siblings(".error").html("请输入4位验证码").show();
        return false;
    }
    $(".captcha").siblings(".error").hide();
    return true;
}


/**
 *校验姓名
 */
function checkConsignee() {
    var consignee = document.getElementById("consignee");
    var sentiveInfo = $.trim(stringHelper.checkScript(consignee.value));
    if (sentiveInfo != null && sentiveInfo != "") {
        $("#consigneeError").show().html("包含“" + sentiveInfo + "”非法字符");
        $("#consigneeCorrect").hide();
        //checkFocus("consignee");
        return false;
    }
    if ($.trim(consignee.value) == "" || $.trim(consignee.value) == "请填写真实姓名") {
        $("#consigneeError").show().html("请填写真实姓名");
        $("#consigneeCorrect").hide();
        //checkFocus("consignee");
        return false;
    }
    if (cnLength(consignee.value) > 40) {
        $("#consigneeError").show().html("收货人姓名过长，请您最多输入20个汉字");
        $("#consigneeCorrect").hide();
        //checkFocus("consignee");
        return false;
    }
    if (cnLength(consignee.value) < 4) {
        $("#consigneeError").show().html("收货人姓名必须大于2个字");
        $("#consigneeCorrect").hide();
        checkFocus("consignee");
        return false;
    } else {
        $("#consigneeError").hide();
        $("#consigneeCorrect").show();
        focusId = "";
    }
    return true;
}


/**
 * 校验地址信息
 */
function checkAddressInfo() {
    var address = document.getElementById("consigneeAddress");
    var sentiveInfo = $.trim(stringHelper.checkScript(address.value));
    var error = $("#detailAddressError"), correct = $("#detailAddressCorrect");
    if (sentiveInfo != null && sentiveInfo != "") {
        error.show().html("包含“" + sentiveInfo + "”非法字符");
        correct.hide();
        //checkFocus("detailAddress");
        return false;
    }
    if ($.trim(address.value) == "" || $.trim(address.value) == "请填写详细路名及门牌号") {
        error.show().html("请填写详细地址");
        correct.hide();
        //checkFocus("detailAddress");
        return false;
    }
    else if (cnLength(address.value) > 100) {
        error.show().html("详细地址过长，请您最多输入50个汉字。");
        correct.hide();
        //checkFocus("detailAddress");
        return false;
    } else {
        error.hide();
        correct.show();
    }
    return true;
}


//添加或修改送货地址是，点击每个对话框，转换Css样式
//status = 1 点击状态
//status = 2 失去焦点
function changeAddressInputCss(inputId, defaultValue, status) {
    if (status == 1) {
        var currentValue = $("#" + inputId).val();
        if (currentValue == defaultValue) {
            $("#" + inputId).val("");
            $("#" + inputId).css("color", "#000000");
        }
    }

    if (status == 2) {
        var currentValue = $("#" + inputId).val();
        if (currentValue == "") {
            var reservation = inputId == 'preorderIdCard' && $('#preTypeCode').val() != '02';//预约
            var normal = inputId == 'idCard' && $('#psptTypeCode').val() != '02';// 正常
            if (reservation || normal) { // 非身份证不展示默认提示语
                defaultValue = '';
            }
            $("#" + inputId).val(defaultValue);
            $("#" + inputId).css("color", "#999999");
        }
        else {
            $("#" + inputId).val($.trim(currentValue));
            $("#" + inputId).css("color", "#000000");
        }
    }

}

//推荐人验证
function checkRecommended() {
    isRecommendPass = false;
    var consignee = document.getElementById("recommend");
    var sentiveInfo = $.trim(stringHelper.checkScript(consignee.value));
    if (sentiveInfo != null && sentiveInfo != "") {
        $("#recommendError").show().html("包含“" + sentiveInfo + "”非法字符。");
        $("#recommendCorrect").hide();
        return false;
    }
    if (cnLength(consignee.value) < 4 || cnLength(consignee.value) > 120) {
        $("#recommendError").show().html("请输入2-60个汉字");
        $("#recommendCorrect").hide();
        return false;
    } else {
        $("#recommendError").hide();
        $("#recommendCorrect").show();
        isRecommendPass = true;
        if (consignee.value == '请输入推荐人姓名') {
            $("#recommendCorrect").hide();
            isRecommendPass = false;
        }
    }
    return true;
}

function checkRecommendCode() {
    isRecommendCodePass = false;
    var consignee = document.getElementById("recommendCode");
    if (consignee.value == '请输入11位手机号码') {
        $("#recommendCodeCorrect").hide();
        $("#recommendCodeError").hide();
    } else {
        if (!checkMobiles(consignee.value)) {
            $("#recommendCodeError").show().html("请输入11位手机号码");
            $("#recommendCodeCorrect").hide();
            return false;
        } else {
            $("#recommendCodeError").hide();
            $("#recommendCodeCorrect").show();
            isRecommendCodePass = true;
        }
    }
    return true;
}

//买家留言信息验证
function checkOderMessage() {
    var oderMessage = document.getElementById("oderMessage");
    var sentiveInfo = $.trim(stringHelper.checkScript(oderMessage.value));
    if (sentiveInfo != null && sentiveInfo != "") {
        $(".oderMessageError").html("包含“" + sentiveInfo + "”非法字符");
        $(".oderMessageError").show();
        //checkFocus("oderMessage");
        return false;
    }
    if (cnLength(oderMessage.value) > 200) {
        $(".oderMessageError").html("字数不得超过100个字");
        $(".oderMessageError").show();
        //checkFocus("oderMessage");
        return false;
    } else {
        $(".oderMessageError").hide();
    }
    return true;
}

//发票抬头验证
function checkInvoice() {
    var invoice = $('#invoiceTitle');
    var sentiveInfo = $.trim(stringHelper.checkScript(invoice.text()));
    if (sentiveInfo != null && sentiveInfo != "") {
        $("#invoiceError").show().html("包含“" + sentiveInfo + "”非法字符");
        return false;
    } else {
        $("#invoiceError").hide();
        return true;
    }
}





/**新版订单填写页  入网资料end**/