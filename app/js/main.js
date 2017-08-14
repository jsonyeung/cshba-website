$(document).ready(function() {
    var $nav     = $('.m-nav');
    var $hamburg = $('.m-nav__hamburger');

    var $mob_nav = $('.m-nav__menu--mobile');
    var $overlay = $('.m-nav__overlay');

    var open = false;

    TweenLite.set($mob_nav, { x: 500 });

    var toggle_nav = function() {
        if (open) {
            TweenLite.to($overlay, 0.05, { autoAlpha: 0 });
            TweenLite.to($mob_nav, 0.5, { x:500, ease: Power1.easeOut });
        } else {
            TweenLite.to($overlay, 0.05, { autoAlpha: 1 });
            TweenLite.to($mob_nav, 0.5, { x:0, ease: Power1.easeOut });
        }
        open = !open;
    };

    $hamburg.click(toggle_nav);
    $overlay.click(function() { toggle_nav(); });
});