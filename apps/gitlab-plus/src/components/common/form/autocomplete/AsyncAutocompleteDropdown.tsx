import type { ReactNode } from 'preact/compat';

import { Component } from '@ui/Component';
import { clsx } from '@utils/clsx';

import { AsyncAutocompleteList } from './AsyncAutocompleteList';
import { AsyncAutocompleteSearch } from './AsyncAutocompleteSearch';
import { OptionItem } from './types';
import { useAsyncAutocompleteRecently } from './useAsyncAutocompleteRecently';
import { useListNavigate } from './useListNavigate';

export class _AsyncAutocompleteDropdown extends Component<'div'> {
  constructor(search: HTMLElement, list: HTMLElement) {
    super('div', {
      children: {
        tag: 'div',
        children: [search, list],
        classes: 'gl-new-dropdown-inner',
      },
      classes: 'gl-new-dropdown-panel gl-absolute',
      events: {
        click: (e) => e.stopPropagation(),
      },
      styles: {
        maxWidth: '800px',
        width: '100%',
        left: '0',
        top: '100%',
      },
    });
  }

  setVisible(visible: boolean) {
    if (visible) {
      this.element.classList.add('!gl-block');
    } else {
      this.element.classList.remove('!gl-block');
    }
  }
}

type Props<D extends OptionItem> = {
  isOpen: boolean;
  name: string;
  onClick: (item: D) => void;
  onClose: () => void;
  options: D[];
  renderOption: (value: D) => ReactNode;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  value: D[];
};

export function AsyncAutocompleteDropdown<D extends OptionItem>({
  isOpen,
  name,
  onClick,
  onClose,
  options,
  renderOption,
  searchTerm,
  setSearchTerm,
  value,
}: Props<D>) {
  const { recently, remove } = useAsyncAutocompleteRecently<D>(name);
  const { index, navigate } = useListNavigate<D>(onClick, onClose);

  return (
    <div
      style={{
        maxWidth: '800px',
        width: '100%',
        left: '0',
        top: '100%',
      }}
      onClick={(e) => e.stopPropagation()}
      class={clsx('gl-new-dropdown-panel gl-absolute', isOpen && '!gl-block')}
    >
      <div class={'gl-new-dropdown-inner'}>
        <AsyncAutocompleteSearch
          navigate={navigate}
          setValue={setSearchTerm}
          value={searchTerm}
        />
        <AsyncAutocompleteList
          onClick={onClick}
          options={options}
          removeFromRecent={remove}
          renderOption={renderOption}
          recently={recently}
          value={value}
        />
      </div>
    </div>
  );
}
