import { Swiper, Navigation, Pagination, EffectFade, Thumbs } from 'swiper/dist/js/swiper.esm.js'

Swiper.use([Navigation, Pagination, EffectFade, Thumbs]);

const slider1 = new Swiper('.video-slider__inner', {
    slidesPerView: 1,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    on: {
      slideChange: function () {
        const videoWrapper = this.slides[this.previousIndex].querySelector('.b-video') 
        if (!videoWrapper) return;
        const video = videoWrapper.querySelector('.b-video__video') 
        let href = video.getAttribute("src");
        if (!href) return;
        videoWrapper.classList.remove('is-playing');
        href = href.replace('?autoplay=1', '');
        video.setAttribute("src", href);
      },
    },
  }
)

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
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    thumbs: {
      swiper: slider1
    },

  }
)
