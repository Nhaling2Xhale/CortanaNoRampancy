const cortanaCommands = {
    "open google": function() {
        window.open('https://www.google.com', '_blank');
    },
    "open youtube": function() {
        window.open('https://www.youtube.com', '_blank');
    },
    "search wikipedia for": function(query) {
        window.open(`https://en.wikipedia.org/wiki/${query}`, '_blank');
    },
    // Add more commands as needed
};

function executeCommand(command) {
    const commandFunc = cortanaCommands[command];
    if (commandFunc) {
        commandFunc();
    } else {
        // Handle unrecognized command
        console.log(`Command "${command}" not recognized.`);
    }
}

export { cortanaCommands, executeCommand };