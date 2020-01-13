import Select from '../components/customSelect/customSelect';
import phoneMask from './phone-mask.js'
import validate from './validate.js'
import {forEach, onlyNumber, maxValue} from './helpers.js'
import {mobileDevice} from "./helpers";

validate('.contact-form')

onlyNumber(document.querySelectorAll('[data-field="number"]'))
maxValue(document.querySelectorAll('input[type="number"]'))

Select(document.querySelectorAll('.select'))

forEach(document.querySelectorAll('[data-field="phone"]'), el => {
  phoneMask(el)
});

forEach(document.querySelectorAll('.contact-form .form-control'), item => {
  item.addEventListener('change', () => {
    if(item.value.length > 0) {
        item.classList.add('is-filled')
    } else {
        item.classList.remove('is-filled')
    }
  })
})


forEach(document.querySelectorAll('.js-select-time-choose'), select => {
  const timesEls = select.parentNode.querySelectorAll('.b-times')
  select.addEventListener('change', () => {
    forEach(timesEls, el => {
      el.classList.remove('active')
    });
    timesEls[select.value].classList.add('active')
  })
});

if (mobileDevice()) {
  forEach(document.querySelectorAll('.select[multiple]'), select => {
    if (select.previousElementSibling && select.previousElementSibling.tagName === 'LABEL') return;
    select.insertAdjacentHTML('beforebegin', `<label>${select.options[0].text}</label>`);
  });
}