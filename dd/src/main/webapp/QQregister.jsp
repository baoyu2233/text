<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<title>QQ注册</title>
<link rel="icon" href="${pageContext.request.contextPath}/img/1.ico"
	type="image/x-icon">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/register/index-26a9f2339d.css">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript"  src="${pageContext.request.contextPath}/js/register/register.js"></script>
</head>
<body
	data-bind="style:{overflow: is_up_sms() || is_verify() ? &#39;hidden&#39; : &#39;&#39;}"
	style="display: block; opacity: 1;">
	<!-- <a class="logo" href="javascript:void(0)" data-bind="click: home">QQ</a>
	<div class="side" data-bind="style:{backgroundImage:currentSideUrl()}"
		style="background-image: url(&quot;//4.url.cn/zc/v3/img/01-1.jpg&quot;);"></div> -->
		
		
			<script type="text/javascript">
			$(function(){
				$("#international_1").mouseenter(function(){
					$("#international_2").css({"display":"block"})
					$("#international_img_1").css({"display":"none"})
					$("#international_img_2").css({"display":"block"})
				})
				$("#international_1").mouseleave(function(){
					$("#international_2").css({"display":"none"})
					$("#international_img_2").css({"display":"none"})
					$("#international_img_1").css({"display":"block"})
				})
			})
			
			</script>
		<div class="side" style="background-image: url(${pageContext.request.contextPath}/img/1.jpg);"  height: 100%; width: 23.5%;  ></div>
