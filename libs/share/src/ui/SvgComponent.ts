import { Dom, SvgData } from './Dom';

export class SvgComponent<K extends keyof SVGElementTagNameMap> {
  protected element: SVGElementTagNameMap[K];

  constructor(tag: K, props: Omit<SvgData<K>, 'tag'> = {}) {
    this.element = Dom.createSvg({ tag, ...props });
  }

  addClassName(...className: string[]) {
    this.element.classList.add(...className);
  }

  event<K extends keyof SVGElementEventMap>(
    event: K,
    callback: (this: SVGElement, ev: SVGElementEventMap[K]) => void
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.element.addEventListener(event, callback);
  }

  getElement() {
    return this.element;
  }

  mount(parent: HTMLElement | SVGElement) {
    parent.appendChild(this.element);
  }
}
