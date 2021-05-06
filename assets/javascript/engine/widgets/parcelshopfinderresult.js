'use strict';

/* --------------------------------------------------------------
	parcelshopfinderresult.js 2017-03-21
	Gambio GmbH
	http://www.gambio.de
	Copyright (c) 2016 Gambio GmbH
	Released under the GNU General Public License (Version 2)
	[http://www.gnu.org/licenses/gpl-2.0.html]
	--------------------------------------------------------------
*/

gambio.widgets.module('parcelshopfinderresult', [], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    defaults = {},
	    options = $.extend(true, {}, defaults, data),
	    module = {};

	var initMap = function initMap() {
		var map;
		var geocoder;
		var clickMarker;
		var markers = [];
		map = new google.maps.Map(document.getElementById('map'), {
			center: markerData[0].position,
			zoom: 14
		});
		map.addListener('click', function (e) {
			console.log(e);
			geocoder.geocode({ 'location': e.latLng }, function (results, status) {
				if (status === 'OK') {
					console.log(results);
					if (results[0].types[0] === 'street_address') {
						var markerAddress = results[0].formatted_address;

						if (!clickMarker) {
							clickMarker = new google.maps.Marker({
								map: map,
								position: results[0].geometry.location,
								title: markerAddress
							});
						} else {
							clickMarker.setPosition(results[0].geometry.location);
							clickMarker.setTitle(markerAddress);
						}

						var street = void 0,
						    houseNo = void 0,
						    postCode = void 0,
						    city = void 0,
						    country = void 0,
						    country_iso = void 0;
						results[0].address_components.forEach(function (component) {
							if (component.types.indexOf('street_number') >= 0) {
								houseNo = component.long_name;
								$('input[name="house"]').val(houseNo);
							}
							if (component.types.indexOf('route') >= 0) {
								street = component.long_name;
								$('input[name="street"]').val(street);
							}
							if (component.types.indexOf('postal_code') >= 0) {
								postCode = component.long_name;
								$('input[name="zip"]').val(postCode);
							}
							if (component.types.indexOf('locality') >= 0) {
								city = component.long_name;
								$('input[name="city"]').val(city);
							}
							if (component.types.indexOf('country') >= 0) {
								country = component.long_name;
								country_iso = component.short_name;
								if ($('select[name="country"] option[value="' + country_iso + '"]').length > 0) {
									$('select[name="country"]').val(country_iso);
								}
							}
						});
						/* $('#psf-form').show();
      $('#psfnewsearch').hide(); */
						$('#psf-form').trigger('submit');
					}
				} else {
					console.log('geocoder failed - ' + status);
				}
			});
		});
		markerData.forEach(function (markerParams) {
			markerParams.map = map;
			var newMarker = new google.maps.Marker(markerParams);
			newMarker.addListener('click', function (e) {
				var markerLabel = markerParams.label,
				    $markerRow = $('tr#marker_' + markerLabel),
				    markerRowOffset = $markerRow.offset();
				$('html, body').animate({ 'scrollTop': markerRowOffset.top - $('body').height() / 2 }, 500);
				$markerRow.addClass('marker_clicked');
				$('tr.parcelshop').not($markerRow).removeClass('marker_clicked');
				markers.forEach(function (marker, index) {
					marker.setAnimation(null);
				});
				newMarker.setAnimation(google.maps.Animation.BOUNCE);
			});
			markers.push(newMarker);
			$('#marker_' + markerParams.label + ' div.mapmarkerlabel_icon').on('click', function (e) {
				var $markerRow = $(this).closest('tr');
				map.setCenter(newMarker.getPosition());
				markers.forEach(function (marker, index) {
					marker.setAnimation(null);
				});
				newMarker.setAnimation(google.maps.Animation.BOUNCE);
				$markerRow.addClass('marker_clicked');
				$('tr.parcelshop').not($markerRow).removeClass('marker_clicked');
				$('#map').get(0).scrollIntoView({ behavior: "smooth", block: "end" });
			});
		});
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': searchAddress }, function (results, status) {
			if (status == 'OK') {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
			}
		});
	};

	// ########## INITIALIZATION ##########

	/**
  * Initialize Module
  * @constructor
  */
	module.init = function (done) {
		var toggleButton = function toggleButton(enabled) {
			if (enabled == true) {
				$('#psf_make_new_ab_entry').removeAttr('disabled');
			} else {
				$('#psf_make_new_ab_entry').attr('disabled', 'disabled');
			}
		};

		var validateInput = function validateInput() {
			toggleButton($('#psf_new_ab input').hasClass('invalid') === false);
		};

		$('button.prepare_ab_entry').on('click', function (e) {
			e.preventDefault();
			var $row = $(this).closest('tr'),
			    parcelshop_heading = $('strong.parcelshop_heading', $row).text(),
			    street_address = $('span.street_address', $row).text(),
			    house_number = $('span.house_number', $row).text(),
			    additional_info = $('span.additional_info', $row).text(),
			    country_iso = $('span.country_iso', $row).text(),
			    postcode = $('span.postcode', $row).text(),
			    city = $('span.city', $row).text(),
			    shop_name = $('span.shop_name', $row).text(),
			    psf_name;
			if (country_iso !== 'DE') {
				additional_info = additional_info + ' (' + shop_name + ')';
			}
			psf_name = parcelshop_heading;
			if (shop_name.length > 0) {
				psf_name += ', ' + shop_name;
			}
			psf_name += ', ' + postcode + ' ' + city;
			$('#psf_name').val(psf_name);
			$('#psf_new_ab input[name="street_address"]').val(street_address);
			$('#psf_new_ab input[name="house_number"]').val(house_number);
			$('#psf_new_ab input[name="additional_info"]').val(additional_info);
			$('#psf_new_ab input[name="country"]').val(country_iso);
			$('#psf_new_ab input[name="postcode"]').val(postcode);
			$('#psf_new_ab input[name="city"]').val(city);
			$('#psf_name').removeClass('invalid');
			$('#psf_new_ab').show('fast', function () {
				$('#psf_new_ab').get(0).scrollIntoView({ behavior: "smooth", block: "end" });
			});
			validateInput();
		});

		$('#psf_new_ab input[name="firstname"], #psf_new_ab input[name="lastname"]').on('keyup', function (e) {
			$(e.target).toggleClass('invalid', $(e.target).val().length <= 2);
			validateInput();
		});

		$('#psf_new_ab input[name="postnumber"]').on('keyup', function (e) {
			if ($(this).val().length > 5) {
				$.ajax({
					url: jse.core.config.get('appUrl') + '/shop.php?do=Parcelshopfinder/ValidatePostnumber&postnumber=' + $(this).val(),
					dataType: 'json'
				}).done(function (data) {
					$('#psf_new_ab input[name="postnumber"]').toggleClass('invalid', data.postnumberIsValid !== true);
					validateInput();
				});
			} else {
				$('#psf_new_ab input[name="postnumber"]').toggleClass('invalid', true);
				validateInput();
			}
		});
		$('#psf_new_ab input[name="postnumber"]').on('change', function (e) {
			$('#psf_new_ab input[name="postnumber"]').trigger('keyup');
		});
		$('#psf_new_ab input').trigger('keyup');

		if (typeof psfDynamic !== 'undefined' && psfDynamic === true) {
			initMap();
		}

		done();
	};

	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvcGFyY2Vsc2hvcGZpbmRlcnJlc3VsdC5qcyJdLCJuYW1lcyI6WyJnYW1iaW8iLCJ3aWRnZXRzIiwibW9kdWxlIiwiZGF0YSIsIiR0aGlzIiwiJCIsImRlZmF1bHRzIiwib3B0aW9ucyIsImV4dGVuZCIsImluaXRNYXAiLCJtYXAiLCJnZW9jb2RlciIsImNsaWNrTWFya2VyIiwibWFya2VycyIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2VudGVyIiwibWFya2VyRGF0YSIsInBvc2l0aW9uIiwiem9vbSIsImFkZExpc3RlbmVyIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJnZW9jb2RlIiwibGF0TG5nIiwicmVzdWx0cyIsInN0YXR1cyIsInR5cGVzIiwibWFya2VyQWRkcmVzcyIsImZvcm1hdHRlZF9hZGRyZXNzIiwiTWFya2VyIiwiZ2VvbWV0cnkiLCJsb2NhdGlvbiIsInRpdGxlIiwic2V0UG9zaXRpb24iLCJzZXRUaXRsZSIsInN0cmVldCIsImhvdXNlTm8iLCJwb3N0Q29kZSIsImNpdHkiLCJjb3VudHJ5IiwiY291bnRyeV9pc28iLCJhZGRyZXNzX2NvbXBvbmVudHMiLCJmb3JFYWNoIiwiY29tcG9uZW50IiwiaW5kZXhPZiIsImxvbmdfbmFtZSIsInZhbCIsInNob3J0X25hbWUiLCJsZW5ndGgiLCJ0cmlnZ2VyIiwibWFya2VyUGFyYW1zIiwibmV3TWFya2VyIiwibWFya2VyTGFiZWwiLCJsYWJlbCIsIiRtYXJrZXJSb3ciLCJtYXJrZXJSb3dPZmZzZXQiLCJvZmZzZXQiLCJhbmltYXRlIiwidG9wIiwiaGVpZ2h0IiwiYWRkQ2xhc3MiLCJub3QiLCJyZW1vdmVDbGFzcyIsIm1hcmtlciIsImluZGV4Iiwic2V0QW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwiQk9VTkNFIiwicHVzaCIsIm9uIiwiY2xvc2VzdCIsInNldENlbnRlciIsImdldFBvc2l0aW9uIiwiZ2V0Iiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwiR2VvY29kZXIiLCJzZWFyY2hBZGRyZXNzIiwiaW5pdCIsImRvbmUiLCJ0b2dnbGVCdXR0b24iLCJlbmFibGVkIiwicmVtb3ZlQXR0ciIsImF0dHIiLCJ2YWxpZGF0ZUlucHV0IiwiaGFzQ2xhc3MiLCJwcmV2ZW50RGVmYXVsdCIsIiRyb3ciLCJwYXJjZWxzaG9wX2hlYWRpbmciLCJ0ZXh0Iiwic3RyZWV0X2FkZHJlc3MiLCJob3VzZV9udW1iZXIiLCJhZGRpdGlvbmFsX2luZm8iLCJwb3N0Y29kZSIsInNob3BfbmFtZSIsInBzZl9uYW1lIiwic2hvdyIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwiYWpheCIsInVybCIsImpzZSIsImNvcmUiLCJjb25maWciLCJkYXRhVHlwZSIsInBvc3RudW1iZXJJc1ZhbGlkIiwicHNmRHluYW1pYyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7OztBQVVBQSxPQUFPQyxPQUFQLENBQWVDLE1BQWYsQ0FDQyx3QkFERCxFQUdDLEVBSEQsRUFLQyxVQUFTQyxJQUFULEVBQWU7O0FBRWQ7O0FBRUE7O0FBRUEsS0FBSUMsUUFBV0MsRUFBRSxJQUFGLENBQWY7QUFBQSxLQUNJQyxXQUFXLEVBRGY7QUFBQSxLQUVDQyxVQUFXRixFQUFFRyxNQUFGLENBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUJGLFFBQW5CLEVBQTZCSCxJQUE3QixDQUZaO0FBQUEsS0FHQ0QsU0FBVyxFQUhaOztBQUtBLEtBQUlPLFVBQVUsU0FBVkEsT0FBVSxHQUFXO0FBQ3hCLE1BQUlDLEdBQUo7QUFDQSxNQUFJQyxRQUFKO0FBQ0EsTUFBSUMsV0FBSjtBQUNBLE1BQUlDLFVBQVUsRUFBZDtBQUNBSCxRQUFNLElBQUlJLE9BQU9DLElBQVAsQ0FBWUMsR0FBaEIsQ0FBb0JDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBcEIsRUFBb0Q7QUFDekRDLFdBQVFDLFdBQVcsQ0FBWCxFQUFjQyxRQURtQztBQUV6REMsU0FBTTtBQUZtRCxHQUFwRCxDQUFOO0FBSUFaLE1B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LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRwYXJjZWxzaG9wZmluZGVycmVzdWx0LmpzIDIwMTctMDMtMjFcblx0R2FtYmlvIEdtYkhcblx0aHR0cDovL3d3dy5nYW1iaW8uZGVcblx0Q29weXJpZ2h0IChjKSAyMDE2IEdhbWJpbyBHbWJIXG5cdFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuXHRbaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2dwbC0yLjAuaHRtbF1cblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiovXG5cbmdhbWJpby53aWRnZXRzLm1vZHVsZShcblx0J3BhcmNlbHNob3BmaW5kZXJyZXN1bHQnLFxuXG5cdFtdLFxuXG5cdGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdCd1c2Ugc3RyaWN0JztcblxuXHRcdC8vICMjIyMjIyMjIyMgVkFSSUFCTEUgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXG5cdFx0dmFyICR0aGlzICAgID0gJCh0aGlzKSxcblx0XHQgICAgZGVmYXVsdHMgPSB7fSxcblx0XHRcdG9wdGlvbnMgID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBkYXRhKSxcblx0XHRcdG1vZHVsZSAgID0ge307XG5cblx0XHR2YXIgaW5pdE1hcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG1hcDtcblx0XHRcdHZhciBnZW9jb2Rlcjtcblx0XHRcdHZhciBjbGlja01hcmtlcjtcblx0XHRcdHZhciBtYXJrZXJzID0gW107XG5cdFx0XHRtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xuXHRcdFx0XHRjZW50ZXI6IG1hcmtlckRhdGFbMF0ucG9zaXRpb24sXG5cdFx0XHRcdHpvb206IDE0XG5cdFx0XHR9KTtcblx0XHRcdG1hcC5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xuXHRcdFx0XHRnZW9jb2Rlci5nZW9jb2RlKHsnbG9jYXRpb24nOiBlLmxhdExuZ30sIGZ1bmN0aW9uKHJlc3VsdHMsIHN0YXR1cykge1xuXHRcdFx0XHRcdGlmKHN0YXR1cyA9PT0gJ09LJykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzdWx0cyk7XG5cdFx0XHRcdFx0XHRpZihyZXN1bHRzWzBdLnR5cGVzWzBdID09PSAnc3RyZWV0X2FkZHJlc3MnKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR2YXIgbWFya2VyQWRkcmVzcyA9IHJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XG5cblx0XHRcdFx0XHRcdFx0aWYoIWNsaWNrTWFya2VyKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xpY2tNYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcDogbWFwLFxuXHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24sXG5cdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogbWFya2VyQWRkcmVzc1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGNsaWNrTWFya2VyLnNldFBvc2l0aW9uKHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24pO1xuXHRcdFx0XHRcdFx0XHRcdGNsaWNrTWFya2VyLnNldFRpdGxlKG1hcmtlckFkZHJlc3MpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0bGV0IHN0cmVldCwgaG91c2VObywgcG9zdENvZGUsIGNpdHksIGNvdW50cnksIGNvdW50cnlfaXNvO1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzWzBdLmFkZHJlc3NfY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmKGNvbXBvbmVudC50eXBlcy5pbmRleE9mKCdzdHJlZXRfbnVtYmVyJykgPj0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aG91c2VObyA9IGNvbXBvbmVudC5sb25nX25hbWU7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKCdpbnB1dFtuYW1lPVwiaG91c2VcIl0nKS52YWwoaG91c2VObyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb21wb25lbnQudHlwZXMuaW5kZXhPZigncm91dGUnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlZXQgPSBjb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmVldFwiXScpLnZhbChzdHJlZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudC50eXBlcy5pbmRleE9mKCdwb3N0YWxfY29kZScpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RDb2RlID0gY29tcG9uZW50LmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ6aXBcIl0nKS52YWwocG9zdENvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudC50eXBlcy5pbmRleE9mKCdsb2NhbGl0eScpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHkgPSBjb21wb25lbnQubG9uZ19uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImNpdHlcIl0nKS52YWwoY2l0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29tcG9uZW50LnR5cGVzLmluZGV4T2YoJ2NvdW50cnknKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gY29tcG9uZW50LmxvbmdfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnlfaXNvID0gY29tcG9uZW50LnNob3J0X25hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkKCdzZWxlY3RbbmFtZT1cImNvdW50cnlcIl0gb3B0aW9uW3ZhbHVlPVwiJyArIGNvdW50cnlfaXNvICsgJ1wiXScpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JCgnc2VsZWN0W25hbWU9XCJjb3VudHJ5XCJdJykudmFsKGNvdW50cnlfaXNvKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICQoJyNwc2YtZm9ybScpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjcHNmbmV3c2VhcmNoJykuaGlkZSgpOyAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNwc2YtZm9ybScpLnRyaWdnZXIoJ3N1Ym1pdCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdnZW9jb2RlciBmYWlsZWQgLSAnICsgc3RhdHVzKTtcblx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgfSk7XG5cdFx0XHR9KTtcblx0XHRcdG1hcmtlckRhdGEuZm9yRWFjaChmdW5jdGlvbihtYXJrZXJQYXJhbXMpIHtcblx0XHRcdFx0bWFya2VyUGFyYW1zLm1hcCA9IG1hcDtcblx0XHRcdFx0dmFyIG5ld01hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIobWFya2VyUGFyYW1zKTtcblx0XHRcdFx0bmV3TWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHR2YXIgbWFya2VyTGFiZWwgPSBtYXJrZXJQYXJhbXMubGFiZWwsXG5cdFx0XHRcdFx0ICAgICRtYXJrZXJSb3cgPSAkKCd0ciNtYXJrZXJfJyArIG1hcmtlckxhYmVsKSxcblx0XHRcdFx0XHQgICAgbWFya2VyUm93T2Zmc2V0ID0gJG1hcmtlclJvdy5vZmZzZXQoKTtcblx0XHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6IG1hcmtlclJvd09mZnNldC50b3AgLSAoJCgnYm9keScpLmhlaWdodCgpIC8gMil9LCA1MDApO1xuXHRcdFx0XHRcdCRtYXJrZXJSb3cuYWRkQ2xhc3MoJ21hcmtlcl9jbGlja2VkJyk7XG5cdFx0XHRcdFx0JCgndHIucGFyY2Vsc2hvcCcpLm5vdCgkbWFya2VyUm93KS5yZW1vdmVDbGFzcygnbWFya2VyX2NsaWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uKG1hcmtlciwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRBbmltYXRpb24obnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBuZXdNYXJrZXIuc2V0QW5pbWF0aW9uKGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0bWFya2Vycy5wdXNoKG5ld01hcmtlcik7XG5cdFx0XHRcdCQoJyNtYXJrZXJfJyArIG1hcmtlclBhcmFtcy5sYWJlbCArICcgZGl2Lm1hcG1hcmtlcmxhYmVsX2ljb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkbWFya2VyUm93ID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpO1xuXHRcdFx0XHRcdG1hcC5zZXRDZW50ZXIobmV3TWFya2VyLmdldFBvc2l0aW9uKCkpO1xuXHRcdFx0XHRcdG1hcmtlcnMuZm9yRWFjaChmdW5jdGlvbihtYXJrZXIsIGluZGV4KSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0QW5pbWF0aW9uKG51bGwpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdG5ld01hcmtlci5zZXRBbmltYXRpb24oZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkJPVU5DRSk7XG4gICAgICAgICAgICAgICAgICAgICRtYXJrZXJSb3cuYWRkQ2xhc3MoJ21hcmtlcl9jbGlja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJ3RyLnBhcmNlbHNob3AnKS5ub3QoJG1hcmtlclJvdykucmVtb3ZlQ2xhc3MoJ21hcmtlcl9jbGlja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNtYXAnKS5nZXQoMCkuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJlbmRcIn0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuICAgICAgICAgICAgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoeyAnYWRkcmVzcyc6IHNlYXJjaEFkZHJlc3MgfSwgZnVuY3Rpb24ocmVzdWx0cywgc3RhdHVzKSB7XG4gICAgICAgICAgICBcdGlmIChzdGF0dXMgPT0gJ09LJykge1xuICAgICAgICAgICAgXHRcdG1hcC5zZXRDZW50ZXIocmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgICAgICAgICBcdFx0dmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRcdFx0bWFwOiBtYXAsXG5cdFx0XHRcdFx0XHRwb3NpdGlvbjogcmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvblxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyAjIyMjIyMjIyMjIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdC8qKlxuXHRcdCAqIEluaXRpYWxpemUgTW9kdWxlXG5cdFx0ICogQGNvbnN0cnVjdG9yXG5cdFx0ICovXG5cdFx0bW9kdWxlLmluaXQgPSBmdW5jdGlvbihkb25lKSB7XG5cdFx0XHR2YXIgdG9nZ2xlQnV0dG9uID0gZnVuY3Rpb24oZW5hYmxlZClcblx0XHRcdHtcblx0XHRcdFx0aWYoZW5hYmxlZCA9PSB0cnVlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI3BzZl9tYWtlX25ld19hYl9lbnRyeScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI3BzZl9tYWtlX25ld19hYl9lbnRyeScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIHZhbGlkYXRlSW5wdXQgPSBmdW5jdGlvbigpXG5cdFx0XHR7XG5cdFx0XHRcdHRvZ2dsZUJ1dHRvbigkKCcjcHNmX25ld19hYiBpbnB1dCcpLmhhc0NsYXNzKCdpbnZhbGlkJykgPT09IGZhbHNlKTtcblx0XHRcdH1cblxuXG5cdFx0XHQkKCdidXR0b24ucHJlcGFyZV9hYl9lbnRyeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR2YXIgJHJvdyAgICAgICAgICAgICAgID0gJCh0aGlzKS5jbG9zZXN0KCd0cicpLFxuXHRcdFx0XHRcdHBhcmNlbHNob3BfaGVhZGluZyA9ICQoJ3N0cm9uZy5wYXJjZWxzaG9wX2hlYWRpbmcnLCAkcm93KS50ZXh0KCksXG5cdFx0XHRcdFx0c3RyZWV0X2FkZHJlc3MgICAgID0gJCgnc3Bhbi5zdHJlZXRfYWRkcmVzcycsICAgICAkcm93KS50ZXh0KCksXG5cdFx0XHRcdFx0aG91c2VfbnVtYmVyICAgICAgID0gJCgnc3Bhbi5ob3VzZV9udW1iZXInLCAgICAgICAkcm93KS50ZXh0KCksXG5cdFx0XHRcdFx0YWRkaXRpb25hbF9pbmZvICAgID0gJCgnc3Bhbi5hZGRpdGlvbmFsX2luZm8nLCAgICAkcm93KS50ZXh0KCksXG5cdFx0XHRcdFx0Y291bnRyeV9pc28gICAgICAgID0gJCgnc3Bhbi5jb3VudHJ5X2lzbycsICAgICAgICAkcm93KS50ZXh0KCksXG5cdFx0XHRcdFx0cG9zdGNvZGUgICAgICAgICAgID0gJCgnc3Bhbi5wb3N0Y29kZScsICAgICAgICAgICAkcm93KS50ZXh0KCksXG5cdFx0XHRcdFx0Y2l0eSAgICAgICAgICAgICAgID0gJCgnc3Bhbi5jaXR5JywgICAgICAgICAgICAgICAkcm93KS50ZXh0KCksXG5cdFx0XHRcdFx0c2hvcF9uYW1lICAgICAgICAgID0gJCgnc3Bhbi5zaG9wX25hbWUnLCAgICAgICAgICAkcm93KS50ZXh0KCksXG5cdFx0XHRcdFx0cHNmX25hbWU7XG5cdFx0XHRcdGlmKGNvdW50cnlfaXNvICE9PSAnREUnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YWRkaXRpb25hbF9pbmZvID0gYWRkaXRpb25hbF9pbmZvICsgJyAoJyArIHNob3BfbmFtZSArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRwc2ZfbmFtZSA9IHBhcmNlbHNob3BfaGVhZGluZztcblx0XHRcdFx0aWYoc2hvcF9uYW1lLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRwc2ZfbmFtZSArPSAnLCAnICsgc2hvcF9uYW1lO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBzZl9uYW1lICs9ICcsICcgKyBwb3N0Y29kZSArICcgJyArIGNpdHk7XG5cdFx0XHRcdCQoJyNwc2ZfbmFtZScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkudmFsKHBzZl9uYW1lKTtcblx0XHRcdFx0JCgnI3BzZl9uZXdfYWIgaW5wdXRbbmFtZT1cInN0cmVldF9hZGRyZXNzXCJdJyApLnZhbChzdHJlZXRfYWRkcmVzcyk7XG5cdFx0XHRcdCQoJyNwc2ZfbmV3X2FiIGlucHV0W25hbWU9XCJob3VzZV9udW1iZXJcIl0nICAgKS52YWwoaG91c2VfbnVtYmVyKTtcblx0XHRcdFx0JCgnI3BzZl9uZXdfYWIgaW5wdXRbbmFtZT1cImFkZGl0aW9uYWxfaW5mb1wiXScpLnZhbChhZGRpdGlvbmFsX2luZm8pO1xuXHRcdFx0XHQkKCcjcHNmX25ld19hYiBpbnB1dFtuYW1lPVwiY291bnRyeVwiXScgICAgICAgICkudmFsKGNvdW50cnlfaXNvKTtcblx0XHRcdFx0JCgnI3BzZl9uZXdfYWIgaW5wdXRbbmFtZT1cInBvc3Rjb2RlXCJdJyAgICAgICApLnZhbChwb3N0Y29kZSk7XG5cdFx0XHRcdCQoJyNwc2ZfbmV3X2FiIGlucHV0W25hbWU9XCJjaXR5XCJdJyAgICAgICAgICAgKS52YWwoY2l0eSk7XG5cdFx0XHRcdCQoJyNwc2ZfbmFtZScpLnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICAgICAgJCgnI3BzZl9uZXdfYWInKS5zaG93KCdmYXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNwc2ZfbmV3X2FiJykuZ2V0KDApLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiZW5kXCJ9KTtcblx0XHRcdFx0fSk7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVJbnB1dCgpO1xuXHRcdFx0fSk7XG5cblxuXHRcdFx0JCgnI3BzZl9uZXdfYWIgaW5wdXRbbmFtZT1cImZpcnN0bmFtZVwiXSwgI3BzZl9uZXdfYWIgaW5wdXRbbmFtZT1cImxhc3RuYW1lXCJdJykub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHQkKGUudGFyZ2V0KS50b2dnbGVDbGFzcygnaW52YWxpZCcsICQoZS50YXJnZXQpLnZhbCgpLmxlbmd0aCA8PSAyKTtcblx0XHRcdFx0dmFsaWRhdGVJbnB1dCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQoJyNwc2ZfbmV3X2FiIGlucHV0W25hbWU9XCJwb3N0bnVtYmVyXCJdJykub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZigkKHRoaXMpLnZhbCgpLmxlbmd0aCA+IDUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dXJsOiBqc2UuY29yZS5jb25maWcuZ2V0KCdhcHBVcmwnKSArICcvc2hvcC5waHA/ZG89UGFyY2Vsc2hvcGZpbmRlci9WYWxpZGF0ZVBvc3RudW1iZXImcG9zdG51bWJlcj0nICsgJCh0aGlzKS52YWwoKSxcblx0XHRcdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuZG9uZShmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHQkKCcjcHNmX25ld19hYiBpbnB1dFtuYW1lPVwicG9zdG51bWJlclwiXScpLnRvZ2dsZUNsYXNzKCdpbnZhbGlkJywgKGRhdGEucG9zdG51bWJlcklzVmFsaWQgIT09IHRydWUpKTtcblx0XHRcdFx0XHRcdHZhbGlkYXRlSW5wdXQoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkKCcjcHNmX25ld19hYiBpbnB1dFtuYW1lPVwicG9zdG51bWJlclwiXScpLnRvZ2dsZUNsYXNzKCdpbnZhbGlkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0dmFsaWRhdGVJbnB1dCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdCQoJyNwc2ZfbmV3X2FiIGlucHV0W25hbWU9XCJwb3N0bnVtYmVyXCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0JCgnI3BzZl9uZXdfYWIgaW5wdXRbbmFtZT1cInBvc3RudW1iZXJcIl0nKS50cmlnZ2VyKCdrZXl1cCcpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKCcjcHNmX25ld19hYiBpbnB1dCcpLnRyaWdnZXIoJ2tleXVwJyk7XG5cblx0XHRcdGlmKHR5cGVvZihwc2ZEeW5hbWljKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcHNmRHluYW1pYyA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0aW5pdE1hcCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRkb25lKCk7XG5cdFx0fTtcblxuXHRcdHJldHVybiBtb2R1bGU7XG5cdH1cbik7XG4iXX0=
