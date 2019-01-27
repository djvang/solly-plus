'use strict';

import 'nouislider';
import Swiper from 'swiper';

function swiperCarInit() {
    function slideOtherGalleryTo(sGalleryName, nSlideIndex) {
    sGalleryName.slideTo(nSlideIndex);
    }

    let thumbs = new Swiper('.uk-car-gallery-thumbs', {
        spaceBetween: 20,
        slidesPerView: 5,
        // freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        breakpoints: {
            967: {
              slidesPerView: 3,
            }
        },
        on: {
            init: function () {

                this.slides.each((index, slide) => {
                    let rest = document.createElement('div');
                    rest.classList.add('swiper-rest');

                    rest.innerHTML = `<div class="swiper-rest-value">${this.slides.length - (index + 1)}+</div><div class="swiper-rest-text">еще фото</div>`;

                    slide.appendChild(rest);

                });

                this.endVisibleSlide = this.visibleSlides[this.visibleSlides.length - 1];

                if(this.endVisibleSlide && !this.isEnd) {
                    this.endVisibleSlide.querySelector('.swiper-rest').classList.add('swiper-rest-active');
                }


            },
            slideChange: function () {

                this.endVisibleSlide.querySelector('.swiper-rest').classList.remove('swiper-rest-active');

                this.endVisibleSlide = this.visibleSlides[this.visibleSlides.length - 1];

                if(this.endVisibleSlide && !this.isEnd) {
                    this.endVisibleSlide.querySelector('.swiper-rest').classList.add('swiper-rest-active');
                }

            },
            touchStart: function () {

                this.endVisibleSlide.querySelector('.swiper-rest').classList.remove('swiper-rest-active');

                this.endVisibleSlide = this.visibleSlides[this.visibleSlides.length - 1];

                if(this.endVisibleSlide && !this.isEnd) {
                    this.endVisibleSlide.querySelector('.swiper-rest').classList.add('swiper-rest-active');
                }
            }
        }
    });

    let general = new Swiper('.uk-car-gallery-general', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: thumbs
        },
        on: {
            init: function () {
                if (this.slides.length < 2) {
                this.$el.addClass('swiper-single');
                }
            },
            transitionStart: function () {
                // Move thumbnails Gallery to the selected image
                slideOtherGalleryTo(thumbs, this.activeIndex);
            }
        }
    });
}


function swiperInit() {
    document.querySelectorAll('.swiper-container').forEach(function(swiper) {
        new Swiper(swiper, {
            scrollbar: {
                el: swiper.querySelector('.swiper-scrollbar'),
                draggable: true,
            },
            speed: 200,
            centerInsufficientSlides: true,
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
swiperCarInit();