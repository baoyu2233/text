var radomT = "?_=" + (new Date()).getTime();
/*document.domain = "10010.com";*/
var remote_ip_info;
var HOME_PAGE = [['/011/','11'],['/013/','13'],['/018/','18'],['/019/','19'],['/010/','10'],['/091/','91'],['/090/','90'],['/097/','97'],['/031/','31'],['/034/','34'],['/036/','36'],['/030/','30'],['/038/','38'],['/075/','75'],['/017/','17'],['/076/','76'],['/071/','71'],['/050/','50'],['/051/','51'],['/059/','59'],['/074/','74'],['/083/','83'],['/081/','81'],['/085/','85'],['/086/','86'],['/079/','79'],['/084/','84'],['/087/','87'],['/070/','70'],['/088/','88'],['/089/','89'],['/HK/', 'HK', ],['/011/index.html','11'],['/013/index.html','13'],['/018/index.html','18'],['/019/index.html','19'],['/010/index.html','10'],['/091/index.html','91'],['/090/index.html','90'],['/097/index.html','97'],['/031/index.html','31'],['/034/index.html','34'],['/036/index.html','36'],['/030/index.html','30'],['/038/index.html','38'],['/075/index.html','75'],['/017/index.html','17'],['/076/index.html','76'],['/071/index.html','71'],['/050/index.html','50'],['/051/index.html','51'],['/059/index.html','59'],['/074/index.html','74'],['/083/index.html','83'],['/081/index.html','81'],['/085/index.html','85'],['/086/index.html','86'],['/079/index.html','79'],['/084/index.html','84'],['/087/index.html','87'],['/070/index.html','70'],['/088/index.html','88'],['/089/index.html','89'],['/HK/index.html','HK']]
var CommonsVariables = {
		// Unified request prefix
	RequestPrefix : function() {
			return "//www.10010.com";
	},
	ServiceRequestPrefix : function() {
		return "//www.10010.com/mall/service";
	},
	QueryRequestPrefix : function() {
		return "//www.10010.com/mall/service/query";
	}
};
//放cookie
(function ($) {
	    if (!$.setCookie) {
	        $.extend({
	            setCookie: function (c_name, value, exdays) {
	                try {
	                    if (!c_name) return false;
	                    var exdate = new Date();
	                    exdate.setDate(exdate.getDate() + exdays);QueryMain
	                    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	                    document.cookie = c_name + "=" + c_value;
	                }
	                catch (err) {
	                    return '';
	                };
	                return '';
	            }
	        });
	    };
	    if (!$.getCookie) {
	        $.extend({
	            getCookie: function (c_name) {
	                try {
	                    var i, x, y,
	                        ARRcookies = document.cookie.split(";");
	                    for (i = 0; i < ARRcookies.length; i++) {
	                        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
	                        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
	                        x = x.replace(/^\s+|\s+$/g, "");
	                        if (x == c_name) return (y);
	                    };
	                }
	                catch (err) {
	                    return '';
	                };
	                return '';
	            }
	        });
	    };
	})(jQuery);

var  isSupport=function(){ 	
 	var isName = window.navigator.appName; 
 	if(isName!="Netscape"){
 		 //isIE
          if(isName.indexOf("Microsoft")==0){
            var  isIE =	window.navigator.appVersion.split(";");
            var IeNumber =isIE[1].split('.')[0].toString().substr(5);
             if(IeNumber<9){
             	return false;
             }else{
            	 return true;
             }
            
          }else{
        	  return true;
          }
 	}else{
 		return true;
 	}
 	
 }
var wt2BaseCommon = {
	loginSuccess : function() {
		$('#login_iframe').removeAttr('src');
		CommonMain.loadData("/common/l",null,'Login.on(data)');
	}
};
var mallWebBaseCommon = {
	loginSuccess : function() {
		$('#login_iframe').removeAttr('src');
		CommonMain.loadData("/common/l",null,'Login.on(data)');
	}
};
var Login={
	on:function(data){
		if (window.location.href.indexOf('/e5/') != -1) { // 为网厅/e5 url不跳转。
			return ;
		}
		if (window.location.href.indexOf('/index_a') != -1) { // 为第三方页头页尾 url不跳转。
			return ;
		}
		// 登录框蒙层
		if(data.result){
				//如果是邮箱登录，未绑定手机号码
			if ($.getCookie("loginflag") == null || $.getCookie("loginflag") == "") {
				window.location.href = CommonsVariables.RequestPrefix() +"/net5/index.html";
			} else {
				return ;
			}
		} else {
			window.location.href = CommonsVariables.RequestPrefix() +"/net5/index.html";
			return;
		}
	}
};
String.prototype.endWith=function(s){
	if(s==null||s==""||this.length==0||s.length>this.length)
		return false;
	if(this.substring(this.length-s.length)==s)
		return true;
	else
		return false;
	return true;
};

