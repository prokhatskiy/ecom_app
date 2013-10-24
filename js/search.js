var search = {
	$el : $('#search'),
	$txt : $('#search .search__txt'),
	$tumbler : $('#search .search__tumbler'),
	$hideBtn : $('#search .search__close'),
	$result : $('#search .search__result'),
	$form : $('#search form'),
	$btn : $('#search .search__btn'),

	openCls : 'search_open',
	loadCls : 'search_load',
	showCls : 'search__result_show',
	hideCls : 'search__result_hide',

	init : function() {
		var _this = this;
		this.searchTumbler();
		ui.$win.on('click', function() {
			_this.hideResult();
		});	

		this.$el.on('click', function(e) {
			e.stopPropagation();
		});

		this.$txt.on('keydown', function() {
			_.debounce(_this.onSearch, 1000).call(_this);
		});

		this.$form.on('submit', function() {
			return false;
		});
	},
	searchTumbler : function() {	
		var _this = this;		
		this.$tumbler.on('click', function() {
			_this.$el.addClass(_this.openCls);
			_this.$txt.focus();
		});
		this.$hideBtn.on('click', function() {
			_this.$el.removeClass(_this.openCls);
			_this.hideResult();
		});
	},
	hide : function() {
		this.$el.removeClass(this.openCls);
		this.$txt.val('');
	},
	onSearch : function() {
		var _this = this;
		
		if($.trim(_this.$txt.val()) !== '') {
			this.$el.addClass(this.loadCls);
			setTimeout(function() {
				_this.$el.removeClass(_this.loadCls);
				_this.showResult();
			}, 1000);
		}
		else {
			_this.hideResult();
		}
				
		return false;
	},
	hideResult : function() {
		this.$result.removeClass(this.showCls);
		this.$result.addClass(this.hideCls);
	},
	showResult : function() {
		this.$result.addClass(this.showCls);
		this.$result.removeClass(this.hideCls);
	}
};