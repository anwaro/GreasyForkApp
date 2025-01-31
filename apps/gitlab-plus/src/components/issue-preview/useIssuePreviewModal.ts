import { useEffect, useRef, useState } from 'preact/hooks';

import { delay } from '@utils/delay';

import { GitlabIssueLink } from '../../helpers/LinkParser';
import { useFetchIssue } from './useFetchIssue';
import { useOnIssueHover } from './useOnIssueHover';

export function useIssuePreviewModal() {
  const ref = useRef<HTMLDivElement>(null!);
  const [isVisible, setIsVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const { hoverLink, hoverPosition, onIssueEnter, onIssueLeave } =
    useOnIssueHover();
  const { fetch, issue, relatedIssues, reset } = useFetchIssue();

  const fetchData = async (link: GitlabIssueLink) => {
    await fetch(link);
    await delay(300);

    const rect = ref.current.getBoundingClientRect();
    const dY = rect.height + rect.top - window.innerHeight;

    if (dY > 0) {
      setOffset(dY + 15);
    }
  };

  useEffect(() => {
    if (hoverLink) {
      fetchData(hoverLink);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      reset();
      setOffset(0);
    }
  }, [hoverLink]);

  return {
    issue,
    isVisible,
    onIssueEnter,
    onIssueLeave,
    position: {
      ...hoverPosition,
      offset,
    },
    ref,
    relatedIssues,
  };
}
