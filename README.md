# Gmail POP3 Quick Check

Gmail POP3 Quick Check is a browser extension script that adds a convenient button to Gmail's interface for checking POP3 accounts instantly. Instead of navigating through settings menus, users can check their POP3 mail with a single click directly from Gmail's main interface.

![Gmail POP3 Quick Check Button](images/button-screenshot.png)

## Features

The script enhances Gmail's functionality by providing:

- A "Check POP3" button integrated seamlessly into Gmail's toolbar
- Single-click POP3 mail checking for all configured accounts
- Automatic return to inbox after checking mail
- Visual feedback during the checking process
- Support for multiple POP3 accounts
- Compatible with both light and dark Gmail themes

## Installation

### Prerequisites

Install a userscript manager. On current Chromium (Chrome/Brave/Edge **150+**),
**[ScriptCat](https://docs.scriptcat.org/)** is the recommended choice for reliable
operation — it's open source (GPL-3.0) and Manifest V3.

> ⚠️ **Violentmonkey does not work on Chromium 150+ right now** — it is still
> Manifest V2, which Chromium 150 removed, so the browser force-disables it (its MV3
> build isn't released yet). Use ScriptCat until then. Tampermonkey also works but is
> proprietary. On **Firefox**, Greasemonkey or Violentmonkey are fine.

After installing on Chromium (**138+**), enable user scripts:
`chrome://extensions` → your manager → **Details** → **Allow user scripts**.

### Installing the Script

1. Install a userscript manager (ScriptCat recommended — see above).
2. Click this link to install the script: [Install Gmail POP3 Quick Check](../../raw/main/gmail-pop3-quick-check.user.js)
3. When prompted by your userscript manager, click "Install". Thanks to `@updateURL`,
   it then auto-updates from this repo when a newer version is pushed.
4. Refresh Gmail if it's already open

## Usage

After installation, using the script is straightforward:

1. Open Gmail in your browser
2. Look for the red "CHECK POP3" button in Gmail's header (to the left of the help/settings icons)
3. Click the button to check all configured POP3 accounts
4. Wait a few seconds while the check completes
5. The page will automatically return to your inbox

## Troubleshooting

Common issues and their solutions:

1. Button not appearing:
   - Refresh Gmail completely (F5 or Ctrl+R)
   - Ensure the script is enabled in Greasemonkey/Tampermonkey
   - Check the browser console (F12) for any error messages

2. Button appears but doesn't work:
   - Verify you have POP3 accounts configured in Gmail
   - Check if you can manually check POP3 through Gmail settings
   - Clear browser cache and reload Gmail

3. Script conflicts:
   - Temporarily disable other Gmail-related userscripts
   - Check if the issue persists in a private/incognito window

## Support and Contributing

If you encounter issues or want to contribute to the development:

1. Check the [Issues](../../issues) page for known problems
2. Open a new issue if you find a bug
3. Submit pull requests for improvements
4. Contact the maintainer through GitHub

## Privacy and Security

This script:
- Does not collect any user data
- Works entirely within your browser
- Doesn't require any external services
- Uses only Gmail's existing functionality

## Version History

- v1.5 (2026-07-03)
  - Added `@downloadURL`/`@updateURL` (and `@homepageURL`) so userscript managers
    auto-update the script from this repo
  - Docs: recommend ScriptCat (open source, Manifest V3) for reliable operation on
    current Chromium; note Violentmonkey is force-disabled on Chromium 150+
- v1.4 (2026-02-15)
  - Fixed button not appearing due to script timing (run-at document-idle)
  - Moved button to header area (next to help/settings icons) for better placement
  - Custom button styling (no longer relies on Gmail internal CSS classes)
  - Persistent MutationObserver with debounce for reliable button re-insertion
  - Fixed click handler being blocked by Gmail toolbar overlay
- v1.3 (2025-01-14)
  - Added automatic return to inbox
  - Improved button placement reliability
  - Enhanced error handling
- v1.2 (2025-01-13)
  - Fixed compatibility with recent Gmail updates
  - Added visual feedback during mail check
- v1.1 (2025-01-12)
  - Improved multiple POP3 account support
  - Added error logging
- v1.0 (2025-01-11)
  - Initial release

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Greasemonkey/Tampermonkey teams for making userscripts possible
- Thanks to the Gmail team for maintaining the web interface
- Special thanks to all contributors and users who provided feedback
