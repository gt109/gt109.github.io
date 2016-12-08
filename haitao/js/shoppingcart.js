$(function(){
	$('.head').load('top.html',function(){
		$.getScript('js/top.js');
	});
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js');
	});


})

$(function(){
	var cart={
		cartCon:$('.cart-content'),
		data:null,
		cart:{},
		pay:{},
		
		init:function(){
			this.readCookie()
			var that=this
			$.getJSON('js/data.json?key='+Math.random(),function(data){
				that.data=data
				for(var key in that.cart){
					(function(k){
						var ul = $('<ul class="cart-goods-item clear"></ul>');
						ul.load('goodsInfo.html?key='+Math.random(),function(){
							//获取商品id
							var gid = that.cart[k]['good-id'];
							ul.attr({
								'data-gid': gid,
								'data-color': k
							});
							//信息填充
							ul.find('.color-type').html( data[gid]['color'][k]);
							ul.find('.goods-img').html( data[gid]['imgs'][k]);
							ul.find('.goods-price').html( data[gid]['goods-sale'].toFixed(2));
							ul.find('.amount-input').val( that.cart[k].amount );
							var total = that.cart[k].amount * data[gid]['goods-sale'];
							ul.find('.goods-money').html( total.toFixed(2) );
							//追加到商品区
							that.cartCon.append(ul);
						});
					})(key);
				}
			})
			this.increase();
			this.decrease();
			this.inputnub();
			this.remove();
			this.selectAll();
		},
		
		increase:function(){
			var that=this
			this.cartCon.on('click','.amount-increase',function(){
				var amount=$(this).prev().val()
				var gid = $(this).parents('.cart-goods-item').data('gid');
				var stock=that.data[gid]['stock']
				if(amount>=stock){
					return;
				}
				amount++
				$(this).prev().val(amount)
				that.handleCookie($(this).prev())
			})
		},
		decrease:function(){
			var that=this
			this.cartCon.on('click','.amount-decrease',function(){
				var amount=$(this).next().val()
				var gid = $(this).parents('.cart-goods-item').data('gid');
				if(amount<=1){
					return;
				}
				amount--
				$(this).next().val(amount)
				that.handleCookie($(this).next())
			})
		},
		inputnub:function(){
			var that=this
			this.cartCon.on('input','.amount-input',function(){
				var amount=$(this).val()
				var gid = $(this).parents('.cart-goods-item').data('gid');
				var stock=that.data[gid]['stock']
				console.log(amount)
				console.log(stock)
				amount=parseInt(amount)
				if(amount>=stock){
					$(this).val(stock)
					return;
				}
				if(isNaN(amount)||amount==0){
					$(this).val(1)
				}else{
					$(this).val(amount)
				}
				that.handleCookie($(this))
				
			})
		},
		add:function(){
			var cart = $.cookie('tb_cart') || '{}';
			cart = JSON.parse( cart );
			var amount=0;
			for(var key in cart){
				amount++
			}
			$('.count').html(amount)
		},
		
		handleCookie:function(input){
			var goodsItem = input.parents('.cart-goods-item');
			var colorId = goodsItem.data('color');
			var price=parseFloat(goodsItem.find('.goods-price').html())
			var totalmoney=goodsItem.find('.goods-money')
			var totalprice=(price*parseInt(input.val())).toFixed(2)
			totalmoney.html(totalprice)
			this.cart[colorId].amount=parseInt(input.val())
			this.setCookie()
			if(goodsItem.find('input[type="checkbox"]').prop('checked')){
				//改变pay对象里面当前商品的总价
				this.pay[colorId] = totalprice;
				this.handlePay();
			}
		},
		remove:function(){
			var that=this
			this.cartCon.on('click','.td-option',function(){
				if(confirm("确定删除商品吗？")){
					$(this).parents('.cart-goods-item').remove()
					var color= $(this).parents('.cart-goods-item').data('color')
					delete that.cart[color]
					that.setCookie()
					delete that.pay[color];
					that.handlePay();
					that.add()
				}
			})
		},
		selectAll:function(){
			var that=this
			$('.total-check').click(function(){
				var cartgoods=$(".cart-goods-item")
				var colorId = that.cartCon.find('.cart-goods-item').data('color');
				console.log(colorId)
				var total = that.cartCon.find('.goods-money').html();
				if($(this).prop('checked')){
					$('.td-checkbox').find('input').prop('checked',true)
				}else{
					$('.td-checkbox').find('input').prop('checked',false)
				}
				$('.td-checkbox input').change();
			})
			this.cartCon.on('change','.td-checkbox input[type="checkbox"]',function(){
				var goodsItem = $(this).parents('.cart-goods-item');
				var colorId = goodsItem.data('color');
				var total = goodsItem.find('.goods-money').html();
				//如果已经存在，再点击取消（pay里面加数据）
				if(that.pay[colorId]){
					delete that.pay[colorId];
				}else{
					that.pay[colorId] = total;
				}
				var input=that.cartCon.find('input[type="checkbox"]')
				var allChecked = that.cartCon.find('input[type="checkbox"]:checked');
				if(input.length==allChecked.length){
					$('.total-check').prop('checked',true)
				}else{
					$('.total-check').prop('checked',false)
				}
				that.handlePay()
				
			})
			
		},
		handlePay: function(){
			var goodsAmount = $('.goods-sum');
			var goodsMoney = $('.pay-amount');
			var goodsPay=$('.goods-amount')
			var goPay = $('.btnPay');
			//遍历pay对象，获取件数和总价
			var totalNum = 0;
			var totalMoney = 0;
			console.log(this.pay)
			for(var key in this.pay){
				totalNum++;
				totalMoney += parseFloat(this.pay[key]);
			}
			goodsAmount.html(totalNum);
			goodsMoney.html(totalMoney.toFixed(2));
			goodsPay.html(totalMoney.toFixed(2));
		},
		setCookie: function(){
			$.cookie('tb_cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		},
		readCookie:function(){
			this.cart = $.cookie('tb_cart') || '{}';
			this.cart = JSON.parse( this.cart );
		}
		
	}
	cart.init()
	
	
})
