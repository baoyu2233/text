var menuArray=["home","query","handle","pay","number","mobile","broadband","netcard","flowpackage","rechargecard","mall","special","international","discount","integral","myunicom","service"];
var menuArrayOnlyFast=["service"];

var stringToJSON = function(obj) {
    return eval('(' + obj + ')');
};

var PROVINCE_INFO = stringToJSON('[{"cityCode":"110","cityName":"北京","provinceCode":"11","provinceName":"北京"},{"cityCode":"130","cityName":"天津","provinceCode":"13","provinceName":"天津"},{"cityCode":"188","cityName":"石家庄","provinceCode":"18","provinceName":"河北"},{"cityCode":"190","cityName":"太原","provinceCode":"19","provinceName":"山西"},{"cityCode":"101","cityName":"呼和浩特","provinceCode":"10","provinceName":"内蒙古"},{"cityCode":"910","cityName":"沈阳","provinceCode":"91","provinceName":"辽宁"},{"cityCode":"901","cityName":"长春","provinceCode":"90","provinceName":"吉林"},{"cityCode":"971","cityName":"哈尔滨","provinceCode":"97","provinceName":"黑龙江"},{"cityCode":"310","cityName":"上海","provinceCode":"31","provinceName":"上海"},{"cityCode":"340","cityName":"南京","provinceCode":"34","provinceName":"江苏"},{"cityCode":"360","cityName":"杭州","provinceCode":"36","provinceName":"浙江"},{"cityCode":"305","cityName":"合肥","provinceCode":"30","provinceName":"安徽"},{"cityCode":"380","cityName":"福州","provinceCode":"38","provinceName":"福建"},{"cityCode":"750","cityName":"南昌","provinceCode":"75","provinceName":"江西"},{"cityCode":"170","cityName":"济南","provinceCode":"17","provinceName":"山东"},{"cityCode":"760","cityName":"郑州","provinceCode":"76","provinceName":"河南"},{"cityCode":"710","cityName":"武汉","provinceCode":"71","provinceName":"湖北"},{"cityCode":"501","cityName":"海口","provinceCode":"50","provinceName":"海南"},{"cityCode":"510","cityName":"广州","provinceCode":"51","provinceName":"广东"},{"cityCode":"591","cityName":"南宁","provinceCode":"59","provinceName":"广西"},{"cityCode":"741","cityName":"长沙","provinceCode":"74","provinceName":"湖南"},{"cityCode":"831","cityName":"重庆","provinceCode":"83","provinceName":"重庆"},{"cityCode":"810","cityName":"成都","provinceCode":"81","provinceName":"四川"},{"cityCode":"850","cityName":"贵阳","provinceCode":"85","provinceName":"贵州"},{"cityCode":"860","cityName":"昆明","provinceCode":"86","provinceName":"云南"},{"cityCode":"790","cityName":"拉萨","provinceCode":"79","provinceName":"西藏"},{"cityCode":"841","cityName":"西安","provinceCode":"84","provinceName":"陕西"},{"cityCode":"870","cityName":"兰州","provinceCode":"87","provinceName":"甘肃"},{"cityCode":"700","cityName":"西宁","provinceCode":"70","provinceName":"青海"},{"cityCode":"880","cityName":"银川","provinceCode":"88","provinceName":"宁夏"},{"cityCode":"890","cityName":"乌鲁木齐","provinceCode":"89","provinceName":"新疆"},{"cityCode":"HK","cityName":"香港","provinceCode":"HK","provinceName":"香港"}]');


