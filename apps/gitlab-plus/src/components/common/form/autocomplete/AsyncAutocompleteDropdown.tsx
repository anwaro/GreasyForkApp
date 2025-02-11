import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { AsyncAutocompleteList } from './AsyncAutocompleteList';
import { AsyncAutocompleteSearch } from './AsyncAutocompleteSearch';
import { OptionItem } from './types';
import { useListNavigate } from './useListNavigate';

type Props<D extends OptionItem> = {
  onClick: (item: D) => void;
  onClose: () => void;
  options: D[];
  recently?: D[];
  removeRecently?: (...recently: D[]) => void;
  renderOption: (value: D) => ComponentChild;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  value: D[];
};

export function AsyncAutocompleteDropdown<D extends OptionItem>({
  onClick,
  onClose,
  options,
  recently = [],
  removeRecently,
  renderOption,
  searchTerm,
  setSearchTerm,
  value,
}: Props<D>) {
  const { activeIndex, navigate } = useListNavigate<D>(
    options,
    recently,
    onClick,
    onClose
  );

  return (
    <div
      class={clsx('gl-new-dropdown-panel gl-absolute !gl-block')}
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: '800px',
        width: '100%',
        left: 'auto',
        right: '0',
        top: '100%',
      }}
    >
      <div class={'gl-new-dropdown-inner'}>
        <AsyncAutocompleteSearch
          navigate={navigate}
          setValue={setSearchTerm}
          value={searchTerm}
        />
        <AsyncAutocompleteList
          activeIndex={activeIndex}
          onClick={onClick}
          options={options}
          recently={recently}
          removeRecently={removeRecently}
          renderOption={renderOption}
          value={value}
        />
      </div>
    </div>
  );
}
