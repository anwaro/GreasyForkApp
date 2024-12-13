const [version] = new Date().toISOString().split('T');

export const banner = `// ==UserScript==
// @name         Gitlab plus
// @namespace    https://lukaszmical.pl/
// @version      ${version}
// @description  Gitlab utils
// @author       Łukasz Micał
// @match        https://gitlab.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&gitlab.com
// ==/UserScript==
`;
