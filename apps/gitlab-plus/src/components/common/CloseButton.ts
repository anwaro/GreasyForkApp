import { IconComponent } from './IconComponent';
import { Component } from '@ui/Component';

export class CloseButton extends Component<'button'> {
  constructor(onClick?: (e: Event) => void, title = 'Close') {
    super('button', {
      classes:
        'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon',
      attrs: {
        type: 'button',
        title,
      },
      events: {
        click: onClick,
      },
      children: new IconComponent('close-xs', 's16'),
    });
  }
}
