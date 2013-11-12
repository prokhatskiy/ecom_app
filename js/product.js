var Product = function() {
	this.$body = $('body');
	this.$win = $(window);
	this.$container = $('#product');
	this.$img = $('#productImage');

	$('.product__tab').on('click', function() {
		var id = $(this).attr('data-tab-id');
		$('.product__tab, .product__cond').removeClass('active');
		$('.product__tab[data-tab-id=' + id + '], .product__cond[data-tab-id=' + id + ']').addClass('active');
		return false;
	});

	$('.param__i').on('click', function() {
		$this = $(this);
		if($this.hasClass('param__i_disable')) {
			return false;			
		}
		$this.parents('.param').find('.param__i_active').removeClass('param__i_active');
		$this.addClass('param__i_active');
		return false;
	})
};

Product.prototype.resizeImg = function() {
	
};