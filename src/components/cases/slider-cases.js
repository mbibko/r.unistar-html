import { Swiper, Navigation, Pagination, EffectFade } from 'swiper/dist/js/swiper.esm.js'
import {break_sm, break_xs} from "../../js/constants";

Swiper.use([Navigation, Pagination, EffectFade]);

(function () {
    const sliderWrapperEl = document.querySelector('.b-cases-slider');
    if(!sliderWrapperEl) return;
    const sliderEl = sliderWrapperEl.querySelector('.b-cases-slider__inner');
    const firstMediaHeight = sliderWrapperEl.querySelector('.b-cases-content2__media').offsetHeight;
    const arrPrev = sliderWrapperEl.querySelector('.swiper-button-prev');
    const arrNext = sliderWrapperEl.querySelector('.swiper-button-next');

    if (window.innerWidth <= break_sm) {
        arrNext.style.top = firstMediaHeight/2 + 'px';
        arrPrev.style.top = firstMediaHeight/2 + 'px';
    }
    const sliderCases = new Swiper(sliderEl, {
        speed: 1000,
        loop: true,
        shortSwipes: false,
        preventInteractionOnTransition: true,
        slidesPerGroup: 1,
        autoHeight: true,

        fadeEffect: {
          crossFade: true
        },

        pagination: {
            el: '.b-cases-slider .swiper-pagination',
            type: 'fraction',
        },

        navigation: {
          nextEl: arrNext,
          prevEl: arrPrev,
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
    document.addEventListener('updateSliderHeight', () => {
        sliderCases.wrapperEl.classList.add('is-toggled');
        setTimeout(function () {
            sliderCases.wrapperEl.classList.remove('is-toggled');
            sliderCases.update();
        }, 1000);
    });
})();