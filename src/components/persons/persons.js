import {Swiper} from "swiper/dist/js/swiper.esm";
import {break_sm, break_xs} from "../../js/constants";

(function () {
    if (window.innerWidth <= break_sm) {
        const sliderEl = document.querySelector('.persons');
        if (!sliderEl) return;
        setTimeout(function () {
            new Swiper(sliderEl, {
                    speed: 500,
                    slidesPerView: 2,
                    spaceBetween: 6,
                    centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: sliderEl.querySelector('.swiper-button-next'),
                        prevEl: sliderEl.querySelector('.swiper-button-prev'),
                    },
                    breakpoints: {
                        [break_xs]: {
                            slidesPerView: 1,
                        },
                    },
                }
            )
        }, 1000);
    }
})();
