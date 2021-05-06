'use strict';

/* --------------------------------------------------------------
   amazon_loginpay.js 2018-07-24
   Gambio GmbH
   http://www.gambio.de
   Copyright (c) 2017 Gambio GmbH
   Released under the GNU General Public License (Version 2)
   [http://www.gnu.org/licenses/gpl-2.0.html]
   --------------------------------------------------------------
*/

gambio.widgets.module('amazon_loginpay', [], function (data) {

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
	module.init = function (done) {
		$continue = $(options.continueBtn);

		window.onAmazonLoginReady = function () {
			amazon.Login.setClientId(options.clientId);
			amazon.Login.setUseCookie(true);
		};
		window.onAmazonPaymentsReady = function () {
			if (options.mode === 'addressbook') {
				new OffAmazonPayments.Widgets.AddressBook({
					sellerId: options.sellerId,
					design: {
						designMode: 'responsive'
					},
					onOrderReferenceCreate: function onOrderReferenceCreate(amzOrderReference) {
						console.log(amzOrderReference);
						orderReference = amzOrderReference.getAmazonOrderReferenceId();
						$('#amz-orderrefid').val(orderReference);
					},
					onAddressSelect: function onAddressSelect(addressBookWidget) {
						var dataset = {
							orderrefid: orderReference,
							action: 'addressSelect'
						};
						$.post(options.requestURL, dataset).done(function (result) {
							// Show / hide the "country not allowed" error message
							if (result.country_allowed === 'false') {
								$continue.hide();
								$countryNotAllowed.show();
							} else {
								if (result.reload === 'true') {
									location.reload();
								}
								$continue.show();
								$countryNotAllowed.hide();
							}
						}).fail(function (result) {
							alert('ERROR');
						});
						console.log(orderReference);
					},
					onReady: function onReady(orderReference) {},
					onError: function onError(error) {
						console.log(error);
					}
				}).bind(options.placeholderId);
			}

			if (options.mode === 'wallet') {
				new OffAmazonPayments.Widgets.Wallet({
					sellerId: options.sellerId,
					design: {
						designMode: 'responsive'
					},
					amazonOrderReferenceId: options.orderReferenceId,
					onPaymentSelect: function onPaymentSelect(orderReference) {},
					onError: function onError(error) {
						console.log(error);
					}
				}).bind(options.placeholderId);
			}

			if (options.mode === 'readonly') {
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
			if (options.readonlyAddressbook) {
				$('#' + options.readonlyAddressbook).css('height', '15em');
			}
			if (options.readonlyWallet) {
				$('#' + options.readonlyWallet).css('height', '15em');
			}
		};
		$('body').append($('<script src="' + options.widgetsSrc + '" async></script>'));

		if (options.mode === 'addressbook') {
			$countryNotAllowed = $('<div class="amzadvpay_countrynotallowed" style="display: none;">' + options.countrytxt + '</div>');
			$('#' + options.placeholderId).after($countryNotAllowed);
		}

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvYW1hem9uX2xvZ2lucGF5LmpzIl0sIm5hbWVzIjpbImdhbWJpbyIsIndpZGdldHMiLCJtb2R1bGUiLCJkYXRhIiwiJHRoaXMiLCIkIiwiJGJvZHkiLCIkY291bnRyeU5vdEFsbG93ZWQiLCIkYnV0dG9uIiwiJGNvbnRpbnVlIiwiZGVmYXVsdHMiLCJjb250aW51ZUJ0biIsInBsYWNlaG9sZGVySWQiLCJtb2RlIiwic2VsbGVySWQiLCJjbGllbnRJZCIsIndpZGdldHNTcmMiLCJyZWFkb25seUFkZHJlc3Nib29rIiwicmVhZG9ubHlXYWxsZXQiLCJyZXF1ZXN0VVJMIiwiY291bnRyeXR4dCIsIm9yZGVyUmVmZXJlbmNlIiwib3B0aW9ucyIsImV4dGVuZCIsImluaXQiLCJkb25lIiwid2luZG93Iiwib25BbWF6b25Mb2dpblJlYWR5IiwiYW1hem9uIiwiTG9naW4iLCJzZXRDbGllbnRJZCIsInNldFVzZUNvb2tpZSIsIm9uQW1hem9uUGF5bWVudHNSZWFkeSIsIk9mZkFtYXpvblBheW1lbnRzIiwiV2lkZ2V0cyIsIkFkZHJlc3NCb29rIiwiZGVzaWduIiwiZGVzaWduTW9kZSIsIm9uT3JkZXJSZWZlcmVuY2VDcmVhdGUiLCJhbXpPcmRlclJlZmVyZW5jZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRBbWF6b25PcmRlclJlZmVyZW5jZUlkIiwidmFsIiwib25BZGRyZXNzU2VsZWN0IiwiYWRkcmVzc0Jvb2tXaWRnZXQiLCJkYXRhc2V0Iiwib3JkZXJyZWZpZCIsImFjdGlvbiIsInBvc3QiLCJyZXN1bHQiLCJjb3VudHJ5X2FsbG93ZWQiLCJoaWRlIiwic2hvdyIsInJlbG9hZCIsImxvY2F0aW9uIiwiZmFpbCIsImFsZXJ0Iiwib25SZWFkeSIsIm9uRXJyb3IiLCJlcnJvciIsImJpbmQiLCJXYWxsZXQiLCJhbWF6b25PcmRlclJlZmVyZW5jZUlkIiwib3JkZXJSZWZlcmVuY2VJZCIsIm9uUGF5bWVudFNlbGVjdCIsImRpc3BsYXlNb2RlIiwiY3NzIiwi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RzdDLFFBQVFMLG1CQUFYLEVBQWdDO0FBQy9CWixNQUFFLE1BQU1pQixRQUFRTCxtQkFBaEIsRUFBcUNrRCxHQUFyQyxDQUF5QyxRQUF6QyxFQUFtRCxNQUFuRDtBQUNBO0FBQ0QsT0FBRzdDLFFBQVFKLGNBQVgsRUFBMkI7QUFDMUJiLE1BQUUsTUFBTWlCLFFBQVFKLGNBQWhCLEVBQWdDaUQsR0FBaEMsQ0FBb0MsUUFBcEMsRUFBOEMsTUFBOUM7QUFDQTtBQUVELEdBdkZEO0FBd0ZBOUQsSUFBRSxNQUFGLEVBQVUrRCxNQUFWLENBQWlCL0QsRUFBRSxrQkFBa0JpQixRQUFRTixVQUExQixHQUF1QyxtQkFBekMsQ0FBakI7O0FBRUEsTUFBR00sUUFBUVQsSUFBUixLQUFpQixhQUFwQixFQUFtQztBQUNsQ04sd0JBQXFCRixFQUFFLHFFQUFxRWlCLFFBQVFGLFVBQTdFLEdBQTBGLFFBQTVGLENBQXJCO0FBQ0FmLEtBQUUsTUFBTWlCLFFBQVFWLGFBQWhCLEVBQStCeUQsS0FBL0IsQ0FBcUM5RCxrQkFBckM7QUFDQTs7QUFFRGtCO0FBQ0EsRUF2R0Q7O0FBeUdBO0FBQ0EsUUFBT3ZCLE1BQVA7QUFDQSxDQTVJRCIsImZpbGUiOiJ3aWRnZXRzL2FtYXpvbl9sb2dpbnBheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICBhbWF6b25fbG9naW5wYXkuanMgMjAxOC0wNy0yNFxuICAgR2FtYmlvIEdtYkhcbiAgIGh0dHA6Ly93d3cuZ2FtYmlvLmRlXG4gICBDb3B5cmlnaHQgKGMpIDIwMTcgR2FtYmlvIEdtYkhcbiAgIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuICAgW2h0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMi4wLmh0bWxdXG4gICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKi9cblxuZ2FtYmlvLndpZGdldHMubW9kdWxlKCdhbWF6b25fbG9naW5wYXknLCBbXSwgZnVuY3Rpb24oZGF0YSkge1xuXHRcblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHQkYm9keSA9ICQoJ2JvZHknKSxcblx0XHQkY291bnRyeU5vdEFsbG93ZWQgPSBudWxsLFxuXHRcdCRidXR0b24gPSBudWxsLFxuXHRcdCRjb250aW51ZSA9IG51bGwsXG5cdFx0ZGVmYXVsdHMgPSB7XG5cdFx0XHRjb250aW51ZUJ0bjogJy5idG4tY29udGludWUnLFxuXHRcdFx0cGxhY2Vob2xkZXJJZDogbnVsbCxcblx0XHRcdG1vZGU6ICdhZGRyZXNzYm9vaycsXG5cdFx0XHRzZWxsZXJJZDogbnVsbCxcblx0XHRcdGNsaWVudElkOiBudWxsLFxuXHRcdFx0d2lkZ2V0c1NyYzogbnVsbCxcblx0XHRcdHJlYWRvbmx5QWRkcmVzc2Jvb2s6IG51bGwsXG5cdFx0XHRyZWFkb25seVdhbGxldDogbnVsbCxcblx0XHRcdHJlcXVlc3RVUkw6ICdyZXF1ZXN0X3BvcnQucGhwP21vZHVsZT1BbWF6b25BZHZQYXknLFxuXHRcdFx0Y291bnRyeXR4dDogJ2NvdW50cnkgbm90IGFsbG93ZWQnXG5cdFx0fSxcblx0XHRvcmRlclJlZmVyZW5jZSA9IG51bGwsXG5cdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgZGF0YSksXG5cdFx0bW9kdWxlID0ge307XG5cbi8vICMjIyMjIyMjIyMgSEVMUEVSIEZVTkNUSU9OUyAjIyMjIyMjIyMjXG5cdFxuXHQvLyAjIyMjIyMjIyMjIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblx0XG5cdC8qKlxuXHQgKiBJbml0IGZ1bmN0aW9uIG9mIHRoZSB3aWRnZXRcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRtb2R1bGUuaW5pdCA9IGZ1bmN0aW9uKGRvbmUpIHtcblx0XHQkY29udGludWUgPSAkKG9wdGlvbnMuY29udGludWVCdG4pO1xuXHRcdFxuXHRcdHdpbmRvdy5vbkFtYXpvbkxvZ2luUmVhZHkgPSBmdW5jdGlvbigpIHtcblx0XHRcdGFtYXpvbi5Mb2dpbi5zZXRDbGllbnRJZChvcHRpb25zLmNsaWVudElkKTtcblx0XHRcdGFtYXpvbi5Mb2dpbi5zZXRVc2VDb29raWUodHJ1ZSk7XG5cdFx0fTtcblx0XHR3aW5kb3cub25BbWF6b25QYXltZW50c1JlYWR5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZihvcHRpb25zLm1vZGUgPT09ICdhZGRyZXNzYm9vaycpIHtcblx0XHRcdFx0bmV3IE9mZkFtYXpvblBheW1lbnRzLldpZGdldHMuQWRkcmVzc0Jvb2soe1xuXHRcdFx0XHRcdHNlbGxlcklkOiBvcHRpb25zLnNlbGxlcklkLFxuXHRcdFx0XHRcdGRlc2lnbjoge1xuXHRcdFx0XHRcdFx0ZGVzaWduTW9kZTogJ3Jlc3BvbnNpdmUnXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbk9yZGVyUmVmZXJlbmNlQ3JlYXRlOiBmdW5jdGlvbihhbXpPcmRlclJlZmVyZW5jZSkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYW16T3JkZXJSZWZlcmVuY2UpO1xuXHRcdFx0XHRcdFx0b3JkZXJSZWZlcmVuY2UgPSBhbXpPcmRlclJlZmVyZW5jZS5nZXRBbWF6b25PcmRlclJlZmVyZW5jZUlkKCk7XG5cdFx0XHRcdFx0XHQkKCcjYW16LW9yZGVycmVmaWQnKS52YWwob3JkZXJSZWZlcmVuY2UpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0b25BZGRyZXNzU2VsZWN0OiBmdW5jdGlvbihhZGRyZXNzQm9va1dpZGdldCkge1xuXHRcdFx0XHRcdFx0dmFyIGRhdGFzZXQgPSB7XG5cdFx0XHRcdFx0XHRcdG9yZGVycmVmaWQ6IG9yZGVyUmVmZXJlbmNlLFxuXHRcdFx0XHRcdFx0XHRhY3Rpb246ICdhZGRyZXNzU2VsZWN0J1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdCQucG9zdChvcHRpb25zLnJlcXVlc3RVUkwsIGRhdGFzZXQpLmRvbmUoZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdFx0XHRcdC8vIFNob3cgLyBoaWRlIHRoZSBcImNvdW50cnkgbm90IGFsbG93ZWRcIiBlcnJvciBtZXNzYWdlXG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQuY291bnRyeV9hbGxvd2VkID09PSAnZmFsc2UnKSB7XG5cdFx0XHRcdFx0XHRcdFx0JGNvbnRpbnVlLmhpZGUoKTtcblx0XHRcdFx0XHRcdFx0XHQkY291bnRyeU5vdEFsbG93ZWQuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGlmKHJlc3VsdC5yZWxvYWQgPT09ICd0cnVlJylcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0JGNvbnRpbnVlLnNob3coKTtcblx0XHRcdFx0XHRcdFx0XHQkY291bnRyeU5vdEFsbG93ZWQuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0XHRcdFx0YWxlcnQoJ0VSUk9SJyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKG9yZGVyUmVmZXJlbmNlKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG9uUmVhZHk6IGZ1bmN0aW9uKG9yZGVyUmVmZXJlbmNlKSB7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbkVycm9yOiBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuYmluZChvcHRpb25zLnBsYWNlaG9sZGVySWQpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZihvcHRpb25zLm1vZGUgPT09ICd3YWxsZXQnKSB7XG5cdFx0XHRcdG5ldyBPZmZBbWF6b25QYXltZW50cy5XaWRnZXRzLldhbGxldCh7XG5cdFx0XHRcdFx0c2VsbGVySWQ6IG9wdGlvbnMuc2VsbGVySWQsXG5cdFx0XHRcdFx0ZGVzaWduOiB7XG5cdFx0XHRcdFx0XHRkZXNpZ25Nb2RlOiAncmVzcG9uc2l2ZSdcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGFtYXpvbk9yZGVyUmVmZXJlbmNlSWQ6IG9wdGlvbnMub3JkZXJSZWZlcmVuY2VJZCxcblx0XHRcdFx0XHRvblBheW1lbnRTZWxlY3Q6IGZ1bmN0aW9uKG9yZGVyUmVmZXJlbmNlKSB7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbkVycm9yOiBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuYmluZChvcHRpb25zLnBsYWNlaG9sZGVySWQpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZihvcHRpb25zLm1vZGUgPT09ICdyZWFkb25seScpIHtcblx0XHRcdFx0bmV3IE9mZkFtYXpvblBheW1lbnRzLldpZGdldHMuQWRkcmVzc0Jvb2soe1xuXHRcdFx0XHRcdHNlbGxlcklkOiBvcHRpb25zLnNlbGxlcklkLFxuXHRcdFx0XHRcdGRlc2lnbjoge1xuXHRcdFx0XHRcdFx0ZGVzaWduTW9kZTogJ3Jlc3BvbnNpdmUnXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhbWF6b25PcmRlclJlZmVyZW5jZUlkOiBvcHRpb25zLm9yZGVyUmVmZXJlbmNlSWQsXG5cdFx0XHRcdFx0ZGlzcGxheU1vZGU6ICdSZWFkJ1xuXHRcdFx0XHR9KS5iaW5kKG9wdGlvbnMucmVhZG9ubHlBZGRyZXNzYm9vayk7XG5cblx0XHRcdFx0bmV3IE9mZkFtYXpvblBheW1lbnRzLldpZGdldHMuV2FsbGV0KHtcblx0XHRcdFx0XHRzZWxsZXJJZDogb3B0aW9ucy5zZWxsZXJJZCxcblx0XHRcdFx0XHRkZXNpZ246IHtcblx0XHRcdFx0XHRcdGRlc2lnbk1vZGU6ICdyZXNwb25zaXZlJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YW1hem9uT3JkZXJSZWZlcmVuY2VJZDogb3B0aW9ucy5vcmRlclJlZmVyZW5jZUlkLFxuXHRcdFx0XHRcdGRpc3BsYXlNb2RlOiAnUmVhZCdcblx0XHRcdFx0fSkuYmluZChvcHRpb25zLnJlYWRvbmx5V2FsbGV0KTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0JCgnIycgKyBvcHRpb25zLnBsYWNlaG9sZGVySWQpLmNzcygnaGVpZ2h0JywgJzI1ZW0nKS5jc3MoJ21hcmdpbi1ib3R0b20nLCAnMWVtJyk7XG5cdFx0XHRpZihvcHRpb25zLnJlYWRvbmx5QWRkcmVzc2Jvb2spIHtcblx0XHRcdFx0JCgnIycgKyBvcHRpb25zLnJlYWRvbmx5QWRkcmVzc2Jvb2spLmNzcygnaGVpZ2h0JywgJzE1ZW0nKTtcblx0XHRcdH1cblx0XHRcdGlmKG9wdGlvbnMucmVhZG9ubHlXYWxsZXQpIHtcblx0XHRcdFx0JCgnIycgKyBvcHRpb25zLnJlYWRvbmx5V2FsbGV0KS5jc3MoJ2hlaWdodCcsICcxNWVtJyk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHR9O1xuXHRcdCQoJ2JvZHknKS5hcHBlbmQoJCgnPHNjcmlwdCBzcmM9XCInICsgb3B0aW9ucy53aWRnZXRzU3JjICsgJ1wiIGFzeW5jPjwvc2NyaXB0PicpKTtcblx0XHRcblx0XHRpZihvcHRpb25zLm1vZGUgPT09ICdhZGRyZXNzYm9vaycpIHtcblx0XHRcdCRjb3VudHJ5Tm90QWxsb3dlZCA9ICQoJzxkaXYgY2xhc3M9XCJhbXphZHZwYXlfY291bnRyeW5vdGFsbG93ZWRcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+JyArIG9wdGlvbnMuY291bnRyeXR4dCArICc8L2Rpdj4nKTtcblx0XHRcdCQoJyMnICsgb3B0aW9ucy5wbGFjZWhvbGRlcklkKS5hZnRlcigkY291bnRyeU5vdEFsbG93ZWQpO1xuXHRcdH1cblxuXHRcdGRvbmUoKTtcblx0fTtcblx0XG5cdC8vIFJldHVybiBkYXRhIHRvIHdpZGdldCBlbmdpbmVcblx0cmV0dXJuIG1vZHVsZTtcbn0pO1xuXG5cbiJdfQ==
