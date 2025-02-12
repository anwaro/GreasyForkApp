import { Epic } from '../../../types/Epic';
import { LabelsBlock } from '../../common/bolck/LabelsBlock';
import { useEpicLabels } from './useEpicLabels';

type Props = {
  epic: Epic;
  refresh: () => Promise<void>;
};

export function EpicLabels({ epic, refresh }: Props) {
  const { labels, updateStatus } = useEpicLabels(epic, refresh);
  if (!labels.length) {
    return null;
  }

  return <LabelsBlock labels={labels} updateStatus={updateStatus} />;
}
