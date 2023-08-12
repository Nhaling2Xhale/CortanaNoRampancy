import { speechRecognition, startRecognition, stopRecognition } from './libraries/speechRecognition.js';
import { speechSynthesis, synthesizeSpeech } from './libraries/speechSynthesis.js';
import { cortanaAudio, playAudio } from './libraries/cortanaAudio.js';
import { cortanaCommands, executeCommand } from './libraries/cortanaCommands.js';

// Initialize speech recognition
speechRecognition.onstart = function() {
  console.log('Voice recognition started.');
}

speechRecognition.onresult = function(event) {
  const last = event.results.length - 1;
  const command = event.results[last][0].transcript;

  console.log('Received voice command: ' + command);

  // Execute the command
  executeCommand(command);
}

// Initialize speech synthesis
speechSynthesis.onstart = function(event) {
  console.log('Speech synthesis started.');
}

speechSynthesis.onend = function(event) {
  console.log('Speech synthesis ended.');
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === 'startCommand') {
    startRecognition();
  } else if (request.command === 'stopCommand') {
    stopRecognition();
  }
});

// Start the voice recognition when the page loads
window.onload = function() {
  startRecognition();
}