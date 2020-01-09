import {stopVideo} from "./helpers";

[].forEach.call(document.querySelectorAll('.b-toggle'), item => {
  if (item.children[0].scrollHeight <= item.scrollHeight) return;
  item.classList.add('is-init')
  item.children[0].style.setProperty('--max-height', item.children[0].scrollHeight + 'px');
  const videos = item.querySelectorAll('.video-wrapper__video');
  item.addEventListener('click', () => {
    [].forEach.call(videos, videoEl => {
      if (item.classList.contains('is-was-active')) return;
      const player = new YT.Player(videoEl, {
        videoId: videoEl.id,
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
      function onPlayerStateChange(event) {
        // console.log(event.data);
        if (event.data === 1) {
          document.dispatchEvent(new CustomEvent('stopAudio'));
          document.dispatchEvent(new CustomEvent('stopVideo', {'detail': player}));
        }
      }
      document.addEventListener('stopVideo', e => stopVideo(e, player));
    });
    item.classList.toggle('is-active')
    item.classList.add('is-was-active')
  });
});