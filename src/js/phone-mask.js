import {forEach} from "./helpers";
const vanillaTextMask = require("vanilla-text-mask/dist/vanillaTextMask.js");

export default function(els) {
    if(!els) return;
    forEach(els, el => {
        el.addEventListener('focus', () => {
          if (el.classList.contains('activated')) return;
          el.classList.add("activated");
          el.value = '+375 ('
        });

        vanillaTextMask.maskInput({
          inputElement: el,
          mask: ['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
        });
    });
}
