'use strict';

/* --------------------------------------------------------------
 cart_handler.js 2018-03-27
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2018 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/**
 * Component for handling the add to cart and wishlist features
 * at the product details and the category listing pages. It cares
 * for attributes, properties, quantity and all other
 * relevant data for adding an item to the basket or wishlist
 */
gambio.widgets.module('cart_handler', ['hooks', 'form', 'xhr', gambio.source + '/libs/events', gambio.source + '/libs/modal.ext-magnific', gambio.source + '/libs/modal'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $body = $('body'),
	    $window = $(window),
	    busy = false,
	    ajax = null,
	    timeout = 0,
	    defaults = {
		// AJAX "add to cart" URL
		addCartUrl: 'shop.php?do=Cart/BuyProduct',
		// AJAX "add to cart" URL for customizer products
		addCartCustomizerUrl: 'shop.php?do=Cart/Add',
		// AJAX URL to perform a value check
		checkUrl: 'shop.php?do=CheckStatus',
		// AJAX URL to perform the add to wishlist
		wishlistUrl: 'shop.php?do=WishList/Add',
		// Submit URL for price offer button
		priceOfferUrl: 'gm_price_offer.php',
		// Submit method for price offer
		priceOfferMethod: 'get',
		// Selector for the cart dropdown
		dropdown: '#head_shopping_cart',
		// "Add to cart" buttons selectors
		cartButtons: '.js-btn-add-to-cart',
		// "Wishlist" buttons selectors
		wishlistButtons: '.btn-wishlist',
		// "Price offer" buttons selectors
		priceOfferButtons: '.btn-price-offer',
		// Selector for the attribute fields
		attributes: '.js-calculate',
		// Selector for the quantity
		quantity: '.js-calculate-qty',
		// URL where to get the template for the dropdown
		tpl: null,
		// Show attribute images in product images swiper (if possible)
		// -- this feature is not supported yet --
		attributImagesSwiper: false,
		// Trigger the attribute images to this selectors
		triggerAttrImagesTo: '#product_image_swiper, #product_thumbnail_swiper, ' + '#product_thumbnail_swiper_mobile',
		// Class that gets added to the button on processing
		processingClass: 'loading',
		// Duration for that the success or fail class gets added to the button
		processingDuration: 2000,
		// AJAX response content selectors
		selectorMapping: {
			attributeImages: '.attribute-images',
			buttons: '.shopping-cart-button',
			giftContent: '.gift-cart-content-wrapper',
			giftLayer: '.gift-cart-layer',
			shareContent: '.share-cart-content-wrapper',
			shareLayer: '.share-cart-layer',
			hiddenOptions: '#cart_quantity .hidden-options',
			message: '.global-error-messages',
			messageCart: '.cart-error-msg',
			messageHelp: '.help-block',
			modelNumber: '.model-number',
			price: '.current-price-container',
			propertiesForm: '.properties-selection-form',
			quantity: '.products-quantity-value',
			ribbonSpecial: '.ribbon-special',
			shippingInformation: '#shipping-information-layer',
			shippingTime: '.products-shipping-time-value',
			shippingTimeImage: '.img-shipping-time img',
			totals: '#cart_quantity .total-box',
			weight: '.products-details-weight-container span'
		}
	},
	    options = $.extend(true, {}, defaults, data),
	    module = {};

	// ########## HELPER FUNCTIONS ##########

	/**
  * Helper function that updates the button
  * state with an error or success class for
  * a specified duration
  * @param   {object}        $target         jQuery selection of the target button
  * @param   {string}        state           The state string that gets added to the loading class
  * @private
  */
	var _addButtonState = function _addButtonState($target, state) {
		var timer = setTimeout(function () {
			$target.removeClass(options.processingClass + ' ' + options.processingClass + state);
		}, options.processingDuration);

		$target.data('timer', timer).addClass(options.processingClass + state);
	};

	/**
  * Helper function to set the messages and the
  * button state.
  * @param       {object}    data                Result form the ajax request
  * @param       {object}    $form               jQuery selecion of the form
  * @param       {boolean}   disableButtons      If true, the button state gets set to (in)active
  * @param       {boolean}   showNoCombiMesssage If true, the error message for missing property combination selection will be displayed
  * @private
  */
	var _stateManager = function _stateManager(data, $form, disableButtons, showNoCombiSelectedMesssage) {

		// Remove the attribute images from the common content
		// so that it doesn't get rendered anymore. Then trigger
		// an event to the given selectors and deliver the
		// attrImages object
		if (options.attributImagesSwiper && data.attrImages && data.attrImages.length) {
			delete data.content.images;
			$(options.triggerAttrImagesTo).trigger(jse.libs.template.events.SLIDES_UPDATE(), { attributes: data.attrImages });
		}

		// Set the messages given inside the data.content object
		$.each(data.content, function (i, v) {
			var $element = $form.parent().find(options.selectorMapping[v.selector]);

			if ((!showNoCombiSelectedMesssage || v.value === '') && i === 'messageNoCombiSelected') {
				return true;
			}

			switch (v.type) {
				case 'html':
					$element.html(v.value);
					break;
				case 'attribute':
					$element.attr(v.key, v.value);
					break;
				case 'replace':
					if (v.value) {
						$element.replaceWith(v.value);
					} else {
						$element.addClass('hidden').empty();
					}
					break;
				default:
					$element.text(v.value);
					break;
			}
		});

		// Dis- / Enable the buttons
		if (disableButtons) {
			var $buttons = $form.find(options.cartButtons);
			if (data.success) {
				$buttons.removeClass('inactive');
				$buttons.removeClass('btn-inactive');
			} else {
				$buttons.addClass('inactive');
				$buttons.addClass('btn-inactive');
			}
		}

		if (data.content.message) {
			var $errorField = $form.find(options.selectorMapping[data.content.message.selector]);
			if (data.content.message.value) {
				$errorField.removeClass('hidden').show();
			} else {
				$errorField.addClass('hidden').hide();

				if (showNoCombiSelectedMesssage && data.content.messageNoCombiSelected !== undefined && data.content.messageNoCombiSelected) {
					if (data.content.messageNoCombiSelected.value) {
						$errorField.removeClass('hidden').show();
					} else {
						$errorField.addClass('hidden').hide();
					}
				}
			}
		}

		$window.trigger(jse.libs.template.events.STICKYBOX_CONTENT_CHANGE());
	};

	/**
  * Helper function to send the ajax
  * On success redirect to a given url, open a layer with
  * a message or add the item to the cart-dropdown directly
  * (by triggering an event to the body)
  * @param       {object}      data      Form data
  * @param       {object}      $form     The form to fill
  * @param       {string}      url       The URL for the AJAX request
  * @private
  */
	var _addToSomewhere = function _addToSomewhere(data, $form, url, $button) {
		function callback() {
			jse.libs.xhr.post({ url: url, data: data }, true).done(function (result) {
				try {
					// Fill the page with the result from the ajax
					_stateManager(result, $form, false);

					// If the AJAX was successful execute
					// a custom functionality
					if (result.success) {
						switch (result.type) {
							case 'url':
								if (result.url.substr(0, 4) !== 'http') {
									location.href = jse.core.config.get('appUrl') + '/' + result.url;
								} else {
									location.href = result.url;
								}

								break;
							case 'dropdown':
								$body.trigger(jse.libs.template.events.CART_UPDATE(), [true]);
								break;
							case 'layer':
								jse.libs.template.modal.info({ title: result.title, content: result.msg });
								break;
							default:
								break;
						}
					}
				} catch (ignore) {}
				_addButtonState($button, '-success');
			}).fail(function () {
				_addButtonState($button, '-fail');
			}).always(function () {
				// Reset the busy flag to be able to perform
				// further AJAX requests
				busy = false;
			});
		}

		if (!busy) {
			// only execute the ajax
			// if there is no pending ajax call
			busy = true;

			jse.libs.hooks.execute(jse.libs.hooks.keys.shop.cart.add, data, 500).then(callback).catch(callback);
		}
	};

	// ########## EVENT HANDLER ##########

	/**
  * Handler for the submit form / click
  * on "add to cart" & "wishlist" button.
  * It performs a check on the availability
  * of the combination and quantity. If
  * successful it performs the add to cart
  * or wishlist action, if it's not a
  * "check" call
  * @param       {object}    e      jQuery event object
  * @private
  */
	var _submitHandler = function _submitHandler(e) {
		if (e) {
			e.preventDefault();
		}

		var $self = $(this),
		    $form = $self.is('form') ? $self : $self.closest('form'),
		    customizer = $form.hasClass('customizer'),
		    properties = !!$form.find('.properties-selection-form').length,
		    module = properties ? '' : '/Attributes',
		    showNoCombiSelectedMesssage = e && e.data && e.data.target && e.data.target !== 'check';

		if ($form.length) {

			// Show properties overlay
			// to disable user interaction
			// before markup replace
			if (properties) {
				$this.addClass('loading');
			}

			var formdata = jse.libs.form.getData($form, null, true);
			formdata.target = e && e.data && e.data.target ? e.data.target : 'check';
			formdata.isProductInfo = $form.hasClass('product-info') ? 1 : 0;

			// Abort previous check ajax if
			// there is one in progress
			if (ajax && e) {
				ajax.abort();
			}

			// Add processing-class to the button
			// and remove old timed events
			if (formdata.target !== 'check') {
				var timer = $self.data('timer');
				if (timer) {
					clearTimeout(timer);
				}

				$self.removeClass(options.processingClass + '-success ' + options.processingClass + '-fail').addClass(options.processingClass);
			}

			ajax = jse.libs.xhr.get({
				url: options.checkUrl + module,
				data: formdata
			}, true).done(function (result) {
				_stateManager(result, $form, true, showNoCombiSelectedMesssage);
				$this.removeClass('loading');

				if (result.success) {
					var event = null,
					    url = null;

					switch (formdata.target) {
						case 'wishlist':
							if (customizer) {
								event = jse.libs.template.events.ADD_CUSTOMIZER_WISHLIST();
							}
							url = options.wishlistUrl;
							break;
						case 'cart':
							if (customizer) {
								event = jse.libs.template.events.ADD_CUSTOMIZER_CART();
								url = options.addCartCustomizerUrl;
							} else {
								url = options.addCartUrl;
							}
							break;
						case 'price_offer':
							$form.attr('action', options.priceOfferUrl).attr('method', options.priceOfferMethod);
							$form.off('submit');
							$form.submit();

							return;
						default:
							setTimeout(function () {
								$window.trigger(jse.libs.template.events.STICKYBOX_CONTENT_CHANGE());
							}, 250);
							break;
					}

					if (event) {
						var deferred = $.Deferred();
						deferred.done(function (customizerRandom) {
							formdata[customizerRandom] = 0;
							_addToSomewhere(formdata, $form, url, $self);
						}).fail(function () {
							_addButtonState($self, '-fail');
						});
						$body.trigger(event, [{ 'deferred': deferred, 'dataset': formdata }]);
					} else if (url) {
						_addToSomewhere(formdata, $form, url, $self);
					}
				}
			}).fail(function () {
				_addButtonState($self, '-fail');
			});
		}
	};

	/**
  * Keyup handler for quantity input field
  * 
  * @param e
  * @private
  */
	var _keyupHandler = function _keyupHandler(e) {
		clearTimeout(timeout);

		timeout = setTimeout(function () {
			_submitHandler.call(this, e);
		}.bind(this), 300);
	};

	// ########## INITIALIZATION ##########

	/**
  * Init function of the widget
  * @constructor
  */
	module.init = function (done) {

		var $forms = $this.find('form');

		$forms.on('submit', { 'target': 'cart' }, _submitHandler).on('click', options.wishlistButtons, { 'target': 'wishlist' }, _submitHandler).on('click', options.priceOfferButtons, { 'target': 'price_offer' }, _submitHandler).on('change', options.attributes, { 'target': 'check' }, _submitHandler).on('blur', options.quantity, { 'target': 'check' }, function (e) {
			_submitHandler(e);
		}).on('keyup', options.quantity, { 'target': 'check' }, _keyupHandler);

		// Fallback if the backend renders incorrect data
		// on initial page call
		$forms.not('.no-status-check').each(function () {
			_submitHandler.call($(this));
		});

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvY2FydF9oYW5kbGVyLmpzIl0sIm5hbWVzIjpbImdhbWJpbyIsIndpZGdldHMiLCJtb2R1bGUiLCJzb3VyY2UiLCJkYXRhIiwiJHRoaXMiLCIkIiwiJGJvZHkiLCIkd2luZG93Iiwid2luZG93IiwiYnVzeSIsImFqYXgiLCJ0aW1lb3V0IiwiZGVmYXVsdHMiLCJhZGRDYXJ0VXJsIiwiYWRkQ2FydEN1c3RvbWl6ZXJVcmwiLCJjaGVja1VybCIsIndpc2hsaXN0VXJsIiwicHJpY2VPZmZlclVybCIsInByaWNlT2ZmZXJNZXRob2QiLCJkcm9wZG93biIsImNhcnRCdXR0b25zIiwid2lzaGxpc3RCdXR0b25zIiwicHJpY2VPZmZlckJ1dHRvbnMiLCJhdHRyaWJ1dGVzIiwicXVhbnRpdHkiLCJ0cGwiLCJhdHRyaWJ1dEltYWdlc1N3aXBlciIsInRyaWdnZXJBdHRySW1hZ2VzVG8iLCJwcm9jZXNzaW5nQ2xhc3MiLCJwcm9jZXNzaW5nRHVyYXRpb24iLCJzZWxlY3Rvck1hcHBpbmciLCJhdHRyaWJ1dGVJbWFnZXMiLCJidXR0b25zIiwiZ2lmdENvbnRlbnQiLCJnaWZ0TGF5ZXIiLCJzaGFyZUNvbnRlbnQiLCJzaGFyZUxheWVyIiwiaGlkZGVuT3B0aW9ucyIsIm1lc3NhZ2UiLCJtZXNzYWdlQ2FydCIsIm1lc3NhZ2VIZWxwIiwibW9kZWxOdW1iZXIiLCJwcmljZSIsInByb3BlcnRpZXNGb3JtIiwicmliYm9uU3BlY2lhbCIsInNoaXBwaW5nSW5mb3JtYXRpb24iLCJzaGlwcGluZ1RpbWUiLCJzaGlwcGluZ1RpbWVJbWFnZSIsInRvdGFscyIsIndlaWdodCIsIm9wdGlvbnMiLCJleHRlbmQiLCJfYWRkQnV0dG9uU3RhdGUiLCIkdGFyZ2V0Iiwic3RhdGUiLCJ0aW1lciIsInNldFRpbWVvdXQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiX3N0YXRlTWFuYWdlciIsIiRmb3JtIiwiZGlzYWJsZUJ1dHRvbnMiLCJzaG93Tm9Db21iaVNlbGVjdGVkTWVzc3NhZ2UiLCJhdHRySW1hZ2VzIiwibGVuZ3RoIiwiY29udGVudCIsImltYWdlcyIsInRyaWdnZXIiLCJqc2UiLCJsaWJzIiwidGVtcGxhdGUiLCJldmVudHMiLCJTTElERVNfVVBEQVRFIiwiZWFjaCIsImkiLCJ2IiwiJGVsZW1lbnQiLCJwYXJlbnQiLCJmaW5kIiwic2VsZWN0b3IiLCJ2YWx1ZSIsInR5cGUiLCJodG1sIiwiYXR0ciIsImtleSIsInJlcGxhY2VXaXRoIiwiZW1wdHkiLCJ0ZXh0IiwiJGJ1dHRvbnMiLCJzdWNjZXNzIiwiJGVycm9yRmllbGQiLCJzaG93IiwiaGlkZSIsIm1lc3NhZ2VOb0NvbWJpU2VsZWN0ZWQiLCJ1bmRlZmluZWQiLCJTVElDS1lCT1hfQ09OVEVOVF9DSEFOR0UiLCJfYWRkVG9Tb21ld2hlcmUiLCJ1cmwiLCIkYnV0dG9uIiwiY2FsbGJhY2siLCJ4aHIiLCJwb3N0IiwiZG9uZSIsInJlc3VsdCIsInN1YnN0ciIsImxvY2F0aW9uIiwiaHJlZiIsImNvcmUiLCJjb25maWciLCJnZXQiLCJDQVJUX1VQREFURSIsIm1vZGFsIiwiaW5mbyIsInRpdGxlIiwibXNnIiwiaWdub3JlIiwiZmFpbCIsImFsd2F5cyIsImhvb2tzIiwiZXhlY3V0ZSIsImtleXMiLCJzaG9wIiwiY2FydCIsImFkZCIsInRoZW4iLCJjYXRjaCIsIl9zdWJtaXRIYW5kbGVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJHNlbGYiLCJpcyIsImNsb3Nlc3QiLCJjdXN0b21pemVyIiwiaGFzQ2xhc3MiLCJwcm9wZXJ0aWVzIiwidGFyZ2V0IiwiZm9ybWRhdGEiLCJmb3JtIiwiZ2V0RGF0YSIsImlzUHJvZHVjdEluZm8iLCJhYm9ydCIsImNsZWFyVGltZW91dCIsImV2ZW50IiwiQUREX0NVU1RPTUlaRVJfV0lTSExJU1QiLCJBRERfQ1VTVE9NSVpFUl9DQVJUIiwib2ZmIiwic3VibWl0IiwiZGVmZXJyZWQiLCJEZWZlcnJlZCIsImN1c3RvbWl6ZXJSYW5kb20iLCJfa2V5dXBIYW5kbGVyIiwiY2FsbCIsImJp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O0FBSUF2SixRQUFPd0osSUFBUCxHQUFjLFVBQVNuRCxJQUFULEVBQWU7O0FBRTVCLE1BQUlvRCxTQUFTdEosTUFBTTBFLElBQU4sQ0FBVyxNQUFYLENBQWI7O0FBRUE0RSxTQUNFQyxFQURGLENBQ0ssUUFETCxFQUNlLEVBQUMsVUFBVSxNQUFYLEVBRGYsRUFDbUM3QixjQURuQyxFQUVFNkIsRUFGRixDQUVLLE9BRkwsRUFFY3pHLFFBQVE3QixlQUZ0QixFQUV1QyxFQUFDLFVBQVUsVUFBWCxFQUZ2QyxFQUUrRHlHLGNBRi9ELEVBR0U2QixFQUhGLENBR0ssT0FITCxFQUdjekcsUUFBUTVCLGlCQUh0QixFQUd5QyxFQUFDLFVBQVUsYUFBWCxFQUh6QyxFQUdvRXdHLGNBSHBFLEVBSUU2QixFQUpGLENBSUssUUFKTCxFQUllekcsUUFBUTNCLFVBSnZCLEVBSW1DLEVBQUMsVUFBVSxPQUFYLEVBSm5DLEVBSXdEdUcsY0FKeEQsRUFLRTZCLEVBTEYsQ0FLSyxNQUxMLEVBS2F6RyxRQUFRMUIsUUFMckIsRUFLK0IsRUFBQyxVQUFVLE9BQVgsRUFML0IsRUFLb0QsVUFBU3VHLENBQVQsRUFBWTtBQUM5REQsa0JBQWVDLENBQWY7QUFDQSxHQVBGLEVBUUU0QixFQVJGLENBUUssT0FSTCxFQVFjekcsUUFBUTFCLFFBUnRCLEVBUWdDLEVBQUMsVUFBVSxPQUFYLEVBUmhDLEVBUXFEOEgsYUFSckQ7O0FBVUE7QUFDQTtBQUNBSSxTQUFPRSxHQUFQLENBQVcsa0JBQVgsRUFBK0JuRixJQUEvQixDQUFvQyxZQUFXO0FBQzlDcUQsa0JBQWV5QixJQUFmLENBQW9CbEosRUFBRSxJQUFGLENBQXBCO0FBQ0EsR0FGRDs7QUFJQWlHO0FBQ0EsRUFyQkQ7O0FBdUJBO0FBQ0EsUUFBT3JHLE1BQVA7QUFDQSxDQTVhRiIsImZpbGUiOiJ3aWRnZXRzL2NhcnRfaGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gY2FydF9oYW5kbGVyLmpzIDIwMTgtMDMtMjdcbiBHYW1iaW8gR21iSFxuIGh0dHA6Ly93d3cuZ2FtYmlvLmRlXG4gQ29weXJpZ2h0IChjKSAyMDE4IEdhbWJpbyBHbWJIXG4gUmVsZWFzZWQgdW5kZXIgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIChWZXJzaW9uIDIpXG4gW2h0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMi4wLmh0bWxdXG4gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgaGFuZGxpbmcgdGhlIGFkZCB0byBjYXJ0IGFuZCB3aXNobGlzdCBmZWF0dXJlc1xuICogYXQgdGhlIHByb2R1Y3QgZGV0YWlscyBhbmQgdGhlIGNhdGVnb3J5IGxpc3RpbmcgcGFnZXMuIEl0IGNhcmVzXG4gKiBmb3IgYXR0cmlidXRlcywgcHJvcGVydGllcywgcXVhbnRpdHkgYW5kIGFsbCBvdGhlclxuICogcmVsZXZhbnQgZGF0YSBmb3IgYWRkaW5nIGFuIGl0ZW0gdG8gdGhlIGJhc2tldCBvciB3aXNobGlzdFxuICovXG5nYW1iaW8ud2lkZ2V0cy5tb2R1bGUoXG5cdCdjYXJ0X2hhbmRsZXInLFxuXG5cdFtcblx0XHQnaG9va3MnLFxuXHRcdCdmb3JtJyxcblx0XHQneGhyJyxcblx0XHRnYW1iaW8uc291cmNlICsgJy9saWJzL2V2ZW50cycsXG5cdFx0Z2FtYmlvLnNvdXJjZSArICcvbGlicy9tb2RhbC5leHQtbWFnbmlmaWMnLFxuXHRcdGdhbWJpby5zb3VyY2UgKyAnL2xpYnMvbW9kYWwnXG5cdF0sXG5cblx0ZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0J3VzZSBzdHJpY3QnO1xuXG4vLyAjIyMjIyMjIyMjIFZBUklBQkxFIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHQkYm9keSA9ICQoJ2JvZHknKSxcblx0XHRcdCR3aW5kb3cgPSAkKHdpbmRvdyksXG5cdFx0XHRidXN5ID0gZmFsc2UsXG5cdFx0XHRhamF4ID0gbnVsbCxcblx0XHRcdHRpbWVvdXQgPSAwLFxuXHRcdFx0ZGVmYXVsdHMgPSB7XG5cdFx0XHRcdC8vIEFKQVggXCJhZGQgdG8gY2FydFwiIFVSTFxuXHRcdFx0XHRhZGRDYXJ0VXJsOiAnc2hvcC5waHA/ZG89Q2FydC9CdXlQcm9kdWN0Jyxcblx0XHRcdFx0Ly8gQUpBWCBcImFkZCB0byBjYXJ0XCIgVVJMIGZvciBjdXN0b21pemVyIHByb2R1Y3RzXG5cdFx0XHRcdGFkZENhcnRDdXN0b21pemVyVXJsOiAnc2hvcC5waHA/ZG89Q2FydC9BZGQnLFxuXHRcdFx0XHQvLyBBSkFYIFVSTCB0byBwZXJmb3JtIGEgdmFsdWUgY2hlY2tcblx0XHRcdFx0Y2hlY2tVcmw6ICdzaG9wLnBocD9kbz1DaGVja1N0YXR1cycsXG5cdFx0XHRcdC8vIEFKQVggVVJMIHRvIHBlcmZvcm0gdGhlIGFkZCB0byB3aXNobGlzdFxuXHRcdFx0XHR3aXNobGlzdFVybDogJ3Nob3AucGhwP2RvPVdpc2hMaXN0L0FkZCcsXG5cdFx0XHRcdC8vIFN1Ym1pdCBVUkwgZm9yIHByaWNlIG9mZmVyIGJ1dHRvblxuXHRcdFx0XHRwcmljZU9mZmVyVXJsOiAnZ21fcHJpY2Vfb2ZmZXIucGhwJyxcblx0XHRcdFx0Ly8gU3VibWl0IG1ldGhvZCBmb3IgcHJpY2Ugb2ZmZXJcblx0XHRcdFx0cHJpY2VPZmZlck1ldGhvZDogJ2dldCcsXG5cdFx0XHRcdC8vIFNlbGVjdG9yIGZvciB0aGUgY2FydCBkcm9wZG93blxuXHRcdFx0XHRkcm9wZG93bjogJyNoZWFkX3Nob3BwaW5nX2NhcnQnLFxuXHRcdFx0XHQvLyBcIkFkZCB0byBjYXJ0XCIgYnV0dG9ucyBzZWxlY3RvcnNcblx0XHRcdFx0Y2FydEJ1dHRvbnM6ICcuanMtYnRuLWFkZC10by1jYXJ0Jyxcblx0XHRcdFx0Ly8gXCJXaXNobGlzdFwiIGJ1dHRvbnMgc2VsZWN0b3JzXG5cdFx0XHRcdHdpc2hsaXN0QnV0dG9uczogJy5idG4td2lzaGxpc3QnLFxuXHRcdFx0XHQvLyBcIlByaWNlIG9mZmVyXCIgYnV0dG9ucyBzZWxlY3RvcnNcblx0XHRcdFx0cHJpY2VPZmZlckJ1dHRvbnM6ICcuYnRuLXByaWNlLW9mZmVyJyxcblx0XHRcdFx0Ly8gU2VsZWN0b3IgZm9yIHRoZSBhdHRyaWJ1dGUgZmllbGRzXG5cdFx0XHRcdGF0dHJpYnV0ZXM6ICcuanMtY2FsY3VsYXRlJyxcblx0XHRcdFx0Ly8gU2VsZWN0b3IgZm9yIHRoZSBxdWFudGl0eVxuXHRcdFx0XHRxdWFudGl0eTogJy5qcy1jYWxjdWxhdGUtcXR5Jyxcblx0XHRcdFx0Ly8gVVJMIHdoZXJlIHRvIGdldCB0aGUgdGVtcGxhdGUgZm9yIHRoZSBkcm9wZG93blxuXHRcdFx0XHR0cGw6IG51bGwsXG5cdFx0XHRcdC8vIFNob3cgYXR0cmlidXRlIGltYWdlcyBpbiBwcm9kdWN0IGltYWdlcyBzd2lwZXIgKGlmIHBvc3NpYmxlKVxuXHRcdFx0XHQvLyAtLSB0aGlzIGZlYXR1cmUgaXMgbm90IHN1cHBvcnRlZCB5ZXQgLS1cblx0XHRcdFx0YXR0cmlidXRJbWFnZXNTd2lwZXI6IGZhbHNlLFxuXHRcdFx0XHQvLyBUcmlnZ2VyIHRoZSBhdHRyaWJ1dGUgaW1hZ2VzIHRvIHRoaXMgc2VsZWN0b3JzXG5cdFx0XHRcdHRyaWdnZXJBdHRySW1hZ2VzVG86ICcjcHJvZHVjdF9pbWFnZV9zd2lwZXIsICNwcm9kdWN0X3RodW1ibmFpbF9zd2lwZXIsICdcblx0XHRcdFx0KyAnI3Byb2R1Y3RfdGh1bWJuYWlsX3N3aXBlcl9tb2JpbGUnLFxuXHRcdFx0XHQvLyBDbGFzcyB0aGF0IGdldHMgYWRkZWQgdG8gdGhlIGJ1dHRvbiBvbiBwcm9jZXNzaW5nXG5cdFx0XHRcdHByb2Nlc3NpbmdDbGFzczogJ2xvYWRpbmcnLFxuXHRcdFx0XHQvLyBEdXJhdGlvbiBmb3IgdGhhdCB0aGUgc3VjY2VzcyBvciBmYWlsIGNsYXNzIGdldHMgYWRkZWQgdG8gdGhlIGJ1dHRvblxuXHRcdFx0XHRwcm9jZXNzaW5nRHVyYXRpb246IDIwMDAsXG5cdFx0XHRcdC8vIEFKQVggcmVzcG9uc2UgY29udGVudCBzZWxlY3RvcnNcblx0XHRcdFx0c2VsZWN0b3JNYXBwaW5nOiB7XG5cdFx0XHRcdFx0YXR0cmlidXRlSW1hZ2VzOiAnLmF0dHJpYnV0ZS1pbWFnZXMnLFxuXHRcdFx0XHRcdGJ1dHRvbnM6ICcuc2hvcHBpbmctY2FydC1idXR0b24nLFxuXHRcdFx0XHRcdGdpZnRDb250ZW50OiAnLmdpZnQtY2FydC1jb250ZW50LXdyYXBwZXInLFxuXHRcdFx0XHRcdGdpZnRMYXllcjogJy5naWZ0LWNhcnQtbGF5ZXInLFxuXHRcdFx0XHRcdHNoYXJlQ29udGVudDonLnNoYXJlLWNhcnQtY29udGVudC13cmFwcGVyJyxcblx0XHRcdFx0XHRzaGFyZUxheWVyOiAnLnNoYXJlLWNhcnQtbGF5ZXInLFxuXHRcdFx0XHRcdGhpZGRlbk9wdGlvbnM6ICcjY2FydF9xdWFudGl0eSAuaGlkZGVuLW9wdGlvbnMnLFxuXHRcdFx0XHRcdG1lc3NhZ2U6ICcuZ2xvYmFsLWVycm9yLW1lc3NhZ2VzJyxcblx0XHRcdFx0XHRtZXNzYWdlQ2FydDogJy5jYXJ0LWVycm9yLW1zZycsXG5cdFx0XHRcdFx0bWVzc2FnZUhlbHA6ICcuaGVscC1ibG9jaycsXG5cdFx0XHRcdFx0bW9kZWxOdW1iZXI6ICcubW9kZWwtbnVtYmVyJyxcblx0XHRcdFx0XHRwcmljZTogJy5jdXJyZW50LXByaWNlLWNvbnRhaW5lcicsXG5cdFx0XHRcdFx0cHJvcGVydGllc0Zvcm06ICcucHJvcGVydGllcy1zZWxlY3Rpb24tZm9ybScsXG5cdFx0XHRcdFx0cXVhbnRpdHk6ICcucHJvZHVjdHMtcXVhbnRpdHktdmFsdWUnLFxuXHRcdFx0XHRcdHJpYmJvblNwZWNpYWw6ICcucmliYm9uLXNwZWNpYWwnLFxuXHRcdFx0XHRcdHNoaXBwaW5nSW5mb3JtYXRpb246ICcjc2hpcHBpbmctaW5mb3JtYXRpb24tbGF5ZXInLFxuXHRcdFx0XHRcdHNoaXBwaW5nVGltZTogJy5wcm9kdWN0cy1zaGlwcGluZy10aW1lLXZhbHVlJyxcblx0XHRcdFx0XHRzaGlwcGluZ1RpbWVJbWFnZTogJy5pbWctc2hpcHBpbmctdGltZSBpbWcnLFxuXHRcdFx0XHRcdHRvdGFsczogJyNjYXJ0X3F1YW50aXR5IC50b3RhbC1ib3gnLFxuXHRcdFx0XHRcdHdlaWdodDogJy5wcm9kdWN0cy1kZXRhaWxzLXdlaWdodC1jb250YWluZXIgc3Bhbidcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGRhdGEpLFxuXHRcdFx0bW9kdWxlID0ge307XG5cblxuLy8gIyMjIyMjIyMjIyBIRUxQRVIgRlVOQ1RJT05TICMjIyMjIyMjIyNcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHVwZGF0ZXMgdGhlIGJ1dHRvblxuXHRcdCAqIHN0YXRlIHdpdGggYW4gZXJyb3Igb3Igc3VjY2VzcyBjbGFzcyBmb3Jcblx0XHQgKiBhIHNwZWNpZmllZCBkdXJhdGlvblxuXHRcdCAqIEBwYXJhbSAgIHtvYmplY3R9ICAgICAgICAkdGFyZ2V0ICAgICAgICAgalF1ZXJ5IHNlbGVjdGlvbiBvZiB0aGUgdGFyZ2V0IGJ1dHRvblxuXHRcdCAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICAgICBzdGF0ZSAgICAgICAgICAgVGhlIHN0YXRlIHN0cmluZyB0aGF0IGdldHMgYWRkZWQgdG8gdGhlIGxvYWRpbmcgY2xhc3Ncblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfYWRkQnV0dG9uU3RhdGUgPSBmdW5jdGlvbigkdGFyZ2V0LCBzdGF0ZSkge1xuXHRcdFx0dmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0JHRhcmdldC5yZW1vdmVDbGFzcyhvcHRpb25zLnByb2Nlc3NpbmdDbGFzcyArICcgJyArIG9wdGlvbnMucHJvY2Vzc2luZ0NsYXNzICsgc3RhdGUpO1xuXHRcdFx0fSwgb3B0aW9ucy5wcm9jZXNzaW5nRHVyYXRpb24pO1xuXG5cdFx0XHQkdGFyZ2V0XG5cdFx0XHRcdC5kYXRhKCd0aW1lcicsIHRpbWVyKVxuXHRcdFx0XHQuYWRkQ2xhc3Mob3B0aW9ucy5wcm9jZXNzaW5nQ2xhc3MgKyBzdGF0ZSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgdGhlIG1lc3NhZ2VzIGFuZCB0aGVcblx0XHQgKiBidXR0b24gc3RhdGUuXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgIGRhdGEgICAgICAgICAgICAgICAgUmVzdWx0IGZvcm0gdGhlIGFqYXggcmVxdWVzdFxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICAkZm9ybSAgICAgICAgICAgICAgIGpRdWVyeSBzZWxlY2lvbiBvZiB0aGUgZm9ybVxuXHRcdCAqIEBwYXJhbSAgICAgICB7Ym9vbGVhbn0gICBkaXNhYmxlQnV0dG9ucyAgICAgIElmIHRydWUsIHRoZSBidXR0b24gc3RhdGUgZ2V0cyBzZXQgdG8gKGluKWFjdGl2ZVxuXHRcdCAqIEBwYXJhbSAgICAgICB7Ym9vbGVhbn0gICBzaG93Tm9Db21iaU1lc3NzYWdlIElmIHRydWUsIHRoZSBlcnJvciBtZXNzYWdlIGZvciBtaXNzaW5nIHByb3BlcnR5IGNvbWJpbmF0aW9uIHNlbGVjdGlvbiB3aWxsIGJlIGRpc3BsYXllZFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9zdGF0ZU1hbmFnZXIgPSBmdW5jdGlvbihkYXRhLCAkZm9ybSwgZGlzYWJsZUJ1dHRvbnMsIHNob3dOb0NvbWJpU2VsZWN0ZWRNZXNzc2FnZSkge1xuXG5cdFx0XHQvLyBSZW1vdmUgdGhlIGF0dHJpYnV0ZSBpbWFnZXMgZnJvbSB0aGUgY29tbW9uIGNvbnRlbnRcblx0XHRcdC8vIHNvIHRoYXQgaXQgZG9lc24ndCBnZXQgcmVuZGVyZWQgYW55bW9yZS4gVGhlbiB0cmlnZ2VyXG5cdFx0XHQvLyBhbiBldmVudCB0byB0aGUgZ2l2ZW4gc2VsZWN0b3JzIGFuZCBkZWxpdmVyIHRoZVxuXHRcdFx0Ly8gYXR0ckltYWdlcyBvYmplY3Rcblx0XHRcdGlmIChvcHRpb25zLmF0dHJpYnV0SW1hZ2VzU3dpcGVyICYmIGRhdGEuYXR0ckltYWdlcyAmJiBkYXRhLmF0dHJJbWFnZXMubGVuZ3RoKSB7XG5cdFx0XHRcdGRlbGV0ZSBkYXRhLmNvbnRlbnQuaW1hZ2VzO1xuXHRcdFx0XHQkKG9wdGlvbnMudHJpZ2dlckF0dHJJbWFnZXNUbylcblx0XHRcdFx0XHQudHJpZ2dlcihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuU0xJREVTX1VQREFURSgpLCB7YXR0cmlidXRlczogZGF0YS5hdHRySW1hZ2VzfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGUgbWVzc2FnZXMgZ2l2ZW4gaW5zaWRlIHRoZSBkYXRhLmNvbnRlbnQgb2JqZWN0XG5cdFx0XHQkLmVhY2goZGF0YS5jb250ZW50LCBmdW5jdGlvbihpLCB2KSB7XG5cdFx0XHRcdHZhciAkZWxlbWVudCA9ICRmb3JtLnBhcmVudCgpLmZpbmQob3B0aW9ucy5zZWxlY3Rvck1hcHBpbmdbdi5zZWxlY3Rvcl0pO1xuXG5cdFx0XHRcdGlmICgoIXNob3dOb0NvbWJpU2VsZWN0ZWRNZXNzc2FnZSB8fCB2LnZhbHVlID09PSAnJykgJiYgaSA9PT0gJ21lc3NhZ2VOb0NvbWJpU2VsZWN0ZWQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzd2l0Y2ggKHYudHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRcdFx0JGVsZW1lbnQuaHRtbCh2LnZhbHVlKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2F0dHJpYnV0ZSc6XG5cdFx0XHRcdFx0XHQkZWxlbWVudC5hdHRyKHYua2V5LCB2LnZhbHVlKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3JlcGxhY2UnOlxuXHRcdFx0XHRcdFx0aWYgKHYudmFsdWUpIHtcblx0XHRcdFx0XHRcdFx0JGVsZW1lbnQucmVwbGFjZVdpdGgodi52YWx1ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQkZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnaGlkZGVuJylcblx0XHRcdFx0XHRcdFx0XHQuZW1wdHkoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHQkZWxlbWVudC50ZXh0KHYudmFsdWUpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvLyBEaXMtIC8gRW5hYmxlIHRoZSBidXR0b25zXG5cdFx0XHRpZiAoZGlzYWJsZUJ1dHRvbnMpIHtcblx0XHRcdFx0dmFyICRidXR0b25zID0gJGZvcm0uZmluZChvcHRpb25zLmNhcnRCdXR0b25zKTtcblx0XHRcdFx0aWYgKGRhdGEuc3VjY2Vzcykge1xuXHRcdFx0XHRcdCRidXR0b25zLnJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuXHRcdFx0XHRcdCRidXR0b25zLnJlbW92ZUNsYXNzKCdidG4taW5hY3RpdmUnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkYnV0dG9ucy5hZGRDbGFzcygnaW5hY3RpdmUnKTtcblx0XHRcdFx0XHQkYnV0dG9ucy5hZGRDbGFzcygnYnRuLWluYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGRhdGEuY29udGVudC5tZXNzYWdlKSB7XG5cdFx0XHRcdHZhciAkZXJyb3JGaWVsZCA9ICRmb3JtLmZpbmQob3B0aW9ucy5zZWxlY3Rvck1hcHBpbmdbZGF0YS5jb250ZW50Lm1lc3NhZ2Uuc2VsZWN0b3JdKTtcblx0XHRcdFx0aWYgKGRhdGEuY29udGVudC5tZXNzYWdlLnZhbHVlKSB7XG5cdFx0XHRcdFx0JGVycm9yRmllbGRcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGlkZGVuJylcblx0XHRcdFx0XHRcdC5zaG93KCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGVycm9yRmllbGRcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnaGlkZGVuJylcblx0XHRcdFx0XHRcdC5oaWRlKCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKHNob3dOb0NvbWJpU2VsZWN0ZWRNZXNzc2FnZVxuXHRcdFx0XHRcdFx0JiYgZGF0YS5jb250ZW50Lm1lc3NhZ2VOb0NvbWJpU2VsZWN0ZWQgIT09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0JiYgZGF0YS5jb250ZW50Lm1lc3NhZ2VOb0NvbWJpU2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdGlmIChkYXRhLmNvbnRlbnQubWVzc2FnZU5vQ29tYmlTZWxlY3RlZC52YWx1ZSkge1xuXHRcdFx0XHRcdFx0XHQkZXJyb3JGaWVsZFxuXHRcdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGlkZGVuJylcblx0XHRcdFx0XHRcdFx0XHQuc2hvdygpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0JGVycm9yRmllbGRcblx0XHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2hpZGRlbicpXG5cdFx0XHRcdFx0XHRcdFx0LmhpZGUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0JHdpbmRvdy50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5TVElDS1lCT1hfQ09OVEVOVF9DSEFOR0UoKSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0byBzZW5kIHRoZSBhamF4XG5cdFx0ICogT24gc3VjY2VzcyByZWRpcmVjdCB0byBhIGdpdmVuIHVybCwgb3BlbiBhIGxheWVyIHdpdGhcblx0XHQgKiBhIG1lc3NhZ2Ugb3IgYWRkIHRoZSBpdGVtIHRvIHRoZSBjYXJ0LWRyb3Bkb3duIGRpcmVjdGx5XG5cdFx0ICogKGJ5IHRyaWdnZXJpbmcgYW4gZXZlbnQgdG8gdGhlIGJvZHkpXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgICAgZGF0YSAgICAgIEZvcm0gZGF0YVxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICAgICRmb3JtICAgICBUaGUgZm9ybSB0byBmaWxsXG5cdFx0ICogQHBhcmFtICAgICAgIHtzdHJpbmd9ICAgICAgdXJsICAgICAgIFRoZSBVUkwgZm9yIHRoZSBBSkFYIHJlcXVlc3Rcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfYWRkVG9Tb21ld2hlcmUgPSBmdW5jdGlvbihkYXRhLCAkZm9ybSwgdXJsLCAkYnV0dG9uKSB7XG5cdFx0XHRmdW5jdGlvbiBjYWxsYmFjaygpIHtcbiAgICAgICAgICAgICAgICBqc2UubGlicy54aHIucG9zdCh7dXJsOiB1cmwsIGRhdGE6IGRhdGF9LCB0cnVlKS5kb25lKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlsbCB0aGUgcGFnZSB3aXRoIHRoZSByZXN1bHQgZnJvbSB0aGUgYWpheFxuICAgICAgICAgICAgICAgICAgICAgICAgX3N0YXRlTWFuYWdlcihyZXN1bHQsICRmb3JtLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBBSkFYIHdhcyBzdWNjZXNzZnVsIGV4ZWN1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgY3VzdG9tIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndXJsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudXJsLnN1YnN0cigwLCA0KSAhPT0gJ2h0dHAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGpzZS5jb3JlLmNvbmZpZy5nZXQoJ2FwcFVybCcpICsgJy8nICsgcmVzdWx0LnVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHJlc3VsdC51cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkcm9wZG93bic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYm9keS50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5DQVJUX1VQREFURSgpLCBbdHJ1ZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xheWVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzZS5saWJzLnRlbXBsYXRlLm1vZGFsLmluZm8oe3RpdGxlOiByZXN1bHQudGl0bGUsIGNvbnRlbnQ6IHJlc3VsdC5tc2d9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYWRkQnV0dG9uU3RhdGUoJGJ1dHRvbiwgJy1zdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX2FkZEJ1dHRvblN0YXRlKCRidXR0b24sICctZmFpbCcpO1xuICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGJ1c3kgZmxhZyB0byBiZSBhYmxlIHRvIHBlcmZvcm1cbiAgICAgICAgICAgICAgICAgICAgLy8gZnVydGhlciBBSkFYIHJlcXVlc3RzXG4gICAgICAgICAgICAgICAgICAgIGJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuXHRcdFx0aWYgKCFidXN5KSB7XG5cdFx0XHRcdC8vIG9ubHkgZXhlY3V0ZSB0aGUgYWpheFxuXHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBubyBwZW5kaW5nIGFqYXggY2FsbFxuXHRcdFx0XHRidXN5ID0gdHJ1ZTtcblxuXHRcdFx0XHRqc2UubGlicy5ob29rcy5leGVjdXRlKGpzZS5saWJzLmhvb2tzLmtleXMuc2hvcC5jYXJ0LmFkZCwgZGF0YSwgNTAwKVxuXHRcdFx0XHRcdC50aGVuKGNhbGxiYWNrKVxuXHRcdFx0XHRcdC5jYXRjaChjYWxsYmFjayk7XG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cbi8vICMjIyMjIyMjIyMgRVZFTlQgSEFORExFUiAjIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBIYW5kbGVyIGZvciB0aGUgc3VibWl0IGZvcm0gLyBjbGlja1xuXHRcdCAqIG9uIFwiYWRkIHRvIGNhcnRcIiAmIFwid2lzaGxpc3RcIiBidXR0b24uXG5cdFx0ICogSXQgcGVyZm9ybXMgYSBjaGVjayBvbiB0aGUgYXZhaWxhYmlsaXR5XG5cdFx0ICogb2YgdGhlIGNvbWJpbmF0aW9uIGFuZCBxdWFudGl0eS4gSWZcblx0XHQgKiBzdWNjZXNzZnVsIGl0IHBlcmZvcm1zIHRoZSBhZGQgdG8gY2FydFxuXHRcdCAqIG9yIHdpc2hsaXN0IGFjdGlvbiwgaWYgaXQncyBub3QgYVxuXHRcdCAqIFwiY2hlY2tcIiBjYWxsXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgIGUgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3N1Ym1pdEhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRpZiAoZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdCRmb3JtID0gKCRzZWxmLmlzKCdmb3JtJykpID8gJHNlbGYgOiAkc2VsZi5jbG9zZXN0KCdmb3JtJyksXG5cdFx0XHRcdGN1c3RvbWl6ZXIgPSAkZm9ybS5oYXNDbGFzcygnY3VzdG9taXplcicpLFxuXHRcdFx0XHRwcm9wZXJ0aWVzID0gISEkZm9ybS5maW5kKCcucHJvcGVydGllcy1zZWxlY3Rpb24tZm9ybScpLmxlbmd0aCxcblx0XHRcdFx0bW9kdWxlID0gcHJvcGVydGllcyA/ICcnIDogJy9BdHRyaWJ1dGVzJyxcblx0XHRcdFx0c2hvd05vQ29tYmlTZWxlY3RlZE1lc3NzYWdlID0gZSAmJiBlLmRhdGEgJiYgZS5kYXRhLnRhcmdldCAmJiBlLmRhdGEudGFyZ2V0ICE9PSAnY2hlY2snO1xuXG5cdFx0XHRpZiAoJGZvcm0ubGVuZ3RoKSB7XG5cblx0XHRcdFx0Ly8gU2hvdyBwcm9wZXJ0aWVzIG92ZXJsYXlcblx0XHRcdFx0Ly8gdG8gZGlzYWJsZSB1c2VyIGludGVyYWN0aW9uXG5cdFx0XHRcdC8vIGJlZm9yZSBtYXJrdXAgcmVwbGFjZVxuXHRcdFx0XHRpZiAocHJvcGVydGllcykge1xuXHRcdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZm9ybWRhdGEgPSBqc2UubGlicy5mb3JtLmdldERhdGEoJGZvcm0sIG51bGwsIHRydWUpO1xuXHRcdFx0XHRmb3JtZGF0YS50YXJnZXQgPSAoZSAmJiBlLmRhdGEgJiYgZS5kYXRhLnRhcmdldCkgPyBlLmRhdGEudGFyZ2V0IDogJ2NoZWNrJztcblx0XHRcdFx0Zm9ybWRhdGEuaXNQcm9kdWN0SW5mbyA9ICRmb3JtLmhhc0NsYXNzKCdwcm9kdWN0LWluZm8nKSA/IDEgOiAwO1xuXG5cdFx0XHRcdC8vIEFib3J0IHByZXZpb3VzIGNoZWNrIGFqYXggaWZcblx0XHRcdFx0Ly8gdGhlcmUgaXMgb25lIGluIHByb2dyZXNzXG5cdFx0XHRcdGlmIChhamF4ICYmIGUpIHtcblx0XHRcdFx0XHRhamF4LmFib3J0KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGQgcHJvY2Vzc2luZy1jbGFzcyB0byB0aGUgYnV0dG9uXG5cdFx0XHRcdC8vIGFuZCByZW1vdmUgb2xkIHRpbWVkIGV2ZW50c1xuXHRcdFx0XHRpZiAoZm9ybWRhdGEudGFyZ2V0ICE9PSAnY2hlY2snKSB7XG5cdFx0XHRcdFx0dmFyIHRpbWVyID0gJHNlbGYuZGF0YSgndGltZXInKTtcblx0XHRcdFx0XHRpZiAodGltZXIpIHtcblx0XHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0JHNlbGZcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcyhvcHRpb25zLnByb2Nlc3NpbmdDbGFzcyArICctc3VjY2VzcyAnICsgb3B0aW9ucy5wcm9jZXNzaW5nQ2xhc3MgKyAnLWZhaWwnKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKG9wdGlvbnMucHJvY2Vzc2luZ0NsYXNzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFqYXggPSBqc2UubGlicy54aHIuZ2V0KHtcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IG9wdGlvbnMuY2hlY2tVcmwgKyBtb2R1bGUsXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZm9ybWRhdGFcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSkuZG9uZShmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0XHRfc3RhdGVNYW5hZ2VyKHJlc3VsdCwgJGZvcm0sIHRydWUsIHNob3dOb0NvbWJpU2VsZWN0ZWRNZXNzc2FnZSk7XG5cdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblxuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0dmFyIGV2ZW50ID0gbnVsbCxcblx0XHRcdFx0XHRcdFx0dXJsID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0c3dpdGNoIChmb3JtZGF0YS50YXJnZXQpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAnd2lzaGxpc3QnOlxuXHRcdFx0XHRcdFx0XHRcdGlmIChjdXN0b21pemVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRldmVudCA9IGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5BRERfQ1VTVE9NSVpFUl9XSVNITElTVCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR1cmwgPSBvcHRpb25zLndpc2hsaXN0VXJsO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdjYXJ0Jzpcblx0XHRcdFx0XHRcdFx0XHRpZiAoY3VzdG9taXplcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQgPSBqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuQUREX0NVU1RPTUlaRVJfQ0FSVCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dXJsID0gb3B0aW9ucy5hZGRDYXJ0Q3VzdG9taXplclVybDtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0dXJsID0gb3B0aW9ucy5hZGRDYXJ0VXJsO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJpY2Vfb2ZmZXInOlxuXHRcdFx0XHRcdFx0XHRcdCRmb3JtLmF0dHIoJ2FjdGlvbicsIG9wdGlvbnMucHJpY2VPZmZlclVybCkuYXR0cignbWV0aG9kJywgb3B0aW9ucy5wcmljZU9mZmVyTWV0aG9kKTtcblx0XHRcdFx0XHRcdFx0XHQkZm9ybS5vZmYoJ3N1Ym1pdCcpO1xuXHRcdFx0XHRcdFx0XHRcdCRmb3JtLnN1Ym1pdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0JHdpbmRvdy50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5TVElDS1lCT1hfQ09OVEVOVF9DSEFOR0UoKSk7XG5cdFx0XHRcdFx0XHRcdFx0fSwgMjUwKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQuZG9uZShmdW5jdGlvbihjdXN0b21pemVyUmFuZG9tKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWRhdGFbY3VzdG9taXplclJhbmRvbV0gPSAwO1xuXHRcdFx0XHRcdFx0XHRcdF9hZGRUb1NvbWV3aGVyZShmb3JtZGF0YSwgJGZvcm0sIHVybCwgJHNlbGYpO1xuXHRcdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdF9hZGRCdXR0b25TdGF0ZSgkc2VsZiwgJy1mYWlsJyk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHQkYm9keS50cmlnZ2VyKGV2ZW50LCBbeydkZWZlcnJlZCc6IGRlZmVycmVkLCAnZGF0YXNldCc6IGZvcm1kYXRhfV0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh1cmwpIHtcblx0XHRcdFx0XHRcdFx0X2FkZFRvU29tZXdoZXJlKGZvcm1kYXRhLCAkZm9ybSwgdXJsLCAkc2VsZik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0X2FkZEJ1dHRvblN0YXRlKCRzZWxmLCAnLWZhaWwnKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRcblx0XHQvKipcblx0XHQgKiBLZXl1cCBoYW5kbGVyIGZvciBxdWFudGl0eSBpbnB1dCBmaWVsZFxuXHRcdCAqIFxuXHRcdCAqIEBwYXJhbSBlXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2tleXVwSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFxuXHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdF9zdWJtaXRIYW5kbGVyLmNhbGwodGhpcywgZSlcblx0XHRcdH0uYmluZCh0aGlzKSwgMzAwKTtcblx0XHR9O1xuXG5cbi8vICMjIyMjIyMjIyMgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXG5cdFx0LyoqXG5cdFx0ICogSW5pdCBmdW5jdGlvbiBvZiB0aGUgd2lkZ2V0XG5cdFx0ICogQGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0bW9kdWxlLmluaXQgPSBmdW5jdGlvbihkb25lKSB7XG5cblx0XHRcdHZhciAkZm9ybXMgPSAkdGhpcy5maW5kKCdmb3JtJyk7XG5cblx0XHRcdCRmb3Jtc1xuXHRcdFx0XHQub24oJ3N1Ym1pdCcsIHsndGFyZ2V0JzogJ2NhcnQnfSwgX3N1Ym1pdEhhbmRsZXIpXG5cdFx0XHRcdC5vbignY2xpY2snLCBvcHRpb25zLndpc2hsaXN0QnV0dG9ucywgeyd0YXJnZXQnOiAnd2lzaGxpc3QnfSwgX3N1Ym1pdEhhbmRsZXIpXG5cdFx0XHRcdC5vbignY2xpY2snLCBvcHRpb25zLnByaWNlT2ZmZXJCdXR0b25zLCB7J3RhcmdldCc6ICdwcmljZV9vZmZlcid9LCBfc3VibWl0SGFuZGxlcilcblx0XHRcdFx0Lm9uKCdjaGFuZ2UnLCBvcHRpb25zLmF0dHJpYnV0ZXMsIHsndGFyZ2V0JzogJ2NoZWNrJ30sIF9zdWJtaXRIYW5kbGVyKVxuXHRcdFx0XHQub24oJ2JsdXInLCBvcHRpb25zLnF1YW50aXR5LCB7J3RhcmdldCc6ICdjaGVjayd9LCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0X3N1Ym1pdEhhbmRsZXIoZSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbigna2V5dXAnLCBvcHRpb25zLnF1YW50aXR5LCB7J3RhcmdldCc6ICdjaGVjayd9LCBfa2V5dXBIYW5kbGVyKTtcblxuXHRcdFx0Ly8gRmFsbGJhY2sgaWYgdGhlIGJhY2tlbmQgcmVuZGVycyBpbmNvcnJlY3QgZGF0YVxuXHRcdFx0Ly8gb24gaW5pdGlhbCBwYWdlIGNhbGxcblx0XHRcdCRmb3Jtcy5ub3QoJy5uby1zdGF0dXMtY2hlY2snKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfc3VibWl0SGFuZGxlci5jYWxsKCQodGhpcykpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdGRvbmUoKTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJuIGRhdGEgdG8gd2lkZ2V0IGVuZ2luZVxuXHRcdHJldHVybiBtb2R1bGU7XG5cdH0pO1xuIl19
