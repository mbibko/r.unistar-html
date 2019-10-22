import { scrollToTop } from '../../js/helpers'

const toTopFunc = () => {
  const toTop = document.querySelector('.to-top');
  if (!toTop) return;
  toTop.addEventListener('click', () => {
    scrollToTop(500);
  });

  var scrolling = false;
  window.addEventListener('scroll', () => {
    scrolling = true;
  }, { capture: false, passive: true});
  setInterval( function() {
    if ( scrolling ) {
      scrolling = false;
      if (window.pageYOffset < window.innerHeight) {
        toTop.classList.remove('active')
      } else {
        toTop.classList.add('active')
      }
    }
  }, 1000 );
}

toTopFunc()