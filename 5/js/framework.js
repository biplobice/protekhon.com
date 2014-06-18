/*
0. Offcanvas
1. Flexslider
2. Mobile menu
3. Accordion
4. Flickr
5. Instagram
6. fitVids
7. PlaceHolder
8. Tipsy
9. Scroll to top
*/

/** 0. Offcanvas
================================================== **/
(function(e,t,n){"use strict";var r=e.UIkit||{},i=e("html"),s=e(window);if(r.fn){return}r.version="2.0.0";r.fn=function(t,n){var i=arguments,s=t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),o=s[1],u=s[2];if(!r[o]){e.error("UIkit component ["+o+"] does not exist.");return this}return this.each(function(){var t=e(this),s=t.data(o);if(!s)t.data(o,s=new r[o](this,u?undefined:n));if(u)s[u].apply(s,Array.prototype.slice.call(i,1))})};r.support={};r.support.transition=function(){var e=function(){var e=t.body||t.documentElement,n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},r;for(r in n){if(e.style[r]!==undefined){return n[r]}}}();return e&&{end:e}}();r.support.requestAnimationFrame=n.requestAnimationFrame||n.webkitRequestAnimationFrame||n.mozRequestAnimationFrame||n.msRequestAnimationFrame||n.oRequestAnimationFrame||function(e){n.setTimeout(e,1e3/60)};r.support.touch="ontouchstart"in window||n.DocumentTouch&&document instanceof n.DocumentTouch||n.navigator["msPointerEnabled"]&&n.navigator["msMaxTouchPoints"]>0||false;r.support.mutationobserver=n.MutationObserver||n.WebKitMutationObserver||n.MozMutationObserver||null;r.Utils={};r.Utils.debounce=function(e,t,n){var r;return function(){var i=this,s=arguments;var o=function(){r=null;if(!n)e.apply(i,s)};var u=n&&!r;clearTimeout(r);r=setTimeout(o,t);if(u)e.apply(i,s)}};r.Utils.removeCssRules=function(e){var t,n,r,i,s,o,u,a,f,l;if(!e)return;setTimeout(function(){try{l=document.styleSheets;for(i=0,u=l.length;i<u;i++){r=l[i];n=[];r.cssRules=r.cssRules;for(t=s=0,a=r.cssRules.length;s<a;t=++s){if(r.cssRules[t].type===CSSRule.STYLE_RULE&&e.test(r.cssRules[t].selectorText)){n.unshift(t)}}for(o=0,f=n.length;o<f;o++){r.deleteRule(n[o])}}}catch(c){}},0)};r.Utils.isInView=function(t,n){var r=e(t);if(!r.is(":visible")){return false}var i=s.scrollLeft(),o=s.scrollTop(),u=r.offset(),a=u.left,f=u.top;n=e.extend({topoffset:0,leftoffset:0},n);if(f+r.height()>=o&&f-n.topoffset<=o+s.height()&&a+r.width()>=i&&a-n.leftoffset<=i+s.width()){return true}else{return false}};r.Utils.options=function(t){if(e.isPlainObject(t))return t;var n=t?t.indexOf("{"):-1,r={};if(n!=-1){try{r=(new Function("","var json = "+t.substr(n)+"; return JSON.parse(JSON.stringify(json));"))()}catch(i){}}return r};r.Utils.events={};r.Utils.events.click=r.support.touch?"tap":"click";e.UIkit=r;e.fn.uk=r.fn;e.UIkit.langdirection=i.attr("dir")=="rtl"?"right":"left";e(function(){e(t).trigger("prl-domready");if(!r.support.mutationobserver)return;var n=new r.support.mutationobserver(r.Utils.debounce(function(n){e(t).trigger("prl-domready")},300));n.observe(document.body,{childList:true,subtree:true});if(r.support.touch){r.Utils.removeCssRules(/\.prl-(?!navbar).*:hover/)}});i.addClass(r.support.touch?"prl-touch":"prl-notouch")})(jQuery,document,window);

