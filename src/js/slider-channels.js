import { break_lg } from './constants.js'
import { Swiper, Autoplay } from 'swiper/dist/js/swiper.esm.js'
import {break_sm} from "./constants";

Swiper.use([Autoplay]);

if (window.innerWidth < break_lg && window.innerWidth > break_sm+1) {
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