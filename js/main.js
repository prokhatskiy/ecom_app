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
					if(path === 'brands') {
						$('#brands .brands__viewer').addClass('brands__viewer_active');
					}
					return path;
				}		
			};
			this.default();			
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

	ui = {
		$body : $('body')
	}

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

		$(document).on('keydown', function(event) {
			if(event.keyCode === ESC) {
				router.default();
				$('#search').removeClass('search_open');
				$('#search .search__txt').val('');
			}
		});

		$('#brands .brands__viewer').on('click', function() {
			if(ui.$body.hasClass('state_brands')){
				router.default();
				$(this).removeClass('brands__viewer_active');
			}
			else{
				$(this).addClass('brands__viewer_active');
				router.set('home/brands');
			}			
		});

		$('#search .search__tumbler').on('click', function() {
			$('#search').addClass('search_open');
			$('#search .search__txt').focus();
		});
		$('#search .search__close').on('click', function() {
			$('#search').removeClass('search_open');
		});
	});		
}());

