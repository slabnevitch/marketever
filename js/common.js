$(function() {

	$('#color-select').ikSelect({
		autoWidth: true,
		onShow: function (inst) {
			
			$('.ik_select_option').addClass('ik_select_option--add-img'); //измененние вида треугольника при открвтии и закрытии
		},
		onHide: function (inst) {
			//$('.ik_select_link_text').removeClass('lk-opened'); //измененние вида треугольника при открвтии и закрытии
		}
	});

	$('#size-select').ikSelect({
		autoWidth: true,
		onShow: function (inst) {
			
			$('.ik_select_option').removeClass('ik_select_option--add-img');
		},
		onHide: function (inst) {
			
		}
	});

	var displayCar = $('#display-carousel').owlCarousel({
		items: 1

	});

	var thumbsCar = $('#thumbs-carousel').owlCarousel({
		items: 5,
		nav: true,
		//loop: true,
		URLhashListener:true,
		navText: [],
		mouseDrag: false,
		onInitialized: thumbsInit,
		onTranslated: thumbsInit
	});

	var $thumbsNav = $('#thumbs-carousel .owl-prev, #thumbs-carousel .owl-next').click(function(e) {
		//thumbsInit();
	});
	
	var $thumbsLinks = $('#thumbs-carousel .products__slideshow-thumbs-link');

	$thumbsLinks.click(function(e) {
		e.preventDefault();
		var item = $(this),
			index = $thumbsLinks.index(item);
		displayCarMoove(index);
		thumbsAddActiveClass(item);
	});

	function displayCarMoove(index) {
		console.log('вызов moove');
		//console.log(index);
		displayCar.trigger('to.owl.carousel', [index]);
	}

	var similarCar = $('#similar-carousel').owlCarousel({
		items: 5,
		loop: true,
		nav: true,
		margin: 20,
		navText: [],
		autoplay: true,
	});

	function thumbsInit() {

		var $activeItems = $('#thumbs-carousel .owl-item.active');
		$activeItems.each(function(i, elem){
    		var $item = $(elem).find('.products__slideshow-thumbs-link');
    		if(i == 2){
    			var linkIndex = $('#thumbs-carousel .products__slideshow-thumbs-link').index($item);
    			console.log('linkIndex' + linkIndex);
    			thumbsAddActiveClass($item);

    			displayCarMoove(linkIndex);
    		}
    	});
	}

	

	function thumbsAddActiveClass(item){
		item.addClass('thumbs-link-active');
		item.closest('.owl-item')
			.siblings()
			.find('.products__slideshow-thumbs-link')
			.removeClass('thumbs-link-active');
	}
	var browsedCar = $('#browsed-carousel').owlCarousel({
		items: 6,
		loop: true,
		nav: true,
		margin: 30,
		navText: [],
		autoplay: true
	});


	var $tabs = $('.tabs__link');

	$tabs.on('click', function(e) {
		e.preventDefault();
		var $th = $(this),
				$href = $th.attr('href'),
				$parent = $th.parent();
		$parent.addClass('tabs__item--active')
						.siblings()
						.removeClass('tabs__item--active');
						
		$($href).removeClass('hidden')
						.siblings()
						.addClass('hidden');
	});


	var addingProduct = function() {
		
		var i = 1,
			_self = this;
		
		this.init = function() {
			this.regListeners();
		};

		this.regListeners = function() {
			$('.product__info-plus').on('click', plusListener);
			$('.product__info-minus').on('click', minusListener);
			
		};

		function plusListener() {
			i++;
			_self.updateNum(i);
		}

		function minusListener() {
			i--;
			_self.updateNum(i);
		}

		this.updateNum = function() {
			if(i < 1){
				i = 1;

			}
			$('.product__info-num').html(i);
		}
	
	};
	
	var func = new addingProduct();
	func.init();

	$('.description__more').click(function(e) {
		e.preventDefault();
		var $tabs = $('.tabs'),
			tabsTop = $tabs.offset().top;
			
		$('html, body').animate({scrollTop: tabsTop}, 800);
	});

	//SVG Fallback
	// if(!Modernizr.svg) {
	// 	$("img[src*='svg']").attr("src", function() {
	// 		return $(this).attr("src").replace(".svg", ".png");
	// 	});
	// };

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
