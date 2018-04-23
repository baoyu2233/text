<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/ js/jquery-3.2.1.min.js"></script>
 
        <link href="css/login/saved_resource(2).css" rel="stylesheet">
    

</head>
<body class="bodytranparent">
<input type="hidden" id="userType" name="userType" value="01">
<input type="hidden" id="userTypeUnicom" name="userTypeUnicom" value="21">
<input type="hidden" id="pwdType" name="pwdType" value="02">
<input type="hidden" id="loginFrom" name="loginFrom" value="01">
<input type="hidden" id="loginType" name="loginType" value="4">
<input type="hidden" id="isRegister" name="isRegister" value="0">
<input type="hidden" id="isQuick" name="isQuick" value="1">
<input type="hidden" id="toUrl" name="toUrl">
<input type="hidden" id="isRandom" name="isRandom" value="0">
<input type="hidden" id="areaCode" name="areaCode" value="">
<input type="hidden" id="isThirdLogin" name="isThirdLogin" value="0">
<input type="hidden" name="arrcityWord" id="arrcityWord" value="">
<input type="hidden" name="loginUserName" id="loginUserName" value="">
<input type="hidden" name="loginUserType" id="loginUserType" value="">
<input type="hidden" name="loginVerifyState" id="loginVerifyState" value="">
<input type="hidden" name="loginNickname" id="loginNickname" value="">
<input type="hidden" name="userInfo" id="userInfo" value="">
<input type="hidden" name="security" id="security" value="">
<input type="hidden" name="pwdManagment" id="pwdManagment" value="">
<input type="hidden" name="bind" id="bind" value="">
<input type="hidden" name="loginAreaCode" id="loginAreaCode" value="110">
<input type="hidden" name="isTransparent" id="isTransparent" value="(none)">
<div class="margin10 clearfix p_inline">
    <div class="areaBg" style="height:362px;"></div>
    <div class="mpLogin clearfix ie6Png bgdLogin" style="display:block;">
      <div class="boxTop">
        <span class="error left mt35mf32" style="display: none;"><i></i>请输入登录密码</span>
        <span class="tips left mtmf" style="display: block;">登&nbsp;&nbsp;录</span>
        
        <em class="switchLogin right gofl" title="二维码扫码登录"></em>
        
      </div>
      <dl class="clearfix boxOne mlr20 boxStyle">
        <dt class="left dtStyle icon01 ie6Png"></dt>
        <dd class="left ddStyle ">
          
          <input class="iptStyle width256 username"  title="请输入手机号码、邮箱、无区号的固话或宽带" type="text" id="userName" name="userName" maxlength="50" autocomplete="off" style="" tabindex="1">
          
          <span class="sl-delect" style="display: none;"></span>
        </dd>
      </dl>
      <div class="interval">
      </div>
      <div class="registermailauto mailauto" style="display: none;" id="mailauto">
      </div>
      
       <!--      <div class="typeCity mlr20 clearfix" id="areaDiv" style="display:none;">
        <div class="left mr16 typeBox">
          <div class="typeText width140 boxStyle cursor" title="请选择固网类型"><label class="cursor" style="color: rgb(51, 51, 51); font-weight: bold;">固话</label><em class="arrow ie6Png"></em></div>
        </div>
        <div class="right width140 boxStyle selRegion">
          <input class="iptStyle width126 ml2" value="地市（中文/拼音）" data-value="地市（中文/拼音）" type="text" id="arrcity" name="arrcity" maxlength="20" tabindex="3" autocomplete="off">
        </div>
      </div> -->
    <!--   <div class="interval" id="areaInterval" style="display:none;"></div>
      <div class="selectType" id="selectType" style="display:none;">
        <ul class="width140 selType boxStyle zindex999">
          <li class="cursor" value="2"><label class="cursor">固话</label></li>
          <li class="cursor" value="8"><label class="cursor">小灵通</label></li>
          <li class="cursor" value="3"><label class="cursor">宽带</label></li>
          <li class="cursor" value="3"><label class="cursor">宽带ADSL</label></li>
          <li class="cursor" value="4"><label class="cursor">宽带LAN</label></li>
       </ul>
      </div> -->
    <!--   <div class="hotcity" id="hotCity" style="display:none;">
        <div class="hotcity-hotel" id="hotcity-hotel"><strong>热门城市</strong><label class="htc_tips">（更多城市可直接输入搜索）</label><span class="close-ico"><i>X</i></span></div>
        <div class="b_hct_lst" style="display: block;">
          <dl class="e_hct_lst">
            <dt></dt>
            <dd>
              <ul>
                <li><a href="javascript:void(0);" class="js-hotcitylist">北京</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">天津</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">哈尔滨</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">上海</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">沈阳</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">石家庄</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">重庆</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">郑州</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">广州</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">大连</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">青岛</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">深圳</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">武汉</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">成都</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">济南</a></li>
                <li><a href="javascript:void(0);" class="js-hotcitylist">南京</a></li>
              </ul>
            </dd>
          </dl>
        </div>
      </div> -->
      <div class="suggestcity" id="suggestCity" style="display: none;"></div>

      
      <dl class="clearfix boxOne mlr20 showPlaceholder boxStyle" id="userPwdDiv">
        <dt class="left dtStyle icon02 ie6Png"></dt>
        <dd class="left ddStyle">
          <input class="iptStyle width256 password" autocomplete="off" data-value="服务密码" title="请输入密码" type="password" id="userPwd" name="userPwd" maxlength="16" tabindex="2" style="">
          <!-- <label id="pwdPlaceholder" class="placeholder placeholdermargintoprandom" for="userPwd" title="请输入密码"></label> -->
          <!--   <span class="randomSpan randomfont ie6Png" id="randomCode" style="display: block;">获取随机码</span> -->
        </dd>
      </dl>
      <div class="interval">
        
        <!--<a href="javascript:void(0);" class="resendRndCode right" id="resendTips" style="display:none;" tabindex="-1">重新获取</a>-->
        
      </div>
      <dl class="clearfix boxOne mlr20 boxStyle showPlaceholder" id="userCKDiv" style="color: black;display: none;">
        <dt class="left dtStyle icon02 ie6Png"></dt>
        <dd class="left ddStyle">
          <input class="iptStyle width256 password" autocomplete="off" data-value="" value="" title="请输入密码" type="password" id="userCK" name="userCK" maxlength="6" tabindex="2" style="">
          <label id="CKPlaceholder" class="placeholder placeholdermargintoprandom" for="userCK" title="请输入密码"></label>
         <!--  <span class="randomSpan ie6Png countdown" id="randomCKCode" style="display: block;">获取短信验证码</span> -->
        </dd>
      </dl>
      <div class="interval" id="userCKPwd" style="display: none;"></div>
      <div class="clearfix vCodeBox" id="verifyDiv" style="display: none;">
        <dl class="clearfix boxTwo boxStyle left">
          <dt class="left dtStyle icon03 ie6Png"></dt>
          <dd class="left ddStyle"><input class="iptStyle width138 checkNum" data-value="验证码" value="验证码" title="请输入验证码" maxlength="4" type="text" id="verifyCode" name="verifyCode" style="ime-mode: disabled" autocomplete="off" tabindex="4"></dd>
        </dl>
        <em class="right vCode cursor">
  </em>
      </div>
      <div class="interval" id="interval1Div">
          
          <a href="http://iservice.10010.com/e4/query/others/mobile_munber_band-iframe.html?menuCode=000600200021" class="forgotPassword right" id="forgotUsernumber" target="_blank" tabindex="-1" style="display: none;">&nbsp;&nbsp;忘记账号？</a>
          
          <!--<a href="javascript:void(0);" class="forgotPassword left" id="freeRegist" target="_blank"-->
             <!--tabindex="-1">&nbsp;&nbsp;免费注册</a>-->
          

          <a href="javascript:void(0);" class="forgotPassword right" id="forgotPwd" target="_blank" tabindex="-1">忘记密码？</a>
      </div>
      <div class="interval40">
        <input class="loginBtn ie6Png" type="button" id="login1" name="login1" tabindex="5">
      </div>
      
      <div class="interval"></div>
      <div class="entries mlr20" id="thirdlogin1Div">
        <span >使用第三方账号登录</span>
        <p>
          <a href="javascript:void(0);" class="sina">新浪微博</a>
          <a href="javascript:void(0);" class="tencentweibo">腾讯微博</a>
          <a href="javascript:void(0);" class="alipay">支付宝</a>
           <a href="QQlogin.jsp" class="qq">QQ</a>
        </p>
       
      </div>
      
        
        <a href="javascript:void(0);" class="randomCodeLogin ie6Png" style="top: 216px; display: none;"></a>
        <a href="javascript:void(0);" class="serviceCodeLogin ie6Png" style="top:216px;"></a>
        
    </div>
    
    <div class="fixedLineLogin clearfix ie6Png" style="display:none;">
    <div class="boxTop">
        <span class="error left mt35mf32" style="display: none;"><i></i>请输入登录密码</span>
        <span class="tips left mtmf" style="display: block;">手机扫码 快速登录</span>
        
        <em class="switchLogin right gomp" title="用手机邮箱固网登录"></em>
        
    </div>
    <div style="font-size:15px; color:#ff6600; height:20px;">
        <span id="msg_qr" style="margin-left:50px;"></span>
    </div>
    
    <div id="div_qrcodearea" style="border:1px solid #e1e1e1; margin-left:94px; margin-top:20px; width:150px; height:150px;">
    
        <img id="qrimg" src="${pageContext.request.contextPath}/css/login/genqr.css" alt="here is qrcode show area." height="150px" width="150px">
        <span id="qrlogo" class="qr_logo"></span>
        <div class="qttt" style="display: none;"><div class="qtt-h"></div></div>
    </div>

    <div class="interval"></div>
    <div class="entries mlr20" style="text-align:center;">
        <p class="thirdlogin">
            <a href="index.jsp" target="_blank" style="font-size:15px; color:#ff6600;"><b>请使用手机营业厅客户端扫码</b></a><br>
            <!--<a href="javascript:void(0);">使用帮助</a>|
            <a href="javascript:void(0);">下载客户端</a>-->
            <a href="index.jsp" target="_blank" style="font-size:13px; line-height:35px;">没有客户端？立即下载</a>
        </p>
    </div>

    

