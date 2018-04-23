

$(function(){
	
	//当前页面标示
	$('.suspend_nav1>li>a').removeClass('colorff6600');
	$('.suspend_nav1>li').removeClass('suspendBg1').removeClass('suspendBg2');
	$('.suspend_nav1>li>a').each(function(){
	  if($(this).text()=='首页'){
	    $(this).addClass('colorff6600');
	    $(this).parent().addClass('suspendBg1');
	  }else if($(this).text()=='商城'){
	    $(this).addClass('colorff6600');
	  }
	});
	//靓号专区类型li去掉最后一个的右侧边框
	var LangULW=$('.mobileNumber_ul1').width();
	var LangULg=$('.mobileNumber_ul1>li').length;
	$('.mobileNumber_ul1>li').width(LangULW/LangULg-1);
	$('.mobileNumber_ul1>li').last().css({'border-right':'none','width':(LangULW/LangULg)});
	//初始化公告更多的链接地址
	$(".notice_top a").attr("onclick","jumpUrl('/net5/front/announcement/announcementPage.html')");
	//导航首页链接
	$("#home").attr("href","http://www.10010.com/net5/");
	var win_width=$(window).width();
	$('.indexContent').width(win_width);
	$('.banner_ul1').css('margin-left','0px');
	$('.banner_index_ul>li').removeClass('bgFFF').eq(0).addClass('bgFFF');
	$('.banner_right_div').find('iframe').attr('src','https://upay.10010.com/npfweb/npfcellweb/phone_speedy.html');
	
	//联通精选各部分的li最后一个去掉右边距====>对应联通精选-猜你喜欢-最后一个换行了
	var lx_jx_Set=setInterval(function(){
		var UlLg=0;
		var Uli=0;
		$('.lx_jx_pro_ul').each(function(){
			var czLIDom=$(this).children('li').eq(3);
			if(czLIDom.length>0){
				UlLg++;
			}
			if(czLIDom.hasClass('marginR0')){
				Uli++;
			}else{
				czLIDom.addClass('marginR0');
			}		
		})
		if(UlLg==Uli){
			clearInterval(lx_jx_Set);
		}
	},1000)
	
//	专区部分加载失败重新排序
  $('.H1042>div').each(function(index){
  	$(this).remove('fl').removeClass('fr');
  	if(index%2==0){
  		$(this).addClass('fl');
  	}else{
  		$(this).addClass('fr');
  	}
  })

	
	//浏览器窗口变化事件,如果浏览器窗口宽度小于1330px，左侧楼层导航隐藏
	$(window).resize(function(){
		$('.indexContent').width('100%');
		var windowT=$(window).scrollTop();
		if(windowT>400&&$(window).width()>1330){
			$('.Left_win').css('display','block');
		}else{
			$('.Left_win').css('display','none');
		}
		//banner重新构造
		var win_width=$(window).width();
		if(win_width>1200){
			win_width = win_width;
		}else{
			win_width = 1200;
		}
		$('.banner_ul1>li').width(win_width);//将屏幕宽度赋值给banner图容器
		var banner1_length=$('.banner_ul1>li').length;//获取banner图长度
		$('.banner_ul1').width(win_width*banner1_length*2);//给容纳所有banner图的ul宽度赋值
	})	
	
	// 收藏按钮事件
	$('.collect_icon1,.collect_icon2').click(function(e){
		if(login){//判断登录情况-已登录
			  callback_obj = $(this);
			  var params;
			  if($(this).hasClass('ysc')){ // 取消收藏
				 //console.log(callback_obj.attr("dto.id"));
				 var _collectionId = callback_obj.attr("dto.id");
				 params = {collectionId:_collectionId};
				 CommonMain.loadData("/common/delbycollectionid",params,"delcollectioncall_back(data)");
			  }else{ // 添加收藏
			   var _title,_subTitle,_price,_collectionType,_collectionImageUrl,_collectionUrl,_productId;
			    if ($(this).parent().parent().parent().find(".phone_yh1").html() != undefined) { // 手机配件左，中，右
				    _title =$(this).parent().parent().parent().find(".phoneName1").html();
				    _subTitle = $(this).parent().parent().parent().find(".phone_yh1").html();
				    _price = $(this).parent().parent().parent().find(".phone_price").html();
				    _collectionImageUrl = $(this).parent().parent().parent().find(".phone_pj_pic").attr("src");
				    _collectionType = "01"; // 套餐 00 、手机 01、流量 02、上网卡 03、宽带 04、配件05
				    _collectionUrl = $(this).parents('.phone_ul1_li1').attr("_bamboo_rep_productlink");
				    _productId = $(this).parents('.phone_ul1_li1').attr("_bamboo_rep_menuid");
			   } else if ($(this).parent().parent().parent().find(".phone_yh2").html() != undefined) { // 手机配件上下两个位置
				    _title =$(this).parent().parent().parent().find(".phoneName2").html();
				    _subTitle = $(this).parent().parent().parent().find(".phone_yh2").html();
				    _price = $(this).parent().parent().parent().find(".phone_price2").html();
				    _collectionImageUrl = $(this).parent().parent().parent().find(".phone_pj_pic2").attr("src");
				    _collectionType = "01"; // 套餐 00 、手机 01、流量 02、上网卡 03、宽带 04、配件05
				    _collectionUrl = $(this).parent().parent().parent().attr("_bamboo_rep_productlink");
				    _productId = $(this).parent().parent().parent().attr("_bamboo_rep_menuid");
			   } else if ($(this).parent().parent().parent().find(".accessories_fc_nr li").html() != undefined) { // 配件
				   _title = $(this).parent().parent().parent().find(".accessories_fc_nr li").eq(0).html();
				   _price =  $(this).parent().parent().parent().find(".accessories_fc_nr li").eq(1).html();
				   _collectionImageUrl = $(this).parent().parent().parent().children().find("[_bamboo_rep_imgsrc]").attr("_bamboo_rep_imgsrc");
				   _collectionType = "05";// 套餐 00 、手机 01、流量 02、上网卡 03、宽带 04、配件05
				   _collectionUrl = $(this).parent().parent().parent().attr("_bamboo_rep_productlink");
				   _productId = $(this).parent().parent().parent().attr("_bamboo_rep_menuid");
			   } else if ($(this).parent().parent().parent().find(".InternetCard_message1").html()  != undefined) { // 上网卡
				   _title = $(this).parent().parent().parent().find(".img_div3_message1").html();
				   _subTitle = $(this).parent().parent().parent().find(".InternetCard_message1").html();
				   _price =  $(this).parent().parent().parent().find(".InternetCard_message2").html();	   
				   _collectionImageUrl = "";
				   _collectionType = "03";// 套餐 00 、手机 01、流量 02、上网卡 03、宽带 04、配件05
				   _collectionUrl =$(this).parent().parent().parent().attr("_bamboo_rep_productlink");
				   _productId = $(this).parent().parent().parent().attr("_bamboo_rep_menuid");
			   } else if ($(this).parent().parent().parent().find(".jx_tit").html()  != undefined) { // 联通精选位置
				   _title = $(this).parent().parent().parent().find(".jx_tit").html();
				   _subTitle = $(this).parent().parent().parent().find(".jx_tit2").html();
				   _collectionType = "00";// 套餐 00 、手机 01、流量 02、上网卡 03、宽带 04、配件05
				   _collectionUrl =$(this).parent().parent().parent().attr("_bamboo_rep_productlink");
				   _collectionImageUrl = $(this).parent().parent().parent().find(".lx_jx_pro_img").attr('src');
				   _productId = $(this).parent().parent().parent().attr("_bamboo_rep_menuid");
				   if ( $(this).parent().parent().parent().attr("data-type") == 'internetCard') { // 上网卡
					   _collectionType = '03';
				   } else if ($(this).parent().parent().parent().attr("data-type") == 'taocan') { //  套餐
					   _collectionType = '00';
				   } else if ($(this).parent().parent().parent().attr("data-type") == 'llb') { // 流量包
					   _collectionType = '02';
				   } else if ($(this).parent().parent().parent().attr("data-type") == 'kuandai') { // 宽带
					   _collectionType = '04';
				   } else if ($(this).parent().parent().parent().attr("data-type") == 'phone') { // 手机
					   _collectionType = '01';
				   }
			   } else if ($(this).closest('.jx_xsgLi').attr('_bamboo_rep_productlink') != undefined) { // 限时购位置
				   _title = $(this).closest('.jx_xsgLi').find(".xsgProTit").attr("_bamboo_rep_title");
				   _subTitle = $(this).closest('.jx_xsgLi').find(".Topic-3").attr("_bamboo_rep_subtitle");
				   _price =  $(this).closest('.jx_xsgLi').find(".xsgpriceSpan").attr("_bamboo_rep_activityprice");
				   _collectionType = "01";// 套餐 00 、手机 01、流量 02、上网卡 03、宽带 04、配件05
				   _collectionUrl =$(this).closest('.jx_xsgLi').attr("_bamboo_rep_productlink");
				   _collectionImageUrl = $(this).closest('.jx_xsgLi').find('.sxgPic2').attr("_bamboo_rep_imgsrc");
				   _productId = $(this).closest('.jx_xsgLi').attr("_bamboo_rep_menuid");
				   if ( $(this).closest('.jx_xsgLi').attr("data-type") == 'internetCard') { // 上网卡
					   _collectionType = '03';
				   } else if ($(this).closest('.jx_xsgLi').attr("data-type") == 'taocan') { //  套餐
					   _collectionType = '00';
				   } else if ($(this).closest('.jx_xsgLi').attr("data-type") == 'llb') { // 流量包
					   _collectionType = '02';
				   } else if ($(this).closest('.jx_xsgLi').attr("data-type") == 'kuandai') { // 宽带
					   _collectionType = '04';
				   } else if ($(this).closest('.jx_xsgLi').attr("data-type") == 'phone') { // 手机
					   _collectionType = '01';
				   }
			   }
			   params = {title:_title,subTitle:_subTitle,price:_price,collectionType:_collectionType,collectionImageUrl:_collectionImageUrl,collectionUrl:_collectionUrl,productId:_productId}
			   CommonMain.loadData("/common/addusercollection",params,"addcollectioncall_back(data)");
			  }
			  return false;
			  stopDefault(e);
		}else{//未登录-拉登录
	    	$('.coverBg').show();
	    	$('.iframeBox').show();
	    	return false;
	    	stopDefault(e);
		}
		  
	});
	
      // 右侧导购
	   $('.zxdg_w').attr("onclick","jumpDaogou()");
	   $(".zxkf_li").attr("onclick","jumpKefu()");
	   $('.survey_quesLi').attr("onclick","jumpWenjuandiaocha()");
	   $(".backTop_btn").attr("onclick","returnTOP()");
	  // 右侧导购鼠标放上换图片
	  $('.zxdg_w').mouseover(function(){
	    $(this).find('.right_win_pic').attr('src','//m1.img.10010.com/net5/front/images/online_dg_active.png');
	    $(this).find('.right_win_txt').addClass('colorff6000');
	  }).mouseout(function(){
	    $(this).find('.right_win_pic').attr('src','//m1.img.10010.com/net5/front/images/online_dg.png');
	    $(this).find('.right_win_txt').removeClass('colorff6000');
	  })
	  $('.zxkf_li').mouseover(function(){
	    $(this).find('.right_win_pic').attr('src','//m1.img.10010.com/net5/front/images/online_kf_active.png');
	    $(this).find('.right_win_txt').addClass('colorff6000');
	  }).mouseout(function(){
	    $(this).find('.right_win_pic').attr('src','//m1.img.10010.com/net5/front/images/online_kf.png');
	    $(this).find('.right_win_txt').removeClass('colorff6000');
	  })
	  $('.survey_quesLi').mouseover(function(){
	    $(this).find('.right_win_pic').attr('src','//m1.img.10010.com/net5/front/images/survey_ques_active.png');
	    $(this).find('.right_win_txt').addClass('colorff6000');
	  }).mouseout(function(){
	    $(this).find('.right_win_pic').attr('src','//m1.img.10010.com/net5/front/images/survey_ques.png');
	    $(this).find('.right_win_txt').removeClass('colorff6000');
	  })
	  $('.backTop_btn').mouseover(function(){
	    $(this).find('img').attr('src','//m1.img.10010.com/net5/front/images/back_top_active.png');
	  }).mouseout(function(){
	    $(this).find('img').attr('src','//m1.img.10010.com/net5/front/images/back_top.png');
	  })


	// 返回顶部
	$('.backTop_btn').click(function(){
	  var win_scT=$(window).scrollTop();//获取当前滚动条高度
	  var backTop_S=setInterval(function(){
	    if(win_scT>0){//如果差值小于0；表示目标在目前滚动条的上方
	      var scT_change1=Math.abs(win_scT/3);
	      win_scT=win_scT-scT_change1;
	      $(window).scrollTop(win_scT);
	    }
	    //高度在两个像素以内则停止滚动
	    if(win_scT<1){
	      clearInterval(backTop_S);
	    }
	  },30)

	})
	
//二级标题的跳转及pv统计
	$(".indexContent").delegate('[_bamboo_rep_subtitlelink]','click',function(){
		
		if(!judgeIsBlank($(this).attr("_bamboo_rep_subtitlelink"))){
			window.open($(this).attr("_bamboo_rep_subtitlelink"));// 链接不为空时才跳并统计pv
			//////
			var _bamboo_rep_transid = ''; // 入口编码
			var _bamboo_rep_title = ''; // 主标题
			var _bamboo_rep_actcode = ''; // 入口位置名称
			var _bamboo_rep_menuid = ''; // 产品id--二级导航没有，传空
			var _bamboo_rep_uptype = ''; // 类型
			var _bamboo_rep_sortcode='';    //行号
			var _bamboo_rep_elementsort=''; //元素号
			var _bamboo_rep_productlink = $(this).attr("amboo_rep_subtitlelink"); // url-前面已判断不为空了
			if($(this).parents().hasClass('traffic_div')){//流量专区
				_bamboo_rep_transid="180185001";
			}else if($(this).parents().hasClass('broadband_div')){//宽带专区
				_bamboo_rep_transid="180186001";
			}else if($(this).parents().hasClass('G4_div')){//4G套餐
				_bamboo_rep_transid="180187001";
			}else if($(this).parents().hasClass('mobileNumber_div')){//靓号专场
				_bamboo_rep_transid="180188001";
			}else if($(this).parents().hasClass('phoneAccessories')){//手机配件
				_bamboo_rep_transid="180189001";
			}else if($(this).parents().hasClass('InternetCard')){//上网卡
				_bamboo_rep_transid="180181001";
			}else if($(this).parents().hasClass('lifeService')){//生活服务
				_bamboo_rep_transid="180181101";
			}


			//if ($(this).attr("_bamboo_rep_subtitlename") == undefined) {
			//	_bamboo_rep_title = convert($(this).attr("_bamboo_rep_subtitlename"));//确定在同一级，不再寻找父节点的
			//}
			if ($(this).find('[_bamboo_rep_subtitlename]').attr("_bamboo_rep_subtitlename") == undefined) {
				_bamboo_rep_title = convert($(this).parents().find('[_bamboo_rep_subtitlename]').attr("_bamboo_rep_subtitlename"));
			} else {
				_bamboo_rep_title = convert($(this).find('[_bamboo_rep_subtitlename]').attr("_bamboo_rep_subtitlename"));
			}
			if ($(this).find('[sortcode]').attr("sortcode") == undefined) {
				_bamboo_rep_sortcode = convert($(this).parents().find('[sortcode]').attr("sortcode"));
			} else {
				_bamboo_rep_sortcode = convert($(this).find('[sortcode]').attr("sortcode"));
			}
			if ($(this).find('[elementsort]').attr("elementsort") == undefined) {
				_bamboo_rep_elementsort = convert($(this).parents().find('[elementsort]').attr("elementsort"));
			} else {
				_bamboo_rep_elementsort = convert($(this).find('[elementsort]').attr("elementsort"));
			}
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
			data = {}
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
		}
	});
	  
			/////////////////
	
	  //更多
	$(".indexContent").delegate('[_bamboo_rep_morelink]','click',function(){
		if(!judgeIsBlank($(this).attr("_bamboo_rep_morelink"))){
			window.open($(this).attr("_bamboo_rep_morelink"));//链接不为空时才跳
		}
	});
	
	// 点击所有_bamboo_rep_productlink打开相应的链接-pv统计有修改时，同步看下二级标题的统计是否需要修改
	$(".indexContent,#Body").delegate('[_bamboo_rep_productlink]','click',function(e){
		var time_now = new Date().getTime(); //获取当前时间
		if($(this).hasClass('jx_xsgLi')){//是否是联通精选-限时购商品
			var newDate1 =new Date($(this).attr('data-djs')).getTime();//获取当前点击商品的截止时间
			  if(newDate1<time_now){//如果商品截止时间小于当前时间，也就是已经过期，阻止页面跳转
				 return false;
				 stopDefault(e);
			  }
		}
		if(!judgeIsBlank($(this).attr("_bamboo_rep_productlink"))){
			if($(this).attr("_bamboo_rep_productlink") =="http://www.10010.com"){
				window.location.href="http://www.10010.com";
			}else{
				window.open($(this).attr("_bamboo_rep_productlink"));//链接不为空时才跳
			}
		}
		
        var _bamboo_rep_transid = ''; // 入口编码
        var _bamboo_rep_title = ''; // 主标题
        var _bamboo_rep_actcode = ''; // 入口位置名称
        var _bamboo_rep_menuid = ''; // 产品id 
        var _bamboo_rep_uptype = ''; // 类型
       var _bamboo_rep_productlink = ''; // url
        var _bamboo_rep_sortcode='';    //行号
        var _bamboo_rep_elementsort=''; //元素号
        if ($(this).find('[_bamboo_rep_title]').attr("_bamboo_rep_title") != undefined) {
			_bamboo_rep_title = convert($(this).find('[_bamboo_rep_title]').attr("_bamboo_rep_title"));
        }else if($(this).attr("_bamboo_rep_title") != undefined){
			if($(this).attr("_bamboo_rep_transid")=="170171008"){
				_bamboo_rep_title=$(".mobileNum_U1_LSe .editeTxt").text();
			}else{
				_bamboo_rep_title = convert($(this).attr("_bamboo_rep_title"));
			}
		} else {
			_bamboo_rep_title = convert($(this).closest('[_bamboo_rep_title]').attr("_bamboo_rep_title"));

        }
        
        if ($(this).attr("_bamboo_rep_transid") == undefined) {
        	_bamboo_rep_transid = convert($(this).parents().attr("_bamboo_rep_transid"));
        } else {
        	_bamboo_rep_transid = convert($(this).attr("_bamboo_rep_transid"));
        }
        
        if ($(this).attr("_bamboo_rep_menuid") == undefined) {
        	_bamboo_rep_menuid = convert($(this).parents().attr("_bamboo_rep_menuid"))+"_"+convert($(this).parents().attr("elementsort"));
        } else {
        	_bamboo_rep_menuid = convert($(this).attr("_bamboo_rep_menuid"))+"_"+convert($(this).attr("elementsort"));
        }
        if ($(this).attr("_bamboo_rep_productlink") == undefined) {
        	_bamboo_rep_productlink = convert($(this).parents().attr("_bamboo_rep_productlink"));
        } else {
        	_bamboo_rep_productlink = convert($(this).attr("_bamboo_rep_productlink"));
        }
        if ($(this).find('[sortcode]').attr("sortcode") == undefined) {
            _bamboo_rep_sortcode = convert($(this).parents().find('[sortcode]').attr("sortcode"));
        } else {
            _bamboo_rep_sortcode = convert($(this).find('[sortcode]').attr("sortcode"));
        }
        if ($(this).find('[elementsort]').attr("elementsort") == undefined) {
            _bamboo_rep_elementsort = convert($(this).parents().find('[elementsort]').attr("elementsort"));
        } else {
            _bamboo_rep_elementsort = convert($(this).find('[elementsort]').attr("elementsort"));
        }
       	_bamboo_rep_actcode = ConstPV[_bamboo_rep_transid].act_name; // 入口位置名称   见 nav.js
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
		 	data = {}
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
	});

    var ltjxNavLg=$('.lx_jx_sx_ul>li').length;
    $('.lx_jx_sx_ul').width(ltjxNavLg*114-16);


    //联通精选部分切换按钮
    $('.lx_jx_sx_ul>li').mouseover(function(){
        clearInterval(lt_jx_S);
        var this_index=$(this).index();
        $('.lx_jx_pro_ul').removeClass('lx_jx_pro_ulShow').hide();
        $('.lx_jx_pro_ul').eq(this_index).addClass('lx_jx_pro_ulShow').show();
        $(this).addClass('lx_jx_sx_select').siblings().removeClass('lx_jx_sx_select');
    }).mouseout(function(){
        lt_jx_SFun(lt_jx_S_i);
    })


    $('.lx_jx_pro_ul>li').mouseover(function(){
        clearInterval(lt_jx_S);
    }).mouseout(function(){
        lt_jx_SFun(lt_jx_S_i);
    })
    $('.CloseImg').click(function() {
    	$('.coverBg').hide();
    	$('.iframeBox').hide();
    });

    // 禁止前台页面可编辑
    $('.editeTxt').attr('contenteditable', false) ;
    
    setTimeout("loadNavHtml()",20);
    setTimeout(function(){
    	$('.AdPro,.ProMc,.lxjxNavDel,.bannerNumberDiv,.ProMc,.topAdPro,.logo1AdPro,.AdPro,.bfFbDiv4,.bfFbDiv3').remove();
    	$('.nav_indicate_div').css('top',($('.suspend_nav_div').height()+$('.suspend_nav_div').offset().top)-18);
    	$('.newProStyle').text('新品');
    	$('.hotProStyle').text('热卖');
    	$('.cxProStyle').text('促销');
    },1000)
    
    // 配件只显示数字的处理
    $('.accessories_fc_nr').each(function (index, element) {
        var priceText = $(element).find('[_bamboo_rep_price]').text();
        var tmpText;
        if (priceText != undefined && priceText != '') {
        	//tmpText = priceText.replace(/￥/g, '').trim();
            tmpText = priceText.replace(/￥/g, '').replace(/(^\s*)|(\s*$)/g, "");//因ie8不兼容 trim方法，遂改成正则表达式
        	$(element).find('[_bamboo_rep_price]').text('￥' + tmpText);
        }
        
    });
    //根据 大图片 颜色编号 修改对应的小图标图片
    $('.traffic_ul2>li').each(function(){
        var llbIcon=$(this).children().find('.llb_icon');//获取流量包图片
        var llbType=llbIcon.next();//获取流量包类型图片
        var llbIconUrl=llbIcon.attr('src');//获取流量包图片链接
        var llbTypeUrl=llbType.attr('src');//获取流量包类型图片链接
        var llbArray=llbIconUrl.split('/');
        var llbTypeArray=llbTypeUrl.split('_');
        var llbN=llbArray.pop();//获取流量包图片地址
        //console.log(llbN+"wwww")
        if(llbN.indexOf('icon1')>0&&(llbTypeUrl.indexOf('icon_green')>0||llbTypeUrl.indexOf('icon_orange')>0)){//如果流量包图片地址含有1说明为蓝色
            llbTypeArray.pop();
            var newL=llbTypeArray.pop();//获取倒数第二个为icon或者颜色并且从数组中删除
            if(newL=='icon'){//如果为icon
                llbTypeArray.push('icon_blue.png'); //则把icon补回并添加颜色
            }else{//否则直接添加颜色
                llbTypeArray.push('blue.png');
            }
        }else if(llbN.indexOf('icon2')>0&&(llbTypeUrl.indexOf('icon_blue')>0||llbTypeUrl.indexOf('icon_orange')>0)){//如果流量包图片地址含有2说明为绿色
            llbTypeArray.pop();
            var newL=llbTypeArray.pop();//获取倒数第二个为icon或者颜色并且从数组中删除
            if(newL=='icon'){//如果为icon
                llbTypeArray.push('icon_green.png'); //则把icon补回并添加颜色
            }else{//否则直接添加颜色
                llbTypeArray.push('green.png');
            }
        }else if(llbN.indexOf('icon3')>0&&(llbTypeUrl.indexOf('icon_green')>0||llbTypeUrl.indexOf('icon_blue')>0)){//如果流量包图片地址含有3说明为橙色
            llbTypeArray.pop();
            var newL=llbTypeArray.pop();//获取倒数第二个为icon或者颜色并且从数组中删除
            if(newL=='icon'){//如果为icon
                llbTypeArray.push('icon_orange.png'); //则把icon补回并添加颜色
            }else{//否则直接添加颜色
                llbTypeArray.push('orange.png');
            }
        }
        var newLLbTypeUrl=llbTypeArray.join('_');
        llbType.attr('src',newLLbTypeUrl);
    })
   
})


