import tingle from './tingle.js'
import validate from './validate.js'
import { forEach, moveTingleClose, onlyNumber, maxValue } from './helpers.js'
import phoneMask from './phone-mask.js'
import CustomSelect from './CustomSelect';
import counter from './b-counter.js'

const modalOpts = {
  closeMethods: ['overlay', 'button', 'escape'],
  cssClass: ['modal-lg'],
  onOpen: function() {
    const self = this
    const modal = self.modal
    moveTingleClose(modal)
    CustomSelect(modal.querySelectorAll('.select'))
    self.bouncer = validate('form')

    forEach(modal.querySelectorAll('[data-dismiss="modal"]'), item => {
        item.addEventListener('click', () => {
            self.close()
        })
    });
    phoneMask(modal.querySelector('[data-field="phone"]'))
    counter(modal.querySelectorAll('.b-counter'))
  },
  onClose: function() {
    this.bouncer.destroy
  }
}

const modalInit = (module, modalOpts) => {
    const html = module.default()
    const modal = new tingle.modal(modalOpts);
    modal.setContent(html);
    modal.open();
    return modal
}

forEach(document.querySelectorAll('[data-modal]'), button => {
    button.addEventListener('click', e => {
        e.preventDefault()
        button.dispatchEvent(new Event(`eventModal${button.dataset.modal}`, {bubbles: true}));
    })
});

document.addEventListener("eventModalvideo", function(event) {
    const html = `
    <div class="video-wrapper">
        <iframe width="560" height="315" src="${event.target.href}?controls=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `
    console.log(event.target);
    const modal = new tingle.modal({
        closeMethods: ['overlay', 'button', 'escape'],
        cssClass: ['modal-video'],
        onClose: function() {
          this.destroy()
        }
    });
    modal.setContent(html);
    modal.open();
})

document.addEventListener("eventModalbrif", function(event) {
    import (/* webpackChunkName: "modalClip" */ '../components/modalBrif/index.js').then(module => {
        const modal = modalInit(module, modalOpts)
    })
})
document.addEventListener("eventModalclip", function(event) {
    import (/* webpackChunkName: "modalClip" */ '../components/modalClip/index.js').then(module => {
        const modal = modalInit(module, modalOpts)
        onlyNumber(modal.modal.querySelectorAll('[data-field="number"]'))
        maxValue(modal.modal.querySelectorAll('input[type="number"]'))
    })
})
document.addEventListener("eventModalmediaplan", function(event) {
    import (/* webpackChunkName: "modalMediaPlan" */ '../components/modalMediaPlan/index.js').then(module => {
        modalInit(module, modalOpts)
    })
})
document.addEventListener("eventModalrequestcall", function(event) {
    import (/* webpackChunkName: "modalRequestCall" */ '../components/modalRequestCall/index.js').then(module => {
        let modalOptsLocal = Object.assign({}, modalOpts)
        modalOptsLocal.cssClass = ['modal-md']

        modalInit(module, modalOptsLocal)
    })
})
document.addEventListener("eventModalrequestok", function(event) {
    import (/* webpackChunkName: "modalRequestOk" */ '../components/modalRequestOk/index.js').then(module => {
        let modalOptsLocal = Object.assign({}, modalOpts)
        modalOptsLocal.cssClass = ['modal-md']
        const modal = new tingle.modal(modalOptsLocal);
        modalInit(module, modalOptsLocal, {text: 'Закрыть', close: true})
    })
})
document.addEventListener("eventModalstep1", function(event) {
    import (/* webpackChunkName: "modalStepsStep1" */ '../components/modalSteps/step1/index.js').then(module => modalInit(module, modalOpts))
})
document.addEventListener("eventModalstep2", function(event) {
    import (/* webpackChunkName: "modalStepsStep2" */ '../components/modalSteps/step2/index.js').then(module => modalInit(module, modalOpts))
})
document.addEventListener("eventModalstep3", function(event) {
    import (/* webpackChunkName: "modalStepsStep3" */ '../components/modalSteps/step3/index.js').then(module => modalInit(module, modalOpts))
})
document.addEventListener("eventModalstep4", function(event) {
    import (/* webpackChunkName: "modalStepsStep4" */ '../components/modalSteps/step4/index.js').then(module => {
        modalInit(module, modalOpts)
    })
})
document.addEventListener("eventModalnotsuitable", function(event) {
    const modalTitle = '<div class="modal-title">Для вашей целевой аудитории рекомендуем выбрать другое радио</div>'
    const modalText = '<p>Целевая аудитория нашего радио - мужчины и женщины 26 - 40 лет.</p>'
    const modalButton = '<div class="modal-footer"><button class="button button-red" type="submit">Закрыть</button></div>'
    const html = modalTitle + modalText + modalButton
    const modal = new tingle.modal(modalOpts);
    modal.setContent(html);
    modal.open();
})
