import { useMemo } from 'preact/hooks';

import type { ComponentChild } from 'preact';

import { Row } from '../base/Row';

type Props = {
  children?: ComponentChild;
  className?: string;
  rightTitle?: ComponentChild;
  title: string;
};

export function InfoBlock({ children, className, rightTitle, title }: Props) {
  const HeaderComponent = useMemo(() => {
    const titleComponent = (
      <span
        className={'gl-font-bold gl-leading-20 gl-text-gray-900'}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    );
    if (rightTitle) {
      return (
        <Row items={'center'} justify={'between'}>
          {titleComponent}
          {rightTitle}
        </Row>
      );
    }

    return titleComponent;
  }, [title, rightTitle]);

  return (
    <div class={'glp-block'}>
      {HeaderComponent}
      <div class={className}>{children}</div>
    </div>
  );
}
