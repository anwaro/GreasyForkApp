import { useEffect, useRef, useState } from 'preact/hooks';

import { Events } from '@ui/Events';

import { IssueLink, IssueLinkType } from '../../helpers/IssueLink';

export type Position = {
  x: number;
  y: number;
};

export function useOnIssueHover() {
  const [hoverLink, setHoverLink] = useState<IssueLinkType | undefined>();
  const hoverIssueRef = useRef(false);
  const [hoverPosition, setHoverPosition] = useState<Position>({ x: 0, y: 0 });

  const onHover = (event: HTMLElementEventMap['mouseenter']) => {
    const anchor = event.target as HTMLAnchorElement;
    const link = IssueLink.parseLink(anchor.href);
    if (!link) {
      return;
    }
    anchor.title = '';
    setHoverLink(link);
    setHoverPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    Events.intendHover<HTMLAnchorElement>(
      (element) => IssueLink.validateLink((element as HTMLAnchorElement).href),
      onHover,
      () => {
        setTimeout(() => {
          if (!hoverIssueRef.current) {
            setHoverLink(undefined);
          }
        }, 50);
      }
    );
  }, []);

  return {
    hoverLink,
    hoverPosition,
    onIssueEnter: () => (hoverIssueRef.current = true),
    onIssueLeave: () => {
      hoverIssueRef.current = false;
      setHoverLink(undefined);
    },
  };
}
