
var basePath = 'http://m1.img.10010.com/net5';
var rule = "";
var groupArray = "";//号码组的数组
var groupArrayLength = 0;
var nowNum = 0;//正在使用的号码组下标
var numList = new Array();//存放号码
//var currentPrivinceCode="51"; //当前省份编码 (临时写个有数据的方便测试)
var currentPrivinceCodes="";
var currentPrivinceCode="";
//var cityCodes="510"; //地市编码 (临时写个有数据的方便测试)
var cityCodes="";
var rulesAppendHtml="";//根据当前模块的tabCode 从数据库获取当前城市，当前靓号模块的规则

//获取城市名称
var cityName=cityListArr();

$(document).ready(function () {//进页面时，主动调号码获取接口
    //addHiddenRuleInput();
    $('.mobileNumber_div3').eq(1).remove();//删除原型数据显示
    $('.mobileNumber_div3').eq(0).show();

    var charCode=getNumPro();
    var charlinkCode=charCode.split("|");
	currentPrivinceCodes=charlinkCode[0];
   /* if(null!=currentPrivinceCodes&&""!=currentPrivinceCodes&&undefined!=currentPrivinceCodes){
        currentPrivinceCode=currentPrivinceCodes.substring(1,currentPrivinceCodes.length);
    }*/
	cityCodes=charlinkCode[1];
    cityName=cityListArr();
    getNum("start");
});

function getNumPro(){
	var numPro=$.getCookie('mallcity');
	if(judgeIsBlank(numPro)){
		var numP=setInterval(function(){
			numPro=$.getCookie('mallcity');
			if(!judgeIsBlank(numPro)){
				clearInterval(numP);
				return numPro;
			}
		},200)
	}else{
		return numPro;
	}
}

