
var preCheckCustInfo = false;
//确认入网资料
function  checkCustInfoPre(){
    var idCardVal = $("#preorderIdCard").val();
    var receiverNameVal = $("#machineLordName").val();
    var psptTypeCode = $("#preTypeCode").val();
    var CertAdress = $("#idCardCityTwo").val();
    var provinceCode = $("#preorderIdCard").attr("province");
    var cityCode = $("#preorderIdCard").attr("city");
    var goodsId = $("#preorderIdCard").attr("goodsId");
    var tmplId = $("#preorderIdCard").attr("tmplId");
    preCheckCustInfo = false;
    
    var params ={
            'psptTypeCode' : psptTypeCode,
            'idCardVal' : idCardVal,
            'provinceCode' : provinceCode,
            'cityCode' : cityCode,
            'CertAdress' : CertAdress,
            'goodsId':goodsId,
            'tmplId':tmplId,
            'bizType' : 'normal'
        };
    $(".thickdiv").css("height", $("body").height());
    $(".thickdiv").show();
    $(".loadingText").text("请稍候......");
    $(".loadingStyle").show().center();    
    $.ajax({
        type : "POST",
        url : checkCustInfoUrl,
        data: params, 
        async: false,
        success: function(retMessage){
            if(retMessage == '0200'){
                errorTip = '证件格式不合法';
                $("#idCardCityAddError").show().html(errorTip);
                $("#idCardCityAddCorrect").hide();
                $(".thickdiv").hide();
                $(".loadingStyle").hide();
                preCheckCustInfo = false;
                return;
            }else if(retMessage == '0201'){
                errorTip = '证件格式不合法';
                $("#idCardCityAddError").show().html(errorTip);
                $("#idCardCityAddCorrect").hide();
                $(".thickdiv").hide();
                $(".loadingStyle").hide();
                preCheckCustInfo = false;
                return;
            }
            else if(retMessage == '0202'){
                errorTip = '证件格式不合法';
                $("#idCardCityAddError").show().html(errorTip);
                $("#idCardCityAddCorrect").hide();
                $(".thickdiv").hide();
                $(".loadingStyle").hide();
                preCheckCustInfo = false;
                return;
            }
            else if(retMessage == '0203'){
                errorTip = '很抱歉，您的证件号码为黑名单，暂不能办理';
                $("#idCardCityAddError").show().html(errorTip);
                $("#idCardCityAddCorrect").hide();
                $(".thickdiv").hide();
                $(".loadingStyle").hide();
                preCheckCustInfo = false;
                return;
            }
            else if(retMessage == '0204'){
                errorTip = '很抱歉，您的证件号码办理的联通号码数过多，暂不能办理';
                $("#idCardCityAddError").show().html(errorTip);
                $("#idCardCityAddCorrect").hide();
                $(".thickdiv").hide();
                $(".loadingStyle").hide();
                preCheckCustInfo = false;
                return;
            }
            else if(retMessage == '0205'){
                errorTip = '很抱歉，您的证件号码下有联通号码为欠费，暂不能办理';
                $("#idCardCityAddError").show().html(errorTip);
                $("#idCardCityAddCorrect").hide();
                $(".thickdiv").hide();
                $(".loadingStyle").hide();
                preCheckCustInfo = false;
                return;
            }
            $(".thickdiv").hide();
            $(".loadingStyle").hide();
            preCheckCustInfo =  true;
        },
        error: function(){
            preCheckCustInfo =  true;
            $(".thickdiv").hide();
            $(".loadingStyle").hide();
        }
    });
    
    return preCheckCustInfo;
}