var Router = Backbone.Router.extend({
	$body : $('body'),

	homePath : 'home',
	currentPage : '',
	currentAction : '',
	currentNum : '',

	$menus : $('.menu'), 

	pages : ['home', 'category', 'products', 'product'],
	actions : ['settings', 'cart', 'wishlist', 'login', 'user', 'menu', 'map'],
	menus : ['women', 'men', 'kids', 'home'],

	routes: {
		':page(/:action)(/*path)' : 'handler',
		'*path' : 'default'
	},

	handler : function(page, action, num) {
		var page = page || false,
		    action = action || false,
		    num = num || false;

		if(page && page != this.currentPage) {
			this.setAction(page, 'page', this.pages);			
		}
		else if(!page) {
			this.default();
			return false;
		}

		if(action && action != this.currentAction) {
			this.setAction(action, 'state', this.actions);			
		}	
		else if(!action) {
			this.clearClasses('state');
		}
	},

	setAction : function(action, prefix, states) {
		if(states.join(' ').indexOf(action) === -1) {
			this.default();
			return false;
		}

		this.clearClasses(prefix);
		this.$body.addClass( prefix + '_' + action);

		switch(prefix) {
			case 'page' : 
				this.currentPage = action; break;
			case 'state' : 
				this.currentAction = action; break;
		}
	},

	clearClasses : function(action) {	
		var prefix = '',
		    clss = [],
		    clsArr = [],
		    clsStr = '';

		if (action === 'page') {
			prefix = 'page';
		    clss = this.pages;
		}
		else if (action === 'state') {
			prefix = 'state';
		    clss = this.actions;
		}
		else {
			return false;
		}

		for (var i = 0; i < clss.length; i++) {
			clsArr[i] = prefix + '_' + clss[i];
		};

		clsStr = clsArr.join(' ');
		console.log(this.$body.removeClass(clsStr))
		this.$body.removeClass(clsStr);
	},

	clearPage : function() {
		this.set(this.currentPage);
		this.currentAction = '';
	},

	default : function() {
		this.clearCls('page', this.pages);
		this.clearCls('state', this.actions);		
		this.currentPage = this.homePath;
		this.currentAction = '';

		$('#brands .brands__viewer').removeClass('brands__viewer_active');
	},

	set : function(path) {
		document.location.hash = path;
	}
});