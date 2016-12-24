var routeController = (function(){
	var prevModule; 
	var curModule;
	var HashModuleMap={
		'home':homeObj,
		'rank':rankObj,
		'form':formObj,
		'citylist':citylistObj,
		'rlist':rlistObj,
		'detail':detailObj
	}

	var initMap = {

	}
	function initways(hashName){ //hashName为参数，其值为在index.js里调用时，传入的id值
		Module=HashModuleMap[hashName]||HashModuleMap['home']

		if(hashName.indexOf('form') !== -1) {
			Module = HashModuleMap['form'];
			Module.changeCity(hashName);
		}
		if(hashName.indexOf('rlist') !== -1) {
			Module = HashModuleMap['rlist'];
			Module.changeAddress(hashName);
		}
		if(hashName.indexOf('detail') !== -1) {
			Module = HashModuleMap['detail'];
			Module.changeStore(hashName);
		}

		prevModule=curModule
		curModule=Module
		if(prevModule){
			prevModule.leave()
		}
		curModule.enter();

		if(!initMap[hashName]) { 
			curModule.init(); //为当前模块执行init方法，进行初始化操作
			initMap[hashName] = true; 
		}
	}

	return {
		init:initways
	}



})()

