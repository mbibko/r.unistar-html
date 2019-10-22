export default function(els) {
    ;[].forEach.call(els, item => {
      const input = item.querySelector('input')
      const setInputWidth = () => input.value.length*9 + 25 +'px'
      if (input.classList.contains('has-type')) {
        input.style.width = setInputWidth()
        input.addEventListener('keyup', () => {
          input.style.width = setInputWidth()
        })
      }
      ;[].forEach.call(item.querySelectorAll("[data-button]"), button => {
          button.addEventListener('click', () => {
            input.value = parseInt(input.value) + (1 * +(button.dataset.button + 1))
            if(parseInt(input.value) < 0) { input.value = 0 }
          })
      })
    });
}
