'use strict';

/* --------------------------------------------------------------
 paypal_checkout.js 2017-10-30
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2017 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/* globals ppp, initPPP */

/**
 * PayPal Checkout
 *
 * Loads and handles the actions of the PayPal payment wall
 *
 * @module Widgets/paypal_checkout
 */
gambio.widgets.module('paypal_checkout', [], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var _checkPayPal3 = function _checkPayPal3() {
		var paypal3 = $('input[value="paypal3"]'),
		    hub_paypal3 = $('input[data-module_code="PayPalHub"]');

		if (paypal3.get(0)) {
			return paypal3.get(0).checked;
		}

		return hub_paypal3.get(0).checked;
	};

	var $this = $(this),
	    defaults = {
		thirdPartyPaymentsBlock: []
	},
	    options = $.extend(true, {}, defaults, data),
	    module = {},
	    paypal3_checked = _checkPayPal3,
	    continue_button_text = $('div.continue_button input').val(),
	    ppplus_continue = $('<div id="ppplus_continue" class="col-xs-6 col-sm-4 col-sm-offset-4 col-md-3 ' + ' col-md-offset-6 text-right paypal_continue_button"><input type="submit" ' + ' class="btn btn-primary btn-block" value="' + continue_button_text + '"></div>');

	// ########## EVENT HANDLERS ##########

	var _paymentItemOnClick = function _paymentItemOnClick(e) {
		$('.order_payment #checkout_payment div.items div.payment_item').removeClass('module_option_selected');

		if ($('#ppplus', this).length > 0) {
			$(this).css('background-image', 'none');
			$(this).css('background-color', 'transparent');
			$('div.paypal_continue_button').show();
			$('div.continue_button').hide();
			paypal3_checked = true;
		} else {
			if (paypal3_checked) {
				paypal3_checked = false;
				console.log('3rd party payment selected ...');
				if (ppp.deselectPaymentMethod) {
					console.log('... and deselectPaymentMethod() called.');
					ppp.deselectPaymentMethod();
				} else {
					console.log('... and pp+ widget re-initialized.');
					initPPP(options.thirdPartyPaymentsBlock);
				}
			}
			$('div.paypal_continue_button').hide();
			$('div.continue_button').show();
			$(this).addClass('module_option_selected');
		}
	};

	var _ppplusContinueOnClick = function _ppplusContinueOnClick(e) {
		ppp.doContinue();
		return false;
	};

	// ########## INITIALIZATION ##########

	/**
  * Initialize Module
  * @constructor
  */
	module.init = function (done) {

		if ($('#ppplus').length > 0) {
			$('div.continue_button:first').before(ppplus_continue);

			$('input[name="payment"]:checked').closest('div.payment_item').addClass('module_option_selected');
			$('#ppplus').closest('div.payment_item').addClass('ppplus_payment_item');

			if ($('body').on) {
				$('div.payment_item_container').on('click', _paymentItemOnClick);
				$('div.paypal_continue_button').on('click', _ppplusContinueOnClick);
			} else {
				$('body').delegate('div.payment_item_container', 'click', _paymentItemOnClick);
				$('body').delegate('#ppplus_continue', 'click', _ppplusContinueOnClick);
			}

			$('div.payment_item input[value="paypal3"]').closest('div.payment_item').css('border-bottom', 'none');

			$('iframe').ready(function () {
				$('.list-group-item').each(function () {
					$(this).css('display', 'block');
				});
			});

			if (initPPP) {
				initPPP(options.thirdPartyPaymentsBlock);
			}
		}

		done();
	};

	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvcGF5cGFsX2NoZWNrb3V0LmpzIl0sIm5hbWVzIjpbImdhbWJpbyIsIndpZGdldHMiLCJtb2R1bGUiLCJkYXRhIiwiX2NoZWNrUGF5UGFsMyIsInBheXBhbDMiLCIkIiwiaHViX3BheXBhbDMiLCJnZXQiLCJjaGVja2VkIiwiJHRoaXMiLCJkZWZhdWx0cyIsInRoaXJkUGFydHlQYXltZW50c0Jsb2NrIiwib3B0aW9ucyIsImV4dGVuZCIsInBheXBhbDNfY2hlY2tlZCIsImNvbnRpbnVlX2J1dHRvbl90ZXh0IiwidmFsIiwicHBwbHVzX2NvbnRpbnVlIiwiX3BheW1lbnRJdGVtT25DbGljayIsImUiLCJyZW1vdmVDbGFzcyIsImxlbmd0aCIsImNzcyIsInNob3ciLCJoaWRlIiwiY29uc29sZSIsImxvZyIsInBwcCIsImRlc2VsZWN0UGF5bWVudE1ldGhvZCIsImluaXRQUFAiLCJhZGRDbGFzcyIsIl9wcHBsdXNDb250aW51ZU9uQ2xpY2siLCJkb0NvbnRpbnVlIiwiaW5pdCIsImRvbmUiLCJiZWZvcmUiLCJjbG9zZXN0Iiwib24iLCJkZWxlZ2F0ZSIsInJlYWR5IiwiZWFjaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBOzs7Ozs7O0FBT0FBLE9BQU9DLE9BQVAsQ0FBZUMsTUFBZixDQUNDLGlCQURELEVBR0MsRUFIRCxFQUtDLFVBQVNDLElBQVQsRUFBZTs7QUFFZDs7QUFFQTs7QUFFQSxLQUFJQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLEdBQVc7QUFDOUIsTUFBSUMsVUFBVUMsRUFBRSx3QkFBRixDQUFkO0FBQUEsTUFDQ0MsY0FBY0QsRUFBRSxxQ0FBRixDQURmOztBQUdBLE1BQUlELFFBQVFHLEdBQVIsQ0FBWSxDQUFaLENBQUosRUFBb0I7QUFDbkIsVUFBT0gsUUFBUUcsR0FBUixDQUFZLENBQVosRUFBZUMsT0FBdEI7QUFDQTs7QUFFRCxTQUFPRixZQUFZQyxHQUFaLENBQWdCLENBQWhCLEVBQW1CQyxPQUExQjtB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LEdBQXpFLENBQTZFLGVBQTdFLEVBQThGLE1BQTlGOztBQUVBakIsS0FBRSxRQUFGLEVBQVlrQyxLQUFaLENBQWtCLFlBQVc7QUFDNUJsQyxNQUFFLGtCQUFGLEVBQXNCbUMsSUFBdEIsQ0FBMkIsWUFBVztBQUNyQ25DLE9BQUUsSUFBRixFQUFRaUIsR0FBUixDQUFZLFNBQVosRUFBdUIsT0FBdkI7QUFDQSxLQUZEO0FBR0EsSUFKRDs7QUFNQSxPQUFJTyxPQUFKLEVBQWE7QUFDWkEsWUFBUWpCLFFBQVFELHVCQUFoQjtBQUNBO0FBQ0Q7O0FBRUR1QjtBQUNBLEVBL0JEOztBQWlDQSxRQUFPakMsTUFBUDtBQUNBLENBakhGIiwiZmlsZSI6IndpZGdldHMvcGF5cGFsX2NoZWNrb3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiBwYXlwYWxfY2hlY2tvdXQuanMgMjAxNy0xMC0zMFxuIEdhbWJpbyBHbWJIXG4gaHR0cDovL3d3dy5nYW1iaW8uZGVcbiBDb3B5cmlnaHQgKGMpIDIwMTcgR2FtYmlvIEdtYkhcbiBSZWxlYXNlZCB1bmRlciB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgKFZlcnNpb24gMilcbiBbaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2dwbC0yLjAuaHRtbF1cbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbi8qIGdsb2JhbHMgcHBwLCBpbml0UFBQICovXG5cbi8qKlxuICogUGF5UGFsIENoZWNrb3V0XG4gKlxuICogTG9hZHMgYW5kIGhhbmRsZXMgdGhlIGFjdGlvbnMgb2YgdGhlIFBheVBhbCBwYXltZW50IHdhbGxcbiAqXG4gKiBAbW9kdWxlIFdpZGdldHMvcGF5cGFsX2NoZWNrb3V0XG4gKi9cbmdhbWJpby53aWRnZXRzLm1vZHVsZShcblx0J3BheXBhbF9jaGVja291dCcsXG5cblx0W10sXG5cblx0ZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0Ly8gIyMjIyMjIyMjIyBWQVJJQUJMRSBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cdFx0XG5cdFx0dmFyIF9jaGVja1BheVBhbDMgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBwYXlwYWwzID0gJCgnaW5wdXRbdmFsdWU9XCJwYXlwYWwzXCJdJyksXG5cdFx0XHRcdGh1Yl9wYXlwYWwzID0gJCgnaW5wdXRbZGF0YS1tb2R1bGVfY29kZT1cIlBheVBhbEh1YlwiXScpO1xuXHRcdFx0XG5cdFx0XHRpZiAocGF5cGFsMy5nZXQoMCkpIHtcblx0XHRcdFx0cmV0dXJuIHBheXBhbDMuZ2V0KDApLmNoZWNrZWQ7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHJldHVybiBodWJfcGF5cGFsMy5nZXQoMCkuY2hlY2tlZDtcblx0XHR9O1xuXG5cdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdGRlZmF1bHRzID0ge1xuXHRcdFx0XHR0aGlyZFBhcnR5UGF5bWVudHNCbG9jazogW11cblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBkYXRhKSxcblx0XHRcdG1vZHVsZSA9IHt9LFxuXG5cdFx0XHRcblx0XHRcdHBheXBhbDNfY2hlY2tlZCA9IF9jaGVja1BheVBhbDMsXG5cdFx0XHRjb250aW51ZV9idXR0b25fdGV4dCA9ICQoJ2Rpdi5jb250aW51ZV9idXR0b24gaW5wdXQnKS52YWwoKSxcblx0XHRcdHBwcGx1c19jb250aW51ZSA9ICQoJzxkaXYgaWQ9XCJwcHBsdXNfY29udGludWVcIiBjbGFzcz1cImNvbC14cy02IGNvbC1zbS00IGNvbC1zbS1vZmZzZXQtNCBjb2wtbWQtMyAnXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICsgJyBjb2wtbWQtb2Zmc2V0LTYgdGV4dC1yaWdodCBwYXlwYWxfY29udGludWVfYnV0dG9uXCI+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiAnXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICsgJyBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tYmxvY2tcIiB2YWx1ZT1cIicgKyBjb250aW51ZV9idXR0b25fdGV4dCArICdcIj48L2Rpdj4nKTtcblxuXG5cdFx0Ly8gIyMjIyMjIyMjIyBFVkVOVCBIQU5ETEVSUyAjIyMjIyMjIyMjXG5cblx0XHR2YXIgX3BheW1lbnRJdGVtT25DbGljayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdCQoJy5vcmRlcl9wYXltZW50ICNjaGVja291dF9wYXltZW50IGRpdi5pdGVtcyBkaXYucGF5bWVudF9pdGVtJykucmVtb3ZlQ2xhc3MoJ21vZHVsZV9vcHRpb25fc2VsZWN0ZWQnKTtcblxuXHRcdFx0aWYgKCQoJyNwcHBsdXMnLCB0aGlzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdCQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ25vbmUnKTtcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAndHJhbnNwYXJlbnQnKTtcblx0XHRcdFx0JCgnZGl2LnBheXBhbF9jb250aW51ZV9idXR0b24nKS5zaG93KCk7XG5cdFx0XHRcdCQoJ2Rpdi5jb250aW51ZV9idXR0b24nKS5oaWRlKCk7XG5cdFx0XHRcdHBheXBhbDNfY2hlY2tlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKHBheXBhbDNfY2hlY2tlZCkge1xuXHRcdFx0XHRcdHBheXBhbDNfY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCczcmQgcGFydHkgcGF5bWVudCBzZWxlY3RlZCAuLi4nKTtcblx0XHRcdFx0XHRpZiAocHBwLmRlc2VsZWN0UGF5bWVudE1ldGhvZCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJy4uLiBhbmQgZGVzZWxlY3RQYXltZW50TWV0aG9kKCkgY2FsbGVkLicpO1xuXHRcdFx0XHRcdFx0cHBwLmRlc2VsZWN0UGF5bWVudE1ldGhvZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCcuLi4gYW5kIHBwKyB3aWRnZXQgcmUtaW5pdGlhbGl6ZWQuJyk7XG5cdFx0XHRcdFx0XHRpbml0UFBQKG9wdGlvbnMudGhpcmRQYXJ0eVBheW1lbnRzQmxvY2spO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQkKCdkaXYucGF5cGFsX2NvbnRpbnVlX2J1dHRvbicpLmhpZGUoKTtcblx0XHRcdFx0JCgnZGl2LmNvbnRpbnVlX2J1dHRvbicpLnNob3coKTtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnbW9kdWxlX29wdGlvbl9zZWxlY3RlZCcpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgX3BwcGx1c0NvbnRpbnVlT25DbGljayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHBwcC5kb0NvbnRpbnVlKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdC8vICMjIyMjIyMjIyMgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXG5cdFx0LyoqXG5cdFx0ICogSW5pdGlhbGl6ZSBNb2R1bGVcblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRtb2R1bGUuaW5pdCA9IGZ1bmN0aW9uKGRvbmUpIHtcblxuXHRcdFx0aWYgKCQoJyNwcHBsdXMnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdCQoJ2Rpdi5jb250aW51ZV9idXR0b246Zmlyc3QnKS5iZWZvcmUocHBwbHVzX2NvbnRpbnVlKTtcblxuXHRcdFx0XHQkKCdpbnB1dFtuYW1lPVwicGF5bWVudFwiXTpjaGVja2VkJykuY2xvc2VzdCgnZGl2LnBheW1lbnRfaXRlbScpLmFkZENsYXNzKCdtb2R1bGVfb3B0aW9uX3NlbGVjdGVkJyk7XG5cdFx0XHRcdCQoJyNwcHBsdXMnKS5jbG9zZXN0KCdkaXYucGF5bWVudF9pdGVtJykuYWRkQ2xhc3MoJ3BwcGx1c19wYXltZW50X2l0ZW0nKTtcblxuXHRcdFx0XHRpZiAoJCgnYm9keScpLm9uKSB7XG5cdFx0XHRcdFx0JCgnZGl2LnBheW1lbnRfaXRlbV9jb250YWluZXInKS5vbignY2xpY2snLCBfcGF5bWVudEl0ZW1PbkNsaWNrKTtcdFx0XHRcdFx0XG5cdFx0XHRcdFx0JCgnZGl2LnBheXBhbF9jb250aW51ZV9idXR0b24nKS5vbignY2xpY2snLCBfcHBwbHVzQ29udGludWVPbkNsaWNrKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQkKCdib2R5JykuZGVsZWdhdGUoJ2Rpdi5wYXltZW50X2l0ZW1fY29udGFpbmVyJywgJ2NsaWNrJywgX3BheW1lbnRJdGVtT25DbGljayk7XG5cdFx0XHRcdFx0JCgnYm9keScpLmRlbGVnYXRlKCcjcHBwbHVzX2NvbnRpbnVlJywgJ2NsaWNrJywgX3BwcGx1c0NvbnRpbnVlT25DbGljayk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKCdkaXYucGF5bWVudF9pdGVtIGlucHV0W3ZhbHVlPVwicGF5cGFsM1wiXScpLmNsb3Nlc3QoJ2Rpdi5wYXltZW50X2l0ZW0nKS5jc3MoJ2JvcmRlci1ib3R0b20nLCAnbm9uZScpO1xuXHRcdFx0XHRcblx0XHRcdFx0JCgnaWZyYW1lJykucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JCgnLmxpc3QtZ3JvdXAtaXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoaW5pdFBQUCkge1xuXHRcdFx0XHRcdGluaXRQUFAob3B0aW9ucy50aGlyZFBhcnR5UGF5bWVudHNCbG9jayk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0ZG9uZSgpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gbW9kdWxlO1xuXHR9KTtcbiJdfQ==