var ConstPV= {  //  pv日志变量定义
		 	'':{act_code:'',level1:'',act_name:''},
		    '110110001':{act_code:'110110001',level1:'公告',act_name:'首页公告'},
		    '110110002':{act_code:'110110002',level1:'公告',act_name:'公告列表'},
			'120120001':{act_code:'120120001',level1:'购物车',act_name:'购物车'},
			'130130001':{act_code:'130130001',level1:'搜索',act_name:'首页商品搜索'},
			'130130002':{act_code:'130130002',level1:'搜索',act_name:'首页服务搜索'},
			'140140001':{act_code:'140140001',level1:'收藏',act_name:'首页收藏'},
			'150151001':{act_code:'150151001',level1:'导航',act_name:'导航首页'},
			'150152001':{act_code:'150152001',level1:'导航',act_name:'导航查询'},
			'150153001':{act_code:'150153001',level1:'导航',act_name:'导航办理'},
			'150154001':{act_code:'150154001',level1:'导航',act_name:'导航交费'},
			'150155001':{act_code:'150155001',level1:'导航',act_name:'导航套餐号码'},
			'150156001':{act_code:'150156001',level1:'导航',act_name:'导航手机配件'},
			'150157001':{act_code:'150157001',level1:'导航',act_name:'导航宽带'},
			'150158001':{act_code:'150158001',level1:'导航',act_name:'导航上网卡'},
			'150159001':{act_code:'150159001',level1:'导航',act_name:'导航流量包'},
			'150160001':{act_code:'150160001',level1:'导航',act_name:'导航充值卡'},
			'150161001':{act_code:'150161001',level1:'导航',act_name:'导航商城'},
			'150162001':{act_code:'150162001',level1:'导航',act_name:'特色专区'},
			'150163001':{act_code:'150163001',level1:'导航',act_name:'导航国际漫游'},
			'150164001':{act_code:'150164001',level1:'导航',act_name:'特惠'},
			'150165001':{act_code:'150165001',level1:'导航',act_name:'导航积分商城'},
			'150166001':{act_code:'150166001',level1:'导航',act_name:'导航我的联通'},
			'150167001-1':{act_code:'150167001-1',level1:'查询',act_name:'快捷导航'},
			'150167001-2':{act_code:'150167001-2',level1:'办理',act_name:'快捷导航'},
			'150167001-3':{act_code:'150167001-3',level1:'交费',act_name:'快捷导航'},
			'150167001-4':{act_code:'150167001-4',level1:'生活',act_name:'快捷导航'},
			'160161001':{act_code:'160161001',level1:'广告',act_name:'门楣广告'},
			'160162001':{act_code:'160162001',level1:'广告',act_name:'logo广告'},
			'170171001':{act_code:'170171001',level1:'广告',act_name:'联通精选'},
			'170171002':{act_code:'170171002',level1:'广告',act_name:'4G套餐'},
			'170171003':{act_code:'170171003',level1:'广告',act_name:'流量专区'},
			'170171004':{act_code:'170171004',level1:'广告',act_name:'宽带专区'},
			'170171005':{act_code:'170171005',level1:'广告',act_name:'生活服务'},
			'170171006':{act_code:'170171006',level1:'广告',act_name:'上网卡'},
			'170171007':{act_code:'170171007',level1:'广告',act_name:'手机配件'},
			'170171008':{act_code:'170171008',level1:'广告',act_name:'靓号专区'},
			'170172001':{act_code:'170172001',level1:'广告',act_name:'导航广告'},
			'170173001':{act_code:'170173001',level1:'广告',act_name:'banner广告'},
			'170173002':{act_code:'170173002',level1:'广告',act_name:'banner查询'},
			'170173003':{act_code:'170173003',level1:'广告',act_name:'banner办理'},
			'170173004':{act_code:'170173004',level1:'广告',act_name:'banner交费'},
			'170173005':{act_code:'170173005',level1:'广告',act_name:'banner套餐号码'},
			'170173006':{act_code:'170173006',level1:'广告',act_name:'banner手机配件'},
			'170173007':{act_code:'170173007',level1:'广告',act_name:'banner宽带'},
			'170173008':{act_code:'170173008',level1:'广告',act_name:'banner上网卡'},
			'170173009':{act_code:'170173009',level1:'广告',act_name:'banner流量包'},
			'170173010':{act_code:'170173010',level1:'广告',act_name:'banner充值卡'},
			'170173011':{act_code:'170173011',level1:'广告',act_name:'banner我的联通'},
			'170173012':{act_code:'170173012',level1:'广告',act_name:'banner特殊专区'},
			'180181001':{act_code:'180181001',level1:'按钮',act_name:'首页右侧导航'},
			'180182001':{act_code:'180182001',level1:'按钮',act_name:'充值'},
			'180183001':{act_code:'180183001',level1:'按钮',act_name:'页头信息'},
			'180184001':{act_code:'180184001',level1:'按钮',act_name:'底部服务'},
			'180185001':{act_code:'180185001',level1:'按钮',act_name:'流量专区二级导航'},
			'180186001':{act_code:'180186001',level1:'按钮',act_name:'宽带专区二级导航'},
			'180187001':{act_code:'180187001',level1:'按钮',act_name:'4G套餐二级导航'},
			'180188001':{act_code:'180188001',level1:'按钮',act_name:'靓号专场二级导航'},
			'180189001':{act_code:'180189001',level1:'按钮',act_name:'手机配件二级导航'},
			'180190001':{act_code:'180190001',level1:'按钮',act_name:'上网卡二级导航'},
			'180191001':{act_code:'180191001',level1:'按钮',act_name:'生活服务二级导航'},
			'170171001-1':{act_code:'170171001-1',level1:'联通精选',act_name:'人气推荐'},
			'170171001-2':{act_code:'170171001-2',level1:'联通精选',act_name:'特色专区'},
			'170171001-3':{act_code:'170171001-3',level1:'联通精选',act_name:'猜您喜欢'},
			'170171001-4':{act_code:'170171001-4',level1:'联通精选',act_name:'限时抢购'}
				
};
var mallContent={
	    "011": {
	        "mallname": "北京",
	        "url": "http://mall.10010.com/bj/",
	        "combourl": "http://s.10010.com/bj/feeset/"
	    },
	    "013": {
	        "mallname": "天津",
	        "url": "http://mall.10010.com/tj/",
	        "combourl": "http://s.10010.com/tj/feeset/"
	    },
	    "018": {
	        "mallname": "河北",
	        "url": "http://mall.10010.com/hebei/",
	        "combourl": "http://s.10010.com/hebei/feeset/"
	    },
	    "019": {
	        "mallname": "山西",
	        "url": "http://mall.10010.com/sx/",
	        "combourl": "http://s.10010.com/sx/feeset/"
	    },
	    "010": {
	        "mallname": "内蒙古",
	        "url": "http://mall.10010.com/nmg/",
	        "combourl": "http://s.10010.com/nmg/feeset/"
	    },
	    "091": {
	        "mallname": "辽宁",
	        "url": "http://mall.10010.com/ln/",
	        "combourl": "http://s.10010.com/ln/feeset/"
	    },
	    "090": {
	        "mallname": "吉林",
	        "url": "http://mall.10010.com/jl/",
	        "combourl": "http://s.10010.com/jl/feeset/"
	    },
	    "097": {
	        "mallname": "黑龙江",
	        "url": "http://mall.10010.com/hlj/",
	        "combourl": "http://s.10010.com/hlj/feeset/"
	    },
	    "031": {
	        "mallname": "上海",
	        "url": "http://mall.10010.com/sh/",
	        "combourl": "http://s.10010.com/sh/feeset/"
	    },
	    "034": {
	        "mallname": "江苏",
	        "url": "http://mall.10010.com/js/",
	        "combourl": "http://s.10010.com/js/feeset/"
	    },
	    "036": {
	        "mallname": "浙江",
	        "url": "http://mall.10010.com/zj/",
	        "combourl": "http://s.10010.com/zj/feeset/"
	    },
	    "030": {
	        "mallname": "安徽",
	        "url": "http://mall.10010.com/ah/",
	        "combourl": "http://s.10010.com/ah/feeset/"
	    },
	    "038": {
	        "mallname": "福建",
	        "url": "http://mall.10010.com/fj/",
	        "combourl": "http://s.10010.com/fj/feeset/"
	    },
	    "075": {
	        "mallname": "江西",
	        "url": "http://mall.10010.com/jx/",
	        "combourl": "http://s.10010.com/jx/feeset/"
	    },
	    "017": {
	        "mallname": "山东",
	        "url": "http://mall.10010.com/sd/",
	        "combourl": "http://s.10010.com/sd/feeset/"
	    },
	    "076": {
	        "mallname": "河南",
	        "url": "http://mall.10010.com/henan/",
	        "combourl": "http://s.10010.com/henan/feeset/"
	    },
	    "071": {
	        "mallname": "湖北",
	        "url": "http://mall.10010.com/hubei/",
	        "combourl": "http://s.10010.com/hubei/feeset/"
	    },
	    "050": {
	        "mallname": "海南",
	        "url": "http://mall.10010.com/hainan/",
	        "combourl": "http://s.10010.com/hainan/feeset/"
	    },
	    "051": {
	        "mallname": "广东",
	        "url": "http://mall.10010.com/gd/",
	        "combourl": "http://s.10010.com/gd/feeset/"
	    },
	    "059": {
	        "mallname": "广西",
	        "url": "http://mall.10010.com/gx/",
	        "combourl": "http://s.10010.com/gx/feeset/"
	    },
	    "074": {
	        "mallname": "湖南",
	        "url": "http://mall.10010.com/hunan/",
	        "combourl": "http://s.10010.com/hunan/feeset/"
	    },
	    "083": {
	        "mallname": "重庆",
	        "url": "http://mall.10010.com/cq/",
	        "combourl": "http://s.10010.com/cq/feeset/"
	    },
	    "081": {
	        "mallname": "四川",
	        "url": "http://mall.10010.com/sc/",
	        "combourl": "http://s.10010.com/sc/feeset/"
	    },
	    "085": {
	        "mallname": "贵州",
	        "url": "http://mall.10010.com/gz/",
	        "combourl": "http://s.10010.com/gz/feeset/"
	    },
	    "086": {
	        "mallname": "云南",
	        "url": "http://mall.10010.com/yn/",
	        "combourl": "http://s.10010.com/yn/feeset/"
	    },
	    "079": {
	        "mallname": "西藏",
	        "url": "http://mall.10010.com/xz/",
	        "combourl": "http://s.10010.com/xz/feeset/"
	    },
	    "084": {
	        "mallname": "陕西",
	        "url": "http://mall.10010.com/shanxi/",
	        "combourl": "http://s.10010.com/shanxi/feeset/"
	    },
	    "087": {
	        "mallname": "甘肃",
	        "url": "http://mall.10010.com/gs/",
	        "combourl": "http://s.10010.com/gs/feeset/"
	    },
	    "070": {
	        "mallname": "青海",
	        "url": "http://mall.10010.com/qh/",
	        "combourl": "http://s.10010.com/qh/feeset/"
	    },
	    "088": {
	        "mallname": "宁夏",
	        "url": "http://mall.10010.com/nx/",
	        "combourl": "http://s.10010.com/nx/feeset/"
	    },
	    "089": {
	        "mallname": "新疆",
	        "url": "http://mall.10010.com/xj/",
	        "combourl": "http://s.10010.com/xj/feeset/"
	    },
	    "HK": {
	        "mallname": "香港",
	        "url": "https://www.cuniq.com/cn/"
	    }
	};
