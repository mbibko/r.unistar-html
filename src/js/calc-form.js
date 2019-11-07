import CustomSelect from './CustomSelect';
import counter from './b-counter.js'


;(function() {
    const form = document.querySelector('.calc-form')
    if (!form) return
    
    const init = () => {
        counter(form.querySelectorAll('.b-counter'))
        CustomSelect(form.querySelectorAll('.select'))
        forEach(document.querySelectorAll('.js-select-time-choose'), select => {
          const timesEls = select.parentNode.querySelectorAll('.b-times')
          select.addEventListener('change', () => {
            forEach(timesEls, el => {
              el.classList.remove('active')
            });
            timesEls[select.value].classList.add('active')
          })
        });
    }
    // init() //after Ajax success
}());
