$(function(){
/*嗨淘精选*/
	$('.main-chosen-l').hover(function(){
		$(this).stop(true).animate({
			top:-10
		},200)
	},function(){
		$(this).stop(true).animate({
			top:0
		},200)})

	$('.main-cho-item').hover(function(){
		$(this).stop(true).animate({
			marginTop:-10
		},200)
	},function(){
		$(this).stop(true).animate({
			marginTop:0
		},200)
	})
	
/*嗨淘大牌*/
	$('.main-big-l').hover(function(){
		$(this).css({
			opacity:0.7
		})
	},function(){
		$(this).css({
			opacity:1
		})
		
	})
	$('.main-big-item').hover(function(){
		$(this).css({
			opacity:0.7
		})
	},function(){
		$(this).css({
			opacity:1
		})
		
	})
	
/*全球特卖*/
	$('.mainglob-item').hover(function(){
		$(this).find(".change").animate({
			height:280,
			marginTop:-10,
			marginLeft:-(580/360)*10
		},200)
	},function(){
		$(this).find(".change").animate({
			height:260,
			marginTop:0,
			marginLeft:0
		},200)
	})
	
	
	
/*热销品牌*/
	$('.mainglob-r-timg').hover(function(){
		$(this).addClass('border1')
		$(this).find('span').html('Dr.g').addClass('span')
	},function(){
		$(this).removeClass('border1')
		$(this).find('span').html('').removeClass('span')
	})
/*精选专题*/
	$('.mainglob-r-bimg').hover(function(){
		$(this).addClass('border2')
	},function(){
		$(this).removeClass('border2')
	})
	
})
