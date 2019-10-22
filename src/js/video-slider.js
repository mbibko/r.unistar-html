import { Swiper, Navigation, Pagination, EffectFade } from 'swiper/dist/js/swiper.esm.js'

Swiper.use([Navigation, Pagination, EffectFade]);

let swipers = []


swipers.push(new Swiper('.video-slider__inner', {
    speed: 1000,
    loop: true,
    preventInteractionOnTransition: true,
    slidesPerGroup: 1,
  }
))

swipers.push(new Swiper('.video-slider-content__inner', {
    speed: 1000,
    loop: true,
    preventInteractionOnTransition: true,
    slidesPerGroup: 1,

    effect: 'fade',

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
))

let isSlidesChanging = false

const syncSwipers = ( currentSwiper, direction ) => {
  swipers.forEach( swiper => {
    if(swiper == currentSwiper) return;
    swiper['slide'+direction]()
  });
  isSlidesChanging = false
}

swipers.forEach((swiper) => {
  swiper.on('slideNextTransitionStart', () => {
    if (isSlidesChanging) return;
    isSlidesChanging = true
    syncSwipers(swiper, 'Next')
  });
  swiper.on('slidePrevTransitionStart', () => {
    if (isSlidesChanging) return;
    isSlidesChanging = true
    syncSwipers(swiper, 'Prev')
  });
});
