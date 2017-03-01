//grab a reference to the audio element
let audio = document.getElementById('sound');
function init() {
    //create the web audio api audio context
    var audioContext = new AudioContext();
    //create a media element source node 
    var source = audioContext.createMediaElementSource(audio);
    //add the biquadfilter node
    biquadFilter = audioContext.createBiquadFilter();
    biquadFilter.type = 'allpass';
    //wire it all up
    source.connect(biquadFilter);
    biquadFilter.connect(audioContext.destination);
}

module.exports = init;