</div>

    
    
    <div class="mpLogin" id="broadmpLogin" style="display:none;">
      <div class="broadTop"></div>
      <div class="broad_womei"></div>
      <div class="interval"></div>
      <div class="bind_tip">
        <p style="width: 100%;height: 20px;display: block;line-height: 20px;text-align: center;">尊敬的用户，为了便于账号管理</p>
        <p style="width: 100%;height: 20px;display: block;line-height: 20px;text-align: center;">我们建议您绑定邮箱账号，用邮箱账号进行登录</p>
      </div>
      <div class="interval"></div>
      <div class="broadFoot">
        <em class="left Bcode send-msg"><span id="bind_liji" class="send-msg">立即绑定</span></em>
        <em class="right Bcode send-msg"><span id="bind_zanshi" class="send-msg">暂不绑定</span></em>
        <em class="right Acode"><span id="bind_no" class="">不再提示</span></em>
      </div>
    </div>
    <div class="miliCheck clearfix ie6Png" style="display:none;">
      <div class="boxTop">
        <span class="error left mt35mf32" style="display: none;"><i></i>请输入登录密码</span>
        <span class="tips left mtmf" style="display: block;">登&nbsp;&nbsp;录</span>
      </div>
      <div class="interval">
        <p class="militips">根据您的设置，登录前需要进行验证手机密令。</p>
      </div>
      <div class="interval"></div>
      <dl class="clearfix boxOne mlr20 boxStyle">
        <dt class="left dtStyle icon01 ie6Png"></dt>
        <dd class="left ddStyle width230">
          <input class="iptStyle width220 password" data-value="请输入手机密令" value="请输入手机密令" title="请输入手机密令" type="text" id="tokenPwd" name="tokenPwd" maxlength="6">
        </dd>
      </dl>
      <div class="interval">
        <a href="javascript:void(0);" class="lostmili right" id="lostMili">密令遗失？</a>
      </div>
      <div class="interval" id="interval1Div"></div>
      <div class="interval40">
        <input class="milicfmBtn ie6Png" type="button" id="miliConfirm" name="miliConfirm">
      </div>
    </div>
    <div class="loginAl clearfix ie6Png" style="display:none;">
      <div class="boxTop">
        <span class="error left mt35mf32" style="display: none;"><i></i>请输入登录密码</span>
        <span class="tips left mtmf" style="display: block;">欢迎使用中国联通</span>
      </div>
      <div class="interval" style="height:11px;">
        <span class="splitline">&nbsp;</span>
      </div>
      <div class="titlediv">
        <span class="logintitle">您当前使用的联通账号是：</span>
      </div>
      <div class="contentdiv">
        <span class="currentLoginUser"></span>
        <span class="switchuser"><a href="javascript:void(0);">切换账号</a></span>
      </div>
      <div class="interval"></div>
      
      <div class="interval40">
        <input class="loginallbtn ie6Png" type="button" id="login3" name="login3">
      </div>
      <div class="interval"></div>
      <div class="quickway">
        <div class="qw">
          <div class="title">
            <div class="title_bg"></div>
            <div class="title_content"><span>我的联通</span></div>
          </div>
          <div class="content">
            <dl class="qw_lst">
              <dt></dt>
              <dd><ul>
                
                <li><a class="user_order ie6Png"></a></li>
                <li><a class="user_addr ie6Png"></a></li>
                <li><a class="user_contact ie6Png"></a></li>
                
                
                <li><a class="user_voucher ie6Png"></a></li>
                
              </ul></dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
</div>

	<!-- <script src="${pageContext.request.contextPath}/css/login/saved_resource(3).css" type="text/javascript" charset="UTF-8"></script> -->
	<!--[if IE 6]>
	<script language="javascript" type="text/javascript" src="${pageContext.request.contextPath}/https://image.shop.10010.com/portal/js/login/ie6_png.js"></script>
	<script language="javascript" type="text/javascript">
	DD_belatedPNG.fix(".ie6Png");
	</script>
	<![endif]-->


</body></html>