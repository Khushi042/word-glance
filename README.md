# Word Glance

**Word Glance** is a simple and lightweight Chrome extension that allows users to instantly look up word definitions by selecting text on any webpage. It provides definitions from an external dictionary API and displays them in a clean, unobtrusive popup.

## Features

- 📖 Instantly fetch definitions for selected words
- 🌐 Works on any webpage
- ⚙️ Options to customize API provider, dark mode, and popup display delay
- 🎧 Supports phonetic information and pronunciation audio (if available)

## How It Works

1. Select a word on any webpage.
2. The content script sends the word to the background script.
3. The background script fetches the definition from a dictionary API.
4. A popup appears near your cursor with the word's meaning.

## Installation

1. Clone or download this repository.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the project folder.

## Project Structure

```plaintext
📁 Word Glance
├── background.js        # Handles fetching dictionary data and messaging
├── content.js           # Injected into pages to detect word selection
├── dictionary_data.json # Local fallback dictionary data
├── manifest.json        # Chrome extension manifest (v3)
├── option.js            # JS for settings/options page
├── options.html         # Settings interface
├── popup.js             # Script for the extension popup
├── popup.html           # HTML for the extension popup
├── styles.css           # Styling for UI components

