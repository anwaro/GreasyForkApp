// ==UserScript==
// @name         Vimeo Player Speed Slider
// @namespace    lukaszmical.pl
// @version      1.1.4
// @description  Add Speed Slider to Vimeo Player Settings
// @author       Łukasz Micał
// @include      https://*.vimeo.com/*
// @include      https://vimeo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vimeo.com
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

// apps/vimeo-speed-slider/src/components/Checkbox.ts
const Checkbox = class extends Component {
  constructor(checked) {
    super('input', {
      attrs: {
        checked,
        title: 'Remember speed',
        type: 'checkbox',
      },
      styles: {
        width: '16px',
        accentColor: 'var(--color-two)',
        appearance: 'auto',
        height: '16px',
        margin: '0',
        padding: '0',
      },
    });
  }

  initEvents(onChange) {
    this.event('change', () => onChange(this.element.checked));
  }

  setValue(checked) {
    this.element.checked = checked;
  }
};

// apps/vimeo-speed-slider/src/components/Label.ts
const Label = class extends Component {
  constructor() {
    super('span');
    this.label = 'Speed';
    this.speed = '1.0';
  }

  init() {
    const originalItemLabel = Elements.menuSpeedLabel();
    if (originalItemLabel) {
      this.label = originalItemLabel.innerText;
      this.element.className = originalItemLabel.className;
    }
    const itemLabel = Elements.menuItemLabel();
    if (itemLabel) {
      this.element.className = itemLabel.className;
    }
    this.render();
  }

  setSpeed(speed) {
    this.speed = speed.toFixed(1);
    this.render();
  }

  render() {
    this.element.innerText = `${this.label}: ${this.speed}`;
  }
};

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

// apps/vimeo-speed-slider/src/components/Slider.ts
const Slider = class _Slider extends Component {
  static {
    this.MAX_VALUE = 4;
  }
  static {
    this.MIN_VALUE = 0.5;
  }

  constructor() {
    super('input', {
      attrs: {
        max: _Slider.MAX_VALUE,
        min: _Slider.MIN_VALUE,
        step: 0.1,
        type: 'range',
      },
      classes: 'vis-slider',
      styles: {
        minWidth: '150px',
        width: 'calc(100% - 30px)',
        background: '#ffffff66',
        borderRadius: '3px',
        height: '6px',
        margin: '0 10px',
        outline: 'none',
        padding: '0',
      },
    });
    GlobalStyle.addStyle(
      'vis-slider',
      `input[type='range'].vis-slider {
            -webkit-appearance: none;
          }

          input[type='range'].vis-slider::-moz-range-thumb ,
          input[type='range'].vis-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background: #fff;
            cursor: pointer;
            margin-top: -2px;
          }`
    );
  }

  getSpeed() {
    return parseFloat(this.element.value);
  }

  initEvents(onChange) {
    this.event('change', () => onChange(this.getSpeed()));
    this.event('input', () => onChange(this.getSpeed()));
    this.event('wheel', (event) => {
      event.stopPropagation();
      event.preventDefault();
      const diff = event.deltaY > 0 ? -0.1 : 0.1;
      onChange(this.getSpeed() + diff);
      return false;
    });
  }

  setSpeed(speed) {
    this.updateBg(speed);
    this.element.value = speed.toString();
  }

  updateBg(value) {
    const progress =
      ((value - _Slider.MIN_VALUE) / (_Slider.MAX_VALUE - _Slider.MIN_VALUE)) *
      100;
    this.element.style.background =
      'linear-gradient(to right, COLOR1 0%, COLOR1 STEP%, COLOR2 STEP%, COLOR2 100%)'
        .replaceAll('COLOR1', 'var(--color-two)')
        .replaceAll('COLOR2', '#ffffff66')
        .replaceAll('STEP', progress.toFixed(1));
  }
};

// apps/vimeo-speed-slider/src/components/MenuItem.ts
const MenuItem = class _MenuItem extends Component {
  constructor(setSpeed, setRemember) {
    super('div', { attrs: { id: _MenuItem.ID } });
    this.checkbox = new Checkbox(false);
    this.label = new Label();
    this.slider = new Slider();
    this.wrapper = Dom.create({
      tag: 'div',
      styles: {
        alignItems: 'center',
        display: 'flex',
      },
    });
    this.wrapper.append(this.checkbox.getElement(), this.slider.getElement());
    this.element.append(this.label.getElement(), this.wrapper);
    this.slider.initEvents(setSpeed);
    this.checkbox.initEvents(setRemember);
  }

  static {
    this.ID = 'vis-menu-speed-item';
  }

  mountItem() {
    const originalSpeedItem = Elements.menuSpeedItem();
    const originalQualityItem = Elements.menuQualityItem();
    if (!originalSpeedItem && !originalQualityItem) {
      this.element.parentNode?.removeChild(this.element);
      return;
    }
    originalSpeedItem?.style.setProperty('display', 'none');
    if (!this.element.parentNode) {
      if (originalSpeedItem) {
        originalSpeedItem.after(this.element);
      } else if (originalQualityItem) {
        originalQualityItem.after(this.element);
      }
      this.label.init();
      this.element.className =
        Elements.menuItem()?.className || this.element.className;
    }
  }

  setRemember(state) {
    this.checkbox.setValue(state);
  }

  setSpeed(speed) {
    this.slider.setSpeed(speed);
    this.label.setSpeed(speed);
  }
};

