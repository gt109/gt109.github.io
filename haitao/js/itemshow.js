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

$(function(){
/*图片选项卡+放大镜*/
	$('.itemCon-l-icon').eq(0).addClass('bord')
	$('.imgs').eq(0).show()
	$('.big-imgs').eq(0).show()
	var glass={
		itemCon:$('.itemCon-l-img'),
		imgBox:$('.pic'),
		imgs:$('.imgs'),
		bigimgBox:$('.big-pic'),
		bigImg:$('.big-imgs'),
		icon:$('.itemCon-l-icon'),
		filter:$('.filter'),
		add_cart:$('.add-cart'),
		init:function(){
			this.show()
			this.duiying()
			this.move()
		},
		show:function(){
			var that=this
			this.itemCon.hover(function(){
				that.bigimgBox.show()
				that.filter.show()
			},function(){
				that.bigimgBox.hide()
				that.filter.hide()
			})	
		},
		duiying:function(){
			var that =this
			this.icon.mouseenter(function(){
				$(this).addClass('bord').siblings().removeClass('bord')
				that.imgs.eq($(this).index()).show().siblings().hide()
				that.bigImg.eq($(this).index()).show().siblings().hide()
			})
		},
		move:function(){
			var that=this
			$(document).mousemove(function(e){
				var l=e.pageX-that.itemCon.offset().left-122
				var t=e.pageY-that.itemCon.offset().top-122
				l=l<0?0:(l>245)?245:l
				t=t<0?0:(t>245)?245:t
				that.filter.css({
					left:l,
					top:t
				})
				that.bigImg.css({
					left:-l*2,
					top:-t*2
				})
			})
		}	
	}
	glass.init()

/*商品加入购物车*/
	var goods={
		main:$('.itemain'),
		increase:$('.itemCon-r-increase'),
		decrease:$('.itemCon-r-decrease'),
		num:$('.itemCon-r-nub'),
		stock:$('.stock'),
		add_cart:$('.add-cart'),
		itemColor:$('.itemCon-r-color'),
		init:function(){
			this.getData()
		},
		getData:function(){
			var gid=this.main.attr('data-gid');
			var that=this
			$.getJSON('js/data.json',function(result){
				that.data=result[gid]
				that.createColor()
				that.chooseColor()
				that.increasenum()
				that.decreasenum()
				that.inputnum()
				that.addCart()
			})
		},
		createColor:function(){
			var colors=this.data.color
			var colorlist=""
			for(var key in colors){
				colorlist+='<dd data-color="'+key+'"><a>'+colors[key]+'</a></dd>'
			}
			$('.itemCon-r-color dl').append(colorlist)
			$('.itemCon-r-color dl dd').eq(0).addClass('color')
		},
		chooseColor:function(){
			$('.itemCon-r-color dl').on('click','dd',function(){
				$(this).addClass('color').siblings().removeClass('color')
			})
		},
		increasenum:function(){
			var that=this
			this.increase.click(function(){
				var amount=that.num.val()
				amount++
				if(amount>=that.stock.html()){
					amount=that.stock.html()
				}
				that.num.val(amount)
				
			})
		},
		decreasenum:function(){
			var that=this
			this.decrease.click(function(){
				var amount=that.num.val()
				amount--
				if(amount<=1){
					amount=1
				}
				that.num.val(amount)
			})
		},
		inputnum:function(){
			var that =this
			this.num.on('input',function(){
				var value=that.num.val()
				var stock=that.stock.html()
				if(value==""){
					return;
				}
				value=parseInt(value)
				if( isNaN(value)||value==0){
					that.num.val(1);
					return;
				}
				if(value>=stock){
					that.num.val(stock)
					return;
				}
				that.num.val(value)
			})
			this.num.blur(function(){
				var value = that.num.val();
				if(value == ''){
					that.num.val(1);
				}
			});
		},
		addCart:function(){
			var that =this
			this.add_cart.click(function(){
				var gid=that.main.data('gid')
				var colorId=that.itemColor.find('.color').data('color')
				var amount=parseInt(that.num.val())
				var cart = $.cookie('tb_cart')  || '{}'; 
				cart = JSON.parse( cart );
				if(!cart[colorId]){
					cart[colorId]={
						"good-id":gid,
						"color-id":colorId,
						"amount":amount
					}
				}else{
					cart[colorId].amount+=amount
				}
				$.cookie('tb_cart',JSON.stringify(cart),{expires:365,path:'/'})
				alert('成功加入购物车');
				console.log( JSON.parse( $.cookie('tb_cart') ) );
			})
		}		
	}
	goods.init()
	
	
/*商品详情选项卡*/
	$('.itempro-r-prodcon').eq(1).hide()
	$('.itempro-r-product').eq(0).addClass('bac')
	$('.itempro-r-product').click(function(){
		$(this).addClass('bac').siblings().removeClass('bac')
		$('.itempro-r-prodcon').eq($(this).index()).show().siblings().hide()
	})
})
