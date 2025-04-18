import { useMemo } from 'preact/hooks';

import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { Link } from '../base/Link';
import { Row } from '../base/Row';
import { GitlabIcon, GitlabIconNames } from '../GitlabIcon';

type Props = {
  children?: ComponentChild;
  className?: string;
  contentMaxHeight?: number | string;
  icon?: GitlabIconNames;
  link?: string;
  rightTitle?: ComponentChild;
  title: ComponentChild;
  titleClassName?: string;
};

export function InfoBlock({
  children,
  className,
  contentMaxHeight,
  icon,
  link,
  rightTitle,
  title,
  titleClassName,
}: Props) {
  const style = useMemo(() => {
    if (contentMaxHeight) {
      return {
        maxHeight: contentMaxHeight,
        overflowY: 'auto',
      };
    }
    return {};
  }, [contentMaxHeight]);

  return (
    <div
      class={'gl-relative gl-w-full gl-py-2 gl-border-b gl-border-b-solid'}
      style={{ borderColor: 'var(--gl-border-color-subtle)' }}
    >
      <Row className={'gl-px-3'} items={'center'} justify={'between'}>
        <Row gap={2} items={'center'}>
          {icon && <GitlabIcon icon={icon} size={16} />}
          <h5 className={clsx('gl-my-0', titleClassName)}>
            {title}
            {link && (
              <Link className={'gl-ml-3'} href={link} blockHover inline>
                <GitlabIcon icon={'symlink'} size={16} />
              </Link>
            )}
          </h5>
        </Row>
        {rightTitle}
      </Row>
      <div style={style}>
        <div class={clsx('gl-px-3', className)}>{children}</div>
      </div>
    </div>
  );
}
