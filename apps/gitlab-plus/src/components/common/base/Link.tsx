import { useLayoutEffect, useRef, useState } from 'preact/hooks';

import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { modalZIndex } from '../useOnLinkHover';

type Props = {
  blockHover?: boolean;
  children?: ComponentChild;
  className?: string;
  href?: string;
  title?: string;
};

export function Link({ blockHover, children, className, href, title }: Props) {
  const [zIndex, setZIndex] = useState(modalZIndex + 1);
  const ref = useRef<HTMLAnchorElement>(null!);

  const onHover = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  useLayoutEffect(() => {
    const modal = ref.current?.closest<HTMLDivElement>(
      '.glp-issue-preview-modal'
    );
    setZIndex(
      modal?.style.zIndex ? Number(modal.style.zIndex) + 1 : modalZIndex + 1
    );
  }, []);

  return (
    <a
      class={clsx('gl-block gl-link sortable-link', className)}
      data-z-index={zIndex}
      href={href}
      onMouseOver={blockHover ? onHover : undefined}
      ref={ref}
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
