'use strict';

/* --------------------------------------------------------------
 customizer.js 2016-07-13
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2016 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

gambio.widgets.module('customizer', [jse.source + '/vendor/jquery-ui/jquery-ui.min.js', gambio.source + '/libs/events'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $body = $('body'),
	    $window = $(window),
	    ajax = null,
	    defaults = {
		requestUrl: 'request_port.php?module=GPrint',
		uidSelector: '#gm_gprint_random',
		page: 'product'
	},
	    options = $.extend(true, {}, defaults, data),
	    module = {};

	/**
  * Add customizer data to cart or wish list.
  *
  * @private
  */
	var _addCustomizerData = function _addCustomizerData(e, d) {

		var formdata = jse.libs.form.getData($this, null, true),
		    dataset = $.extend({ 'mode': 'frontend', 'action': e.data.action }, d.dataset, {}, formdata),
		    promises = [],
		    attributeIdsString = '';

		$('.customizer select[name^="id["], .customizer input[name^="id["]:checked').each(function () {
			var optionId = $(this).attr('name').replace(/id\[(\d+)\]/, '$1');
			attributeIdsString += '{' + optionId + '}' + $(this).val();
		});

		dataset.products_id = dataset.products_id + attributeIdsString + '{' + e.data.random.match(/\d+/) + '}0';

		$this.find('input[type="file"]').each(function () {
			if ($(this).get(0).files.length > 0) {
				var deferred = $.Deferred();
				promises.push(deferred);

				$(this).hide();
				$(this).parent().append('<img src="gm/images/gprint/upload.gif" width="16" height="11" ' + 'class="gm_gprint_loading" id="loading_' + $(this).attr('id') + '" />');

				_upload($(this), dataset, deferred);
			}
		});

		if (promises.length) {
			$.when.apply(undefined, promises).done(function () {
				_send_customizer_data(e, d, dataset);
			}).always(function () {
				var test = 1;
			});
		} else {
			_send_customizer_data(e, d, dataset);
		}
	};

	/**
  * Upload files from customizer form.
  *
  * @private
  */
	var _upload = function _upload(uploadField, dataset, deferred) {
		var filesList = uploadField.get(0).files,
		    url = options.requestUrl + '&action=upload&target=' + dataset.target + '&mode=frontend&upload_field_id=' + uploadField.attr('id') + '&products_id=' + dataset.products_id;

		$('.customizer select[name^="properties_values_ids["]').each(function () {
			url += '&properties_values_ids[]=' + $(this).val();
		});

		uploadField.fileupload({
			url: url,
			autoUpload: false,
			dataType: 'json'
		});

		uploadField.fileupload('send', { files: filesList }).done(function (result) {
			var uploadFieldName = uploadField.attr('id'),
			    filename = uploadField.val().replace(/C:\\fakepath\\/i, '');

			dataset[uploadFieldName] = filename;
			uploadField.parent().find('img').remove();
			uploadField.show();

			if (result.ERROR) {
				alert(result.ERROR_MESSAGE);
				deferred.reject();
			} else {
				deferred.resolve(result);
			}
		}).fail(function (jqxhr, testStatus, errorThrown) {
			uploadField.parent().find('img').remove();
			uploadField.show();
			deferred.reject();
		});
	};

	/**
  * Send customizer data beloning to a product which is going to be added to the cart.
  *
  * @private
  */
	var _send_customizer_data = function _send_customizer_data(e, d, dataset) {
		ajax = ajax ? ajax.abort() : null;
		ajax = jse.libs.xhr.post({ url: options.requestUrl, data: dataset }, true);

		ajax.done(function () {
			if (d.deferred) {
				d.deferred.resolve(e.data.random);
			}
		}).fail(function () {
			if (d.deferred) {
				d.deferred.reject();
			}
		});
	};

	/**
  * Send customizer data beloning to a wish list product which is going to be added to the cart.
  *
  * @private
  */
	var _wishlist_to_cart = function _wishlist_to_cart(e, d) {
		if (d.dataset.products_id[0].indexOf('}0') === -1) {
			if (d.deferred) {
				d.deferred.resolve();
			}

			return;
		}

		ajax = ajax ? ajax.abort() : null;

		ajax = jse.libs.xhr.post({
			url: options.requestUrl,
			data: {
				action: 'wishlist_to_cart',
				products_id: d.dataset.products_id[0],
				mode: 'frontend'
			}
		}, true);

		ajax.done(function () {
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
  * Delete customizer data belonging to a product which is going to be deleted in cart or wish list.
  *
  * @private
  */
	var _delete = function _delete(e, d) {
		if (d.dataset.products_id[0].indexOf('}0') === -1) {
			if (d.deferred) {
				d.deferred.resolve();
			}

			return;
		}

		var action = 'update_wishlist';
		if (options.page === 'cart') {
			action = 'update_cart';
		}

		ajax = ajax ? ajax.abort() : null;

		ajax = jse.libs.xhr.post({
			url: options.requestUrl,
			data: {
				action: action,
				products_id: d.dataset.products_id[0],
				mode: 'frontend'
			}
		}, true);

		ajax.done(function () {
			if (d.deferred) {
				d.deferred.resolve();
			}
		}).fail(function () {
			if (d.deferred) {
				d.deferred.reject();
			}
		});
	};

	// ########## INITIALIZATION ##########

	/**
  * Init function of the widget
  * @constructor
  */
	module.init = function (done) {
		if (options.page === 'product') {
			var random = $(options.uidSelector).attr('name');
			$body.on(jse.libs.template.events.ADD_CUSTOMIZER_CART(), { action: 'add_cart', target: 'cart', random: random }, _addCustomizerData);
			$body.on(jse.libs.template.events.ADD_CUSTOMIZER_WISHLIST(), { action: 'add_wishlist', target: 'wishlist', random: random }, _addCustomizerData);
		}

		$body.on(jse.libs.template.events.WISHLIST_TO_CART(), _wishlist_to_cart);
		$body.on(jse.libs.template.events.WISHLIST_CART_DELETE(), _delete);

		$('#gm_gprint_tabs li').on('click', function () {
			$window.trigger(jse.libs.template.events.STICKYBOX_CONTENT_CHANGE());
		});

		$window.trigger(jse.libs.template.events.STICKYBOX_CONTENT_CHANGE());

		// jQuery file upload needs to be loaded after jQuery UI. 
		var dependencies = [jse.source + '/vendor/blueimp-file-upload/jquery.fileupload.min.js'];

		window.require(dependencies, done);
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvY3VzdG9taXplci5qcyJdLCJuYW1lcyI6WyJnYW1iaW8iLCJ3aWRnZXRzIiwibW9kdWxlIiwianNlIiwic291cmNlIiwiZGF0YSIsIiR0aGlzIiwiJCIsIiRib2R5IiwiJHdpbmRvdyIsIndpbmRvdyIsImFqYXgiLCJkZWZhdWx0cyIsInJlcXVlc3RVcmwiLCJ1aWRTZWxlY3RvciIsInBhZ2UiLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2FkZEN1c3RvbWl6ZXJEYXRhIiwiZSIsImQiLCJmb3JtZGF0YSIsImxpYnMiLCJmb3JtIiwiZ2V0RGF0YSIsImRhdGFzZXQiLCJhY3Rpb24iLCJwcm9taXNlcyIsImF0dHJpYnV0ZUlkc1N0cmluZyIsImVhY2giLCJvcHRpb25JZCIsImF0dHIiLCJyZXBsYWNlIiwidmFsIiwicHJvZHVjdHNfaWQiLCJyYW5kb20iLCJtYXRjaCIsImZpbmQiLCJnZXQiLCJmaWxlcyIsImxlbmd0aCIsImRlZmVycmVkIiwiRGVmZXJyZWQiLCJwdXNoIiwiaGlkZSIsInBhcmVudCIsImFwcGVuZCIsIl91cGxvYWQiLCJ3aGVuIiwiYXBwbHkiLCJ1bmRlZmluZWQiLCJkb25lIiwiX3NlbmRfY3VzdG9taXplcl9kYXRhIiwiYWx3YXlzIiwidGVzdCIsInVwbG9hZEZpZWxkIiwiZmlsZXNMaXN0IiwidXJsIiwidGFyZ2V0IiwiZmlsZXVwbG9hZCIsImF1dG9VcGxvYWQiLCJkYXRhVHlwZSIsInJlc3VsdCIsInVwbG9hZEZpZWxkTmFtZSIsImZpbGVuYW1lIiwicmVtb3ZlIiwic2hvdyIsIkVSUk9SIiwiYWxlcnQiLCJFUlJPUl9NRVNTQUdFIiwicmVqZWN0IiwicmVzb2x2ZSIsImZhaWwiLCJqcXhociIsInRlc3RTdGF0dXMiLCJlcnJvclRocm93biIsImFib3J0IiwieGhyIiwicG9zdCIsIl93aXNobGlzdF90b19jYXJ0IiwiaW5kZXhPZiIsIm1vZGUiLCJfZGVsZXRlIiwiaW5pdCIsIm9uIiwidGVtcGxhdGUiLCJldmVudHMiLCJBRERfQ1VTVE9NSVpFUl9DQVJUIiwiQUREX0NVU1RPTUlaRVJfV0lTSExJU1QiLCJXSVNITElTVF9UT19DQVJUIiwiV0lTSExJU1RfQ0FSVF9ERUxFVEUiLCJ0cmlnZ2VyIiwiU1RJQ0tZQk9YX0NPTlRFTlRfQ0hBTkdFIiwiZGVwZW5kZW5jaWVzIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7OztBQVVBQSxPQUFPQyxPQUFQLENBQWVDLE1BQWYsQ0FDQyxZQURELEVBR0MsQ0FDQ0MsSUFBSUMsTUFBSixHQUFhLG9DQURkLEVBRUNKLE9BQU9JLE1BQVAsR0FBZ0IsY0FGakIsQ0FIRCxFQVFDLFVBQVNDLElBQVQsRUFBZTs7QUFFZDs7QUFFRjs7QUFFRSxLQUFJQyxRQUFRQyxFQUFFLElBQUYsQ0FBWjtBQUFBLEtBQ0NDLFFBQVFELEVBQUUsTUFBRixDQURUO0FBQUEsS0FFQ0UsVUFBVUYsRUFBRUcsTUFBRixDQUZYO0FBQUEsS0FHQ0MsT0FBTyxJQUhSO0FBQUEsS0FJQ0MsV0FBVztBQUNWQyxjQUFZLGdDQURGO0FBRVZDLGVBQWEsbUJBRkg7QUFHVkMsUUFBTTtBQUhJLEVBSlo7QUFBQSxLQVNDQyxVQUFVVCxFQUFFVSxNQUFGLENBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUJMLFFBQW5CLEVBQTZCUCxJQUE3QixDQVRYO0FBQUEsS0FVQ0gsU0FBUyxFQVZWOztBQVlBOzs7OztBQUtBLEtBQUlnQixxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTs7QUFFdkMsTUFBSUMsV0FBV2xCLElBQUltQixJQUFKLENBQVNDLElBQVQsQ0FBY0MsT0FBZCxDQUFzQmxCLEtBQXRCLEVBQTZCLElBQTdCLEVBQW1DLElBQW5DLENBQWY7QUFBQSxNQUNDbUIsVUFBVWxCLEVBQUVVLE1BQUYsQ0FBUyxFQUFDLFFBQVEsVUFBVCxFQUFxQixVQUFVRSxFQUFFZCxJQUFGLENBQU9xQixNQUF0QyxFQUFULEVBQXdETixFQUFFSyxPQUExRCxFQUFtRSxFQUFuRSxFQUF1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QixFQUFULEVBQ0MsRUFBQzdELFFBQVEsVUFBVCxFQUFxQmdDLFFBQVEsTUFBN0IsRUFBcUN2QixRQUFRQSxNQUE3QyxFQURELEVBRUNqQixrQkFGRDtBQUdBVixTQUFNNEUsRUFBTixDQUFTakYsSUFBSW1CLElBQUosQ0FBUytELFFBQVQsQ0FBa0JDLE1BQWxCLENBQXlCRSx1QkFBekIsRUFBVCxFQUNDLEVBQUM5RCxRQUFRLGNBQVQsRUFBeUJnQyxRQUFRLFVBQWpDLEVBQTZDdkIsUUFBUUEsTUFBckQsRUFERCxFQUVDakIsa0JBRkQ7QUFHQTs7QUFFRFYsUUFBTTRFLEVBQU4sQ0FBU2pGLElBQUltQixJQUFKLENBQVMrRCxRQUFULENBQWtCQyxNQUFsQixDQUF5QkcsZ0JBQXpCLEVBQVQsRUFBc0RWLGlCQUF0RDtBQUNBdkUsUUFBTTRFLEVBQU4sQ0FBU2pGLElBQUltQixJQUFKLENBQVMrRCxRQUFULENBQWtCQyxNQUFsQixDQUF5Qkksb0JBQXpCLEVBQVQsRUFBMERSLE9BQTFEOztBQUVBM0UsSUFBRSxvQkFBRixFQUF3QjZFLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLFlBQVc7QUFDOUMzRSxXQUFRa0YsT0FBUixDQUFnQnhGLElBQUltQixJQUFKLENBQVMrRCxRQUFULENBQWtCQyxNQUFsQixDQUF5Qk0sd0JBQXpCLEVBQWhCO0FBQ0EsR0FGRDs7QUFJQW5GLFVBQVFrRixPQUFSLENBQWdCeEYsSUFBSW1CLElBQUosQ0FBUytELFFBQVQsQ0FBa0JDLE1BQWxCLENBQXlCTSx3QkFBekIsRUFBaEI7O0FBRUE7QUFDQSxNQUFNQyxlQUFlLENBQ3BCMUYsSUFBSUMsTUFBSixHQUFhLHNEQURPLENBQXJCOztBQUlBTSxTQUFPb0YsT0FBUCxDQUFlRCxZQUFmLEVBQTZCMUMsSUFBN0I7QUFDQSxFQTFCRDs7QUE0QkE7QUFDQSxRQUFPakQsTUFBUDtBQUNBLENBaFFGIiwiZmlsZSI6IndpZGdldHMvY3VzdG9taXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gY3VzdG9taXplci5qcyAyMDE2LTA3LTEzXG4gR2FtYmlvIEdtYkhcbiBodHRwOi8vd3d3LmdhbWJpby5kZVxuIENvcHlyaWdodCAoYykgMjAxNiBHYW1iaW8gR21iSFxuIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuIFtodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZ2FtYmlvLndpZGdldHMubW9kdWxlKFxuXHQnY3VzdG9taXplcicsXG5cblx0W1xuXHRcdGpzZS5zb3VyY2UgKyAnL3ZlbmRvci9qcXVlcnktdWkvanF1ZXJ5LXVpLm1pbi5qcycsXG5cdFx0Z2FtYmlvLnNvdXJjZSArICcvbGlicy9ldmVudHMnIFxuXHRdLFxuXG5cdGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdCd1c2Ugc3RyaWN0JztcblxuLy8gIyMjIyMjIyMjIyBWQVJJQUJMRSBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cblx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0JGJvZHkgPSAkKCdib2R5JyksXG5cdFx0XHQkd2luZG93ID0gJCh3aW5kb3cpLFxuXHRcdFx0YWpheCA9IG51bGwsXG5cdFx0XHRkZWZhdWx0cyA9IHtcblx0XHRcdFx0cmVxdWVzdFVybDogJ3JlcXVlc3RfcG9ydC5waHA/bW9kdWxlPUdQcmludCcsXG5cdFx0XHRcdHVpZFNlbGVjdG9yOiAnI2dtX2dwcmludF9yYW5kb20nLFxuXHRcdFx0XHRwYWdlOiAncHJvZHVjdCdcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBkYXRhKSxcblx0XHRcdG1vZHVsZSA9IHt9O1xuXG5cdFx0LyoqXG5cdFx0ICogQWRkIGN1c3RvbWl6ZXIgZGF0YSB0byBjYXJ0IG9yIHdpc2ggbGlzdC5cblx0XHQgKlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9hZGRDdXN0b21pemVyRGF0YSA9IGZ1bmN0aW9uKGUsIGQpIHtcblxuXHRcdFx0dmFyIGZvcm1kYXRhID0ganNlLmxpYnMuZm9ybS5nZXREYXRhKCR0aGlzLCBudWxsLCB0cnVlKSxcblx0XHRcdFx0ZGF0YXNldCA9ICQuZXh0ZW5kKHsnbW9kZSc6ICdmcm9udGVuZCcsICdhY3Rpb24nOiBlLmRhdGEuYWN0aW9ufSwgZC5kYXRhc2V0LCB7fSwgZm9ybWRhdGEpLFxuXHRcdFx0XHRwcm9taXNlcyA9IFtdLFxuXHRcdFx0XHRhdHRyaWJ1dGVJZHNTdHJpbmcgPSAnJztcblxuXHRcdFx0JCgnLmN1c3RvbWl6ZXIgc2VsZWN0W25hbWVePVwiaWRbXCJdLCAuY3VzdG9taXplciBpbnB1dFtuYW1lXj1cImlkW1wiXTpjaGVja2VkJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIG9wdGlvbklkID0gJCh0aGlzKS5hdHRyKCduYW1lJykucmVwbGFjZSgvaWRcXFsoXFxkKylcXF0vLCAnJDEnKTtcblx0XHRcdFx0YXR0cmlidXRlSWRzU3RyaW5nICs9ICd7JyArIG9wdGlvbklkICsgJ30nICsgJCh0aGlzKS52YWwoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRkYXRhc2V0LnByb2R1Y3RzX2lkID0gZGF0YXNldC5wcm9kdWN0c19pZCArIGF0dHJpYnV0ZUlkc1N0cmluZyArICd7JyArIGUuZGF0YS5yYW5kb20ubWF0Y2goL1xcZCsvKSArICd9MCc7XG5cblx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCQodGhpcykuZ2V0KDApLmZpbGVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChkZWZlcnJlZCk7XG5cblx0XHRcdFx0XHQkKHRoaXMpLmhpZGUoKTtcblx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHQucGFyZW50KClcblx0XHRcdFx0XHRcdC5hcHBlbmQoJzxpbWcgc3JjPVwiZ20vaW1hZ2VzL2dwcmludC91cGxvYWQuZ2lmXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjExXCIgJ1xuXHRcdFx0XHRcdFx0ICAgICAgICArICdjbGFzcz1cImdtX2dwcmludF9sb2FkaW5nXCIgaWQ9XCJsb2FkaW5nXycgKyAkKHRoaXMpLmF0dHIoJ2lkJykgKyAnXCIgLz4nKTtcblxuXHRcdFx0XHRcdF91cGxvYWQoJCh0aGlzKSwgZGF0YXNldCwgZGVmZXJyZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHByb21pc2VzLmxlbmd0aCkge1xuXHRcdFx0XHQkLndoZW4uYXBwbHkodW5kZWZpbmVkLCBwcm9taXNlcykuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRfc2VuZF9jdXN0b21pemVyX2RhdGEoZSwgZCwgZGF0YXNldCk7XG5cdFx0XHRcdH0pLmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgdGVzdCA9IDE7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X3NlbmRfY3VzdG9taXplcl9kYXRhKGUsIGQsIGRhdGFzZXQpO1xuXHRcdFx0fVxuXHRcdH07XG5cblxuXHRcdC8qKlxuXHRcdCAqIFVwbG9hZCBmaWxlcyBmcm9tIGN1c3RvbWl6ZXIgZm9ybS5cblx0XHQgKlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF91cGxvYWQgPSBmdW5jdGlvbih1cGxvYWRGaWVsZCwgZGF0YXNldCwgZGVmZXJyZWQpIHtcblx0XHRcdHZhciBmaWxlc0xpc3QgPSB1cGxvYWRGaWVsZC5nZXQoMCkuZmlsZXMsXG5cdFx0XHRcdHVybCA9IG9wdGlvbnMucmVxdWVzdFVybFxuXHRcdFx0XHRcdCsgJyZhY3Rpb249dXBsb2FkJnRhcmdldD0nICsgZGF0YXNldC50YXJnZXQgKyAnJm1vZGU9ZnJvbnRlbmQmdXBsb2FkX2ZpZWxkX2lkPSdcblx0XHRcdFx0XHQrIHVwbG9hZEZpZWxkLmF0dHIoJ2lkJylcblx0XHRcdFx0XHQrICcmcHJvZHVjdHNfaWQ9JyArIGRhdGFzZXQucHJvZHVjdHNfaWQ7XG5cblx0XHRcdCQoJy5jdXN0b21pemVyIHNlbGVjdFtuYW1lXj1cInByb3BlcnRpZXNfdmFsdWVzX2lkc1tcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR1cmwgKz0gJyZwcm9wZXJ0aWVzX3ZhbHVlc19pZHNbXT0nICsgJCh0aGlzKS52YWwoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR1cGxvYWRGaWVsZC5maWxldXBsb2FkKHtcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICBhdXRvVXBsb2FkOiBmYWxzZSxcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cdFx0XHR1cGxvYWRGaWVsZC5maWxldXBsb2FkKCdzZW5kJywge2ZpbGVzOiBmaWxlc0xpc3R9KVxuXHRcdFx0ICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0ICAgICAgICAgICB2YXIgdXBsb2FkRmllbGROYW1lID0gdXBsb2FkRmllbGQuYXR0cignaWQnKSxcblx0XHRcdFx0XHQgICAgICAgICAgIGZpbGVuYW1lID0gdXBsb2FkRmllbGQudmFsKCkucmVwbGFjZSgvQzpcXFxcZmFrZXBhdGhcXFxcL2ksICcnKTtcblxuXHRcdFx0XHQgICAgICAgICAgIGRhdGFzZXRbdXBsb2FkRmllbGROYW1lXSA9IGZpbGVuYW1lO1xuXHRcdFx0XHQgICAgICAgICAgIHVwbG9hZEZpZWxkLnBhcmVudCgpLmZpbmQoJ2ltZycpLnJlbW92ZSgpO1xuXHRcdFx0XHQgICAgICAgICAgIHVwbG9hZEZpZWxkLnNob3coKTtcblxuXHRcdFx0XHQgICAgICAgICAgIGlmIChyZXN1bHQuRVJST1IpIHtcblx0XHRcdFx0XHQgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5FUlJPUl9NRVNTQUdFKTtcblx0XHRcdFx0XHQgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuXHRcdFx0XHQgICAgICAgICAgIH0gZWxzZSB7XG5cdFx0XHRcdFx0ICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdCAgICAgICAgICAgfVxuXHRcdFx0ICAgICAgICAgICB9KVxuXHRcdFx0ICAgICAgICAgICAuZmFpbChmdW5jdGlvbihqcXhociwgdGVzdFN0YXR1cywgZXJyb3JUaHJvd24pIHtcblx0XHRcdFx0ICAgICAgICAgICB1cGxvYWRGaWVsZC5wYXJlbnQoKS5maW5kKCdpbWcnKS5yZW1vdmUoKTtcblx0XHRcdFx0ICAgICAgICAgICB1cGxvYWRGaWVsZC5zaG93KCk7XG5cdFx0XHRcdCAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XG5cdFx0XHQgICAgICAgICAgIH0pO1xuXHRcdH07XG5cblxuXHRcdC8qKlxuXHRcdCAqIFNlbmQgY3VzdG9taXplciBkYXRhIGJlbG9uaW5nIHRvIGEgcHJvZHVjdCB3aGljaCBpcyBnb2luZyB0byBiZSBhZGRlZCB0byB0aGUgY2FydC5cblx0XHQgKlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9zZW5kX2N1c3RvbWl6ZXJfZGF0YSA9IGZ1bmN0aW9uKGUsIGQsIGRhdGFzZXQpIHtcblx0XHRcdGFqYXggPSAoYWpheCkgPyBhamF4LmFib3J0KCkgOiBudWxsO1xuXHRcdFx0YWpheCA9IGpzZS5saWJzLnhoci5wb3N0KHt1cmw6IG9wdGlvbnMucmVxdWVzdFVybCwgZGF0YTogZGF0YXNldH0sIHRydWUpO1xuXG5cdFx0XHRhamF4LmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmIChkLmRlZmVycmVkKSB7XG5cdFx0XHRcdFx0ZC5kZWZlcnJlZC5yZXNvbHZlKGUuZGF0YS5yYW5kb20pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoZC5kZWZlcnJlZCkge1xuXHRcdFx0XHRcdGQuZGVmZXJyZWQucmVqZWN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTZW5kIGN1c3RvbWl6ZXIgZGF0YSBiZWxvbmluZyB0byBhIHdpc2ggbGlzdCBwcm9kdWN0IHdoaWNoIGlzIGdvaW5nIHRvIGJlIGFkZGVkIHRvIHRoZSBjYXJ0LlxuXHRcdCAqXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3dpc2hsaXN0X3RvX2NhcnQgPSBmdW5jdGlvbihlLCBkKSB7XG5cdFx0XHRpZiAoZC5kYXRhc2V0LnByb2R1Y3RzX2lkWzBdLmluZGV4T2YoJ30wJykgPT09IC0xKSB7XG5cdFx0XHRcdGlmIChkLmRlZmVycmVkKSB7XG5cdFx0XHRcdFx0ZC5kZWZlcnJlZC5yZXNvbHZlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGFqYXggPSAoYWpheCkgPyBhamF4LmFib3J0KCkgOiBudWxsO1xuXG5cdFx0XHRhamF4ID0ganNlLmxpYnMueGhyLnBvc3Qoe1xuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBvcHRpb25zLnJlcXVlc3RVcmwsXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ3dpc2hsaXN0X3RvX2NhcnQnLFxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0c19pZDogZC5kYXRhc2V0LnByb2R1Y3RzX2lkWzBdLFxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAnZnJvbnRlbmQnXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG5cblx0XHRcdGFqYXhcblx0XHRcdFx0LmRvbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKGQuZGVmZXJyZWQpIHtcblx0XHRcdFx0XHRcdGQuZGVmZXJyZWQucmVzb2x2ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKGQuZGVmZXJyZWQpIHtcblx0XHRcdFx0XHRcdGQuZGVmZXJyZWQucmVqZWN0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRGVsZXRlIGN1c3RvbWl6ZXIgZGF0YSBiZWxvbmdpbmcgdG8gYSBwcm9kdWN0IHdoaWNoIGlzIGdvaW5nIHRvIGJlIGRlbGV0ZWQgaW4gY2FydCBvciB3aXNoIGxpc3QuXG5cdFx0ICpcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfZGVsZXRlID0gZnVuY3Rpb24oZSwgZCkge1xuXHRcdFx0aWYgKGQuZGF0YXNldC5wcm9kdWN0c19pZFswXS5pbmRleE9mKCd9MCcpID09PSAtMSkge1xuXHRcdFx0XHRpZiAoZC5kZWZlcnJlZCkge1xuXHRcdFx0XHRcdGQuZGVmZXJyZWQucmVzb2x2ZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgYWN0aW9uID0gJ3VwZGF0ZV93aXNobGlzdCc7XG5cdFx0XHRpZiAob3B0aW9ucy5wYWdlID09PSAnY2FydCcpIHtcblx0XHRcdFx0YWN0aW9uID0gJ3VwZGF0ZV9jYXJ0Jztcblx0XHRcdH1cblxuXHRcdFx0YWpheCA9IChhamF4KSA/IGFqYXguYWJvcnQoKSA6IG51bGw7XG5cblx0XHRcdGFqYXggPSBqc2UubGlicy54aHIucG9zdCh7XG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IG9wdGlvbnMucmVxdWVzdFVybCxcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzX2lkOiBkLmRhdGFzZXQucHJvZHVjdHNfaWRbMF0sXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdmcm9udGVuZCdcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcblxuXHRcdFx0YWpheFxuXHRcdFx0XHQuZG9uZShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoZC5kZWZlcnJlZCkge1xuXHRcdFx0XHRcdFx0ZC5kZWZlcnJlZC5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuZmFpbChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoZC5kZWZlcnJlZCkge1xuXHRcdFx0XHRcdFx0ZC5kZWZlcnJlZC5yZWplY3QoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdH07XG5cblxuLy8gIyMjIyMjIyMjIyBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBJbml0IGZ1bmN0aW9uIG9mIHRoZSB3aWRnZXRcblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRtb2R1bGUuaW5pdCA9IGZ1bmN0aW9uKGRvbmUpIHtcblx0XHRcdGlmIChvcHRpb25zLnBhZ2UgPT09ICdwcm9kdWN0Jykge1xuXHRcdFx0XHR2YXIgcmFuZG9tID0gJChvcHRpb25zLnVpZFNlbGVjdG9yKS5hdHRyKCduYW1lJyk7XG5cdFx0XHRcdCRib2R5Lm9uKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5BRERfQ1VTVE9NSVpFUl9DQVJUKCksXG5cdFx0XHRcdFx0e2FjdGlvbjogJ2FkZF9jYXJ0JywgdGFyZ2V0OiAnY2FydCcsIHJhbmRvbTogcmFuZG9tfSxcblx0XHRcdFx0XHRfYWRkQ3VzdG9taXplckRhdGEpO1xuXHRcdFx0XHQkYm9keS5vbihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuQUREX0NVU1RPTUlaRVJfV0lTSExJU1QoKSxcblx0XHRcdFx0XHR7YWN0aW9uOiAnYWRkX3dpc2hsaXN0JywgdGFyZ2V0OiAnd2lzaGxpc3QnLCByYW5kb206IHJhbmRvbX0sXG5cdFx0XHRcdFx0X2FkZEN1c3RvbWl6ZXJEYXRhKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0JGJvZHkub24oanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLldJU0hMSVNUX1RPX0NBUlQoKSwgX3dpc2hsaXN0X3RvX2NhcnQpO1xuXHRcdFx0JGJvZHkub24oanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLldJU0hMSVNUX0NBUlRfREVMRVRFKCksIF9kZWxldGUpO1xuXHRcdFx0XG5cdFx0XHQkKCcjZ21fZ3ByaW50X3RhYnMgbGknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0JHdpbmRvdy50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5TVElDS1lCT1hfQ09OVEVOVF9DSEFOR0UoKSk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0JHdpbmRvdy50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5TVElDS1lCT1hfQ09OVEVOVF9DSEFOR0UoKSk7XG5cdFx0XHRcblx0XHRcdC8vIGpRdWVyeSBmaWxlIHVwbG9hZCBuZWVkcyB0byBiZSBsb2FkZWQgYWZ0ZXIgalF1ZXJ5IFVJLiBcblx0XHRcdGNvbnN0IGRlcGVuZGVuY2llcyA9IFtcblx0XHRcdFx0anNlLnNvdXJjZSArICcvdmVuZG9yL2JsdWVpbXAtZmlsZS11cGxvYWQvanF1ZXJ5LmZpbGV1cGxvYWQubWluLmpzJyxcblx0XHRcdF07XG5cdFx0XHRcblx0XHRcdHdpbmRvdy5yZXF1aXJlKGRlcGVuZGVuY2llcywgZG9uZSk7XG5cdFx0fTtcblxuXHRcdC8vIFJldHVybiBkYXRhIHRvIHdpZGdldCBlbmdpbmVcblx0XHRyZXR1cm4gbW9kdWxlO1xuXHR9KTtcbiJdfQ==
