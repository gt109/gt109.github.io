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
//回到顶部	
	$('.user-backTop').click(function(){		
		$('html,body').animate({scrollTop:0},300);
	});
	
	
/*购物袋商品数量*/	
		var cart = $.cookie('tb_cart') || '{}';
		cart = JSON.parse( cart );
		var amount=0;
		for(var key in cart){
			amount++
		}
		$('.count').html(amount)
});

