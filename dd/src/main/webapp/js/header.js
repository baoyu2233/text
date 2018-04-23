var login = myLoginObj.sendRequest();
var userInfo = myLoginObj.commonInfo();
var locationUrl = window.location.href;
$(function() { 
	$('.AdPro,.ProMc,.lxjxNavDel,.bannerNumberDiv,.ProMc,.topAdPro,.logo1AdPro,.AdPro,.bfFbDiv4').remove();
	$('.bfFbDiv3,.bfFbDiv2,.lxjxNavAddDiv,.numBerNavDelB,.mobileNumberUl1Ad,.floorTitAdd,.close2,.closeLi1').remove();
	// 判断用户是否登录
	if (login) {
		if (userInfo.usernumber == "thirdparty") { // 第三方用户登录
			Query_Main.loadData("/userinfoqueryadsl",null,"personalInfoAdsl_Callback(data)"); 	
		} else if (userInfo.usernumber == "11111111111") {
			CommonMain.loadData("/common/getUserinfo",null,"personalInfo_Callback(data)"); 	
		} else {
				if (userInfo.nettype =='11' || userInfo.nettype=='01' || userInfo.nettype=='02') { // 2,3,4G手机用户 
					Query_Main.loadData("/userinfoquery",null,"personalInfo_Callback(data)"); 	
				} else if (userInfo.nettype=='04' || userInfo.nettype=='05' || userInfo.nettype=='13' || userInfo.nettype=='14') { // 宽带
					Query_Main.loadData("/userinfoqueryadsl",null,"personalInfoAdsl_Callback(data)"); 
				} else if (userInfo.nettype=='03' || userInfo.nettype=='12') {  // 固话 			
					Query_Main.loadData("/userinfoqueryadsl",null,"personalInfoAdsl_Callback(data)");	
				} else { // 上网卡
					Query_Main.loadData("/userinfoqueryadsl",null,"personalInfoAdsl_Callback(data)");	
				}
		}
		Query_Main.loadData("/message/pageList",{
			currentPage: 1,
			pageSize: 2
			
		},"call_back(data)");  // 消息管理
		CommonMain.loadData("/common/findallbyuserid",null,"collection_back(data)");
        //查询智慧服务，为联通精选猜你喜欢赋值
        QueryZhfw.QueryData();
        var expiresDate= new Date();
        expiresDate.setTime(expiresDate.getTime() + (60*30*1000));
        $.cookie('loginflag', true, { path: '/',domain:'.10010.com',expires:  expiresDate});
        if (userInfo.pcode == null || userInfo.ccode == null) { // 第三方登录方式
        	
        } else { 
	        if (userInfo.pcode != null && userInfo.pcode.length > 2) {
	        	procode = userInfo.pcode.substr(1);
	        } else {
	        	procode = userInfo.pcode;
	        }
	       if ($.getCookie("mallcity") != null && ($.getCookie("mallflag") == null || $.getCookie("mallflag") == "")) {
	    		$(PROVINCE_INFO).each(function(t,x){
	  			  if (x.provinceCode == procode) {
	  				  $(".area_show").html(x.provinceName);
	  			  }
	    		});
	            mallcity = procode + "|" + userInfo.ccode;
	    		$.cookie("userprocode",userInfo.pcode,{path:"/",domain:".10010.com"});
	    		$.cookie("citycode",userInfo.ccode,{path:"/",domain:".10010.com"});
	        	Set_Cookie("mallflag", 0, 3, "/", ".10010.com");
	            Set_Cookie("mallcity", mallcity, 3, "/", ".10010.com");				
	            if (userInfo.pcode == null ) {
	            	window.location.href = CommonsVariables.RequestPrefix()+'/net5';
	            } else {
	            	window.location.href = CommonsVariables.RequestPrefix()+'/net5/'+userInfo.pcode + "/";
	            }
	        } else {
	        	Set_Cookie("mallflag", null, 3, "/", ".10010.com");
	        }
        }
	} else {
		Query_Main.processTemplateData('#personalInfo','personalInfoTemplate',null); // 个人信息请求
		$("#userInfo").attr("style","display:none");
        //隐藏联通精选 猜你喜欢 相关内容
        var ltjxNavLg=$('.lx_jx_sx_ul>li').length;
        if(ltjxNavLg>3){
            $('.lx_jx_sx_ul').width('328px');
        }else{
            $('.lx_jx_sx_ul').width('212px');
        }
        $('.lx_jx_sx_ul>li').eq(2).remove();
        $('.lx_jx_pro_ul').eq(2).remove();
        $('.lx_jx_sx_ul>li').last().addClass('marginR0');
	}
	
	// 登录按钮调转地址
	var locationUrl = window.location.href;
	if (locationUrl == null) {
		locationUrl = window.parent.location.href
	}
	
	$("#location_url").attr("href","https://uac.10010.com/portal/mallLogin.jsp?redirectURL="+window.location.href);


	// 公告信息展示。
	Query_Main.loadData("/announcementquery",{pageNo:1,pageSize:12,province:$.getCookie("userprocode")},"announcementCall_back(data)");
});


