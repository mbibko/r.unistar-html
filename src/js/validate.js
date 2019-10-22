import Bouncer from 'formbouncerjs'

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
        }
      }
    };

    const bouncer = new Bouncer(form, {
      errorClass: 'help-text error-message',
      messages: Object.assign(validateConfig.messages, {}),
      // disableSubmit: true,
      emitEvents: true
    });
    document.addEventListener('bouncerFormInvalid', function (event) {
        var form = event.target;
        form.querySelector('.form-error-text').style.display = 'block'
    }, false);

    document.addEventListener('bouncerFormValid', function (event) {
        var form = event.target;
        form.querySelector('.form-error-text').style.display = 'none'
    }, false);

    return bouncer
    
}