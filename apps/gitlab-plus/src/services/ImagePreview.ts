import { Service } from '../types/Service';
import ImagePreviewModal from '../components/ImagePreviewModal';

export default class ImagePreview implements Service {
  private modal = new ImagePreviewModal();

  public init() {
    document.body.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event: HTMLElementEventMap['click']) {
    const element = this.getAnchor(event.target);
    if (!element) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.modal.show(element.href);
    return false;
  }

  validate(element: HTMLAnchorElement) {
    return (
      element.classList.contains('no-attachment-icon') &&
      /\.(png|jpg|jpeg|heic)$/.test(element.href.toLowerCase())
    );
  }

  getAnchor(element: EventTarget | null): HTMLAnchorElement | undefined {
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
}
