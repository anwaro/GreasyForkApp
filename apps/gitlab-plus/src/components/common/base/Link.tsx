import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

type Props = {
  blockHover?: boolean;
  children?: ComponentChild;
  className?: string;
  href?: string;
  title?: string;
};

export function Link({ blockHover, children, className, href, title }: Props) {
  const onHover = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  return (
    <a
      class={clsx('gl-block gl-link sortable-link', className)}
      href={href}
      onMouseOver={blockHover ? onHover : undefined}
      target={'_blank'}
      title={title}
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </a>
  );
}
