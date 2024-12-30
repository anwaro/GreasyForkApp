import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

import { BaseService } from '../services/BaseService';

export class PreviewPopup extends Component<'div'> {
  static ID = 'play-on-hover-popup';
  private iframe: HTMLIFrameElement;
  private iframeActive = false;

  constructor() {
    super('div', {
      attrs: {
        id: PreviewPopup.ID,
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

    this.iframe = this.element.children[0] as HTMLIFrameElement;

    if (!document.querySelector(`#${PreviewPopup.ID}`)) {
      this.mount(document.body);
      document.addEventListener('click', this.hidePopup.bind(this));
    }
  }

  hidePopup() {
    this.iframeActive = false;
    this.iframe.src = '';
    this.element.style.display = 'none';
  }

  showPopup(e: MouseEvent, url: string, service: BaseService) {
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
}
