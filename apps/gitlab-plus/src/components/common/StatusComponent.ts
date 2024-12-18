import { Component } from '@ui/Component';

import { IconComponent } from './IconComponent';

export class StatusComponent extends Component<'span'> {
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