var QueryZhfw = {
    QueryData : function() {
        var url ="//www.10010.com/mall/service/query/queryWisdom";
        jQuery.ajax({
            url : url,
            type : "POST",
            success : function(data) {
                //data="";//测试后台返回空的情况
                if(data==""||data==null){
                    //隐藏联通精选 猜你喜欢 相关内容
                    var ltjxNavLg=$('.lx_jx_sx_ul>li').length;
                    if(ltjxNavLg>3){
                        $('.lx_jx_sx_ul').width('328px');
                    }else{
                        $('.lx_jx_sx_ul').width('212px');
                    }
                    $('.lx_jx_sx_ul>li').eq(2).remove();
                    $('.lx_jx_pro_ul').eq(2).remove();
                    $('.lx_jx_sx_ul>li').last().addClass('marginR0');
                }else{
                    //把内容 填写到 联通精选 猜你喜欢 的四个块中
                    var xqo = eval('(' + data + ')');
                    var ltjxCnxhUL=$('.lx_jx_pro_ul').eq(2);//获取到联通精选-猜你喜欢Ul
                    ltjxCnxhUL.html('');
                    for(var i in xqo){
                        var elementsortval=parseInt(i)+1;
                        var newLink = xqo[i].productRedirecturl;//获取链接地址
                        var title = xqo[i].productName;//获取标题
                        var subTitle = xqo[i].productDesc;//获取副标题
                        var imgSrc = xqo[i].productUrl;//获取图片路径
                        var productCode = xqo[i].productCode;//获取产品编码
                        var ltjxCnxhLi='';
                        ltjxCnxhLi+='<li class="validateElement" _bamboo_rep_transid="170171001" _bamboo_rep_productlink="'+newLink+'" _bamboo_rep_menuid="'+productCode+'" elementsort="'+elementsortval+'"> ';
                        ltjxCnxhLi+='<p class="jx_tit">'+title+'</p> <p class="jx_tit2">'+subTitle+'</p>';
                        ltjxCnxhLi+='<div class="lx_jx_pro_img_div"><img src="'+imgSrc+'" class="lx_jx_pro_img"/></div>';
                        ltjxCnxhLi+='</li>';
                        ltjxCnxhUL.append(ltjxCnxhLi);
                    }
                }
            },
            error:function(){
                //报错页面
            }
        });
    }


};



// 消息管理
function call_back(data) {
    setTimeout(function(){
    	$("#messageList").html("(" + data.noReadCount + ")");
    },200);	
}
// 2,3,4G手机用户
function personalInfo_Callback(data) {
	if (data != null && data.resource != null && data.resource.dataList != null 
			&& data.resource.dataList.length > 0) {
		Query_Main.processTemplateData('#personalInfo','personalInfoTemplate',data);
		Query_Main.processTemplateData('#userInfo','userInfoTemplate',data); // 个人信息请求
	} else {
		Query_Main.processTemplateData('#personalInfo','personalInfoTemplate',data);
		$("#userInfo").attr("style","display:none");
	}
	
}
// 宽带用户
function personalInfoAdsl_Callback(data) {
	if (data != null && data.resource != null && data.resource.dataList != null) {
		Query_Main.processTemplateData('#personalInfo','personalInfoTemplate',data);
		Query_Main.processTemplateData('#userInfo','userInfoAdslTemplate',data); // 个人信息请求
	} else {
		Query_Main.processTemplateData('#personalInfo','personalInfoTemplate',data);
		$("#userInfo").attr("style","display:none");
	}
	
}
// 公告信息展示
function announcementCall_back(data) {
	if (data.result.length > 0) {
		Query_Main.processTemplateData('#announcement','announcementTemplate',data);
	} else {
		$("#announcement").html("<li><span class='listRound'></span>暂无公告</li> ");
	}
}
function collection_back(data) {	
	for (var i = 0; i < data.length ;i++) {
		if (data[i].productId != undefined && data[i].productId != null && data[i].productId != "") {
			$('[_bamboo_rep_menuid=' + data[i].productId + ']').find('.collect_icon1', '.collect_icon2').attr('src', '//m1.img.10010.com/net5/front/images/collect_icon2_zhl.png');
			$('[_bamboo_rep_menuid=' + data[i].productId + ']').find('.collect_icon1', '.collect_icon2').addClass('ysc');
			$('[_bamboo_rep_menuid=' + data[i].productId + ']').find('.collect_icon1', '.collect_icon2').attr("dto.id",data[i]._id);
		}
	}
}

function exchangePackage(){//根据网别确定换套餐入口的地址
	//处理换套餐的链接
	if(userInfo.nettype =='11'){//4G
		return "http://iservice.10010.com/e4/transact/4gchange/4gchange_main.html?menuCode=000300020001";
	}else{
		return "http://iservice.10010.com/e4/WT4/WT4_MENU_4_002/handle.html";
	}
	
}