var Router = Backbone.Router.extend({
	$body : $('body'),

	homePath : 'home',
	currentPage : '',
	currentState : '',

	routes: {
		':page(/:action)(/*path)' : 'handler',
		'*path' : 'default'
	},

	handler : function(page, state) {
		var page = page || false,
		    state = state || false;

		if(page && page != this.currentPage) {
			this.setPageCls(page);			
		}
		else if(!page) {
			this.default();
			return false;
		}		

		if(state && state != this.currentState) {
			this.setStateCls(state);			
		}	
		else if(!state) {
			this.clearClasses('state');	
		}
	},

	setPageCls : function(page, callback) {
		if(!page) return false;

		this.$body.trigger('load:start');		

		setTimeout($.proxy(function() {
			this.clearClasses('page');			
			this.$body.addClass('page_' + page);
			this.currentPage = page;
			this.$body.trigger('load:end', page);

			if(typeof callback === 'function') {
				callback();
			}
		}, this), 1000);
	},

	setStateCls : function(state) {
		if(!state) return false;
		this.clearClasses('state');
		this.$body.addClass('state_' + state);
		this.currentState = state;
	},

	setState : function(state) {
		if(!state) return;
		var path = this.get();
		this.set(path[0] + '/' + state);
	},

	clearStates : function() {
		this.clearClasses('state');	
		this.set(this.get()[0]);
		this.currentState = '';		
	},

	default : function() {		
		this.set(this.homePath);
	},

	clearClasses : function(prefix) { 
		var cls = this.$body.attr('class').split(' ');
		for (var i = 0, l = cls.length; i < l; i++) {		
			if(new RegExp(prefix + '_').test(cls[i])) {
				this.$body.removeClass(cls[i]);
			}
		};
	},

	set : function(path) {
		document.location.hash = path;
	},

	get : function() {
		return document.location.hash.slice(1).split('/')
	}
});
