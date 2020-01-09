import {forEach, stopVideo} from "./helpers";

document.addEventListener('onYouTubeIframeAPIReady', () => {
    console.log('onYouTubeIframeAPIReady');
    [].forEach.call(document.querySelectorAll('.b-video'), item => {
        const coverEl = item.querySelector('.b-video__cover');
        const videoEl = item.querySelector('.b-video__video');
        if (!videoEl) return;
        coverEl.addEventListener('click', () => {
            console.log('cover click');
            const player = new YT.Player(videoEl, {
                videoId: videoEl.id,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            function onPlayerReady(event) {
                // console.log('onPlayerReady');
                event.target.playVideo();
                item.classList.add('is-playing');
            }

            function onPlayerStateChange(event) {
                // console.log(event.data);
                if (event.data === 1) {
                    document.dispatchEvent(new CustomEvent('stopAudio'));
                    document.dispatchEvent(new CustomEvent('stopVideo', {'detail': player}));
                }
            }

            document.addEventListener('stopVideo', e => stopVideo(e, player));
        });

    });
});
