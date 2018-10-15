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
		$(".daily").show();
		$(".weekly").show();
	}
}).trigger("resize");

$("#bt_daily").click(function(){
	if($(window).width() < 800) {
		$(".daily").show();
		$(".weekly").hide();
		$("#bt_daily").removeClass("tab_disable").addClass("tab_active");
		$("#bt_weekly").removeClass("tab_active").addClass("tab_disable");
	}
});
$("#bt_weekly").click(function(){
	if($(window).width() < 800) {
		$(".daily").hide();
		$(".weekly").show();
		$("#bt_daily").removeClass("tab_active").addClass("tab_disable");
		$("#bt_weekly").removeClass("tab_disable").addClass("tab_active");
	}
});

/*
$(".tabs > li").click(function(){
	$(".tabs > li").removeClass("tab_active tab_disable");
	$(this).addClass("tab_active");
	$(this).siblings().addClass("tab_disable");
	if($(this).index() == 0) {
		//daily
		//$(".tabs > li").eq(0).addClass("tab_active");
		//$(".tabs > li").eq(1).addClass("tab_disable");
		$(".daily").show();
		$(".weekly").hide();
	}
	else {
		//weekly
		//$(".tabs > li").eq(0).addClass("tab_disable");
		//$(".tabs > li").eq(1).addClass("tab_active");
		$(".daily").hide();
		$(".weekly").show();
	}
});
*/


