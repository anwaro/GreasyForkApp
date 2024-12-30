import { useEffect, useRef, useState } from 'preact/hooks';

import { RecentlyProvider } from '../../../../providers/RecentlyProvider';
import { OptionItem } from './types';

export function useAsyncAutocompleteRecently<D extends OptionItem>(
  name: string
) {
  const store = useRef(new RecentlyProvider<D>(name));
  const [recently, setRecently] = useState<D[]>(store.current.get());

  useEffect(() => {
    store.current.onChange(() => {
      setRecently(store.current.get());
    });
  }, []);

  return {
    add: store.current.add.bind(store.current),
    recently,
    remove: store.current.remove.bind(store.current),
  };
}
