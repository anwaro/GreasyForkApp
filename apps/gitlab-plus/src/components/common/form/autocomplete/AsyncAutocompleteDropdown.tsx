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
      style={{
        maxWidth: '800px',
        width: '100%',
        left: '0',
        top: '100%',
      }}
      onClick={(e) => e.stopPropagation()}
      class={clsx('gl-new-dropdown-panel gl-absolute !gl-block')}
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
          removeRecently={removeRecently}
          renderOption={renderOption}
          activeIndex={activeIndex}
          recently={recently}
          value={value}
        />
      </div>
    </div>
  );
}
