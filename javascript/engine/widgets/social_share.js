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
gambio.widgets.module(
	'social_share',

	[
		`${jse.source}/vendor/shariff/shariff.min.js`,
		`${jse.source}/vendor/shariff/shariff.min.css`
	],

	function(data) {

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
		module.init = function(done) {
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