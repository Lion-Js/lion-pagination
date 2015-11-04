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
		var page_number_arr = [];
		var btns = $('.page_number', obj);

		for(var i = 0; i < btns.length; i++) {
			page_number_arr.push(i + 1);
		}

		var page_info = {
			page_now: 1,
			page_jump: 1,
			click_index: 1,
			get_page_success: function() {
				this.page_now = this.page_jump;
				if(this.page_now !== 1) {
					$('.lion-previous', obj).removeClass('disable');
				}else{
					$('.lion-previous', obj).addClass('disable');
				}

				btns_list_again(btns, this.click_index, page_number_arr, this.page_jump);
			}
		};

		obj.bind('click', function(ev) {
			var target = $(ev.target);

			if(target.closest('.lion-jump-btn').length) {

			}else if(target.closest('li').hasClass('lion-previous')) {

			}else if(target.closest('li').hasClass('lion-next')) {

			}else if(target.closest('.page_number').length && !target.closest('.page_number').hasClass('active')) {
				var page_jump = parseInt(target.closest('.page_number').text());

				page_info.page_jump = page_jump;
				page_info.click_index = target.closest('.page_number').index();
				opts.request(page_info);
			}
		});
	}

	function btns_list_again(btns, page_to, page_number_arr, page_jump) {
		var move_count = page_to - 6;
		var next = true;

		if(move_count < 0) {
			next = false;
			move_count = Math.abs(move_count);
		}

		for(var i = 0; i < move_count; i++) {
			if(next) {
				page_number_arr.shift();
				page_number_arr.push(page_number_arr[page_number_arr.length - 1] + 1);
			}else{
				if(page_number_arr[0] === 1) {
					break;
				}
				page_number_arr.pop();
				page_number_arr.unshift(page_number_arr[0] - 1);
			}
			
		}

		for(var j = 0; j < btns.length; j++) {
			$('a', btns.eq(j)).text(page_number_arr[j]);
		}

		btns.removeClass('active');

		for(var k = 0; k < btns.length; k++) {
			if(parseInt($('a', btns.eq(k)).text(), 10) === page_jump) {
				btns.eq(k).addClass('active');
			}
		}
	}

	$.fn.lion_pagination = function(options) {  
		var opts = $.extend({}, $.fn.lion_pagination.defaults, options);
		
		return this.each(function() { 
			var obj = $(this);

			main(obj, opts);
		});

	};

    //插件的defaults    
	$.fn.lion_pagination.defaults = {};
})(jQuery);