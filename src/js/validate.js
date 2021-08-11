import Bouncer from 'formbouncerjs'
import {forEach} from "./helpers";

export default function(form) {

    const validateConfig = {
      messages: {
        missingValue: {
          default: 'Поле не должно быть пустым'
        },
        patternMismatch: {
          email: 'Введите корректный email адрес',
          tel: 'Введите корректный телефон'
        },
        wrongLength: {
          under: 'Поле должно содержать не менее {minLength} символов.'
        },
        outOfRange: {
            over: 'Не более чем {max}.',
            under: 'Не менее чем {min}.'
        },
      }
    };

    const bouncer = new Bouncer(form, {
      errorClass: 'help-text error-message',
      messages: Object.assign(validateConfig.messages, {}),
      // disableSubmit: true,
      emitEvents: true
    });

    const counterInputs = document.querySelectorAll(form + ' .b-counter input');

    document.addEventListener('bouncerFormInvalid', function (event) {
        const form = event.target;
        form.querySelector('.form-error-text').style.display = 'block'
        forEach(counterInputs, input => {
          if (input.checkValidity()) return;
          const bCounterEl = input.closest('.b-counter')
          bCounterEl.classList.add('has-error')
        })
      console.log(event)
    }, false);

    document.addEventListener('bouncerFormValid', function (event) {
        const form = event.target;
        form.querySelector('.form-error-text').style.display = 'none'
        forEach(counterInputs, input => {
          if (!input.checkValidity()) return;
          const bCounterEl = input.closest('.b-counter')
          bCounterEl.classList.remove('has-error')
        })
    }, false);

    forEach(counterInputs, input => {
      const bCounterEl = input.closest('.b-counter')
      input.addEventListener('change', () => {
        if (!input.checkValidity()) return;
        const bCounterErrorEl = bCounterEl.closest('.form-group').querySelector('.error-message')
        bCounterEl.classList.remove('has-error')
        if (bCounterErrorEl) {
          bCounterErrorEl.style.display = 'none'
        }
      })
    })

    return bouncer

}
