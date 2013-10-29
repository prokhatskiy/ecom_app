var ProductList = function(conf){
	var _this = this;
	_this.conf = conf || {};
	_this.init();
};
ProductList.prototype.init = function(){
	var _this = this;
	_this.initIsotope('.product-list-holder .isotope',{
        filter: '.isotope-item',
        masonry: {
		  columnWidth: 270
		}
    });

    _this.initColorChange();
    _this.initViewTypeChange();
    _this.initCategoriesList();
};
ProductList.prototype.initIsotope = function(elem, conf){
	var _this = this;
	if (elem){
		if (typeof(elem) == "string") {
			_this.isotopeElem = $(elem);
		} else {
			_this.isotopeElem = elem;
		}
		_this.isotopeElem.isotope(conf);
		$(window).resize(function(){
			_this.isotopeElem.isotope('reLayout');
		});
	}
};
ProductList.prototype.initCategoriesList = function(){
	var elem = $('.products-categories');
	$(document).on('click','.products-categories__title, .products-categories-opener a',function(e){
		elem.toggleClass('products-categories_active');
		e.preventDefault();
	});
	elem.on('click', function(e){
		if (!$(e.target).closest('.products-categories__content').size()){
			elem.toggleClass('products-categories_active');
		}
	});
};
ProductList.prototype.initColorChange = function(){
	var productSelector = '.product-list__item',
		imgSelector = '.product-list__item__visual img',
		inputSelector = '.product-colors__item input';
	$(document).on('change', productSelector+" "+inputSelector, function(){
		$(this).closest(productSelector).find(imgSelector).attr('src',this.value);
	});
};
ProductList.prototype.initViewTypeChange = function(){
	var inputs = $(".product-list__view-types input"),
		classes = "",
		elem = $(".product-list"),
		_this = this;
	inputs.each(function(){
		classes += " "+this.value;
	});
	$(document).on('change',".product-list__view-types input", function(e){
		elem.removeClass(classes).addClass(inputs.filter(':checked').val());
		if (elem.hasClass('product-list_big')){
			_this.isotopeElem.isotope('option',{masonry: {columnWidth: 315}});
		} else {
			_this.isotopeElem.isotope('option',{masonry: {columnWidth: 270}});
		}
		_this.isotopeElem.isotope('reLayout');
	});
	elem.addClass(inputs.filter(':checked').val())
};
