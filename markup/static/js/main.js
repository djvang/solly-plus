'use strict';

import 'nouislider';
import Swiper from 'swiper';
import Choices from 'choices.js';

import $ from 'jquery';
import drilldown from 'jquery-drilldown';
import datepicker from 'air-datepicker';
import Inputmask from "inputmask";


UIkit.util.on('[data-uk-modal]', 'shown', function () {
    window.dispatchEvent(new Event('resize'));
});

Inputmask().mask(document.querySelectorAll("input"));


function choicesInit() {

    if (document.querySelectorAll('.uk-select').length === 0) return

    const strToEl = (function () {
        const tmpEl = document.createElement('div');
        return function (str) {
            const cleanedInput = str.trim();
            let r;
            tmpEl.innerHTML = cleanedInput;
            r = tmpEl.children[0];

            while (tmpEl.firstChild) {
                tmpEl.removeChild(tmpEl.firstChild);
            }

            return r;
        };
    })();
    const choices = new Choices('.uk-select', {
        silent: false,
        items: [],
        choices: [],
        renderChoiceLimit: -1,
        maxItemCount: -1,
        addItems: true,
        removeItems: true,
        removeItemButton: false,
        editItems: false,
        duplicateItemsAllowed: true,
        delimiter: ',',
        paste: true,
        searchEnabled: false,
        searchChoices: true,
        searchFloor: 1,
        searchResultLimit: 4,
        searchFields: ['label', 'value'],
        position: 'auto',
        resetScrollPosition: true,
        regexFilter: null,
        shouldSort: true,
        shouldSortItems: false,
        sortFn: () => {},
        placeholder: true,
        placeholderValue: null,
        searchPlaceholderValue: null,
        prependValue: null,
        appendValue: null,
        renderSelectedChoices: 'auto',
        loadingText: 'Loading...',
        noResultsText: 'No results found',
        noChoicesText: 'No choices to choose from',
        itemSelectText: 'Press to select',
        addItemText: (value) => {
            return `Press Enter to add <b>"${value}"</b>`;
        },
        maxItemText: (maxItemCount) => {
            return `Only ${maxItemCount} values can be added`;
        },
        itemComparer: (choice, item) => {
            return choice === item;
        },
        classNames: {
            containerOuter: 'choices',
            containerInner: 'choices__inner',
            input: 'uk-input',
            inputCloned: 'choices__input--cloned',
            list: 'choices__list',
            listItems: 'choices__list--multiple',
            listSingle: 'choices__list--single',
            listDropdown: 'choices__list--dropdown',
            item: 'choices__item',
            itemSelectable: 'choices__item--selectable',
            itemDisabled: 'choices__item--disabled',
            itemChoice: 'choices__item--choice',
            placeholder: 'choices__placeholder',
            group: 'choices__group',
            groupHeading: 'choices__heading',
            button: 'choices__button',
            activeState: 'is-active',
            focusState: 'is-focused',
            openState: 'is-open',
            disabledState: 'is-disabled',
            highlightedState: 'is-highlighted',
            hiddenState: 'is-hidden',
            flippedState: 'is-flipped',
            loadingState: 'is-loading',
            noResults: 'has-no-results',
            noChoices: 'has-no-choices'
        },
        fuseOptions: {
            include: 'score'
        },
        callbackOnInit: null,
        callbackOnCreateTemplates: function (template) {
            return {
                containerInner(globalClasses) {
                    return strToEl(`
                      <div class="${this.passedElement.element.className}"></div>
                    `);
                }
            };
        }
    });
}

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

                if (this.endVisibleSlide && !this.isEnd) {
                    let rest = this.endVisibleSlide.querySelector('.swiper-rest');
                    let self = this;
                    rest.classList.add('swiper-rest-active');
                    rest.onclick = function() {
                        self.$wrapperEl.addClass('swiper-opened');
                    }
                }


            },
            // slideChange: function () {

            //     this.endVisibleSlide.querySelector('.swiper-rest').classList.remove('swiper-rest-active');

            //     this.endVisibleSlide = this.visibleSlides[this.visibleSlides.length - 1];

            //     if (this.endVisibleSlide && !this.isEnd) {
            //         this.endVisibleSlide.querySelector('.swiper-rest').classList.add('swiper-rest-active');
            //     }

            // },
            // touchStart: function () {

            //     this.endVisibleSlide.querySelector('.swiper-rest').classList.remove('swiper-rest-active');

            //     this.endVisibleSlide = this.visibleSlides[this.visibleSlides.length - 1];

            //     if (this.endVisibleSlide && !this.isEnd) {
            //         this.endVisibleSlide.querySelector('.swiper-rest').classList.add('swiper-rest-active');
            //     }
            // }
        }
    });

    let general = new Swiper('.uk-car-gallery-general', {
        spaceBetween: 10,
        freeMode: false,
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
    document.querySelectorAll('.swiper-container:not(.uk-car-gallery-general):not(.uk-car-gallery-thumb)').forEach(function (swiper) {
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

    let roots = document.querySelectorAll('[data-nouislider]');


    roots.forEach(root => {
        nouislider(root);
    })


    function nouislider(root) {
        let price = root.querySelector('[data-nouislider-range]');

        if (!price) return;

        let priceFrom = root.querySelector('[data-nouislider-from]');
        let priceTo = root.querySelector('[data-nouislider-to]');
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

}

function drilldownInit() {
    let options = {};
    $('.drilldown').drilldown(options);
}

function datepickerInit() {
    $('[data-toggle="datepicker"]').datepicker({
        inline: true
    });
}

const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60)
}

function videosInit() {

    let element = document.querySelector('[data-videos]');
    if(!element) return;

    let prevVideo = null;
    let currentVideo = 0;
    let urls = element.dataset.videos.split(',');
    let videos = urls
        .reduce((videos, url, index) => {
            let video = document.createElement('video');
            let source = document.createElement('source')
            source.src = url.trim();
            source.type = "video/mp4";
            video.muted = true;
            video.playsinline = true;
            video.preload = true;
            video.append(source);

            if (index === currentVideo) {
                video.classList.add('uk-play');
            }

            videos.push(video);

            return videos
        }, []);


    function videoHandler(e) {

        if (currentVideo < urls.length - 1) {
            currentVideo = currentVideo + 1;
        } else {
            currentVideo = 0;
        }

        setPlay(currentVideo)

    }

    function setPlay(index) {

        if (prevVideo !== index) {
            if (prevVideo !== null) videos[prevVideo].classList.remove('uk-play');
            prevVideo = index;

            videos[index].classList.add('uk-play');
            videos[index].play();

        }
    }

    setPlay(currentVideo)

    videos.forEach(video => {
        element.append(video);
        video.addEventListener('ended', videoHandler, false);
    })
}

function svgMapInit() {

    let country = null;
    let timetID = null;

    function setHover($this) {
        $('.kh, .zp, .pl').removeClass('is-hover');
        $this.addClass('is-hover');
    }

    $('.uk-map-country').on('mouseover', '.kh, .zp, .pl', function(e) {
        let $this = $(this);
        country = country ? country : $('.uk-map-country .kh');

        setHover($this);

        clearTimeout(timetID);

        timetID = setTimeout(() => {
            setHover(country);
        }, 5000)

    })
}

function inviewInit() {
    const features = document.querySelector('.uk-list-features');
    const main = document.querySelector('.uk-hero-main');

    if(!features) return

    const handler = () => {

        let isOut = window.pageYOffset > (main ? main.clientHeight : 200);

        if (isOut) {
            features.classList.add('uk-inview')
        } else {
            features.classList.remove('uk-inview')
        }

    }

    handler()
    window.addEventListener('scroll', handler)
}

document.addEventListener('DOMContentLoaded', () => {

    priceInit();
    swiperInit();
    swiperCarInit();
    choicesInit();
    drilldownInit();
    datepickerInit();
    videosInit();
    inviewInit();
    svgMapInit();

})
