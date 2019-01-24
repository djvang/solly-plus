'use strict';

import 'nouislider';
import Swiper from 'swiper';


function swiperInit() {
    document.querySelectorAll('.swiper-container').forEach(function(swiper) {
        new Swiper(swiper, {
            scrollbar: {
                el: swiper.querySelector('.swiper-scrollbar'),
                draggable: true,
            },
            speed: 200,
            freeMode: true,
            slidesPerView: 'auto'
        });
    })
}

function priceInit() {

    let price = document.getElementById('price');
    let priceFrom = document.getElementById('price-from');
    let priceTo = document.getElementById('price-to');
    let inputs = [priceFrom, priceTo];
    
    noUiSlider.create(price, {
        start: [0, 10000],
        step: 1,
        connect: false,
        range: {
            'min': [0],
            'max': 10000
        }
    });
    
    price.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = parseFloat(values[handle]) + ' грн';
    });
    
    
    inputs.forEach(function (input, handle) {
    
        input.addEventListener('change', function () {
            price.noUiSlider.setHandle(handle, this.value.replace(' грн', ''));
        });
    
        input.addEventListener('keydown', function (e) {
    
            let values = price.noUiSlider.get();
            let value = Number(values[handle]).replace(' грн', '');
    
            // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
            let steps = price.noUiSlider.steps();
    
            // [down, up]
            let step = steps[handle];
    
            let position;
    
            // 13 is enter,
            // 38 is key up,
            // 40 is key down.
            switch (e.which) {
    
                case 13:
                price.noUiSlider.setHandle(handle, this.value.replace(' грн', ''));
                    break;
    
                case 38:
    
                    // Get step to go increase slider value (up)
                    position = step[1];
    
                    // false = no step is set
                    if (position === false) {
                        position = 1;
                    }
    
                    // null = edge of slider
                    if (position !== null) {
                        price.noUiSlider.setHandle(handle, value + position);
                    }
    
                    break;
    
                case 40:
    
                    position = step[0];
    
                    if (position === false) {
                        position = 1;
                    }
    
                    if (position !== null) {
                        price.noUiSlider.setHandle(handle, value - position);
                    }
    
                    break;
            }
        });
    });
}

priceInit();
swiperInit();