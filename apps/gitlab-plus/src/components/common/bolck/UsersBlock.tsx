import { User } from '../../../types/User';
import { GitlabUser } from '../GitlabUser';
import { InfoBlock } from './InfoBlock';

type Props = {
  assignees?: User[];
  label: string;
  pluralLabel?: string;
};

export function UsersBlock({ assignees, label, pluralLabel }: Props) {
  if (!assignees || !assignees.length) {
    return null;
  }

  if (assignees.length === 1) {
    return (
      <InfoBlock
        className={'gl-flex gl-flex-col gl-gap-3'}
        rightTitle={<GitlabUser user={assignees[0]} withLink />}
        title={`${label}:`}
      />
    );
  }

  return (
    <InfoBlock
      className={'gl-flex gl-flex-col gl-gap-3'}
      title={pluralLabel || `${label}s`}
    >
      {assignees.map((assignee) => (
        <GitlabUser key={assignee.id} user={assignee} withLink />
      ))}
    </InfoBlock>
  );
}
