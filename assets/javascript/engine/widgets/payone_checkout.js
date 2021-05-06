'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* --------------------------------------------------------------
	payone_checkout.js 2017-09-19
	Gambio GmbH
	http://www.gambio.de
	Copyright (c) 2015 Gambio GmbH
	Released under the GNU General Public License (Version 2)
	[http://www.gnu.org/licenses/gpl-2.0.html]
	--------------------------------------------------------------
*/

/**
 * Payone Checkout
 *
 * @module Widgets/payone_checkout
 */
gambio.widgets.module('payone_checkout', [], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    defaults = {},
	    options = $.extend(true, {}, defaults, data),
	    p1_debug = true,
	    module = {};

	// ########## PAYONE FUNCTIONS ##########

	var _p1_payment_submit_handler = function _p1_payment_submit_handler(e) {
		var selected_payment = $('form#checkout_payment').get(0).elements.payment.value;
		if (selected_payment === 'payone_cc') {
			if (p1_debug) {
				console.log('payone cc check triggered');
			}
			e.preventDefault();
			p1cc_check();
		}
	};

	var _initOnlineTransfer = function _initOnlineTransfer() {
		$('select#otrans_type').on('change', function (e) {
			var selected_type = $(this).val();
			var $pd_table = $(this).closest('table.payone_otrans_data');
			var $datarows = $('tr.datarow', $pd_table);
			$datarows.hide();
			$('.for_' + selected_type).show();
			if (selected_type == 'pfefinance' || selected_type == 'pfcard') {
				$(this).closest('div.payment_item').addClass('data_valid');
				$(this).closest('div.payment_item').click();
			}
		});
		$('select#otrans_type').trigger('change');

		var otrans_input_handler = function otrans_input_handler(e) {
			var any_empty = false;
			$('.payone_otrans_data input[type="text"]:visible').each(function () {
				if ($(this).val() === '') {
					any_empty = true;
				}
			});
			if (any_empty === true) {
				$('table.payone_otrans_data').addClass('payone_data_missing');
			} else {
				$('table.payone_otrans_data').removeClass('payone_data_missing');
			}
			$(this).closest('div.payment_item').removeClass('data_valid');
		};

		$('.payone_otrans_data input[type="text"]').keyup(otrans_input_handler);
		$('.payone_otrans_data input[type="text"]').change(otrans_input_handler);
	};

	var _initELV = function _initELV() {
		$('table.payone_elv_data select[name="p1_elv_country"]').on('change', function (e) {
			var selected_iso_2 = $(this).val();
			var only_de_rows = $('tr.only_de', $(this).closest('table'));
			if (selected_iso_2 == 'DE') {
				only_de_rows.show('fast');
			} else {
				only_de_rows.hide('fast');
			}
		});
		$('table.payone_elv_data select[name="p1_elv_country"]').trigger('change');

		$('.sepadata input').on('change', function (e) {
			var sepadata = '';
			$('.sepadata input').each(function () {
				sepadata += $(this).val();
			});
			if (sepadata.length === 0) {
				$('tr.only_de input').removeAttr('disabled');
			} else {
				$('tr.only_de input').attr('disabled', 'disabled');
			}
		});

		$('.only_de input').on('change', function (e) {
			var accountdata = '';
			$('.only_de input').each(function () {
				accountdata += $(this).val();
			});
			if (accountdata.length === 0) {
				$('tr.sepadata input').removeAttr('disabled');
			} else {
				$('tr.sepadata input').attr('disabled', 'disabled');
			}
		});

		var pg_callback_elv = function pg_callback_elv(response) {
			if (p1_debug) {
				console.log(response);
			}
			var current_block = $('div.module_option_checked');
			if (!response || (typeof response === 'undefined' ? 'undefined' : _typeof(response)) != 'object' || response.status != 'VALID') {
				// error occurred
				var errormessage = p1_payment_error;
				if (typeof response.customermessage == 'string') {
					errormessage = response.customermessage;
				}
				$('p.p1_error', current_block).html(errormessage);
				$('p.p1_error', current_block).show();
				current_block.closest('div.payment_item').removeClass('data_valid');
				current_block.get(0).scrollIntoView();
			} else {
				pg_callback_elv_none();
				$('form#checkout_payment').trigger('submit');
			}
		};

		var pg_callback_elv_none = function pg_callback_elv_none() {
			var $checked_payment = $('input[name="payment"]:checked');
			$('p.p1_error', $checked_payment.closest('div.payment_item')).hide();
			$('table.payone_elv_data').hide();
			$('div.p1_finaldata_elv').show();
			$('td.final_elv_country').html($('select#p1_elv_country option').filter(':selected').html());
			$('td.final_elv_accountnumber').html($('input#p1_elv_accountnumber').val());
			$('td.final_elv_bankcode').html($('input#p1_elv_bankcode').val());
			$('td.final_elv_iban').html($('input#p1_elv_iban').val());
			$('td.final_elv_bic').html($('input#p1_elv_bic').val());
			$checked_payment.closest('div.payment_item').addClass('data_valid');
			$('table.payone_elv_data').removeClass('payone_paydata');
		};

		var payone_elv_checkdata = function payone_elv_checkdata(e) {
			var input_bankcountry = $('select[name="p1_elv_country"] option').filter(':selected').val();
			var input_accountnumber = $('input[name="p1_elv_accountnumber"]', $this).val();
			var input_bankcode = $('input[name="p1_elv_bankcode"]', $this).val();
			var input_iban = $('input[name="p1_elv_iban"]', $this).val();
			var input_bic = $('input[name="p1_elv_bic"]', $this).val();

			if (p1_elv_checkmode == 'none') {
				pg_callback_elv_none();
			} else {
				e.preventDefault(); // prevent submit
				var pg_config = p1_elv_config;
				var pg = new PAYONE.Gateway(pg_config, pg_callback_elv);
				var data = {};
				if (input_iban.length > 0) {
					data = {
						iban: input_iban,
						bic: input_bic,
						bankcountry: input_bankcountry
					};
				} else {
					data = {
						bankaccount: input_accountnumber,
						bankcode: input_bankcode,
						bankcountry: input_bankcountry
					};
				}

				if (p1_debug) {
					console.log(data);
				}
				pg.call(data);
			}
		};

		$('form#checkout_payment').on('submit', function (e) {
			var $checked_payment = $('input[name="payment"]:checked');
			if ($checked_payment.val() === 'payone_elv') {
				if ($checked_payment.closest('div.payment_item').hasClass('data_valid') === false) {
					payone_elv_checkdata(e);
				}
			}
		});
	};

	var _initSafeInv = function _initSafeInv() {
		var _safeInvDisplayAgreement = function _safeInvDisplayAgreement() {
			var safeInvType = $('#p1_safeinv_type').val();
			$('tr.p1-safeinv-agreement').not('.p1-show-for-' + safeInvType).hide();
			$('tr.p1-show-for-' + safeInvType).show();
		};
		$('select[name="safeinv_type"]').on('change', _safeInvDisplayAgreement);
		_safeInvDisplayAgreement();
	};

	// ########## INITIALIZATION ##########

	/**
  * Initialize Module
  * @constructor
  */
	module.init = function (done) {
		if (p1_debug) {
			console.log('payone_checkout module initializing, submodule ' + options.module);
		}
		if (options.module == 'cc') {
			$('form#checkout_payment').on('submit', _p1_payment_submit_handler);
		}
		if (options.module == 'otrans') {
			_initOnlineTransfer();
		}
		if (options.module == 'elv') {
			_initELV();
		}
		if (options.module == 'safeinv') {
			_initSafeInv();
		}
		done();
	};

	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvcGF5b25lX2NoZWNrb3V0LmpzIl0sIm5hbWVzIjpbImdhbWJpbyIsIndpZGdldHMiLCJtb2R1bGUiLCJkYXRhIiwiJHRoaXMiLCIkIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kIiwicDFfZGVidWciLCJfcDFfcGF5bWVudF9zdWJtaXRfaGFuZGxlciIsImUiLCJzZWxlY3RlZF9wYXltZW50IiwiZ2V0IiwiZWxlbWVudHMiLCJwYXltZW50IiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwicHJldmVudERlZmF1bHQiLCJwMWNjX2NoZWNrIiwiX2luaXRPbmxpbmVUcmFuc2ZlciIsIm9uIiwic2VsZWN0ZWRfdHlwZSIsInZhbCIsIiRwZF90YWJsZSIsImNsb3Nlc3QiLCIkZGF0YXJvd3MiLCJoaWRlIiwic2hvdyIsImFkZENsYXNzIiwiY2xpY2siLCJ0cmlnZ2VyIiwib3RyYW5zX2lucHV0X2hhbmRsZXIiLCJhbnlfZW1wdHkiLCJlYWNoIiwicmVtb3ZlQ2xhc3MiLCJrZXl1cCIsImNoYW5nZSIsIl9pbml0RUxWIiwic2VsZWN0ZWRfaXNvXzIiLCJvbmx5X2RlX3Jvd3MiLCJzZXBhZGF0YSIsImxlbmd0aCIsInJlbW92ZUF0dHIiLCJhdHRyIiwiYWNjb3VudGRhdGEiLCJwZ19jYWxsYmFja19lbHYiLCJyZXNwb25zZSIsImN1cnJlbnRfYmxvY2siLCJzdGF0dXMiLCJlcnJvcm1lc3NhZ2UiLCJwMV9wYXltZW50X2Vycm9yIiwiY3VzdG9tZXJtZXNzYWdlIiwiaHRtbCIsInNjcm9sbEludG9WaWV3IiwicGdfY2FsbGJhY2tfZWx2X25vbmUiLCIkY2hlY2tlZF9wYXltZW50IiwiZmlsdGVyIiwicGF5b25lX2Vsdl9jaGVja2RhdGEiLCJpbnB1dF9iYW5rY291bnRyeSIsImlucHV0X2FjY291bnRudW1iZXIiLCJpbnB1dF9iYW5rY29kZSIsImlucHV0X2liYW4iLCJpbnB1dF9iaWMiLCJwMV9lbHZfY2hlY2ttb2RlIiwicGdfY29uZmlnIiwicDFfZWx2X2NvbmZpZyIsInBnIiwiUEFZT05FIiwiR2F0ZXdheSIsImliYW4iLCJiaWMiLCJiYW5rY291bnRyeSIsImJhbmthY2NvdW50IiwiYmFua2NvZGUiLCJjYWxsIiwiaGFzQ2xhc3MiLCJfaW5pdFNhZmVJbnYiLCJfc2FmZUludkRpc3BsYXlBZ3JlZW1lbnQiLCJzYWZlSW52VHlwZSIsIm5vdCIsImluaXQiLCJkb25lIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7QUFLQUEsT0FBT0MsT0FBUCxDQUFlQyxNQUFmLENBQ0MsaUJBREQsRUFHQyxFQUhELEVBS0MsVUFBU0MsSUFBVCxFQUFlOztBQUVkOztBQUVBOztBQUVBLEtBQUlDLFFBQVFDLEVBQUUsSUFBRixDQUFaO0FBQUEsS0FDQ0MsV0FBVyxFQURaO0FBQUEsS0FFQ0MsVUFBVUYsRUFBRUcsTUFBRixDQUFTLElBQVQsRUFBZSxFQUFmLEVBQW1CRixRQUFuQixFQUE2QkgsSUFBN0IsQ0FGWDtBQUFBLEtBR0NNLFdBQVcsSUFIWjtBQUFBLEtBSUNQLFNBQVMsRUFKVjs7QUFNQTs7QUFFQSxLQUFJUSw2QkFBNkIsU0FBN0JBLDBCQUE2QixDQUFVQyxDQUFWLEVBQWE7QUFDN0MsTUFBSUMsbUJBQW1CUCxFQUFFLHVCQUFGLEVBQTJCUSxHQUEzQixDQUErQixDQUEvQixFQUFrQ0MsUUFBbEMsQ0FBMkNDLE9BQTNDLENBQW1EQyxLQUExRTtBQUNBLE1BQUdKLHFCQUFxQixXQUF4QixFQUNBO0FBQ0MsT0FBR0gsUUFBSCxFQUFhO0FBQUVRLFlBQVFDLEdBQVIsQ0FBWSwyQkFBWjtBQUEyQztBQUMxRFAsS0FBRVEsY0FBRjtBQUNBQztBQUNBO0FBQ0QsRUFSRDs7QUFVQSxLQUFJQyxzQkFBc0IsU0FBdEJBLG1CQUFzQixHQUMxQjtBQUNDaEIsSUFBRSxvQkFBRixFQUF3QmlCLEVBQXhCLENBQTJCLFFBQTNCLEVBQXFDLFVBQVNYLENBQVQsRUFBWTtBQUNoRCxPQUFJWSxnQkFBZ0JsQixFQUFFLElBQUYsRUFBUW1CLEdB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QUFDQ2xCLDBCQUFxQmhELENBQXJCO0FBQ0E7QUFDRDtBQUNELEdBVEQ7QUFVQSxFQTFIRDs7QUE0SEEsS0FBSW1FLGVBQWUsU0FBZkEsWUFBZSxHQUNuQjtBQUNDLE1BQUlDLDJCQUEyQixTQUEzQkEsd0JBQTJCLEdBQy9CO0FBQ0MsT0FBSUMsY0FBYzNFLEVBQUUsa0JBQUYsRUFBc0JtQixHQUF0QixFQUFsQjtBQUNBbkIsS0FBRSx5QkFBRixFQUE2QjRFLEdBQTdCLENBQWlDLGtCQUFrQkQsV0FBbkQsRUFBZ0VwRCxJQUFoRTtBQUNBdkIsS0FBRSxvQkFBb0IyRSxXQUF0QixFQUFtQ25ELElBQW5DO0FBQ0EsR0FMRDtBQU1BeEIsSUFBRSw2QkFBRixFQUFpQ2lCLEVBQWpDLENBQW9DLFFBQXBDLEVBQThDeUQsd0JBQTlDO0FBQ0FBO0FBQ0EsRUFWRDs7QUFZQTs7QUFFQTs7OztBQUlBN0UsUUFBT2dGLElBQVAsR0FBYyxVQUFTQyxJQUFULEVBQWU7QUFDNUIsTUFBRzFFLFFBQUgsRUFBYTtBQUFFUSxXQUFRQyxHQUFSLENBQVksb0RBQW9EWCxRQUFRTCxNQUF4RTtBQUFrRjtBQUNqRyxNQUFHSyxRQUFRTCxNQUFSLElBQWtCLElBQXJCLEVBQ0E7QUFDQ0csS0FBRSx1QkFBRixFQUEyQmlCLEVBQTNCLENBQThCLFFBQTlCLEVBQXdDWiwwQkFBeEM7QUFDQTtBQUNELE1BQUdILFFBQVFMLE1BQVIsSUFBa0IsUUFBckIsRUFDQTtBQUNDbUI7QUFDQTtBQUNELE1BQUdkLFFBQVFMLE1BQVIsSUFBa0IsS0FBckIsRUFDQTtBQUNDcUM7QUFDQTtBQUNELE1BQUdoQyxRQUFRTCxNQUFSLElBQWtCLFNBQXJCLEVBQ0E7QUFDQzRFO0FBQ0E7QUFDREs7QUFDQSxFQW5CRDs7QUFxQkEsUUFBT2pGLE1BQVA7QUFDQSxDQW5PRiIsImZpbGUiOiJ3aWRnZXRzL3BheW9uZV9jaGVja291dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdHBheW9uZV9jaGVja291dC5qcyAyMDE3LTA5LTE5XG5cdEdhbWJpbyBHbWJIXG5cdGh0dHA6Ly93d3cuZ2FtYmlvLmRlXG5cdENvcHlyaWdodCAoYykgMjAxNSBHYW1iaW8gR21iSFxuXHRSZWxlYXNlZCB1bmRlciB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgKFZlcnNpb24gMilcblx0W2h0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMi4wLmh0bWxdXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuXG4vKipcbiAqIFBheW9uZSBDaGVja291dFxuICpcbiAqIEBtb2R1bGUgV2lkZ2V0cy9wYXlvbmVfY2hlY2tvdXRcbiAqL1xuZ2FtYmlvLndpZGdldHMubW9kdWxlKFxuXHQncGF5b25lX2NoZWNrb3V0JyxcblxuXHRbXSxcblxuXHRmdW5jdGlvbihkYXRhKSB7XG5cblx0XHQndXNlIHN0cmljdCc7XG5cblx0XHQvLyAjIyMjIyMjIyMjIFZBUklBQkxFIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRkZWZhdWx0cyA9IHt9LFxuXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgZGF0YSksXG5cdFx0XHRwMV9kZWJ1ZyA9IHRydWUsXG5cdFx0XHRtb2R1bGUgPSB7fTtcblxuXHRcdC8vICMjIyMjIyMjIyMgUEFZT05FIEZVTkNUSU9OUyAjIyMjIyMjIyMjXG5cblx0XHR2YXIgX3AxX3BheW1lbnRfc3VibWl0X2hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIHNlbGVjdGVkX3BheW1lbnQgPSAkKCdmb3JtI2NoZWNrb3V0X3BheW1lbnQnKS5nZXQoMCkuZWxlbWVudHMucGF5bWVudC52YWx1ZTtcblx0XHRcdGlmKHNlbGVjdGVkX3BheW1lbnQgPT09ICdwYXlvbmVfY2MnKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwMV9kZWJ1ZykgeyBjb25zb2xlLmxvZygncGF5b25lIGNjIGNoZWNrIHRyaWdnZXJlZCcpOyB9XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0cDFjY19jaGVjaygpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgX2luaXRPbmxpbmVUcmFuc2ZlciA9IGZ1bmN0aW9uKClcblx0XHR7XG5cdFx0XHQkKCdzZWxlY3Qjb3RyYW5zX3R5cGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR2YXIgc2VsZWN0ZWRfdHlwZSA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdHZhciAkcGRfdGFibGUgPSAkKHRoaXMpLmNsb3Nlc3QoJ3RhYmxlLnBheW9uZV9vdHJhbnNfZGF0YScpO1xuXHRcdFx0XHR2YXIgJGRhdGFyb3dzID0gJCgndHIuZGF0YXJvdycsICRwZF90YWJsZSk7XG5cdFx0XHRcdCRkYXRhcm93cy5oaWRlKCk7XG5cdFx0XHRcdCQoJy5mb3JfJytzZWxlY3RlZF90eXBlKS5zaG93KCk7XG5cdFx0XHRcdGlmKHNlbGVjdGVkX3R5cGUgPT0gJ3BmZWZpbmFuY2UnIHx8IHNlbGVjdGVkX3R5cGUgPT0gJ3BmY2FyZCcpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJ2Rpdi5wYXltZW50X2l0ZW0nKS5hZGRDbGFzcygnZGF0YV92YWxpZCcpO1xuXHRcdFx0XHRcdCQodGhpcykuY2xvc2VzdCgnZGl2LnBheW1lbnRfaXRlbScpLmNsaWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0JCgnc2VsZWN0I290cmFuc190eXBlJykudHJpZ2dlcignY2hhbmdlJyk7XG5cblx0XHRcdHZhciBvdHJhbnNfaW5wdXRfaGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dmFyIGFueV9lbXB0eSA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGF5b25lX290cmFuc19kYXRhIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOnZpc2libGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmKCQodGhpcykudmFsKCkgPT09ICcnKSB7IGFueV9lbXB0eSA9IHRydWU7XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZihhbnlfZW1wdHkgPT09IHRydWUpIHtcblx0XHRcdFx0XHQkKCd0YWJsZS5wYXlvbmVfb3RyYW5zX2RhdGEnKS5hZGRDbGFzcygncGF5b25lX2RhdGFfbWlzc2luZycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCQoJ3RhYmxlLnBheW9uZV9vdHJhbnNfZGF0YScpLnJlbW92ZUNsYXNzKCdwYXlvbmVfZGF0YV9taXNzaW5nJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCdkaXYucGF5bWVudF9pdGVtJykucmVtb3ZlQ2xhc3MoJ2RhdGFfdmFsaWQnKTtcblx0XHRcdH07XG5cblx0XHRcdCQoJy5wYXlvbmVfb3RyYW5zX2RhdGEgaW5wdXRbdHlwZT1cInRleHRcIl0nKS5rZXl1cChvdHJhbnNfaW5wdXRfaGFuZGxlcik7XG5cdFx0XHQkKCcucGF5b25lX290cmFuc19kYXRhIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJykuY2hhbmdlKG90cmFuc19pbnB1dF9oYW5kbGVyKTtcblx0XHR9O1xuXG5cdFx0dmFyIF9pbml0RUxWID0gZnVuY3Rpb24oKVxuXHRcdHtcblx0XHRcdCQoJ3RhYmxlLnBheW9uZV9lbHZfZGF0YSBzZWxlY3RbbmFtZT1cInAxX2Vsdl9jb3VudHJ5XCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dmFyIHNlbGVjdGVkX2lzb18yID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0dmFyIG9ubHlfZGVfcm93cyA9ICQoJ3RyLm9ubHlfZGUnLCAkKHRoaXMpLmNsb3Nlc3QoJ3RhYmxlJykpO1xuXHRcdFx0XHRpZihzZWxlY3RlZF9pc29fMiA9PSAnREUnKSB7XG5cdFx0XHRcdFx0b25seV9kZV9yb3dzLnNob3coJ2Zhc3QnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRvbmx5X2RlX3Jvd3MuaGlkZSgnZmFzdCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdCQoJ3RhYmxlLnBheW9uZV9lbHZfZGF0YSBzZWxlY3RbbmFtZT1cInAxX2Vsdl9jb3VudHJ5XCJdJykudHJpZ2dlcignY2hhbmdlJyk7XG5cblx0XHRcdCQoJy5zZXBhZGF0YSBpbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHZhciBzZXBhZGF0YSA9ICcnO1xuXHRcdFx0XHQkKCcuc2VwYWRhdGEgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkgeyBzZXBhZGF0YSArPSAkKHRoaXMpLnZhbCgpOyB9KTtcblx0XHRcdFx0aWYoc2VwYWRhdGEubGVuZ3RoID09PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgndHIub25seV9kZSBpbnB1dCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgndHIub25seV9kZSBpbnB1dCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKCcub25seV9kZSBpbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHZhciBhY2NvdW50ZGF0YSA9ICcnO1xuXHRcdFx0XHQkKCcub25seV9kZSBpbnB1dCcpLmVhY2goZnVuY3Rpb24oKSB7IGFjY291bnRkYXRhICs9ICQodGhpcykudmFsKCk7IH0pO1xuXHRcdFx0XHRpZihhY2NvdW50ZGF0YS5sZW5ndGggPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCd0ci5zZXBhZGF0YSBpbnB1dCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgndHIuc2VwYWRhdGEgaW5wdXQnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHBnX2NhbGxiYWNrX2VsdiA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRcdGlmKHAxX2RlYnVnKSB7IGNvbnNvbGUubG9nKHJlc3BvbnNlKTsgfVxuXHRcdFx0XHR2YXIgY3VycmVudF9ibG9jayA9ICQoJ2Rpdi5tb2R1bGVfb3B0aW9uX2NoZWNrZWQnKTtcblx0XHRcdFx0aWYoIXJlc3BvbnNlIHx8IHR5cGVvZiByZXNwb25zZSAhPSAnb2JqZWN0JyB8fCByZXNwb25zZS5zdGF0dXMgIT0gJ1ZBTElEJykge1xuXHRcdFx0XHRcdC8vIGVycm9yIG9jY3VycmVkXG5cdFx0XHRcdFx0dmFyIGVycm9ybWVzc2FnZSA9IHAxX3BheW1lbnRfZXJyb3I7XG5cdFx0XHRcdFx0aWYodHlwZW9mIHJlc3BvbnNlLmN1c3RvbWVybWVzc2FnZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0ZXJyb3JtZXNzYWdlID0gcmVzcG9uc2UuY3VzdG9tZXJtZXNzYWdlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkKCdwLnAxX2Vycm9yJywgY3VycmVudF9ibG9jaykuaHRtbChlcnJvcm1lc3NhZ2UpO1xuXHRcdFx0XHRcdCQoJ3AucDFfZXJyb3InLCBjdXJyZW50X2Jsb2NrKS5zaG93KCk7XG5cdFx0XHRcdFx0Y3VycmVudF9ibG9jay5jbG9zZXN0KCdkaXYucGF5bWVudF9pdGVtJykucmVtb3ZlQ2xhc3MoJ2RhdGFfdmFsaWQnKTtcblx0XHRcdFx0XHRjdXJyZW50X2Jsb2NrLmdldCgwKS5zY3JvbGxJbnRvVmlldygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHBnX2NhbGxiYWNrX2Vsdl9ub25lKCk7XG5cdFx0XHRcdFx0JCgnZm9ybSNjaGVja291dF9wYXltZW50JykudHJpZ2dlcignc3VibWl0Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHZhciBwZ19jYWxsYmFja19lbHZfbm9uZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJGNoZWNrZWRfcGF5bWVudCA9ICQoJ2lucHV0W25hbWU9XCJwYXltZW50XCJdOmNoZWNrZWQnKTtcblx0XHRcdFx0JCgncC5wMV9lcnJvcicsICRjaGVja2VkX3BheW1lbnQuY2xvc2VzdCgnZGl2LnBheW1lbnRfaXRlbScpKS5oaWRlKCk7XG5cdFx0XHRcdCQoJ3RhYmxlLnBheW9uZV9lbHZfZGF0YScpLmhpZGUoKTtcblx0XHRcdFx0JCgnZGl2LnAxX2ZpbmFsZGF0YV9lbHYnKS5zaG93KCk7XG5cdFx0XHRcdCQoJ3RkLmZpbmFsX2Vsdl9jb3VudHJ5JykuaHRtbCgkKCdzZWxlY3QjcDFfZWx2X2NvdW50cnkgb3B0aW9uJykuZmlsdGVyKCc6c2VsZWN0ZWQnKS5odG1sKCkpO1xuXHRcdFx0XHQkKCd0ZC5maW5hbF9lbHZfYWNjb3VudG51bWJlcicpLmh0bWwoJCgnaW5wdXQjcDFfZWx2X2FjY291bnRudW1iZXInKS52YWwoKSk7XG5cdFx0XHRcdCQoJ3RkLmZpbmFsX2Vsdl9iYW5rY29kZScpLmh0bWwoJCgnaW5wdXQjcDFfZWx2X2Jhbmtjb2RlJykudmFsKCkpO1xuXHRcdFx0XHQkKCd0ZC5maW5hbF9lbHZfaWJhbicpLmh0bWwoJCgnaW5wdXQjcDFfZWx2X2liYW4nKS52YWwoKSk7XG5cdFx0XHRcdCQoJ3RkLmZpbmFsX2Vsdl9iaWMnKS5odG1sKCQoJ2lucHV0I3AxX2Vsdl9iaWMnKS52YWwoKSk7XG5cdFx0XHRcdCRjaGVja2VkX3BheW1lbnQuY2xvc2VzdCgnZGl2LnBheW1lbnRfaXRlbScpLmFkZENsYXNzKCdkYXRhX3ZhbGlkJyk7XG5cdFx0XHRcdCQoJ3RhYmxlLnBheW9uZV9lbHZfZGF0YScpLnJlbW92ZUNsYXNzKCdwYXlvbmVfcGF5ZGF0YScpO1xuXHRcdFx0fTtcblxuXHRcdFx0dmFyIHBheW9uZV9lbHZfY2hlY2tkYXRhID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHR2YXIgaW5wdXRfYmFua2NvdW50cnkgPSAkKCdzZWxlY3RbbmFtZT1cInAxX2Vsdl9jb3VudHJ5XCJdIG9wdGlvbicpLmZpbHRlcignOnNlbGVjdGVkJykudmFsKCk7XG5cdFx0XHRcdHZhciBpbnB1dF9hY2NvdW50bnVtYmVyID0gJCgnaW5wdXRbbmFtZT1cInAxX2Vsdl9hY2NvdW50bnVtYmVyXCJdJywgJHRoaXMpLnZhbCgpO1xuXHRcdFx0XHR2YXIgaW5wdXRfYmFua2NvZGUgPSAkKCdpbnB1dFtuYW1lPVwicDFfZWx2X2Jhbmtjb2RlXCJdJywgJHRoaXMpLnZhbCgpO1xuXHRcdFx0XHR2YXIgaW5wdXRfaWJhbiA9ICQoJ2lucHV0W25hbWU9XCJwMV9lbHZfaWJhblwiXScsICR0aGlzKS52YWwoKTtcblx0XHRcdFx0dmFyIGlucHV0X2JpYyA9ICQoJ2lucHV0W25hbWU9XCJwMV9lbHZfYmljXCJdJywgJHRoaXMpLnZhbCgpO1xuXG5cblx0XHRcdFx0aWYocDFfZWx2X2NoZWNrbW9kZSA9PSAnbm9uZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwZ19jYWxsYmFja19lbHZfbm9uZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBzdWJtaXRcblx0XHRcdFx0XHR2YXIgcGdfY29uZmlnID0gcDFfZWx2X2NvbmZpZztcblx0XHRcdFx0XHR2YXIgcGcgPSBuZXcgUEFZT05FLkdhdGV3YXkocGdfY29uZmlnLCBwZ19jYWxsYmFja19lbHYpO1xuXHRcdFx0XHRcdHZhciBkYXRhID0ge307XG5cdFx0XHRcdFx0aWYoaW5wdXRfaWJhbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRpYmFuOiBpbnB1dF9pYmFuLFxuXHRcdFx0XHRcdFx0XHRiaWM6IGlucHV0X2JpYyxcblx0XHRcdFx0XHRcdFx0YmFua2NvdW50cnk6IGlucHV0X2Jhbmtjb3VudHJ5LFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRiYW5rYWNjb3VudDogaW5wdXRfYWNjb3VudG51bWJlcixcblx0XHRcdFx0XHRcdFx0YmFua2NvZGU6IGlucHV0X2Jhbmtjb2RlLFxuXHRcdFx0XHRcdFx0XHRiYW5rY291bnRyeTogaW5wdXRfYmFua2NvdW50cnksXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHAxX2RlYnVnKSB7IGNvbnNvbGUubG9nKGRhdGEpOyB9XG5cdFx0XHRcdFx0cGcuY2FsbChkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0JCgnZm9ybSNjaGVja291dF9wYXltZW50Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dmFyICRjaGVja2VkX3BheW1lbnQgPSAkKCdpbnB1dFtuYW1lPVwicGF5bWVudFwiXTpjaGVja2VkJyk7XG5cdFx0XHRcdGlmKCRjaGVja2VkX3BheW1lbnQudmFsKCkgPT09ICdwYXlvbmVfZWx2Jylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCRjaGVja2VkX3BheW1lbnQuY2xvc2VzdCgnZGl2LnBheW1lbnRfaXRlbScpLmhhc0NsYXNzKCdkYXRhX3ZhbGlkJykgPT09IGZhbHNlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHBheW9uZV9lbHZfY2hlY2tkYXRhKGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBfaW5pdFNhZmVJbnYgPSBmdW5jdGlvbigpXG5cdFx0e1xuXHRcdFx0dmFyIF9zYWZlSW52RGlzcGxheUFncmVlbWVudCA9IGZ1bmN0aW9uKClcblx0XHRcdHtcblx0XHRcdFx0dmFyIHNhZmVJbnZUeXBlID0gJCgnI3AxX3NhZmVpbnZfdHlwZScpLnZhbCgpO1xuXHRcdFx0XHQkKCd0ci5wMS1zYWZlaW52LWFncmVlbWVudCcpLm5vdCgnLnAxLXNob3ctZm9yLScgKyBzYWZlSW52VHlwZSkuaGlkZSgpO1xuXHRcdFx0XHQkKCd0ci5wMS1zaG93LWZvci0nICsgc2FmZUludlR5cGUpLnNob3coKTtcblx0XHRcdH1cblx0XHRcdCQoJ3NlbGVjdFtuYW1lPVwic2FmZWludl90eXBlXCJdJykub24oJ2NoYW5nZScsIF9zYWZlSW52RGlzcGxheUFncmVlbWVudCk7XG5cdFx0XHRfc2FmZUludkRpc3BsYXlBZ3JlZW1lbnQoKTtcblx0XHR9XG5cblx0XHQvLyAjIyMjIyMjIyMjIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdC8qKlxuXHRcdCAqIEluaXRpYWxpemUgTW9kdWxlXG5cdFx0ICogQGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0bW9kdWxlLmluaXQgPSBmdW5jdGlvbihkb25lKSB7XG5cdFx0XHRpZihwMV9kZWJ1ZykgeyBjb25zb2xlLmxvZygncGF5b25lX2NoZWNrb3V0IG1vZHVsZSBpbml0aWFsaXppbmcsIHN1Ym1vZHVsZSAnICsgb3B0aW9ucy5tb2R1bGUpOyB9XG5cdFx0XHRpZihvcHRpb25zLm1vZHVsZSA9PSAnY2MnKVxuXHRcdFx0e1xuXHRcdFx0XHQkKCdmb3JtI2NoZWNrb3V0X3BheW1lbnQnKS5vbignc3VibWl0JywgX3AxX3BheW1lbnRfc3VibWl0X2hhbmRsZXIpO1xuXHRcdFx0fVxuXHRcdFx0aWYob3B0aW9ucy5tb2R1bGUgPT0gJ290cmFucycpXG5cdFx0XHR7XG5cdFx0XHRcdF9pbml0T25saW5lVHJhbnNmZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmKG9wdGlvbnMubW9kdWxlID09ICdlbHYnKVxuXHRcdFx0e1xuXHRcdFx0XHRfaW5pdEVMVigpO1xuXHRcdFx0fVxuXHRcdFx0aWYob3B0aW9ucy5tb2R1bGUgPT0gJ3NhZmVpbnYnKVxuXHRcdFx0e1xuXHRcdFx0XHRfaW5pdFNhZmVJbnYoKTtcblx0XHRcdH1cblx0XHRcdGRvbmUoKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIG1vZHVsZTtcblx0fVxuKTtcbiJdfQ==
