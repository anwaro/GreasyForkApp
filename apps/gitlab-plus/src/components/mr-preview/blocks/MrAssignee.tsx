import { MergeRequest } from '../../../types/Mr';
import { UsersBlock } from '../../common/bolck/UsersBlock';

type Props = {
  mr: MergeRequest;
};

export function MrAssignee({ mr }: Props) {
  return (
    <UsersBlock
      assignees={mr.assignees.nodes}
      icon={'assignee'}
      label={'Assignee'}
    />
  );
}
