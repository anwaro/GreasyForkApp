import { MergeRequest } from '../../../types/Mr';
import { UsersBlock } from '../../common/bolck/UsersBlock';

type Props = {
  mr: MergeRequest;
};

export function MrApprovedBy({ mr }: Props) {
  return (
    <UsersBlock
      assignees={mr.approvedBy.nodes}
      label={'Approved by'}
      pluralLabel={'Approved by'}
    />
  );
}
