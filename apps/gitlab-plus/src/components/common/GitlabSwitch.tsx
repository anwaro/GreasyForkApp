import { clsx } from '@utils/clsx';

import { GitlabIcon } from './GitlabIcon';

type Props = {
  checked: boolean;
  disabled?: boolean;
  onChange: (state: boolean) => void;
};

export function GitlabSwitch({ checked, disabled, onChange }: Props) {
  return (
    <button
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      role="switch"
      type="button"
      className={clsx(
        'gl-toggle gl-shrink-0',
        checked && 'is-checked',
        disabled && 'is-disabled'
      )}
    >
      <span className="toggle-icon">
        <GitlabIcon icon={checked ? 'check-xs' : 'close-xs'} />
      </span>
    </button>
  );
}
