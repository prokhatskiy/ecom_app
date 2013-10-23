var brands = {
	$container : $('#brands'),
	$btn : $('#brands .brands__viewer'),
	init : function() {
		this.$btn.on('click', function() {
			if(ui.$body.hasClass('state_brands')){
				ui.router.default();
				$(this).removeClass('brands__viewer_active');
			}
			else {
				$(this).addClass('brands__viewer_active');
				ui.router.set('home/brands');
			}			
		});		
	},
	activateBtn : function() {
		this.$btn.addClass('brands__viewer_active');
	},
	deactivateBtn : function() {
		this.$btn.removeClass('brands__viewer_active');
	}
}