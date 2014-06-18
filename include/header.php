<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<title>Protekhon Group - A Non-Government, Non-Profit and Non-Political Voluntary social welfare organization.</title>
    
	<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
    <script type="text/javascript">

$(document).ready(function() {		
	
	//Execute the slideShow
	slideShow();

});

function slideShow() {

	//Set the opacity of all images to 0
	$('#gallery a').css({opacity: 0.0});
	
	//Get the first image and display it (set it to full opacity)
	$('#gallery a:first').css({opacity: 1.0});
	
	//Set the caption background to semi-transparent
	$('#gallery .caption').css({opacity: 0.7});

	//Resize the width of the caption according to the image width
	$('#gallery .caption').css({width: $('#gallery a').find('img').css('width')});
	
	//Get the caption of the first image from REL attribute and display it
	$('#gallery .content').html($('#gallery a:first').find('img').attr('rel'))
	.animate({opacity: 0.7}, 400);
	
	//Call the gallery function to run the slideshow, 6000 = change to next image after 6 seconds
	setInterval('gallery()',6000);
	
}

function gallery() {
	
	//if no IMGs have the show class, grab the first image
	var current = ($('#gallery a.show')?  $('#gallery a.show') : $('#gallery a:first'));

	//Get next image, if it reached the end of the slideshow, rotate it back to the first image
	var next = ((current.next().length) ? ((current.next().hasClass('caption'))? $('#gallery a:first') :current.next()) : $('#gallery a:first'));	
	
	//Get next image caption
	var caption = next.find('img').attr('rel');	
	
	//Set the fade in effect for the next image, show class has higher z-index
	next.css({opacity: 0.0})
	.addClass('show')
	.animate({opacity: 1.0}, 1000);

	//Hide the current image
	current.animate({opacity: 0.0}, 1000)
	.removeClass('show');
	
	//Set the opacity to 0 and height to 1px
	$('#gallery .caption').animate({opacity: 0.0}, { queue:false, duration:0 }).animate({height: '1px'}, { queue:true, duration:300 });	
	
	//Animate the caption, opacity to 0.7 and heigth to 100px, a slide up effect
	$('#gallery .caption').animate({opacity: 0.7},100 ).animate({height: '100px'},500 );
	
	//Display the content
	$('#gallery .content').html(caption);
	
	
}

</script>
<style type="text/css">

.clear {
	clear:both
}

#gallery {
	position:relative;
	height:300px;
}
	#gallery a {
		float:left;
		position:absolute;
	}
	
	#gallery a img {
		border:none;
	}
	
	#gallery a.show {
		z-index:150
	}

	#gallery .caption {
		z-index:250; 
		background-color:#000; 
		color:#ffffff; 
		height:100px; 
		width:100%; 
		position:absolute;
		bottom:0;
	}

	#gallery .caption .content {
		margin:5px
	}
	
	#gallery .caption .content h3 {
		margin:0;
		padding:0;
		color:#1DCCEF;
	}
</style>
    
    
    
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico" />
	<link rel="stylesheet" href="css/reset-min.css" type="text/css" media="all" />
	<link rel="stylesheet" href="css/style.css" type="text/css" media="all" />    

	<!--[if IE 6]>
		<link rel="stylesheet" href="css/ie.css" type="text/css" media="all" />
	<![endif]-->

	<meta name="description" content="PROTEKHON Group is a non-governmental, non-profit, non-political, voluntary Social Welfare organization. It has been mainly working for socio-economic development of the poorer section of the society irrespective of creed, caste, sect and religion through livelihood skill development training, providing need based support service and bringing them in the fold of life oriented and right and need based education program. The organization was established in the year 2009. It has been working for multi-dimensional social and cultural development of the disadvantaged group of the population through active participation of stakeholders." />
	<meta name="keywords" content="PROTEKHON" />
	<meta name="author" content="Biplob Hossain, Hotline: +8801712049499, E-Mail: biplob_ice@yahoo.com" />
	<meta name="robots" content="all" />
	
	<!--[if lt IE 7]>
    	<script type="text/javascript" src="js/unitpngfix.js"></script>
	<![endif]--> 
	
	<script type="text/javascript" src="js/easySlider1.7.js"></script>
	<script type="text/javascript" src="js/custom.js"></script> <!--Only For Index-->
<!--Navigation Pages-->
	<script type="text/javascript" src="js/jquery.fancybox-1.2.1.pack.js"></script>

	<script type="text/javascript">
		$(document).ready(function(){
			// Fancy box section
			$("a.imgleft, a.imgright").fancybox(); 
		});
	</script>
<!--End-->    
<!--Navigation Menu-->
    
</head>    

<body>
	<ul id="skip" class="hide"> <!-- skip link -->
		<li><a href="#content">Skip to the content</a></li>
	</ul>

	<div id="wrapper">
		<!-- BEGIN HEADER -->
		<div id="logo">
			<img src="img/logo.png" alt="protekhon logo" />
            <a href="https://login.secureserver.net/?app=wbe" target="_blank"><img src="img/mail.png" alt="Check Mail" style="float:right; margin-right: 10 px" /></a>
			<h1>Protekhon <span class="alt">Group</span></h1>
			<p id="slogan">We Want To Keep The World More Beautiful Than We Have Got It</p>
		</div>
		<!-- END HEADER -->
		<span class="clear"></span>
		<!-- BEGIN PAGE -->	
		<div id="page">
		<!-- BEGIN NAVIGATION -->
			<div id="nav" class="col1">
<!--			<div id="smoothmenu1" class="ddsmoothmenu" > -->
				<ul>
					<li><a href="index.php">home</a></li>
					<li><a href="about-us.php">about us</a>
						<ul>
							<li><a href="founder.php">Founder</a></li>
							<li><a href="founder-message.php">Founder Message</a></li>
						</ul>
                     </li>                    
					<li><a href="programs.php">Programs</a>
						<ul>
							<li><a href="education-program.php">Education Program</a></li>
							<li><a href="health-program.php">Health Program</a></li>
							<li><a href="social-program.php">Social Program</a></li>
							<li><a href="disaster-operation.php">Disaster Operation</a></li>
						</ul>
					</li>
					<li><a href="strategy.php">Strategy</a></li>
                    <li><a href="documents.php">Documents</a></li>
                    <li><a href="gallery.php">Gallery</a></li>                    
					<li><a href="contact-us.php">contact Us</a></li>
				</ul>
			</div><!--End of smoothmenu div-->
<!--			</div><!--End of nav menu div-->			
		<!-- END NAVIGATION -->	
<!-- PLEASE INSERT THIS CODE AT THE BEGINING TO CREATE A NEW PAGE -->
		<!--
			<span class="clear"></span>

			<div id="content">
			<div id="title">
				<div class="padd20">
					<h2>About us</h2>
					<p>Praesent placerat risus quis eros</p>
				</div>
			</div>		
				
			<span class="clear"></span>

			
			<div id="content2">
			
				<div class="maincol">

					<div class="padd30">                            -->
</body>
</html>