$(document).ready(function() {
    $nav = $('.m-nav');

    $hamburg = $('.m-nav__hamburger');

    $hamburg.click(function() {
        $('.m-nav__menu--mobile').toggleClass('m-nav__menu--active');
        $('.m-nav__overlay').toggleClass('m-nav__overlay--active');
    });
});