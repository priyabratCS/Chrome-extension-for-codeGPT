const port = 1567; // Base port, adjust if your VS Code extension uses a different one

document.addEventListener("DOMContentLoaded", function () {
  const fileContentArea = document.getElementById("file-content");
  const sendButton = document.getElementById('enter-text-btn');

  // WebSocket Connection Logic
  function connectWebSocket() {
    const ws = new WebSocket(`ws://localhost:${port}`);

    ws.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    ws.addEventListener("message", (event) => {
      fileContentArea.value = event.data; // Display file content
      // Send content received from VS Code to content script of active tab
      //chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //const activeTab = tabs[0];
        //chrome.tabs.sendMessage(activeTab.id, { text: event.data });
      //});
    });
    

    ws.addEventListener("error", (err) => {
      console.error("WebSocket error:", err);
    });

    // Send text to active tab when button is clicked
    sendButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { text: fileContentArea.value });
      });
    });
  }

  // Initialize WebSocket connection
  connectWebSocket();
});

