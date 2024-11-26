import { BaseService } from '../services/BaseService';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

export class PreviewPopup extends Component<'div'> {
  static ID = 'play-on-hover-popup';
  private iframe: HTMLIFrameElement;
  private iframeActive = false;

  constructor() {
    super('div', {
      attrs: {
        id: PreviewPopup.ID,
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

    this.iframe = this.element.children[0] as HTMLIFrameElement;

    if (!document.querySelector(`#${PreviewPopup.ID}`)) {
      this.mount(document.body);
      document.addEventListener('click', this.hidePopup.bind(this));
    }
  }

  showPopup(e: MouseEvent, url: string, service: BaseService) {
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
}