function loadNavHtml() {
    var userProvicen = null;
    if ( userInfo != null ) {
		userProvicen = userInfo.pcode;
	}
	if(userProvicen==null&&userProvicen==''&&userProvicen==undefined&&userProvicen=='undefined'){
		userProvicen = $.cookie("userprocode");
		if (userProvicen==null&&userProvicen==''&&userProvicen==undefined&&userProvicen=='undefined') {
			$("#loadNav").load("//www.10010.com/net5/"+userProvicen+"/currentNav.html",function(){
				$('#home').attr('href','http://www.10010.com/net5/');
			});
		} else {
			$("#loadNav").load("//www.10010.com/net5/011/currentNav.html",function(){
				$('#home').attr('href','http://www.10010.com/net5/');
			});
		}
	} else {
		userProvicen = $.cookie("userprocode");
		if (userProvicen==null&&userProvicen==''&&userProvicen==undefined&&userProvicen=='undefined') {
			$("#loadNav").load("//www.10010.com/net5/"+userProvicen+"/currentNav.html",function(){
				$('#home').attr('href','http://www.10010.com/net5/');
			});
		} else {
			$("#loadNav").load("//www.10010.com/net5/011/currentNav.html",function(){
				$('#home').attr('href','http://www.10010.com/net5/');
			});
		}
	}
}

