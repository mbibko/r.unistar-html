if (NODE_ENV == 'development') {
    import('./pug/index.pug')
    import('./pug/components.pug')
    import('./pug/pdf.pug')
}

// import styles
//=====================================
import "swiper/dist/css/swiper.min.css"
import 'simplebar/dist/simplebar.css'
import 'tingle.js/src/tingle.css'
import './sass/main.sass'

// import components
//=====================================
// import './components/toTop'
import './components/player'

// import scripts
//=====================================
import './js/dinamic-links.js'
import './js/forms.js'
import './js/lazy-video.js'
import './js/video-slider.js'
import './js/slider-cases.js'
import './js/slider-channels.js'
import './js/b-toggle.js'
import './js/modals.js'
import './js/popup-mobile.js'
import './js/calc-form.js'

import counter from './js/b-counter.js'

// import icons
//=====================================
import './js/svg-sprite'

import { forEach } from './js/helpers'

// // Import any polyfill to enable smoothscroll for JS APIs
import smoothscrollPolyfill from 'smoothscroll-polyfill';
// // Import this package to apply the smoothscroll to anchor links
// import smoothscrollAnchorPolyfill from 'smoothscroll-anchor-polyfill';
// // (Unlike this package, smoothscroll-polyfill needs to be actively invoked: )
smoothscrollPolyfill.polyfill();


;(function() {
    const header = document.querySelector('.header')
    forEach(document.querySelectorAll('.nav-main a'), item => {
        item.addEventListener('click', e => {
            e.preventDefault()
            window.scroll(0, document.querySelector(decodeURI(item.hash)).offsetTop - header.offsetHeight);
        })
    })
}());

counter(document.querySelectorAll('.b-counter'))

if(location.hostname == 'localhost') {
  document.documentElement.classList.add('css-simple-grid')
}

if (document.querySelector('.tabs-side__nav')) {
    new Tabby('.tabs-side__nav');
}
if (document.querySelector('.tabs-voices__nav')) {
    new Tabby('.tabs-voices__nav');
}
