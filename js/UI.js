var UI = function(conf) {
	var _this = this,
	    conf = conf || {};

	//parameters
	this.$body = $('body');
	this.$win  = $(window);
	this.ESC = 27;
	this.linkSelector = '.link';
	this.closeLinkSelector = '.link_close';
	this.loadDelay = 1000;

	//Load event
	this.$win.on('load:start', function() {
		_this.load(true);
	});
	this.$win.on('load:end', function() {
		_this.load(false);
	});

	//Begin load
	this.$body.trigger('load:start');

	//events
	this.$win.on('resize', function() {
		_.debounce(_this.onResize, 500).call(_this);
		return false;
	});
	this.$win.on('load', function() {
		_this.initLinks();
		_this.resizeMenu();
		_this.onLoad();
		return false;
	});
	this.$win.on('keydown', function() {
		_this.onKeydown();
	});

	//subscribe block
	$('#subscribeBtn').on('click', function() {
		$('#subscribe').addClass('active');
		return false;
	});
	$('#subscribeClose').on('click', function() {
		$('#subscribe').removeClass('active');
		return false;
	});

	//help
	$('#helpBtn').on('click', function(e) {
		$('#help').toggleClass('active');
		return false;
	});

	//login
	$('.login').on('click', function() {
		$('#loginBtn').hide();
		$('#userBtn').show();
	});
	$('#signOut').on('click', function() {
		$('#loginBtn').show();
		$('#userBtn').hide();
		ui.default();
		return false;
	});

	return this;
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
		var $this = $(this);
		if($this.hasClass('login')) {
			$this.addClass('btn_load');
			setTimeout(function() {
				$this.removeClass('btn_load');
				_this.router.set($this.attr('href'));
			}, 1000);
		}
		else {
			_this.router.set($(this).attr('href'));
		}
		
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
	this.resizeMenu();
};

UI.prototype.onLoad = function() {
	var _this = this;
	this.initScroll();
	brands.init();
	search.init();

	setTimeout(function() {	
		//location message
		$('#messageLang').removeClass('hide');	

		_this.locationTimeout();	
		_this.$body.trigger('load:end');
		_this.router = new Router();
		Backbone.history.start();
		_this.map = new Map();	
	}, 1000);	
};

UI.prototype.locationTimeout = function() {
	setTimeout(function() {
		$('#messageLang').addClass('hide');
	}, 3000);
};

UI.prototype.resizeMenu = function() {
	$('.menu').each(function() {
		$(this).height($(this).find('.menu__img').outerHeight());
	});
};

UI.prototype.onKeydown = function() {
	if(event.keyCode === this.ESC) {
		this.router.default();
		search.hide();
	}
};

UI.prototype.load = function(isLoading) {
	if(isLoading) {
		this.$body.addClass('state_load');
		NProgress.start()
	}
	else {
		NProgress.done();
		this.$body.removeClass('state_load');		
	}
};