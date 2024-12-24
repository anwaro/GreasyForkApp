// ==UserScript==
// @name         Facebook cleaner
// @namespace    https://lukaszmical.pl/
// @version      0.2.0
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

// libs/share/src/ui/Observer.ts
const Observer = class {
  stop() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  start(element, callback, options) {
    this.stop();
    this.observer = new MutationObserver(callback);
    this.observer.observe(
      element,
      options || {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
        attributeOldValue: true,
        characterDataOldValue: true,
      }
    );
  }
};

// apps/facebook-cleaner/src/dictionary/locales.ts
const locales = {
  en: {
    follow: 'Follow',
    join: 'Join',
    feed: 'News Feed posts',
    reels: 'Reels',
    sponsored: 'Sponsored',
    hiddenPost: 'Hidden posts',
  },
  es: {
    follow: 'Seguir',
    join: 'Unirte',
    feed: 'Publicaciones de la secci\xF3n de noticias',
    reels: 'Reels',
    sponsored: 'Publicidad',
    hiddenPost: 'Publicaciones ocultas',
  },
  pt: {
    follow: 'Seguir',
    join: 'Participar',
    feed: 'Publica\xE7\xF5es do Feed de Not\xEDcias',
    reels: 'Reels',
    sponsored: 'Patrocinado',
    hiddenPost: 'Postagens ocultas',
  },
  pl: {
    follow: 'Obserwuj',
    join: 'Do\u0142\u0105cz',
    feed: 'Posty w Aktualno\u015Bciach',
    reels: 'Rolki',
    sponsored: 'Sponsorowane',
    hiddenPost: 'Ukryte posty',
  },
  de: {
    follow: 'Folgen',
    join: 'Beitreten',
    feed: 'News Feed-Beitr\xE4ge',
    reels: 'Reels',
    sponsored: 'Anzeige',
    hiddenPost: 'Versteckte Beitr\xE4ge',
  },
  cs: {
    follow: 'Sledovat',
    join: 'P\u0159idat se',
    feed: 'P\u0159\xEDsp\u011Bvku v kan\xE1lu vybran\xFDch p\u0159\xEDsp\u011Bvk\u016F',
    reels: 'Reels',
    sponsored: 'Sponzorov\xE1no',
    hiddenPost: 'Skryt\xE9 p\u0159\xEDsp\u011Bvky',
  },
  sk: {
    follow: 'Sledova\u0165',
    join: 'Prida\u0165 sa',
    feed: 'Pr\xEDspevky v Novink\xE1ch',
    reels: 'Reels',
    sponsored: 'Sponzorovan\xE9',
    hiddenPost: 'Skryt\xE9 pr\xEDspevky',
  },
  sl: {
    follow: 'Sledi',
    join: 'Pridru\u017Ei se',
    feed: 'Objave v viru novic',
    reels: 'Interaktivni videi',
    sponsored: 'Sponzorirano',
    hiddenPost: 'Skrite objave',
  },
  fr: {
    follow: 'Suivre',
    join: 'Rejoindre',
    feed: 'Nouvelles publications du fil d\u2019actualit\xE9',
    reels: 'Reels',
    sponsored: 'Sponsoris\xE9',
    hiddenPost: 'Messages masqu\xE9s',
  },
  tr: {
    follow: 'Takip Et',
    join: 'Kat\u0131l',
    feed: 'Haber Kayna\u011F\u0131 g\xF6nderileri',
    reels: 'Reels',
    sponsored: 'Sponsorlu',
    hiddenPost: 'Gizli g\xF6nderiler',
  },
  id: {
    follow: 'Ikuti',
    join: 'Gabung',
    feed: 'Postingan Kabar Beranda',
    reels: 'Reels',
    sponsored: 'Bersponsor',
    hiddenPost: 'Postingan tersembunyi',
  },
  it: {
    follow: 'Segui',
    join: 'Iscriviti',
    feed: 'Post della sezione Notizie',
    reels: 'Reels',
    sponsored: 'Sponsorizzato',
    hiddenPost: 'Post nascosti',
  },
  'zh-Hans': {
    follow: '\u5173\u6CE8',
    join: '\u52A0\u5165',
    feed: '\u52A8\u6001\u6D88\u606F\u5E16\u5B50',
    reels: 'Reels',
    sponsored: '\u8D5E\u52A9\u5185\u5BB9',
    hiddenPost: '\u9690\u85CF\u5E16\u5B50',
  },
  'zh-Hant': {
    follow: '\u8FFD\u8E64',
    join: '\u52A0\u5165',
    feed: '\u52D5\u614B\u6D88\u606F\u5E16\u5B50',
    reels: 'Reels',
    sponsored: '\u8D0A\u52A9',
    hiddenPost: '\u96B1\u85CF\u8CBC\u6587',
  },
  szl: {
    follow: 'Obserwuj',
    join: 'Do\u0142\u0105cz',
    feed: 'Posty w Aktualno\u015Bciach',
    reels: 'Rolki',
    sponsored: 'Szp\u014Dnzorowane',
    hiddenPost: 'Skryte posty',
  },
  uk: {
    follow: '\u0421\u0442\u0435\u0436\u0438\u0442\u0438',
    join: '\u041F\u0440\u0438\u0454\u0434\u043D\u0430\u0442\u0438\u0441\u044F',
    feed: '\u0414\u043E\u043F\u0438\u0441\u0438 \u0437\u0456 \u0441\u0442\u0440\u0456\u0447\u043A\u0438 \u043D\u043E\u0432\u0438\u043D',
    reels: '\u0412\u0456\u0434\u0435\u043E Reels',
    sponsored: '\u0420\u0435\u043A\u043B\u0430\u043C\u0430',
    hiddenPost:
      '\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u043D\u0456 \u043F\u043E\u0441\u0442\u0438/Prykhovani posty',
  },
};
const languages = Object.keys(locales);

