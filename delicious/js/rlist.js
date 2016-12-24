var rlistObj= Object.create(homeObj)

//数据解密
 function m(e) {
    var t = (e.length & 7) + 1
      , n = "";
    for (var r = 0, i = e.length; r < i; r++)
        n += String.fromCharCode(e.charCodeAt(r) - t);
    return n = JSON.parse(n),
    n
}

rlistObj=$.extend(rlistObj, {
		name: '列表页',
		dom: $('#rlist'),
		init:function(){
			
			/*this.baidustore()
			this.meituanstore()*/
		},
		changeAddress:function(name){
			//console.log(name)
			var longitude=name.split('-')[1]
			var latitude=name.split('-')[2]
			var address=name.split('-')[3]
			var what=name.split('-')[4]
			address= decodeURI(address)
			$('.address2').html(address)
			this.longitude = longitude
			this.latitude = latitude
			this.address = address
			if(what=='elm'){
				this.elmstore()
			}
			if(what=='meituan'){
				this.meituanstore()
			}
			if(what=='baidu'){
				this.baidustore()
			}
		},
		
		elmstore:function(){
			$.ajax({
				url:'/shopping/restaurants',
				data:{
					latitude:this.latitude,
					longitude:this.longitude,
					offset:0,
					limit:20,
					extras:['activities']
				},
				success:function(result){
					//console.log(result)
					var content=""
					for(var i in result){
						var a = (result[i].image_path).substring(0,1)+'/'
						var b=(result[i].image_path).substring(1,3)+'/'
						var c=(result[i].image_path).substring(3)+'.'
						var d=(result[i].image_path).substring(32)
						var img=a+b+c+d
						//console.log(img)
						var store_name= encodeURI(result[i].name)
						content+='<li class="store-list clear"> '
								+	'<a href="#detail-'+result[i].id+'-'+store_name+'">'
								+		'<img src="//fuss10.elemecdn.com/'+img+'?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" class="store-pic l"/>'
								+		'<h3 class="store-title over">'+result[i].name+'</h3>'
								+		'<div class="store-describe">'+result[i].piecewise_agent_fee.description+'</div>'
								+	'</a>'
								+'</li>'
					}
					$('.allstore').html(content)
				}
			})
		},
		baidustore:function(){
			$.ajax({
				url:'/mobile/waimai',
				data:{
					qt:'shopsearch',
					address:this.address,
					lat:this.latitude,
					lng:this.longitude,
					page:1,
					count:20,
					display:'json'
				},
				dataType:'json',
				success:function(result){
					var data=result.result.shop_info
					var content=""
					for(var i in data){
						//console.log(data)
						content+='<li class="store-list clear"> '
								+	'<img src="'+data[i].logo_url+'" class="store-pic l"/>'
								+	'<h3 class="store-title over">'+data[i].shop_name+'</h3>'
								+	'<div class="store-describe">'+data[i].front_logistics_text+data[i].discount_info.discount_first_order_show+'</div>'
								+'</li>'
					}	
					$('.allstore').html(content)
				}
			})
		},
		meituanstore:function(){
			//美团数据获取需要传经纬度入cookie
			document.cookie = 'w_latlng='+ this.latitude.toString().replace('.', '') +',' + this.longitude.toString().replace('.', '')
			$.ajax({
				url: '/ajax/v6/poi/filter?lat='+ this.latitude+'&lng=' + this.longitude,
				data:{
					page_index:0,
					apage:1
				},
				type: 'post',
				dataType:'json',
				success:function(result){
					//console.log(result.data)
					var data=result.data
					data=m(data)
					console.log(data)
					var content=""
					for(var i in data.poilist){
						content+='<li class="store-list clear"> '
								+	'<img src="'+data.poilist[i].pic_url+'" class="store-pic l"/>'
								+	'<h3 class="store-title over">'+data.poilist[i].name+'</h3>'
								+	'<div class="store-describe">'+data.poilist[i].min_price_tip+'&nbsp;'+data.poilist[i].mt_delivery_time+'</div>'
								+'</li>'
					}
					$('.allstore').html(content)
				}
			})
		}
	})