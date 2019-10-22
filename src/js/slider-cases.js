import { Swiper, Navigation, Pagination, EffectFade } from 'swiper/dist/js/swiper.esm.js'

Swiper.use([Navigation, Pagination, EffectFade]);

new Swiper('.b-cases-slider__inner', {
    speed: 1000,
    loop: true,
    shortSwipes: false,
    preventInteractionOnTransition: true,
    slidesPerGroup: 1,

    // effect: 'fade',
    autoHeight: true,

    fadeEffect: {
      crossFade: true
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }
)

