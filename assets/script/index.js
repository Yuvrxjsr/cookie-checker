'use strict';


// Utility functions
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

// Cookie functions
function setCookie(name, value, seconds) {
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

// Main
function checkCookies() {
    if (!navigator.cookieEnabled) {
        console.log('Cookies are not enabled');
        return;
    }

    const acceptedCookies = getCookie('cookiesAccepted');
    if (acceptedCookies !== "") {
        return;
    }

}

function showFirstDialog() {
    // Display the first dialog
    const dialogBox = select('.dialog-box');
    dialogBox.style.display = 'block';
    const backgroundBlur = select('.background-blur');
    backgroundBlur.style.display = 'block';

    // Attach event listeners to buttons in the first dialog
    onEvent('click', select('.accept-button'), acceptAllCookies);
    onEvent('click', select('.settings-button'), showSecondDialog);
}

function acceptAllCookies() {
    // Set a cookie to indicate that the user has accepted all cookies
    setCookie('cookiesAccepted', 'true', 15); // expires in 15 seconds

    // Log window width and height
    console.log('Operating System:', getOSName());
    console.log('Browser:', getBrowserName());
    console.log('Window Width:', window.innerWidth);
    console.log('Window Height:', window.innerHeight);

    // Set cookies for all options (you can customize this based on your requirements)
    setCookie('browser', getBrowserName(), 15);
    setCookie('os', getOSName(), 15);
    setCookie('screenWidth', window.innerWidth.toString(), 15);
    setCookie('screenHeight', window.innerHeight.toString(), 15);

    // Close the dialog
    const dialogBox = select('.dialog-box');
    dialogBox.style.display = 'none';
    const backgroundBlur = select('.background-blur');
    backgroundBlur.style.display = 'none';
}

function showSecondDialog() {
    // Display the second dialog with toggle switches
    const settingsBox = select('.settings-box');
    settingsBox.style.display = 'block';

    // Attach event listeners to buttons in the second dialog
    onEvent('click', select('.save-button'), savePreferences);
    const switchDefaults = selectAll('input');
    switchDefaults.forEach(toggle => toggle.checked = true);
}

// Function to get the browser name
function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") !== -1) {
        return 'Firefox'
    } else if (userAgent.indexOf("Edg") !== -1) {
        return 'Edge'
    } else {
        return 'Chrome'
    }
}

// Function to get the operating system name
function getOSName() {
    const platform = navigator.platform;
    if (platform.indexOf("Win") !== -1) {
        return 'Window'
    } else if (platform.indexOf("Mac") !== -1) {
        return 'Mac OS'
    } else {
        return 'Linux'
    }
}

function savePreferences() {
    // Log window width and height
    if (select('#system-switch input').checked) {
        console.log('Operating System:', getOSName());
    }

    if (select('#browser-switch input').checked) {
        console.log('Browser:', getBrowserName());
    }

    if (select('#width-switch input').checked) {
        console.log('Window Width:', window.innerWidth);
    }

    if (select('#height-switch input').checked) {
        console.log('Window Height:', window.innerHeight);
    }

    // Set cookies based on the user's preferences
    setCookie('browser', getBrowserName(), 15);
    setCookie('os', getOSName(), 15);
    setCookie('screenWidth', select('#width-switch input').checked ? 'enabled' : 'disabled', 15);
    setCookie('screenHeight', select('#height-switch input').checked ? 'enabled' : 'disabled', 15);

    // Close the dialog
    const settingsBox = select('.settings-box');
    settingsBox.style.display = 'none';
    const dialogBox = select('.dialog-box');
    dialogBox.style.display = 'none';
    const backgroundBlur = select('.background-blur');
    backgroundBlur.style.display = 'none';
}

// Initialize the checkCookies function when the window is loaded
onEvent('load', window, () => {
    if (document.cookie) {
        checkCookies();
    } else {
        checkCookies();
        setTimeout(() => {
            showFirstDialog()
        }, 2000);
    }
}
);