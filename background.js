chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");
});

let dictionaryData = {};

console.log("Fetching dictionary data from:",'./dictionary_data.json')
fetch('./dictionary_data.json')
    .then(response =>{
        console.log("Fetch Response:",response);
       if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
       }
       return response.json();
    })
    .then(data => {
        dictionaryData = data; // Load dictionary data into memory
        console.log("Dictionary data loaded successfully.");
    })
    .catch(error => console.error("Failed to load dictionary data:", error));

    chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { type: "testMessage", content: "Hello, content script!" },
                (response) => {
                    if (chrome.runtime.lastError) {
                        // console.error("Error sending message:", chrome.runtime.lastError.message);
                    } else {
                        console.log("Response from content script:", response);
                    }
                }
            );
        } else {
            console.error("No active tab found to send the message");
        }
    });
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("Message received in background script:", message);
    
        if (message.type === "lookupWord") {
            const word = message.word;
    
            const apiUrl =`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
            console.log(`Fetching definition for "${word}" from API`,apiUrl);
            fetch(apiUrl).then((response) =>
            {
                if(! response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("API response:",data);
                const definition = data[0]?.meanings[0]?.definition[0]?.definition ||`No definition found for "${word}"`;  
                console.log(`Definition for "${word}":`,definition);
                sendResponse({ success: true, definition});
            })
            .catch((error) => {
                console.error("Error fetching definition:", error);
                sendResponse({ success: false, error: "Failed to fetch definition."});
            });
            
        return true;
        }
    });
