import { User } from '../../types/User';
import { Component } from '@ui/Component';

type AvatarSize = 's16' | 's24';

export class UserComponent extends Component<'div'> {
  constructor(user: User, size: AvatarSize = 's24') {
    super('div', {
      classes: 'gl-flex gl-w-full gl-items-center',
      children: [
        {
          tag: 'img',
          classes: `gl-avatar gl-avatar-circle gl-avatar-${size}`,
          attrs: {
            src: user.avatarUrl,
            alt: "${assignee.name}'s avatar",
          },
        },
        {
          tag: 'span',
          classes: 'gl-ml-3',
          children: user.name,
        },
      ],
    });
  }
}
