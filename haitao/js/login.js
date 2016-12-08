$(function(){
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js');
	});

})

$(function(){
/*登录选项卡*/
	$('.login_nav li').eq(0).addClass('current')
	$('.login-item').eq(0).show()
	$('.login_nav li').click(function(){
		$(this).addClass('current').siblings().removeClass('current')
		$('.login-item').eq($(this).index()).show().siblings().hide()
	})

/*登录账号（手机号）验证*/
	$('.control-group .userphone').focus(function(){
		$(this).parent().removeClass('red').addClass('border')
		$(this).next().hide()
	})
	$('.control-group .userphone').blur(function(){
		var value=$(this).val()
		var reg=/^1(3|4|5|7|8)\d{9}$/
		if(value.length==0){
			$(this).parent().removeClass('border').addClass('red')
			$(this).next().show()
			$(this).next().find('i').html('请输入手机号码')
			return;
		}
		if(value.length!=0){
			if(reg.test(value)){
				$(this).parent().removeClass('border')
				return;
			}
			if(!reg.test(value)){
				$(this).parent().removeClass('border').addClass('red')
				$(this).next().show()
				$(this).next().find('i').html('手机格式有误，请重新输入')
				return;
			}
		}
	})
/*登录密码验证*/
	$('.control-group .password').focus(function(){
		$(this).parent().removeClass('red').addClass('border')
		$(this).next().hide()
	})
	$('.control-group .password').blur(function(){
		var value=$(this).val()
		if(value.length==0){
			$(this).parent().removeClass('border').addClass('red')
			$(this).next().show()
			$(this).next().find('i').html('请输入密码')
			return;
		}
		if(value.length!=0){
			$(this).parent().removeClass('border')
			return;
		}
	})
/*登录验证码验证*/
	$('.control-group .check-code').focus(function(){
		$(this).parent().removeClass('red').addClass('border')
		$(this).next().hide()
	})
	$('.control-group .check-code').blur(function(){
		var value=$(this).val()
		if(value.length==0){
			$(this).parent().removeClass('border').addClass('red')
			$(this).next().show()
			$(this).next().find('i').html('请输入验证码')
			return;
		}
		if(value.length!=0){
			$(this).parent().removeClass('border')
			return;
		}
	})
	
	$('.control-group .check-message').focus(function(){
		$(this).parent().removeClass('red').addClass('border')
		$(this).next().hide()
	})
	$('.control-group .check-message').blur(function(){
		var value=$(this).val()
		if(value.length==0){
			$(this).parent().removeClass('border').addClass('red')
			$(this).next().show()
			$(this).next().find('i').html('请输入短信验证码')
			return;
		}
		if(value.length!=0){
			$(this).parent().removeClass('border')
			return;
		}
	})
	
	$('.code2').click(function(){
		var str="0123456789"
		var nub=""
		for(i=0;i<4;i++){
			var index=parseInt(Math.random()*10)
			nub+=str[index]
		}
		$(this).html(nub)				
	})
/*密码登录*/	
	$('.login-one .control_btn .control-btn').click(function(){
		var tel=$('.login-one .control-group .userphone').val()
		var user = $.cookie('users') || '{}';
		user = JSON.parse( user );
		if(user[tel]['telephone']==tel
					&&
			user[tel]['password']==$('.control-group .password').val()
			){
			$('.control_btn a').attr({href:"index2.html"})
		}else{
			$('.control-group .password').next().show()
			$('.control-group .password').next().find('i').html('账号或密码错误')
		}
	})
/*验证码登录*/
	$('.login-two .control_btn .control-btn').click(function(){
		var reg=/^\d{6}$/
		var tel=$('.login-two .control-group .userphone').val()
		var user = $.cookie('users') || '{}';
		user = JSON.parse( user );
		if($('.code2').html()==$('.check-code').val()
					&&
			reg.test($('.check-message').val())
					&&
			user[tel]['telephone']==tel
			){
			$('.login-two .control_btn a').attr({href:"index2.html"})
		}else{
			$('.login-two .control-group .check-message').next().show()
			$('.login-two .control-group .check-message').next().find('i').html('验证码或短信验证码有误')
		}
	})
})
