$(document).ready( function() {
$('.mobile_trigger').not('.mobile_trigger_active').next('.toggle_container').hide();
$('.mobile_trigger').click( function() {
var trig = $(this);
if ( trig.hasClass('mobile_trigger_active') ) {
trig.next('.toggle_container').slideToggle('slow');
trig.removeClass('mobile_trigger_active');
} else {
$('.mobile_trigger_active').next('.toggle_container').slideToggle('slow');
$('.mobile_trigger_active').removeClass('mobile_trigger_active');
trig.next('.toggle_container').slideToggle('slow');
trig.addClass('mobile_trigger_active');
};
return false;
});
});