var pvContent={
		"home":{"code":"150151001","name":"导航首页","title":"首页"},
		"query":{"code":"150152001","name":"导航查询","title":"查询"},
		"handle":{"code":"150153001","name":"导航办理","title":"办理"},
		"pay":{"code":"150154001","name":"导航交费","title":"交费"},
		"number":{"code":"150155001","name":"导航套餐号码","title":"号码/套餐"},
		"mobile":{"code":"150156001","name":"导航手机配件","title":"手机/配件"},
		"broadband":{"code":"150157001","name":"导航宽带","title":"宽带"},
		"netcard":{"code":"150158001","name":"导航上网卡","title":"上网卡"},
		"flowpackage":{"code":"150159001","name":"导航流量包","title":"流量包"},
		"rechargecard":{"code":"150160001","name":"导航充值卡","title":"充值卡"},
		"mall":{"code":"150161001","name":"导航商城","title":"商城"},
		"special":{"code":"150162001","name":"导航特色专区","title":"特色专区"},
		"international":{"code":"150163001","name":"导航国际漫游","title":"国际漫游"},
		"discount":{"code":"150164001","name":"导航特惠","title":"特惠"},
		"integral":{"code":"150165001","name":"导航积分商城","title":"积分商城"},
		"myunicom":{"code":"150166001","name":"导航我的联通","title":"我的联通"}
	};
