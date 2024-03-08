// content.js

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text) {
    // Find the textarea element on the webpage and enter the text
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.value = message.text;
    }
  }
});
