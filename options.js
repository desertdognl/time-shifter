document.addEventListener('DOMContentLoaded', () => {
    let currentOffset = 0;
    const display = document.getElementById('displayTime');
    const status = document.getElementById('status');

    function updateInputFields(offset) {
        const totalSecs = Math.trunc(Math.abs(offset) / 1000);
        const sign = offset < 0 ? -1 : 1;
        document.getElementById('h').value = Math.trunc(totalSecs / 3600) * sign;
        document.getElementById('m').value = Math.trunc((totalSecs % 3600) / 60) * sign;
        document.getElementById('s').value = totalSecs % 60 * sign;
    }

    chrome.storage.local.get(['msOffset'], (data) => {
        currentOffset = data.msOffset || 0;
        updateInputFields(currentOffset);
    });

    setInterval(() => {
        const now = new Date(Date.now() + currentOffset);
        display.innerText = now.toTimeString().split(' ')[0];
    }, 1000);

    document.getElementById('saveBtn').addEventListener('click', () => {
        const h = parseInt(document.getElementById('h').value) || 0;
        const m = parseInt(document.getElementById('m').value) || 0;
        const s = parseInt(document.getElementById('s').value) || 0;
        currentOffset = (h * 3600000) + (m * 60000) + (s * 1000);
        chrome.storage.local.set({ msOffset: currentOffset }, () => {
            status.textContent = "Settings Saved! Refresh your tabs.";
            setTimeout(() => { status.textContent = ""; }, 3000);
        });
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        chrome.storage.local.set({ msOffset: 0 }, () => {
            currentOffset = 0;
            updateInputFields(0);
            status.textContent = "Offset Cleared.";
            setTimeout(() => { status.textContent = ""; }, 3000);
        });
    });
});