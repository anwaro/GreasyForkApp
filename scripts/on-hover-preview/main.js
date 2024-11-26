// ==UserScript==
// @name         Play video on hover
// @namespace    https://lukaszmical.pl/
// @version      0.4.0
// @description  Facebook, Vimeo, Youtube, Streamable, Tiktok, Instagram, Twitter, X, Dailymotion, Coub, Spotify, Tableau, SoundCloud, Apple Music, Deezer, Tidal - play on hover
// @author       Łukasz Micał
// @match        *://*/*
// @icon         https://static-00.iconduck.com/assets.00/cursor-hover-icon-512x439-vou7bdac.png
// ==/UserScript==

// libs/share/src/ui/SvgComponent.ts
var SvgComponent = class {
  constructor(tag, props = {}) {
    this.element = Dom.createSvg({ tag, ...props });
  }

  addClassName(...className) {
    this.element.classList.add(...className);
  }

  event(event, callback) {
    this.element.addEventListener(event, callback);
  }

  getElement() {
    return this.element;
  }

  mount(parent) {
    parent.appendChild(this.element);
  }
};

// libs/share/src/ui/Dom.ts
var svgTags = [
  'animate',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'defs',
  'desc',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'set',
  'stop',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'tspan',
  'use',
  'view',
];
var commonTags = ['a', 'script', 'style', 'title'];
var Dom = class _Dom {
  static appendChildren(element, children) {
    if (children) {
      element.append(
        ..._Dom.array(children).map((item) => {
          if (typeof item === 'string') {
            return document.createTextNode(item);
          }
          if (item instanceof HTMLElement || item instanceof SVGElement) {
            return item;
          }
          if (item instanceof Component || item instanceof SvgComponent) {
            return item.getElement();
          }
          if (_Dom.isSvgItem(item, element)) {
            return _Dom.createSvg(item);
          }
          return _Dom.create(item);
        })
      );
    }
  }

  static create(data) {
    const element = document.createElement(data.tag);
    _Dom.appendChildren(element, data.children);
    _Dom.applyClass(element, data.classes);
    _Dom.applyAttrs(element, data.attrs);
    _Dom.applyEvents(element, data.events);
    _Dom.applyStyles(element, data.styles);
    return element;
  }

  static element(tag, classes, children) {
    return _Dom.create({ tag, classes, children });
  }

  static createSvg(data) {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      data.tag
    );
    _Dom.appendChildren(element, data.children);
    _Dom.applyClass(element, data.classes);
    _Dom.applyAttrs(element, data.attrs);
    _Dom.applyEvents(element, data.events);
    _Dom.applyStyles(element, data.styles);
    return element;
  }

  static array(element) {
    return Array.isArray(element) ? element : [element];
  }

  static elementSvg(tag, classes, children) {
    return _Dom.createSvg({ tag, classes, children });
  }

  static applyAttrs(element, attrs) {
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value === void 0 || value === false) {
          element.removeAttribute(key);
        } else {
          element.setAttribute(key, `${value}`);
        }
      });
    }
  }

  static applyStyles(element, styles) {
    if (styles) {
      Object.entries(styles).forEach(([key, value]) => {
        const name = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        element.style.setProperty(name, value);
      });
    }
  }

  static applyEvents(element, events) {
    if (events) {
      Object.entries(events).forEach(([name, callback]) => {
        element.addEventListener(name, callback);
      });
    }
  }

  static applyClass(element, classes) {
    if (classes) {
      element.setAttribute('class', classes);
    }
  }

  static isSvgItem(item, parent) {
    if (commonTags.includes(item.tag)) {
      return parent instanceof SVGElement;
    }
    return svgTags.includes(item.tag);
  }
};

// libs/share/src/ui/Component.ts
var Component = class {
  constructor(tag, props = {}) {
    this.element = Dom.create({ tag, ...props });
  }

  addClassName(...className) {
    this.element.classList.add(...className);
  }

  event(event, callback) {
    this.element.addEventListener(event, callback);
  }

  getElement() {
    return this.element;
  }

  mount(parent) {
    parent.appendChild(this.element);
  }
};

