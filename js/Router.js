var Router = Backbone.Router.extend({
	body : document.body,
	homePath : 'home',
	$menus : $('.menu'), 
	pathArr : ['brands', 'settings', 'cart', 'wishlist', 'login', 'user', 'menu'],
	routes: {
		'home/menu/*path' : 'menuHandler',
		'home/*path' : 'handler',
		'*path' : 'default'
	},
	handler : function(path) {			
		var arr = this.pathArr,
		    l = arr.length;
		for (var i = 0; i < l; i++) {
			if(arr[i] === path) {
				this.body.className = 'state_' + path;
				if(path === 'brands') { 
					brands.activateBtn();
				}
				return path;
			}		
		};
		this.default();			
	},
	menuHandler : function(path) {
		this.body.className = 'state_menu state_menu_' + path;
	},
	default : function() {
		this.set(this.homePath);
		$('#brands .brands__viewer').removeClass('brands__viewer_active');
		this.body.className = '';
	},
	set : function(path) {
		document.location.hash = path;
	}
});