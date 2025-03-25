import { User } from '../../../types/User';
import { GitlabButton } from '../GitlabButton';
import { GitlabIconNames } from '../GitlabIcon';
import { GitlabLoader } from '../GitlabLoader';
import { GitlabUser } from '../GitlabUser';
import { InfoBlock } from './InfoBlock';
import { ListBlock } from './ListBlock';

type Assign = {
  isLoading: boolean;
  onUpdate: () => void;
};

type Props = {
  assign?: Assign;
  icon?: GitlabIconNames;
  label: string;
  pluralIcon?: GitlabIconNames;
  pluralLabel?: string;
  users?: User[];
};

export function UsersBlock({
  assign,
  icon,
  label,
  pluralIcon,
  pluralLabel,
  users = [],
}: Props) {
  if (!users.length && !assign) {
    return null;
  }

  if (!users.length && assign) {
    return (
      <InfoBlock
        icon={icon || 'user'}
        title={`${label}:`}
        rightTitle={
          assign.isLoading ? (
            <GitlabLoader />
          ) : (
            <GitlabButton onClick={assign.onUpdate}>
              Assign yourself
            </GitlabButton>
          )
        }
      />
    );
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
