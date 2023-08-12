```javascript
let recognition;
let recognizing = false;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
} else {
  console.error('Speech recognition is not supported in this browser.');
}

recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
  recognizing = true;
};

recognition.onerror = function(event) {
  console.error('Speech recognition error: ' + event.error);
};

recognition.onend = function() {
  recognizing = false;
};

recognition.onresult = function(event) {
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      console.log('Final result: ' + event.results[i][0].transcript);
    } else {
      console.log('Interim result: ' + event.results[i][0].transcript);
    }
  }
};

function startRecognition() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  recognition.start();
}

function stopRecognition() {
  recognition.stop();
}

export { startRecognition, stopRecognition };
```