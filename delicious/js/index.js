var config = {
	//gyf: 精确匹配， /:gyf ===>模糊匹配, 匹配的是#后面所有的字符串, 它会将
	//匹配后的结果传给我们的形参id
	'/:gyfname': function(id){
		console.log(id)
		routeController.init(id)
	}
}
var t = new Router(config);  //directer.js  兼容安卓onhashchange
t.init('home');