//省份对应地市
var broadband_city={"11":[["110","北京"]],
    "13":[["130","天津"]],
    "18":[["188","石家庄"],["181","唐山"],["182","秦皇岛"],["186","邯郸"],["185","邢台"],["187","保定"],["184","张家口"],["189","承德"],["183","廊坊"],["180","沧州"],["720","衡水"]],
    "19":[["190","太原"],["193","大同"],["192","阳泉"],["199","朔州"],["198","忻州"],["191","晋中"],["200","吕梁"],["195","长治"],["194","晋城"],["197","临汾"],["196","运城"]],
    "10":[["101","呼和浩特"],["102","包头"],["106","乌海"],["107","赤峰"],["108","呼伦贝尔"],["113","兴安盟"],["109","通辽"],["111","锡林郭勒盟"],["103","乌兰察布"],["104","鄂尔多斯"],["105","巴彦淖尔"],["114","阿拉善盟"]],
    "91":[["910","沈阳"],["940","大连"],["912","鞍山"],["913","抚顺"],["914","本溪"],["915","丹东"],["916","锦州"],["917","营口"],["918","阜新"],["919","辽阳"],["911","铁岭"],["920","朝阳"],["921","盘锦"],["922","葫芦岛"]],
    "90":[["901","长春"],["902","吉林"],["909","延边朝鲜族自治州"],["903","四平"],["905","通化"],["907","白城"],["906","辽源"],["904","松原"],["908","白山"]],
    "97":[["971","哈尔滨"],["973","齐齐哈尔"],["988","牡丹江"],["976","佳木斯"],["989","绥化"],["981","大庆"],["991","鸡西"],["990","黑河"],["996","伊春"],["994","双鸭山"],["993","鹤岗"],["992","七台河"],["995","大兴安岭地区"]],
    "31":[["310","上海"]],
    "34":[["340","南京"],["450","苏州"],["330","无锡"],["440","常州"],["430","扬州"],["343","镇江"],["358","南通"],["350","徐州"],["445","泰州"],["348","盐城"],["354","淮安"],["346","连云港"],["349","宿迁"]],
    "36":[["360","杭州"],["470","温州"],["468","衢州"],["362","湖州"],["363","嘉兴"],["365","绍兴"],["476","台州"],["469","丽水"],["367","金华"],["364","舟山"],["370","宁波"]],
    "30":[["305","合肥"],["301","蚌埠"],["318","亳州"],["317","池州"],["312","滁州"],["306","阜阳"],["302","安庆"],["314","淮北"],["307","淮南"],["316","黄山"],["304","六安"],["300","马鞍山"],["313","宿州"],["308","铜陵"],["303","芜湖"],["311","宣城"]],
    "38":[["380","福州"],["390","厦门"],["480","泉州"],["395","漳州"],["386","宁德"],["385","莆田"],["387","南平"],["389","三明"],["384","龙岩"]],
    "75":[["750","南昌"],["755","九江"],["757","上饶"],["756","宜春"],["752","赣州"],["759","抚州"],["753","新余"],["751","吉安"],["740","景德镇"],["754","鹰潭"],["758","萍乡"]],
    "17":[["170","济南"],["166","青岛"],["150","淄博"],["157","枣庄"],["156","东营"],["161","烟台"],["155","潍坊"],["158","济宁"],["172","泰安"],["152","威海"],["154","日照"],["160","莱芜"],["153","临沂"],["173","德州"],["174","聊城"],["151","滨州"],["159","菏泽"]],
    "76":[["760","郑州"],["761","洛阳"],["762","开封"],["764","新乡"],["765","许昌"],["766","漯河"],["767","安阳"],["768","商丘"],["770","周口"],["771","驻马店"],["774","鹤壁"],["776","信阳"],["777","南阳"],["772","三门峡"],["773","濮阳"],["763","焦作"],["769","平顶山"],["775","济源"]],
    "71":[["710","武汉"],["711","宜昌"],["712","荆州"],["714","黄冈"],["715","黄石"],["716","襄阳"],["717","孝感"],["718","鄂州"],["719","咸宁"],["721","十堰"],["723","随州"],["724","荆门"],["727","恩施"],["713","仙桃"],["726","潜江"],["725","天门"],["722","神农架"]],
    "74":[["741","长沙"],["742","株洲"],["743","湘潭"],["744","衡阳"],["745","岳阳"],["747","益阳"],["748","郴州"],["749","常德"],["791","娄底"],["792","邵阳"],["794","张家界"],["795","怀化"],["796","永州"],["793","湘西自治州"],["746","浏阳"]],
    "51":[["510","广州"],["540","深圳"],["620","珠海"],["560","汕头"],["558","韶关"],["670","河源"],["528","梅州"],["570","惠州"],["525","汕尾"],["580","东莞"],["556","中山"],["550","江门"],["530","佛山"],["565","阳江"],["520","湛江"],["568","茂名"],["536","肇庆"],["535","清远"],["531","潮州"],["526","揭阳"],["538","云浮"]],
    "59":[["591","南宁"],["593","柳州"],["592","桂林"],["594","梧州"],["595","玉林"],["596","百色"],["597","钦州"],["598","河池"],["599","北海"],["590","防城港"],["589","贵港"],["588","贺州"],["600","崇左"],["601","来宾"]],
    "50":[["501","海口"],["502","三亚"],["504","琼海"],["503","儋州"],["505","文昌"],["506","东方"],["507","五指山"],["508","万宁"],["509","定安县"],["519","屯昌县"],["511","澄迈县"],["512","临高县"],["513","陵水县"],["514","琼中县"],["515","保亭县"],["516","乐东县"],["517","昌江县"],["518","白沙县"]],
    "83":[["831","重庆"]],
    "81":[["810","成都"],["813","攀枝花"],["815","泸州"],["825","德阳"],["824","绵阳"],["826","广元"],["821","遂宁"],["816","内江"],["814","乐山"],["822","南充"],["817","宜宾"],["823","广安"],["820","达州"],["827","巴中"],["811","雅安"],["819","眉山"],["830","资阳"],["818","自贡"],["829","阿坝藏族羌族自治州"],["812","凉山彝族自治州"],["828","甘孜藏族自治州"]],
    "85":[["850","贵阳"],["787","遵义"],["851","毕节"],["853","六盘水"],["788","黔南州"],["786","黔东南州"],["789","安顺"],["852","黔西南州"],["785","铜仁地区"]],
    "86":[["860","昆明"],["862","大理白族自治州"],["861","红河哈尼族彝族自治州"],["863","丽江"],["866","曲靖"],["736","西双版纳傣族自治州"],["865","玉溪"],["864","楚雄彝族自治州"],["867","昭通"],["869","普洱"],["731","保山"],["732","文山壮族苗族自治州"],["733","临沧"],["730","德宏傣族景颇族自治州"],["735","迪庆藏族自治州"],["734","怒江傈僳族自治州"],["868","景洪"]],
    "79":[["790","拉萨"],["797","日喀则"],["798","山南"],["799","林芝"],["801","那曲"],["800","昌都"],["802","阿里"]],
    "84":[["841","西安"],["844","咸阳"],["843","渭南"],["840","宝鸡"],["849","汉中"],["842","延安"],["845","榆林"],["846","铜川"],["848","安康"],["847","商洛"]],
    "87":[["870","兰州"],["876","嘉峪关"],["931","酒泉"],["879","白银"],["873","庆阳"],["877","天水"],["872","平凉"],["871","定西"],["878","临夏回族自治州"],["960","陇南"],["961","甘南藏族自治州"],["875","张掖"],["874","武威"],["930","金昌"]],
    "70":[["700","西宁"],["701","海东地区"],["707","黄南藏族自治州"],["702","格尔木"],["704","海西蒙古族藏族自治州"],["706","海北藏族自治州"],["705","海南藏族自治州"],["709","玉树藏族自治州"],["708","果洛藏族自治州"]],
    "88":[["880","银川"],["883","吴忠"],["884","石嘴山"],["886","中卫"],["885","固原"]],
    "89":[["890","乌鲁木齐"],["891","昌吉回族自治州"],["953","阿勒泰地区"],["897","喀什地区"],["893","石河子"],["898","伊犁哈萨克自治州"],["899","克拉玛依"],["895","巴音郭楞蒙古自治州"],["896","阿克苏地区"],["900","哈密地区"],["894","吐鲁番地区"],["892","奎屯"],["951","博尔塔拉蒙古自治州"],["952","塔城地区"],["955","和田地区"],["954","克孜勒苏柯尔克孜自治州"]]
};


