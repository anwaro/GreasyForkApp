import { IconComponent } from './IconComponent';
import { Component } from '@ui/Component';

export class StatusComponent extends Component<'span'> {
  constructor(isOpen: boolean) {
    super('span', {
      classes: `gl-badge badge badge-pill ${
        isOpen ? 'badge-success' : 'badge-info'
      }`,
      children: [
        new IconComponent(isOpen ? 'issue-open-m' : 'issue-close', 's16'),
        {
          tag: 'span',
          classes: 'gl-badge-content',
          children: isOpen ? 'Open' : 'Closed',
        },
      ],
    });
  }
}
