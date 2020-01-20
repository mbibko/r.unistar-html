import { Swiper, Navigation, Pagination, EffectFade } from 'swiper/dist/js/swiper.esm.js'
import {break_xs} from "./constants";

Swiper.use([Navigation, Pagination, EffectFade]);

(function () {
    const sliderWrapperEl = document.querySelector('.b-cases-slider');
    if(!sliderWrapperEl) return;
    const sliderEl = sliderWrapperEl.querySelector('.b-cases-slider__inner');
    new Swiper(sliderEl, {
        speed: 1000,
        loop: true,
        shortSwipes: false,
        preventInteractionOnTransition: true,
        slidesPerGroup: 1,

        fadeEffect: {
          crossFade: true
        },

        pagination: {
            el: '.b-cases-slider .swiper-pagination',
            type: 'fraction',
        },

        navigation: {
          nextEl: sliderWrapperEl.querySelector('.swiper-button-next'),
          prevEl: sliderWrapperEl.querySelector('.swiper-button-next'),
        },

        breakpoints: {
            [break_xs]: {
                spaceBetween: 6,
                centeredSlides: true,
                loop: true,
                pagination: false,
                shortSwipes: true
            },
        },

        on: {
          slideChange: function () {
            const toggled = this.$el[0].querySelector('.b-toggle.is-active')
            if (!toggled) return;
            toggled.classList.remove('is-active')
          },
        },
      }
    );
})();