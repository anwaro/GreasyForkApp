import { IconComponent } from './IconComponent';
import { Component } from '@ui/Component';

export class CloseButton extends Component<'button'> {
  constructor(onClick?: () => void) {
    super('button', {
      classes:
        'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon',
      attrs: {
        type: 'button',
      },
      events: {
        click: onClick,
      },
      children: [new IconComponent('close-xs', 's16').getElement()],
    });
  }
}
