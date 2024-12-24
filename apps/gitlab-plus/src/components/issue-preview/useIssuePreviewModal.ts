import { useEffect, useRef, useState } from 'preact/hooks';

import { useFetchIssue } from './useFetchIssue';
import { useOnIssueHover } from './useOnIssueHover';

export function useIssuePreviewModal() {
  const ref = useRef<HTMLDivElement>(null!);
  const [isVisible, setIsVisible] = useState(false);
  const hoverData = useOnIssueHover();
  const { fetch, issue, relatedIssues, reset } = useFetchIssue();

  useEffect(() => {
    if(hoverData){
      fetch(hoverData.link)
      setIsVisible(true)

    } else {
      setIsVisible(false)
      reset();
    }
  }, [hoverData]);

  return {
    issue,
    isVisible,
    ref,
    relatedIssues,
  };
}
