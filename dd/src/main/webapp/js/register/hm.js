;
var loadJs = function(url) {
	var el = document.createElement('script');
	el.type = 'text/javascript';
	el.src = url;
	document.body.appendChild(el)
};