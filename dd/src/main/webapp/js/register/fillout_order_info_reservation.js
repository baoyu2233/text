//机主姓名验证
function machineLordName() {
  var name = document.getElementById("machineLordName");
  var nameError = $("#machineLordNameError");
  var nameCorrect = $("#machineLordNameCorrect");
  if ($.trim(name.value) == ""|| $.trim(name.value) == " 2-20个汉字") {
  nameError.show();
  nameError.html("请准确填写机主姓名");
  nameCorrect.hide();
  checkFocus("machineLordName");
  return false;
  }
  if (cnLength(name.value) < 4) {
      nameError.show();
      nameError.html("机主姓名需不小于2个汉字。");
      nameCorrect.hide();
      checkFocus("receiverName");
      return false;
      }
   if (cnLength(name.value) > 40) {
  nameError.show();
  nameError.html("机主姓名过长，请您最多输入20个汉字。");
  nameCorrect.hide();
  checkFocus("receiverName");
  return false;
  }
   var sentiveInfo = $.trim(stringHelper.checkScript(name.value));
   if(sentiveInfo != null && sentiveInfo != ""){
       nameError.show();
       nameError.html("包含“"+sentiveInfo+"”非法字符。");
       nameCorrect.hide();
       checkFocus("receiverName");
       return false;
   }/*else {
      nameCorrect.show();
  }*/
   nameError.hide();
  return true;
}
//校验身份证号码
function checkPreorderIdCard() {
  var varInput = $("#preorderIdCard").val();//input change to number
  var idCardError = $("#preorderIdCardError");
  var idCardCorrect = $("#preorderIdCardCorrect");

  var input = $.trim(varInput);//delete backspace
  var id = varInput;
  var idLength = id.length;
  var sentiveInfo = $.trim(stringHelper.checkScript(varInput));
  if(sentiveInfo != null && sentiveInfo != ""){
      idCardError.show().html("包含“"+sentiveInfo+"”非法字符。");
      idCardCorrect.hide();
      return false;
  }
  //获取证件类型
  var selectValue = $("#preTypeCode").val();
  //判断是够为身份证
  if (selectValue=='02') {
	  if (idLength == 0) {
	  idCardError.show();
	  idCardCorrect.hide();
	  idCardError.html("身份证号码不能为空");
	  return false;
	  }
	  if (idLength != 18) {
	  idCardError.show();
	  idCardCorrect.hide();
	  idCardError.html("请输入18位身份证号");
	  return false;
	  }
	  if (idLength == 15) {
	  yyyy = "19" + id.substring(6, 8);
	  mm = id.substring(8, 10);
	  dd = id.substring(10, 12);
	  if (mm > 12 || mm <= 0) {
	  idCardError.show();
	  idCardCorrect.hide();
	  idCardError.html("月份错误");
	   return false;
	  }
	  if (dd > 31 || dd <= 0) {
	   idCardError.show();
	   idCardCorrect.hide();
	   idCardError.html("日期错误");
	   return false;
	  }
	  birthday = yyyy + "-" + mm + "-" + dd;
	  if ("13579".indexOf(id.substring(14, 15)) != -1) {
	   sex = "1";
	  } else {
	   sex = "2";
	  }
	  } else if (idLength == 18) {
	  if (id.indexOf("X") > 0 && id.indexOf("X") != 17 || id.indexOf("x") > 0 && id.indexOf("x") != 17) {
	   idCardError.show();
	   idCardCorrect.hide();
	   idCardError.html("身份证\"x\"不存在");
	   return false;
	  }
	  yyyy = id.substring(6, 10);
	  if (yyyy > 2200 || yyyy < 1900) {
	  idCardError.show();
	  idCardCorrect.hide();
	  idCardError.html("年份错误");
	  return false;
	  }
	  mm = id.substring(10, 12);
	  if (mm > 12 || mm <= 0) {
	   idCardError.show();
	   idCardCorrect.hide();
	   idCardError.html("月份错误");
	   return false;
	  }
	  dd = id.substring(12, 14);
	  if (dd > 31 || dd <= 0) {
	   idCardError.show();
	   idCardCorrect.hide();
	   idCardError.html("日期错误");
	   return false;
	  }
	  if (id.charAt(17) == "x" || id.charAt(17) == "X") {
	   if ("x" != getVerifyBit(id) && "X" != getVerifyBit(id)) {
	   idCardError.show();
	   idCardCorrect.hide();
	   idCardError.html("请输入正确的身份证号码");
	  return false;
	   }
	  } else {
	   if (id.charAt(17) != getVerifyBit(id)) {
	  idCardError.show();
	  idCardCorrect.hide();
	  idCardError.html("请输入正确的身份证号码");
	  return false;
	   }
	  }
	  birthday = id.substring(6, 10) + "-" + id.substring(10, 12) + "-"
	  + id.substring(12, 14);
	  if ("13579".indexOf(id.substring(16, 17)) > -1) {
	   sex = "1";
	  } else {
	   sex = "2";
	  }
	  }
	  idCardError.hide();
	  idCardCorrect.show();
	  return true;
  }else{
      return checkPreOtherCard(selectValue,varInput);
  }
}