// apps/on-hover-preview/src/components/PreviewPopup.ts
var PreviewPopup = class _PreviewPopup extends Component {
  constructor() {
    super('div', {
      attrs: {
        id: _PreviewPopup.ID,
      },
      styles: {
        background: '#444',
        height: '300px',
        width: '500px',
        position: 'absolute',
        display: 'none',
        zIndex: '9999',
        overflow: 'hidden',
        boxShadow: 'rgb(218, 218, 218) 1px 1px 5px',
      },
      children: {
        tag: 'iframe',
        attrs: {
          allowFullscreen: true,
          allow:
            'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',
        },
        styles: {
          height: '100%',
          width: '100%',
          border: 'none',
        },
      },
    });
    this.iframeActive = false;
    this.iframe = this.element.children[0];
    if (!document.querySelector(`#${_PreviewPopup.ID}`)) {
      this.mount(document.body);
      document.addEventListener('click', this.hidePopup.bind(this));
    }
  }

  static {
    this.ID = 'play-on-hover-popup';
  }

  showPopup(e, url, service) {
    if (!this.iframeActive) {
      this.iframe.src = url;
      this.iframeActive = true;
      Dom.applyStyles(this.element, {
        display: 'block',
        top: `${e.pageY}px`,
        left: `${e.pageX}px`,
        ...service.styles,
      });
    }
  }

  hidePopup() {
    this.iframeActive = false;
    this.iframe.src = '';
    this.element.style.display = 'none';
  }
};

// apps/on-hover-preview/src/services/BaseService.ts
var BaseService = class {
  extractId(url, match) {
    const result = url.match(match);
    if (result) {
      return result.groups?.id || '';
    }
    return '';
  }

  match(url, match) {
    const result = url.match(match);
    if (result && result.groups) {
      return result.groups;
    }
    return void 0;
  }

  params(params) {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  theme(light, dark) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? dark
      : light;
  }
};

// apps/on-hover-preview/src/services/Streamable.ts
var Streamable = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '300px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const id = this.extractId(href, /\.com\/([s|o]\/)?(?<id>[^?/]+).*$/);
    return `https://streamable.com/o/${id}?autoplay=1`;
  }

  isValidUrl(url) {
    return url.includes('streamable.com');
  }
};

// apps/on-hover-preview/src/services/Vimeo.ts
var Vimeo = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '285px',
    };
  }

  async embeddedVideoUrl(element) {
    let id = '';
    if (/\/\d+(\/.*)?$/.test(element.pathname)) {
      id = element.pathname.replace(/\D+/g, '');
    } else {
      const response = await fetch(
        `https://vimeo.com/api/oembed.json?url=${element.href}`
      );
      const data = await response.json();
      id = data.video_id;
    }
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }

  isValidUrl(url) {
    return url.includes('vimeo.com');
  }
};

// apps/on-hover-preview/src/services/Youtube.ts
var Youtube = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '300px',
    };
  }

  async embeddedVideoUrl({ href, search }) {
    const urlParams = new URLSearchParams(search);
    let id = urlParams.get('v') || '';
    let start = urlParams.get('t') || '0';
    if (href.includes('youtu.be')) {
      id = this.extractId(href, /\.be\/(?<id>[^?/]+).*$/);
    } else if (href.includes('youtube.com/attribution_link')) {
      const url = decodeURIComponent(urlParams.get('u') || `/watch?v=${id}`);
      const attrUrl = new URL(`https://youtube.com${url}`);
      const attrParams = new URLSearchParams(attrUrl.search);
      id = attrParams.get('v') || id;
      start = attrParams.get('t') || start;
    }
    if (/(?:(\d+)h)?(?:(\d+)m)?(\d+)s/.test(start)) {
      const [hour = '0', minutes = '0', seconds = '-1'] = start.match(
        /(?:(\d+)h)?(?:(\d+)m)?(\d+)s/
      );
      if (seconds !== '-1') {
        start = `${(Number(hour) * 60 + Number(minutes)) * 60 + seconds}`;
      }
    }
    const params = this.params({
      fs: 1,
      autoplay: 1,
      enablejsapi: 1,
      start,
    });
    return `https://www.youtube.com/embed/${id}?${params}`;
  }

  isValidUrl(url) {
    return (
      url.includes('youtube.com/attribution_link') ||
      url.includes('youtube.com/watch') ||
      url.includes('youtu.be/')
    );
  }
};

// apps/on-hover-preview/src/services/Facebook.ts
var Facebook = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '282px',
    };
  }

  async embeddedVideoUrl(element) {
    const params = this.params({
      autoplay: 'true',
      width: '500',
      show_text: 'false',
      href: element.href,
    });
    return `https://www.facebook.com/plugins/video.php?${params}`;
  }

  isValidUrl(url) {
    return /https:\/\/(www\.|m\.)?facebook\.com\/[\w\d\-_]+\/videos\//.test(
      url
    );
  }
};

// apps/on-hover-preview/src/services/Tiktok.ts
var Tiktok = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '338px',
      height: '575px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const id = this.extractId(href, /video\/(?<id>\d+)/);
    return `https://www.tiktok.com/embed/v2/${id}`;
  }

  isValidUrl(url) {
    return url.includes('tiktok.com') && /video\/\d+/.test(url);
  }
};

