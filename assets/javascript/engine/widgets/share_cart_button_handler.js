'use strict';

/* --------------------------------------------------------------
 share_cart_button_handler.js 2016-04-08
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2016 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

gambio.widgets.module('share_cart_button_handler', ['xhr', gambio.source + '/libs/events'], function (data) {

    'use strict';

    // ########## VARIABLE INITIALIZATION ##########

    var $this = $(this),
        defaults = {
        url: 'shop.php?do=SharedShoppingCart/StoreShoppingCart'
    },
        options = $.extend(true, {}, defaults, data),
        module = {};

    var _shareCartHandler = function _shareCartHandler() {
        jse.libs.xhr.ajax({ url: options.url }, true).done(function (result) {
            $('.shared_cart_url').val($("<div/>").html(result.link).text());
        });
        $('.share-cart-response-wrapper').find('p').first().empty();
    };

    // ########## INITIALIZATION ##########

    /**
     * Init function of the widget
     * @constructor
     */
    module.init = function (done) {
        $('body').on(jse.libs.template.events.SHARE_CART_MODAL_READY(), _shareCartHandler);

        done();
    };

    // Return data to widget engine
    return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2hhcmVfY2FydF9idXR0b25faGFuZGxlci5qcyJdLCJuYW1lcyI6WyJnYW1iaW8iLCJ3aWRnZXRzIiwibW9kdWxlIiwic291cmNlIiwiZGF0YSIsIiR0aGlzIiwiJCIsImRlZmF1bHRzIiwidXJsIiwib3B0aW9ucyIsImV4dGVuZCIsIl9zaGFyZUNhcnRIYW5kbGVyIiwianNlIiwibGlicyIsInhociIsImFqYXgiLCJkb25lIiwicmVzdWx0IiwidmFsIiwiaHRtbCIsImxpbmsiLCJ0ZXh0IiwiZmluZCIsImZpcnN0IiwiZW1wdHkiLCJpbml0Iiwib24iLCJ0ZW1wbGF0ZSIsImV2ZW50cyIsIlNIQVJFX0NBUlRfTU9EQUxfUkVBRFkiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7QUFVQUEsT0FBT0MsT0FBUCxDQUFlQyxNQUFmLENBQ0ksMkJBREosRUFHSSxDQUNJLEtBREosRUFFSUYsT0FBT0csTUFBUCxHQUFnQixjQUZwQixDQUhKLEVBUUksVUFBU0MsSUFBVCxFQUFlOztBQUVYOztBQUVSOztBQUVRLFFBQUlDLFFBQVFDLEVBQUUsSUFBRixDQUFaO0FBQUEsUUFDSUMsV0FBVztBQUNQQyxhQUFLO0FBREUsS0FEZjtBQUFBLFFBSUlDLFVBQVVILEVBQUVJLE1BQUYsQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQkgsUUFBbkIsRUFBNkJILElBQTdCLENBSmQ7QUFBQSxRQUtJRixTQUFTLEVBTGI7O0FBT0EsUUFBSVMsb0JBQW9CLFNBQXBCQSxpQkFBb0IsR0FBVztBQUMvQkMsWUFBSUMsSUFBSixDQUFTQyxHQUFULENBQWFDLElBQWIsQ0FBa0IsRUFBQ1AsS0FBS0MsUUFBUUQsR0FBZCxFQUFsQixFQUFzQyxJQUF0QyxFQUE0Q1EsSUFBNUMsQ0FBaUQsVUFBU0MsTUFBVCxFQUFpQjtBQUM5RFgsY0FBRSxrQkFBRixFQUFzQlksR0FBdEIsQ0FBMEJaLEVBQUUsUUFBRixFQUFZYSxJQUFaLENBQWlCRixPQUFPRyxJQUF4QixFQUE4QkMsSUFBOUIsRUFBMUI7QUFDSCxTQUZEO0FBR0FmLFVBQUUsOEJBQUYsRUFBa0NnQixJQUFsQyxDQUF1QyxHQUF2QyxFQUE0Q0MsS0FBNUMsR0FBb0RDLEtBQXBEO0FBQ0gsS0FMRDs7QUFRUjs7QUFFUTs7OztBQUlBdEIsV0FBT3VCLElBQVAsR0FBYyxVQUFTVCxJQUFULEVBQWU7QUFDekJWLFVBQUUsTUFBRixFQUFVb0IsRUFBVixDQUFhZCxJQUFJQyxJQUFKLENBQVNjLFFBQVQsQ0FBa0JDLE1BQWxCLENBQXlCQyxzQkFBekIsRUFBYixFQUFnRWxCLGlCQUFoRTs7QUFFQUs7QUFDSCxLQUpEOztBQU1BO0FBQ0EsV0FBT2QsTUFBUDtBQUNILENBM0NMIiwiZmlsZSI6IndpZGdldHMvc2hhcmVfY2FydF9idXR0b25faGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gc2hhcmVfY2FydF9idXR0b25faGFuZGxlci5qcyAyMDE2LTA0LTA4XG4gR2FtYmlvIEdtYkhcbiBodHRwOi8vd3d3LmdhbWJpby5kZVxuIENvcHlyaWdodCAoYykgMjAxNiBHYW1iaW8gR21iSFxuIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuIFtodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZ2FtYmlvLndpZGdldHMubW9kdWxlKFxuICAgICdzaGFyZV9jYXJ0X2J1dHRvbl9oYW5kbGVyJyxcblxuICAgIFtcbiAgICAgICAgJ3hocicsXG4gICAgICAgIGdhbWJpby5zb3VyY2UgKyAnL2xpYnMvZXZlbnRzJ1xuICAgIF0sXG5cbiAgICBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAjIyMjIyMjIyMjIFZBUklBQkxFIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiAnc2hvcC5waHA/ZG89U2hhcmVkU2hvcHBpbmdDYXJ0L1N0b3JlU2hvcHBpbmdDYXJ0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGRhdGEpLFxuICAgICAgICAgICAgbW9kdWxlID0ge307XG5cbiAgICAgICAgdmFyIF9zaGFyZUNhcnRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBqc2UubGlicy54aHIuYWpheCh7dXJsOiBvcHRpb25zLnVybH0sIHRydWUpLmRvbmUoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgJCgnLnNoYXJlZF9jYXJ0X3VybCcpLnZhbCgkKFwiPGRpdi8+XCIpLmh0bWwocmVzdWx0LmxpbmspLnRleHQoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5zaGFyZS1jYXJ0LXJlc3BvbnNlLXdyYXBwZXInKS5maW5kKCdwJykuZmlyc3QoKS5lbXB0eSgpO1xuICAgICAgICB9O1xuXG5cbi8vICMjIyMjIyMjIyMgSU5JVElBTElaQVRJT04gIyMjIyMjIyMjI1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0IGZ1bmN0aW9uIG9mIHRoZSB3aWRnZXRcbiAgICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgICAqL1xuICAgICAgICBtb2R1bGUuaW5pdCA9IGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5vbihqc2UubGlicy50ZW1wbGF0ZS5ldmVudHMuU0hBUkVfQ0FSVF9NT0RBTF9SRUFEWSgpLCBfc2hhcmVDYXJ0SGFuZGxlcik7XG5cbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBSZXR1cm4gZGF0YSB0byB3aWRnZXQgZW5naW5lXG4gICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgfSk7Il19
