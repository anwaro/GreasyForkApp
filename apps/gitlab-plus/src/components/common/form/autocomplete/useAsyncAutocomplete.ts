import { useMemo, useState } from 'preact/hooks';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { recently: allRecently, remove: removeRecently } =
    useAsyncAutocompleteRecently<D>(name);
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

  const recently = useMemo(() => {
    const optionsIds = options.map((i) => i.id);
    return searchTerm.length
      ? allRecently.filter((i) => optionsIds.includes(i.id))
      : allRecently;
  }, [options, allRecently]);

  return {
    isOpen,
    onClick,
    options: useMemo(() => {
      const recentlyIds = recently.map((i) => i.id);

      return options.filter((i) => !recentlyIds.includes(i.id));
    }, [options, recently]),
    recently,
    removeRecently,
    searchTerm,
    setIsOpen,
    setSearchTerm,
  };
}