function getCookie(c_name) {
	try {
		var i, x, y,
			ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) return (y);
		};
	}
	catch (err) {
		return '';
	};
	return '';
}
/**
 * 获取URL请求参数
 */
var GetParam = {
	getURLParameter : function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '='
				+ '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [ , "" ])[1]
				.replace(/\+/g, '%20'))
				|| null;
	},
	getParamsByMonth : function() {
		return GetParam.getURLParameter("monthDate");
	},getUrlNoParameter:function(){
		var thisurl =window.location.href;
		var indexOfUrlAfter=thisurl.indexOf("?");
		var partUrl="";
		if(indexOfUrlAfter==-1){
			partUrl=thisurl;
		}else
		{
			partUrl= thisurl.substring(0,indexOfUrlAfter);
		}
		return partUrl;
	}
};
var Query_Main = {
	loadData : function(argUrl, paramdata, fun) {
		radomT = "?_=" + (new Date()).getTime();
		var url = CommonsVariables.QueryRequestPrefix() + argUrl + radomT;
		jQuery.ajax({
			url : url,
			type : "POST",
			data : paramdata,
			async : true,
			dataType : "JSON",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			//complete : closeMask,
			complete:function(){
				$(".loadingBg ").hide();
			},
			beforeSend : function() {
				// 可加载loding框
                $(".loadingBg ").show();
			},
			success : function(data) {
				eval(fun);

			},
			error:function(){
				//报错页面
			}
		});
	},
	// 处理数据，加载jstemplate模板
	processTemplateData : function(show, templateId, data) {
		$(show).setTemplateElement(templateId).processTemplate(data);
	}
};
var _QueryMain = { // QueryMain 同步方法
    loadData : function(argUrl, paramdata, fun) {
        radomT = "?_=" + (new Date()).getTime();
        var url = CommonsVariables.QueryRequestPrefix() + argUrl + radomT;
        jQuery.ajax({
            url : url,
            type : "POST",
            data : paramdata,
            async : false,
            dataType : "JSON",
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            //complete : closeMask,
            complete:function(){
                $(".loadingBg").hide();
            },
            beforeSend : function() {
                $(".loadingBg").show();
                // 可加载loding框
            },
            success : function(data) {
                eval(fun);

            },
            error:function(){
                //报错页面
            }
        });
    },
    // 处理数据，加载jstemplate模板
    processTemplateData : function(show, templateId, data) {
        $(show).setTemplateElement(templateId).processTemplate(data);
    }
};
var CommonMain = {
	loadData : function(argUrl, paramdata, fun) {
		radomT = "?_=" + (new Date()).getTime();
		var url = CommonsVariables.ServiceRequestPrefix() + argUrl + radomT ;
		jQuery.ajax({
			url : url,
			type : "POST",
			data : paramdata,
			async : true,
			dataType : "JSON",
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            complete:function(){
                $(".loadingBg").hide();
            },
            beforeSend : function() {
                $(".loadingBg").show();
                // 可加载loding框
            },
			success : function(data) {
				eval(fun);
			},
			error:function(){				
			}
		});
	},
	// 处理数据，加载jstemplate模板
	processTemplateData : function(show, templateId, data) {
		$(show).setTemplateElement(templateId).processTemplate(data);
	},// 分享方法
	share : function(type, content) {
		var link = '';
		switch (type) {
		// 新浪
		case 'sina':
			link = 'http://v.t.sina.com.cn/share/share.php?&url={url}&title={title}&pic={pic:|}';
			break;
		// qq微博
		case 'qqt':
			link = 'http://v.t.qq.com/share/share.php?title={title}&url={url}&pic={pic:|}';
			break;
		// 人人网
		case 'renren':
			link='http://widget.renren.com/dialog/share?resourceUrl={url}&title={title}&pic={pic:|}';
			break;
		// qq空间
		case 'qzone':
			link = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic:|}';
			break;
		// souhu
		case 'souhu':
			link = 'http://t.sohu.com/third/post.jsp?content=utf-8&url={url}&title={title}&pic={pic:|}';
			break;
		// kaixin
		case 'kaixin':
			link='http://www.kaixin001.com/repaste/share.php?rtitle={title}&rurl={url}&rcontent={title}&pic={pic:|}';
			break;
		// douban
		case 'douban':
			link = 'http://www.douban.com/share/service?image=&href={url}&name={title}';
			break;
		}

		// $('img').each(function(i, n) {
		// pics.push(n.src);
		// });
		if (content) {
			if (content.length > 200) {
				content = content.substring(0, 200);
			}
			link = link.replace('{title}', encodeURIComponent(content));
		} else {
			link = link
					.replace(
							'{title}',
							encodeURIComponent('新版中国联通网上营业厅 ，速度更快，功能更全，服务更贴心，还有各种优惠活动，快去体验一下吧。'));
		}
		link = link.replace('{url}', 'http://www.10010.com');
		link = link
				.replace('{pic:|}',
						'http://res.mall.10010.com/mall/front/images/logo.png?resVer=20120817000102');
		window.open(link);
	}
};

