$(function() {
	var i=1;
	//轮播
	var ref = window.setInterval(function() {
		i=i+1;
		if(i==4){
			i=1;	
		}
		console.log(i);
		$(".side").css("background-image", "url(img/" + i + ".jpg)");
	}, 5000);
})