$(document).ready(function(){

		  //smooth scroll for page
	// $(function(){
	// 	var $window = $(window);		//Window object
	// 	var scrollTime = 1.2;			//Scroll time
	// 	var scrollDistance = 100;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
	// 	$window.on("mousewheel DOMMouseScroll", function(event){
	// 		event.preventDefault();	
	// 		var delta = event.originalEvent.wheelDelta/60 || -event.originalEvent.detail/3;
	// 		var scrollTop = $window.scrollTop();
	// 		var finalScroll = scrollTop - parseInt(delta*scrollDistance);
	// 		TweenMax.to($window, scrollTime, {
	// 			scrollTo : { y: finalScroll, autoKill:true },
	// 				ease: Power1.easeOut,	//For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
	// 				autoKill: true,
	// 				overwrite: 1				
	// 			});
	// 	});
	// });


	// header_slider
	$('.header_slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1
	});

	// partners_slider
	$('.partners_slider').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 1,
		prevArrow: '<div class="prev_arrow"><svg width="13px" height="22px" viewBox="0 0 13 22"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-1234.000000, -4569.000000)" stroke-width="3" stroke="#404040"><g transform="translate(0.000000, 4551.000000)"><g transform="translate(109.000000, 0.000000)"><g transform="translate(1108.000000, 2.000000)"><polyline points="27.6209869 36 19 26.7405693 27.6209869 17.4811385"></polyline></g></g></g></g></g></svg></div>',
		nextArrow: '<div class="next_arrow"><svg width="13px" height="22px" viewBox="0 0 13 22"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-1300.000000, -4569.000000)" stroke="#404040" stroke-width="3"><g transform="translate(0.000000, 4551.000000)"><g transform="translate(109.000000, 0.000000)"><g transform="translate(1108.000000, 2.000000)"><polyline transform="translate(89.689507, 26.740569) scale(-1, 1) translate(-89.689507, -26.740569) " points="94 36 85.3790131 26.7405693 94 17.4811385"></polyline></g></g></g></g></g></svg></div>'
	});

	// map list toggle
	function toggleClass(elem) {
		elem.on("click", function(e){
			e.preventDefault();
			$(this).toggleClass("active");
			$("" + $(this).attr("href")).slideToggle();
		});
	}
	toggleClass($("#selected_city"));



// counter distance
// ////////////////////////////////
function counterControl( target , number , config ){
	var _target = target;
	var number = number.toString();
	var numArray = number.split("");
	var isBg = false;
	var defaults = {
		speed: 2000,
		isDigitBg: false,
		comma: true
	}
	$.extend(defaults, config);

	_target.empty();
	_target.html('<span class="pplNum"></span>');

	for(var i=0; i<numArray.length; i++) { 
		var html = '';
		numArray[i] = parseInt(numArray[i], 10);
		if( defaults.isDigitBg ){
			html = '<span class="digit-con"><span class="digit'+i+'"></span></span>';
		}else{
			html = '<span class="digit-con"><span class="digit'+i+'">0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br></span></span>';
		}
		_target.find('.pplNum').append(html);	
	}

	if( defaults.comma ){
		_target.find(".digit-con:nth-last-child(3n+4)").after("<span class='comma'>&nbsp;</a>");
	}

	checkScroll();

	$(window).bind('scroll', function(){
		checkScroll();
	});

	function checkScroll(){
		if( _target.offset().top < $(window).scrollTop() + $(window).height() ){
			for(var i=0; i<numArray.length; i++) {
				var increment = _target.find('.digit-con').outerHeight();
				_target.find('.digit'+i).delay(i*300).animate({top: -( (increment * numArray[i]) + (increment*10) )}, defaults.speed , 'linear');
			}
		}
	}
}

var counter_cars = $('#count_cars').data('cars_count');
var count_mln = $('#count_mln').data('coverage_area');
var count_weight = $('#count_weight').data('goods_count');

counterControl( $('#count_cars') , counter_cars);
counterControl( $('#count_mln') , count_mln);
counterControl( $('#count_weight') , count_weight);