<a class="logo" href="${pageContext.request.contextPath}/img/1.png" data-bind="click: home">QQ</a>
	<div class="top">
		<div class="item feedback">
			<a data-bind="click: feedback" href="javascript:void(0)">意见反馈</a>
		</div>
		<div class="item language-entry"
			data-bind="event:{mouseenter:openLang,mouseleave:closeLang}">
			
		
			
			<div id="international_1">
				简体中文&nbsp;<img  class="international_img"  id="international_img_1" src="//4.url.cn/zc/v3/img/down.png"
					data-bind="visible: !langOpened()">
					<img  class="international_img"  id="international_img_2"  src="//4.url.cn/zc/v3/img/up.png"  data-bind="visible: !langOpened()"
					style="display: none;">
			</div>
			
			<ul  id="international_2"     style="display: none;">
			
				<li><a data-bind="click:function(){$root.switchLanguage(1033)}"
					href="javascript:void(0)">English</a></li>
			</ul>
		</div>
		<div class="item mail-entry"
			data-bind="visible: !(isMail() || isQQMail() || isLianghao())">
			<a data-bind="click: toMail" href="javascript:void(0)">邮箱帐号</a>
		</div>
		<div class="item qq-entry"
			data-bind="visible: isMail() || isQQMail() || isLianghao()"
			style="display: none;">
			<a data-bind="click: toQQ" href="javascript:void(0)">QQ帐号</a>
		</div>
		<div class="item lianghao"
			data-bind="visible: isChs(), hasHover: lianghaoEntryHovered">
			<a class="lianghao-entry"
				href="https://haoma.qq.com/shop.html#from=zc"
				onclick="monitor(2759877)" target="_blank"><div>QQ靓号</div>
				<img src="${pageContext.request.contextPath}/img/3.png"
				srcset="//4.url.cn/zc/v3/img/logo3@2x.png 2x"></a>
			<div class="lianghao-detail"
				data-bind="hasHover: lianghaoDetailHovered, visible: isChs() &amp;&amp; lianghaoOpened()"
				style="display: none;">
				<div class="upper">
					<a href="javascript:void(0)" class="search-icon"
						data-bind="click:searchLianghao"><div class="search-icon-img"></div></a>
					<div class="search">
						<label class="search-placeholder"
							data-bind="visible: lianghaoKey().length === 0"
							for="lianghao-key">搜索QQ靓号，如“1992”,“520”</label><input type="text"
							id="lianghao-key"
							data-bind="value: lianghaoKey, valueUpdate: &#39;afterkeydown&#39;, event: { keypress: typeLianghao }, hasFocus: lianghaoFocus">
					</div>
				</div>
				<div class="bottom">
					<div class="suggest-detail">
						<a target="_blank" onclick="monitor(2759878)"
							href="http://haoma.qq.com/shop.html#topic=date&amp;from=zc">生日</a>
						<a target="_blank" onclick="monitor(2759879)"
							href="http://haoma.qq.com/shop.html#topic=date&amp;from=zc">星座</a>
						<a target="_blank" onclick="monitor(2759881)"
							href="http://haoma.qq.com/shop.html#topic=love&amp;from=zc">爱情</a>
						<a target="_blank" onclick="monitor(2759880)"
							href="http://haoma.qq.com/shop.html#topic=phone&amp;from=zc">手机</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="main-wraper">
		<div class="upgrade-tips" style="display: none">
			浏览器版本太低，为保障信息的安全和展现，建议<a
				href="https://dldir1.qq.com/invc/tt/QQBrowser_Setup_qqzc.exe"
				target="_blank">升级浏览器</a>
		</div>
		<div class="main"
			data-bind="style:{height: is_up_sms() || is_verify() ? &#39;100%&#39; : &#39;&#39;}">
			<div class="form" autocomplete="off"
				data-bind="visible: !error() &amp;&amp; !succ()">
				<div data-bind="visible: isQQ()">
					<div class="welcome">欢迎注册QQ</div>
					<div class="header free-lianghao-entry"
						data-bind="visible: isChs()">
						<a href="javascript:void(0)" data-bind="click: toLianghao">免费靓号</a>
					</div>
					<div class="header">每一天，乐在沟通。</div>
				</div>
				<div data-bind="visible: isQQMail()" style="display: none;">
					<div class="welcome">QQ邮箱注册</div>
					<div class="header">个性化QQ邮箱名称</div>
				</div>
				<div data-bind="visible: isMail()" style="display: none;">
					<div class="welcome">邮箱帐号注册QQ</div>
					<div class="header qq-mail-entry">
						&nbsp;<a href="javascript:void(0)" data-bind="click: toQQMail">创建QQ邮箱</a>
					</div>
					<div class="header">邮箱登录，便于记忆</div>
				</div>
				<div data-bind="visible: isLianghao()" style="display: none;">
					<div class="welcome">QQ免费靓号</div>
					<div class="guide">
						<p class="guide-title">注册指引：</p>
						<p class="guide-item">
							1.注册完成后，<a
								href="http://im.qq.com/mobileqq/index.shtml?adtag=zclhhd8"
								target="_blank">登录QQ手机版，完成激活</a>
						</p>
						<p class="guide-item">2.一周内未激活帐号，系统将自动回收</p>
					</div>
					<div class="lianghao-area">
						精品靓号&nbsp;&nbsp;<span class="lianghao-number"
							data-bind="html: lianghao_html"></span>&nbsp;&nbsp;<span
							data-bind="text: lianghao_mean" class="lianghao-mean"></span> <a
							href="javascript:void(0)" data-bind="click: changeLianghao"
							class="change-lianghao">换一个</a>
					</div>
				</div>
				<form data-bind="submit: submit" autocomplete="off">
					<div class="mail-area" data-bind="visible: isMail()"
						style="display: none;">
						<div class="input-area">
							<div class="input-flags">
								<div class="input-ok" data-bind="visible: mailStatus() === 1"
									style="display: none;"></div>
							</div>
							<label class="input-placeholder" id="mail-tips" for="mail"
								data-bind="visible: mail().length == 0">邮箱</label>
							<div class="input-outer">
								<input autocomplete="off" type="text" id="mail" class="mail"
									data-bind="textInput: mail, event: {blur: checkMail,focus:onMailFocus}, css:{error: typeof mailStatus() == &#39;string&#39;}"
									tabindex="1">
							</div>
						</div>
						<div class="error-tips-wrap slideup"
							data-bind="css:{slideup:mailTips().length === 0}">
							<div class="error-tips"
								data-bind="text: mailTips, visible: mailTips().length"
								style="display: none;"></div>
						</div>
						<div class="input-tips-wrap"
							data-bind="css:{slideup: mailTips().length &gt; 0}">
							<div class="input-tips">请输入你常用的邮箱（非qq/foxmail邮箱）</div>
						</div>
					</div>
					<div class="qqmail-area input-area" data-bind="visible: isQQMail()"
						style="display: none;">
						<div class="input-outer qqmail-outer"
							data-bind="click: beginSelectMail">
							<div href="javascript:void(0)" class="qqmail" id="qqmail"
								data-bind="text: qqmail, visible: isQQMail()"
								style="display: none;">@qq.com</div>
							<div class="selector"
								data-bind="click:toggleSelectMail, clickBubble: false">
								<img src="${pageContext.request.contextPath}/img/down.png"
									data-bind="visible: !isSelectingMail()"><img
									src="${pageContext.request.contextPath}/img/up.png"
									data-bind="visible: isSelectingMail()" style="display: none;">
							</div>
							<ul class="options qqmail-list"
								data-bind="foreach: mail_list, visible: isSelectingMail"
								style="display: none;">
								<li
									data-bind="click:function(){$root.setMail($data)}, clickBubble: false"><a
									href="javascript:void(0)" data-bind="text:$data">@foxmail.com</a></li>
								<li
									data-bind="click:function(){$root.setMail($data)}, clickBubble: false"><a
									href="javascript:void(0)" data-bind="text:$data">@qq.com</a></li>
							</ul>
						</div>
						<div class="input-area mail-area">
							<div class="input-flags">
								<div class="input-ok" data-bind="visible: mailStatus() === 1"
									style="display: none;"></div>
							</div>
							<label class="input-placeholder" id="mail-name-tips"
								for="mail-name" data-bind="visible: mail().length == 0">邮箱</label>
							<div class="input-outer">
								<input autocomplete="off" type="text" id="mail-name"
									class="mail"
									data-bind="textInput: mail, event: {blur: checkMail,focus:onMailFocus}, css:{error: typeof mailStatus() == &#39;string&#39;}"
									tabindex="2">
							</div>
						</div>
						<div class="error-tips-wrap slideup"
							data-bind="css:{slideup:mailTips().length === 0}">
							<div class="error-tips"
								data-bind="text: mailTips, visible: mailTips().length"
								style="display: none;"></div>
						</div>
						<div class="input-tips-wrap"
							data-bind="css:{slideup: mailTips().length &gt; 0}">
							<div class="input-tips">请创建邮箱名，由3-18个英文、数字、点、减号、下划线组成</div>
						</div>
					</div>
					<div class="input-area">
						<div class="input-flags">
							<div class="input-ok" data-bind="visible: nicknameStatus() === 1"
								style="display: none;"></div>
						</div>
						<label class="input-placeholder" id="nickname-tips" for="nickname"
							data-bind="visible: nickname().length == 0"></label>
						<div class="input-outer">
						
						
						
							<input autocomplete="off" type="text" id="nickname"
								class="nickname" maxlength="24"  title="QQ号码"  placeholder="QQ号码"
								data-bind="textInput: nickname, event: {blur:checkDirtyNickname,focus:onNicknameFocus}, css:{error: typeof nicknameStatus() == &#39;string&#39;}"
								tabindex="3">
						</div>
						<div class="error-tips-wrap slideup"
							data-bind="css:{slideup:nicknameTips().length === 0}">
							<div class="error-tips"
								data-bind="text: nicknameTips, visible: nicknameTips().length"
								style="display: none;"></div>
						</div>
					</div>
					<div class="input-area">
						<label class="input-placeholder" id="password-tips" for="password"
							data-bind="visible: password().length == 0"></label>
						<div class="input-flags">
							<div class="input-ok" data-bind="visible:passwordStatus() === 1"
								style="display: none;"></div>
							<div href="javascript:void(0)" class="eye close"
								data-bind="event:{mousedown:function(){$root.show_password(true)},mouseup:function(){$root.show_password(false)},mouseleave:function(){$root.show_password(false)}},visible:password().length &gt; 0,css:{close:!show_password()}"
								title="长按显示密码" style="display: none;"></div>
						</div>
						<div class="input-outer">
							<div class="password-raw"
								data-bind="text: password, visible: show_password()"
								style="display: none;"></div>
								
								
								
							<input autocomplete="off" type="password" id="password"
								class="password" maxlength="16"  title="密码"  placeholder="密码"
								data-bind="textInput: password, event: {blur:checkPassword,focus:onPasswordFocus}, css:{error:typeof passwordStatus() === &#39;string&#39;}, hasFocus:passwordFocus"
								tabindex="4">
						</div>
						<div class="password-tips-group slideup"
							data-bind="css:{slideup:!passwordFocus()}">
							<div class="password-tips ok"
								data-bind="css:{ok:!passwordHasBlank()}">不能包括空格</div>
							<div class="password-tips"
								data-bind="css:{ok:!passwordBadLength()}">长度为8-16个字符</div>
							<div class="password-tips" data-bind="css:{ok:!passwordSimple()}">必须包含字母、数字、符号中至少2种</div>
						</div>
						<div class="error-tips-wrap slideup"
							data-bind="css:{slideup:passwordTips().length === 0}">
							<div class="error-tips"
								data-bind="text: passwordTips, visible: passwordTips().length"
								style="display: none;"></div>
						</div>
					</div>
					</br>
					<div style="position: relative">
						<div class="input-area phone-area">
							<div class="input-flags">
								<div class="input-ok" data-bind="visible: phoneStatus() === 1"
									style="display: none;"></div>
							</div>
							<label class="input-placeholder" id="phone-tips" for="phone"
								data-bind="visible: phone().length == 0"></label>
							<div class="input-outer">
								<input autocomplete="off" id="phone" type="text" class="phone"  title="手机号码"  placeholder="手机号码"
									data-bind="value: phone, valueUpdate: &#39;afterkeydown&#39;, event:{blur:checkPhone,focus:onPhoneFocus}, validateValue: phone, css:{error:typeof phoneStatus() === &#39;string&#39;}, hasFocus:phoneFocus"
									tabindex="5">
							</div>
						</div>
						<!-- <div class="input-area nation-area">
							<div class="input-outer">
								<input autocomplete="off" type="text" class="nation"
									data-bind="event:{focus:beginSelectCountry}, textInput: country">
								<div class="selector"
									data-bind="click:togglerCountry, clickBubble: false">
									<img src="./QQ注册_files/down.png"
										data-bind="visible: !isSelectingCountry()"><img
										src="./QQ注册_files/up.png"
										data-bind="visible: isSelectingCountry()"
										style="display: none;">
								</div>
							</div>
						</div> -->

					</div>
					<div class="error-tips-wrap slideup"
						data-bind="css:{slideup: phoneTips().length === 0}">
						<div class="error-tips"
							data-bind="text: phoneTips, visible: phoneTips().length"
							style="margin: 0px; display: none;"></div>
					</div>
					<div class="input-tips-wrap"
						data-bind="css:{slideup: phoneTips().length &gt; 0}">
						<div class="input-tips" data-bind="">可通过该手机号找回密码</div>
					</div>
					<div
						data-bind="visible: phoneStatus() !== 0 || phoneFocus() || sendSMSHover()"
						style="display: none;">
						<a href="javascript:void(0)" id="send-sms" class="send-sms"
							data-bind="text: send_sms, click: sendSMS, css: {disabled: send_sms() != str().send_sms || typeof phoneStatus() === &#39;string&#39;}, hasHover: sendSMSHover"
							tabindex="6">发送短信验证码</a>
						<div class="input-area code-area">
							<label class="input-placeholder" id="code-tips" for="code"
								data-bind="visible: code().length == 0">短信验证码</label>
							<div class="input-outer">
								<input autocomplete="off" id="code" type="text" class="code"
									data-bind="textInput: code,event:{focus:clearCode}"
									tabindex="7">
							</div>
						</div>
						<div class="error-tips-wrap slideup"
							data-bind="css:{slideup:codeTips().length === 0}">
							<div class="error-tips"
								data-bind="text: codeTips, visible: codeTips().length"
								style="display: none;"></div>
						</div>
					</div>
					<div>
						<input id="get_acc" type="submit" class="submit" value="立即注册"
							tabindex="8">
						<div class="error-tips-wrap slideup"
							data-bind="css:{slideup:getNumTips().length === 0}">
							<div class="error-tips"
								data-bind="text: getNumTips, visible: getNumTips().length"
								style="display: none;"></div>
						</div>
					</div>
					<div class="agreement">
						<input type="checkbox" name="qzone" id="qzone"
							data-bind="checked: qzone"><label for="qzone"
							class="checkbox"><img
							src="${pageContext.request.contextPath}/img/checkbox_check.png"
							data-bind="visible: qzone()"
							srcset="//4.url.cn/zc/v3/img/checkbox_check@2x.png 2x">
							<img
							src="${pageContext.request.contextPath}/img/checkbox_normal.png"
							srcset="//4.url.cn/zc/v3/img/checkbox_normal@2x.png 2x"
							data-bind="visible: !qzone()"
							 style="display:none;"/>
							&nbsp;同时开通QQ空间</label>
							<br>
						<input type="checkbox" name="agree" id="agree"
							data-bind="checked: agree"><label for="agree"
							class="checkbox"><img
							src="${pageContext.request.contextPath}/img/checkbox_check.png"
							srcset="//4.url.cn/zc/v3/img/checkbox_check@2x.png 2x"
							data-bind="visible: agree()"><img
							src="${pageContext.request.contextPath}/img/checkbox_normal.png"
							srcset="//4.url.cn/zc/v3/img/checkbox_normal@2x.png 2x"
							data-bind="visible: !agree()" style="display: none;">&nbsp;我已阅读并同意相关服务条款和隐私政策</label>&nbsp;
						<img src="${pageContext.request.contextPath}/img/up.png"
							data-bind="click: switchAgreement, visible: agreementOpened()"
							style="display: none;"> <img
							src="${pageContext.request.contextPath}/img/down.png"
							data-bind="click: switchAgreement, visible: !agreementOpened()">
						<div class="agreement-list"
							data-bind="style:{visibility:agreementOpened()?&#39;visible&#39;:&#39;hidden&#39;,opacity:agreementOpened()?&#39;1&#39;:&#39;0&#39;}"
							style="visibility: hidden; opacity: 0;">
							<a href="https://ssl.zc.qq.com/chs/agreement1_chs.html"
								target="_blank">《QQ号码规则》</a> <a
								href="http://www.qq.com/privacy.htm" target="_blank">《隐私政策》</a>
							<a href="http://qzone.qq.com/web/tk.html"
								data-bind="style: {visibility: qzone()&amp;&amp;agreementOpened()?&#39;visible&#39;:&#39;hidden&#39;}"
								target="_blank" style="visibility: hidden;">《QQ空间服务协议》</a>
						</div>
					</div>
				</form>
			</div>
			<div class="lianghao-rule"
				data-bind="visible: !error() &amp;&amp; !succ() &amp;&amp; isLianghao()"
				style="display: none;">
				<p class="rule-title">活动规则</p>
				<p class="rule">
					1. 激活规则：获取的“靓号”，登录<a target="_blank" class="color-link"
						href="http://im.qq.com/mobileqq/index.shtml?adtag=zclhhdgz">QQ手机版</a>（ios或安卓平台）即可自动激活，激活后方可使用其他产品。
				</p>
				<p class="rule">2. 回收规则：</p>
				<p class="rule">（1）免费注册获取的“靓号”，需在一周内完成激活，否则系统将自动回收。</p>
				<p class="rule">（2）获取的“靓号”遵循现有的QQ帐号回收规则。</p>
				<p class="rule">3. 手机短信验证：</p>
				<p class="rule">（1）为防止恶意注册，注册过程需验证手机号码，且1个手机号码仅支持注册1个靓号。</p>
				<p class="rule">（2）手机号码仅做身份验证，与注册的“靓号”不存在捆绑关系，且不用于其他功能。</p>
				<p class="rule">4. 每天活动参与人数上限：1,000,000</p>
				<p class="rule">
					注：本次活动申请的精品靓号为免费使用，不同于QQ会员付费靓号，故不享受QQ会员靓号的相关特性。<a
						href="http://kf.qq.com/faq/141017uiEVRB1410202Ij2Ir.html"
						target="_blank">更多常见问题</a>。
				</p>
			</div>

			<div class="error" data-bind="visible: error()"
				style="display: none;">
				<div class="error-logo"></div>
				<div class="error-msg" data-bind="text: errorMsg">很抱歉，服务器繁忙，请稍后重试。</div>
				<div class="error-link">
					<a href="javascript:void(0)" data-bind="click:errorReturn">返回</a>|<a
						href="javascript:void(0)" data-bind="click: feedback">意见反馈</a>
				</div>
			</div>
			<div class="footer">
				Copyright <span>©</span> 1998-
				<script>
					document.write((new Date).getFullYear())
				</script>
				2018Tencent All Rights Reserved
			</div>
			<div class="sms-up-dialog" style="display: none"
				data-bind="visible: is_up_sms()">
				<div class="close"
					data-bind="click:function(){$root.is_up_sms(false)}"></div>
				<div class="please">请发送短信帮助我们确认你的身份</div>
				<div>
					<span class="verb">编辑短信：</span> <span class="target">1</span>
				</div>
				<div>
					<span class="verb">发送至：</span> <span
						data-bind="text: up_sms_port_string" class="target">1069
						8888 1700 511</span> <span class="error-msg"
						data-bind="visible: up_port_updated()" style="display: none;">(接收号码已更新)</span>
				</div>
				<div class="price">除运营商收取的标准短信费用外，无额外费用。</div>
				<button data-bind="click: submit" class="submit" id="has_up_sms">我已发送短信，下一步</button>
				<div class="error-msg" data-bind="visible: up_error_msg().length">
					<span data-bind="text: up_error_msg">短信验证失败，请重新发送短信验证</span> <span
						data-bind="visible: up_error_count() &gt; 2"
						style="display: none;">或<a
						href="https://ssl.zc.qq.com/v3/index-chs.html?type=0#"
						onclick="app.switchUpPort()">更换接收号码</a></span>
				</div>
			</div>
			<div class="verify-dialog" id="verify-dialog" style="display: none"
				data-bind="visible: is_verify()">
				<div class="close"
					data-bind="click:closeVerify(), visible: can_close_verify()"></div>
				<div id="verify-content"></div>
			</div>
		</div>
	</div>
	<!-- <div class="sms-up-background" style="display:none"
		data-bind="visible: is_up_sms() || is_verify()"></div>
	<script src="./QQ注册_files/libs-233df6bcaf.js.下载"></script>
	<script type="text/javascript">
		window.lang = 2052
	</script>
	<script src="./QQ注册_files/index-3195996579.js.下载"></script>
	<script type="text/javascript" src="./QQ注册_files/stats" charset="UTF-8"></script> -->


</body>
</html>