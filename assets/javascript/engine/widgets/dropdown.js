'use strict';

/* --------------------------------------------------------------
 dropdown.js 2016-03-09
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2015 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/**
 * Component to replace the default browser select
 * boxes with a more stylish html / css one
 */
gambio.widgets.module('dropdown', [gambio.source + '/libs/events', gambio.source + '/libs/responsive'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $body = $('body'),
	    transition = {},
	    defaults = {
		// Minimum breakpoint to switch to mobile view
		breakpoint: 40,
		// Container selector for the dropdown markup to look for
		container: '.custom-dropdown',
		// Class that gets added to opened flyouts (@ the container)
		openClass: 'open',
		// If true, the currently selected item gets hidden from the flyout
		hideActive: true,
		// Shortens the text shown in the button. Possible values: Any type of integer, null for do nothing
		shorten: 10,

		// or "fit" for autodetect length depending on the button size (only works with fixed with buttons)

		// Shortens the text inside the button on component init
		shortenOnInit: false,
		// If true the label will get shortened on mobile too
		shortenOnMobile: false,
		// If true, a change of the selectbox by the flyout is receipted trough a change trigger
		triggerChange: true,
		// If true, a change is triggered on no change of the selectbox also
		triggerNoChange: false
	},
	    options = $.extend(true, {}, defaults, data),
	    module = {};

	// ########## HELPER FUNCTIONS ##########

	/**
  * Helper function that hides the currently active
  * element from the dropdown
  * @param       {object}        $container      jQuery selection of the dropdown container
  * @param       {object}        opt             JSON with custom settings for that container
  * @private
  */
	var _hideActive = function _hideActive($container, opt) {
		if (opt.hideActive) {
			var $select = $container.children('select'),
			    value = $select.children(':selected').val();

			$container.find('li').show().children('a[data-rel="' + value + '"]').parent().hide();
		}
	};

	/**
  * Helper function to add a disabled class to the
  * disabled entries in the custom dropdown. Therefor
  * the original select is scanned for disabled entries
  * @param       {object}        $container      jQuery selection of the dropdown container
  * @private
  */
	var _setDisabled = function _setDisabled($container) {
		var $ul = $container.children(),
		    $select = $container.children('select'),
		    $disabled = $select.children(':disabled');

		// Remove all disabled classes first
		$ul.find('.disabled').removeClass('disabled');

		// Iterate through all entries that needs to
		// be disabled and add a class to them
		$disabled.each(function () {
			var $self = $(this),
			    value = $self.val();

			$ul.find('a[data-rel="' + value + '"]').parent().addClass('disabled');
		});
	};

	/**
  * Helper function for the _shortenLabel-function.
  * This function shortens the label so that it fits
  * inside the button. Additional available siblings
  * of the text element were getting substracted from
  * the available button size.
  * @param       {object}    $button     jQuery selection of the button
  * @param       {string}    value       The value that should be set as the button text
  * @return     {string}                The shortened string
  * @private
  */
	var _shortenFit = function _shortenFit($button, value) {
		var $siblings = $button.children().not('.dropdown-name'),
		    $textarea = $button.children('.dropdown-name'),
		    width = $button.width(),
		    length = value.length,
		    name = '',
		    shorten = false,
		    i = 0,
		    test = null;

		// Remove the siblings with from the available
		// full width of the button
		$siblings.each(function () {
			width -= $(this).outerWidth();
		});

		// Iterate through the label characters
		// and add one character at time to the button
		// if the textfield size grows larger than
		// the available width of the button cancel
		// the loop and take the last fitting value
		// as result
		for (i; i < length; i += 1) {
			test = value.substring(0, i) + '...';
			$textarea.text(test);

			if ($textarea.width() > width) {
				shorten = true;
				break;
			}

			name = test;
		}

		// If the text was shortened
		// return the shortened name
		// else the full name
		if (shorten) {
			return name;
		}
		return value;
	};

	/**
  * Helper function for the _shortenLabel-function.
  * This function shortens the label to a set number
  * of digets
  * @param       {string}    value       The value that should be set as the button text
  * @param       {object}    opt         JSON with custom settings for that container
  * @return     {string}                The shortened string
  * @private
  */
	var _shortenInt = function _shortenInt(value, opt) {
		var length = value.length,
		    diff = length - opt.shorten;

		if (diff > 0) {
			diff += 3;
			return value.substring(0, length - diff) + '...';
		}

		return value;
	};

	/**
  * Function that chooses the correct shortener
  * subroutine for shortening the button text
  * (if needed) and returns the shortened value
  * to the caller
  * @param       {object}    $button     jQuery selection of the button
  * @param       {string}    value       The value that should be set as the button text
  * @param       {object}    opt         JSON with custom settings for that container
  * @return     {string}                The shortened string
  * @private
  */
	var _shortenLabel = function _shortenLabel($button, value, opt) {
		if (options.breakpoint < jse.libs.template.responsive.breakpoint().id || opt.shortenOnMobile) {
			if (opt.shorten === 'fit') {
				value = _shortenFit($button, value);
			} else if (opt.shorten) {
				value = _shortenInt(value, opt);
			}
		}

		return value;
	};

	// ########## EVENT HANDLER ##########

	/**
  * Event handler that ist triggered on change
  * of the selectbox to force the dropdown to close
  * (needed on mobile devices, because of it's native
  * support for dropdowns)
  * @private
  */
	var _closeLayer = function _closeLayer() {
		var $self = $(this),
		    $container = $self.closest(options.container),
		    $select = $container.children('select'),
		    dataset = $.extend({}, options, $container.parseModuleData('dropdown'));

		transition.open = false;
		$container.trigger(jse.libs.template.events.TRANSITION(), transition);

		// Trigger the change event if the option is set
		if (dataset.triggerNoChange) {
			$select.trigger('change', []);
		}
	};

	/**
  * Function gets triggered on click on the button.
  * It switches the state of the dropdown visibility
  * @param           {object}    e       jQuery event object
  * @private
  */
	var _openLayer = function _openLayer(e) {
		e.preventDefault();
		e.stopPropagation();

		var $self = $(this),
		    $container = $self.closest(options.container),
		    $select = $container.children('select'),
		    dataset = $.extend({}, options, $container.parseModuleData('dropdown'));

		if ($container.hasClass(options.openClass)) {
			// Remove the open class if the layer is opened
			transition.open = false;
			$container.trigger(jse.libs.template.events.TRANSITION(), transition);

			// Trigger the change event if the option is set
			if (dataset.triggerNoChange) {
				$select.trigger('change', []);
			}
		} else {
			// Add the open class and inform other layers to close
			_hideActive($container, dataset);
			_setDisabled($container);

			transition.open = true;
			$container.trigger(jse.libs.template.events.TRANSITION(), transition);
			$this.trigger(jse.libs.template.events.OPEN_FLYOUT(), [$container]);
		}
	};

	/**
  * Handler that gets used if the user
  * selects a value from the custom dropdown.
  * If the value has changed, the view gets
  * updated and the original select gets set
  * @param       {object}    e       jQuery event object
  * @private
  */
	var _selectEntry = function _selectEntry(e) {
		e.preventDefault();
		e.stopPropagation();

		var $self = $(this),
		    $li = $self.parent();

		// If the item is disabled, do nothing
		if (!$li.hasClass('disabled')) {

			var $container = $self.closest(options.container),
			    $button = $container.children('button'),
			    $select = $container.children('select'),
			    oldValue = $select.children(':selected').val(),
			    newValue = $self.attr('data-rel'),
			    name = $self.text(),
			    dataset = $.extend({}, options, $container.parseModuleData('dropdown'));

			// Update the dropdown view if the
			// value has changed
			if (oldValue !== newValue) {
				// Set the button text
				var shortened = _shortenLabel($button, name, dataset);
				$button.children('.dropdown-name').text(shortened);

				// Set the "original" select box and
				// notify the browser / other js that the
				// value has changed
				$select.children('[value="' + newValue + '"]').prop('selected', true);

				// Trigger the change event if the option is set
				if (dataset.triggerChange) {
					$select.trigger('change', []);
				}
			} else if (dataset.triggerNoChange) {
				// Trigger the change event if the option is set
				$select.trigger('change', []);
			}

			// Close the layer
			transition.open = false;
			$container.trigger(jse.libs.template.events.TRANSITION(), transition);
		}
	};

	/**
  * Handles the switch between the breakpoint. If the
  * size of the button changes the text will be shortened
  * again to fit. If the view switches to mobile, this
  * behaviour is skipped the full name will be displayed
  * again
  * @private
  */
	var _breakpointHandler = function _breakpointHandler() {
		var $container = $this.find(options.container);

		if (options.breakpoint < jse.libs.template.responsive.breakpoint().id || options.shortenOnMobile) {
			// If still in desktop mode, try to shorten the name
			$container.each(function () {
				var $self = $(this),
				    $button = $self.children('button'),
				    $textarea = $button.children('.dropdown-name'),
				    value = $self.find('select option:selected').text(),
				    dataset = $.extend({}, options, $self.parseModuleData('dropdown')),
				    shortened = _shortenLabel($button, value, dataset);

				$textarea.text(shortened);
			});
		} else {
			// If in mobile mode insert the complete name again
			// and close opened layers
			$container.removeClass(options.openClass).each(function () {
				var $self = $(this),
				    $textarea = $self.find('.dropdown-name'),
				    value = $self.find('select option:selected').text();

				$textarea.text(value);
			});
		}
	};

	/**
  * Handler for closing all dropdown flyouts if
  * somewhere on the page opens an other flyout
  * @param   {object}    e       jQuery event object
  * @param   {object}    d       jQuery selection of the event emitter
  * @private
  */
	var _closeFlyout = function _closeFlyout(e, d) {
		var $containers = $this.find(options.container),
		    $exclude = d || $(e.target).closest(options.openClass);

		$containers = $containers.not($exclude);
		$containers.removeClass(options.openClass);
	};

	// ########## INITIALIZATION ##########

	/**
  * Init function of the widget
  * @constructor
  */
	module.init = function (done) {

		transition.classOpen = options.openClass;

		$body.on(jse.libs.template.events.OPEN_FLYOUT() + ' click', _closeFlyout).on(jse.libs.template.events.BREAKPOINT(), _breakpointHandler);

		$this.on('click', options.container + ' button', _openLayer).on('click', options.container + ' ul a', _selectEntry).on('change', options.container + ' select', _closeLayer);

		if (options.shortenOnInit) {
			_breakpointHandler();
		}

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvZHJvcGRvd24uanMiXSwibmFtZXMiOlsiZ2FtYmlvIiwid2lkZ2V0cyIsIm1vZHVsZSIsInNvdXJjZSIsImRhdGEiLCIkdGhpcyIsIiQiLCIkYm9keSIsInRyYW5zaXRpb24iLCJkZWZhdWx0cyIsImJyZWFrcG9pbnQiLCJjb250YWluZXIiLCJvcGVuQ2xhc3MiLCJoaWRlQWN0aXZlIiwic2hvcnRlbiIsInNob3J0ZW5PbkluaXQiLCJzaG9ydGVuT25Nb2JpbGUiLCJ0cmlnZ2VyQ2hhbmdlIiwidHJpZ2dlck5vQ2hhbmdlIiwib3B0aW9ucyIsImV4dGVuZCIsIl9oaWRlQWN0aXZlIiwiJGNvbnRhaW5lciIsIm9wdCIsIiRzZWxlY3QiLCJjaGlsZHJlbiIsInZhbHVlIiwidmFsIiwiZmluZCIsInNob3ciLCJwYXJlbnQiLCJoaWRlIiwiX3NldERpc2FibGVkIiwiJHVsIiwiJGRpc2FibGVkIiwicmVtb3ZlQ2xhc3MiLCJlYWNoIiwiJHNlbGYiLCJhZGRDbGFzcyIsIl9zaG9ydGVuRml0IiwiJGJ1dHRvbiIsIiRzaWJsaW5ncyIsIm5vdCIsIiR0ZXh0YXJlYSIsIndpZHRoIiwibGVuZ3RoIiwibmFtZSIsImkiLCJ0ZXN0Iiwib3V0ZXJXaWR0aCIsInN1YnN0cmluZyIsInRleHQiLCJfc2hvcnRlbkludCIsImRpZmYiLCJfc2hvcnRlbkxhYmVsIiwianNlIiwibGlicyIsInRlbXBsYXRlIiwicmVzcG9uc2l2ZSIsImlkIiwiX2Nsb3NlTGF5ZXIiLCJjbG9zZXN0IiwiZGF0YXNldCIsInBhcnNlTW9kdWxlRGF0YSIsIm9wZW4iLCJ0cmlnZ2VyIiwiZXZlbnRzIiwiVFJBTlNJVElPTiIsIl9vcGVuTGF5ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJoYXNDbGFzcyIsIk9QRU5fRkxZT1VUIiwiX3NlbGVjdEVudHJ5IiwiJGxpIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsImF0dHIiLCJzaG9ydGVuZWQiLCJwcm9wIiwiX2JyZWFrcG9pbnRIYW5kbGVyIiwiX2Nsb3NlRmx5b3V0IiwiZCIsIiRjb250YWluZXJzIiwiJGV4Y2x1ZGUiLCJ0YXJnZXQiLCJpbml0IiwiZG9uZSIsImNsYXNzT3BlbiIsIm9uIiwiQlJFQUtQT0lOVCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7OztBQVVBOzs7O0FBSUFBLE9BQU9DLE9BQVAsQ0FBZUMsTUFBZixDQUNDLFVBREQsRUFHQyxDQUNDRixPQUFPRyxNQUFQLEdBQWdCLGNBRGpCLEVBRUNILE9BQU9HLE1BQVAsR0FBZ0Isa0JBRmpCLENBSEQsRUFRQyxVQUFTQyxJQUFULEVBQWU7O0FBRWQ7O0FBRUY7O0FBRUUsS0FBSUMsUUFBUUMsRUFBRSxJQUFGLENBQVo7QUFBQSxLQUNDQyxRQUFRRCxFQUFFLE1BQUYsQ0FEVDtBQUFBLEtBRUNFLGFBQWEsRUFGZDtBQUFBLEtBR0NDLFdBQVc7QUFDVjtBQUNBQyxjQUFZLEVBRkY7QUFHVjtBQUNBQyxhQUFXLGtCQUpEO0FBS1Y7QUFDQUMsYUFBVyxNQU5EO0FBT1Y7QUFDQUMsY0FBWSxJQVJGO0FBU1Y7QUFDQUMsV0FBUyxFQVZDOztBQVlWOztBQUVBO0FBQ0FDLGlCQUFlLEtBZkw7QUFnQlY7QUFDQUMsbUJBQWlCLEtBakJQO0FBa0JWO0FBQ0FDLGlCQUFlLElBbkJMO0FBb0JWO0FBQ0FDLG1CQUFpQjtBQXJCUCxFQUhaO0FBQUEsS0EwQkNDLFVBQVViLEVBQUVjLE1BQUYsQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQlgsUUFBbkIsRUFBNkJMLElBQTdCLENBMUJYO0FBQUEsS0EyQkNGLFNBQVMsRUEzQlY7O0FBOEJGOztBQUVFOzs7Ozs7O0FBT0EsS0FBSW1CLGNBQWMsU0FBZEEsV0FBYyxDQUFTQyxVQUFULEVBQXFCQyxHQUFyQixFQUEwQjtBQUMzQyxNQUFJQSxJQUFJVixVQUFSLEVBQW9CO0FBQ25CLE9BQUlXLFVBQVVGLFdBQ1pHLFFBRFksQ0FDSCxRQURHLENBQWQ7QUFBQSxPQUVDQyxRQUFRRixRQUNOQyxRQURNLENBQ0csV0FESCxFQUVORSxHQUZNLEVBRlQ7O0FBTUFMLGNBQ0VNLElBREYsQ0FDTyxJQURQLEVBRUVDLElBRkYsR0FHRUosUUFIRixDQUdXLGlCQUFpQkMsS0FBakIsR0FBeUIsSUFIcEMsRUFJRUksTUFKRixHQUtFQyxJQUxGO0FBTUE7QUFDRCxFQWZEOztBQWlCQTs7Ozs7OztBQU9BLEtBQUlDLGVBQWUsU0FBZkEsWUFBZSxDQUFTVixVQUFULEVBQXFCO0FBQ3ZDLE1BQUlXLE1BQU1YLFdBQVdHLFFBQVgsRUFBVjtBQUFBLE1BQ0NELFVBQVVGLFdBQVdHLFFBQVgsQ0FBb0IsUUFBcEIsQ0FEWDtBQUFBLE1BRUNTLFlBQVlWLFFBQVFDLFFBQVIsQ0FBaUIsV0FBakIsQ0FGYjs7QUFJQTtBQUNBUSxNQUNFTCxJQURGLENBQ08sV0FEUCxFQUVFTyxXQUZGLENBRWMsVUFGZDs7QUFJQTtBQUNBO0FBQ0FELFlBQVVFLElBQVYsQ0FBZSxZQUFXO0FBQ3pCLE9BQUlDLFFBQVEvQixFQUFFLElBQUYsQ0FBWjtBQUFBLE9BQ0NvQixRQUFRVyxNQUFNVixHQUFOLEVBRFQ7O0FBR0FNLE9BQ0VMLElBREYsQ0FDTyxpQkFBaUJGLEtBQWpCLEdBQXlCLElBRGhDLEVBRUVJLE1BRkYsR0FHRVEsUUFIRixDQUdXLFVBSFg7QUFJQSxHQVJEO0FBU0EsRUFyQkQ7O0FBdUJBOzs7Ozs7Ozs7OztBQVdBLEtBQUlDLGNBQWMsU0FBZEEsV0FBYyxDQUFTQyxPQUFULEVBQWtCZCxLQUFsQixFQUF5QjtBQUMxQyxNQUFJZSxZQUFZRCxRQUFRZixRQUFSLEdBQW1CaUIsR0FBbkIsQ0FBdUIsZ0JBQXZCLENBQWhCO0FBQUEsTUFDQ0MsWUFBWUgsUUFBUWYsUUFBUixDQUFpQixnQkFBakIsQ0FEYjtBQUFBLE1BRUNtQixRQUFRSixRQUFRSSxLQUFSLEVBRlQ7QUFBQSxNQUdDQyxTQUFTbkIsTUFBTW1CLE1BSGhCO0FBQUEsTUFJQ0MsT0FBTyxFQUpSO0FBQUEsTUFLQ2hDLFVBQVUsS0FMWDtBQUFBLE1BTUNpQyxJQUFJLENBTkw7QUFBQSxNQU9DQyxPQUFPLElBUFI7O0FBU0E7QUFDQTtBQUNBUCxZQUFVTCxJQUFWLENBQWUsWUFBVztBQUN6QlEsWUFBU3RDLEVBQUUsSUFBRixFQUFRMkMsVUFBUixFQUFUO0FBQ0EsR0FGRDs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFLRixDQUFMLEVBQVFBLElBQUlGLE1BQVosRUFBb0JFLEtBQUssQ0FBekIsRUFBNEI7QUFDM0JDLFVBQU90QixNQUFNd0IsU0FBTixDQUFnQixDQUFoQixFQUFtQkgsQ0FBbkIsSUFBd0IsS0FBL0I7QUFDQUosYUFBVVEsSUFBVixDQUFlSCxJQUFmOztBQUVBLE9BQUlMLFVBQVVDLEtBQVYsS0FBb0JBLEtBQXhCLEVBQStCO0FBQzlCOUIsY0FBVSxJQUFWO0FBQ0E7QUFDQTs7QUFFRGdDLFVBQU9FLElBQVA7QUFDQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxNQUFJbEMsT0FBSixFQUFhO0FBQ1osVUFBT2dDLElBQVA7QUFDQTtBQUNELFNBQU9wQixLQUFQO0FBQ0EsRUF6Q0Q7O0FBMkNBOzs7Ozs7Ozs7QUFTQSxLQUFJMEIsY0FBYyxTQUFkQSxXQUFjLENBQVMxQixLQUFULEVBQWdCSCxHQUFoQixFQUFxQjtBQUN0QyxNQUFJc0IsU0FBU25CLE1BQU1tQixNQUFuQjtBQUFBLE1BQ0NRLE9BQU9SLFNBQVN0QixJQUFJVCxPQURyQjs7QUFHQSxNQUFJdUMsT0FBTyxDQUFYLEVBQWM7QUFDYkEsV0FBUSxDQUFSO0FBQ0EsVUFBTzNCLE1BQU13QixTQUFOLENBQWdCLENBQWhCLEVBQW1CTCxTQUFTUSxJQUE1QixJQUFvQyxLQUEzQztBQUNBOztBQUVELFNBQU8zQixLQUFQO0FBQ0EsRUFWRDs7QUFZQTs7Ozs7Ozs7Ozs7QUFXQSxLQUFJNEIsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFTZCxPQUFULEVBQWtCZCxLQUFsQixFQUF5QkgsR0FBekIsRUFBOEI7QUFDakQsTUFBSUosUUFBUVQsVUFBUixHQUFxQjZDLElBQUlDLElBQUosQ0FBU0MsUUFBVCxDQUFrQkMsVUFBbEIsQ0FBNkJoRCxVQUE3QixHQUEwQ2lELEVBQS9ELElBQXFFcEMsSUFBSVAsZUFBN0UsRUFBOEY7QUFDN0YsT0FBSU8sSUFBSVQsT0FBSixLQUFnQixLQUFwQixFQUEyQjtBQUMxQlksWUFBUWEsWUFBWUMsT0FBWixFQUFxQmQsS0FBckIsQ0FBUjtBQUNBLElBRkQsTUFFTyxJQUFJSCxJQUFJVCxPQUFSLEVBQWlCO0FBQ3ZCWSxZQUFRMEIsWUFBWTFCLEtBQVosRUFBbUJILEdBQW5CLENBQVI7QUFDQTtBQUNEOztBQUVELFNBQU9HLEtBQVA7QUFDQSxFQVZEOztBQWFGOztBQUVFOzs7Ozs7O0FBT0EsS0FBSWtDLGNBQWMsU0FBZEEsV0FBYyxHQUFXO0FBQzVCLE1BQUl2QixRQUFRL0IsRUFBRSxJQUFGLENBQVo7QUFBQSxNQUNDZ0IsYUFBYWUsTUFBTXdCLE9BQU4sQ0FBYzFDLFFBQVFSLFNBQXRCLENBRGQ7QUFBQSxNQUVDYSxVQUFVRixXQUFXRyxRQUFYLENBQW9CLFFBQXBCLENBRlg7QUFBQSxNQUdDcUMsVUFBVXhELEVBQUVjLE1BQUYsQ0FBUyxFQUFULEVBQWFELE9BQWIsRUFBc0JHLFdBQVd5QyxlQUFYLENBQTJCLFVBQTNCLENBQXRCLENBSFg7O0FBS0F2RCxhQUFXd0QsSUFBWCxHQUFrQixLQUFsQjtBQUNBMUMsYUFBVzJDLE9BQVgsQ0FBbUJWLElBQUlDLElBQUosQ0FBU0MsUUFBVCxDQUFrQlMsTUFBbEIsQ0FBeUJDLFVBQXpCLEVBQW5CLEVBQTBEM0QsVUFBMUQ7O0FBRUE7QUFDQSxNQUFJc0QsUUFBUTVDLGVBQVosRUFBNkI7QUFDNUJNLFdBQVF5QyxPQUFSLENBQWdCLFFBQWhCLEVBQTBCLEVBQTFCO0FBQ0E7QUFDRCxFQWJEOztBQWVBOzs7Ozs7QUFNQSxLQUFJRyxhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsQ0FBVCxFQUFZO0FBQzVCQSxJQUFFQyxjQUFGO0FBQ0FELElBQUVFLGVBQUY7O0FBRUEsTUFBSWxDLFFBQVEvQixFQUFFLElBQUYsQ0FBWjtBQUFBLE1BQ0NnQixhQUFhZSxNQUFNd0IsT0FBTixDQUFjMUMsUUFBUVIsU0FBdEIsQ0FEZDtBQUFBLE1BRUNhLFVBQVVGLFdBQVdHLFFBQVgsQ0FBb0IsUUFBcEIsQ0FGWDtBQUFBLE1BR0NxQyxVQUFVeEQsRUFBRWMsTUFBRixDQUFTLEVBQVQsRUFBYUQsT0FBYixFQUFzQkcsV0FBV3lDLGVBQVgsQ0FBMkIsVUFBM0IsQ0FBdEIsQ0FIWDs7QUFLQSxNQUFJekMsV0FBV2tELFFBQVgsQ0FBb0JyRCxRQUFRUCxTQUE1QixDQUFKLEVBQTRDO0FBQzNDO0FBQ0FKLGNBQVd3RCxJQUFYLEdBQWtCLEtBQWxCO0FBQ0ExQyxjQUFXMkMsT0FBWCxDQUFtQlYsSUFBSUMsSUFBSixDQUFTQyxRQUFULENBQWtCUyxNQUFsQixDQUF5QkMsVUFBekIsRUFBbkIsRUFBMEQzRCxVQUExRDs7QUFFQTtBQUNBLE9BQUlzRCxRQUFRNUMsZUFBWixFQUE2QjtBQUM1Qk0sWUFBUXlDLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEIsRUFBMUI7QUFDQTtBQUNELEdBVEQsTUFTTztBQUNOO0FBQ0E1QyxlQUFZQyxVQUFaLEVBQXdCd0MsT0FBeEI7QUFDQTlCLGdCQUFhVixVQUFiOztBQUVBZCxjQUFXd0QsSUFBWCxHQUFrQixJQUFsQjtBQUNBMUMsY0FBVzJDLE9BQVgsQ0FBbUJWLElBQUlDLElBQUosQ0FBU0MsUUFBVCxDQUFrQlMsTUFBbEIsQ0FBeUJDLFVBQXpCLEVBQW5CLEVBQTBEM0QsVUFBMUQ7QUFDQUgsU0FBTTRELE9BQU4sQ0FBY1YsSUFBSUMsSUFBSixDQUFTQyxRQUFULENBQWtCUyxNQUFsQixDQUF5Qk8sV0FBekIsRUFBZCxFQUFzRCxDQUFDbkQsVUFBRCxDQUF0RDtBQUNBO0FBQ0QsRUEzQkQ7O0FBNkJBOzs7Ozs7OztBQVFBLEtBQUlvRCxlQUFlLFNBQWZBLFlBQWUsQ0FBU0wsQ0FBVCxFQUFZO0FBQzlCQSxJQUFFQyxjQUFGO0FBQ0FELElBQUVFLGVBQUY7O0FBRUEsTUFBSWxDLFFBQVEvQixFQUFFLElBQUYsQ0FBWjtBQUFBLE1BQ0NxRSxNQUFNdEMsTUFBTVAsTUFBTixFQURQOztBQUdBO0FBQ0EsTUFBSSxDQUFDNkMsSUFBSUgsUUFBSixDQUFhLFVBQWIsQ0FBTCxFQUErQjs7QUFFOUIsT0FBSWxELGFBQWFlLE1BQU13QixPQUFOLENBQWMxQyxRQUFRUixTQUF0QixDQUFqQjtBQUFBLE9BQ0M2QixVQUFVbEIsV0FBV0csUUFBWCxDQUFvQixRQUFwQixDQURYO0FBQUEsT0FFQ0QsVUFBVUYsV0FBV0csUUFBWCxDQUFvQixRQUFwQixDQUZYO0FBQUEsT0FHQ21ELFdBQVdwRCxRQUFRQyxRQUFSLENBQWlCLFdBQWpCLEVBQThCRSxHQUE5QixFQUhaO0FBQUEsT0FJQ2tELFdBQVd4QyxNQUFNeUMsSUFBTixDQUFXLFVBQVgsQ0FKWjtBQUFBLE9BS0NoQyxPQUFPVCxNQUFNYyxJQUFOLEVBTFI7QUFBQSxPQU1DVyxVQUFVeEQsRUFBRWMsTUFBRixDQUFTLEVBQVQsRUFBYUQsT0FBYixFQUFzQkcsV0FBV3lDLGVBQVgsQ0FBMkIsVUFBM0IsQ0FBdEIsQ0FOWDs7QUFRQTtBQUNBO0FBQ0EsT0FBSWEsYUFBYUMsUUFBakIsRUFBMkI7QUFDMUI7QUFDQSxRQUFJRSxZQUFZekIsY0FBY2QsT0FBZCxFQUF1Qk0sSUFBdkIsRUFBNkJnQixPQUE3QixDQUFoQjtBQUNBdEIsWUFDRWYsUUFERixDQUNXLGdCQURYLEVBRUUwQixJQUZGLENBRU80QixTQUZQOztBQUlBO0FBQ0E7QUFDQTtBQUNBdkQsWUFDRUMsUUFERixDQUNXLGFBQWFvRCxRQUFiLEdBQXdCLElBRG5DLEVBRUVHLElBRkYsQ0FFTyxVQUZQLEVBRW1CLElBRm5COztBQUlBO0FBQ0EsUUFBSWxCLFFBQVE3QyxhQUFaLEVBQTJCO0FBQzFCTyxhQUFReUMsT0FBUixDQUFnQixRQUFoQixFQUEwQixFQUExQjtBQUNBO0FBQ0QsSUFsQkQsTUFrQk8sSUFBSUgsUUFBUTVDLGVBQVosRUFBNkI7QUFDbkM7QUFDQU0sWUFBUXlDLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEIsRUFBMUI7QUFDQTs7QUFFRDtBQUNBekQsY0FBV3dELElBQVgsR0FBa0IsS0FBbEI7QUFDQTFDLGNBQVcyQyxPQUFYLENBQW1CVixJQUFJQyxJQUFKLENBQVNDLFFBQVQsQ0FBa0JTLE1BQWxCLENBQXlCQyxVQUF6QixFQUFuQixFQUEwRDNELFVBQTFEO0FBQ0E7QUFDRCxFQS9DRDs7QUFpREE7Ozs7Ozs7O0FBUUEsS0FBSXlFLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQVc7QUFDbkMsTUFBSTNELGFBQWFqQixNQUFNdUIsSUFBTixDQUFXVCxRQUFRUixTQUFuQixDQUFqQjs7QUFFQSxNQUFJUSxRQUFRVCxVQUFSLEdBQXFCNkMsSUFBSUMsSUFBSixDQUFTQyxRQUFULENBQWtCQyxVQUFsQixDQUE2QmhELFVBQTdCLEdBQTBDaUQsRUFBL0QsSUFBcUV4QyxRQUFRSCxlQUFqRixFQUFrRztBQUNqRztBQUNBTSxjQUFXYyxJQUFYLENBQWdCLFlBQVc7QUFDMUIsUUFBSUMsUUFBUS9CLEVBQUUsSUFBRixDQUFaO0FBQUEsUUFDQ2tDLFVBQVVILE1BQU1aLFFBQU4sQ0FBZSxRQUFmLENBRFg7QUFBQSxRQUVDa0IsWUFBWUgsUUFBUWYsUUFBUixDQUFpQixnQkFBakIsQ0FGYjtBQUFBLFFBR0NDLFFBQVFXLE1BQU1ULElBQU4sQ0FBVyx3QkFBWCxFQUFxQ3VCLElBQXJDLEVBSFQ7QUFBQSxRQUlDVyxVQUFVeEQsRUFBRWMsTUFBRixDQUFTLEVBQVQsRUFBYUQsT0FBYixFQUFzQmtCLE1BQU0wQixlQUFOLENBQXNCLFVBQXRCLENBQXRCLENBSlg7QUFBQSxRQUtDZ0IsWUFBWXpCLGNBQWNkLE9BQWQsRUFBdUJkLEtBQXZCLEVBQThCb0MsT0FBOUIsQ0FMYjs7QUFPQW5CLGNBQVVRLElBQVYsQ0FBZTRCLFNBQWY7QUFDQSxJQVREO0FBVUEsR0FaRCxNQVlPO0FBQ047QUFDQTtBQUNBekQsY0FDRWEsV0FERixDQUNjaEIsUUFBUVAsU0FEdEIsRUFFRXdCLElBRkYsQ0FFTyxZQUFXO0FBQ2hCLFFBQUlDLFFBQVEvQixFQUFFLElBQUYsQ0FBWjtBQUFBLFFBQ0NxQyxZQUFZTixNQUFNVCxJQUFOLENBQVcsZ0JBQVgsQ0FEYjtBQUFBLFFBRUNGLFFBQVFXLE1BQU1ULElBQU4sQ0FBVyx3QkFBWCxFQUFxQ3VCLElBQXJDLEVBRlQ7O0FBSUFSLGNBQVVRLElBQVYsQ0FBZXpCLEtBQWY7QUFDQSxJQVJGO0FBU0E7QUFDRCxFQTVCRDs7QUE4QkE7Ozs7Ozs7QUFPQSxLQUFJd0QsZUFBZSxTQUFmQSxZQUFlLENBQVNiLENBQVQsRUFBWWMsQ0FBWixFQUFlO0FBQ2pDLE1BQUlDLGNBQWMvRSxNQUFNdUIsSUFBTixDQUFXVCxRQUFRUixTQUFuQixDQUFsQjtBQUFBLE1BQ0MwRSxXQUFXRixLQUFLN0UsRUFBRStELEVBQUVpQixNQUFKLEVBQVl6QixPQUFaLENBQW9CMUMsUUFBUVAsU0FBNUIsQ0FEakI7O0FBR0F3RSxnQkFBY0EsWUFBWTFDLEdBQVosQ0FBZ0IyQyxRQUFoQixDQUFkO0FBQ0FELGNBQVlqRCxXQUFaLENBQXdCaEIsUUFBUVAsU0FBaEM7QUFDQSxFQU5EOztBQVNGOztBQUVFOzs7O0FBSUFWLFFBQU9xRixJQUFQLEdBQWMsVUFBU0MsSUFBVCxFQUFlOztBQUU1QmhGLGFBQVdpRixTQUFYLEdBQXVCdEUsUUFBUVAsU0FBL0I7O0FBRUFMLFFBQ0VtRixFQURGLENBQ0tuQyxJQUFJQyxJQUFKLENBQVNDLFFBQVQsQ0FBa0JTLE1BQWxCLENBQXlCTyxXQUF6QixLQUF5QyxRQUQ5QyxFQUN3RFMsWUFEeEQsRUFFRVEsRUFGRixDQUVLbkMsSUFBSUMsSUFBSixDQUFTQyxRQUFULENBQWtCUyxNQUFsQixDQUF5QnlCLFVBQXpCLEVBRkwsRUFFNENWLGtCQUY1Qzs7QUFJQTVFLFFBQ0VxRixFQURGLENBQ0ssT0FETCxFQUNjdkUsUUFBUVIsU0FBUixHQUFvQixTQURsQyxFQUM2Q3lELFVBRDdDLEVBRUVzQixFQUZGLENBRUssT0FGTCxFQUVjdkUsUUFBUVIsU0FBUixHQUFvQixPQUZsQyxFQUUyQytELFlBRjNDLEVBR0VnQixFQUhGLENBR0ssUUFITCxFQUdldkUsUUFBUVIsU0FBUixHQUFvQixTQUhuQyxFQUc4Q2lELFdBSDlDOztBQUtBLE1BQUl6QyxRQUFRSixhQUFaLEVBQTJCO0FBQzFCa0U7QUFDQTs7QUFFRE87QUFDQSxFQWxCRDs7QUFvQkE7QUFDQSxRQUFPdEYsTUFBUDtBQUNBLENBN1lGIiwiZmlsZSI6IndpZGdldHMvZHJvcGRvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIGRyb3Bkb3duLmpzIDIwMTYtMDMtMDlcbiBHYW1iaW8gR21iSFxuIGh0dHA6Ly93d3cuZ2FtYmlvLmRlXG4gQ29weXJpZ2h0IChjKSAyMDE1IEdhbWJpbyBHbWJIXG4gUmVsZWFzZWQgdW5kZXIgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIChWZXJzaW9uIDIpXG4gW2h0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMi4wLmh0bWxdXG4gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIENvbXBvbmVudCB0byByZXBsYWNlIHRoZSBkZWZhdWx0IGJyb3dzZXIgc2VsZWN0XG4gKiBib3hlcyB3aXRoIGEgbW9yZSBzdHlsaXNoIGh0bWwgLyBjc3Mgb25lXG4gKi9cbmdhbWJpby53aWRnZXRzLm1vZHVsZShcblx0J2Ryb3Bkb3duJyxcblxuXHRbXG5cdFx0Z2FtYmlvLnNvdXJjZSArICcvbGlicy9ldmVudHMnLFxuXHRcdGdhbWJpby5zb3VyY2UgKyAnL2xpYnMvcmVzcG9uc2l2ZSdcblx0XSxcblxuXHRmdW5jdGlvbihkYXRhKSB7XG5cblx0XHQndXNlIHN0cmljdCc7XG5cbi8vICMjIyMjIyMjIyMgVkFSSUFCTEUgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXG5cdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdCRib2R5ID0gJCgnYm9keScpLFxuXHRcdFx0dHJhbnNpdGlvbiA9IHt9LFxuXHRcdFx0ZGVmYXVsdHMgPSB7XG5cdFx0XHRcdC8vIE1pbmltdW0gYnJlYWtwb2ludCB0byBzd2l0Y2ggdG8gbW9iaWxlIHZpZXdcblx0XHRcdFx0YnJlYWtwb2ludDogNDAsXG5cdFx0XHRcdC8vIENvbnRhaW5lciBzZWxlY3RvciBmb3IgdGhlIGRyb3Bkb3duIG1hcmt1cCB0byBsb29rIGZvclxuXHRcdFx0XHRjb250YWluZXI6ICcuY3VzdG9tLWRyb3Bkb3duJyxcblx0XHRcdFx0Ly8gQ2xhc3MgdGhhdCBnZXRzIGFkZGVkIHRvIG9wZW5lZCBmbHlvdXRzIChAIHRoZSBjb250YWluZXIpXG5cdFx0XHRcdG9wZW5DbGFzczogJ29wZW4nLFxuXHRcdFx0XHQvLyBJZiB0cnVlLCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0gZ2V0cyBoaWRkZW4gZnJvbSB0aGUgZmx5b3V0XG5cdFx0XHRcdGhpZGVBY3RpdmU6IHRydWUsXG5cdFx0XHRcdC8vIFNob3J0ZW5zIHRoZSB0ZXh0IHNob3duIGluIHRoZSBidXR0b24uIFBvc3NpYmxlIHZhbHVlczogQW55IHR5cGUgb2YgaW50ZWdlciwgbnVsbCBmb3IgZG8gbm90aGluZ1xuXHRcdFx0XHRzaG9ydGVuOiAxMCxcblxuXHRcdFx0XHQvLyBvciBcImZpdFwiIGZvciBhdXRvZGV0ZWN0IGxlbmd0aCBkZXBlbmRpbmcgb24gdGhlIGJ1dHRvbiBzaXplIChvbmx5IHdvcmtzIHdpdGggZml4ZWQgd2l0aCBidXR0b25zKVxuXG5cdFx0XHRcdC8vIFNob3J0ZW5zIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnV0dG9uIG9uIGNvbXBvbmVudCBpbml0XG5cdFx0XHRcdHNob3J0ZW5PbkluaXQ6IGZhbHNlLFxuXHRcdFx0XHQvLyBJZiB0cnVlIHRoZSBsYWJlbCB3aWxsIGdldCBzaG9ydGVuZWQgb24gbW9iaWxlIHRvb1xuXHRcdFx0XHRzaG9ydGVuT25Nb2JpbGU6IGZhbHNlLFxuXHRcdFx0XHQvLyBJZiB0cnVlLCBhIGNoYW5nZSBvZiB0aGUgc2VsZWN0Ym94IGJ5IHRoZSBmbHlvdXQgaXMgcmVjZWlwdGVkIHRyb3VnaCBhIGNoYW5nZSB0cmlnZ2VyXG5cdFx0XHRcdHRyaWdnZXJDaGFuZ2U6IHRydWUsXG5cdFx0XHRcdC8vIElmIHRydWUsIGEgY2hhbmdlIGlzIHRyaWdnZXJlZCBvbiBubyBjaGFuZ2Ugb2YgdGhlIHNlbGVjdGJveCBhbHNvXG5cdFx0XHRcdHRyaWdnZXJOb0NoYW5nZTogZmFsc2Vcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBkYXRhKSxcblx0XHRcdG1vZHVsZSA9IHt9O1xuXG5cbi8vICMjIyMjIyMjIyMgSEVMUEVSIEZVTkNUSU9OUyAjIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBoaWRlcyB0aGUgY3VycmVudGx5IGFjdGl2ZVxuXHRcdCAqIGVsZW1lbnQgZnJvbSB0aGUgZHJvcGRvd25cblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgICAgICRjb250YWluZXIgICAgICBqUXVlcnkgc2VsZWN0aW9uIG9mIHRoZSBkcm9wZG93biBjb250YWluZXJcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgICAgIG9wdCAgICAgICAgICAgICBKU09OIHdpdGggY3VzdG9tIHNldHRpbmdzIGZvciB0aGF0IGNvbnRhaW5lclxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9oaWRlQWN0aXZlID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgb3B0KSB7XG5cdFx0XHRpZiAob3B0LmhpZGVBY3RpdmUpIHtcblx0XHRcdFx0dmFyICRzZWxlY3QgPSAkY29udGFpbmVyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCdzZWxlY3QnKSxcblx0XHRcdFx0XHR2YWx1ZSA9ICRzZWxlY3Rcblx0XHRcdFx0XHRcdC5jaGlsZHJlbignOnNlbGVjdGVkJylcblx0XHRcdFx0XHRcdC52YWwoKTtcblxuXHRcdFx0XHQkY29udGFpbmVyXG5cdFx0XHRcdFx0LmZpbmQoJ2xpJylcblx0XHRcdFx0XHQuc2hvdygpXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCdhW2RhdGEtcmVsPVwiJyArIHZhbHVlICsgJ1wiXScpXG5cdFx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdFx0LmhpZGUoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBhIGRpc2FibGVkIGNsYXNzIHRvIHRoZVxuXHRcdCAqIGRpc2FibGVkIGVudHJpZXMgaW4gdGhlIGN1c3RvbSBkcm9wZG93bi4gVGhlcmVmb3Jcblx0XHQgKiB0aGUgb3JpZ2luYWwgc2VsZWN0IGlzIHNjYW5uZWQgZm9yIGRpc2FibGVkIGVudHJpZXNcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgICAgICRjb250YWluZXIgICAgICBqUXVlcnkgc2VsZWN0aW9uIG9mIHRoZSBkcm9wZG93biBjb250YWluZXJcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfc2V0RGlzYWJsZWQgPSBmdW5jdGlvbigkY29udGFpbmVyKSB7XG5cdFx0XHR2YXIgJHVsID0gJGNvbnRhaW5lci5jaGlsZHJlbigpLFxuXHRcdFx0XHQkc2VsZWN0ID0gJGNvbnRhaW5lci5jaGlsZHJlbignc2VsZWN0JyksXG5cdFx0XHRcdCRkaXNhYmxlZCA9ICRzZWxlY3QuY2hpbGRyZW4oJzpkaXNhYmxlZCcpO1xuXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGRpc2FibGVkIGNsYXNzZXMgZmlyc3Rcblx0XHRcdCR1bFxuXHRcdFx0XHQuZmluZCgnLmRpc2FibGVkJylcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuXG5cdFx0XHQvLyBJdGVyYXRlIHRocm91Z2ggYWxsIGVudHJpZXMgdGhhdCBuZWVkcyB0b1xuXHRcdFx0Ly8gYmUgZGlzYWJsZWQgYW5kIGFkZCBhIGNsYXNzIHRvIHRoZW1cblx0XHRcdCRkaXNhYmxlZC5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdHZhbHVlID0gJHNlbGYudmFsKCk7XG5cblx0XHRcdFx0JHVsXG5cdFx0XHRcdFx0LmZpbmQoJ2FbZGF0YS1yZWw9XCInICsgdmFsdWUgKyAnXCJdJylcblx0XHRcdFx0XHQucGFyZW50KClcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIGZvciB0aGUgX3Nob3J0ZW5MYWJlbC1mdW5jdGlvbi5cblx0XHQgKiBUaGlzIGZ1bmN0aW9uIHNob3J0ZW5zIHRoZSBsYWJlbCBzbyB0aGF0IGl0IGZpdHNcblx0XHQgKiBpbnNpZGUgdGhlIGJ1dHRvbi4gQWRkaXRpb25hbCBhdmFpbGFibGUgc2libGluZ3Ncblx0XHQgKiBvZiB0aGUgdGV4dCBlbGVtZW50IHdlcmUgZ2V0dGluZyBzdWJzdHJhY3RlZCBmcm9tXG5cdFx0ICogdGhlIGF2YWlsYWJsZSBidXR0b24gc2l6ZS5cblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgJGJ1dHRvbiAgICAgalF1ZXJ5IHNlbGVjdGlvbiBvZiB0aGUgYnV0dG9uXG5cdFx0ICogQHBhcmFtICAgICAgIHtzdHJpbmd9ICAgIHZhbHVlICAgICAgIFRoZSB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQgYXMgdGhlIGJ1dHRvbiB0ZXh0XG5cdFx0ICogQHJldHVybiAgICAge3N0cmluZ30gICAgICAgICAgICAgICAgVGhlIHNob3J0ZW5lZCBzdHJpbmdcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfc2hvcnRlbkZpdCA9IGZ1bmN0aW9uKCRidXR0b24sIHZhbHVlKSB7XG5cdFx0XHR2YXIgJHNpYmxpbmdzID0gJGJ1dHRvbi5jaGlsZHJlbigpLm5vdCgnLmRyb3Bkb3duLW5hbWUnKSxcblx0XHRcdFx0JHRleHRhcmVhID0gJGJ1dHRvbi5jaGlsZHJlbignLmRyb3Bkb3duLW5hbWUnKSxcblx0XHRcdFx0d2lkdGggPSAkYnV0dG9uLndpZHRoKCksXG5cdFx0XHRcdGxlbmd0aCA9IHZhbHVlLmxlbmd0aCxcblx0XHRcdFx0bmFtZSA9ICcnLFxuXHRcdFx0XHRzaG9ydGVuID0gZmFsc2UsXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHR0ZXN0ID0gbnVsbDtcblxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBzaWJsaW5ncyB3aXRoIGZyb20gdGhlIGF2YWlsYWJsZVxuXHRcdFx0Ly8gZnVsbCB3aWR0aCBvZiB0aGUgYnV0dG9uXG5cdFx0XHQkc2libGluZ3MuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0d2lkdGggLT0gJCh0aGlzKS5vdXRlcldpZHRoKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBsYWJlbCBjaGFyYWN0ZXJzXG5cdFx0XHQvLyBhbmQgYWRkIG9uZSBjaGFyYWN0ZXIgYXQgdGltZSB0byB0aGUgYnV0dG9uXG5cdFx0XHQvLyBpZiB0aGUgdGV4dGZpZWxkIHNpemUgZ3Jvd3MgbGFyZ2VyIHRoYW5cblx0XHRcdC8vIHRoZSBhdmFpbGFibGUgd2lkdGggb2YgdGhlIGJ1dHRvbiBjYW5jZWxcblx0XHRcdC8vIHRoZSBsb29wIGFuZCB0YWtlIHRoZSBsYXN0IGZpdHRpbmcgdmFsdWVcblx0XHRcdC8vIGFzIHJlc3VsdFxuXHRcdFx0Zm9yIChpOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0dGVzdCA9IHZhbHVlLnN1YnN0cmluZygwLCBpKSArICcuLi4nO1xuXHRcdFx0XHQkdGV4dGFyZWEudGV4dCh0ZXN0KTtcblxuXHRcdFx0XHRpZiAoJHRleHRhcmVhLndpZHRoKCkgPiB3aWR0aCkge1xuXHRcdFx0XHRcdHNob3J0ZW4gPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bmFtZSA9IHRlc3Q7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHRoZSB0ZXh0IHdhcyBzaG9ydGVuZWRcblx0XHRcdC8vIHJldHVybiB0aGUgc2hvcnRlbmVkIG5hbWVcblx0XHRcdC8vIGVsc2UgdGhlIGZ1bGwgbmFtZVxuXHRcdFx0aWYgKHNob3J0ZW4pIHtcblx0XHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiBmb3IgdGhlIF9zaG9ydGVuTGFiZWwtZnVuY3Rpb24uXG5cdFx0ICogVGhpcyBmdW5jdGlvbiBzaG9ydGVucyB0aGUgbGFiZWwgdG8gYSBzZXQgbnVtYmVyXG5cdFx0ICogb2YgZGlnZXRzXG5cdFx0ICogQHBhcmFtICAgICAgIHtzdHJpbmd9ICAgIHZhbHVlICAgICAgIFRoZSB2YWx1ZSB0aGF0IHNob3VsZCBiZSBzZXQgYXMgdGhlIGJ1dHRvbiB0ZXh0XG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgIG9wdCAgICAgICAgIEpTT04gd2l0aCBjdXN0b20gc2V0dGluZ3MgZm9yIHRoYXQgY29udGFpbmVyXG5cdFx0ICogQHJldHVybiAgICAge3N0cmluZ30gICAgICAgICAgICAgICAgVGhlIHNob3J0ZW5lZCBzdHJpbmdcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfc2hvcnRlbkludCA9IGZ1bmN0aW9uKHZhbHVlLCBvcHQpIHtcblx0XHRcdHZhciBsZW5ndGggPSB2YWx1ZS5sZW5ndGgsXG5cdFx0XHRcdGRpZmYgPSBsZW5ndGggLSBvcHQuc2hvcnRlbjtcblxuXHRcdFx0aWYgKGRpZmYgPiAwKSB7XG5cdFx0XHRcdGRpZmYgKz0gMztcblx0XHRcdFx0cmV0dXJuIHZhbHVlLnN1YnN0cmluZygwLCBsZW5ndGggLSBkaWZmKSArICcuLi4nO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uIHRoYXQgY2hvb3NlcyB0aGUgY29ycmVjdCBzaG9ydGVuZXJcblx0XHQgKiBzdWJyb3V0aW5lIGZvciBzaG9ydGVuaW5nIHRoZSBidXR0b24gdGV4dFxuXHRcdCAqIChpZiBuZWVkZWQpIGFuZCByZXR1cm5zIHRoZSBzaG9ydGVuZWQgdmFsdWVcblx0XHQgKiB0byB0aGUgY2FsbGVyXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgICRidXR0b24gICAgIGpRdWVyeSBzZWxlY3Rpb24gb2YgdGhlIGJ1dHRvblxuXHRcdCAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSAgICB2YWx1ZSAgICAgICBUaGUgdmFsdWUgdGhhdCBzaG91bGQgYmUgc2V0IGFzIHRoZSBidXR0b24gdGV4dFxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICBvcHQgICAgICAgICBKU09OIHdpdGggY3VzdG9tIHNldHRpbmdzIGZvciB0aGF0IGNvbnRhaW5lclxuXHRcdCAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICAgICAgICAgICAgICAgIFRoZSBzaG9ydGVuZWQgc3RyaW5nXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3Nob3J0ZW5MYWJlbCA9IGZ1bmN0aW9uKCRidXR0b24sIHZhbHVlLCBvcHQpIHtcblx0XHRcdGlmIChvcHRpb25zLmJyZWFrcG9pbnQgPCBqc2UubGlicy50ZW1wbGF0ZS5yZXNwb25zaXZlLmJyZWFrcG9pbnQoKS5pZCB8fCBvcHQuc2hvcnRlbk9uTW9iaWxlKSB7XG5cdFx0XHRcdGlmIChvcHQuc2hvcnRlbiA9PT0gJ2ZpdCcpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IF9zaG9ydGVuRml0KCRidXR0b24sIHZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChvcHQuc2hvcnRlbikge1xuXHRcdFx0XHRcdHZhbHVlID0gX3Nob3J0ZW5JbnQodmFsdWUsIG9wdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cblxuLy8gIyMjIyMjIyMjIyBFVkVOVCBIQU5ETEVSICMjIyMjIyMjIyNcblxuXHRcdC8qKlxuXHRcdCAqIEV2ZW50IGhhbmRsZXIgdGhhdCBpc3QgdHJpZ2dlcmVkIG9uIGNoYW5nZVxuXHRcdCAqIG9mIHRoZSBzZWxlY3Rib3ggdG8gZm9yY2UgdGhlIGRyb3Bkb3duIHRvIGNsb3NlXG5cdFx0ICogKG5lZWRlZCBvbiBtb2JpbGUgZGV2aWNlcywgYmVjYXVzZSBvZiBpdCdzIG5hdGl2ZVxuXHRcdCAqIHN1cHBvcnQgZm9yIGRyb3Bkb3ducylcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfY2xvc2VMYXllciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdFx0JGNvbnRhaW5lciA9ICRzZWxmLmNsb3Nlc3Qob3B0aW9ucy5jb250YWluZXIpLFxuXHRcdFx0XHQkc2VsZWN0ID0gJGNvbnRhaW5lci5jaGlsZHJlbignc2VsZWN0JyksXG5cdFx0XHRcdGRhdGFzZXQgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucywgJGNvbnRhaW5lci5wYXJzZU1vZHVsZURhdGEoJ2Ryb3Bkb3duJykpO1xuXG5cdFx0XHR0cmFuc2l0aW9uLm9wZW4gPSBmYWxzZTtcblx0XHRcdCRjb250YWluZXIudHJpZ2dlcihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuVFJBTlNJVElPTigpLCB0cmFuc2l0aW9uKTtcblxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgY2hhbmdlIGV2ZW50IGlmIHRoZSBvcHRpb24gaXMgc2V0XG5cdFx0XHRpZiAoZGF0YXNldC50cmlnZ2VyTm9DaGFuZ2UpIHtcblx0XHRcdFx0JHNlbGVjdC50cmlnZ2VyKCdjaGFuZ2UnLCBbXSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uIGdldHMgdHJpZ2dlcmVkIG9uIGNsaWNrIG9uIHRoZSBidXR0b24uXG5cdFx0ICogSXQgc3dpdGNoZXMgdGhlIHN0YXRlIG9mIHRoZSBkcm9wZG93biB2aXNpYmlsaXR5XG5cdFx0ICogQHBhcmFtICAgICAgICAgICB7b2JqZWN0fSAgICBlICAgICAgIGpRdWVyeSBldmVudCBvYmplY3Rcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfb3BlbkxheWVyID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdFx0JGNvbnRhaW5lciA9ICRzZWxmLmNsb3Nlc3Qob3B0aW9ucy5jb250YWluZXIpLFxuXHRcdFx0XHQkc2VsZWN0ID0gJGNvbnRhaW5lci5jaGlsZHJlbignc2VsZWN0JyksXG5cdFx0XHRcdGRhdGFzZXQgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucywgJGNvbnRhaW5lci5wYXJzZU1vZHVsZURhdGEoJ2Ryb3Bkb3duJykpO1xuXG5cdFx0XHRpZiAoJGNvbnRhaW5lci5oYXNDbGFzcyhvcHRpb25zLm9wZW5DbGFzcykpIHtcblx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBvcGVuIGNsYXNzIGlmIHRoZSBsYXllciBpcyBvcGVuZWRcblx0XHRcdFx0dHJhbnNpdGlvbi5vcGVuID0gZmFsc2U7XG5cdFx0XHRcdCRjb250YWluZXIudHJpZ2dlcihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuVFJBTlNJVElPTigpLCB0cmFuc2l0aW9uKTtcblxuXHRcdFx0XHQvLyBUcmlnZ2VyIHRoZSBjaGFuZ2UgZXZlbnQgaWYgdGhlIG9wdGlvbiBpcyBzZXRcblx0XHRcdFx0aWYgKGRhdGFzZXQudHJpZ2dlck5vQ2hhbmdlKSB7XG5cdFx0XHRcdFx0JHNlbGVjdC50cmlnZ2VyKCdjaGFuZ2UnLCBbXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEFkZCB0aGUgb3BlbiBjbGFzcyBhbmQgaW5mb3JtIG90aGVyIGxheWVycyB0byBjbG9zZVxuXHRcdFx0XHRfaGlkZUFjdGl2ZSgkY29udGFpbmVyLCBkYXRhc2V0KTtcblx0XHRcdFx0X3NldERpc2FibGVkKCRjb250YWluZXIpO1xuXG5cdFx0XHRcdHRyYW5zaXRpb24ub3BlbiA9IHRydWU7XG5cdFx0XHRcdCRjb250YWluZXIudHJpZ2dlcihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuVFJBTlNJVElPTigpLCB0cmFuc2l0aW9uKTtcblx0XHRcdFx0JHRoaXMudHJpZ2dlcihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuT1BFTl9GTFlPVVQoKSwgWyRjb250YWluZXJdKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGFuZGxlciB0aGF0IGdldHMgdXNlZCBpZiB0aGUgdXNlclxuXHRcdCAqIHNlbGVjdHMgYSB2YWx1ZSBmcm9tIHRoZSBjdXN0b20gZHJvcGRvd24uXG5cdFx0ICogSWYgdGhlIHZhbHVlIGhhcyBjaGFuZ2VkLCB0aGUgdmlldyBnZXRzXG5cdFx0ICogdXBkYXRlZCBhbmQgdGhlIG9yaWdpbmFsIHNlbGVjdCBnZXRzIHNldFxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICBlICAgICAgIGpRdWVyeSBldmVudCBvYmplY3Rcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfc2VsZWN0RW50cnkgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpLFxuXHRcdFx0XHQkbGkgPSAkc2VsZi5wYXJlbnQoKTtcblxuXHRcdFx0Ly8gSWYgdGhlIGl0ZW0gaXMgZGlzYWJsZWQsIGRvIG5vdGhpbmdcblx0XHRcdGlmICghJGxpLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XG5cblx0XHRcdFx0dmFyICRjb250YWluZXIgPSAkc2VsZi5jbG9zZXN0KG9wdGlvbnMuY29udGFpbmVyKSxcblx0XHRcdFx0XHQkYnV0dG9uID0gJGNvbnRhaW5lci5jaGlsZHJlbignYnV0dG9uJyksXG5cdFx0XHRcdFx0JHNlbGVjdCA9ICRjb250YWluZXIuY2hpbGRyZW4oJ3NlbGVjdCcpLFxuXHRcdFx0XHRcdG9sZFZhbHVlID0gJHNlbGVjdC5jaGlsZHJlbignOnNlbGVjdGVkJykudmFsKCksXG5cdFx0XHRcdFx0bmV3VmFsdWUgPSAkc2VsZi5hdHRyKCdkYXRhLXJlbCcpLFxuXHRcdFx0XHRcdG5hbWUgPSAkc2VsZi50ZXh0KCksXG5cdFx0XHRcdFx0ZGF0YXNldCA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zLCAkY29udGFpbmVyLnBhcnNlTW9kdWxlRGF0YSgnZHJvcGRvd24nKSk7XG5cblx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBkcm9wZG93biB2aWV3IGlmIHRoZVxuXHRcdFx0XHQvLyB2YWx1ZSBoYXMgY2hhbmdlZFxuXHRcdFx0XHRpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG5cdFx0XHRcdFx0Ly8gU2V0IHRoZSBidXR0b24gdGV4dFxuXHRcdFx0XHRcdHZhciBzaG9ydGVuZWQgPSBfc2hvcnRlbkxhYmVsKCRidXR0b24sIG5hbWUsIGRhdGFzZXQpO1xuXHRcdFx0XHRcdCRidXR0b25cblx0XHRcdFx0XHRcdC5jaGlsZHJlbignLmRyb3Bkb3duLW5hbWUnKVxuXHRcdFx0XHRcdFx0LnRleHQoc2hvcnRlbmVkKTtcblxuXHRcdFx0XHRcdC8vIFNldCB0aGUgXCJvcmlnaW5hbFwiIHNlbGVjdCBib3ggYW5kXG5cdFx0XHRcdFx0Ly8gbm90aWZ5IHRoZSBicm93c2VyIC8gb3RoZXIganMgdGhhdCB0aGVcblx0XHRcdFx0XHQvLyB2YWx1ZSBoYXMgY2hhbmdlZFxuXHRcdFx0XHRcdCRzZWxlY3Rcblx0XHRcdFx0XHRcdC5jaGlsZHJlbignW3ZhbHVlPVwiJyArIG5ld1ZhbHVlICsgJ1wiXScpXG5cdFx0XHRcdFx0XHQucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcblxuXHRcdFx0XHRcdC8vIFRyaWdnZXIgdGhlIGNoYW5nZSBldmVudCBpZiB0aGUgb3B0aW9uIGlzIHNldFxuXHRcdFx0XHRcdGlmIChkYXRhc2V0LnRyaWdnZXJDaGFuZ2UpIHtcblx0XHRcdFx0XHRcdCRzZWxlY3QudHJpZ2dlcignY2hhbmdlJywgW10pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChkYXRhc2V0LnRyaWdnZXJOb0NoYW5nZSkge1xuXHRcdFx0XHRcdC8vIFRyaWdnZXIgdGhlIGNoYW5nZSBldmVudCBpZiB0aGUgb3B0aW9uIGlzIHNldFxuXHRcdFx0XHRcdCRzZWxlY3QudHJpZ2dlcignY2hhbmdlJywgW10pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ2xvc2UgdGhlIGxheWVyXG5cdFx0XHRcdHRyYW5zaXRpb24ub3BlbiA9IGZhbHNlO1xuXHRcdFx0XHQkY29udGFpbmVyLnRyaWdnZXIoanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLlRSQU5TSVRJT04oKSwgdHJhbnNpdGlvbik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhhbmRsZXMgdGhlIHN3aXRjaCBiZXR3ZWVuIHRoZSBicmVha3BvaW50LiBJZiB0aGVcblx0XHQgKiBzaXplIG9mIHRoZSBidXR0b24gY2hhbmdlcyB0aGUgdGV4dCB3aWxsIGJlIHNob3J0ZW5lZFxuXHRcdCAqIGFnYWluIHRvIGZpdC4gSWYgdGhlIHZpZXcgc3dpdGNoZXMgdG8gbW9iaWxlLCB0aGlzXG5cdFx0ICogYmVoYXZpb3VyIGlzIHNraXBwZWQgdGhlIGZ1bGwgbmFtZSB3aWxsIGJlIGRpc3BsYXllZFxuXHRcdCAqIGFnYWluXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2JyZWFrcG9pbnRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgJGNvbnRhaW5lciA9ICR0aGlzLmZpbmQob3B0aW9ucy5jb250YWluZXIpO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5icmVha3BvaW50IDwganNlLmxpYnMudGVtcGxhdGUucmVzcG9uc2l2ZS5icmVha3BvaW50KCkuaWQgfHwgb3B0aW9ucy5zaG9ydGVuT25Nb2JpbGUpIHtcblx0XHRcdFx0Ly8gSWYgc3RpbGwgaW4gZGVza3RvcCBtb2RlLCB0cnkgdG8gc2hvcnRlbiB0aGUgbmFtZVxuXHRcdFx0XHQkY29udGFpbmVyLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdCRidXR0b24gPSAkc2VsZi5jaGlsZHJlbignYnV0dG9uJyksXG5cdFx0XHRcdFx0XHQkdGV4dGFyZWEgPSAkYnV0dG9uLmNoaWxkcmVuKCcuZHJvcGRvd24tbmFtZScpLFxuXHRcdFx0XHRcdFx0dmFsdWUgPSAkc2VsZi5maW5kKCdzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpLFxuXHRcdFx0XHRcdFx0ZGF0YXNldCA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zLCAkc2VsZi5wYXJzZU1vZHVsZURhdGEoJ2Ryb3Bkb3duJykpLFxuXHRcdFx0XHRcdFx0c2hvcnRlbmVkID0gX3Nob3J0ZW5MYWJlbCgkYnV0dG9uLCB2YWx1ZSwgZGF0YXNldCk7XG5cblx0XHRcdFx0XHQkdGV4dGFyZWEudGV4dChzaG9ydGVuZWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIElmIGluIG1vYmlsZSBtb2RlIGluc2VydCB0aGUgY29tcGxldGUgbmFtZSBhZ2FpblxuXHRcdFx0XHQvLyBhbmQgY2xvc2Ugb3BlbmVkIGxheWVyc1xuXHRcdFx0XHQkY29udGFpbmVyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKG9wdGlvbnMub3BlbkNsYXNzKVxuXHRcdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdFx0JHRleHRhcmVhID0gJHNlbGYuZmluZCgnLmRyb3Bkb3duLW5hbWUnKSxcblx0XHRcdFx0XHRcdFx0dmFsdWUgPSAkc2VsZi5maW5kKCdzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xuXG5cdFx0XHRcdFx0XHQkdGV4dGFyZWEudGV4dCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhhbmRsZXIgZm9yIGNsb3NpbmcgYWxsIGRyb3Bkb3duIGZseW91dHMgaWZcblx0XHQgKiBzb21ld2hlcmUgb24gdGhlIHBhZ2Ugb3BlbnMgYW4gb3RoZXIgZmx5b3V0XG5cdFx0ICogQHBhcmFtICAge29iamVjdH0gICAgZSAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHBhcmFtICAge29iamVjdH0gICAgZCAgICAgICBqUXVlcnkgc2VsZWN0aW9uIG9mIHRoZSBldmVudCBlbWl0dGVyXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2Nsb3NlRmx5b3V0ID0gZnVuY3Rpb24oZSwgZCkge1xuXHRcdFx0dmFyICRjb250YWluZXJzID0gJHRoaXMuZmluZChvcHRpb25zLmNvbnRhaW5lciksXG5cdFx0XHRcdCRleGNsdWRlID0gZCB8fCAkKGUudGFyZ2V0KS5jbG9zZXN0KG9wdGlvbnMub3BlbkNsYXNzKTtcblxuXHRcdFx0JGNvbnRhaW5lcnMgPSAkY29udGFpbmVycy5ub3QoJGV4Y2x1ZGUpO1xuXHRcdFx0JGNvbnRhaW5lcnMucmVtb3ZlQ2xhc3Mob3B0aW9ucy5vcGVuQ2xhc3MpO1xuXHRcdH07XG5cblxuLy8gIyMjIyMjIyMjIyBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBJbml0IGZ1bmN0aW9uIG9mIHRoZSB3aWRnZXRcblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRtb2R1bGUuaW5pdCA9IGZ1bmN0aW9uKGRvbmUpIHtcblxuXHRcdFx0dHJhbnNpdGlvbi5jbGFzc09wZW4gPSBvcHRpb25zLm9wZW5DbGFzcztcblxuXHRcdFx0JGJvZHlcblx0XHRcdFx0Lm9uKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5PUEVOX0ZMWU9VVCgpICsgJyBjbGljaycsIF9jbG9zZUZseW91dClcblx0XHRcdFx0Lm9uKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5CUkVBS1BPSU5UKCksIF9icmVha3BvaW50SGFuZGxlcik7XG5cblx0XHRcdCR0aGlzXG5cdFx0XHRcdC5vbignY2xpY2snLCBvcHRpb25zLmNvbnRhaW5lciArICcgYnV0dG9uJywgX29wZW5MYXllcilcblx0XHRcdFx0Lm9uKCdjbGljaycsIG9wdGlvbnMuY29udGFpbmVyICsgJyB1bCBhJywgX3NlbGVjdEVudHJ5KVxuXHRcdFx0XHQub24oJ2NoYW5nZScsIG9wdGlvbnMuY29udGFpbmVyICsgJyBzZWxlY3QnLCBfY2xvc2VMYXllcik7XG5cblx0XHRcdGlmIChvcHRpb25zLnNob3J0ZW5PbkluaXQpIHtcblx0XHRcdFx0X2JyZWFrcG9pbnRIYW5kbGVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdGRvbmUoKTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJuIGRhdGEgdG8gd2lkZ2V0IGVuZ2luZVxuXHRcdHJldHVybiBtb2R1bGU7XG5cdH0pO1xuIl19
