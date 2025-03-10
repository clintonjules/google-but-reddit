let query = new URLSearchParams(window.location.search).get("q");

function cleanQuery(query) {
  return query
    .replace(/\breddit\b/gi, "")
    .replace(/\bsite:\.com\b/gi, "")
    .trim();
}

function updateGoogleSearchBar(newText) {
  const searchBox = document.querySelector("textarea.gLFyf");
  if (searchBox) {
    searchBox.value = newText;
    searchBox.textContent = newText;
  }
}

function getStrictlyReddit() {
  return new Promise((resolve) => {
      chrome.storage.local.get("strictlyReddit", (data) => {
          resolve(data.strictlyReddit);
      });
  });
}

chrome.storage.local.get(["showDiscussions", "strictlyReddit"], (data) => {
  if (!data.showDiscussions) return;

  if (!query) return;

  let redditQuery = query;
  if (data.strictlyReddit) {
    redditQuery = cleanQuery(query);
  }

  const redditSearchUrl = `https://www.reddit.com/search/?q=${encodeURIComponent(
    redditQuery
  )}`;

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
        <div id="reddit-posts">Loading discussions...</div>
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

  let mainResults = document.getElementById("search");
  if (mainResults) {
    mainResults.insertAdjacentElement("beforebegin", resultsContainer);
  } else {
    return;
  }

  const redditApiUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(
    'title:"' + redditQuery + '"'
  )}&sort=relevance&type=link&restrict_sr=off`;

  fetch(redditApiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Reddit API request failed");
      return response.json();
    })
    .then((data) => {
      const results = data.data.children;
      const postsContainer = document.getElementById("reddit-posts");

      if (!results.length) {
        postsContainer.innerHTML = "No directly relevant discussions found.";
        return;
      }

      postsContainer.innerHTML = "";

      results.slice(0, 10).forEach((post) => {
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
    .catch(() => {
      document.getElementById("reddit-posts").innerText =
        "Failed to load discussions.";
    });

  const applyTheme = () => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    resultsContainer.style.background = isDarkMode ? "#1e1e1e" : "#ffffff";
    resultsContainer.style.color = isDarkMode ? "#ffffff" : "#000000";
    resultsContainer.style.border = isDarkMode
      ? "1px solid #444"
      : "1px solid #ddd";
  };

  applyTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applyTheme);
});

getStrictlyReddit().then((strictlyReddit) => {
  if (strictlyReddit) {
    updateGoogleSearchBar(cleanQuery(query));
  }
});