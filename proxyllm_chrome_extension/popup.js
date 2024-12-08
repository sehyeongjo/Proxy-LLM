document.addEventListener("DOMContentLoaded", function () {
  const radioButtons = document.querySelectorAll('input[name="sentiment"]');
  const customTextArea = document.querySelector("#textarea-div>textarea");

  // restore radio button settings
  chrome.storage.local.get("selectedChoice", function (data) {
    const savedValue = data.selectedChoice;
    if (savedValue) {
      const radioToSelect = document.querySelector(
        `input[name="sentiment"][value="${savedValue}"]`
      );
      if (radioToSelect) {
        radioToSelect.checked = true;
        console.log("Radio button state restored:", savedValue);
      }
    }

    checkCustom(customTextArea, savedValue);
  });

  // save radio button settings
  radioButtons.forEach(function (radio) {
    radio.addEventListener("change", function () {
      chrome.storage.local.set({ selectedChoice: radio.value }, function () {
        console.log("Radio button state saved:", radio.value);
      });
      chrome.runtime.sendMessage({ type: "saveRadioData", data: radio.value });
      checkCustom(customTextArea, radio.value);
    });
  });

  // Load saved values and display them in textarea
  chrome.storage.local.get("textareaValue", function (result) {
    if (result.textareaValue) {
      customTextArea.value = result.textareaValue;
    }
  });

  // Save whenever the value changes
  customTextArea.addEventListener("input", function () {
    const value = customTextArea.value;
    chrome.storage.local.set({ textareaValue: value }, function () {
      console.log("Textarea value saved:", value);
    });
    chrome.runtime.sendMessage({ type: "saveTextareaValue", data: value });
  });
});

function checkCustom(customTextArea, savedValue) {
  if (savedValue != "custom") {
    customTextArea.disabled = true;
  } else {
    customTextArea.disabled = false;
  }
}