var callback_obj;
// 收藏成功返回处理
function addcollectioncall_back(data) {
	if (data.rspflag) {
		callback_obj.addClass('ysc');
		callback_obj.attr('src','//m1.img.10010.com/net5/front/images/collect_icon2_zhl.png');
		callback_obj.attr("dto.id",data.userCollectionsDto._id);
	} 
}
// 删除收藏成功返回处理
function delcollectioncall_back(data) {
	if (data.rspflag) {		   
		callback_obj.removeClass('ysc');
		callback_obj.attr('src','//m1.img.10010.com/net5/front/images/collect_icon1_zhl.png');
	} 
}
//阻止浏览器js执行
function stopDefault(e){
    e = e || window.event;
    (e.preventDefault)
    ?e.preventDefault()
    :e.returnValue = false;1
  }
 
// 弹出用户登录页
function showlogin() {
	$('.coverBg').show();$('.iframeBox').show();
}
// 针对Safari浏览器的单独定义的样式
if(window.navigator.userAgent.indexOf("Safari") == 0){
  $('.suspend_nav1>li>a').css({'padding':'0 14px'});
  $('.width181 .suspend_nav1>li>a').css({'padding':'0 15px'});
}
// 把undefind 转换成 “” 串
function convert (data) {
	if (data == undefined) {
		return "";
	} else {
		return data;
	}
}

