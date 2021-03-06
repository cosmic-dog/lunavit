'use strict';

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
gambio.widgets.module('zones_handler', ['form', 'xhr'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $states = $('select#state.form-control'),
	    $selectedState = $('input[name=selected_zone_id]'),
	    $statesFormGroup = $('select#state.form-control').closest('div.form-group'),
	    defaults = {
		loadStates: 'shop.php?do=Zones',
		country: 'select#country.form-control'
	},
	    options = $.extend(true, {}, defaults, data),
	    module = {};

	var _changeHandler = function _changeHandler() {

		var dataset = jse.libs.form.getData($this);

		jse.libs.xhr.ajax({ url: options.loadStates, data: dataset }, true).done(function (result) {

			if (result.success) {

				$states.children('option').remove();
				$selectedState.prop("disabled", false);
				$states.prop("disabled", false);

				$.each(result.data, function (key, value) {

					if (value.selected) {
						$states.append($("<option selected/>").val(value.id).text(value.name));
					} else {
						$states.append($("<option />").val(value.id).text(value.name));
					}
				});

				$statesFormGroup.removeClass('hidden').show();
			} else {

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
	module.init = function (done) {

		_changeHandler();

		$this.on('change', options.country, _changeHandler);

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvem9uZXNfaGFuZGxlci5qcyJdLCJuYW1lcyI6WyJnYW1iaW8iLCJ3aWRnZXRzIiwibW9kdWxlIiwiZGF0YSIsIiR0aGlzIiwiJCIsIiRzdGF0ZXMiLCIkc2VsZWN0ZWRTdGF0ZSIsIiRzdGF0ZXNGb3JtR3JvdXAiLCJjbG9zZXN0IiwiZGVmYXVsdHMiLCJsb2FkU3RhdGVzIiwiY291bnRyeSIsIm9wdGlvbnMiLCJleHRlbmQiLCJfY2hhbmdlSGFuZGxlciIsImRhdGFzZXQiLCJqc2UiLCJsaWJzIiwiZm9ybSIsImdldERhdGEiLCJ4aHIiLCJhamF4IiwidXJsIiwiZG9uZSIsInJlc3VsdCIsInN1Y2Nlc3MiLCJjaGlsZHJlbiIsInJlbW92ZSIsInByb3AiLCJlYWNoIiwia2V5IiwidmFsdWUiLCJzZWxlY3RlZCIsImFwcGVuZCIsInZhbCIsImlkIiwidGV4dCIsIm5hbWUiLCJyZW1vdmVDbGFzcyIsInNob3ciLCJoaWRlIiwiaW5pdCIsIm9uIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7O0FBVUE7Ozs7O0FBS0FBLE9BQU9DLE9BQVAsQ0FBZUMsTUFBZixDQUNDLGVBREQsRUFHQyxDQUNDLE1BREQsRUFFQyxLQUZELENBSEQsRUFRQyxVQUFTQyxJQUFULEVBQWU7O0FBRWQ7O0FBRUE7O0FBRUEsS0FBSUMsUUFBbUJDLEVBQUUsSUFBRixDQUF2QjtBQUFBLEtBQ0NDLFVBQW1CRCxFQUFFLDJCQUFGLENBRHBCO0FBQUEsS0FFQ0UsaUJBQW1CRixFQUFFLDhCQUFGLENBRnBCO0FBQUEsS0FHQ0csbUJBQW1CSCxFQUFFLDJCQUFGLEVBQStCSSxPQUEvQixDQUF1QyxnQkFBdkMsQ0FIcEI7QUFBQSxLQUtDQyxXQUFXO0FBQ1ZDLGNBQVksbUJBREY7QUFFVkMsV0FBWTtBQUZGLEVBTFo7QUFBQSxLQVFNQyxVQUFVUixFQUFFUyxNQUFGLENBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUJKLFFBQW5CLEVBQTZCUCxJQUE3QixDQVJoQjtBQUFBLEtBU0NELFNBQVMsRUFUVjs7QUFZQSxLQUFJYSxpQkFBaUIsU0FBakJBLGNBQWlCLEdBQVc7O0FBRS9CLE1BQUlDLFVBQVVDLElBQUlDLElBQUosQ0FBU0MsSUFBVCxDQUFjQyxPQUFkLENBQXNCaEIsS0FBdEIsQ0FBZDs7QUFFQWEsTUFBSUMsSUFBSixDQUFTRyxHQUFULENBQWFDLElBQWIsQ0FBa0IsRUFBQ0MsS0FBS1YsUUFBUUYsVUFBZCxFQUEwQlIsTUFBTWEsT0FBaEMsRUFBbEIsRUFBNEQsSUFBNUQsRUFBa0VRLElBQWxFLENBQXVFLFVBQVNDLE1BQVQsRUFBaUI7O0FBRXZGLE9BQUlBLE9BQU9DLE9BQVgsRUFBb0I7O0FBRW5CcEIsWUFBUXFCLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkJDLE1BQTNCO0FBQ0FyQixtQkFBZXNCLElBQWYsQ0FBb0IsVUFBcEIsRUFBZ0MsS0FBaEM7QUFDQXZCLFlBQVF1QixJQUFSLENBQWEsVUFBYixFQUF5QixLQUF6Qjs7QUFFQXhCLE1BQUV5QixJQUFGLENBQU9MLE9BQU90QixJQUFkLEVBQW9CLFVBQVM0QixHQUFULEVBQWNDLEtBQWQsRUFBcUI7O0FBRXhDLFNBQUdBLE1BQU1DLFFBQVQsRUFDQTtBQUNDM0IsY0FBUTRCLE1BQVIsQ0FBZTdCLEVBQUUsb0JBQUYsRUFBd0I4QixHQUF4QixDQUE0QkgsTUFBTUksRUFBbEMsRUFBc0NDLElBQXRDLENBQTJDTCxNQUFNTSxJQUFqRCxDQUFmO0FBQ0EsTUFIRCxNQUtBO0FBQ0NoQyxjQUFRNEIsTUFBUixDQUFlN0IsRUFBRSxZQUFGLEVBQWdCOEIsR0FBaEIsQ0FBb0JILE1BQU1JLEVBQTFCLEVBQThCQyxJQUE5QixDQUFtQ0wsTUFBTU0sSUFBekMsQ0FBZjtBQUNBO0FBQ0QsS0FWRDs7QUFZQTlCLHFCQUFpQitCLFdBQWpCLENBQTZCLFFBQTdCLEVBQXVDQyxJQUF2QztBQUVBLElBcEJELE1BcUJLOztBQUVKaEMscUJBQWlCaUMsSUFBakI7QUFDQWxDLG1CQUFlc0IsSUFBZixDQUFvQixVQUFwQixFQUFnQyxJQUFoQztBQUNBdkIsWUFBUXVCLElBQVIsQ0FBYSxVQUFiLEVBQXlCLElBQXpCO0FBRUE7QUFFRCxHQS9CRDtBQWlDQSxFQXJDRDs7QUF1Q0E7O0FBRUE7Ozs7QUFJQTNCLFFBQU93QyxJQUFQLEdBQWMsVUFBU2xCLElBQVQsRUFBZTs7QUFFNUJUOztBQUVBWCxRQUFNdUMsRUFBTixDQUFTLFFBQVQsRUFBbUI5QixRQUFRRCxPQUEzQixFQUFvQ0csY0FBcEM7O0FBRUFTO0FBQ0EsRUFQRDs7QUFTQTtBQUNBLFFBQU90QixNQUFQO0FBQ0EsQ0FsRkYiLCJmaWxlIjoid2lkZ2V0cy96b25lc19oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiB6b25lc19oYW5kbGVyLmpzIDIwMTctMDYtMDFcbiBHYW1iaW8gR21iSFxuIGh0dHA6Ly93d3cuZ2FtYmlvLmRlXG4gQ29weXJpZ2h0IChjKSAyMDE3IEdhbWJpbyBHbWJIXG4gUmVsZWFzZWQgdW5kZXIgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIChWZXJzaW9uIDIpXG4gW2h0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMi4wLmh0bWxdXG4gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIFRoZSBDb21wb25lbnQgZm9yIGhhbmRsaW5nIHRoZSBmZWRlcmFsIHN0YXRlIGRyb3Bkb3duIGRlcGVuZGluZyBvbiB0aGUgY291bnRyeS5cbiAqIFRoZSBmaWVsZCB3aWxsIGJlIGJsYWNrZWQgb3V0IGlmIHRoZXJlIGFyZSBubyBmZWRlcmFsIHN0YXRlcyBmb3IgdGhlIHNlbGVjdGVkXG4gKiBjb3VudHJ5LlxuICovXG5nYW1iaW8ud2lkZ2V0cy5tb2R1bGUoXG5cdCd6b25lc19oYW5kbGVyJyxcblx0XG5cdFtcblx0XHQnZm9ybScsXG5cdFx0J3hocidcblx0XSxcblx0XG5cdGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcblx0XHQndXNlIHN0cmljdCc7XG5cdFx0XG5cdFx0Ly8gIyMjIyMjIyMjIyBWQVJJQUJMRSBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cdFx0XG5cdFx0dmFyICR0aGlzICAgICAgICAgICAgPSAkKHRoaXMpLFxuXHRcdFx0JHN0YXRlcyAgICAgICAgICA9ICQoJ3NlbGVjdCNzdGF0ZS5mb3JtLWNvbnRyb2wnKSxcblx0XHRcdCRzZWxlY3RlZFN0YXRlICAgPSAkKCdpbnB1dFtuYW1lPXNlbGVjdGVkX3pvbmVfaWRdJyksXG5cdFx0XHQkc3RhdGVzRm9ybUdyb3VwID0gJCgnc2VsZWN0I3N0YXRlLmZvcm0tY29udHJvbCcpLmNsb3Nlc3QoJ2Rpdi5mb3JtLWdyb3VwJyksXG5cdFx0XHRcblx0XHRcdGRlZmF1bHRzID0ge1xuXHRcdFx0XHRsb2FkU3RhdGVzOiAnc2hvcC5waHA/ZG89Wm9uZXMnLFxuXHRcdFx0XHRjb3VudHJ5OiAgICAnc2VsZWN0I2NvdW50cnkuZm9ybS1jb250cm9sJyxcblx0XHRcdH0sXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgZGF0YSksXG5cdFx0XHRtb2R1bGUgPSB7fTtcblx0XHRcblx0XHRcblx0XHR2YXIgX2NoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFxuXHRcdFx0dmFyIGRhdGFzZXQgPSBqc2UubGlicy5mb3JtLmdldERhdGEoJHRoaXMpO1xuXHRcdFx0XG5cdFx0XHRqc2UubGlicy54aHIuYWpheCh7dXJsOiBvcHRpb25zLmxvYWRTdGF0ZXMsIGRhdGE6IGRhdGFzZXR9LCB0cnVlKS5kb25lKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG5cdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXG5cdFx0XHRcdFx0JHN0YXRlcy5jaGlsZHJlbignb3B0aW9uJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0JHNlbGVjdGVkU3RhdGUucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcblx0XHRcdFx0XHQkc3RhdGVzLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0JC5lYWNoKHJlc3VsdC5kYXRhLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG5cblx0XHRcdFx0XHRcdGlmKHZhbHVlLnNlbGVjdGVkKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQkc3RhdGVzLmFwcGVuZCgkKFwiPG9wdGlvbiBzZWxlY3RlZC8+XCIpLnZhbCh2YWx1ZS5pZCkudGV4dCh2YWx1ZS5uYW1lKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdCRzdGF0ZXMuYXBwZW5kKCQoXCI8b3B0aW9uIC8+XCIpLnZhbCh2YWx1ZS5pZCkudGV4dCh2YWx1ZS5uYW1lKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkc3RhdGVzRm9ybUdyb3VwLnJlbW92ZUNsYXNzKCdoaWRkZW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0JHN0YXRlc0Zvcm1Hcm91cC5oaWRlKCk7XG5cdFx0XHRcdFx0JHNlbGVjdGVkU3RhdGUucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuXHRcdFx0XHRcdCRzdGF0ZXMucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHR9O1xuXHRcdFxuXHRcdC8vICMjIyMjIyMjIyMgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIEluaXQgZnVuY3Rpb24gb2YgdGhlIHdpZGdldFxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdG1vZHVsZS5pbml0ID0gZnVuY3Rpb24oZG9uZSkge1xuXHRcdFx0XG5cdFx0XHRfY2hhbmdlSGFuZGxlcigpO1xuXG5cdFx0XHQkdGhpcy5vbignY2hhbmdlJywgb3B0aW9ucy5jb3VudHJ5LCBfY2hhbmdlSGFuZGxlcik7XG5cdFx0XHRcblx0XHRcdGRvbmUoKTtcblx0XHR9O1xuXHRcdFxuXHRcdC8vIFJldHVybiBkYXRhIHRvIHdpZGdldCBlbmdpbmVcblx0XHRyZXR1cm4gbW9kdWxlO1xuXHR9KTtcbiJdfQ==
