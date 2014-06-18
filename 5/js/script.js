$(function () {
	
	//Logo
	/*if (!Modernizr.svg) {
	  $(".logo img").attr("src", "images/logo.png");
	}*/
	
	//Placeholder
	$('input, textarea').placeholder();
	
	//Tooltips
	$('.navbar-social a, .social-widget a').tipsy({fade: true, gravity: 's' });
	
	var example = $('#example').superfish({
		delay:       100,
		animation:   {opacity:'show',height:'show'}
	});

	// Navbar search
	$('.navbar .navbar-toggle-search').on('click', function(){
		$(this).siblings('.navbar-search-input').toggleClass('navbar-search-open');
		$(this).toggleClass('navbar-toggle-close');
		return false;
	});

	// Popup
	$('.popup-link-video').magnificPopup({type:'iframe'});

	$('.popup-link-image').magnificPopup({
		type: 'image',
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', 
		image: {
		verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300
		}
	});

	// fitVids
	$("body").fitVids();
	
	// Scroll to top 
	$("#toTop").jTotop(); 
	
});
