var nowDate = new Date();// 今天
var ActStartDate = new Date(2014, 7-1, 21);// 活动开始时间
var n = nowDate.getTime() + 1 * 24 * 60 * 60 * 1000;// 延后一天
var delayedDate = new Date(n);
var choiceDate = new Date();// 选择的日期
var choiceTime = "";
var tempIdCard = false;

$(function() {
    init();
    
    // 点开日期弹出层
    $(".timeInputBc,.timeIcon").click(function(){
        $(".calendar-box").show();
    });
    
    // 关闭日期弹出层
    $(".cal-shut").click(function(){
        $(".calendar-box").hide();
    });
    
    // 选取日期确定
    $("#calendar-sure").click(function(){
        if($(".cal-dates-w li").find("a").hasClass("choosed")){
            $("#choiceTime").text(choiceTime);
            $(".timeInputBc").val(choiceTime);
            $("#deliveryDate04").click();
            deliveryData.distributionTime = choiceTime;
            $("#sendTimeShow").attr("defaultDate", choiceTime);
            deliveryData.dlvTypeCode = '04';
        }else{
            var defaultTime = $("#sendTimeShow").attr("defaultDate")
            $("#choiceTime").text(defaultTime);
            $(".timeInputBc").val(defaultTime);
            deliveryData.distributionTime = defaultTime;
            deliveryData.dlvTypeCode = '04';
        }
        $(".calendar-box").hide();
    });
    
    var options={
            initYear:2014,
            initMonth:7,
            totalMonths:2,
            totalBox:35,
            optDateNum:1,
            calendar:$(".calendar"),
            optDateFrom:new Date("2014/07/20"),
            optDateTo:new Date("2014/09/01")
         }
    new window.MyPicker(options);
    
  //上传身份证
    $(".uploadPhotoBtn").live("click",function(){
        var _option=$("#psptTypeCode").find("option:selected").text(),_cardPos=$(".picBc:eq(1)").find("a"),_cardPosPic=$(".picBc:eq(0)").find("a");
        $(".idPop").css({"top":$(document).scrollTop()+50,"left":280}).show();
        $(".changeIdType").text("临时身份证照片上传 >");
        tempIdCard = false;
        $(".upPicSucess").removeClass("mrgT80 ").hide();
        $(".uploadPicBtn").addClass("mrgT80 ").show();
        if(_option=="身份证"){
            $(".idInfo:eq(2),.idInfo:eq(3)").show();
            _cardPosPic.removeClass().addClass("idPicFront");
            $(".picBc:eq(1)").find("a").removeClass("idPicArea idPicOnlyOne");
        }else{
            $(".idInfo:eq(2),.idInfo:eq(3)").hide();
            _cardPos.removeClass("idPicFront");
			$(".changeIdType").hide();
            if(_option=="户口簿"){
                _cardPosPic.removeClass().addClass("idPicFront idPicHukou");
            }else if(_option=="军官证"){
                _cardPosPic.removeClass().addClass("idPicFront idPicJunguan");
            }else if(_option=="警官证"){
                _cardPosPic.removeClass().addClass("idPicFront idPicJingguan");
            }else if(_option=="港澳居民来往内地通行证"){
                _cardPosPic.removeClass().addClass("idPicFront idPicGangao");
            }else if(_option=="台湾居民大陆通行证"){
                _cardPosPic.removeClass().addClass("idPicFront idPicTaiwan");
            }else{
                _cardPosPic.removeClass().addClass("idPicFront idPicHuzhao");
            }
        }
        $(".globalThickdiv").show();
    });
	//$(".upPicSucess .correct").show();
//   $(".uploadIdShow .operate").live("click",function(){
//     $(".idPop").css({"top":$(document).scrollTop()+50,"left":280}).show();
//   });
	$(".uploadBtn .addBtn").live("click",function(){
	  var option=$("#psptTypeCode").find("option:selected").val()
	  if(frontName==""||(option=="02"&&tempIdCard==false&&backName=="") ){
		  $(".uploadError").show();
	  }else{
		  $(".uploadError").hide();
		  $(this).parents(".idPop").hide();
		  $(".globalThickdiv").hide();
		  $(".thickdiv").hide();
	  }
	});
	$(".popClose").live("click",function(){
	    var option=$("#psptTypeCode").find("option:selected").text()
	    if(tempIdCard==false&&option=="身份证" && ((frontName!=""&&backName=="")||(frontName==""&&backName!=""))){
	        $('#errorTipsOne').hide();
	        $('#errorTipsTwo').show();
	        $('#uploadBtnOne').hide();
	        $('#uploadBtnTwo').show();
	        //$(this).parents(".idPop").css("z-index","10000000");
		    $(".colseCertic").css({"top":$(document).scrollTop()+200,"left":500,"z-index":10000005}).show();
		    $(".thickdiv").height($("body").outerHeight()).show();
	    }else if(((option!="身份证"||tempIdCard==true)&&frontName!="")||(option=="身份证"&&frontName!=""&&backName!="")){
	        $('#errorTipsOne').show();
	        $('#errorTipsTwo').hide();
	        $('#uploadBtnOne').show();
	        $('#uploadBtnTwo').hide();
	        //$(this).parents(".idPop").css("z-index","10000000");
		    $(".colseCertic").css({"top":$(document).scrollTop()+200,"left":500,"z-index":10000005}).show();
		    $(".thickdiv").height($("body").outerHeight()).show();
	    }else{
	    	$(".idPop").hide();
			 $(".thickdiv").hide();
			 $(".globalThickdiv").hide();
			 frontName = "";
			 backName = "";
			 $(".uploadIdShow").hide();
	         $(".uploadPhotoBtn").show();
	    }
	    $(".uploadError").hide();
	    $(".loadingStyle").hide();
	});
	$(".colseCertic .addBtn,.colseCertic .popClose").live("click",function(){
		 //$(".idPop").css("z-index","10000003");
		 $(this).parents(".colseCertic").hide();
		 $(".thickdiv").height($("body").outerHeight()).hide();
	});
	$(".colseCertic .saveAddBtn").live("click",function(){
		 $(".idPop").hide();
		 $(".thickdiv").hide();
	});
	$(".colseCertic .quitBtn").live("click",function(){
		 //$(".idPop").css("z-index","10000003");
		 $(this).parents(".colseCertic").hide();
		 $(".idPop").hide();
		 $(".thickdiv").hide();
		 $(".globalThickdiv").hide();
		 frontName = "";
		 backName = "";
		 $(".uploadIdShow").hide();
         $(".uploadPhotoBtn").show();
         $(".upPicSucess").removeClass("mrgT80 ").hide();
         $("#uploadFront").show();
   	  $("#uploadBack").show();
	});
	$(".uploadIdShow .delete").live("click",function(){
	  $(this).parents(".uploadIdShow").hide();
	  $(".upPicSucess").removeClass("mrgT80 ").hide();
	  $("#uploadFront").show();
	  $("#uploadBack").show();
	  $(".uploadPhotoBtn").show();
	  frontName = "";
	  backName = "";
	});
	$("#deleteFront").live("click",function(){
		$(this).parents(".upPicSucess").removeClass("mrgT80 ").hide();
		frontName = "";
		$("#uploadFront").show();
	});
	$("#deleteBack").live("click",function(){
		$(this).parents(".upPicSucess").removeClass("mrgT80 ").hide();
		backName = "";
		$("#uploadBack").show();
	});
	/*$(".upPicShow").hover(function(){
	var _upBtn=$(this).siblings(".upPicArea").find(".uploadPicBtn"),_text=_upBtn.text();
		_text=_text.replace("点此","重新");
		_upBtn.text(_text);
		$(this).siblings(".upPicArea").show();
	},function(){
		$(this).siblings(".upPicArea").hide();
	
	});*/
	$(".uploadPicBtn").live("click",function(){
	  $(this).next().find("input[name='fileField']").trigger("click");
	
	});
	$(".changeIdType").live("click",function(){
      $(".uploadError").hide();
	  var _text=$(this).text();
	  if(_text=="临时身份证照片上传 >"){
	    $(".idInfo:eq(2),.idInfo:eq(3)").hide();
	    $(".picBc:eq(0)").find("a").removeClass("idPicFront").addClass("idPicArea idPicOnlyOne");
		$(this).text("二代身份证照片上传 >");
		tempIdCard = true;
	  }
	  if(_text=="二代身份证照片上传 >"){
	    $(".idInfo:eq(2),.idInfo:eq(3)").show();
	    $(".picBc:eq(0)").find("a").removeClass("idPicArea idPicOnlyOne").addClass("idPicFront");
		$(this).text("临时身份证照片上传 >");
		tempIdCard = false;
	  }
	  frontName = "";
	  backName = "";
	  $("#uploadFront").show();
	  $("#uploadBack").show();
	  $(".upPicSucess").removeClass("mrgT80 ").hide();
	  $(".uploadPhotoBtn").show();
	  $(".uploadIdShow").hide();
	});
	$("#psptTypeCode").live("change",function(){
		$(".uploadPhotoBtn").show();
		$(".uploadIdShow").hide();
		frontName = "";
		backName = "";
		$(".upPicSucess").removeClass("mrgT80 ").hide();
		$("#uploadFront").show();
		  $("#uploadBack").show();
	})
	
	function getAjaxUploadFileData(direction) {
		var certType=$("#psptTypeCode").find("option:selected").val();
        return {
            action : "/mall-web/OrderInputAjax/picUpload",
            type : "POST",
            responseType : 'json',
            name : 'file',
            data : {direction : direction,
                    certType : certType},
            onSubmit : function(file, ext) {
                if (!(ext && /^(jpg|jpeg|bmp)$/i.test(ext))) {
                    alert('只支持.jpg.jpeg.bmp的图片格式');
                    return false;
                }
                $(".loadingStyle").show().center().find(".loadingText").text("请稍候......");
                $(".thickdiv").height($("body").outerHeight()).show();
            },
            onComplete : parseResponse
        };
    } 
    /*if(isNotNeedNetworkData != "true" && mobilePhone!="YES"){
        new AjaxUpload($("#uploadFront"), getAjaxUploadFileData("front"));
        new AjaxUpload($("#uploadBack"), getAjaxUploadFileData("back"));
    }*/
    function parseResponse(file, response) {
        if(response.result == 'success'){
            var picUserId = response.picUserId;
            if(response.direction=="front"){
                frontName = picUserId;
            }else if(response.direction=="back"){
                backName = picUserId;
            }
            $("#upPicSucess_"+response.direction).addClass("mrgT80 ").show();
            $(".uploadIdShow").show();
            $(".uploadPhotoBtn").hide();
            $(".uploadError").hide();
            if(response.direction=="front"){
                $("#uploadFront").hide();
            }else if(response.direction=="back"){
                $("#uploadBack").hide();
            }
        }else if(response.result == "illegalFile"){
            alert('上传图片格式不正确');
        }else if(response.result == 'fail'){
            alert('上传失败');
        }else if(response.result == 'sizeError'){
            alert("上传文件失败，文件大小应小于2M");
        }
        $(".loadingStyle").hide();
        $(".thickdiv").hide();
    }
});
;(function($){
    function MyDatePicker(options)
    {
        _t=this;
        _t.initYear=options.initYear;
        _t.initMonth=options.initMonth;
        _t.totalMonths=options.totalMonths;
        _t.totalBox=options.totalBox;
        _t.optDateNum=options.optDateNum;
        _t.calendar=options.calendar;
        _t.optDateFrom=options.optDateFrom;
        _t.optDateTo=options.optDateTo;
        _t.init(options);
    }
    MyDatePicker.prototype={
        init:function(options){
            var today=new Date(),curMonth=today.getMonth()+1,curDate=today.getDate(),
                today=new Date(_t.initYear,curMonth-1,curDate);
            var maxDate=_t.optDateFrom.getTime()>today.getTime()?_t.optDateFrom:today;
            //加载头部
            _t.calendar.append("<div class=\"calendar-top\"><div class=\"cal-months\"></div></div>")
            _t.calendar.append("<div class=\"cal-days\"></div>");
            _t.calendar.find(".cal-days").append("<ul class=\"cal-weekdays\"><li>周一</li><li>周二</li><li>周三</li><li>周四</li><li>周五</li><li>周六</li><li>周日</li></ul><div class=\"cal-dates-w\"><ul class=\"cal-dates\"></ul></div>");
            _t.calendar.append("<div class=\"cal-results\">将在您的指定日期(2014年<span id=\"dateFrom\">7月22日</span>)后尽快发货</div>");
            var $calMonths=_t.calendar.find(".cal-months"),
                $calDates=_t.calendar.find(".cal-dates"),
                calW=252;
            for(var i=0;i<_t.totalMonths;i++)
            {
                var month=_t.initMonth+i,
                    monthClass=(month==curMonth)?"class=\"current\"":"";
                $calMonths.append("<a "+monthClass+" href=\"javascript:void(0);\">"+month+"</a>");
                $calDates.append("<li></li>");
                var daysNum=_t.getDays(_t.initYear,month),
                    frtDay=new Date(_t.initYear,month-1,1),
                    wkDay=frtDay.getDay()?frtDay.getDay():7,
                    $calMonthBox=$calDates.children("li:last");
                for(var j=1;j<=_t.totalBox;j++){
                    if(j<wkDay||j>=wkDay+daysNum){
                        $calMonthBox.append("<a href=\"javascript:void(0);\"></a>");
                    }else{
                        var tempDay=j-wkDay+1,
                            tempDate=new Date(_t.initYear,month-1,tempDay),
                            dateClass;
                        if(tempDate.getTime()<=maxDate.getTime()){
                            dateClass="class=\"disabled"+(tempDate.getTime()==today.getTime()?" today":"")+"\"";
                        }else if(tempDate.getTime()<_t.optDateTo.getTime()){
                            dateClass="class=\"optional\"";
                        }else{
                            dateClass="";  
                        }
                        $calMonthBox.append("<a "+dateClass+" href=\"javascript:void(0);\">"+tempDay+"</a>");
                    }
                }
            }
            var monthIndex=$calMonths.children(".current").index();
            $calDates.animate({"left":-calW*monthIndex+"px"},1000);
            // 切换月份
            $calMonths.delegate("a","click",function(){
                var $this=$(this),index=$this.index();
                monthIndex=index;
                $this.addClass("current").siblings().removeClass("current");
                $calDates.animate({"left":-calW*index+"px"},300);
            })
            // 选择日期
            $calDates.delegate("a.optional","click",function(){
                var $this=$(this),
                    $nextSibs=$this.nextAll(".optional"),
                    nextSibsLen=$nextSibs.length,
                    $nextParent=$this.parent().next(),
                    durFrom={},durTo={};
                $calDates.find(".choosed").removeClass("choosed").end();
                $this.addClass("choosed");
                if(nextSibsLen+1>=_t.optDateNum){
                    durFrom.durMonth=durTo.durMonth=_t.initMonth+monthIndex;
                }else{
                    $calDates.animate({"left":"-="+calW+"px"},1000);
                    durFrom.durMonth=_t.initMonth+monthIndex;
                    monthIndex=monthIndex+1;
                    $calMonths.children("a").removeClass().eq(monthIndex).addClass("current");
                    durTo.durMonth=_t.initMonth+monthIndex;
                }
                durFrom.durDate=$this.text();
                $("#dateFrom").text(durFrom.durMonth+"月"+durFrom.durDate+"日");
                choiceDate = new Date(2014, durFrom.durMonth, durFrom.durDate);
                choiceTime = getFormatDate(2014, durFrom.durMonth, durFrom.durDate);
                $(".cal-results").show();
            })        
        },
        getDays:function(year,month){
            var date=new Date(year,month,0);
            return date.getDate();
        }
    }
    window.MyPicker=MyDatePicker;
})(jQuery)// JavaScript Document


/**
 * 日期格式化
 * @param Year
 * @param Month
 * @param Day
 * @returns {String}
 */
function getFormatDate(Year, Month, Day) { 
    var CurrentDate = Year + "-"; 
    if (Month >= 10 ) { 
        CurrentDate += Month + "-"; 
    }else { 
        CurrentDate += "0" + Month + "-"; 
    } 
    if (Day >= 10 ) { 
        CurrentDate += Day ; 
    } else { 
        CurrentDate += "0" + Day ; 
    } 
    return CurrentDate; 
} 

/**
 * 初始化方法
 */
function init(){
    if(nowDate < ActStartDate){
        $(".timeInputBc").val("2014-07-21");
    }else{
        var delayedTime = getFormatDate(2014, delayedDate.getMonth()+1,delayedDate.getDate());
        $("#choiceTime").text(delayedTime);
        $(".timeInputBc").val(delayedTime);
        $("#sendTimeShow").attr("defaultDate", delayedTime);
    }
}