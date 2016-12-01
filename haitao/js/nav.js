$(function(){
	var count=0;
	$('.siftbtn').click(function(){
		count++;
		$('.nav-con').fadeToggle()
		if(count%2==1){
			$('.icon').attr({src:"img/TB1xYW8LFXXXXaQXVXXYSJgFpXX-20-20.gif"})
			$('.btn').html('收起分类')
			$('.sift-list').eq(0).show()
			waterfall.init(0);
		}else{
			$('.icon').attr({src:"img/TB1R8O7LFXXXXXUXVXX1DxgFpXX-20-20.png"})
			$('.btn').html('查看分类')
		}
	})
	
	$('.nav-title-item').eq(0).addClass('enter')
	$('.nav-title-item').children('span').eq(0).addClass('tri')
	
	$('.nav-title-item').hover(function(){
		var index=$(this).index()
		$('.sift-list').eq(index).show().siblings().hide()
		$('.nav-title-item').eq(index).addClass('enter').siblings().removeClass('enter')
		$('.nav-title-item').eq(index).find('span').addClass('tri');
		$('.nav-title-item').eq(index).siblings().find('span').removeClass('tri')
		waterfall.init(index)
	})
	
	var waterfall={
		sift_list: null,
		li: null,
		position:[],
		init:function(index){
			this.position = [];
			this.sift_list = $('.sift-list').eq(index);
			this.li = this.sift_list.find('li');
			this.firstRows()
		},
		firstRows:function(){
			for(var i=0;i<2;i++){
				var l=i*this.li.eq(0).outerWidth();
				var t=0;
				this.li.eq(i).css({
					left:l,
					top:t
				})
				this.position.push({
					left:l,
					top:t+this.li.eq(i).outerHeight()
				})
			}
			this.otherRows()
		},
		otherRows:function(){
			for(var j=2;j<this.li.length;j++){
				var index=this.getminIndex()
				this.li.eq(j).css({
					left:this.position[index].left,
					top:this.position[index].top
				})
				this.position[index].top+=this.li.eq(j).outerHeight()
			}
			this.sift_list.css({
				height: this.getmax()
			});
		},
		getmax: function(){
			var max=0;
			for(var i in this.position){
				if(max<this.position[i].top){
					max=this.position[i].top;
				}
			}
			return max;
		},
		getminIndex:function(){
			var min=this.position[0].top;
			var index=0;
			for(var i in this.position){
				if(min>this.position[i].top){
					min=this.position[i].top;
					index=i;
				}
			}
			return index;
		}
	}
	
	
})
