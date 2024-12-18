import { Component } from '@ui/Component';

import { GitlabIcon } from './GitlabIcon';
import { IconComponent } from './IconComponent';

export class _CloseButton extends Component<'button'> {
  constructor(onClick?: (e: Event) => void, title = 'Close') {
    super('button', {
      attrs: {
        title,
        type: 'button',
      },
      children: new IconComponent('close-xs', 's16'),
      classes:
        'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon',
      events: {
        click: onClick,
      },
    });
  }
}

type Props = {
  onClick: (e: Event) => void;
  title?: string;
};

export function CloseButton({ onClick, title = 'Close' }: Props) {
  return (
    <button
      class={
        'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon'
      }
      onClick={onClick}
      title={title}
    >
      <GitlabIcon icon={'close-xs'} size={16} />
    </button>
  );
}
