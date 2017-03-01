/*
 *  MouseBeat
 *  Renderer Process Main Script
 *  
 */
const electron = require('electron');
const {dialog} = require('electron').remote;
const mouse = require('../js/mousey.js');
const buttonHandlers = require('../js/buttonHandlers.js');
const audioInit = require('../js/audio.js');
let audio = document.getElementById('sound');

//audio initialization
(function () {
    audioInit();
})();

//start function gets the whole thing moving.
function start() {
    //start the loop
    electron.ipcRenderer.send('start');
    //minimize to the system tray
    electron.remote.BrowserWindow.getFocusedWindow().minimize();
}

//stop function does just what it says on the tin
function stop() {
    electron.ipcRenderer.send('stop');
    audio.pause();
    audio.src = "";
}

//the timer function in the main process is firing this event
electron.ipcRenderer.on('check-mouse-pos', (event, arg) => {
    let mouseMoving = mouse.isMouseMoving();

    if (mouseMoving) {
        audio.play();
    } else {
        if (!audio.paused) {
            audio.pause();
        }
    }
    //this line sets the playbackRate of the music.
    audio.playbackRate = (mouse.mouseSpeed() / 20).clamp(0.5, 4);
})

//this extends the javascript number prototype to include a clamp function
//there is probably a better way to do this, but I am not aware of it at the time of writing
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};