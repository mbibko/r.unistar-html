import SimpleBar from 'simplebar';

import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import './customSelect.sass'
import {forEach, mobileDevice} from "../../js/helpers";


export default function (selectEls) {
    if (mobileDevice()) return;
    forEach(selectEls, item => {
        if (item.offsetParent === null) return;
        const select = new Choices(item, {
            searchEnabled: false,
            renderSelectedChoices: 'always',
            itemSelectText: '',
            noResultsText: 'ничего не найдено',
            shouldSort: false,
            resetScrollPosition: false,
            callbackOnInit: function () {
                const self = this;
                // console.log(self.dropdown.element.children[0])
                // SimpleBar not working after select change
                // new SimpleBar(self.dropdown.element.children[0], {});
                if (self.passedElement.element.multiple) {
                    // self.input.placeholder = self.passedElement.element.getAttribute('placeholder') || '';
                }
            }
        });
        select.passedElement.element.addEventListener('change', function (event) {
                // console.log(select.passedElement.element.type)
                if (select.passedElement.element.type === 'select-multiple') {
                    select.input.placeholder = 'Выбрано: ' + (select.getValue(true).length - 1);
                }
                select.containerOuter.element.classList.add('is-changed');
            }
        );
        if (select.passedElement.element.type === 'select-multiple') {
            select.passedElement.element.addEventListener('choice', function (event) {
                select.getValue(true).forEach(item => {
                    if (item !== event.detail.choice.value) return;
                    setTimeout(() => {
                        select.removeActiveItemsByValue(event.detail.choice.value);
                        select.input.placeholder = 'Выбрано: ' + select.getValue().length;
                    }, 100)
                });
            });
        }
    });
}
