'use strict';

/* --------------------------------------------------------------
 parcelshopfinderresult.js 2017-07-06
 Gambio GmbH
 http://www.gambio.de
 Copyright (c) 2016 Gambio GmbH
 Released under the GNU General Public License (Version 2)
 [http://www.gnu.org/licenses/gpl-2.0.html]
 --------------------------------------------------------------
 */

gambio.widgets.module('parcelshopfindersearch', [], function (data) {

    'use strict';

    // ########## VARIABLE INITIALIZATION ##########

    var $this = $(this),
        defaults = {},
        options = $.extend(true, {}, defaults, data),
        module = {};

    // ########## INITIALIZATION ##########

    /**
     * Initialize Module
     * @constructor
     */
    module.init = function (done) {
        $('#psfnewsearch').on('click', function (e) {
            e.preventDefault();
            $('#psf-form').show();
            $(this).hide();
        });
        done();
    };

    return module;
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvcGFyY2Vsc2hvcGZpbmRlcnNlYXJjaC5qcyJdLCJuYW1lcyI6WyJnYW1iaW8iLCJ3aWRnZXRzIiwibW9kdWxlIiwiZGF0YSIsIiR0aGlzIiwiJCIsImRlZmF1bHRzIiwib3B0aW9ucyIsImV4dGVuZCIsImluaXQiLCJkb25lIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJzaG93IiwiaGlkZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7OztBQVVBQSxPQUFPQyxPQUFQLENBQWVDLE1BQWYsQ0FDSSx3QkFESixFQUdJLEVBSEosRUFLSSxVQUFTQyxJQUFULEVBQWU7O0FBRVg7O0FBRUE7O0FBRUEsUUFBSUMsUUFBV0MsRUFBRSxJQUFGLENBQWY7QUFBQSxRQUNJQyxXQUFXLEVBRGY7QUFBQSxRQUVJQyxVQUFXRixFQUFFRyxNQUFGLENBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUJGLFFBQW5CLEVBQTZCSCxJQUE3QixDQUZmO0FBQUEsUUFHSUQsU0FBVyxFQUhmOztBQUtBOztBQUVBOzs7O0FBSUFBLFdBQU9PLElBQVAsR0FBYyxVQUFTQyxJQUFULEVBQWU7QUFDekJMLFVBQUUsZUFBRixFQUFtQk0sRUFBbkIsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBU0MsQ0FBVCxFQUFZO0FBQ3ZDQSxjQUFFQyxjQUFGO0FBQ0FSLGNBQUUsV0FBRixFQUFlUyxJQUFmO0FBQ0FULGNBQUUsSUFBRixFQUFRVSxJQUFSO0FBQ0gsU0FKRDtBQUtBTDtBQUNILEtBUEQ7O0FBU0EsV0FBT1IsTUFBUDtBQUNILENBaENMIiwiZmlsZSI6IndpZGdldHMvcGFyY2Vsc2hvcGZpbmRlcnNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gcGFyY2Vsc2hvcGZpbmRlcnJlc3VsdC5qcyAyMDE3LTA3LTA2XG4gR2FtYmlvIEdtYkhcbiBodHRwOi8vd3d3LmdhbWJpby5kZVxuIENvcHlyaWdodCAoYykgMjAxNiBHYW1iaW8gR21iSFxuIFJlbGVhc2VkIHVuZGVyIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSAoVmVyc2lvbiAyKVxuIFtodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLTIuMC5odG1sXVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZ2FtYmlvLndpZGdldHMubW9kdWxlKFxuICAgICdwYXJjZWxzaG9wZmluZGVyc2VhcmNoJyxcblxuICAgIFtdLFxuXG4gICAgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICd1c2Ugc3RyaWN0JztcblxuICAgICAgICAvLyAjIyMjIyMjIyMjIFZBUklBQkxFIElOSVRJQUxJWkFUSU9OICMjIyMjIyMjIyNcblxuICAgICAgICB2YXIgJHRoaXMgICAgPSAkKHRoaXMpLFxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7fSxcbiAgICAgICAgICAgIG9wdGlvbnMgID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBkYXRhKSxcbiAgICAgICAgICAgIG1vZHVsZSAgID0ge307XG5cbiAgICAgICAgLy8gIyMjIyMjIyMjIyBJTklUSUFMSVpBVElPTiAjIyMjIyMjIyMjXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXRpYWxpemUgTW9kdWxlXG4gICAgICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgbW9kdWxlLmluaXQgPSBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICAkKCcjcHNmbmV3c2VhcmNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkKCcjcHNmLWZvcm0nKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbW9kdWxlO1xuICAgIH1cbik7XG4iXX0=
