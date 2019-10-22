[].forEach.call(document.querySelectorAll('.b-video'), item => {
  const cover = item.querySelector('.b-video__cover')
  const video = item.querySelector('.b-video__video')
  if(!cover) return;
  cover.addEventListener('click', () => {
    video.setAttribute('src', video.getAttribute('data-src'))
    video.src += "?autoplay=1"
    setTimeout(() => {
        item.classList.add('is-playing')
    }, 1000)
  });
});
