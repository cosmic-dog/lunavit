/* --------------------------------------------------------------
   amazon_loginpay.js 2018-07-24
   Gambio GmbH
   http://www.gambio.de
   Copyright (c) 2017 Gambio GmbH
   Released under the GNU General Public License (Version 2)
   [http://www.gnu.org/licenses/gpl-2.0.html]
   --------------------------------------------------------------
*/

gambio.widgets.module('amazon_loginpay', [], function(data) {
	
	'use strict';
	
	var $this = $(this),
		$body = $('body'),
		$countryNotAllowed = null,
		$button = null,
		$continue = null,
		defaults = {
			continueBtn: '.btn-continue',
			placeholderId: null,
			mode: 'addressbook',
			sellerId: null,
			clientId: null,
			widgetsSrc: null,
			readonlyAddressbook: null,
			readonlyWallet: null,
			requestURL: 'request_port.php?module=AmazonAdvPay',
			countrytxt: 'country not allowed'
		},
		orderReference = null,
		options = $.extend(true, {}, defaults, data),
		module = {};

// ########## HELPER FUNCTIONS ##########
	
	// ########## INITIALIZATION ##########
	
	/**
	 * Init function of the widget
	 * @constructor
	 */
	module.init = function(done) {
		$continue = $(options.continueBtn);
		
		window.onAmazonLoginReady = function() {
			amazon.Login.setClientId(options.clientId);
			amazon.Login.setUseCookie(true);
		};
		window.onAmazonPaymentsReady = function() {
			if(options.mode === 'addressbook') {
				new OffAmazonPayments.Widgets.AddressBook({
					sellerId: options.sellerId,
					design: {
						designMode: 'responsive'
					},
					onOrderReferenceCreate: function(amzOrderReference) {
						console.log(amzOrderReference);
						orderReference = amzOrderReference.getAmazonOrderReferenceId();
						$('#amz-orderrefid').val(orderReference);
					},
					onAddressSelect: function(addressBookWidget) {
						var dataset = {
							orderrefid: orderReference,
							action: 'addressSelect'
						};
						$.post(options.requestURL, dataset).done(function(result) {
							// Show / hide the "country not allowed" error message
							if (result.country_allowed === 'false') {
								$continue.hide();
								$countryNotAllowed.show();
							} else {
								if(result.reload === 'true')
								{
									location.reload();
								}
								$continue.show();
								$countryNotAllowed.hide();
							}
							
						}).fail(function(result) {
							alert('ERROR');
						});
						console.log(orderReference);
					},
					onReady: function(orderReference) {
					},
					onError: function(error) {
						console.log(error);
					}
				}).bind(options.placeholderId);
			}
			
			if(options.mode === 'wallet') {
				new OffAmazonPayments.Widgets.Wallet({
					sellerId: options.sellerId,
					design: {
						designMode: 'responsive'
					},
					amazonOrderReferenceId: options.orderReferenceId,
					onPaymentSelect: function(orderReference) {
					},
					onError: function(error) {
						console.log(error);
					}
				}).bind(options.placeholderId);
			}
			
			if(options.mode === 'readonly') {
				new OffAmazonPayments.Widgets.AddressBook({
					sellerId: options.sellerId,
					design: {
						designMode: 'responsive'
					},
					amazonOrderReferenceId: options.orderReferenceId,
					displayMode: 'Read'
				}).bind(options.readonlyAddressbook);

				new OffAmazonPayments.Widgets.Wallet({
					sellerId: options.sellerId,
					design: {
						designMode: 'responsive'
					},
					amazonOrderReferenceId: options.orderReferenceId,
					displayMode: 'Read'
				}).bind(options.readonlyWallet);
			}
			
			$('#' + options.placeholderId).css('height', '25em').css('margin-bottom', '1em');
			if(options.readonlyAddressbook) {
				$('#' + options.readonlyAddressbook).css('height', '15em');
			}
			if(options.readonlyWallet) {
				$('#' + options.readonlyWallet).css('height', '15em');
			}
			
		};
		$('body').append($('<script src="' + options.widgetsSrc + '" async></script>'));
		
		if(options.mode === 'addressbook') {
			$countryNotAllowed = $('<div class="amzadvpay_countrynotallowed" style="display: none;">' + options.countrytxt + '</div>');
			$('#' + options.placeholderId).after($countryNotAllowed);
		}

		done();
	};
	
	// Return data to widget engine
	return module;
});


