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
$("#modal_open").click(function(){
	$("#modal").show();
});
$("#modal_close").click(function(){
	$("#modal").hide();
});
$.ajax({
	url: "../json/city.json",
	type: "get",
	dataType: "json",
	success: function(data){
		var city = data.cities;
		var html = '';
		for(var i=0; i<city.length; i++) {
			html = '<option value="'+city[i].id+'">'+city[i].name+'</option>';
			$("#area").append(html);
		}
	},
	error:function(xhr, status, error) {
		console.log(xhr, status, error);
	}
});
$("#area").change(function(){
	var id = $(this).val();
	var city = $(this).find('option:selected').text();
	var appid = "02efdd64bdc14b279bc91d9247db4722";
	var units = "metric";
	var dt = new Date();
	var date = dt.getFullYear()+"년 "+(dt.getMonth()+1)+"월 "+dt.getDate()+"일";
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather",
		type: "get",
		dataType: "json",
		data: {
			id: id,
			appid: appid,
			units: units
		},
		success: function(data){
			$(".dl_icon").attr("src", "../img/icon/"+data.weather[0].icon+".png");
			$(".dl_area > span").html(city);
			$(".dl_date").html(date);
			$(".dl_temp").html(data.main.temp+'℃ (최고:'+data.main.temp_max+'℃ / 최저:'+data.main.temp_min+'℃)');
			$(".dl_desc").html(data.weather[0].description);
			$("#modal").hide();
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error);
		}
	});
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/forecast",
		type: "get",
		dataType: "json",
		data: {
			id: id,
			appid: appid,
			units: units
		},
		success: function(data){
			$(".weekly").empty();
			for(var i=0; i<data.cnt; i++) {
				html = '<li class="clear">';
				html+= '<img src="../img/icon/'+data.list[i].weather[0].icon+'.png" class="img wk_icon">';
				html+= '<ul>';
				html+= '<li class="wk_area">'+city+'</li>';
				html+= '<li class="wk_date">'+data.list[i].dt_txt+'</li>';
				html+= '<li class="wk_temp">'+data.list[i].main.temp+'℃</li>';
				html+= '<li class="wk_desc">'+data.list[i].weather[0].description+'</li>';
				html+= '</ul>';
				html+= '</li>';
				$(".weekly").append(html);
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error);
		}
	});
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
/*
https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=02efdd64bdc14b279bc91d9247db4722&units=metric
https://api.openweathermap.org/data/2.5/forecast?id=1835848&appid=02efdd64bdc14b279bc91d9247db4722&units=metric
*/

