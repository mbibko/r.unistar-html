export default function (els) {
    if (!els) return;
    ;[].forEach.call(els, item => {
        const form = item.closest("form");
        // console.log(form);
        const input = item.querySelector('input');
        const setInputWidth = () => input.value.length * 9 + 25 + 'px';
        if (input.classList.contains('has-type')) {
            input.style.width = setInputWidth();
            input.addEventListener('keyup', () => {
                input.style.width = setInputWidth()
            })
        }
        input.addEventListener('change', () => {
            const min_val = input.getAttribute("min");
            if (parseInt(input.value) < min_val) {
                input.value = min_val
            }
        });
        ;[].forEach.call(item.querySelectorAll("[data-button]"), button => {
            button.addEventListener('click', () => {
                input.value = (parseInt(input.value) + parseInt(button.dataset.button + 1)).toString();
                if (parseInt(input.value) < 0) {
                    input.value = "0"
                }
                input.dispatchEvent(new CustomEvent('counter-changed'));
            })
        })
    });
}
