const [version] = new Date().toISOString().split('T');

export const banner = `// ==UserScript==
// @name         Gitlab plus
// @namespace    https://lukaszmical.pl/
// @version      ${version}
// @description  Gitlab utils
// @author       Łukasz Micał
// @match        https://gitlab.com/*
// @require      https://cdn.jsdelivr.net/combine/npm/preact@10.25.4/dist/preact.min.umd.min.js,npm/preact@10.25.4/hooks/dist/hooks.umd.min.js,npm/preact@10.25.4/jsx-runtime/dist/jsxRuntime.umd.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gitlab.com
// ==/UserScript==
`;
