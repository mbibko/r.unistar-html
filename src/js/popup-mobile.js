import { forEach } from './helpers'

;(function() {

    const popup = document.querySelector('.popup-mobile')
    if(!popup) return
    const overlay = document.querySelector('.overlay')
    const hamburger = document.querySelector('.hamburger')
    const closeEls = document.querySelectorAll('[data-dismiss="popup"]')
    const close = () => {
        popup.classList.remove('is-active')
        overlay.classList.remove('is-active')
        hamburger.classList.remove('is-active')
    }

    hamburger.addEventListener('click', () => {
        popup.classList.add('is-active')
        overlay.classList.add('is-active')
        hamburger.classList.add('is-active')
    })

    forEach(closeEls, el => {
        el.addEventListener('click', () => {
            close()
        })
    })

    forEach(document.querySelectorAll('.nav-mobile a'), el => {
        el.addEventListener('click', () => {
            close()
        })
    })

}());