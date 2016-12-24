var detailObj= Object.create(homeObj)

detailObj=$.extend(detailObj, {
		name: '详情页',
		dom: $('#detail'),

		init:function(){
			this.elm()
			this.bindEvent()
		},
		changeStore:function(name){	
			var id=name.split('-')[1]
			var store_name=name.split('-')[2]
			store_name=decodeURI(store_name)
			$('.store-name').html(store_name)
			this.id=id
		},
		bindEvent: function(){
			console.log(3232323)
			$(".con-left").on('click', '.left-list', function(){
				var selector = '[data-title="'+ this.textContent +'"]';

				var element = $(selector).get(0);
				detailObj.rightScroll.scrollToElement(element, 500);

				$(this).addClass('active');
				$(this).siblings().removeClass('active');
			})

			/*$('.right-list').on('click', '.plus', function(event){
				console.log('我执行了加法');
				var t = +this.previousElementSibling.innerHTML;
				t++;
				this.previousElementSibling.innerHTML = t;
			})*/
		},
		/*bindEvent: function(){
			console.log(3232323)
			$(".con-left").on('click', '.left-list', function(){
				//var selector = '[data-title="'+ this.textContent +'"]';//属性选择器
				var element = $('div[data-title="'+ this.textContent +'"]');
				console.log(element)
				var t=element.offset().top
				console.log(t)
				$('.con-right').css({
					marginTop:-64
				})
				//detailObj.rightScroll.scrollToElement(element, 500);

				//$(this).addClass('active');
				//$(this).siblings().removeClass('active');
			})

			//$('.right-list').on('click', '.plus', function(event){
			//	console.log('我执行了加法');
			//	var t = +this.previousElementSibling.innerHTML;
			//	t++;
			//	this.previousElementSibling.innerHTML = t;
			//})
		},*/
		elm:function(){
			var me =this
			$.ajax({
				url:'/shopping/v1/menu?restaurant_id='+this.id,
				type:'get',
				success:function(result){
					//console.log(result)
					var nav=""
					var content=""
					for(var i in result){
						nav+='<li class="left-list over">'+result[i].name+'</li>'
						content+='<div data-title="'+result[i].name+'" class="little-title">'+result[i].name+'</div>'
						var data=result[i].foods
						for(var j in data){
							var img_path=data[j].image_path
							var a = img_path.substring(0,1)+'/'
							var b= img_path.substring(1,3)+'/'
							var c= img_path.substring(3)+'.'
							var d= img_path.substring(32)
							var img=a+b+c+d
							console.log()
							content+='<div class="right-list clear"> '
									+		'<img src="//fuss10.elemecdn.com/'+img+'?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" class="detail-pic l"/>'
									+		'<h3 class="detail-title over">'+data[j].name+'</h3>'
									+		'<div class="detail-tips">'+data[j].tips+'</div>'
									+        '<div class="clear">'
									+			'<div class="detail-price l">￥'+data[j].specfoods[0].price+'</div>'
									+			'<div class="l">'
									+				'<span class="decrease">-</span>'
									+				'<span class="num">1</span>'
									+				'<span class="increase">+</span>'
									+ 			'</div>'
									+		'</div>'
									+'</div>'
						}
					}
					$('.con-left').html(nav)
					$('.con-right').html(content)
					if(me.leftScroll && me.rightScroll) {
						me.leftScroll.destroy(); //破环掉
						me.rightScroll.destroy(); //破环掉
					}
					me.leftScroll = new IScroll('.con-left', {
						 scrollbars: true,
						 preventDefault: false //防止阻止事件
					});

					me.rightScroll = new IScroll('.contents', {
						 scrollbars: true,
						 preventDefault:false
					});					
				}


			})
		}
})