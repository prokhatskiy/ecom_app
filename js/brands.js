var brands = {
	$container : $('#brands'),
	$btn : $('#brandsBtn'),
	init : function() {
		this.$btn.on('click', function() {
			if(ui.$body.hasClass('state_brands')){
				ui.$body.removeClass('state_brands');
				$(this).removeClass('brands__viewer_active');
			}
			else {
				ui.$body.addClass('state_brands');
				$(this).addClass('brands__viewer_active');
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