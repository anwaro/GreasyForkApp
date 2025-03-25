import { useEffect, useRef, useState } from 'preact/hooks';

export type FetchFunction<LinkType> = (link: LinkType) => void;

export function usePreviewModal<LinkType>(
  link: LinkType | undefined,
  fetch: FetchFunction<LinkType>,
  reset: VoidFunction,
  isLoading: boolean
) {
  const [isVisible, setIsVisible] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        const rect = ref.current.getBoundingClientRect();
        const dY = rect.height + rect.top - window.innerHeight;
        const dX = rect.width + rect.left - window.innerWidth;

        setOffset({
          x: dX > 0 ? dX + 15 : 0,
          y: dY > 0 ? dY + 15 : 0,
        });
      }, 300);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isVisible) {
      setOffset({ x: 0, y: 0 });
    }
  }, [isVisible]);

  useEffect(() => {
    if (link) {
      fetch(link);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      reset();
    }
  }, [link]);

  return {
    isVisible,
    offset,
    ref,
  };
}
