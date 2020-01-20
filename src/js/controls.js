import {forEach, maxValue, minValue, mobileDevice, onlyNumber} from "./helpers";
import select from "../components/customSelect/customSelect";
import phoneMask from "./phone-mask";
import counter from './b-counter.js';

export function controls(forms) {
    forEach(forms, form => {
        if (form.closest('.modal-content')) return;
        if (form.classList.contains('init')) return;
        onlyNumber(form.querySelectorAll('[data-field="number"]'));
        maxValue(form.querySelectorAll('input[type="number"]'));
        minValue(form.querySelectorAll('input[type="number"]'));
        select(form.querySelectorAll('.select'));
        phoneMask(form.querySelectorAll('[data-field="phone"]'));
        counter(form.querySelectorAll('.b-counter'));
        if (mobileDevice()) {
            forEach(form.querySelectorAll('.select[multiple]'), select => {
                select.addEventListener('change', () => {
                    select.options[0].selected = false
                });
                (function () {
                    if (select.previousElementSibling && select.previousElementSibling.tagName === 'LABEL') return;
                    select.insertAdjacentHTML('beforebegin', `<label>${select.options[0].text}</label>`);
                })();
            });
        }
        forEach(document.querySelectorAll('.form-control'), item => {
            item.addEventListener('change', () => {
                if(item.value.length > 0) {
                    item.classList.add('is-filled')
                } else {
                    item.classList.remove('is-filled')
                }
            })
        });
        form.classList.add('init');
    });
}