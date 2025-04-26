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
    try {
      var textArea = document.querySelector(".adn.ads>.gs>div:nth-child(3)");

      textArea.style.display = "none";

      let loadingDiv = document.getElementById("loading-div");

      if (loadingDiv) {
        loadingDiv.style.display = "block";
      } else {
        textArea.insertAdjacentHTML(
          "afterend",
          "<div id='loading-div' style='display: block;'>Waiting for a response.</div>"
        );
      }

      var text = document.querySelector(".adn.ads>.gs>div:nth-child(3)");

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
            prompt: text.innerText.replace(/\n/g, ""),
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
            document.querySelector("#loading-div").style.display = "none";
            textArea.style.display = "block";
          } else {
            console.error("No response received or an error occurred.");
          }
        }
      } catch (error) {
        console.error("Error retrieving storage values:", error);
      }
    } catch (error) {
      console.error("Error in changeUrl action:", error);
      sendResponse({ status: "error", message: error.message });
    }
    return true;
  }
});
