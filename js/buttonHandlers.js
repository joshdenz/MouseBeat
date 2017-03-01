/*
 *  MouseBeat 
 *  Renderer Process Button Handlers 
 * 
 */
//Just felt a bit cleaner to have the button listeners partitioned into their own file.
let firstPlay = true;
let window;
document.getElementById('start').addEventListener('click', () => {
    console.log(audio.src);
    if (firstPlay) {
        dialog.showMessageBox({ message: "This is the sound of silence... (You need to choose a file first.)", buttons: ['Ok'] });
    } else {
        firstPlay = false;
        start();
    }
    
});
document.getElementById('stopBtn').addEventListener('click', () => {
    firstPlay = true;
    stop();
});
document.getElementById('btn-exit').addEventListener('click', () => {
    window = electron.remote.getCurrentWindow();
    window.close();
});
document.getElementById('btn-minimize').addEventListener('click', () => {
    window = electron.remote.getCurrentWindow();
    window.hide();
});
document.getElementById('fileSelect').addEventListener('click', () => {
    audio.pause();
    //use dialog here
    dialog.showOpenDialog({ properties: ['openFile'] }, (filenames) => {
        if (filenames === undefined) {
            return;
        }
        firstPlay = false;
        audio.src = filenames[0];
    });
});