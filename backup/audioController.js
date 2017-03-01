let audio = document.getElementById('sound');


function start() {
    let audioFile = document.getElementById('file').files[0];

    var audioContext = new AudioContext();
    var source = audioContext.createBufferSource();
    var biquadFilter = audioContext.createBiquadFilter();

    audioContext.decodeAudioData(audioFile).then(function (decodedAudio) {
        source.buffer = decodedAudio;
        source.connect(audioContext.destination);
        source.start();
    });
}

function stop(){
    source.stop();
}

module.exports = {
    start: start,
    stop : stop
}