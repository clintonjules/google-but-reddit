document.addEventListener("DOMContentLoaded", () => {
    const strictlyReddit = document.getElementById("strictlyReddit");
    const showSidebar = document.getElementById("showSidebar");

    // Load saved states
    chrome.storage.local.get(["strictlyReddit", "showSidebar"], (data) => {
        strictlyReddit.checked = data.strictlyReddit || false;
        showSidebar.checked = data.showSidebar || false;
    });

    // Save state on change
    strictlyReddit.addEventListener("change", () => {
        chrome.storage.local.set({ strictlyReddit: strictlyReddit.checked });
    });

    showSidebar.addEventListener("change", () => {
        chrome.storage.local.set({ showSidebar: showSidebar.checked });
    });
});