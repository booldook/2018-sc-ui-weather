$(window).resize(function(){
	var wid = $(this).width();
	if(wid < 800) {
		//Mobile
		$(".tabs > li").eq(0).addClass("tab_active");
		$(".tabs > li").eq(1).addClass("tab_disable");
	}
	else {
		//PC
		$(".tabs > li").removeClass("tab_active tab_disable");
	}
}).trigger("resize");

$(".tabs > .tab_disable").click(function(){
	
});