// apps/facebook-cleaner/src/dictionary/Dictionary.ts
const Dictionary = class {
  constructor() {
    this.lang = this.detectLanguage();
    this.dictionary = this.getDictionary();
  }

  getFollowLabel() {
    return this.dictionary.follow;
  }

  getJoinLabel() {
    return this.dictionary.join;
  }

  getFeedLabel() {
    return this.dictionary.feed;
  }

  getReelsLabel() {
    return this.dictionary.reels;
  }

  getSponsoredLabel() {
    return this.dictionary.sponsored;
  }

  hiddenPostLabel(count) {
    return `${this.dictionary.hiddenPost} (${count})`;
  }

  detectLanguage() {
    const pageLang = window.document.documentElement.lang;
    if (pageLang && languages.includes(pageLang)) {
      return pageLang;
    }
    return void 0;
  }

  getDictionary() {
    if (this.lang) {
      return locales[this.lang];
    }
    return void 0;
  }
};

// apps/facebook-cleaner/src/services/ElementDetector.ts
const ElementDetector = class {
  constructor() {
    this.dictionary = new Dictionary();
  }

  getElements(root, query, text) {
    return [...root.querySelectorAll(query)].filter((element) => {
      if (!text) {
        return true;
      }
      return element.textContent.includes(text);
    });
  }

  getElement(root, query, text) {
    return this.getElements(root, query, text)[0];
  }

  getFeedElement() {
    const [feedHeader] = this.getElements(
      document,
      'h3.html-h3',
      this.dictionary.getFeedLabel()
    );
    if (!feedHeader) {
      return void 0;
    }
    return feedHeader.parentElement.lastElementChild;
  }
};

// apps/facebook-cleaner/src/services/UserSettings.ts
const settingsMenuLabels = {
  ['fcc-hide-sponsored' /* HideSponsored */]: 'sponsored posts',
  ['fcc-hide-reels' /* HideReels */]: 'reels',
  ['fcc-hide-suggested-groups' /* HideSuggestedGroups */]: 'suggested groups',
  ['fcc-hide-suggested-profiles' /* HideSuggestedProfiles */]:
    'suggested profiles',
};
const UserSettings = class {
  constructor() {
    this.setting = {
      ['fcc-hide-sponsored' /* HideSponsored */]: true,
      ['fcc-hide-reels' /* HideReels */]: true,
      ['fcc-hide-suggested-groups' /* HideSuggestedGroups */]: true,
      ['fcc-hide-suggested-profiles' /* HideSuggestedProfiles */]: true,
    };
    this.setting = this.readSettings();
    this.updateMenu();
  }

  getSettings() {
    return { ...this.setting };
  }

  readSettings() {
    return Object.fromEntries(
      Object.entries(this.setting).map(([key, defaultValue]) => [
        key,
        GM_getValue(key, defaultValue),
      ])
    );
  }

  settingLabel(id) {
    return [
      this.setting[id] ? 'Show' : 'Hide',
      settingsMenuLabels[id],
      'in feed news',
    ].join(' ');
  }

  setSettingValue(id, value) {
    this.setting[id] = value;
    GM_setValue(id, value);
    this.updateMenu();
  }

  updateMenu() {
    Object.keys(this.setting).forEach((id) => GM_unregisterMenuCommand(id));
    Object.entries(this.setting).forEach(([id, value]) =>
      GM_registerMenuCommand(
        this.settingLabel(id),
        () => this.setSettingValue(id, !value),
        {
          id,
          autoClose: true,
        }
      )
    );
  }
};

