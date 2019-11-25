import player from './player.js'

const playerContainer = document.querySelector('.player')
if (playerContainer) {
    new player(playerContainer).init()
}
