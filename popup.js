const element = document.getElementById("myElement"); {
if(element) {
  element.addEventListener("click", () => {
    console.log("Element clicked!");
  });
} else{
  console.error("Element with ID 'myElement' not found.");
}
    const word = document.getElementById("wordInput").value.trim().toLowerCase();
    console.log("Sending message to content script");
    chrome.runtime.sendMessage({ type: "lookupWord", word: word }, function(response) {
      console.log(response);
      const resultDisplay = document.getElementById("result");
  
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, { type: "lookupWord", word: "example" }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error: Could not connect to content script:", chrome.runtime.lastError.message);
            } else {
              console.log("Response from content script:", response);
            }
          });
        } else{
          console.error("No active tab found.");
        }
      });
    })
  }
