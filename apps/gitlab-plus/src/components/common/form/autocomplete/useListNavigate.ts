import { useState } from 'preact/hooks';

import { OptionItem } from './types';

export function useListNavigate<D extends OptionItem>(
  options: D[],
  recent: D[],
  onClick: (item: D) => void,
  onClose: () => void
) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = (key: string) => {
    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      const total = recent.length + options.length;
      const diff = key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((activeIndex + diff + total) % total);
    } else if (key === 'Enter') {
      const allItems = [...recent, ...options];
      if (-1 < activeIndex && activeIndex < allItems.length) {
        onClick(allItems[activeIndex]);
      }
    } else if (key === 'Escape') {
      onClose();
    }
  };

  return {
    activeIndex,
    navigate,
  };
}