//其他证件验证
function checkPreOtherCard(selectValue,varInput)
{	//空校验
	if($.trim(varInput)=="") 
		return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.nullMsgError(selectValue),"preorderIdCardError","preorderIdCardCorrect","preorderIdCard");
	var flag = false;
	switch(selectValue){
		//户口本
		case "12":flag = (checkIdcard2(varInput).indexOf("验证通过") == -1);break;
		//港澳居民来往内地通行证
		case "10":flag = !CheckInfoUtils.checkByReg(varInput,regUrl.passForInlandReg);break;
		//台湾居民来往大陆通行证
		case "11":flag = !CheckInfoUtils.checkByReg(varInput,($.trim(varInput).length==8?regUrl.passForMainlandReg8:regUrl.passForMainlandReg11));break;
		case "04":flag = !CheckInfoUtils.lenB(varInput, 5);break;
		case "08":flag = !CheckInfoUtils.lenB(varInput, 5);break;
		case "09":flag = !CheckInfoUtils.lenB(varInput, 5);break;
		default: flag = true;break;
	}
	if(flag)
		return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.inCorrectFormError(selectValue),"preorderIdCardError","preorderIdCardCorrect","preorderIdCard");
	
	$("#preorderIdCardError").hide();
	$("#preorderIdCardCorrect").show();
    return true;
}
	
  function getVerifyBit(id) {// 15位转18位中,计算校验位即最后一位
  var result;
  var nNum = eval(id.charAt(0) * 7 + id.charAt(1) * 9 + id.charAt(2) * 10
   + id.charAt(3) * 5 + id.charAt(4) * 8 + id.charAt(5) * 4
   + id.charAt(6) * 2 + id.charAt(7) * 1 + id.charAt(8) * 6
   + id.charAt(9) * 3 + id.charAt(10) * 7 + id.charAt(11) * 9
   + id.charAt(12) * 10 + id.charAt(13) * 5 + id.charAt(14) * 8
   + id.charAt(15) * 4 + id.charAt(16) * 2);
  nNum = nNum % 11;
  switch (nNum) {
  case 0:
  result = "1";
  break;
  case 1:
  result = "0";
  break;
  case 2:
  result = "X";
  break;
  case 3:
  result = "9";
  break;
  case 4:
  result = "8";
  break;
  case 5:
  result = "7";
  break;
  case 6:
  result = "6";
  break;
  case 7:
  result = "5";
  break;
  case 8:
  result = "4";
  break;
  case 9:
  result = "3";
  break;
  case 10:
  result = "2";
  break;
  }
  return result;
  }
  
  function checkIdCardCityTwo(flag) {
	  var idCardValue = $("#idCardCityTwo").val();
	  if(!flag){
			if(idCardValue=="" || $.trim(idCardValue).length <= 0){
				return;
			}
		}
	  var name = document.getElementById("idCardCityTwo");
	   if(name.value=="" || $.trim(name.value).length <= 0) 
			return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.IdCardNullMsg,"idCardCityTwoError","idCardCityTwoCorrect","idCardCityTwo");
	   
	   var selectOptionValue = $("#preTypeCode").val();
	   var num = selectOptionValue=="11"?3:(selectOptionValue=="08"?2:8);
	   
	   if(!CheckInfoUtils.checkChineseLenContain(idCardValue,num))
			return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.inCorrectIdCardFormError(num),"idCardCityTwoError","idCardCityTwoCorrect","idCardCityTwo");
	   
	   var sentiveInfo = $.trim(stringHelper.checkScript(name.value));
	   if(sentiveInfo != null && sentiveInfo != "" )
			return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.hasSentiveInfoMsgError(sentiveInfo),"idCardCityTwoError","idCardCityTwoCorrect","idCardCityTwo");
	   
	   if(cnLength(name.value) > 100) 
			return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.IdCardBeyondMsg,"idCardCityTwoError","idCardCityTwoCorrect","idCardCityTwo");
	   
	   $("#idCardCityTwoError").hide();
	   $("#idCardCityTwoCorrect").show();
	   return true;
}


//手机验证
function checkMobelTwo(){
  var mobile = document.getElementById("mobileTwo");
  var mobileError = $("#mobileTwoError")
  var mobileCorrent = $("#mobileTwoCorrect")
  if ($.trim(mobile.value) == "" || $.trim(mobile.value) == "请填写手机号码") {
  mobileCorrent.hide();
  mobileError.show().html("手机号码不能为空");
  checkFocus("mobileTwo");
  return false;
  }
  if(!checkMobiles($.trim(mobile.value))){
  mobileError.show();
  mobileError.html("手机格式不正确");
  mobileCorrent.hide();
  checkFocus("mobileTwo");
  return false;
   }
   else {
  mobileCorrent.show();
  mobileError.hide();
  }

  return true;
  }
