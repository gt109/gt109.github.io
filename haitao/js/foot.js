$(function(){
	$('.user-connect').hover(function(){
		$('.user-conn').stop(true).show().animate({
			left:-135,
			opacity:1
		},500)
	},function(){
		$('.user-conn').stop(true).hide().animate({
			left:-170,
			opacity:0
		},500)
	})
	
	
	$('.user-goods').hover(function(){
		$(this).addClass('user-bac')
	},function(){
		$(this).removeClass('user-bac')
	})
	
	
	$('.user-store').hover(function(){
		$(this).addClass('user-bac')
		$('.user-store-img').stop(true).show().animate({
			left:-91,
			opacity:1
		},500)
	},function(){
		$(this).removeClass('user-bac')
		$('.user-store-img').stop(true).hide().animate({
			left:-130,
			opacity:0
		},500)
	})
	
	$('.user-sale').hover(function(){
		$(this).addClass('user-bac')
		$('.user-sale-img').stop(true).show().animate({
			left:-91,
			opacity:1
		},500)
	},function(){
		$(this).removeClass('user-bac')
		$('.user-sale-img').stop(true).hide().animate({
			left:-130,
			opacity:0
		},500)
	})
	
	$('.user-twoCode').hover(function(){
		$(this).addClass('user-bac')
		$('.user-twoCode-img').stop(true).show().animate({
			left:-100,
			opacity:1
		},500)
	},function(){
		$(this).removeClass('user-bac')
		$('.user-twoCode-img').stop(true).hide().animate({
			left:-130,
			opacity:0
		},500)
	})
	
	$('.user-backTop').hover(function(){
		$(this).addClass('user-bac')
	},function(){
		$(this).removeClass('user-bac')
	})
	
	$('.user-backTop').click(function(){
		var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		var timer=setInterval(function(){
			scrollTop-=5;
			if(scrollTop<=0){
				clearInterval(timer);
				body=2000;	
			}
			document.body.scrollTop=scrollTop+"px";
			document.documentElement.scrollTop=scrollTop+"px";
		},10)
	
	})
	
	
})
