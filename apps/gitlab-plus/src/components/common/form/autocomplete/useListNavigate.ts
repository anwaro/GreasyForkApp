import { useState } from 'preact/hooks';

import { OptionItem } from './types';

export function useListNavigate<D extends OptionItem>(
  onClick: (item: D) => void,
  onClose: () => void
) {
  const [index, setindex] = useState(false);

  // useEffect(() => {
  //   setData(true);
  // }, [data]);

  return {
    index,
    navigate: () => {},
  };
}
