import { IconComponent } from './IconComponent';
import { Component } from '@ui/Component';
import { GitlabIcon } from './GitlabIcon';

export class _CloseButton extends Component<'button'> {
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

type Props = {
  onClick: (e: Event) => void;
  title?: string;
};

export function CloseButton({ onClick, title = 'Close' }: Props) {
  return (
    <button
      title={title}
      onClick={onClick}
      class={
        'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon'
      }
    >
      <GitlabIcon icon={'close-xs'} size={16} />
    </button>
  );
}
