//this file wires up the audio source using the web audio api
//grab a reference to my audio element
let audio = document.getElementById('sound');
function init() {
    //create the web audio api audio context
    var audioContext = new AudioContext();
    //create a media element source node 
    var source = audioContext.createMediaElementSource(audio);
    //add the biquadfilter node
    var biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = 'allpass';
    //wire it all up
    source.connect(biquadFilter);
    biquadFilter.connect(audioContext.destination);
}

function killAudioSource(){
    source = null;
}

module.exports = {
    init : init,
    killAudioSource : killAudioSource
}
