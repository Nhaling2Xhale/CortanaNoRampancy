```javascript
import { startRecognition, stopRecognition } from './libraries/speechRecognition.js';
import { synthesizeSpeech } from './libraries/speechSynthesis.js';
import { playAudio } from './libraries/cortanaAudio.js';
import { executeCommand } from './libraries/cortanaCommands.js';

document.addEventListener('DOMContentLoaded', function() {
    let startButton = document.getElementById('startButton');
    let stopButton = document.getElementById('stopButton');

    startButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'startCommand'}, function(response) {
            startRecognition();
            synthesizeSpeech('Cortana is listening...');
            playAudio('start');
        });
    });

    stopButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'stopCommand'}, function(response) {
            stopRecognition();
            synthesizeSpeech('Cortana has stopped listening.');
            playAudio('stop');
        });
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'command') {
        executeCommand(request.command);
    }
});
```