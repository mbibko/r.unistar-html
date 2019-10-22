import { forEach } from '../../js/helpers'
const audiojs = require('./plugin.js').audiojs

audiojs.events.ready(function() {
    const playerContainer = document.querySelector('.player')
    const audioEl = playerContainer.querySelector('.player-audio');
    const titleEl = playerContainer.querySelector('.player__title')
    let prevAudio;

    if (!audioEl) return;
    const audio = audiojs.create(audioEl, {
        css: false,
        useFlash: false,
        createPlayer: {
            markup: false,
            playPauseClass: 'player__play',
            scrubberClass: 'player__scrubber',
            progressClass: 'player__progress',
            loaderClass: 'player__loaded',
            // timeClass: 'timeZ',
            durationClass: 'player__time_duration',
            playedClass: 'player__time_played',
            errorMessageClass: 'player__error',
            playingClass: 'is-playing',
            loadingClass: 'is-loading',
            errorClass: 'is-error'
        }
    });

    forEach(document.querySelectorAll('.js-play-audio'), item => {
        item.addEventListener('click', e => {
            e.preventDefault();

            document.body.classList.add('player-open');
            if (prevAudio && prevAudio != item) {
                prevAudio.classList.remove('is-playing');
            }
            if (!item.classList.contains('is-playing')) {
                item.classList.add('is-playing');
                if (!item.classList.contains('is-played')) {
                    if (prevAudio) {
                        prevAudio.classList.remove('is-played');
                    }
                    item.classList.add('is-played');
                    audio.trackEnded();
                }
                audio.element.setAttribute('src', item.dataset.url)
                if (item.dataset.playlist) {
                    playerContainer.querySelector('[data-player="prev"]').style.display = 'block'
                    playerContainer.querySelector('[data-player="next"]').style.display = 'block'
                } else {
                    playerContainer.querySelector('[data-player="prev"]').style.display = 'none'
                    playerContainer.querySelector('[data-player="next"]').style.display = 'none'
                }
                prevAudio = item
                audio.play();
                titleEl.textContent = item.dataset.title
            } else {
                audio.pause();
                item.classList.remove('is-playing');
            }
        });
    });

    document.querySelector('.player__close').addEventListener('click', () => {
        prevAudio.classList.remove('is-playing');
        document.body.classList.remove('player-open');
        audio.pause();
    });

    document.querySelector('[data-player="refresh"]').addEventListener('click', function() {
        audio.trackEnded();
        audio.play();
    });

    document.querySelector('[data-player="next"]').addEventListener('click', function() {
        const currentEl = document.querySelector('.js-play-audio.is-playing')
        const playlist = currentEl.dataset.playlist
        const playlistEls = document.querySelectorAll(`[data-playlist="${playlist}"]`)
        let nextEl
        forEach(playlistEls, (item, index) => {
            if (item == currentEl) {
                nextEl = playlistEls.length-1 == index ? playlistEls[0] : playlistEls[index+1]
                nextEl.click()
                return
            }
        })
    });

    document.querySelector('[data-player="prev"]').addEventListener('click', function() {
        const currentEl = document.querySelector('.js-play-audio.is-playing')
        const playlist = currentEl.dataset.playlist
        const playlistEls = document.querySelectorAll(`[data-playlist="${playlist}"]`)
        let prevEl
        forEach(playlistEls, (item, index) => {
            if (item == currentEl) {
                prevEl = index == 0 ? playlistEls[playlistEls.length-1] : playlistEls[index-1]
                prevEl.click()
                return
            }
        })
    });

    const playerPause = e => {
        audio.pause()
    }

    const playerProgress = document.querySelector('.player__progress')

    document.addEventListener('mousedown', e => {
        if (!isDragOnEl(e)) return
        document.addEventListener('mousemove', playerPause);
        document.addEventListener('mouseup', e => {
            document.removeEventListener('mousemove', playerPause)
            audio.play()
        });
    });


    dragElement(playerProgress);
    
    function isDragOnEl(event) {
        return event.target == playerProgress
    }
    function dragElement(elmnt) {
        var oldDistance = 0,
            newDistance = 0;
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            if (!isDragOnEl(e)) return

            // get the mouse cursor position at startup:
            oldDistance = e.clientX;
            document.onmouseup = closeDragElement;

            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();

            // calculate the new cursor position:
            newDistance = e.clientX - oldDistance;
            oldDistance = e.clientX;

            // set the element's new position:
            const newWidth = (elmnt.offsetWidth + newDistance) + 'px'
            elmnt.style.width = (elmnt.offsetWidth >= elmnt.parentElement.offsetWidth) && newDistance > 0 ? '100%' : newWidth
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});

