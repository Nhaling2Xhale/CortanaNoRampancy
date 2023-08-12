```javascript
import { speechRecognition, startRecognition, stopRecognition } from './libraries/speechRecognition.js';
import { speechSynthesis, synthesizeSpeech } from './libraries/speechSynthesis.js';
import { cortanaAudio, playAudio } from './libraries/cortanaAudio.js';
import { cortanaCommands, executeCommand } from './libraries/cortanaCommands.js';
import { optionsSchema, saveOptions, loadOptions } from './options.js';

let options = loadOptions(optionsSchema);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'startCommand':
      startRecognition(speechRecognition);
      break;
    case 'stopCommand':
      stopRecognition(speechRecognition);
      break;
    case 'updateOptions':
      options = saveOptions(request.data, optionsSchema);
      break;
    default:
      console.error(`Unrecognized message type: ${request.type}`);
  }
});

speechRecognition.onresult = (event) => {
  const lastResultIndex = event.results.length - 1;
  const command = event.results[lastResultIndex][0].transcript;

  executeCommand(command, cortanaCommands, options)
    .then(response => {
      synthesizeSpeech(speechSynthesis, response);
      playAudio(cortanaAudio, response);
    })
    .catch(error => console.error(`Failed to execute command: ${error}`));
};

speechRecognition.onerror = (event) => {
  console.error(`Speech recognition error: ${event.error}`);
};
```