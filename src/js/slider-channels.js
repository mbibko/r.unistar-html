import { break_lg } from './constants.js'
import { Swiper, Autoplay } from 'swiper/dist/js/swiper.esm.js'

Swiper.use([Autoplay]);

if (window.innerWidth < break_lg) {
  new Swiper('.list-channels', {
      speed: 5000,
      loop: true,
      freeMode: true,
      slidesPerView: 'auto',
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
    }
  )
}