var isName = window.navigator.appName;
// 针对ie8以下浏览器的提示
var isSupport = function() {
    if (isName != "Netscape") {
        //isIEhtml

        if (isName.indexOf("Microsoft") == 0) {
            var isIE = window.navigator.appVersion.split(";");
            var IeNumber = isIE[1].split('.')[0].toString().substr(5);
            if (IeNumber < 8) {
            	//浏览器版本低于ie8添加浏览器升级提示
            	var tipss='<div class="upDateTips" style="position: relative;background: #fff28c;font-size: 13px;text-align: center;height: 20px;';
            	tipss+='line-height: 20px;color: red;">为了保证您的使用体验，建议使用新版本IE浏览器</div>';
            	$('body').prepend(tipss);
                //window.location.href="http://www.baidu.com";
            }
        }
    }
    if (isName != "Netscape") {
        //isIE
        if (isName.indexOf("Microsoft") == 0) {
            var isIE = window.navigator.appVersion.split(";");
            var IeNumber = isIE[1].split('.')[0].toString().substr(5);
            if (IeNumber < 8) {
                $('.Left_win').css('display','block');
            }
        }
    }

}
isSupport();


var Banner={
  //banner图数量圆点
  index_ul:function(index_ulClass,banner_li_length,selectClass){//圆点外部ul的class，banner的li的长度,圆点选中样式Classs
    for(var i=0;i<banner_li_length;i++){//banner图中部圆点添加进来
      $('.'+index_ulClass+'').append('<li></li>');
    }
    $('.'+index_ulClass+'>li').eq(0).addClass(''+selectClass+'');//默认第一个圆点选中
  },
  // 个人信息部分数字的变动动画
  BigSmall:function(ll_bigNumber,ll_smallNumber,ll_Class){
    //（总数、剩余数（超出为负数）、容器class）
    var change_ll=parseInt((ll_bigNumber-ll_smallNumber)/108);
    var change_i=0;
    var changell=setInterval(function(){
        // if(ll_bigNumber>ll_smallNumber&&yy_bigNumber>yy_smallNumber){
        if(ll_bigNumber>ll_smallNumber&&change_i<108){
          ll_bigNumber=ll_bigNumber-change_ll;
          change_i++;
          $('.'+ll_Class+'').text(Math.abs(ll_bigNumber));
          // $('.'+yy_Class+'').text(Math.abs(yy_bigNumber));
        }else{
          ll_bigNumber=ll_smallNumber;
          // ll_bigNumber=ll_smallNumber;
          $('.'+ll_Class+'').text(Math.abs(ll_smallNumber));
          // $('.'+yy_Class+'').text(Math.abs(yy_smallNumber));
          clearInterval(changell);
        }
    },10)
  },
  // 数组排序1
  ArrayPx1:function(array){
    function sortNumber(a,b)
    {
      return a - b
    }
    var array2=[];
    for(var i=0;i<array.length;i++){
      array2.push(parseInt(array[i].top));
      array2.sort(sortNumber);
    }
    var array3=array;
    for(var j=0;j<array.length;j++){
      var arrayTop=array[j].top;
      for(var z=0;z<array2.length;z++){
        if(arrayTop===array2[z]){
          array3[z]=array[j];
          array3[z].class1=array[j].class1+'_f';
          array3[z].top=array[j].top-380;
        }
      }
    }
    return array3;
  },
  // 判断是否数组排序，ie9以下不进行排序
  ArrayPx:function(array){
    if (isName != "Netscape") {
        //isIE
        if (isName.indexOf("Microsoft") == 0) {
            var isIE = window.navigator.appVersion.split(";");
            var IeNumber = isIE[1].split('.')[0].toString().substr(5);
            if (IeNumber > 7) {
              return  Banner.ArrayPx1(array);
            }
        }
    }else{
      //非ie
      return  Banner.ArrayPx1(array);
    }
  },

  // 悬浮导航定位
  XfNav:function(bannerTop,win_ScroTop,NavH){
	  var top1;
	  //判断顶部栏能否获取
	  if($('.dh1_ul').length>0){
		  top1=$('.dh1_ul').offset().top+26;
	  }else{
//		  判断是否有门楣广告
		  if($('.topADBox').length>0){
			  top1=126;
		  }else{
			  top1=26;
		  }
	  }
    if(win_ScroTop<top1){
		if($('.suspend_nav_div').hasClass('suspend_nav_div_fixed')){
			$(window).scrollTop(top1+90);
		}
		$('.nav_indicate_div').removeClass('nav_indicate_div_xf');
		$('.suspend_nav_div').removeClass('suspend_nav_div_fixed').removeClass('bgFFF2');
		$('.logoRow').show();
		$('.suspend_nav_div').height(139);
		$('.nav_indicate_div').css('top',NavH-win_ScroTop-18);
    }else if(win_ScroTop>bannerTop && win_ScroTop>170 ){
      //console.log(2);
      if(!$('.suspend_nav_div').hasClass('suspend_nav_div_fixed')){
        $('.logoRow').hide();
        $('.suspend_nav_div').addClass('suspend_nav_div_fixed bgFFF').addClass('bgFFF2').height(0).animate({'height':'49px'},300);
        $('.nav_indicate_div').addClass('nav_indicate_div_xf');
      }
    }else{
      $('.nav_indicate_div').css('top',NavH-win_ScroTop-15);
      //console.log('win_ScroTop='+win_ScroTop)
      //console.log('Top='+$('.nav_indicate_div').css('top'))
    }
  },
  // 轮播图运行方法
  banner_move:function(banner_index,banner_length,move_width,banner_ul,banner_index_ul,bgClass){
    if(banner_index===banner_length){
      $('.'+banner_index_ul+'>li').removeClass(''+bgClass+'');
      $('.'+banner_index_ul+'>li').eq(0).addClass(''+bgClass+'');
    }else{
      $('.'+banner_index_ul+'>li').removeClass(''+bgClass+'');
      $('.'+banner_index_ul+'>li').eq(banner_index).addClass(''+bgClass+'');
    }
    $('.'+banner_ul+'').animate({'margin-left':-banner_index*move_width},1000);
    if(banner_index===banner_length){
      $('.'+banner_ul+'').css({'margin-left':'0'},1000);
    }
  },
  //轮播图构造方法
  bannerGz:function(bannerstyle,bannerUl,banner_indexUL){
    //靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
    $('.'+bannerUl+'').append($('.'+bannerUl+'').html());//将轮播图部分的li复制一份后追加到ul中
    tsLiLength=$('.'+bannerUl+'>li').length;//获取轮播图部分的2倍li的长度
    $('.'+bannerUl+'').width(tsLiLength*Lh_width);//给轮播图的ul赋值
    tsLiLength=tsLiLength/2;//获取轮播图的原始li的长度
    for(var i=0;i<tsLiLength;i++){
      $('.'+banner_indexUL+'').append('<li></li>');
    }
    $('.'+banner_indexUL+'>li').eq(0).addClass('bgff6600');
    if(bannerstyle=='ts'){//特色靓号
      tsLiLength=tsLiLength;
    }else if(bannerstyle=='sr'){//生日靓号
      srLiLength=tsLiLength;
    }else if(bannerstyle=='jnr'){//纪念日靓号
      jnrLiLength=tsLiLength;
    }
  },

}