function counter( target , number , config ){
	var _target = target;
	var num = number.toString();
	var numArray = num.split("");
	var isBg = false;
	var defaults = {
		isDigitBg: false,
		comma: true
	}
	$.extend(defaults, config);

	_target.empty();
	_target.html('<span class="pplNum"></span>');

	for(var i=0; i<numArray.length; i++) { 
		var html = '';
		numArray[i] = parseInt(numArray[i], 10);
		if( defaults.isDigitBg ){
			html = '<span class="digit-con"><span class="digit'+i+'"></span></span>';
		}else{
			html = '<span class="digit-con"><span class="digit'+i+'">0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br></span></span>';
		}
		_target.find('.pplNum').append(html);	
	}

	if( defaults.comma ){
		_target.find(".digit-con:nth-last-child(3n+4)").after("<span class='comma'>&nbsp;</a>");
	}
}

function distaceMeter(date) {
	var date = new Date(date).getTime()/1000;
	var now = new Date().getTime()/1000;
	var start_val = +$("#count_km").text().replace(/\D+/g,"");
	var difference = now - date;
	var result = Math.round(difference) * 0.29;
	var VALUE = Math.round(start_val + result);

	counter($("#count_km"), VALUE)

	var increment = $("#count_km").find('.digit-con').innerHeight();

	var a = VALUE.toString();
	var b = a.split("");

	for (var j = 0; j < b.length; j++) {
		var r = +b[j];
		$("#count_km").find('.digit'+j).animate({top: -((increment * r) + (increment*10)) }, 2000 , 'linear');
	}

	var arr = [];
	setTimeout(function(){
		setInterval(function(){	
			var newResult = "" + Math.round(VALUE += .29);
			var number = newResult.toString();
			var numArray = newResult.split("");
			arr.push(numArray);
			var prevVal = arr[arr.length - 2];
			for (var i = 0; i < numArray.length && i < prevVal.length; i++) {
				if (+numArray[i] != +prevVal[i] && prevVal != undefined) {
					var n = +numArray[i];
					$("#count_km").find('.digit'+i).animate({top: -((increment * n) + (increment*10)) }, 1000 , 'linear');
				}
			}
		}, 1000);		
	}, 2000);
}

