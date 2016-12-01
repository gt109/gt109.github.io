$(function(){
	var banner={
		banner:$('.banners'),
		imgs:$('.imgs'),
		arrowL:$('.arrow-left'),
		arrowR:$('.arrow-right'),
		circleItem:$('.circle-item'),
		now:0,
		next:0,
		timer:null,
		init:function(){
			this.imgs.eq(0).show()
			this.circleItem.eq(0).addClass('bac')
			this.arrowL.hide()
			this.arrowR.hide()
			this.autoPlay()
			this.enter()
			this.arrowl()
			this.arrowr()
			this.circlick()
		},
		enter:function(){
			var that=this
			this.banner.hover(function(){
				clearInterval(that.timer)
				that.arrowL.show()
				that.arrowR.show()
				
			},function(){
				that.autoPlay()
				that.arrowL.hide()
				that.arrowR.hide()
			})
		},
		autoPlay:function(){
			var that=this
			this.timer=setInterval(function(){
				that.next++
				that.next%=that.imgs.length
				that.fade()
			},3000)
		},
		arrowl:function(){
			var that=this
			this.arrowL.click(function(){
				that.next--
				if(that.next<=-1){
					that.next=that.imgs.length-1
				}
				that.fade()
			})
		},
		arrowr:function(){
			var that=this
			this.arrowR.click(function(){
				that.next++
				that.next%=that.imgs.length
				that.fade()
			})
		},
		fade:function(){
			this.imgs.eq(this.now).fadeOut(500)
			this.imgs.eq(this.next).fadeIn(500)
			this.circleItem.eq(this.next).addClass('bac').siblings().removeClass('bac')
			this.now=this.next
		},
		circlick:function(){
			var that=this
			this.circleItem.click(function(){
				console.log($(this).index())
				that.imgs.eq(that.now).fadeOut(500)
				that.imgs.eq($(this).index()).fadeIn(500)
				that.circleItem.eq($(this).index()).addClass('bac').siblings().removeClass('bac')
				that.now=$(this).index()
			})
		}
	}
	banner.init()
})