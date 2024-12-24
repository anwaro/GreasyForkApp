import { Component } from '@ui/Component';
import { clsx } from '@utils/clsx';

import { GitlabIcon } from './GitlabIcon';
import { IconComponent } from './IconComponent';

export class _StatusComponent extends Component<'span'> {
  constructor(isOpen: boolean) {
    super('span', {
      children: [
        new IconComponent(isOpen ? 'issue-open-m' : 'issue-close', 's16'),
        {
          tag: 'span',
          children: isOpen ? 'Open' : 'Closed',
          classes: 'gl-badge-content',
        },
      ],
      classes: `gl-badge badge badge-pill ${
        isOpen ? 'badge-success' : 'badge-info'
      }`,
    });
  }
}

type Props = {
  isOpen: boolean;
};

export function IssueStatus({ isOpen }: Props) {
  return (
    <span
      class={clsx(
        'gl-badge badge badge-pill',
        isOpen ? 'badge-success' : 'badge-info'
      )}
    >
      <GitlabIcon icon={isOpen ? 'issue-open-m' : 'issue-close'} size={16} />
      <span class={'gl-badge-content'}>{isOpen ? 'Open' : 'Closed'}</span>
    </span>
  );
}
