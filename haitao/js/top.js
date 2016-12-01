$(function(){
	$('.hd-input').on("input",function(){
		var value=$('.hd-input').val()
		$.ajax({
			type:'get',
			url: 'http://suggest.taobao.com/sug?code=utf-8',
			data: {
				q: value
			},
			dataType: 'jsonp', 
			success: function(data){
				getdata(data)
			}
		});
		getdata=function(data){
			$('.hd-search-con').addClass('block')
			$('.hd-search-con').children().empty()
			for(var key in data.result){
				var li=$('<li class="item-search"></li>')
				li.html(data.result[key][0])
				$('.hd-search-con .h-cookie-list').append(li)
			}
			if($('.hd-input').val().length==0){
				$('.hd-search-con').removeClass('block')
			}
		}
	})

	$('.hd-input').click(function(){
		$('.hd-search-con').addClass('block')
	})
	$('.hd-input').blur(function(){
		$('.hd-search-con').removeClass('block')
	})
})