var _CommonMain = { // CommonMain 同步方法
    loadData : function(argUrl, paramdata, fun) {
        radomT = "?_=" + (new Date()).getTime();
        var url = CommonsVariables.ServiceRequestPrefix() + argUrl + radomT ;
        jQuery.ajax({
            url : url,
            type : "POST",
            data : paramdata,
            async : false,
            dataType : "JSON",
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            complete:function(){
                $(".loadingBg").hide();
            },
            beforeSend : function() {
                $(".loadingBg").show();
                // 可加载loding框
            },
            success : function(data) {
                eval(fun);
            },
            error:function(){
            }
        });
    }
};

// 注销
function logout(){
	CommonMain.loadData("/common/logout", null, 'logout_ballback()');
}
// 注销返回
function logout_ballback(){
	$.cookie('JUT', null, { path: '/',domain:'.10010.com'  });
	$.cookie('mallcity', null, { path: '/',domain:'.10010.com' });
	$.cookie('mallflag', null, { path: '/',domain:'.10010.com' });
	$.cookie('loginflag', null, { path: '/',domain:'.10010.com' });
	$.cookie('piw', null, { path: '/',domain:'.10010.com' });

		window.location.href = CommonsVariables.RequestPrefix() + "/net5/index.html";

}

// 跳转页面
function redirectUrl(data) {
		window.location.href = data;
}
var jutThird=getCookie("JUT");
var myLoginObj = {
		userInfo:null,
		isLogin :false,
		thirdData:null,
		sendRequest:function(){
			var url = CommonsVariables.ServiceRequestPrefix() + "/check/checklogin/?_="
					+ new Date().getTime();
			$.ajax({
				url : url,
				async : false,
				data : {jutThird:jutThird},
				type : "POST",
				dataType : "json",
				success : function(data) {
					if (data != null && data.isLogin) {
						myLoginObj.isLogin = true;

						if(data.userInfo!=null){
							myLoginObj.thirdData=data;
							myLoginObj.userInfo=data.userInfo;
						}
					}
				}
			});
			//alert('this.isLogin='+this.isLogin);
			return this.isLogin;
		},
		commonInfo:function(){
			var url = CommonsVariables.ServiceRequestPrefix() + "/common/info/?_="
			+ new Date().getTime();
			$.ajax({
				url : url,
				async : false,
				data : {},
				type : "POST",
				dataType : "json",
				success : function(data) {
					if (data != null) {
						myLoginObj.userInfo = data;
					} 
				}
			});
			return this.userInfo;
		}
};

//放缓存
function Set_Cookie(name, value, expires, path, domain, secure) {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());
    // if the expires variable is set, make the correct expires time, the
    // current script below will set it for x number of days, to make it
    // for hours, delete * 24, for minutes, delete * 60 * 24
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    //alert( 'today ' + today.toGMTString() );// this is for testing purpose only
    var expires_date = new Date(today.getTime() + (expires));
    //alert('expires ' + expires_date.toGMTString());// this is for testing purposes only

    document.cookie = name + "=" + value +
        ((expires) ? ";expires=" + expires_date.toGMTString() : "") + //expires.toGMTString()
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ((secure) ? ";secure" : "");
}

function judgeIsBlank(str){
	if(str==''||str==null||str==undefined){
		return true;
	}else{
		return false;
	}
}
