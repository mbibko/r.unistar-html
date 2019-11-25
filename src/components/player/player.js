import { forEach } from '../../js/helpers'
import dragScrubber from './dragScrubber'
const audiojs = require('./plugin.js').audiojs

export default class {

    constructor(playerContainer) {
        this.playerContainer = playerContainer
        this.playerAudioEl = playerContainer.querySelector('.player-audio')
        this.playerTitleEl = playerContainer.querySelector('.player__title')
        this.playerProgress = playerContainer.querySelector('.player__progress')
        this.prevAudio = undefined
        this.audio = undefined
        this.audiojsClasses = {
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
    }

    init() {
        if (!this.playerContainer) return;

        const _this = this

        audiojs.events.ready(function() {
            _this.audio = audiojs.create(_this.playerAudioEl, {
                css: false,
                useFlash: false,
                createPlayer: _this.audiojsClasses
            });
        });

        dragScrubber(_this.playerProgress);

        this.events()
        this.playAudio(document.querySelectorAll('.js-play-audio'))

    }

    playAudio(elements) {

        const _this = this

        forEach(elements, item => {
            if (item.offsetWidth == 0 && item.offsetHeight == 0) return;
            
            item.addEventListener('click', e => {
                e.preventDefault();

                document.body.classList.add('player-open');
                if (_this.prevAudio && _this.prevAudio != item) {
                    _this.prevAudio.classList.remove('is-playing');
                }
                if (!item.classList.contains('is-playing')) {
                    item.classList.add('is-playing');
                    if (!item.classList.contains('is-played')) {
                        if (_this.prevAudio) {
                            _this.prevAudio.classList.remove('is-played');
                        }
                        item.classList.add('is-played');
                        _this.audio.trackEnded();
                    }
                    _this.audio.element.setAttribute('src', item.dataset.url)
                    if (item.dataset.playlist) {
                        _this.playerContainer.querySelector('[data-player="prev"]').style.display = 'block'
                        _this.playerContainer.querySelector('[data-player="next"]').style.display = 'block'
                    } else {
                        _this.playerContainer.querySelector('[data-player="prev"]').style.display = 'none'
                        _this.playerContainer.querySelector('[data-player="next"]').style.display = 'none'
                    }
                    _this.prevAudio = item
                    _this.audio.play();
                    _this.playerTitleEl.textContent = item.dataset.title
                } else {
                    _this.audio.pause();
                    item.classList.remove('is-playing');
                }
            });
        });

    }

    events() {
        const _this = this

        forEach(document.querySelectorAll('.js-player-stop'), item => {
            item.addEventListener('click', () => {
                if (_this.prevAudio) {
                    _this.prevAudio.classList.remove('is-playing');
                }
                document.body.classList.remove('player-open');
                _this.audio.pause();
            });
        });
        document.querySelector('[data-player="refresh"]').addEventListener('click', function() {
            _this.audio.trackEnded();
            _this.audio.play();
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
        document.addEventListener('mousedown', e => {
            if (e.target != _this.playerProgress) return
            document.addEventListener('mousemove', _this.audio.pause);
            document.addEventListener('mouseup', e => {
                document.removeEventListener('mousemove', _this.audio.pause)
                _this.audio.play()
            });
        });

        document.addEventListener('modalOpen', e => {
            _this.playAudio(e.target.querySelectorAll('.js-play-audio'))
        });

    }
}