distaceMeter('Mon Oct 16 2017 09:51:59 GMT+0300 (EEST)');
	// ////////////////////////////////

	$(document).on('scroll', function(){
		if ($(window).scrollTop() >= $(".advantages").offset().top - $(window).height()) {
			$(function() {
				$.each($(".advantages_box"), function(i, el) {
					setTimeout(function() {
						$(el).addClass("animated fadeInDown");
					}, 200 + (i * 200));
				});
			});
		} else {
			$(".advantages_box").removeClass("animated fadeInDown");
		}

		// scroll video
		if ($(window).scrollTop() > $(".service_info").offset().top - $(window).outerHeight() + $(".service_info").outerHeight()) {
			$(".service_info-content").addClass("active");

			// video
			var vid = document.getElementById('service_video');
			// остановка видео при загрузке
			vid.pause();
			// Пошаговое воспроизведение видео при прокрутке страницы
			$(".service_info-content").on('scroll', function(){
				vid.pause();
			});
			// Обновления видеокадров для плавного воспроизведения при прокрутке
			setInterval(function(){
				vid.currentTime = -($(".service_info-content_container").position().top)/100;
			}, 40);
		} else {
			$(".service_info-content").removeClass("active");
		}

	});


	// regions
	$('.regions_tabs a').on('click', function(e){
		e.preventDefault();
		var t = $(this);
		$('.regions_tabs a').removeClass("active");
		t.addClass("active");
		$(".regions_content-list").hide();
		$(".regions_content-title").removeClass("active");
		$(".regions_content-map").addClass("active");
		var list = $("" + t.attr("href"));
		list.fadeIn();
		var title = $("#" + list.data('title'));
		title.addClass("active");
		var imgSrc = t.data('source');
		$('#regions_map').attr("src", imgSrc);
	});

	// paroller initialize
	$(window).paroller();

	// parallax on hover
	$('body').parallax({
		'elements': [
		{
			'selector': '.mountains',
			'properties': {
				'x': {
					'background-position-x': {
						'initial': 0,
						'multiplier': 0.2,
						'invert': false
					}
				}
			}
		}
		]
	});


	// service section
	$(".service_form-box input").focus(function(){
		$(this).closest('.service_form-box').find("label").addClass('active');
	});

	$(".service_form-box input").blur(function(){
		if (!$(this).val()) {
			$(this).closest('.service_form-box').find("label").removeClass('active');
		}
	});

	$('.service_info-slider').slick({
		centerMode: true,
		slidesToShow: 3,
		prevArrow: '<div class="prev_arrow"><svg width="13px" height="22px" viewBox="0 0 13 22"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-1234.000000, -4569.000000)" stroke-width="3" stroke="#404040"><g transform="translate(0.000000, 4551.000000)"><g transform="translate(109.000000, 0.000000)"><g transform="translate(1108.000000, 2.000000)"><polyline points="27.6209869 36 19 26.7405693 27.6209869 17.4811385"></polyline></g></g></g></g></g></svg></div>',
		nextArrow: '<div class="next_arrow"><svg width="13px" height="22px" viewBox="0 0 13 22"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(-1300.000000, -4569.000000)" stroke="#404040" stroke-width="3"><g transform="translate(0.000000, 4551.000000)"><g transform="translate(109.000000, 0.000000)"><g transform="translate(1108.000000, 2.000000)"><polyline transform="translate(89.689507, 26.740569) scale(-1, 1) translate(-89.689507, -26.740569) " points="94 36 85.3790131 26.7405693 94 17.4811385"></polyline></g></g></g></g></g></svg></div>'
	});

	// manual box lines
	var roadWidth = $('.regions_track').width();
	var firstStep = roadWidth/4;
	var secondStep = (roadWidth/4) * 2;
	var thirdStep = (roadWidth/4) * 3;
	var fourthStep = roadWidth;


	$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
		delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
		var positionCar = $('.regions_track .car').offset().left + 	$('.regions_track .car').width();
		console.log(positionCar);
		if (delta >= 0) {
			if (positionCar < fourthStep && positionCar > thirdStep) {
				$("#fifth_box").removeClass("active");
			} else if (positionCar < thirdStep && positionCar > secondStep) {
				$("#fourth_box").removeClass("active");
			} else if (positionCar < secondStep && positionCar > firstStep) {
				$("#third_box").removeClass("active");
			} else if (positionCar < firstStep && positionCar > 0) {
				$("#second_box").removeClass("active");
			} else if (positionCar < 100) {
				$("#first_box").removeClass("active");
			}
		} else {
			if (positionCar > 100 && positionCar < firstStep) {
				$("#first_box").addClass("active");
			} else if (positionCar > firstStep && positionCar < secondStep) {
				$("#second_box").addClass("active");
			} else if (positionCar > secondStep && positionCar < thirdStep) {
				$("#third_box").addClass("active");
			} else if (positionCar > thirdStep && positionCar < fourthStep) {
				$("#fourth_box").addClass("active");
			} else if (positionCar > fourthStep) {
				$("#fifth_box").addClass("active");
			}
		}
	});

		/*-------Show product count*/
	    $('.regions_content-title').find('b').each(function(index, el) {
	    	var count = parseInt( $(this).text() );
	    	var text = declOfNum(count, ['регион', 'региона', 'регионов']);
	    	$(this).closest('.regions_content-title').find('.txt__title').text(text);
	    });

	// $(document).on("scroll", function(){
		
	// 	if (positionCar > 0 && positionCar < firstStep) {
	// 		$("#first_box").addClass("active");
	// 	} else if (positionCar > firstStep && positionCar < secondStep) {
	// 		$("#second_box").addClass("active");
	// 	} else if (positionCar > secondStep && positionCar < thirdStep) {
	// 		$("#third_box").addClass("active");
	// 	} else if (positionCar > thirdStep && positionCar < fourthStep) {
	// 		$("#fourth_box").addClass("active");
	// 	} else if (positionCar > fourthStep) {
	// 		$("#fifth_box").addClass("active");
	// 	} else if (positionCar < fourthStep && positionCar > thirdStep) {
	// 		$("#fifth_box").removeClass("active");
	// 	} else if (positionCar < thirdStep && positionCar > secondStep) {
	// 		$("#fourth_box").removeClass("active");
	// 	} else if (positionCar < secondStep && positionCar > firstStep) {
	// 		$("#third_box").removeClass("active");
	// 	} else if (positionCar < firstStep && positionCar > 0) {
	// 		$("#second_box").removeClass("active");
	// 	} else if (positionCar < 0) {
	// 		$("#first_box").removeClass("active");
	// 	}
	// });

});

 function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}