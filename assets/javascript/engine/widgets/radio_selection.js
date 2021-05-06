'use strict';

/* --------------------------------------------------------------
 radio_selection.js 2018-02-05
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2018 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

gambio.widgets.module('radio_selection', [], function (data) {

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


	var _changeHandler = function _changeHandler() {
		var $self = $(this),
		    $row = $self.closest(options.selection);

		$this.find(options.selection).removeClass(options.className);

		$self.closest(options.selection).addClass(options.className);

		if ($self.parent().hasClass('shipping-submodule-selection')) {
			$('.shipping-submodule-title .shipping-module-selection input:radio').not($self).prop('checked', false);
			$row.find('.shipping-submodule-title .shipping-module-selection input:radio').prop('checked', true);
		} else if ($self.hasClass('placeholder-radio')) {
			$row.find('.shipping-submodule-selection input:radio').first().prop('checked', true);
			$('.shipping-submodule-title .shipping-module-selection input:radio').not($self).prop('checked', false);
		} else {
			$('.shipping-submodule-title .shipping-module-selection input:radio').prop('checked', false);
		}
	};

	var _changeHandlerCheckbox = function _changeHandlerCheckbox() {
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
	module.init = function (done) {
		$this.on('change', 'input:radio:not(:disabled)', _changeHandler).on('change', 'input:checkbox', _changeHandlerCheckbox);

		if (options.init) {
			$this.find('input:checkbox, input:radio:checked:not(:disabled)').trigger('change', []);
		}

		$this.find('.list-group-item').on('click', function () {
			$(this).find('label input:radio:not(:disabled):not(.placeholder-radio)').first().prop('checked', true).trigger('change');
		});

		$this.find('.list-group-item').each(function () {
			if ($(this).find('label input:radio:not(:disabled)').length > 0) {
				$(this).css({ cursor: 'pointer' });
			}
		});

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvcmFkaW9fc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbImdhbWJpbyIsIndpZGdldHMiLCJtb2R1bGUiLCJkYXRhIiwiJHRoaXMiLCIkIiwiZGVmYXVsdHMiLCJzZWxlY3Rpb24iLCJjbGFzc05hbWUiLCJpbml0Iiwib3B0aW9ucyIsImV4dGVuZCIsIl9jaGFuZ2VIYW5kbGVyIiwiJHNlbGYiLCIkcm93IiwiY2xvc2VzdCIsImZpbmQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicGFyZW50IiwiaGFzQ2xhc3MiLCJub3QiLCJwcm9wIiwiZmlyc3QiLCJfY2hhbmdlSGFuZGxlckNoZWNrYm94IiwiY2hlY2tlZCIsImRvbmUiLCJvbiIsInRyaWdnZXIiLCJlYWNoIiwibGVuZ3RoIiwiY3NzIiwiY3Vyc29yIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7O0FBVUFBLE9BQU9DLE9BQVAsQ0FBZUMsTUFBZixDQUFzQixpQkFBdEIsRUFBeUMsRUFBekMsRUFBNkMsVUFBU0MsSUFBVCxFQUFlOztBQUUzRDs7QUFFRDs7QUFFQyxLQUFJQyxRQUFRQyxFQUFFLElBQUYsQ0FBWjtBQUFBLEtBQ0NDLFdBQVc7QUFDVkMsYUFBVyxrQkFERDtBQUVWQyxhQUFXLFFBRkQ7QUFHVkMsUUFBTTtBQUhJLEVBRFo7QUFBQSxLQU1DQyxVQUFVTCxFQUFFTSxNQUFGLENBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUJMLFFBQW5CLEVBQTZCSCxJQUE3QixDQU5YO0FBQUEsS0FPQ0QsU0FBUyxFQVBWOztBQVVEOzs7QUFHQyxLQUFJVSxpQkFBaUIsU0FBakJBLGNBQWlCLEdBQVc7QUFDL0IsTUFBSUMsUUFBUVIsRUFBRSxJQUFGLENBQVo7QUFBQSxNQUNDUyxPQUFPRCxNQUFNRSxPQUFOLENBQWNMLFFBQVFILFNBQXRCLENBRFI7O0FBR0FILFFBQ0VZLElBREYsQ0FDT04sUUFBUUgsU0FEZixFQUVFVSxXQUZGLENBRWNQLFFBQVFGLFNBRnRCOztBQUlBSyxRQUNFRSxPQURGLENBQ1VMLFFBQVFILFNBRGxCLEVBRUVXLFFBRkYsQ0FFV1IsUUFBUUYsU0FGbkI7O0FBSUEsTUFBR0ssTUFBTU0sTUFBTixHQUFlQyxRQUFmLENBQXdCLDhCQUF4QixDQUFILEVBQTREO0FBQzNEZixLQUFFLGtFQUFGLEVBQXNFZ0IsR0FBdEUsQ0FBMEVSLEtBQTFFLEVBQWlGUyxJQUFqRixDQUFzRixTQUF0RixFQUFpRyxLQUFqRztBQUNBUixRQUFLRSxJQUFMLENBQVUsa0VBQVYsRUFBOEVNLElBQTlFLENBQW1GLFNBQW5GLEVBQThGLElBQTlGO0FBQ0EsR0FIRCxNQUdPLElBQUdULE1BQU1PLFFBQU4sQ0FBZSxtQkFBZixDQUFILEVBQXdDO0FBQzlDTixRQUFLRSxJQUFMLENBQVUsMkNBQVYsRUFBdURPLEtBQXZELEdBQStERCxJQUEvRCxDQUFvRSxTQUFwRSxFQUErRSxJQUEvRTtBQUNBakIsS0FBRSxrRUFBRixFQUFzRWdCLEdBQXRFLENBQTBFUixLQUExRSxFQUFpRlMsSUFBakYsQ0FBc0YsU0FBdEYsRUFBaUcsS0FBakc7QUFDQSxHQUhNLE1BR0E7QUFDTmpCLEtBQUUsa0VBQUYsRUFBc0VpQixJQUF0RSxDQUEyRSxTQUEzRSxFQUFzRixLQUF0RjtBQUNBO0FBQ0QsRUFyQkQ7O0FBdUJBLEtBQUlFLHlCQUF5QixTQUF6QkEsc0JBQXlCLEdBQVc7QUFDdkMsTUFBSVgsUUFBUVIsRUFBRSxJQUFGLENBQVo7QUFBQSxNQUNDUyxPQUFPRCxNQUFNRSxPQUFOLENBQWNMLFFBQVFILFNBQXRCLENBRFI7QUFBQSxNQUVDa0IsVUFBVVosTUFBTVMsSUFBTixDQUFXLFNBQVgsQ0FGWDs7QUFLQSxNQUFJRyxPQUFKLEVBQWE7QUFDWlgsUUFBS0ksUUFBTCxDQUFjUixRQUFRRixTQUF0QjtBQUNBLEdBRkQsTUFFTztBQUNOTSxRQUFLRyxXQUFMLENBQWlCUCxRQUFRRixTQUF6QjtBQUNBO0FBQ0QsRUFYRDs7QUFjRDs7QUFFQzs7OztBQUlBTixRQUFPTyxJQUFQLEdBQWMsVUFBU2lCLElBQVQsRUFBZTtBQUM1QnRCLFFBQ0V1QixFQURGLENBQ0ssUUFETCxFQUNlLDRCQURmLEVBQzZDZixjQUQ3QyxFQUVFZSxFQUZGLENBRUssUUFGTCxFQUVlLGdCQUZmLEVBRWlDSCxzQkFGakM7O0FBSUEsTUFBSWQsUUFBUUQsSUFBWixFQUFrQjtBQUNqQkwsU0FDRVksSUFERixDQUNPLG9EQURQLEVBRUVZLE9BRkYsQ0FFVSxRQUZWLEVBRW9CLEVBRnBCO0FBR0E7O0FBRUR4QixRQUFNWSxJQUFOLENBQVcsa0JBQVgsRUFBK0JXLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLFlBQVc7QUFDckR0QixLQUFFLElBQUYsRUFBUVcsSUFBUixDQUFhLDBEQUFiLEVBQXlFTyxLQUF6RSxHQUFpRkQsSUFBakYsQ0FBc0YsU0FBdEYsRUFBaUcsSUFBakcsRUFBdUdNLE9BQXZHLENBQStHLFFBQS9HO0FBQ0EsR0FGRDs7QUFJQXhCLFFBQU1ZLElBQU4sQ0FBVyxrQkFBWCxFQUErQmEsSUFBL0IsQ0FBb0MsWUFBVztBQUM5QyxPQUFJeEIsRUFBRSxJQUFGLEVBQVFXLElBQVIsQ0FBYSxrQ0FBYixFQUFpRGMsTUFBakQsR0FBMEQsQ0FBOUQsRUFBaUU7QUFDaEV6QixNQUFFLElBQUYsRUFBUTBCLEdBQVIsQ0FBWSxFQUFDQyxRQUFRLFNBQVQsRUFBWjtBQUNBO0FBQ0QsR0FKRDs7QUFNQU47QUFDQSxFQXRCRDs7QUF3QkE7QUFDQSxRQUFPeEIsTUFBUDtBQUNBLENBeEZEIiwiZmlsZSI6IndpZGdldHMvcmFkaW9fc2VsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiByYWRpb19zZWxlY3Rpb24uanMgMjAxOC0wMi0wNVxuIEdhbWJpbyBHbWJIXG4gaHR0cDovL3d3dy5nYW1iaW8uZGVcbiBDb3B5cmlnaHQgKGMpIDIwMTggR2FtYmlvIEdtYkhcbiBSZWxlYXNlZCB1bmRlciB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgKFZlcnNpb24gMilcbiBbaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2dwbC0yLjAuaHRtbF1cbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmdhbWJpby53aWRnZXRzLm1vZHVsZSgncmFkaW9fc2VsZWN0aW9uJywgW10sIGZ1bmN0aW9uKGRhdGEpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cbi8vICMjIyMjIyMjIyMgVkFSSUFCTEUgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXG5cdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0ZGVmYXVsdHMgPSB7XG5cdFx0XHRzZWxlY3Rpb246ICcubGlzdC1ncm91cC1pdGVtJyxcblx0XHRcdGNsYXNzTmFtZTogJ2FjdGl2ZScsXG5cdFx0XHRpbml0OiBmYWxzZVxuXHRcdH0sXG5cdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgZGF0YSksXG5cdFx0bW9kdWxlID0ge307XG5cblxuLy8gIyMjIyMjIyMjIyBFVkVOVCBIQU5ETEVSICMjIyMjIyMjIyNcblxuXG5cdHZhciBfY2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHQkcm93ID0gJHNlbGYuY2xvc2VzdChvcHRpb25zLnNlbGVjdGlvbik7XG5cblx0XHQkdGhpc1xuXHRcdFx0LmZpbmQob3B0aW9ucy5zZWxlY3Rpb24pXG5cdFx0XHQucmVtb3ZlQ2xhc3Mob3B0aW9ucy5jbGFzc05hbWUpO1xuXG5cdFx0JHNlbGZcblx0XHRcdC5jbG9zZXN0KG9wdGlvbnMuc2VsZWN0aW9uKVxuXHRcdFx0LmFkZENsYXNzKG9wdGlvbnMuY2xhc3NOYW1lKTtcblx0XHRcblx0XHRpZigkc2VsZi5wYXJlbnQoKS5oYXNDbGFzcygnc2hpcHBpbmctc3VibW9kdWxlLXNlbGVjdGlvbicpKSB7XG5cdFx0XHQkKCcuc2hpcHBpbmctc3VibW9kdWxlLXRpdGxlIC5zaGlwcGluZy1tb2R1bGUtc2VsZWN0aW9uIGlucHV0OnJhZGlvJykubm90KCRzZWxmKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdFx0JHJvdy5maW5kKCcuc2hpcHBpbmctc3VibW9kdWxlLXRpdGxlIC5zaGlwcGluZy1tb2R1bGUtc2VsZWN0aW9uIGlucHV0OnJhZGlvJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH0gZWxzZSBpZigkc2VsZi5oYXNDbGFzcygncGxhY2Vob2xkZXItcmFkaW8nKSkge1xuXHRcdFx0JHJvdy5maW5kKCcuc2hpcHBpbmctc3VibW9kdWxlLXNlbGVjdGlvbiBpbnB1dDpyYWRpbycpLmZpcnN0KCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdFx0JCgnLnNoaXBwaW5nLXN1Ym1vZHVsZS10aXRsZSAuc2hpcHBpbmctbW9kdWxlLXNlbGVjdGlvbiBpbnB1dDpyYWRpbycpLm5vdCgkc2VsZikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnLnNoaXBwaW5nLXN1Ym1vZHVsZS10aXRsZSAuc2hpcHBpbmctbW9kdWxlLXNlbGVjdGlvbiBpbnB1dDpyYWRpbycpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBfY2hhbmdlSGFuZGxlckNoZWNrYm94ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdCRyb3cgPSAkc2VsZi5jbG9zZXN0KG9wdGlvbnMuc2VsZWN0aW9uKSxcblx0XHRcdGNoZWNrZWQgPSAkc2VsZi5wcm9wKCdjaGVja2VkJyk7XG5cblxuXHRcdGlmIChjaGVja2VkKSB7XG5cdFx0XHQkcm93LmFkZENsYXNzKG9wdGlvbnMuY2xhc3NOYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JHJvdy5yZW1vdmVDbGFzcyhvcHRpb25zLmNsYXNzTmFtZSk7XG5cdFx0fVxuXHR9O1xuXG5cbi8vICMjIyMjIyMjIyMgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXG5cdC8qKlxuXHQgKiBJbml0IGZ1bmN0aW9uIG9mIHRoZSB3aWRnZXRcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRtb2R1bGUuaW5pdCA9IGZ1bmN0aW9uKGRvbmUpIHtcblx0XHQkdGhpc1xuXHRcdFx0Lm9uKCdjaGFuZ2UnLCAnaW5wdXQ6cmFkaW86bm90KDpkaXNhYmxlZCknLCBfY2hhbmdlSGFuZGxlcilcblx0XHRcdC5vbignY2hhbmdlJywgJ2lucHV0OmNoZWNrYm94JywgX2NoYW5nZUhhbmRsZXJDaGVja2JveCk7XG5cblx0XHRpZiAob3B0aW9ucy5pbml0KSB7XG5cdFx0XHQkdGhpc1xuXHRcdFx0XHQuZmluZCgnaW5wdXQ6Y2hlY2tib3gsIGlucHV0OnJhZGlvOmNoZWNrZWQ6bm90KDpkaXNhYmxlZCknKVxuXHRcdFx0XHQudHJpZ2dlcignY2hhbmdlJywgW10pO1xuXHRcdH1cblx0XHRcblx0XHQkdGhpcy5maW5kKCcubGlzdC1ncm91cC1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLmZpbmQoJ2xhYmVsIGlucHV0OnJhZGlvOm5vdCg6ZGlzYWJsZWQpOm5vdCgucGxhY2Vob2xkZXItcmFkaW8pJykuZmlyc3QoKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JHRoaXMuZmluZCgnLmxpc3QtZ3JvdXAtaXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoJCh0aGlzKS5maW5kKCdsYWJlbCBpbnB1dDpyYWRpbzpub3QoOmRpc2FibGVkKScpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0JCh0aGlzKS5jc3Moe2N1cnNvcjogJ3BvaW50ZXInfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdFx0ZG9uZSgpO1xuXHR9O1xuXG5cdC8vIFJldHVybiBkYXRhIHRvIHdpZGdldCBlbmdpbmVcblx0cmV0dXJuIG1vZHVsZTtcbn0pOyJdfQ==
