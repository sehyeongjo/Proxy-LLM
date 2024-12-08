function sendMessageToBackground(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "changeUrl") {
    var textArea = document.querySelector(".adn.ads>.gs>div:nth-child(3)");

    textArea.style.display = "none";

    var text = document.querySelector(".adn.ads>.gs>div:nth-child(3) span");

    console.log(text.textContent);

    async function getStorageValue(key) {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result[key]);
          }
        });
      });
    }

    try {
      const [selectedChoice, textareaValue] = await Promise.all([
        getStorageValue("selectedChoice"),
        getStorageValue("textareaValue"),
      ]);

      if (selectedChoice == "original") {
        textArea.style.display = "block";
      } else {
        const data = JSON.stringify({
          model: "<<TARGET_LLM_MODEL_NAME>>",
          prompt: text.textContent,
          choice: selectedChoice,
          custom: textareaValue,
        });

        console.log(data);

        const response = await sendMessageToBackground({
          method: "POST",
          action: "xhttp",
          url: "<<HOST_URL_INFORMATION>>",
          data: data,
        });

        if (response && response.response) {
          console.log("Response received:", response.response);
          text.textContent = response.response;
          textArea.style.display = "block";
        } else {
          console.error("No response received or an error occurred.");
        }
      }
    } catch (error) {
      console.error("Error retrieving storage values:", error);
    }
  }
});
