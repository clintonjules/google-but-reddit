document.addEventListener("DOMContentLoaded", () => {
    const toggleCheckbox = document.getElementById("toggleOption");

    chrome.storage.local.get("isEnabled", (data) => {
        toggleCheckbox.checked = data.isEnabled !== false;
    });

    toggleCheckbox.addEventListener("change", () => {
        chrome.storage.local.set({ isEnabled: toggleCheckbox.checked });
    });
});