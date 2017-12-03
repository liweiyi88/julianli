/** rsCard Options */
var rsOptions = {
    rtl: false,	
	timeline: {
		topSpace: 50,
		itemsSpace: 25		
	},
	refSlider: {		
		speed: 800, //Slide transition duration (in ms)		
		auto: false, //Slides will automatically transition
		pause: 6000, //The amount of time (in ms) between each auto transition
		autoHover: true, //Auto show will pause when mouse hovers over slider		
		adaptiveHeight: true, //Dynamically adjust slider height based on each slide's height
		adaptiveHeightSpeed: 500 //Slide height transition duration (in ms).
	},
	postSlider: {
		speed: 800, //Slide transition duration (in ms)
		auto: true, //Slides will automatically transition
		pause: 6000, //The amount of time (in ms) between each auto transition
		autoHover: true //Auto show will pause when mouse hovers over slider
	},
	clientsSlider: {
		items: 5,
		singleItem: false,
		autoPlay: true,
		stopOnHover: true,
		itemsDesktopSmall: [992, 4],
		itemsTabletSmall: [767, 3],
		itemsMobile: [320, 1]
	},
    calendar: {
		startYear: '2016',
		startMonth: '0', // moths are starting form 0-11
		endYear: '2017',
		endMonth: '0',
		weekStart: 'Sunday', // possible values Sunday/Monday
		weekNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],		                
		busyDays: [ // new Date(year, month, day)
			new Date(2016, 0, 10),
			new Date(2016, 0, 8),
			new Date(2016, 0, 12),
			new Date(2016, 0, 30),

			new Date(2016, 1, 3),
			new Date(2016, 1, 13),
			new Date(2016, 1, 29),

			new Date(2016, 2, 3),
			new Date(2016, 2, 13),
			new Date(2016, 2, 29),

			new Date(2016, 3, 5),
			new Date(2016, 3, 18),
			new Date(2016, 3, 21),
			new Date(2016, 3, 25),

			new Date(2016, 4, 3),
			new Date(2016, 4, 15),
			new Date(2016, 4, 28),
			new Date(2016, 4, 29),
			new Date(2016, 4, 30),
			new Date(2016, 4, 31),

			new Date(2016, 5, 10),
			new Date(2016, 5, 8),
			new Date(2016, 5, 30),

			new Date(2016, 6, 3),
			new Date(2016, 6, 13),
			new Date(2016, 6, 29),

			new Date(2016, 7, 5),
			new Date(2016, 7, 18),
			new Date(2016, 7, 25),
			new Date(2016, 7, 30),
			new Date(2016, 7, 31),

			new Date(2016, 8, 10),
			new Date(2016, 8, 8),
			new Date(2016, 8, 30),

			new Date(2016, 9, 3),
			new Date(2016, 9, 13),
			new Date(2016, 9, 29),

			new Date(2016, 10, 5),
			new Date(2016, 10, 18),
			new Date(2016, 10, 25),

			new Date(2016, 11, 3),
			new Date(2016, 11, 15),
			new Date(2016, 11, 28),
			new Date(2016, 11, 29),
			new Date(2016, 11, 30),
			new Date(2016, 11, 31)
		]
    }	
};