function getNum(type,ruleDetail) {//type:start-表示页签切换，第一次调用；continue-不够50个，继续调用
    if (type == 'start') {//变量进行初始化
        $("#allNumResult").html("");
        rule = "";
        groupArray = "";//号码组的数组
        groupArrayLength = 0;
        nowNum = 0;//正在使用的号码组下标
        numList = new Array();//存放号码
    }
    if(null!=ruleDetail&&""!=ruleDetail&&undefined!=ruleDetail){
        rule=ruleDetail;
    }else{
        rule = $(".mobileNumber_ul1").find(".mobileNum_U1_LSe").eq(0).find('.goodRuleDetail').val();
    }

    if (rule != "" && rule != undefined) {
        //对rule进行解析
        //var lastInfo=tabCode+"###"+tabName+"^";//总信息
        //"$$$"-号码组间
        // mobileNumber_ul2Show
        //$('.mobileNumber_div3').eq(1).remove();
        $(".numberFailDiv").hide();
        var allInfo = rule.split("\^")[1];
        groupArray = allInfo.split("\$\$\$");//号码组-最多会有5个，总共要获取50个。若一组不够，调用下一组
        groupArrayLength = groupArray.length;
        if (nowNum + 1 <= groupArrayLength) {//循环每个号码组，获取参数
            var ruleDetail = groupArray[nowNum].split("###");
            var param = dealParam(ruleDetail);//开始拼接查询参数
            var ruleParam = dealSelfParam(ruleDetail);//拼接规则参数
            getPhoneNums(param, ruleParam);//调用选号js
        }

    }else{
        var nullTips='没有配置靓号规则，您还可以进入'+'<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
        nullTips+='，查看更多靓号。';
        $('.numberFailTxt').html(nullTips);//提示语赋值
        $('.numberAgine').hide();//刷新重试按钮隐藏
        $(".numberFailDiv").show();
    }

}


//页面加载根据登录账号获取改账号对应省份下的地市信息
function cityListArr(){
  /*   var cityCodeso="";*/
    var cityNameso="";
    var cityArrLis;
    if(null!=currentPrivinceCodes&&""!=currentPrivinceCodes&&undefined!=currentPrivinceCodes){
        cityArrLis=broadband_city[currentPrivinceCodes];
    }
    if(null!=cityArrLis&&""!=cityArrLis){
        var lis=$(".selectList");
        lis.empty();
        $.each(cityArrLis, function (i, item) {
            lis.append('<li><span data-value="'+item[0]+'">'+item[1]+'></span></li>');
        });

        var charCode=getNumPro();
        var charlinkCode=charCode.split("|");
        cityCodes=charlinkCode[1];

        for(var i=0;i<cityArrLis.length;i++){
            if(cityCodes==cityArrLis[i][0]){
                $('.moblieNationName').attr('data-value',cityArrLis[i][0]).text(cityArrLis[i][1]);
                cityNameso=cityArrLis[i][1];
            }
        }
    }
     return cityNameso;
}

function getNumChar() {
    rule = $(".mobileNumber_ul1").find(".mobileNum_U1_LSe").eq(0).children('.goodRuleDetail').val();
}

function dealSelfParam(myRule) {
    var groupCode = myRule[0];
    var buyLinks = myRule[3];
    if(""!=buyLinks&&null!=buyLinks&&undefined!=buyLinks){
        var buyLink=buyLinks.replace("http://www.10010.com","http://mall.10010.com");
    }
    //groupCode = "89162743";//为了有数据，临时写个
    var startNum = myRule[8];
    var endNum = myRule[9];
    var meanNum = myRule[11];
    var param = {
        "groupCode": groupCode,
        "buyLink": buyLink,
        "startNum": startNum,
        "endNum": endNum,
        "meanNum": meanNum
    };
    return param;

}