// apps/vimeo-speed-slider/src/components/Elements.ts
var Elements = class _Elements {
  static menu() {
    return _Elements.ref('[data-menu="prefs"] [class^=Menu_module_menuPanel]');
  }

  static menuItem() {
    return _Elements.ref(
      '[data-menu="prefs"] [class^=Menu_module_menuPanel] [class^=MenuOption_module_option]'
    );
  }

  static menuItemLabel() {
    return _Elements.menuItem()?.querySelector('span');
  }

  static menuItemWithLabel(labels) {
    const optionItems = [
      ...document.querySelectorAll(
        '[data-menu="prefs"] [class^=MenuOption_module_option]'
      ),
    ];
    return optionItems.find(
      (e) =>
        e.id !== MenuItem.ID &&
        labels.some((text) => e.innerText.includes(text))
    );
  }

  static menuQualityItem() {
    return _Elements.menuItemWithLabel([
      'Quality',
      'Calidad',
      'Qualit\xE4t',
      'Qualit\xE9',
      'Qualidade',
      '\u753B\u8CEA',
      '\uACE0\uD654\uC9C8',
    ]);
  }

  static menuSpeedItem() {
    return _Elements.menuItemWithLabel([
      'Speed',
      'Velocidad',
      'Geschwindigkeit',
      'Vitesse',
      'Velocidade',
      '\u30B9\u30D4\u30FC\u30C9',
      '\uC18D\uB3C4',
    ]);
  }

  static menuSpeedLabel() {
    return _Elements.menuSpeedItem()?.querySelector('span');
  }

  static ref(selector) {
    return document.querySelector(selector);
  }

  static video() {
    return _Elements.ref('.vp-video video');
  }
};

// apps/vimeo-speed-slider/src/components/Player.ts
const Player = class _Player {
  constructor() {
    this.player = null;
    this.speed = 1;
  }

  static {
    this.READY_FLAG = 'vis-listener';
  }

  checkPlayerSpeed() {
    const player = this.getPlayer();
    if (player && Math.abs(player.playbackRate - this.speed) > 0.01) {
      player.playbackRate = this.speed;
      setTimeout(this.checkPlayerSpeed.bind(this), 200);
    }
  }

  getPlayer() {
    if (!this.player) {
      this.player = Elements.video();
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

  setSpeed(speed) {
    this.speed = speed;
    const player = this.getPlayer();
    if (player !== null) {
      player.playbackRate = speed;
    }
  }
};

// apps/vimeo-speed-slider/src/controllers/AppController.ts
const AppController = class {
  constructor() {
    this.menuObserver = new Observer();
    this.player = new Player();
    this.videoObserver = new Observer();
    this.rememberSpeed = new Store('vis-remember-speed');
    this.speed = new Store('vis-speed');
    this.item = new MenuItem(
      this.setSpeed.bind(this),
      this.setRemember.bind(this)
    );
    this.setSpeed(this.getSpeed());
    this.setRemember(this.rememberSpeed.get(false));
  }

  getSpeed() {
    return this.rememberSpeed.get(false) ? this.speed.get(1) : 1;
  }

  init() {
    const video = Elements.video();
    const menu = Elements.menu();
    if (video && menu) {
      this.videoObserver.start(video, this.mount.bind(this));
      this.menuObserver.start(menu, this.mount.bind(this));
      this.mount();
      this.setSpeed(this.getSpeed());
      return true;
    }
    return false;
  }

  mount() {
    this.item.mountItem();
  }

  setRemember(state) {
    this.rememberSpeed.set(state);
    this.item.setRemember(state);
  }

  setSpeed(speed) {
    this.speed.set(speed);
    this.player.setSpeed(speed);
    this.item.setSpeed(speed);
  }
};

// apps/vimeo-speed-slider/src/main.ts
const app = new AppController();
let attempt = 0;

function init() {
  if (attempt <= 4 && !app.init()) {
    attempt++;
    window.setTimeout(init, 2e3);
  }
}

init();
