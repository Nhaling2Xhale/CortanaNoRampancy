const cortanaAudio = {};

cortanaAudio.audioContext = new (window.AudioContext || window.webkitAudioContext)();

cortanaAudio.playAudio = function(audioBuffer) {
    const source = cortanaAudio.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(cortanaAudio.audioContext.destination);
    source.start(0);
};

cortanaAudio.loadAudio = function(url, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        cortanaAudio.audioContext.decodeAudioData(request.response, function(buffer) {
            callback(buffer);
        });
    };
    request.send();
};

export default cortanaAudio;