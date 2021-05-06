/* --------------------------------------------------------------
 gift.js 2018-04-24
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2016 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

gambio.widgets.module(
	'gift',

	['xhr', 'form'],

	function(data) {

		'use strict';

// ########## VARIABLE INITIALIZATION ##########

		var $this = $(this),
			url = null,
			defaults = {},
			selectorMapping = {
				giftContent: '.gift-cart-content-wrapper'
			},
			options = $.extend(true, {}, defaults, data),
			module = {};


		var _submitHandler = function(e) {
			e.preventDefault();
			e.stopPropagation();

			var dataset = jse.libs.form.getData($this);

			jse.libs.xhr.ajax({url: url, data: dataset}, true).done(function(result) {
				jse.libs.template.helpers.fill(result.content, $this, selectorMapping);
				
				const $detailsLink = $this.find('.gift-cart-show-details');
				if($detailsLink.size())
				{
					$detailsLink.on('click', _showDetails);
				}
			});

		};


		const _showDetails = function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			const detailsUrl = $(this).data('url');
			
			$.ajax({
				url: detailsUrl
			}).success(function (result) {
				$('div.redeem-code-details-wrapper').html(result).show();
				$('div.redeem-code-wrapper').hide();
			})
		};


// ########## INITIALIZATION ##########

		/**
		 * Init function of the widget
		 * @constructor
		 */
		module.init = function(done) {

			url = $this.attr('action');

			$this.on('submit', _submitHandler);

			done();
		};

		// Return data to widget engine
		return module;
	});