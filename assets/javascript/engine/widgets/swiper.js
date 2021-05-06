'use strict';

/* --------------------------------------------------------------
 swiper.js 2017-08-03
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2017 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/* globals Swiper */

/**
 * Widget that binds the swiper plugin (third party) to a DOM element
 *
 * @todo Remove the try - catch blocks and and correct the swiper issues.
 */
gambio.widgets.module('swiper', [gambio.source + '/libs/events', gambio.source + '/libs/responsive'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $body = $('body'),
	    $slides = null,
	    $controls = null,
	    $target = null,
	    $template = null,
	    init = true,
	    swiper = null,
	    sliderOptions = null,
	    hasThumbnails = true,
	    mode = null,
	    breakpointDataset = null,
	    duplicates = false,
	    preventSlideStart = false,
	    sliderDefaults = { // Default configuration for the swiper
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationClickable: true,
		loop: true,
		autoplay: 3,
		autoplayDisableOnInteraction: false
	},
	    defaults = {
		// JSON that gets merged with the sliderDefaults and is passed to "swiper" directly.
		sliderOptions: null,
		// If this instance is a "main" swiper, the given selector selects the "control" swiper.
		controls: null,
		// If this instance is a "control" swiper, the given selector selects the "main" swiper.
		target: null,
		// Sets the initial slide (needed to prevent different init slides in main/controller slider).
		initSlide: null,
		// Detect if a swiper is needed for the breakpoint. If not, turn it off
		autoOff: false,
		// The translucence fix enables support for a fade effect between images with different aspect ratio,
		// but causing a delay between the change
		disableTranslucenceFix: false,
		breakpoints: [{
			// Until which breakpoint this settings is available
			breakpoint: 40,
			// If true, the paging bullets will be replaced with the preview images.
			usePreviewBullets: false,
			// This and all other settings belonging to the swiper plugin.
			slidesPerView: 2,
			// If true, the current slide gets centered in view (most usefull with an even slidesPerView
			// count).
			centeredSlides: true
		}, {
			breakpoint: 60,
			usePreviewBullets: true,
			slidesPerView: 3
		}, {
			breakpoint: 80,
			usePreviewBullets: true,
			slidesPerView: 3
		}, {
			breakpoint: 100,
			usePreviewBullets: true,
			slidesPerView: 5
		}]
	},
	    options = $.extend({}, defaults, data),
	    module = {};

	// ########## HELPER FUNCTIONS ##########

	/**
  * Function that generates the markup for
  * the preview bullets
  * @param       {Swiper}        swiper          Swiper object
  * @param       {integer}       index           Index of the slide
  * @param       {string}        className       The classname that must be add to the markup
  * @return      {string}                        The preview image html string
  * @private
  */
	var _generatePreviewButtons = function _generatePreviewButtons(swiper, index, className) {
		var $currentSlide = $slides.eq(index),
		    $image = $currentSlide.find('img'),
		    altTxt = $image.attr('alt'),
		    thumbImage = $currentSlide.data('thumbImage');

		if (thumbImage) {
			return '<img src="' + thumbImage + '" alt="' + altTxt + '" class="' + className + '" />';
		}

		return '';
	};

	/**
  * Helper function to get the index of the
  * active slide
  * @return     {integer}                       The index of the active slide
  * @private
  */
	var _getIndex = function _getIndex() {
		var index = $this.find('.swiper-slide-active').index();

		// If there are duplicate slides (generated
		// by the swiper) recalculate the index
		index = duplicates ? index - 1 : index;
		index = index || 0;

		return index;
	};

	/**
  * Helper function to add the active
  * class to the active slide
  * @param       {integer}           index       The index of the active slide
  * @private
  */
	var _setActive = function _setActive(index) {
		$slides = $this.find('.swiper-slide:not(.swiper-slide-duplicate)');
		index = duplicates ? index + 1 : index;
		$slides.removeClass('active').eq(index).addClass('active');
	};

	// ########## EVENT HANDLER ##########

	/**
  * Event handler for the mouseenter event.
  * It disables the autoplay
  * @private
  */
	var _mouseEnterHandler = function _mouseEnterHandler() {
		try {
			if (swiper) {
				swiper.stopAutoplay();
			}
		} catch (e) {
			// Do not log the error
		}
	};

	/**
  * Event handler for the mouseleave event.
  * It enables the autoplay
  * @private
  */
	var _mouseLeaveHandler = function _mouseLeaveHandler() {
		try {
			if (swiper) {
				swiper.startAutoplay();
			}
		} catch (e) {
			// Do not log the error
		}
	};

	/**
  * Event handler for the goto event.
  * It switches the current slide to the given index
  * and adds the active class to the new active slide
  * @param       {object}    e       jQuery event object
  * @param       {number}    d       Index of the slide to show
  * @private
  */
	var _gotoHandler = function _gotoHandler(e, d) {
		e.stopPropagation();

		// Set the active slide
		_setActive(d);

		// Temporary deactivate the onSlideChangeStart event
		// to prevent looping through the goto / changeStart
		// events
		preventSlideStart = true;

		// Remove the autoplay after a goto event
		$this.off('mouseleave.swiper');
		swiper.stopAutoplay();

		// Try to correct the index between sliders
		// with and without duplicates
		var index = duplicates ? d + 1 : d;
		if (index > $slides.length) {
			index = 0;
		}

		// Goto the desired slide
		swiper.slideTo(index);

		// Reactivate the onSlideChangeEvent
		preventSlideStart = false;
	};

	/**
  * Click event handler that triggers a
  * "goto" event to the target swiper
  * @param       {object}        e       jQuery event object
  * @private
  */
	var _clickHandler = function _clickHandler(e) {
		e.preventDefault();
		e.stopPropagation();

		var $self = $(this),
		    index = $self.index();

		index = duplicates ? index - 1 : index;

		// Set the active slide
		_setActive(index);

		// Inform the main swiper
		$target.trigger(jse.libs.template.events.SWIPER_GOTO(), index);
	};

	/**
  * Event that gets triggered on slideChange.
  * If the slide gets changed, the controls
  * will follow the current slide in position
  * @private
  */
	var _triggerSlideChange = function _triggerSlideChange() {
		if (!preventSlideStart) {
			var index = _getIndex(),
			    lastIndex = $slides.length - 2;

			// Recalculate index if duplicate slides are inside the slider
			if (index < 0) {
				index = $slides.length - 3;
			} else {
				index = duplicates && index === lastIndex ? index - lastIndex : index;
			}

			// Set the active slide
			_setActive(index);

			// Inform the controls
			$controls.trigger(jse.libs.template.events.SWIPER_GOTO(), index);
		}
	};

	/**
  * Workaround for the translucence issue
  * that happens on small screens with enabled
  * fade effect. Maybe it can be removed, if the
  * swiper gets updated itself
  * @private
  */
	var _translucenceWorkaround = function _translucenceWorkaround() {
		if (!options.disableTranslucenceFix && sliderOptions && sliderOptions.effect === 'fade') {
			$this.find('.swiper-slide').filter(':not(.swiper-slide-active)').fadeTo(300, 0, function () {
				$(this).css('visibility', 'hidden');
			});

			$this.find('.swiper-slide').filter('.swiper-slide-active').fadeTo(300, 1, function () {
				$(this).css('visibility', '');
			});
		}
	};

	/**
  * The breakpoint handler initializes the swiper
  * with the settings for the current breakpoint.
  * Therefore it uses the default slider options,
  * the custom slider options given by the options
  * object and the breakpoint options object also
  * given by the options (in this order)
  * @private
  */
	var _breakpointHandler = function _breakpointHandler() {

		// Get the current viewmode
		var oldMode = mode || {},
		    newMode = jse.libs.template.responsive.breakpoint(),
		    extendOptions = options.breakpoints[0] || {},
		    newBreakpointDataset = null;

		// Only do something if the view was changed
		if (newMode.id !== oldMode.id) {

			// Store the new viewmode
			mode = $.extend({}, newMode);

			// Iterate through the breakpoints object to detect
			// the correct settings for the current breakpoint
			$.each(options.breakpoints, function (i, v) {
				if (v.breakpoint > newMode.id) {
					return false;
				}
				newBreakpointDataset = i;
				extendOptions = v;
			});

			if (options.sliderOptions && options.sliderOptions.breakpoints) {
				$.each(options.sliderOptions.breakpoints, function (i, v) {
					if (v.breakpoint === newMode.id) {
						extendOptions = v;
						return false;
					}
				});
			}

			// Only do something if the settings change due browser
			// resize or if it's the first time run
			if (newBreakpointDataset !== breakpointDataset || init) {
				// Combine the settings
				sliderOptions = $.extend({}, sliderDefaults, options.sliderOptions || {}, extendOptions);

				// Add the preview image bullets function to the options object
				if (sliderOptions.usePreviewBullets && hasThumbnails) {
					sliderOptions.paginationBulletRender = _generatePreviewButtons;
				}

				// Add the autoplay interval to the options object
				sliderOptions.autoplay = sliderOptions.autoplay ? sliderOptions.autoplay * 1000 : 0;

				// Disable loop if there is only one slider. 
				if ($this.find('.swiper-slide').length === 1) {
					sliderOptions.loop = false;
				}

				// If an swiper exists, get the current
				// slide no. and remove the old swiper
				if (swiper) {
					sliderOptions.initialSlide = _getIndex();
					try {
						swiper.destroy(true, true);
					} catch (ignore) {
						swiper = null;
					}
				} else {
					sliderOptions.initialSlide = options.initSlide || sliderOptions.initialSlide || 0;
				}

				var $duplicate = $this.find('.swiper-slide:not(.swiper-slide-duplicate)');

				if (!options.autoOff || $duplicate.length > sliderOptions.slidesPerView && options.autoOff) {
					$this.addClass('swiper-is-active').removeClass('swiper-is-not-active');

					// Initialize the swiper
					try {
						swiper = new Swiper($this, sliderOptions);
					} catch (e) {
						return; // Swiper might throw an error upon initialization that should not halt the script execution.
					}

					swiper.off('onTransitionEnd onSlideChangeStart').on('onTransitionEnd', _translucenceWorkaround);

					// If this is a "main" swiper and has external controls, an
					// goto event is triggered if the current slide is changed
					if ($controls.length) {
						swiper.on('onSlideChangeStart', _triggerSlideChange);
					}

					// Add the event handler
					$this.off('mouseenter.swiper mouseleave.swiper ' + jse.libs.template.events.SWIPER_GOTO() + ' ' + jse.libs.template.events.SLIDES_UPDATE()).on('mouseenter.swiper', _mouseEnterHandler).on('mouseleave.swiper', _mouseLeaveHandler).on(jse.libs.template.events.SWIPER_GOTO(), _gotoHandler).on(jse.libs.template.events.SLIDES_UPDATE(), _updateSlides);

					if (init) {
						// Check if there are duplicates slides (generated by the swiper)
						// after the first time init of the swiper
						duplicates = !!$this.find('.swiper-slide-duplicate').length;
					}

					// Set the active slide
					var index = init && options.initSlide ? options.initSlide : _getIndex();
					_setActive(index);

					// Inform the controls that the main swiper has changed
					// In case that the other slider isn't initialized yet,
					// set an data attribute to the markup element to inform
					// it on init
					if ($controls.length) {
						$controls.attr('data-swiper-init-slide', index);
						_triggerSlideChange();
					}

					// Unset the init flag
					init = false;
				} else {
					// Disable the swiper buttons
					$this.removeClass('swiper-is-active').addClass('swiper-is-not-active');
					init = true;
				}
			}
		}
	};

	/**
  * Event handler that adds & removes slides from the
  * swiper. After the slides were processed, the first
  * slide is shown
  * @param       {object}    e       jQuery event object
  * @param       {object}    d       JSON object that contains the categories / images
  * @private
  */
	var _updateSlides = function _updateSlides(e, d) {

		// Loops through each category inside the images array
		$.each(d, function (category, dataset) {
			var catName = category + '-category',
			    add = [],
			    remove = [],
			    markup = $template.html();

			// Get all indexes from the slides
			// of the same category and remove
			// them from the slider
			$slides.filter('.' + catName).each(function () {
				var $self = $(this),
				    index = $self.data().swiperSlideIndex;

				index = index === undefined ? $self.index() : index;
				remove.push(index);
			});
			swiper.removeSlide(remove);

			// Generate the markup for the new slides
			// and add them to the slider
			$.each(dataset || [], function (i, v) {
				v.className = catName;
				v.srcattr = 'src="' + v.src + '"';
				add.push(Mustache.render(markup, v));
			});
			swiper.appendSlide(add);
		});

		$slides = $this.find('.swiper-slide');

		// To prevent an inconsistent state
		// in control / main slider combinations
		// slide to the first slide
		_setActive(0);
		var index = duplicates ? 1 : 0;
		swiper.slideTo(index, 0);
	};

	/**
  * Prevent text selection by clicking on swiper buttons
  * @private
  */
	var _preventTextSelection = function _preventTextSelection() {
		$(options.sliderOptions.nextButton).on('selectstart', function () {
			return false;
		});
		$(options.sliderOptions.prevButton).on('selectstart', function () {
			return false;
		});
	};

	/**
  * Sets the initial height for one swiper image container to prevent cut off images on smaller swiper heights
  * @private
  */
	var _scaleThumbnailHeight = function _scaleThumbnailHeight() {
		var swiperContainer = $('.swiper-container-vertical .swiper-slide');
		var $containerHeight = swiperContainer.css('height');

		// Workaround for IE Browsers
		if ($('.swiper-container-vertical').hasClass('swiper-wp8-vertical')) {
			$containerHeight = swiperContainer.height() + 5;

			swiperContainer.css('height', $containerHeight);
		}

		if ($containerHeight === '0px') {
			$containerHeight = $('.product-info-thumbnails-mobile').css('height');
		}

		$('.align-middle').css('height', $containerHeight);
	};

	// ########## INITIALIZATION ##########

	/**
  * Init function of the widget
  * @constructor
  */
	module.init = function (done) {

		$slides = $this.find('.swiper-slide');
		$controls = $(options.controls);
		$target = $(options.target);
		$template = $this.find('template');

		// Check if all images inside the swiper have
		// thumbnail image given
		$slides.each(function () {
			if (!$(this).data().thumbImage) {
				hasThumbnails = false;
				return false;
			}
		});

		// Add the breakpoint handler ty dynamically
		// set the options corresponding to the browser size (slider responsive will re-initialize the swiper).
		_breakpointHandler();

		// If this instance is a "control" swiper the target is the main swiper
		// which will be updated on a click inside this control swiper
		if (options.target) {
			$this.on('click.swiper', '.swiper-slide', _clickHandler);
		}

		$(document).ready(function () {
			$('.swiper-vertical .swiper-slide[data-index]').css('display', 'inline-block');
			$('.product-info-image .swiper-slide[data-index]').css('z-index', 'inherit');
			$('.product-info-image .swiper-slide[data-index] .swiper-slide-inside img.img-responsive').fadeIn(1000);
		});

		_translucenceWorkaround();
		_preventTextSelection();
		_scaleThumbnailHeight();

		// Fix for invisible Thumbnail-Images for switching from Tablet-Portrait to Tablet-Landscape
		$body.on(jse.libs.template.events.BREAKPOINT(), function () {
			_scaleThumbnailHeight();
		});

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc3dpcGVyLmpzIl0sIm5hbWVzIjpbImdhbWJpbyIsIndpZGdldHMiLCJtb2R1bGUiLCJzb3VyY2UiLCJkYXRhIiwiJHRoaXMiLCIkIiwiJGJvZHkiLCIkc2xpZGVzIiwiJGNvbnRyb2xzIiwiJHRhcmdldCIsIiR0ZW1wbGF0ZSIsImluaXQiLCJzd2lwZXIiLCJzbGlkZXJPcHRpb25zIiwiaGFzVGh1bWJuYWlscyIsIm1vZGUiLCJicmVha3BvaW50RGF0YXNldCIsImR1cGxpY2F0ZXMiLCJwcmV2ZW50U2xpZGVTdGFydCIsInNsaWRlckRlZmF1bHRzIiwicGFnaW5hdGlvbiIsIm5leHRCdXR0b24iLCJwcmV2QnV0dG9uIiwicGFnaW5hdGlvbkNsaWNrYWJsZSIsImxvb3AiLCJhdXRvcGxheSIsImF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb24iLCJkZWZhdWx0cyIsImNvbnRyb2xzIiwidGFyZ2V0IiwiaW5pdFNsaWRlIiwiYXV0b09mZiIsImRpc2FibGVUcmFuc2x1Y2VuY2VGaXgiLCJicmVha3BvaW50cyIsImJyZWFrcG9pbnQiLCJ1c2VQcmV2aWV3QnVsbGV0cyIsInNsaWRlc1BlclZpZXciLCJjZW50ZXJlZFNsaWRlcyIsIm9wdGlvbnMiLCJleHRlbmQiLCJfZ2VuZXJhdGVQcmV2aWV3QnV0dG9ucyIsImluZGV4IiwiY2xhc3NOYW1lIiwiJGN1cnJlbnRTbGlkZSIsImVxIiwiJGltYWdlIiwiZmluZCIsImFsdFR4dCIsImF0dHIiLCJ0aHVtYkltYWdlIiwiX2dldEluZGV4IiwiX3NldEFjdGl2ZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJfbW91c2VFbnRlckhhbmRsZXIiLCJzdG9wQXV0b3BsYXkiLCJlIiwiX21vdXNlTGVhdmVIYW5kbGVyIiwic3RhcnRBdXRvcGxheSIsIl9nb3RvSGFuZGxlciIsImQiLCJzdG9wUHJvcGFnYXRpb24iLCJvZmYiLCJsZW5ndGgiLCJzbGlkZVRvIiwiX2NsaWNrSGFuZGxlciIsInByZXZlbnREZWZhdWx0IiwiJHNlbGYiLCJ0cmlnZ2VyIiwianNlIiwibGlicyIsInRlbXBsYXRlIiwiZXZlbnRzIiwiU1dJUEVSX0dPVE8iLCJfdHJpZ2dlclNsaWRlQ2hhbmdlIiwibGFzdEluZGV4IiwiX3RyYW5zbHVjZW5jZVdvcmthcm91bmQiLCJlZmZlY3QiLCJmaWx0ZXIiLCJmYWRlVG8iLCJjc3MiLCJfYnJlYWtwb2ludEhhbmRsZXIiLCJvbGRNb2RlIiwibmV3TW9kZSIsInJlc3BvbnNpdmUiLCJleHRlbmRPcHRpb25zIiwibmV3QnJlYWtwb2ludERhdGFzZXQiLCJpZCIsImVhY2giLCJpIiwidiIsInBhZ2luYXRpb25CdWxsZXRSZW5kZXIiLCJpbml0aWFsU2xpZGUiLCJkZXN0cm95IiwiaWdub3JlIiwiJGR1cGxpY2F0ZSIsIlN3aXBlciIsIm9uIiwiU0xJREVTX1VQREFURSIsIl91cGRhdGVTbGlkZXMiLCJjYXRlZ29yeSIsImRhdGFzZXQiLCJjYXROYW1lIiwiYWRkIiwicmVtb3ZlIiwibWFya3VwIiwiaHRtbCIsInN3aXBlclNsaWRlSW5kZXgiLCJ1bmRlZmluZWQiLCJwdXNoIiwicmVtb3ZlU2xpZGUiLCJzcmNhdHRyIiwic3JjIiwiTXVzdGFjaGUiLCJyZW5kZXIiLCJhcHBlbmRTbGlkZSIsIl9wcmV2ZW50VGV4dFNlbGVjdGlvbiIsIl9zY2FsZVRodW1ibmFpbEhlaWdodCIsInN3aXBlckNvbnRhaW5lciIsIiRjb250YWluZXJIZWlnaHQiLCJoYXNDbGFzcyIsImhlaWdodCIsImRvbmUiLCJkb2N1bWVudCIsInJlYWR5IiwiZmFkZUluIiwiQlJFQUtQT0lOVCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBOzs7OztBQUtBQSxPQUFPQyxPQUFQLENBQWVDLE1BQWYsQ0FDQyxRQURELEVBR0MsQ0FDSUYsT0FBT0csTUFEWCxtQkFFSUgsT0FBT0csTUFGWCxzQkFIRCxFQVFDLFVBQVNDLElBQVQsRUFBZTs7QUFFZDs7QUFFRjs7QUFFRSxLQUFJQyxRQUFRQyxFQUFFLElB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LEVBQW1EMkUsR0FBbkQsQ0FBdUQsU0FBdkQsRUFBa0UsU0FBbEU7QUFDQTNFLEtBQUUsdUZBQUYsRUFBMkZ3SCxNQUEzRixDQUFrRyxJQUFsRztBQUNBLEdBSkQ7O0FBTUFqRDtBQUNBd0M7QUFDQUM7O0FBRUE7QUFDQS9HLFFBQU0yRixFQUFOLENBQVM1QixJQUFJQyxJQUFKLENBQVNDLFFBQVQsQ0FBa0JDLE1BQWxCLENBQXlCc0QsVUFBekIsRUFBVCxFQUFnRCxZQUFXO0FBQzFEVDtBQUNBLEdBRkQ7O0FBSUFLO0FBQ0EsRUExQ0Q7O0FBNENBO0FBQ0EsUUFBT3pILE1BQVA7QUFDQSxDQXpqQkYiLCJmaWxlIjoid2lkZ2V0cy9zd2lwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIHN3aXBlci5qcyAyMDE3LTA4LTAzXG4gR2FtYmlvIEdtYkhcbiBodHRwOi8vd3d3LmdhbWJpby5kZVxuIENvcHlyaWdodCAoYykgMjAxNyBHYW1iaW8gR21iSFxuIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuIFtodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyogZ2xvYmFscyBTd2lwZXIgKi9cblxuLyoqXG4gKiBXaWRnZXQgdGhhdCBiaW5kcyB0aGUgc3dpcGVyIHBsdWdpbiAodGhpcmQgcGFydHkpIHRvIGEgRE9NIGVsZW1lbnRcbiAqXG4gKiBAdG9kbyBSZW1vdmUgdGhlIHRyeSAtIGNhdGNoIGJsb2NrcyBhbmQgYW5kIGNvcnJlY3QgdGhlIHN3aXBlciBpc3N1ZXMuXG4gKi9cbmdhbWJpby53aWRnZXRzLm1vZHVsZShcblx0J3N3aXBlcicsXG5cblx0W1xuXHRcdGAke2dhbWJpby5zb3VyY2V9L2xpYnMvZXZlbnRzYCxcblx0XHRgJHtnYW1iaW8uc291cmNlfS9saWJzL3Jlc3BvbnNpdmVgXG5cdF0sXG5cblx0ZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0J3VzZSBzdHJpY3QnO1xuXG4vLyAjIyMjIyMjIyMjIFZBUklBQkxFIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHQkYm9keSA9ICQoJ2JvZHknKSxcblx0XHRcdCRzbGlkZXMgPSBudWxsLFxuXHRcdFx0JGNvbnRyb2xzID0gbnVsbCxcblx0XHRcdCR0YXJnZXQgPSBudWxsLFxuXHRcdFx0JHRlbXBsYXRlID0gbnVsbCxcblx0XHRcdGluaXQgPSB0cnVlLFxuXHRcdFx0c3dpcGVyID0gbnVsbCxcblx0XHRcdHNsaWRlck9wdGlvbnMgPSBudWxsLFxuXHRcdFx0aGFzVGh1bWJuYWlscyA9IHRydWUsXG5cdFx0XHRtb2RlID0gbnVsbCxcblx0XHRcdGJyZWFrcG9pbnREYXRhc2V0ID0gbnVsbCxcblx0XHRcdGR1cGxpY2F0ZXMgPSBmYWxzZSxcblx0XHRcdHByZXZlbnRTbGlkZVN0YXJ0ID0gZmFsc2UsXG5cdFx0XHRzbGlkZXJEZWZhdWx0cyA9IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgdGhlIHN3aXBlclxuXHRcdFx0XHRwYWdpbmF0aW9uOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcblx0XHRcdFx0bmV4dEJ1dHRvbjogJy5zd2lwZXItYnV0dG9uLW5leHQnLFxuXHRcdFx0XHRwcmV2QnV0dG9uOiAnLnN3aXBlci1idXR0b24tcHJldicsXG5cdFx0XHRcdHBhZ2luYXRpb25DbGlja2FibGU6IHRydWUsXG5cdFx0XHRcdGxvb3A6IHRydWUsXG5cdFx0XHRcdGF1dG9wbGF5OiAzLFxuXHRcdFx0XHRhdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZVxuXHRcdFx0fSxcblx0XHRcdGRlZmF1bHRzID0ge1xuXHRcdFx0XHQvLyBKU09OIHRoYXQgZ2V0cyBtZXJnZWQgd2l0aCB0aGUgc2xpZGVyRGVmYXVsdHMgYW5kIGlzIHBhc3NlZCB0byBcInN3aXBlclwiIGRpcmVjdGx5LlxuXHRcdFx0XHRzbGlkZXJPcHRpb25zOiBudWxsLFxuXHRcdFx0XHQvLyBJZiB0aGlzIGluc3RhbmNlIGlzIGEgXCJtYWluXCIgc3dpcGVyLCB0aGUgZ2l2ZW4gc2VsZWN0b3Igc2VsZWN0cyB0aGUgXCJjb250cm9sXCIgc3dpcGVyLlxuXHRcdFx0XHRjb250cm9sczogbnVsbCxcblx0XHRcdFx0Ly8gSWYgdGhpcyBpbnN0YW5jZSBpcyBhIFwiY29udHJvbFwiIHN3aXBlciwgdGhlIGdpdmVuIHNlbGVjdG9yIHNlbGVjdHMgdGhlIFwibWFpblwiIHN3aXBlci5cblx0XHRcdFx0dGFyZ2V0OiBudWxsLFxuXHRcdFx0XHQvLyBTZXRzIHRoZSBpbml0aWFsIHNsaWRlIChuZWVkZWQgdG8gcHJldmVudCBkaWZmZXJlbnQgaW5pdCBzbGlkZXMgaW4gbWFpbi9jb250cm9sbGVyIHNsaWRlcikuXG5cdFx0XHRcdGluaXRTbGlkZTogbnVsbCxcblx0XHRcdFx0Ly8gRGV0ZWN0IGlmIGEgc3dpcGVyIGlzIG5lZWRlZCBmb3IgdGhlIGJyZWFrcG9pbnQuIElmIG5vdCwgdHVybiBpdCBvZmZcblx0XHRcdFx0YXV0b09mZjogZmFsc2UsXG5cdFx0XHRcdC8vIFRoZSB0cmFuc2x1Y2VuY2UgZml4IGVuYWJsZXMgc3VwcG9ydCBmb3IgYSBmYWRlIGVmZmVjdCBiZXR3ZWVuIGltYWdlcyB3aXRoIGRpZmZlcmVudCBhc3BlY3QgcmF0aW8sXG5cdFx0XHRcdC8vIGJ1dCBjYXVzaW5nIGEgZGVsYXkgYmV0d2VlbiB0aGUgY2hhbmdlXG5cdFx0XHRcdGRpc2FibGVUcmFuc2x1Y2VuY2VGaXg6IGZhbHNlLFxuXHRcdFx0XHRicmVha3BvaW50czogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vIFVudGlsIHdoaWNoIGJyZWFrcG9pbnQgdGhpcyBzZXR0aW5ncyBpcyBhdmFpbGFibGVcblx0XHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDQwLFxuXHRcdFx0XHRcdFx0Ly8gSWYgdHJ1ZSwgdGhlIHBhZ2luZyBidWxsZXRzIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgcHJldmlldyBpbWFnZXMuXG5cdFx0XHRcdFx0XHR1c2VQcmV2aWV3QnVsbGV0czogZmFsc2UsXG5cdFx0XHRcdFx0XHQvLyBUaGlzIGFuZCBhbGwgb3RoZXIgc2V0dGluZ3MgYmVsb25naW5nIHRvIHRoZSBzd2lwZXIgcGx1Z2luLlxuXHRcdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcblx0XHRcdFx0XHRcdC8vIElmIHRydWUsIHRoZSBjdXJyZW50IHNsaWRlIGdldHMgY2VudGVyZWQgaW4gdmlldyAobW9zdCB1c2VmdWxsIHdpdGggYW4gZXZlbiBzbGlkZXNQZXJWaWV3XG5cdFx0XHRcdFx0XHQvLyBjb3VudCkuXG5cdFx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YnJlYWtwb2ludDogNjAsXG5cdFx0XHRcdFx0XHR1c2VQcmV2aWV3QnVsbGV0czogdHJ1ZSxcblx0XHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDNcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGJyZWFrcG9pbnQ6IDgwLFxuXHRcdFx0XHRcdFx0dXNlUHJldmlld0J1bGxldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRicmVha3BvaW50OiAxMDAsXG5cdFx0XHRcdFx0XHR1c2VQcmV2aWV3QnVsbGV0czogdHJ1ZSxcblx0XHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBkYXRhKSxcblx0XHRcdG1vZHVsZSA9IHt9O1xuXG5cbi8vICMjIyMjIyMjIyMgSEVMUEVSIEZVTkNUSU9OUyAjIyMjIyMjIyMjXG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogRnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgdGhlIG1hcmt1cCBmb3Jcblx0XHQgKiB0aGUgcHJldmlldyBidWxsZXRzXG5cdFx0ICogQHBhcmFtICAgICAgIHtTd2lwZXJ9ICAgICAgICBzd2lwZXIgICAgICAgICAgU3dpcGVyIG9iamVjdFxuXHRcdCAqIEBwYXJhbSAgICAgICB7aW50ZWdlcn0gICAgICAgaW5kZXggICAgICAgICAgIEluZGV4IG9mIHRoZSBzbGlkZVxuXHRcdCAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSAgICAgICAgY2xhc3NOYW1lICAgICAgIFRoZSBjbGFzc25hbWUgdGhhdCBtdXN0IGJlIGFkZCB0byB0aGUgbWFya3VwXG5cdFx0ICogQHJldHVybiAgICAgIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgVGhlIHByZXZpZXcgaW1hZ2UgaHRtbCBzdHJpbmdcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfZ2VuZXJhdGVQcmV2aWV3QnV0dG9ucyA9IGZ1bmN0aW9uIChzd2lwZXIsIGluZGV4LCBjbGFzc05hbWUpIHtcblx0XHRcdHZhciAkY3VycmVudFNsaWRlID0gJHNsaWRlcy5lcShpbmRleCksXG5cdFx0XHRcdCRpbWFnZSA9ICRjdXJyZW50U2xpZGUuZmluZCgnaW1nJyksXG5cdFx0XHRcdGFsdFR4dCA9ICRpbWFnZS5hdHRyKCdhbHQnKSxcblx0XHRcdFx0dGh1bWJJbWFnZSA9ICRjdXJyZW50U2xpZGUuZGF0YSgndGh1bWJJbWFnZScpO1xuXHRcdFx0XG5cdFx0XHRpZiAodGh1bWJJbWFnZSkge1xuXHRcdFx0XHRyZXR1cm4gJzxpbWcgc3JjPVwiJyArIHRodW1iSW1hZ2UgKyAnXCIgYWx0PVwiJyArIGFsdFR4dCArICdcIiBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnXCIgLz4nO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0byBnZXQgdGhlIGluZGV4IG9mIHRoZVxuXHRcdCAqIGFjdGl2ZSBzbGlkZVxuXHRcdCAqIEByZXR1cm4gICAgIHtpbnRlZ2VyfSAgICAgICAgICAgICAgICAgICAgICAgVGhlIGluZGV4IG9mIHRoZSBhY3RpdmUgc2xpZGVcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfZ2V0SW5kZXggPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpbmRleCA9ICR0aGlzXG5cdFx0XHRcdC5maW5kKCcuc3dpcGVyLXNsaWRlLWFjdGl2ZScpXG5cdFx0XHRcdC5pbmRleCgpO1xuXG5cdFx0XHQvLyBJZiB0aGVyZSBhcmUgZHVwbGljYXRlIHNsaWRlcyAoZ2VuZXJhdGVkXG5cdFx0XHQvLyBieSB0aGUgc3dpcGVyKSByZWNhbGN1bGF0ZSB0aGUgaW5kZXhcblx0XHRcdGluZGV4ID0gZHVwbGljYXRlcyA/IGluZGV4IC0gMSA6IGluZGV4O1xuXHRcdFx0aW5kZXggPSBpbmRleCB8fCAwO1xuXG5cdFx0XHRyZXR1cm4gaW5kZXg7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0byBhZGQgdGhlIGFjdGl2ZVxuXHRcdCAqIGNsYXNzIHRvIHRoZSBhY3RpdmUgc2xpZGVcblx0XHQgKiBAcGFyYW0gICAgICAge2ludGVnZXJ9ICAgICAgICAgICBpbmRleCAgICAgICBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSBzbGlkZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9zZXRBY3RpdmUgPSBmdW5jdGlvbihpbmRleCkge1xuXHRcdFx0JHNsaWRlcyA9ICR0aGlzLmZpbmQoJy5zd2lwZXItc2xpZGU6bm90KC5zd2lwZXItc2xpZGUtZHVwbGljYXRlKScpO1xuXHRcdFx0aW5kZXggPSBkdXBsaWNhdGVzID8gaW5kZXggKyAxIDogaW5kZXg7XG5cdFx0XHQkc2xpZGVzXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblx0XHRcdFx0LmVxKGluZGV4KVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH07XG5cblxuLy8gIyMjIyMjIyMjIyBFVkVOVCBIQU5ETEVSICMjIyMjIyMjIyNcblxuXHRcdC8qKlxuXHRcdCAqIEV2ZW50IGhhbmRsZXIgZm9yIHRoZSBtb3VzZWVudGVyIGV2ZW50LlxuXHRcdCAqIEl0IGRpc2FibGVzIHRoZSBhdXRvcGxheVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9tb3VzZUVudGVySGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHN3aXBlcikge1xuXHRcdFx0XHRcdHN3aXBlci5zdG9wQXV0b3BsYXkoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvLyBEbyBub3QgbG9nIHRoZSBlcnJvclxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBFdmVudCBoYW5kbGVyIGZvciB0aGUgbW91c2VsZWF2ZSBldmVudC5cblx0XHQgKiBJdCBlbmFibGVzIHRoZSBhdXRvcGxheVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9tb3VzZUxlYXZlSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHN3aXBlcikge1xuXHRcdFx0XHRcdHN3aXBlci5zdGFydEF1dG9wbGF5KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Ly8gRG8gbm90IGxvZyB0aGUgZXJyb3Jcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRXZlbnQgaGFuZGxlciBmb3IgdGhlIGdvdG8gZXZlbnQuXG5cdFx0ICogSXQgc3dpdGNoZXMgdGhlIGN1cnJlbnQgc2xpZGUgdG8gdGhlIGdpdmVuIGluZGV4XG5cdFx0ICogYW5kIGFkZHMgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgbmV3IGFjdGl2ZSBzbGlkZVxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICBlICAgICAgIGpRdWVyeSBldmVudCBvYmplY3Rcblx0XHQgKiBAcGFyYW0gICAgICAge251bWJlcn0gICAgZCAgICAgICBJbmRleCBvZiB0aGUgc2xpZGUgdG8gc2hvd1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9nb3RvSGFuZGxlciA9IGZ1bmN0aW9uKGUsIGQpIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdC8vIFNldCB0aGUgYWN0aXZlIHNsaWRlXG5cdFx0XHRfc2V0QWN0aXZlKGQpO1xuXG5cdFx0XHQvLyBUZW1wb3JhcnkgZGVhY3RpdmF0ZSB0aGUgb25TbGlkZUNoYW5nZVN0YXJ0IGV2ZW50XG5cdFx0XHQvLyB0byBwcmV2ZW50IGxvb3BpbmcgdGhyb3VnaCB0aGUgZ290byAvIGNoYW5nZVN0YXJ0XG5cdFx0XHQvLyBldmVudHNcblx0XHRcdHByZXZlbnRTbGlkZVN0YXJ0ID0gdHJ1ZTtcblxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBhdXRvcGxheSBhZnRlciBhIGdvdG8gZXZlbnRcblx0XHRcdCR0aGlzLm9mZignbW91c2VsZWF2ZS5zd2lwZXInKTtcblx0XHRcdHN3aXBlci5zdG9wQXV0b3BsYXkoKTtcblxuXHRcdFx0Ly8gVHJ5IHRvIGNvcnJlY3QgdGhlIGluZGV4IGJldHdlZW4gc2xpZGVyc1xuXHRcdFx0Ly8gd2l0aCBhbmQgd2l0aG91dCBkdXBsaWNhdGVzXG5cdFx0XHR2YXIgaW5kZXggPSBkdXBsaWNhdGVzID8gZCArIDEgOiBkO1xuXHRcdFx0aWYgKGluZGV4ID4gJHNsaWRlcy5sZW5ndGgpIHtcblx0XHRcdFx0aW5kZXggPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHb3RvIHRoZSBkZXNpcmVkIHNsaWRlXG5cdFx0XHRzd2lwZXIuc2xpZGVUbyhpbmRleCk7XG5cblx0XHRcdC8vIFJlYWN0aXZhdGUgdGhlIG9uU2xpZGVDaGFuZ2VFdmVudFxuXHRcdFx0cHJldmVudFNsaWRlU3RhcnQgPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2xpY2sgZXZlbnQgaGFuZGxlciB0aGF0IHRyaWdnZXJzIGFcblx0XHQgKiBcImdvdG9cIiBldmVudCB0byB0aGUgdGFyZ2V0IHN3aXBlclxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICAgICAgZSAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2NsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdGluZGV4ID0gJHNlbGYuaW5kZXgoKTtcblxuXHRcdFx0aW5kZXggPSBkdXBsaWNhdGVzID8gaW5kZXggLSAxIDogaW5kZXg7XG5cblx0XHRcdC8vIFNldCB0aGUgYWN0aXZlIHNsaWRlXG5cdFx0XHRfc2V0QWN0aXZlKGluZGV4KTtcblxuXHRcdFx0Ly8gSW5mb3JtIHRoZSBtYWluIHN3aXBlclxuXHRcdFx0JHRhcmdldC50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5TV0lQRVJfR09UTygpLCBpbmRleCk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEV2ZW50IHRoYXQgZ2V0cyB0cmlnZ2VyZWQgb24gc2xpZGVDaGFuZ2UuXG5cdFx0ICogSWYgdGhlIHNsaWRlIGdldHMgY2hhbmdlZCwgdGhlIGNvbnRyb2xzXG5cdFx0ICogd2lsbCBmb2xsb3cgdGhlIGN1cnJlbnQgc2xpZGUgaW4gcG9zaXRpb25cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfdHJpZ2dlclNsaWRlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIXByZXZlbnRTbGlkZVN0YXJ0KSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IF9nZXRJbmRleCgpLFxuXHRcdFx0XHRcdGxhc3RJbmRleCA9ICRzbGlkZXMubGVuZ3RoIC0gMjtcblxuXG5cdFx0XHRcdC8vIFJlY2FsY3VsYXRlIGluZGV4IGlmIGR1cGxpY2F0ZSBzbGlkZXMgYXJlIGluc2lkZSB0aGUgc2xpZGVyXG5cdFx0XHRcdGlmIChpbmRleCA8IDApIHtcblx0XHRcdFx0XHRpbmRleCA9ICRzbGlkZXMubGVuZ3RoIC0gMztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpbmRleCA9IChkdXBsaWNhdGVzICYmIGluZGV4ID09PSBsYXN0SW5kZXgpID8gaW5kZXggLSBsYXN0SW5kZXggOiBpbmRleDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNldCB0aGUgYWN0aXZlIHNsaWRlXG5cdFx0XHRcdF9zZXRBY3RpdmUoaW5kZXgpO1xuXG5cdFx0XHRcdC8vIEluZm9ybSB0aGUgY29udHJvbHNcblx0XHRcdFx0JGNvbnRyb2xzLnRyaWdnZXIoanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLlNXSVBFUl9HT1RPKCksIGluZGV4KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cblx0XHQvKipcblx0XHQgKiBXb3JrYXJvdW5kIGZvciB0aGUgdHJhbnNsdWNlbmNlIGlzc3VlXG5cdFx0ICogdGhhdCBoYXBwZW5zIG9uIHNtYWxsIHNjcmVlbnMgd2l0aCBlbmFibGVkXG5cdFx0ICogZmFkZSBlZmZlY3QuIE1heWJlIGl0IGNhbiBiZSByZW1vdmVkLCBpZiB0aGVcblx0XHQgKiBzd2lwZXIgZ2V0cyB1cGRhdGVkIGl0c2VsZlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF90cmFuc2x1Y2VuY2VXb3JrYXJvdW5kID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIW9wdGlvbnMuZGlzYWJsZVRyYW5zbHVjZW5jZUZpeCAmJiBzbGlkZXJPcHRpb25zICYmIHNsaWRlck9wdGlvbnMuZWZmZWN0ID09PSAnZmFkZScpIHtcblx0XHRcdFx0JHRoaXMuZmluZCgnLnN3aXBlci1zbGlkZScpXG5cdFx0XHRcdFx0LmZpbHRlcignOm5vdCguc3dpcGVyLXNsaWRlLWFjdGl2ZSknKVxuXHRcdFx0XHRcdC5mYWRlVG8oMzAwLCAwLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0JHRoaXMuZmluZCgnLnN3aXBlci1zbGlkZScpXG5cdFx0XHRcdFx0LmZpbHRlcignLnN3aXBlci1zbGlkZS1hY3RpdmUnKVxuXHRcdFx0XHRcdC5mYWRlVG8oMzAwLCAxLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuY3NzKCd2aXNpYmlsaXR5JywgJycpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBUaGUgYnJlYWtwb2ludCBoYW5kbGVyIGluaXRpYWxpemVzIHRoZSBzd2lwZXJcblx0XHQgKiB3aXRoIHRoZSBzZXR0aW5ncyBmb3IgdGhlIGN1cnJlbnQgYnJlYWtwb2ludC5cblx0XHQgKiBUaGVyZWZvcmUgaXQgdXNlcyB0aGUgZGVmYXVsdCBzbGlkZXIgb3B0aW9ucyxcblx0XHQgKiB0aGUgY3VzdG9tIHNsaWRlciBvcHRpb25zIGdpdmVuIGJ5IHRoZSBvcHRpb25zXG5cdFx0ICogb2JqZWN0IGFuZCB0aGUgYnJlYWtwb2ludCBvcHRpb25zIG9iamVjdCBhbHNvXG5cdFx0ICogZ2l2ZW4gYnkgdGhlIG9wdGlvbnMgKGluIHRoaXMgb3JkZXIpXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2JyZWFrcG9pbnRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEdldCB0aGUgY3VycmVudCB2aWV3bW9kZVxuXHRcdFx0dmFyIG9sZE1vZGUgPSBtb2RlIHx8IHt9LFxuXHRcdFx0XHRuZXdNb2RlID0ganNlLmxpYnMudGVtcGxhdGUucmVzcG9uc2l2ZS5icmVha3BvaW50KCksXG5cdFx0XHRcdGV4dGVuZE9wdGlvbnMgPSBvcHRpb25zLmJyZWFrcG9pbnRzWzBdIHx8IHt9LFxuXHRcdFx0XHRuZXdCcmVha3BvaW50RGF0YXNldCA9IG51bGw7XG5cblx0XHRcdC8vIE9ubHkgZG8gc29tZXRoaW5nIGlmIHRoZSB2aWV3IHdhcyBjaGFuZ2VkXG5cdFx0XHRpZiAobmV3TW9kZS5pZCAhPT0gb2xkTW9kZS5pZCkge1xuXG5cdFx0XHRcdC8vIFN0b3JlIHRoZSBuZXcgdmlld21vZGVcblx0XHRcdFx0bW9kZSA9ICQuZXh0ZW5kKHt9LCBuZXdNb2RlKTtcblxuXHRcdFx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIGJyZWFrcG9pbnRzIG9iamVjdCB0byBkZXRlY3Rcblx0XHRcdFx0Ly8gdGhlIGNvcnJlY3Qgc2V0dGluZ3MgZm9yIHRoZSBjdXJyZW50IGJyZWFrcG9pbnRcblx0XHRcdFx0JC5lYWNoKG9wdGlvbnMuYnJlYWtwb2ludHMsIGZ1bmN0aW9uKGksIHYpIHtcblx0XHRcdFx0XHRpZiAodi5icmVha3BvaW50ID4gbmV3TW9kZS5pZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRuZXdCcmVha3BvaW50RGF0YXNldCA9IGk7XG5cdFx0XHRcdFx0ZXh0ZW5kT3B0aW9ucyA9IHY7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKG9wdGlvbnMuc2xpZGVyT3B0aW9ucyAmJiBvcHRpb25zLnNsaWRlck9wdGlvbnMuYnJlYWtwb2ludHMpIHtcblx0XHRcdFx0XHQkLmVhY2gob3B0aW9ucy5zbGlkZXJPcHRpb25zLmJyZWFrcG9pbnRzLCBmdW5jdGlvbihpLCB2KSB7XG5cdFx0XHRcdFx0XHRpZiAodi5icmVha3BvaW50ID09PSBuZXdNb2RlLmlkKSB7XG5cdFx0XHRcdFx0XHRcdGV4dGVuZE9wdGlvbnMgPSB2O1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPbmx5IGRvIHNvbWV0aGluZyBpZiB0aGUgc2V0dGluZ3MgY2hhbmdlIGR1ZSBicm93c2VyXG5cdFx0XHRcdC8vIHJlc2l6ZSBvciBpZiBpdCdzIHRoZSBmaXJzdCB0aW1lIHJ1blxuXHRcdFx0XHRpZiAobmV3QnJlYWtwb2ludERhdGFzZXQgIT09IGJyZWFrcG9pbnREYXRhc2V0IHx8IGluaXQpIHtcblx0XHRcdFx0XHQvLyBDb21iaW5lIHRoZSBzZXR0aW5nc1xuXHRcdFx0XHRcdHNsaWRlck9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgc2xpZGVyRGVmYXVsdHMsIG9wdGlvbnMuc2xpZGVyT3B0aW9ucyB8fCB7fSwgZXh0ZW5kT3B0aW9ucyk7XG5cblx0XHRcdFx0XHQvLyBBZGQgdGhlIHByZXZpZXcgaW1hZ2UgYnVsbGV0cyBmdW5jdGlvbiB0byB0aGUgb3B0aW9ucyBvYmplY3Rcblx0XHRcdFx0XHRpZiAoc2xpZGVyT3B0aW9ucy51c2VQcmV2aWV3QnVsbGV0cyAmJiBoYXNUaHVtYm5haWxzKSB7XG5cdFx0XHRcdFx0XHRzbGlkZXJPcHRpb25zLnBhZ2luYXRpb25CdWxsZXRSZW5kZXIgPSBfZ2VuZXJhdGVQcmV2aWV3QnV0dG9ucztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBBZGQgdGhlIGF1dG9wbGF5IGludGVydmFsIHRvIHRoZSBvcHRpb25zIG9iamVjdFxuXHRcdFx0XHRcdHNsaWRlck9wdGlvbnMuYXV0b3BsYXkgPSAoc2xpZGVyT3B0aW9ucy5hdXRvcGxheSkgPyAoc2xpZGVyT3B0aW9ucy5hdXRvcGxheSAqIDEwMDApIDogMDtcblxuXHRcdFx0XHRcdC8vIERpc2FibGUgbG9vcCBpZiB0aGVyZSBpcyBvbmx5IG9uZSBzbGlkZXIuIFxuXHRcdFx0XHRcdGlmICgkdGhpcy5maW5kKCcuc3dpcGVyLXNsaWRlJykubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRzbGlkZXJPcHRpb25zLmxvb3AgPSBmYWxzZTsgXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIElmIGFuIHN3aXBlciBleGlzdHMsIGdldCB0aGUgY3VycmVudFxuXHRcdFx0XHRcdC8vIHNsaWRlIG5vLiBhbmQgcmVtb3ZlIHRoZSBvbGQgc3dpcGVyXG5cdFx0XHRcdFx0aWYgKHN3aXBlcikge1xuXHRcdFx0XHRcdFx0c2xpZGVyT3B0aW9ucy5pbml0aWFsU2xpZGUgPSBfZ2V0SW5kZXgoKTtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHN3aXBlci5kZXN0cm95KHRydWUsIHRydWUpO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoaWdub3JlKSB7XG5cdFx0XHRcdFx0XHRcdHN3aXBlciA9IG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2xpZGVyT3B0aW9ucy5pbml0aWFsU2xpZGUgPSBvcHRpb25zLmluaXRTbGlkZSB8fCBzbGlkZXJPcHRpb25zLmluaXRpYWxTbGlkZSB8fCAwO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciAkZHVwbGljYXRlID0gJHRoaXMuZmluZCgnLnN3aXBlci1zbGlkZTpub3QoLnN3aXBlci1zbGlkZS1kdXBsaWNhdGUpJyk7XG5cblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuYXV0b09mZiB8fCAoJGR1cGxpY2F0ZS5sZW5ndGggPiBzbGlkZXJPcHRpb25zLnNsaWRlc1BlclZpZXcgJiYgb3B0aW9ucy5hdXRvT2ZmKSkge1xuXHRcdFx0XHRcdFx0JHRoaXNcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzd2lwZXItaXMtYWN0aXZlJylcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdzd2lwZXItaXMtbm90LWFjdGl2ZScpO1xuXG5cdFx0XHRcdFx0XHQvLyBJbml0aWFsaXplIHRoZSBzd2lwZXJcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHN3aXBlciA9IG5ldyBTd2lwZXIoJHRoaXMsIHNsaWRlck9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47IC8vIFN3aXBlciBtaWdodCB0aHJvdyBhbiBlcnJvciB1cG9uIGluaXRpYWxpemF0aW9uIHRoYXQgc2hvdWxkIG5vdCBoYWx0IHRoZSBzY3JpcHQgZXhlY3V0aW9uLlxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzd2lwZXJcblx0XHRcdFx0XHRcdFx0Lm9mZignb25UcmFuc2l0aW9uRW5kIG9uU2xpZGVDaGFuZ2VTdGFydCcpXG5cdFx0XHRcdFx0XHRcdC5vbignb25UcmFuc2l0aW9uRW5kJywgX3RyYW5zbHVjZW5jZVdvcmthcm91bmQpO1xuXG5cdFx0XHRcdFx0XHQvLyBJZiB0aGlzIGlzIGEgXCJtYWluXCIgc3dpcGVyIGFuZCBoYXMgZXh0ZXJuYWwgY29udHJvbHMsIGFuXG5cdFx0XHRcdFx0XHQvLyBnb3RvIGV2ZW50IGlzIHRyaWdnZXJlZCBpZiB0aGUgY3VycmVudCBzbGlkZSBpcyBjaGFuZ2VkXG5cdFx0XHRcdFx0XHRpZiAoJGNvbnRyb2xzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRzd2lwZXIub24oJ29uU2xpZGVDaGFuZ2VTdGFydCcsIF90cmlnZ2VyU2xpZGVDaGFuZ2UpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBBZGQgdGhlIGV2ZW50IGhhbmRsZXJcblx0XHRcdFx0XHRcdCR0aGlzXG5cdFx0XHRcdFx0XHRcdC5vZmYoJ21vdXNlZW50ZXIuc3dpcGVyIG1vdXNlbGVhdmUuc3dpcGVyICcgKyBqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuU1dJUEVSX0dPVE8oKSArICcgJ1xuXHRcdFx0XHRcdFx0XHQgICAgICsganNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLlNMSURFU19VUERBVEUoKSlcblx0XHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWVudGVyLnN3aXBlcicsIF9tb3VzZUVudGVySGFuZGxlcilcblx0XHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlLnN3aXBlcicsIF9tb3VzZUxlYXZlSGFuZGxlcilcblx0XHRcdFx0XHRcdFx0Lm9uKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5TV0lQRVJfR09UTygpLCBfZ290b0hhbmRsZXIpXG5cdFx0XHRcdFx0XHRcdC5vbihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuU0xJREVTX1VQREFURSgpLCBfdXBkYXRlU2xpZGVzKTtcblxuXHRcdFx0XHRcdFx0aWYgKGluaXQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlcmUgYXJlIGR1cGxpY2F0ZXMgc2xpZGVzIChnZW5lcmF0ZWQgYnkgdGhlIHN3aXBlcilcblx0XHRcdFx0XHRcdFx0Ly8gYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaW5pdCBvZiB0aGUgc3dpcGVyXG5cdFx0XHRcdFx0XHRcdGR1cGxpY2F0ZXMgPSAhISR0aGlzLmZpbmQoJy5zd2lwZXItc2xpZGUtZHVwbGljYXRlJykubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBTZXQgdGhlIGFjdGl2ZSBzbGlkZVxuXHRcdFx0XHRcdFx0dmFyIGluZGV4ID0gKGluaXQgJiYgb3B0aW9ucy5pbml0U2xpZGUpID8gb3B0aW9ucy5pbml0U2xpZGUgOiBfZ2V0SW5kZXgoKTtcblx0XHRcdFx0XHRcdF9zZXRBY3RpdmUoaW5kZXgpO1xuXG5cdFx0XHRcdFx0XHQvLyBJbmZvcm0gdGhlIGNvbnRyb2xzIHRoYXQgdGhlIG1haW4gc3dpcGVyIGhhcyBjaGFuZ2VkXG5cdFx0XHRcdFx0XHQvLyBJbiBjYXNlIHRoYXQgdGhlIG90aGVyIHNsaWRlciBpc24ndCBpbml0aWFsaXplZCB5ZXQsXG5cdFx0XHRcdFx0XHQvLyBzZXQgYW4gZGF0YSBhdHRyaWJ1dGUgdG8gdGhlIG1hcmt1cCBlbGVtZW50IHRvIGluZm9ybVxuXHRcdFx0XHRcdFx0Ly8gaXQgb24gaW5pdFxuXHRcdFx0XHRcdFx0aWYgKCRjb250cm9scy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0JGNvbnRyb2xzLmF0dHIoJ2RhdGEtc3dpcGVyLWluaXQtc2xpZGUnLCBpbmRleCk7XG5cdFx0XHRcdFx0XHRcdF90cmlnZ2VyU2xpZGVDaGFuZ2UoKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gVW5zZXQgdGhlIGluaXQgZmxhZ1xuXHRcdFx0XHRcdFx0aW5pdCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIERpc2FibGUgdGhlIHN3aXBlciBidXR0b25zXG5cdFx0XHRcdFx0XHQkdGhpc1xuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3N3aXBlci1pcy1hY3RpdmUnKVxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3N3aXBlci1pcy1ub3QtYWN0aXZlJyk7XG5cdFx0XHRcdFx0XHRpbml0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEV2ZW50IGhhbmRsZXIgdGhhdCBhZGRzICYgcmVtb3ZlcyBzbGlkZXMgZnJvbSB0aGVcblx0XHQgKiBzd2lwZXIuIEFmdGVyIHRoZSBzbGlkZXMgd2VyZSBwcm9jZXNzZWQsIHRoZSBmaXJzdFxuXHRcdCAqIHNsaWRlIGlzIHNob3duXG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgIGUgICAgICAgalF1ZXJ5IGV2ZW50IG9iamVjdFxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICBkICAgICAgIEpTT04gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIGNhdGVnb3JpZXMgLyBpbWFnZXNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfdXBkYXRlU2xpZGVzID0gZnVuY3Rpb24oZSwgZCkge1xuXG5cdFx0XHQvLyBMb29wcyB0aHJvdWdoIGVhY2ggY2F0ZWdvcnkgaW5zaWRlIHRoZSBpbWFnZXMgYXJyYXlcblx0XHRcdCQuZWFjaChkLCBmdW5jdGlvbihjYXRlZ29yeSwgZGF0YXNldCkge1xuXHRcdFx0XHR2YXIgY2F0TmFtZSA9IGNhdGVnb3J5ICsgJy1jYXRlZ29yeScsXG5cdFx0XHRcdFx0YWRkID0gW10sXG5cdFx0XHRcdFx0cmVtb3ZlID0gW10sXG5cdFx0XHRcdFx0bWFya3VwID0gJHRlbXBsYXRlLmh0bWwoKTtcblxuXHRcdFx0XHQvLyBHZXQgYWxsIGluZGV4ZXMgZnJvbSB0aGUgc2xpZGVzXG5cdFx0XHRcdC8vIG9mIHRoZSBzYW1lIGNhdGVnb3J5IGFuZCByZW1vdmVcblx0XHRcdFx0Ly8gdGhlbSBmcm9tIHRoZSBzbGlkZXJcblx0XHRcdFx0JHNsaWRlc1xuXHRcdFx0XHRcdC5maWx0ZXIoJy4nICsgY2F0TmFtZSlcblx0XHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHRcdGluZGV4ID0gJHNlbGYuZGF0YSgpLnN3aXBlclNsaWRlSW5kZXg7XG5cblx0XHRcdFx0XHRcdGluZGV4ID0gaW5kZXggPT09IHVuZGVmaW5lZCA/ICRzZWxmLmluZGV4KCkgOiBpbmRleDtcblx0XHRcdFx0XHRcdHJlbW92ZS5wdXNoKGluZGV4KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0c3dpcGVyLnJlbW92ZVNsaWRlKHJlbW92ZSk7XG5cblx0XHRcdFx0Ly8gR2VuZXJhdGUgdGhlIG1hcmt1cCBmb3IgdGhlIG5ldyBzbGlkZXNcblx0XHRcdFx0Ly8gYW5kIGFkZCB0aGVtIHRvIHRoZSBzbGlkZXJcblx0XHRcdFx0JC5lYWNoKGRhdGFzZXQgfHwgW10sIGZ1bmN0aW9uKGksIHYpIHtcblx0XHRcdFx0XHR2LmNsYXNzTmFtZSA9IGNhdE5hbWU7XG5cdFx0XHRcdFx0di5zcmNhdHRyID0gJ3NyYz1cIicgKyB2LnNyYyArICdcIic7XG5cdFx0XHRcdFx0YWRkLnB1c2goTXVzdGFjaGUucmVuZGVyKG1hcmt1cCwgdikpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3dpcGVyLmFwcGVuZFNsaWRlKGFkZCk7XG5cblx0XHRcdH0pO1xuXG5cdFx0XHQkc2xpZGVzID0gJHRoaXMuZmluZCgnLnN3aXBlci1zbGlkZScpO1xuXG5cdFx0XHQvLyBUbyBwcmV2ZW50IGFuIGluY29uc2lzdGVudCBzdGF0ZVxuXHRcdFx0Ly8gaW4gY29udHJvbCAvIG1haW4gc2xpZGVyIGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gc2xpZGUgdG8gdGhlIGZpcnN0IHNsaWRlXG5cdFx0XHRfc2V0QWN0aXZlKDApO1xuXHRcdFx0dmFyIGluZGV4ID0gZHVwbGljYXRlcyA/IDEgOiAwO1xuXHRcdFx0c3dpcGVyLnNsaWRlVG8oaW5kZXgsIDApO1xuXG5cdFx0fTtcblx0XHRcblx0XHQvKipcblx0XHQgKiBQcmV2ZW50IHRleHQgc2VsZWN0aW9uIGJ5IGNsaWNraW5nIG9uIHN3aXBlciBidXR0b25zXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3ByZXZlbnRUZXh0U2VsZWN0aW9uID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQkKG9wdGlvbnMuc2xpZGVyT3B0aW9ucy5uZXh0QnV0dG9uKS5vbignc2VsZWN0c3RhcnQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0XHQkKG9wdGlvbnMuc2xpZGVyT3B0aW9ucy5wcmV2QnV0dG9uKS5vbignc2VsZWN0c3RhcnQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0XHRcblx0XHQvKipcblx0XHQgKiBTZXRzIHRoZSBpbml0aWFsIGhlaWdodCBmb3Igb25lIHN3aXBlciBpbWFnZSBjb250YWluZXIgdG8gcHJldmVudCBjdXQgb2ZmIGltYWdlcyBvbiBzbWFsbGVyIHN3aXBlciBoZWlnaHRzXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3NjYWxlVGh1bWJuYWlsSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc3dpcGVyQ29udGFpbmVyID0gJCgnLnN3aXBlci1jb250YWluZXItdmVydGljYWwgLnN3aXBlci1zbGlkZScpO1xuXHRcdFx0dmFyICRjb250YWluZXJIZWlnaHQgPSBzd2lwZXJDb250YWluZXIuY3NzKCdoZWlnaHQnKTtcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHQvLyBXb3JrYXJvdW5kIGZvciBJRSBCcm93c2Vyc1xuXHRcdFx0aWYgKCQoJy5zd2lwZXItY29udGFpbmVyLXZlcnRpY2FsJykuaGFzQ2xhc3MoJ3N3aXBlci13cDgtdmVydGljYWwnKSkge1xuXHRcdFx0XHQkY29udGFpbmVySGVpZ2h0ID0gc3dpcGVyQ29udGFpbmVyLmhlaWdodCgpICsgNTtcblx0XHRcdFx0XG5cdFx0XHRcdHN3aXBlckNvbnRhaW5lci5jc3MoJ2hlaWdodCcsICRjb250YWluZXJIZWlnaHQpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoJGNvbnRhaW5lckhlaWdodCA9PT0gJzBweCcpIHtcblx0XHRcdFx0JGNvbnRhaW5lckhlaWdodCA9ICQoJy5wcm9kdWN0LWluZm8tdGh1bWJuYWlscy1tb2JpbGUnKS5jc3MoJ2hlaWdodCcpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQkKCcuYWxpZ24tbWlkZGxlJykuY3NzKCdoZWlnaHQnLCAkY29udGFpbmVySGVpZ2h0KTtcblx0XHR9O1xuXG4vLyAjIyMjIyMjIyMjIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuXHRcdC8qKlxuXHRcdCAqIEluaXQgZnVuY3Rpb24gb2YgdGhlIHdpZGdldFxuXHRcdCAqIEBjb25zdHJ1Y3RvclxuXHRcdCAqL1xuXHRcdG1vZHVsZS5pbml0ID0gZnVuY3Rpb24oZG9uZSkge1xuXG5cdFx0XHQkc2xpZGVzID0gJHRoaXMuZmluZCgnLnN3aXBlci1zbGlkZScpO1xuXHRcdFx0JGNvbnRyb2xzID0gJChvcHRpb25zLmNvbnRyb2xzKTtcblx0XHRcdCR0YXJnZXQgPSAkKG9wdGlvbnMudGFyZ2V0KTtcblx0XHRcdCR0ZW1wbGF0ZSA9ICR0aGlzLmZpbmQoJ3RlbXBsYXRlJyk7XG5cblx0XHRcdC8vIENoZWNrIGlmIGFsbCBpbWFnZXMgaW5zaWRlIHRoZSBzd2lwZXIgaGF2ZVxuXHRcdFx0Ly8gdGh1bWJuYWlsIGltYWdlIGdpdmVuXG5cdFx0XHQkc2xpZGVzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICghJCh0aGlzKS5kYXRhKCkudGh1bWJJbWFnZSkge1xuXHRcdFx0XHRcdGhhc1RodW1ibmFpbHMgPSBmYWxzZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBZGQgdGhlIGJyZWFrcG9pbnQgaGFuZGxlciB0eSBkeW5hbWljYWxseVxuXHRcdFx0Ly8gc2V0IHRoZSBvcHRpb25zIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGJyb3dzZXIgc2l6ZSAoc2xpZGVyIHJlc3BvbnNpdmUgd2lsbCByZS1pbml0aWFsaXplIHRoZSBzd2lwZXIpLlxuXHRcdFx0X2JyZWFrcG9pbnRIYW5kbGVyKCk7XG5cblx0XHRcdC8vIElmIHRoaXMgaW5zdGFuY2UgaXMgYSBcImNvbnRyb2xcIiBzd2lwZXIgdGhlIHRhcmdldCBpcyB0aGUgbWFpbiBzd2lwZXJcblx0XHRcdC8vIHdoaWNoIHdpbGwgYmUgdXBkYXRlZCBvbiBhIGNsaWNrIGluc2lkZSB0aGlzIGNvbnRyb2wgc3dpcGVyXG5cdFx0XHRpZiAob3B0aW9ucy50YXJnZXQpIHtcblx0XHRcdFx0JHRoaXMub24oJ2NsaWNrLnN3aXBlcicsICcuc3dpcGVyLXNsaWRlJywgX2NsaWNrSGFuZGxlcik7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKCcuc3dpcGVyLXZlcnRpY2FsIC5zd2lwZXItc2xpZGVbZGF0YS1pbmRleF0nKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG5cdFx0XHRcdCQoJy5wcm9kdWN0LWluZm8taW1hZ2UgLnN3aXBlci1zbGlkZVtkYXRhLWluZGV4XScpLmNzcygnei1pbmRleCcsICdpbmhlcml0Jyk7XG5cdFx0XHRcdCQoJy5wcm9kdWN0LWluZm8taW1hZ2UgLnN3aXBlci1zbGlkZVtkYXRhLWluZGV4XSAuc3dpcGVyLXNsaWRlLWluc2lkZSBpbWcuaW1nLXJlc3BvbnNpdmUnKS5mYWRlSW4oMTAwMCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0X3RyYW5zbHVjZW5jZVdvcmthcm91bmQoKTtcblx0XHRcdF9wcmV2ZW50VGV4dFNlbGVjdGlvbigpO1xuXHRcdFx0X3NjYWxlVGh1bWJuYWlsSGVpZ2h0KCk7XG5cdFx0XHRcblx0XHRcdC8vIEZpeCBmb3IgaW52aXNpYmxlIFRodW1ibmFpbC1JbWFnZXMgZm9yIHN3aXRjaGluZyBmcm9tIFRhYmxldC1Qb3J0cmFpdCB0byBUYWJsZXQtTGFuZHNjYXBlXG5cdFx0XHQkYm9keS5vbihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuQlJFQUtQT0lOVCgpLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0X3NjYWxlVGh1bWJuYWlsSGVpZ2h0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZG9uZSgpO1xuXHRcdH07XG5cblx0XHQvLyBSZXR1cm4gZGF0YSB0byB3aWRnZXQgZW5naW5lXG5cdFx0cmV0dXJuIG1vZHVsZTtcblx0fSk7XG4iXX0=
