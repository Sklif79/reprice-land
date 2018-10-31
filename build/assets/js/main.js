'use strict';

$(document).ready(function () {

    //sliders
    $('.what-is__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1201,
            settings: {
                slidesToShow: 3,
                dots: true,
                arrows: false
            }
        }, {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                dots: true,
                arrows: false
            }
        }, {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                dots: true,
                arrows: false
            }
        }]
    });

    //fancybox
    $('.fancybox').fancybox({
        closeBtn: true,
        //minWidth: 430,
        padding: 0,
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(51,51,51,0.8)'
                }
            }
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
        pips[i].style.cursor = 'pointer';
        pips[i].addEventListener('click', clickOnPip);
    }

    pipsRange.noUiSlider.on('update', function (values, handle) {
        countTariff(+values[handle]);
        popupTariffTitle(+values[handle]);
    });
});

//блок рассчета стоимости
function countTariff(value) {
    var $parentEl = $('.js_tariff-wrap'),
        $subtotalEl = $parentEl.find('.tariff-plan__subtotal'),
        $totalEl = $parentEl.find('.tariff-plan__total'),
        $saleEl = $parentEl.find('.tariff-plan__sale'),
        basePrice = getPrice(10),
        subtotalValue,
        totalValue,
        saleValue;

    //подсчет значений
    totalValue = getPrice(value);
    subtotalValue = value / 10 * basePrice;
    saleValue = Math.round((totalValue - subtotalValue) / subtotalValue * 100);

    //вставлям значения в DOM
    $totalEl.text(totalValue + ' руб.');
    $subtotalEl.text(subtotalValue + ' руб.');
    $saleEl.text(saleValue + '%');

    //скрываем элементы с нулевыми значениями
    totalValue === subtotalValue ? $subtotalEl.addClass('hidden') : $subtotalEl.removeClass('hidden');
    saleValue === 0 ? $saleEl.addClass('hidden') : $saleEl.removeClass('hidden');
}

//формула рассчета цены
function getPrice(value) {
    return Math.round((4870 + 200 * value) / 130);
}

//заголовок попапа с тарифами
function popupTariffTitle(value) {
    $('.popup__tariff-title').text(value + ' ' + declOfNum(value));
}

//склонение слова
function declOfNum(number) {
    var titles = ['товар', 'товара', 'товаров'],
        cases = [2, 0, 1, 1, 1, 2];

    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}