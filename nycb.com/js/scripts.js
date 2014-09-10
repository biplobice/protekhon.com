// JavaScript Document

$(document).ready(function() {    
    //Events that reset and restart the timer animation when the slides change
    $("#transition-timer-carousel").on("slide.bs.carousel", function(event) {
        //The animate class gets removed so that it jumps straight back to 0%
        $(".transition-timer-carousel-progress-bar", this)
            .removeClass("animate").css("width", "0%");
    }).on("slid.bs.carousel", function(event) {
        //The slide transition finished, so re-add the animate class so that
        //the timer bar takes time to fill up
        $(".transition-timer-carousel-progress-bar", this)
            .addClass("animate").css("width", "100%");
    });
    
    //Kick off the initial slide animation when the document is ready
    $(".transition-timer-carousel-progress-bar", "#transition-timer-carousel")
        .css("width", "100%");
});



$(document).ready(function(){
     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        $('#back-to-top').tooltip('show');

});



$(document).ready(function(){
	var my_posts = $("[rel=tooltip]");

	var size = $(window).width();
	for(i=0;i<my_posts.length;i++){
		the_post = $(my_posts[i]);

		if(the_post.hasClass('invert') && size >=767 ){
			the_post.tooltip({ placement: 'left'});
			the_post.css("cursor","pointer");
		}else{
			the_post.tooltip({ placement: 'rigth'});
			the_post.css("cursor","pointer");
		}
	}
});



        $(document).ready(function(){

          var evnts = function(){
              return {
                      "event":
                          [
                               {"date":"01/01/2012","title":"1"}
                              ,{"date":"02/02/2012","title":"2"}
                              ,{"date":"03/03/2012","title":"34"}
                              ,{"date":"04/04/2012","title":"123"}
                              ,{"date":"05/05/2012","title":"223"}
                              ,{"date":"06/06/2012","title":"4"}
                              ,{"date":"07/07/2012","title":"5"}
                              ,{"date":"08/08/2012","title":"14"}
                              ,{"date":"09/09/2012","title":"10"}
                              ,{"date":"10/10/2012","title":"10"}
                              ,{"date":"11/11/2012","title":"10"}
                              ,{"date":"12/12/2012","title":"10"}
                          ]
                      }
          };

         $('#calendar').Calendar({ 'events': evnts, 'weekStart': 1 })
         /*.on('changeDay', function(event){ alert(event.day.valueOf() +'-'+ event.month.valueOf() +'-'+ event.year.valueOf() ); })
         .on('onEvent', function(event){ alert(event.day.valueOf() +'-'+ event.month.valueOf() +'-'+ event.year.valueOf() ); })
         .on('onNext', function(event){ alert("Next"); })
         .on('onPrev', function(event){ alert("Prev"); })
         .on('onCurrent', function(event){ alert("Current"); });*/
      });
