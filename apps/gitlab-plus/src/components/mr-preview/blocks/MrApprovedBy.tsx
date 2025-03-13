import { MergeRequest } from '../../../types/Mr';
import { UsersBlock } from '../../common/block/UsersBlock';

type Props = {
  mr: MergeRequest;
};

export function MrApprovedBy({ mr }: Props) {
  return (
    <UsersBlock
      label={'Approved by'}
      pluralLabel={'Approved by'}
      users={mr.approvedBy.nodes}
    />
  );
}
