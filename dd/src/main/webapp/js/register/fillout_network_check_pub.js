var regUrl = {
		pubChineseReg : /[\u4E00-\u9FA5]/,
		netWorkCustNameReg : /^[\u4E00-\u9FA5]{2,}$/,
		allNumReg:/^[0-9]*$/,
		netWorkCustPassPortReg:/^(?!^\d+$)([a-zA-Z\d]{3,}|[\u4E00-\u9FA5]{2,})$/,
		passForInlandReg:/^(H|M)(\d{8}|\d{10})$/,
		passForMainlandReg11:/^\d{10}(\([A-Za-z0-9]{1}\)|[A-Za-z0-9]{1}|\uFF08[A-Za-z0-9]{1}\uFF09)$/,
		passForMainlandReg8:/^\d{8}$/,
		passPortReg:/^[0-9a-zA-Z]{6,}$/,
		emailReg:/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/,
		endReg:""
};
var CheckInfoErrorMsg = {
		showErrorMsg:function(msg,errorid,correctid,focusid){
			$("#"+errorid).show();
		    $("#"+errorid).html(msg);
		    $("#"+correctid).hide();
		    checkFocus(focusid);
		    return false;
		},
		checkChineseLenContainError:function(num){
			return "请您最少输入"+num+"个汉字";
		},
		inCorrectIdCardFormError:function(num){
			return "证件地址至少包含"+num+"个汉字";
		},
		inCorrectFormError:function(num){
			var retMsg;
			switch(num){
			case "04":retMsg="请输入正确的军官证";break;
			case "08":retMsg="请输入正确的护照";break;
			case "09":retMsg="请输入正确的警官证";break;
			case "10":retMsg="请输入正确的港澳居民来往内地通行证";break;
			case "11":retMsg="请输入正确的台湾居民来往大陆通行证";break;
			case "12":retMsg="请输入正确的户口薄";break;
			default:retMsg="请输入正确的信息";break;
			}
			return retMsg;
		},
		nullMsgError:function(num){
			var retMsg;
			switch(num){
			case "04":retMsg="军官证不能为空";break;
			case "08":retMsg="护照不能为空";break;
			case "09":retMsg="警官证不能为空";break;
			case "10":retMsg="港澳居民来往内地通行证不能为空";break;
			case "11":retMsg="台湾居民来往大陆通行证不能为空";break;
			case "12":retMsg="户口薄不能为空";break;
			default:retMsg="输入的信息不能为空";break;
			}
			return retMsg;
		},
		IdCardNullMsg:"证件地址不能为空",
		hasSentiveInfoMsgError:function(sentiveInfo){
			return "包含“"+sentiveInfo+"”非法字符。";
		},
		IdCardBeyondMsg:"字数不得超过50个汉字",
		recieveNameFormError:"客户姓名需不小于2个汉字",
		passPortFormError:"护照姓名须大于三个字符，且不能全为数字"
};
var CheckInfoUtils= { 
	   checkByReg:function(txt,reg){
	        return reg.test(txt);
	    },
   checkChineseLenContain:function(txt,num){
        var n=0;
        for(var i=0,len=txt.length;i<len;i++){
            if(regUrl.pubChineseReg.test(txt.charAt(i)))n++;
        }
        return n>=num;
    },
    checkChineseLenOnly:function(txt){
        for(var i=0,len=txt.length;i<len;i++){
            if(!regUrl.pubChineseReg.test(txt.charAt(i)))return false;
        }
        return true;
    },
    checkLenContain:function(Str,num) {
      var escStr = escape(Str);
      var numI = 0;
      var escStrlen = escStr.length;
      for (var i = 0; i < escStrlen; i++)
      if (escStr.charAt(i) == '%')
        if (escStr.charAt(++i) == 'u')
        numI++;
      return Str.length + numI > num;
    },
    lenB : function(Str,num){
        return arguments[0].replace(/[^\x00-\xff]/g,"**").length > num;
    },
    checkNameAndCardMatch:function(selectid,receiverid,errorid,correctid){
    	if($("#show_telephone").attr("checked"))
   		   return true;
    	var currentSelectOption = $("#"+selectid).val();
    	var currentReceiverName = $("#"+receiverid).val();
    	if(currentSelectOption=='08'){
    		if(!(CheckInfoUtils.lenB(currentReceiverName, 3)&&!CheckInfoUtils.checkByReg(currentReceiverName,regUrl.allNumReg)))
    			return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.passPortFormError,errorid,correctid,receiverid);
    	}else{
    		if(!CheckInfoUtils.checkChineseLenContain(currentReceiverName,2))
    			return CheckInfoErrorMsg.showErrorMsg(CheckInfoErrorMsg.recieveNameFormError,errorid,correctid,receiverid);
    	}
    	if($("#"+receiverid).is("[data-error]")){
    		$("#"+receiverid).attr("data-error","");
    	};
    	$("#"+errorid).hide();
    	return true;
    }
};


