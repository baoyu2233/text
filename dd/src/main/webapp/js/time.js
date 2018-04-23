$(function(){
	// 获取最近的倒计时时间函数
	endTimedjs();
	var InterValObj;
})
// 获取最近的倒计时时间
var djsIndex=0;
var endTime=[];
function endTimedjs(){
	
  var time_now = new Date().getTime(); //获取当前时间
  $('.lx_jx_pro_ul .jx_xsgLi').each(function(){
  var newDate1 = $.splitDate($(this).attr('data-djs'));
  //由于插件转换时间时会将月份加+1，所以现将月份分离出减一
  var newYYYY=(newDate1.YYYY);
  var newMM=(newDate1.MM)-1;
  var newDD=(newDate1.DD);
  var newhh=(newDate1.hh);
  var newmm=(newDate1.mm);
  var newss=(newDate1.ss);
  var  jedateTime=(newYYYY+'-'+newMM+'-'+newDD+' '+newhh+':'+newmm+':'+newss);
    var endT=$.timeStampDate(jedateTime,false)*1000;
    if(endT>time_now){
      endTime.push(endT);
    }
  })
	if(endTime!=null && endTime!=undefined){
		endTime.sort(sortNumber);
	}
  function sortNumber(a,b)
   {
     return a - b
   }
   var time_start =endTime[djsIndex];//设定活动开始时间
   djsIndex++;
   //计算时间差
   var time_distance =parseInt((time_start-time_now)/1000);
   //调用倒计时计算并赋值函数
   SetRemainTime(time_distance);
}

var InterValObj;
// 倒计时计算并赋值
//将时间减去1秒，计算天、时、分、秒
function SetRemainTime(SysSecond) {
	var time_now = new Date().getTime(); //获取当前时间
		$('.lx_jx_pro_ul .jx_xsgLi').each(function(){
			  var newDate1 = new Date($(this).attr('data-djs')).getTime();
			  if(newDate1<time_now){
				 $(this).children().find('.ljqgBtn').addClass('yqgBtn').remove('ljqgBtn').text('已抢光').attr('_bamboo_rep_statustext','已抢光');
			  }
		})
  clearInterval(InterValObj);
	  InterValObj =setInterval(function(){
		if (SysSecond > 0) {
	 	SysSecond = SysSecond - 1;
	 	var second = Math.floor(SysSecond % 60);             // 计算秒
	 	var minite = Math.floor((SysSecond / 60) % 60);      //计算分
	 	var hour = Math.floor((SysSecond / 3600) % 24);      //计算小时
	 	var day = Math.floor((SysSecond / 3600) / 24);        //计算天
		if(day>0){
			hour=hour+24*day;
		}
	 	if(second<10){
	 		second='0'+second;
	 	}
	 	if(minite<10){
	 		minite='0'+minite;
	 	}
	 	if(hour<10){
	 		hour='0'+hour;
	 	}
	 	$(".countDown_h").text(hour);//将计算的小时数写入页面
	 	$(".countDown_m").text(minite);//将计算的分钟数写入页面
	 	$(".countDown_s").text(second);//将计算的秒数写入页面
	} else {//剩余时间小于或等于0的时候，就停止倒计时定时器
	 	 clearInterval(InterValObj);
	 	 $(".countDown_h").text('00');
 		$(".countDown_m").text('00');
 		$(".countDown_s").text('00');
 		
 		var time_start =endTime[djsIndex];//设定活动开始时间
	 	  //console.log(time_start)
	 	   //计算时间差
	 	   var time_distance =parseInt((time_start-time_now)/1000);
	 	   //调用倒计时计算并赋值函数
	 	   SetRemainTime(time_distance);
	  }
	},1000)

}
