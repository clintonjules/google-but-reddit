chrome.storage.local.get("showSidebar", (data) => {
    if (!data.showSidebar) return;

    const query = new URLSearchParams(window.location.search).get("q");
    if (!query) return;

    const redditSearchUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}`;

    fetch(redditSearchUrl)
        .then(response => response.json())
        .then(data => {
            const results = data.data.children;
            if (!results.length) return;

            // Prevent duplicate sidebar injection
            if (document.getElementById("reddit-sidebar")) return;

            const sidebar = document.createElement("div");
            sidebar.id = "reddit-sidebar";
            sidebar.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                width: 300px;
                background: white;
                border: 1px solid #ccc;
                padding: 10px;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
                font-family: Arial, sans-serif;
                z-index: 1000;
            `;
            sidebar.innerHTML = `<h3>Reddit Results</h3>`;

            results.slice(0, 5).forEach(post => {
                const link = document.createElement("a");
                link.href = `https://www.reddit.com${post.data.permalink}`;
                link.target = "_blank";
                link.innerText = post.data.title;
                link.style.display = "block";
                link.style.marginBottom = "5px";
                sidebar.appendChild(link);
            });

            document.body.appendChild(sidebar);
        })
        .catch(console.error);
});