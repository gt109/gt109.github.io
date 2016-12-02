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
		$(this).find(".change").stop(true).animate({
			height:280,
			marginTop:-10,
			marginLeft:-(580/360)*10
		},200)
	},function(){
		$(this).find(".change").stop(true).animate({
			height:260,
			marginTop:0,
			marginLeft:0
		},200)
	})
/*倒计时*/	
	var date=Date.parse("2017/1/1 10:00:00");
	tim(date);
	setInterval(function(){
		tim(date)
	},1000);
	function tim(date){
		var date=date;
		var date2=Date.now();
		var dValue=date-date2;    
		var day=parseInt(dValue/1000/60/60/24);
		var hour=parseInt(dValue/1000/60/60-24*day);
		var minutes=parseInt((dValue/1000/60/60-24*day-hour)*60);
		var seconds=parseInt(((dValue/1000/60/60-24*day-hour)*60-minutes)*60);
		day = addZero(day);
		hour = addZero(hour)
		var seconds2 = addZero(seconds);
		minutes = addZero(minutes)
		var time=day+"天 "+hour+":"+minutes+":"+seconds2
		if(day==0){
			time=hour+":"+minutes+":"+seconds2
		}
		if(seconds<=0){
			time="&nbsp;活动结束"
		}
		$('.mainglob-time2').html(time)
	}
	function addZero(num){
		if(num < 10){
			num = '0' + num;
		}
		return num;
	}


	
	
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
