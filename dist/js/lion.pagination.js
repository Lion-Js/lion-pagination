/*!
 * lion-pagination.js v0.1.5 (https://github.com/Lion-Js/lion-pagination)
 * Copyright DB.Murphy
 * 2015/11/21
 * Email: rainbolean@sina.com
 * Licensed under the MIT license
 */

;(function($) {
	'use strict';
	function main(obj, opts) {
		obj.bind('click', function(ev) {
			var target = $(ev.target);

			if(target.closest('.lion-jump-btn').length) {

			}else if(target.closest('li').hasClass('lion-previous')) {

			}else if(target.closest('li').hasClass('lion-next')) {

			}else if(target.closest('.page_number').length && !target.closest('.page_number').hasClass('active')) {
				var page_jump = parseInt(target.closest('.page_number').text());

				opts.request({
					page_jump: page_jump
				});
			}
		});
	}

	$.fn.lion_pagination = function(options) {  
		var opts = $.extend({}, $.fn.lion_pagination.defaults, options);
		
		return this.each(function() { 
			var obj = $(this);

			main(obj, opts);
		});

	};

    //插件的defaults    
	$.fn.lion_pagination.defaults = {
		page_now: 1
	};
})(jQuery);