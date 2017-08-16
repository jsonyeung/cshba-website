$(document).ready(function() {
    var $nav     = $('.m-nav');
    var $hamburg = $('.m-nav__hamburger');

    var $mob_nav = $('.m-nav__menu--mobile');
    var $overlay = $('.m-nav__overlay');

    var open = false;

    TweenLite.set([$overlay, $mob_nav], { autoAlpha: 0 });
    TweenLite.set($mob_nav, { x: 500 });

    var toggle_nav = function() {
        if (open) {
            TweenLite.to($overlay, 0.05, { autoAlpha: 0 });
            TweenLite.to($mob_nav, 0.5, {autoAlpha: 0, x:500, ease: Power1.easeOut });
        } else {
            TweenLite.to($overlay, 0.05, { autoAlpha: 1 });
            TweenLite.to($mob_nav, 0.5, { autoAlpha: 1, x:0, ease: Power1.easeOut });
        }
        open = !open;
    };

    $hamburg.click(toggle_nav);
    $overlay.click(function() { toggle_nav(); });

    var stick_options = {
        offset: 150,
        tolerance: 10,

        classes: {
            pinned: 'm-nav--sticky'
        },

        onPin: function() {
            $nav.removeClass('m-nav--inverse');
        },
        onUnpin: function() {
            if (open) { $nav.addClass('m-nav--sticky'); }
        },
        onTop: function() {
            $nav.removeClass('m-nav--sticky')
                .addClass('m-nav--inverse');
        }
    };
    $nav.headroom(stick_options);


    $('.l-homepage__slider').slick({
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});