// apps/on-hover-preview/src/services/Instagram.ts
var Instagram = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '300px',
      height: '500px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const id = this.extractId(href, /reel\/(?<id>[^/]+)\//);
    return `https://www.instagram.com/p/${id}/embed/`;
  }

  isValidUrl(url) {
    return /instagram\.com\/([a-zA-Z0-9._]{1,30}\/)?reel/.test(url);
  }
};

// apps/on-hover-preview/src/services/Twitter.ts
var Twitter = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '480px',
      height: '300px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const id = this.extractId(href, /status\/(?<id>[^/?]+)[\/?]?/);
    const platform = href.includes('twitter.com') ? 'twitter' : 'x';
    const params = this.params({
      id,
      maxWidth: '480',
    });
    return `https://platform.${platform}.com/embed/Tweet.html?${params}`;
  }

  isValidUrl(url) {
    return /https:\/\/(twitter|x)\.com\/.+\/status\/\d+/.test(url);
  }
};

// libs/share/src/ui/Events.ts
var Events = class {
  static intendHover(validate, mouseover, mouseleave, timeout = 500) {
    let hover = false;
    let id = 0;
    const onHover = (event) => {
      if (!event.target || !validate(event.target)) {
        return;
      }
      const element = event.target;
      hover = true;
      element.addEventListener(
        'mouseleave',
        (ev) => {
          mouseleave.call(element, ev);
          clearTimeout(id);
          hover = false;
        },
        { once: true }
      );
      clearTimeout(id);
      id = window.setTimeout(() => {
        if (hover) {
          mouseover.call(element, event);
        }
      }, timeout);
    };
    document.body.addEventListener('mouseover', onHover);
  }
};

// apps/on-hover-preview/src/helpers/LinkHover.ts
var LinkHover = class {
  constructor(services2, onHover) {
    this.services = services2;
    this.onHover = onHover;
    Events.intendHover(
      this.isValidLink.bind(this),
      this.onAnchorHover.bind(this),
      () => {}
    );
  }

  anchorElement(node) {
    if (!(node instanceof HTMLElement)) {
      return void 0;
    }
    if (node instanceof HTMLAnchorElement) {
      return node;
    }
    const parent = node.closest('a');
    if (parent instanceof HTMLElement) {
      return parent;
    }
    return void 0;
  }

  isValidLink(node) {
    const anchor = this.anchorElement(node);
    if (!anchor || !anchor.href || anchor.href === '#') {
      return false;
    }
    const origin = (url) => {
      return new URL(url).host.split('.').slice(-2).join('.');
    };
    return origin(anchor.href) !== origin(location.href);
  }

  async onAnchorHover(ev) {
    const anchor = this.anchorElement(ev.target);
    if (!anchor) {
      return;
    }
    const service = this.findService(anchor.href);
    if (!service) {
      return;
    }
    const previewUrl = await service.embeddedVideoUrl(anchor);
    if (!previewUrl) {
      return;
    }
    this.onHover(ev, previewUrl, service);
  }

  findService(url = '') {
    return this.services.find((service) => service.isValidUrl(url));
  }
};

// apps/on-hover-preview/src/services/Dailymotion.ts
var Dailymotion = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '280px',
    };
  }

  async embeddedVideoUrl(element) {
    const id = this.extractId(element.href, /video\/(?<id>[^/?]+)[\/?]?/);
    return `https://geo.dailymotion.com/player.html?video=${id}`;
  }

  isValidUrl(url) {
    return url.includes('dailymotion.com/video');
  }
};

// apps/on-hover-preview/src/services/Coub.ts
var Coub = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '290px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const id = this.extractId(href, /view\/(?<id>[^/]+)\/?/);
    const params = this.params({
      muted: 'false',
      autostart: 'true',
      originalSize: 'false',
      startWithHD: 'true',
    });
    return `https://coub.com/embed/${id}?${params}`;
  }

  isValidUrl(url) {
    return url.includes('coub.com/view');
  }
};

