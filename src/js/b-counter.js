export default function(els) {
    ;[].forEach.call(els, item => {
      const input = item.querySelector('input');
      const setInputWidth = () => input.value.length*9 + 25 +'px';
      if (input.classList.contains('has-type')) {
        input.style.width = setInputWidth();
        input.addEventListener('keyup', () => {
          input.style.width = setInputWidth()
        })
      }
      ;[].forEach.call(item.querySelectorAll("[data-button]"), button => {
          button.addEventListener('click', () => {
            var max_val = input.getAttribute("max");
            var min_val = input.getAttribute("min");
            var old_val = parseInt(input.value);
            input.value = old_val + (1 * +(button.dataset.button + 1));
            if(parseInt(input.value) < 0) { input.value = 0 }
            if(parseInt(input.value) < min_val || parseInt(input.value) > max_val) { input.value = old_val }
            let event = new Event("input");
            input.dispatchEvent(event);
          })
      })
    });
}
