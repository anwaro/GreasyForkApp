import { User } from '../../../types/User';
import { GitlabIconNames } from '../GitlabIcon';
import { GitlabUser } from '../GitlabUser';
import { InfoBlock } from './InfoBlock';
import { ListBlock } from './ListBlock';

type Props = {
  icon?: GitlabIconNames;
  label: string;
  pluralIcon?: GitlabIconNames;
  pluralLabel?: string;
  users?: User[];
};

export function UsersBlock({
  icon,
  label,
  pluralIcon,
  pluralLabel,
  users,
}: Props) {
  if (!users || !users.length) {
    return null;
  }

  if (users.length === 1) {
    return (
      <InfoBlock
        icon={icon || 'user'}
        rightTitle={<GitlabUser user={users[0]} withLink />}
        title={`${label}:`}
      />
    );
  }

  return (
    <ListBlock
      className={'gl-flex gl-flex-col gl-gap-3'}
      icon={pluralIcon || icon || 'users'}
      itemId={(u) => u.id}
      items={users}
      renderItem={(user) => <GitlabUser user={user} withLink />}
      title={pluralLabel || `${label}s`}
    />
  );
}
