// ==UserScript==
// @name         Play video on hover
// @namespace    https://lukaszmical.pl/
// @version      0.5.0
// @description  Facebook, Vimeo, Youtube, Streamable, Tiktok, Instagram, Twitter, X, Dailymotion, Coub, Spotify, Tableau, SoundCloud, Apple Music, Deezer, Tidal - play on hover
// @author       Łukasz Micał
// @match        *://*/*
// @icon         https://static-00.iconduck.com/assets.00/cursor-hover-icon-512x439-vou7bdac.png
// ==/UserScript==

// libs/share/src/ui/SvgComponent.ts
const SvgComponent = class {
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
var Dom = class _Dom {
  static appendChildren(element, children, isSvgMode = false) {
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
          const isSvg =
            'svg' === item.tag
              ? true
              : 'foreignObject' === item.tag
              ? false
              : isSvgMode;
          if (isSvg) {
            return _Dom.createSvg(item);
          }
          return _Dom.create(item);
        })
      );
    }
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

  static applyClass(element, classes) {
    if (classes) {
      element.classList.add(...classes.split(' ').filter(Boolean));
    }
  }

  static applyEvents(element, events) {
    if (events) {
      Object.entries(events).forEach(([name, callback]) => {
        element.addEventListener(name, callback);
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

  static array(element) {
    return Array.isArray(element) ? element : [element];
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

  static createSvg(data) {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      data.tag
    );
    _Dom.appendChildren(element, data.children, true);
    _Dom.applyClass(element, data.classes);
    _Dom.applyAttrs(element, data.attrs);
    _Dom.applyEvents(element, data.events);
    _Dom.applyStyles(element, data.styles);
    return element;
  }

  static element(tag, classes, children) {
    return _Dom.create({ tag, children, classes });
  }

  static elementSvg(tag, classes, children) {
    return _Dom.createSvg({ tag, children, classes });
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
const PreviewPopup = class _PreviewPopup extends Component {
  constructor() {
    super('div', {
      attrs: {
        id: _PreviewPopup.ID,
      },
      children: {
        tag: 'iframe',
        attrs: {
          allow:
            'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',
          allowFullscreen: true,
        },
        styles: {
          width: '100%',
          border: 'none',
          height: '100%',
        },
      },
      styles: {
        width: '500px',
        background: '#444',
        boxShadow: 'rgb(218, 218, 218) 1px 1px 5px',
        display: 'none',
        height: '300px',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: '9999',
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

  hidePopup() {
    this.iframeActive = false;
    this.iframe.src = '';
    this.element.style.display = 'none';
  }

  showPopup(e, url, service) {
    if (!this.iframeActive) {
      this.iframe.src = url;
      this.iframeActive = true;
      Dom.applyStyles(this.element, {
        display: 'block',
        left: `${e.pageX}px`,
        top: `${e.pageY}px`,
        ...service.styles,
      });
    }
  }
};

// libs/share/src/ui/Events.ts
const Events = class {
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
const LinkHover = class {
  constructor(services, onHover) {
    this.services = services;
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

  findService(url = '') {
    return this.services.find((service) => service.isValidUrl(url));
  }

  isValidLink(node) {
    const anchor = this.anchorElement(node);
    if (!anchor || !anchor.href || anchor.href === '#') {
      return false;
    }
    return true;
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
};

// apps/on-hover-preview/src/services/BaseService.ts
const BaseService = class {
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

// apps/on-hover-preview/src/services/AppleMusic.ts
const AppleMusic = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      borderRadius: '12px',
      height: '450px',
    };
    this.regExp = /music\.apple\.com\/.{2}\/(?<id>music-video|artist|album)/;
  }

  async embeddedVideoUrl({ href, pathname }) {
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

// apps/on-hover-preview/src/services/Coub.ts
const Coub = class extends BaseService {
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
      autostart: 'true',
      muted: 'false',
      originalSize: 'false',
      startWithHD: 'true',
    });
    return `https://coub.com/embed/${id}?${params}`;
  }

  isValidUrl(url) {
    return url.includes('coub.com/view');
  }
};

// apps/on-hover-preview/src/services/Dailymotion.ts
const Dailymotion = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '280px',
    };
  }

  async embeddedVideoUrl(element) {
    const id = this.extractId(element.href, /video\/(?<id>[^/?]+)[/?]?/);
    return `https://geo.dailymotion.com/player.html?video=${id}`;
  }

  isValidUrl(url) {
    return url.includes('dailymotion.com/video');
  }
};

// apps/on-hover-preview/src/services/Deezer.ts
const Deezer = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      borderRadius: '10px',
      height: '300px',
    };
    this.regExp =
      /deezer\.com\/.{2}\/(?<type>album|playlist|track|artist|podcast|episode)\/(?<id>\d+)/;
  }

  async embeddedVideoUrl({ href }) {
    const theme = this.theme('light', 'dark');
    const props = this.match(href, this.regExp);
    const params = this.params({
      autoplay: 'true',
      radius: 'true',
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

// apps/on-hover-preview/src/services/Facebook.ts
const Facebook = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '282px',
    };
  }

  async embeddedVideoUrl(element) {
    const params = this.params({
      width: '500',
      autoplay: 'true',
      href: element.href,
      show_text: 'false',
    });
    return `https://www.facebook.com/plugins/video.php?${params}`;
  }

  isValidUrl(url) {
    return /https:\/\/(www\.|m\.)?facebook\.com\/[\w\-_]+\/videos\//.test(url);
  }
};

// apps/on-hover-preview/src/services/Instagram.ts
const Instagram = class extends BaseService {
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

// apps/on-hover-preview/src/services/SoundCloud.ts
const SoundCloud = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '600px',
      height: '166px',
    };
  }

  async embeddedVideoUrl({ href }) {
    const params = this.params({
      hide_related: 'true',
      auto_play: 'true',
      show_artwork: 'true',
      show_comments: 'false',
      show_teaser: 'false',
      url: encodeURIComponent(href),
      visual: 'false',
    });
    return `https://w.soundcloud.com/player?${params}`;
  }

  isValidUrl(url) {
    return /soundcloud\.com\/[^/]+\/[^/?]+/.test(url);
  }
};

// apps/on-hover-preview/src/services/Spotify.ts
const Spotify = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '600px',
      borderRadius: '12px',
      height: '152px',
    };
    this.regExp =
      /spotify\.com\/(.+\/)?(?<type>track|album|playlist|show)\/(?<id>[\w-]+)/;
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

// apps/on-hover-preview/src/services/Streamable.ts
const Streamable = class extends BaseService {
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

// apps/on-hover-preview/src/services/Tableau.ts
const Tableau = class extends BaseService {
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
      ':animate_transition': 'yes',
      ':display_count': 'yes',
      ':display_overlay': 'yes',
      ':display_spinner': 'yes',
      ':display_static_image': 'no',
      ':embed': 'y',
      ':embed_code_version': '3',
      ':host_url': 'https%3A%2F%2Fpublic.tableau.com%2F',
      ':language': 'en-US',
      ':loadOrderID': '0',
      ':showVizHome': 'no',
      ':tabs': 'yes',
      ':toolbar': 'yes',
    });
    return `https://public.tableau.com/views/${id}/Video?${params}`;
  }

  isValidUrl(url) {
    return url.includes('public.tableau.com/views');
  }
};

// apps/on-hover-preview/src/services/Tidal.ts
const Tidal = class extends BaseService {
  constructor() {
    super(...arguments);
    this.styles = {
      width: '500px',
      height: '300px',
      borderRadius: '10px',
    };
    this.regExp =
      /tidal\.com\/(.+\/)?(?<type>track|album|video|playlist)\/(?<id>\d+|[\w-]+)/;
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

// apps/on-hover-preview/src/services/Tiktok.ts
const Tiktok = class extends BaseService {
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

// apps/on-hover-preview/src/services/Twitter.ts
const Twitter = class extends BaseService {
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

// apps/on-hover-preview/src/services/Vimeo.ts
const Vimeo = class extends BaseService {
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
const Youtube = class extends BaseService {
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
      autoplay: 1,
      enablejsapi: 1,
      fs: 1,
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

// apps/on-hover-preview/src/main.ts
function run() {
  const services = [
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
  const previewPopup = new PreviewPopup();
  new LinkHover(services, previewPopup.showPopup.bind(previewPopup));
}

if (window.top == window.self) {
  run();
}
