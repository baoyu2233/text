//热门搜索数据获取-进入首页时调用这个方法
var product = '';
var service = '';
function searchInit(){
	$("#hotSearchWord").empty();
	// 搜索框--商品
	
   	$.each(hotsearch.mall,function(i,value){
   	if (value != null && value.url != null && value.url != 'null') {
			product += '<li>'+value.word+'</li>';	   		
   	}
   	});
	
	
	// 搜索框--服务
   	$.each(hotsearch.service,function(i,value){
   	if (value != null && value.url != null && value.url != 'null') {
   		service += '<li>'+value.word+'</li>';	   		
   	}
   	});
   	
   	//初始时设置为商品的热词信息
   	$("#hotSearchWord").html(product);
   	//下拉框切换
   	initEvent();
	////搜索商品-搜索事件控制
	$("#searchButton").click(function(){
		var val=$("#searchWord").val();
        var _bamboo_rep_transid="";
        var _bamboo_rep_menuid="";
        var _bamboo_rep_productlink="";
        var _bamboo_rep_title="";
		if($("#chooseInfo").text()=="商品"){
            _bamboo_rep_transid="130130001";
            _bamboo_rep_menuid="http://s.10010.com/SearchApp/chseSearchList/init?keyword="+val+ "&wd=" +val;
            _bamboo_rep_productlink="http://s.10010.com/SearchApp/chseSearchList/init?keyword="+val+ "&wd=" +val;
            _bamboo_rep_title="商品";
		}else if($("#chooseInfo").text()=="服务"){
            _bamboo_rep_transid="130130002";
            _bamboo_rep_menuid="http://iservice.10010.com/e3/search/searchGoods.html?keyword="+ val;
            _bamboo_rep_productlink="http://iservice.10010.com/e3/search/searchGoods.html?keyword="+ val;
            _bamboo_rep_title="服务";
		}
        window.open(encodeURI(_bamboo_rep_productlink));
        //落 pv 日志
        _bamboo_rep_actcode = ConstPV[_bamboo_rep_transid].act_name; // 入口位置名称
        _bamboo_rep_uptype = ConstPV[_bamboo_rep_transid].level1;  // 类型
		var datapv={};
		if (userInfo != null) {
			var url = "http://www.10010.com/emallsupport/count/businessLogRecords.htm";
			datapv={transId:_bamboo_rep_transid,
				actCode:_bamboo_rep_actcode,
				upType:_bamboo_rep_uptype,
				menuId:_bamboo_rep_menuid,
				titleName:_bamboo_rep_title,
				mobile:userInfo.usernumber,
				provId:userInfo.pcode,
				cityId:userInfo.ccode,
				version:"5.0",
				clientType:navigator.userAgent,
				urlApp:_bamboo_rep_productlink,
				REMARK2:"WT",
				REMARK3:_bamboo_rep_sortcode+"_"+_bamboo_rep_elementsort}
		} else {
			var url = "http://www.10010.com/emallsupport/count/businessLogRecords.htm" ;
			datapv={transId:_bamboo_rep_transid,
				actCode:_bamboo_rep_actcode,
				upType:_bamboo_rep_uptype,
				menuId:_bamboo_rep_menuid,
				titleName:_bamboo_rep_title,
				mobile:"",
				provId:$.getCookie('userprocode'),
				cityId:$.getCookie('citycode'),
				version:"5.0",
				clientType:navigator.userAgent,
				urlApp:_bamboo_rep_productlink,
				REMARK2:"WT",
				REMARK3:_bamboo_rep_sortcode+"_"+_bamboo_rep_elementsort}

		}
        t = _bamboo_rep_transid     + "1=======1"+
        _bamboo_rep_title       + "2=======2"+
        _bamboo_rep_actcode     + "3=======3"+
        _bamboo_rep_menuid      + "4=======4"+
        _bamboo_rep_uptype      + "5=======5" +
        _bamboo_rep_productlink;
        //console.info(url);

        jQuery.ajax({
            url : url,
            type : "POST",
            data : datapv,
            async : false,
            dataType : "JSON",
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            success : function(data) {
            },
            error:function(data){
            }
        });

		return false;
	});
	$("#searchWord").keypress(function(event){			
		 if(event.keyCode==13){
			 event.preventDefault();
			 $("#searchButton").click();
		}
		
	});	   	
}


	
function initEvent(){
	$('.OptionSet').bind('click',function(event){
	    event.stopPropagation();
	    var target = (event.target.nodeName == 'LI')? $(event.target):$(event.target).parents('li');
	    var targetValue = target.text();
	    var showValue = $(this).siblings('.showOptionChoice').text();
	    $(this).siblings('.showOptionChoice').text(targetValue);
	    target.text(showValue);
	    $(this).hide();
	    $(this).siblings('.PCSearchDown').removeClass('downup');
	    if(targetValue=='商品'){
	    	$("#hotSearchWord").html(product);
	    }else if(targetValue=='服务'){
	    	$("#hotSearchWord").html(service);
	    }
	});
	$('.searchOptionBox').bind('click',function(event){
	    event.stopPropagation();
	    var isup = $(this).children('.PCSearchDown').hasClass('downup');
	    if(isup){
	        $(this).children('.OptionSet').hide();
	    $(this).children('.PCSearchDown').removeClass('downup');
	    }else{
	        $(this).children('.OptionSet').show();
	    $(this).children('.PCSearchDown').addClass('downup');
	    }
	    
	});

//	$('body').bind('click',function(){
//	var searchList = $('.searchOptionBox').children('.PCSearchDown').hasClass('downup');
//	if(searchList){
//	  $('.searchOptionBox').children('.PCSearchDown').removeClass('downup');
//	  $('.searchOptionBox').children('.OptionSet').hide();
//	}
//	});
	

	
}



