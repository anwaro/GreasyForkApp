import { useEffect, useMemo, useState } from 'preact/hooks';

type Zoom = 'auto' | 'contains';

export function useImagePreviewModal() {
  const [zoom, setZoom] = useState<Zoom>('contains');
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

  const style = useMemo(() => {
    if (zoom === 'auto') {
      return {
        cursor: 'zoom-out',
        display: 'block',
        margin: '0 auto',
        padding: 15,
      };
    }
    return {
      maxWidth: '95vw',
      cursor: 'zoom-in',
      display: 'block',
      margin: '0 auto',
      maxHeight: '95vh',
    };
  }, [zoom]);

  return {
    onClose: () => {
      setSrc('');
      setZoom('contains');
    },
    onZoom: () => setZoom(zoom === 'auto' ? 'contains' : 'auto'),
    src,
    style,
  };
}
