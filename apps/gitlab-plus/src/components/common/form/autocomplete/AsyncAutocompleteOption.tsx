import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { CloseButton } from '../../CloseButton';
import { GitlabIcon } from '../../GitlabIcon';
import { OptionItem } from './types';

type Props<D extends OptionItem> = {
  isActive?: boolean;
  onClick: (item: D) => void;
  option: D;
  removeFromRecent?: (value: D) => void;
  renderOption: (value: D) => ComponentChild;
  selected: D[];
};

export function AsyncAutocompleteOption<D extends OptionItem>({
  isActive,
  onClick,
  option,
  removeFromRecent,
  renderOption,
  selected,
}: Props<D>) {
  const selectedIds = selected.map((i) => i.id);
  const selectedClass = (id: number | string) =>
    selectedIds.includes(id) ? 'glp-selected' : '';

  return (
    <li
      class={clsx(
        'gl-new-dropdown-item',
        selectedClass(option.id),
        isActive && 'glp-active'
      )}
      onClick={() => onClick(option)}
    >
      <span class={'gl-new-dropdown-item-content'}>
        <GitlabIcon
          icon={'mobile-issue-close'}
          className={'glp-item-check gl-pr-2'}
          size={16}
        />
        {renderOption(option)}
        {removeFromRecent && (
          <CloseButton
            onClick={(e: Event) => {
              e.preventDefault();
              e.stopPropagation();
              removeFromRecent(option);
            }}
            title={'Remove from recently used'}
          />
        )}
      </span>
    </li>
  );
}