// apps/facebook-cleaner/src/services/BannedPost.ts
const BannedPost = class {
  constructor() {
    this.dictionary = new Dictionary();
    this.detector = new ElementDetector();
  }

  filter(posts, settings) {
    return posts.filter((post) => {
      if (post.dataset.fcc) {
        return true;
      }
      const query = '[data-ad-rendering-role="profile_name"] [role="button"]';
      if (
        settings['fcc-hide-suggested-profiles' /* HideSuggestedProfiles */] &&
        this.detector.getElement(post, query, this.dictionary.getFollowLabel())
      ) {
        post.dataset.fccReason = 'follow' /* Follow */;
        return true;
      }
      if (
        settings['fcc-hide-suggested-groups' /* HideSuggestedGroups */] &&
        this.detector.getElement(post, query, this.dictionary.getJoinLabel())
      ) {
        post.dataset.fccReason = 'join' /* Join */;
        return true;
      }
      if (
        settings['fcc-hide-reels' /* HideReels */] &&
        this.detector.getElement(
          post,
          '[role="button"]',
          this.dictionary.getReelsLabel()
        )
      ) {
        post.dataset.fccReason = 'reels' /* Reels */;
        return true;
      }
      if (
        settings['fcc-hide-sponsored' /* HideSponsored */] &&
        this.detector.getElement(post, 'a[href*="ads/about"]')
      ) {
        post.dataset.fccReason = 'sponsored-link' /* SponsoredLink */;
        return true;
      }
      if (
        settings['fcc-hide-sponsored' /* HideSponsored */] &&
        this.detector.getElement(
          post,
          'a[attributionsrc] [aria-labelledby]',
          this.dictionary.getSponsoredLabel()
        )
      ) {
        post.dataset.fccReason = 'sponsored-label' /* SponsoredLabel */;
        return true;
      }
      const items = this.detector.getElements(
        post,
        'a[attributionsrc] [aria-labelledby]'
      );
      if (
        settings['fcc-hide-sponsored' /* HideSponsored */] &&
        items.some(this.isSponsoredElement.bind(this))
      ) {
        post.dataset.fccReason =
          'sponsored-hidden-label' /* SponsoredHiddenLabel */;
        return true;
      }
      return false;
    });
  }

  isSponsoredElement(element) {
    const sponsoredLabel = this.dictionary.getSponsoredLabel();
    const items = [...element.firstElementChild.children].filter((i) =>
      sponsoredLabel.includes(i.innerText)
    );
    if (items.length < sponsoredLabel.length) {
      return false;
    }
    const elementLabel = items
      .map((item) => {
        const styles = getComputedStyle(item);
        return {
          text: item.innerText,
          isVisible: styles.position !== 'absolute',
          order: Number(styles.order),
        };
      })
      .filter((item) => item.isVisible)
      .sort((a, b) => a.order - b.order)
      .map((item) => item.text)
      .join('');
    return elementLabel.includes(sponsoredLabel);
  }

  hide(post) {
    post.dataset.fcc = '@';
    post.dataset.fccType = '';
  }

  showHiddenPostGroups() {
    const hiddenPosts = document.querySelectorAll('[data-fcc="@"]');
    const hiddenPostsCount = (post) => {
      const nextPost = post.nextElementSibling;
      if (nextPost && nextPost.dataset.fcc) {
        return 1 + hiddenPostsCount(nextPost);
      }
      return 0;
    };
    [...hiddenPosts].forEach((post) => {
      const prevPost = post.previousElementSibling;
      if (!prevPost || (prevPost && !prevPost.dataset.fcc)) {
        const count = 1 + hiddenPostsCount(post);
        post.dataset.fccType = '@';
        post.title = this.dictionary.hiddenPostLabel(count);
      }
    });
  }
};

