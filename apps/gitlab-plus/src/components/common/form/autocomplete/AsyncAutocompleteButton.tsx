import { useMemo } from 'preact/hooks';

import type { ComponentChild } from 'preact';

import { GitlabIcon, GitlabIconNames } from '../../GitlabIcon';
import { OptionItem } from './types';
import { useAsyncAutocompleteButton } from './useAsyncAutocompleteButton';

type Props<D extends OptionItem> = {
  isOpen: boolean;
  renderLabel: (value: D[]) => ComponentChild;
  reset: () => void;
  setIsOpen: (isOpen: boolean) => void;
  value: D[];
};

export function AsyncAutocompleteButton<D extends OptionItem>({
  isOpen,
  renderLabel,
  reset,
  setIsOpen,
  value,
}: Props<D>) {
  const ref = useAsyncAutocompleteButton(() => setIsOpen(false));

  const icon = useMemo((): GitlabIconNames => {
    if (value.length) {
      return 'close-xs';
    }

    return isOpen ? 'chevron-lg-up' : 'chevron-lg-down';
  }, [isOpen, value]);

  return (
    <button
      class={
        'btn btn-default btn-md btn-block gl-button gl-new-dropdown-toggle'
      }
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(true);
      }}
      ref={ref}
      type={'button'}
    >
      <span class={'gl-button-text gl-w-full'}>
        <span class={'gl-new-dropdown-button-text'}>{renderLabel(value)}</span>
        <span
          onClick={(e) => {
            if (value.length) {
              e.preventDefault();
              reset();
            }
          }}
        >
          <GitlabIcon icon={icon} size={16} />
        </span>
      </span>
    </button>
  );
}
