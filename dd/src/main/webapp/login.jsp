<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>登录</title>
<link rel="icon" href="${pageContext.request.contextPath}/img/favicon(1).ico">
<script type="text/javascript" src="${pageContext.request.contextPath}/ js/jquery-3.2.1.min.js"></script>

<!-- <link rel="icon" href="img/favicon(1).ico"
	mce_href="img/favicon(1).ico"
	type="image/x-icon">
<link rel="Shortcut Icon"
	href="img/favicon(1).ico"
	mce_href="img/favicon(1).ico"
	type="image/x-icon"> -->
<link href="${pageContext.request.contextPath}/css/login/saved_resource.css" rel="stylesheet">

</head>
<body onload="checkRelease();">
	<div class="header">
		<div class="middleArea height80">
			<a  class="left logo ie6Png"></a> <span
				class="left header_split ie6Png"></span> <span
				class="left header_content">欢迎登录</span> <a
			target="_blank"
				class="right advice">体验反馈</a>
		</div>
		<div style="width: 820px; margin: auto;">
			<div class="notice" id="notice" style="display: none;"></div>
		</div>
	</div>
	<div class="content " style="background: none repeat scroll 0 0 0;">
		<div class="middleArea clearfix relative" id="loginbox"
			style="z-index: 99;">
			<!--[if IE 6]>
    <iframe scrolling="no" frameborder="0" allowtransparency="true" class="login_iframe" src="${pageContext.request.contextPath}//portal/homeLogin" onload="iframeOnLoad();" style="display: block;"></iframe>
    <![endif]-->
			<iframe src="${pageContext.request.contextPath}/homeLogin.jsp"
				class="login_iframe" frameborder="0" allowtransparency="true"
				scrolling="no" style="display: inline;"></iframe>
			<div id="loginLoading" style="display: none;">
				
			</div>
		</div>
		<ul id="banner_slide">
			<li class="slide"
				style="z-index: 1; position: absolute; left: 0px; top: 0px; opacity: 1;"><div
					class="bannerBox"
					style="position: relative; margin: 0px auto; height: 100%; width: 1100px; z-index: 10;">
					<div class="bannerHotBox">
						<div class="bannerHotspot0 hotspot"></div>
						<div class="bannerHotspot1 hotspot"></div>
						<div class="bannerHotspot2 hotspot"></div>
						<div class="bannerHotspot3 hotspot"></div>
						<div class="bannerHotspot4 hotspot"></div>
					</div>
				</div>
				<div class="bg"
					style="background-image: url(img/login002.jpg);"></div></li>
			<li class="slide"
				style="z-index: 0; position: absolute; left: 0px; top: 0px; opacity: 0;"><div
					class="bannerBox"
					style="position: relative; margin: 0px auto; height: 100%; width: 1100px; z-index: 10;">
					<div class="bannerHotBox">
						<div class="bannerHotspot0 hotspot bannerHotspot"></div>
						<div class="bannerHotspot1 hotspot"></div>
						<div class="bannerHotspot2 hotspot"></div>
						<div class="bannerHotspot3 hotspot"></div>
						<div class="bannerHotspot4 hotspot"></div>
					</div>
				</div>
				<div class="bg"
					style="background-image: url();"></div></li>
		</ul>
	<!-- 	<div style="margin: auto; width: 100px; _margin-top: -30px;">
			<div id="banner_scroll" class="banner_scroll">
				<a href="javascript:void(0);" seed="1"
					class="ban ie6Png scroll_select"></a>
					<a href="javascript:void(0);"
					seed="2" class="ban ie6Png scroll"></a>
			</div>
		</div> -->
	</div>
	<div class="footer">
		<div class="middleArea">
			<span class="footLogo ie6Png"></span>
			<ul class="footerNav">
				<li class="footerFont"><a
					
					target="_blank">企业法人营业执照</a>&nbsp;&nbsp;|&nbsp;&nbsp; <a
					
					target="_blank">基础电信业务经营许可证</a>&nbsp;&nbsp;|&nbsp;&nbsp; <a
					 target="_blank">增值电信业务经营许可证</a>&nbsp;&nbsp;|&nbsp;&nbsp;
					<a 
					target="_blank">网络文化经营许可证</a></li>
				<li class="splitli"><span class="splitline">&nbsp;</span></li>
				<li class="footerFont">Copyright© 1999-2018 中国联通 版权所有 <a
					class="cert ie6Png" title="诚信网站" target="_blank"
					>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
					<a class="seal ie6Png" title="可信网站" target="_blank"
					>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="thickdiv" style="display: none;"></div>

	<!--<script type="text/javascript" src="${pageContext.request.contextPath}/https://image.shop.10010.com/upay/biz/js/payfee/google.js"></script>-->
	<!-- <script type="text/javascript" async="" src="${pageContext.request.contextPath}/js/login/fa.js"></script> -->
	<!-- <script src="${pageContext.request.contextPath}/css/login/saved_resource(1).css" type="text/javascript"></script> -->
	<!-- <script type="text/javascript">
    jQuery(document).ready(
    function($){
    $("img").lazyload({
         placeholder : "https://image.shop.10010.com/portal/images/login/loginLoading.gif", //加载图片前的占位图片
         effect      : "fadeIn" //加载图片使用的效果(淡入)
    });
    });
    </script> -->

	<!--[if IE 6]>
    <script language="javascript" type="text/javascript" src="${pageContext.request.contextPath}/https://image.shop.10010.com/portal/js/ie6_png.js"></script>
    <script language="javascript" type="text/javascript">
    DD_belatedPNG.fix(".ie6Png");
    </script>
    <![endif]-->
	<!-- <script type="text/javascript">
		if (!window._n3fa) {
			var _n3fa = _n3fa || [];
			_n3fa.push([ '_setId', '20ba206244ce4b8282f6a6dc3a13ce6a' ]);
			(function() {
				var fa = document.createElement('script');
				fa.type = 'text/javascript';
				fa.async = true;
				fa.src = ('https:' == document.location.protocol ? 'https://uac.10010.com'
						: 'http://res.mall.10010.com')
						+ '/mall/common/js/fa.js?referer=http://uac.10010.com';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(fa, s);
			})();
		}
	</script> -->

</body>
</html>