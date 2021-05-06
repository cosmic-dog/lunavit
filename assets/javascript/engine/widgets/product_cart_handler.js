'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* --------------------------------------------------------------
 product_cart_handler.js 2018-03-09
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2016 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/**
 * Component that includes the functionality for
 * the add-to-cart, refresh and delete buttons
 * on the wishlist and cart
 */
gambio.widgets.module('product_cart_handler', ['form', 'xhr', gambio.source + '/libs/events', gambio.source + '/libs/modal.ext-magnific', gambio.source + '/libs/modal'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $window = $(window),
	    $body = $('body'),
	    $form = null,
	    $updateTarget = null,
	    $deleteField = null,
	    $cartEmpty = null,
	    $cartNotEmpty = null,
	    deleteFieldName = null,
	    action = null,
	    busy = null,
	    updateList = false,
	    transition = null,
	    active = {},
	    isChanged = false,
	    defaults = {
		// Use an AJAX to update the form
		ajax: true,
		// Show an confirm-layer on deletion of an item
		confirmDelete: false,
		// Selector of the hidden field for the deletion entries
		deleteInput: '#field_cart_delete_products_id',
		// Trigger an event to that item on an successfull ajax (e.g. the shipping costs element)
		updateTarget: '.shipping-calculation',
		// The URL for the quantity check of the item
		checkUrl: 'shop.php?do=CheckQuantity',
		// If an URL is set, this one will be requests for status updates on tab focus
		updateUrl: 'shop.php?do=Cart',

		changeClass: 'has-changed', // Class that gets added if an input has changed
		errorClass: 'error', // Class that gets added to the row if an error has occured
		cartEmpty: '.cart-empty', // Show this selection if the cart is empty or hide it else
		cartNotEmpty: '.cart-not-empty', // Show this selection if the cart is not empty or hide it else
		classLoading: 'loading', // The class that gets added to an currently updating row
		actions: { // The actions that getting appended to the submit url on the different type of updates
			add: 'wishlist_to_cart',
			delete: 'update_product',
			refresh: 'update_wishlist'
		},
		ajaxActions: { // URLs for the ajax updates on the different actions
			add: 'shop.php?do=WishList/AddToCart',
			delete: 'shop.php?do=Cart/Delete',
			refresh: 'shop.php?do=Cart/Update'
		},
		selectorMapping: {
			buttons: '.shopping-cart-button',
			giftContent: '.gift-cart-content-wrapper',
			giftLayer: '.gift-cart-layer',
			shareContent: '.share-cart-content-wrapper',
			shareLayer: '.share-cart-layer',
			hiddenOptions: '#cart_quantity .hidden-options',
			message: '.global-error-messages',
			infoMessage: '.info-message',
			shippingInformation: '#shipping-information-layer',
			totals: '#cart_quantity .total-box',
			errorMsg: '.error-msg',
			submit: '.button-submit'
		}
	},
	    options = $.extend(false, {}, defaults, data),
	    module = {};

	// ########## HELPER FUNCTIONS ##########

	/**
  * Updates the form action to the type given
  * in the options.actions object
  * @param       {string}        type        The action name
  * @private
  */
	var _setAction = function _setAction(type) {
		if (options.ajax) {
			action = options.ajaxActions[type];
		} else if (options.actions && options.actions[type]) {
			action = action.replace(/(action=)[^\&]+/, '$1' + options.actions[type]);
			$form.attr('action', action);
		}
	};

	/**
  * Helper function that updates the
  * hidden data attributes with the current
  * values of the input fields
  * @param       {object}        $target     jQuery selection of the topmost container
  * @private
  */
	var _updateDataValues = function _updateDataValues($target) {
		$target.find('input[type="text"]').each(function () {
			var $self = $(this),
			    value = $self.val();

			$self.data('oldValue', value);
		});
	};

	/**
  * Helper function that restores the values
  * stored by the _updateDataValues function
  * @param       {object}        dataset     The data object of all targets that needs to be reset
  * @private
  */
	var _restoreDataValues = function _restoreDataValues(dataset) {
		// Reset each changed field given
		// by the dataset target
		$.each(dataset, function () {
			var value = this;

			value.target.find('.' + options.changeClass).each(function () {
				var $self = $(this),
				    name = $self.attr('name').replace('[]', ''),
				    val = $self.data().oldValue;

				value[name][0] = val;
				$self.val(val).removeClass(options.changeClass);
			});
		});
	};

	/**
  * Helper function that generates an array of  datasets from the form. Each array item
  * contains the data of one row (inclusive the attributes data from the form head belonging
  * to the row). Additionally it adds the target-parameter to each dataset which contains
  * the selection of the row,the current dataset belongs to.
  *
  * @param {object} $row The optional row selection the data gets from. If no selection is given, the form
  * gets selected.
  * @return {Array} The array with the datasets of each row
  *
  * @private
  */
	var _generateFormdataObject = function _generateFormdataObject($row) {
		var $target = $row && $row.length ? $row : $form,
		    $rows = $row && $row.length ? $row : $form.find('.order-wishlist .item:gt(0)'),
		    $hiddens = $form.find('.hidden-options input[type="hidden"]'),
		    dataset = jse.libs.form.getData($target),
		    result = [],
		    tmpResult = null;

		$.each(dataset.products_id, function (i, v) {
			tmpResult = {};
			tmpResult.target = $rows.eq(i);

			// Store the data from the current row as a json
			$.each(dataset, function (key, value) {
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value[i] !== undefined) {
					// Store the value as an array to be compliant with the old API
					tmpResult[key] = [value[i]];
				}
			});

			// Get the hidden fields for the attributes
			// belonging to this row from the form head
			$hiddens.filter('[name^="id[' + v + '"], .force').each(function () {
				var $self = $(this),
				    name = $self.attr('name');

				tmpResult[name] = $self.val();
			});

			// Push the generated json to the final result array
			result.push(tmpResult);
		});

		return result;
	};

	/**
  * Function that checks the form / the row if the combination
  * and quantity is valid. It returns an promise which gets rejected
  * if in the scope was an invalid value. In other cases it gets
  * resolved. If it is detecting changes inside the form it can
  * show an info layer to the user and / or revert the changes
  * (depending on the caller parameters)
  * @param       {boolean}       showChanges         Show an info-layer if changes would be refused
  * @param       {boolean}       revertChanges       Resets the form values with the one from the data attributes if true
  * @param       {object}        formdata            Json that contains the data to check
  * @return     {*}                                 Returns a promise
  * @private
  */
	var _checkForm = function _checkForm(showChanges, revertChanges, formdata) {

		var promises = [],
		    hasChanged = false;

		// Get the complete form data if no row data is given
		formdata = formdata || _generateFormdataObject();

		// Check the formdata for changed values
		$.each(formdata, function () {
			var $changed = this.target.find('.' + options.changeClass);
			hasChanged = hasChanged || !!$changed.length;
			return !hasChanged;
		});

		return $.when.apply(undefined, promises).promise();
	};

	/**
  * Helper function that cleans up the process state
  * (Needed especially after ajax requests, to be able
  * to make further requests)
  * @param       {string}        id              The product id that needs to be reseted
  * @return     {Array.<T>}                     Returns an array without empty fields
  * @private
  */
	var _cleanupArray = function _cleanupArray(id, $row) {
		delete active['product_' + id];
		$row.removeClass('loading');
		return active;
	};

	/**
  * Helper function that does the general form update
  * after an ajax request
  * @param       {object}    $target         The jQuery selection of the target elements.
  * @param       {object}    result          The result of the ajax request.
  * @param       {string}    type            The executed action type.
  * @private
  */
	var _updateForm = function _updateForm($target, result, type) {
		// Update the rest of the page
		jse.libs.template.helpers.fill(result.content, $body, options.selectorMapping);

		// Toggle info-messages visibility.
		$('.info-message').toggleClass('hidden', $('.info-message').text() === '');

		// Inform other widgets about the update
		$updateTarget.trigger(jse.libs.template.events.CART_UPDATED(), []);
		$body.trigger(jse.libs.template.events.CART_UPDATE(), type === 'add');

		// Update the hidden data attributes of that row
		_updateDataValues($target);

		if ($.isEmptyObject(result.products)) {
			// Hide the table if no products are at the list
			$cartNotEmpty.addClass('hidden');
			$cartEmpty.removeClass('hidden');
		} else {
			// Show the table if there are products at it
			$cartEmpty.addClass('hidden');
			$cartNotEmpty.removeClass('hidden');
		}

		// reinitialize widgets in updated DOM
		window.gambio.widgets.init($this);
	};

	/**
  * Helper function that processes the list updates.
  * Therefor it calls AJAX-requests (in case ajax is
  * enabled) to the server to get the updated information
  * about the table state. If ajax isn't enabled, it simply
  * submits the form.
  * @param       {object}        $target            The jQuery selection of the row that gets updated
  * @param       {object}        dataset            The data collected from the target row in JSON format
  * @param       {article}       article            The products id of the article in that row
  * @param       {article}       type               The operation type can either be "add", "delete" or "refresh".
  * @private
  */
	var _executeAction = function _executeAction($row, $target, dataset, article, type) {
		if (options.ajax) {
			// Delete the target element because ajax requests
			// will fail with a jQuery selection in the data json
			delete dataset.target;

			$row.trigger(jse.libs.template.events.TRANSITION(), transition);

			// Perform an ajax if the data is valid and the options for ajax is set
			jse.libs.xhr.ajax({ url: action, data: dataset }, true).done(function (result) {
				// Perform hooks
				jse.libs.hooks.execute(jse.libs.hooks.keys.shop.cart.change, {
					$target: $target,
					dataset: dataset,
					article: article,
					type: type,
					result: result
				}, 500);

				// Update the product row
				var $markup = $(result.products['product_' + article] || '');
				$markup.removeClass(options.classLoading);
				$target.replaceWith($markup);
				_updateForm($target, result, type);

				var productNumber = article.match(/\d+/)[0];

				// Find all items with the same product number
				var $items = $('input[value^="' + productNumber + '"]').parent('td');

				// Apply the new markup foreach item which has the same product number.
				$items.each(function () {
					if (!$(this).find('input[value="' + article + '"]').length) {
						var number = $(this).find('input[id="products_id[]"]').attr('value');
						$markup = $(result.products['product_' + number] || '');
						$target = $(this).parent('tr');
						$target.replaceWith($markup);
					}
				});
			}).always(function () {
				_cleanupArray(article, $row);
			});
		} else {
			// Cleanup the active array on fail / success
			// of the following submit. This is a fallback
			// if an other component would prevent the submit
			// in some cases, so that this script can perform
			// actions again
			var deferred = $.Deferred();
			deferred.always(function () {
				_cleanupArray(article, $row);
			});

			// Submit the form
			$form.trigger('submit', deferred);
		}
	};

	// ########## EVENT HANDLER ##########

	/**
  * Adds an class to the changed input
  * field, so that it's styling shows
  * that it wasn't refreshed till now
  * @private
  */
	var _inputHandler = function _inputHandler() {
		var $self = $(this),
		    value = $self.val(),
		    oldValue = $self.data().oldValue,
		    hasNewValue = value !== oldValue;

		if (hasNewValue) {
			isChanged = hasNewValue;
			$self.addClass(options.changeClass);
		} else {
			$self.removeClass(options.changeClass);
		}

		_updateChangeState();
	};

	/**
  * Handle the blur event
  * @private
  */
	var _blurHandler = function _blurHandler() {
		var $self = $(this),
		    value = $self.val(),
		    oldValue = $self.data().oldValue,
		    hasNewValue = value !== oldValue;

		if (hasNewValue) {
			$self.closest('.item').find('.button-refresh').first().trigger('click');
		}
	};

	/**
  * Handler that listens on click events on the
  * buttons "refresh", "delete" & "add to cart".
  * It validates the form / row and passes the
  * the data to an submit execute funciton if valid
  * @param       {object}    e       jQuery event object
  * @private
  */
	var _clickHandler = function _clickHandler(e) {
		e.preventDefault();
		e.stopPropagation();

		var $self = $(this),
		    $row = $self.closest('.item'),
		    type = e.data.type,
		    rowdata = _generateFormdataObject($row)[0],
		    article = rowdata.products_id[0],
		    $target = rowdata.target,
		    title = $target.find('.product-title').text();

		// Add loading class
		$row.addClass('loading');

		// Check if there is no current process for this article
		// or in case it's no ajax call there is NO other process
		if ($.isEmptyObject(active) || options.ajax && !active['product_' + article]) {
			active['product_' + article] = true;
			_setAction(type);

			switch (type) {
				case 'delete':
					// Update the form and the dataset with
					// the article id to delete
					$deleteField.val(article);
					rowdata[deleteFieldName] = [article];

					if (options.confirmDelete) {
						// Open a modal layer to confirm the deletion
						var modalTitle = jse.core.lang.translate('CART_WISHLIST_DELETE_TITLE', 'general'),
						    modalMessage = jse.core.lang.translate('CART_WISHLIST_DELETE', 'general');

						jse.libs.template.modal.confirm({
							content: modalMessage,
							title: modalTitle
						}).done(function () {
							var deferred = $.Deferred();

							deferred.done(function () {
								_executeAction($row, $target, rowdata, article, type);
							});

							$body.trigger(jse.libs.template.events.WISHLIST_CART_DELETE(), [{
								'deferred': deferred,
								'dataset': rowdata
							}]);
						}).fail(function () {
							_cleanupArray(article, $row);
						});
					} else {
						var deferred = $.Deferred();

						deferred.done(function () {
							_executeAction($row, $target, rowdata, article, type);
						});

						$body.trigger(jse.libs.template.events.WISHLIST_CART_DELETE(), [{
							'deferred': deferred,
							'dataset': rowdata
						}]);
					}
					break;

				default:
					// In all other cases check if the form
					// has valid values and continue with the
					// done callback if valid
					_checkForm(false, false, [$.extend(true, {}, rowdata)]).done(function () {
						// Empty the delete hidden field in case it was set before
						$deleteField.val('');

						var event = null;

						if (type === 'add') {
							event = jse.libs.template.events.WISHLIST_TO_CART();
						}

						if (event) {
							var deferred = $.Deferred();

							deferred.done(function () {
								_executeAction($row, $target, rowdata, article, type);
							});

							$body.trigger(event, [{ 'deferred': deferred, 'dataset': rowdata }]);
						} else {
							_executeAction($row, $target, rowdata, article, type);
						}
					}).fail(function () {
						_cleanupArray(article, $row);
					});
					break;
			}
		}
	};

	/**
  * Prevent the submit event that was triggerd
  * by user or by script. If it was triggered
  * by the user, check if it was an "Enter"-key
  * submit from an input field. If so, execute
  * the refresh functionality for that row.
  * If the event was triggered by the script
  * (identified by the data flag "d") check the
  * whole form for errors. Only in case of valid
  * data proceed the submit
  * @param       {object}        e       jQuery event object
  * @param       {boolean}       d       A flag that identifies that the submit was triggered by this script
  * @private
  */
	var _submitHandler = function _submitHandler(e, d) {

		// Prevent the default behaviour
		// in both cases
		e.preventDefault();
		e.stopPropagation();

		if (!d && e.originalEvent) {

			// Check if an input field has triggerd the submit event
			// and call the refresh handler
			var $source = $(e.originalEvent.explicitOriginalTarget);
			if ($source.length && $source.is('input[type="text"]')) {
				$source.closest('.item').find('.button-refresh').first().trigger('click');
			}
		} else if (d) {

			// Check the whole form and only submit
			// it if it's valid
			_checkForm().done(function () {
				// Remove the submit event handler
				// on a successful validation and
				// trigger a submit again, so that the
				// browser executes it's default behavior
				$form.off('submit').trigger('submit');

				// Resolve the deferred if given
				if ((typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object') {
					d.resolve();
				}
			}).fail(function () {
				// Reject the deferred if given
				if ((typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object') {
					d.reject();
				}
			});
		}
	};

	/**
  * Event handler for clicking on the proceed
  * button to get to the checkout process. It
  * checks all items again if they contain valid
  * data. Only if so, proceed
  * @param       {object}        e       jQuery event object
  * @private
  */
	var _submitButtonHandler = function _submitButtonHandler(e) {
		e.preventDefault();
		e.stopPropagation();

		if (isChanged) {
			// Get the complete form data if no row data is given
			var formdata = _generateFormdataObject();

			// Check the formdata for changed values
			$.each(formdata, function () {
				var $changedInput = this.target.find('.' + options.changeClass);

				if ($changedInput) {
					$changedInput.closest('.item').find('.button-refresh').first().trigger('click');
				}
			});

			isChanged = false;
			_updateChangeState();
			return;
		}

		var $self = $(this),
		    destination = $self.attr('href');

		// Check if there is any other process running
		if ($.isEmptyObject(active) && !busy && !updateList) {
			busy = true;

			_checkForm(true, true).done(function () {
				function callback() {
					location.href = destination;
				}

				jse.libs.hooks.execute(jse.libs.hooks.keys.shop.cart.checkout, { event: e }, 500).then(callback).catch(callback);
			}).always(function () {
				busy = false;
			});
		}
	};

	/**
  * Event handler that checks the form and
  * resolves or rejects the delivered deferred
  * (Used for external payment modules to
  * check if the form is valid)
  * @param       {object}    e               jQuery event object
  * @param       {object}    d               JSON object with the event settings
  * @private
  */
	var _checkFormHandler = function _checkFormHandler(e, d) {
		e.stopPropagation();

		d = d || {};

		_checkForm(d.showChanges, d.revertChanges).done(function () {
			if (d.deferred) {
				d.deferred.resolve();
			}
		}).fail(function () {
			if (d.deferred) {
				d.deferred.reject();
			}
		});
	};

	/**
  * Function that updates the list on focus of
  * the window
  * @private
  */
	var _updateList = function _updateList() {
		updateList = true;
		jse.libs.xhr.ajax({ url: options.updateUrl }, true).done(function (result) {
			// Init with he first line since this ist the heading
			var $lastScanned = $form.find('.order-wishlist .item').first(),
			    $target = $();

			// Iterate through the products object and search for the
			// products inside the markup. If the product was found,
			// update the values, if not add the product row at the
			// correct position
			$.each(result.products, function (key, value) {
				var articleId = key.replace('product_', ''),
				    $article = $form.find('input[name="products_id[]"][value="' + articleId + '"]'),
				    $row = null;

				if (!$article.length) {
					// The article wasn't found on page
					// -> add it
					$row = $(value);
					$row.insertAfter($lastScanned);
				} else {
					// The article was found on page
					// -> update it
					$row = $article.closest('.item');

					var $qty = $row.find('input[name="cart_quantity[]"]'),
					    oldQty = parseFloat($qty.data().oldValue),
					    currentQty = parseFloat($qty.val()),
					    newQty = parseFloat($(value).find('input[name="cart_quantity[]"]').val());

					$qty.data('oldValue', newQty);

					// Add or remove the changed classes depending on
					// the quantity changes and the on page stored values
					if (oldQty === currentQty && currentQty !== newQty) {
						$qty.addClass(options.changeClass);
					} else if (oldQty !== currentQty && currentQty === newQty) {
						$qty.removeClass(options.changeClass);
					}
				}

				$target.add($row);
				$lastScanned = $row;
			});

			// Update the rest of the form
			_updateForm($target, result);
		}).always(function () {
			updateList = false;
		});
	};

	/**
 * Update the input change state
  * @private
  */
	var _updateChangeState = function _updateChangeState() {
		$form.find(options.selectorMapping.submit).text(jse.core.lang.translate(isChanged ? 'refresh' : 'checkout', 'buttons'));
	};

	// ########## INITIALIZATION ##########

	/**
  * Init function of the widget
  * @constructor
  */
	module.init = function (done) {

		$updateTarget = $(options.updateTarget);
		$cartEmpty = $(options.cartEmpty);
		$cartNotEmpty = $(options.cartNotEmpty);
		$deleteField = $(options.deleteInput);
		$form = $this.find('form').first();
		deleteFieldName = $deleteField.attr('name');
		action = $form.attr('action');
		transition = { open: true, classOpen: options.classLoading };

		// Sets the current value of the input
		// to an hidden data attribute
		_updateDataValues($form);

		$form.on('input', 'input[type="text"]', _inputHandler).on('blur', 'input[type="text"]', _blurHandler).on('click.delete', '.button-delete', { 'type': 'delete' }, _clickHandler).on('click.refresh', '.button-refresh', { 'type': 'refresh' }, _clickHandler).on('click.addtocart', '.button-to-cart', { 'type': 'add' }, _clickHandler).on('click.submit', '.button-submit', { 'type': 'submit' }, _submitButtonHandler).on('submit', _submitHandler).on(jse.libs.template.events.CHECK_CART(), _checkFormHandler);

		if (options.updateUrl) {
			$window.on('focus', _updateList);
		}

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvcHJvZHVjdF9jYXJ0X2hhbmRsZXIuanMiXSwibmFtZXMiOlsiZ2FtYmlvIiwid2lkZ2V0cyIsIm1vZHVsZSIsInNvdXJjZSIsImRhdGEiLCIkdGhpcyIsIiQiLCIkd2luZG93Iiwid2luZG93IiwiJGJvZHkiLCIkZm9ybSIsIiR1cGRhdGVUYXJnZXQiLCIkZGVsZXRlRmllbGQiLCIkY2FydEVtcHR5IiwiJGNhcnROb3RFbXB0eSIsImRlbGV0ZUZpZWxkTmFtZSIsImFjdGlvbiIsImJ1c3kiLCJ1cGRhdGVMaXN0IiwidHJhbnNpdGlvbiIsImFjdGl2ZSIsImlzQ2hhbmdlZCIsImRlZmF1bHRzIiwiYWpheCIsImNvbmZpcm1EZWxldGUiLCJkZWxldGVJbnB1dCIsInVwZGF0ZVRhcmdldCIsImNoZWNrVXJsIiwidXBkYXRlVXJsIiwiY2hhbmdlQ2xhc3MiLCJlcnJvckNsYXNzIiwiY2FydEVtcHR5IiwiY2FydE5vdEVtcHR5IiwiY2xhc3NMb2FkaW5nIiwiYWN0aW9ucyIsImFkZCIsImRlbGV0ZSIsInJlZnJlc2giLCJhamF4QWN0aW9ucyIsInNlbGVjdG9yTWFwcGluZyIsImJ1dHRvbnMiLCJnaWZ0Q29udGVudCIsImdpZnRMYXllciIsInNoYXJlQ29udGVudCIsInNoYXJlTGF5ZXIiLCJoaWRkZW5PcHRpb25zIiwibWVzc2FnZSIsImluZm9NZXNzYWdlIiwic2hpcHBpbmdJbmZvcm1hdGlvbiIsInRvdGFscyIsImVycm9yTXNnIiwic3VibWl0Iiwib3B0aW9ucyIsImV4dGVuZCIsIl9zZXRBY3Rpb24iLCJ0eXBlIiwicmVwbGFjZSIsImF0dHIiLCJfdXBkYXRlRGF0YVZhbHVlcyIsIiR0YXJnZXQiLCJmaW5kIiwiZWFjaCIsIiRzZWxmIiwidmFsdWUiLCJ2YWwiLCJfcmVzdG9yZURhdGFWYWx1ZXMiLCJkYXRhc2V0IiwidGFyZ2V0IiwibmFtZSIsIm9sZFZhbHVlIiwicmVtb3ZlQ2xhc3MiLCJfZ2VuZXJhdGVGb3JtZGF0YU9iamVjdCIsIiRyb3ciLCJsZW5ndGgiLCIkcm93cyIsIiRoaWRkZW5zIiwianNlIiwibGlicyIsImZvcm0iLCJnZXREYXRhIiwicmVzdWx0IiwidG1wUmVzdWx0IiwicHJvZHVjdHNfaWQiLCJpIiwidiIsImVxIiwia2V5IiwidW5kZWZpbmVkIiwiZmlsdGVyIiwicHVzaCIsIl9jaGVja0Zvcm0iLCJzaG93Q2hhbmdlcyIsInJldmVydENoYW5nZXMiLCJmb3JtZGF0YSIsInByb21pc2VzIiwiaGFzQ2hhbmdlZCIsIiRjaGFuZ2VkIiwid2hlbiIsImFwcGx5IiwicHJvbWlzZSIsIl9jbGVhbnVwQXJyYXkiLCJpZCIsIl91cGRhdGVGb3JtIiwidGVtcGxhdGUiLCJoZWxwZXJzIiwiZmlsbCIsImNvbnRlbnQiLCJ0b2dnbGVDbGFzcyIsInRleHQiLCJ0cmlnZ2VyIiwiZXZlbnRzIiwiQ0FSVF9VUERBVEVEIiwiQ0FSVF9VUERBVEUiLCJpc0VtcHR5T2JqZWN0IiwicHJvZHVjdHMiLCJhZGRDbGFzcyIsImluaXQiLCJfZXhlY3V0ZUFjdGlvbiIsImFydGljbGUiLCJUUkFOU0lUSU9OIiwieGhyIiwidXJsIiwiZG9uZSIsImhvb2tzIiwiZXhlY3V0ZSIsImtleXMiLCJzaG9wIiwiY2FydCIsImNoYW5nZSIsIiRtYXJrdXAiLCJyZXBsYWNlV2l0aCIsInByb2R1Y3ROdW1iZXIiLCJtYXRjaCIsIiRpdGVtcyIsInBhcmVudCIsIm51bWJlciIsImFsd2F5cyIsImRlZmVycmVkIiwiRGVmZXJyZWQiLCJfaW5wdXRIYW5kbGVyIiwiaGFzTmV3VmFsdWUiLCJfdXBkYXRlQ2hhbmdlU3RhdGUiLCJfYmx1ckhhbmRsZXIiLCJjbG9zZXN0IiwiZmlyc3QiLCJfY2xpY2tIYW5kbGVyIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicm93ZGF0YSIsInRpdGxlIiwibW9kYWxUaXRsZSIsImNvcmUiLCJsYW5nIiwidHJhbnNsYXRlIiwibW9kYWxNZXNzYWdlIiwibW9kYWwiLCJjb25maXJtIiwiV0lTSExJU1RfQ0FSVF9ERUxFVEUiLCJmYWlsIiwiZXZlbnQiLCJXSVNITElTVF9UT19DQVJUIiwiX3N1Ym1pdEhhbmRsZXIiLCJkIiwib3JpZ2luYWxFdmVudCIsIiRzb3VyY2UiLCJleHBsaWNpdE9yaWdpbmFsVGFyZ2V0IiwiaXMiLCJvZmYiLCJyZXNvbHZlIiwicmVqZWN0IiwiX3N1Ym1pdEJ1dHRvbkhhbmRsZXIiLCIkY2hhbmdlZElucHV0IiwiZGVzdGluYXRpb24iLCJjYWxsYmFjayIsImxvY2F0aW9uIiwiaHJlZiIsImNoZWNrb3V0IiwidGhlbiIsImNhdGNoIiwiX2NoZWNrRm9ybUhhbmRsZXIiLCJfdXBkYXRlTGlzdCIsIiRsYXN0U2Nhbm5lZCIsImFydGljbGVJZCIsIiRhcnRpY2xlIiwiaW5zZXJ0QWZ0ZXIiLCIkcXR5Iiwib2xkUXR5IiwicGFyc2VGbG9hdCIsImN1cnJlbnRRdHkiLCJuZXdRdHkiLCJvcGVuIiwiY2xhc3NPcGVuIiwib24iLCJDSEVDS19DQVJUIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7QUFLQUEsT0FBT0MsT0FBUCxDQUFlQyxNQUFmLENBQ0Msc0JBREQsRUFHQyxDQUNDLE1BREQsRUFFQyxLQUZELEVBR0NGLE9BQU9HLE1BQVAsR0FBZ0IsY0FIakIsRUFJQ0gsT0FBT0csTUFBUCxHQUFnQiwwQkFKakIsRUFLQ0gsT0FBT0csTUFBUCxHQUFnQixhQUxqQixDQUhELEVBV0MsVUFBU0MsSUFBVCxFQUFlOztBQUVkOztBQUVGOztBQUVFLEtBQUlDLFFBQVFDLEVBQUUsSUFBRixDQUFaO0FBQUEsS0FDQ0MsVUFBVUQsRUFBRUUsTUFBRixDQURYO0FBQUEsS0FFQ0MsUUFBUUgsRUFBRSxNQUFGLENBRlQ7QUFBQSxLQUdDSSxRQUFRLElBSFQ7QUFBQSxLQUlDQyxnQkFBZ0IsSUFKakI7QUFBQSxLQUtDQyxlQUFlLElBTGhCO0FBQUEsS0FNQ0MsYUFBYSxJQU5kO0FBQUEsS0FPQ0MsZ0JBQWdCLElBUGpCO0FBQUEsS0FRQ0Msa0JBQWtCLElBUm5CO0FBQUEsS0FT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LE9BREwsRUFDYyxvQkFEZCxFQUNvQ3RELGFBRHBDLEVBRWNzRCxFQUZkLENBRWlCLE1BRmpCLEVBRXlCLG9CQUZ6QixFQUUrQ25ELFlBRi9DLEVBR0VtRCxFQUhGLENBR0ssY0FITCxFQUdxQixnQkFIckIsRUFHdUMsRUFBQyxRQUFRLFFBQVQsRUFIdkMsRUFHMkRoRCxhQUgzRCxFQUlFZ0QsRUFKRixDQUlLLGVBSkwsRUFJc0IsaUJBSnRCLEVBSXlDLEVBQUMsUUFBUSxTQUFULEVBSnpDLEVBSThEaEQsYUFKOUQsRUFLRWdELEVBTEYsQ0FLSyxpQkFMTCxFQUt3QixpQkFMeEIsRUFLMkMsRUFBQyxRQUFRLEtBQVQsRUFMM0MsRUFLNERoRCxhQUw1RCxFQU1FZ0QsRUFORixDQU1LLGNBTkwsRUFNcUIsZ0JBTnJCLEVBTXVDLEVBQUMsUUFBUSxRQUFULEVBTnZDLEVBTTJEdEIsb0JBTjNELEVBT0VzQixFQVBGLENBT0ssUUFQTCxFQU9lL0IsY0FQZixFQVFFK0IsRUFSRixDQVFLckgsSUFBSUMsSUFBSixDQUFTMEIsUUFBVCxDQUFrQk8sTUFBbEIsQ0FBeUJvRixVQUF6QixFQVJMLEVBUTRDZCxpQkFSNUM7O0FBVUEsTUFBSWhJLFFBQVF4QixTQUFaLEVBQXVCO0FBQ3RCckIsV0FBUTBMLEVBQVIsQ0FBVyxPQUFYLEVBQW9CWixXQUFwQjtBQUNBOztBQUVEM0Q7QUFDQSxFQTlCRDs7QUFnQ0E7QUFDQSxRQUFPeEgsTUFBUDtBQUNBLENBOXVCRiIsImZpbGUiOiJ3aWRnZXRzL3Byb2R1Y3RfY2FydF9oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiBwcm9kdWN0X2NhcnRfaGFuZGxlci5qcyAyMDE4LTAzLTA5XG4gR2FtYmlvIEdtYkhcbiBodHRwOi8vd3d3LmdhbWJpby5kZVxuIENvcHlyaWdodCAoYykgMjAxNiBHYW1iaW8gR21iSFxuIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuIFtodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBpbmNsdWRlcyB0aGUgZnVuY3Rpb25hbGl0eSBmb3JcbiAqIHRoZSBhZGQtdG8tY2FydCwgcmVmcmVzaCBhbmQgZGVsZXRlIGJ1dHRvbnNcbiAqIG9uIHRoZSB3aXNobGlzdCBhbmQgY2FydFxuICovXG5nYW1iaW8ud2lkZ2V0cy5tb2R1bGUoXG5cdCdwcm9kdWN0X2NhcnRfaGFuZGxlcicsXG5cblx0W1xuXHRcdCdmb3JtJyxcblx0XHQneGhyJyxcblx0XHRnYW1iaW8uc291cmNlICsgJy9saWJzL2V2ZW50cycsXG5cdFx0Z2FtYmlvLnNvdXJjZSArICcvbGlicy9tb2RhbC5leHQtbWFnbmlmaWMnLFxuXHRcdGdhbWJpby5zb3VyY2UgKyAnL2xpYnMvbW9kYWwnXG5cdF0sXG5cblx0ZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0J3VzZSBzdHJpY3QnO1xuXG4vLyAjIyMjIyMjIyMjIFZBUklBQkxFIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHQkd2luZG93ID0gJCh3aW5kb3cpLFxuXHRcdFx0JGJvZHkgPSAkKCdib2R5JyksXG5cdFx0XHQkZm9ybSA9IG51bGwsXG5cdFx0XHQkdXBkYXRlVGFyZ2V0ID0gbnVsbCxcblx0XHRcdCRkZWxldGVGaWVsZCA9IG51bGwsXG5cdFx0XHQkY2FydEVtcHR5ID0gbnVsbCxcblx0XHRcdCRjYXJ0Tm90RW1wdHkgPSBudWxsLFxuXHRcdFx0ZGVsZXRlRmllbGROYW1lID0gbnVsbCxcblx0XHRcdGFjdGlvbiA9IG51bGwsXG5cdFx0XHRidXN5ID0gbnVsbCxcblx0XHRcdHVwZGF0ZUxpc3QgPSBmYWxzZSxcblx0XHRcdHRyYW5zaXRpb24gPSBudWxsLFxuXHRcdFx0YWN0aXZlID0ge30sXG5cdFx0XHRpc0NoYW5nZWQgPSBmYWxzZSxcblx0XHRcdGRlZmF1bHRzID0ge1xuXHRcdFx0XHQvLyBVc2UgYW4gQUpBWCB0byB1cGRhdGUgdGhlIGZvcm1cblx0XHRcdFx0YWpheDogdHJ1ZSxcblx0XHRcdFx0Ly8gU2hvdyBhbiBjb25maXJtLWxheWVyIG9uIGRlbGV0aW9uIG9mIGFuIGl0ZW1cblx0XHRcdFx0Y29uZmlybURlbGV0ZTogZmFsc2UsXG5cdFx0XHRcdC8vIFNlbGVjdG9yIG9mIHRoZSBoaWRkZW4gZmllbGQgZm9yIHRoZSBkZWxldGlvbiBlbnRyaWVzXG5cdFx0XHRcdGRlbGV0ZUlucHV0OiAnI2ZpZWxkX2NhcnRfZGVsZXRlX3Byb2R1Y3RzX2lkJyxcblx0XHRcdFx0Ly8gVHJpZ2dlciBhbiBldmVudCB0byB0aGF0IGl0ZW0gb24gYW4gc3VjY2Vzc2Z1bGwgYWpheCAoZS5nLiB0aGUgc2hpcHBpbmcgY29zdHMgZWxlbWVudClcblx0XHRcdFx0dXBkYXRlVGFyZ2V0OiAnLnNoaXBwaW5nLWNhbGN1bGF0aW9uJyxcblx0XHRcdFx0Ly8gVGhlIFVSTCBmb3IgdGhlIHF1YW50aXR5IGNoZWNrIG9mIHRoZSBpdGVtXG5cdFx0XHRcdGNoZWNrVXJsOiAnc2hvcC5waHA/ZG89Q2hlY2tRdWFudGl0eScsXG5cdFx0XHRcdC8vIElmIGFuIFVSTCBpcyBzZXQsIHRoaXMgb25lIHdpbGwgYmUgcmVxdWVzdHMgZm9yIHN0YXR1cyB1cGRhdGVzIG9uIHRhYiBmb2N1c1xuXHRcdFx0XHR1cGRhdGVVcmw6ICdzaG9wLnBocD9kbz1DYXJ0JyxcblxuXHRcdFx0XHRjaGFuZ2VDbGFzczogJ2hhcy1jaGFuZ2VkJywgLy8gQ2xhc3MgdGhhdCBnZXRzIGFkZGVkIGlmIGFuIGlucHV0IGhhcyBjaGFuZ2VkXG5cdFx0XHRcdGVycm9yQ2xhc3M6ICdlcnJvcicsIC8vIENsYXNzIHRoYXQgZ2V0cyBhZGRlZCB0byB0aGUgcm93IGlmIGFuIGVycm9yIGhhcyBvY2N1cmVkXG5cdFx0XHRcdGNhcnRFbXB0eTogJy5jYXJ0LWVtcHR5JywgLy8gU2hvdyB0aGlzIHNlbGVjdGlvbiBpZiB0aGUgY2FydCBpcyBlbXB0eSBvciBoaWRlIGl0IGVsc2Vcblx0XHRcdFx0Y2FydE5vdEVtcHR5OiAnLmNhcnQtbm90LWVtcHR5JywgLy8gU2hvdyB0aGlzIHNlbGVjdGlvbiBpZiB0aGUgY2FydCBpcyBub3QgZW1wdHkgb3IgaGlkZSBpdCBlbHNlXG5cdFx0XHRcdGNsYXNzTG9hZGluZzogJ2xvYWRpbmcnLCAvLyBUaGUgY2xhc3MgdGhhdCBnZXRzIGFkZGVkIHRvIGFuIGN1cnJlbnRseSB1cGRhdGluZyByb3dcblx0XHRcdFx0YWN0aW9uczogeyAvLyBUaGUgYWN0aW9ucyB0aGF0IGdldHRpbmcgYXBwZW5kZWQgdG8gdGhlIHN1Ym1pdCB1cmwgb24gdGhlIGRpZmZlcmVudCB0eXBlIG9mIHVwZGF0ZXNcblx0XHRcdFx0XHRhZGQ6ICd3aXNobGlzdF90b19jYXJ0Jyxcblx0XHRcdFx0XHRkZWxldGU6ICd1cGRhdGVfcHJvZHVjdCcsXG5cdFx0XHRcdFx0cmVmcmVzaDogJ3VwZGF0ZV93aXNobGlzdCdcblx0XHRcdFx0fSxcblx0XHRcdFx0YWpheEFjdGlvbnM6IHsgLy8gVVJMcyBmb3IgdGhlIGFqYXggdXBkYXRlcyBvbiB0aGUgZGlmZmVyZW50IGFjdGlvbnNcblx0XHRcdFx0XHRhZGQ6ICdzaG9wLnBocD9kbz1XaXNoTGlzdC9BZGRUb0NhcnQnLFxuXHRcdFx0XHRcdGRlbGV0ZTogJ3Nob3AucGhwP2RvPUNhcnQvRGVsZXRlJyxcblx0XHRcdFx0XHRyZWZyZXNoOiAnc2hvcC5waHA/ZG89Q2FydC9VcGRhdGUnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlbGVjdG9yTWFwcGluZzoge1xuXHRcdFx0XHRcdGJ1dHRvbnM6ICcuc2hvcHBpbmctY2FydC1idXR0b24nLFxuXHRcdFx0XHRcdGdpZnRDb250ZW50OiAnLmdpZnQtY2FydC1jb250ZW50LXdyYXBwZXInLFxuXHRcdFx0XHRcdGdpZnRMYXllcjogJy5naWZ0LWNhcnQtbGF5ZXInLFxuXHRcdFx0XHRcdHNoYXJlQ29udGVudDonLnNoYXJlLWNhcnQtY29udGVudC13cmFwcGVyJyxcblx0XHRcdFx0XHRzaGFyZUxheWVyOiAnLnNoYXJlLWNhcnQtbGF5ZXInLFxuXHRcdFx0XHRcdGhpZGRlbk9wdGlvbnM6ICcjY2FydF9xdWFudGl0eSAuaGlkZGVuLW9wdGlvbnMnLFxuXHRcdFx0XHRcdG1lc3NhZ2U6ICcuZ2xvYmFsLWVycm9yLW1lc3NhZ2VzJyxcblx0XHRcdFx0XHRpbmZvTWVzc2FnZTogJy5pbmZvLW1lc3NhZ2UnLFxuXHRcdFx0XHRcdHNoaXBwaW5nSW5mb3JtYXRpb246ICcjc2hpcHBpbmctaW5mb3JtYXRpb24tbGF5ZXInLFxuXHRcdFx0XHRcdHRvdGFsczogJyNjYXJ0X3F1YW50aXR5IC50b3RhbC1ib3gnLFxuXHRcdFx0XHRcdGVycm9yTXNnOiAnLmVycm9yLW1zZycsXG5cdFx0XHRcdFx0c3VibWl0OiAnLmJ1dHRvbi1zdWJtaXQnXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQoZmFsc2UsIHt9LCBkZWZhdWx0cywgZGF0YSksXG5cdFx0XHRtb2R1bGUgPSB7fTtcblxuLy8gIyMjIyMjIyMjIyBIRUxQRVIgRlVOQ1RJT05TICMjIyMjIyMjIyNcblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZXMgdGhlIGZvcm0gYWN0aW9uIHRvIHRoZSB0eXBlIGdpdmVuXG5cdFx0ICogaW4gdGhlIG9wdGlvbnMuYWN0aW9ucyBvYmplY3Rcblx0XHQgKiBAcGFyYW0gICAgICAge3N0cmluZ30gICAgICAgIHR5cGUgICAgICAgIFRoZSBhY3Rpb24gbmFtZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9zZXRBY3Rpb24gPSBmdW5jdGlvbih0eXBlKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5hamF4KSB7XG5cdFx0XHRcdGFjdGlvbiA9IG9wdGlvbnMuYWpheEFjdGlvbnNbdHlwZV07XG5cdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuYWN0aW9ucyAmJiBvcHRpb25zLmFjdGlvbnNbdHlwZV0pIHtcblx0XHRcdFx0YWN0aW9uID0gYWN0aW9uLnJlcGxhY2UoLyhhY3Rpb249KVteXFwmXSsvLCAnJDEnICsgb3B0aW9ucy5hY3Rpb25zW3R5cGVdKTtcblx0XHRcdFx0JGZvcm0uYXR0cignYWN0aW9uJywgYWN0aW9uKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyB0aGVcblx0XHQgKiBoaWRkZW4gZGF0YSBhdHRyaWJ1dGVzIHdpdGggdGhlIGN1cnJlbnRcblx0XHQgKiB2YWx1ZXMgb2YgdGhlIGlucHV0IGZpZWxkc1xuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICAgICAgJHRhcmdldCAgICAgalF1ZXJ5IHNlbGVjdGlvbiBvZiB0aGUgdG9wbW9zdCBjb250YWluZXJcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfdXBkYXRlRGF0YVZhbHVlcyA9IGZ1bmN0aW9uKCR0YXJnZXQpIHtcblx0XHRcdCR0YXJnZXRcblx0XHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcblx0XHRcdFx0LmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbHVlID0gJHNlbGYudmFsKCk7XG5cblx0XHRcdFx0XHQkc2VsZi5kYXRhKCdvbGRWYWx1ZScsIHZhbHVlKTtcblx0XHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJlc3RvcmVzIHRoZSB2YWx1ZXNcblx0XHQgKiBzdG9yZWQgYnkgdGhlIF91cGRhdGVEYXRhVmFsdWVzIGZ1bmN0aW9uXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgICAgICBkYXRhc2V0ICAgICBUaGUgZGF0YSBvYmplY3Qgb2YgYWxsIHRhcmdldHMgdGhhdCBuZWVkcyB0byBiZSByZXNldFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9yZXN0b3JlRGF0YVZhbHVlcyA9IGZ1bmN0aW9uKGRhdGFzZXQpIHtcblx0XHRcdC8vIFJlc2V0IGVhY2ggY2hhbmdlZCBmaWVsZCBnaXZlblxuXHRcdFx0Ly8gYnkgdGhlIGRhdGFzZXQgdGFyZ2V0XG5cdFx0XHQkLmVhY2goZGF0YXNldCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXM7XG5cblx0XHRcdFx0dmFsdWVcblx0XHRcdFx0XHQudGFyZ2V0XG5cdFx0XHRcdFx0LmZpbmQoJy4nICsgb3B0aW9ucy5jaGFuZ2VDbGFzcylcblx0XHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAkc2VsZi5hdHRyKCduYW1lJykucmVwbGFjZSgnW10nLCAnJyksXG5cdFx0XHRcdFx0XHRcdHZhbCA9ICRzZWxmLmRhdGEoKS5vbGRWYWx1ZTtcblxuXHRcdFx0XHRcdFx0dmFsdWVbbmFtZV1bMF0gPSB2YWw7XG5cdFx0XHRcdFx0XHQkc2VsZlxuXHRcdFx0XHRcdFx0XHQudmFsKHZhbClcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKG9wdGlvbnMuY2hhbmdlQ2xhc3MpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyBhbiBhcnJheSBvZiAgZGF0YXNldHMgZnJvbSB0aGUgZm9ybS4gRWFjaCBhcnJheSBpdGVtXG5cdFx0ICogY29udGFpbnMgdGhlIGRhdGEgb2Ygb25lIHJvdyAoaW5jbHVzaXZlIHRoZSBhdHRyaWJ1dGVzIGRhdGEgZnJvbSB0aGUgZm9ybSBoZWFkIGJlbG9uZ2luZ1xuXHRcdCAqIHRvIHRoZSByb3cpLiBBZGRpdGlvbmFsbHkgaXQgYWRkcyB0aGUgdGFyZ2V0LXBhcmFtZXRlciB0byBlYWNoIGRhdGFzZXQgd2hpY2ggY29udGFpbnNcblx0XHQgKiB0aGUgc2VsZWN0aW9uIG9mIHRoZSByb3csdGhlIGN1cnJlbnQgZGF0YXNldCBiZWxvbmdzIHRvLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtvYmplY3R9ICRyb3cgVGhlIG9wdGlvbmFsIHJvdyBzZWxlY3Rpb24gdGhlIGRhdGEgZ2V0cyBmcm9tLiBJZiBubyBzZWxlY3Rpb24gaXMgZ2l2ZW4sIHRoZSBmb3JtXG5cdFx0ICogZ2V0cyBzZWxlY3RlZC5cblx0XHQgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGFycmF5IHdpdGggdGhlIGRhdGFzZXRzIG9mIGVhY2ggcm93XG5cdFx0ICpcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfZ2VuZXJhdGVGb3JtZGF0YU9iamVjdCA9IGZ1bmN0aW9uKCRyb3cpIHtcblx0XHRcdHZhciAkdGFyZ2V0ID0gKCRyb3cgJiYgJHJvdy5sZW5ndGgpID8gJHJvdyA6ICRmb3JtLFxuXHRcdFx0XHQkcm93cyA9ICgkcm93ICYmICRyb3cubGVuZ3RoKSA/ICRyb3cgOiAkZm9ybS5maW5kKCcub3JkZXItd2lzaGxpc3QgLml0ZW06Z3QoMCknKSxcblx0XHRcdFx0JGhpZGRlbnMgPSAkZm9ybS5maW5kKCcuaGlkZGVuLW9wdGlvbnMgaW5wdXRbdHlwZT1cImhpZGRlblwiXScpLFxuXHRcdFx0XHRkYXRhc2V0ID0ganNlLmxpYnMuZm9ybS5nZXREYXRhKCR0YXJnZXQpLFxuXHRcdFx0XHRyZXN1bHQgPSBbXSxcblx0XHRcdFx0dG1wUmVzdWx0ID0gbnVsbDtcblxuXHRcdFx0JC5lYWNoKGRhdGFzZXQucHJvZHVjdHNfaWQsIGZ1bmN0aW9uKGksIHYpIHtcblx0XHRcdFx0dG1wUmVzdWx0ID0ge307XG5cdFx0XHRcdHRtcFJlc3VsdC50YXJnZXQgPSAkcm93cy5lcShpKTtcblxuXHRcdFx0XHQvLyBTdG9yZSB0aGUgZGF0YSBmcm9tIHRoZSBjdXJyZW50IHJvdyBhcyBhIGpzb25cblx0XHRcdFx0JC5lYWNoKGRhdGFzZXQsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZVtpXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHQvLyBTdG9yZSB0aGUgdmFsdWUgYXMgYW4gYXJyYXkgdG8gYmUgY29tcGxpYW50IHdpdGggdGhlIG9sZCBBUElcblx0XHRcdFx0XHRcdHRtcFJlc3VsdFtrZXldID0gW3ZhbHVlW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIEdldCB0aGUgaGlkZGVuIGZpZWxkcyBmb3IgdGhlIGF0dHJpYnV0ZXNcblx0XHRcdFx0Ly8gYmVsb25naW5nIHRvIHRoaXMgcm93IGZyb20gdGhlIGZvcm0gaGVhZFxuXHRcdFx0XHQkaGlkZGVuc1xuXHRcdFx0XHRcdC5maWx0ZXIoJ1tuYW1lXj1cImlkWycgKyB2ICsgJ1wiXSwgLmZvcmNlJylcblx0XHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAkc2VsZi5hdHRyKCduYW1lJyk7XG5cblx0XHRcdFx0XHRcdHRtcFJlc3VsdFtuYW1lXSA9ICRzZWxmLnZhbCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIFB1c2ggdGhlIGdlbmVyYXRlZCBqc29uIHRvIHRoZSBmaW5hbCByZXN1bHQgYXJyYXlcblx0XHRcdFx0cmVzdWx0LnB1c2godG1wUmVzdWx0KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBGdW5jdGlvbiB0aGF0IGNoZWNrcyB0aGUgZm9ybSAvIHRoZSByb3cgaWYgdGhlIGNvbWJpbmF0aW9uXG5cdFx0ICogYW5kIHF1YW50aXR5IGlzIHZhbGlkLiBJdCByZXR1cm5zIGFuIHByb21pc2Ugd2hpY2ggZ2V0cyByZWplY3RlZFxuXHRcdCAqIGlmIGluIHRoZSBzY29wZSB3YXMgYW4gaW52YWxpZCB2YWx1ZS4gSW4gb3RoZXIgY2FzZXMgaXQgZ2V0c1xuXHRcdCAqIHJlc29sdmVkLiBJZiBpdCBpcyBkZXRlY3RpbmcgY2hhbmdlcyBpbnNpZGUgdGhlIGZvcm0gaXQgY2FuXG5cdFx0ICogc2hvdyBhbiBpbmZvIGxheWVyIHRvIHRoZSB1c2VyIGFuZCAvIG9yIHJldmVydCB0aGUgY2hhbmdlc1xuXHRcdCAqIChkZXBlbmRpbmcgb24gdGhlIGNhbGxlciBwYXJhbWV0ZXJzKVxuXHRcdCAqIEBwYXJhbSAgICAgICB7Ym9vbGVhbn0gICAgICAgc2hvd0NoYW5nZXMgICAgICAgICBTaG93IGFuIGluZm8tbGF5ZXIgaWYgY2hhbmdlcyB3b3VsZCBiZSByZWZ1c2VkXG5cdFx0ICogQHBhcmFtICAgICAgIHtib29sZWFufSAgICAgICByZXZlcnRDaGFuZ2VzICAgICAgIFJlc2V0cyB0aGUgZm9ybSB2YWx1ZXMgd2l0aCB0aGUgb25lIGZyb20gdGhlIGRhdGEgYXR0cmlidXRlcyBpZiB0cnVlXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgICAgICBmb3JtZGF0YSAgICAgICAgICAgIEpzb24gdGhhdCBjb250YWlucyB0aGUgZGF0YSB0byBjaGVja1xuXHRcdCAqIEByZXR1cm4gICAgIHsqfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybnMgYSBwcm9taXNlXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2NoZWNrRm9ybSA9IGZ1bmN0aW9uKHNob3dDaGFuZ2VzLCByZXZlcnRDaGFuZ2VzLCBmb3JtZGF0YSkge1xuXG5cdFx0XHR2YXIgcHJvbWlzZXMgPSBbXSxcblx0XHRcdFx0aGFzQ2hhbmdlZCA9IGZhbHNlO1xuXG5cdFx0XHQvLyBHZXQgdGhlIGNvbXBsZXRlIGZvcm0gZGF0YSBpZiBubyByb3cgZGF0YSBpcyBnaXZlblxuXHRcdFx0Zm9ybWRhdGEgPSBmb3JtZGF0YSB8fCBfZ2VuZXJhdGVGb3JtZGF0YU9iamVjdCgpO1xuXG5cdFx0XHQvLyBDaGVjayB0aGUgZm9ybWRhdGEgZm9yIGNoYW5nZWQgdmFsdWVzXG5cdFx0XHQkLmVhY2goZm9ybWRhdGEsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJGNoYW5nZWQgPSB0aGlzLnRhcmdldC5maW5kKCcuJyArIG9wdGlvbnMuY2hhbmdlQ2xhc3MpO1xuXHRcdFx0XHRoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCAhISRjaGFuZ2VkLmxlbmd0aDtcblx0XHRcdFx0cmV0dXJuICFoYXNDaGFuZ2VkO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiAkLndoZW4uYXBwbHkodW5kZWZpbmVkLCBwcm9taXNlcykucHJvbWlzZSgpO1xuXG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGNsZWFucyB1cCB0aGUgcHJvY2VzcyBzdGF0ZVxuXHRcdCAqIChOZWVkZWQgZXNwZWNpYWxseSBhZnRlciBhamF4IHJlcXVlc3RzLCB0byBiZSBhYmxlXG5cdFx0ICogdG8gbWFrZSBmdXJ0aGVyIHJlcXVlc3RzKVxuXHRcdCAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSAgICAgICAgaWQgICAgICAgICAgICAgIFRoZSBwcm9kdWN0IGlkIHRoYXQgbmVlZHMgdG8gYmUgcmVzZXRlZFxuXHRcdCAqIEByZXR1cm4gICAgIHtBcnJheS48VD59ICAgICAgICAgICAgICAgICAgICAgUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IGVtcHR5IGZpZWxkc1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9jbGVhbnVwQXJyYXkgPSBmdW5jdGlvbihpZCwgJHJvdykge1xuXHRcdFx0ZGVsZXRlIGFjdGl2ZVsncHJvZHVjdF8nICsgaWRdO1xuXHRcdFx0JHJvdy5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuXHRcdFx0cmV0dXJuIGFjdGl2ZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgZG9lcyB0aGUgZ2VuZXJhbCBmb3JtIHVwZGF0ZVxuXHRcdCAqIGFmdGVyIGFuIGFqYXggcmVxdWVzdFxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICAkdGFyZ2V0ICAgICAgICAgVGhlIGpRdWVyeSBzZWxlY3Rpb24gb2YgdGhlIHRhcmdldCBlbGVtZW50cy5cblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgcmVzdWx0ICAgICAgICAgIFRoZSByZXN1bHQgb2YgdGhlIGFqYXggcmVxdWVzdC5cblx0XHQgKiBAcGFyYW0gICAgICAge3N0cmluZ30gICAgdHlwZSAgICAgICAgICAgIFRoZSBleGVjdXRlZCBhY3Rpb24gdHlwZS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfdXBkYXRlRm9ybSA9IGZ1bmN0aW9uKCR0YXJnZXQsIHJlc3VsdCwgdHlwZSkge1xuXHRcdFx0Ly8gVXBkYXRlIHRoZSByZXN0IG9mIHRoZSBwYWdlXG5cdFx0XHRqc2UubGlicy50ZW1wbGF0ZS5oZWxwZXJzLmZpbGwocmVzdWx0LmNvbnRlbnQsICRib2R5LCBvcHRpb25zLnNlbGVjdG9yTWFwcGluZyk7XG5cdFx0XHRcblx0XHRcdC8vIFRvZ2dsZSBpbmZvLW1lc3NhZ2VzIHZpc2liaWxpdHkuXG5cdFx0XHQkKCcuaW5mby1tZXNzYWdlJykudG9nZ2xlQ2xhc3MoJ2hpZGRlbicsICQoJy5pbmZvLW1lc3NhZ2UnKS50ZXh0KCkgPT09ICcnKTtcblxuXHRcdFx0Ly8gSW5mb3JtIG90aGVyIHdpZGdldHMgYWJvdXQgdGhlIHVwZGF0ZVxuXHRcdFx0JHVwZGF0ZVRhcmdldC50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5DQVJUX1VQREFURUQoKSwgW10pO1xuXHRcdFx0JGJvZHkudHJpZ2dlcihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuQ0FSVF9VUERBVEUoKSwgKHR5cGUgPT09ICdhZGQnKSk7XG5cblx0XHRcdC8vIFVwZGF0ZSB0aGUgaGlkZGVuIGRhdGEgYXR0cmlidXRlcyBvZiB0aGF0IHJvd1xuXHRcdFx0X3VwZGF0ZURhdGFWYWx1ZXMoJHRhcmdldCk7XG5cblx0XHRcdGlmICgkLmlzRW1wdHlPYmplY3QocmVzdWx0LnByb2R1Y3RzKSkge1xuXHRcdFx0XHQvLyBIaWRlIHRoZSB0YWJsZSBpZiBubyBwcm9kdWN0cyBhcmUgYXQgdGhlIGxpc3Rcblx0XHRcdFx0JGNhcnROb3RFbXB0eS5hZGRDbGFzcygnaGlkZGVuJyk7XG5cdFx0XHRcdCRjYXJ0RW1wdHkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU2hvdyB0aGUgdGFibGUgaWYgdGhlcmUgYXJlIHByb2R1Y3RzIGF0IGl0XG5cdFx0XHRcdCRjYXJ0RW1wdHkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdFx0XHQkY2FydE5vdEVtcHR5LnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVpbml0aWFsaXplIHdpZGdldHMgaW4gdXBkYXRlZCBET01cblx0XHRcdHdpbmRvdy5nYW1iaW8ud2lkZ2V0cy5pbml0KCR0aGlzKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIHRoZSBsaXN0IHVwZGF0ZXMuXG5cdFx0ICogVGhlcmVmb3IgaXQgY2FsbHMgQUpBWC1yZXF1ZXN0cyAoaW4gY2FzZSBhamF4IGlzXG5cdFx0ICogZW5hYmxlZCkgdG8gdGhlIHNlcnZlciB0byBnZXQgdGhlIHVwZGF0ZWQgaW5mb3JtYXRpb25cblx0XHQgKiBhYm91dCB0aGUgdGFibGUgc3RhdGUuIElmIGFqYXggaXNuJ3QgZW5hYmxlZCwgaXQgc2ltcGx5XG5cdFx0ICogc3VibWl0cyB0aGUgZm9ybS5cblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgICAgICR0YXJnZXQgICAgICAgICAgICBUaGUgalF1ZXJ5IHNlbGVjdGlvbiBvZiB0aGUgcm93IHRoYXQgZ2V0cyB1cGRhdGVkXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgICAgICBkYXRhc2V0ICAgICAgICAgICAgVGhlIGRhdGEgY29sbGVjdGVkIGZyb20gdGhlIHRhcmdldCByb3cgaW4gSlNPTiBmb3JtYXRcblx0XHQgKiBAcGFyYW0gICAgICAge2FydGljbGV9ICAgICAgIGFydGljbGUgICAgICAgICAgICBUaGUgcHJvZHVjdHMgaWQgb2YgdGhlIGFydGljbGUgaW4gdGhhdCByb3dcblx0XHQgKiBAcGFyYW0gICAgICAge2FydGljbGV9ICAgICAgIHR5cGUgICAgICAgICAgICAgICBUaGUgb3BlcmF0aW9uIHR5cGUgY2FuIGVpdGhlciBiZSBcImFkZFwiLCBcImRlbGV0ZVwiIG9yIFwicmVmcmVzaFwiLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9leGVjdXRlQWN0aW9uID0gZnVuY3Rpb24oJHJvdywgJHRhcmdldCwgZGF0YXNldCwgYXJ0aWNsZSwgdHlwZSkge1xuXHRcdFx0aWYgKG9wdGlvbnMuYWpheCkge1xuXHRcdFx0XHQvLyBEZWxldGUgdGhlIHRhcmdldCBlbGVtZW50IGJlY2F1c2UgYWpheCByZXF1ZXN0c1xuXHRcdFx0XHQvLyB3aWxsIGZhaWwgd2l0aCBhIGpRdWVyeSBzZWxlY3Rpb24gaW4gdGhlIGRhdGEganNvblxuXHRcdFx0XHRkZWxldGUgZGF0YXNldC50YXJnZXQ7XG5cblx0XHRcdFx0JHJvdy50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5UUkFOU0lUSU9OKCksIHRyYW5zaXRpb24pO1xuXG5cdFx0XHRcdC8vIFBlcmZvcm0gYW4gYWpheCBpZiB0aGUgZGF0YSBpcyB2YWxpZCBhbmQgdGhlIG9wdGlvbnMgZm9yIGFqYXggaXMgc2V0XG5cdFx0XHRcdGpzZS5saWJzLnhoci5hamF4KHt1cmw6IGFjdGlvbiwgZGF0YTogZGF0YXNldH0sIHRydWUpLmRvbmUoZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdFx0Ly8gUGVyZm9ybSBob29rc1xuXHRcdFx0XHRcdGpzZS5saWJzLmhvb2tzLmV4ZWN1dGUoanNlLmxpYnMuaG9va3Mua2V5cy5zaG9wLmNhcnQuY2hhbmdlLCB7XG5cdFx0XHRcdFx0XHQkdGFyZ2V0LFxuXHRcdFx0XHRcdFx0ZGF0YXNldCxcblx0XHRcdFx0XHRcdGFydGljbGUsXG5cdFx0XHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRcdFx0cmVzdWx0LFxuXHRcdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBwcm9kdWN0IHJvd1xuXHRcdFx0XHRcdHZhciAkbWFya3VwID0gJChyZXN1bHQucHJvZHVjdHNbJ3Byb2R1Y3RfJyArIGFydGljbGVdIHx8ICcnKTtcblx0XHRcdFx0XHQkbWFya3VwLnJlbW92ZUNsYXNzKG9wdGlvbnMuY2xhc3NMb2FkaW5nKTtcblx0XHRcdFx0XHQkdGFyZ2V0LnJlcGxhY2VXaXRoKCRtYXJrdXApO1xuXHRcdFx0XHRcdF91cGRhdGVGb3JtKCR0YXJnZXQsIHJlc3VsdCwgdHlwZSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dmFyIHByb2R1Y3ROdW1iZXIgPSBhcnRpY2xlLm1hdGNoKC9cXGQrLylbMF07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gRmluZCBhbGwgaXRlbXMgd2l0aCB0aGUgc2FtZSBwcm9kdWN0IG51bWJlclxuXHRcdFx0XHRcdHZhciAkaXRlbXMgPSAkKCdpbnB1dFt2YWx1ZV49XCInICsgcHJvZHVjdE51bWJlciArICdcIl0nKS5wYXJlbnQoJ3RkJyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly8gQXBwbHkgdGhlIG5ldyBtYXJrdXAgZm9yZWFjaCBpdGVtIHdoaWNoIGhhcyB0aGUgc2FtZSBwcm9kdWN0IG51bWJlci5cblx0XHRcdFx0XHQkaXRlbXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICghJCh0aGlzKS5maW5kKCdpbnB1dFt2YWx1ZT1cIicgKyBhcnRpY2xlICsgJ1wiXScpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgbnVtYmVyID0gJCh0aGlzKS5maW5kKCdpbnB1dFtpZD1cInByb2R1Y3RzX2lkW11cIl0nKS5hdHRyKCd2YWx1ZScpO1xuXHRcdFx0XHRcdFx0XHQkbWFya3VwID0gJChyZXN1bHQucHJvZHVjdHNbJ3Byb2R1Y3RfJyArIG51bWJlcl0gfHwgJycpO1xuXHRcdFx0XHRcdFx0XHQkdGFyZ2V0ID0gJCh0aGlzKS5wYXJlbnQoJ3RyJyk7XG5cdFx0XHRcdFx0XHRcdCR0YXJnZXQucmVwbGFjZVdpdGgoJG1hcmt1cCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pLmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRfY2xlYW51cEFycmF5KGFydGljbGUsICRyb3cpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIENsZWFudXAgdGhlIGFjdGl2ZSBhcnJheSBvbiBmYWlsIC8gc3VjY2Vzc1xuXHRcdFx0XHQvLyBvZiB0aGUgZm9sbG93aW5nIHN1Ym1pdC4gVGhpcyBpcyBhIGZhbGxiYWNrXG5cdFx0XHRcdC8vIGlmIGFuIG90aGVyIGNvbXBvbmVudCB3b3VsZCBwcmV2ZW50IHRoZSBzdWJtaXRcblx0XHRcdFx0Ly8gaW4gc29tZSBjYXNlcywgc28gdGhhdCB0aGlzIHNjcmlwdCBjYW4gcGVyZm9ybVxuXHRcdFx0XHQvLyBhY3Rpb25zIGFnYWluXG5cdFx0XHRcdHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblx0XHRcdFx0ZGVmZXJyZWQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdF9jbGVhbnVwQXJyYXkoYXJ0aWNsZSwgJHJvdyk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIFN1Ym1pdCB0aGUgZm9ybVxuXHRcdFx0XHQkZm9ybS50cmlnZ2VyKCdzdWJtaXQnLCBkZWZlcnJlZCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXG4vLyAjIyMjIyMjIyMjIEVWRU5UIEhBTkRMRVIgIyMjIyMjIyMjI1xuXG5cdFx0LyoqXG5cdFx0ICogQWRkcyBhbiBjbGFzcyB0byB0aGUgY2hhbmdlZCBpbnB1dFxuXHRcdCAqIGZpZWxkLCBzbyB0aGF0IGl0J3Mgc3R5bGluZyBzaG93c1xuXHRcdCAqIHRoYXQgaXQgd2Fzbid0IHJlZnJlc2hlZCB0aWxsIG5vd1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9pbnB1dEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdHZhbHVlID0gJHNlbGYudmFsKCksXG5cdFx0XHRcdG9sZFZhbHVlID0gJHNlbGYuZGF0YSgpLm9sZFZhbHVlLFxuXHRcdFx0XHRoYXNOZXdWYWx1ZSA9IHZhbHVlICE9PSBvbGRWYWx1ZTtcblxuXHRcdFx0aWYgKGhhc05ld1ZhbHVlKSB7XG4gICAgICAgICAgICBcdGlzQ2hhbmdlZCA9IGhhc05ld1ZhbHVlO1xuXHRcdFx0XHQkc2VsZi5hZGRDbGFzcyhvcHRpb25zLmNoYW5nZUNsYXNzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRzZWxmLnJlbW92ZUNsYXNzKG9wdGlvbnMuY2hhbmdlQ2xhc3MpO1xuXHRcdFx0fVxuXG5cdFx0XHRfdXBkYXRlQ2hhbmdlU3RhdGUoKTtcblx0XHR9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgdGhlIGJsdXIgZXZlbnRcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHZhciBfYmx1ckhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkc2VsZiA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAkc2VsZi52YWwoKSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9ICRzZWxmLmRhdGEoKS5vbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICBoYXNOZXdWYWx1ZSA9IHZhbHVlICE9PSBvbGRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKGhhc05ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgJHNlbGZcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5pdGVtJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tcmVmcmVzaCcpXG4gICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXG4gICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGFuZGxlciB0aGF0IGxpc3RlbnMgb24gY2xpY2sgZXZlbnRzIG9uIHRoZVxuXHRcdCAqIGJ1dHRvbnMgXCJyZWZyZXNoXCIsIFwiZGVsZXRlXCIgJiBcImFkZCB0byBjYXJ0XCIuXG5cdFx0ICogSXQgdmFsaWRhdGVzIHRoZSBmb3JtIC8gcm93IGFuZCBwYXNzZXMgdGhlXG5cdFx0ICogdGhlIGRhdGEgdG8gYW4gc3VibWl0IGV4ZWN1dGUgZnVuY2l0b24gaWYgdmFsaWRcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgZSAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2NsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdCRyb3cgPSAkc2VsZi5jbG9zZXN0KCcuaXRlbScpLFxuXHRcdFx0XHR0eXBlID0gZS5kYXRhLnR5cGUsXG5cdFx0XHRcdHJvd2RhdGEgPSBfZ2VuZXJhdGVGb3JtZGF0YU9iamVjdCgkcm93KVswXSxcblx0XHRcdFx0YXJ0aWNsZSA9IHJvd2RhdGEucHJvZHVjdHNfaWRbMF0sXG5cdFx0XHRcdCR0YXJnZXQgPSByb3dkYXRhLnRhcmdldCxcblx0XHRcdFx0dGl0bGUgPSAkdGFyZ2V0LmZpbmQoJy5wcm9kdWN0LXRpdGxlJykudGV4dCgpO1xuXG5cdFx0XHQvLyBBZGQgbG9hZGluZyBjbGFzc1xuXHRcdFx0JHJvdy5hZGRDbGFzcygnbG9hZGluZycpO1xuXG5cdFx0XHQvLyBDaGVjayBpZiB0aGVyZSBpcyBubyBjdXJyZW50IHByb2Nlc3MgZm9yIHRoaXMgYXJ0aWNsZVxuXHRcdFx0Ly8gb3IgaW4gY2FzZSBpdCdzIG5vIGFqYXggY2FsbCB0aGVyZSBpcyBOTyBvdGhlciBwcm9jZXNzXG5cdFx0XHRpZiAoJC5pc0VtcHR5T2JqZWN0KGFjdGl2ZSkgfHwgKG9wdGlvbnMuYWpheCAmJiAhYWN0aXZlWydwcm9kdWN0XycgKyBhcnRpY2xlXSkpIHtcblx0XHRcdFx0YWN0aXZlWydwcm9kdWN0XycgKyBhcnRpY2xlXSA9IHRydWU7XG5cdFx0XHRcdF9zZXRBY3Rpb24odHlwZSk7XG5cblx0XHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnZGVsZXRlJzpcblx0XHRcdFx0XHRcdC8vIFVwZGF0ZSB0aGUgZm9ybSBhbmQgdGhlIGRhdGFzZXQgd2l0aFxuXHRcdFx0XHRcdFx0Ly8gdGhlIGFydGljbGUgaWQgdG8gZGVsZXRlXG5cdFx0XHRcdFx0XHQkZGVsZXRlRmllbGQudmFsKGFydGljbGUpO1xuXHRcdFx0XHRcdFx0cm93ZGF0YVtkZWxldGVGaWVsZE5hbWVdID0gW2FydGljbGVdO1xuXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5jb25maXJtRGVsZXRlKSB7XG5cdFx0XHRcdFx0XHRcdC8vIE9wZW4gYSBtb2RhbCBsYXllciB0byBjb25maXJtIHRoZSBkZWxldGlvblxuXHRcdFx0XHRcdFx0XHR2YXIgbW9kYWxUaXRsZSA9IGpzZS5jb3JlLmxhbmcudHJhbnNsYXRlKCdDQVJUX1dJU0hMSVNUX0RFTEVURV9USVRMRScsICdnZW5lcmFsJyksXG5cdFx0XHRcdFx0XHRcdFx0bW9kYWxNZXNzYWdlID0ganNlLmNvcmUubGFuZy50cmFuc2xhdGUoJ0NBUlRfV0lTSExJU1RfREVMRVRFJywgJ2dlbmVyYWwnKTtcblxuXHRcdFx0XHRcdFx0XHRqc2UubGlicy50ZW1wbGF0ZS5tb2RhbC5jb25maXJtKHtcblx0XHRcdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1vZGFsTWVzc2FnZSxcblx0XHRcdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBtb2RhbFRpdGxlXG5cdFx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0X2V4ZWN1dGVBY3Rpb24oJHJvdywgJHRhcmdldCwgcm93ZGF0YSwgYXJ0aWNsZSwgdHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0XHQkYm9keS50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5XSVNITElTVF9DQVJUX0RFTEVURSgpLCBbXG5cdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCdkZWZlcnJlZCc6IGRlZmVycmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQnZGF0YXNldCc6IHJvd2RhdGFcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRfY2xlYW51cEFycmF5KGFydGljbGUsICRyb3cpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdF9leGVjdXRlQWN0aW9uKCRyb3csICR0YXJnZXQsIHJvd2RhdGEsIGFydGljbGUsIHR5cGUpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHQkYm9keS50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5XSVNITElTVF9DQVJUX0RFTEVURSgpLCBbXG5cdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0J2RlZmVycmVkJzogZGVmZXJyZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHQnZGF0YXNldCc6IHJvd2RhdGFcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0Ly8gSW4gYWxsIG90aGVyIGNhc2VzIGNoZWNrIGlmIHRoZSBmb3JtXG5cdFx0XHRcdFx0XHQvLyBoYXMgdmFsaWQgdmFsdWVzIGFuZCBjb250aW51ZSB3aXRoIHRoZVxuXHRcdFx0XHRcdFx0Ly8gZG9uZSBjYWxsYmFjayBpZiB2YWxpZFxuXHRcdFx0XHRcdFx0X2NoZWNrRm9ybShmYWxzZSwgZmFsc2UsIFskLmV4dGVuZCh0cnVlLCB7fSwgcm93ZGF0YSldKVxuXHRcdFx0XHRcdFx0XHQuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBFbXB0eSB0aGUgZGVsZXRlIGhpZGRlbiBmaWVsZCBpbiBjYXNlIGl0IHdhcyBzZXQgYmVmb3JlXG5cdFx0XHRcdFx0XHRcdFx0JGRlbGV0ZUZpZWxkLnZhbCgnJyk7XG5cblx0XHRcdFx0XHRcdFx0XHR2YXIgZXZlbnQgPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdhZGQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRldmVudCA9IGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5XSVNITElTVF9UT19DQVJUKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGRlZmVycmVkLmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9leGVjdXRlQWN0aW9uKCRyb3csICR0YXJnZXQsIHJvd2RhdGEsIGFydGljbGUsIHR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdCRib2R5LnRyaWdnZXIoZXZlbnQsIFt7J2RlZmVycmVkJzogZGVmZXJyZWQsICdkYXRhc2V0Jzogcm93ZGF0YX1dKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0X2V4ZWN1dGVBY3Rpb24oJHJvdywgJHRhcmdldCwgcm93ZGF0YSwgYXJ0aWNsZSwgdHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdF9jbGVhbnVwQXJyYXkoYXJ0aWNsZSwgJHJvdyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFByZXZlbnQgdGhlIHN1Ym1pdCBldmVudCB0aGF0IHdhcyB0cmlnZ2VyZFxuXHRcdCAqIGJ5IHVzZXIgb3IgYnkgc2NyaXB0LiBJZiBpdCB3YXMgdHJpZ2dlcmVkXG5cdFx0ICogYnkgdGhlIHVzZXIsIGNoZWNrIGlmIGl0IHdhcyBhbiBcIkVudGVyXCIta2V5XG5cdFx0ICogc3VibWl0IGZyb20gYW4gaW5wdXQgZmllbGQuIElmIHNvLCBleGVjdXRlXG5cdFx0ICogdGhlIHJlZnJlc2ggZnVuY3Rpb25hbGl0eSBmb3IgdGhhdCByb3cuXG5cdFx0ICogSWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgdGhlIHNjcmlwdFxuXHRcdCAqIChpZGVudGlmaWVkIGJ5IHRoZSBkYXRhIGZsYWcgXCJkXCIpIGNoZWNrIHRoZVxuXHRcdCAqIHdob2xlIGZvcm0gZm9yIGVycm9ycy4gT25seSBpbiBjYXNlIG9mIHZhbGlkXG5cdFx0ICogZGF0YSBwcm9jZWVkIHRoZSBzdWJtaXRcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgICAgIGUgICAgICAgalF1ZXJ5IGV2ZW50IG9iamVjdFxuXHRcdCAqIEBwYXJhbSAgICAgICB7Ym9vbGVhbn0gICAgICAgZCAgICAgICBBIGZsYWcgdGhhdCBpZGVudGlmaWVzIHRoYXQgdGhlIHN1Ym1pdCB3YXMgdHJpZ2dlcmVkIGJ5IHRoaXMgc2NyaXB0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3N1Ym1pdEhhbmRsZXIgPSBmdW5jdGlvbihlLCBkKSB7XG5cblx0XHRcdC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3VyXG5cdFx0XHQvLyBpbiBib3RoIGNhc2VzXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRpZiAoIWQgJiYgZS5vcmlnaW5hbEV2ZW50KSB7XG5cblx0XHRcdFx0Ly8gQ2hlY2sgaWYgYW4gaW5wdXQgZmllbGQgaGFzIHRyaWdnZXJkIHRoZSBzdWJtaXQgZXZlbnRcblx0XHRcdFx0Ly8gYW5kIGNhbGwgdGhlIHJlZnJlc2ggaGFuZGxlclxuXHRcdFx0XHR2YXIgJHNvdXJjZSA9ICQoZS5vcmlnaW5hbEV2ZW50LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQpO1xuXHRcdFx0XHRpZiAoJHNvdXJjZS5sZW5ndGggJiYgJHNvdXJjZS5pcygnaW5wdXRbdHlwZT1cInRleHRcIl0nKSkge1xuXHRcdFx0XHRcdCRzb3VyY2Vcblx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuaXRlbScpXG5cdFx0XHRcdFx0XHQuZmluZCgnLmJ1dHRvbi1yZWZyZXNoJylcblx0XHRcdFx0XHRcdC5maXJzdCgpXG5cdFx0XHRcdFx0XHQudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKGQpIHtcblxuXHRcdFx0XHQvLyBDaGVjayB0aGUgd2hvbGUgZm9ybSBhbmQgb25seSBzdWJtaXRcblx0XHRcdFx0Ly8gaXQgaWYgaXQncyB2YWxpZFxuXHRcdFx0XHRfY2hlY2tGb3JtKCkuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlIHN1Ym1pdCBldmVudCBoYW5kbGVyXG5cdFx0XHRcdFx0Ly8gb24gYSBzdWNjZXNzZnVsIHZhbGlkYXRpb24gYW5kXG5cdFx0XHRcdFx0Ly8gdHJpZ2dlciBhIHN1Ym1pdCBhZ2Fpbiwgc28gdGhhdCB0aGVcblx0XHRcdFx0XHQvLyBicm93c2VyIGV4ZWN1dGVzIGl0J3MgZGVmYXVsdCBiZWhhdmlvclxuXHRcdFx0XHRcdCRmb3JtXG5cdFx0XHRcdFx0XHQub2ZmKCdzdWJtaXQnKVxuXHRcdFx0XHRcdFx0LnRyaWdnZXIoJ3N1Ym1pdCcpO1xuXG5cdFx0XHRcdFx0Ly8gUmVzb2x2ZSB0aGUgZGVmZXJyZWQgaWYgZ2l2ZW5cblx0XHRcdFx0XHRpZiAodHlwZW9mIGQgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRkLnJlc29sdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gUmVqZWN0IHRoZSBkZWZlcnJlZCBpZiBnaXZlblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgZCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdGQucmVqZWN0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBFdmVudCBoYW5kbGVyIGZvciBjbGlja2luZyBvbiB0aGUgcHJvY2VlZFxuXHRcdCAqIGJ1dHRvbiB0byBnZXQgdG8gdGhlIGNoZWNrb3V0IHByb2Nlc3MuIEl0XG5cdFx0ICogY2hlY2tzIGFsbCBpdGVtcyBhZ2FpbiBpZiB0aGV5IGNvbnRhaW4gdmFsaWRcblx0XHQgKiBkYXRhLiBPbmx5IGlmIHNvLCBwcm9jZWVkXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgICAgICBlICAgICAgIGpRdWVyeSBldmVudCBvYmplY3Rcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfc3VibWl0QnV0dG9uSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcblx0XHRcdGlmIChpc0NoYW5nZWQpIHtcblx0XHRcdFx0Ly8gR2V0IHRoZSBjb21wbGV0ZSBmb3JtIGRhdGEgaWYgbm8gcm93IGRhdGEgaXMgZ2l2ZW5cblx0XHRcdFx0dmFyIGZvcm1kYXRhID0gX2dlbmVyYXRlRm9ybWRhdGFPYmplY3QoKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIENoZWNrIHRoZSBmb3JtZGF0YSBmb3IgY2hhbmdlZCB2YWx1ZXNcblx0XHRcdFx0JC5lYWNoKGZvcm1kYXRhLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgJGNoYW5nZWRJbnB1dCA9IHRoaXMudGFyZ2V0LmZpbmQoJy4nICsgb3B0aW9ucy5jaGFuZ2VDbGFzcyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKCRjaGFuZ2VkSW5wdXQpIHtcblx0XHRcdFx0XHRcdCRjaGFuZ2VkSW5wdXRcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5pdGVtJylcblx0XHRcdFx0XHRcdFx0LmZpbmQoJy5idXR0b24tcmVmcmVzaCcpXG5cdFx0XHRcdFx0XHRcdC5maXJzdCgpXG5cdFx0XHRcdFx0XHRcdC50cmlnZ2VyKCdjbGljaycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpc0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0X3VwZGF0ZUNoYW5nZVN0YXRlKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdFx0ZGVzdGluYXRpb24gPSAkc2VsZi5hdHRyKCdocmVmJyk7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGlmIHRoZXJlIGlzIGFueSBvdGhlciBwcm9jZXNzIHJ1bm5pbmdcblx0XHRcdGlmICgkLmlzRW1wdHlPYmplY3QoYWN0aXZlKSAmJiAhYnVzeSAmJiAhdXBkYXRlTGlzdCkge1xuXHRcdFx0XHRidXN5ID0gdHJ1ZTtcblx0XHRcdFx0XG5cdFx0XHRcdF9jaGVja0Zvcm0odHJ1ZSwgdHJ1ZSkuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRmdW5jdGlvbiBjYWxsYmFjaygpIHtcblx0XHRcdFx0XHRcdGxvY2F0aW9uLmhyZWYgPSBkZXN0aW5hdGlvbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0anNlLmxpYnMuaG9va3MuZXhlY3V0ZShqc2UubGlicy5ob29rcy5rZXlzLnNob3AuY2FydC5jaGVja291dCwge2V2ZW50OiBlfSwgNTAwKVxuXHRcdFx0XHRcdFx0LnRoZW4oY2FsbGJhY2spXG5cdFx0XHRcdFx0XHQuY2F0Y2goY2FsbGJhY2spO1xuXHRcdFx0XHR9KS5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0YnVzeSA9IGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRXZlbnQgaGFuZGxlciB0aGF0IGNoZWNrcyB0aGUgZm9ybSBhbmRcblx0XHQgKiByZXNvbHZlcyBvciByZWplY3RzIHRoZSBkZWxpdmVyZWQgZGVmZXJyZWRcblx0XHQgKiAoVXNlZCBmb3IgZXh0ZXJuYWwgcGF5bWVudCBtb2R1bGVzIHRvXG5cdFx0ICogY2hlY2sgaWYgdGhlIGZvcm0gaXMgdmFsaWQpXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgIGUgICAgICAgICAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgIGQgICAgICAgICAgICAgICBKU09OIG9iamVjdCB3aXRoIHRoZSBldmVudCBzZXR0aW5nc1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9jaGVja0Zvcm1IYW5kbGVyID0gZnVuY3Rpb24oZSwgZCkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0ZCA9IGQgfHwge307XG5cblx0XHRcdF9jaGVja0Zvcm0oZC5zaG93Q2hhbmdlcywgZC5yZXZlcnRDaGFuZ2VzKS5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoZC5kZWZlcnJlZCkge1xuXHRcdFx0XHRcdGQuZGVmZXJyZWQucmVzb2x2ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoZC5kZWZlcnJlZCkge1xuXHRcdFx0XHRcdGQuZGVmZXJyZWQucmVqZWN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBGdW5jdGlvbiB0aGF0IHVwZGF0ZXMgdGhlIGxpc3Qgb24gZm9jdXMgb2Zcblx0XHQgKiB0aGUgd2luZG93XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3VwZGF0ZUxpc3QgPSBmdW5jdGlvbigpIHtcblx0XHRcdHVwZGF0ZUxpc3QgPSB0cnVlO1xuXHRcdFx0anNlLmxpYnMueGhyLmFqYXgoe3VybDogb3B0aW9ucy51cGRhdGVVcmx9LCB0cnVlKS5kb25lKGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHQvLyBJbml0IHdpdGggaGUgZmlyc3QgbGluZSBzaW5jZSB0aGlzIGlzdCB0aGUgaGVhZGluZ1xuXHRcdFx0XHR2YXIgJGxhc3RTY2FubmVkID0gJGZvcm0uZmluZCgnLm9yZGVyLXdpc2hsaXN0IC5pdGVtJykuZmlyc3QoKSxcblx0XHRcdFx0XHQkdGFyZ2V0ID0gJCgpO1xuXG5cdFx0XHRcdC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgcHJvZHVjdHMgb2JqZWN0IGFuZCBzZWFyY2ggZm9yIHRoZVxuXHRcdFx0XHQvLyBwcm9kdWN0cyBpbnNpZGUgdGhlIG1hcmt1cC4gSWYgdGhlIHByb2R1Y3Qgd2FzIGZvdW5kLFxuXHRcdFx0XHQvLyB1cGRhdGUgdGhlIHZhbHVlcywgaWYgbm90IGFkZCB0aGUgcHJvZHVjdCByb3cgYXQgdGhlXG5cdFx0XHRcdC8vIGNvcnJlY3QgcG9zaXRpb25cblx0XHRcdFx0JC5lYWNoKHJlc3VsdC5wcm9kdWN0cywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRcdHZhciBhcnRpY2xlSWQgPSBrZXkucmVwbGFjZSgncHJvZHVjdF8nLCAnJyksXG5cdFx0XHRcdFx0XHQkYXJ0aWNsZSA9ICRmb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c19pZFtdXCJdW3ZhbHVlPVwiJyArIGFydGljbGVJZCArICdcIl0nKSxcblx0XHRcdFx0XHRcdCRyb3cgPSBudWxsO1xuXG5cdFx0XHRcdFx0aWYgKCEkYXJ0aWNsZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdC8vIFRoZSBhcnRpY2xlIHdhc24ndCBmb3VuZCBvbiBwYWdlXG5cdFx0XHRcdFx0XHQvLyAtPiBhZGQgaXRcblx0XHRcdFx0XHRcdCRyb3cgPSAkKHZhbHVlKTtcblx0XHRcdFx0XHRcdCRyb3cuaW5zZXJ0QWZ0ZXIoJGxhc3RTY2FubmVkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gVGhlIGFydGljbGUgd2FzIGZvdW5kIG9uIHBhZ2Vcblx0XHRcdFx0XHRcdC8vIC0+IHVwZGF0ZSBpdFxuXHRcdFx0XHRcdFx0JHJvdyA9ICRhcnRpY2xlLmNsb3Nlc3QoJy5pdGVtJyk7XG5cblx0XHRcdFx0XHRcdHZhciAkcXR5ID0gJHJvdy5maW5kKCdpbnB1dFtuYW1lPVwiY2FydF9xdWFudGl0eVtdXCJdJyksXG5cdFx0XHRcdFx0XHRcdG9sZFF0eSA9IHBhcnNlRmxvYXQoJHF0eS5kYXRhKCkub2xkVmFsdWUpLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50UXR5ID0gcGFyc2VGbG9hdCgkcXR5LnZhbCgpKSxcblx0XHRcdFx0XHRcdFx0bmV3UXR5ID0gcGFyc2VGbG9hdCgkKHZhbHVlKS5maW5kKCdpbnB1dFtuYW1lPVwiY2FydF9xdWFudGl0eVtdXCJdJykudmFsKCkpO1xuXG5cdFx0XHRcdFx0XHQkcXR5LmRhdGEoJ29sZFZhbHVlJywgbmV3UXR5KTtcblxuXHRcdFx0XHRcdFx0Ly8gQWRkIG9yIHJlbW92ZSB0aGUgY2hhbmdlZCBjbGFzc2VzIGRlcGVuZGluZyBvblxuXHRcdFx0XHRcdFx0Ly8gdGhlIHF1YW50aXR5IGNoYW5nZXMgYW5kIHRoZSBvbiBwYWdlIHN0b3JlZCB2YWx1ZXNcblx0XHRcdFx0XHRcdGlmIChvbGRRdHkgPT09IGN1cnJlbnRRdHkgJiYgY3VycmVudFF0eSAhPT0gbmV3UXR5KSB7XG5cdFx0XHRcdFx0XHRcdCRxdHkuYWRkQ2xhc3Mob3B0aW9ucy5jaGFuZ2VDbGFzcyk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9sZFF0eSAhPT0gY3VycmVudFF0eSAmJiBjdXJyZW50UXR5ID09PSBuZXdRdHkpIHtcblx0XHRcdFx0XHRcdFx0JHF0eS5yZW1vdmVDbGFzcyhvcHRpb25zLmNoYW5nZUNsYXNzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQkdGFyZ2V0LmFkZCgkcm93KTtcblx0XHRcdFx0XHQkbGFzdFNjYW5uZWQgPSAkcm93O1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBVcGRhdGUgdGhlIHJlc3Qgb2YgdGhlIGZvcm1cblx0XHRcdFx0X3VwZGF0ZUZvcm0oJHRhcmdldCwgcmVzdWx0KTtcblx0XHRcdH0pLmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdFx0dXBkYXRlTGlzdCA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuICAgICAgICAvKipcblx0XHQgKiBVcGRhdGUgdGhlIGlucHV0IGNoYW5nZSBzdGF0ZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIF91cGRhdGVDaGFuZ2VTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdCRmb3JtXG5cdFx0XHRcdC5maW5kKG9wdGlvbnMuc2VsZWN0b3JNYXBwaW5nLnN1Ym1pdClcblx0XHRcdFx0LnRleHQoanNlLmNvcmUubGFuZy50cmFuc2xhdGUoaXNDaGFuZ2VkID8gJ3JlZnJlc2gnIDogJ2NoZWNrb3V0JywgJ2J1dHRvbnMnKSlcbiAgICAgICAgfTtcblxuXG4vLyAjIyMjIyMjIyMjIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdC8qKlxuXHRcdCAqIEluaXQgZnVuY3Rpb24gb2YgdGhlIHdpZGdldFxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdG1vZHVsZS5pbml0ID0gZnVuY3Rpb24oZG9uZSkge1xuXHRcdFx0XG5cdFx0XHQkdXBkYXRlVGFyZ2V0ID0gJChvcHRpb25zLnVwZGF0ZVRhcmdldCk7XG5cdFx0XHQkY2FydEVtcHR5ID0gJChvcHRpb25zLmNhcnRFbXB0eSk7XG5cdFx0XHQkY2FydE5vdEVtcHR5ID0gJChvcHRpb25zLmNhcnROb3RFbXB0eSk7XG5cdFx0XHQkZGVsZXRlRmllbGQgPSAkKG9wdGlvbnMuZGVsZXRlSW5wdXQpO1xuXHRcdFx0JGZvcm0gPSAkdGhpcy5maW5kKCdmb3JtJykuZmlyc3QoKTtcblx0XHRcdGRlbGV0ZUZpZWxkTmFtZSA9ICRkZWxldGVGaWVsZC5hdHRyKCduYW1lJyk7XG5cdFx0XHRhY3Rpb24gPSAkZm9ybS5hdHRyKCdhY3Rpb24nKTtcblx0XHRcdHRyYW5zaXRpb24gPSB7b3BlbjogdHJ1ZSwgY2xhc3NPcGVuOiBvcHRpb25zLmNsYXNzTG9hZGluZ307XG5cblx0XHRcdC8vIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGlucHV0XG5cdFx0XHQvLyB0byBhbiBoaWRkZW4gZGF0YSBhdHRyaWJ1dGVcblx0XHRcdF91cGRhdGVEYXRhVmFsdWVzKCRmb3JtKTtcblxuXHRcdFx0JGZvcm1cblx0XHRcdFx0Lm9uKCdpbnB1dCcsICdpbnB1dFt0eXBlPVwidGV4dFwiXScsIF9pbnB1dEhhbmRsZXIpXG4gICAgICAgICAgICAgICAgLm9uKCdibHVyJywgJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJywgX2JsdXJIYW5kbGVyKVxuXHRcdFx0XHQub24oJ2NsaWNrLmRlbGV0ZScsICcuYnV0dG9uLWRlbGV0ZScsIHsndHlwZSc6ICdkZWxldGUnfSwgX2NsaWNrSGFuZGxlcilcblx0XHRcdFx0Lm9uKCdjbGljay5yZWZyZXNoJywgJy5idXR0b24tcmVmcmVzaCcsIHsndHlwZSc6ICdyZWZyZXNoJ30sIF9jbGlja0hhbmRsZXIpXG5cdFx0XHRcdC5vbignY2xpY2suYWRkdG9jYXJ0JywgJy5idXR0b24tdG8tY2FydCcsIHsndHlwZSc6ICdhZGQnfSwgX2NsaWNrSGFuZGxlcilcblx0XHRcdFx0Lm9uKCdjbGljay5zdWJtaXQnLCAnLmJ1dHRvbi1zdWJtaXQnLCB7J3R5cGUnOiAnc3VibWl0J30sIF9zdWJtaXRCdXR0b25IYW5kbGVyKVxuXHRcdFx0XHQub24oJ3N1Ym1pdCcsIF9zdWJtaXRIYW5kbGVyKVxuXHRcdFx0XHQub24oanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLkNIRUNLX0NBUlQoKSwgX2NoZWNrRm9ybUhhbmRsZXIpO1xuXG5cdFx0XHRpZiAob3B0aW9ucy51cGRhdGVVcmwpIHtcblx0XHRcdFx0JHdpbmRvdy5vbignZm9jdXMnLCBfdXBkYXRlTGlzdCk7XG5cdFx0XHR9XG5cblx0XHRcdGRvbmUoKTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJuIGRhdGEgdG8gd2lkZ2V0IGVuZ2luZVxuXHRcdHJldHVybiBtb2R1bGU7XG5cdH0pO1xuIl19
