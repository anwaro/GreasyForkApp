import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { CloseButton } from '../../CloseButton';
import { GitlabIcon } from '../../GitlabIcon';
import { OptionItem } from './types';

type Props<D extends OptionItem> = {
  hideCheckbox?: boolean;
  isActive?: boolean;
  onClick: (item: D) => void;
  option: D;
  removeFromRecent?: (value: D) => void;
  renderOption: (value: D) => ComponentChild;
  selected: D[];
};

export function AsyncAutocompleteOption<D extends OptionItem>({
  hideCheckbox = false,
  isActive,
  onClick,
  option,
  removeFromRecent,
  renderOption,
  selected,
}: Props<D>) {
  const selectedIds = selected.map((i) => i.id);
  const selectedClass = (id: number | string) => selectedIds.includes(id);

  return (
    <li
      onClick={() => onClick(option)}
      class={clsx(
        'gl-new-dropdown-item',
        // selectedClass(option.id),
        isActive && 'glp-active'
      )}
    >
      <span class={'gl-new-dropdown-item-content'}>
        {!hideCheckbox && (
          <GitlabIcon
            className={'glp-item-check gl-pr-2'}
            icon={selectedClass(option.id) ? 'mobile-issue-close' : ''}
            size={16}
          />
        )}
        {renderOption(option)}
        {removeFromRecent && (
          <CloseButton
            title={'Remove from recently used'}
            onClick={(e: Event) => {
              e.preventDefault();
              e.stopPropagation();
              removeFromRecent(option);
            }}
          />
        )}
      </span>
    </li>
  );
}
