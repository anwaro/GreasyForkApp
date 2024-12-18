import { useEffect, useRef, useState } from 'preact/hooks';

import { RecentlyProvider } from '../../../../providers/RecentlyProvider';
import { OptionItem } from './types';

export function useAsyncAutocompleteRecently<D extends OptionItem>(
  name: string
) {
  const store = useRef(new RecentlyProvider<D>(name));
  const [recently, setRecently] = useState<D[]>([]);

  const refresh = () => {
    setRecently(store.current.get());
  };

  useEffect(() => {
    refresh();
    store.current.onChange(refresh);
  }, []);

  return {
    add: store.current.add,
    recently,
    remove: store.current.remove,
  };
}
