var UI = function(conf) {
	var _this = this,
	    conf = conf || {};

	//parameters
	this.$body = $('body');
	this.$win  = $(window);
	this.ESC = 27;
	this.linkSelector = '.link';
	this.closeLinkSelector = '.link_close';

	//events
	this.$win.on('resize', function() {
		_.debounce(_this.onResize, 500).call(_this);
		return false;
	});
	this.$win.on('load', function() {
		_this.initLinks();
		_this.resizeMenu();
		setTimeout(function() {
			_this.$body.removeClass('state_load');
			_this.onLoad();
		}, 1000);
		return false;
	});
	this.$win.on('keydown', function() {
		_this.onKeydown();
	});
};	

UI.prototype.initScroll = function(selector) {
	var selector = selector || '.scroll';
	return this.customScrollbars = $(selector).mCustomScrollbar({
		 	autoHideScrollbar: true, 
		 	autoDraggerLength : true,
		 	scrollInertia: 10,
		 	mouseWheelPixels: 50
		});
};

UI.prototype.initLinks = function() {
	var _this = this;
	$(this.linkSelector).on('click', function() {
		_this.router.set($(this).attr('href'));
		return false;
	});
	$(this.closeLinkSelector).on('click', function() {
		_this.router.default();
		return false;
	});
};

UI.prototype.refreshScroll = function($el) {
	var $el = $el || $('.scroll');
	return $el.mCustomScrollbar('update');
}

UI.prototype.onResize = function() {
	this.refreshScroll();
	this.resizeMenu();
};

UI.prototype.onLoad = function() {
	this.router = new Router();
	Backbone.history.start();
	this.initScroll();
	brands.init();
	search.init();

	this.locationTimeout();
};

UI.prototype.locationTimeout = function() {
	setTimeout(function() {
		$('#messageLang').addClass('hide');
	}, 10000);
};

UI.prototype.resizeMenu = function() {
	$('.menu').each(function() {
		$(this).height($(this).find('.menu__img').outerHeight());
	});
};

UI.prototype.onKeydown = function() {
	if(event.keyCode === this.ESC) {
		router.default();
		search.hide();
	}
};