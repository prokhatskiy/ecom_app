var Product = function() {
	this.$body = $('body');
	this.$win = $(window);
	this.$container = $('#product');
	this.$img = $('.product__img');

	this.carouselNum = 3;

	$('.product__tab').on('click', function() {
		var id = $(this).attr('data-tab-id');
		$('.product__tab, .product__cond').removeClass('active');
		$('.product__tab[data-tab-id=' + id + '], .product__cond[data-tab-id=' + id + ']').addClass('active');
		if($('.product__info').scrollTop() >= 300) return false;
		$('.product__info').animate({
			scrollTop : 300
		}, 1000);
		
		return false;
	});

	$('.param_size .param__i').on('click', function() {
		var $this = $(this);
		$this.parents('.param').find('.param__i.active').removeClass('active');
		$this.addClass('active');
		return false;
	});

	$('.param_colors .param__i').on('click', function() {
		var $this = $(this),
			id = $this.attr('data-color');
		if($this.hasClass('param__i_disable')) return false;
		$this.parents('.param').find('.param__i.active').removeClass('active');
		$this.addClass('active');
		$('.product__img.active').removeClass('active');
		$('.product__img[data-color=' + id + ']').addClass('active');
		return false;
	});

	this.resizeImg();
	this.$win.on('resize', $.proxy(this.resizeImg, this));

	this.initCarousel();
};

Product.prototype.resizeImg = function() {
	this.$img.height(this.$container.height() - 60);
};

Product.prototype.initCarousel = function() {
	var _this = this;
	this.$container.find('.product__imgs-i').on('click', function() {
		$this = $(this);
		_this.carouselNum = $this.attr('data-img-id');
		_this.setCarouselSlide(_this.carouselNum);
		return false;
	});
	this.$container.find('.product__img-prev').on('click', function() {
		(_this.carouselNum - 1 < 1) ? _this.carouselNum = 3 :  _this.carouselNum -= 1;
		_this.setCarouselSlide(_this.carouselNum);
	});
	this.$container.find('.product__img-next').on('click', function() {
		(_this.carouselNum + 1 > 3) ? _this.carouselNum = 1 :  _this.carouselNum += 1;
		_this.setCarouselSlide(_this.carouselNum);
	});
};

Product.prototype.setCarouselSlide = function(num) {
	this.$container.find('.product__imgs-i.active, .product__src.active').removeClass('active');
	this.$container.find('[data-img-id=' + num + ']').addClass('active');
};

