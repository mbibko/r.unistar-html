import tingle from './tingle.js'
import validate from './validate.js'
import { forEach, moveTingleClose, onlyNumber, maxValue } from './helpers.js'
import phoneMask from './phone-mask.js'
import Select from '../components/customSelect/customSelect';
import counter from './b-counter.js'
import {stopVideo} from "./helpers";
import {controls} from "./controls";

const modalOpts = {
  closeMethods: ['overlay', 'button', 'escape'],
  cssClass: ['modal-lg'],
  onOpen: function() {
    const self = this
    const modal = self.modal
    moveTingleClose(modal)
    self.bouncer = validate('form')

    forEach(modal.querySelectorAll('[data-dismiss="modal"]'), item => {
        item.addEventListener('click', () => {
            self.close()
        })
    });
    controls(modal.querySelectorAll('form'));
    modal.dispatchEvent(new Event(`playersAdded`, {bubbles: true}));
    modal.dispatchEvent(new Event(`modal-open`, {bubbles: true}));
  },
  onClose: function() {
    this.bouncer.destroy
  }
}

const modalInit = (modalEl, modalOpts) => {
    const html = modalEl.innerHTML;
    const modal = new tingle.modal(modalOpts);
    modal.setContent(html);
    modal.open();
    return modal
};

forEach(document.querySelectorAll('[data-modal]'), button => {
    button.addEventListener('click', e => {
        e.preventDefault()
        button.dispatchEvent(new Event(`eventModal${button.dataset.modal}`, {bubbles: true}));
    })
});

document.addEventListener("eventModalvideo", function(event) {
    const html = `
    <div class="video-wrapper">
        <div class="video-wrapper__video" id="${event.target.id}"></div>
    </div>
    `;
    // console.log(event.target);
    const modal = new tingle.modal({
        closeMethods: ['overlay', 'button', 'escape'],
        cssClass: ['modal-video'],
        onClose: function() {
          this.destroy()
        }
    });
    modal.setContent(html);
    video();
    modal.open();

    function video() {
        document.dispatchEvent(new CustomEvent('stopAudio'));
        document.dispatchEvent(new CustomEvent('stopVideo', {'detail': player}));

        const videoEl = modal.modal.querySelector('.video-wrapper__video');
        const player = new YT.Player(videoEl, {
            videoId: videoEl.id,
            events: {
                'onReady': event => event.target.playVideo()
            }
        });

        document.addEventListener('stopVideo', e => stopVideo(e, player));
    }
});

setTimeout(() => {
    const el = document.querySelector('#popup-bottom-pc');
    if (!el) return;
    if (window.innerWidth < 1024) return;
    let modalOptsLocal = Object.assign({}, modalOpts);
    modalOptsLocal.cssClass = ['modal-left-bottom'];
    document.addEventListener('modal-open', e => {
        if(!e.target.classList.contains('modal-left-bottom')) return;
        document.body.classList.remove('tingle-enabled');
    });
    new tingle.modal(modalOptsLocal);
    modalInit(el, modalOptsLocal);
}, 1500);

setTimeout(() => {
    const el = document.querySelector('#popup-bottom-mobile');
    if (!el) return;
    if (window.innerWidth >= 1024) return;
    let modalOptsLocal = Object.assign({}, modalOpts);
    modalOptsLocal.cssClass = ['modal-mobile-bottom'];
    document.addEventListener('modal-open', e => {
        if(!e.target.classList.contains('modal-mobile-bottom')) return;
        document.body.classList.remove('tingle-enabled');
    });
    new tingle.modal(modalOptsLocal);
    modalInit(el, modalOptsLocal);
}, 1500);

document.addEventListener("eventModalbrif", function(event) {
    modalInit(modalBrif, modalOpts)
})
document.addEventListener("eventModalclip", function(event) {
    const modal = modalInit(modalClip, modalOpts)
    onlyNumber(modal.modal.querySelectorAll('[data-field="number"]'))
    maxValue(modal.modal.querySelectorAll('input[type="number"]'))
})
document.addEventListener("eventModalmediaplan", function(event) {
    modalInit(modalMediaPlan, modalOpts)
})
document.addEventListener("eventModalrequestcall", function(event) {
    let modalOptsLocal = Object.assign({}, modalOpts)
    modalOptsLocal.cssClass = ['modal-md']

    modalInit(modalRequestCall, modalOptsLocal)
})
document.addEventListener("eventModalrequestok", function(event) {
    let modalOptsLocal = Object.assign({}, modalOpts)
    modalOptsLocal.cssClass = ['modal-md']
    const modal = new tingle.modal(modalOptsLocal);
    modalInit(modalRequestOk, modalOptsLocal, {text: 'Закрыть', close: true})
})
document.addEventListener("eventModalstep1", function(event) {
    modalInit(modalStep1, modalOpts)
})
document.addEventListener("eventModalstep2", function(event) {
    modalInit(modalStep2, modalOpts)
})
document.addEventListener("eventModalstep3", function(event) {
    modalInit(modalStep3, modalOpts)
})
document.addEventListener("eventModalstep4", function(event) {
    modalInit(modalStep4, modalOpts)
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
