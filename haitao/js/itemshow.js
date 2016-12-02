$(function(){
	$('.head').load('top.html',function(){
		$.getScript('js/top.js');
	});
	$('.menu').load('nav.html',function(){
		$.getScript('js/nav.js');
	});
	$('.bottom').load('bottom.html');
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js');
	});

})