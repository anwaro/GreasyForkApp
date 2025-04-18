import { Epic } from '../../../types/Epic';
import { HeadingBlock } from '../../common/block/HeadingBlock';
import { IssueStatus } from '../../common/IssueStatus';

type Props = {
  epic: Epic;
  onRefresh: () => void;
};

export function EpicHeader({ epic, onRefresh }: Props) {
  return (
    <HeadingBlock
      author={epic.author}
      badge={<IssueStatus isOpen={epic.state === 'OPEN'} />}
      createdAt={epic.createdAt}
      entityId={`&${epic.iid}`}
      icon={'epic'}
      link={epic.webUrl}
      onRefresh={onRefresh}
      title={epic.title}
    />
  );
}
