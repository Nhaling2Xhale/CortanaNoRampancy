const optionsSchema = {
  voiceCommand: {
    default: true,
    type: 'boolean'
  },
  cortanaAudio: {
    default: true,
    type: 'boolean'
  }
};

function saveOptions() {
  let options = {};
  for (let key in optionsSchema) {
    let el = document.getElementById(key);
    if (el.type === 'checkbox') {
      options[key] = el.checked;
    } else {
      options[key] = el.value;
    }
  }
  chrome.storage.sync.set(options);
}

function loadOptions() {
  chrome.storage.sync.get(Object.keys(optionsSchema), function (result) {
    for (let key in optionsSchema) {
      let el = document.getElementById(key);
      if (el.type === 'checkbox') {
        el.checked = result[key] !== undefined ? result[key] : optionsSchema[key].default;
      } else {
        el.value = result[key] !== undefined ? result[key] : optionsSchema[key].default;
      }
    }
  });
}

document.getElementById('optionsForm').addEventListener('submit', function (e) {
  e.preventDefault();
  saveOptions();
});

loadOptions();