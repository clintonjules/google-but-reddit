chrome.storage.local.get(["showSidebar", "strictlyReddit", "showdDscusions"], (data) => {
    if (!data.showSidebar || !data.showdDscusions) return; // ✅ Only show if both are enabled

    let query = new URLSearchParams(window.location.search).get("q");
    if (!query) return; // Stop if no search query is found

    let redditQuery = query;

    if (data.strictlyReddit) {
        redditQuery = redditQuery.replace(/\breddit\b/gi, "").trim();
        redditQuery = redditQuery.replace(/\bsite:reddit\.com\b/gi, "").trim();
    }

    const redditSearchUrl = `https://www.reddit.com/search/?q=${encodeURIComponent(redditQuery)}`;

    if (document.getElementById("reddit-results-container")) return;

    const resultsContainer = document.createElement("div");
    resultsContainer.id = "reddit-results-container";
    resultsContainer.style.cssText = `
        background: var(--color-background, #ffffff);
        color: var(--color-text, #000000);
        border: 1px solid var(--color-border, #ddd);
        border-radius: 8px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        font-family: Arial, sans-serif;
        padding: 15px;
        margin-bottom: 20px;
        max-width: 650px;
        transition: background 0.3s, color 0.3s;
    `;

    resultsContainer.innerHTML = `
        <h3 style="margin-bottom: 10px;">Reddit Discussions Based on Your Query</h3>
        <div id="reddit-posts"></div>
        <a href="${redditSearchUrl}" target="_blank" style="
            display: inline-block;
            background-color: var(--color-button, #007bff);
            color: var(--color-button-text, white);
            padding: 8px 12px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 15px;
            display: block;
            text-align: center;
            transition: background 0.3s;
        ">View More on Reddit</a>
    `;

    const mainResults = document.getElementById("search");

    if (mainResults) {
        mainResults.insertAdjacentElement("afterbegin", resultsContainer);
    }

    const redditApiUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(redditQuery)}`;

    fetch(redditApiUrl)
        .then(response => response.json())
        .then(data => {
            const results = data.data.children;
            if (!results.length) return;

            const postsContainer = document.getElementById("reddit-posts");
            postsContainer.innerHTML = ""; // Clear old results

            results.slice(0, 5).forEach(post => {
                const link = document.createElement("a");
                link.href = `https://www.reddit.com${post.data.permalink}`;
                link.target = "_blank";
                link.innerText = post.data.title;
                link.style.display = "block";
                link.style.marginBottom = "10px";
                link.style.color = "var(--color-link, #007bff)";
                link.style.textDecoration = "none";
                postsContainer.appendChild(link);
            });
        })
        .catch(error => console.error("Error fetching Reddit results:", error));

    const applyTheme = () => {
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        resultsContainer.style.background = isDarkMode ? "#1e1e1e" : "#ffffff";
        resultsContainer.style.color = isDarkMode ? "#ffffff" : "#000000";
        resultsContainer.style.border = isDarkMode ? "1px solid #444" : "1px solid #ddd";
    };

    applyTheme();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);
});