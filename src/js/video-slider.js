import {Swiper, Navigation, Pagination, EffectFade, Thumbs} from 'swiper/dist/js/swiper.esm.js'
import {forEach} from "./helpers";

Swiper.use([Navigation, Pagination, EffectFade, Thumbs]);

(function () {

    const sliderWrapperEl = document.querySelector('.video-slider-wrapper');
    if(!sliderWrapperEl) return;

    const slider1 = new Swiper('.video-slider__inner', {
            slidesPerView: 1,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            on: {
                slideChange: function () {
                    document.dispatchEvent(new CustomEvent('stopVideo'));
                },
            },
        }
    );

    new Swiper('.video-slider-content__inner', {
            speed: 1000,
            loop: true,
            preventInteractionOnTransition: true,

            effect: 'fade',

            fadeEffect: {
                crossFade: true
            },

            pagination: {
                el: '.video-slider-content__inner .swiper-pagination',
                type: 'fraction',
            },

            navigation: {
                nextEl: sliderWrapperEl.querySelector('.swiper-button-next'),
                prevEl: sliderWrapperEl.querySelector('.swiper-button-prev'),
            },

            thumbs: {
                swiper: slider1
            },

        }
    );
})();