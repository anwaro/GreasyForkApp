import { Component } from '@ui/Component';

export class _GitlabLoader extends Component<'span'> {
  constructor(size = '1em') {
    super('span', {
      attrs: {
        role: 'status',
      },
      children: {
        tag: 'span',
        classes:
          'gl-spinner gl-spinner-sm gl-spinner-dark !gl-align-text-bottom',
        styles: {
          width: size,
          height: size,
        },
      },
      classes: 'gl-spinner-container',
    });
  }
}

type Props = {
  size?: number | string;
};

export function GitlabLoader({ size = 24 }: Props) {
  return (
    <span role={'status'} class={'gl-spinner-container'}>
      <span
        style={{
          width: size,
          height: size,
        }}
        class={'gl-spinner gl-spinner-sm gl-spinner-dark !gl-align-text-bottom'}
      />
    </span>
  );
}