//// 剩余流量/语音倒数
//Banner.BigSmall(2048,1024,'sy_ll');
////（流量总数、流量剩余数（超出为负数）、流量容器class）
//Banner.BigSmall(2100,230,'sy_yy');
////语音总数、语音剩余数（超出为负数）、语音容器class





var win_width=$(window).width();
// $('.nav_indicate_div').width(win_width);


$('.area_divs').hover(function(event){
  event.stopPropagation();
  $(this).children('.area_selectDiv').removeAttr('style');
})



function hideNullBanner(){
	$('.banner_ul1>li').each(function(){
		var link=$(this).attr("_bamboo_rep_productlink");
		var img=$(this).children().find(".banner1_pic").attr("src");
		if(judgeIsBlank(link)||judgeIsBlank(img)){
			$(this).remove();
		}else{//是否展示广告小图标
			var isAd=$(this).attr("_bamboo_rep_isad");
			if("1"==isAd){
				$(this).find('.bannerGuanggaoIcon').show();
			}
		}
	});
	//
	var bannerLength=$('.banner_ul1>li').length;
	if(bannerLength==0){//展示默认banner
        var defUrl="http://num.10010.com/NumApp/chseNumList/init";
        var defImg="http://m1.img.10010.com/net5/back/images/bannerDefaultPic.jpg";
        var defaultBanner="<li style='width: 1349px;' _bamboo_rep_transid='170173001' _bamboo_rep_productlink='"+defUrl+"'>";
        defaultBanner+="<a href='###' class='banner1_a'><img src='"+defImg+"' class='banner1_pic'> </a> </li>";
        $(".banner_ul1").html(defaultBanner);
    }
	$(".banner_ul1").show();

}

// 轮播banner图部分

function bannerSwper(){
	var banner1_lb;
	var win_width=$(window).width();
	if(win_width>1200){
		win_width = win_width;
	}else{
		win_width = 1200;
	}
	$('.banner_ul1>li').width(win_width);//将屏幕宽度赋值给banner图容器
	var banner1_length=$('.banner_ul1>li').length;//获取banner图长度
	if(banner1_length>1){
		$('.banner_ul1').width(win_width*banner1_length*2);//给容纳所有banner图的ul宽度赋值
		Banner.index_ul('banner_index_ul',banner1_length,'bgFFF');
		$('.banner_ul1').append($('.banner_ul1').html());
		banner1_lb=setInterval(banner1,8000);
	}
	

	  // 轮播banner图下方圆点控制
	  $('.banner_index_ul').delegate('li','mouseover',function(){
	    $('.banner_ul1').stop();
	    clearInterval(banner1_lb);
	    var this_index=$(this).index();
	    $('.banner_index_ul>li').removeClass('bgFFF');
	    $('.banner_index_ul>li').eq(this_index).addClass('bgFFF');
	    banner_index1=this_index;
	    $('.banner_ul1').animate({'margin-left':-banner_index1*win_width},1000);
	    banner1_lb=setInterval(banner1,3000);
	  })

	  //轮播banner鼠标移入暂停，移出轮播
	  $('.banner_ul1').mouseover(function(){
	    clearInterval(banner1_lb);
	  }).mouseout(function(){
		  if(banner1_length>1){
			  banner1_lb=setInterval(banner1,3000);
		  } 
	  })

	  // banner轮播图运行方法
	  var banner_index1=0;
	  function banner1(){
		  var win_width=$(window).width();
		  if(win_width>1200){
			  win_width = win_width;
		  }else{
			  win_width = 1200;
		  }
	    if(banner_index1<banner1_length){
	      banner_index1=banner_index1;
	    }else{
	      banner_index1=0;
	      $('.banner_ul1').css({'margin-left':-banner_index1*win_width});
	    }
	    banner_index1++;
	    if(banner_index1===banner1_length){
	      $('.banner_index_ul>li').removeClass('bgFFF');
	      $('.banner_index_ul>li').eq(0).addClass('bgFFF');
	    }else{
	      $('.banner_index_ul>li').removeClass('bgFFF');
	      $('.banner_index_ul>li').eq(banner_index1).addClass('bgFFF');
	    }
	    $('.banner_ul1').animate({'margin-left':-banner_index1*win_width},1000);
	  }
}



// banner图右上方充值金额选择
$('.cz_price>li>span').click(function(){
  $('.cz_price>li>span').removeClass('select_span');
  $('.cz_price>li>img').addClass('dn');
  $(this).addClass('select_span');
  $(this).next().removeClass('dn');
})

// 充值金额输入框
$('.cz_phone').focus(function(){
  var this_val=$(this).val();
  if(this_val=='输入手机/固话号码'){
    $(this).val('').removeClass('color666');
  }
}).blur(function(){
  var this_val=$(this).val();
  if(this_val==''){
    $(this).val('输入手机/固话号码').addClass('color666');
  }
})
$('.otherP_input').focus(function(){
  var this_val=$(this).val();
  if(this_val=='输入金额'){
    $(this).val('').removeClass('color666');
  }
}).blur(function(){
  var this_val=$(this).val();
  if(this_val==''){
    $(this).val('输入金额').addClass('color666');
  }
})
$('.czPSe_btn').click(function(){
  $('.zdy_btn').removeClass('select_span');
  $('.cz_price>li').eq(0).find('span').addClass('select_span');
  $('.cz_price>li').eq(0).find('img').removeClass('dn');
  $('.otherP').hide();
  $('.cz_price').show();
})
$('.zdy_btn').click(function(){
  $('.otherP').show();
  $('.cz_price').hide();
})


//联通精选部分自动切换
var lt_jx_S_i=0;
var lt_jx_S;
lt_jx_SFun(lt_jx_S_i);
function lt_jx_SFun(lt_jx_S_i){
    if($('.lx_jx_sx_ul>li').length<3){
        $('.lx_jx_sx_ul').width('212px');
    }
      if($('.lx_jx_sx_ul>li').length>2){
        $('.lx_jx_sx_ul').width('328px');
      }
    if($('.lx_jx_sx_ul>li').length>3){
        $('.lx_jx_sx_ul').width('441px');
    }
  lt_jx_S=setInterval(function(){
    if(lt_jx_S_i<$('.lx_jx_sx_ul>li').length-1){
      lt_jx_S_i++;
    }else{
      lt_jx_S_i=0;
    }
    $('.lx_jx_pro_ul').removeClass('lx_jx_pro_ulShow').hide();
    $('.lx_jx_pro_ul').eq(lt_jx_S_i).addClass('lx_jx_pro_ulShow').show();
    $('.lx_jx_sx_ul>li').eq(lt_jx_S_i).addClass('lx_jx_sx_select').siblings().removeClass('lx_jx_sx_select');
  },5000)
}


