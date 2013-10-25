var Cart = function(conf) {
	var _this = this,
	    conf = conf || {};

	this.scope = conf.scope || 'cart';

	// remove cart item
	$('.item_caption_remove').on('click', function() {
		_this.delItem(this);
	});

	//events
	ui.$win.on('cart:update', function() {
		_this.update();
	});
	$('.item_body .item_body_info .info_group .control .control_color, .item_body .item_body_info .info_group .control .control_size'
	).on('click', _this.activateItem);

	return this;
};

Cart.prototype.activateItem = function() {
	$(this).parent('.control').find('.active').removeClass('active');
	$(this).addClass('active');
	return false;
};

Cart.prototype.delItem = function(el) {
	$(el).parents('.cart-body_items_item').fadeOut(300, function() {
		$(this).remove();
		ui.$win.trigger('cart:update');
	});
};

Cart.prototype.update = function() {
	ui.refreshScroll();
};

