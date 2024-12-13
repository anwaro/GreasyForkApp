import { useState } from 'preact/hooks';

import { OptionItem } from './types';
import { useAsyncAutocompleteOptions } from './useAsyncAutocompleteOptions';
import { useAsyncAutocompleteRecently } from './useAsyncAutocompleteRecently';

export function useAsyncAutocomplete<D extends OptionItem>(
  name: string,
  value: D[],
  getValues: (search: string) => Promise<D[]>,
  onChange: (items: D[]) => void,
  isMultiselect: boolean
) {
  const { recently } = useAsyncAutocompleteRecently<D>(name);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const options = useAsyncAutocompleteOptions(searchTerm, getValues);

  const onClick = (item: D) => {
    if (isMultiselect) {
      if (value.find((i) => i.id === item.id)) {
        onChange(value.filter((i) => i.id !== item.id));
      } else {
        onChange([...value, item]);
      }
    } else {
      onChange([item]);
      setIsOpen(false);
    }
  };

  return {
    isOpen,
    onClick,
    options,
    recently,
    searchTerm,
    setIsOpen,
    setSearchTerm,
  };
}