function getPhoneNums(params, ruleParam) {
        $.ajax({
            type: "get",
            async: false,
            url: "http://mall.10010.com/NumApp/NumberCenter/qryNum",
            data: params, //param是请求参数集合
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonp_queryMoreNums",
            success: function (data) {
                if (data.code == "M0") {//成功并且有数据
                    $('.numberFailDiv').hide();
                    dataDecompress(numList, data, ruleParam);
                    $('.mobileNumber_div3 .AdPro .numberNullTip').remove();
                    var jsone = JSON.stringify(data);
                    sessionStorage.setItem('phoneNumData', jsone);
                    localStorage.setItem('localNumData',jsone);
                } else if (data.code == "M1") {
                    var nameNumber = $(".mobileNumber_ul1").find(".mobileNum_U1_LSe").find('.editeTxt').text();
                    var nullTips = '暂无' + '"' + nameNumber + '"' + ',您还可以进入' + '<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
                    nullTips += '，查看更多靓号。';
                    $('.numberFailTxt').html(nullTips);//提示语赋值
                    $('.numberAgine').hide();//刷新重试按钮隐藏
                    $(".numberFailDiv").show();
                } else if (data.code == "M2") {
                    var nullTips = '系统检测ip异常，请更换ip或联系网络管理员。';
                    $('.numberFailTxt').html(nullTips);//提示语赋值
                    $('.numberAgine').hide();//刷新重试按钮隐藏
                    $(".numberFailDiv").show();
                } else if (data.code == "M3") {
                    var nullTips = '您请求次数过多,请稍后再试。';
                    $('.numberFailTxt').html(nullTips);//提示语赋值
                    $('.numberAgine').hide();//刷新重试按钮隐藏
                    $(".numberFailDiv").show();
                } else if (data.code == "M4") {
                    var nullTips = '您当日请求次数过多,请明天再试。';
                    $('.numberFailTxt').html(nullTips);//提示语赋值
                    $('.numberAgine').hide();//刷新重试按钮隐藏
                    $(".numberFailDiv").show();
                } else if (data.code == "M5") {
                    var nullTips = '您请求次数过多,请稍后再试。';
                    $('.numberFailTxt').html(nullTips);//提示语赋值
                    $('.numberAgine').hide();//刷新重试按钮隐藏
                    $(".numberFailDiv").show();
                } else {
                    var getPhoneData = ((sessionStorage.getItem('phoneNumData') == null || sessionStorage.getItem('phoneNumData') == undefined) ? 0 : sessionStorage.getItem('phoneNumData'));
                    var getlocalPhoneData = ((sessionStorage.getItem('localNumData') == null || sessionStorage.getItem('localNumData') == undefined) ? 0 : sessionStorage.getItem('localNumData'));
                    if (null != getPhoneData && 0 != jsonPhoneData) {
                        var jsonPhoneData = JSON.parse(getPhoneData);
                        var jsonLocalData="";
                        if(null!=getlocalPhoneData&&0!=getlocalPhoneData){
                            jsonLocalData =JSON.parse(getlocalPhoneData);
                        }
                        if (0 != getPhoneData) {
                            $('.numberFailDiv').hide();
                            dataDecompress(numList, jsonPhoneData, ruleParam);
                            $('.mobileNumber_div3 .AdPro .numberNullTip').remove();
                        }else if(0==getPhoneData&&0!=getlocalPhoneData){
                            $('.numberFailDiv').hide();
                            dataDecompress(numList, jsonLocalData, ruleParam);
                            $('.mobileNumber_div3 .AdPro .numberNullTip').remove();
                        } else {
                            $('.mobileNumber_ul2').stop(true, true);
                            clearInterval(ts_setI);
                            Lh_width = $('.tsNumber>li').width();//获取轮播图的li的宽度
                            if ($('.tsNumber>li').length > 1) {
                                $('.numberChangeBtn').show();
                                Banners.bannerGz('ts', 'tsNumber', 'tsNumber_indexUl');//构造轮播
                            } else {
                                $('.Number_indexUlShow').html('');
                                $('.numberChangeBtn').hide();
                            }
                            var nameNumber = $(".mobileNumber_ul1").find(".mobileNum_U1_LSe").find('.editeTxt').text();
                            var nullTips = '暂无' + '"' + nameNumber + '"' + ',您还可以进入' + '<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
                            nullTips += '，查看更多靓号。';
                            $('.numberFailTxt').html(nullTips);//提示语赋值
                            $('.numberAgine').hide();//刷新重试按钮隐藏
                            $(".numberFailDiv").show();
                        }
                    }else{
                        $('.mobileNumber_ul2').stop(true, true);
                        clearInterval(ts_setI);
                        Lh_width = $('.tsNumber>li').width();//获取轮播图的li的宽度
                        if ($('.tsNumber>li').length > 1) {
                            $('.numberChangeBtn').show();
                            Banners.bannerGz('ts', 'tsNumber', 'tsNumber_indexUl');//构造轮播
                        } else {
                            $('.Number_indexUlShow').html('');
                            $('.numberChangeBtn').hide();
                        }
                        var nameNumber = $(".mobileNumber_ul1").find(".mobileNum_U1_LSe").find('.editeTxt').text();
                        var nullTips = '暂无' + '"' + nameNumber + '"' + ',您还可以进入' + '<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
                        nullTips += '，查看更多靓号。';
                        $('.numberFailTxt').html(nullTips);//提示语赋值
                        $('.numberAgine').hide();//刷新重试按钮隐藏
                        $(".numberFailDiv").show();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var getPhoneData = ((sessionStorage.getItem('phoneNumData') == null || sessionStorage.getItem('phoneNumData') == undefined) ? 0 : sessionStorage.getItem('phoneNumData'));
                var getlocalPhoneData = ((sessionStorage.getItem('localNumData') == null || sessionStorage.getItem('localNumData') == undefined) ? 0 : sessionStorage.getItem('localNumData'));
                if (null != getPhoneData && 0 != jsonPhoneData) {
                    var jsonPhoneData = JSON.parse(getPhoneData);
                    var jsonLocalData="";
                    if(null!=getlocalPhoneData&&0!=getlocalPhoneData){
                        jsonLocalData =JSON.parse(getlocalPhoneData);
                    }
                    if (0 != getPhoneData) {
                        $('.numberFailDiv').hide();
                        dataDecompress(numList, jsonPhoneData, ruleParam);
                        $('.mobileNumber_div3 .AdPro .numberNullTip').remove();
                    }else if(0==getPhoneData&&0!=getlocalPhoneData){
                        $('.numberFailDiv').hide();
                        dataDecompress(numList, jsonLocalData, ruleParam);
                        $('.mobileNumber_div3 .AdPro .numberNullTip').remove();
                    } else {
                        //加载失败提示语
                        var numberFailTip = '糟糕～数据加载失败了…请静心等待～您还可以进入';
                        numberFailTip += '<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
                        numberFailTip += '，查看更多靓号。';
                        $('.numberFailTxt').html(numberFailTip);//提示语赋值
                        $('.numberAgine').show();//刷新重试按钮显示
                        $(".numberFailDiv").show();
                    }
                }else{
                    //加载失败提示语
                    var numberFailTip = '糟糕～数据加载失败了…请静心等待～您还可以进入';
                    numberFailTip += '<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
                    numberFailTip += '，查看更多靓号。';
                    $('.numberFailTxt').html(numberFailTip);//提示语赋值
                    $('.numberAgine').show();//刷新重试按钮显示
                    $(".numberFailDiv").show();
                }
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    var getPhoneData = ((sessionStorage.getItem('phoneNumData') == null || sessionStorage.getItem('phoneNumData') == undefined) ? 0 : sessionStorage.getItem('phoneNumData'));
                    var getlocalPhoneData = ((sessionStorage.getItem('localNumData') == null || sessionStorage.getItem('localNumData') == undefined) ? 0 : sessionStorage.getItem('localNumData'));
                    if (null != getPhoneData && 0 != jsonPhoneData) {
                        var jsonPhoneData = JSON.parse(getPhoneData);
                        var jsonLocalData="";
                        if(null!=getlocalPhoneData&&0!=getlocalPhoneData){
                            jsonLocalData =JSON.parse(getlocalPhoneData);
                        }
                        if (0 != getPhoneData) {
                            $('.numberFailDiv').hide();
                            dataDecompress(numList, jsonPhoneData, ruleParam);
                            $('.mobileNumber_div3 .AdPro .numberNullTip').remove();
                        }else if(0==getPhoneData&&0!=getlocalPhoneData){
                            $('.numberFailDiv').hide();
                            dataDecompress(numList, jsonLocalData, ruleParam);
                            $('.mobileNumber_div3 .AdPro .numberNullTip').remove();
                        } else {
                            //加载失败提示语
                            var numberFailTip = '糟糕～数据加载失败了…请静心等待～您还可以进入';
                            numberFailTip += '<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
                            numberFailTip += '，查看更多靓号。';
                            $('.numberFailTxt').html(numberFailTip);//提示语赋值
                            $('.numberAgine').show();//刷新重试按钮显示
                            $(".numberFailDiv").show();
                        }
                    }else{
                        //加载失败提示语
                        var numberFailTip = '糟糕～数据加载失败了…请静心等待～您还可以进入';
                        numberFailTip += '<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
                        numberFailTip += '，查看更多靓号。';
                        $('.numberFailTxt').html(numberFailTip);//提示语赋值
                        $('.numberAgine').show();//刷新重试按钮显示
                        $(".numberFailDiv").show();
                    }
                    ajax.abort() //取消请求
                }
            }
        });
}
//数据解压-将商城数据处理后放到集合中，方便页面遍历
function dataDecompress(numList, data, ruleParam) {
    //numList.splice(0, incData.length);
    var dataCompress = data.numArray;//号码信息（手机号、预存款等信息）数组
    var splitLen = parseInt(data['splitLen']);
    for (var i = 0; i < dataCompress.length; i += splitLen) {
        var numDetail = {};
        numDetail.phoneNum = dataCompress[i] + "";//号码
        numDetail.numPreFee = (dataCompress[i + 1]) + "";//预存款
        numDetail.numDesc = data["numRetailList"][dataCompress[i + 2]];//号码描述
        numDetail.numLevelPrice = "0";//号码等级金额
        numDetail.province = currentPrivinceCodes;//省份编码
        numDetail.cityCode = cityCodes;//地市编码
        numDetail.cityName = cityName;//地市名称
        numDetail.niceRule = dataCompress[i + 5] + "";//靓号标志位：0：普号1：靓号
        numDetail.monthFeeLimit = dataCompress[i + 3] + "";//月消费
        numDetail.monthLimit = dataCompress[i + 6] + "";//协议期
        //下边为自身规则
        numDetail.groupCode = ruleParam["groupCode"];//号码组编码-购买参数
        numDetail.redStart = ruleParam["startNum"];
        ;//标红开始
        numDetail.redEnd = ruleParam["endNum"];
        ;//标红结束
        numDetail.mean = ruleParam["meanNum"];
        ;//号码释义
        numDetail.buyLink = ruleParam["buyLink"];
        ;//购买链接

        numDetail.lastLink = numDetail.buyLink + "?numInfo=" + numDetail.phoneNum + "^" + numDetail.numPreFee + "^" + numDetail.numDesc + "^" + numDetail.numLevelPrice + "^" + numDetail.province + "^" + numDetail.cityCode + "^" + numDetail.cityName + "^" + numDetail.niceRule + "^" + numDetail.monthFeeLimit + "^" + numDetail.monthLimit + "^" + numDetail.groupCode;

        numList.push(numDetail);
    }
    if (numList.length < 10 && nowNum + 1 < groupArrayLength) {
       /* nowNum = nowNum + 1;
        getNum("continue");*/
        var nameNumber = $(".mobileNumber_ul1").find(".mobileNum_U1_LSe").find('.editeTxt').text();
        var nullTips = '暂无' + '"' + nameNumber + '"' + ',您还可以进入' + '<a href="http://num.10010.com/NumApp/chseNumList/init" class="colorff6600">号码专区</a>';
        nullTips += '，查看更多靓号。';
        $('.numberFailTxt').html(nullTips);//提示语赋值
        $('.numberAgine').hide();//刷新重试按钮隐藏
        $(".numberFailDiv").show();

    } else {//页面渲染数据-够了50个或者号码组调用完了。此时数组长度可能大于50、小于50、等于50
        if (numList.length > 50) {//大于50，进行截取
            numList = numList.slice(0, 50);
        }else{//小于50截取 至少显示10条
            numList = numList.slice(0, numList.length);
        }
        /*  for(var numI=0;numI<numList.length;numI++){
         var thisNum=numList[numI].phoneNum;
         var redBefore=thisNum.substring(0,numDetail.redStart-2);
         var redNum=thisNum.substring(numDetail.redStart-1,numDetail.redEnd-2);
         var redAfter=thisNum.substring(numDetail.redEnd-1,thisNum.length-1);
         redNum='<span class="colorff6600">'+redNum+'</span>';
         thisNum=redBefore+redNum+redAfter;
         numList[numI].phoneNum=thisNum;
         }*/
        //渲染
        $('.mobileNumber_ul2').stop(true, true);
        clearInterval(ts_setI);
        $("#allNumResult").setTemplateElement("goodNumTemplate").processTemplate(numList);
        Lh_width = $('.tsNumber>li').width();//获取轮播图的li的宽度
        if($('.tsNumber>li').length>1){
        	$('.numberChangeBtn').show();
        	Banners.bannerGz('ts', 'tsNumber', 'tsNumber_indexUl');//构造轮播
            tsMove(tsIndex, tsLiLength, 'tsNumber', 'Number_indexUlShow');
        }else{
        	$('.Number_indexUlShow').html('');
        	$('.numberChangeBtn').hide();
        }
        
    }
};


//构造banner对象

var Banners = {
    // 轮播图运行方法
    banner_move: function (banner_index, banner_length, move_width, banner_ul, banner_index_ul, bgClass) {
        if (banner_index === banner_length) {
            $('.' + banner_index_ul + '>li').removeClass('' + bgClass + '');
            $('.' + banner_index_ul + '>li').eq(0).addClass('' + bgClass + '');
        } else {
            $('.' + banner_index_ul + '>li').removeClass('' + bgClass + '');
            $('.' + banner_index_ul + '>li').eq(banner_index).addClass('' + bgClass + '');
        }
        $('.' + banner_ul + '').animate({'margin-left': -banner_index * move_width}, 1000);
        if (banner_index === banner_length) {
            $('.' + banner_ul + '').css({'margin-left': '0'}, 1000);
        }
    },
    //轮播图构造方法
    bannerGz: function (bannerstyle, bannerUl, banner_indexUL) {
        //靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
        $('.' + bannerUl + '').append($('.' + bannerUl + '').html());//将轮播图部分的li复制一份后追加到ul中
        tsLiLength = $('.' + bannerUl + '>li').length;//获取轮播图部分的2倍li的长度
        $('.' + bannerUl + '').width(tsLiLength * Lh_width);//给轮播图的ul赋值
        tsLiLength = tsLiLength / 2;//获取轮播图的原始li的长度
        $('.' + banner_indexUL + '').html('');
        for (var i = 0; i < tsLiLength; i++) {
            $('.' + banner_indexUL + '').append('<li></li>');
        }
        $('.' + banner_indexUL + '>li').eq(0).addClass('bgff6600');
        if (bannerstyle == 'ts') {//特色靓号
            tsLiLength = tsLiLength;
        } else if (bannerstyle == 'sr') {//生日靓号
            srLiLength = tsLiLength;
        } else if (bannerstyle == 'jnr') {//纪念日靓号
            jnrLiLength = tsLiLength;
        }
    }
}
var ts_setI;
var tsLiLength, Lh_width;
var tsIndex = 0;



function tsMove(tsIndex, tsLiLength, banner_ul, banner_index_ul) {
    //特色靓号轮播下标，特色靓号轮播长度、特色靓号轮播ul的class，圆点控制的ul的class
    tsLiLength=$('.mobileNumber_ul2>li').length/2;
    ts_setI = setInterval(function () {
        if (tsIndex < tsLiLength) {
            tsIndex == tsIndex;
        } else {
            tsIndex = 0;
            $('.tsNumber').css('margin-left', '0');
        }
        tsIndex++;
        Banners.banner_move(tsIndex, tsLiLength, Lh_width, banner_ul, banner_index_ul, 'bgff6600');
        //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
        //下方圆点控制的ul的class，下方圆点控制变化的class
    }, 5000)
}



// 特色靓号圆点控制
$('.tsNumber_indexUl').delegate('li', 'mouseover', function () {
    $('.mobileNumber_ul2').stop(true, true);
    clearInterval(ts_setI);
    tsIndex = $(this).index();
    $('.tsNumber_indexUl>li').removeClass('bgff6600');
    $('.tsNumber_indexUl>li').eq(tsIndex).addClass('bgff6600');
    $('.tsNumber').animate({'margin-left': -tsIndex * Lh_width}, 1000);
}).delegate('li', 'mouseout', function () {
    clearInterval(ts_setI);
    ts_setI = setInterval(function () {
        if (tsIndex < tsLiLength) {
            tsIndex == tsIndex;
        } else {
            tsIndex = 0;
            $('.tsNumber').css('margin-left', '0');
        }
        tsIndex++;
        Banners.banner_move(tsIndex, tsLiLength, Lh_width, 'tsNumber', 'tsNumber_indexUl', 'bgff6600')
        //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
        //下方圆点控制的ul的class，下方圆点控制变化的class
    }, 5000)
})

// 特色靓号区域鼠标移入暂停，移出继续
$('.mobileNumber_div3').mouseover(function () {
    $('.mobileNumber_ul2').stop(true, true);
    clearInterval(ts_setI);
}).mouseout(function () {
    ts_setI = setInterval(function () {
        if (tsIndex < tsLiLength) {
            tsIndex == tsIndex;
        } else {
            tsIndex = 0;
            $('.tsNumber').css('margin-left', '0');
        }
        tsIndex++;
        Banners.banner_move(tsIndex, tsLiLength, Lh_width, 'tsNumber', 'tsNumber_indexUl', 'bgff6600')
        //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
        //下方圆点控制的ul的class，下方圆点控制变化的class
    }, 5000)
})

$(function(){

    //靓号专区地址下拉框
    $('body').delegate('.selectList','click',function(event){
        $('.boxLyout').hide();
        var target = event.target.nodeName == 'SPAN'? $(event.target):$(event.target).parent('span');//获取span标签
        var targetTxt=target.text();//获取span标签里面的内容
        var targetCode=target.attr('data-value');//获取span标签的cityCode
        if(targetTxt != ''){
            var TargetName = targetTxt.substring(0,targetTxt.length -1);
            $(this).parents('.floor_tit').find('.moblieNationName').attr('data-value',targetCode).text(TargetName);
            $(this).parents('.boxLyout').hide();
        }
        cityCodes=targetCode;
        cityName=targetTxt.replace(">","");
        getNum("start");
    });

    //换一换按钮
    $('body').delegate('.numberChangeBtn','click',function () {
        clearInterval(ts_setI);
        $('.mobileNumber_ul2Show').stop(true, true);
        var showul2Width = $('.mobileNumber_ul2Show').width();
        var inD_Left = $('.mobileNumber_ul2Show').css('margin-left');
        inD_Left = parseInt(inD_Left.substring(0, inD_Left.length - 2));
        if (inD_Left > -(showul2Width) / 2 + Lh_width) {
            $('.Number_indexUlShow>li').removeClass('bgff6600');
            $('.Number_indexUlShow>li').eq(-inD_Left / Lh_width + 1).addClass('bgff6600');
            $('.mobileNumber_ul2Show').animate({'margin-left': inD_Left - Lh_width}, 1000);
        } else if (inD_Left == -(showul2Width) / 2 + Lh_width) {
            $('.Number_indexUlShow>li').removeClass('bgff6600');
            $('.Number_indexUlShow>li').eq(0).addClass('bgff6600');
            $('.mobileNumber_ul2Show').animate({'margin-left': 0}, 1000);
        } else if (inD_Left == -(showul2Width) / 2) {
            //$('.mobileNumber_ul2Show').animate({'margin-left': 0}, 1000);
            $('.Number_indexUlShow>li').removeClass('bgff6600');
            $('.Number_indexUlShow>li').eq(1).addClass('bgff6600');
            $('.mobileNumber_ul2Show').animate({'margin-left': -Lh_width}, 1000);
        }
        tsIndex=-inD_Left / Lh_width + 1;
        tsMove(tsIndex, tsLiLength, 'tsNumber', 'Number_indexUlShow');
    })


// 靓号专区切换
    $('body').delegate('.mobileNumber_ul1>li','click',function () {
        var this_index=$(this).index();
        $('.mobileNumber_ul1>li').removeClass('mobileNum_U1_LSe');
        $('.mobileNumber_ul1>li').eq(this_index).addClass('mobileNum_U1_LSe');
        //$('.Number_indexUl').removeClass('Number_indexUlShow');
        $('.mobileNumber_ul2').removeClass('mobileNumber_ul2Show').eq(this_index).addClass('mobileNumber_ul2Show');
        switch(this_index){
            //特色靓号
            case 0:
                $('.mobileN_Style_pic').eq(0).attr('src',$('.mobileN_Style_pic').eq(0).parent().attr('rabbit_pic1'));
                $('.mobileN_Style_pic').eq(1).attr('src',$('.mobileN_Style_pic').eq(1).parent().attr('rabbit_pic2'));
                $('.mobileN_Style_pic').eq(2).attr('src',$('.mobileN_Style_pic').eq(2).parent().attr('rabbit_pic2'));
                $('.Number_indexUl').eq(0).addClass('Number_indexUlShow');
                $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
                break;
            //生日靓号
            case 1:
                $('.mobileN_Style_pic').eq(0).attr('src',$('.mobileN_Style_pic').eq(0).parent().attr('rabbit_pic2'));
                $('.mobileN_Style_pic').eq(1).attr('src',$('.mobileN_Style_pic').eq(1).parent().attr('rabbit_pic1'));
                $('.mobileN_Style_pic').eq(2).attr('src',$('.mobileN_Style_pic').eq(2).parent().attr('rabbit_pic2'));
                $('.Number_indexUl').eq(1).addClass('Number_indexUlShow');
                $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
                break;
            //纪念日靓号
            case 2:
                $('.mobileN_Style_pic').eq(0).attr('src',$('.mobileN_Style_pic').eq(0).parent().attr('rabbit_pic2'));
                $('.mobileN_Style_pic').eq(1).attr('src',$('.mobileN_Style_pic').eq(1).parent().attr('rabbit_pic2'));
                $('.mobileN_Style_pic').eq(2).attr('src',$('.mobileN_Style_pic').eq(2).parent().attr('rabbit_pic1'));
                $('.Number_indexUl').eq(2).addClass('Number_indexUlShow');
                $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
                break;
        }
        getNum('start');
    })


// 特色靓号圆点控制

    $('body').delegate('.tsNumber_indexUl>li', 'mouseover', function () {
        $('.mobileNumber_ul2').stop(true, true);
        clearInterval(ts_setI);
        tsIndex = $(this).index();
        $('.tsNumber_indexUl>li').removeClass('bgff6600');
        $('.tsNumber_indexUl>li').eq(tsIndex).addClass('bgff6600');
        $('.tsNumber').animate({'margin-left': -tsIndex * Lh_width}, 1000);
    }).delegate('.tsNumber_indexUl>li', 'mouseout', function () {
        $('.mobileNumber_ul2').stop(true, true);
        clearInterval(ts_setI);
        ts_setI = setInterval(function () {
            if (tsIndex < tsLiLength) {
                tsIndex == tsIndex;
            } else {
                tsIndex = 0;
                $('.tsNumber').css('margin-left', '0');
            }
            tsIndex++;
            Banners.banner_move(tsIndex, tsLiLength, Lh_width, 'tsNumber', 'tsNumber_indexUl', 'bgff6600');
            //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
            //下方圆点控制的ul的class，下方圆点控制变化的class
        }, 5000)
    })

})



function dealParam(myRule) {//参数为规则字符串
    //groupCode+"###"+groupName+"###"+proName+"###"+proBuyLink+"###"+numSegment+"###"+numType+"###"+birth+"###"+year+"###"+startNum+"###"+endNum+"###"+mainNum+"###"+meanNum
    var provinceCode = currentPrivinceCodes;
    var cityCode = cityCodes;
    //本地测试provinceCode 51  cityCode 510
    /* var provinceCode = "51";
     var cityCode = "510";*/

    var groupCode = myRule[0];
    //groupCode = "89162743";
    var proBuyLink = myRule[3];
    var numSegment = myRule[4];
    if(numSegment=="不限"||numSegment==" "){
        numSegment="";
    }
    var numType = myRule[5];
    if(""!=myRule[7]){
        var birth = myRule[6];
    }
    if(""!=myRule[7]){
        var year = myRule[7];
    }
    var mainNum = myRule[10];
    if (mainNum =="尾号后四位查询"||mainNum==" ") {
        mainNum = "";
    }
    var searchType = "";
    if (mainNum != "" && typeof(mainNum) != "undefined" && mainNum != "undefined") {
        searchType = "02";
    }

    var param = {
        "channel": "yh",
        "searchCategory": "3",
        "qryType": "02",
        "amounts": "50",
        "searchType": searchType,
        "searchValue": mainNum,
        "provinceCode": provinceCode,
        "cityCode": cityCode,
        "groupKey": groupCode,
        "codeTypeCode": numType,
        "numNet": numSegment,
        "yearNum": year,
        "monthNum": birth
    };
    if(""==param.numNet||undefined==param.numNet||null==param.numNet){
        delete param.numNet;
    }
    if(""==param.searchType||undefined==param.searchType||null==param.searchType){
        delete param.searchType;
    }
    if(""==param.searchValue||undefined==param.searchValue||null==param.searchValue){
        delete param.searchValue;
    }
    if(""==param.yearNum||undefined==param.yearNum||null==param.yearNum){
        delete param.yearNum;
    }
    if(""==param.monthNum||undefined==param.monthNum||null==param.monthNum){
        delete param.monthNum;
    }
    return param;
}

function redDeal(num, start, end) {//对号码进行标红
    var this_num=num;
    if(null!=this_num&&""!=this_num){
        var redBefore=this_num.substr(0,start-1);
        var redNumber=this_num.substr(start-1,end-start+1);
        var redAfter=this_num.substr(end,this_num.length-1);
        redNumber='<span class="colorff6600">'+redNumber+'</span>';
        this_num=redBefore+redNumber+redAfter;
    }
    return this_num;
}

$('.numberGroupUl2').delegate('.redStart,.redEnd','change',function(){
    var endOptions=$(this).parent().find('.redEnd').val();
    var strOptions=$(this).parent().find('.redStart').val();
    /*var strOptions=$(".redStart option:selected");
     var endOptions=$(".redEnd option:selected");*/
    if(parseInt(strOptions)>parseInt(endOptions)) {
        $.MsgBox.alert("标红起始数字不能大于末尾数字");
        return;
    }
    if(parseInt(endOptions)-parseInt(strOptions)>4){
        $.MsgBox.alert("仅支持尾号2-4位查询");
        return;
    }
})

//刷新重试
$('.numberFailDiv').delegate('.numberAgine','onclick',function(){
    window.location.reload();
})