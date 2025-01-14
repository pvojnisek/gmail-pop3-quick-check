// ==UserScript==
// @name         Gmail POP3 Quick Check
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Adds functionality to quickly check POP3 mail in Gmail
// @author       Peter Vojnisek
// @match        https://mail.google.com/mail/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to check mail - handles both direct link and settings navigation
    function checkMail() {
        // First try to find the direct check mail link
        const checkMailLink = document.querySelector('a[href*="ClientAction=PopCheckNow"]');
        if (checkMailLink) {
            checkMailLink.click();
            console.log('Direct mail check triggered');
            return;
        }

        // If direct link isn't found, navigate to settings
        window.location.hash = "#settings/accounts";
        console.log('Navigating to settings page');
        
        // Add a one-time listener for the settings page load
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

        // Create button with a unique identifier
        const buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('data-pop3-check-button', 'true');
        buttonContainer.innerHTML = `
            <div class="G-Ni J-J5-Ji" style="margin-right: 8px;">
                <div class="T-I T-I-KE L3" role="button" style="user-select: none;">
                    Check POP3
                </div>
            </div>`;

        // Add click handler
        buttonContainer.querySelector('.T-I').addEventListener('click', checkMail);

        // Try multiple possible toolbar selectors
        const toolbarSelectors = [
            '.G-atb',
            'div[role="banner"] div[role="toolbar"]',
            '.aeH'
        ];

        // Find the toolbar using multiple possible selectors
        let toolbar = null;
        for (const selector of toolbarSelectors) {
            toolbar = document.querySelector(selector);
            if (toolbar) break;
        }

        if (toolbar) {
            // Try to find the settings gear icon as insertion point
            let insertionPoint = toolbar.querySelector('.G-tF') || 
                               toolbar.querySelector('div[role="button"][aria-label*="Settings"]') ||
                               toolbar.lastChild;
            
            toolbar.insertBefore(buttonContainer, insertionPoint);
            console.log('Button successfully added to toolbar');
        }
    }

    // Function to handle the settings page actions
    function handleSettingsPage() {
        if (location.hash === "#settings/accounts") {
            const refreshButtons = document.getElementsByClassName("rP sA");
            for (let button of refreshButtons) {
                button.click();
                console.log('POP3 refresh triggered on settings page');
                
                // Return to inbox after a delay
                setTimeout(() => {
                    window.location.hash = "inbox";
                }, 2000);
                return;
            }
        }
    }

    // More robust MutationObserver setup
    function initializeObserver() {
        let attemptCount = 0;
        const maxAttempts = 10;
        
        const observer = new MutationObserver(() => {
            attemptCount++;
            
            // Try to add the button
            addCheckButton();
            
            // If we've made several attempts or button exists, disconnect
            if (attemptCount >= maxAttempts || document.querySelector('[data-pop3-check-button]')) {
                observer.disconnect();
                console.log('Observer disconnected after', attemptCount, 'attempts');
            }
        });

        // Observe both body and specific Gmail containers
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });

        // Backup timeout to try one last time
        setTimeout(() => {
            if (!document.querySelector('[data-pop3-check-button]')) {
                addCheckButton();
            }
        }, 5000);
    }

    // Initialize everything
    window.addEventListener('load', () => {
        initializeObserver();
        if (location.hash === "#settings/accounts") {
            handleSettingsPage();
        }
    });

    // Handle navigation changes
    window.addEventListener('hashchange', handleSettingsPage);
})();
