import validate from './validate.js'
import {forEach} from './helpers.js'
import {controls} from './controls.js'


controls(document.forms);
validate('.contact-form');
forEach(document.querySelectorAll('.contact-form .form-control'), item => {
  item.addEventListener('change', () => {
    if(item.value.length > 0) {
        item.classList.add('is-filled')
    } else {
        item.classList.remove('is-filled')
    }
  })
});
