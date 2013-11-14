var Map = function(conf) {
	var _this = this,
	    conf = conf || {};

	this.mapCenter = [38.4, -100.3];

	this.cords = [
		[40.07982, -75.31033],
		[40.71095, -74.00980],
		[38.97535, -74.91666],
		[37.7242, -122.4434],
		[33.9802, -118.2874],
		[36.1472, -115.1773],
		[29.7492, -95.396],
		[33.7843, -84.422]
	];

	this.marker = 'img/map__marker.png';

	this.ll = new google.maps.LatLng(this.mapCenter[0], this.mapCenter[1]);

	this.mapOptions = {
      	center: this.ll,
      	zoom: 5,
       	panControl: false,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: true,
		streetViewControl: true,
		overviewMapControl: false,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.markers = [];

	this.$containser = conf.$containser || $('#map');

	this.init();

	$('#storeLocatorBtn').on('click', function() {
		_this.reset();		
		$('#mapPopup').addClass('active');
		setTimeout(function() {
			$('#mapPopup').removeClass('active');
		}, 5000);
	});

	return this;
};

Map.prototype.init = function() {
    this.map = new google.maps.Map(this.$containser[0], this.mapOptions);

	for (var i = 0; i < this.cords.length; i++) {
		this.markers[i] = new google.maps.Marker({
			position: new google.maps.LatLng(this.cords[i][0], this.cords[i][1]),
			map: this.map,
			icon: this.marker
	    });	
	};

	return this;
};

Map.prototype.reset = function() {
	if(this.map) {
		this.map.setCenter(new google.maps.LatLng(this.mapCenter[0], this.mapCenter[1]));
	}
};

