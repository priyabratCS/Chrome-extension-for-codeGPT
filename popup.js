const port = 1567; // Base port, adjust if your VS Code extension uses a different one

document.addEventListener('DOMContentLoaded', function() {
  const fileContentArea = document.getElementById('file-content');
  const sendButton = document.getElementById('send-to-chatgpt');

  // WebSocket Connection Logic
  function connectWebSocket() {
    const ws = new WebSocket(`ws://localhost:${port}`);

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    ws.addEventListener('message', (event) => {
      fileContentArea.value = event.data; // Display file content
    });

    ws.addEventListener('error', (err) => {
      console.error("WebSocket error:", err);
    });
  }

  // Sending to ChatGPT Logic
  sendButton.addEventListener('click', () => {
    const fileContent = fileContentArea.value;
    sendToChatGPT(fileContent); 
  });

  function sendToChatGPT(fileContent) {
    const chatInput = document.querySelector('textarea'); 

    const submitButton = document.querySelector('.send-button'); // Adjust selector if needed

    if (chatInput && submitButton) {
      chatInput.value = fileContent; 
      submitButton.click(); 
    } else {
      console.error('ChatGPT elements not found. Check if you are on a ChatGPT page.');
    }
  }

  // Initialize WebSocket connection
  connectWebSocket();
});
