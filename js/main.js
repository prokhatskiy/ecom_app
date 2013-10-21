(function() {
	var ESC = 27,
	    Router,
	    router;

	Router = Backbone.Router.extend({
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
						$('#brands .brands__viewer').addClass('brands__viewer_active');
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

	ui = {
		$body : $('body')
	}

	$(window).on('load', function() {	
		router = new Router();
		Backbone.history.start();

		initScroll();
		refreshCart();

		$('.item_body .item_body_info .info_group .control .control_color, .item_body .item_body_info .info_group .control .control_size').on('click', function() {
			$(this).parent('.control').find('.active').removeClass('active');
			$(this).addClass('active');
			return false;
		});

		$('.item_caption_remove').on('click', function() {
			$(this).parents('.cart-body_items_item').fadeOut(300, function() {
				$(this).remove();
				refreshScroll();
				refreshCart();
			});
		});

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

	$('input.qty').on('keyup', refreshCart);		
	menu();
	function menu() {
		$('.menu').each(function() {
			$(this).height($(this).find('.menu__img').outerHeight());
		});
	}
	$(window).on('resize', menu);
}());

function initScroll() {		 	
	 $('.scroll').mCustomScrollbar({
	 	autoHideScrollbar: true, 
	 	autoDraggerLength : true
	 });
}

function refreshScroll() {
 	$('.scroll').each(function() {
 		$(this).mCustomScrollbar('update');
 	});
}

function refreshCart() {
	$('.cart').each(function() {
		var $cont = $(this),
		    $totalPrice = $cont.find('.totalPrice'),
		    price = 0,
		    $items = $cont.find('.cart-body_items_item'),
		    totalNum = $items.length;
		    $totalNum = $cont.find('.numItems');

		$items.each(function() {
			price += $(this).find('input.qty').val() * $(this).find('span[data-price]').attr('data-price');
		});

		$totalPrice.text(price);
		$totalNum.text(totalNum);
	})
}

