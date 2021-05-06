'use strict';

/* --------------------------------------------------------------
 menu.js 2018-02-01
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2018 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

/**
 * This widget handles the horizontal menu/dropdown functionality.
 *
 * It's used for the top category navigation, the cart dropdown or the top menu (for example). It is
 * able to re-order the menu entries to a special "More" submenu to save space if the entries don't
 * fit in the current view. It's also able to work with different event types for opening/closing menu
 * items in the different view types.
 */
gambio.widgets.module('menu', [gambio.source + '/libs/events', gambio.source + '/libs/responsive', gambio.source + '/libs/interaction'], function (data) {

	'use strict';

	// ########## VARIABLE INITIALIZATION ##########

	var $this = $(this),
	    $window = $(window),
	    $body = $('body'),
	    $list = null,
	    $entries = null,
	    $more = null,
	    $moreEntries = null,
	    $menuEntries = null,
	    $custom = null,
	    $categories = null,
	    touchEvents = null,
	    currentWidth = null,
	    mode = null,
	    mobile = false,
	    enterTimer = null,
	    leaveTimer = null,
	    initializedPos = false,
	    onEnter = false,
	    toucheStartEvent = null,
	    toucheEndEvent = null,
	    transition = {},
	    isTouchDevice = Modernizr.touchevents || navigator.userAgent.search(/Touch/i) !== -1,
	    defaults = {
		// The menu type must be either 'horizontal' or 'vertical'
		menuType: 'horizontal',

		// Vertical menu options.
		unfoldLevel: 0,
		accordion: false,
		showAllLink: false,

		// Minimum breakpoint to switch to mobile view
		breakpoint: 40,
		// Delay in ms after a mouseenter the element gets shown
		enterDelay: 0,
		// Delay in ms after a mouseleave an element gets hidden
		leaveDelay: 50,
		// Tolerance in px which gets substracted from the nav-width to prevent flickering
		widthTolerance: 10,
		// Class that gets added to an opened menu list item
		openClass: 'open',
		// If true, elements get moved from/to the more menu if there isn't enough space
		switchElementPosition: true,
		// Ignore menu functionality on elements inside this selection
		ignoreClass: 'ignore-menu',
		// Tolerance in px which is allowed for a "click" event on touch
		touchMoveTolerance: 10,
		// If true, the li with the active class gets opened
		openActive: false,
		events: {
			// Event types that open the menus in desktop view.
			// Possible values: ['click']; ['hover']; ['touch', 'hover']; ['click', 'hover']
			desktop: ['touch', 'hover'],
			// Event types that open the menus in mobile view.
			// Possible values: ['click']; ['hover']; ['touch', 'hover']; ['click', 'hover']; ['touch', 'click']
			mobile: ['touch', 'click']
		}
	},
	    options = $.extend({}, defaults, data),
	    module = {};

	// ########## HELPER FUNCTIONS ##########

	/**
  * Helper function to calculate the tolerance
  * between the touchstart and touchend event.
  * If the max tolarance is exceeded return true
  * @param       {object}        e       jQuery event object
  * @return     {boolean}               If true it is a move event
  * @private
  */
	var _touchMoveDetect = function _touchMoveDetect() {
		toucheEndEvent = toucheEndEvent || toucheStartEvent;
		var diff = Math.abs(toucheEndEvent.event.originalEvent.pageY - toucheStartEvent.event.originalEvent.pageY);
		toucheEndEvent = null;
		return diff > options.touchMoveTolerance;
	};

	/**
  * Updates the jQuery selection, because the
  * list elements can be moved
  *
  * @private
  */
	var _getSelections = function _getSelections() {
		$list = $this.children('ul');
		// Exclude the ".navbar-topbar-item" elements because they
		// are cloned to this menu and are only shown in mobile view
		$entries = $list.children().not('.navbar-topbar-item');
		$more = $entries.filter('.dropdown-more');
		$moreEntries = $more.children('ul');
		$custom = $entries.filter('.custom');
		$menuEntries = $entries.not($more);
		$categories = $menuEntries.not($custom);
	};

	/**
  * Helper function that detaches an element from the
  * menu and attaches it to the correct position at
  * the target
  * @param       {object}    $item       jQuery selection of the item that gets detached / attached
  * @param       {object}    $target     jQuery selection of the target container
  * @private
  */
	var _setItem = function _setItem($item, $target) {
		var positionId = $item.data('position'),
		    done = false;

		// Look for the first item that has a higher
		// positionId that the item and insert it
		// before the found entry
		$target.children().each(function () {
			var $self = $(this),
			    position = $self.data('position');

			if (position > positionId) {
				$self.before($item.detach());
				done = true;
				return false;
			}
		});

		// Append the item if the positionId has
		// a higher value as the last item int the
		// target
		if (!done) {
			$target.append($item);
		}
	};

	/**
  * Helper function that checks which elements needs
  * to be added to the menu. Every element that needs
  * to be added gets passed to the function
  * "_setItem"
  * @param       {integer}       diff        Amount of pixels that were free
  * @private
  */
	var _addElement = function _addElement(diff) {

		var done = false;

		/**
   * Helper function that loops through the elements
   * and tries to add the elements to the menu if
   * it would fit.
   * @param       {object}    $elements       jQuery selection of the entries inside the more-menu
   * @private
   */
		var _showElements = function _showElements($elements) {
			$elements.each(function () {
				var $self = $(this),
				    width = $self.data().width;

				if (diff > width) {
					// Add the item to the menu
					_setItem($self, $list);
					diff -= width;
				} else {
					// The next item wouldn't fit anymore',
					// quit the loop
					done = true;
					return false;
				}
			});
		};

		// Update the selection of the visible menu items.
		_getSelections();

		// Add the content manager entries to the menu first.
		// If there is still space, add the "normal" category
		// items also
		_showElements($moreEntries.children('.custom'));
		if (!done) {
			_showElements($moreEntries.children());
		}

		// Check if the items still in the more menu
		// would fit inside the main menu if the more
		// menu would get hidden
		var width = 0;
		$moreEntries.children().each(function () {
			width += $(this).data().width;
		});

		if (width === 0) {
			$more.hide();
		} else if (width < $more.data().width + diff) {
			$more.hide();
			diff += $more.data().width;
			_showElements($moreEntries.children());
		}
	};

	/**
  * Helper function that checks which elements needs
  * to be removed from the menu, so that it fits
  * inside one menu line. Every element that needs
  * to be removed gets passed to the function
  * "_setItem"
  * @param       {integer}       diff        Amount of pixels that needs to be saved
  * @private
  */
	var _removeElement = function _removeElement(diff) {

		var done = false;

		/**
   * Helper function that contains the check
   * loop for determining which elements
   * needs to be removed
   * @param           {object}    $elements       jQuery selection of the menu items
   * @private
   */
		var _hideElements = function _hideElements($elements) {
			$elements.each(function () {
				var $self = $(this),
				    width = $self.data().width;

				// Remove the possibly set open state
				$self.filter('.' + options.openClass).add($self.find('.' + options.openClass)).removeClass(options.openClass);

				// Add the entry to the more-menu
				_setItem($self, $moreEntries);

				diff -= width;

				if (diff < 0) {
					// Enough elements are removed,
					// quit the loop
					done = true;
					return false;
				}
			});
		};

		// Update the selection of the visible menu items
		_getSelections();

		// Add the width of the more entry if it's not
		// visible, because it will get shown during this
		// function call
		if ($more.is(':hidden')) {
			diff += $more.data().width;
			$more.removeClass('style');
			$more.show();
		}

		// First remove "normal" category entries. If that
		// isn't enough remove the content manager entries also
		_hideElements($($categories.get().reverse()));
		if (!done) {
			_hideElements($($custom.get().reverse()));
		}
	};

	/**
  * Sets a data attribute to the menu items
  * that contains the width of the elements.
  * This is needed because if it is display
  * none the detected with will be zero. It
  * sets position id also.
  * @private
  */
	var _initElementSizesAndPosition = function _initElementSizesAndPosition() {
		$entries.each(function (i) {
			var $self = $(this),
			    width = $self.outerWidth();

			$self.data({ width: width, position: i });
		});
	};

	/**
  * Helper function to close all menu entries.
  * Needed for the desktop <-> mobile view
  * change, mostly.
  * @private
  */
	var _closeMenu = function _closeMenu() {
		$this.find('li.' + options.openClass).each(function () {
			if ($(this).parents('.navbar-categories-left').length > 0) {
				return true;
			}
			$(this).removeClass(options.openClass);
		});
	};

	/**
  * Helper function to clear all pending
  * functions
  * @private
  */
	var _clearTimeouts = function _clearTimeouts() {
		enterTimer = enterTimer ? clearTimeout(enterTimer) : null;
		leaveTimer = leaveTimer ? clearTimeout(leaveTimer) : null;
	};

	/**
  * Helper function to reset the css of the menu.
  * This is needed to remove the overflow & height
  * settings of the menu of the css file. The
  * directives were set to prevent flickering on page
  * load
  * @private
  */
	var _resetInitialCss = function _resetInitialCss() {
		$this.css({
			'overflow': 'visible',
			'height': 'auto'
		});
	};

	/**
  * Helper function to set positioning classes
  * to the opend flyout. This is needed to keep
  * the flyout inside the boundaries of the navigation
  * @private
  */
	var _repositionOpenLayer = function _repositionOpenLayer() {
		var listWidth = $list.width(),
		    $openLayer = $entries.filter('.' + options.openClass).children('ul');

		$openLayer.each(function () {
			var $self = $(this),
			    $parent = $self.parent();

			// Reset the classes to prevent wrong calculation due to special styles
			$parent.removeClass('flyout-right flyout-left flyout-center flyout-wont-fit');

			var width = $self.outerWidth(),
			    parentPosition = $parent.position().left,
			    parentWidth = $parent.outerWidth();

			// Check witch class needs to be set
			if (listWidth > parentPosition + width) {
				$parent.addClass('flyout-right');
			} else if (parentPosition + parentWidth - width > 0) {
				$parent.addClass('flyout-left');
			} else if (width < listWidth) {
				$parent.addClass('flyout-center');
			} else {
				$parent.addClass('flyout-wont-fit');
			}
		});
	};

	/**
  * Helper function to calculate the difference between
  * the size of the visible elements in the menu and the
  * container size. If there is space, it calls the function
  * to activate an menu entry else it calls the function to
  * deactivate a menu entry
  * @param       {object}    e         jQuery event object
  * @param       {string}    eventName Event name parameter of the event object
  * @private
  */
	var _updateCategoryMenu = function _updateCategoryMenu(e, eventName) {
		var containerWidth = $this.innerWidth() - options.widthTolerance,
		    width = 0;

		// Check if the container width has changed since last call
		if (options.menuType === 'horizontal' && (currentWidth !== containerWidth || eventName === 'switchedToDesktop')) {

			$list.children(':visible').each(function () {
				width += $(this).data('width');
			});

			// Add or remove elements depending on the size of the
			// visible elements
			if (containerWidth < width) {
				_removeElement(width - containerWidth);
			} else {
				_addElement(containerWidth - width);
			}

			_repositionOpenLayer();

			currentWidth = containerWidth;
		}
	};

	/**
  * Helper function to switch to the mobile
  * mode of the menu.
  * @private
  */
	var _switchToMobileView = function _switchToMobileView() {
		// Reset the current width so that
		// the "_updateCategoryMenu" will
		// perform correctly on the next view
		// change to desktop
		currentWidth = -1;
		_addElement(99999999);

		$('.level-1').css('padding-bottom', '200px'); // This padding corrects expand/collapse behavior of lower menu items in various mobile browsers. 

		// Use the vertical menu on mobile view.
		if (options.menuType === 'vertical') {
			// fixes display horizontal menu after a switch to mobile and back to desktop is performed
			if ($('#categories nav.navbar-default:first').not('.nav-categories-left').length > 0) {
				$('#categories nav.navbar-default:first').css({
					opacity: 0,
					height: 0
				}).children().hide();
			}

			// move topmenu-content items from horizontal menu to vertical menu
			$this.find('ul.level-1 li.navbar-topbar-item:first').before($('#categories nav.navbar-default li.topmenu-content').detach());

			$this.appendTo('#categories > .navbar-collapse');
			$this.addClass('navbar-default navbar-categories');
			$this.find('ul.level-1').addClass('navbar-nav');
			$this.find('.navbar-topbar-item').not('.topbar-search').show();

			_bindHorizontalEventHandlers();

			$body.trigger(jse.libs.template.events.MENU_REPOSITIONED(), ['switchedToMobile']);
		}
	};

	/**
  * Helper function to switch to the desktop
  * mode of the menu. Additionally, in case that
  * the desktop mode is shown for the first time
  * set the position and width of the elements
  * @private
  */
	var _switchToDesktopView = function _switchToDesktopView() {
		$('.level-1').css('padding-bottom', ''); // Reset display fix for mobile browsers.

		// Revert all the changes made during the switch to mobile.
		if (options.menuType === 'vertical') {
			// fixes display horizontal menu after a switch to mobile and back to desktop is performed
			if ($('#categories nav.navbar-default:first').not('.nav-categories-left').length > 0) {
				$('#categories nav.navbar-default:first').css({
					opacity: 1,
					height: 'auto'
				}).children().show();
			}

			// move topmenu-content items back to horizontal menu
			var $topmenuContentElements = $this.find('li.topmenu-content').detach();
			$('#categories nav.navbar-default ul.level-1:first').append($topmenuContentElements);

			$this.appendTo('.box-categories');
			$this.removeClass('navbar-default navbar-categories');
			$this.find('ul.level-1').removeClass('navbar-nav');
			$this.find('.navbar-topbar-item').hide();
			_unbindHorizontalEventHandlers();

			$body.trigger(jse.libs.template.events.MENU_REPOSITIONED(), ['switchedToDesktop']);
		}

		if (!initializedPos) {
			_initElementSizesAndPosition();
			initializedPos = true;
		}

		if (options.menuType === 'horizontal') {
			_updateCategoryMenu();

			if (isTouchDevice) {
				$list.find('.enter-category').show();
				$list.find('.dropdown > a').click(function (e) {
					e.preventDefault();
				});
			}
		}
	};

	/**
  * Helper function to add the class to the li-element
  * depending on the open event. This can be a "touch"
  * or a "mouse" class
  * @param       {object}    $target         jQuery selection of the li-element
  * @param       {string}    className       Name of the class that gets added
  * @private
  */
	var _setEventTypeClass = function _setEventTypeClass($target, className) {
		$target.removeClass('touch mouse').addClass(className || '');
	};

	// ########## MAIN FUNCTIONALITY ##########

	/**
  * Function that gets called by the breakpoint trigger
  * (which is fired on browser resize). It checks for
  * CSS view changes and reconfigures the the JS behaviour
  * of the menu in that case
  * @private
  */
	var _breakpointHandler = function _breakpointHandler() {

		// Get the current viewmode
		var oldMode = mode || {},
		    newMode = jse.libs.template.responsive.breakpoint();

		// Only do something if the view was changed
		if (newMode.id !== oldMode.id) {

			// Check if a view change between mobile and desktop view was made
			var switchToMobile = newMode.id <= options.breakpoint && (!mobile || oldMode.id === undefined),
			    switchToDesktop = newMode.id > options.breakpoint && (mobile || oldMode.id === undefined);

			// Store the new view settings
			mobile = newMode.id <= options.breakpoint;
			mode = $.extend({}, newMode);

			if (switchToMobile || switchToDesktop) {
				_clearTimeouts();
				if (options.menuType !== 'vertical') {
					_closeMenu();
				}

				// Change the visibility of the menu items
				// in case of desktop <-> mobile view change
				if (options.switchElementPosition) {
					if (switchToMobile) {
						_switchToMobileView();
					} else {
						_switchToDesktopView();
					}
				} else {
					_repositionOpenLayer();
				}
			} else if (!mobile && options.switchElementPosition) {
				// Update the visibility of the menu items
				// if the view change was desktop to desktop only
				_updateCategoryMenu();
			} else if (!mobile) {
				_repositionOpenLayer();
			}
		}
	};

	// ######### EVENT HANDLER ##########

	/**
  * Changes the epand / collapse state of the menu,
  * if there is an submenu. In the other case it
  * will let execute the default action (most times
  * the execution of a link)
  * @param {object}  e       jQuery event object
  * @param {string}  mode    The current view mode (can be "mobile" or "desktop"
  * @param {integer} delay   Custom delay (in ms) for opening closing the menu (needed for click / touch events)
  * @private
  */
	var _openMenu = function _openMenu(e, type, delay) {

		var $self = $(this),
		    $submenu = $self.children('ul'),
		    length = $submenu.length,
		    level = $submenu.length ? $submenu.data('level') || '0' : 99,
		    validSubmenu = parseInt(level, 10) <= 2 && mode.id > options.breakpoint || mode.id <= options.breakpoint;

		if (type === 'mobile') {
			e.stopPropagation();
		}

		// Only change the state if there is
		// a submenu
		if (length && validSubmenu) {
			e.preventDefault();

			if (type === 'mobile') {
				// Simply toggle the openClass in mobile mode
				$self.toggleClass(options.openClass);
			} else {
				// Perform the else case for the desktop view

				var visible = $self.hasClass(options.openClass),
				    leave = $self.hasClass('leave'),
				    action = e.data && e.data.action ? e.data.action : visible && leave ? 'enter' : visible ? 'leave' : 'enter';

				// Depending on the visibility and the event-action-parameter
				// the submenu gets opened or closed
				switch (action) {
					case 'enter':
						if (!onEnter && !jse.libs.template.interaction.isMouseDown()) {
							onEnter = true;
							// Set a timer for opening if the submenu (delayed opening)
							_clearTimeouts();
							enterTimer = setTimeout(function () {

								// Remove all openClass-classes from the
								// menu except the element to open and it's parents
								$list.find('.' + options.openClass).not($self).not($self.parentsUntil($this, '.' + options.openClass)).trigger(jse.libs.template.events.TRANSITION_STOP(), []).removeClass(options.openClass);

								$list.find('.leave').trigger(jse.libs.template.events.TRANSITION_STOP(), []).removeClass('leave');

								// Open the submenu
								transition.open = true;

								// Set and unset the "onEnter" to prevent
								// closing the menu immediately after opening if
								// the cursor is at an place over the opening menu
								// (this can happen if other components trigger the
								// open event)
								$self.off(jse.libs.template.events.TRANSITION_FINISHED()).one(jse.libs.template.events.TRANSITION_FINISHED(), function () {
									onEnter = false;
								}).trigger(jse.libs.template.events.TRANSITION(), transition).trigger(jse.libs.template.events.OPEN_FLYOUT(), [$this]);

								_repositionOpenLayer();
							}, typeof delay === 'number' ? delay : options.enterDelay);
						}

						break;
					case 'leave':
						onEnter = false;
						// Set a timer for closing if the submenu (delayed closing)
						_clearTimeouts();
						$self.addClass('leave');
						leaveTimer = setTimeout(function () {
							// Remove all openClass-classes from the
							// menu except the elements parents
							transition.open = false;
							$list.find('.' + options.openClass).not($self.parentsUntil($this, '.' + options.openClass)).off(jse.libs.template.events.TRANSITION_FINISHED()).one(jse.libs.template.events.TRANSITION_FINISHED(), function () {
								_setEventTypeClass($self, '');
								$self.removeClass('leave');
							}).trigger(jse.libs.template.events.TRANSITION(), transition);
						}, typeof delay === 'number' ? delay : options.leaveDelay);
						break;
					default:
						break;
				}
			}
		}
	};

	/**
  * Event handler for the click / mouseenter / mouseleave event
  * on the navigation li elements. It checks if the event type
  * is supported for the current view type and calls the
  * openMenu-function if so.
  * @param       {object}    e           jQuery event object
  * @private
  */
	var _mouseHandler = function _mouseHandler(e) {
		var $self = $(this),
		    viewport = mode.id <= options.breakpoint ? 'mobile' : 'desktop',
		    events = options.events && options.events[viewport] ? options.events[viewport] : [];

		_setEventTypeClass($self, 'mouse');
		if ($.inArray(e.data.event, events) > -1) {
			_openMenu.call($self, e, viewport, e.data.delay);
		}

		// Perform navigation for custom links and category links on touch devices if no subcategories are found.
		if (($self.hasClass('custom') || isTouchDevice && $self.children('ul').length == 0) && e.data.event === 'click' && !$self.find('form').length) {
			e.preventDefault();
			e.stopPropagation();

			if ($self.find('a').attr('target') === '_blank') {
				window.open($self.find('a').attr('href'));
			} else {
				location.href = $self.find('a').attr('href');
			}
		}
	};

	/**
  * Event handler for the touchstart event (or "pointerdown"
  * depending on the browser). It removes the other critical
  * event handler (that would open the menu) from the list
  * element if the the mouseenter was executed before and
  * a click or touch event will be performed afterwards. This
  * is needed to prevent the browser engine workarounds which
  * will automatically perform mouse / click-events on touch
  * also.
  * @private
  */
	var _touchHandler = function _touchHandler(e) {
		e.stopPropagation();

		var $self = $(this),
		    viewport = mode.id <= options.breakpoint ? 'mobile' : 'desktop',
		    events = options.events && options.events[viewport] ? options.events[viewport] : [];

		$list.find('.enter-category').show();
		$list.find('.dropdown > a').on('click', function (e) {
			e.preventDefault();
		});

		if (e.data.type === 'start') {
			toucheStartEvent = { event: e, timestamp: new Date().getTime(), top: $window.scrollTop() };
			$list.off('mouseenter.menu mouseleave.menu');
		} else if ($.inArray('touch', events) > -1 && !_touchMoveDetect(e)) {
			_setEventTypeClass($self, 'touch');

			if ($.inArray('hover', events) === -1 || touchEvents.start !== 'pointerdown') {
				_openMenu.call($self, e, viewport);
			}

			$list.on('mouseleave', function () {
				$list.on('mouseenter.menu', 'li', { event: 'hover' }, _mouseHandler).on('mouseleave.menu', 'li', { event: 'hover', action: 'leave' }, _mouseHandler);
			});
		}
	};

	/**
  * Stores the last touch position on touchmove
  * @param       e       jQuery event object
  * @private
  */
	var _touchMoveHandler = function _touchMoveHandler(e) {
		toucheEndEvent = { event: e, timestamp: new Date().getTime(), top: $window.scrollTop() };
	};

	/**
  * Event handler for closing the menu if
  * the user interacts with the page
  * outside of the menu
  * @param       {object}    e       jQuery event object
  * @param       {object}    d       jQuery selection of the event emitter
  * @private
  */
	var _closeFlyout = function _closeFlyout(e, d) {
		if (d !== $this && $this.find($(e.target)).length === 0) {
			// Remove open and close timer
			_clearTimeouts();

			// Remove all state-classes from the menu
			if (options.menuType === 'horizontal') {
				$list.find('.touch, .mouse, .leave, .' + options.openClass).removeClass('touch mouse leave ' + options.openClass);
			}
		}
	};

	var _onClickAccordion = function _onClickAccordion(e) {
		e.preventDefault();
		e.stopPropagation();

		if ($(this).parents('.navbar-topbar-item').length > 0) {
			return;
		}

		if ($(this).hasClass('dropdown')) {
			if ($(this).hasClass(options.openClass)) {
				$(this).removeClass(options.openClass).find('.' + options.openClass).removeClass(options.openClass);
			} else {
				$(this).addClass(options.openClass).parentsUntil($this, 'li').addClass(options.openClass);
			}
		} else {
			location.href = $(this).find('a').attr('href');
		}
	};

	var _bindHorizontalEventHandlers = function _bindHorizontalEventHandlers() {
		$list.on(touchEvents.start + '.menu', 'li', { type: 'start' }, _touchHandler).on(touchEvents.move + '.menu', 'li', { type: 'start' }, _touchMoveHandler).on(touchEvents.end + '.menu', 'li', { type: 'end' }, _touchHandler).on('click.menu', 'li', { event: 'click', 'delay': 0 }, _mouseHandler).on('mouseenter.menu', 'li', { event: 'hover', action: 'enter' }, _mouseHandler).on('mouseleave.menu', 'li', { event: 'hover', action: 'leave' }, _mouseHandler);

		$body.on(jse.libs.template.events.MENU_REPOSITIONED(), _updateCategoryMenu);
	};

	var _unbindHorizontalEventHandlers = function _unbindHorizontalEventHandlers() {
		$list.off(touchEvents.start + '.menu', 'li').off(touchEvents.move + '.menu', 'li').off(touchEvents.end + '.menu', 'li').off('click.menu', 'li').off('mouseenter.menu', 'li').off('mouseleave.menu', 'li');
	};

	// ########## INITIALIZATION ##########

	/**
  * Init function of the widget
  * @constructor
  */
	module.init = function (done) {
		// @todo Getting the "touchEvents" config value produces problems in tablet devices.
		touchEvents = jse.core.config.get('touch');
		transition.classOpen = options.openClass;

		_getSelections();
		_resetInitialCss();

		$body.on(jse.libs.template.events.BREAKPOINT(), _breakpointHandler).on(jse.libs.template.events.OPEN_FLYOUT() + ' click ' + touchEvents.end, _closeFlyout);

		$('.close-menu-container').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();
		});

		$('.close-flyout').on('click', _closeMenu);

		if (options.menuType === 'horizontal') {
			_bindHorizontalEventHandlers();
		}

		if (options.menuType === 'vertical') {
			if (options.accordion === true) {
				$this.on('click', 'li', _onClickAccordion);
			}

			// if there is no top header we must create dummy html because other modules will not work correctly
			if ($('#categories').length === 0) {
				var html = '<div id="categories"><div class="navbar-collapse collapse">' + '<nav class="navbar-default navbar-categories hidden"></nav></div></div>';
				$('#header').append(html);
			}
		}

		_breakpointHandler();

		/**
   * Stop the propagation of the events inside this container
   * (Workaround for the "more"-dropdown)
   */
		$this.find('.' + options.ignoreClass).on('mouseleave.menu mouseenter.menu click.menu ' + touchEvents.start + ' ' + touchEvents.end, 'li', function (e) {
			e.stopPropagation();
		});

		if (options.openActive) {
			var $active = $this.find('.active');
			$active.parentsUntil($this, 'li').addClass('open');
		}

		$('li.custom-entries a').on('click', function (e) {
			e.stopPropagation();
		});

		var viewport = mode.id <= options.breakpoint ? 'mobile' : 'desktop';

		if (viewport == 'mobile') {
			$('.level-1').css('padding-bottom', '200px'); // This padding corrects expand/collapse behavior of lower menu items in various mobile browsers. 
		}

		done();
	};

	// Return data to widget engine
	return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvbWVudS5qcyJdLCJuYW1lcyI6WyJnYW1iaW8iLCJ3aWRnZXRzIiwibW9kdWxlIiwic291cmNlIiwiZGF0YSIsIiR0aGlzIiwiJCIsIiR3aW5kb3ciLCJ3aW5kb3ciLCIkYm9keSIsIiRsaXN0IiwiJGVudHJpZXMiLCIkbW9yZSIsIiRtb3JlRW50cmllcyIsIiRtZW51RW50cmllcyIsIiRjdXN0b20iLCIkY2F0ZWdvcmllcyIsInRvdWNoRXZlbnRzIiwiY3VycmVudFdpZHRoIiwibW9kZSIsIm1vYmlsZSIsImVudGVyVGltZXIiLCJsZWF2ZVRpbWVyIiwiaW5pdGlhbGl6ZWRQb3MiLCJvbkVudGVyIiwidG91Y2hlU3RhcnRFdmVudCIsInRvdWNoZUVuZEV2ZW50IiwidHJhbnNpdGlvbiIsImlzVG91Y2hEZXZpY2UiLCJNb2Rlcm5penIiLCJ0b3VjaGV2ZW50cyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInNlYXJjaCIsImRlZmF1bHRzIiwibWVudVR5cGUiLCJ1bmZvbGRMZXZlbCIsImFjY29yZGlvbiIsInNob3dBbGxMaW5rIiwiYnJlYWtwb2ludCIsImVudGVyRGVsYXkiLCJsZWF2ZURlbGF5Iiwid2lkdGhUb2xlcmFuY2UiLCJvcGVuQ2xhc3MiLCJzd2l0Y2hFbGVtZW50UG9zaXRpb24iLCJpZ25vcmVDbGFzcyIsInRvdWNoTW92ZVRvbGVyYW5jZSIsIm9wZW5BY3RpdmUiLCJldmVudHMiLCJkZXNrdG9wIiwib3B0aW9ucyIsImV4dGVuZCIsIl90b3VjaE1vdmVEZXRlY3QiLCJkaWZmIiwiTWF0aCIsImFicyIsImV2ZW50Iiwib3JpZ2luYWxFdmVudCIsInBhZ2VZIiwiX2dldFNlbGVjdGlvbnMiLCJjaGlsZHJlbiIsIm5vdCIsImZpbHRlciIsIl9zZXRJdGVtIiwiJGl0ZW0iLCIkdGFyZ2V0IiwicG9zaXRpb25JZCIsImRvbmUiLCJlYWNoIiwiJHNlbGYiLCJwb3NpdGlvbiIsImJlZm9yZSIsImRldGFjaCIsImFwcGVuZCIsIl9hZGRFbGVtZW50IiwiX3Nob3dFbGVtZW50cyIsIiRlbGVtZW50cyIsIndpZHRoIiwiaGlkZSIsIl9yZW1vdmVFbGVtZW50IiwiX2hpZGVFbGVtZW50cyIsImFkZCIsImZpbmQiLCJyZW1vdmVDbGFzcyIsImlzIiwic2hvdyIsImdldCIsInJldmVyc2UiLCJfaW5pdEVsZW1lbnRTaXplc0FuZFBvc2l0aW9uIiwiaSIsIm91dGVyV2lkdGgiLCJfY2xvc2VNZW51IiwicGFyZW50cyIsImxlbmd0aCIsIl9jbGVhclRpbWVvdXRzIiwiY2xlYXJUaW1lb3V0IiwiX3Jlc2V0SW5pdGlhbENzcyIsImNzcyIsIl9yZXBvc2l0aW9uT3BlbkxheWVyIiwibGlzdFdpZHRoIiwiJG9wZW5MYXllciIsIiRwYXJlbnQiLCJwYXJlbnQiLCJwYXJlbnRQb3NpdGlvbiIsImxlZnQiLCJwYXJlbnRXaWR0aCIsImFkZENsYXNzIiwiX3VwZGF0ZUNhdGVnb3J5TWVudSIsImUiLCJldmVudE5hbWUiLCJjb250YWluZXJXaWR0aCIsImlubmVyV2lkdGgiLCJfc3dpdGNoVG9Nb2JpbGVWaWV3Iiwib3BhY2l0eSIsImhlaWdodCIsImFwcGVuZFRvIiwiX2JpbmRIb3Jpem9udGFsRXZlbnRIYW5kbGVycyIsInRyaWdnZXIiLCJqc2UiLCJsaWJzIiwidGVtcGxhdGUiLCJNRU5VX1JFUE9TSVRJT05FRCIsIl9zd2l0Y2hUb0Rlc2t0b3BWaWV3IiwiJHRvcG1lbnVDb250ZW50RWxlbWVudHMiLCJfdW5iaW5kSG9yaXpvbnRhbEV2ZW50SGFuZGxlcnMiLCJjbGljayIsInByZXZlbnREZWZhdWx0IiwiX3NldEV2ZW50VHlwZUNsYXNzIiwiY2xhc3NOYW1lIiwiX2JyZWFrcG9pbnRIYW5kbGVyIiwib2xkTW9kZSIsIm5ld01vZGUiLCJyZXNwb25zaXZlIiwiaWQiLCJzd2l0Y2hUb01vYmlsZSIsInVuZGVmaW5lZCIsInN3aXRjaFRvRGVza3RvcCIsIl9vcGVuTWVudSIsInR5cGUiLCJkZWxheSIsIiRzdWJtZW51IiwibGV2ZWwiLCJ2YWxpZFN1Ym1lbnUiLCJwYXJzZUludCIsInN0b3BQcm9wYWdhdGlvbiIsInRvZ2dsZUNsYXNzIiwidmlzaWJsZSIsImhhc0NsYXNzIiwibGVhdmUiLCJhY3Rpb24iLCJpbnRlcmFjdGlvbiIsImlzTW91c2VEb3duIiwic2V0VGltZW91dCIsInBhcmVudHNVbnRpbCIsIlRSQU5TSVRJT05fU1RPUCIsIm9wZW4iLCJvZmYiLCJUUkFOU0lUSU9OX0ZJTklTSEVEIiwib25lIiwiVFJBTlNJVElPTiIsIk9QRU5fRkxZT1VUIiwiX21vdXNlSGFuZGxlciIsInZpZXdwb3J0IiwiaW5BcnJheSIsImNhbGwiLCJhdHRyIiwibG9jYXRpb24iLCJocmVmIiwiX3RvdWNoSGFuZGxlciIsIm9uIiwidGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJ0b3AiLCJzY3JvbGxUb3AiLCJzdGFydCIsIl90b3VjaE1vdmVIYW5kbGVyIiwiX2Nsb3NlRmx5b3V0IiwiZCIsInRhcmdldCIsIl9vbkNsaWNrQWNjb3JkaW9uIiwibW92ZSIsImVuZCIsImluaXQiLCJjb3JlIiwiY29uZmlnIiwiY2xhc3NPcGVuIiwiQlJFQUtQT0lOVCIsImh0bWwiLCIkYWN0aXZlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7O0FBUUFBLE9BQU9DLE9BQVAsQ0FBZUMsTUFBZixDQUNDLE1BREQsRUFHQyxDQUNDRixPQUFPRyxNQUFQLEdBQWdCLGNBRGpCLEVBRUNILE9BQU9HLE1BQVAsR0FBZ0Isa0JBRmpCLEVBR0NILE9BQU9HLE1BQVAsR0FBZ0IsbUJBSGpCLENBSEQsRUFTQyxVQUFTQyxJQUFULEVBQWU7O0FBRWQ7O0FBRUY7O0FBRUUsS0FBSUMsUUFBUUMsRUFBRSxJQUFGLENBQVo7QUFBQSxLQUNDQyxVQUFVRCxFQUFFRSxNQUFGLENBRFg7QUFBQSxLQUVDQyxRQUFRSCxFQUFFLE1BQUYsQ0FGVDtBQUFBLEtBR0NJLFFBQVEsSUFIVDtBQUFBLEtBSUNDLFdBQVcsSUFKWjtBQUFBLEtBS0NDLFFBQVEsSUFMVDtBQUFBLEtBTUND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QVQsRUFBWTtBQUNyQ0EsS0FBRW9DLGVBQUY7QUFDQSxHQUxGOztBQU9BLE1BQUk5RixRQUFRSCxVQUFaLEVBQXdCO0FBQ3ZCLE9BQUk4SSxVQUFVeEwsTUFBTTZFLElBQU4sQ0FBVyxTQUFYLENBQWQ7QUFDQTJHLFdBQ0VwQyxZQURGLENBQ2VwSixLQURmLEVBQ3NCLElBRHRCLEVBRUVxRyxRQUZGLENBRVcsTUFGWDtBQUdBOztBQUVEcEcsSUFBRSxxQkFBRixFQUF5Qm1LLEVBQXpCLENBQTRCLE9BQTVCLEVBQXFDLFVBQVM3RCxDQUFULEVBQVk7QUFDaERBLEtBQUVvQyxlQUFGO0FBQ0EsR0FGRDs7QUFJQSxNQUFJa0IsV0FBVy9JLEtBQUtrSCxFQUFMLElBQVduRixRQUFRWCxVQUFuQixHQUFnQyxRQUFoQyxHQUEyQyxTQUExRDs7QUFFQSxNQUFJMkgsWUFBWSxRQUFoQixFQUEwQjtBQUN6QjVKLEtBQUUsVUFBRixFQUFjMkYsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0MsT0FBcEMsRUFEeUIsQ0FDcUI7QUFDOUM7O0FBRUQ5QjtBQUNBLEVBbkVEOztBQXFFQTtBQUNBLFFBQU9qRSxNQUFQO0FBQ0EsQ0FuNkJGIiwiZmlsZSI6IndpZGdldHMvbWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gbWVudS5qcyAyMDE4LTAyLTAxXG4gR2FtYmlvIEdtYkhcbiBodHRwOi8vd3d3LmdhbWJpby5kZVxuIENvcHlyaWdodCAoYykgMjAxOCBHYW1iaW8gR21iSFxuIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuIFtodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiBUaGlzIHdpZGdldCBoYW5kbGVzIHRoZSBob3Jpem9udGFsIG1lbnUvZHJvcGRvd24gZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiBJdCdzIHVzZWQgZm9yIHRoZSB0b3AgY2F0ZWdvcnkgbmF2aWdhdGlvbiwgdGhlIGNhcnQgZHJvcGRvd24gb3IgdGhlIHRvcCBtZW51IChmb3IgZXhhbXBsZSkuIEl0IGlzXG4gKiBhYmxlIHRvIHJlLW9yZGVyIHRoZSBtZW51IGVudHJpZXMgdG8gYSBzcGVjaWFsIFwiTW9yZVwiIHN1Ym1lbnUgdG8gc2F2ZSBzcGFjZSBpZiB0aGUgZW50cmllcyBkb24ndFxuICogZml0IGluIHRoZSBjdXJyZW50IHZpZXcuIEl0J3MgYWxzbyBhYmxlIHRvIHdvcmsgd2l0aCBkaWZmZXJlbnQgZXZlbnQgdHlwZXMgZm9yIG9wZW5pbmcvY2xvc2luZyBtZW51XG4gKiBpdGVtcyBpbiB0aGUgZGlmZmVyZW50IHZpZXcgdHlwZXMuXG4gKi9cbmdhbWJpby53aWRnZXRzLm1vZHVsZShcblx0J21lbnUnLFxuXG5cdFtcblx0XHRnYW1iaW8uc291cmNlICsgJy9saWJzL2V2ZW50cycsXG5cdFx0Z2FtYmlvLnNvdXJjZSArICcvbGlicy9yZXNwb25zaXZlJyxcblx0XHRnYW1iaW8uc291cmNlICsgJy9saWJzL2ludGVyYWN0aW9uJ1xuXHRdLFxuXG5cdGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdCd1c2Ugc3RyaWN0JztcblxuLy8gIyMjIyMjIyMjIyBWQVJJQUJMRSBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cblx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0JHdpbmRvdyA9ICQod2luZG93KSxcblx0XHRcdCRib2R5ID0gJCgnYm9keScpLFxuXHRcdFx0JGxpc3QgPSBudWxsLFxuXHRcdFx0JGVudHJpZXMgPSBudWxsLFxuXHRcdFx0JG1vcmUgPSBudWxsLFxuXHRcdFx0JG1vcmVFbnRyaWVzID0gbnVsbCxcblx0XHRcdCRtZW51RW50cmllcyA9IG51bGwsXG5cdFx0XHQkY3VzdG9tID0gbnVsbCxcblx0XHRcdCRjYXRlZ29yaWVzID0gbnVsbCxcblx0XHRcdHRvdWNoRXZlbnRzID0gbnVsbCxcblx0XHRcdGN1cnJlbnRXaWR0aCA9IG51bGwsXG5cdFx0XHRtb2RlID0gbnVsbCxcblx0XHRcdG1vYmlsZSA9IGZhbHNlLFxuXHRcdFx0ZW50ZXJUaW1lciA9IG51bGwsXG5cdFx0XHRsZWF2ZVRpbWVyID0gbnVsbCxcblx0XHRcdGluaXRpYWxpemVkUG9zID0gZmFsc2UsXG5cdFx0XHRvbkVudGVyID0gZmFsc2UsXG5cdFx0XHR0b3VjaGVTdGFydEV2ZW50ID0gbnVsbCxcblx0XHRcdHRvdWNoZUVuZEV2ZW50ID0gbnVsbCxcblx0XHRcdHRyYW5zaXRpb24gPSB7fSxcblx0XHRcdGlzVG91Y2hEZXZpY2UgPSBNb2Rlcm5penIudG91Y2hldmVudHMgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5zZWFyY2goL1RvdWNoL2kpICE9PSAtMSxcblx0XHRcdGRlZmF1bHRzID0ge1xuXHRcdFx0XHQvLyBUaGUgbWVudSB0eXBlIG11c3QgYmUgZWl0aGVyICdob3Jpem9udGFsJyBvciAndmVydGljYWwnXG5cdFx0XHRcdG1lbnVUeXBlOiAnaG9yaXpvbnRhbCcsXG5cblx0XHRcdFx0Ly8gVmVydGljYWwgbWVudSBvcHRpb25zLlxuXHRcdFx0XHR1bmZvbGRMZXZlbDogMCxcblx0XHRcdFx0YWNjb3JkaW9uOiBmYWxzZSxcblx0XHRcdFx0c2hvd0FsbExpbms6IGZhbHNlLFxuXG5cdFx0XHRcdC8vIE1pbmltdW0gYnJlYWtwb2ludCB0byBzd2l0Y2ggdG8gbW9iaWxlIHZpZXdcblx0XHRcdFx0YnJlYWtwb2ludDogNDAsXG5cdFx0XHRcdC8vIERlbGF5IGluIG1zIGFmdGVyIGEgbW91c2VlbnRlciB0aGUgZWxlbWVudCBnZXRzIHNob3duXG5cdFx0XHRcdGVudGVyRGVsYXk6IDAsXG5cdFx0XHRcdC8vIERlbGF5IGluIG1zIGFmdGVyIGEgbW91c2VsZWF2ZSBhbiBlbGVtZW50IGdldHMgaGlkZGVuXG5cdFx0XHRcdGxlYXZlRGVsYXk6IDUwLFxuXHRcdFx0XHQvLyBUb2xlcmFuY2UgaW4gcHggd2hpY2ggZ2V0cyBzdWJzdHJhY3RlZCBmcm9tIHRoZSBuYXYtd2lkdGggdG8gcHJldmVudCBmbGlja2VyaW5nXG5cdFx0XHRcdHdpZHRoVG9sZXJhbmNlOiAxMCxcblx0XHRcdFx0Ly8gQ2xhc3MgdGhhdCBnZXRzIGFkZGVkIHRvIGFuIG9wZW5lZCBtZW51IGxpc3QgaXRlbVxuXHRcdFx0XHRvcGVuQ2xhc3M6ICdvcGVuJyxcblx0XHRcdFx0Ly8gSWYgdHJ1ZSwgZWxlbWVudHMgZ2V0IG1vdmVkIGZyb20vdG8gdGhlIG1vcmUgbWVudSBpZiB0aGVyZSBpc24ndCBlbm91Z2ggc3BhY2Vcblx0XHRcdFx0c3dpdGNoRWxlbWVudFBvc2l0aW9uOiB0cnVlLFxuXHRcdFx0XHQvLyBJZ25vcmUgbWVudSBmdW5jdGlvbmFsaXR5IG9uIGVsZW1lbnRzIGluc2lkZSB0aGlzIHNlbGVjdGlvblxuXHRcdFx0XHRpZ25vcmVDbGFzczogJ2lnbm9yZS1tZW51Jyxcblx0XHRcdFx0Ly8gVG9sZXJhbmNlIGluIHB4IHdoaWNoIGlzIGFsbG93ZWQgZm9yIGEgXCJjbGlja1wiIGV2ZW50IG9uIHRvdWNoXG5cdFx0XHRcdHRvdWNoTW92ZVRvbGVyYW5jZTogMTAsXG5cdFx0XHRcdC8vIElmIHRydWUsIHRoZSBsaSB3aXRoIHRoZSBhY3RpdmUgY2xhc3MgZ2V0cyBvcGVuZWRcblx0XHRcdFx0b3BlbkFjdGl2ZTogZmFsc2UsXG5cdFx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHRcdC8vIEV2ZW50IHR5cGVzIHRoYXQgb3BlbiB0aGUgbWVudXMgaW4gZGVza3RvcCB2aWV3LlxuXHRcdFx0XHRcdC8vIFBvc3NpYmxlIHZhbHVlczogWydjbGljayddOyBbJ2hvdmVyJ107IFsndG91Y2gnLCAnaG92ZXInXTsgWydjbGljaycsICdob3ZlciddXG5cdFx0XHRcdFx0ZGVza3RvcDogWyd0b3VjaCcsICdob3ZlciddLFxuXHRcdFx0XHRcdC8vIEV2ZW50IHR5cGVzIHRoYXQgb3BlbiB0aGUgbWVudXMgaW4gbW9iaWxlIHZpZXcuXG5cdFx0XHRcdFx0Ly8gUG9zc2libGUgdmFsdWVzOiBbJ2NsaWNrJ107IFsnaG92ZXInXTsgWyd0b3VjaCcsICdob3ZlciddOyBbJ2NsaWNrJywgJ2hvdmVyJ107IFsndG91Y2gnLCAnY2xpY2snXVxuXHRcdFx0XHRcdG1vYmlsZTogWyd0b3VjaCcsICdjbGljayddXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBkYXRhKSxcblx0XHRcdG1vZHVsZSA9IHt9O1xuXG5cbi8vICMjIyMjIyMjIyMgSEVMUEVSIEZVTkNUSU9OUyAjIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSB0b2xlcmFuY2Vcblx0XHQgKiBiZXR3ZWVuIHRoZSB0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCBldmVudC5cblx0XHQgKiBJZiB0aGUgbWF4IHRvbGFyYW5jZSBpcyBleGNlZWRlZCByZXR1cm4gdHJ1ZVxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICAgICAgZSAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHJldHVybiAgICAge2Jvb2xlYW59ICAgICAgICAgICAgICAgSWYgdHJ1ZSBpdCBpcyBhIG1vdmUgZXZlbnRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfdG91Y2hNb3ZlRGV0ZWN0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR0b3VjaGVFbmRFdmVudCA9IHRvdWNoZUVuZEV2ZW50IHx8IHRvdWNoZVN0YXJ0RXZlbnQ7XG5cdFx0XHR2YXIgZGlmZiA9IE1hdGguYWJzKHRvdWNoZUVuZEV2ZW50LmV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVkgLSB0b3VjaGVTdGFydEV2ZW50LmV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVkpO1xuXHRcdFx0dG91Y2hlRW5kRXZlbnQgPSBudWxsO1xuXHRcdFx0cmV0dXJuIGRpZmYgPiBvcHRpb25zLnRvdWNoTW92ZVRvbGVyYW5jZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlcyB0aGUgalF1ZXJ5IHNlbGVjdGlvbiwgYmVjYXVzZSB0aGVcblx0XHQgKiBsaXN0IGVsZW1lbnRzIGNhbiBiZSBtb3ZlZFxuXHRcdCAqXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2dldFNlbGVjdGlvbnMgPSBmdW5jdGlvbigpIHtcblx0XHRcdCRsaXN0ID0gJHRoaXMuY2hpbGRyZW4oJ3VsJyk7XG5cdFx0XHQvLyBFeGNsdWRlIHRoZSBcIi5uYXZiYXItdG9wYmFyLWl0ZW1cIiBlbGVtZW50cyBiZWNhdXNlIHRoZXlcblx0XHRcdC8vIGFyZSBjbG9uZWQgdG8gdGhpcyBtZW51IGFuZCBhcmUgb25seSBzaG93biBpbiBtb2JpbGUgdmlld1xuXHRcdFx0JGVudHJpZXMgPSAkbGlzdC5jaGlsZHJlbigpLm5vdCgnLm5hdmJhci10b3BiYXItaXRlbScpO1xuXHRcdFx0JG1vcmUgPSAkZW50cmllcy5maWx0ZXIoJy5kcm9wZG93bi1tb3JlJyk7XG5cdFx0XHQkbW9yZUVudHJpZXMgPSAkbW9yZS5jaGlsZHJlbigndWwnKTtcblx0XHRcdCRjdXN0b20gPSAkZW50cmllcy5maWx0ZXIoJy5jdXN0b20nKTtcblx0XHRcdCRtZW51RW50cmllcyA9ICRlbnRyaWVzLm5vdCgkbW9yZSk7XG5cdFx0XHQkY2F0ZWdvcmllcyA9ICRtZW51RW50cmllcy5ub3QoJGN1c3RvbSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGRldGFjaGVzIGFuIGVsZW1lbnQgZnJvbSB0aGVcblx0XHQgKiBtZW51IGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgY29ycmVjdCBwb3NpdGlvbiBhdFxuXHRcdCAqIHRoZSB0YXJnZXRcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgJGl0ZW0gICAgICAgalF1ZXJ5IHNlbGVjdGlvbiBvZiB0aGUgaXRlbSB0aGF0IGdldHMgZGV0YWNoZWQgLyBhdHRhY2hlZFxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICAkdGFyZ2V0ICAgICBqUXVlcnkgc2VsZWN0aW9uIG9mIHRoZSB0YXJnZXQgY29udGFpbmVyXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3NldEl0ZW0gPSBmdW5jdGlvbigkaXRlbSwgJHRhcmdldCkge1xuXHRcdFx0dmFyIHBvc2l0aW9uSWQgPSAkaXRlbS5kYXRhKCdwb3NpdGlvbicpLFxuXHRcdFx0XHRkb25lID0gZmFsc2U7XG5cblx0XHRcdC8vIExvb2sgZm9yIHRoZSBmaXJzdCBpdGVtIHRoYXQgaGFzIGEgaGlnaGVyXG5cdFx0XHQvLyBwb3NpdGlvbklkIHRoYXQgdGhlIGl0ZW0gYW5kIGluc2VydCBpdFxuXHRcdFx0Ly8gYmVmb3JlIHRoZSBmb3VuZCBlbnRyeVxuXHRcdFx0JHRhcmdldFxuXHRcdFx0XHQuY2hpbGRyZW4oKVxuXHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdFx0cG9zaXRpb24gPSAkc2VsZi5kYXRhKCdwb3NpdGlvbicpO1xuXG5cdFx0XHRcdFx0aWYgKHBvc2l0aW9uID4gcG9zaXRpb25JZCkge1xuXHRcdFx0XHRcdFx0JHNlbGYuYmVmb3JlKCRpdGVtLmRldGFjaCgpKTtcblx0XHRcdFx0XHRcdGRvbmUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdC8vIEFwcGVuZCB0aGUgaXRlbSBpZiB0aGUgcG9zaXRpb25JZCBoYXNcblx0XHRcdC8vIGEgaGlnaGVyIHZhbHVlIGFzIHRoZSBsYXN0IGl0ZW0gaW50IHRoZVxuXHRcdFx0Ly8gdGFyZ2V0XG5cdFx0XHRpZiAoIWRvbmUpIHtcblx0XHRcdFx0JHRhcmdldC5hcHBlbmQoJGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hpY2ggZWxlbWVudHMgbmVlZHNcblx0XHQgKiB0byBiZSBhZGRlZCB0byB0aGUgbWVudS4gRXZlcnkgZWxlbWVudCB0aGF0IG5lZWRzXG5cdFx0ICogdG8gYmUgYWRkZWQgZ2V0cyBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uXG5cdFx0ICogXCJfc2V0SXRlbVwiXG5cdFx0ICogQHBhcmFtICAgICAgIHtpbnRlZ2VyfSAgICAgICBkaWZmICAgICAgICBBbW91bnQgb2YgcGl4ZWxzIHRoYXQgd2VyZSBmcmVlXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2FkZEVsZW1lbnQgPSBmdW5jdGlvbihkaWZmKSB7XG5cblx0XHRcdHZhciBkb25lID0gZmFsc2U7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCB0aGUgZWxlbWVudHNcblx0XHRcdCAqIGFuZCB0cmllcyB0byBhZGQgdGhlIGVsZW1lbnRzIHRvIHRoZSBtZW51IGlmXG5cdFx0XHQgKiBpdCB3b3VsZCBmaXQuXG5cdFx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgJGVsZW1lbnRzICAgICAgIGpRdWVyeSBzZWxlY3Rpb24gb2YgdGhlIGVudHJpZXMgaW5zaWRlIHRoZSBtb3JlLW1lbnVcblx0XHRcdCAqIEBwcml2YXRlXG5cdFx0XHQgKi9cblx0XHRcdHZhciBfc2hvd0VsZW1lbnRzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG5cdFx0XHRcdCRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHR3aWR0aCA9ICRzZWxmLmRhdGEoKS53aWR0aDtcblxuXHRcdFx0XHRcdGlmIChkaWZmID4gd2lkdGgpIHtcblx0XHRcdFx0XHRcdC8vIEFkZCB0aGUgaXRlbSB0byB0aGUgbWVudVxuXHRcdFx0XHRcdFx0X3NldEl0ZW0oJHNlbGYsICRsaXN0KTtcblx0XHRcdFx0XHRcdGRpZmYgLT0gd2lkdGg7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIFRoZSBuZXh0IGl0ZW0gd291bGRuJ3QgZml0IGFueW1vcmUnLFxuXHRcdFx0XHRcdFx0Ly8gcXVpdCB0aGUgbG9vcFxuXHRcdFx0XHRcdFx0ZG9uZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cblx0XHRcdC8vIFVwZGF0ZSB0aGUgc2VsZWN0aW9uIG9mIHRoZSB2aXNpYmxlIG1lbnUgaXRlbXMuXG5cdFx0XHRfZ2V0U2VsZWN0aW9ucygpO1xuXG5cdFx0XHQvLyBBZGQgdGhlIGNvbnRlbnQgbWFuYWdlciBlbnRyaWVzIHRvIHRoZSBtZW51IGZpcnN0LlxuXHRcdFx0Ly8gSWYgdGhlcmUgaXMgc3RpbGwgc3BhY2UsIGFkZCB0aGUgXCJub3JtYWxcIiBjYXRlZ29yeVxuXHRcdFx0Ly8gaXRlbXMgYWxzb1xuXHRcdFx0X3Nob3dFbGVtZW50cygkbW9yZUVudHJpZXMuY2hpbGRyZW4oJy5jdXN0b20nKSk7XG5cdFx0XHRpZiAoIWRvbmUpIHtcblx0XHRcdFx0X3Nob3dFbGVtZW50cygkbW9yZUVudHJpZXMuY2hpbGRyZW4oKSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENoZWNrIGlmIHRoZSBpdGVtcyBzdGlsbCBpbiB0aGUgbW9yZSBtZW51XG5cdFx0XHQvLyB3b3VsZCBmaXQgaW5zaWRlIHRoZSBtYWluIG1lbnUgaWYgdGhlIG1vcmVcblx0XHRcdC8vIG1lbnUgd291bGQgZ2V0IGhpZGRlblxuXHRcdFx0dmFyIHdpZHRoID0gMDtcblx0XHRcdCRtb3JlRW50cmllc1xuXHRcdFx0XHQuY2hpbGRyZW4oKVxuXHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR3aWR0aCArPSAkKHRoaXMpLmRhdGEoKS53aWR0aDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdGlmICh3aWR0aCA9PT0gMCkge1xuXHRcdFx0XHQkbW9yZS5oaWRlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKHdpZHRoIDwgKCRtb3JlLmRhdGEoKS53aWR0aCArIGRpZmYpKSB7XG5cdFx0XHRcdCRtb3JlLmhpZGUoKTtcblx0XHRcdFx0ZGlmZiArPSAkbW9yZS5kYXRhKCkud2lkdGg7XG5cdFx0XHRcdF9zaG93RWxlbWVudHMoJG1vcmVFbnRyaWVzLmNoaWxkcmVuKCkpO1xuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGljaCBlbGVtZW50cyBuZWVkc1xuXHRcdCAqIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgbWVudSwgc28gdGhhdCBpdCBmaXRzXG5cdFx0ICogaW5zaWRlIG9uZSBtZW51IGxpbmUuIEV2ZXJ5IGVsZW1lbnQgdGhhdCBuZWVkc1xuXHRcdCAqIHRvIGJlIHJlbW92ZWQgZ2V0cyBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uXG5cdFx0ICogXCJfc2V0SXRlbVwiXG5cdFx0ICogQHBhcmFtICAgICAgIHtpbnRlZ2VyfSAgICAgICBkaWZmICAgICAgICBBbW91bnQgb2YgcGl4ZWxzIHRoYXQgbmVlZHMgdG8gYmUgc2F2ZWRcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfcmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uKGRpZmYpIHtcblxuXHRcdFx0dmFyIGRvbmUgPSBmYWxzZTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY2hlY2tcblx0XHRcdCAqIGxvb3AgZm9yIGRldGVybWluaW5nIHdoaWNoIGVsZW1lbnRzXG5cdFx0XHQgKiBuZWVkcyB0byBiZSByZW1vdmVkXG5cdFx0XHQgKiBAcGFyYW0gICAgICAgICAgIHtvYmplY3R9ICAgICRlbGVtZW50cyAgICAgICBqUXVlcnkgc2VsZWN0aW9uIG9mIHRoZSBtZW51IGl0ZW1zXG5cdFx0XHQgKiBAcHJpdmF0ZVxuXHRcdFx0ICovXG5cdFx0XHR2YXIgX2hpZGVFbGVtZW50cyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuXHRcdFx0XHQkZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdFx0d2lkdGggPSAkc2VsZi5kYXRhKCkud2lkdGg7XG5cblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlIHBvc3NpYmx5IHNldCBvcGVuIHN0YXRlXG5cdFx0XHRcdFx0JHNlbGZcblx0XHRcdFx0XHRcdC5maWx0ZXIoJy4nICsgb3B0aW9ucy5vcGVuQ2xhc3MpXG5cdFx0XHRcdFx0XHQuYWRkKCRzZWxmLmZpbmQoJy4nICsgb3B0aW9ucy5vcGVuQ2xhc3MpKVxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKG9wdGlvbnMub3BlbkNsYXNzKTtcblxuXHRcdFx0XHRcdC8vIEFkZCB0aGUgZW50cnkgdG8gdGhlIG1vcmUtbWVudVxuXHRcdFx0XHRcdF9zZXRJdGVtKCRzZWxmLCAkbW9yZUVudHJpZXMpO1xuXG5cdFx0XHRcdFx0ZGlmZiAtPSB3aWR0aDtcblxuXHRcdFx0XHRcdGlmIChkaWZmIDwgMCkge1xuXHRcdFx0XHRcdFx0Ly8gRW5vdWdoIGVsZW1lbnRzIGFyZSByZW1vdmVkLFxuXHRcdFx0XHRcdFx0Ly8gcXVpdCB0aGUgbG9vcFxuXHRcdFx0XHRcdFx0ZG9uZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cblx0XHRcdC8vIFVwZGF0ZSB0aGUgc2VsZWN0aW9uIG9mIHRoZSB2aXNpYmxlIG1lbnUgaXRlbXNcblx0XHRcdF9nZXRTZWxlY3Rpb25zKCk7XG5cblx0XHRcdC8vIEFkZCB0aGUgd2lkdGggb2YgdGhlIG1vcmUgZW50cnkgaWYgaXQncyBub3Rcblx0XHRcdC8vIHZpc2libGUsIGJlY2F1c2UgaXQgd2lsbCBnZXQgc2hvd24gZHVyaW5nIHRoaXNcblx0XHRcdC8vIGZ1bmN0aW9uIGNhbGxcblx0XHRcdGlmICgkbW9yZS5pcygnOmhpZGRlbicpKSB7XG5cdFx0XHRcdGRpZmYgKz0gJG1vcmUuZGF0YSgpLndpZHRoO1xuXHRcdFx0XHQkbW9yZS5yZW1vdmVDbGFzcygnc3R5bGUnKTtcblx0XHRcdFx0JG1vcmUuc2hvdygpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGaXJzdCByZW1vdmUgXCJub3JtYWxcIiBjYXRlZ29yeSBlbnRyaWVzLiBJZiB0aGF0XG5cdFx0XHQvLyBpc24ndCBlbm91Z2ggcmVtb3ZlIHRoZSBjb250ZW50IG1hbmFnZXIgZW50cmllcyBhbHNvXG5cdFx0XHRfaGlkZUVsZW1lbnRzKCQoJGNhdGVnb3JpZXMuZ2V0KCkucmV2ZXJzZSgpKSk7XG5cdFx0XHRpZiAoIWRvbmUpIHtcblx0XHRcdFx0X2hpZGVFbGVtZW50cygkKCRjdXN0b20uZ2V0KCkucmV2ZXJzZSgpKSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFNldHMgYSBkYXRhIGF0dHJpYnV0ZSB0byB0aGUgbWVudSBpdGVtc1xuXHRcdCAqIHRoYXQgY29udGFpbnMgdGhlIHdpZHRoIG9mIHRoZSBlbGVtZW50cy5cblx0XHQgKiBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIGlmIGl0IGlzIGRpc3BsYXlcblx0XHQgKiBub25lIHRoZSBkZXRlY3RlZCB3aXRoIHdpbGwgYmUgemVyby4gSXRcblx0XHQgKiBzZXRzIHBvc2l0aW9uIGlkIGFsc28uXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2luaXRFbGVtZW50U2l6ZXNBbmRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0JGVudHJpZXMuZWFjaChmdW5jdGlvbihpKSB7XG5cdFx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdFx0d2lkdGggPSAkc2VsZi5vdXRlcldpZHRoKCk7XG5cblx0XHRcdFx0JHNlbGYuZGF0YSh7d2lkdGg6IHdpZHRoLCBwb3NpdGlvbjogaX0pO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0byBjbG9zZSBhbGwgbWVudSBlbnRyaWVzLlxuXHRcdCAqIE5lZWRlZCBmb3IgdGhlIGRlc2t0b3AgPC0+IG1vYmlsZSB2aWV3XG5cdFx0ICogY2hhbmdlLCBtb3N0bHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2Nsb3NlTWVudSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0JHRoaXMuZmluZCgnbGkuJyArIG9wdGlvbnMub3BlbkNsYXNzKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoJCh0aGlzKS5wYXJlbnRzKCcubmF2YmFyLWNhdGVnb3JpZXMtbGVmdCcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKG9wdGlvbnMub3BlbkNsYXNzKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBIZWxwZXIgZnVuY3Rpb24gdG8gY2xlYXIgYWxsIHBlbmRpbmdcblx0XHQgKiBmdW5jdGlvbnNcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfY2xlYXJUaW1lb3V0cyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0ZW50ZXJUaW1lciA9IGVudGVyVGltZXIgPyBjbGVhclRpbWVvdXQoZW50ZXJUaW1lcikgOiBudWxsO1xuXHRcdFx0bGVhdmVUaW1lciA9IGxlYXZlVGltZXIgPyBjbGVhclRpbWVvdXQobGVhdmVUaW1lcikgOiBudWxsO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBIZWxwZXIgZnVuY3Rpb24gdG8gcmVzZXQgdGhlIGNzcyBvZiB0aGUgbWVudS5cblx0XHQgKiBUaGlzIGlzIG5lZWRlZCB0byByZW1vdmUgdGhlIG92ZXJmbG93ICYgaGVpZ2h0XG5cdFx0ICogc2V0dGluZ3Mgb2YgdGhlIG1lbnUgb2YgdGhlIGNzcyBmaWxlLiBUaGVcblx0XHQgKiBkaXJlY3RpdmVzIHdlcmUgc2V0IHRvIHByZXZlbnQgZmxpY2tlcmluZyBvbiBwYWdlXG5cdFx0ICogbG9hZFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9yZXNldEluaXRpYWxDc3MgPSBmdW5jdGlvbigpIHtcblx0XHRcdCR0aGlzLmNzcyh7XG5cdFx0XHRcdCAgICAgICAgICAnb3ZlcmZsb3cnOiAndmlzaWJsZScsXG5cdFx0XHRcdCAgICAgICAgICAnaGVpZ2h0JzogJ2F1dG8nXG5cdFx0XHQgICAgICAgICAgfSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgcG9zaXRpb25pbmcgY2xhc3Nlc1xuXHRcdCAqIHRvIHRoZSBvcGVuZCBmbHlvdXQuIFRoaXMgaXMgbmVlZGVkIHRvIGtlZXBcblx0XHQgKiB0aGUgZmx5b3V0IGluc2lkZSB0aGUgYm91bmRhcmllcyBvZiB0aGUgbmF2aWdhdGlvblxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9yZXBvc2l0aW9uT3BlbkxheWVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbGlzdFdpZHRoID0gJGxpc3Qud2lkdGgoKSxcblx0XHRcdFx0JG9wZW5MYXllciA9ICRlbnRyaWVzXG5cdFx0XHRcdFx0LmZpbHRlcignLicgKyBvcHRpb25zLm9wZW5DbGFzcylcblx0XHRcdFx0XHQuY2hpbGRyZW4oJ3VsJyk7XG5cblx0XHRcdCRvcGVuTGF5ZXIuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdFx0XHQkcGFyZW50ID0gJHNlbGYucGFyZW50KCk7XG5cblx0XHRcdFx0Ly8gUmVzZXQgdGhlIGNsYXNzZXMgdG8gcHJldmVudCB3cm9uZyBjYWxjdWxhdGlvbiBkdWUgdG8gc3BlY2lhbCBzdHlsZXNcblx0XHRcdFx0JHBhcmVudC5yZW1vdmVDbGFzcygnZmx5b3V0LXJpZ2h0IGZseW91dC1sZWZ0IGZseW91dC1jZW50ZXIgZmx5b3V0LXdvbnQtZml0Jyk7XG5cblx0XHRcdFx0dmFyIHdpZHRoID0gJHNlbGYub3V0ZXJXaWR0aCgpLFxuXHRcdFx0XHRcdHBhcmVudFBvc2l0aW9uID0gJHBhcmVudC5wb3NpdGlvbigpLmxlZnQsXG5cdFx0XHRcdFx0cGFyZW50V2lkdGggPSAkcGFyZW50Lm91dGVyV2lkdGgoKTtcblxuXHRcdFx0XHQvLyBDaGVjayB3aXRjaCBjbGFzcyBuZWVkcyB0byBiZSBzZXRcblx0XHRcdFx0aWYgKGxpc3RXaWR0aCA+IHBhcmVudFBvc2l0aW9uICsgd2lkdGgpIHtcblx0XHRcdFx0XHQkcGFyZW50LmFkZENsYXNzKCdmbHlvdXQtcmlnaHQnKTtcblx0XHRcdFx0fSBlbHNlIGlmIChwYXJlbnRQb3NpdGlvbiArIHBhcmVudFdpZHRoIC0gd2lkdGggPiAwKSB7XG5cdFx0XHRcdFx0JHBhcmVudC5hZGRDbGFzcygnZmx5b3V0LWxlZnQnKTtcblx0XHRcdFx0fSBlbHNlIGlmICh3aWR0aCA8IGxpc3RXaWR0aCkge1xuXHRcdFx0XHRcdCRwYXJlbnQuYWRkQ2xhc3MoJ2ZseW91dC1jZW50ZXInKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkcGFyZW50LmFkZENsYXNzKCdmbHlvdXQtd29udC1maXQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuXG5cdFx0ICogdGhlIHNpemUgb2YgdGhlIHZpc2libGUgZWxlbWVudHMgaW4gdGhlIG1lbnUgYW5kIHRoZVxuXHRcdCAqIGNvbnRhaW5lciBzaXplLiBJZiB0aGVyZSBpcyBzcGFjZSwgaXQgY2FsbHMgdGhlIGZ1bmN0aW9uXG5cdFx0ICogdG8gYWN0aXZhdGUgYW4gbWVudSBlbnRyeSBlbHNlIGl0IGNhbGxzIHRoZSBmdW5jdGlvbiB0b1xuXHRcdCAqIGRlYWN0aXZhdGUgYSBtZW51IGVudHJ5XG5cdFx0ICogQHBhcmFtICAgICAgIHtvYmplY3R9ICAgIGUgICAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHBhcmFtICAgICAgIHtzdHJpbmd9ICAgIGV2ZW50TmFtZSBFdmVudCBuYW1lIHBhcmFtZXRlciBvZiB0aGUgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3VwZGF0ZUNhdGVnb3J5TWVudSA9IGZ1bmN0aW9uKGUsIGV2ZW50TmFtZSkge1xuXHRcdFx0dmFyIGNvbnRhaW5lcldpZHRoID0gJHRoaXMuaW5uZXJXaWR0aCgpIC0gb3B0aW9ucy53aWR0aFRvbGVyYW5jZSxcblx0XHRcdFx0d2lkdGggPSAwO1xuXG5cdFx0XHQvLyBDaGVjayBpZiB0aGUgY29udGFpbmVyIHdpZHRoIGhhcyBjaGFuZ2VkIHNpbmNlIGxhc3QgY2FsbFxuXHRcdFx0aWYgKG9wdGlvbnMubWVudVR5cGUgPT09ICdob3Jpem9udGFsJyBcblx0XHRcdFx0JiYgKGN1cnJlbnRXaWR0aCAhPT0gY29udGFpbmVyV2lkdGggfHwgZXZlbnROYW1lID09PSAnc3dpdGNoZWRUb0Rlc2t0b3AnKSkge1xuXG5cdFx0XHRcdCRsaXN0XG5cdFx0XHRcdFx0LmNoaWxkcmVuKCc6dmlzaWJsZScpXG5cdFx0XHRcdFx0LmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR3aWR0aCArPSAkKHRoaXMpLmRhdGEoJ3dpZHRoJyk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gQWRkIG9yIHJlbW92ZSBlbGVtZW50cyBkZXBlbmRpbmcgb24gdGhlIHNpemUgb2YgdGhlXG5cdFx0XHRcdC8vIHZpc2libGUgZWxlbWVudHNcblx0XHRcdFx0aWYgKGNvbnRhaW5lcldpZHRoIDwgd2lkdGgpIHtcblx0XHRcdFx0XHRfcmVtb3ZlRWxlbWVudCh3aWR0aCAtIGNvbnRhaW5lcldpZHRoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRfYWRkRWxlbWVudChjb250YWluZXJXaWR0aCAtIHdpZHRoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9yZXBvc2l0aW9uT3BlbkxheWVyKCk7XG5cblx0XHRcdFx0Y3VycmVudFdpZHRoID0gY29udGFpbmVyV2lkdGg7XG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIHN3aXRjaCB0byB0aGUgbW9iaWxlXG5cdFx0ICogbW9kZSBvZiB0aGUgbWVudS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBfc3dpdGNoVG9Nb2JpbGVWaWV3ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBSZXNldCB0aGUgY3VycmVudCB3aWR0aCBzbyB0aGF0XG5cdFx0XHQvLyB0aGUgXCJfdXBkYXRlQ2F0ZWdvcnlNZW51XCIgd2lsbFxuXHRcdFx0Ly8gcGVyZm9ybSBjb3JyZWN0bHkgb24gdGhlIG5leHQgdmlld1xuXHRcdFx0Ly8gY2hhbmdlIHRvIGRlc2t0b3Bcblx0XHRcdGN1cnJlbnRXaWR0aCA9IC0xO1xuXHRcdFx0X2FkZEVsZW1lbnQoOTk5OTk5OTkpO1xuXHRcdFx0XG5cdFx0XHQkKCcubGV2ZWwtMScpLmNzcygncGFkZGluZy1ib3R0b20nLCAnMjAwcHgnKTsgLy8gVGhpcyBwYWRkaW5nIGNvcnJlY3RzIGV4cGFuZC9jb2xsYXBzZSBiZWhhdmlvciBvZiBsb3dlciBtZW51IGl0ZW1zIGluIHZhcmlvdXMgbW9iaWxlIGJyb3dzZXJzLiBcblx0XHRcdFxuXHRcdFx0Ly8gVXNlIHRoZSB2ZXJ0aWNhbCBtZW51IG9uIG1vYmlsZSB2aWV3LlxuXHRcdFx0aWYgKG9wdGlvbnMubWVudVR5cGUgPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0Ly8gZml4ZXMgZGlzcGxheSBob3Jpem9udGFsIG1lbnUgYWZ0ZXIgYSBzd2l0Y2ggdG8gbW9iaWxlIGFuZCBiYWNrIHRvIGRlc2t0b3AgaXMgcGVyZm9ybWVkXG5cdFx0XHRcdGlmICgkKCcjY2F0ZWdvcmllcyBuYXYubmF2YmFyLWRlZmF1bHQ6Zmlyc3QnKS5ub3QoJy5uYXYtY2F0ZWdvcmllcy1sZWZ0JykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdCQoJyNjYXRlZ29yaWVzIG5hdi5uYXZiYXItZGVmYXVsdDpmaXJzdCcpLmNzcyh7XG5cdFx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDBcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gbW92ZSB0b3BtZW51LWNvbnRlbnQgaXRlbXMgZnJvbSBob3Jpem9udGFsIG1lbnUgdG8gdmVydGljYWwgbWVudVxuXHRcdFx0XHQkdGhpc1xuXHRcdFx0XHRcdC5maW5kKCd1bC5sZXZlbC0xIGxpLm5hdmJhci10b3BiYXItaXRlbTpmaXJzdCcpXG5cdFx0XHRcdFx0LmJlZm9yZSgkKCcjY2F0ZWdvcmllcyBuYXYubmF2YmFyLWRlZmF1bHQgbGkudG9wbWVudS1jb250ZW50JykuZGV0YWNoKCkpO1xuXHRcdFx0XHRcblx0XHRcdFx0JHRoaXMuYXBwZW5kVG8oJyNjYXRlZ29yaWVzID4gLm5hdmJhci1jb2xsYXBzZScpO1xuXHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnbmF2YmFyLWRlZmF1bHQgbmF2YmFyLWNhdGVnb3JpZXMnKTtcblx0XHRcdFx0JHRoaXMuZmluZCgndWwubGV2ZWwtMScpLmFkZENsYXNzKCduYXZiYXItbmF2Jyk7XG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5uYXZiYXItdG9wYmFyLWl0ZW0nKS5ub3QoJy50b3BiYXItc2VhcmNoJykuc2hvdygpO1xuXHRcdFx0XHRcblx0XHRcdFx0X2JpbmRIb3Jpem9udGFsRXZlbnRIYW5kbGVycygpO1xuXHRcdFx0XHRcblx0XHRcdFx0JGJvZHkudHJpZ2dlcihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuTUVOVV9SRVBPU0lUSU9ORUQoKSwgWydzd2l0Y2hlZFRvTW9iaWxlJ10pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBIZWxwZXIgZnVuY3Rpb24gdG8gc3dpdGNoIHRvIHRoZSBkZXNrdG9wXG5cdFx0ICogbW9kZSBvZiB0aGUgbWVudS4gQWRkaXRpb25hbGx5LCBpbiBjYXNlIHRoYXRcblx0XHQgKiB0aGUgZGVza3RvcCBtb2RlIGlzIHNob3duIGZvciB0aGUgZmlyc3QgdGltZVxuXHRcdCAqIHNldCB0aGUgcG9zaXRpb24gYW5kIHdpZHRoIG9mIHRoZSBlbGVtZW50c1xuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9zd2l0Y2hUb0Rlc2t0b3BWaWV3ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcubGV2ZWwtMScpLmNzcygncGFkZGluZy1ib3R0b20nLCAnJyk7IC8vIFJlc2V0IGRpc3BsYXkgZml4IGZvciBtb2JpbGUgYnJvd3NlcnMuXG5cblx0XHRcdC8vIFJldmVydCBhbGwgdGhlIGNoYW5nZXMgbWFkZSBkdXJpbmcgdGhlIHN3aXRjaCB0byBtb2JpbGUuXG5cdFx0XHRpZiAob3B0aW9ucy5tZW51VHlwZSA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHQvLyBmaXhlcyBkaXNwbGF5IGhvcml6b250YWwgbWVudSBhZnRlciBhIHN3aXRjaCB0byBtb2JpbGUgYW5kIGJhY2sgdG8gZGVza3RvcCBpcyBwZXJmb3JtZWRcblx0XHRcdFx0aWYgKCQoJyNjYXRlZ29yaWVzIG5hdi5uYXZiYXItZGVmYXVsdDpmaXJzdCcpLm5vdCgnLm5hdi1jYXRlZ29yaWVzLWxlZnQnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0JCgnI2NhdGVnb3JpZXMgbmF2Lm5hdmJhci1kZWZhdWx0OmZpcnN0JykuY3NzKHtcblx0XHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuXHRcdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJ2F1dG8nXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKS5zaG93KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdC8vIG1vdmUgdG9wbWVudS1jb250ZW50IGl0ZW1zIGJhY2sgdG8gaG9yaXpvbnRhbCBtZW51XG5cdFx0XHRcdHZhciAkdG9wbWVudUNvbnRlbnRFbGVtZW50cyA9ICR0aGlzLmZpbmQoJ2xpLnRvcG1lbnUtY29udGVudCcpLmRldGFjaCgpO1xuXHRcdFx0XHQkKCcjY2F0ZWdvcmllcyBuYXYubmF2YmFyLWRlZmF1bHQgdWwubGV2ZWwtMTpmaXJzdCcpLmFwcGVuZCgkdG9wbWVudUNvbnRlbnRFbGVtZW50cyk7XG5cdFx0XHRcdFxuXHRcdFx0XHQkdGhpcy5hcHBlbmRUbygnLmJveC1jYXRlZ29yaWVzJyk7XG5cdFx0XHRcdCR0aGlzLnJlbW92ZUNsYXNzKCduYXZiYXItZGVmYXVsdCBuYXZiYXItY2F0ZWdvcmllcycpO1xuXHRcdFx0XHQkdGhpcy5maW5kKCd1bC5sZXZlbC0xJykucmVtb3ZlQ2xhc3MoJ25hdmJhci1uYXYnKTtcblx0XHRcdFx0JHRoaXMuZmluZCgnLm5hdmJhci10b3BiYXItaXRlbScpLmhpZGUoKTtcblx0XHRcdFx0X3VuYmluZEhvcml6b250YWxFdmVudEhhbmRsZXJzKCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQkYm9keS50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5NRU5VX1JFUE9TSVRJT05FRCgpLCBbJ3N3aXRjaGVkVG9EZXNrdG9wJ10pO1xuXHRcdFx0fVxuXG5cblx0XHRcdGlmICghaW5pdGlhbGl6ZWRQb3MpIHtcblx0XHRcdFx0X2luaXRFbGVtZW50U2l6ZXNBbmRQb3NpdGlvbigpO1xuXHRcdFx0XHRpbml0aWFsaXplZFBvcyA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLm1lbnVUeXBlID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRcdFx0X3VwZGF0ZUNhdGVnb3J5TWVudSgpO1xuXG5cdFx0XHRcdGlmIChpc1RvdWNoRGV2aWNlKSB7XG5cdFx0XHRcdFx0JGxpc3QuZmluZCgnLmVudGVyLWNhdGVnb3J5Jykuc2hvdygpO1xuXHRcdFx0XHRcdCRsaXN0LmZpbmQoJy5kcm9wZG93biA+IGEnKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCB0aGUgY2xhc3MgdG8gdGhlIGxpLWVsZW1lbnRcblx0XHQgKiBkZXBlbmRpbmcgb24gdGhlIG9wZW4gZXZlbnQuIFRoaXMgY2FuIGJlIGEgXCJ0b3VjaFwiXG5cdFx0ICogb3IgYSBcIm1vdXNlXCIgY2xhc3Ncblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgJHRhcmdldCAgICAgICAgIGpRdWVyeSBzZWxlY3Rpb24gb2YgdGhlIGxpLWVsZW1lbnRcblx0XHQgKiBAcGFyYW0gICAgICAge3N0cmluZ30gICAgY2xhc3NOYW1lICAgICAgIE5hbWUgb2YgdGhlIGNsYXNzIHRoYXQgZ2V0cyBhZGRlZFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9zZXRFdmVudFR5cGVDbGFzcyA9IGZ1bmN0aW9uKCR0YXJnZXQsIGNsYXNzTmFtZSkge1xuXHRcdFx0JHRhcmdldFxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3RvdWNoIG1vdXNlJylcblx0XHRcdFx0LmFkZENsYXNzKGNsYXNzTmFtZSB8fCAnJyk7XG5cdFx0fTtcblxuXG4vLyAjIyMjIyMjIyMjIE1BSU4gRlVOQ1RJT05BTElUWSAjIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBGdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGJ5IHRoZSBicmVha3BvaW50IHRyaWdnZXJcblx0XHQgKiAod2hpY2ggaXMgZmlyZWQgb24gYnJvd3NlciByZXNpemUpLiBJdCBjaGVja3MgZm9yXG5cdFx0ICogQ1NTIHZpZXcgY2hhbmdlcyBhbmQgcmVjb25maWd1cmVzIHRoZSB0aGUgSlMgYmVoYXZpb3VyXG5cdFx0ICogb2YgdGhlIG1lbnUgaW4gdGhhdCBjYXNlXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2JyZWFrcG9pbnRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEdldCB0aGUgY3VycmVudCB2aWV3bW9kZVxuXHRcdFx0dmFyIG9sZE1vZGUgPSBtb2RlIHx8IHt9LFxuXHRcdFx0XHRuZXdNb2RlID0ganNlLmxpYnMudGVtcGxhdGUucmVzcG9uc2l2ZS5icmVha3BvaW50KCk7XG5cblx0XHRcdC8vIE9ubHkgZG8gc29tZXRoaW5nIGlmIHRoZSB2aWV3IHdhcyBjaGFuZ2VkXG5cdFx0XHRpZiAobmV3TW9kZS5pZCAhPT0gb2xkTW9kZS5pZCkge1xuXG5cdFx0XHRcdC8vIENoZWNrIGlmIGEgdmlldyBjaGFuZ2UgYmV0d2VlbiBtb2JpbGUgYW5kIGRlc2t0b3AgdmlldyB3YXMgbWFkZVxuXHRcdFx0XHR2YXIgc3dpdGNoVG9Nb2JpbGUgPSAobmV3TW9kZS5pZCA8PSBvcHRpb25zLmJyZWFrcG9pbnQgJiYgKCFtb2JpbGUgfHwgb2xkTW9kZS5pZCA9PT0gdW5kZWZpbmVkKSksXG5cdFx0XHRcdFx0c3dpdGNoVG9EZXNrdG9wID0gKG5ld01vZGUuaWQgPiBvcHRpb25zLmJyZWFrcG9pbnQgJiYgKG1vYmlsZSB8fCBvbGRNb2RlLmlkID09PSB1bmRlZmluZWQpKTtcblxuXHRcdFx0XHQvLyBTdG9yZSB0aGUgbmV3IHZpZXcgc2V0dGluZ3Ncblx0XHRcdFx0bW9iaWxlID0gbmV3TW9kZS5pZCA8PSBvcHRpb25zLmJyZWFrcG9pbnQ7XG5cdFx0XHRcdG1vZGUgPSAkLmV4dGVuZCh7fSwgbmV3TW9kZSk7XG5cblx0XHRcdFx0aWYgKHN3aXRjaFRvTW9iaWxlIHx8IHN3aXRjaFRvRGVza3RvcCkge1xuXHRcdFx0XHRcdF9jbGVhclRpbWVvdXRzKCk7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMubWVudVR5cGUgIT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0XHRcdF9jbG9zZU1lbnUoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDaGFuZ2UgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1lbnUgaXRlbXNcblx0XHRcdFx0XHQvLyBpbiBjYXNlIG9mIGRlc2t0b3AgPC0+IG1vYmlsZSB2aWV3IGNoYW5nZVxuXHRcdFx0XHRcdGlmIChvcHRpb25zLnN3aXRjaEVsZW1lbnRQb3NpdGlvbikge1xuXHRcdFx0XHRcdFx0aWYgKHN3aXRjaFRvTW9iaWxlKSB7XG5cdFx0XHRcdFx0XHRcdF9zd2l0Y2hUb01vYmlsZVZpZXcoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdF9zd2l0Y2hUb0Rlc2t0b3BWaWV3KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF9yZXBvc2l0aW9uT3BlbkxheWVyKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSBpZiAoIW1vYmlsZSAmJiBvcHRpb25zLnN3aXRjaEVsZW1lbnRQb3NpdGlvbikge1xuXHRcdFx0XHRcdC8vIFVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWVudSBpdGVtc1xuXHRcdFx0XHRcdC8vIGlmIHRoZSB2aWV3IGNoYW5nZSB3YXMgZGVza3RvcCB0byBkZXNrdG9wIG9ubHlcblx0XHRcdFx0XHRfdXBkYXRlQ2F0ZWdvcnlNZW51KCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIW1vYmlsZSkge1xuXHRcdFx0XHRcdF9yZXBvc2l0aW9uT3BlbkxheWVyKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXG4vLyAjIyMjIyMjIyMgRVZFTlQgSEFORExFUiAjIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBDaGFuZ2VzIHRoZSBlcGFuZCAvIGNvbGxhcHNlIHN0YXRlIG9mIHRoZSBtZW51LFxuXHRcdCAqIGlmIHRoZXJlIGlzIGFuIHN1Ym1lbnUuIEluIHRoZSBvdGhlciBjYXNlIGl0XG5cdFx0ICogd2lsbCBsZXQgZXhlY3V0ZSB0aGUgZGVmYXVsdCBhY3Rpb24gKG1vc3QgdGltZXNcblx0XHQgKiB0aGUgZXhlY3V0aW9uIG9mIGEgbGluaylcblx0XHQgKiBAcGFyYW0ge29iamVjdH0gIGUgICAgICAgalF1ZXJ5IGV2ZW50IG9iamVjdFxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSAgbW9kZSAgICBUaGUgY3VycmVudCB2aWV3IG1vZGUgKGNhbiBiZSBcIm1vYmlsZVwiIG9yIFwiZGVza3RvcFwiXG5cdFx0ICogQHBhcmFtIHtpbnRlZ2VyfSBkZWxheSAgIEN1c3RvbSBkZWxheSAoaW4gbXMpIGZvciBvcGVuaW5nIGNsb3NpbmcgdGhlIG1lbnUgKG5lZWRlZCBmb3IgY2xpY2sgLyB0b3VjaCBldmVudHMpXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX29wZW5NZW51ID0gZnVuY3Rpb24oZSwgdHlwZSwgZGVsYXkpIHtcblxuXHRcdFx0dmFyICRzZWxmID0gJCh0aGlzKSxcblx0XHRcdFx0JHN1Ym1lbnUgPSAkc2VsZi5jaGlsZHJlbigndWwnKSxcblx0XHRcdFx0bGVuZ3RoID0gJHN1Ym1lbnUubGVuZ3RoLFxuXHRcdFx0XHRsZXZlbCA9ICgkc3VibWVudS5sZW5ndGgpID8gKCRzdWJtZW51LmRhdGEoJ2xldmVsJykgfHwgJzAnKSA6IDk5LFxuXHRcdFx0XHR2YWxpZFN1Ym1lbnUgPSAocGFyc2VJbnQobGV2ZWwsIDEwKSA8PSAyICYmIG1vZGUuaWQgPiBvcHRpb25zLmJyZWFrcG9pbnQpIHx8IG1vZGUuaWRcblx0XHRcdFx0XHQ8PSBvcHRpb25zLmJyZWFrcG9pbnQ7XG5cblx0XHRcdGlmICh0eXBlID09PSAnbW9iaWxlJykge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPbmx5IGNoYW5nZSB0aGUgc3RhdGUgaWYgdGhlcmUgaXNcblx0XHRcdC8vIGEgc3VibWVudVxuXHRcdFx0aWYgKGxlbmd0aCAmJiB2YWxpZFN1Ym1lbnUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdGlmICh0eXBlID09PSAnbW9iaWxlJykge1xuXHRcdFx0XHRcdC8vIFNpbXBseSB0b2dnbGUgdGhlIG9wZW5DbGFzcyBpbiBtb2JpbGUgbW9kZVxuXHRcdFx0XHRcdCRzZWxmLnRvZ2dsZUNsYXNzKG9wdGlvbnMub3BlbkNsYXNzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBQZXJmb3JtIHRoZSBlbHNlIGNhc2UgZm9yIHRoZSBkZXNrdG9wIHZpZXdcblxuXHRcdFx0XHRcdHZhciB2aXNpYmxlID0gJHNlbGYuaGFzQ2xhc3Mob3B0aW9ucy5vcGVuQ2xhc3MpLFxuXHRcdFx0XHRcdFx0bGVhdmUgPSAkc2VsZi5oYXNDbGFzcygnbGVhdmUnKSxcblx0XHRcdFx0XHRcdGFjdGlvbiA9IChlLmRhdGEgJiYgZS5kYXRhLmFjdGlvbikgPyBlLmRhdGEuYWN0aW9uIDpcblx0XHRcdFx0XHRcdCAgICAgICAgICh2aXNpYmxlICYmIGxlYXZlKSA/ICdlbnRlcicgOlxuXHRcdFx0XHRcdFx0ICAgICAgICAgdmlzaWJsZSA/ICdsZWF2ZScgOiAnZW50ZXInO1xuXG5cdFx0XHRcdFx0Ly8gRGVwZW5kaW5nIG9uIHRoZSB2aXNpYmlsaXR5IGFuZCB0aGUgZXZlbnQtYWN0aW9uLXBhcmFtZXRlclxuXHRcdFx0XHRcdC8vIHRoZSBzdWJtZW51IGdldHMgb3BlbmVkIG9yIGNsb3NlZFxuXHRcdFx0XHRcdHN3aXRjaCAoYWN0aW9uKSB7XG5cdFx0XHRcdFx0XHRjYXNlICdlbnRlcic6XG5cdFx0XHRcdFx0XHRcdGlmICghb25FbnRlciAmJiAhanNlLmxpYnMudGVtcGxhdGUuaW50ZXJhY3Rpb24uaXNNb3VzZURvd24oKSkge1xuXHRcdFx0XHRcdFx0XHRcdG9uRW50ZXIgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdC8vIFNldCBhIHRpbWVyIGZvciBvcGVuaW5nIGlmIHRoZSBzdWJtZW51IChkZWxheWVkIG9wZW5pbmcpXG5cdFx0XHRcdFx0XHRcdFx0X2NsZWFyVGltZW91dHMoKTtcblx0XHRcdFx0XHRcdFx0XHRlbnRlclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGFsbCBvcGVuQ2xhc3MtY2xhc3NlcyBmcm9tIHRoZVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gbWVudSBleGNlcHQgdGhlIGVsZW1lbnQgdG8gb3BlbiBhbmQgaXQncyBwYXJlbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHQkbGlzdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLicgKyBvcHRpb25zLm9wZW5DbGFzcylcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm5vdCgkc2VsZilcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm5vdCgkc2VsZi5wYXJlbnRzVW50aWwoJHRoaXMsICcuJyArIG9wdGlvbnMub3BlbkNsYXNzKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnRyaWdnZXIoanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLlRSQU5TSVRJT05fU1RPUCgpLCBbXSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKG9wdGlvbnMub3BlbkNsYXNzKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0JGxpc3Rcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5sZWF2ZScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50cmlnZ2VyKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5UUkFOU0lUSU9OX1NUT1AoKSwgW10pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnbGVhdmUnKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gT3BlbiB0aGUgc3VibWVudVxuXHRcdFx0XHRcdFx0XHRcdFx0dHJhbnNpdGlvbi5vcGVuID0gdHJ1ZTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU2V0IGFuZCB1bnNldCB0aGUgXCJvbkVudGVyXCIgdG8gcHJldmVudFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gY2xvc2luZyB0aGUgbWVudSBpbW1lZGlhdGVseSBhZnRlciBvcGVuaW5nIGlmXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyB0aGUgY3Vyc29yIGlzIGF0IGFuIHBsYWNlIG92ZXIgdGhlIG9wZW5pbmcgbWVudVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gKHRoaXMgY2FuIGhhcHBlbiBpZiBvdGhlciBjb21wb25lbnRzIHRyaWdnZXIgdGhlXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBvcGVuIGV2ZW50KVxuXHRcdFx0XHRcdFx0XHRcdFx0JHNlbGZcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lm9mZihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuVFJBTlNJVElPTl9GSU5JU0hFRCgpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQub25lKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5UUkFOU0lUSU9OX0ZJTklTSEVEKCksIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9uRW50ZXIgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnRyaWdnZXIoanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLlRSQU5TSVRJT04oKSwgdHJhbnNpdGlvbilcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnRyaWdnZXIoanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLk9QRU5fRkxZT1VUKCksIFskdGhpc10pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVwb3NpdGlvbk9wZW5MYXllcigpO1xuXHRcdFx0XHRcdFx0XHRcdH0sICh0eXBlb2YgZGVsYXkgPT09ICdudW1iZXInKSA/IGRlbGF5IDogb3B0aW9ucy5lbnRlckRlbGF5KTtcblxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdsZWF2ZSc6XG5cdFx0XHRcdFx0XHRcdG9uRW50ZXIgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Ly8gU2V0IGEgdGltZXIgZm9yIGNsb3NpbmcgaWYgdGhlIHN1Ym1lbnUgKGRlbGF5ZWQgY2xvc2luZylcblx0XHRcdFx0XHRcdFx0X2NsZWFyVGltZW91dHMoKTtcblx0XHRcdFx0XHRcdFx0JHNlbGYuYWRkQ2xhc3MoJ2xlYXZlJyk7XG5cdFx0XHRcdFx0XHRcdGxlYXZlVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIFJlbW92ZSBhbGwgb3BlbkNsYXNzLWNsYXNzZXMgZnJvbSB0aGVcblx0XHRcdFx0XHRcdFx0XHQvLyBtZW51IGV4Y2VwdCB0aGUgZWxlbWVudHMgcGFyZW50c1xuXHRcdFx0XHRcdFx0XHRcdHRyYW5zaXRpb24ub3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdCRsaXN0XG5cdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLicgKyBvcHRpb25zLm9wZW5DbGFzcylcblx0XHRcdFx0XHRcdFx0XHRcdC5ub3QoJHNlbGYucGFyZW50c1VudGlsKCR0aGlzLCAnLicgKyBvcHRpb25zLm9wZW5DbGFzcykpXG5cdFx0XHRcdFx0XHRcdFx0XHQub2ZmKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5UUkFOU0lUSU9OX0ZJTklTSEVEKCkpXG5cdFx0XHRcdFx0XHRcdFx0XHQub25lKGpzZS5saWJzLnRlbXBsYXRlLmV2ZW50cy5UUkFOU0lUSU9OX0ZJTklTSEVEKCksIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfc2V0RXZlbnRUeXBlQ2xhc3MoJHNlbGYsICcnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlbGYucmVtb3ZlQ2xhc3MoJ2xlYXZlJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0LnRyaWdnZXIoanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLlRSQU5TSVRJT04oKSwgdHJhbnNpdGlvbik7XG5cblxuXHRcdFx0XHRcdFx0XHR9LCAodHlwZW9mIGRlbGF5ID09PSAnbnVtYmVyJykgPyBkZWxheSA6IG9wdGlvbnMubGVhdmVEZWxheSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEV2ZW50IGhhbmRsZXIgZm9yIHRoZSBjbGljayAvIG1vdXNlZW50ZXIgLyBtb3VzZWxlYXZlIGV2ZW50XG5cdFx0ICogb24gdGhlIG5hdmlnYXRpb24gbGkgZWxlbWVudHMuIEl0IGNoZWNrcyBpZiB0aGUgZXZlbnQgdHlwZVxuXHRcdCAqIGlzIHN1cHBvcnRlZCBmb3IgdGhlIGN1cnJlbnQgdmlldyB0eXBlIGFuZCBjYWxscyB0aGVcblx0XHQgKiBvcGVuTWVudS1mdW5jdGlvbiBpZiBzby5cblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgZSAgICAgICAgICAgalF1ZXJ5IGV2ZW50IG9iamVjdFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIF9tb3VzZUhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgJHNlbGYgPSAkKHRoaXMpLFxuXHRcdFx0XHR2aWV3cG9ydCA9IG1vZGUuaWQgPD0gb3B0aW9ucy5icmVha3BvaW50ID8gJ21vYmlsZScgOiAnZGVza3RvcCcsXG5cdFx0XHRcdGV2ZW50cyA9IChvcHRpb25zLmV2ZW50cyAmJiBvcHRpb25zLmV2ZW50c1t2aWV3cG9ydF0pID8gb3B0aW9ucy5ldmVudHNbdmlld3BvcnRdIDogW107XG5cdFx0XHRcblx0XHRcdF9zZXRFdmVudFR5cGVDbGFzcygkc2VsZiwgJ21vdXNlJyk7XG5cdFx0XHRpZiAoJC5pbkFycmF5KGUuZGF0YS5ldmVudCwgZXZlbnRzKSA+IC0xKSB7XG5cdFx0XHRcdF9vcGVuTWVudS5jYWxsKCRzZWxmLCBlLCB2aWV3cG9ydCwgZS5kYXRhLmRlbGF5KTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gUGVyZm9ybSBuYXZpZ2F0aW9uIGZvciBjdXN0b20gbGlua3MgYW5kIGNhdGVnb3J5IGxpbmtzIG9uIHRvdWNoIGRldmljZXMgaWYgbm8gc3ViY2F0ZWdvcmllcyBhcmUgZm91bmQuXG5cdFx0XHRpZiAoKCRzZWxmLmhhc0NsYXNzKCdjdXN0b20nKSB8fCAoaXNUb3VjaERldmljZSAmJiAkc2VsZi5jaGlsZHJlbigndWwnKS5sZW5ndGggPT0gMCkpIFxuXHRcdFx0XHQmJiBlLmRhdGEuZXZlbnQgPT09ICdjbGljaycgJiYgISRzZWxmLmZpbmQoJ2Zvcm0nKS5sZW5ndGgpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYgKCRzZWxmLmZpbmQoJ2EnKS5hdHRyKCd0YXJnZXQnKSA9PT0gJ19ibGFuaycpIHtcblx0XHRcdFx0XHR3aW5kb3cub3Blbigkc2VsZi5maW5kKCdhJykuYXR0cignaHJlZicpKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gJHNlbGYuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRXZlbnQgaGFuZGxlciBmb3IgdGhlIHRvdWNoc3RhcnQgZXZlbnQgKG9yIFwicG9pbnRlcmRvd25cIlxuXHRcdCAqIGRlcGVuZGluZyBvbiB0aGUgYnJvd3NlcikuIEl0IHJlbW92ZXMgdGhlIG90aGVyIGNyaXRpY2FsXG5cdFx0ICogZXZlbnQgaGFuZGxlciAodGhhdCB3b3VsZCBvcGVuIHRoZSBtZW51KSBmcm9tIHRoZSBsaXN0XG5cdFx0ICogZWxlbWVudCBpZiB0aGUgdGhlIG1vdXNlZW50ZXIgd2FzIGV4ZWN1dGVkIGJlZm9yZSBhbmRcblx0XHQgKiBhIGNsaWNrIG9yIHRvdWNoIGV2ZW50IHdpbGwgYmUgcGVyZm9ybWVkIGFmdGVyd2FyZHMuIFRoaXNcblx0XHQgKiBpcyBuZWVkZWQgdG8gcHJldmVudCB0aGUgYnJvd3NlciBlbmdpbmUgd29ya2Fyb3VuZHMgd2hpY2hcblx0XHQgKiB3aWxsIGF1dG9tYXRpY2FsbHkgcGVyZm9ybSBtb3VzZSAvIGNsaWNrLWV2ZW50cyBvbiB0b3VjaFxuXHRcdCAqIGFsc28uXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3RvdWNoSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdHZhciAkc2VsZiA9ICQodGhpcyksXG5cdFx0XHRcdHZpZXdwb3J0ID0gbW9kZS5pZCA8PSBvcHRpb25zLmJyZWFrcG9pbnQgPyAnbW9iaWxlJyA6ICdkZXNrdG9wJyxcblx0XHRcdFx0ZXZlbnRzID0gKG9wdGlvbnMuZXZlbnRzICYmIG9wdGlvbnMuZXZlbnRzW3ZpZXdwb3J0XSkgPyBvcHRpb25zLmV2ZW50c1t2aWV3cG9ydF0gOiBbXTtcblxuXHRcdFx0JGxpc3QuZmluZCgnLmVudGVyLWNhdGVnb3J5Jykuc2hvdygpO1xuXHRcdFx0JGxpc3QuZmluZCgnLmRyb3Bkb3duID4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChlLmRhdGEudHlwZSA9PT0gJ3N0YXJ0Jykge1xuXHRcdFx0XHR0b3VjaGVTdGFydEV2ZW50ID0ge2V2ZW50OiBlLCB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLCB0b3A6ICR3aW5kb3cuc2Nyb2xsVG9wKCl9O1xuXHRcdFx0XHQkbGlzdC5vZmYoJ21vdXNlZW50ZXIubWVudSBtb3VzZWxlYXZlLm1lbnUnKTtcblx0XHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KCd0b3VjaCcsIGV2ZW50cykgPiAtMSAmJiAhX3RvdWNoTW92ZURldGVjdChlKSkge1xuXHRcdFx0XHRfc2V0RXZlbnRUeXBlQ2xhc3MoJHNlbGYsICd0b3VjaCcpO1xuXG5cdFx0XHRcdGlmICgkLmluQXJyYXkoJ2hvdmVyJywgZXZlbnRzKSA9PT0gLTEgfHwgdG91Y2hFdmVudHMuc3RhcnQgIT09ICdwb2ludGVyZG93bicpIHtcblx0XHRcdFx0XHRfb3Blbk1lbnUuY2FsbCgkc2VsZiwgZSwgdmlld3BvcnQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JGxpc3Qub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkbGlzdFxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWVudGVyLm1lbnUnLCAnbGknLCB7ZXZlbnQ6ICdob3Zlcid9LCBfbW91c2VIYW5kbGVyKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlLm1lbnUnLCAnbGknLCB7ZXZlbnQ6ICdob3ZlcicsIGFjdGlvbjogJ2xlYXZlJ30sIF9tb3VzZUhhbmRsZXIpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFN0b3JlcyB0aGUgbGFzdCB0b3VjaCBwb3NpdGlvbiBvbiB0b3VjaG1vdmVcblx0XHQgKiBAcGFyYW0gICAgICAgZSAgICAgICBqUXVlcnkgZXZlbnQgb2JqZWN0XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX3RvdWNoTW92ZUhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHR0b3VjaGVFbmRFdmVudCA9IHtldmVudDogZSwgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSwgdG9wOiAkd2luZG93LnNjcm9sbFRvcCgpfTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRXZlbnQgaGFuZGxlciBmb3IgY2xvc2luZyB0aGUgbWVudSBpZlxuXHRcdCAqIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBwYWdlXG5cdFx0ICogb3V0c2lkZSBvZiB0aGUgbWVudVxuXHRcdCAqIEBwYXJhbSAgICAgICB7b2JqZWN0fSAgICBlICAgICAgIGpRdWVyeSBldmVudCBvYmplY3Rcblx0XHQgKiBAcGFyYW0gICAgICAge29iamVjdH0gICAgZCAgICAgICBqUXVlcnkgc2VsZWN0aW9uIG9mIHRoZSBldmVudCBlbWl0dGVyXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgX2Nsb3NlRmx5b3V0ID0gZnVuY3Rpb24oZSwgZCkge1xuXHRcdFx0aWYgKGQgIT09ICR0aGlzICYmICR0aGlzLmZpbmQoJChlLnRhcmdldCkpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHQvLyBSZW1vdmUgb3BlbiBhbmQgY2xvc2UgdGltZXJcblx0XHRcdFx0X2NsZWFyVGltZW91dHMoKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYWxsIHN0YXRlLWNsYXNzZXMgZnJvbSB0aGUgbWVudVxuXHRcdFx0XHRpZiAob3B0aW9ucy5tZW51VHlwZSA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdFx0JGxpc3Rcblx0XHRcdFx0XHRcdC5maW5kKCcudG91Y2gsIC5tb3VzZSwgLmxlYXZlLCAuJyArIG9wdGlvbnMub3BlbkNsYXNzKVxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCd0b3VjaCBtb3VzZSBsZWF2ZSAnICsgb3B0aW9ucy5vcGVuQ2xhc3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBfb25DbGlja0FjY29yZGlvbiA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGlmICgkKHRoaXMpLnBhcmVudHMoJy5uYXZiYXItdG9wYmFyLWl0ZW0nKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2Ryb3Bkb3duJykpIHtcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3Mob3B0aW9ucy5vcGVuQ2xhc3MpKSB7XG5cdFx0XHRcdFx0JCh0aGlzKVxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKG9wdGlvbnMub3BlbkNsYXNzKVxuXHRcdFx0XHRcdFx0LmZpbmQoJy4nICsgb3B0aW9ucy5vcGVuQ2xhc3MpXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3Mob3B0aW9ucy5vcGVuQ2xhc3MpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyhvcHRpb25zLm9wZW5DbGFzcylcblx0XHRcdFx0XHRcdC5wYXJlbnRzVW50aWwoJHRoaXMsICdsaScpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3Mob3B0aW9ucy5vcGVuQ2xhc3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsb2NhdGlvbi5ocmVmID0gJCh0aGlzKS5maW5kKCdhJykuYXR0cignaHJlZicpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgX2JpbmRIb3Jpem9udGFsRXZlbnRIYW5kbGVycyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0JGxpc3Rcblx0XHRcdFx0Lm9uKHRvdWNoRXZlbnRzLnN0YXJ0ICsgJy5tZW51JywgJ2xpJywge3R5cGU6ICdzdGFydCd9LCBfdG91Y2hIYW5kbGVyKVxuXHRcdFx0XHQub24odG91Y2hFdmVudHMubW92ZSArICcubWVudScsICdsaScsIHt0eXBlOiAnc3RhcnQnfSwgX3RvdWNoTW92ZUhhbmRsZXIpXG5cdFx0XHRcdC5vbih0b3VjaEV2ZW50cy5lbmQgKyAnLm1lbnUnLCAnbGknLCB7dHlwZTogJ2VuZCd9LCBfdG91Y2hIYW5kbGVyKVxuXHRcdFx0XHQub24oJ2NsaWNrLm1lbnUnLCAnbGknLCB7ZXZlbnQ6ICdjbGljaycsICdkZWxheSc6IDB9LCBfbW91c2VIYW5kbGVyKVxuXHRcdFx0XHQub24oJ21vdXNlZW50ZXIubWVudScsICdsaScsIHtldmVudDogJ2hvdmVyJywgYWN0aW9uOiAnZW50ZXInfSwgX21vdXNlSGFuZGxlcilcblx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlLm1lbnUnLCAnbGknLCB7ZXZlbnQ6ICdob3ZlcicsIGFjdGlvbjogJ2xlYXZlJ30sIF9tb3VzZUhhbmRsZXIpO1xuXHRcdFx0XG5cdFx0XHQkYm9keVxuXHRcdFx0XHQub24oanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLk1FTlVfUkVQT1NJVElPTkVEKCksIF91cGRhdGVDYXRlZ29yeU1lbnUpO1xuXHRcdH07XG5cblx0XHR2YXIgX3VuYmluZEhvcml6b250YWxFdmVudEhhbmRsZXJzID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQkbGlzdFxuXHRcdFx0XHQub2ZmKHRvdWNoRXZlbnRzLnN0YXJ0ICsgJy5tZW51JywgJ2xpJylcblx0XHRcdFx0Lm9mZih0b3VjaEV2ZW50cy5tb3ZlICsgJy5tZW51JywgJ2xpJylcblx0XHRcdFx0Lm9mZih0b3VjaEV2ZW50cy5lbmQgKyAnLm1lbnUnLCAnbGknKVxuXHRcdFx0XHQub2ZmKCdjbGljay5tZW51JywgJ2xpJylcblx0XHRcdFx0Lm9mZignbW91c2VlbnRlci5tZW51JywgJ2xpJylcblx0XHRcdFx0Lm9mZignbW91c2VsZWF2ZS5tZW51JywgJ2xpJyk7XG5cdFx0fTtcblxuLy8gIyMjIyMjIyMjIyBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cblx0XHQvKipcblx0XHQgKiBJbml0IGZ1bmN0aW9uIG9mIHRoZSB3aWRnZXRcblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKi9cblx0XHRtb2R1bGUuaW5pdCA9IGZ1bmN0aW9uKGRvbmUpIHtcblx0XHRcdC8vIEB0b2RvIEdldHRpbmcgdGhlIFwidG91Y2hFdmVudHNcIiBjb25maWcgdmFsdWUgcHJvZHVjZXMgcHJvYmxlbXMgaW4gdGFibGV0IGRldmljZXMuXG5cdFx0XHR0b3VjaEV2ZW50cyA9IGpzZS5jb3JlLmNvbmZpZy5nZXQoJ3RvdWNoJyk7XG5cdFx0XHR0cmFuc2l0aW9uLmNsYXNzT3BlbiA9IG9wdGlvbnMub3BlbkNsYXNzO1xuXG5cdFx0XHRfZ2V0U2VsZWN0aW9ucygpO1xuXHRcdFx0X3Jlc2V0SW5pdGlhbENzcygpO1xuXG5cdFx0XHQkYm9keVxuXHRcdFx0XHQub24oanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLkJSRUFLUE9JTlQoKSwgX2JyZWFrcG9pbnRIYW5kbGVyKVxuXHRcdFx0XHQub24oanNlLmxpYnMudGVtcGxhdGUuZXZlbnRzLk9QRU5fRkxZT1VUKCkgKyAnIGNsaWNrICcgKyB0b3VjaEV2ZW50cy5lbmQsIF9jbG9zZUZseW91dCk7XG5cdFx0XHRcblx0XHRcdCQoJy5jbG9zZS1tZW51LWNvbnRhaW5lcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSlcblx0XHRcdFxuXHRcdFx0JCgnLmNsb3NlLWZseW91dCcpLm9uKCdjbGljaycsIF9jbG9zZU1lbnUpO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5tZW51VHlwZSA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdF9iaW5kSG9yaXpvbnRhbEV2ZW50SGFuZGxlcnMoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMubWVudVR5cGUgPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0aWYgKG9wdGlvbnMuYWNjb3JkaW9uID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0JHRoaXMub24oJ2NsaWNrJywgJ2xpJywgX29uQ2xpY2tBY2NvcmRpb24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gaWYgdGhlcmUgaXMgbm8gdG9wIGhlYWRlciB3ZSBtdXN0IGNyZWF0ZSBkdW1teSBodG1sIGJlY2F1c2Ugb3RoZXIgbW9kdWxlcyB3aWxsIG5vdCB3b3JrIGNvcnJlY3RseVxuXHRcdFx0XHRpZiAoJCgnI2NhdGVnb3JpZXMnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR2YXIgaHRtbCA9ICc8ZGl2IGlkPVwiY2F0ZWdvcmllc1wiPjxkaXYgY2xhc3M9XCJuYXZiYXItY29sbGFwc2UgY29sbGFwc2VcIj4nXG5cdFx0XHRcdFx0XHQrICc8bmF2IGNsYXNzPVwibmF2YmFyLWRlZmF1bHQgbmF2YmFyLWNhdGVnb3JpZXMgaGlkZGVuXCI+PC9uYXY+PC9kaXY+PC9kaXY+Jztcblx0XHRcdFx0XHQkKCcjaGVhZGVyJykuYXBwZW5kKGh0bWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdF9icmVha3BvaW50SGFuZGxlcigpO1xuXHRcdFx0XG5cdFx0XHQvKipcblx0XHRcdCAqIFN0b3AgdGhlIHByb3BhZ2F0aW9uIG9mIHRoZSBldmVudHMgaW5zaWRlIHRoaXMgY29udGFpbmVyXG5cdFx0XHQgKiAoV29ya2Fyb3VuZCBmb3IgdGhlIFwibW9yZVwiLWRyb3Bkb3duKVxuXHRcdFx0ICovXG5cdFx0XHQkdGhpc1xuXHRcdFx0XHQuZmluZCgnLicgKyBvcHRpb25zLmlnbm9yZUNsYXNzKVxuXHRcdFx0XHQub24oJ21vdXNlbGVhdmUubWVudSBtb3VzZWVudGVyLm1lbnUgY2xpY2subWVudSAnICsgdG91Y2hFdmVudHMuc3RhcnQgKyAnICdcblx0XHRcdFx0XHQrIHRvdWNoRXZlbnRzLmVuZCwgJ2xpJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5vcGVuQWN0aXZlKSB7XG5cdFx0XHRcdHZhciAkYWN0aXZlID0gJHRoaXMuZmluZCgnLmFjdGl2ZScpO1xuXHRcdFx0XHQkYWN0aXZlXG5cdFx0XHRcdFx0LnBhcmVudHNVbnRpbCgkdGhpcywgJ2xpJylcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ29wZW4nKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0JCgnbGkuY3VzdG9tLWVudHJpZXMgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHR2YXIgdmlld3BvcnQgPSBtb2RlLmlkIDw9IG9wdGlvbnMuYnJlYWtwb2ludCA/ICdtb2JpbGUnIDogJ2Rlc2t0b3AnO1xuXHRcdFx0XG5cdFx0XHRpZiAodmlld3BvcnQgPT0gJ21vYmlsZScpIHtcblx0XHRcdFx0JCgnLmxldmVsLTEnKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgJzIwMHB4Jyk7IC8vIFRoaXMgcGFkZGluZyBjb3JyZWN0cyBleHBhbmQvY29sbGFwc2UgYmVoYXZpb3Igb2YgbG93ZXIgbWVudSBpdGVtcyBpbiB2YXJpb3VzIG1vYmlsZSBicm93c2Vycy4gXG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGRvbmUoKTtcblx0XHR9O1xuXG5cdFx0Ly8gUmV0dXJuIGRhdGEgdG8gd2lkZ2V0IGVuZ2luZVxuXHRcdHJldHVybiBtb2R1bGU7XG5cdH0pO1xuIl19
