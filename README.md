# 📌 Google, but Reddit - Chrome Extension

## 🔹 Overview
**Google, but Reddit** is a Chrome extension that enhances Google search results by integrating Reddit discussions. It allows users to:
- **Strictly limit Google search results to Reddit** when enabled.
- **Display related Reddit discussions** above Google search results.

---

## 🔹 Features
- **Strictly Reddit Mode**: Modifies Google searches to only return results from Reddit.  
- **Show Direct Reddit Discussions**: Adds a section above Google results with the **top 10 most relevant Reddit posts** related to the query.  
- **Dark Mode Support**: The UI adapts to Chrome’s dark mode settings.  
- **Toggle Settings via Popup UI**: Users can enable/disable features using the extension's popup window.  

---

## 🔹 Installation
The extension can be added from the chrome web store (in review phase).

---

## 🔹 How It Works
### **Strictly Reddit Mode**
- When enabled, **Google searches will be modified** to only include results from Reddit.  
- Example: Searching **"best laptops"** will automatically change to: **site:reddit.com best laptops**
  - This ensures all results come from Reddit.

### **Show Reddit Discussions Above Google Results**
- A **new section is added above Google results**, displaying **up to 10 Reddit posts** related to the search query.
- Posts are fetched **directly from Reddit’s API** and sorted by **relevance**.

---

## 🔹 Files & Functionality
### 📜 **manifest.json**  
Defines the extension’s metadata, permissions, and behavior.  
🔗 **How It Works:**  
- Runs `content.js` on Google Search pages (`https://www.google.com/search*`).
- Uses `background.js` for navigation control.
- Includes a popup menu (`popup.html`) for user settings.

### 📜 **background.js**  
Handles **automatic query modifications** when "Strictly Reddit" mode is enabled.  
🔗 **How It Works:**  
- Listens for navigation events (`onCommitted`).
- If the user searches on Google, it **modifies the query** to include `site:reddit.com` if "Strictly Reddit" is enabled.

### 📜 **content.js**  
Injects the Reddit discussion section **above Google search results**.  
🔗 **How It Works:**  
- **Extracts the search query** from the Google search bar.  
- **Fetches relevant Reddit posts** using: https://www.reddit.com/search.json?q=title:“query”&sort=relevance&type=link&restrict_sr=off
- **Inserts the results above Google search results**.

### 📜 **popup.html & popup.js**  
Provides an easy **popup UI** for enabling/disabling features.  
🔗 **How It Works:**  
- Contains **toggle switches** for "Strictly Reddit" and "Show Discussions".  
- Saves user preferences in `chrome.storage.local`.  
- Applies changes **instantly** without requiring page refreshes.

### 📜 **options.html & options.js**  
Handles extension settings (currently for enabling/disabling the extension).  

---

## 🔹 User Guide
1. **Click the extension icon in Chrome's toolbar.**  
2. **Enable/Disable features:**  
 - **Strictly Reddit** → Restricts Google results to only Reddit.  
 - **Show Direct Reddit Searches** → Adds Reddit discussions above Google results.  
3. **Perform a Google Search.**  
4. **If enabled, Reddit discussions will appear automatically above the results.**  

---

## 🔹 Possible Future Improvements
🔹 Add subreddit filters (e.g., `site:reddit.com/r/technology`).  
🔹 Option to sort Reddit results by **date** instead of relevance.  
🔹 Improve UI customization (e.g., hide/show Reddit section dynamically).  

---

## 🔹 Credits & License
- Developed by [**Clinton Jules**](https://github.com/clintonjules).  

---

🚀 **Enjoy a better Google experience with Reddit-powered insights!**  