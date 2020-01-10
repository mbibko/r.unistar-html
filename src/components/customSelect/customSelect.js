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
                select.input.placeholder = 'Выбрано: ' + select.getValue(true).length;
                select.containerOuter.element.classList.add('is-changed');
            },
            false,
        );
    });
}
