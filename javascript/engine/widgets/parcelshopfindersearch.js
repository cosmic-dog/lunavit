/* --------------------------------------------------------------
 parcelshopfinderresult.js 2017-07-06
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2016 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

gambio.widgets.module(
    'parcelshopfindersearch',

    [],

    function(data) {

        'use strict';

        // ########## VARIABLE INITIALIZATION ##########

        var $this    = $(this),
            defaults = {},
            options  = $.extend(true, {}, defaults, data),
            module   = {};

        // ########## INITIALIZATION ##########

        /**
         * Initialize Module
         * @constructor
         */
        module.init = function(done) {
            $('#psfnewsearch').on('click', function(e) {
                e.preventDefault();
                $('#psf-form').show();
                $(this).hide();
            });
            done();
        };

        return module;
    }
);
