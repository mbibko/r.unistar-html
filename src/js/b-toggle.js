[].forEach.call(document.querySelectorAll('.b-toggle'), item => {
  item.children[0].style.setProperty('--max-height', item.children[0].scrollHeight + 'px')
  item.addEventListener('click', () => {
    [].forEach.call(item.querySelectorAll('iframe'), iframe => {
        iframe.setAttribute('src', iframe.dataset.src)
    })
    item.classList.toggle('is-active')
  })
});