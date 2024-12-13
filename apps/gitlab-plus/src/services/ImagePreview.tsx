import { render } from 'preact';

import { ImagePreviewModal } from '../components/ImagePreviewModal';
import { Service } from '../types/Service';

export class ImagePreview extends Service {
  public init() {
    render(
      <ImagePreviewModal onClick={this.onClick.bind(this)} />,
      this.rootBody('glp-image-preview-root')
    );
  }

  private getAnchor(
    element: EventTarget | null
  ): HTMLAnchorElement | undefined {
    if (!element) {
      return undefined;
    }
    if (element instanceof HTMLAnchorElement) {
      return this.validate(element) ? element : undefined;
    }
    if (
      element instanceof HTMLImageElement &&
      element.parentElement instanceof HTMLAnchorElement
    ) {
      return this.validate(element.parentElement)
        ? element.parentElement
        : undefined;
    }

    return undefined;
  }

  private onClick(target: HTMLElement) {
    const element = this.getAnchor(target);
    return element?.href;
  }

  private validate(element: HTMLAnchorElement) {
    return (
      element.classList.contains('no-attachment-icon') &&
      /\.(png|jpg|jpeg|heic)$/.test(element.href.toLowerCase())
    );
  }
}
