const banner = `// ==UserScript==
// @name         Facebook cleaner
// @namespace    https://lukaszmical.pl/
// @version      0.2.1
// @description  This script hides sponsored posts (ads) on Facebook, making your feed cleaner and free from distractions.
// @author       Łukasz Micał
// @match        https://*.facebook.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        window.onurlchange
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// ==/UserScript==
`;

module.exports = banner;