;(function($, UI) {

    "use strict";

    var $win      = $(window),
        $doc      = $(document),
        Offcanvas = {

        show: function(element) {

            element = $(element);

            if (!element.length) return;

            var doc       = $("html"),
                bar       = element.find(".prl-offcanvas-bar:first"),
                dir       = bar.hasClass("prl-offcanvas-bar-flip") ? -1 : 1,
                scrollbar = dir == -1 && $win.width() < window.innerWidth ? (window.innerWidth - $win.width()) : 0;
			
            scrollpos = {x: window.scrollX, y: window.scrollY};
			
            element.addClass("prl-active");

            //doc.css("margin-left", ((bar.outerWidth() - scrollbar) * dir)).width(); // .width() - force redraw
			if(doc.find('body').hasClass('rtl')) {
				doc.css({"width": window.innerWidth, "height": window.innerHeight}).addClass("prl-offcanvas-page page-rtl");
				doc.css("margin-right", ((bar.outerWidth() - scrollbar) * dir)).width();
			}else{
				doc.css({"width": window.innerWidth, "height": window.innerHeight}).addClass("prl-offcanvas-page");
				doc.css("margin-left", ((bar.outerWidth() - scrollbar) * dir)).width(); // .width() - force redraw
			}

            bar.addClass("prl-offcanvas-bar-show").width();

            element.off(".ukoffcanvas").on("click.ukoffcanvas swipeRight.ukoffcanvas swipeLeft.ukoffcanvas", function(e) {

                var target = $(e.target);

                if (!e.type.match(/swipe/)) {
                    if (target.hasClass("prl-offcanvas-bar")) return;
                    if (target.parents(".prl-offcanvas-bar:first").length) return;
                }

                e.stopImmediatePropagation();

                Offcanvas.hide();
            });

            $doc.on('keydown.offcanvas', function(e) {
                if (e.keyCode === 27) { // ESC
                    Offcanvas.hide();
                }
            });
        },

        hide: function(force) {

            var doc   = $("html"),
                panel = $(".prl-offcanvas.prl-active"),
                bar   = panel.find(".prl-offcanvas-bar:first");

            if (!panel.length) return;

            if ($.UIkit.support.transition && !force) {
				
				if(doc.find('body').hasClass('rtl')) {
					doc.one($.UIkit.support.transition.end, function() {
						doc.removeClass("prl-offcanvas-page page-rtl").attr("style", "");
						panel.removeClass("prl-active");
						window.scrollTo(scrollpos.x, scrollpos.y);
					}).css("margin-right", "");
				
				}else{
					doc.one($.UIkit.support.transition.end, function() {
						doc.removeClass("prl-offcanvas-page").attr("style", "");
						panel.removeClass("prl-active");
						window.scrollTo(scrollpos.x, scrollpos.y);
					}).css("margin-left", "");

				}

                setTimeout(function(){
                    bar.removeClass("prl-offcanvas-bar-show");
                }, 50);

            } else {
				if(doc.find('body').hasClass('rtl')) {
					doc.removeClass("prl-offcanvas-page page-rtl").attr("style", "");
				}else{
					doc.removeClass("prl-offcanvas-page").attr("style", "");
				}
					panel.removeClass("prl-active");
					bar.removeClass("prl-offcanvas-bar-show");
					window.scrollTo(scrollpos.x, scrollpos.y);
            }

            panel.off(".ukoffcanvas");
            $doc.off(".ukoffcanvas");
        }

    }, scrollpos;


    var OffcanvasTrigger = function(element, options) {

        var $this    = this,
            $element = $(element);

        if($element.data("offcanvas")) return;

        this.options = $.extend({
            "target": $element.is("a") ? $element.attr("href") : false
        }, options);

        this.element = $element;

        $element.on("click", function(e) {
            e.preventDefault();
            Offcanvas.show($this.options.target);
        });

        this.element.data("offcanvas", this);
    };

    OffcanvasTrigger.offcanvas = Offcanvas;

    UI["offcanvas"] = OffcanvasTrigger;


    // init code
    $doc.on("click.offcanvas.uikit", "[data-off-canvas]", function(e) {

        e.preventDefault();

        var ele = $(this);

        if (!ele.data("offcanvas")) {
            var obj = new OffcanvasTrigger(ele, UI.Utils.options(ele.attr("data-off-canvas")));
            ele.trigger("click");
        }
    });

})(jQuery, jQuery.UIkit);

