(function ($) {
    "use strict";

    /**
     *  Variables
     */
	var body = $('body');
    var windowW = $(window).width();
    var windowH = $(window).height();
    var clickEventType = ((document.ontouchstart !== null) ? 'click' : 'touchstart');    
	
	/**
     * Detect Device Type
     */
    var isMobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
        $('html').addClass('mobile');
    } else {
        isMobile = false;
        $('html').addClass('desktop');
    }
	

    /**
     * Functions
     */
    function setWindowScrollAppear() {
        var $animate = $('.animate-up, .animate-down, .animate-left, .animate-right');

        if (!isMobile) {
            $animate.appear();
            $animate.on('appear', function (event, affected) {
                for (var i = 0; i < affected.length; i++) {
                    $(affected[i]).addClass('animated');
                }
            });
            $.force_appear();
        }
    }

    function setProgressBarsFill() {
        var $progress_bar = $('.progress-bar');

        if (!isMobile) {
            $progress_bar.appear();
            $progress_bar.on('appear', function (event, $affected) {
                setProgressBarsWidth($affected)
            });
            $.force_appear();
        } else {
            setProgressBarsWidth($progress_bar)
        }
    }

    function setProgressBarsWidth(bars) {
        for (var i = 0; i < bars.length; i++) {
            var $bar_fill = $(bars[i]).find('.bar-fill');

            $bar_fill.width($bar_fill.data('width'));
        }
    }

    function positioningInterestsTooltips() {
        var interests = $(".interests-list");
        var tooltips = interests.find('span');

        if(interests.length > 0) {
            for(var i = 0; i < tooltips.length; i++) {
                var tooltipW = $(tooltips[i]).outerWidth();
                var parentW = $(tooltips[i]).parent().outerWidth();				
				var left = (parentW - tooltipW) / 2 - 1;
                
				$(tooltips[i]).css('left', left + 'px');
            }
        }
    }
	
	function positioningTimelineElements() {
        if ($(window).width() > 600) { // For large devices
            $('.timeline').each(function () {				
                var tlineBar = $(this).find('.timeline-bar');
				var tlineBarH = 0;
				var tlineWrap = $(this).find('.timeline-inner');
				var tlineWrapH = 0;
				var tlineGutter = rsOptions.timeline.itemsSpace;
											
                var col1Top = 0;
				var col1TopPrev = 0;
				var col1LastElemH = 0;
				var col1Elems = $(this).find('.timeline-box-left');
				
                var col2Top = rsOptions.timeline.topSpace;;
                var col2TopPrev = 0;
                var col2LastElemH = 0;		                				
                var col2Elems = $(this).find('.timeline-box-right');
                
				// Switch top params for RTL
				if(rsOptions.rtl){
					col1Top = col2Top;
					col2Top = 0;
				}
				
                // Positioning first column elements
                for (var i = 0; i < col1Elems.length; i++) {
                    $(col1Elems[i]).css({'position': 'absolute', 'left': '0', 'top': col1Top + 'px'});
					col1TopPrev = col1Top;
                    col1Top = col1Top + $(col1Elems[i]).height() + tlineGutter;
                    col1LastElemH = $(col1Elems[i]).height();													
                }

                // Positioning second column elements               
                for (var i = 0; i < col2Elems.length; i++) {
                    $(col2Elems[i]).css({'position': 'absolute', 'right': '0', 'top': col2Top + 'px'});
					col2TopPrev = col2Top;
                    col2Top = col2Top + $(col2Elems[i]).height() + tlineGutter;
                    col2LastElemH = $(col2Elems[i]).height();
                }							
				
                // Set container & bar height's								
                if (col1Top > col2Top) {
                    tlineWrapH = col1Top - tlineGutter;                    
                } else {
                    tlineWrapH = col2Top - tlineGutter;                    
                }
				
				if (col1TopPrev > col2TopPrev) {
					tlineBarH = col1TopPrev;
				} else {
					tlineBarH = col2TopPrev;
				}
				
                tlineWrap.height(tlineWrapH);
                tlineBar.css({'top': '80px', 'height': tlineBarH + 'px'});
            });
        } else { // For small devices
            $('.timeline-bar').attr('style', '');
            $('.timeline-box').attr('style', '');
            $('.timeline-inner').attr('style', '');
        }
    }	    

    function availabilityCalendar() {						
        var calendarHtml = $("#busyCalendar");
		
        if (calendarHtml.length > 0) {				
			var calendarThead = calendarHtml.find('.calendar-thead');
			var calendarTbody = calendarHtml.find('.calendar-tbody');

			var calendarTodayDay = calendarHtml.find('.calendar-today .day');
			var calendarTodayMonth = calendarHtml.find('.calendar-today .month');
			var calendarTodayWeekday = calendarHtml.find('.calendar-today .week-day');

			var calendarActiveMonth = calendarHtml.find('.active-month');
			var calendarActiveYear = calendarHtml.find('.active-year');
			var calendarActiveMonthAndYear = calendarActiveMonth.add(calendarActiveYear);
			
			var calendar = new Object();
            calendar = {
                currentYear: new Date().getFullYear(),
                currentMonth: new Date().getMonth(),
                currentWeekDay: new Date().getDay(),
                currentDay: new Date().getDate(),
                active: {
                    month: '',
                    year: ''
                },
                limitUp: {
                    month: '',
                    year: ''
                },
                limitDown: {
                    month: '',
                    year: ''
                },
                busyDays: '',
                weekStart: '',
                weekNames: rsOptions.calendar.weekNames,
                daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                monthNames: rsOptions.calendar.monthNames,
                init: function () {
                    this.initToday();
                    this.initWeekNames();
                    this.createMonthHtml(this.currentYear, this.currentMonth);
                },
                initToday: function () {
                    calendarTodayDay.html(this.currentDay);
                    calendarTodayMonth.html(this.monthNames[this.currentMonth].substring(0, 3));
                    calendarTodayWeekday.html(this.weekNames[this.currentWeekDay]);
                },
                initWeekNames: function () {                    
                    var html = '<tr>';

                    for (var i = 0; i < this.weekNames.length; ++i) {
                        html += '<th>' + this.weekNames[i].substring(0, 3) + '</th>';
                    }
                    html += '</tr>';					
                    calendarThead.append(html);
                },
                getDaysInMonth: function (year, month) {
                    if ((month == 1) && (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
                        return 29;
                    } else {
                        return this.daysInMonth[month];
                    }
                },
                createMonthHtml: function (year, month) {
                    var html = '';
                    var monthFirstDay = new Date(year, month, 1).getDay(); // Returns the day of a Date object (from 0-6. 0=Sunday, 1=Monday, etc.)
                    var monthBusyDays = [];

                    if (calendar.weekStart.toLowerCase() == 'monday') { // If calendar starts from monday
                        if (monthFirstDay == 0) { // Make sunday (0) week last day (6)
                            monthFirstDay = 6;
                        } else {
                            monthFirstDay = monthFirstDay - 1;
                        }
                    }

                    calendarActiveMonth.empty().html(this.monthNames[month]);
                    calendarActiveYear.empty().html(year);

                    // Get busy days array for active month
                    for (var i = 0; i < this.busyDays.length; i++) {
                        if (this.busyDays[i].getFullYear() == year && this.busyDays[i].getMonth() == month) {
                            monthBusyDays[i] = this.busyDays[i].getDate();
                        }
                    }

                    for (var j = 0; j < 42; j++) {
                        var className = '';

                        // Set today class
                        if (year == this.currentYear && month == this.currentMonth && (j - monthFirstDay + 1) == this.currentDay) {
                            className += 'current-day';
                        }

                        // Set busy day class
                        if (arrayContains(monthBusyDays, (j - monthFirstDay + 1))) {
                            className += ' busy-day';
                        }

                        // Create month html
                        if (j % 7 == 0) html += '<tr>';
                        if ((j < monthFirstDay) || (j >= monthFirstDay + this.getDaysInMonth(year, month))) {
                            html += '<td class="calendar-other-month"><span></span></td>';
                        } else {
                            html += '<td class="calendar-current-month"><span class="' + className + '">' + (j - monthFirstDay + 1) + '</span></td>';
                        }
                        if (j % 7 == 6) html += '</tr>';
                    }

                    calendarTbody.empty().append(html);
                },
                nextMonth: function () {
                    if (!(this.active.year == this.limitUp.year && this.active.month == this.limitUp.month)) {
                        calendarActiveMonthAndYear.addClass('moveup');
                        calendarTbody.addClass('moveright');

                        setTimeout(function () {
                            calendarActiveMonthAndYear.removeClass('moveup');
                            calendarActiveMonthAndYear.addClass('movedown');

                            calendarTbody.removeClass('moveright');
                            calendarTbody.addClass('moveleft');
                        }, 300);
                        setTimeout(function () {
                            calendarActiveMonthAndYear.removeClass('movedown');
                            calendarTbody.removeClass('moveleft');
                        }, 450);

                        if (this.active.month == 11) {
                            this.active.month = 0;
                            this.active.year = this.active.year + 1;
                        } else {
                            this.active.month = this.active.month + 1;
                        }
                        this.createMonthHtml(this.active.year, this.active.month);
                    } else {
                        //console.log('Calendar Limit Up');
                    }
                },
                prevMonth: function () {
                    if (!(this.active.year == this.limitDown.year && this.active.month == this.limitDown.month)) {
                        calendarActiveMonthAndYear.addClass('moveup');
                        calendarTbody.addClass('moveright');
                        setTimeout(function () {
                            calendarActiveMonthAndYear.removeClass('moveup');
                            calendarActiveMonthAndYear.addClass('movedown');

                            calendarTbody.removeClass('moveright');
                            calendarTbody.addClass('moveleft');
                        }, 300);
                        setTimeout(function () {
                            calendarActiveMonthAndYear.removeClass('movedown');
                            calendarTbody.removeClass('moveleft');
                        }, 450);

                        if (this.active.month == 0) {
                            this.active.month = 11;
                            this.active.year = this.active.year - 1;
                        } else {
                            this.active.month = this.active.month - 1;
                        }
                        this.createMonthHtml(this.active.year, this.active.month);
                    } else {
                        //console.log('Calendar Limit Down');
                    }
                }
            };

            calendar.active.year = calendar.currentYear;
            calendar.active.month = calendar.currentMonth;
            calendar.limitUp.year = rsOptions.calendar.endYear; //calendar.currentYear + 1;
            calendar.limitUp.month = rsOptions.calendar.endMonth; //calendar.currentMonth;
            calendar.limitDown.year = rsOptions.calendar.startYear; //calendar.currentYear;
            calendar.limitDown.month = rsOptions.calendar.startMonth; //calendar.currentMonth;
            calendar.weekStart = rsOptions.calendar.weekStart;
            calendar.busyDays = rsOptions.calendar.busyDays;

            calendar.init();

            calendarHtml.on(clickEventType, '.calendar-prev', function () {
                calendar.prevMonth();
            });

            calendarHtml.on(clickEventType, '.calendar-next', function () {
                calendar.nextMonth();
            });
        }
    }

    function filterBarLinePositioning(grid, button) {
        var filterValue = button.attr('data-filter');
        var buttonLeft = button.position().left;
        var buttonWidth = button.outerWidth();
        var filterLine = button.closest('.filter').find('.filter-bar-line');

        grid.isotope({filter: filterValue});
        filterLine.css({"left": buttonLeft + "px", "width": buttonWidth});
    }

    function windowSmoothScrollOnLoad() {
		if(window.location.hash && body.hasClass('home')) {
			$('html, body').animate({scrollTop: ($(window.location.hash).offset().top)}, 0);
		}       
    }    

    function hideSitePreloader() {
        $('#preloader').remove();
        $('body').removeClass('loading');
    }

    function initialiseGoogleMap() {
        var latlng;
        var lat = 44.5403;
        var lng = -78.5463;
        var map = $('#map');
        var mapCanvas = map.get(0);
        var map_styles = [
            {"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]},
            {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]},
            {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]},
            {
                "featureType": "road.arterial",
                "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]
            },
            {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]},
            {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]},
            {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]},
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
            }
        ];

        if ($('html').hasClass('theme-skin-dark')) {
            map_styles = [
                {"stylers": [{"hue": "#ff1a00"}, {"invert_lightness": true}, {"saturation": -100}, {"lightness": 33}, {"gamma": 0.5}]},
                {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#2D333C"}]}
            ];
        }


        if (map.data("latitude")) lat = map.data("latitude");
        if (map.data("longitude")) lng = map.data("longitude");

        latlng = new google.maps.LatLng(lat, lng);

        // Map Options
        var mapOptions = {
            zoom: 14,
            center: latlng,
            scrollwheel: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: map_styles
        };

        // Create the Map
        map = new google.maps.Map(mapCanvas, mapOptions);

        var marker = new Marker({
            map: map,
            position: latlng,
            icon: {
                path: SQUARE_PIN,
                fillColor: '',
                fillOpacity: 0,
                strokeColor: '',
                strokeWeight: 0
            },
            map_icon_label: '<span class="map-icon map-icon-postal-code"></span>'
        });

        // Keep Marker in Center
        google.maps.event.addDomListener(window, 'resize', function () {
            map.setCenter(latlng);
        });
    };

    function lockScroll() {
        var $html = $('html');
        var $body = $('body');

        var initWidth = $body.outerWidth();
        var initHeight = $body.outerHeight();

        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        $html.data('scroll-position', scrollPosition);
        $html.data('previous-overflow', $html.css('overflow'));
        $html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        var marginR = $body.outerWidth() - initWidth;
        var marginB = $body.outerHeight() - initHeight;
        $body.css({'margin-right': marginR, 'margin-bottom': marginB});
        $html.addClass('lock-scroll');
    }

    function unlockScroll() {
        var $html = $('html');
        var $body = $('body');

        $html.css('overflow', $html.data('previous-overflow'));
        var scrollPosition = $html.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        $body.css({'margin-right': 0, 'margin-bottom': 0});
        $html.removeClass('lock-scroll');
    }

    function openMobileNav() {
        $('body').addClass('mobile-nav-opened');
        lockScroll();
    }

    function closeMobileNav() {
        $('body').removeClass('mobile-nav-opened');
        unlockScroll();
    }

    function openSidebar() {
        $('body').addClass('sidebar-opened');
        lockScroll();
    }

    function closeSidebar() {
        $('body').removeClass('sidebar-opened');
        unlockScroll();
    }

    function arrayContains(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    }

    function isValidEmail(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    function setContactSectionHeight() {
        var section = $('.section-contact .row');
        var section_box = section.find('.section-box');

        if (windowW > 767) {
            section_box.css('min-height', section.height() + 'px');
        } else {
            section_box.css('min-height', '0');
        }
    }

    function ripple(element, pageX, pageY) {
        var $rippleElement = $('<span class="ripple-effect" />');
        var xPos = parseInt(pageX, 10) - parseInt(element.offset().left, 10);
        var yPos = parseInt(pageY, 10) - parseInt(element.offset().top, 10);
        var size = Math.floor(Math.min(element.height(), element.width()) * 0.5);
        var animateSize = Math.floor(Math.max(element.width(), element.height()) * Math.PI);

        $rippleElement
            .css({
                top: yPos,
                left: xPos,
                width: size,
                height: size
            })
            .appendTo(element)
            .animate({
                width: animateSize,
                height: animateSize,
                opacity: 0
            }, 500, function () {
                $(this).remove();
            });
    }

    function setPriceBoxesHeight() {
        var priceRow = $('.price-list');

        if (windowW > 767) {
            priceRow.each(function () {
                var priceRowHeight = 0;
                var priceBox = $(this).find('.price-box');

                priceBox.css('height', 'auto');
                priceRowHeight = $(this).height();
                priceBox.height(priceRowHeight);
            });
        } else {
            $('.price-box').css('height', 'auto');
        }
    }
   	
	
	/**
     * Window Resize
     */
    $(window).resize(function () {
        windowW = $(window).width();
        windowH = $(window).height();
		
		positioningInterestsTooltips();
		positioningTimelineElements();
		setContactSectionHeight();
		setPriceBoxesHeight();
    });
	

    /**
     * Document Ready
     */
    $(function() {
        setWindowScrollAppear();
		setProgressBarsFill();		
		setContactSectionHeight();
        setPriceBoxesHeight();
		availabilityCalendar();
		positioningInterestsTooltips();
		
		// Header Navigation
        $('#nav>ul').onePageNav({
            currentClass: 'active',
            changeHash: true,
            scrollSpeed: 500,
            scrollThreshold: 0.5,
            easing: 'swing'
        });
		
		// Add header navigation hover lines
        if ($('.nav-wrap .nav').length > 0) {
            $('.nav-wrap .nav > ul > li > a').append('<span></span>');
        }
		
		// Sticky Navigation
		var header = $('.header');
		var stickyNav = $('.head-bar');
		var stickyNavHeight = 0;
		var stickyNavigationAppear = function() {							
			if(stickyNav.length > 0) {
				stickyNav.addClass('animated');				
				if ($(window).width() > 767 && !isMobile) {
					if (stickyNavHeight < stickyNav.outerHeight()) {
						stickyNavHeight = stickyNav.outerHeight();
						header.css('min-height', stickyNavHeight + 'px');
					}

					if ($(window).scrollTop() > stickyNav.outerHeight()) {
						stickyNav.addClass('head-sticky');
					} else {
						stickyNav.removeClass('head-sticky');
					}
				} else {
					stickyNav.removeClass('head-sticky');
					header.css('min-height', '0px');
				}
				
			}		        
		}
			
        stickyNavigationAppear();
		
		$(window).scroll(function () {
			stickyNavigationAppear();
		});
		
		$(window).scroll(function () {
			stickyNavigationAppear();
		});
		
		/** Mobile Navigation */
        // Mobile Navigation
        $('#mobile-nav>ul').onePageNav({
            currentClass: 'active',
            changeHash: true,
            scrollSpeed: 500,
            scrollThreshold: 0.5,
            easing: 'swing',
            begin: function () {
                closeMobileNav();
            }
        });

        // open/close mobile navigation
        $(document).on(clickEventType, '.btn-mobile', function () {
            if ($('body').hasClass('mobile-nav-opened')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        // init mobile navigation custom scroll
        if ($('.mobile-nav').length > 0) {
            $(".mobile-nav-inner").mCustomScrollbar({
                theme: "dark"
            });
        }
		
		/** Material Inputs */
        var material_inputs = $('.input-field input, .input-field textarea');

        for (var i = 0; i < material_inputs.length; i++) {
            if ($(material_inputs[i]).val())
                $(material_inputs[i]).parent('.input-field').addClass('used');
            else
                $(material_inputs[i]).parent('.input-field').removeClass('used');
        }

        material_inputs.on('blur', function () {
            if ($(this).val())
                $(this).parent().addClass('used');
            else
                $(this).parent().removeClass('used');
        });

        material_inputs.on('focus', function () {
            $(this).parent().addClass('used');
        });
		
		/** Ripple:
         *  appears where clicked on the element */
        $(document).on(clickEventType, '.ripple', function (e) {
            ripple($(this), e.pageX, e.pageY);
        });


        /** Ripple Centered:
         *  appears from element center */
        $(document).on(clickEventType, '.ripple-centered', function () {
            var $rippleElement = $('<span class="ripple-effect" />'),
                $buttonElement = $(this),
                xPos = $buttonElement.width() / 2,
                yPos = $buttonElement.height() / 2,
                size = Math.floor(Math.min($buttonElement.height(), $buttonElement.width()) * 0.5),
                animateSize = Math.floor(Math.max($buttonElement.width(), $buttonElement.height()) * 1.5);
            $rippleElement
                .css({
                    top: yPos,
                    left: xPos,
                    width: size,
                    height: size,
                    backgroundColor: $buttonElement.data("ripple-color")
                })
                .appendTo($buttonElement)
                .animate({
                    width: animateSize,
                    height: animateSize,
                    opacity: 0
                }, 450, function () {
                    $(this).remove();
                });
        });
		
		/** Audio Player */
        var post_audio = $('.post-media audio');
        if (post_audio.length > 0) {
            post_audio.mediaelementplayer({
                loop: false,
                audioHeight: 40,
                startVolume: 0.7
            });
        }


        /** Video Player */
        var post_video = $('.post-media video');
        if (post_video.length > 0) {
            post_video.mediaelementplayer({
                loop: false,
                defaultVideoWidth: 723,
                defaultVideoHeight: 405,
                videoWidth: -1,
                videoHeight: -1,
                startVolume: 0.7,
                enableAutosize: true,
                alwaysShowControls: true
            });
        }
		
		/** Sidebar */

        // open/close sidebar
        $(document).on(clickEventType, '.btn-sidebar', function () {
            if ($('body').hasClass('sidebar-opened')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // init sidebar custom scroll
        var sidebarFixed = $('.sidebar-fixed');
        if( sidebarFixed.length > 0 ) {
            var sidebarScrollArea = sidebarFixed.find('.widget-area');
            sidebarScrollArea.mCustomScrollbar({
                theme: "dark",
                updateOnContentResize: true,
                updateOnImageLoad: true
            });
        }

        /** Overlay:
         *  the same overlay is used for fixed sidebar and for mobile navigation */
        $(document).on(clickEventType, '#overlay', function () {
            if ($('body').hasClass('mobile-nav-opened')) closeMobileNav();

            if ($('body').hasClass('sidebar-opened')) closeSidebar();
        });


        /** Google Map Initialisation */
        if ($('#map').length > 0) {
            initialiseGoogleMap();
        }




        /** Window Scroll Top Button */
        var $btnScrollTop = $('.btn-scroll-top');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $btnScrollTop.fadeIn();
            } else {
                $btnScrollTop.fadeOut();
            }
        });

        $btnScrollTop.on('click', function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /** Contact Form */
        $('.rsFormSubmit').on('click', function (e) {                        
            var rsForm = $(this).closest('.rsForm');
			var rsFormErrors = false;
			var rsFormAction = rsForm.attr('action');
			var rsFormCaptcha = rsForm.data('captcha');		
			var rsFormFields = rsForm.find('.input-field');		           	
            var rsFormName = rsForm.find("[name='rsName']");						
            var rsFormEmail = rsForm.find("[name='rsEmail']");
            var rsFormMessage = rsForm.find("[name='rsMessage']");		
            var rsFormResponce = rsForm.find('.rsFormResponce');			
			
			// Button ripple effect
			ripple($(this).parent(), e.pageX, e.pageY);
			
            // Reset form errors
            rsFormFields.removeClass('error');
            rsFormErrors = false;						
						
			// Validate form fields	
            if(!rsFormName.val()) {
                rsFormErrors = true;
                rsFormName.parent().addClass('error');
            }
			
			if(!rsFormEmail.val() || !isValidEmail(rsFormEmail.val())) {
                rsFormErrors = true;
                rsFormEmail.parent().addClass('error');
            }
			
			if(!rsFormMessage.val()) {
                rsFormErrors = true;
                rsFormMessage.parent().addClass('error');
            }
									
			if(rsFormErrors) {
				// if has errors - do nothing
				return false;
			} else {	
				if (rsFormCaptcha === true) {
					// if captcha - goto captcha page
					return true;
				} else {
					// if no captcha - make ajax request
					$.post( rsFormAction,
						rsForm.serialize(),
						function (response) {
							var data = jQuery.parseJSON( response );
							if(data){								
								rsForm.append('<div class="rsFormResponce"><strong>Congratulation!</strong><br>Your email was sent successfully!</div>');
							} else {
								rsForm.append('<div class="rsFormResponce"><strong>OOPS!</strong> Something went wrong.<br>Please try again.</div>');
							}							
						}
					);
					return false;
				}
			}					                         
        });

		
    });    


    /**
     * Window Load
     */
    $(window).load(function () {
		/** Blog */
        var blog_grid_selector = $('.blog-grid');
        if (blog_grid_selector.length > 0) {
            var blog_grid = blog_grid_selector.isotope({
                isOriginLeft: !rsOptions.rtl,
                itemSelector: '.blog-grid .grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });

            blog_grid.imagesLoaded().progress(function () {
                blog_grid.isotope('layout');
            });
        } 
        
        /** Portfolio */
        var grid_seector = $('.grid');
        if (grid_seector.length > 0) {

            // Isotope Initialization
            var $grid = grid_seector.isotope({
				isOriginLeft: !rsOptions.rtl,
                itemSelector: '.grid .grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });

            $grid.imagesLoaded().progress(function () {
                $grid.isotope('layout');
            });

            // Isotope Filter
            var filter = $('.filter');
            if (filter.length > 0) {
                var filter_btn = filter.find('button');
                var filter_btn_first = $('.filter-btn-group button:first-child');

                filterBarLinePositioning($grid, filter_btn_first);
                filter_btn_first.addClass('active');

                filter_btn.on('click', function () {
                    filter_btn.removeClass('active');
                    $(this).addClass('active');
                    $('.grid-box').addClass('animated');
                    filterBarLinePositioning($grid, $(this));
                });
            }

            // Isotope Append New Elements
            var $elemTotalCount = 0;
            var $elemLoadedCount = 0;
            var $elemCountPerLoad = 3;
            var $gridMore = $('.grid-more');
            var $gridMoreBtn = $gridMore.find('.btn');
            var $gridAjaxLoader = $gridMore.find('.ajax-loader');

            $gridMoreBtn.on('click', function () {
                $.ajax({
                    url: "ajax/portfolio.html",
                    dataType: "html",
                    beforeSend: function () {
                        // show ajax loader
                        $gridMoreBtn.css('display', 'none');
                        $gridAjaxLoader.css('display', 'inline-block');
                    },
                    success: function (data) {
                        $elemTotalCount = $.grep($.parseHTML(data), function (el, i) {
                            return $(el).hasClass("grid-item")
                        }).length;

                        if ($elemLoadedCount < $elemTotalCount) {
                            for (var i = 1; i <= $elemCountPerLoad; i++) {

                                var $item = $(data).filter('.grid-item:eq(' + $elemLoadedCount + ')'); // started from 0
                                grid_seector.append($item).isotope('appended', $item);

                                $elemLoadedCount++;
                            }
                        }

                        if ($elemLoadedCount >= $elemTotalCount) {
                            $gridMore.hide();
                        }

                        // hide ajax loader
                        $gridMoreBtn.css('display', 'inline-block');
                        $gridAjaxLoader.css('display', 'none');
                    }
                })
            });


            // Portfolio fancybox
            var _player;
            $('.portfolioFancybox').fancybox({
                padding: 0,
                wrapCSS: 'fancybox-portfolio',
                maxWidth: '795px',
                maxHeight: '85%',
                minWidth: '250px',
                mouseWheel: 'true',
                scrolling: "no",
                autoCenter: true,
                beforeShow: function () {
                    // Get current popup
                    var currentID = $(this.element).attr("href");
                    var currentPopup = $('.fancybox-portfolio ' + currentID);

                    // Append current popup embed
                    var currentEmbed = currentPopup.find('.inline-embed');
                    if (currentEmbed.length > 0) {
                        var currentEmbedType = currentEmbed.data('embed-type');
                        var curentEmbedUrl = currentEmbed.data('embed-url');

                        switch (currentEmbedType) {
                            case "image":
                                currentEmbed.empty();
                                currentEmbed.addClass('inline-embed-image');
                                currentEmbed.append('<img src="' + curentEmbedUrl + '" />');
                                break;
                            case "iframe":
                                currentEmbed.empty();
                                currentEmbed.addClass('inline-embed-iframe');
                                currentEmbed.append('<iframe src="' + curentEmbedUrl + '" allowfullscreen></iframe>');
                                break;
                            case "video":
                                _player = ''; // reset player
                                currentEmbed.addClass('inline-embed-video');
                                var currentVideo = $('' + currentID + '').find('video');
                                if (currentVideo.length > 0) {
                                    new MediaElementPlayer(currentID + ' video', { // initialize player
                                        loop: false,
                                        defaultVideoWidth: 723,
                                        defaultVideoHeight: 405,
                                        videoWidth: -1,
                                        videoHeight: -1,
                                        startVolume: 0.7,
                                        enableAutosize: true,
                                        alwaysShowControls: true,
                                        success: function (mediaElement, domObject) {
                                            _player = mediaElement;
                                            _player.load();
                                        }
                                    });
                                }
                                break;
                        }
                    }
                },
                afterShow: function () {
                    // Get current popup
                    var currentID = $(this.element).attr("href");
                    var currentPopup = $('.fancybox-portfolio ' + currentID);

                    // Make current popup visible with css
                    currentPopup.addClass('opened');
                },
                beforeClose: function () {
                    // reset player
                    _player = '';
                }
            });
        }
        
        /** Timeline:
         *  positioning timeline elements */
		if(rsOptions.rtl){ // switch timeline box classes for RTL
			var tLineLeft = $('.timeline-box-left');
			var tLineRight = $('.timeline-box-right');
			
			tLineLeft.removeClass('timeline-box-left').addClass('timeline-box-right');
			tLineRight.removeClass('timeline-box-right').addClass('timeline-box-left');
			tLineLeft.find('.animate-right').removeClass('animate-right').addClass('animate-left');			
			tLineRight.find('.animate-left').removeClass('animate-left').addClass('animate-right');
		} 
        positioningTimelineElements();        

        /** Reference Slider */
	    var ref_slider = $('.ref-slider');
        if (ref_slider.length > 0) {
            for (var i = 0; i < ref_slider.length; i++) {
                var ref_slider_prev = $(ref_slider[i]).closest('.section-box').find('.slider-prev');
                var ref_slider_next = $(ref_slider[i]).closest('.section-box').find('.slider-next');

                $(ref_slider[i]).bxSlider({                    
					pager: false,
					controls: true,
					auto: rsOptions.refSlider.auto,					
                    speed: rsOptions.refSlider.speed,
                    pause: rsOptions.refSlider.pause,
					autoHover: rsOptions.refSlider.autoHover,
                    adaptiveHeight: rsOptions.refSlider.adaptiveHeight,
					adaptiveHeightSpeed: rsOptions.refSlider.adaptiveHeightSpeed,
                    nextSelector: ref_slider_prev,
                    prevSelector: ref_slider_next,
                    nextText: '<i class="rsicon rsicon-chevron_right"></i>',
                    prevText: '<i class="rsicon rsicon-chevron_left"></i>'
                });
            }
        }

        /** Post Slider */
        var post_slider = $('.post-slider');
        if (post_slider.length > 0) {
            for (var i = 0; i < post_slider.length; i++) {
                var prevSelector = $(post_slider[i]).closest('.post-media').find('.slider-prev');
                var nextSelector = $(post_slider[i]).closest('.post-media').find('.slider-next');

                $(post_slider[i]).bxSlider({					
                    pager: false,
                    controls: true,
					speed: rsOptions.postSlider.speed,
					auto: rsOptions.postSlider.auto,
					pause: rsOptions.postSlider.pause,
					autoHover: rsOptions.postSlider.autoHover,
                    nextSelector: nextSelector,
                    prevSelector: prevSelector,
                    nextText: '<i class="rsicon rsicon-chevron_right"></i>',
                    prevText: '<i class="rsicon rsicon-chevron_left"></i>'
                });
            }
        }

        /** Clients Carousel */
        var clients_carousel = $(".clients-carousel");
        if (clients_carousel.length > 0) {
            for (var i = 0; i < clients_carousel.length; i++) {
                $(clients_carousel[i]).owlCarousel({                    
					lazyLoad: true,
                    responsive: true,
                    navigation: false,
                    pagination: false,
                    items: rsOptions.clientsSlider.items,
                    singleItem: rsOptions.clientsSlider.singleItem,
                    autoPlay: rsOptions.clientsSlider.autoPlay,
                    stopOnHover: rsOptions.clientsSlider.stopOnHover,
                    itemsDesktopSmall: rsOptions.clientsSlider.itemsDesktopSmall,
                    itemsTabletSmall: rsOptions.clientsSlider.itemsTabletSmall,
                    itemsMobile: rsOptions.clientsSlider.itemsMobile
                });
            }
        }
		
		/** Window smooth scroll to an anchor */
		windowSmoothScrollOnLoad();

        /** Preloader:
         *  site was successfully loaded, hide site pre-loader */
        hideSitePreloader();
    });

})(jQuery);