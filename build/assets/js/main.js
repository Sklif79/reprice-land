'use strict';

$(document).ready(function () {
    //sliderItemMaxHeight();

    //sliders
    $('.what-is__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1
    });

    //fancybox
    $('a.fancybox').fancybox({
        closeBtn: true,
        padding: [20, 20, 18, 20],
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(51,51,51,0.8)'
                }

            },
            title: { type: 'inside' }
        }
    });

    var pipsRange = document.getElementById('pips-range');

    noUiSlider.create(pipsRange, {
        range: {
            'min': [10],
            '10%': [100, 10],
            '20%': [200, 10],
            '30%': [300, 10],
            '40%': [400, 10],
            '50%': [500, 10],
            '60%': [600, 10],
            '70%': [700, 10],
            '80%': [800, 10],
            '90%': [900, 10],
            'max': [1000]
        },
        tooltips: true,
        start: [10], //начальное значение ползунка
        step: 10,
        pips: {
            mode: 'count',
            values: 11
        },
        format: wNumb({ decimals: 0 })
    });

    var pips = pipsRange.querySelectorAll('.noUi-value');

    function clickOnPip() {
        var value = Number(this.getAttribute('data-value'));
        pipsRange.noUiSlider.set(value);
    }

    for (var i = 0; i < pips.length; i++) {

        // For this example. Do this in CSS!
        pips[i].style.cursor = 'pointer';
        pips[i].addEventListener('click', clickOnPip);
    }
});

$(window).on('resize', function () {
    //sliderItemMaxHeight();
});

function sliderItemMaxHeight() {
    $('.what-is__item').css('height', '').setMaxHeights();
}

$.fn.setMaxHeights = function () {
    var maxHeight = this.map(function (i, e) {
        return $(e).height();
    }).get();

    return this.height(Math.max.apply(this, maxHeight));
};