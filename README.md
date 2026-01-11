# Time Shifter

A professional Chrome extension designed to manipulate the browser's internal clock without changing the system time. 

## 🚀 Features
- **Precise Offsets:** Set hours, minutes, and seconds to shift time forward or backward.
- **Main World Injection:** Uses Chrome's `scripting` API to override the global `Date` object effectively.
- **Sleek UI:** Modern dark-mode interface with mint-green accents.
- **Privacy-First:** No data collection. All settings are stored locally.

## 🛠️ Installation (Development Mode)
1. Clone this repository or download the ZIP.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right.
4. Click **Load unpacked** and select the project folder.

## 📂 File Structure
- `manifest.json`: Extension configuration and permissions.
- `background.js`: Service worker for script injection.
- `options.html/js`: The settings dashboard logic and UI.
- `icons/`: Branded assets for the Chrome Web Store.

## 📜 License
MIT License - feel free to use and modify for your own projects.

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/desertdog)
