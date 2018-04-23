;
/**
 * 订单填写 赠品js
 */
$(function(){
     var presentPayObj = {
              ONLINEPAY : "在线支付",
              AFTERPAY : "货到付款",
             DIVIDEPAY : "信用卡分期"
      };
     $("#payMentEdit").delegate("li[paytypename]","click",function(){
      var $this=$(this),paytypename=$this.attr("paytypename");
       //if(!paytypename){
       //    paytypename = $this.attr("paywayname");
       //}
       var $prensent=$("#goodsPrensent"),$pData=$prensent.find("p[data]").not(".pline");
       presentId = [];
       if(paytypename=="在线支付"){
           switchPayType_present("ONLINEPAY");
       }
       else if(paytypename=="货到付款"){
           switchPayType_present("AFTERPAY");
       }
       else if(paytypename=="信用卡分期付款"){
          switchPayType_present("DIVIDEPAY");
       }
       else if(paytypename=="招联零零花分期"){
           switchPayType_present("DIVIDEPAY");
        }
       $.unique(presentId);
   }).find("li[paytypename].choice").trigger("click");
   function switchPayType_present(payType){
       var event = $("#goodsPrensent").find("p[data]").not(".pline");
       event.each(function(){
          var $p=$(this),data=eval("("+$p.attr("data")+")"),multi=false,correctRemindMsg ="";
          $p.find("span.span_tips").remove();
          $p.find(".text").removeClass("tline");
          for(var key in presentPayObj){
              if(data[payType] != '1'){
                  if(data[key] =='1'){
                      correctRemindMsg+=(multi?"、":"");
                      correctRemindMsg+=presentPayObj[key];
                      multi=true;
                  }
              }else{
                  presentId.push(data["PID"]);
              }
          }
          if(multi){
             $p.find(".text").addClass("tline");
             $p.append('<span class="span_tips">只能'+correctRemindMsg+'才送哦</span>');
          }
       });
   }
});

