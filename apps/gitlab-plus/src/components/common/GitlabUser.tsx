import { User } from '../../types/User';

type Props = {
  user: User;
  size?: 16 | 24 | 32;
  showUsername?: boolean;
};

export function GitlabUser({ user, showUsername, size = 24 }: Props) {
  return (
    <div class={'gl-flex gl-w-full gl-items-center'}>
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          class={`gl-mr-3 gl-avatar gl-avatar-circle gl-avatar-s${size}`}
          alt={`${user.name}'s avatar`}
        />
      ) : (
        <div
          class={`gl-mr-3 gl-avatar gl-avatar-identicon gl-avatar-s${size} gl-avatar-identicon-bg1`}
        >
          {user.name[0].toUpperCase()}
        </div>
      )}
      <span>
        <span class={'gl-mr-2 gl-block'}>{user.name}</span>
        {showUsername && (
          <span class={'gl-block gl-text-secondary !gl-text-sm'}>
            {user.username}
          </span>
        )}
      </span>
    </div>
  );
}
