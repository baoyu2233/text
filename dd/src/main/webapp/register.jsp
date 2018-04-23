<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>订单信息填写信息</title>
<link rel="icon"
	href="${pageContext.request.contextPath}/img/favicon(1).ico">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.2.1.min.js"></script>
 <script type="text/javascript" src="${pageContext.request.contextPath}/ js/jquery-1.12.3.min.js"></script> 
<!-- <script type="text/javascript" src="${pageContext.request.contextPath}/js/register/analytics.js "></script> -->
<script src="${pageContext.request.contextPath}/js/register/hm.js "></script>
<script async="" src="${pageContext.request.contextPath}/js/register/gtm.js "></script>
<script language="javascript" type="text/javascript">
	var addressShowList = "/mall-web/OrderInputAjaxNew/ShowAddrList";
	var addressAddPostAddr = "/mall-web/OrderInputAjaxNew/addPostAddr";
	var addressModPostAddr = "/mall-web/OrderInputAjaxNew/modPostAddr";
	var addressDelPostAddr = "/mall-web/OrderInputAjaxNew/delPostAddr";
	var selfFetchInfoUrl = "/mall-web/OrderInputAjaxNew/toGetSelfFetchInfoList";
	var hasReceivePay = "/mall-web/OrderInputAjaxNew/hasReceivePay";
	var queryCustVoucherUrl = "/mall-web/OrderInputAjaxNew/queryCustVoucher";
	var activateVoucherUrl = "/mall-web/OrderInputAjaxNew/activateVoucher";
	var queryNetProtocol = "/mall-web/OrderInputAjaxNew/queryNetProtocol";
	var checkCustInfoUrl = "/mall-web/OrderInputAjaxNew/checkCustInfo";
	var checkPresentAmount = "/mall-web/OrderInputAjaxNew/checkPresentAmount";
	var checkCustInfoUrl4GroupBuy = "/mall-web/groupBuyingCheck/checkCustInfo";

	var isBigAreaGoods = "0"; //大区商品标志
	var bigAreaProvince = ''; //大区商品配送省份

	var TMPL_ID = "60000026"; // 模板标识
	var MERCHANT_ID = "8100000"; // 商户标识
	var SALEACT_TYPE = "0"; // 促销活动类型
	var ACTIVITY_TYPE = ""; // 商品合约类型
	var _custTag = "1";
	var isNotNeedPostAddr = "false";
	var isNotNeedNetworkData = "";
	var productId = "90273581"; // 产品ID
	var merchantProvice = "81"; // 商户所属省份
	var portageJson = {
		"DIF_PLACE" : "0",
		"LOCAL_FEE" : 0,
		"PROVINCE_CODE" : "81",
		"REMOTE_FEE" : 0
	}; // 商品运费
	var EssNumberCity = "810";
	var GoodsId = "811706294862";
	var formInfo = {};
	var billingInfoData = {};
	var VIPTag = "0";
	var hostName = "";
	var isSupportInvoiceHead = 0;
	var initAddress = true;
	var opeSysType = "2";
	// 电子协议参数
	var protocolParam = {
		"city" : "810",
		"goodsId" : "811706294862",
		"number" : "18581502300",
		"productId" : "90273581",
		"province" : "81"
	};
	//是否需要重查电子协议
	var isNeedReloadPro = "";
	//是否确认完入网资料
	var isConfirmedNetWork = "";
	var isConfirmedOldNetWork = "";
	var networkData = {};//入网信息
	var networkDataList = [];//入网信息列表(冰激凌号卡团购)
	var isNeedCard = "true";
	var isNeedHandCertPhoto = "false";//是否需要手持证件照
	var isNeedOppositePhoto = "false";//是否需要反面证件照
	var isNeedPositivePhoto = "false";//是否需要正面证件照
	var isNeedUsimCardPhoto = "false";//是否需要sim卡照
	var isNotNeedPhoto = "true";
	//主副卡标示
	var isMainSubFlag = "";
	//主副卡 主卡类型
	var mainCardType = "";
	//快捷认证
	var realNameType = "";
	var isPhoneLogin = "false";
	var netWorkType = "new";
	var goodsLink = "";
	var ORDER_ID = '';//黑卡行动为通用我的订单增加
	var cardInfoFlag = '2';
	/*  document.domain = "10010.com"; */
	var loginType = "2";
	var isNewBroadBand = "";//是否是新装宽带
	var isWoFamilyFlag = "";
	var woFamilyMainCardType = "";
	var woFamilyBroadBandType = "";
	var supportEleInvoiceFalg = "true";
	var oldUserNumber = "";
	var isGroupCardFlag = "1"
	var isChargeApple = "";
</script>


<script>
	/* if (!this.Esf) {
		this.Esf = {};
		Esf.contextPath = "/mall-web";
		Esf.servletContext = "/mall-web";
		Esf.resPath = "http://res.mall.10010.cn/mall";
		Esf.MallWebIndex = "http://mall.10010.com";
		Esf.MallWebContentPath = "/mall-web";
		Esf.goodsRecPhotoPath = "http://res.mall.10010.cn/mall/res";
		Esf.NewThreeGNumPath = "http://num.10010.com/NumApp";
		Esf.NewHeadLinkUrl = "http://mall.10010.com";
		Esf.UMallPath = "/mall-web";
		Esf.UMallListPath = "http://s.10010.com/SearchApp";
		Esf.MallAnalyticsUrl = "http://eop.mall.10010.com/storage/storage?data=";
		Esf.PhotoPath = "http://res.mall.10010.cn/mall/res";
	} */
</script>
<!-- <script type="text/javascript" src="${pageContext.request.contextPath}/css/register/saved_resource.css"></script> -->
<!--[if IE 6]>
   <script type="text/javascript" src="http://res.mall.10010.cn/mall/front/js/proddetl/??ie6Png.js?resVer=20180402113553"></script>
<script language="javascript" type="text/javascript">
DD_belatedPNG.fix(".ie6Png");
</script>
<![endif]-->
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/OrderInput_present_new.js "></script>
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/fillout_order_info_area.js "></script>
<!-- <script language="javascript" type="text/javascript"
	src="js/register/fillout_order_info_edit_New.js "></script> -->
	
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/fillout_network_check_pub.js "></script>
<!-- <script language="javascript" type="text/javascript"
	src="js/register/fillout_order_info_reservation.js "></script> -->
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/BespeakInfo.js "></script>
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/position.js "></script>
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/jquery.cookie.js "></script>
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/jquery.base64.js "></script>
<!-- <script language="javascript" type="text/javascript"
	src="js/register/pre_send_time.js "></script> -->
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/ajaxupload.js "></script>
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/jquery.pubsub.js "></script>
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/plupload.full.min.js "></script>
<!-- <script language="javascript" type="text/javascript"
	src="js/register/laydate.dev.js "></script> -->

<!-- <link type="text/css" rel="stylesheet" href="css/register/laydate.css"> -->
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath}/css/register/laydate(1).css" id="LayDateSkin">




<!-- <script language="javascript" type="text/javascript"
	src="js/register/OrderInputNew.js "></script> -->
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/OrderInputCheckNew.js "></script>
	<!-- 姓名 身份证验证 -->
 <script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/OrderInputCheckNew2.js "></script> 
<!-- <script language="javascript" type="text/javascript"
	src="js/register/ShipingAddress.js "></script> -->
<!-- <script language="javascript" type="text/javascript"
	src="js/register/PaymentNew.js "></script> -->
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/phone_model.js "></script>
<script language="javascript" type="text/javascript"
	src="${pageContext.request.contextPath}/js/register/google.js "></script>

<link href="${pageContext.request.contextPath}/css/register/global.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/css/register/fillout_order_info_new.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/css/register/layer.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/css/register/OrderInputNew.css" rel="stylesheet">
<link href="${pageContext.request.contextPath}/css/register/e_agreement_new.css" rel="stylesheet">
<style type="text/css">
#register_address{
width: 209px;
height: 118px;
font-size: 16px;
}
.set_meal{
position:relative;
border: 1px solid #e0e0e0;
font-size: 15px;
float:left;

width: 269px;
line-height: 30px;
text-align: center;
height: 30px;
}
.logistics_company{
    position: relative;
    border: 1px solid #CCCCCC;
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    height: 23px;
    font-size: 12px;
    text-align: center;
    padding-top: 3px;
    margin-right: 15px;
margin-bottom: 10px;
    line-height: 21px;

}
.i_img{

position: absolute;
    width: 15px;
    height: 15px;
    display: block;
    overflow: hidden;
    background: url(img/choise.png) no-repeat;
    bottom: 0px;
    right: 0px;
}
</style>