// apps/facebook-cleaner/src/services/FeedCleaner.ts
const FeedCleaner = class {
  constructor() {
    this.bannedPostDetector = new BannedPost();
    this.settings = new UserSettings();
  }

  cleanFeed(feedElement) {
    const posts = [...feedElement.children];
    const bannedPosts = this.bannedPostDetector.filter(
      posts,
      this.settings.getSettings()
    );
    bannedPosts.forEach((post) => {
      this.bannedPostDetector.hide(post);
    });
    this.bannedPostDetector.showHiddenPostGroups();
  }
};

// apps/facebook-cleaner/src/services/FacebookCleaner.ts
const FacebookCleaner = class {
  constructor() {
    this.observer = new Observer();
    this.detector = new ElementDetector();
    this.feedCleaner = new FeedCleaner();
    this.feedElement = void 0;
    this.initEvents();
  }

  run() {
    this.initFeedElement();
    this.initObserver();
    this.feedListUpdated();
  }

  initFeedElement() {
    if (!this.isValidElement(this.feedElement)) {
      this.feedElement = this.detector.getFeedElement();
    }
  }

  initObserver() {
    if (!this.isValidElement(this.feedElement)) {
      return this.observer.stop();
    }
    if (!this.feedElement.dataset.fccReady) {
      this.feedElement.dataset.fccReady = '1';
      this.observer.start(this.feedElement, this.feedListUpdated.bind(this), {
        childList: true,
        subtree: true,
      });
    }
  }

  feedListUpdated() {
    if (this.isValidElement(this.feedElement)) {
      this.feedCleaner.cleanFeed(this.feedElement);
    }
  }

  isValidElement(element) {
    return element && element.isConnected;
  }

  initEvents() {
    window.addEventListener('urlchange', () => {
      this.run();
      window.setTimeout(this.run.bind(this), 2e3);
      window.setTimeout(this.run.bind(this), 5e3);
    });
    window.setInterval(this.run.bind(this), 20 * 1e3);
  }
};

// libs/share/src/utils/urlChangeEvent.ts
function activateUrlChangeEvents() {
  if (!window.onurlchange) {
    const dispatchUrlChangeEvent = function () {
      window.dispatchEvent(new CustomEvent('urlchange'));
    };
    window.addEventListener('popstate', dispatchUrlChangeEvent);
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      dispatchUrlChangeEvent();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      dispatchUrlChangeEvent();
    };
  }
}

// libs/share/src/ui/GlobalStyle.ts
const GlobalStyle = class {
  static addStyle(key, styles) {
    const style =
      document.getElementById(key) ||
      (function () {
        const style2 = document.createElement('style');
        style2.id = key;
        document.head.appendChild(style2);
        return style2;
      })();
    style.textContent = styles;
  }
};

// css:apps/facebook-cleaner/src/style/style.css
const style_default =
  '[data-fcc="@"]{display:none !important;}[data-fcc="@"][data-fcc-type="@"]{display:block !important;max-height:24px;overflow:hidden;margin-bottom:16px;padding-top:24px;border-radius:16px;box-sizing:border-box;position:relative;background-color:var(--card-background);}[data-fcc="@"][data-fcc-type="@"] *{max-height:2px;}[data-fcc="@"][data-fcc-type="@"]:before{display:block;content:attr(title);position:absolute;top:4px;left:50%;transform:translateX(-50%);color:var(--primary-text);}';

// css:apps/facebook-cleaner/src/style/style-debug.css
const style_debug_default =
  '[data-fcc="@"]{position:relative;}[data-fcc="@"]:before{display:block;content:attr(data-fcc-reason);position:absolute;top:0;left:50%;border-radius:16px;padding:8px;background-color:var(--card-background);transform:translateX(-50%);color:var(--primary-text);z-index:999;border:1px solid var(--primary-button-background)}';

// apps/facebook-cleaner/src/main.ts
activateUrlChangeEvents();
const isDebug = false;
GlobalStyle.addStyle(
  'fcc-style',
  isDebug ? style_debug_default : style_default
);
const service = new FacebookCleaner();
service.run();
