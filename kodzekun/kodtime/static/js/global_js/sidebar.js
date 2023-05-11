$(function() {
    $('.bx-menu').mousedown(function(e)  {
        if(!$('nav').hasClass('open')){
            $('nav').addClass('open');
        } else {
            $('nav').removeClass('open');
        }
    });
    $('.bx-x').mousedown(function(e)  {
        if(!$('nav').hasClass('open')){
            $('nav').addClass('open');
        } else {
            $('nav').removeClass('open');
        }
    });
})
