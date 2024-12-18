import { Component } from '@ui/Component';

import { User } from '../../types/User';

type AvatarSize = 's16' | 's24';

export class _UserComponent extends Component<'div'> {
  constructor(user: User, size: AvatarSize = 's24') {
    super('div', {
      children: [
        {
          tag: 'img',
          attrs: {
            alt: `${user.name}'s avatar`,
            src: user.avatarUrl,
          },
          classes: `gl-avatar gl-avatar-circle gl-avatar-${size}`,
        },
        {
          tag: 'span',
          children: user.name,
          classes: 'gl-ml-3',
          styles: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      ],
      classes: 'gl-flex gl-w-full gl-items-center',
    });
  }
}
