console.log("Content script loaded at runtime.");


document.addEventListener("mouseup", (event) => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        console.log("Word selected:", selectedText);

        // Send the selected word to the background script
        chrome.runtime.sendMessage(
            { type: "lookupWord", word: selectedText },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message:", chrome.runtime.lastError.message);
                } else if (response && response.success) {
                    // Display the word definition in a popup
                    console.log("Definition received:",response.definition);
                    displayWordPopup(event,response.definition);
                } else {
                    console.error("No response or lookup failed.");
                }
            }
        );
    }
});

function displayWordPopup(event, data) {
    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.top = `${event.clientY + 5}px`; // Position slightly below the cursor
    popup.style.left = `${event.clientX + 5}px`; // Position slightly to the right of the cursor
    popup.style.padding = "10px";
    popup.style.background = "#fff";
    popup.style.border = "1px solid #000";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
    popup.style.zIndex = "10000"; // Ensure it's above other elements

    // Add the definition to the popup
    popup.textContent = `Definition: ${data.definition}`;

    // Add the popup to the document
    document.body.appendChild(popup);

    // Remove the popup after a few seconds
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 10000); // Removes popup after 10 seconds
}