import { useEffect, useState } from 'preact/hooks';

import { Events } from '@ui/Events';

import { IssueLink, IssueLinkType } from '../../helpers/IssueLink';

export type HoverData = {
  link: IssueLinkType;
  position: {
    x: number;
    y: number;
  };
};

export function useOnIssueHover() {
  const [hoverData, setHoverData] = useState<HoverData | undefined>();

  const onHover = (event: HTMLElementEventMap['mouseenter']) => {
    const anchor = event.target as HTMLAnchorElement;
    const link = IssueLink.parseLink(anchor.href);
    if (!link) {
      return;
    }
    anchor.title = '';
    setHoverData({
      link,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    });
  };

  useEffect(() => {
    Events.intendHover<HTMLAnchorElement>(
      (element) => IssueLink.validateLink((element as HTMLAnchorElement).href),
      onHover,
      () => setHoverData(undefined)
    );
  }, []);

  return hoverData;
}
