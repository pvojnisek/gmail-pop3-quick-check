// ==UserScript==
// @name         Gmail POP3 Quick Check
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Adds functionality to quickly check POP3 mail in Gmail
// @author       Peter Vojnisek
// @match        https://mail.google.com/mail/*
// @grant        none
// @run-at       document-idle
// @homepageURL  https://github.com/pvojnisek/gmail-pop3-quick-check
// @downloadURL  https://raw.githubusercontent.com/pvojnisek/gmail-pop3-quick-check/main/gmail-pop3-quick-check.user.js
// @updateURL    https://raw.githubusercontent.com/pvojnisek/gmail-pop3-quick-check/main/gmail-pop3-quick-check.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to check mail - handles both direct link and settings navigation
    function checkMail() {
        // First try to find the direct check mail link
        const checkMailLink = document.querySelector('a[href*="ClientAction=PopCheckNow"]');
        if (checkMailLink) {
            checkMailLink.click();
            console.log('[POP3] Direct mail check triggered');
            return;
        }

        // If direct link isn't found, navigate to settings
        window.location.hash = "#settings/accounts";
        console.log('[POP3] Navigating to settings page');

        // Wait for settings page to load, then click check buttons
        const checkSettingsLoad = setInterval(() => {
            if (document.getElementsByClassName("rP sA").length > 0) {
                clearInterval(checkSettingsLoad);
                handleSettingsPage();
            }
        }, 500);
    }

    // Function to create and add the button
    function addCheckButton() {
        // Check if button already exists to prevent duplicates
        if (document.querySelector('[data-pop3-check-button]')) {
            return;
        }

        // Find the right-side header icons (help, settings, apps)
        // and prepend button there - naturally sits between search bar and icons
        const headerIcons = document.querySelector('div[aria-label="Support"]')?.closest('div.gb_j') ||
                            document.querySelector('a[aria-label="Settings"]')?.parentElement?.parentElement ||
                            document.querySelector('div[gh="s"]'); // settings container
        if (!headerIcons) {
            return;
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('data-pop3-check-button', 'true');
        buttonContainer.style.cssText = [
            'display: flex',
            'align-items: center',
            'margin-right: 8px'
        ].join('; ');

        const button = document.createElement('div');
        button.textContent = 'CHECK POP3';
        button.setAttribute('role', 'button');
        button.style.cssText = [
            'background-color: #d93025',
            'color: #fff',
            'font-weight: bold',
            'font-size: 13px',
            'padding: 6px 16px',
            'border-radius: 4px',
            'cursor: pointer',
            'user-select: none',
            'letter-spacing: 0.5px',
            'white-space: nowrap'
        ].join('; ');

        button.addEventListener('mouseenter', () => { button.style.backgroundColor = '#b5221b'; });
        button.addEventListener('mouseleave', () => { button.style.backgroundColor = '#d93025'; });
        button.addEventListener('click', () => {
            console.log('[POP3] Button clicked');
            checkMail();
        });

        buttonContainer.appendChild(button);

        // Prepend before the header icons
        headerIcons.parentNode.insertBefore(buttonContainer, headerIcons);
        console.log('[POP3] Button added next to header icons');
    }

    // Function to handle the settings page actions
    function handleSettingsPage() {
        if (location.hash === "#settings/accounts") {
            const refreshButtons = document.getElementsByClassName("rP sA");
            for (let btn of refreshButtons) {
                btn.click();
                console.log('[POP3] POP3 refresh triggered on settings page');

                // Return to inbox after a delay
                setTimeout(() => {
                    window.location.hash = "inbox";
                }, 2000);
                return;
            }
        }
    }

    // Persistent observer - keeps the button alive across Gmail SPA navigation
    function initializeObserver() {
        let debounceTimer = null;

        const observer = new MutationObserver(() => {
            // Debounce: Gmail fires many mutations at once
            if (debounceTimer) return;
            debounceTimer = setTimeout(() => {
                debounceTimer = null;
                addCheckButton();
            }, 300);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize immediately (don't wait for load event - it may have already fired)
    addCheckButton();
    initializeObserver();

    // Handle navigation changes
    window.addEventListener('hashchange', () => {
        handleSettingsPage();
        // Gmail rebuilds toolbar on navigation - re-add button after a short delay
        setTimeout(addCheckButton, 1000);
    });
})();
