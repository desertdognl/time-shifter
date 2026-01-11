chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
        chrome.storage.local.get(['msOffset'], (data) => {
            const offset = data.msOffset || 0;
            
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                world: "MAIN",
                injectImmediately: true,
                func: (offsetValue) => {
                    const OriginalDate = window.Date;
                    function CustomDate(...args) {
                        return args.length === 0 
                            ? new OriginalDate(OriginalDate.now() + offsetValue)
                            : new OriginalDate(...args);
                    }
                    CustomDate.now = () => OriginalDate.now() + offsetValue;
                    CustomDate.parse = OriginalDate.parse;
                    CustomDate.UTC = OriginalDate.UTC;
                    CustomDate.prototype = OriginalDate.prototype;
                    window.Date = CustomDate;
                },
                args: [offset]
            }).catch(err => console.debug("Injection skipped:", err));
        });
    }
});

// Open options page when the extension icon is clicked.
const openOptionsPopupWindow = () => {
    chrome.windows.create({
        url: chrome.runtime.getURL("options.html"),
        type: 'popup',
        width: 700,
        height: 700,
        focused: true
    });
};

chrome.action.onClicked.addListener(() => {
    if (chrome.action && chrome.action.openPopup) {
        chrome.action.openPopup().catch(() => {
            openOptionsPopupWindow();
        });
    } else {
        openOptionsPopupWindow();
    }
});