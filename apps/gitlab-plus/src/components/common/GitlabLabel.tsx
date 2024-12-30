import { useMemo } from 'preact/hooks';

import { clsx } from '@utils/clsx';

import { Label } from '../../types/Label';
import { GitlabIcon } from './GitlabIcon';

type Props = {
  label: Label;
  onRemove?: () => void;
};

export function GitlabLabel({ label, onRemove }: Props) {
  const [scope, text] = label.title.split('::');

  const props = useMemo(() => {
    const className = [
      'gl-label',
      'hide-collapsed',
      label.textColor === '#FFFFFF'
        ? 'gl-label-text-light'
        : 'gl-label-text-dark',
    ];

    if (label.title.includes('::')) {
      className.push('gl-label-scoped');
    }

    return {
      class: clsx(className),
      style: {
        '--label-background-color': label.color,
        '--label-inset-border': `inset 0 0 0 2px ${label.color}`,
      },
    };
  }, [label]);

  return (
    <span class={props.class} style={props.style}>
      <span class={'gl-link gl-label-link gl-label-link-underline'}>
        <span class={'gl-label-text'}>{scope}</span>
        {text && <span class={'gl-label-text-scoped'}>{text}</span>}
      </span>
      {onRemove && (
        <button
          class={
            'btn gl-label-close !gl-p-0 btn-reset btn-sm gl-button btn-reset-tertiary'
          }
          onClick={onRemove}
          type={'button'}
        >
          <span class={'gl-button-text'}>
            <GitlabIcon icon={'close-xs'} />
          </span>
        </button>
      )}
    </span>
  );
}