</head>

<body>
	<link href="${pageContext.request.contextPath}/css/register/tipsLayer.css" rel="stylesheet"
		type="text/css">

	<script language="javascript" type="text/javascript"
		src="${pageContext.request.contextPath}/js/register/phw.cmn.fn.js " charset="UTF-8"></script>
	<script language="javascript" type="text/javascript"
		src="${pageContext.request.contextPath}/js/register/position.js "></script>
	<style type="text/css">
.globalThickdiv {
	position: fixed;
	_position: absolute;
	top: 0;
	left: 0;
	z-index: 10000001;
	width: 100%;
	height: 100%;
	background: #000;
	border: 0;
	filter: alpha(opacity = 20);
	opacity: 0.20;
}
</style>
	<script type="text/javascript">
		/* $(function() {
			// $(".globalThickdiv").hide();

			// 表单提交时，判断是否出错
			var hasError = function() {
				return false;
			};

			// 错误处理公用方法（form、ajax）
			var processErrCmn = function(rspArr) {
				if ('FrontInput' == rspArr[0]) {
					var popDiv = format(Message.frontFailMsgTmpl, '提示',
							rspArr[1], '确定');
					Message
							.popup($("#frontPopDiv"), popDiv,
									"a[name=closeBtn]");
				} else {
					var popDiv = format(Message.backFailMsgTmpl, '操作失败',
							rspArr[1], '关闭');
					Message.popup($("#backPopDiv"), popDiv,
							"input[name=closeBtn]");
				}
			}

			// 登陆提示
			var showLoginMessage = function(rspArr) {
				var popDiv = format(Message.frontDialogLoginTmpl, '提示',
						'该操作需要登录，是否登录？', rspArr[0], '马上登录', '返回');
				Message.popupDialog($("#frontPopDiv"), popDiv,
						"a[name=yesBtn]", "a[name=noBtn]")
			}

			// 表单提交异常处理
			if (hasError()) {
				var rspArr = ''.split('^_^');
				processErrCmn(rspArr);
			}
			;

			// ajax调用全局处理
			var ajaxErrorHandler = function(XMLHttpRequest, textStatus,
					errorThrown) {
				var rspMsg = $.trim(XMLHttpRequest.responseText);
				var rspArr = rspMsg.split("^_^");
				if (400 == XMLHttpRequest.status) {
					$("#loadingStyle").hide();
					processErrCmn(rspArr);
				} else if (500 == XMLHttpRequest.status) {
					window.location.href = "/mall-web/" + rspArr[0] + "/init";
				} else if (600 == XMLHttpRequest.status) {
					showLoginMessage(rspArr);
				} else if (601 == XMLHttpRequest.status) {
					window.location.href = "/mall-web/" + rspArr[0];
				} else if (901 == XMLHttpRequest.status) {
					window.location.href = "/mall-web/BusinessForbidden/input";
				}
			};

			$.ajaxSetup({
				error : ajaxErrorHandler
			});
		});

		var Message = {};

		Message.type = 'front';

		// 前台弹出框模板
		Message.frontFailMsgTmpl = "<div class='tipsLayerT ie6Png'><span>{0}</span><label></label></div><div class='tipsLayerM ie6Png'><p class='textCenter' id='msg'>{1}</p><div class='layerBtn'><a href='javascript:void(0)' name='closeBtn' class='blueBtnNew marginLeft' ><em>{2}</em></a></div></div><div class='tipsLayerB ie6Png'></div>";
		Message.frontFailMsgTmplWithImage = "<div class='popLayerTop ie6Png'> <h3>{0}</h3><span class='closeBtn'></span> </div> <div class='popLayerMid ie6Png'> <dl class='tipsDl'> <dt><img src='{1}' alt='' width='65' height='76'></dt> <dd> <p>{2}</p> <p>{3}</p> <a href='{4}' class='cBlue'>{5}&gt;&gt;</a> </dd> </dl> <a class='shortOrangeBtn sureBtn'>{6}</a> </div> <div class='popLayerBot ie6Png'></div>";
		Message.frontOKMsgTmpl = Message.frontFailMsgTmpl;
		Message.frontDialogMsgTmpl = "<div class='tipsLayerT ie6Png'><span>{0}</span><label></label></div><div class='tipsLayerM ie6Png'><p class='textCenter'>{1}</p><div class='layerBtn'><a href='javascript:void(0)' class='blueBtn' name='yesBtn'>{2}</a><a href='javascript:void(0)' class='whiteBtn' name='noBtn'>{3}</a></div></div><div class='tipsLayerB ie6Png'></div>";
		Message.frontDialogLoginTmpl = "<div class='tipsLayerT ie6Png'><span>{0}</span><label></label></div><div class='tipsLayerM ie6Png'><p class='textCenter'>{1}</p><div class='layerBtn'><a href='{2}' class='blueBtn' name='yesBtn'>{3}</a><a href='javascript:void(0)' class='whiteBtn' name='noBtn'>{4}</a></div></div><div class='tipsLayerB ie6Png'></div>";

		// 后台弹出框模板
		Message.backFailMsgTmpl = "<h3 class='failure'>{0}</h3><p class='topLine'>{1}</p><p><input value='{2}' type='button' class='choiceSubmit' name='closeBtn'></p>";
		Message.backOKMsgTmpl = "<h3 class='success'>{0}</h3><p class='topLine'>{1}</p><p><input value='{2}' type='button' class='choiceSubmit' name='closeBtn'></p>";
		Message.backDialogMsgTmpl = "<h3 class='change'>{0}</h3><p class='topLine'>{1}</p><p><input value='{2}' type='button' class='choiceSubmit' name='yesBtn'><input value='{3}' type='button' class='choiceSubmit' name='noBtn'></p>";

		// 弹出div层
		Message.popup = function($popDiv, popdiv, closeBtn, callback) {
			if ($popDiv.is(":visible")) {
				return;
			}
			$popDiv = $popDiv.append(popdiv);
			$(".globalThickdiv").show();
			$popDiv.show().center();

			var $closeBtn = $popDiv.find(closeBtn);
			$closeBtn.focus();
			$closeBtn.click(function() {
				$popDiv.empty();
				$popDiv.hide();
				$(".globalThickdiv").hide();
				if ($(".thickdiv")) {
					$(".thickdiv").hide();
				}
				callback && callback();
			});

			$popDiv.find("label").click(function() {
				$popDiv.empty();
				$popDiv.hide();
				$(".globalThickdiv").hide();
				if ($(".thickdiv")) {
					$(".thickdiv").hide();
				}
				callback && callback();
			});
		};

		// 弹出带返回值的div层
		Message.popupDialog = function($popDiv, popdiv, yesBtn, noBtn, callback) {
			$popDiv = $popDiv.append(popdiv);
			$(".globalThickdiv").show();
			$popDiv.show().center();

			var closeFn = function(chosen) {
				$popDiv.empty();
				$popDiv.hide();
				$(".globalThickdiv").hide();
				if ($(".thickdiv")) {
					$(".thickdiv").hide();
				}
				callback && callback(chosen);
			}
			var $yesBtn = $popDiv.find(yesBtn);
			$yesBtn.focus();
			$yesBtn.click(function() {
				closeFn(true);
			});
			var $noBtn = $popDiv.find(noBtn);
			$noBtn.click(function() {
				closeFn(false);
			});

			$popDiv.find("label").click(function() {
				closeFn(false);
			});
		};

		// 成功提示框
		Message.showOKMsg = function(title, msg, btnText, callback) {
			if ('front' == Message.type) {
				var popDiv = format(Message.frontOKMsgTmpl, title, msg, btnText);
				Message.popup($("#frontPopDiv"), popDiv, "a[name=closeBtn]",
						callback);
			} else {
				var popDiv = format(Message.backOKMsgTmpl, title, msg, btnText);
				Message.popup($("#backPopDiv"), popDiv, "input[name=closeBtn]",
						callback);
			}
		};
		Message.showOKMsgDef = function(msg, callback) {
			if ('front' == Message.type) {
				Message.showOKMsg('提示', msg, '确认', callback);
			} else {
				Message.showOKMsg('操作成功', msg, '关闭', callback);
			}
		};

		Message.closeOKMsgDef = function(callback) {
			var $popDiv = $("#frontPopDiv");
			var closeFn = function(chosen) {
				$popDiv.empty();
				$popDiv.hide();
				$(".globalThickdiv").hide();
				if ($(".thickdiv")) {
					$(".thickdiv").hide();
				}
				callback && callback(chosen);
			}
			closeFn(true);
		};

		// 失败提示框
		Message.showFailMsg = function(title, msg, btnText, callback) {
			if ('front' == Message.type) {
				var popDiv = format(Message.frontFailMsgTmpl, title, msg,
						btnText);
				Message.popup($("#frontPopDiv"), popDiv, "a[name=closeBtn]",
						callback);
			} else {
				var popDiv = format(Message.backFailMsgTmpl, title, msg,
						btnText);
				Message.popup($("#backPopDiv"), popDiv, "input[name=closeBtn]",
						callback);
			}
		};

		// 带图片错误提示
		Message.showFailMsgWithImage = function(title, imageSrc, msg, msg2,
				link, linkText, btnText, callback) {
			if ('front' == Message.type) {
				var popDiv = format(Message.frontFailMsgTmplWithImage, title,
						imageSrc, msg, msg2, link, linkText, btnText);
				Message.popupDialog($("#frontPopDiv"), popDiv, ".sureBtn",
						".closeBtn", callback);
			}
		};

		// 默认带图片错误提示
		Message.showFailMsgWithImageDef = function(imageSrc, msg, msg2, link,
				linkText, callback) {
			Message.showFailMsgWithImage('提示', imageSrc, msg, msg2, link,
					linkText, '确    定', callback);
		};

		Message.showFailMsgDef = function(msg, callback) {
			if ('front' == Message.type) {
				Message.showFailMsg('提示', msg, '确认', callback);
			} else {
				Message.showFailMsg('操作失败', msg, '关闭', callback);
			}
		};

		// 对话框
		Message.showDialogMsg = function(title, msg, btnYesText, btnNoText,
				callback) {
			if ('front' == Message.type) {
				var popDiv = format(Message.frontDialogMsgTmpl, title, msg,
						btnYesText, btnNoText);
				return Message.popupDialog($("#frontPopDiv"), popDiv,
						"a[name=yesBtn]", "a[name=noBtn]", callback);
			} else {
				var popDiv = format(Message.backDialogMsgTmpl, title, msg,
						btnYesText, btnNoText);
				return Message.popupDialog($("#backPopDiv"), popDiv,
						"input[name=yesBtn]", "input[name=noBtn]", callback);
			}
		};
		Message.showDialogMsgDef = function(msg, callback) {
			if ('front' == Message.type) {
				Message.showDialogMsg('提示', msg, '确认', '取消', callback);
			} else {
				Message.showDialogMsg('请选择', msg, '确定', '取消', callback);
			}
		}; */
	</script>
	<!--globalThickdiv-->
	<div class="globalThickdiv" style="display: none;"></div>
	<!--前台弹出层-->
	<div id="frontPopDiv" class="tipsLayer layerIndex onshow trackable"
		showcrawl="msg" style="display: none;"></div>
	<!--后台弹出层-->
	<div id="backPopDiv" class="adminTipsLayer layerIndex"
		style="display: none;"></div>
	<input type="hidden" id="addressSwitch" name="addressSwitch"
		value="flase">

	<div id="header" class="center980">
		<div class="logo" style="height: 53px; border: 0; margin-top: 10px;">
			<a href="http://mall.10010.com/mall-web/g4common/index.htm"><img
				src="${pageContext.request.contextPath}/img/logo.gif"></a>
		</div>
		<ul class="step" id="orderCartStep1">
			<li class="step1">选择号码套餐</li>
			<li class="step2">核对填写订单</li>
			<li class="step3">11订单提交成功</li>
		</ul>
		<ul class="schedule" id="scheduleStep1" style="display: none;">
			<li class="step1 cWhite">1.填写预约信息</li>
			<li class="step2">2.预约成功</li>
		</ul>
	</div>
	<!--header end-->
	<!--content begin-->
	<div id="content" class="content center980">

		<!--入网信息 begin-->

		<!--冰激凌团购入网资料填写-->
		<!--入网信息 begin-->
		<div class="netWork" id="netWorkTarget2">
			<h1 class="infoTitle fontC333S14B" id="networkTitle1"
				name="networkTitle">入网信息</h1>
			<div class="infoTapDiv userInformation">
				<ul class="infoTap">
					<label class="bgA"> <span class="bgB"></span>
					</label>
					<li class="newUserInfo borRightN"><span>新用户入网认证</span></li>
				</ul>
			</div>
			<div class="messageBox">
				<input type="hidden" id="identify" province="81" city="810"
					goodsid="811706294862" tmplid="60000026">
				<div class="customeMessage">
					<p class="phoneNumber">
						您的号码：<span>${phonename}</span>
					</p>

					<div class="identifyMessage" style="display: none">
						<div class="icon">
							<i class="edit"></i>
						</div>
						<p class="identifyName">
							姓名：<span></span>
						</p>
						<p class="identifyCard">
							身份证：<span></span>
						</p>
						<input type="hidden" class="userAmout" value="">
					</div>
					<div class="messageDetail">
						<p class="nameInfo">
							<span>机主姓名</span> <input type="text" class="name"
								onblur="checkReceiverName2(this);" style="color: rgb(0, 0, 0);">
							<span class="checkSuccess" style="display: none;"></span>
						</p>
						<p class="nameError" title="请准确填写机主姓名" style="display: block;">
							<i class="false"></i><span></span>
						</p>
						<p class="idInfo">
							<span>身份证号</span> <input type="text" class="idCert"
								onblur="checkIdCard2(this);" style="color: rgb(0, 0, 0);">
							<span class="checkSuccess" style="display: none;"></span>
						</p>
						<p class="idError" title="身份证号码校验错误" style="display: block;">
							<i class="false"></i><span></span>
						</p>
					<!-- 	<button class="commit" onclick="confirmNetinCheck2(this);">确认</button> -->
						<span class="errorMsg" hidden=""></span>
					</div>
				</div>

				<div class="infoBox" style="padding: 10px 0px; margin-top: -50px;">
					<!-- <div class="table">
						<label style="width: 10%">首月资费</label>

						<div>
							<ul class="monthFee" id="monthFeeArea">
								<li class="redSelectAction" monthfee="A000011V000001" name="">付全月<i></i></li>
								<li monthfee="A000011V000003" class="">按量计费<i></i></li>
							</ul>
							<label
								style="width: 210px; height: 20px; float: left; height: 20px; line-height: 20px; margin-top: 5px; color: #f60;">“首月”指号码激活认证成功当月。</label>
							<a class="monthFeeDetail1"
								style="width: 200px; display: block; float: left">如何选择首月资费？</a>
						</div>
					</div> -->
					<script type="text/javascript">
				$(function(){
				/* 	$("#set_meal_1").click(function(){
						$("#set_meal_d1").css({"border": "1px solid #f36f2a"})
						
						$("#set_meal_d2").css({"border": "1px solid #e0e0e0"})
						$("#set_meal_d3").css({"border": "1px solid #e0e0e0"})
						$("#i_img_1").css({"display":"block"})
						$("#i_img_2").css({"display":"none"})
						$("#i_img_3").css({"display":"none"})
					})
						
					$("#set_meal_2").click(function(){
						$("#set_meal_d2").css({"border": "1px solid #f36f2a"})
						$("#set_meal_d1").css({"border": "1px solid #e0e0e0"})
						$("#set_meal_d3").css({"border": "1px solid #e0e0e0"})
						$("#i_img_2").css({"display":"block"})
						$("#i_img_1").css({"display":"none"})
						$("#i_img_3").css({"display":"none"})
					})
					$("#set_meal_3").click(function(){
						$("#set_meal_d3").css({"border": "1px solid #f36f2a"})
						$("#set_meal_d1").css({"border": "1px solid #e0e0e0"})
						$("#set_meal_d2").css({"border": "1px solid #e0e0e0"})
						$("#i_img_3").css({"display":"block"})
						$("#i_img_2").css({"display":"none"})
						$("#i_img_1").css({"display":"none"})
					}) */
					$(".aa").click(function(){
						$(".aa i").css({"display":"none"})
					
						$(".aa").css({"border": "1px solid #e0e0e0"})
						$(this).css({"border": "1px solid #f36f2a"})
							
						$(this).children(".i_img").css({"display":"block"})
					})
					
				});
					
					</script>
					<div class="table"  style="width: 408px;height: 218px;position: relative;top:-50px; ">
						<label style="width: 25% ;position: relative;top:8px; left:-10px; font-size: 14px; color: #333;font-weight: bold;">SIM卡类型:</label>
				</br>
						</br>
						<div>
							<div >
							<label class="set_meal  aa"  id="set_meal_d1" >
								<input    id="set_meal_1" style="width:36px;  display: none;" type="radio"  name="set_meal" vaule="1" checked="checked"/>
								套餐一: 月租9.9&nbsp;&nbsp;&nbsp;流量300M<i  id="i_img_1"   class="i_img"  style="display: none;"></i>
							</label>
							</div>
							</br>
							</br>
								<div>
								<label   class="set_meal  aa"  id="set_meal_d2" >
								<input id="set_meal_2" style="width: 36px;  display: none;" type="radio"  name="set_meal" vaule="2">套餐二: 月租18&nbsp;&nbsp;&nbsp;流量500M
								<i  id="i_img_2"   class="i_img"  style="display: none;" ></i>
						 </label>
						   </div>
						   	</br>
								</br>
								<div >
								<label  class="set_meal  aa"  id="set_meal_d3">
								<input id="set_meal_3" style="width:36px;   display: none;"  type="radio"  name="set_meal" vaule="3">套餐三: 月租38&nbsp;&nbsp;&nbsp;流量1024M
								<i  id="i_img_3"   class="i_img"  style="display: none;" ></i>
						     </label>
						      </div>
						</div>
					</div>
				</div>

				<hr>

				<!--首月支付方式说明start-->
				<!-- <div class="monthFeeDetail" style="display: none;">
					<div id="monthFeeDetailTop">
						<label>首月资费支付方式</label> <span class="monthFeeDetailClose"><img
							src="img/close.png"></span>
					</div>
					<div class="monthFeeDetailContent">
						<dl>
							<dt>首月资费</dt>
							<dd style="width: 84%">
								<ul class="monthFee2">
									<li class="redSelectAction" value="A000011V000001">付全月<i></i></li>
									<li value="A000011V000003">按量计费<i></i></li>
								</ul>
							</dd>
						</dl>
						<dl>
							<dt>购买日期</dt>
							<dd>
								<ul id="buyDate">
									<li class="redf60">10号前建议选择</li>
									<li>10-15建议选择</li>
									<li>25号之后建议选择</li>
								</ul>
							</dd>
						</dl>
						<dl>
							<dt>套餐内容</dt>
							<dd>
								<ul id="TCDetail">
									<li>按照您选择的套餐正常计费并享受套餐内容</li>
									<li>按标准计费方式计费</li>
								</ul>
							</dd>
						</dl>
					</div>
					<input id="monthFeeDetailClose" type="button" value="确    定">
				</div> -->
				<!--首月支付方式说明end-->


				<!--
            <div class="newOldChange">
                <div class="table">
                    <label></label>

                    <div style="margin-top: 4px">
                        <a class="infoBoxBtn" href="javascript:" id="networkInfoSave" onclick="confirmNetinCheck()">确&nbsp;&nbsp;&nbsp;&nbsp;认</a>
                    </div>
                </div>
            </div>
        -->
			</div>


			<!-- <div class="verifyBox infoTips">
        <img src="img/error.png" class="verigyError">
        <p class="verifyTips errorTips" style="display: none;">根据国家一证五户要求，证件<span></span>，已达到办理号码数量上限，请使用其他身份证办理。</p>
        <p class="verifyTips normalTips">
           根据国家一证五户要求,请点击验证所有证件。</p>
        <button class="verifyButton" onclick="confirmAllNetinCheck();">提交并验证</button>
    </div>
    <div class="verifyBox infoOK" style="display: none">
        <img src="./订单信息填写信息_files/checksuccess.png" class="verigyError">
        <p class="verifyTips normalTips">所有证件已经校验成功。</p>
    </div> -->
			<hr>
		</div>
		<!--入网资料 end-->
		<!--入网资料 end-->

		<!--收货地址begin -->

		<div style="margin-top: 10px">
			<h1 class="infoTitle fontC333S14B" id="deliverTarget">送货信息</h1>

			<div class="infoTapDiv addressInformation">
				<ul class="infoTap">
					<label class="bgA unChoice" style="left: 0px;"> <span
						class="bgB"></span>
					</label>
					<li class="kuaidi choice" name="deliveryMode" flag="01"><span
						style="color: white;">快递送货上门</span></li>
					<li class="ziti unChoice" name="deliveryMode" flag="03" fee="0">
						<span style="color: black;">来联通自提</span>
					</li>
				</ul>
			</div>
			<div class="infoBox" id="kuaidi" style="">
				<div class="userInfo">
					<div class="addressShow"></div>
					<div class="userInfoDetail" id="addressNewArea">
						<textarea  name="address" id="register_address"  placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息!"  ></textarea>
					</div>
				</div>

				<!--添加新地址弹窗开始-->
				<div id="addressNewAreaDetail" style="display: none;">
					<div id="addressTop">
						<label style="font-size: 14px;">添加新地址</label> <span
							class="addressCloseO"><img src="img/close.png"></span>
					</div>
					<div class="addressMessage" style="margin-top: 20px">
						<label>收货人</label> <input type="text" class="inputWidth228px"
							value="请填写真实姓名" name="consignee" maxlength="20" id="consignee"
							style="color: rgb(153, 153, 153);">

						<div class="correct" id="consigneeCorrect" style="display: none;"></div>
						<div class="error" id="consigneeError" style="display: none;"></div>
					</div>
					<div class="addressMessage">
						<label>所在地区</label>

						<div class="addressCity1">
							<ul>
								<li><select id="provinceId" name="provinceID"
									class="addressProvince">

										<option value="0">省份/直辖市</option>
										<option ess_province_code="81" value="510000">四川</option>
								</select> <span class="seLectStSpan1" style=""> <label
										class="seLectStLabel1" style="">省份/直辖市</label> <img
										class="seLectStImg1" src="${pageContext.request.contextPath}/img/select.png" style="">
								</span></li>
								<li><select class="addressCity" id="cityId">
										<option value="0">--市--</option>
								</select> <span class="seLectStSpan1" style=""> <label
										class="seLectStLabel1" style="">--市--</label> <img
										class="seLectStImg1" src="${pageContext.request.contextPath}/img/select.png" style="">
								</span></li>
								<li><select class="addressCounty" id="areaId">
										<option value="0">--县/区--</option>
								</select> <span class="seLectStSpan1" style=""> <label
										class="seLectStLabel1" style="">--县/区--</label> <img
										class="seLectStImg1" src="${pageContext.request.contextPath}/img/select.png" style="">
								</span></li>
							</ul>
							<div class="correct" id="detailcityCorrect"
								style="display: none;"></div>
							<div class="error" id="detailcityError" style="display: none;"></div>
						</div>

					</div>
					<div class="addressMessage">
						<label>详细地址</label> <input id="consigneeAddress" type="text"
							class="inputWidth315px" value="请填写详细路名及门牌号"
							checkAddressInfo()" name="detailAddress" maxlength="50"
							style="color: rgb(153, 153, 153);">

						<div class="correct" id="detailAddressCorrect"
							style="display: none;"></div>
						<div class="error" id="detailAddressError" style="display: none;"></div>
					</div>
					<div class="addressMessage">
						<label>手机号码</label> <input id="consigneePhone" type="text"
							class="inputWidth183px" value="请填写手机号码"
							checkMobel();" name="mobile" maxlength="11"
							style="color: rgb(153, 153, 153);">

						<div class="correct" id="mobelCorrect" style="display: none;"></div>
						<div class="error" id="mobelError" style="display: none;"></div>
					</div>
					<div style="display: none">
						<input id="editPostId">
					</div>
					<div class="addressBottom">
						<input class="AgBtn" type="button" value="确  认"> <input
							class="unagBtn" type="button" value="取  消">
					</div>
				</div>
				<!--添加新地址弹窗结束-->
				<p class="moreAddress" style="display: none;">查看更多收货地址&gt;&gt;</p>

				<div class="moreAddressDetail">
					<div class="moreAddressDetailTap">
						<label style="font-size: 14px">个人收货地址</label> <img
							class="moreAddressDetailClose" src="${pageContext.request.contextPath}/img/close.png">
					</div>
					<div class="moreAddressDetailContent">
						<ul>
						</ul>
					</div>

					<div class="oldPhoneResultBtn">
						<input class="moreAddressBtn" type="button" value="确认"> <input
							class="unMoreAddressBtn" type="button" value="取消">
					</div>
				</div>

				<div class="deleBtn" style="display: none;">
					<div class="deleBtnTop">
						<label style="margin-top: 8px">删除确认框</label> <span
							class="deleBtnClose"><img src="${pageContext.request.contextPath}/img/close.png"></span>
					</div>
					<p>您确认要删除吗</p>
					<input class="deleBtnAgree" type="button" value="确定"> <input
						class="deleBtnunAgree" type="button" value="取消">
				</div>

				<div class="deleBtn1" style="display: none;">
					<div class="deleBtnTop1">
						<label>删除确认框</label> <span class="deleBtnClose1"><img
							src="${pageContext.request.contextPath}/img/close.png"></span>
					</div>
					<p>您确认要删除吗</p>
					<input class="deleBtnAgree1" type="button" value="确定"> <input
						class="deleBtnunAgree1" type="button" value="取消">
				</div>

