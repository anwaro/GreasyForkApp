import { useMemo } from 'preact/hooks';

import { User } from '../../types/User';

type Props = {
  showUsername?: boolean;
  size?: 16 | 24 | 32;
  user: User;
  withLink?: boolean;
};

export function GitlabUser({ showUsername, size = 24, user, withLink }: Props) {
  const label = useMemo(() => {
    return (
      <>
        <span class={'gl-mr-2 gl-block'}>{user.name}</span>
        {showUsername && (
          <span class={'gl-block gl-text-secondary !gl-text-sm'}>
            {user.username}
          </span>
        )}
      </>
    );
  }, [withLink, showUsername, user]);

  return (
    <div class={'gl-flex gl-w-full gl-items-center'}>
      {user.avatarUrl ? (
        <img
          alt={`${user.name}'s avatar`}
          class={`gl-mr-3 gl-avatar gl-avatar-circle gl-avatar-s${size}`}
          src={user.avatarUrl}
        />
      ) : (
        <div
          class={`gl-mr-3 gl-avatar gl-avatar-identicon gl-avatar-s${size} gl-avatar-identicon-bg1`}
        >
          {user.name[0].toUpperCase()}
        </div>
      )}
      {withLink ? <a href={user.webUrl}>{label}</a> : <div>{label}</div>}
    </div>
  );
}
