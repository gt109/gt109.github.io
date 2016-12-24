var formObj= Object.create(homeObj)

formObj=$.extend(formObj, {
		name: '表单页',
		dom: $('#form'),
		init:function(){
			this.bindEvent()
		},
		bindEvent:function(){
			var me=this
			$('.elm').click(function(){
				me.elmsearch()
			})
			$('.baidu').click(function(){
				me.baidusearch()
			})
			$('.meituan').click(function(){
				me.meituansearch()
			})
		},
		changeCity: function(name){
			var cityname = name.split('-')[1] || '上海';
			var cityname = decodeURI(cityname);
			var cityid = name.split('-')[2];
			var baidu_city_id = name.split('-')[3]; //拿到百度的城市id
			$(".localcity").html(cityname);
			$(".city").html(cityname);
			this.cityid = cityid;
			this.baidu_city_id = baidu_city_id;
		},
		elmsearch:function(){
			$.ajax({
				url:'/v1/pois',
				data:{
					city_id:this.cityid||1,
					keyword:$('.search').val(),
					type:'search'
				},
				type:'get',
				success:function(result){
					var str=""
					for(var i in result){
						//console.log(result[i])
						var longitude=result[i].longitude
						var latitude=result[i].latitude 
						var address= encodeURI(result[i].address)
						//console.log(longitude)
						str+='<li class="address-list"><a href="#rlist-'+longitude+'-'+latitude+'-'+address+'-elm">'+result[i].address+'</a></li>'
					}
					$('.address').html(str)
				}
			})
		},
		baidusearch:function(){
			$.ajax({
				url:'/waimai',
				data:{
					qt:'poisug',
					wd:$('.search').val(),
					cb:'suggestion_1482413866233',
					cid: this.baidu_city_id ||289,
					b:'',
					type:0,
					newmap:1,
					ie:'utf-8'
				},
				dataType: "json",
				type:'get',
				success:function(result){
					console.log(result)
					var str=""
					for(var i in result.s){
						//console.log(result.s[i])
						var a = result.s[i].split('$')[0]
						var b = result.s[i].split('$')[1]
						var c = result.s[i].split('$')[3]
						var d = result.s[i].split('$')[5]
						var data=a+b+c
						var latitude = d.split(',')[0]
						var longitude = d.split(',')[1]
						//console.log(longitude)
						var address= encodeURI(data)
						str+='<li class="address-list"><a href="#rlist-'+longitude+'-'+latitude+'-'+address+'-baidu">'+data+'</a></li>'
					}
					$('.address').html(str)
				},
				error: function(){
					console.log('我失败了')
				}
			})
		},
		meituansearch:function(){
			$.ajax({
				url:'/v3/place/text',
				//dataType:'json',
				type:'get',
				data:{
					s:'rsv3',
					children:'',
					key:'3f3868abdb36336114bde5ab6eecdb68',
					types:'商务住宅|学校信息|生活服务|公司企业|餐饮服务|购物服务|住宿服务|交通设施服务|娱乐场所|医院类型|银行类型|风景名胜|科教文化服务|汽车服务',
					offset:10,
					city:$(".localcity").html(),
					page:1,
					language:'zh_cn',
					//callback:'nice',
					platform:'JS',
					logversion:'2.0',
					sdkversion:'1.3',
					appname:'http://i.waimai.meituan.com/shanghai?city_id=310100',
					csid:'352225E2-7A57-4744-B310-CB42B32D4DB9',
					keywords:$('.search').val()
				},
				success:function(result){
					console.log(result.pois)
					var str=''
					for(var i in result.pois){
						var a = result.pois[i].location
						var latitude = a.split(',')[1]
						var longitude = a.split(',')[0]
						//console.log(longitude)
						var data=result.pois[i].pname+result.pois[i].cityname+result.pois[i].adname+result.pois[i].address
						var address= encodeURI(data)
						str+='<li class="address-list"><a href="#rlist-'+longitude+'-'+latitude+'-'+address+'-meituan">'+data+'</a></li>'
					}
					$('.address').html(str)
				}
			})
		}
	})