//
// // 靓号专区轮播图部分开始
// var tsLiLength,srLiLength,jnrLiLength;Lh_width;
// var Lh_width=$('.tsNumber>li').width();//获取轮播图的li的宽度
//
// Banner.bannerGz('ts','tsNumber','tsNumber_indexUl');
// //靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
// Banner.bannerGz('sr','srNumber','srNumber_indexUl');
// //靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
// Banner.bannerGz('jnr','jnrNumber','jnrNumber_indexUl');
// //靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
// var tsIndex=0,srIndex=0,jnrIndex=0;
// var ts_setI,sr_setI,jnr_setI;
//
//
// tsMove(tsIndex,tsLiLength,'tsNumber','Number_indexUlShow');
// function tsMove(tsIndex,tsLiLength,banner_ul,banner_index_ul){
//   //特色靓号轮播下标，特色靓号轮播长度、特色靓号轮播ul的class，圆点控制的ul的class
//   ts_setI=setInterval(function(){
//     if(tsIndex<tsLiLength){
//       tsIndex==tsIndex;
//     }else{
//       tsIndex=0;
//       $('.tsNumber').css('margin-left','0');
//     }
//     tsIndex++;
//     Banner.banner_move(tsIndex,tsLiLength,Lh_width,banner_ul,banner_index_ul,'bgff6600');
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//   },5000)
// }
//
// function srMove(srIndex,srLiLength,banner_ul,banner_index_ul){
//   //生日靓号轮播下标，生日靓号轮播长度、生日靓号轮播ul的class，圆点控制的ul的class
//   sr_setI=setInterval(function(){
//     // console.log(srLiLength+'.....1')
//     if(srIndex<srLiLength){
//       srIndex==srIndex;
//     }else{
//       srIndex=0;
//       $('.srNumber').css('margin-left','0');
//     }
//     srIndex++
//     Banner.banner_move(srIndex,srLiLength,Lh_width,banner_ul,banner_index_ul,'bgff6600');
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//
//   },5000)
// }
// function jnrMove(jnrIndex,jnrLiLength,banner_ul,banner_index_ul){
//   //纪念日靓号轮播下标，纪念日靓号轮播长度、纪念日靓号轮播ul的class，圆点控制的ul的class
//   jnr_setI=setInterval(function(){
//     if(jnrIndex<jnrLiLength){
//       jnrIndex==jnrIndex;
//     }else{
//       jnrIndex=0;
//       $('.jnrNumber').css('margin-left','0');
//     }
//     jnrIndex++;
//     Banner.banner_move(jnrIndex,jnrLiLength,Lh_width,banner_ul,banner_index_ul,'bgff6600');
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//   },5000)
// }
//
// // 特色靓号圆点控制
// $('.tsNumber_indexUl>li').mouseover(function(){
//   $('.mobileNumber_ul2').stop(true,true);
//   clearInterval(ts_setI);
//   tsIndex=$(this).index();
//   $('.tsNumber_indexUl>li').removeClass('bgff6600');
//   $('.tsNumber_indexUl>li').eq(tsIndex).addClass('bgff6600');
//   $('.tsNumber').animate({'margin-left':-tsIndex*Lh_width},1000);
// }).mouseout(function(){
//   ts_setI=setInterval(function(){
//     if(tsIndex<tsLiLength){
//       tsIndex==tsIndex;
//     }else{
//       tsIndex=0;
//       $('.tsNumber').css('margin-left','0');
//     }
//     tsIndex++;
//     Banner.banner_move(tsIndex,tsLiLength,Lh_width,'tsNumber','tsNumber_indexUl','bgff6600')
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//   },5000)
// })
//
// // 特色靓号区域鼠标移入暂停，移出继续
// $('.tsNumber').mouseover(function(){
//   $('.mobileNumber_ul2').stop(true,true);
//   clearInterval(ts_setI);
// }).mouseout(function(){
//   ts_setI=setInterval(function(){
//     if(tsIndex<tsLiLength){
//       tsIndex==tsIndex;
//     }else{
//       tsIndex=0;
//       $('.tsNumber').css('margin-left','0');
//     }
//     tsIndex++;
//     Banner.banner_move(tsIndex,tsLiLength,Lh_width,'tsNumber','tsNumber_indexUl','bgff6600')
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//   },5000)
// })
// // 生日靓号圆点控制
// $('.srNumber_indexUl>li').mouseover(function(){
//   $('.mobileNumber_ul2').stop(true,true);
//   clearInterval(sr_setI);
//   srIndex=$(this).index();
//   $('.srNumber_indexUl>li').removeClass('bgff6600');
//   $('.srNumber_indexUl>li').eq(srIndex).addClass('bgff6600');
//   $('.srNumber').animate({'margin-left':-srIndex*Lh_width},1000);
// }).mouseout(function(){
//   sr_setI=setInterval(function(){
//     if(srIndex<srLiLength){
//       srIndex==srIndex;
//     }else{
//       srIndex=0;
//       $('.srNumber').css('margin-left','0');
//     }
//     srIndex++;
//     Banner.banner_move(srIndex,srLiLength,Lh_width,'srNumber','srNumber_indexUl','bgff6600')
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//   },5000)
// })
//
// // 生日靓号区域鼠标移入暂停，移出继续
// $('.tsNumber').mouseover(function(){
//   $('.mobileNumber_ul2').stop(true,true);
//   clearInterval(sr_setI);
// }).mouseout(function(){
//   sr_setI=setInterval(function(){
//     if(srIndex<srLiLength){
//       srIndex==srIndex;
//     }else{
//       srIndex=0;
//       $('.srNumber').css('margin-left','0');
//     }
//     srIndex++;
//     Banner.banner_move(srIndex,srLiLength,Lh_width,'srNumber','srNumber_indexUl','bgff6600')
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//   },5000)
// })
//
// // 纪念日靓号圆点控制
// $('.jnrNumber_indexUl>li').mouseover(function(){
//   $('.mobileNumber_ul2').stop(true,true);
//   clearInterval(jnr_setI);
//   jnrIndex=$(this).index();
//   $('.jnrNumber_indexUl>li').removeClass('bgff6600');
//   $('.jnrNumber_indexUl>li').eq(jnrIndex).addClass('bgff6600');
//   $('.jnrNumber').animate({'margin-left':-jnrIndex*Lh_width},1000);
// }).mouseout(function(){
//   jnr_setI=setInterval(function(){
//     if(jnrIndex<jnrLiLength){
//       jnrIndex==jnrIndex;
//     }else{
//       jnrIndex=0;
//       $('.jnrNumber').css('margin-left','0');
//     }
//     srIndex++;
//     Banner.banner_move(jnrIndex,jnrLiLength,Lh_width,'jnrNumber','jnrNumber_indexUl','bgff6600')
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//   },5000)
// })
//
// // 纪念日靓号区域鼠标移入暂停，移出继续
// $('.tsNumber').mouseover(function(){
//   $('.mobileNumber_ul2').stop(true,true);
//   clearInterval(jnr_setI);
// }).mouseout(function(){
//   jnr_setI=setInterval(function(){
//     if(jnrIndex<jnrLiLength){
//       jnrIndex==jnrIndex;
//     }else{
//       jnrIndex=0;
//       $('.jnrNumber').css('margin-left','0');
//     }
//     srIndex++;
//     Banner.banner_move(jnrIndex,jnrLiLength,Lh_width,'jnrNumber','jnrNumber_indexUl','bgff6600')
//       //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
//       //下方圆点控制的ul的class，下方圆点控制变化的class
//   },5000)
// })
//
// //换一换按钮
// $('.numberChangeBtn').click(function(){
//   $('.mobileNumber_ul2Show').stop(true,true);
//   clearInterval(ts_setI);
//   clearInterval(sr_setI);
//   clearInterval(jnr_setI);
//   var showul2Width=$('.mobileNumber_ul2Show').width();
//   var inD_Left=$('.mobileNumber_ul2Show').css('margin-left');
//   inD_Left=parseInt(inD_Left.substring(0,inD_Left.length-2));
//   if(inD_Left>-(showul2Width)/2+Lh_width){
//     $('.Number_indexUlShow>li').removeClass('bgff6600');
//     $('.Number_indexUlShow>li').eq(-inD_Left/Lh_width+1).addClass('bgff6600');
//     $('.mobileNumber_ul2Show').animate({'margin-left':inD_Left-Lh_width},1000);
//   }else if(inD_Left==-(showul2Width)/2+Lh_width){
//     $('.Number_indexUlShow>li').removeClass('bgff6600');
//     $('.Number_indexUlShow>li').eq(0).addClass('bgff6600');
//     $('.mobileNumber_ul2Show').animate({'margin-left':0},1000);
//   }else if(inD_Left==-(showul2Width)/2){
//     $('.mobileNumber_ul2Show').animate({'margin-left':0},1000);
//     $('.Number_indexUlShow>li').removeClass('bgff6600');
//     $('.Number_indexUlShow>li').eq(1).addClass('bgff6600');
//     $('.mobileNumber_ul2Show').animate({'margin-left':-Lh_width},1000);
//     // $('.mobileNumber_ul2Show').css('margin-left','0');
//   }
// })
//
// // 靓号专区切换
// $('.mobileNumber_ul1>li').click(function(){
//   var this_index=$(this).index();
//   $('.mobileNumber_ul1>li').removeClass('mobileNum_U1_LSe');
//   $('.mobileNumber_ul1>li').eq(this_index).addClass('mobileNum_U1_LSe');
//   $('.Number_indexUl').removeClass('Number_indexUlShow');
//   switch(this_index){
//     //特色靓号
//     case 0:
//     $('.mobileNumber_ul2Show').stop(true,true);
//       clearInterval(ts_setI);
//       clearInterval(sr_setI);
//       clearInterval(jnr_setI);
//       $('.mobileN_Style_pic').eq(0).attr('src','images/wjx_active.png');
//       $('.mobileN_Style_pic').eq(1).attr('src','images/heart_icon1.png');
//       $('.mobileN_Style_pic').eq(2).attr('src','images/date_icon.png');
//       $('.mobileNumber_ul2').removeClass('mobileNumber_ul2Show');
//       $('.tsNumber').addClass('mobileNumber_ul2Show');
//       tsIndex=0;
//       $('.Number_indexUl').eq(0).addClass('Number_indexUlShow');
//       $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
//       tsMove(tsIndex,tsLiLength,'tsNumber','Number_indexUlShow');
//       break;
//     //生日靓号
//     case 1:
//       $('.mobileNumber_ul2Show').stop(true,true);
//       clearInterval(ts_setI);
//       clearInterval(sr_setI);
//       clearInterval(jnr_setI);
//       $('.mobileN_Style_pic').eq(0).attr('src','images/wjx_icon1.png');
//       $('.mobileN_Style_pic').eq(1).attr('src','images/heart_active.png');
//       $('.mobileN_Style_pic').eq(2).attr('src','images/date_icon.png');
//       $('.mobileNumber_ul2').removeClass('mobileNumber_ul2Show');
//       $('.srNumber').addClass('mobileNumber_ul2Show');
//       srIndex=0;
//       $('.Number_indexUl').eq(1).addClass('Number_indexUlShow');
//       $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
//       srMove(srIndex,srLiLength,'srNumber','Number_indexUlShow');
//       break;
//     //纪念日靓号
//     case 2:
//     $('.mobileNumber_ul2Show').stop(true,true);
//       clearInterval(ts_setI);
//       clearInterval(sr_setI);
//       clearInterval(jnr_setI);
//       $('.mobileN_Style_pic').eq(0).attr('src','images/wjx_icon1.png');
//       $('.mobileN_Style_pic').eq(1).attr('src','images/heart_icon1.png');
//       $('.mobileN_Style_pic').eq(2).attr('src','images/date_active.png');
//       $('.mobileNumber_ul2').removeClass('mobileNumber_ul2Show');
//       $('.jnrNumber').addClass('mobileNumber_ul2Show');
//       jnrIndex=0;
//       $('.Number_indexUl').eq(2).addClass('Number_indexUlShow');
//       $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
//       jnrMove(jnrIndex,jnrLiLength,'jnrNumber','Number_indexUlShow');
//       break;
//   }
// })


