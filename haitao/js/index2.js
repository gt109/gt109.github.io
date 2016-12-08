$(function(){
	$('.head').load('top.html',function(){
		$.getScript('js/top.js');
		$('.top-left .login').html("gt109，欢迎您")
		$('.top-left .regist').html("退出").click(function(){
			$(this).attr({href:"index.html"})
		})
		
		
	});
	$('.menu').load('nav.html',function(){
		$.getScript('js/nav.js');
	});
	$('.banner').load('banner.html',function(){
		$.getScript('js/banner.js');
	});
	$('.main').load('main.html',function(){
		$.getScript('js/main.js');
	});
	$('.bottom').load('bottom.html');
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js');
	});
	
})

