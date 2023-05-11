$(function() {
    $('.toggle_btn').mousedown(function(e)  {
        if(!$('.dropdown_menu').hasClass('open')){
            $('.dropdown_menu').addClass('open');
        } else {
            $('.dropdown_menu').removeClass('open');
        }
    });
})