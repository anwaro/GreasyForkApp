import { ComponentChildren } from 'preact';
import { useMemo } from 'preact/hooks';

import { Label } from '../../types/Label';
import { Link } from './base/Link';

type Props = {
  blockHover?: boolean;
  children: ComponentChildren;
  href: string;
  label?: Label;
  title?: string;
};

export function GitlabLinkWithLabel({
  blockHover,
  children,
  href,
  label,
  title,
}: Props) {
  const status = useMemo(() => {
    if (label) {
      return (
        <div
          title={label.title}
          style={{
            minWidth: 10,
            width: 10,
            backgroundColor: label.color,
            borderRadius: 10,
            height: 10,
            marginRight: 2,
          }}
        />
      );
    }
    return null;
  }, [label]);

  return (
    <Link blockHover={blockHover} href={href} title={title}>
      {status}
      {children}
    </Link>
  );
}
