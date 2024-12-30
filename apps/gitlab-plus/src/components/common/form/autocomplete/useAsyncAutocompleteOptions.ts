import { useCallback, useEffect, useState } from 'preact/hooks';

import { useDebounce } from '@utils/useDebounce';

import { OptionItem } from './types';

export function useAsyncAutocompleteOptions<D extends OptionItem>(
  searchTerm: string,
  getValues: (search: string) => Promise<D[]>
) {
  const [options, setOptions] = useState<D[]>([]);
  const term = useDebounce(searchTerm);

  const loadOptions = useCallback(async (term: string) => {
    const items = await getValues(term);
    setOptions(items);
  }, []);

  useEffect(() => {
    loadOptions(term);
  }, [term]);

  return options;
}
