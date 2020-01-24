import {break_sm} from "../../js/constants";
import {Swiper} from "swiper/dist/js/swiper.esm";
import {forEach} from "../../js/helpers";

if (window.innerWidth <= break_sm) {
    setTimeout(function () {
        const sliderEl = document.querySelector('.sliderPlayers');
        if (!sliderEl) return;
        new Swiper(sliderEl, {
                speed: 500,
                slidesPerView: 1.4,
                spaceBetween: 6,
                centeredSlides: true,
                loop: true,
                navigation: {
                    nextEl: sliderEl.querySelector('.swiper-button-next'),
                    prevEl: sliderEl.querySelector('.swiper-button-prev'),
                }
            }
        )
        forEach(sliderEl.querySelectorAll('[data-playlist]'), item => {
            item.removeAttribute('data-playlist');
        });
        forEach(sliderEl.querySelectorAll('.swiper-slide-duplicate'), item => {
            item.dispatchEvent(new Event(`playersAdded`, {bubbles: true}));
        });
    }, 1000);
}