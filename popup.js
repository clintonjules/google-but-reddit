document.addEventListener("DOMContentLoaded", () => {
    const strictlyReddit = document.getElementById("strictlyReddit");
    const showDiscussions = document.getElementById("showdDscusions"); // ✅ Corrected ID

    chrome.storage.local.get(["strictlyReddit", "showdDscusions"], (data) => {
        strictlyReddit.checked = data.strictlyReddit || false;
        showDiscussions.checked = data.showdDscusions || false;
    });

    strictlyReddit.addEventListener("change", () => {
        chrome.storage.local.set({ strictlyReddit: strictlyReddit.checked });
    });

    showDiscussions.addEventListener("change", () => {
        chrome.storage.local.set({ showdDscusions: showDiscussions.checked });
    });
});