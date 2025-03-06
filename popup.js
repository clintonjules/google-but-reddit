document.addEventListener("DOMContentLoaded", () => {
    const strictlyReddit = document.getElementById("strictlyReddit");
    const showDiscussions = document.getElementById("showDiscussions");

    chrome.storage.local.get(["strictlyReddit", "showDiscussions"], (data) => {
        strictlyReddit.checked = data.strictlyReddit || false;
        showDiscussions.checked = data.showDiscussions || false;
    });

    strictlyReddit.addEventListener("change", () => {
        chrome.storage.local.set({ strictlyReddit: strictlyReddit.checked });
    });

    showDiscussions.addEventListener("change", () => {
        chrome.storage.local.set({ showDiscussions: showDiscussions.checked });
    });
});