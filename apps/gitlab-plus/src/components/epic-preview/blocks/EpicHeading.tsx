import { Epic } from '../../../types/Epic';
import { HeadingBlock } from '../../common/bolck/HeadingBlock';
import { IssueStatus } from '../../common/IssueStatus';

type Props = {
  epic: Epic;
};

export function EpicHeader({ epic }: Props) {
  return (
    <HeadingBlock
      author={epic.author}
      badge={<IssueStatus isOpen={epic.state === 'OPEN'} />}
      createdAt={epic.createdAt}
      entityId={`&${epic.iid}`}
      icon={'epic'}
      title={epic.title}
    />
  );
}
