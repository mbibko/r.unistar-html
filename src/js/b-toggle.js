[].forEach.call(document.querySelectorAll('.b-toggle'), item => {
  if (item.children[0].scrollHeight <= item.scrollHeight) return;
  item.classList.add('is-init')
  item.children[0].style.setProperty('--max-height', item.children[0].scrollHeight + 'px')
  item.addEventListener('click', () => {
    [].forEach.call(item.querySelectorAll('iframe'), iframe => {
        iframe.setAttribute('src', iframe.dataset.src)
    })
    item.classList.toggle('is-active')
  })
});