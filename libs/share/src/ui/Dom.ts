import { Component } from './Component';
import { SvgComponent } from './SvgComponent';

type HtmlAttr<K extends keyof HTMLElementTagNameMap> = Partial<
  Record<keyof HTMLElementTagNameMap[K], unknown>
>;

type HtmlEvents<
  E extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
> = Partial<Record<E, (this: HTMLElement, ev: HTMLElementEventMap[E]) => void>>;

export type HtmlItem =
  | Component<keyof HTMLElementTagNameMap>
  | HtmlData
  | HTMLElement;

export type HtmlData<
  K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
> = {
  tag: K;
  attrs?: HtmlAttr<K> & Record<string, unknown>;
  children?: (HtmlItem | SvgItem)[] | HtmlItem | string | SvgItem;
  classes?: string;
  events?: HtmlEvents;
  styles?: Partial<CSSStyleDeclaration>;
};

type SvgAttr<K extends keyof SVGElementTagNameMap> = Partial<
  Record<keyof SVGElementTagNameMap[K], unknown>
>;

type SvgEvents<E extends keyof SVGElementEventMap = keyof SVGElementEventMap> =
  Partial<Record<E, (this: HTMLElement, ev: SVGElementEventMap[E]) => void>>;

export type SvgItem =
  | SvgComponent<keyof SVGElementTagNameMap>
  | SvgData
  | SVGElement;

export type SvgData<
  K extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap
> = {
  tag: K;
  attrs?: SvgAttr<K> & Record<string, string>;
  children?: string | SvgItem | SvgItem[];
  classes?: string;
  events?: SvgEvents;
  styles?: Partial<CSSStyleDeclaration>;
};

export class Dom {
  static appendChildren(
    element: HTMLElement | SVGElement,
    children: HtmlData['children'],
    isSvgMode = false
  ) {
    if (children) {
      element.append(
        ...Dom.array(children).map((item) => {
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
            return Dom.createSvg(item as SvgData);
          }
          return Dom.create(item as HtmlData);
        })
      );
    }
  }

  static applyAttrs(
    element: HTMLElement | SVGElement,
    attrs?: Record<string, unknown>
  ) {
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value === undefined || value === false) {
          element.removeAttribute(key);
        } else {
          element.setAttribute(key, `${value}`);
        }
      });
    }
  }

  static applyClass(element: HTMLElement | SVGElement, classes?: string) {
    if (classes) {
      element.classList.add(...classes.split(' ').filter(Boolean));
    }
  }

  static applyEvents(
    element: HTMLElement | SVGElement,
    events?: Record<string, EventListenerOrEventListenerObject>
  ) {
    if (events) {
      Object.entries(events).forEach(([name, callback]) => {
        element.addEventListener(name, callback);
      });
    }
  }

  static applyStyles(
    element: HTMLElement | SVGElement,
    styles?: Record<string, unknown>
  ) {
    if (styles) {
      Object.entries(styles).forEach(([key, value]) => {
        const name = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        element.style.setProperty(name, value as string);
      });
    }
  }

  static array<T>(element: T | T[]): T[] {
    return Array.isArray(element) ? element : [element];
  }

  static create<
    K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
  >(data: HtmlData<K>): HTMLElementTagNameMap[K] {
    const element = document.createElement(data.tag);

    Dom.appendChildren(element, data.children);
    Dom.applyClass(element, data.classes);
    Dom.applyAttrs(element, data.attrs);
    Dom.applyEvents(element, data.events);
    Dom.applyStyles(element, data.styles);

    return element;
  }

  static createSvg<
    K extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap
  >(data: SvgData<K>): SVGElementTagNameMap[K] {
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      data.tag
    );

    Dom.appendChildren(element, data.children, true);
    Dom.applyClass(element, data.classes);
    Dom.applyAttrs(element, data.attrs);
    Dom.applyEvents(element, data.events);
    Dom.applyStyles(element, data.styles);

    return element;
  }

  static element<
    K extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
  >(
    tag: K,
    classes?: string,
    children?: HtmlData<K>['children']
  ): HTMLElementTagNameMap[K] {
    return Dom.create({ tag, children, classes });
  }

  static elementSvg<
    K extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap
  >(
    tag: K,
    classes?: string,
    children?: SvgData<K>['children']
  ): SVGElementTagNameMap[K] {
    return Dom.createSvg({ tag, children, classes });
  }
}
