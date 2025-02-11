import { MergeRequest } from '../../../types/Mr';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabLabel } from '../../common/GitlabLabel';

type Props = {
  mr: MergeRequest;
};

export function MrLabels({ mr }: Props) {
  if (!mr.labels.nodes.length) {
    return null;
  }

  return (
    <InfoBlock className={'issuable-show-labels'} title={'Labels'}>
      {mr.labels.nodes.map((label) => (
        <GitlabLabel key={label.id} label={label} />
      ))}
    </InfoBlock>
  );
}
