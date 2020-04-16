import {Swiper} from "swiper/dist/js/swiper.esm";
import './index.sass'

export function popupAdMobile() {

    document.addEventListener('modal-open', e => {
        if(!e.target.classList.contains('modal-mobile-bottom')) return;

        const sliderEl = e.target.querySelector('.popup-ad-mobile');
        if (!sliderEl) return;
        new Swiper(sliderEl, {
                // speed: 1000,
                pagination: {
                    el: sliderEl.querySelector('.swiper-pagination'),
                    // type: 'fraction',
                },
                navigation: {
                    nextEl: sliderEl.querySelector('.swiper-button-next'),
                    prevEl: sliderEl.querySelector('.swiper-button-prev'),
                }
            }
        );
    });
}