var fastEnterCode="150167001";
var faseEnterName="快捷导航";
function trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
var getLocationByIp = {
	execute: function () {
		var provinceShortName;

		if(remote_ip_info==undefined ||remote_ip_info.province=="" ||remote_ip_info.province==undefined ||remote_ip_info.province==null ){
			var url = CommonsVariables.ServiceRequestPrefix() + "/ipAddress/getAreaByIp/?_=" + new Date().getTime();
			$.ajax({
				url: url,
				async: false,
				data: {},
				type: "POST",
				dataType: "json"
			}).always(function (data) {
				if (data != null) {
					if (data.status == 200 && data.responseText != "全球" && data.responseText != "中国" && data.responseText != "未知") {
						provinceShortName = data.responseText;
					} else {
						provinceShortName = "sinovatech"
					}
				}else{
					provinceShortName = "sinovatech"
				}
			});
		}else{
			var provinceShortName = remote_ip_info.province;
		}
		Set_Cookie("mallcity", null, 3, "/", ".10010.com"); // 执行IP定位前，先清除掉mallcity里的值，再设置IP值。
		provinceShortName=trim(provinceShortName);
		if (provinceShortName=="sinovatech" || provinceShortName=="全球"  || provinceShortName =="中国" || provinceShortName =="未知") {
			//alert("当前系统无法识别您的省份,请您手动切换");
			provinceShortName="北京";
		}
		var isJump=true;
		$(PROVINCE_INFO).each(function (t, x) {
			if (x.provinceName == provinceShortName) {
				var mallcity = x.provinceCode + "|" + x.cityCode;
				Set_Cookie("mallcity", mallcity, 3, "/", ".10010.com");
				$.cookie("citycode", x.cityCode, {path: "/", domain: ".10010.com"});
				if (x.provinceCode.indexOf("HK") == 0) {
					procode = x.provinceCode;
				} else {
					procode = "0" + x.provinceCode;
				}
				$.cookie("userprocode", procode, {path: "/", domain: ".10010.com"});
				window.location.href = "http://www.10010.com/net5/" + procode + "/";
				isJump=false;
			}
		});
		if(isJump){
			Set_Cookie("mallcity", "11|110", 3, "/", ".10010.com");
			$.cookie("citycode", "110", {path: "/", domain: ".10010.com"});
			$.cookie("userprocode", 11, {path: "/", domain: ".10010.com"});
			window.location.href = "http://www.10010.com/net5/011/";
		}
	}
};
$(function () {
	setTimeout("loadlogin()",200);
	var mallcity;
    var pcode;
    var citycode;
    var changeFlag;
    var home_pcode;
    
    // 收藏，公告页面切换不跳转
    $(HOME_PAGE).each(function(i,j){
    		if (window.location.href.indexOf(j[0]) != -1) {
    			if ($.getCookie("mallcity") != null && $.getCookie("mallcity") != "") {    				
    			} else {
    				Set_Cookie("mallcity","11|011", 3, "/", ".10010.com"); // 开始执行IP定位前设置默认值
    				getLocationByIp.execute();
    			}
    			mallcity = '';
    			procode = '';
    			cityCode = '';
    			changeFlag = true;
    			home_pcode =j[1];
    			if (home_pcode == "" && $.cookie("mallcity") != "") {
    				home_pcode = $.cookie("mallcity").split("|")[0]; 
    				changeFlag = false;
    			}
        		$(PROVINCE_INFO).each(function(t,x){
    				  if (x.provinceCode == home_pcode) {
    					  $(".area_show").html(x.provinceName);
    					   mallcity = x.provinceCode + "|" + x.cityCode;
    					   cityCode = x.cityCode;
    		  				if (x.provinceCode.indexOf("HK")  == 0) {
    		                    procode = x.provinceCode;
    		                } else {
    		                    procode = "0" + x.provinceCode;
    		                }	
    				  }  				
          		});
          		Set_Cookie("mallcity", mallcity, 3, "/", ".10010.com");
				if (userInfo == null || userInfo.pcode == null || userInfo.pcode==undefined ||userInfo.pcode=="") {
  	        		$.cookie("userprocode",procode,{path:"/",domain:".10010.com"});
  	        		$.cookie("citycode",cityCode,{path:"/",domain:".10010.com"});
          		}
          		return false;
    		} else {
    			changeFlag = false;
    		}
    });
    // 动态生成切换省份
    $(".area_dq li").each(function(i,j){
    	var innerText = $(j).html();
        var text =innerText.substring(0,innerText.indexOf('&gt;'));
        $(PROVINCE_INFO).each(function(t,x){
            if (x.provinceName == text) {
                if (x.provinceCode.indexOf("HK")  == 0) {
                    procode = x.provinceCode;
                } else {
                    procode = "0" + x.provinceCode;
                }
                if (changeFlag) {
                	if (procode == 'HK') {// 香港
                		$(j).attr('onclick',"window.location.href ='https://www.cuniq.com/'");
                	} else { 
                		$(j).attr('onclick',"window.location.href ='"+CommonsVariables.RequestPrefix()+"/net5/"+procode + "/'");
                	}
                } else {
                	if (procode == 'HK') {// 香港
                		$(j).attr('onclick',"window.location.href ='https://www.cuniq.com/'");
                	} else {
                		$(j).attr('onclick','window.location.href =window.location.href');
                	}
                }
                $(j).attr('pcode',x.provinceCode);
                $(j).attr('citycode',x.cityCode);
            }
        });
    });
	// 切换省份事件
    $('.area_selectDiv li').on('click',function () {
		procode = $(this).attr('pcode');
		cityCode= $(this).attr('citycode');
		mallcity = procode+"|" +cityCode;
		$(PROVINCE_INFO).each(function(t,x){
			if (x.provinceCode == procode) {
				$(".area_show").html(x.provinceName);
			}
		});
		if (procode.indexOf("HK") != 0 && procode.length == 2) {
            procode = "0" + procode;
		}
		Set_Cookie("mallcity", mallcity, 3, "/", ".10010.com");
		if (userInfo == null || userInfo.pcode == null || userInfo.pcode==undefined ||userInfo.pcode=="") {
			$.cookie("userprocode",procode,{path:"/",domain:".10010.com"});
			$.cookie("citycode",cityCode,{path:"/",domain:".10010.com"});
		}
    });
	if ($.getCookie("mallcity") != null && $.getCookie("mallcity") != "") {
		mallcity = $.getCookie("mallcity");
		pcode = mallcity.split("|")[0];
		citycode=mallcity.split("|")[1];
		if (!changeFlag) {
    		$(PROVINCE_INFO).each(function(t,x){
				  if (x.provinceCode == pcode) {
					  $(".area_show").html(x.provinceName);
				  }
	    	});
		}
		if (pcode.indexOf("HK")  == 0) {
			procode = pcode;
		} else {
			procode = "0" + pcode;
		}
		if (window.location.href.indexOf('/announcement/') != -1 
				|| window.location.href.indexOf('/usercollection/') != -1 
				|| window.location.href.indexOf('/e5/') != -1
				|| window.location.href.indexOf('/index_a') != -1 
				|| window.location.href.indexOf('/e4') != -1) {
			return;
		}
		if (window.location.href.indexOf(procode) == -1) {
			window.location.href = "http://www.10010.com/net5/" + procode + "/";
		}
		return;
	}
});
/*function loadlogin() {
    jQuery.support.cors = true;
    if (userInfo != null && userInfo.pcode != null && userInfo.pcode != "" && userInfo.nettype != null && userInfo.nettype != ""
        && userInfo.pay != null && userInfo.pay != "" && userInfo.menutype != null && userInfo.menutype != "") {
        $.getJSON("//www.10010.com/net5/front/WT5/WT5_MENU_5_001/" + userInfo.pcode + "/" + userInfo.nettype + "" + userInfo.pay + "_" + userInfo.menutype + "/VERSION.json").done(function (data) {
			for (var i = 0; i < menuArray.length; i++) {
                menuConfig(data, menuArray[i]);
            }
        });
    } else if (userInfo != null && userInfo.pcode != null && userInfo.pcode != "" && userInfo.nettype != null && userInfo.nettype != ""
        && userInfo.pay != null && userInfo.pay != "") {
        $.getJSON("//www.10010.com/net5/front/WT5/WT5_MENU_5_001/" + userInfo.pcode + "/" + userInfo.nettype + "" + userInfo.pay + "/VERSION.json").done(function (data) {
			for (var i = 0; i < menuArray.length; i++) {
                menuConfig(data, menuArray[i]);
            }
        });
    } else {
        var userProcode = $.getCookie('userprocode');
        if(userProcode ==null || userProcode == undefined || userProcode == ''){
            userProcode = "011";
			$.cookie("userprocode",userProcode,{path:"/",domain:".10010.com"});
        }
        $.getJSON("//www.10010.com/net5/front/WT5/WT5_MENU_5_001/" + userProcode + "/888/VERSION.json").done(function (data) {
			for (var i = 0; i < menuArray.length; i++) {
                menuConfig(data, menuArray[i]);
            }
        });
    }
}*/
function checkIsNotBlank(str){
	if(str!=""&&str!=null&&str!=undefined){
		return true;
	}else{
		return false;
	}
}

