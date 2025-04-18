import { GitlabEpicLink } from '../../../helpers/LinkParser';
import { Epic } from '../../../types/Epic';
import { LabelsBlock } from '../../common/block/LabelsBlock';
import { useEpicLabels } from '../../common/hooks/useEpicLabels';

type Props = {
  epic: Epic;
  link: GitlabEpicLink;
  refresh: () => Promise<void>;
};

export function EpicLabels({ epic, link, refresh }: Props) {
  const { labels, updateStatus } = useEpicLabels({
    epic,
    link,
    refetch: refresh,
  });

  if (!labels.length) {
    return null;
  }

  return <LabelsBlock labels={labels} updateStatus={updateStatus} />;
}
