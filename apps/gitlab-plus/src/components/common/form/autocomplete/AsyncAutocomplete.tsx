import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { AsyncAutocompleteButton } from './AsyncAutocompleteButton';
import { AsyncAutocompleteDropdown } from './AsyncAutocompleteDropdown';
import { OptionItem } from './types';
import { useAsyncAutocomplete } from './useAsyncAutocomplete';

type Props<D extends OptionItem> = {
  getValues: (search: string) => Promise<D[]>;
  isDisabled?: boolean;
  isMultiselect?: boolean;
  name: string;
  onChange: (values: D[]) => void;
  renderLabel: (value: D[]) => ComponentChild;
  renderOption: (value: D) => ComponentChild;
  value: D[];
};

export function AsyncAutocomplete<D extends OptionItem>({
  getValues,
  isDisabled,
  isMultiselect = false,
  name,
  onChange,
  renderLabel,
  renderOption,
  value,
}: Props<D>) {
  const {
    isOpen,
    onClick,
    options,
    recently,
    removeRecently,
    searchTerm,
    setIsOpen,
    setSearchTerm,
  } = useAsyncAutocomplete<D>(name, value, getValues, onChange, isMultiselect);

  return (
    <div
      class={clsx(
        'gl-relative gl-w-full gl-new-dropdown !gl-block',
        isDisabled && 'gl-pointer-events-none gl-opacity-5'
      )}
    >
      <AsyncAutocompleteButton<D>
        isOpen={isOpen}
        renderLabel={renderLabel}
        reset={() => onChange([])}
        setIsOpen={setIsOpen}
        value={value}
      />
      {isOpen && (
        <AsyncAutocompleteDropdown<D>
          onClick={onClick}
          onClose={() => setIsOpen(false)}
          options={options}
          removeRecently={removeRecently}
          renderOption={renderOption}
          recently={recently}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          value={value}
        />
      )}
    </div>
  );
}
