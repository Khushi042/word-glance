window.onload = function() {
    chrome.storage.sync.get(['pressDuration', 'darkMode', 'dictionaryApi'], function(data) {
        document.getElementById('pressDuration').value = data.pressDuration || 5000;
        document.getElementById('darkMode').checked = data.darkMode || false;
        document.getElementById('dictionaryApi').value = data.dictionaryApi || 'freeDictionary';
    });
};

document.getElementById('save').addEventListener('click', function() {
    const duration = document.getElementById('pressDuration').value;
    const darkMode = document.getElementById('darkMode').checked;
    const dictionaryApi = document.getElementById('dictionaryApi').value;
    chrome.storage.sync.set({ pressDuration: duration, darkMode: darkMode, dictionaryApi: dictionaryApi }, function() {
        alert('Settings saved!');
    });
});
