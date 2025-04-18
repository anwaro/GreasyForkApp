import { useEffect } from 'preact/hooks';

import { GitlabIssueLink } from '../../helpers/LinkParser';
import { useIssueLabels } from '../common/hooks/useIssueLabels';
import { useFetchIssue } from '../issue-preview/useFetchIssue';

type Props = {
  link: GitlabIssueLink;
};

export function useIssueStatusSelect({ link }: Props) {
  const { entityData, fetch, onRefresh } = useFetchIssue();
  const { updateStatus } = useIssueLabels({
    issue: entityData?.entity,
    link,
    refetch: onRefresh,
  });

  useEffect(() => {
    fetch(link);
  }, []);

  return updateStatus;
}