<script type="text/javascript">
$(function(){
	/*$("#logistics_company_1").click(function(){
		$("#logistics_company_1").css({"border": "1px solid #f36f2a"})
		$("#logistics_company_2").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_3").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_4").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_5").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_6").css({"border": "1px solid #e0e0e0"})
		$("#i_img_company1").css({"display":"block"})
	    $("#i_img_company2").css({"display":"none"})
	    $("#i_img_company3").css({"display":"none"})
	      $("#i_img_company4").css({"display":"none"})
	    $("#i_img_company5").css({"display":"none"})
	      $("#i_img_company6").css({"display":"none"})
	   
	})
	$("#logistics_company_2").click(function(){
		$("#logistics_company_2").css({"border": "1px solid #f36f2a"})
		$("#logistics_company_1").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_3").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_4").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_5").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_6").css({"border": "1px solid #e0e0e0"})
		$("#i_img_company2").css({"display":"block"})
	    $("#i_img_company1").css({"display":"none"})
	    $("#i_img_company3").css({"display":"none"})
	      $("#i_img_company4").css({"display":"none"})
	    $("#i_img_company5").css({"display":"none"})
	      $("#i_img_company6").css({"display":"none"})
	})
	$("#logistics_company_3").click(function(){
		$("#logistics_company_3").css({"border": "1px solid #f36f2a"})
		$("#logistics_company_2").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_1").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_4").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_5").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_6").css({"border": "1px solid #e0e0e0"})
		$("#i_img_company3").css({"display":"block"})
	    $("#i_img_company2").css({"display":"none"})
	    $("#i_img_company1").css({"display":"none"})
	      $("#i_img_company4").css({"display":"none"})
	    $("#i_img_company5").css({"display":"none"})
	      $("#i_img_company6").css({"display":"none"})
	})
	$("#logistics_company_4").click(function(){
		$("#logistics_company_4").css({"border": "1px solid #f36f2a"})
		$("#logistics_company_2").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_3").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_1").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_5").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_6").css({"border": "1px solid #e0e0e0"})
		$("#i_img_company4").css({"display":"block"})
	    $("#i_img_company2").css({"display":"none"})
	    $("#i_img_company3").css({"display":"none"})
	      $("#i_img_company1").css({"display":"none"})
	    $("#i_img_company5").css({"display":"none"})
	      $("#i_img_company6").css({"display":"none"})
	})
	$("#logistics_company_5").click(function(){
		$("#logistics_company_5").css({"border": "1px solid #f36f2a"})
		$("#logistics_company_2").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_3").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_4").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_1").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_6").css({"border": "1px solid #e0e0e0"})
		$("#i_img_company5").css({"display":"block"})
	    $("#i_img_company2").css({"display":"none"})
	    $("#i_img_company3").css({"display":"none"})
	      $("#i_img_company4").css({"display":"none"})
	    $("#i_img_company1").css({"display":"none"})
	      $("#i_img_company6").css({"display":"none"})
	  
	})
	$("#l ogistics_company_6").click(function(){
		
		$("#logistics_company_6").css({"border": "1px solid #f36f2a"})
		$("#logistics_company_2").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_3").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_4").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_5").css({"border": "1px solid #e0e0e0"})
		$("#logistics_company_1").css({"border": "1px solid #e0e0e0"})
		$("#i_img_company6").css({"display":"block"})
	    $("#i_img_company2").css({"display":"none"})
	    $("#i_img_company3").css({"display":"none"})
	      $("#i_img_company4").css({"display":"none"})
	    $("#i_img_company5").css({"display":"none"})
	      $("#i_img_company1").css({"display":"none"})
	})
	  */
	/* 
	$("#delivery_time_1").click(function(){
		$("#delivery_time_1").css({"border": "1px solid #f36f2a"})
		$("#delivery_time_2").css({"border": "1px solid #e0e0e0"})
		$("#delivery_time_3").css({"border": "1px solid #e0e0e0"})
		$("#delivery_time_1 i").css({"display":"none"})
		$(this).children(".i_img").css({"display":"block"})
	})
	$("#delivery_time_2").click(function(){
		$("#delivery_time_2").css({"border": "1px solid #f36f2a"})
		$("#delivery_time_1").css({"border": "1px solid #e0e0e0"})
		$("#delivery_time_3").css({"border": "1px solid #e0e0e0"})
		$("#delivery_time_2 i").css({"display":"none"})
		$(this).children(".i_img").css({"display":"block"})
	})
	$("#delivery_time_3").click(function(){
		$("#delivery_time_3").css({"border": "1px solid #f36f2a"})
		$("#delivery_time_2").css({"border": "1px solid #e0e0e0"})
		$("#delivery_time_1").css({"border": "1px solid #e0e0e0"})
		$("#delivery_time_3 i").css({"display":"none"})
		$(this).children(".i_img").css({"display":"block"})
		
	}) */
	$(".bb").click(function(){
		$(".bb i").css({"display":"none"})
	
		$(".bb").css({"border": "1px solid #e0e0e0"})
		$(this).css({"border": "1px solid #f36f2a"})
			
		$(this).children(".i_img").css({"display":"block"})
	})
	$(".cc").click(function(){
		$(".cc i").css({"display":"none"})
	
		$(".cc").css({"border": "1px solid #e0e0e0"})
		$(this).css({"border": "1px solid #f36f2a"})
			
		$(this).children(".i_img").css({"display":"block"})
	})
	$(".dd").click(function(){
		$(".dd i").css({"display":"none"})
	
		$(".dd").css({"border": "1px solid #e0e0e0"})
		$(this).css({"border": "1px solid #f36f2a"})
			
		$(this).children(".i_img").css({"display":"block"})
	})
	
});
</script>

				<div class="table" style="height: auto">
					<label class="tableLeft">物流公司</label>
					<div style="height: auto">
					
					<label  class="logistics_company   bb"   id="logistics_company_1">
								<input style="display: none;"  type="radio"  name="logistics_company" vaule="1">不限物流
								
								<i  id="i_img_company1 "   class="i_img "  style="display: none;" ></i>
						     </label>
						     <label  class="logistics_company  bb"  id="logistics_company_2">
								<input style="display: none;"  type="radio"  name="logistics_company" vaule="2">邮政EMS
								<i  id="i_img_company2"   class="i_img"  style="display: none;" ></i>
						     </label>
						     <label  class="logistics_company  bb"  id="logistics_company_3">
								<input style="display: none;"  type="radio"  name="logistics_company" vaule="3">顺丰速运
								<i  id="i_img_company3"   class="i_img"  style="display: none;" ></i>
						     </label>
						     <label  class="logistics_company  bb"  id="logistics_company_4">
								<input style="display: none;"  type="radio"  name="logistics_company" vaule="4">中国邮政
								<i  id="i_img_company4"   class="i_img"  style="display: none;" ></i>
						     </label>
						     <label  class="logistics_company  bb"  id="logistics_company_5">
								<input style="display: none;"  type="radio"  name="logistics_company" vaule="5">邮政电商小包
								<i  id="i_img_company5"   class="i_img"  style="display: none;" ></i>
						     </label>
						        <label  class="logistics_company  bb"  id="logistics_company_6">
								<input style="display: none;"  type="radio"  name="logistics_company" vaule="6">京东物流
								<i  id="i_img_company6"   class="i_img"  style="display: none;" ></i>
						     </label>
					</div>
				</div>
				<div class="table" style="height: auto">
					<label class="tableLeft">送货时间</label>

					<div style="height: auto">
					  <label  class="logistics_company cc"  id="delivery_time_1">
								<input style="display: none;"  type="radio"  name="delivery_time" vaule="1">不限时间
								<i  id="i_img_time1"   class="i_img"  style="display: none;" ></i>
						     </label>
						       <label  class="logistics_company cc"  id="delivery_time_2">
								<input style="display: none;"  type="radio"  name="delivery_time" vaule="2">仅工作日
								<i  id="i_img_time2"   class="i_img"  style="display: none;" ></i>
						     </label>
						       <label  class="logistics_company cc"  id="delivery_time_3">
								<input style="display: none;"  type="radio"  name="delivery_time" vaule="3">仅周末/节假日 
								<i  id="i_img_time3"   class="i_img"  style="display: none;" ></i>
						     </label>
					</div>
				</div>

				<p class="massage">
					<span>*&nbsp;</span>因各家物流的配送范围不同，实际配送物流以发货为准，我们会为您安排更合适的配送方案，请您放心！
				</p>


			</div>


			<div id="ziti" class="infoBox" style="display: none;">
				<div class="zitiTips"
					style="display: none; position: relative; width: 897px;">
					<span class="icon"></span> <span class="attention">注：</span> <span
						class="context">订单处理完成后送至自提点需要一定时间，请您耐心等待客户经理通知，一般提货时间为下单后的几个工作日，遇特殊情况会适当延期。</span>
				</div>

				<div class="table">
					<label>收货人</label>

					<div>

						<input type="text" class="inputWidth183px" value=" 2-20个汉字"
							checkContactName();" name="contactName" maxlength="20"
							id="ztConsignee">

						<div class="correct" id="ztContactNameCorrect"
							style="display: none;"></div>
						<div class="error" id="ztContactNameError" style="display: none;">请填写信息</div>

					</div>
				</div>
				<div class="table">
					<label>手机号码</label>

					<div>
						<input type="text" class="inputWidth183px" value="请填写手机号码"
							name="contactMobile" maxlength="11" id="ztConsigneePhone">

						<div class="correct" id="ztContactMobelCorrect"
							style="display: none;"></div>
						<div class="error" id="ztContactMobelError" style="display: none;"></div>


					</div>
				</div>
				<div class="table">
					<label>选择自提点</label>

					<div style="margin-left: 0px">
						<select id="provinceId" name="provinceID" class="ztProvince"><option
								ess_province_code="81" value="510000">四川</option></select> <select
							id="cityId" class="ztCity"><option value="0">--市--</option>
							<option value="510100" ess_city_code="810">成都市</option>
							<option value="510300" ess_city_code="818">自贡市</option>
							<option value="511800" ess_city_code="811">雅安市</option>
							<option value="510700" ess_city_code="824">绵阳市</option>
							<option value="511100" ess_city_code="814">乐山市</option>
							<option value="510600" ess_city_code="825">德阳市</option>
							<option value="510400" ess_city_code="813">攀枝花市</option>
							<option value="511500" ess_city_code="817">宜宾市</option>
							<option value="513200" ess_city_code="829">阿坝藏族羌族自治州</option>
							<option value="511000" ess_city_code="816">内江市</option>
							<option value="511400" ess_city_code="819">眉山市</option>
							<option value="512000" ess_city_code="830">资阳市</option>
							<option value="510500" ess_city_code="815">泸州市</option>
							<option value="511300" ess_city_code="822">南充市</option>
							<option value="511700" ess_city_code="820">达州市</option>
							<option value="510900" ess_city_code="821">遂宁市</option>
							<option value="510800" ess_city_code="826">广元市</option>
							<option value="511600" ess_city_code="823">广安市</option>
							<option value="511900" ess_city_code="827">巴中市</option>
							<option value="513400" ess_city_code="812">凉山彝族自治州</option>
							<option value="513300" ess_city_code="828">甘孜藏族自治州</option></select> <select
							id="areaId" class="ztCounty"><option value="0">--县/区--</option></select>

						<div class="correct" id="detailcityCorrect" style="display: none;"></div>
						<div class="error" id="detailcityError" style="display: none;"></div>
					</div>
				</div>

				<div id="addressSelect">
					<table class="addressSelectTab" border="0" cellpadding="0"
						cellspacing="0">
						<tbody>
							<tr class="firstList">
								<td class="listOne">选择</td>
								<td class="listTwo">自提点名称</td>
								<td class="listThree">地址</td>
								<td class="listFour">联系方式</td>
								<td class="listFive">交通路线</td>

							</tr>
						</tbody>
					</table>
				</div>
				<input id="addressSelectBtn" style="display: none" type="button"
					value="确    定">

			</div>


			<div id="zitiBtn" class="infoBox" style="display: none;">

				<input id="confirmFlag" type="hidden" value="unconfirm">

				<div class="table">
					<label>收货人</label>

					<div>
						<p class="zitiBtnPerson"></p>
					</div>
				</div>
				<div class="table">
					<label>手机号码</label>

					<div>
						<p class="zitiBtnPhone"></p>
					</div>
				</div>
				<div class="table">
					<label>选择自提点</label>

					<div>
						<p>
							<span class="zitiBtnProvince"></span> <span class="zitiBtnCity"></span>
							<span class="zitiBtnCounty"></span> <span class="zitiBtnAddress"></span>
							<span class="zitiBtnEdit">修改</span>
						</p>
					</div>
				</div>
				<div class="table">
					<label>自提点地址</label>

					<div>
						<p class="zitiBtnAddressDetail"></p>
					</div>
				</div>
				<div class="table">
					<label>自提点电话</label>

					<div>
						<p class="zitiBtnPhone1"></p>
					</div>
				</div>
				<div class="table">
					<label>自提点交通</label>

					<div>
						<p class="zitiBtnRoute"></p>
					</div>
				</div>
			</div>
			<!--收货地址  end -->


			<!--支付方式 begin-->
			<!--开始-->
			<div style="position: relative; height: auto" id="payMentEdit">
				<h1 class="infoTitle fontC333S14B" id="paymentTarget">支付信息</h1>
				<div class="infoTapDiv payInformation">
					<ul class="infoTap">
						<label class="bgA unChoice" style="left: 0px;"> <span
							class="bgB"></span>
						</label>
						<li class="online payment choice" valueof="01" id="payMent01"
							paytypename="在线支付"><span style="color: white;">在线支付</span></li>
						<li class="unOnline payment unChoice" valueof="02" id="payMent02"
							paytypename="货到付款" style="display: none;"><span
							style="color: black;">货到付款</span></li>


					</ul>
				</div>

				<div id="online">
					<div class="table">
						<label class="tableLeft">支付方式</label>
						<div>
						  <label  class="logistics_company "   style="border: 1px solid #f36f2a">
								<input style="display: none;  "  type="radio"  name="delivery_time" vaule="6">在线支付
								<i  id="i_img_time3"   class="i_img"  style="display:block;" ></i>
						     </label>
							
						</div>
					</div>
				</div>

				<div id="unOnline" style="display: none;">
					<div class="table" style="height: auto">
						<label class="tableLeft">货到付款</label>
						<div style="height: auto">
							<ul class="orderCartCom" id="orderCartComWidth"
								style="height: auto">
								<li class="payWayItem02 cashOnDeliveryModeNew"
									id="payMentMode01" valueof="01">现金支付<i></i>
								</li>
								<li class="payWayItem02 cashOnDeliveryModeNew"
									id="payMentMode02" valueof="02">POS刷卡<i></i>
								</li>
							</ul>
						</div>
					</div>
				</div>



				<div class="infoBox" id="invoice-section">
					<div class="table">
						<label id="invoiceTarget" class="tableLeft">发票信息</label>
						<div>
						  <label  class="logistics_company dd"  >
								<input style="display: none;"  type="radio"  name="invoice" vaule="1">不需要发票
								<i    class="i_img"  style="display: none;" ></i>
						     </label>
							 <label  class="logistics_company dd" >
								<input style="display: none;"  type="radio"  name="invoice" vaule="2">电子发票
								<i    class="i_img"  style="display: none;" ></i>
						</div>
					</div>

					<div class="fp-div" style="display: none;">
						<div class="table">
							<label class="tableLeft"></label>
							<div>
								<p class="font-grey">请填写您的联通手机号码或电子邮箱，用于接收电子发票信息；如需分月发票请在备注中说明。</p>
							</div>
						</div>
						<div class="table sub">
							<div class="input-area">
								<input id="invoiceInfo" onblur="checkInvoiceNumOrEmail();"
									class="leaveMassage w-150" type="text" maxlength="50">
								<div id="invoiceInfoCorrectId" class="correct"
									style="display: none;"></div>
								<div id="invoiceInfoErrorId" class="error"
									style="display: none;">号码至少为11位数字！</div>
							</div>
							<div id="invoiceInfoEdit" class="edit-area"
								style="display: none;">
								<p type="text"></p>
								<a href="javascript:void(0);">【修改】</a>
							</div>
						</div>
						<div class="table sub" id="invoice-sure">
							<label class="tableLeft"></label>
							<div>
								<span class="conInfBtn" id="invoice">确认发票信息</span>
							</div>
						</div>
					</div>
					<div class="table">
						<label class="tableLeft"
							style="margin-top: 2px; margin-bottom: 8px;">留言/备注</label>
						<div style="margin-top: 3px; margin-left: -3px">
							<input style="margin-left: 3px; color: rgb(153, 153, 153);"
								type="text" class="leaveMassage"  placeholder="限100个字，请勿填写支付、收货相关的信息" 
								checkOderMessage();checkOrderInputInfo()" name="price"
								id="oderMessage"> <label
								class="oderMessageError allError" style="display: none;"></label>
						</div>
					</div>
				</div>
			</div>
			<!--支付方式 end-->

			<!-- 商品清单  begin-->
			<!--支付方式 begin-->
			<div class="GoodsDetail">
				<h1 class="infoTitle fontC333S14B">
					商品清单<a href="javascript:" class="spqd fontC36cS12"></a>
				</h1>
				<table class="GoodsDetailTable" border="0" cellpadding="0"
					cellspacing="0">
					<tbody>
						<tr class="GoodsDetailTop">
							<td class="GoodsLiOne">商品名称</td>
							<td class="GoodsLiTwo">商品组成</td>
							<td class="GoodsLiThree">赠品</td>
							<td class="GoodsLiFour">价格</td>
						</tr>
						<tr class="GoodsDetailContent">
							<td class="GoodsLiOne"><img
								src="${pageContext.request.contextPath}/img/20171024172945-1847152144_310_310.jpg" alt=""> <span
								id="jsHeight" style="margin-top: 27px;">【新品上市】畅视50元卡</span></td>
							<td class="GoodsLiTwo">
								<ul>
									<li><label>号码：</label><span>${phonename}</span></li>
									<li><label>套餐：</label><span>畅视50元卡 </span></li>






								</ul>
							</td>

							<td class="GoodsLiThree" id="goodsPrensent"
								style="text-align: center;">无</td>

							<td class="GoodsLiFour">45.00</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- 商品清单  end-->
			<div class="lineColorEdd3be"></div>
			<h1 class="infoTitle fontC333S14B" id="billingTarget">
				结算信息：<a href="javascript:" class="juxx font_36c_12"></a>
			</h1>
			<div class="detailedList">
				<div class="checkoutBox">
					<div class="checkoutLeft">
						<h6 id="voucherH6">
							<span class="open voucherTitle" data-is-loaded="false"></span><label>使用代金券</label>
						</h6>
						<!--使用代金券-->
						<div class="coupon" id="couponList" style="display: none;">
							<table cellpadding="0" cellspacing="0" border="0" width="100%"
								class="tHeader">
								<thead>
									<tr>
										<td class="one" style="width: 178px;">代金券编码</td>
										<td class="two">面值(元)</td>
										<td class="three">所需消费金额(元)</td>
										<td class="four">有效时间</td>
										<td class="five">使用范围</td>
									</tr>
								</thead>
							</table>
							<div class="tBodyList" style="display: none;">
								<table cellpadding="0" cellspacing="0" border="0" width="100%"
									class="">
									<tbody>
										<tr id="noUserVoucherTR" class="bgcoupon">
											<td colspan="6">
												<div class="labelCheckbox">
													<input type="radio" name="custVoucherRadio" detailid=""
														voucherfacefee="0" uservoucherflag="noUseVoucher"
														checked="checked" class="checkBox"><label>本次不使用</label>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
								<div class=" btns">
									<a href="javascript:void(0);"
										title="可能是因为该代金券不能用于您选择的商品或者活动，还有可能价格不满足要求，具体原因请用鼠标在代金券上滑动查看"
										class="noUse" id="voucherNoUseRemind">代金券不可用？</a> <a
										class="addBtn" href="javascript:;" onclick="tipsNumber();">激活新的代金券</a>
								</div>
								<div class="noUseTips">
									<span></span> <b class="arrow"><b class="arrow-one">◆</b><b
										class="arrow-two">◆</b></b>
								</div>
							</div>
							<div class="noContent">
								您还没有代金券，您可以<a href="javascript:;" class="fontC36cS12"
									onclick="tipsNumber()">激活新的代金券</a>
							</div>

						</div>
						<!--使用代金券 end-->

						<h6>
							<span class="open recommendInfo"></span><label>我有推荐人</label>
						</h6>
						<ul style="display: none;" id="recommendList" class="invoice">
							<li><span>推荐人姓名</span> <input type="text" value="请输入推荐人姓名"
								name="recommend" style="color: #999" id="recommend"
								class="inputWidth183px">
								<div class="correct" id="recommendCorrect"
									style="display: none;"></div>
								<div class="error" id="recommendError" style="display: none;">请填写信息</div>
							</li>
							<li><span>推荐人手机</span> <input type="text" maxlength="11"
								onmouseout="checkOrderInputInfo();" value="请输入11位手机号码"
								name="recommendCode" style="color: #999" id="recommendCode"
								class="inputWidth183px">
								<div class="correct" id="recommendCodeCorrect"
									style="display: none;"></div>
								<div class="error" id="recommendCodeError"
									style="display: none;">请填写信息</div></li>
						</ul>

					</div>
					<ul class="checkoutRight">
						<li>商品金额总计：¥<span id="Price" goodsprice="45">45.00</span></li>
						<li>运费：¥<span id="freight">0.00</span></li>
						<li>代金券充抵：¥<span class="couMoneyPay">0.00</span></li>
						<li style="display: none;">可选优惠活动：¥<span class="addActPay">0.00</span></li>
					</ul>
				</div>
				<div class="orderFormMoney">
					<label>您共需支付：<span class="moneyQ">¥<span
							id="billingResult" class="moneyQ">45.00</span></span></label>
				</div>
				</br>
				<input   style="    width: 165px;
    height: 40px;
    border: none;
    background: #f46f2b;
    color: #ffffff;
    display: inline-block;
    border-radius: 4px;
    font-size: 14px;
  
    position: absolute;
    left: 1093px;"    type="submit" value="确认支付">
    
    </br>
			</div>


		<!-- 	激活代金券 begin -->
		<!-- 	<div class="mediumLayer layerBox" id="myNumber"
				style="top: 550px; display: none;">
				<div class="mediumLayerT ie6Png">
					<span style="font-size: 14px">激活代金券</span><label
						class="closeCityLayer"></label>
				</div>
				<div class="mediumLayerM ie6Png">
					<div class="content">
						<p class="defaultP">您可以通过10010网站、新浪微博活动、手机短信等方式获得联通发放的代金券。</p>
						<p class="successP" style="display: none;">恭喜您，激活成功，代金券已经自动绑定到您的账户中，可以在下订单时直接使用。</p>
						<p class="errorP" style="display: none;" id="activateErrPInfo">
							<i></i>对不起，激活失败，您输入的代金券不存在\已经过期，请重新输入。
						</p>
						<div class="numberDl">
							<label>代金券密码：</label> <input type="text" class="inputWidth183px"
								style="width: 150px;">
						</div>
						<div class="numberDl" id="voucherCaptchaId"
							style="position: relative; display: none;">
							<label>验证码：</label> <input id="inputCode" name="inputCode"
								class="inputW64H24 " type="text" size="4" maxlength="4"
								style="ime-mode: disabled;"> <img id="captchaImg"
								name="captchaImg"
								style="border: 1px #000000 solid; cursor: pointer;" width="70"
								height="24" alt="请输入验证码"> <a id="changeVerifyCode"
								name="changeVerifyCode" style="cursor: pointer; cursor: hand;"
								class="fontC36cS12">换一张</a> <input type="hidden"
								name="configKey" value="ZJ2t2ofiM9Ikpv4JE8Dctg=="> 
						 	<script>
								$(function() {
									$('#changeVerifyCode,#captchaImg')
											.die('click')
											.live(
													'click',
													function() {
														var j = new Image();
														j.onload = function() {
															$('#captchaImg')
																	.attr(
																			"src",
																			j.src);
														};
														j.src = "/mall-web/Captcha?configKey=ZJ2t2ofiM9Ikpv4JE8Dctg%3D%3D&timestamp="
																+ new Date()
																		.getTime();
													});

									$('#changeVerifyCode').live(
											'mouseover',
											function() {
												$(this).css("textDecoration",
														"underline");
											}).live('mouseout', function() {
										$(this).css("textDecoration", "none");
									});
								}); 
							</script>
							<div class="verifyError">
								<span class="errorText"> <i class="ie6Png"></i> <span
									id="voucherCapcheErrInfo">验证码错误。</span> <b class="ie6Png"></b>
								</span> <s class="ie6Png"></s>
							</div>
						</div>
						<div class="numberDl">
							<label>&nbsp;</label> <input type="button" class="btnSub"
								id="tipsNumberCon" value="激  活">
						</div>
					</div>
					<div class="successCon" style="display: none;">
						<ul class="successCon-ul">
							<li class="successCon-icon"></li>
							<li class="successCon-text">恭喜您，激活成功，新代金券已经绑定到您的帐户</li>
							<li class="successCon-mval">代金券面值：¥</li>
							<li class="successCon-time">有效期：</li>
						</ul>
						<div class="successCon-btn">
							<input type="button" class="btnSub closeLay" id="" value="关  闭">
							<a href="javascript:;" class="fontC36cS12" onclick="tipsNumber()">继续激活新代金券</a>
						</div>
					</div>
				</div>
				<div class="mediumLayerB ie6Png"></div>
			</div> -->
			<!--激活代金券 end-->
		<!-- 	<div class="orderSubmitNew" style="margin-top: -5px;">
				<p class="submitMassageA">
					<span class="mleft">收货人：</span><span class="mmiddle"></span><span
						class="mright"></span>
				</p>

				<div class="knowBuy">
					请仔细阅读<a href="javascript:void(0);" class="fontC36cS12 know">《购前须知》</a>
				</div>
				<div class="knowBuy" style="margin-top: 10px;" hidden="">
					<a href="javascript:void(0);" class="fontC36cS12 returnedGoods">《退换货政策》</a>
				</div>
				<div class="informationBtn">
					<p id="checkInfoNotice""="">
						温馨提示：请先完整填写并确认 <a id="certPhotoNotice"
							href="http://mall.10010.com/mall-web/g4common/buy#netWorkTarget"
							style="display: none">证件照片</a> <a id="netNotice2"
							href="http://mall.10010.com/mall-web/g4common/buy#netWorkTarget2">入网信息</a>

						<a id="deliverNotice"
							href="http://mall.10010.com/mall-web/g4common/buy#deliverTarget"
							style="">送货信息</a> <a id="paymentNotice"
							href="http://mall.10010.com/mall-web/g4common/buy#paymentTarget"
							style="display: none">支付信息</a> <a id="billingNotice"
							href="http://mall.10010.com/mall-web/g4common/buy#billingTarget"
							style="display: none">结算信息</a> <a id="invoiceNotice"
							href="http://mall.10010.com/mall-web/g4common/buy#invoiceTarget"
							style="display: none;">发票信息</a> 再提交
					</p>
					<input id="orderSubmitNewBtn" type="button" value="阅读入网协议并提交订单"
						disabled="" class="unChecked">

				</div>
				<p class="submitMassageB"
					style="margin-right: 28px; margin-top: 10px">为保障您的权益，请阅读入网协议和购前须知之后提交订单！</p>

			</div>
 -->
		</div>
		<!-- <form id="orderSubmitForm"
			action="http://mall.10010.com/mall-web/OrderSubmit/submitOrder"
			method="post">
			<input type="hidden" name="paramStr" id="paramStr"> <input
				type="hidden" name="inventoryType" id="inventoryType" value="">
			<input type="hidden" name="uploadTokenUuid" id="uploadTokenUuid"
				state="1">
			证件照tokenUuid


			<input type="hidden" name="_m_token"
				value="8f9e2c34-3b5e-4b77-9909-8e34139c60de" id="_m_token">
			<input type="hidden"
				name="ygjUfP4DcMnWARbsoJJ634wq9SGjyt+5SNBRllVbJcLI3jfgATk/SNSh152HiOg3"
				value="kcgtHY90o3cKNjQE48W1qUuX7fmvTrrzywmlmAfQbUhtzIQ3gwDO+5Qj1TiHBK06y4lLH4MRqrEKqgGXo/wd3lOEDDc4r1nxs7qMn8wtuEif8KWDnisDnY83lR/WWc1dfKZU4aWOeOIgLi4tgOd6LA=="
				id="_m_state">
		</form> -->
		<input type="hidden" name="uploadTokenUuidTemp"
			id="uploadTokenUuidTemp" state="1">
		<!--临时证件照tokenUuid-->
		<input type="hidden" name="pageType" id="pageType" value="2">
		<!--页面类型标识-->
		<!--</div>-->
		<!--content end-->
		<!--footer begin-->
		<div class="foodLoad">
			<!--footer-->
			<div class="center980" id="footer">
				<div class="copyright">
					<!-- <div class="flinks" style="margin-bottom: 28px; margin-top: 7px;">
						<a href="http://iservice.10010.com/lt/Copyright_n/index3.html"
							target="_blank">企业法人营业执照</a> | <a
							href="http://iservice.10010.com/lt/Copyright_n/index2.html"
							target="_blank">基础电信业务经营许可证</a> | <a
							href="http://iservice.10010.com/lt/Copyright_n/index.html"
							target="_blank">增值电信业务经营许可证</a> | <a
							href="http://iservice.10010.com/lt/Copyright_n/index4.html"
							target="_blank">网络文化经营许可证</a>
					</div> -->
					Copyright© 1999-2018 &nbsp; &nbsp; 中国联通 &nbsp; 版权所有<br>中华人民共和国增值电信业务经营许可证
					经营许可证编号：A2.B1.B2-20090003
				</div>
			</div>

			<!--footer end-->
		</div>
		<!--footer end-->
		<!-- 购前须知 -->

		<!--校验机主姓名弹窗 end-->


		<!-- <script type="text/javascript" src="js/register/hm(1).js "></script>
		<script type="text/javascript" src="css/register/cl.php"></script>
		<script src="css/register/cl2.php"></script> -->
</body>
</html>