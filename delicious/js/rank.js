var datalist = [{
	name: '北京',
	num: 1000
}, {
	name: '武汉淡淡的滴滴滴滴',
	num: 900
}, {
	name: '上海',
	num: 800
},{
	name: '上海',
	num: 700
},{
	name: '上海',
	num: 650
},{
	name: '上海',
	num: 600
},{
	name: '上海',
	num: 500
},{
	name: '上海',
	num: 500
}, {
	name: '无奈的实力开发商',
	num: 700
}]


var rankObj= Object.create(homeObj)

rankObj=$.extend(rankObj, {
		name: '排名页',
		dom: $('#rank'),

		init:function(){
			this.bindEvent()
			this.lists()
		},
		bindEvent:function(){
			this.dom.click(function(){
				console.log('rank被click')
				location.href='#citylist'
			})
		},
		lists:function(){
			var list=$('.listall')
			var str=""
			
			for(var i in datalist){
				//判断城市名大于两个字符，超出省略
				if(datalist[i].name.length > 4) {
					datalist[i].name=datalist[i].name.substring(0,2) + '...';
				}

				var offset =(10/1000) * datalist[i].num;
				//通过票数按比例计算出小车滑动轨迹的距离

				str +='<li class="list" data-offset="'+offset+'">'
					+	'<div class="rank-left l">'
					+		'<span class="city-num">'+(parseInt(i)+1)+'</span>'
					+		'<span class="city-name">'+datalist[i].name+'</span>'
					+	'</div>'
					+	'<div class="rank-right l">'
					+		'<span class="rank-bus"></span>'
					+	 	'<span class="rank-num">'+datalist[i].num+'</span>'
					+	'</div>'
					+'</li>'
			}
			list.html(str)

			//zepto 中each只遍历数组和结构简单的json数据
			setTimeout(function(){
			$(".listall li").each(function(index, elem){
			    var left=$(elem).data('offset')+'rem'
			    $(elem).find('.rank-bus').css('width', left)
			    $(elem).find('.rank-num').css('left', left)
				})
			}, 200)

		}
	})