import { useEffect } from 'preact/hooks';

import { GitlabEpicLink } from '../../helpers/LinkParser';
import { useEpicLabels } from '../common/hooks/useEpicLabels';
import { useFetchEpic } from '../epic-preview/useFetchEpic';

type Props = {
  link: GitlabEpicLink;
};

export function useEpicStatusSelect({ link }: Props) {
  const { entityData, fetch, onRefresh } = useFetchEpic();
  const { updateStatus } = useEpicLabels({
    epic: entityData?.entity,
    link,
    refetch: onRefresh,
  });

  useEffect(() => {
    fetch(link);
  }, []);

  return updateStatus;
}
