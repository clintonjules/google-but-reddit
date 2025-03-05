chrome.webNavigation.onCommitted.addListener((details) => {
    chrome.storage.local.get(["strictlyReddit"], (data) => {
        const url = new URL(details.url);

        if (url.hostname === "www.google.com" && url.searchParams.has("q")) {
            let query = url.searchParams.get("q");

            // Prevent infinite redirection loops
            chrome.storage.session.get("lastQuery", (sessionData) => {
                if (sessionData.lastQuery === query) {
                    return; // Stop reloading the same query
                }

                let modifiedQuery = query;

                if (data.strictlyReddit) {
                    // Apply strict mode: Add "site:reddit.com" and "reddit" if missing
                    if (!modifiedQuery.toLowerCase().includes("reddit")) {
                        modifiedQuery += " reddit";
                    }
                    modifiedQuery = `site:reddit.com ${modifiedQuery}`;
                }

                if (modifiedQuery !== query) {
                    url.searchParams.set("q", modifiedQuery);

                    // Store the modified query to prevent an infinite loop
                    chrome.storage.session.set({ lastQuery: modifiedQuery }, () => {
                        chrome.tabs.update(details.tabId, { url: url.toString() });
                    });
                }
            });
        }
    });
}, { url: [{ hostEquals: "www.google.com" }] });