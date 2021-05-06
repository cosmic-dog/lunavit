'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* --------------------------------------------------------------
 filter.js 2018-01-22
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2018 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

gambio.widgets.module('filter', ['form', 'xhr'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $body = $('body'),
	    $preloader = null,
	    $contentWrapper = null,
	    errorTimer = null,
	    updateTimer = null,
	    filterAjax = null,
	    productsAjax = null,
	    historyAvailable = false,
	    reset = false,
	    historyPopstateEventBinded = false,
	    defaults = {
		// The url the ajax request execute against
		requestUrl: 'shop.php?do=Filter',
		// If autoUpdate is false, and this is true the product listing filter will be set to default 
		// on page reload
		resetProductlistingFilter: false,
		// If true, the product list gets updated dynamically
		autoUpdate: true,
		// The delay after a change event before an ajax gets executed
		updateDelay: 200,
		// The maximum number of retries after failures
		retries: 2,
		// After which delay the nex try will be done
		retryDelay: 500,

		selectorMapping: {
			filterForm: '.filter-box-form-wrapper',
			productsContainer: '.product-filter-target',
			filterSelectionContainer: '.filter-selection-container',
			listingPagination: '.productlisting-filter-container .panel-pagination',
			filterHiddenContainer: '.productlisting-filter-container .productlisting-filter-hiddens',
			paginationInfo: '.pagination-info'
		}
	},
	    options = $.extend(true, {}, defaults, data),
	    module = {};

	/*
  var v_selected_values_group = new Array();
  $("#menubox_body_shadow").find("span").live("click", function()
  {		
  $("#menubox_body_shadow").removeClass("error").html("");
 	 get_selected_values();
  get_available_values(0);
  });
 	 $("#menubox_filter .filter_features_link.link_list").live("click", function(){
  var t_feature_value_id = $(this).attr("rel");
  $( "#"+t_feature_value_id ).trigger("click");
  return false;
  */

	// ########## HELPER FUNCTIONS ##########

	/**
  * Helper function that updates the product list
  * and the pagination for the filter.
  * @param filterResult
  * @private
  */
	var _updateProducts = function _updateProducts(historyChange) {
		var resetParam = '';

		if (productsAjax) {
			productsAjax.abort();
		}

		if (reset) {
			resetParam = '&reset=true';
		}

		// Call the request ajax and fill the page with the delivered data
		productsAjax = $.ajax({
			url: options.requestUrl + '/GetListing&' + $this.serialize() + resetParam,
			method: 'GET',
			dataType: 'json'
		}).done(function (result) {

			// redirect if filter has been reset
			if (typeof result.redirect !== 'undefined') {
				location.href = result.redirect;
				return;
			}

			// bind _historyHandler function on popstate event not earlier than first paged content change to 
			// prevent endless popstate event triggering bug on mobile devices
			if (!historyPopstateEventBinded && options.autoUpdate) {
				$(window).on('popstate', _historyHandler);
				historyPopstateEventBinded = true;
			}

			jse.libs.template.helpers.fill(result.content, $contentWrapper, options.selectorMapping);

			var $productsContainer = $(options.selectorMapping.productsContainer);

			$productsContainer.attr('data-gambio-widget', 'cart_handler');
			gambio.widgets.init($productsContainer);

			var $productsContainerWrapper = $(options.selectorMapping.productsContainer).parent('div');

			$productsContainerWrapper.attr('data-gambio-widget', 'product_hover');
			$productsContainerWrapper.attr('data-product_hover-scope', '.productlist-viewmode-grid');
			gambio.widgets.init($productsContainerWrapper);

			if (historyAvailable && historyChange) {
				var urlParameter = decodeURIComponent($this.serialize());

				history.pushState({}, 'filter', location.origin + location.pathname + '?' + urlParameter + location.hash);
				$this.trigger('pushstate', []);
			} else {
				$this.trigger('pushstate_no_history', []);
			}
		});
	};

	/**
  * Helper function that transforms the filter
  * settings to a format that is readable by
  * the backend
  * @param       {object}        dataset             The formdata that contains the filter settings
  * @return     {*}                                 The transformed form data
  * @private
  */
	var _transform = function _transform(dataset, join) {
		var result = [];
		$.each(dataset.filter_fv_id, function (key, value) {
			if (value !== undefined && value !== false) {

				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
					var valid = [];
					$.each(value, function (k, v) {
						if (v !== false) {
							valid.push(v);
						}
					});
					if (join) {
						result.push(key + ':' + valid.join('|'));
					} else {
						result[key] = result[key] || [];
						result[key] = valid;
					}
				} else {
					result.push(key + ':' + value);
				}
			}
		});

		dataset.filter_fv_id = join ? result.join('&') : result;

		// value_conjunction is not needed for do=Filter-request and should be deleted because its length can be too
		// large for POST-data
		delete dataset.value_conjunction;

		return dataset;
	};

	/**
  * Helper function that calls the update
  * ajax and replaces the filter box with
  * the new form
  * @param       {integer}       tryCount        The count how often the ajax has failed
  * @param       {object}        formdata        The ready to use data from the form
  * @param       {boolean}       historyChange   If true, the history will be updted after the list update (if possible)
  * @private
  */
	var _update = function _update(tryCount, formdata, historyChange) {

		$preloader.removeClass('error').show();

		if (filterAjax) {
			filterAjax.abort();
		}

		filterAjax = jse.libs.xhr.ajax({
			url: options.requestUrl,
			data: formdata
		}, true).done(function (result) {
			// Update the filterbox and check if the products need to be updated automatically.
			// The elements will need to be converted again to checkbox widgets, so we will first
			// store them in a hidden div, convert them and then append them to the filter box 
			// (dirty fix because it is not otherwise possible without major refactoring ...)
			var checkboxes = $(result.content.filter.selector).find('input:checkbox').length,
			    $targets = $(result.content.filter.selector);

			if (checkboxes) {

				var $hiddenContainer = $('<div/>').appendTo('body').hide();
				// Copy the elements but leave a clone to the filter box element.
				$this.children().appendTo($hiddenContainer).clone().appendTo($this);

				jse.libs.template.helpers.fill(result.content, $hiddenContainer, options.selectorMapping);
				gambio.widgets.init($hiddenContainer);

				var intv = setInterval(function () {
					if ($hiddenContainer.find('.single-checkbox').length > 0) {
						$this.children().remove();
						$hiddenContainer.children().appendTo($this);
						$hiddenContainer.remove();

						$preloader.hide();
						if (options.autoUpdate) {
							_updateProducts(historyChange);
						}

						clearInterval(intv);
					}
				}, 300);
			} else {
				jse.libs.template.helpers.fill(result.content, $body, options.selectorMapping);
				gambio.widgets.init($targets);
				$preloader.hide();

				if (options.autoUpdate) {
					_updateProducts(historyChange);
				}
			}

			if (location.href.search(/advanced_search_result\.php/g) !== -1) {
				$('h1').css('visibility', 'hidden');
			}

			// reinitialize widgets in updated DOM
			window.gambio.widgets.init($this);
		}).fail(function () {
			if (tryCount < options.retries) {
				// Restart the update process if the
				// tryCount hasn't reached the maximum
				errorTimer = setTimeout(function () {
					_update(tryCount + 1, formdata, historyChange);
				}, options.retryDelay);
			} else {
				$preloader.addClass('error');
			}
		});
	};

	/**
  * Helper function that starts the filter
  * and page update process
  * @private
  */
	var _updateStart = function _updateStart(historyChange) {
		var dataset = jse.libs.form.getData($this);

		historyChange = historyChange !== undefined ? !!historyChange : true;

		_update(0, _transform(dataset, true), historyChange);
	};

	// ########## EVENT HANDLER #########

	/**
  * The submit event gets aborted
  * if the live update is set to true. Else
  * if the productlisiting filter shall be
  * kept, get the parameters from it and store
  * them in hidden input fields before submit
  * @param       {object}        e           jQuery event object
  * @private
  */
	var _submitHandler = function _submitHandler(e) {
		reset = false;

		if (options.autoUpdate) {
			e.preventDefault();
			e.stopPropagation();
			$.magnificPopup.close();
		} else if (!options.resetProductlistingFilter) {
			jse.libs.form.addHiddenByUrl($this);
		}
	};

	/**
  * Event handler that gets triggered
  * on every change of an input field
  * inside the filter box. It starts the
  * update process after a short delay
  * @param       {object}        e           jQuery event object
  * @private
  */
	var _changeHandler = function _changeHandler(e) {
		e.preventDefault();
		e.stopPropagation();

		clearTimeout(updateTimer);
		clearTimeout(errorTimer);

		updateTimer = setTimeout(_updateStart, options.updateDelay);
	};

	/**
  * Event handler that reacts on the reset
  * button / event. Depending on the autoUpdate
  * setting the page gets reloaded or the form
  * / products gets updated
  * @param       {object}        e           jQuery event object
  * @private
  */
	var _resetHandler = function _resetHandler(e) {
		e.preventDefault();
		e.stopPropagation();

		jse.libs.form.reset($this);
		jse.libs.form.addHiddenByUrl($this);

		reset = true;

		if (options.autoUpdate) {
			_updateStart();
		} else {
			location.href = location.pathname + '?' + $this.serialize();
		}
	};

	/**
  * Handler that listens on the popstate event.
  * In a case of a popstate, the filter will change
  * to it's previous state and will update the page
  * @private
  */
	var _historyHandler = function _historyHandler() {
		jse.libs.form.reset($this);
		jse.libs.form.prefillForm($this, jse.libs.template.helpers.getUrlParams());
		_updateStart(false);
	};

	/**
  * Handler that listens on the click event
  * of a "more" button to show all filter options
  * @private
  */
	var _clickHandler = function _clickHandler() {
		$(this).parent().removeClass('collapsed');
		$(this).hide();
	};

	/**
  * Handler that listens on the click event
  * of a filter option link to trigger the
  * change event of the belonging hidden checkbox
  *
  * @param e
  * @private
  */
	var _filterClickHandler = function _filterClickHandler(e) {
		var id = $(this).attr('rel');

		e.preventDefault();
		e.stopPropagation();

		$('#' + id).prop('checked', true).trigger('change');
	};

	// ########## INITIALIZATION ##########


	/**
  * Init function of the widget
  * @constructor
  */
	module.init = function (done) {
		$preloader = $this.find('.preloader, .preloader-message');
		$contentWrapper = $('.main-inside');
		historyAvailable = jse.core.config.get('history');

		// no auto update on start page
		if ($(options.selectorMapping.productsContainer).length === 0) {
			options.autoUpdate = false;
		}

		$this.on('change', 'select, input[type="checkbox"], input[type="text"]', _changeHandler).on('click', '.btn-link', _filterClickHandler).on('reset', _resetHandler).on('submit', _submitHandler).on('click', '.show-more', _clickHandler);

		$body.addClass('filterbox-enabled');

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvZmlsdGVyLmpzIl0sIm5hbWVzIjpbImdhbWJpbyIsIndpZGdldHMiLCJtb2R1bGUiLCJkYXRhIiwiJHRoaXMiLCIkIiwiJGJvZHkiLCIkcHJlbG9hZGVyIiwiJGNvbnRlbnRXcmFwcGVyIiwiZXJyb3JUaW1lciIsInVwZGF0ZVRpbWVyIiwiZmlsdGVyQWpheCIsInByb2R1Y3RzQWpheCIsImhpc3RvcnlBdmFpbGFibGUiLCJyZXNldCIsImhpc3RvcnlQb3BzdGF0ZUV2ZW50QmluZGVkIiwiZGVmYXVsdHMiLCJyZXF1ZXN0VXJsIiwicmVzZXRQcm9kdWN0bGlzdGluZ0ZpbHRlciIsImF1dG9VcGRhdGUiLCJ1cGRhdGVEZWxheSIsInJldHJpZXMiLCJyZXRyeURlbGF5Iiwic2VsZWN0b3JNYXBwaW5nIiwiZmlsdGVyRm9ybSIsInByb2R1Y3RzQ29udGFpbmVyIiwiZmlsdGVyU2VsZWN0aW9uQ29udGFpbmVyIiwibGlzdGluZ1BhZ2luYXRpb24iLCJmaWx0ZXJIaWRkZW5Db250YWluZXIiLCJwYWdpbmF0aW9uSW5mbyIsIm9wdGlvbnMiLCJleHRlbmQiLCJfdXBkYXRlUHJvZHVjdHMiLCJoaXN0b3J5Q2hhbmdlIiwicmVzZXRQYXJhbSIsImFib3J0IiwiYWpheCIsInVybCIsInNlcmlhbGl6ZSIsIm1ldGhvZCIsImRhdGFUeXBlIiwiZG9uZSIsInJlc3VsdCIsInJlZGlyZWN0IiwibG9jYXRpb24iLCJocmVmIiwid2luZG93Iiwib24iLCJfaGlzdG9yeUhhbmRsZXIiLCJqc2UiLCJsaWJzIiwidGVtcGxhdGUiLCJoZWxwZXJzIiwiZmlsbCIsImNvbnRlbnQiLCIkcHJvZHVjdHNDb250YWluZXIiLCJhdHRyIiwiaW5pdCIsIiRwcm9kdWN0c0NvbnRhaW5lcldyYXBwZXIiLCJwYXJlbnQiLCJ1cmxQYXJhbWV0ZXIiLCJkZWNvZGVVUklDb21wb25lbnQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwib3JpZ2luIiwicGF0aG5hbWUiLCJoYXNoIiwidHJpZ2dlciIsIl90cmFuc2Zvcm0iLCJkYXRhc2V0Iiwiam9pbiIsImVhY2giLCJmaWx0ZXJfZnZfaWQiLCJrZXkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInZhbGlkIiwiayIsInYiLCJwdXNoIiwidmFsdWVfY29uanVuY3Rpb24iLCJfdXBkYXRlIiwidHJ5Q291bnQiLCJmb3JtZGF0YSIsInJlbW92ZUNsYXNzIiwic2hvdyIsInhociIsImNoZWNrYm94ZXMiLCJmaWx0ZXIiLCJzZWxlY3RvciIsImZpbmQiLCJsZW5ndGgiLCIkdGFyZ2V0cyIsIiRoaWRkZW5Db250YWluZXIiLCJhcHBlbmRUbyIsImhpZGUiLCJjaGlsZHJlbiIsImNsb25lIiwiaW50diIsInNldEludGVydmFsIiwicmVtb3ZlIiwiY2xlYXJJbnRlcnZhbCIsInNlYXJjaCIsImNzcyIsImZhaWwiLCJzZXRUaW1lb3V0IiwiYWRkQ2xhc3MiLCJfdXBkYXRlU3RhcnQiLCJmb3JtIiwiZ2V0RGF0YSIsIl9zdWJtaXRIYW5kbGVyIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwibWFnbmlmaWNQb3B1cCIsImNsb3NlIiwiYWRkSGlkZGVuQnlVcmwiLCJfY2hhbmdlSGFuZGxlciIsImNsZWFyVGltZW91dCIsIl9yZXNldEhhbmRsZXIiLCJwcmVmaWxsRm9ybSIsImdldFVybFBhcmFtcyIsIl9jbGlja0hhbmRsZXIiLCJfZmlsdGVyQ2xpY2tIYW5kbGVyIiwiaWQiLCJwcm9wIiwiY29yZSIsImNvbmZpZyIsImdldCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7O0FBVUFBLE9BQU9DLE9BQVAsQ0FBZUMsTUFBZixDQUNDLFFBREQsRUFHQyxDQUFDLE1BQUQsRUFBUyxLQUFULENBSEQsRUFLQyxVQUFTQyxJQUFULEVBQWU7O0FBRWQ7O0FBRUY7O0FBRUUsS0FBSUMsUUFBUUMsRUFBRSxJQUFGLENBQVo7QUFBQSxLQUNDQyxRQUFRRCxFQUFFLE1BQUYsQ0FEVDtBQUFBLEtBRUNFLGFBQWEsSUFGZDtBQUFBLEtBR0ND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QXNCLENBQVNaLENBQVQsRUFBWTtBQUNyQyxNQUFJYSxLQUFLdkgsRUFBRSxJQUFGLEVBQVFtRCxJQUFSLENBQWEsS0FBYixDQUFUOztBQUVBdUQsSUFBRUMsY0FBRjtBQUNBRCxJQUFFRSxlQUFGOztBQUVBNUcsSUFBRSxNQUFNdUgsRUFBUixFQUFZQyxJQUFaLENBQWlCLFNBQWpCLEVBQTRCLElBQTVCLEVBQWtDMUQsT0FBbEMsQ0FBMEMsUUFBMUM7QUFDQSxFQVBEOztBQVNGOzs7QUFHRTs7OztBQUlBakUsUUFBT3VELElBQVAsR0FBYyxVQUFTaEIsSUFBVCxFQUFlO0FBQzVCbEMsZUFBYUgsTUFBTXNGLElBQU4sQ0FBVyxnQ0FBWCxDQUFiO0FBQ0FsRixvQkFBa0JILEVBQUUsY0FBRixDQUFsQjtBQUNBUSxxQkFBbUJvQyxJQUFJNkUsSUFBSixDQUFTQyxNQUFULENBQWdCQyxHQUFoQixDQUFvQixTQUFwQixDQUFuQjs7QUFFQTtBQUNBLE1BQUczSCxFQUFFeUIsUUFBUVAsZUFBUixDQUF3QkUsaUJBQTFCLEVBQTZDa0UsTUFBN0MsS0FBd0QsQ0FBM0QsRUFBOEQ7QUFDN0Q3RCxXQUFRWCxVQUFSLEdBQXFCLEtBQXJCO0FBQ0E7O0FBRURmLFFBQ0UyQyxFQURGLENBQ0ssUUFETCxFQUNlLG9EQURmLEVBQ3FFc0UsY0FEckUsRUFFRXRFLEVBRkYsQ0FFSyxPQUZMLEVBRWMsV0FGZCxFQUUyQjRFLG1CQUYzQixFQUdFNUUsRUFIRixDQUdLLE9BSEwsRUFHY3dFLGFBSGQsRUFJRXhFLEVBSkYsQ0FJSyxRQUpMLEVBSWUrRCxjQUpmLEVBS0UvRCxFQUxGLENBS0ssT0FMTCxFQUtjLFlBTGQsRUFLNEIyRSxhQUw1Qjs7QUFPQXBILFFBQU1vRyxRQUFOLENBQWUsbUJBQWY7O0FBRUFqRTtBQUNBLEVBcEJEOztBQXNCQTtBQUNBLFFBQU92QyxNQUFQO0FBQ0EsQ0F4WkYiLCJmaWxlIjoid2lkZ2V0cy9maWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIGZpbHRlci5qcyAyMDE4LTAxLTIyXG4gR2FtYmlvIEdtYkhcbiBodHRwOi8vd3d3LmdhbWJpby5kZVxuIENvcHlyaWdodCAoYykgMjAxOCBHYW1iaW8gR21iSFxuIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuIFtodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZ2FtYmlvLndpZGdldHMubW9kdWxlKFxuXHQnZmlsdGVyJyxcblxuXHRbJ2Zvcm0nLCAneGhyJ10sXG5cblx0ZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0J3VzZSBzdHJpY3QnO1xuXG4vLyAjIyMjIyMjIyMjIFZBUklBQkxFIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHQkYm9keSA9ICQoJ2JvZHknKSxcblx0XHRcdCRwcmVsb2FkZXIgPSBudWxsLFxuXHRcdFx0JGNvbnRlbnRXcmFwcGVyID0gbnVsbCxcblx0XHRcdGVycm9yVGltZXIgPSBudWxsLFxuXHRcdFx0dXBkYXRlVGltZXIgPSBudWxsLFxuXHRcdFx0ZmlsdGVyQWpheCA9IG51bGwsXG5cdFx0XHRwcm9kdWN0c0FqYXggPSBudWxsLFxuXHRcdFx0aGlzdG9yeUF2YWlsYWJsZSA9IGZhbHNlLFxuXHRcdFx0cmVzZXQgPSBmYWxzZSxcblx0XHRcdGhpc3RvcnlQb3BzdGF0ZUV2ZW50QmluZGVkID0gZmFsc2UsXG5cdFx0XHRkZWZhdWx0cyA9IHtcblx0XHRcdFx0Ly8gVGhlIHVybCB0aGUgYWpheCByZXF1ZXN0IGV4ZWN1dGUgYWdhaW5zdFxuXHRcdFx0XHRyZXF1ZXN0VXJsOiAnc2hvcC5waHA/ZG89RmlsdGVyJyxcblx0XHRcdFx0Ly8gSWYgYXV0b1VwZGF0ZSBpcyBmYWxzZSwgYW5kIHRoaXMgaXMgdHJ1ZSB0aGUgcHJvZHVjdCBsaXN0aW5nIGZpbHRlciB3aWxsIGJlIHNldCB0byBkZWZhdWx0IFxuXHRcdFx0XHQvLyBvbiBwYWdlIHJlbG9hZFxuXHRcdFx0XHRyZXNldFByb2R1Y3RsaXN0aW5nRmlsdGVyOiBmYWxzZSxcblx0XHRcdFx0Ly8gSWYgdHJ1ZSwgdGhlIHByb2R1Y3QgbGlzdCBnZXRzIHVwZGF0ZWQgZHluYW1pY2FsbHlcblx0XHRcdFx0YXV0b1VwZGF0ZTogdHJ1ZSxcblx0XHRcdFx0Ly8gVGhlIGRlbGF5IGFmdGVyIGEgY2hhbmdlIGV2ZW50IGJlZm9yZSBhbiBhamF4IGdldHMgZXhlY3V0ZWRcblx0XHRcdFx0dXBkYXRlRGVsYXk6IDIwMCxcblx0XHRcdFx0Ly8gVGhlIG1heGltdW0gbnVtYmVyIG9mIHJldHJpZXMgYWZ0ZXIgZmFpbHVyZXNcblx0XHRcdFx0cmV0cmllczogMixcblx0XHRcdFx0Ly8gQWZ0ZXIgd2hpY2ggZGVsYXkgdGhlIG5leCB0cnkgd2lsbCBiZSBkb25lXG5cdFx0XHRcdHJldHJ5RGVsYXk6IDUwMCxcblx0XHRcdFx0XG5cdFx0XHRcdHNlbGVjdG9yTWFwcGluZzoge1xuXHRcdFx0XHRcdGZpbHRlckZvcm06ICcuZmlsdGVyLWJveC1mb3JtLXdyYXBwZXInLFxuXHRcdFx0XHRcdHByb2R1Y3RzQ29udGFpbmVyOiAnLnByb2R1Y3QtZmlsdGVyLXRhcmdldCcsXG5cdFx0XHRcdFx0ZmlsdGVyU2VsZWN0aW9uQ29udGFpbmVyOiAnLmZpbHRlci1zZWxlY3Rpb24tY29udGFpbmVyJyxcblx0XHRcdFx0XHRsaXN0aW5nUGFnaW5hdGlvbjogJy5wcm9kdWN0bGlzdGluZy1maWx0ZXItY29udGFpbmVyIC5wYW5lbC1wYWdpbmF0aW9uJyxcblx0XHRcdFx0XHRmaWx0ZXJIaWRkZW5Db250YWluZXI6ICcucHJvZHVjdGxpc3RpbmctZmlsdGVyLWNvbnRhaW5lciAucHJvZHVjdGxpc3RpbmctZmlsdGVyLWhpZGRlbnMnLFxuXHRcdFx0XHRcdHBhZ2luYXRpb25JbmZvOiAnLnBhZ2luYXRpb24taW5mbydcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGRhdGEpLFxuXHRcdFx0bW9kdWxlID0ge307XG5cblxuXHRcdC8qXG5cdFx0IHZhciB2X3NlbGVjdGVkX3ZhbHVlc19ncm91cCA9IG5ldyBBcnJheSgpO1xuXHRcdCAkKFwiI21lbnVib3hfYm9keV9zaGFkb3dcIikuZmluZChcInNwYW5cIikubGl2ZShcImNsaWNrXCIsIGZ1bmN0aW9uKClcblx0XHQge1x0XHRcblx0XHQgJChcIiNtZW51Ym94X2JvZHlfc2hhZG93XCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIikuaHRtbChcIlwiKTtcblxuXHRcdCBnZXRfc2VsZWN0ZWRfdmFsdWVzKCk7XG5cdFx0IGdldF9hdmFpbGFibGVfdmFsdWVzKDApO1xuXHRcdCB9KTtcblxuXHRcdCAkKFwiI21lbnVib3hfZmlsdGVyIC5maWx0ZXJfZmVhdHVyZXNfbGluay5saW5rX2xpc3RcIikubGl2ZShcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG5cdFx0IHZhciB0X2ZlYXR1cmVfdmFsdWVfaWQgPSAkKHRoaXMpLmF0dHIoXCJyZWxcIik7XG5cdFx0ICQoIFwiI1wiK3RfZmVhdHVyZV92YWx1ZV9pZCApLnRyaWdnZXIoXCJjbGlja1wiKTtcblx0XHQgcmV0dXJuIGZhbHNlO1xuXHRcdCAqL1xuXG4vLyAjIyMjIyMjIyMjIEhFTFBFUiBGVU5DVElPTlMgIyMjIyMjIyMjI1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyB0aGUgcHJvZHVjdCBsaXN0XG5cdFx0ICogYW5kIHRoZSBwYWdpbmF0aW9uIGZvciB0aGUgZmlsdGVyLlxuXHRcdCAqIEBwYXJhbSBmaWx0ZXJSZXN1bHRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfdXBkYXRlUHJvZHVjdHMgPSBmdW5jdGlvbihoaXN0b3J5Q2hhbmdlKSB7XG5cdFx0XHR2YXIgcmVzZXRQYXJhbSA9ICcnO1xuXHRcdFx0XG5cdFx0XHRpZiAocHJvZHVjdHNBamF4KSB7XG5cdFx0XHRcdHByb2R1Y3RzQWpheC5hYm9ydCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVzZXQpIHtcblx0XHRcdFx0cmVzZXRQYXJhbSA9ICcmcmVzZXQ9dHJ1ZSc7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIENhbGwgdGhlIHJlcXVlc3QgYWpheCBhbmQgZmlsbCB0aGUgcGFnZSB3aXRoIHRoZSBkZWxpdmVyZWQgZGF0YVxuXHRcdFx0cHJvZHVjdHNBamF4ID0gJC5hamF4KHtcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgIHVybDogb3B0aW9ucy5yZXF1ZXN0VXJsICsgJy9HZXRMaXN0aW5nJicgKyAkdGhpcy5zZXJpYWxpemUoKSArIHJlc2V0UGFyYW0sXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdFxuXHRcdFx0ICAgIC8vIHJlZGlyZWN0IGlmIGZpbHRlciBoYXMgYmVlbiByZXNldFxuXHRcdFx0XHRpZiAodHlwZW9mIHJlc3VsdC5yZWRpcmVjdCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gcmVzdWx0LnJlZGlyZWN0O1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gYmluZCBfaGlzdG9yeUhhbmRsZXIgZnVuY3Rpb24gb24gcG9wc3RhdGUgZXZlbnQgbm90IGVhcmxpZXIgdGhhbiBmaXJzdCBwYWdlZCBjb250ZW50IGNoYW5nZSB0byBcblx0XHRcdFx0Ly8gcHJldmVudCBlbmRsZXNzIHBvcHN0YXRlIGV2ZW50IHRyaWdnZXJpbmcgYnVnIG9uIG1vYmlsZSBkZXZpY2VzXG5cdFx0XHRcdGlmICghaGlzdG9yeVBvcHN0YXRlRXZlbnRCaW5kZWQgJiYgb3B0aW9ucy5hdXRvVXBkYXRlKSB7XG5cdFx0XHRcdFx0JCh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIF9oaXN0b3J5SGFuZGxlcik7XG5cdFx0XHRcdFx0aGlzdG9yeVBvcHN0YXRlRXZlbnRCaW5kZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRqc2UubGlicy50ZW1wbGF0ZS5oZWxwZXJzLmZpbGwocmVzdWx0LmNvbnRlbnQsICRjb250ZW50V3JhcHBlciwgb3B0aW9ucy5zZWxlY3Rvck1hcHBpbmcpO1xuXHRcdFx0XHRcblx0XHRcdFx0dmFyICRwcm9kdWN0c0NvbnRhaW5lciA9ICQob3B0aW9ucy5zZWxlY3Rvck1hcHBpbmcucHJvZHVjdHNDb250YWluZXIpO1xuXHRcdFx0XHRcblx0XHRcdFx0JHByb2R1Y3RzQ29udGFpbmVyLmF0dHIoJ2RhdGEtZ2FtYmlvLXdpZGdldCcsICdjYXJ0X2hhbmRsZXInKTtcblx0XHRcdFx0Z2FtYmlvLndpZGdldHMuaW5pdCgkcHJvZHVjdHNDb250YWluZXIpO1xuXHRcdFx0XHRcblx0XHRcdFx0dmFyICRwcm9kdWN0c0NvbnRhaW5lcldyYXBwZXIgPSAkKG9wdGlvbnMuc2VsZWN0b3JNYXBwaW5nLnByb2R1Y3RzQ29udGFpbmVyKS5wYXJlbnQoJ2RpdicpO1xuXHRcdFx0XHRcblx0XHRcdFx0JHByb2R1Y3RzQ29udGFpbmVyV3JhcHBlci5hdHRyKCdkYXRhLWdhbWJpby13aWRnZXQnLCAncHJvZHVjdF9ob3ZlcicpO1xuXHRcdFx0XHQkcHJvZHVjdHNDb250YWluZXJXcmFwcGVyLmF0dHIoJ2RhdGEtcHJvZHVjdF9ob3Zlci1zY29wZScsICcucHJvZHVjdGxpc3Qtdmlld21vZGUtZ3JpZCcpO1xuXHRcdFx0XHRnYW1iaW8ud2lkZ2V0cy5pbml0KCRwcm9kdWN0c0NvbnRhaW5lcldyYXBwZXIpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKGhpc3RvcnlBdmFpbGFibGUgJiYgaGlzdG9yeUNoYW5nZSkge1xuXHRcdFx0XHRcdHZhciB1cmxQYXJhbWV0ZXIgPSBkZWNvZGVVUklDb21wb25lbnQoJHRoaXMuc2VyaWFsaXplKCkpO1xuXG5cdFx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUoe30sICdmaWx0ZXInLCBsb2NhdGlvbi5vcmlnaW4gKyBsb2NhdGlvbi5wYXRobmFtZSArICc/JyArIHVybFBhcmFtZXRlclxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICsgbG9jYXRpb24uaGFzaCk7XG5cdFx0XHRcdFx0JHRoaXMudHJpZ2dlcigncHVzaHN0YXRlJywgW10pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCR0aGlzLnRyaWdnZXIoJ3B1c2hzdGF0ZV9ub19oaXN0b3J5JywgW10pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgdHJhbnNmb3JtcyB0aGUgZmlsdGVyXG5cdFx0ICogc2V0dGluZ3MgdG8gYSBmb3JtYXQgdGhhdCBpcyByZWFkYWJsZSBieVxuXHRcdCAqIHRoZSBiYWNrZW5kXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgICAgICBkYXRhc2V0ICAgICAgICAgICAgIFRoZSBmb3JtZGF0YSB0aGF0IGNvbnRhaW5zIHRoZSBmaWx0ZXIgc2V0dGluZ3Ncblx0XHQgKiBAcmV0dXJuICAgICB7Kn0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgdHJhbnNmb3JtZWQgZm9ybSBkYXRhXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3RyYW5zZm9ybSA9IGZ1bmN0aW9uKGRhdGFzZXQsIGpvaW4pIHtcblx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdCQuZWFjaChkYXRhc2V0LmZpbHRlcl9mdl9pZCwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gZmFsc2UpIHtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR2YXIgdmFsaWQgPSBbXTtcblx0XHRcdFx0XHRcdCQuZWFjaCh2YWx1ZSwgZnVuY3Rpb24oaywgdikge1xuXHRcdFx0XHRcdFx0XHRpZiAodiAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0XHR2YWxpZC5wdXNoKHYpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmIChqb2luKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGtleSArICc6JyArIHZhbGlkLmpvaW4oJ3wnKSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHJlc3VsdFtrZXldIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHZhbGlkO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChrZXkgKyAnOicgKyB2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0ZGF0YXNldC5maWx0ZXJfZnZfaWQgPSAoam9pbikgPyByZXN1bHQuam9pbignJicpIDogcmVzdWx0O1xuXHRcdFx0XG5cdFx0XHQvLyB2YWx1ZV9jb25qdW5jdGlvbiBpcyBub3QgbmVlZGVkIGZvciBkbz1GaWx0ZXItcmVxdWVzdCBhbmQgc2hvdWxkIGJlIGRlbGV0ZWQgYmVjYXVzZSBpdHMgbGVuZ3RoIGNhbiBiZSB0b29cblx0XHRcdC8vIGxhcmdlIGZvciBQT1NULWRhdGFcblx0XHRcdGRlbGV0ZSBkYXRhc2V0LnZhbHVlX2Nvbmp1bmN0aW9uO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gZGF0YXNldDtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIHVwZGF0ZVxuXHRcdCAqIGFqYXggYW5kIHJlcGxhY2VzIHRoZSBmaWx0ZXIgYm94IHdpdGhcblx0XHQgKiB0aGUgbmV3IGZvcm1cblx0XHQgKiBAcGFyYW0gICAgICAge2ludGVnZXJ9ICAgICAgIHRyeUNvdW50ICAgICAgICBUaGUgY291bnQgaG93IG9mdGVuIHRoZSBhamF4IGhhcyBmYWlsZWRcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgICAgIGZvcm1kYXRhICAgICAgICBUaGUgcmVhZHkgdG8gdXNlIGRhdGEgZnJvbSB0aGUgZm9ybVxuXHRcdCAqIEBwYXJhbSAgICAgICB7Ym9vbGVhbn0gICAgICAgaGlzdG9yeUNoYW5nZSAgIElmIHRydWUsIHRoZSBoaXN0b3J5IHdpbGwgYmUgdXBkdGVkIGFmdGVyIHRoZSBsaXN0IHVwZGF0ZSAoaWYgcG9zc2libGUpXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3VwZGF0ZSA9IGZ1bmN0aW9uKHRyeUNvdW50LCBmb3JtZGF0YSwgaGlzdG9yeUNoYW5nZSkge1xuXG5cdFx0XHQkcHJlbG9hZGVyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnZXJyb3InKVxuXHRcdFx0XHQuc2hvdygpO1xuXG5cdFx0XHRpZiAoZmlsdGVyQWpheCkge1xuXHRcdFx0XHRmaWx0ZXJBamF4LmFib3J0KCk7XG5cdFx0XHR9XG5cblx0XHRcdGZpbHRlckFqYXggPSBqc2UubGlicy54aHIuYWpheCh7XG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IG9wdGlvbnMucmVxdWVzdFVybCxcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGZvcm1kYXRhXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSkuZG9uZShmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBmaWx0ZXJib3ggYW5kIGNoZWNrIGlmIHRoZSBwcm9kdWN0cyBuZWVkIHRvIGJlIHVwZGF0ZWQgYXV0b21hdGljYWxseS5cblx0XHRcdFx0Ly8gVGhlIGVsZW1lbnRzIHdpbGwgbmVlZCB0byBiZSBjb252ZXJ0ZWQgYWdhaW4gdG8gY2hlY2tib3ggd2lkZ2V0cywgc28gd2Ugd2lsbCBmaXJzdFxuXHRcdFx0XHQvLyBzdG9yZSB0aGVtIGluIGEgaGlkZGVuIGRpdiwgY29udmVydCB0aGVtIGFuZCB0aGVuIGFwcGVuZCB0aGVtIHRvIHRoZSBmaWx0ZXIgYm94IFxuXHRcdFx0XHQvLyAoZGlydHkgZml4IGJlY2F1c2UgaXQgaXMgbm90IG90aGVyd2lzZSBwb3NzaWJsZSB3aXRob3V0IG1ham9yIHJlZmFjdG9yaW5nIC4uLilcblx0XHRcdFx0dmFyIGNoZWNrYm94ZXMgPSAkKHJlc3VsdC5jb250ZW50LmZpbHRlci5zZWxlY3Rvcilcblx0XHRcdFx0XHQuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKVxuXHRcdFx0XHRcdFx0Lmxlbmd0aCxcblx0XHRcdFx0XHQkdGFyZ2V0cyA9ICQocmVzdWx0LmNvbnRlbnQuZmlsdGVyLnNlbGVjdG9yKTtcblxuXHRcdFx0XHRpZiAoY2hlY2tib3hlcykge1xuXG5cdFx0XHRcdFx0dmFyICRoaWRkZW5Db250YWluZXIgPSAkKCc8ZGl2Lz4nKS5hcHBlbmRUbygnYm9keScpLmhpZGUoKTtcblx0XHRcdFx0XHQvLyBDb3B5IHRoZSBlbGVtZW50cyBidXQgbGVhdmUgYSBjbG9uZSB0byB0aGUgZmlsdGVyIGJveCBlbGVtZW50LlxuXHRcdFx0XHRcdCR0aGlzLmNoaWxkcmVuKCkuYXBwZW5kVG8oJGhpZGRlbkNvbnRhaW5lcikuY2xvbmUoKS5hcHBlbmRUbygkdGhpcyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0anNlLmxpYnMudGVtcGxhdGUuaGVscGVycy5maWxsKHJlc3VsdC5jb250ZW50LCAkaGlkZGVuQ29udGFpbmVyLCBvcHRpb25zLnNlbGVjdG9yTWFwcGluZyk7XG5cdFx0XHRcdFx0Z2FtYmlvLndpZGdldHMuaW5pdCgkaGlkZGVuQ29udGFpbmVyKTtcblxuXHRcdFx0XHRcdHZhciBpbnR2ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoJGhpZGRlbkNvbnRhaW5lci5maW5kKCcuc2luZ2xlLWNoZWNrYm94JykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHQkdGhpcy5jaGlsZHJlbigpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHQkaGlkZGVuQ29udGFpbmVyLmNoaWxkcmVuKCkuYXBwZW5kVG8oJHRoaXMpO1xuXHRcdFx0XHRcdFx0XHQkaGlkZGVuQ29udGFpbmVyLnJlbW92ZSgpO1xuXG5cdFx0XHRcdFx0XHRcdCRwcmVsb2FkZXIuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5hdXRvVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3VwZGF0ZVByb2R1Y3RzKGhpc3RvcnlDaGFuZ2UpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChpbnR2KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH0sIDMwMCk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRqc2UubGlicy50ZW1wbGF0ZS5oZWxwZXJzLmZpbGwocmVzdWx0LmNvbnRlbnQsICRib2R5LCBvcHRpb25zLnNlbGVjdG9yTWFwcGluZyk7XG5cdFx0XHRcdFx0Z2FtYmlvLndpZGdldHMuaW5pdCgkdGFyZ2V0cyk7XG5cdFx0XHRcdFx0JHByZWxvYWRlci5oaWRlKCk7XG5cblx0XHRcdFx0XHRpZiAob3B0aW9ucy5hdXRvVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRfdXBkYXRlUHJvZHVjdHMoaGlzdG9yeUNoYW5nZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAobG9jYXRpb24uaHJlZi5zZWFyY2goL2FkdmFuY2VkX3NlYXJjaF9yZXN1bHRcXC5waHAvZykgIT09IC0xKSB7XG5cdFx0XHRcdFx0JCgnaDEnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdC8vIHJlaW5pdGlhbGl6ZSB3aWRnZXRzIGluIHVwZGF0ZWQgRE9NXG5cdFx0XHRcdHdpbmRvdy5nYW1iaW8ud2lkZ2V0cy5pbml0KCR0aGlzKTtcblx0XHRcdFx0XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAodHJ5Q291bnQgPCBvcHRpb25zLnJldHJpZXMpIHtcblx0XHRcdFx0XHQvLyBSZXN0YXJ0IHRoZSB1cGRhdGUgcHJvY2VzcyBpZiB0aGVcblx0XHRcdFx0XHQvLyB0cnlDb3VudCBoYXNuJ3QgcmVhY2hlZCB0aGUgbWF4aW11bVxuXHRcdFx0XHRcdGVycm9yVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0X3VwZGF0ZSh0cnlDb3VudCArIDEsIGZvcm1kYXRhLCBoaXN0b3J5Q2hhbmdlKTtcblx0XHRcdFx0XHR9LCBvcHRpb25zLnJldHJ5RGVsYXkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRwcmVsb2FkZXIuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHN0YXJ0cyB0aGUgZmlsdGVyXG5cdFx0ICogYW5kIHBhZ2UgdXBkYXRlIHByb2Nlc3Ncblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfdXBkYXRlU3RhcnQgPSBmdW5jdGlvbihoaXN0b3J5Q2hhbmdlKSB7XG5cdFx0XHR2YXIgZGF0YXNldCA9IGpzZS5saWJzLmZvcm0uZ2V0RGF0YSgkdGhpcyk7XG5cblx0XHRcdGhpc3RvcnlDaGFuZ2UgPSAoaGlzdG9yeUNoYW5nZSAhPT0gdW5kZWZpbmVkKSA/ICEhaGlzdG9yeUNoYW5nZSA6IHRydWU7XG5cblx0XHRcdF91cGRhdGUoMCwgX3RyYW5zZm9ybShkYXRhc2V0LCB0cnVlKSwgaGlzdG9yeUNoYW5nZSk7XG5cdFx0fTtcblxuXG4vLyAjIyMjIyMjIyMjIEVWRU5UIEhBTkRMRVIgIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBUaGUgc3VibWl0IGV2ZW50IGdldHMgYWJvcnRlZFxuXHRcdCAqIGlmIHRoZSBsaXZlIHVwZGF0ZSBpcyBzZXQgdG8gdHJ1ZS4gRWxzZVxuXHRcdCAqIGlmIHRoZSBwcm9kdWN0bGlzaXRpbmcgZmlsdGVyIHNoYWxsIGJlXG5cdFx0ICoga2VwdCwgZ2V0IHRoZSBwYXJhbWV0ZXJzIGZyb20gaXQgYW5kIHN0b3JlXG5cdFx0ICogdGhlbSBpbiBoaWRkZW4gaW5wdXQgZmllbGRzIGJlZm9yZSBzdWJtaXRcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgICAgIGUgICAgICAgICAgIGpRdWVyeSBldmVudCBvYmplY3Rcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfc3VibWl0SGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHJlc2V0ID0gZmFsc2U7XG5cdFx0XHRcblx0XHRcdGlmIChvcHRpb25zLmF1dG9VcGRhdGUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHQkLm1hZ25pZmljUG9wdXAuY2xvc2UoKVxuXHRcdFx0fSBlbHNlIGlmICghb3B0aW9ucy5yZXNldFByb2R1Y3RsaXN0aW5nRmlsdGVyKSB7XG5cdFx0XHRcdGpzZS5saWJzLmZvcm0uYWRkSGlkZGVuQnlVcmwoJHRoaXMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBFdmVudCBoYW5kbGVyIHRoYXQgZ2V0cyB0cmlnZ2VyZWRcblx0XHQgKiBvbiBldmVyeSBjaGFuZ2Ugb2YgYW4gaW5wdXQgZmllbGRcblx0XHQgKiBpbnNpZGUgdGhlIGZpbHRlciBib3guIEl0IHN0YXJ0cyB0aGVcblx0XHQgKiB1cGRhdGUgcHJvY2VzcyBhZnRlciBhIHNob3J0IGRlbGF5XG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgICAgICBlICAgICAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2NoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRjbGVhclRpbWVvdXQodXBkYXRlVGltZXIpO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KGVycm9yVGltZXIpO1xuXG5cdFx0XHR1cGRhdGVUaW1lciA9IHNldFRpbWVvdXQoX3VwZGF0ZVN0YXJ0LCBvcHRpb25zLnVwZGF0ZURlbGF5KTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRXZlbnQgaGFuZGxlciB0aGF0IHJlYWN0cyBvbiB0aGUgcmVzZXRcblx0XHQgKiBidXR0b24gLyBldmVudC4gRGVwZW5kaW5nIG9uIHRoZSBhdXRvVXBkYXRlXG5cdFx0ICogc2V0dGluZyB0aGUgcGFnZSBnZXRzIHJlbG9hZGVkIG9yIHRoZSBmb3JtXG5cdFx0ICogLyBwcm9kdWN0cyBnZXRzIHVwZGF0ZWRcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgICAgIGUgICAgICAgICAgIGpRdWVyeSBldmVudCBvYmplY3Rcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfcmVzZXRIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0anNlLmxpYnMuZm9ybS5yZXNldCgkdGhpcyk7XG5cdFx0XHRqc2UubGlicy5mb3JtLmFkZEhpZGRlbkJ5VXJsKCR0aGlzKTtcblxuXHRcdFx0cmVzZXQgPSB0cnVlO1xuXHRcdFx0XG5cdFx0XHRpZiAob3B0aW9ucy5hdXRvVXBkYXRlKSB7XG5cdFx0XHRcdF91cGRhdGVTdGFydCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9jYXRpb24uaHJlZiA9IGxvY2F0aW9uLnBhdGhuYW1lICsgJz8nICsgJHRoaXMuc2VyaWFsaXplKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhhbmRsZXIgdGhhdCBsaXN0ZW5zIG9uIHRoZSBwb3BzdGF0ZSBldmVudC5cblx0XHQgKiBJbiBhIGNhc2Ugb2YgYSBwb3BzdGF0ZSwgdGhlIGZpbHRlciB3aWxsIGNoYW5nZVxuXHRcdCAqIHRvIGl0J3MgcHJldmlvdXMgc3RhdGUgYW5kIHdpbGwgdXBkYXRlIHRoZSBwYWdlXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2hpc3RvcnlIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRqc2UubGlicy5mb3JtLnJlc2V0KCR0aGlzKTtcblx0XHRcdGpzZS5saWJzLmZvcm0ucHJlZmlsbEZvcm0oJHRoaXMsIGpzZS5saWJzLnRlbXBsYXRlLmhlbHBlcnMuZ2V0VXJsUGFyYW1zKCkpO1xuXHRcdFx0X3VwZGF0ZVN0YXJ0KGZhbHNlKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGFuZGxlciB0aGF0IGxpc3RlbnMgb24gdGhlIGNsaWNrIGV2ZW50XG5cdFx0ICogb2YgYSBcIm1vcmVcIiBidXR0b24gdG8gc2hvdyBhbGwgZmlsdGVyIG9wdGlvbnNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcblx0XHRcdCQodGhpcykuaGlkZSgpO1xuXHRcdH07XG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogSGFuZGxlciB0aGF0IGxpc3RlbnMgb24gdGhlIGNsaWNrIGV2ZW50XG5cdFx0ICogb2YgYSBmaWx0ZXIgb3B0aW9uIGxpbmsgdG8gdHJpZ2dlciB0aGVcblx0XHQgKiBjaGFuZ2UgZXZlbnQgb2YgdGhlIGJlbG9uZ2luZyBoaWRkZW4gY2hlY2tib3hcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBlXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2ZpbHRlckNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciBpZCA9ICQodGhpcykuYXR0cigncmVsJyk7XG5cdFx0XHRcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcblx0XHRcdCQoJyMnICsgaWQpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHR9O1xuXG4vLyAjIyMjIyMjIyMjIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXG5cdFx0LyoqXG5cdFx0ICogSW5pdCBmdW5jdGlvbiBvZiB0aGUgd2lkZ2V0XG5cdFx0ICogQGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0bW9kdWxlLmluaXQgPSBmdW5jdGlvbihkb25lKSB7XG5cdFx0XHQkcHJlbG9hZGVyID0gJHRoaXMuZmluZCgnLnByZWxvYWRlciwgLnByZWxvYWRlci1tZXNzYWdlJyk7XG5cdFx0XHQkY29udGVudFdyYXBwZXIgPSAkKCcubWFpbi1pbnNpZGUnKTtcblx0XHRcdGhpc3RvcnlBdmFpbGFibGUgPSBqc2UuY29yZS5jb25maWcuZ2V0KCdoaXN0b3J5Jyk7XG5cblx0XHRcdC8vIG5vIGF1dG8gdXBkYXRlIG9uIHN0YXJ0IHBhZ2Vcblx0XHRcdGlmKCQob3B0aW9ucy5zZWxlY3Rvck1hcHBpbmcucHJvZHVjdHNDb250YWluZXIpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRvcHRpb25zLmF1dG9VcGRhdGUgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0JHRoaXNcblx0XHRcdFx0Lm9uKCdjaGFuZ2UnLCAnc2VsZWN0LCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJywgX2NoYW5nZUhhbmRsZXIpXG5cdFx0XHRcdC5vbignY2xpY2snLCAnLmJ0bi1saW5rJywgX2ZpbHRlckNsaWNrSGFuZGxlcilcblx0XHRcdFx0Lm9uKCdyZXNldCcsIF9yZXNldEhhbmRsZXIpXG5cdFx0XHRcdC5vbignc3VibWl0JywgX3N1Ym1pdEhhbmRsZXIpXG5cdFx0XHRcdC5vbignY2xpY2snLCAnLnNob3ctbW9yZScsIF9jbGlja0hhbmRsZXIpO1xuXG5cdFx0XHQkYm9keS5hZGRDbGFzcygnZmlsdGVyYm94LWVuYWJsZWQnKTtcblxuXHRcdFx0ZG9uZSgpO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm4gZGF0YSB0byB3aWRnZXQgZW5naW5lXG5cdFx0cmV0dXJuIG1vZHVsZTtcblx0fSk7Il19
