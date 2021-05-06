/* --------------------------------------------------------------
 radio_selection.js 2018-02-05
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2018 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

gambio.widgets.module('radio_selection', [], function(data) {

	'use strict';

// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
		defaults = {
			selection: '.list-group-item',
			className: 'active',
			init: false
		},
		options = $.extend(true, {}, defaults, data),
		module = {};


// ########## EVENT HANDLER ##########


	var _changeHandler = function() {
		var $self = $(this),
			$row = $self.closest(options.selection);

		$this
			.find(options.selection)
			.removeClass(options.className);

		$self
			.closest(options.selection)
			.addClass(options.className);
		
		if($self.parent().hasClass('shipping-submodule-selection')) {
			$('.shipping-submodule-title .shipping-module-selection input:radio').not($self).prop('checked', false);
			$row.find('.shipping-submodule-title .shipping-module-selection input:radio').prop('checked', true);
		} else if($self.hasClass('placeholder-radio')) {
			$row.find('.shipping-submodule-selection input:radio').first().prop('checked', true);
			$('.shipping-submodule-title .shipping-module-selection input:radio').not($self).prop('checked', false);
		} else {
			$('.shipping-submodule-title .shipping-module-selection input:radio').prop('checked', false);
		}
	};

	var _changeHandlerCheckbox = function() {
		var $self = $(this),
			$row = $self.closest(options.selection),
			checked = $self.prop('checked');


		if (checked) {
			$row.addClass(options.className);
		} else {
			$row.removeClass(options.className);
		}
	};


// ########## INITIALIZATION ##########

	/**
	 * Init function of the widget
	 * @constructor
	 */
	module.init = function(done) {
		$this
			.on('change', 'input:radio:not(:disabled)', _changeHandler)
			.on('change', 'input:checkbox', _changeHandlerCheckbox);

		if (options.init) {
			$this
				.find('input:checkbox, input:radio:checked:not(:disabled)')
				.trigger('change', []);
		}
		
		$this.find('.list-group-item').on('click', function() {
			$(this).find('label input:radio:not(:disabled):not(.placeholder-radio)').first().prop('checked', true).trigger('change');
		});
		
		$this.find('.list-group-item').each(function() {
			if ($(this).find('label input:radio:not(:disabled)').length > 0) {
				$(this).css({cursor: 'pointer'});
			}
		});
		
		done();
	};

	// Return data to widget engine
	return module;
});