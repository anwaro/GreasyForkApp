const platforms = [
  'Facebook',
  'Vimeo',
  'Youtube',
  'Streamable',
  'Tiktok',
  'Instagram',
  'Twitter',
  'X',
  'Dailymotion',
  'Coub',
  'Spotify',
  'Tableau',
  'SoundCloud',
  'Apple Music',
  'Deezer',
  'Tidal',
  // 'Odysee',
  // 'Rumble',
].join(', ');

const banner = `// ==UserScript==
// @name         Play video on hover
// @namespace    https://lukaszmical.pl/
// @version      0.4.1
// @description  ${platforms} - play on hover
// @author       Łukasz Micał
// @match        *://*/*
// @icon         https://static-00.iconduck.com/assets.00/cursor-hover-icon-512x439-vou7bdac.png
// ==/UserScript==
`;

module.exports = banner;
