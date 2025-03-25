import { useEffect, useRef, useState } from 'preact/hooks';

import { Events } from '@ui/Events';

import { Position } from './PreviewModal';

export type LinkParserFunction<LinkType> = (
  link: string
) => LinkType | undefined;
export type LinkValidatorFunction = (link?: string) => boolean;

export const modalZIndex = 5000;

export function useOnLinkHover<LinkType>(
  parser: LinkParserFunction<LinkType>,
  validator: LinkValidatorFunction
) {
  const [hoverPosition, setHoverPosition] = useState<Position>({ x: 0, y: 0 });
  const [hoverLink, setHoverLink] = useState<LinkType | undefined>();
  const [zIndex, setZIndex] = useState(modalZIndex);
  const hoverLinkRef = useRef(false);

  const onHover = (event: HTMLElementEventMap['mouseenter']) => {
    const anchor = event.target as HTMLAnchorElement;
    const link = parser(anchor.href);
    if (!link) {
      return;
    }
    anchor.title = '';
    setHoverLink(link);
    setZIndex(
      anchor.dataset.zIndex ? Number(anchor.dataset.zIndex) : modalZIndex
    );
    setHoverPosition({
      x: event.clientX + 15,
      y: event.clientY,
    });
  };

  useEffect(() => {
    Events.intendHover<HTMLAnchorElement>(
      (element) => validator((element as HTMLAnchorElement).href),
      onHover,
      () => {
        setTimeout(() => {
          if (!hoverLinkRef.current) {
            setHoverLink(undefined);
          }
        }, 50);
      }
    );
  }, []);

  return {
    hoverLink,
    hoverPosition,
    onLinkEnter: () => (hoverLinkRef.current = true),
    onLinkLeave: () => {
      hoverLinkRef.current = false;
      setHoverLink(undefined);
    },
    zIndex,
  };
}
