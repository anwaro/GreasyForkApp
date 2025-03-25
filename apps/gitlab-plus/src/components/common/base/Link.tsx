import { useLayoutEffect, useRef, useState } from 'preact/hooks';

import type { ComponentChildren } from 'preact';

import { clsx } from '@utils/clsx';

import { modalZIndex } from '../modal/useOnLinkHover';

type Props = {
  blockHover?: boolean;
  children?: ComponentChildren;
  className?: string;
  href?: string;
  inline?: boolean;
  title?: string;
};

export function Link({
  blockHover,
  children,
  className,
  href,
  inline,
  title,
}: Props) {
  const [zIndex, setZIndex] = useState(modalZIndex + 1);
  const ref = useRef<HTMLAnchorElement>(null!);

  const onHover = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  useLayoutEffect(() => {
    const modal = ref.current?.closest<HTMLDivElement>('.glp-preview-modal');
    setZIndex(
      modal?.style.zIndex ? Number(modal.style.zIndex) + 1 : modalZIndex + 1
    );
  }, []);

  return (
    <a
      data-z-index={zIndex}
      href={href}
      onMouseOver={blockHover ? onHover : undefined}
      ref={ref}
      target={'_blank'}
      title={title}
      class={clsx(
        inline ? 'gl-inline' : 'gl-flex',
        'gl-link sortable-link gl-items-center',
        className
      )}
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </a>
  );
}
