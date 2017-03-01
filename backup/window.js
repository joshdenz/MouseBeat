//electron gives access to the electron object and all of the nice apis that comes with it.  I could get more 
//finegrained here with something like const {remote, ipcRenderer} = require('electron'); but I
//didnt think it was necessary at this point
const electron = require('electron');
const {dialog} = require('electron').remote;
//mousey is the js module I wrote to track the mouse movement
const mouse = require('./mousey/mousey.js');
const audioController = require('./audio.js');
//define some variables
let audioFile;
let firstStart = true;
let audio = document.getElementById('sound');
/*
(function(){
    audioController.init();
})();
*/
//click handlers to start and stop the music loop
document.getElementById('start').addEventListener('click', () => {
    if (firstStart) {
        firstStart = false;
        start();
    }
    if (audio.src) {
        electron.ipcRenderer.send('start');
        console.log(audio.src);
    }
});
document.getElementById('stop').addEventListener('click', () => {
    stop();
})
document.getElementById('btn-exit').addEventListener('click', () => {
    var window = electron.remote.getCurrentWindow();
    window.close();
});
document.getElementById('fileSelect').addEventListener('click', () => {
    //use dialog here
    dialog.showOpenDialog({ properties: ['openFile'] }, (filenames) => {
        if (filenames === undefined) {
            return;
        }
        audio.src = filenames[0];
        console.log(audio.src);
    });
})

//start function gets the whole thing moving.
function start() {
    audioController.killAudioSource();
    //initiallizes the audio handler.  links up the source and filters
    audioController.init();
    //start the loop
    electron.ipcRenderer.send('start');
    //minimize to the system tray
    electron.remote.BrowserWindow.getFocusedWindow().minimize();
}

//stop function does just what it says on the tin
function stop() {
    electron.ipcRenderer.send('stop');
    audio.pause();
    audio.src = null;
}

//electron message handler.  On receiving the check-mouse-pos message, the script fires the corresponding action
electron.ipcRenderer.on('check-mouse-pos', (event, arg) => {
    let mouseMoving = mouse.isMouseMoving();

    if (mouseMoving) {
        if (audio.src == null) {return}
            audio.play();
        
    } else {
        if (!audio.paused) {
            audio.playbackRate = 1.0;
            audio.pause();
        }
    }
    //this line sets the playbackRate of the music.  Super basic and leaves a lot of room for improvement.  More 
    //proof of concept than anything
    audio.playbackRate = (mouse.mouseSpeed() / 20).clamp(0.5, 4);
})

//this extends the javascript number prototype to include a clamp function
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};