import { User } from '../../types/User';
import { Component } from '@ui/Component';

type AvatarSize = 's16' | 's24';

export class _UserComponent extends Component<'div'> {
  constructor(user: User, size: AvatarSize = 's24') {
    super('div', {
      classes: 'gl-flex gl-w-full gl-items-center',
      children: [
        {
          tag: 'img',
          classes: `gl-avatar gl-avatar-circle gl-avatar-${size}`,
          attrs: {
            src: user.avatarUrl,
            alt: `${user.name}'s avatar`,
          },
        },
        {
          tag: 'span',
          classes: 'gl-ml-3',
          children: user.name,
          styles: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      ],
    });
  }
}

type Props = {
  user: User;
  size?: 16 | 24;
};

export function UserComponent({ user, size = 24 }: Props) {
  return (
    <div class={'gl-flex gl-w-full gl-items-center'}>
      <img
        class={`gl-avatar gl-avatar-circle gl-avatar-${size}`}
        src={user.avatarUrl}
        alt={`${user.name}'s avatar`}
      />
      <span
        class={'gl-ml-3'}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {user.name}
      </span>
    </div>
  );
}
