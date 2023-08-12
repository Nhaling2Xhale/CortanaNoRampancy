const speechSynthesis = window.speechSynthesis;

function synthesizeSpeech(text) {
    return new Promise((resolve, reject) => {
        if (!speechSynthesis) {
            reject(new Error('Speech synthesis is not supported in this browser'));
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Microsoft Zira Desktop - English (United States)');
        utterance.onend = resolve;
        utterance.onerror = reject;

        speechSynthesis.speak(utterance);
    });
}

export { synthesizeSpeech };