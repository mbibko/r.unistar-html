import { forEach } from '../../js/helpers';
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

;(function() {

    const popup = document.querySelector('.popup-mobile');
    if(!popup) return;
    const overlay = document.querySelector('.overlay');
    const hamburger = document.querySelector('.hamburger');
    const closeEls = document.querySelectorAll('[data-dismiss="popup"]');
    const close = () => {
        popup.classList.remove('is-active');
        overlay.classList.remove('is-active');
        // hamburger.classList.remove('is-active')
        enableBodyScroll(popup);
    };

    hamburger.addEventListener('click', () => {
        popup.classList.add('is-active');
        overlay.classList.add('is-active');
        disableBodyScroll(popup);
        // hamburger.classList.add('is-active');
    });

    forEach(closeEls, el => {
        el.addEventListener('click', () => {
            close()
        })
    });

    forEach(document.querySelectorAll('.nav-mobile a'), el => {
        el.addEventListener('click', () => {
            close()
        })
    });

    const popupMobileChannels = document.querySelector('.popup-mobile-channels');
    if (popupMobileChannels) {
        const list = popupMobileChannels.querySelector('.popup-mobile-channels__list');
        list.style.setProperty('--max-height', list.scrollHeight + 'px');
        popupMobileChannels.addEventListener('click', () => {
            popupMobileChannels.classList.toggle('active');
        })
    }

}());