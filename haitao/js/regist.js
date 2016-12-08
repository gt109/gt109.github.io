$(function(){
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js');
	});

})

$(function(){
/*注册账号（手机号）验证*/
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
				$('.code').click(function(){
					$('.control_btn .control-btn').addClass('next')
				})
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
/*注册验证码验证*/
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
	
/*注册昵称验证*/
	
	$('.control-group .username').focus(function(){
		$(this).parent().removeClass('red').addClass('border')
		$(this).next().hide()
	})
	$('.control-group .username').blur(function(){
		var value=$(this).val()
		var reg1=/^[\u4e00-\u9fa5|\w|_|@|-]{2,20}$/
		if(value.length==0){
			$(this).parent().removeClass('border').addClass('red')
			$(this).next().show()
			$(this).next().find('i').html('请输入昵称')
			return;
		}
		if(value.length!=0){
			if(value.length<2||value.length>20){
				$(this).parent().removeClass('border').addClass('red')
				$(this).next().show()
				$(this).next().find('i').html('2-20个字符，支持中文字母数字及“_”、“-”、“@”组合')
				return;
			}
			if(reg1.test(value)){
				$(this).parent().removeClass('border')
			}else{
				$(this).parent().removeClass('border').addClass('red')
				$(this).next().show()
				$(this).next().find('i').html('2-20个字符，支持中文字母数字及“_”、“-”、“@”组合')
			}
		}
	})
	
/*注册密码验证*/
	$('.control-group .password').focus(function(){
		$(this).parents('.control-groups').removeClass('red').addClass('border')
		$(this).parent().next().find('.error').hide()
	})
	$('.control-group .password').blur(function(){
		var value=$(this).val()
		var reg2=/^[\w]{6,20}$/
		if(value.length==0){
			$(this).parents('.control-groups').removeClass('border').addClass('red')
			$(this).parent().next().find('.error').show()
			$(this).parent().next().find('i').html('请输入密码')
			return;
		}
		if(value.length!=0){
			if(value.length<6||value.length>20){
				$(this).parents('.control-groups').removeClass('border').addClass('red')
				$(this).parent().next().find('.error').show()
				$(this).parent().next().find('i').html('请输入6-20位字母、数字或字符')
				return;
			}
			if(reg2.test(value)){
				$(this).parents('.control-groups').removeClass('border')
			}else{
				$(this).parents('.control-groups').removeClass('border').addClass('red')
				$(this).parent().next().find('.error').show()
				$(this).parent().next().find('i').html('请输入6-20位字母、数字或字符')
			}
		}
	})
	$('.control-group .check-password').focus(function(){
		$(this).parents('.control-groups').removeClass('red').addClass('border')
		$(this).next().hide()
	})
	$('.control-group .check-password').blur(function(){
		var value=$(this).val()
		if(value.length==0){
			$(this).parents('.control-groups').removeClass('border').addClass('red')
			$(this).next().show()
			$(this).next().find('i').html('确认密码不能为空')
			return;
		}
		if(value.length!=0){
			if(value==$('.control-group .password').val()){
				$(this).parents('.control-groups').removeClass('border')
			}else{
				$(this).parents('.control-groups').removeClass('border').addClass('red')
				$(this).next().show()
				$(this).next().find('i').html('密码输入不一致！')
			}
		}
	})
/*下一步*/
	$('.code2').click(function(){
		var str="0123456789"
		var nub=""
		for(i=0;i<4;i++){
			var index=parseInt(Math.random()*10)
			nub+=str[index]
		}
		$(this).html(nub)				
	})
	$('.control_btn .control-btn').click(function(){
		var reg=/^\d{6}$/
		if($('.code2').html()==$('.check-code').val()&&reg.test($('.check-message').val())){
			$('.regist-one').hide()
			$('.regist-two').show()
		}else{
			$('.control-group .check-message').next().show()
			$('.control-group .check-message').next().find('i').html('验证码或短信验证码有误')
		}
	})
	
/*注册*/
	$('.controlBtn .control-btn').click(function(){
		var reg1=/^[\u4e00-\u9fa5|\w|_|@|-]{2,20}$/
		var reg2=/^[\w]{6,20}$/
		if(reg2.test($('.control-group .password').val())
				&&
		$('.control-group .check-password').val()==$('.control-group .password').val()
				&&
		reg1.test($('.control-group .username').val())
				&&
		$('.control-cho input').prop('checked')
		){
			alert("注册成功")
		}
		if(!$('.control-cho input').prop('checked')){
			alert('请确认《嗨淘会员注册协议》')
		}
		var tel=$('.control-group .userphone').val()
		var username=$('.control-group .username').val()
		var passw=$('.control-group .password').val()
		var user=$.cookie('users')||'{}'
		user=JSON.parse( user )
		user[tel]={
			'telephone':tel,
			'username':username,
			'password':passw
		}
		$.cookie('users',JSON.stringify(user),{expires:365,path:'/'})
		//$.removeCookie('user')
		console.log( JSON.parse( $.cookie('users') ) );
	})
	
})