function jumpUrl(url){
	window.open(url);
}
/*
	加载二三级导航信息及配置一级导航信息
 */
function menuConfig(menu,menuName) {
	var twoMenuTit;
	var twoLevel;
	var oneObj="";
	if(menuName=="home"){oneObj=menu.home;};
	if(menuName=="query"){oneObj=menu.query;};
	if(menuName=="handle"){oneObj=menu.handle;};
	if(menuName=="pay"){oneObj=menu.pay;};
	if(menuName=="number"){oneObj=menu.number;};
	if(menuName=="mobile"){oneObj=menu.mobile;};
	if(menuName=="broadband"){oneObj=menu.broadband;};
	if(menuName=="netcard"){oneObj=menu.netcard;};
	if(menuName=="flowpackage"){oneObj=menu.flowpackage;};
	if(menuName=="rechargecard"){oneObj=menu.rechargecard;};
	if(menuName=="mall"){oneObj=menu.mall;};
	if(menuName=="special"){oneObj=menu.special;};
	if(menuName=="international"){oneObj=menu.international;};
	if(menuName=="discount"){oneObj=menu.discount;};
	if(menuName=="integral"){oneObj=menu.integral;};
	if(menuName=="myunicom"){oneObj=menu.myunicom;};
	
	if(menuName=="service"){oneObj=menu.service;};//只在快捷导航处显示

	if(checkIsNotBlank(oneObj)){
		twoLevel = oneObj.sections;//二级对象
		twoMenuTit=oneObj.sections[0].section.title;//二级标题
		if(checkIsNotBlank(oneObj.icon)){
			$('#'+menuName).parent().append('<img src="'+oneObj.icon+'" class="hot_icon">');//设置图标
		}
		
		//号码/套餐，手机/配件，页面上是一个菜单，但实际配了两个，一级导航的链接需要特殊处理
		var myurl=oneObj.url;
	}
	if($('#'+menuName).parent().find('.adMuneBox ').length!=0 ){

		$('#'+menuName).parent().find('.adMuneBox ').after('<div class="clrDiv"></div>');
	}
		//一级导航的信息配置 pv-start
		if($.inArray(menuName,menuArrayOnlyFast)==-1){//menuName和页面的id是一样的，可以统一判断(不包括服务)
			enterCode=pvContent[menuName]["code"];
			enterName=pvContent[menuName]["name"];
			/*if(menuName=='number'){
				$("#"+menuName).children().eq(0).attr('_bamboo_rep_productLink',myurl);
				var eleObj=menu.packages;
				if(checkIsNotBlank(eleObj)){myurl=eleObj.url;}
				$('#'+menuName).children().eq(1).attr('_bamboo_rep_productLink',mallContent[$.cookie('userprocode')].combourl);
				$("#"+menuName).attr('_bamboo_rep_title',pvContent[menuName]["title"]);//title
				$("#"+menuName).attr('_bamboo_rep_transid',enterCode); //入口编码
				$("#"+menuName).attr('_bamboo_rep_actcode',enterName); //入口位置名称
				$("#"+menuName).attr('_bamboo_rep_uptype','导航'); //类型
				$("#"+menuName).attr('_bamboo_rep_menuid',""); //菜单id-一级的都传空即可-非必填
			}else if(menuName=="mobile"){
				$("#"+menuName).children().eq(0).attr('_bamboo_rep_productLink',myurl);
				var eleObj=menu.parts;
				if(checkIsNotBlank(eleObj)){myurl=eleObj.url;}
				$('#'+menuName).children().eq(1).attr('_bamboo_rep_productLink',myurl);
				$("#"+menuName).attr('_bamboo_rep_title',pvContent[menuName]["title"]);//title
				$("#"+menuName).attr('_bamboo_rep_transid',enterCode); //入口编码
				$("#"+menuName).attr('_bamboo_rep_actcode',enterName); //入口位置名称
				$("#"+menuName).attr('_bamboo_rep_uptype','导航'); //类型
				$("#"+menuName).attr('_bamboo_rep_menuid',""); //菜单id-一级的都传空即可-非必填
			}
			//导航商城改为资费,并且链接更改为//iservice.10010.com/lt/database/charges/zfzq.html
			// else if (menuName=="mall"){
			// 	mallurl = "http://iservice.10010.com/lt/database/charges/zfzq.html";
			// 	$("#"+menuName).attr('_bamboo_rep_productLink',mallurl);
			// 	$("#"+menuName).attr('_bamboo_rep_title','资费');//title
			// 	$("#"+menuName).attr('_bamboo_rep_transid',enterCode); //入口编码
			// 	$("#"+menuName).attr('_bamboo_rep_actcode','资费'); //入口位置名称
			// 	$("#"+menuName).attr('_bamboo_rep_uptype','导航'); //类型
			// 	$("#"+menuName).attr('_bamboo_rep_menuid',""); //菜单id-一级的都传空即可-非必填
			// 	$("#"+menuName).html('资费');
			// }
			else{
				$("#"+menuName).attr('_bamboo_rep_productLink',oneObj.url);//url
				$("#"+menuName).attr('_bamboo_rep_title',pvContent[menuName]["title"]);//title
				$("#"+menuName).attr('_bamboo_rep_transid',enterCode); //入口编码
				$("#"+menuName).attr('_bamboo_rep_actcode',enterName); //入口位置名称
				$("#"+menuName).attr('_bamboo_rep_uptype','导航'); //类型
				$("#"+menuName).attr('_bamboo_rep_menuid',""); //菜单id-一级的都传空即可-非必填
			}*/
		}
		//pv-end
		var menuNav='';
		var fastNavData='';
		var limit=0;
		if(twoMenuTit!="yincang"&&twoLevel!=undefined){
			for (var i = 0; i < twoLevel.length; i++) {
				menuNav+='<li class="menuSecond"><div class="menuTitle2" >';
				menuNav+="<img src='"+twoLevel[i].section.icon+"' class='menuSecondIcon' />";
				menuNav+='<span class="menuSecondTitle">'+twoLevel[i].section.title+'</span>';
				menuNav+='<img src="//m1.img.10010.com/net5/back/images/menuLeader.jpg" class="menuleader" /></div>';
				menuNav+='<ul class="menuThird">';
				var threeLevel = twoLevel[i].section.menuItems;
				for(var j = 0; j < threeLevel.length; j++){
					if(threeLevel[j].shortCutEntrance=="YES"&&limit<5){
						limit++; 
						if (menuName=="query") { // 快捷导航-查询
							fastNavData+='<li _bamboo_rep_uptype="'+ConstPV["150167001-1"].act_name+'"  _bamboo_rep_productLink="'+threeLevel[j].url+'" _bamboo_rep_title="'+threeLevel[j].title+'" _bamboo_rep_transid="'+ConstPV["150167001-1"].act_code+'" _bamboo_rep_actcode="'+ConstPV["150167001-1"].level1+'" _bamboo_rep_menuid="'+threeLevel[j].id+'">'+threeLevel[j].title+'</li>'
						} else if (menuName == "handle") { // 快捷导航-办理
							fastNavData+='<li _bamboo_rep_uptype="'+ConstPV["150167001-2"].act_name+'"  _bamboo_rep_productLink="'+threeLevel[j].url+'" _bamboo_rep_title="'+threeLevel[j].title+'" _bamboo_rep_transid="'+ConstPV["150167001-2"].act_code+'" _bamboo_rep_actcode="'+ConstPV["150167001-2"].level1+'" _bamboo_rep_menuid="'+threeLevel[j].id+'">'+threeLevel[j].title+'</li>'
						} else if (menuName == "pay") { // 快捷导航-交费
							fastNavData+='<li _bamboo_rep_uptype="'+ConstPV["150167001-3"].act_name+'"  _bamboo_rep_productLink="'+threeLevel[j].url+'" _bamboo_rep_title="'+threeLevel[j].title+'" _bamboo_rep_transid="'+ConstPV["150167001-3"].act_code+'" _bamboo_rep_actcode="'+ConstPV["150167001-3"].level1+'" _bamboo_rep_menuid="'+threeLevel[j].id+'">'+threeLevel[j].title+'</li>'
						} else if (menuName == "service") { // 快捷导航-生活
							fastNavData+='<li _bamboo_rep_uptype="'+ConstPV["150167001-4"].act_name+'"  _bamboo_rep_productLink="'+threeLevel[j].url+'" _bamboo_rep_title="'+threeLevel[j].title+'" _bamboo_rep_transid="'+ConstPV["150167001-4"].act_code+'" _bamboo_rep_actcode="'+ConstPV["150167001-4"].level1+'" _bamboo_rep_menuid="'+threeLevel[j].id+'">'+threeLevel[j].title+'</li>'
						}						
						};
						if("broadband"==menuName && i==0 &&j==0){
							//$('#'+menuName).parent().append('<img src="http://m1.img.10010.com/net5/front/images/hot_icon.jpg" class="hot_icon">');//设置图标
							menuNav+='<li class="menuThird-Item fontWeight" _bamboo_rep_uptype="导航"  _bamboo_rep_productLink="'+threeLevel[j].url+'" _bamboo_rep_title="'+threeLevel[j].title+'" _bamboo_rep_transid="'+enterCode+'" _bamboo_rep_actcode="'+enterName+'" _bamboo_rep_menuid="'+threeLevel[j].id+'">'+threeLevel[j].title+'</li>';
						}else{
							menuNav+='<li class="menuThird-Item" _bamboo_rep_uptype="导航"  _bamboo_rep_productLink="'+threeLevel[j].url+'" _bamboo_rep_title="'+threeLevel[j].title+'" _bamboo_rep_transid="'+enterCode+'" _bamboo_rep_actcode="'+enterName+'" _bamboo_rep_menuid="'+threeLevel[j].id+'">'+threeLevel[j].title+'</li>';
						}

				}
				menuNav+='</ul><div class="clrDiv"></div></li>';
			}
		}
		var locationNav;
		var fastNav="";
		if(menuName=="query"){locationNav=$("#query").parent('li').find('.menuListBox').children('ul');
			fastNav=$("#fastQuery").next();
		};
		if(menuName=="handle"){locationNav=$("#handle").parent('li').find('.menuListBox').children('ul');
			fastNav=$("#fastHandle").next();
		};
		if(menuName=="pay"){locationNav=$("#pay").parent('li').find('.menuListBox').children('ul');
			fastNav=$("#fastPay").next();
		};
		if(menuName=="number"){locationNav=$("#number").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="mobile"){locationNav=$("#mobile").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="broadband"){locationNav=$("#broadband").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="netcard"){locationNav=$("#netcard").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="flowpackage"){locationNav=$("#flowpackage").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="rechargecard"){locationNav=$("#rechargecard").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="mall"){locationNav=$("#mall").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="special"){locationNav=$("#special").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="international"){locationNav=$("#international").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="discount"){locationNav=$("#discount").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="integral"){locationNav=$("#integral").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="myunicom"){locationNav=$("#myunicom").parent('li').find('.menuListBox').children('ul');};
		if(menuName=="service"){fastNav=$("#fastService").next();}
		if(fastNav!=""){
			fastNav.html("");
			fastNav.append(fastNavData);
		};
		if(locationNav!=""&&locationNav!=undefined){
			locationNav.html("");
			locationNav.append(menuNav);
			locationNav.children().first().addClass('paddingL0');
			locationNav.children().last().addClass('borderRn');
		}
	}
