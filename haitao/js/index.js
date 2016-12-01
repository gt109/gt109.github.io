$(function(){
	$('.head').load('top.html',function(){
		$.getScript('js/top.js');
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


})
