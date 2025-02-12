import { User } from '../../../types/User';
import { GitlabIconNames } from '../GitlabIcon';
import { GitlabUser } from '../GitlabUser';
import { InfoBlock } from './InfoBlock';

type Props = {
  assignees?: User[];
  icon?: GitlabIconNames;
  label: string;
  pluralIcon?: GitlabIconNames;
  pluralLabel?: string;
};

export function UsersBlock({
  assignees,
  icon,
  label,
  pluralIcon,
  pluralLabel,
}: Props) {
  if (!assignees || !assignees.length) {
    return null;
  }

  if (assignees.length === 1) {
    return (
      <InfoBlock
        className={'gl-flex gl-flex-col gl-gap-3'}
        icon={icon || 'user'}
        rightTitle={<GitlabUser user={assignees[0]} withLink />}
        title={`${label}:`}
      />
    );
  }

  return (
    <InfoBlock
      className={'gl-flex gl-flex-col gl-gap-3'}
      icon={pluralIcon || icon || 'users'}
      title={pluralLabel || `${label}s`}
    >
      {assignees.map((assignee) => (
        <GitlabUser key={assignee.id} user={assignee} withLink />
      ))}
    </InfoBlock>
  );
}
