export default function (els) {
    if (!els) return;
    ;[].forEach.call(els, item => {
        const form = item.closest("form");
        // console.log(form);
        const input = item.querySelector('input');
        const setInputWidth = () => input.value.length * 9 + 25 + 'px';

        input.addEventListener('keyup', () => {
            input.style.width = setInputWidth()
        })
        function setInputWidthFunc() {
          if (input.classList.contains('has-type')) {
              input.style.width = setInputWidth();
          }
        }
        setInputWidthFunc()
        input.addEventListener('change', () => {
            const min_val = input.getAttribute("min");
            if (parseInt(input.value) < min_val) {
                input.value = min_val
            }
            setInputWidthFunc()
        });
        ;[].forEach.call(item.querySelectorAll("[data-button]"), button => {
            button.addEventListener('click', () => {
                const max_val = input.getAttribute("max");
                input.value = (parseInt(input.value) + parseInt(button.dataset.button + 5)).toString();
                if (parseInt(input.value) < 0) {
                    input.value = "0"
                }
                if (parseInt(input.value) > max_val) {
                    input.value = String(parseInt(max_val) - 1)
                }
                setInputWidthFunc()
                input.dispatchEvent(new CustomEvent('counter-changed'));
                input.dispatchEvent(new Event('change'));
            })
        })
    });
}
