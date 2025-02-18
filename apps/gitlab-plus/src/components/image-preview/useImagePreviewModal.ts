import { useEffect, useState } from 'preact/hooks';

export function useImagePreviewModal() {
  const [src, setSrc] = useState('');

  const validate = (element: HTMLAnchorElement) => {
    return (
      element.classList.contains('no-attachment-icon') &&
      /\.(png|jpg|jpeg|heic)$/.test(element.href.toLowerCase())
    );
  };

  const getAnchor = (
    element: EventTarget | null
  ): HTMLAnchorElement | undefined => {
    if (!element) {
      return undefined;
    }
    if (element instanceof HTMLAnchorElement) {
      return validate(element) ? element : undefined;
    }
    if (
      element instanceof HTMLImageElement &&
      element.parentElement instanceof HTMLAnchorElement
    ) {
      return validate(element.parentElement)
        ? element.parentElement
        : undefined;
    }

    return undefined;
  };

  useEffect(() => {
    document.body.addEventListener('click', (ev) => {
      const anchor = getAnchor(ev.target as HTMLElement);
      if (anchor) {
        setSrc(anchor.href);
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
    });
  }, []);

  return {
    onClose: () => setSrc(''),
    src,
  };
}
