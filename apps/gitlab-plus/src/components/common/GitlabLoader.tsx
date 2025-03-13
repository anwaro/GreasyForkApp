import { useMemo } from 'preact/hooks';

import { Row } from './base/Row';

type Props = {
  asOverlay?: boolean;
  size?: number | string;
};

export function GitlabLoader({ asOverlay, size = 24 }: Props) {
  const loader = useMemo(() => {
    return (
      <span class={'gl-spinner-container'} role={'status'}>
        <span
          class={
            'gl-spinner gl-spinner-sm gl-spinner-dark !gl-align-text-bottom'
          }
          style={{
            width: size,
            height: size,
          }}
        />
      </span>
    );
  }, [size]);

  if (asOverlay) {
    return (
      <Row
        className={'gl-h-full gl-w-full gl-absolute gl-bg-overlay'}
        items={'center'}
        justify={'center'}
      >
        {loader}
      </Row>
    );
  }

  return loader;
}
