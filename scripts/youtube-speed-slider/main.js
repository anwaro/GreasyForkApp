// ==UserScript==
// @name         Youtube Player Speed Slider
// @namespace    lukaszmical.pl
// @version      1.0.2
// @description  Add Speed Slider to Youtube Player Settings
// @author       Łukasz Micał
// @match        https://*.youtube.com/*
// @match        https://youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

// libs/share/src/store/Store.ts
const Store = class {
  constructor(key) {
    this.key = key;
  }

  decode(val) {
    return JSON.parse(val);
  }

  encode(val) {
    return JSON.stringify(val);
  }

  get(defaultValue = void 0) {
    try {
      const data = localStorage.getItem(this.key);
      if (data) {
        return this.decode(data);
      }
      return defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  remove() {
    localStorage.removeItem(this.key);
  }

  set(value) {
    try {
      localStorage.setItem(this.key, this.encode(value));
    } catch (e) {

    }
  }
};

// libs/share/src/ui/Observer.ts
const Observer = class {
  start(element, callback, options) {
    this.stop();
    this.observer = new MutationObserver(callback);
    this.observer.observe(
      element,
      options || {
        attributeOldValue: true,
        attributes: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true,
      }
    );
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
};

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

// apps/youtube-speed-slider/src/components/Checkbox.ts
const Checkbox = class extends Component {
  constructor(checked) {
    super('input', {
      attrs: {
        checked,
        title: 'Remember speed',
        type: 'checkbox',
      },
      styles: {
        width: '20px',
        accentColor: '#f00',
        height: '20px',
        margin: '0',
        padding: '0',
      },
    });
  }

  getValue() {
    return this.element.checked;
  }
};

// apps/youtube-speed-slider/src/components/Icon.ts
const iconPath =
  'M10.01,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z';
const Icon = class extends Component {
  constructor() {
    super('div', {
      children: {
        tag: 'svg',
        attrs: {
          width: '24',
          height: '24',
          viewBox: '0 0 24 24',
        },
        children: {
          tag: 'path',
          attrs: {
            d: iconPath,
            fill: 'white',
          },
        },
      },
      classes: 'ytp-menuitem-icon',
    });
  }
};

// apps/youtube-speed-slider/src/components/Label.ts
const Label = class extends Component {
  constructor(speed, label = 'Speed') {
    super('div', { classes: 'ytp-menuitem-label' });
    this.speed = '1.0';
    this.label = label;
    this.updateSpeed(speed);
  }

  updateLabel(label = 'Speed') {
    this.label = label;
    this.updateText();
  }

  updateSpeed(speed) {
    this.speed = speed.toFixed(1);
    this.updateText();
  }

  updateText() {
    this.element.innerText = `${this.label}: ${this.speed}`;
  }
};

// libs/share/src/utils/delay.ts
async function delay(ms = 1e3) {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// apps/youtube-speed-slider/src/components/SpeedMenuItem.ts
const SpeedMenuItem = class _SpeedMenuItem extends Component {
  constructor() {
    super('div', {
      attrs: {
        id: _SpeedMenuItem.ID,
      },
      classes: 'ytp-menuitem',
    });
    this.wrapper = Dom.element('div', 'ytp-menuitem-content');
  }

  static {
    this.ID = 'yts-speed-menu-item';
  }

  addElement(icon, label, slider, checkbox) {
    this.element.append(icon, label, this.wrapper);
    this.wrapper.append(checkbox, slider);
  }
};

// apps/youtube-speed-slider/src/components/Menu.ts
const Menu = class {
  constructor() {
    this.getMenu();
  }

  addCustomSpeedItem(item) {
    const menu = this.getMenu();
    const defaultItem = this.getDefaultMenuItem();
    if (menu === null) {
      return false;
    }
    if (this.menuHasCustomItem(menu)) {
      defaultItem?.parentNode?.removeChild(defaultItem);
      return true;
    }
    if (defaultItem) {
      defaultItem.replaceWith(item.getElement());
    } else {
      menu.appendChild(item.getElement());
    }
    return true;
  }

  getDefaultMenuItem() {
    const defaultSpeedItem = [
      ...document.querySelectorAll('.ytp-menuitem'),
    ].filter((e) => {
      const path = e
        .querySelector('.ytp-menuitem-icon path')
        ?.getAttribute('d');
      return path?.startsWith('M10,8v8l6-4L10,');
    });
    if (defaultSpeedItem.length) {
      return defaultSpeedItem[0];
    }
    return void 0;
  }

  getLabel() {
    const label = this.getDefaultMenuItem()?.querySelector(
      '.ytp-menuitem-label'
    );
    return label?.innerText;
  }

  getMenu() {
    return document.querySelector('.ytp-settings-menu .ytp-panel-menu');
  }

  menuHasCustomItem(menu) {
    return Boolean(menu.querySelector(`#${SpeedMenuItem.ID}`));
  }

  async reopenMenu() {
    const menuButton = document.querySelector('.ytp-settings-button');
    const menu = this.getMenu();
    if (menu && this.menuHasCustomItem(menu)) {
      return;
    }
    if (menuButton) {
      menu?.style?.setProperty('opacity', '0');
      menuButton.click();
      await delay(50);
      menuButton.click();
      menu?.style?.setProperty('opacity', '1');
      await delay(50);
    }
  }
};

// apps/youtube-speed-slider/src/components/Player.ts
const Player = class _Player {
  constructor(speed) {
    this.speed = speed;
    this.player = null;
    this.setSpeed(this.speed);
  }

  static {
    this.READY_FLAG = 'yts-listener';
  }

  getPlayer() {
    if (!this.player) {
      this.player = document.querySelector('.html5-main-video');
      if (this.player) {
        this.initEvent(this.player);
      }
    }
    return this.player;
  }

  initEvent(player) {
    if (!player.getAttribute(_Player.READY_FLAG)) {
      player.addEventListener('ratechange', this.checkPlayerSpeed.bind(this));
      player.setAttribute(_Player.READY_FLAG, 'ready');
    }
  }

  checkPlayerSpeed() {
    const player = this.getPlayer();
    if (player && Math.abs(player.playbackRate - this.speed) > 0.01) {
      player.playbackRate = this.speed;
      setTimeout(this.checkPlayerSpeed.bind(this), 200);
    }
  }

  setSpeed(speed) {
    this.speed = speed;
    const player = this.getPlayer();
    if (player !== null) {
      player.playbackRate = speed;
    }
  }
};

// apps/youtube-speed-slider/src/components/Slider.ts
const Slider = class _Slider extends Component {
  static {
    this.MAX_VALUE = 4;
  }
  static {
    this.MIN_VALUE = 0.5;
  }

  constructor(speed) {
    super('input', {
      attrs: {
        max: _Slider.MAX_VALUE,
        min: _Slider.MIN_VALUE,
        step: 0.1,
        type: 'range',
        value: speed.toString(),
      },
      styles: {
        width: 'calc(100% - 30px)',
        accentColor: '#f00',
        margin: '0 5px',
        padding: '0',
      },
    });
  }

  getSpeed() {
    return parseFloat(this.element.value);
  }

  setSpeed(speed) {
    this.element.value = speed.toString();
  }
};

// apps/youtube-speed-slider/src/controllers/AppController.ts
const AppController = class {
  constructor() {
    this.rememberSpeed = new Store('yts-remember-speed');
    this.speed = new Store('yts-speed');
    const initialSpeed = this.getSpeed();
    this.menu = new Menu();
    this.player = new Player(initialSpeed);
    this.speedMenuItem = new SpeedMenuItem();
    this.icon = new Icon();
    this.label = new Label(initialSpeed);
    this.slider = new Slider(initialSpeed);
    this.checkbox = new Checkbox(this.rememberSpeed.get(false));
    this.observer = new Observer();
    this.speedMenuItem.addElement(
      this.icon.getElement(),
      this.label.getElement(),
      this.slider.getElement(),
      this.checkbox.getElement()
    );
    this.initEvents();
  }

  checkboxEvent(_) {
    this.rememberSpeed.set(this.checkbox.getValue());
  }

  getSpeed() {
    return this.rememberSpeed.get() ? this.speed.get(1) : 1;
  }

  async initApp() {
    this.player.setSpeed(this.getSpeed());
    await this.menu.reopenMenu();
    const label = this.menu.getLabel();
    if (label) {
      this.label.updateLabel(label);
    }
    const player = this.player.getPlayer();
    if (player) {
      this.observer.start(player, this.mutationCallback.bind(this));
    }
    return this.menu.addCustomSpeedItem(this.speedMenuItem);
  }

  initEvents() {
    this.slider.event('change', this.sliderChangeEvent.bind(this));
    this.slider.event('input', this.sliderChangeEvent.bind(this));
    this.slider.event('wheel', this.sliderWheelEvent.bind(this));
    this.checkbox.event('change', this.checkboxEvent.bind(this));
    document.addEventListener('spfdone', this.initApp.bind(this));
  }

  mutationCallback() {
    this.initApp();
  }

  sliderChangeEvent(_) {
    this.updateSpeed(this.slider.getSpeed());
  }

  sliderWheelEvent(event) {
    const current = this.slider.getSpeed();
    const diff = event.deltaY > 0 ? -0.1 : 0.1;
    const value = Math.max(
      Slider.MIN_VALUE,
      Math.min(current + diff, Slider.MAX_VALUE)
    );
    if (current != value) {
      this.slider.setSpeed(value);
      this.updateSpeed(value);
    }
    event.preventDefault();
  }

  updateSpeed(speed) {
    this.speed.set(speed);
    this.player.setSpeed(speed);
    this.label.updateSpeed(speed);
  }
};

// apps/youtube-speed-slider/src/main.ts
const app = new AppController();

async function init() {
  const ok = await app.initApp();
  if (!ok) {
    window.setTimeout(init, 2e3);
  }
}

document.addEventListener('spfdone', init);
init();
