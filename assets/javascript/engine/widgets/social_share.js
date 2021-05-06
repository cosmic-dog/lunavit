'use strict';

/* --------------------------------------------------------------
 social_share.js 2017-07-05
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2017 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/**
 * Widget that enables the social sharing support
 * 
 * (e.g.: Facebook, Twitter, Google+)
 * 
 * {@link https://github.com/heiseonline/shariff}
 */
gambio.widgets.module('social_share', [jse.source + '/vendor/shariff/shariff.min.js', jse.source + '/vendor/shariff/shariff.min.css'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ########## 

	var $this = $(this),
	    defaults = {},
	    options = $.extend(true, {}, defaults, data),
	    module = {};

	// ########## INITIALIZATION ##########

	/**
  * Init function of the widget
  */
	module.init = function (done) {
		$this.addClass('shariff');

		var config = {
			url: window.location.href,
			theme: 'standard',
			lang: jse.core.config.get('languageCode'),
			services: [],
			mediaUrl: []
		};

		if (options.facebook !== undefined) {
			config.services.push('facebook');
		}

		if (options.twitter !== undefined) {
			config.services.push('twitter');
		}

		if (options.googleplus !== undefined) {
			config.services.push('googleplus');
		}

		if (options.pinterest !== undefined) {
			config.services.push('pinterest');
		}

		if (options.whatsapp !== undefined) {
			config.services.push('whatsapp');
		}

		new Shariff($this, config);

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc29jaWFsX3NoYXJlLmpzIl0sIm5hbWVzIjpbImdhbWJpbyIsIndpZGdldHMiLCJtb2R1bGUiLCJqc2UiLCJzb3VyY2UiLCJkYXRhIiwiJHRoaXMiLCIkIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kIiwiaW5pdCIsImRvbmUiLCJhZGRDbGFzcyIsImNvbmZpZyIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInRoZW1lIiwibGFuZyIsImNvcmUiLCJnZXQiLCJzZXJ2aWNlcyIsIm1lZGlhVXJsIiwiZmFjZWJvb2siLCJ1bmRlZmluZWQiLCJwdXNoIiwidHdpdHRlciIsImdvb2dsZXBsdXMiLCJwaW50ZXJlc3QiLCJ3aGF0c2FwcCIsIlNoYXJpZmYiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7OztBQU9BQSxPQUFPQyxPQUFQLENBQWVDLE1BQWYsQ0FDQyxjQURELEVBR0MsQ0FDSUMsSUFBSUMsTUFEUixxQ0FFSUQsSUFBSUMsTUFGUixxQ0FIRCxFQVFDLFVBQVNDLElBQVQsRUFBZTs7QUFFZDs7QUFFRjs7QUFFRSxLQUFJQyxRQUFRQyxFQUFFLElBQUYsQ0FBWjtBQUFBLEtBQ0NDLFdBQVcsRUFEWjtBQUFBLEtBRUNDLFVBQVVGLEVBQUVHLE1BQUYsQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQkYsUUFBbkIsRUFBNkJILElBQTdCLENBRlg7QUFBQSxLQUdDSCxTQUFTLEVBSFY7O0FBTUY7O0FBRUU7OztBQUdBQSxRQUFPUyxJQUFQLEdBQWMsVUFBU0MsSUFBVCxFQUFlO0FBQzVCTixRQUFNTyxRQUFOLENBQWUsU0FBZjs7QUFFQSxNQUFJQyxTQUFTO0FBQ1pDLFFBQUtDLE9BQU9DLFFBQVAsQ0FBZ0JDLElBRFQ7QUFFWkMsVUFBTyxVQUZLO0FBR1pDLFNBQU1qQixJQUFJa0IsSUFBSixDQUFTUCxNQUFULENBQWdCUSxHQUFoQixDQUFvQixjQUFwQixDQUhNO0FBSVpDLGFBQVUsRUFKRTtBQUtaQyxhQUFVO0FBTEUsR0FBYjs7QUFRQSxNQUFJZixRQUFRZ0IsUUFBUixLQUFxQkMsU0FBekIsRUFBb0M7QUFDbkNaLFVBQU9TLFFBQVAsQ0FBZ0JJLElBQWhCLENBQXFCLFVBQXJCO0FBQ0E7O0FBRUQsTUFBSWxCLFFBQVFtQixPQUFSLEtBQW9CRixTQUF4QixFQUFtQztBQUNsQ1osVUFBT1MsUUFBUCxDQUFnQkksSUFBaEIsQ0FBcUIsU0FBckI7QUFDQTs7QUFFRCxNQUFJbEIsUUFBUW9CLFVBQVIsS0FBdUJILFNBQTNCLEVBQXNDO0FBQ3JDWixVQUFPUyxRQUFQLENBQWdCSSxJQUFoQixDQUFxQixZQUFyQjtBQUNBOztBQUVELE1BQUlsQixRQUFRcUIsU0FBUixLQUFzQkosU0FBMUIsRUFBcUM7QUFDcENaLFVBQU9TLFFBQVAsQ0FBZ0JJLElBQWhCLENBQXFCLFdBQXJCO0FBQ0E7O0FBRUQsTUFBSWxCLFFBQVFzQixRQUFSLEtBQXFCTCxTQUF6QixFQUFvQztBQUNuQ1osVUFBT1MsUUFBUCxDQUFnQkksSUFBaEIsQ0FBcUIsVUFBckI7QUFDQTs7QUFFRCxNQUFJSyxPQUFKLENBQVkxQixLQUFaLEVBQW1CUSxNQUFuQjs7QUFFQUY7QUFDQSxFQWxDRDs7QUFvQ0E7QUFDQSxRQUFPVixNQUFQO0FBQ0EsQ0EvREYiLCJmaWxlIjoid2lkZ2V0cy9zb2NpYWxfc2hhcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIHNvY2lhbF9zaGFyZS5qcyAyMDE3LTA3LTA1XG4gR2FtYmlvIEdtYkhcbiBodHRwOi8vd3d3LmdhbWJpby5kZVxuIENvcHlyaWdodCAoYykgMjAxNyBHYW1iaW8gR21iSFxuIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuIFtodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiBXaWRnZXQgdGhhdCBlbmFibGVzIHRoZSBzb2NpYWwgc2hhcmluZyBzdXBwb3J0XG4gKiBcbiAqIChlLmcuOiBGYWNlYm9vaywgVHdpdHRlciwgR29vZ2xlKylcbiAqIFxuICoge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9oZWlzZW9ubGluZS9zaGFyaWZmfVxuICovXG5nYW1iaW8ud2lkZ2V0cy5tb2R1bGUoXG5cdCdzb2NpYWxfc2hhcmUnLFxuXG5cdFtcblx0XHRgJHtqc2Uuc291cmNlfS92ZW5kb3Ivc2hhcmlmZi9zaGFyaWZmLm1pbi5qc2AsXG5cdFx0YCR7anNlLnNvdXJjZX0vdmVuZG9yL3NoYXJpZmYvc2hhcmlmZi5taW4uY3NzYFxuXHRdLFxuXG5cdGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdCd1c2Ugc3RyaWN0JztcblxuLy8gIyMjIyMjIyMjIyBWQVJJQUJMRSBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjIFxuXG5cdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdGRlZmF1bHRzID0ge30sXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBkYXRhKSxcblx0XHRcdG1vZHVsZSA9IHt9O1xuXG5cbi8vICMjIyMjIyMjIyMgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXG5cdFx0LyoqXG5cdFx0ICogSW5pdCBmdW5jdGlvbiBvZiB0aGUgd2lkZ2V0XG5cdFx0ICovXG5cdFx0bW9kdWxlLmluaXQgPSBmdW5jdGlvbihkb25lKSB7XG5cdFx0XHQkdGhpcy5hZGRDbGFzcygnc2hhcmlmZicpOyBcblx0XHRcdFxuXHRcdFx0dmFyIGNvbmZpZyA9IHtcblx0XHRcdFx0dXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcblx0XHRcdFx0dGhlbWU6ICdzdGFuZGFyZCcsXG5cdFx0XHRcdGxhbmc6IGpzZS5jb3JlLmNvbmZpZy5nZXQoJ2xhbmd1YWdlQ29kZScpLFxuXHRcdFx0XHRzZXJ2aWNlczogW10sXG5cdFx0XHRcdG1lZGlhVXJsOiBbXVxuXHRcdFx0fTtcblx0XHRcdFxuXHRcdFx0aWYgKG9wdGlvbnMuZmFjZWJvb2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25maWcuc2VydmljZXMucHVzaCgnZmFjZWJvb2snKTsgXG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmIChvcHRpb25zLnR3aXR0ZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25maWcuc2VydmljZXMucHVzaCgndHdpdHRlcicpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAob3B0aW9ucy5nb29nbGVwbHVzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29uZmlnLnNlcnZpY2VzLnB1c2goJ2dvb2dsZXBsdXMnKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKG9wdGlvbnMucGludGVyZXN0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29uZmlnLnNlcnZpY2VzLnB1c2goJ3BpbnRlcmVzdCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy53aGF0c2FwcCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbmZpZy5zZXJ2aWNlcy5wdXNoKCd3aGF0c2FwcCcpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRuZXcgU2hhcmlmZigkdGhpcywgY29uZmlnKTtcblx0XHRcdFxuXHRcdFx0ZG9uZSgpO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm4gZGF0YSB0byB3aWRnZXQgZW5naW5lXG5cdFx0cmV0dXJuIG1vZHVsZTtcblx0fSk7Il19