// 靓号专区轮播图部分结束





  var scroChange;
//楼层跳转
function FloorGo(domId){//传入目标的id
  clearInterval(scroChange);
var scrollHeight = $(document).height();//获取滚动条可以滚动的所有距离
var windowHeight = $(window).height();//获取屏幕高度
  var domIdTop=$('#'+domId+'').offset().top-150;//获取目标的滚动条高度
  scroChange=setInterval(function(){
    var win_scT=$(window).scrollTop();//获取当前滚动条高度
    var scT_pc=domIdTop-win_scT;//获取目标与当前滚动条的差值
    if(scT_pc<0){//如果差值小于0；表示目标在目前滚动条的上方
      var scT_change1=Math.abs(scT_pc/3);
      $(window).scrollTop(win_scT-scT_change1);
      var pcz=Math.abs(win_scT-scT_change1-domIdTop);
      // console.log(pcz);
      //如果目前的高度和目标的高度在两个像素以内则停止滚动
      if(pcz<3){
        clearInterval(scroChange);
      }
    }else{//如果差值不小于0；表示目标在目前滚动条的下方
      if(win_scT + windowHeight > scrollHeight-10){
clearInterval(scroChange);
 }
      var scT_change1=Math.abs(scT_pc/3);
      $(window).scrollTop(win_scT+scT_change1);
      var pcz=Math.abs(win_scT+scT_change1-domIdTop);
      //如果目前的高度和目标的高度在两个像素以内则停止滚动
      if(pcz<3){
        clearInterval(scroChange);
      }
    }
  },10)

}


function getHeaderPartHeight(){
    var head1Height = $('.header1').height();
    var ADBoxHeight = $('.topADBox').height();
    var supDivHeight = $('.suspend_nav_div').height();
    var headerPartH = supDivHeight+ADBoxHeight+head1Height;
    return headerPartH;
}

// 悬浮导航以及左侧浮层的楼层变色等


$('.collect_iconNew2').click(function(){
  if($(this).hasClass('ysc')){
    $(this).removeClass('ysc');
    $(this).attr('src','images/collect_iconNew1_zhl.png');
  }else{
    $(this).addClass('ysc');
    $(this).attr('src','images/collect_iconNew2_zhl.png');
  }
})

// 购物车点击跳动事件
$('.shoppingCar3').click(function(){
  $(this).addClass('spCclick');
  $(this).css('bottom','7px');
  setTimeout(function(){
    $('.spCclick').css('bottom','5px').removeClass('sp3click');;
  },100)
})
$('.shoppingCar2').click(function(){
  $(this).addClass('spCclick');
  $(this).css('margin-top','5px');
  setTimeout(function(){
    $('.spCclick').css('margin-top','7px').removeClass('sp3click');;
  },100)
})

//搜索框轮播

function inputSwper(){
	var input_s_i=0;
	var search_ht=$('.search_input_ul').html();
	var input_s_lg=$('.search_input_ul>li').length;
	$('.search_input_ul').append(search_ht);
	var inputse;
	search_lbF();
	function search_lbF(){
	  inputse=setInterval(function(){
	    if(input_s_i<input_s_lg){
	      input_s_i=input_s_i;
	    }else{
	      input_s_i=0;
	      $('.search_input_ul').css({'margin-top':-(input_s_i*38)});
	    }
	    input_s_i++;
	    $('.search_input').val($('.search_input_ul>li').eq(input_s_i).text());
	    $('.search_input_ul').animate({'margin-top':-(input_s_i*38)},700);
	  },2000)
	}


	setTimeout(function(){
	  $('.search_input_div').click(function(){
	  clearInterval(inputse);
	  $(this).hide();
	  $('.search_input').val('').focus();
	})
	},0)

	setTimeout(function(){
	  $('.search_input').blur(function(){
	  var this_val=$(this).val();
	  if(this_val==''){
	    input_s_i=0;
	    $('.search_input').val($('.search_input_ul>li').eq(input_s_i).text());
	    $('.search_input_ul').css({'margin-top':-(input_s_i*38)});
	    search_lbF();
	    $('.search_input_div').show();
	  }
	});
	},0)
}


function scrollEvent(){
	var JXBox=$('#jx_box').offset()?parseInt($('#jx_box').offset().top):0;

	var T_traffic_div_top1=$('#traffic_div').offset()?parseInt($('#traffic_div').offset().top):0;
	var T_G4_div_top1=$('#G4_div').offset()?parseInt($('#G4_div').offset().top):0;
	var T_phoneAccessories_top1=$('#phoneAccessories').offset()?parseInt($('#phoneAccessories').offset().top):0;
	var T_InternetCard_top1=$('#InternetCard').offset()?parseInt($('#InternetCard').offset().top):0;
	var T_lifeService_top1=$('#lifeService').offset()?parseInt($('#lifeService').offset().top):0;
	//将各个楼层的id和距离页面顶部top值放入数组TopArray
	var TopArray=[
	  {class1:'jx_box',top:JXBox},
	  {class1:'traffic_div',top:T_traffic_div_top1},
	  {class1:'G4_div',top:T_G4_div_top1},
	  {class1:'phoneAccessories',top:T_phoneAccessories_top1},
	  {class1:'InternetCard',top:T_InternetCard_top1},
	  {class1:'lifeService',top:T_lifeService_top1}
	];
	
	var TopArray2=Banner.ArrayPx(TopArray);
	
	$(window).scroll(function(){
		  var win_ScroTop=$(window).scrollTop();
		  //console.log('XfNav--->'+win_ScroTop);
		  var xfNavH = getHeaderPartHeight();
	      var bannerTop = 0;
	        if ($('.banner_ul1').offset() != undefined) {
	        	bannerTop = $('.banner_ul1').offset().top;
	        }
		  Banner.XfNav(bannerTop,win_ScroTop,xfNavH);
		  // 左侧楼层浮层显示判断

		  if(win_ScroTop>400){
			//如果浏览器窗口宽度小于1330px，左侧楼层导航隐藏
				if($(window).width()<1330){
					$('.Left_win').css('display','none');
				}else{
					$('.Left_win').css('display','block');
				}
		  }else{
			  $('.Left_win').css('display','none');
		  }
		  if(TopArray2 != undefined){

		      // 左侧楼层颜色判断
		      if(win_ScroTop>TopArray2[0].top&&win_ScroTop<TopArray2[1].top-1){
		        $('.Left_Wul>li>a').removeClass('colorff6600');
		        $('.'+TopArray2[0].class1+'').find('a').addClass('colorff6600');
		      }else if(win_ScroTop>TopArray2[1].top&&win_ScroTop<TopArray2[2].top-1){
		        $('.Left_Wul>li>a').removeClass('colorff6600');
		        $('.'+TopArray2[1].class1+'').find('a').addClass('colorff6600');
		      }
		      else if(win_ScroTop>TopArray2[2].top&&win_ScroTop<TopArray2[3].top-1){
		        $('.Left_Wul>li>a').removeClass('colorff6600');
		        $('.'+TopArray2[2].class1+'').find('a').addClass('colorff6600');
		      }
		      else if(win_ScroTop>TopArray2[3].top&&win_ScroTop<TopArray2[4].top-1){
		        $('.Left_Wul>li>a').removeClass('colorff6600');
		        $('.'+TopArray2[3].class1+'').find('a').addClass('colorff6600');
		      }else if(win_ScroTop>TopArray2[4].top&&win_ScroTop<TopArray2[5].top-1){
		        $('.Left_Wul>li>a').removeClass('colorff6600');
		        $('.'+TopArray2[4].class1+'').find('a').addClass('colorff6600');
		      }
		      else if(win_ScroTop>TopArray2[5].top){
		        $('.Left_Wul>li>a').removeClass('colorff6600');
		        $('.'+TopArray2[5].class1+'').find('a').addClass('colorff6600');
		      }
		  }

		})
}