$('#number').delegate('span','click',function(){
  var thisClickIndex=$(this).index();
  if(thisClickIndex<1){
	 window.location.href = $(this).attr("href");
  }else{
	 window.location.href = $(this).attr("href");
  }
});
$('#mobile').delegate('span','click',function(){
  var thisClickIndex=$(this).index();
  if(thisClickIndex<1){
	 window.location.href = $(this).attr("href");
  }else{
	 window.location.href = $(this).attr("href");
  }
});

function jumpDaogou(){
    //落 pv 日志
    var _bamboo_rep_transid="180181001";
    var _bamboo_rep_menuid="http://chat.10010.com/chat/";
    var _bamboo_rep_productlink="http://chat.10010.com/chat/";
    var _bamboo_rep_title=$(".Right_Win .zxdg_w .right_win_txt").html();
    $(".Right_Win .zxdg_w").attr("_bamboo_rep_transid",_bamboo_rep_transid);
    $(".Right_Win .zxdg_w").attr("_bamboo_rep_menuid",_bamboo_rep_menuid);
    $(".Right_Win .zxdg_w").attr("_bamboo_rep_productlink",_bamboo_rep_productlink);
    $(".Right_Win .zxdg_w").attr("_bamboo_rep_title",_bamboo_rep_title);
}
function jumpKefu(){
    //落 pv 日志
    var _bamboo_rep_transid="180181001";
    var _bamboo_rep_menuid="http://inf.10010.com/serviceOnline/handLogin.action?accessType=014";
    var _bamboo_rep_productlink="http://inf.10010.com/serviceOnline/handLogin.action?accessType=014";
    var _bamboo_rep_title=$(".Right_Win .zxkf_li .right_win_txt").html();
    $(".Right_Win .zxkf_li").attr("_bamboo_rep_transid",_bamboo_rep_transid);
    $(".Right_Win .zxkf_li").attr("_bamboo_rep_menuid",_bamboo_rep_menuid);
    $(".Right_Win .zxkf_li").attr("_bamboo_rep_productlink",_bamboo_rep_productlink);
    $(".Right_Win .zxkf_li").attr("_bamboo_rep_title",_bamboo_rep_title);
}
function jumpWenjuandiaocha(){
    //落 pv 日志
    var _bamboo_rep_transid="180181001";
    var _bamboo_rep_menuid="http://mall.10010.com/static/homepage/subjectpage/59800000239812.html";
    var _bamboo_rep_productlink="http://mall.10010.com/static/homepage/subjectpage/59800000239812.html";
    var _bamboo_rep_title=$(".Right_Win .survey_quesLi .right_win_txt").html();
    $(".Right_Win .survey_quesLi").attr("_bamboo_rep_transid",_bamboo_rep_transid);
    $(".Right_Win .survey_quesLi").attr("_bamboo_rep_menuid",_bamboo_rep_menuid);
    $(".Right_Win .survey_quesLi").attr("_bamboo_rep_productlink",_bamboo_rep_productlink);
    $(".Right_Win .survey_quesLi").attr("_bamboo_rep_title",_bamboo_rep_title);
}
function returnTOP(){
    document.documentElement.scrollTop = document.body.scrollTop =0;
}