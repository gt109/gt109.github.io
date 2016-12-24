var citylistObj= Object.create(homeObj)

citylistObj=$.extend(citylistObj, {
		name: '城市选择页',
		dom: $('#citylist'),
		init:function(){
			this.baiducity();

		},
		baiducity:function(){
			var me=this
			$.ajax({
				url:'/mobile/waimai?qt=checklogin',
				type:'get',
				data:{
					qt:'confirmcity',
					pagelets:['pager'],
					t:215266
				},
				success:function(result){
					result=JSON.parse(result)
					//console.log(result.pagelets[1].html)
					var str = result.pagelets[1].html;
					citynamelist = str.match(/data-name="(.+)"/g);
					cityidlist = str.match(/data-val="(\d+)"/g);
					var baiduObj={};
					for(var i in citynamelist){
						//var cityname=citynamelist[i].split('=')[1]  //cityname外不能有引号，此法不适用
						var cityname = citynamelist[i].match(/"(.+)"/)[1];
						var cityid = cityidlist[i].match(/\d+/)[0];
						baiduObj[cityname]=cityid
					}
					window.baiduObj = baiduObj;//把baiduObj变成全局变量，可以被其他部分的使用
					me.hotcity();
					me.allcity();
				}
			})
			
		},
		hotcity:function(){
			$.ajax({
				url:'/v1/cities?type=hot',
				type:"get",
				success:function(result){
					var str="";
					for(var i in result){
						var t = encodeURI(result[i].name);
						str+='<li><a href="#form-'+ t +'-'+ result[i].id +'-'+baiduObj[result[i].name]+'">'+result[i].name+'</a></li>'
					}
					$('.hot-citylist').html(str)
				}

			})

		},
		allcity:function(){
			var me=this
			$.ajax({
				url:'/v1/cities?type=group',
				type:"get",
				success:function(result){
					var str="";
					result=me.sortObject(result);
					for(var key in result){
						(function(k){
							str+='<div class="code">'+k+'</div>'
							for(var i in result[k]){	
								var t = encodeURI(result[k][i].name);						
								str+='<span class="cities over"><a href="#form-'+t+'-'+result[k][i].id+'-'+baiduObj[result[k][i].name]+'">'+result[k][i].name+'</a></span>'
								//<a href="#form-'+ t +'-'+ data[i].id +'">'+ data[i].name +'</a>
							}
						})(key)
					}
					$('.all-citylist').html(str)
				}


			})

		},
		//字母排序封装方法
		sortObject:function(obj){
		    // 先获取所有属性名
		    var keys = [];
		    for (var key in obj){
		        keys.push(key);
		    }
		    // 排序
		    keys.sort();
		    // 导出新的对象
		    var r = {};
		    for (var i = 0; i < keys.length; i++){
		        key = keys[i];
		        r[key] = obj[key];
		    }
		    return r;
		}
	})