// 麻熊辉修改部分
window.onload = function(){
	scrollEvent();
        loadInitalHeadList();
        hideNullBanner();
        bannerSwper();
        var win_scTop=$(window).scrollTop();
        var xfNavH = getHeaderPartHeight();
        var bannerTop = 0;
        if ($('.banner_ul1').offset() != undefined) {
        	bannerTop = $('.banner_ul1').offset().top;
        }
        Banner.XfNav(bannerTop,win_scTop,xfNavH);
        inputSwper();
        
        setMenuThirdHeight();
        $('.editeTxt,.editeTxt1,.llb_style,.taocanStyleName,.taocan_style2').each(function(){
			if($(this).attr('title')=='双击可编辑'){
				$(this).attr('title','');
			}
		});
        $('.mobileN_Style_pic').each(function(){
            if($(this).attr('title')=='双击可替换图标'){
                $(this).attr('title','');
            }
        });

        // $('.OptionSet').bind('click',function(event){
        //     event.stopPropagation();
        //     var target = (event.target.nodeName == 'LI')? $(event.target):$(event.target).parents('li');
        //     var targetValue = target.text();
        //     var showValue = $(this).siblings('.showOptionChoice').text();
        //     $(this).siblings('.showOptionChoice').text(targetValue);
        //     target.text(showValue);
        //     $(this).hide();
        //     $(this).siblings('.PCSearchDown').removeClass('downup');
        // });
        // $('.searchOptionBox').bind('click',function(event){
        //
        //     event.stopPropagation();
        //     var isup = $(this).children('.PCSearchDown').hasClass('downup');
        //     if(isup){
        //         $(this).children('.OptionSet').hide();
        //     $(this).children('.PCSearchDown').removeClass('downup');
        //     }else{
        //         $(this).children('.OptionSet').show();
        //     $(this).children('.PCSearchDown').addClass('downup');
        //     }
        //
        // });
        

    	function setMenuThirdHeight(){
    	  var menu = $('.user_iperate_xm_ul');
    	  for(var i = 0; i < menu.length; i++){
    	      var isClear =  adjustmentHieght(menu.eq(i),0);
    	      if(isClear){
    	        continue;
    	      }
    	  }
    	}
    	
    	function adjustmentHieght(item,itemIndex){
    	    var isTooHeight = justfyHeight(item);
    	    if(isTooHeight){
    	        item.children('li').eq(item.children('li').length-1-itemIndex).hide();
    	        itemIndex++;
    	        adjustmentHieght(item,itemIndex);
    	        //return false;
    	    }else{
    	      return true;
    	      stopDefault(e);
    	    }
    	}

    	function justfyHeight(item){
    	    var itemHeight = item.height();
    	    if(itemHeight > 50){//超过两行
    	      return true;
    	    }
    	    return false;//没超过两行
    	}



  $('body').bind('click',function(){
      var searchList = $('.searchOptionBox').children('.PCSearchDown').hasClass('downup');
      if(searchList){
          $('.searchOptionBox').children('.PCSearchDown').removeClass('downup');
          $('.searchOptionBox').children('.OptionSet').hide();
      }
  });
  
  $('.topCloseAD').bind('click',function(){
	    $(this).parents('.topADBox').animate({height:'0'},500,function(){
	        $('.addADButton').show();
	        var win_scTop=$(window).scrollTop();
	        var xfNavH = getHeaderPartHeight();
	        var bannerTop = 0;
	        if ($('.banner_ul1').offset() != undefined) {
	        	bannerTop = $('.banner_ul1').offset().top;
	        }
        	Banner.XfNav(bannerTop,win_scTop,xfNavH);
	    });
	});
  
  $('.addADButton').bind('click',function(){
	    var that = this;
	    $('.topADBox').animate({height:'100px'},500,function(){
	        $(that).hide();
	        var win_scTop=$(window).scrollTop();
	        var xfNavH = getHeaderPartHeight();
	        var bannerTop = 0;
	        if ($('.banner_ul1').offset() != undefined) {
	        	bannerTop = $('.banner_ul1').offset().top;
	        }
        	Banner.XfNav(bannerTop,win_scTop,xfNavH);
	    })
	});
  
 }






      function setListVew(targetLi){
          var adPart = targetLi.find('dd').outerHeight();
          var menuPart = targetLi.find('dt').outerHeight();
          var maxHeight = Math.max(menuPart,adPart);
          if(menuPart < 216){
            targetLi.find('dd').children('div').addClass('dn');
            targetLi.find('dt').removeClass('adsquence');
          }else{
            targetLi.find('dt').addClass('adsquence');
          }
          //targetLi.find('dd').height(maxHeight);
          //targetLi.find('dt').height(maxHeight);

      }
      function initalADlist(){
          var AdMenu = $('.MuneDown');
          for(var i = 0; i < AdMenu.length; i++){
              setListVew(AdMenu.eq(i));
          }
      }

    function equilthight(arr){
        var arrItem1 = arr[0].height();
        var arrItem2 = arr[1].height();
        maxHeight = Math.max(arrItem1,arrItem2);
        arr[0].height(maxHeight);
        arr[1].height(maxHeight);
    }
    function loadInitalHeadList(){
        $('.nav_indicate_div').css('visibility','hidden');
        $('.nav_indicate_div').css('display','block');
        //putallListIn();
        //adShowCheck();
        initalADlist();
        $('.nav_indicate_div').removeAttr('style');

    }
    function setheaderListHight(item){
        var targetList = item.find('li');
        var arr = [];
        for(var i =0,j = 0; i < targetList.length; i++){
            if(i == (targetList.length -1)){
                break;
            }else{
                j++;
                if(j >= 2){
                  arr.push(targetList.eq(i));
                  equilthight(arr);
                  j = 0;
                  arr = [];
                }else{
                  arr.push(targetList.eq(i));
                }
            }
        }
    }
    function putallListIn(){
        $('.listBox_header-list3').each(function(index,item){
            var target = $(item);
            setheaderListHight(target);
        })
    }


    function adShowCheck(){
        $('.Two_nav_ul1').each(function(index,item){
            var itemwidth = $(item).width();
            if(itemwidth > 836){
                $(item).find('.recommendPic').parent('li').addClass('dn');
                $(item).siblings('.recommendTC_div').addClass('dn');
            }
        })
    }
    function gotoIndex(){
    	if ($.getCookie("userprocode") != undefined && $.getCookie("userprocode") != "") {
    		redirectUrl("http://www.10010.com/net5/" + $.getCookie("userprocode"));
    	} else {
    		redirectUrl("http://www.10010.com/net5/");
    	}
    }

//换肤功能
$(function(){
    var pfPicUrl=$('.backgroundDiv').attr('_bamboo_rep_backgroundimg');//获取换肤图片地址
    if (pfPicUrl == undefined || pfPicUrl== "") {
        $('.suspend_nav_div').addClass('bgFFF');
        $('.suspend_nav_div').removeClass('bgImg');
    }else{
        $('.suspend_nav_div').removeClass('bgFFF');
        $('.suspend_nav_div').addClass("bgImg");
        $('.bgImg').css('background','url('+pfPicUrl+') no-repeat center center');//将图片地址赋值
    }
})
