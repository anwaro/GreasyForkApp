import { useMemo } from 'preact/hooks';

import { clsx } from '@utils/clsx';

import { User } from '../../types/User';

type Props = {
  showUsername?: boolean;
  size?: 16 | 24 | 32;
  smallText?: boolean;
  user: User;
  withLink?: boolean;
};

export function GitlabUser({
  showUsername,
  size = 24,
  smallText,
  user,
  withLink,
}: Props) {
  const label = useMemo(() => {
    return (
      <>
        <span class={clsx('gl-mr-2 gl-block', smallText && '!gl-text-sm')}>
          {user.name}
        </span>
        {showUsername && (
          <span class={'gl-block gl-text-secondary !gl-text-sm'}>
            {user.username}
          </span>
        )}
      </>
    );
  }, [smallText, showUsername, user]);

  const iconClsx = [
    `gl-avatar gl-avatar-s${size}`,
    smallText ? 'gl-mr-1' : 'gl-mr-3',
  ];

  return (
    <div class={'gl-flex gl-items-center'}>
      {user.avatarUrl ? (
        <img
          alt={`${user.name}'s avatar`}
          class={clsx(...iconClsx, `gl-avatar-circle`)}
          src={user.avatarUrl}
        />
      ) : (
        <div
          class={clsx(
            ...iconClsx,
            `gl-avatar-identicon gl-avatar-identicon-bg1`
          )}
        >
          {user.name[0].toUpperCase()}
        </div>
      )}
      {withLink ? <a href={user.webUrl}>{label}</a> : <div>{label}</div>}
    </div>
  );
}
