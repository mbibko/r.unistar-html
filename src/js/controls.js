import {forEach, maxValue, minValue, mobileDevice, onlyNumber} from "./helpers";
import select from "../components/customSelect/customSelect";
import phoneMask from "./phone-mask";
import counter from './b-counter.js';

export function controls(forms) {
    forEach(forms, form => {
        if (form.classList.contains('init')) return;

        onlyNumber(form.querySelectorAll('[data-field="number"]'));
        maxValue(form.querySelectorAll('input[type="number"]'));
        minValue(form.querySelectorAll('input[type="number"]'));
        select(form.querySelectorAll('.select'));
        phoneMask(form.querySelectorAll('[data-field="phone"]'));
        counter(form.querySelectorAll('.b-counter'));
        if (mobileDevice()) {
            forEach(form.querySelectorAll('.select[multiple]'), select => {
                if (select.previousElementSibling && select.previousElementSibling.tagName === 'LABEL') return;
                select.insertAdjacentHTML('beforebegin', `<label>${select.options[0].text}</label>`);
            });
        }
        form.classList.add('init');
    });
}