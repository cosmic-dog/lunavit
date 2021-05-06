/* --------------------------------------------------------------
 zones_handler.js 2017-06-01
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2017 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/**
 * The Component for handling the federal state dropdown depending on the country.
 * The field will be blacked out if there are no federal states for the selected
 * country.
 */
gambio.widgets.module(
	'zones_handler',
	
	[
		'form',
		'xhr'
	],
	
	function(data) {
		
		'use strict';
		
		// ########## VARIABLE INITIALIZATION ##########
		
		var $this            = $(this),
			$states          = $('select#state.form-control'),
			$selectedState   = $('input[name=selected_zone_id]'),
			$statesFormGroup = $('select#state.form-control').closest('div.form-group'),
			
			defaults = {
				loadStates: 'shop.php?do=Zones',
				country:    'select#country.form-control',
			},			options = $.extend(true, {}, defaults, data),
			module = {};
		
		
		var _changeHandler = function() {
			
			var dataset = jse.libs.form.getData($this);
			
			jse.libs.xhr.ajax({url: options.loadStates, data: dataset}, true).done(function(result) {

				if (result.success) {

					$states.children('option').remove();
					$selectedState.prop("disabled", false);
					$states.prop("disabled", false);
					
					$.each(result.data, function(key, value) {

						if(value.selected)
						{
							$states.append($("<option selected/>").val(value.id).text(value.name));
						}
						else
						{
							$states.append($("<option />").val(value.id).text(value.name));
						}
					});

					$statesFormGroup.removeClass('hidden').show();
					
				}
				else {
					
					$statesFormGroup.hide();
					$selectedState.prop("disabled", true);
					$states.prop("disabled", true);
					
				}
				
			});
			
		};
		
		// ########## INITIALIZATION ##########
		
		/**
		 * Init function of the widget
		 * @constructor
		 */
		module.init = function(done) {
			
			_changeHandler();

			$this.on('change', options.country, _changeHandler);
			
			done();
		};
		
		// Return data to widget engine
		return module;
	});
