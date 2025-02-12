import type { ComponentChild } from 'preact';

import { Row } from '../base/Row';
import { GitlabIcon, GitlabIconNames } from '../GitlabIcon';

type Props = {
  children?: ComponentChild;
  className?: string;
  icon?: GitlabIconNames;
  rightTitle?: ComponentChild;
  title: string;
};

export function InfoBlock({
  children,
  className,
  icon,
  rightTitle,
  title,
}: Props) {
  return (
    <div class={'glp-block gl-relative'}>
      <Row items={'center'} justify={'between'}>
        <Row gap={2} items={'center'}>
          {icon && <GitlabIcon icon={icon} size={16} />}
          <span
            className={'gl-font-bold gl-leading-20 gl-text-gray-900'}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Row>
        {rightTitle}
      </Row>
      <div class={className}>{children}</div>
    </div>
  );
}
