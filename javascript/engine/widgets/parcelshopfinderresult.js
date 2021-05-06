/* --------------------------------------------------------------
	parcelshopfinderresult.js 2017-03-21
	Gambio GmbH
	http://www.gambio.de
	Copyright (c) 2016 Gambio GmbH
	Released under the GNU General Public License (Version 2)
	[http://www.gnu.org/licenses/gpl-2.0.html]
	--------------------------------------------------------------
*/

gambio.widgets.module(
	'parcelshopfinderresult',

	[],

	function(data) {

		'use strict';

		// ########## VARIABLE INITIALIZATION ##########

		var $this    = $(this),
		    defaults = {},
			options  = $.extend(true, {}, defaults, data),
			module   = {};

		var initMap = function() {
			var map;
			var geocoder;
			var clickMarker;
			var markers = [];
			map = new google.maps.Map(document.getElementById('map'), {
				center: markerData[0].position,
				zoom: 14
			});
			map.addListener('click', function(e) {
				console.log(e);
				geocoder.geocode({'location': e.latLng}, function(results, status) {
					if(status === 'OK') {
						console.log(results);
						if(results[0].types[0] === 'street_address')
						{
							var markerAddress = results[0].formatted_address;

							if(!clickMarker) {
								clickMarker = new google.maps.Marker({
									map: map,
									position: results[0].geometry.location,
									title: markerAddress
								});
							}
							else {
								clickMarker.setPosition(results[0].geometry.location);
								clickMarker.setTitle(markerAddress);
							}

							let street, houseNo, postCode, city, country, country_iso;
							results[0].address_components.forEach(function(component) {
								if(component.types.indexOf('street_number') >= 0) {
									houseNo = component.long_name;
									$('input[name="house"]').val(houseNo);
								}
                                if(component.types.indexOf('route') >= 0) {
                                    street = component.long_name;
                                    $('input[name="street"]').val(street);
                                }
                                if(component.types.indexOf('postal_code') >= 0) {
                                    postCode = component.long_name;
                                    $('input[name="zip"]').val(postCode);
                                }
                                if(component.types.indexOf('locality') >= 0) {
                                    city = component.long_name;
                                    $('input[name="city"]').val(city);
                                }
                                if(component.types.indexOf('country') >= 0) {
                                    country = component.long_name;
                                    country_iso = component.short_name;
                                    if($('select[name="country"] option[value="' + country_iso + '"]').length > 0) {
										$('select[name="country"]').val(country_iso);
									}
                                }
                            });
                            /* $('#psf-form').show();
                            $('#psfnewsearch').hide(); */
                            $('#psf-form').trigger('submit');
						}
					}
					else {
						console.log('geocoder failed - ' + status);
					}
                });
			});
			markerData.forEach(function(markerParams) {
				markerParams.map = map;
				var newMarker = new google.maps.Marker(markerParams);
				newMarker.addListener('click', function(e) {
					var markerLabel = markerParams.label,
					    $markerRow = $('tr#marker_' + markerLabel),
					    markerRowOffset = $markerRow.offset();
					$('html, body').animate({'scrollTop': markerRowOffset.top - ($('body').height() / 2)}, 500);
					$markerRow.addClass('marker_clicked');
					$('tr.parcelshop').not($markerRow).removeClass('marker_clicked');
                    markers.forEach(function(marker, index) {
                        marker.setAnimation(null);
                    });
                    newMarker.setAnimation(google.maps.Animation.BOUNCE);
				});
				markers.push(newMarker);
				$('#marker_' + markerParams.label + ' div.mapmarkerlabel_icon').on('click', function(e) {
                    var $markerRow = $(this).closest('tr');
					map.setCenter(newMarker.getPosition());
					markers.forEach(function(marker, index) {
						marker.setAnimation(null);
					});
					newMarker.setAnimation(google.maps.Animation.BOUNCE);
                    $markerRow.addClass('marker_clicked');
                    $('tr.parcelshop').not($markerRow).removeClass('marker_clicked');
                    $('#map').get(0).scrollIntoView({behavior: "smooth", block: "end"});
				});
			});
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': searchAddress }, function(results, status) {
            	if (status == 'OK') {
            		map.setCenter(results[0].geometry.location);
            		var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
				}
			});
		}

		// ########## INITIALIZATION ##########

		/**
		 * Initialize Module
		 * @constructor
		 */
		module.init = function(done) {
			var toggleButton = function(enabled)
			{
				if(enabled == true)
				{
					$('#psf_make_new_ab_entry').removeAttr('disabled');
				}
				else
				{
					$('#psf_make_new_ab_entry').attr('disabled', 'disabled');
				}
			}

			var validateInput = function()
			{
				toggleButton($('#psf_new_ab input').hasClass('invalid') === false);
			}


			$('button.prepare_ab_entry').on('click', function(e) {
				e.preventDefault();
				var $row               = $(this).closest('tr'),
					parcelshop_heading = $('strong.parcelshop_heading', $row).text(),
					street_address     = $('span.street_address',     $row).text(),
					house_number       = $('span.house_number',       $row).text(),
					additional_info    = $('span.additional_info',    $row).text(),
					country_iso        = $('span.country_iso',        $row).text(),
					postcode           = $('span.postcode',           $row).text(),
					city               = $('span.city',               $row).text(),
					shop_name          = $('span.shop_name',          $row).text(),
					psf_name;
				if(country_iso !== 'DE')
				{
					additional_info = additional_info + ' (' + shop_name + ')';
				}
				psf_name = parcelshop_heading;
				if(shop_name.length > 0) {
					psf_name += ', ' + shop_name;
				}
				psf_name += ', ' + postcode + ' ' + city;
				$('#psf_name'                                ).val(psf_name);
				$('#psf_new_ab input[name="street_address"]' ).val(street_address);
				$('#psf_new_ab input[name="house_number"]'   ).val(house_number);
				$('#psf_new_ab input[name="additional_info"]').val(additional_info);
				$('#psf_new_ab input[name="country"]'        ).val(country_iso);
				$('#psf_new_ab input[name="postcode"]'       ).val(postcode);
				$('#psf_new_ab input[name="city"]'           ).val(city);
				$('#psf_name').removeClass('invalid');
                $('#psf_new_ab').show('fast', function() {
                    $('#psf_new_ab').get(0).scrollIntoView({behavior: "smooth", block: "end"});
				});
                validateInput();
			});


			$('#psf_new_ab input[name="firstname"], #psf_new_ab input[name="lastname"]').on('keyup', function(e) {
				$(e.target).toggleClass('invalid', $(e.target).val().length <= 2);
				validateInput();
			});

			$('#psf_new_ab input[name="postnumber"]').on('keyup', function(e) {
				if($(this).val().length > 5)
				{
					$.ajax({
						url: jse.core.config.get('appUrl') + '/shop.php?do=Parcelshopfinder/ValidatePostnumber&postnumber=' + $(this).val(),
						dataType: 'json',
					})
					.done(function(data) {
						$('#psf_new_ab input[name="postnumber"]').toggleClass('invalid', (data.postnumberIsValid !== true));
						validateInput();
					});
				}
				else
				{
					$('#psf_new_ab input[name="postnumber"]').toggleClass('invalid', true);
					validateInput();
				}
			});
			$('#psf_new_ab input[name="postnumber"]').on('change', function(e) {
				$('#psf_new_ab input[name="postnumber"]').trigger('keyup');
			});
			$('#psf_new_ab input').trigger('keyup');

			if(typeof(psfDynamic) !== 'undefined' && psfDynamic === true)
			{
				initMap();
			}

			done();
		};

		return module;
	}
);
