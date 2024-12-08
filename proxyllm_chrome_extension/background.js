chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // 초기값 설정
    chrome.storage.local.set(
      { selectedChoice: "default", textareaValue: "" },
      () => {
        console.log("Initial values have been set.");
      }
    );
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tab.id, { action: "changeUrl" }, (response) => {
      console.log(response?.status);
    });
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "xhttp") {
    const method = request.method ? request.method.toUpperCase() : "GET";
    const options = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: method === "POST" ? request.data : undefined,
    };

    fetch(request.url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        sendResponse(data); // Send parsed JSON object back
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        sendResponse({ error: error.message }); // Handle errors gracefully
      });

    return true; // Keeps the message channel open for async response
  }

  if (request.type === "saveRadioData") {
    chrome.storage.local.set({ selectedChoice: request.data }, () => {
      console.log("Data saved in background:", request.data);
    });
  }

  if (request.type === "saveTextareaValue") {
    chrome.storage.local.set({ textareaValue: request.data }, () => {
      console.log("Data saved in background:", request.data);
    });
  }
});
