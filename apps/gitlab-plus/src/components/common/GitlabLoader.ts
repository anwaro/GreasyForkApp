import { Component } from '@ui/Component';

export class GitlabLoader extends Component<'span'> {
  constructor(size = '1em') {
    super('span', {
      classes: 'gl-spinner-container',
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
    });
  }
}
