'use strict';

/* --------------------------------------------------------------
 tabs.js 2015-09-30 gm
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2015 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/**
 * Widget that enables the tabs / accordion
 */
gambio.widgets.module('tabs', [], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $tabs = null,
	    $content = null,
	    $tabList = null,
	    $contentList = null,
	    transition = {
		classOpen: 'active',
		open: false,
		calcHeight: true
	},
	    defaults = {},
	    options = $.extend(true, {}, defaults, data),
	    module = {};

	// ########## HELPER FUNCTIONS ##########

	/**
  * Function that sets the active classes to the
  * tabs and the content headers and shows / hides
  * the content
  * @param       {integer}       index       The index of the clicked element
  * @private
  */
	var _setClasses = function _setClasses(index) {
		// Set the active tab
		$tabList.removeClass('active').eq(index).addClass('active');

		transition.open = false;
		var $hide = $contentList.filter('.active').removeClass('active').children('.tab-body'),
		    $show = $contentList.eq(index);

		$show.addClass('active').find('.tab-body').addClass('active');
	};

	// ########## EVENT HANDLER ##########

	/**
  * Click handler for the tabs. It hides
  * all other tab content except it's own
  * @param       {object}    e       jQuery event object
  * @private
  */
	var _clickHandlerTabs = function _clickHandlerTabs(e) {
		e.preventDefault();
		e.stopPropagation();

		var $self = $(this),
		    index = $self.index();

		if (!$self.hasClass('active')) {
			_setClasses(index);
		}
	};

	/**
  * Click handler for the accordion. It hides
  * all other tab content except it's own
  * @param       {object}    e       jQuery event object
  * @private
  */
	var _clickHandlerAccordion = function _clickHandlerAccordion(e) {
		e.preventDefault();
		e.stopPropagation();

		var $self = $(this),
		    $container = $self.closest('.tab-pane'),
		    index = $container.index(),
		    containerHeight = $self.height();

		if (!$container.hasClass('active')) {
			_setClasses(index);
		}

		$('html,body').animate({ scrollTop: $self.offset().top - containerHeight }, 'slow');
	};

	// ########## INITIALIZATION ##########

	/**
  * Init function of the widget
  * @constructor
  */
	module.init = function (done) {

		$tabs = $this.children('.nav-tabs');
		$tabList = $tabs.children('li');
		$content = $this.children('.tab-content');
		$contentList = $content.children('.tab-pane');

		$this.on('click', '.nav-tabs li', _clickHandlerTabs).on('click', '.tab-content .tab-heading', _clickHandlerAccordion);

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvdGFicy5qcyJdLCJuYW1lcyI6WyJnYW1iaW8iLCJ3aWRnZXRzIiwibW9kdWxlIiwiZGF0YSIsIiR0aGlzIiwiJCIsIiR0YWJzIiwiJGNvbnRlbnQiLCIkdGFiTGlzdCIsIiRjb250ZW50TGlzdCIsInRyYW5zaXRpb24iLCJjbGFzc09wZW4iLCJvcGVuIiwiY2FsY0hlaWdodCIsImRlZmF1bHRzIiwib3B0aW9ucyIsImV4dGVuZCIsIl9zZXRDbGFzc2VzIiwiaW5kZXgiLCJyZW1vdmVDbGFzcyIsImVxIiwiYWRkQ2xhc3MiLCIkaGlkZSIsImZpbHRlciIsImNoaWxkcmVuIiwiJHNob3ciLCJmaW5kIiwiX2NsaWNrSGFuZGxlclRhYnMiLCJlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCIkc2VsZiIsImhhc0NsYXNzIiwiX2NsaWNrSGFuZGxlckFjY29yZGlvbiIsIiRjb250YWluZXIiLCJjbG9zZXN0IiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsImluaXQiLCJkb25lIiwib24iXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7QUFVQTs7O0FBR0FBLE9BQU9DLE9BQVAsQ0FBZUMsTUFBZixDQUFzQixNQUF0QixFQUE4QixFQUE5QixFQUFrQyxVQUFTQyxJQUFULEVBQWU7O0FBRWhEOztBQUVEOztBQUVDLEtBQUlDLFFBQVFDLEVBQUUsSUFBRixDQUFaO0FBQUEsS0FDQ0MsUUFBUSxJQURUO0FBQUEsS0FFQ0MsV0FBVyxJQUZaO0FBQUEsS0FHQ0MsV0FBVyxJQUhaO0FBQUEsS0FJQ0MsZUFBZSxJQUpoQjtBQUFBLEtBS0NDLGFBQWE7QUFDWkMsYUFBVyxRQURDO0FBRVpDLFFBQU0sS0FGTTtBQUdaQyxjQUFZO0FBSEEsRUFMZDtBQUFBLEtBVUNDLFdBQVcsRUFWWjtBQUFBLEtBV0NDLFVBQVVWLEVBQUVXLE1BQUYsQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQkYsUUFBbkIsRUFBNkJYLElBQTdCLENBWFg7QUFBQSxLQVlDRCxTQUFTLEVBWlY7O0FBZUQ7O0FBRUM7Ozs7Ozs7QUFPQSxLQUFJZSxjQUFjLFNBQWRBLFdBQWMsQ0FBU0MsS0FBVCxFQUFnQjtBQUNqQztBQUNBVixXQUNFVyxXQURGLENBQ2MsUUFEZCxFQUVFQyxFQUZGLENBRUtGLEtBRkwsRUFHRUcsUUFIRixDQUdXLFFBSFg7O0FBS0FYLGFBQVdFLElBQVgsR0FBa0IsS0FBbEI7QUFDQSxNQUFJVSxRQUFRYixhQUNWYyxNQURVLENBQ0gsU0FERyxFQUVWSixXQUZVLENBRUUsUUFGRixFQUdWSyxRQUhVLENBR0QsV0FIQyxDQUFaO0FBQUEsTUFJQ0MsUUFBUWhCLGFBQWFXLEVBQWIsQ0FBZ0JGLEtBQWhCLENBSlQ7O0FBTUFPLFFBQ0VKLFFBREYsQ0FDVyxRQURYLEVBRUVLLElBRkYsQ0FFTyxXQUZQLEVBR0VMLFFBSEYsQ0FHVyxRQUhYO0FBSUEsRUFsQkQ7O0FBcUJEOztBQUVDOzs7Ozs7QUFNQSxLQUFJTSxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFTQyxDQUFULEVBQVk7QUFDbkNBLElBQUVDLGNBQUY7QUFDQUQsSUFBRUUsZUFBRjs7QUFFQSxNQUFJQyxRQUFRMUIsRUFBRSxJQUFGLENBQVo7QUFBQSxNQUNDYSxRQUFRYSxNQUFNYixLQUFOLEVBRFQ7O0FBR0EsTUFBSSxDQUFDYSxNQUFNQyxRQUFOLENBQWUsUUFBZixDQUFMLEVBQStCO0FBQzlCZixlQUFZQyxLQUFaO0FBQ0E7QUFDRCxFQVZEOztBQVlBOzs7Ozs7QUFNQSxLQUFJZSx5QkFBeUIsU0FBekJBLHNCQUF5QixDQUFTTCxDQUFULEVBQVk7QUFDeENBLElBQUVDLGNBQUY7QUFDQUQsSUFBRUUsZUFBRjs7QUFFQSxNQUFJQyxRQUFRMUIsRUFBRSxJQUFGLENBQVo7QUFBQSxNQUNDNkIsYUFBYUgsTUFBTUksT0FBTixDQUFjLFdBQWQsQ0FEZDtBQUFBLE1BRUNqQixRQUFRZ0IsV0FBV2hCLEtBQVgsRUFGVDtBQUFBLE1BR0NrQixrQkFBa0JMLE1BQU1NLE1BQU4sRUFIbkI7O0FBS0EsTUFBSSxDQUFDSCxXQUFXRixRQUFYLENBQW9CLFFBQXBCLENBQUwsRUFBb0M7QUFDbkNmLGVBQVlDLEtBQVo7QUFDQTs7QUFFRGIsSUFBRSxXQUFGLEVBQWVpQyxPQUFmLENBQXVCLEVBQUNDLFdBQVdSLE1BQU1TLE1BQU4sR0FBZUMsR0FBZixHQUFxQkwsZUFBakMsRUFBdkIsRUFBMEUsTUFBMUU7QUFDQSxFQWREOztBQWlCRDs7QUFFQzs7OztBQUlBbEMsUUFBT3dDLElBQVAsR0FBYyxVQUFTQyxJQUFULEVBQWU7O0FBRTVCckMsVUFBUUYsTUFBTW9CLFFBQU4sQ0FBZSxXQUFmLENBQVI7QUFDQWhCLGFBQVdGLE1BQU1rQixRQUFOLENBQWUsSUFBZixDQUFYO0FBQ0FqQixhQUFXSCxNQUFNb0IsUUFBTixDQUFlLGNBQWYsQ0FBWDtBQUNBZixpQkFBZUYsU0FBU2lCLFFBQVQsQ0FBa0IsV0FBbEIsQ0FBZjs7QUFFQXBCLFFBQ0V3QyxFQURGLENBQ0ssT0FETCxFQUNjLGNBRGQsRUFDOEJqQixpQkFEOUIsRUFFRWlCLEVBRkYsQ0FFSyxPQUZMLEVBRWMsMkJBRmQsRUFFMkNYLHNCQUYzQzs7QUFJQVU7QUFDQSxFQVpEOztBQWNBO0FBQ0EsUUFBT3pDLE1BQVA7QUFDQSxDQXBIRCIsImZpbGUiOiJ3aWRnZXRzL3RhYnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIHRhYnMuanMgMjAxNS0wOS0zMCBnbVxuIEdhbWJpbyBHbWJIXG4gaHR0cDovL3d3dy5nYW1iaW8uZGVcbiBDb3B5cmlnaHQgKGMpIDIwMTUgR2FtYmlvIEdtYkhcbiBSZWxlYXNlZCB1bmRlciB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgKFZlcnNpb24gMilcbiBbaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2dwbC0yLjAuaHRtbF1cbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbi8qKlxuICogV2lkZ2V0IHRoYXQgZW5hYmxlcyB0aGUgdGFicyAvIGFjY29yZGlvblxuICovXG5nYW1iaW8ud2lkZ2V0cy5tb2R1bGUoJ3RhYnMnLCBbXSwgZnVuY3Rpb24oZGF0YSkge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuLy8gIyMjIyMjIyMjIyBWQVJJQUJMRSBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cblx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHQkdGFicyA9IG51bGwsXG5cdFx0JGNvbnRlbnQgPSBudWxsLFxuXHRcdCR0YWJMaXN0ID0gbnVsbCxcblx0XHQkY29udGVudExpc3QgPSBudWxsLFxuXHRcdHRyYW5zaXRpb24gPSB7XG5cdFx0XHRjbGFzc09wZW46ICdhY3RpdmUnLFxuXHRcdFx0b3BlbjogZmFsc2UsXG5cdFx0XHRjYWxjSGVpZ2h0OiB0cnVlXG5cdFx0fSxcblx0XHRkZWZhdWx0cyA9IHt9LFxuXHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGRhdGEpLFxuXHRcdG1vZHVsZSA9IHt9O1xuXG5cbi8vICMjIyMjIyMjIyMgSEVMUEVSIEZVTkNUSU9OUyAjIyMjIyMjIyMjXG5cblx0LyoqXG5cdCAqIEZ1bmN0aW9uIHRoYXQgc2V0cyB0aGUgYWN0aXZlIGNsYXNzZXMgdG8gdGhlXG5cdCAqIHRhYnMgYW5kIHRoZSBjb250ZW50IGhlYWRlcnMgYW5kIHNob3dzIC8gaGlkZXNcblx0ICogdGhlIGNvbnRlbnRcblx0ICogQHBhcmFtICAgICAgIHtpbnRlZ2VyfSAgICAgICBpbmRleCAgICAgICBUaGUgaW5kZXggb2YgdGhlIGNsaWNrZWQgZWxlbWVudFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIF9zZXRDbGFzc2VzID0gZnVuY3Rpb24oaW5kZXgpIHtcblx0XHQvLyBTZXQgdGhlIGFjdGl2ZSB0YWJcblx0XHQkdGFiTGlzdFxuXHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXHRcdFx0LmVxKGluZGV4KVxuXHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKTtcblxuXHRcdHRyYW5zaXRpb24ub3BlbiA9IGZhbHNlO1xuXHRcdHZhciAkaGlkZSA9ICRjb250ZW50TGlzdFxuXHRcdFx0LmZpbHRlcignLmFjdGl2ZScpXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cdFx0XHQuY2hpbGRyZW4oJy50YWItYm9keScpLFxuXHRcdFx0JHNob3cgPSAkY29udGVudExpc3QuZXEoaW5kZXgpO1xuXG5cdFx0JHNob3dcblx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJylcblx0XHRcdC5maW5kKCcudGFiLWJvZHknKVxuXHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKTtcblx0fTtcblxuXG4vLyAjIyMjIyMjIyMjIEVWRU5UIEhBTkRMRVIgIyMjIyMjIyMjI1xuXG5cdC8qKlxuXHQgKiBDbGljayBoYW5kbGVyIGZvciB0aGUgdGFicy4gSXQgaGlkZXNcblx0ICogYWxsIG90aGVyIHRhYiBjb250ZW50IGV4Y2VwdCBpdCdzIG93blxuXHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgZSAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgX2NsaWNrSGFuZGxlclRhYnMgPSBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpLFxuXHRcdFx0aW5kZXggPSAkc2VsZi5pbmRleCgpO1xuXG5cdFx0aWYgKCEkc2VsZi5oYXNDbGFzcygnYWN0aXZlJykpIHtcblx0XHRcdF9zZXRDbGFzc2VzKGluZGV4KTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIENsaWNrIGhhbmRsZXIgZm9yIHRoZSBhY2NvcmRpb24uIEl0IGhpZGVzXG5cdCAqIGFsbCBvdGhlciB0YWIgY29udGVudCBleGNlcHQgaXQncyBvd25cblx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgIGUgICAgICAgalF1ZXJ5IGV2ZW50IG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIF9jbGlja0hhbmRsZXJBY2NvcmRpb24gPSBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XG5cdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdCRjb250YWluZXIgPSAkc2VsZi5jbG9zZXN0KCcudGFiLXBhbmUnKSxcblx0XHRcdGluZGV4ID0gJGNvbnRhaW5lci5pbmRleCgpLFxuXHRcdFx0Y29udGFpbmVySGVpZ2h0ID0gJHNlbGYuaGVpZ2h0KCk7XG5cblx0XHRpZiAoISRjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG5cdFx0XHRfc2V0Q2xhc3NlcyhpbmRleCk7XG5cdFx0fVxuXHRcdFxuXHRcdCQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogJHNlbGYub2Zmc2V0KCkudG9wIC0gY29udGFpbmVySGVpZ2h0fSwgJ3Nsb3cnKTtcblx0fTtcblxuXG4vLyAjIyMjIyMjIyMjIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHQvKipcblx0ICogSW5pdCBmdW5jdGlvbiBvZiB0aGUgd2lkZ2V0XG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0bW9kdWxlLmluaXQgPSBmdW5jdGlvbihkb25lKSB7XG5cblx0XHQkdGFicyA9ICR0aGlzLmNoaWxkcmVuKCcubmF2LXRhYnMnKTtcblx0XHQkdGFiTGlzdCA9ICR0YWJzLmNoaWxkcmVuKCdsaScpO1xuXHRcdCRjb250ZW50ID0gJHRoaXMuY2hpbGRyZW4oJy50YWItY29udGVudCcpO1xuXHRcdCRjb250ZW50TGlzdCA9ICRjb250ZW50LmNoaWxkcmVuKCcudGFiLXBhbmUnKTtcblxuXHRcdCR0aGlzXG5cdFx0XHQub24oJ2NsaWNrJywgJy5uYXYtdGFicyBsaScsIF9jbGlja0hhbmRsZXJUYWJzKVxuXHRcdFx0Lm9uKCdjbGljaycsICcudGFiLWNvbnRlbnQgLnRhYi1oZWFkaW5nJywgX2NsaWNrSGFuZGxlckFjY29yZGlvbik7XG5cblx0XHRkb25lKCk7XG5cdH07XG5cblx0Ly8gUmV0dXJuIGRhdGEgdG8gd2lkZ2V0IGVuZ2luZVxuXHRyZXR1cm4gbW9kdWxlO1xufSk7Il19
