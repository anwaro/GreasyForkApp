import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

type Props = {
  children?: ComponentChild;
  className?: string;
  gap?: number;
  items?: 'between' | 'center';
  justify?: 'between' | 'center';
};

export function Row({ children, className, gap, items, justify }: Props) {
  return (
    <div
      class={clsx(
        'gl-flex gl-flex-row',
        justify && `gl-justify-${justify}`,
        items && `gl-items-${items}`,
        gap && `gl-gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
}
