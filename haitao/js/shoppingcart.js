$(function(){
	$('.head').load('top.html',function(){
		$.getScript('js/top.js');
	});
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js');
	});

})