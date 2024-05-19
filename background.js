chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["./index.js"]
            })
            .catch(err => console.log(err));
    }
});