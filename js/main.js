(function() {
	var ESC = 27,
	    Router,
	    router;

	Router = Backbone.Router.extend({
		body : document.body,
		homePath : 'home',
		pathArr : ['brands', 'settings', 'cart', 'wishlist', 'login', 'user'],

		routes: {
			'home/*path' : 'handler',
			'*path' : 'default'
		},

		handler : function(path) {			
			var arr = this.pathArr,
			    l = arr.length;
			for (var i = 0; i < l; i++) {
				if(arr[i] === path) {
					this.body.className = 'state_' + path;
					return path;
				}		
			};
			this.default();			
		},
		default : function() {
			this.set(this.homePath);
			this.body.className = '';
		},
		set : function(path) {
			document.location.hash = path;
		}
	});

	$(document).on('ready', function() {		
		router = new Router();
		Backbone.history.start();

		$('.link').on('click', function() {
			router.set($(this).attr('href'));
			return false;
		});

		$('.link_close').on('click', function() {
			router.default();
			return false;
		});
	});

	$(document).on('keydown', function(event) {
		if(event.keyCode === ESC) {
			router.default();
		}
	});
}());