// apps/on-hover-preview/src/services/Spotify.ts
var Spotify = class extends BaseService {
  constructor() {
    super(...arguments);
    this.regExp =
      /spotify\.com\/(.+\/)?(?<type>track|album|playlist|show)\/(?<id>[\w-]+)/;
    this.styles = {
      width: '600px',
      height: '152px',
      borderRadius: '12px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const props = this.match(href, this.regExp);
    if (!props) {
      return void 0;
    }
    this.setStyle(props.type);
    const suffix = props.type === 'show' ? '/video' : '';
    return `https://open.spotify.com/embed/${props.type}/${props.id}${suffix}`;
  }

  isValidUrl(url) {
    return this.regExp.test(url);
  }

  setStyle(type) {
    if (type === 'track') {
      this.styles.height = '152px';
    } else if (type === 'album') {
      this.styles.height = '352px';
    } else if (type === 'playlist') {
      this.styles.height = '352px';
    } else if (type === 'show') {
      this.styles.height = '352px';
    } else {
      this.styles.height = '300px';
    }
  }
};

// apps/on-hover-preview/src/services/Tableau.ts
var Tableau = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '850px',
      height: '528px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const id = this.extractId(href, /views\/(?<id>[^/]+)\/?/);
    const params = this.params({
      ':embed': 'y',
      ':showVizHome': 'no',
      ':host_url': 'https%3A%2F%2Fpublic.tableau.com%2F',
      ':embed_code_version': '3',
      ':tabs': 'yes',
      ':toolbar': 'yes',
      ':animate_transition': 'yes',
      ':display_static_image': 'no',
      ':display_spinner': 'yes',
      ':display_overlay': 'yes',
      ':display_count': 'yes',
      ':language': 'en-US',
      ':loadOrderID': '0',
    });
    return `https://public.tableau.com/views/${id}/Video?${params}`;
  }

  isValidUrl(url) {
    return url.includes('public.tableau.com/views');
  }
};

// apps/on-hover-preview/src/services/SoundCloud.ts
var SoundCloud = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '600px',
      height: '166px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const params = this.params({
      visual: 'false',
      show_artwork: 'true',
      auto_play: 'true',
      hide_related: 'true',
      show_comments: 'false',
      show_teaser: 'false',
      url: encodeURIComponent(href),
    });
    return `https://w.soundcloud.com/player?${params}`;
  }

  isValidUrl(url) {
    return /soundcloud\.com\/[^/]+\/[^/?]+/.test(url);
  }
};

// apps/on-hover-preview/src/services/AppleMusic.ts
var AppleMusic = class extends BaseService {
  constructor() {
    super(...arguments);
    this.regExp = /music\.apple\.com\/.{2}\/(?<id>music-video|artist|album)/;
    this.styles = {
      width: '500px',
      height: '450px',
      borderRadius: '12px',
    };
  }

  async embeddedVideoUrl({ pathname, href }) {
    this.setStyle(href);
    return `https://embed.music.apple.com${pathname}`;
  }

  isValidUrl(url) {
    return this.regExp.test(url);
  }

  setStyle(href) {
    const type = this.extractId(href, this.regExp);
    if (type === 'music-video') {
      this.styles.height = '281px';
    } else {
      this.styles.height = '450px';
    }
  }
};

// apps/on-hover-preview/src/services/Deezer.ts
var Deezer = class extends BaseService {
  constructor() {
    super(...arguments);
    this.regExp =
      /deezer\.com\/.{2}\/(?<type>album|playlist|track|artist|podcast|episode)\/(?<id>\d+)/;
    this.styles = {
      width: '500px',
      height: '300px',
      borderRadius: '10px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const theme = this.theme('light', 'dark');
    const props = this.match(href, this.regExp);
    const params = this.params({
      radius: 'true',
      autoplay: 'true',
      tracklist: 'false',
    });
    if (!props) {
      return void 0;
    }
    return `https://widget.deezer.com/widget/${theme}/${props.type}/${props.id}?${params}`;
  }

  isValidUrl(url) {
    return this.regExp.test(url);
  }
};

// apps/on-hover-preview/src/services/Tidal.ts
var Tidal = class extends BaseService {
  constructor() {
    super(...arguments);
    this.regExp =
      /tidal\.com\/(.+\/)?(?<type>track|album|video|playlist)\/(?<id>\d+|[\w-]+)/;
    this.styles = {
      width: '500px',
      height: '300px',
      borderRadius: '10px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const props = this.match(href, this.regExp);
    if (!props) {
      return void 0;
    }
    this.setStyle(props.type);
    return `https://embed.tidal.com/${props.type}s/${props.id}`;
  }

  isValidUrl(url) {
    return this.regExp.test(url);
  }

  setStyle(type) {
    if (type === 'track') {
      this.styles.height = '120px';
    } else if (type === 'playlist') {
      this.styles.height = '400px';
    } else if (type === 'video') {
      this.styles.height = '281px';
    } else {
      this.styles.height = '300px';
    }
  }
};

// apps/on-hover-preview/src/main.ts
var services = [
  Youtube,
  Vimeo,
  Streamable,
  Facebook,
  Tiktok,
  Instagram,
  Twitter,
  Dailymotion,
  Dailymotion,
  Coub,
  Spotify,
  Tableau,
  SoundCloud,
  AppleMusic,
  Deezer,
  Tidal,
  // Odysee,
  // Rumble,
].map((Service) => new Service());
var previewPopup = new PreviewPopup();
new LinkHover(services, previewPopup.showPopup.bind(previewPopup));
