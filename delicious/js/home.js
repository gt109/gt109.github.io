var homeObj={
	name:"首页",
	//dom:$('#home'),
	dom: $('#home'),
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		this.dom.click(function(){
			console.log('home被click')
			$('.title').addClass('moveup');
			$('.bus').addClass('moveout')
			setTimeout(function(){
				location.href = "#rank";
				$('.title').removeClass('moveup');
				$('.bus').removeClass('moveout')
			}, 1800)
		})
	},
	enter:function(){
		this.dom.show()
	},
	leave:function(){
		this.dom.hide()
	}
} 
