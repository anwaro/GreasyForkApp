export class Events {
  static intendHover<Element extends HTMLElement>(
    validate: (node: EventTarget) => boolean,
    mouseover: (ev: HTMLElementEventMap['mouseover']) => void,
    mouseleave?: (ev: HTMLElementEventMap['mouseleave']) => void,
    timeout = 500
  ) {
    let hover = false;
    let id = 0;

    const onHover = (event: HTMLElementEventMap['mouseover']) => {
      if (!event.target || !validate(event.target)) {
        return;
      }
      const element = event.target as Element;
      hover = true;
      element.addEventListener(
        'mouseleave',
        (ev) => {
          mouseleave?.call(element, ev);
          clearTimeout(id);
          hover = false;
        },
        { once: true }
      );
      clearTimeout(id);
      id = window.setTimeout(() => {
        if (hover) {
          mouseover.call(element as Element, event);
        }
      }, timeout);
    };

    document.body.addEventListener('mouseover', onHover);
  }
}
