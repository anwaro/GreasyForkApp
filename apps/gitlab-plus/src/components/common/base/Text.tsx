import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

type Props = {
  children?: ComponentChild;
  className?: string;
  color?: 'danger' | 'success';
  size?: 'sm' | 'subtle';
  variant?: 'secondary';
  weight?: 'bold';
};

export function Text({
  children,
  className,
  color,
  size,
  variant,
  weight,
}: Props) {
  return (
    <span
      class={clsx(
        size && `gl-text-${size}`,
        weight && `gl-font-${weight}`,
        variant && `gl-text-${variant}`,
        color && `gl-text-${color}`,
        className
      )}
    >
      {children}
    </span>
  );
}