/** 1. jQuery FlexSlider v2.2.0
================================================== **/
;(function(e){e.flexslider=function(t,n){var r=e(t);r.vars=e.extend({},e.flexslider.defaults,n);var i=r.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,o=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&r.vars.touch,u="click touchend MSPointerUp",a="",f,l=r.vars.direction==="vertical",c=r.vars.reverse,h=r.vars.itemWidth>0,p=r.vars.animation==="fade",d=r.vars.asNavFor!=="",v={},m=!0;e.data(t,"flexslider",r);v={init:function(){r.animating=!1;r.currentSlide=parseInt(r.vars.startAt?r.vars.startAt:0);isNaN(r.currentSlide)&&(r.currentSlide=0);r.animatingTo=r.currentSlide;r.atEnd=r.currentSlide===0||r.currentSlide===r.last;r.containerSelector=r.vars.selector.substr(0,r.vars.selector.search(" "));r.slides=e(r.vars.selector,r);r.container=e(r.containerSelector,r);r.count=r.slides.length;r.syncExists=e(r.vars.sync).length>0;r.vars.animation==="slide"&&(r.vars.animation="swing");r.prop=l?"top":"marginLeft";r.args={};r.manualPause=!1;r.stopped=!1;r.started=!1;r.startTimeout=null;r.transitions=!r.vars.video&&!p&&r.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var n in t)if(e.style[t[n]]!==undefined){r.pfx=t[n].replace("Perspective","").toLowerCase();r.prop="-"+r.pfx+"-transform";return!0}return!1}();r.vars.controlsContainer!==""&&(r.controlsContainer=e(r.vars.controlsContainer).length>0&&e(r.vars.controlsContainer));r.vars.manualControls!==""&&(r.manualControls=e(r.vars.manualControls).length>0&&e(r.vars.manualControls));if(r.vars.randomize){r.slides.sort(function(){return Math.round(Math.random())-.5});r.container.empty().append(r.slides)}r.doMath();r.setup("init");r.vars.controlNav&&v.controlNav.setup();r.vars.directionNav&&v.directionNav.setup();r.vars.keyboard&&(e(r.containerSelector).length===1||r.vars.multipleKeyboard)&&e(document).bind("keyup",function(e){var t=e.keyCode;if(!r.animating&&(t===39||t===37)){var n=t===39?r.getTarget("next"):t===37?r.getTarget("prev"):!1;r.flexAnimate(n,r.vars.pauseOnAction)}});r.vars.mousewheel&&r.bind("mousewheel",function(e,t,n,i){e.preventDefault();var s=t<0?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(s,r.vars.pauseOnAction)});r.vars.pausePlay&&v.pausePlay.setup();r.vars.slideshow&&r.vars.pauseInvisible&&v.pauseInvisible.init();if(r.vars.slideshow){r.vars.pauseOnHover&&r.hover(function(){!r.manualPlay&&!r.manualPause&&r.pause()},function(){!r.manualPause&&!r.manualPlay&&!r.stopped&&r.play()});if(!r.vars.pauseInvisible||!v.pauseInvisible.isHidden())r.vars.initDelay>0?r.startTimeout=setTimeout(r.play,r.vars.initDelay):r.play()}d&&v.asNav.setup();o&&r.vars.touch&&v.touch();(!p||p&&r.vars.smoothHeight)&&e(window).bind("resize orientationchange focus",v.resize);r.find("img").attr("draggable","false");setTimeout(function(){r.vars.start(r)},200)},asNav:{setup:function(){r.asNav=!0;r.animatingTo=Math.floor(r.currentSlide/r.move);r.currentItem=r.currentSlide;r.slides.removeClass(i+"active-slide").eq(r.currentItem).addClass(i+"active-slide");if(!s)r.slides.click(function(t){t.preventDefault();var n=e(this),s=n.index(),o=n.offset().left-e(r).scrollLeft();if(o<=0&&n.hasClass(i+"active-slide"))r.flexAnimate(r.getTarget("prev"),!0);else if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass(i+"active-slide")){r.direction=r.currentItem<s?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction,!1,!0,!0)}});else{t._slider=r;r.slides.each(function(){var t=this;t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",function(e){e.preventDefault();e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1);t.addEventListener("MSGestureTap",function(t){t.preventDefault();var n=e(this),i=n.index();if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass("active")){r.direction=r.currentItem<i?"next":"prev";r.flexAnimate(i,r.vars.pauseOnAction,!1,!0,!0)}})})}}},controlNav:{setup:function(){r.manualControls?v.controlNav.setupManual():v.controlNav.setupPaging()},setupPaging:function(){var t=r.vars.controlNav==="thumbnails"?"control-thumbs":"control-paging",n=1,s,o;r.controlNavScaffold=e('<ol class="'+i+"control-nav "+i+t+'"></ol>');if(r.pagingCount>1)for(var f=0;f<r.pagingCount;f++){o=r.slides.eq(f);s=r.vars.controlNav==="thumbnails"?'<img src="'+o.attr("data-thumb")+'"/>':"<a>"+n+"</a>";if("thumbnails"===r.vars.controlNav&&!0===r.vars.thumbCaptions){var l=o.attr("data-thumbcaption");""!=l&&undefined!=l&&(s+='<span class="'+i+'caption">'+l+"</span>")}r.controlNavScaffold.append("<li>"+s+"</li>");n++}r.controlsContainer?e(r.controlsContainer).append(r.controlNavScaffold):r.append(r.controlNavScaffold);v.controlNav.set();v.controlNav.active();r.controlNavScaffold.delegate("a, img",u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){r.direction=s>r.currentSlide?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},setupManual:function(){r.controlNav=r.manualControls;v.controlNav.active();r.controlNav.bind(u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){s>r.currentSlide?r.direction="next":r.direction="prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},set:function(){var t=r.vars.controlNav==="thumbnails"?"img":"a";r.controlNav=e("."+i+"control-nav li "+t,r.controlsContainer?r.controlsContainer:r)},active:function(){r.controlNav.removeClass(i+"active").eq(r.animatingTo).addClass(i+"active")},update:function(t,n){r.pagingCount>1&&t==="add"?r.controlNavScaffold.append(e("<li><a>"+r.count+"</a></li>")):r.pagingCount===1?r.controlNavScaffold.find("li").remove():r.controlNav.eq(n).closest("li").remove();v.controlNav.set();r.pagingCount>1&&r.pagingCount!==r.controlNav.length?r.update(n,t):v.controlNav.active()}},directionNav:{setup:function(){var t=e('<ul class="'+i+'direction-nav"><li><a class="'+i+'prev" href="#">'+r.vars.prevText+'</a></li><li><a class="'+i+'next" href="#">'+r.vars.nextText+"</a></li></ul>");if(r.controlsContainer){e(r.controlsContainer).append(t);r.directionNav=e("."+i+"direction-nav li a",r.controlsContainer)}else{r.append(t);r.directionNav=e("."+i+"direction-nav li a",r)}v.directionNav.update();r.directionNav.bind(u,function(t){t.preventDefault();var n;if(a===""||a===t.type){n=e(this).hasClass(i+"next")?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(n,r.vars.pauseOnAction)}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";r.pagingCount===1?r.directionNav.addClass(e).attr("tabindex","-1"):r.vars.animationLoop?r.directionNav.removeClass(e).removeAttr("tabindex"):r.animatingTo===0?r.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):r.animatingTo===r.last?r.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):r.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var t=e('<div class="'+i+'pauseplay"><a></a></div>');if(r.controlsContainer){r.controlsContainer.append(t);r.pausePlay=e("."+i+"pauseplay a",r.controlsContainer)}else{r.append(t);r.pausePlay=e("."+i+"pauseplay a",r)}v.pausePlay.update(r.vars.slideshow?i+"pause":i+"play");r.pausePlay.bind(u,function(t){t.preventDefault();if(a===""||a===t.type)if(e(this).hasClass(i+"pause")){r.manualPause=!0;r.manualPlay=!1;r.pause()}else{r.manualPause=!1;r.manualPlay=!0;r.play()}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(e){e==="play"?r.pausePlay.removeClass(i+"pause").addClass(i+"play").html(r.vars.playText):r.pausePlay.removeClass(i+"play").addClass(i+"pause").html(r.vars.pauseText)}},touch:function(){var e,n,i,o,u,a,f=!1,d=0,v=0,m=0;if(!s){t.addEventListener("touchstart",g,!1);function g(s){if(r.animating)s.preventDefault();else if(window.navigator.msPointerEnabled||s.touches.length===1){r.pause();o=l?r.h:r.w;a=Number(new Date);d=s.touches[0].pageX;v=s.touches[0].pageY;i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o;e=l?v:d;n=l?d:v;t.addEventListener("touchmove",y,!1);t.addEventListener("touchend",b,!1)}}function y(t){d=t.touches[0].pageX;v=t.touches[0].pageY;u=l?e-v:e-d;f=l?Math.abs(u)<Math.abs(d-n):Math.abs(u)<Math.abs(v-n);var s=500;if(!f||Number(new Date)-a>s){t.preventDefault();if(!p&&r.transitions){r.vars.animationLoop||(u/=r.currentSlide===0&&u<0||r.currentSlide===r.last&&u>0?Math.abs(u)/o+2:1);r.setProps(i+u,"setTouch")}}}function b(s){t.removeEventListener("touchmove",y,!1);if(r.animatingTo===r.currentSlide&&!f&&u!==null){var l=c?-u:u,h=l>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(h)&&(Number(new Date)-a<550&&Math.abs(l)>50||Math.abs(l)>o/2)?r.flexAnimate(h,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}t.removeEventListener("touchend",b,!1);e=null;n=null;u=null;i=null}}else{t.style.msTouchAction="none";t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",w,!1);t._slider=r;t.addEventListener("MSGestureChange",E,!1);t.addEventListener("MSGestureEnd",S,!1);function w(e){e.stopPropagation();if(r.animating)e.preventDefault();else{r.pause();t._gesture.addPointer(e.pointerId);m=0;o=l?r.h:r.w;a=Number(new Date);i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o}}function E(e){e.stopPropagation();var n=e.target._slider;if(!n)return;var r=-e.translationX,s=-e.translationY;m+=l?s:r;u=m;f=l?Math.abs(m)<Math.abs(-r):Math.abs(m)<Math.abs(-s);if(e.detail===e.MSGESTURE_FLAG_INERTIA){setImmediate(function(){t._gesture.stop()});return}if(!f||Number(new Date)-a>500){e.preventDefault();if(!p&&n.transitions){n.vars.animationLoop||(u=m/(n.currentSlide===0&&m<0||n.currentSlide===n.last&&m>0?Math.abs(m)/o+2:1));n.setProps(i+u,"setTouch")}}}function S(t){t.stopPropagation();var r=t.target._slider;if(!r)return;if(r.animatingTo===r.currentSlide&&!f&&u!==null){var s=c?-u:u,l=s>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(l)&&(Number(new Date)-a<550&&Math.abs(s)>50||Math.abs(s)>o/2)?r.flexAnimate(l,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}e=null;n=null;u=null;i=null;m=0}}},resize:function(){if(!r.animating&&r.is(":visible")){h||r.doMath();if(p)v.smoothHeight();else if(h){r.slides.width(r.computedW);r.update(r.pagingCount);r.setProps()}else if(l){r.viewport.height(r.h);r.setProps(r.h,"setTotal")}else{r.vars.smoothHeight&&v.smoothHeight();r.newSlides.width(r.computedW);r.setProps(r.computedW,"setTotal")}}},smoothHeight:function(e){if(!l||p){var t=p?r:r.viewport;e?t.animate({height:r.slides.eq(r.animatingTo).height()},e):t.height(r.slides.eq(r.animatingTo).height())}},sync:function(t){var n=e(r.vars.sync).data("flexslider"),i=r.animatingTo;switch(t){case"animate":n.flexAnimate(i,r.vars.pauseOnAction,!1,!0);break;case"play":!n.playing&&!n.asNav&&n.play();break;case"pause":n.pause()}},pauseInvisible:{visProp:null,init:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)e[t]+"Hidden"in document&&(v.pauseInvisible.visProp=e[t]+"Hidden");if(v.pauseInvisible.visProp){var n=v.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(n,function(){v.pauseInvisible.isHidden()?r.startTimeout?clearTimeout(r.startTimeout):r.pause():r.started?r.play():r.vars.initDelay>0?setTimeout(r.play,r.vars.initDelay):r.play()})}},isHidden:function(){return document[v.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(f);f=setTimeout(function(){a=""},3e3)}};r.flexAnimate=function(t,n,s,u,a){!r.vars.animationLoop&&t!==r.currentSlide&&(r.direction=t>r.currentSlide?"next":"prev");d&&r.pagingCount===1&&(r.direction=r.currentItem<t?"next":"prev");if(!r.animating&&(r.canAdvance(t,a)||s)&&r.is(":visible")){if(d&&u){var f=e(r.vars.asNavFor).data("flexslider");r.atEnd=t===0||t===r.count-1;f.flexAnimate(t,!0,!1,!0,a);r.direction=r.currentItem<t?"next":"prev";f.direction=r.direction;if(Math.ceil((t+1)/r.visible)-1===r.currentSlide||t===0){r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");return!1}r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");t=Math.floor(t/r.visible)}r.animating=!0;r.animatingTo=t;n&&r.pause();r.vars.before(r);r.syncExists&&!a&&v.sync("animate");r.vars.controlNav&&v.controlNav.active();h||r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");r.atEnd=t===0||t===r.last;r.vars.directionNav&&v.directionNav.update();if(t===r.last){r.vars.end(r);r.vars.animationLoop||r.pause()}if(!p){var m=l?r.slides.filter(":first").height():r.computedW,g,y,b;if(h){g=r.vars.itemMargin;b=(r.itemW+g)*r.move*r.animatingTo;y=b>r.limit&&r.visible!==1?r.limit:b}else r.currentSlide===0&&t===r.count-1&&r.vars.animationLoop&&r.direction!=="next"?y=c?(r.count+r.cloneOffset)*m:0:r.currentSlide===r.last&&t===0&&r.vars.animationLoop&&r.direction!=="prev"?y=c?0:(r.count+1)*m:y=c?(r.count-1-t+r.cloneOffset)*m:(t+r.cloneOffset)*m;r.setProps(y,"",r.vars.animationSpeed);if(r.transitions){if(!r.vars.animationLoop||!r.atEnd){r.animating=!1;r.currentSlide=r.animatingTo}r.container.unbind("webkitTransitionEnd transitionend");r.container.bind("webkitTransitionEnd transitionend",function(){r.wrapup(m)})}else r.container.animate(r.args,r.vars.animationSpeed,r.vars.easing,function(){r.wrapup(m)})}else if(!o){r.slides.eq(r.currentSlide).css({zIndex:1}).animate({opacity:0},r.vars.animationSpeed,r.vars.easing);r.slides.eq(t).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing,r.wrapup)}else{r.slides.eq(r.currentSlide).css({opacity:0,zIndex:1});r.slides.eq(t).css({opacity:1,zIndex:2});r.wrapup(m)}r.vars.smoothHeight&&v.smoothHeight(r.vars.animationSpeed)}};r.wrapup=function(e){!p&&!h&&(r.currentSlide===0&&r.animatingTo===r.last&&r.vars.animationLoop?r.setProps(e,"jumpEnd"):r.currentSlide===r.last&&r.animatingTo===0&&r.vars.animationLoop&&r.setProps(e,"jumpStart"));r.animating=!1;r.currentSlide=r.animatingTo;r.vars.after(r)};r.animateSlides=function(){!r.animating&&m&&r.flexAnimate(r.getTarget("next"))};r.pause=function(){clearInterval(r.animatedSlides);r.animatedSlides=null;r.playing=!1;r.vars.pausePlay&&v.pausePlay.update("play");r.syncExists&&v.sync("pause")};r.play=function(){r.playing&&clearInterval(r.animatedSlides);r.animatedSlides=r.animatedSlides||setInterval(r.animateSlides,r.vars.slideshowSpeed);r.started=r.playing=!0;r.vars.pausePlay&&v.pausePlay.update("pause");r.syncExists&&v.sync("play")};r.stop=function(){r.pause();r.stopped=!0};r.canAdvance=function(e,t){var n=d?r.pagingCount-1:r.last;return t?!0:d&&r.currentItem===r.count-1&&e===0&&r.direction==="prev"?!0:d&&r.currentItem===0&&e===r.pagingCount-1&&r.direction!=="next"?!1:e===r.currentSlide&&!d?!1:r.vars.animationLoop?!0:r.atEnd&&r.currentSlide===0&&e===n&&r.direction!=="next"?!1:r.atEnd&&r.currentSlide===n&&e===0&&r.direction==="next"?!1:!0};r.getTarget=function(e){r.direction=e;return e==="next"?r.currentSlide===r.last?0:r.currentSlide+1:r.currentSlide===0?r.last:r.currentSlide-1};r.setProps=function(e,t,n){var i=function(){var n=e?e:(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo,i=function(){if(h)return t==="setTouch"?e:c&&r.animatingTo===r.last?0:c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:r.animatingTo===r.last?r.limit:n;switch(t){case"setTotal":return c?(r.count-1-r.currentSlide+r.cloneOffset)*e:(r.currentSlide+r.cloneOffset)*e;case"setTouch":return c?e:e;case"jumpEnd":return c?e:r.count*e;case"jumpStart":return c?r.count*e:e;default:return e}}();return i*-1+"px"}();if(r.transitions){i=l?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)";n=n!==undefined?n/1e3+"s":"0s";r.container.css("-"+r.pfx+"-transition-duration",n)}r.args[r.prop]=i;(r.transitions||n===undefined)&&r.container.css(r.args)};r.setup=function(t){if(!p){var n,s;if(t==="init"){r.viewport=e('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(r).append(r.container);r.cloneCount=0;r.cloneOffset=0;if(c){s=e.makeArray(r.slides).reverse();r.slides=e(s);r.container.empty().append(r.slides)}}if(r.vars.animationLoop&&!h){r.cloneCount=2;r.cloneOffset=1;t!=="init"&&r.container.find(".clone").remove();r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden","true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden","true"))}r.newSlides=e(r.vars.selector,r);n=c?r.count-1-r.currentSlide+r.cloneOffset:r.currentSlide+r.cloneOffset;if(l&&!h){r.container.height((r.count+r.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){r.newSlides.css({display:"block"});r.doMath();r.viewport.height(r.h);r.setProps(n*r.h,"init")},t==="init"?100:0)}else{r.container.width((r.count+r.cloneCount)*200+"%");r.setProps(n*r.computedW,"init");setTimeout(function(){r.doMath();r.newSlides.css({width:r.computedW,"float":"left",display:"block"});r.vars.smoothHeight&&v.smoothHeight()},t==="init"?100:0)}}else{r.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"});t==="init"&&(o?r.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+r.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(r.currentSlide).css({opacity:1,zIndex:2}):r.slides.css({opacity:0,display:"block",zIndex:1}).eq(r.currentSlide).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing));r.vars.smoothHeight&&v.smoothHeight()}h||r.slides.removeClass(i+"active-slide").eq(r.currentSlide).addClass(i+"active-slide")};r.doMath=function(){var e=r.slides.first(),t=r.vars.itemMargin,n=r.vars.minItems,i=r.vars.maxItems;r.w=r.viewport===undefined?r.width():r.viewport.width();r.h=e.height();r.boxPadding=e.outerWidth()-e.width();if(h){r.itemT=r.vars.itemWidth+t;r.minW=n?n*r.itemT:r.w;r.maxW=i?i*r.itemT-t:r.w;r.itemW=r.minW>r.w?(r.w-t*(n-1))/n:r.maxW<r.w?(r.w-t*(i-1))/i:r.vars.itemWidth>r.w?r.w:r.vars.itemWidth;r.visible=Math.floor(r.w/r.itemW);r.move=r.vars.move>0&&r.vars.move<r.visible?r.vars.move:r.visible;r.pagingCount=Math.ceil((r.count-r.visible)/r.move+1);r.last=r.pagingCount-1;r.limit=r.pagingCount===1?0:r.vars.itemWidth>r.w?r.itemW*(r.count-1)+t*(r.count-1):(r.itemW+t)*r.count-r.w-t}else{r.itemW=r.w;r.pagingCount=r.count;r.last=r.count-1}r.computedW=r.itemW-r.boxPadding};r.update=function(e,t){r.doMath();if(!h){e<r.currentSlide?r.currentSlide+=1:e<=r.currentSlide&&e!==0&&(r.currentSlide-=1);r.animatingTo=r.currentSlide}if(r.vars.controlNav&&!r.manualControls)if(t==="add"&&!h||r.pagingCount>r.controlNav.length)v.controlNav.update("add");else if(t==="remove"&&!h||r.pagingCount<r.controlNav.length){if(h&&r.currentSlide>r.last){r.currentSlide-=1;r.animatingTo-=1}v.controlNav.update("remove",r.last)}r.vars.directionNav&&v.directionNav.update()};r.addSlide=function(t,n){var i=e(t);r.count+=1;r.last=r.count-1;l&&c?n!==undefined?r.slides.eq(r.count-n).after(i):r.container.prepend(i):n!==undefined?r.slides.eq(n).before(i):r.container.append(i);r.update(n,"add");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.added(r)};r.removeSlide=function(t){var n=isNaN(t)?r.slides.index(e(t)):t;r.count-=1;r.last=r.count-1;isNaN(t)?e(t,r.slides).remove():l&&c?r.slides.eq(r.last).remove():r.slides.eq(t).remove();r.doMath();r.update(n,"remove");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.removed(r)};v.init()};e(window).blur(function(e){focused=!1}).focus(function(e){focused=!0});e.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};e.fn.flexslider=function(t){t===undefined&&(t={});if(typeof t=="object")return this.each(function(){var n=e(this),r=t.selector?t.selector:".slides > li",i=n.find(r);if(i.length===1&&t.allowOneSlide===!0||i.length===0){i.fadeIn(400);t.start&&t.start(n)}else n.data("flexslider")===undefined&&new e.flexslider(this,t)});var n=e(this).data("flexslider");switch(t){case"play":n.play();break;case"pause":n.pause();break;case"stop":n.stop();break;case"next":n.flexAnimate(n.getTarget("next"),!0);break;case"prev":case"previous":n.flexAnimate(n.getTarget("prev"),!0);break;default:typeof t=="number"&&n.flexAnimate(t,!0)}}})(jQuery);
 
/** 2. Mobile Menu
================================================== **/
;(function($) {
	"use strict";

	$.fn.jMMenu = function() {
	 	var $this = $(this);
		$this.find('li').has('ul').prepend('<span class="nav-click"></span>');
		$this.find('ul').on('click', '.nav-click', function(){
			$(this).siblings('ul').slideToggle();
			$(this).toggleClass('nav-click-up');
			return false;
		});
	};
})(jQuery); 

/** 3. Accordion
================================================== **/
;(function($) {
	"use strict";

	$.fn.jAccordion = function() {
	 var $this = $(this);
	 
		$this.find("section").each(function(idx) {
			var section = $(this);
			if(idx === 0) section.addClass('active').find('div.acc-content').slideDown();
			section.find('a.head').on("click", function(){
				var handle = $(this);
					handle.parent().toggleClass('active');
					
					if(handle.parent().hasClass('active')){
						handle.next('div.acc-content').slideDown();
					}else{
						handle.next('div.acc-content').slideUp();	
					}
				
				return false;
			});
				
		});
	};
})(jQuery);

 
/** 4. jFlickrfeed
================================================== **/
(function($){$.fn.jflickrfeed=function(settings,callback){settings=$.extend(true,{flickrbase:'http://api.flickr.com/services/feeds/',feedapi:'photos_public.gne',limit:20,qstrings:{lang:'en-us',format:'json',jsoncallback:'?'},cleanDescription:true,useTemplate:true,itemTemplate:'',itemCallback:function(){}},settings);var url=settings.flickrbase+settings.feedapi+'?';var first=true;for(var key in settings.qstrings){if(!first)
url+='&';url+=key+'='+settings.qstrings[key];first=false;}
return $(this).each(function(){var $container=$(this);var container=this;$.getJSON(url,function(data){$.each(data.items,function(i,item){if(i<settings.limit){if(settings.cleanDescription){var regex=/<p>(.*?)<\/p>/g;var input=item.description;if(regex.test(input)){item.description=input.match(regex)[2]
if(item.description!=undefined)
item.description=item.description.replace('<p>','').replace('</p>','');}}
item['image_s']=item.media.m.replace('_m','_s');item['image_t']=item.media.m.replace('_m','_t');item['image_m']=item.media.m.replace('_m','_m');item['image']=item.media.m.replace('_m','');item['image_b']=item.media.m.replace('_m','_b');delete item.media;if(settings.useTemplate){var template=settings.itemTemplate;for(var key in item){var rgx=new RegExp('{{'+key+'}}','g');template=template.replace(rgx,item[key]);}
$container.append(template)}
settings.itemCallback.call(container,item);}});if($.isFunction(callback)){callback.call(container,data);}});});}})(jQuery);


/** 5. jQInstaPics
================================================== **/
;(function(a){a.fn.jqinstapics=function(b){var c={user_id:null,access_token:null,count:10};var d=a.extend(c,b);return this.each(function(){var b=a(this),c="https://api.instagram.com/v1/users/"+d.user_id+"/media/recent?access_token="+d.access_token+"&count="+d.count+"&callback=?";a.getJSON(c,function(c){a.each(c.data,function(c,d){var e=a("<a/>",{href:d.link,target:"_blank"}).appendTo(b),f=a("<img/>",{src:d.images.thumbnail.url}).appendTo(e);if(d.caption){f.attr("title",d.caption.text)}})});if(d.user_id==null||d.access_token==null){b.append("<li>Please specify a User ID and Access Token, as outlined in the docs.</li>")}})}})(jQuery);


/** 6. FitVids
================================================== **/
;(function(a){a.fn.fitVids=function(f){var b={customSelector:null};if(!document.getElementById("fit-vids-style")){var c=document.createElement("div"),e=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0],d="­<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";c.className="fit-vids-style";c.id="fit-vids-style";c.style.display="none";c.innerHTML=d;e.parentNode.insertBefore(c,e)}if(f){a.extend(b,f)}return this.each(function(){var h=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];if(b.customSelector){h.push(b.customSelector)}var g=a(this).find(h.join(","));g=g.not("object object");g.each(function(){var i=a(this);if(this.tagName.toLowerCase()==="embed"&&i.parent("object").length||i.parent(".fluid-width-video-wrapper").length){return}var l=(this.tagName.toLowerCase()==="object"||(i.attr("height")&&!isNaN(parseInt(i.attr("height"),10))))?parseInt(i.attr("height"),10):i.height(),k=!isNaN(parseInt(i.attr("width"),10))?parseInt(i.attr("width"),10):i.width(),j=l/k;if(!i.attr("id")){var m="fitvid"+Math.floor(Math.random()*999999);i.attr("id",m)}i.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",(j*100)+"%");i.removeAttr("height").removeAttr("width")})})}})(window.jQuery||window.Zepto);


/** 7. Placeholder
================================================== **/
;(function(d,i,l){var g="placeholder" in i.createElement("input");var a="placeholder" in i.createElement("textarea");var h=l.fn;var j=l.valHooks;var m=l.propHooks;var e;var n;if(g&&a){n=h.placeholder=function(){return this};n.input=n.textarea=true}else{n=h.placeholder=function(){var o=this;o.filter((g?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":b,"blur.placeholder":k}).data("placeholder-enabled",true).trigger("blur.placeholder");return o};n.input=g;n.textarea=a;e={get:function(o){var p=l(o);var q=p.data("placeholder-password");if(q){return q[0].value}return p.data("placeholder-enabled")&&p.hasClass("placeholder")?"":o.value},set:function(o,r){var p=l(o);var q=p.data("placeholder-password");if(q){return q[0].value=r}if(!p.data("placeholder-enabled")){return o.value=r}if(r==""){o.value=r;if(o!=c()){k.call(o)}}else{if(p.hasClass("placeholder")){b.call(o,true,r)||(o.value=r)}else{o.value=r}}return p}};if(!g){j.input=e;m.value=e}if(!a){j.textarea=e;m.value=e}l(function(){l(i).delegate("form","submit.placeholder",function(){var o=l(".placeholder",this).each(b);setTimeout(function(){o.each(k)},10)})});l(d).bind("beforeunload.placeholder",function(){l(".placeholder").each(function(){this.value=""})})}function f(p){var o={};var q=/^jQuery\d+$/;l.each(p.attributes,function(r,s){if(s.specified&&!q.test(s.name)){o[s.name]=s.value}});return o}function b(p,r){var q=this;var o=l(q);if(q.value==o.attr("placeholder")&&o.hasClass("placeholder")){if(o.data("placeholder-password")){o=o.hide().next().show().attr("id",o.removeAttr("id").data("placeholder-id"));if(p===true){return o[0].value=r}o.focus()}else{q.value="";o.removeClass("placeholder");q==c()&&q.select()}}}function k(){var q;var s=this;var o=l(s);var r=this.id;if(s.value==""){if(s.type=="password"){if(!o.data("placeholder-textinput")){try{q=o.clone().attr({type:"text"})}catch(p){q=l("<input>").attr(l.extend(f(this),{type:"text"}))}q.removeAttr("name").data({"placeholder-password":o,"placeholder-id":r}).bind("focus.placeholder",b);o.data({"placeholder-textinput":q,"placeholder-id":r}).before(q)}o=o.removeAttr("id").hide().prev().attr("id",r).show()}o.addClass("placeholder");o[0].value=o.attr("placeholder")}else{o.removeClass("placeholder")}}function c(){try{return i.activeElement}catch(o){}}}(this,document,jQuery));


/** 8. Tooltip - tipsy 
================================================== **/
;(function(b){function d(e,f){return(typeof e=="function")?(e.call(f)):e}function c(e){while(e=e.parentNode){if(e==document){return true}}return false}function a(f,e){this.$element=b(f);this.options=e;this.enabled=true;this.fixTitle()}a.prototype={show:function(){var h=this.getTitle();if(h&&this.enabled){var i=this.tip();i.find(".tipsy-inner")[this.options.html?"html":"text"](h);i[0].className="tipsy";i.remove().css({top:0,left:0,visibility:"hidden",display:"block"}).prependTo(document.body);var k=b.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight});var f=i[0].offsetWidth,g=i[0].offsetHeight,e=d(this.options.gravity,this.$element[0]);var j;switch(e.charAt(0)){case"n":j={top:k.top+k.height+this.options.offset,left:k.left+k.width/2-f/2};break;case"s":j={top:k.top-g-this.options.offset,left:k.left+k.width/2-f/2};break;case"e":j={top:k.top+k.height/2-g/2,left:k.left-f-this.options.offset};break;case"w":j={top:k.top+k.height/2-g/2,left:k.left+k.width+this.options.offset};break}if(e.length==2){if(e.charAt(1)=="w"){j.left=k.left+k.width/2-15}else{j.left=k.left+k.width/2-f+15}}i.css(j).addClass("tipsy-"+e);i.find(".tipsy-arrow")[0].className="tipsy-arrow tipsy-arrow-"+e.charAt(0);if(this.options.className){i.addClass(d(this.options.className,this.$element[0]))}if(this.options.fade){i.stop().css({opacity:0,display:"block",visibility:"visible"}).animate({opacity:this.options.opacity})}else{i.css({visibility:"visible",opacity:this.options.opacity})}}},hide:function(){if(this.options.fade){this.tip().stop().fadeOut(function(){b(this).remove()})}else{this.tip().remove()}},fixTitle:function(){var e=this.$element;if(e.attr("title")||typeof(e.attr("original-title"))!="string"){e.attr("original-title",e.attr("title")||"").removeAttr("title")}},getTitle:function(){var e,f=this.$element,g=this.options;this.fixTitle();var e,g=this.options;if(typeof g.title=="string"){e=f.attr(g.title=="title"?"original-title":g.title)}else{if(typeof g.title=="function"){e=g.title.call(f[0])}}e=(""+e).replace(/(^\s*|\s*$)/,"");return e||g.fallback},tip:function(){if(!this.$tip){this.$tip=b('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');this.$tip.data("tipsy-pointee",this.$element[0])}return this.$tip},validate:function(){if(!this.$element[0].parentNode){this.hide();this.$element=null;this.options=null}},enable:function(){this.enabled=true},disable:function(){this.enabled=false},toggleEnabled:function(){this.enabled=!this.enabled}};b.fn.tipsy=function(i){if(i===true){return this.data("tipsy")}else{if(typeof i=="string"){var j=this.data("tipsy");if(j){j[i]()}return this}}i=b.extend({},b.fn.tipsy.defaults,i);function h(n){var m=b.data(n,"tipsy");if(!m){m=new a(n,b.fn.tipsy.elementOptions(n,i));b.data(n,"tipsy",m)}return m}function g(){var m=h(this);m.hoverState="in";if(i.delayIn==0){m.show()}else{m.fixTitle();setTimeout(function(){if(m.hoverState=="in"){m.show()}},i.delayIn)}}function f(){var m=h(this);m.hoverState="out";if(i.delayOut==0){m.hide()}else{setTimeout(function(){if(m.hoverState=="out"){m.hide()}},i.delayOut)}}if(!i.live){this.each(function(){h(this)})}if(i.trigger!="manual"){var k=i.live?"live":"bind",l=i.trigger=="hover"?"mouseenter":"focus",e=i.trigger=="hover"?"mouseleave":"blur";this[k](l,g)[k](e,f)}return this};b.fn.tipsy.defaults={className:null,delayIn:0,delayOut:0,fade:false,fallback:"",gravity:"n",html:false,live:false,offset:0,opacity:0.8,title:"title",trigger:"hover"};b.fn.tipsy.revalidate=function(){b(".tipsy").each(function(){var e=b.data(this,"tipsy-pointee");if(!e||!c(e)){b(this).remove()}})};b.fn.tipsy.elementOptions=function(f,e){return b.metadata?b.extend({},e,b(f).metadata()):e};b.fn.tipsy.autoNS=function(){return b(this).offset().top>(b(document).scrollTop()+b(window).height()/2)?"s":"n"};b.fn.tipsy.autoWE=function(){return b(this).offset().left>(b(document).scrollLeft()+b(window).width()/2)?"e":"w"};b.fn.tipsy.autoBounds=function(e,f){return function(){var h={ns:f[0],ew:(f.length>1?f[1]:false)},j=b(document).scrollTop()+e,i=b(document).scrollLeft()+e,g=b(this);if(g.offset().top<j){h.ns="n"}if(g.offset().left<i){h.ew="w"}if(b(window).width()+b(document).scrollLeft()-g.offset().left<e){h.ew="e"}if(b(window).height()+b(document).scrollTop()-g.offset().top<e){h.ns="s"}return h.ns+(h.ew?h.ew:"")}}})(jQuery);

/** 9. Scroll to top
================================================== **/
;(function($) {
	"use strict";

	$.fn.jTotop = function() {
	 	var $this = $(this),
			scrolled = false,
			scrHeight = 300;
		$(window).scroll(function () {
			if (scrHeight < $(window).scrollTop() && !scrolled) {
				$this.fadeIn();
				scrolled = true;
			} else if (scrHeight > $(window).scrollTop() && scrolled) {
				$this.fadeOut();
				scrolled = false;    
			}
		});
		$this.click(function () {
			$('body,html').animate({scrollTop: 0}, 800);
			return false;
		});
	};
})(jQuery); 
