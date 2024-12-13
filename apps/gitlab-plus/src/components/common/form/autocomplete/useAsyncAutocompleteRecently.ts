import { useEffect, useRef, useState } from 'preact/hooks';

import { RecentProvider } from '../../../../providers/RecentProvider';
import { OptionItem } from './types';

export function useAsyncAutocompleteRecently<D extends OptionItem>(
  name: string
) {
  const store = useRef(new RecentProvider<D>(name));
  const [recently, setRecently] = useState<D[]>([]);

  const refresh = () => {
    console.log(name, store.current.key, store.current.cache.prefix);
    setRecently(store.current.get());
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    add: (...items: D[]) => {
      store.current.add(...items);
      refresh();
    },
    recently,
    remove: (...items: D[]) => {
      store.current.remove(...items);
      refresh();
    },
  };
}