function checkMobiles(theForm) {
  return /^((13|15|18|14|17|16|19|17)+\d{9})$/.test(theForm);
}
function checkMeth(nodevalue) {
  var checkOK = "0123456789";
  var checkStr = $.trim(nodevalue);
  var allValid = true;
  var validGroups = true;
  for (i = 0; i < checkStr.length; i++) {
  ch = checkStr.charAt(i);
  for (j = 0; j < checkOK.length; j++) {
    if (ch == checkOK.charAt(j))
    break;
    if (j == (checkOK.length - 1)) {
    allValid = false;
    break;
    }
  }
  }
  return allValid;
}
function checkTouchAddress(){
    var varInput = $("#idCardCityAdd").val();
    var sentiveInfo = $.trim(stringHelper.checkScript(varInput));
    if(sentiveInfo != null && sentiveInfo != ""){
        $("#idCardCityAddError").show().html("包含“"+sentiveInfo+"”非法字符。");
        $("#idCardCityAddCorrect").hide();
        return false;
    }else{
        $("#idCardCityAddError").hide();
        return true;
    }
}
//入网资料修改
  $(".networkOpenTwo").live('click',function(){
      preCheckCustInfo = true;
  $(this).text("【修改】");
  $(this).addClass("networkCloseTwo").removeClass("networkOpenTwo");
  $("#networkInfoTwo").show();
  $("#networkEditTwo").hide();
}
);
//入网资料修改
$(".networkCloseTwo").live('click',function(){
  preCheckCustInfo = false;
  $(this).text("【不保存修改】");
  $(this).addClass("networkOpenTwo").removeClass("networkCloseTwo");
  $("#networkInfoTwo").hide();
  $("#networkEditTwo").show();
}
);
function checkNetworkTwo() {
  if (!machineLordName()) return false;
  if (!checkPreorderIdCard()) return false;
  if (!CheckInfoUtils.checkNameAndCardMatch("preTypeCode","machineLordName","machineLordNameError","machineLordNameCorrect")) return false;
  if (!checkIdCardCityTwo(true)) return false;
  if (!checkMobelTwo()) return false;
  if (!checkCustInfoPre()) return false;
  if(!checkTouchAddress()) return false;
  var network = $("#networkTwo");
  var networkText = $("#networkTextTwo");
  var idCardVal = $("#preorderIdCard").val();
  var idCardAdd = $("#idCardCityTwo").val();
  var machineLordNameVal = $("#machineLordName").val();
  var mobelVal = $("#machineLordName").val();
  var idCardCityAdd = $("#idCardCityAdd").val();
  var mobileTwo = $("#mobileTwo").val();
  $("#networkInfoTwo").html("<p>机主姓名：<span>" + machineLordNameVal + "</span></p><p>证件信息：<span class=\"idCardText\">"+ idCardVal + "</span></p><p>证件地址：<span class=\"idCardText\">"+ idCardAdd + "</span></p><p>联系电话：<span class=\"idCardText\">"+ mobileTwo + "</span></p><p>联系地址：<span class=\"idCardText\">"+ idCardCityAdd + "</span></p>");
  $("#networkEditTwo").hide();
  $("#networkTextTwo").text("【修改】");
  $(".networkOpenTwo").addClass("networkCloseTwo").removeClass("networkOpenTwo");
  networkText.show();
  if ($("#networkInfoTwo").hide ) {
    $("#networkInfoTwo").show();
    }
    else {
    };
  return true;
}



/**************************************预约办理***********************************/
$(function(){
  $('#preTypeCode').change(function(){
      var defaultTip = $('#preTypeCode').val() == '02' ? '18位有效的身份证号码' : '';
      $('#preorderIdCard').val(defaultTip);
  });
  $(".orderCartStep").live('click',function(){
    $(".fillTab").css('background-position','0 -35px');
    $(".orderCartStep").addClass("cWhite");
    $(".scheduleStep").removeClass("cWhite");
    $("#orderCartStep1").show();
    $("#scheduleStep1").hide();
    $(".orderCart").show();
    $(".scheduleHandle").hide();
  });
  $(".scheduleStep").live('click',function(){
    $(".fillTab").css('background-position','0 0');
    $(".orderCartStep").removeClass("cWhite");
    $(".scheduleStep").addClass("cWhite");
    $("#scheduleStep1").show();
    $("#orderCartStep1").hide();
    $(".orderCart").hide();
    $(".scheduleHandle").show();
  });

  //弹出详情窗口
  $(".detailBtn").live('click', function(){
	$(".popWin").show().center();
	var height = $("body").height();
    $(".thickdiv").show().css("height",height);
	$("select").attr({disabled:"disabled",color:"#656565"});
	$("select").css({background:"#f0f0f0"});
	return false;
  });

  //窗口大小改变
  $(window).resize(function(){
	$(".popWin").center();
  });
  //浏览器滚动条滚动
  $(window).scroll(function(){
	$(".popWin").center();
  });
  
  //关闭弹出窗口
  $("#closeWin").click(function(){
	$(".popWin").hide();
  $(".thickdiv").hide();
  $("select").removeAttr("disabled");
  $("select").css("background-color","");
  });
});
