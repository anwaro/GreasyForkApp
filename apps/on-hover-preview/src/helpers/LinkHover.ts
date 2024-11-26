import { BaseService } from '../services/BaseService';
import { Events } from '@ui/Events';

export class LinkHover {
  constructor(
    private services: BaseService[],
    private onHover: (e: MouseEvent, url: string, service: BaseService) => void
  ) {
    Events.intendHover(
      this.isValidLink.bind(this),
      this.onAnchorHover.bind(this),
      () => {}
    );
  }

  private anchorElement(node: EventTarget) {
    if (!(node instanceof HTMLElement)) {
      return undefined;
    }
    if (node instanceof HTMLAnchorElement) {
      return node;
    }
    const parent = node.closest('a');
    if (parent instanceof HTMLElement) {
      return parent;
    }
    return undefined;
  }

  private isValidLink(node: EventTarget) {
    const anchor = this.anchorElement(node);
    if (!anchor || !anchor.href || anchor.href === '#') {
      return false;
    }
    const origin = (url: string) => {
      return new URL(url).host.split('.').slice(-2).join('.');
    };
    return origin(anchor.href) !== origin(location.href);
  }

  private async onAnchorHover(ev: HTMLElementEventMap['mouseover']) {
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

  private findService(url: string = '') {
    return this.services.find((service) => service.isValidUrl(url));
  }
}