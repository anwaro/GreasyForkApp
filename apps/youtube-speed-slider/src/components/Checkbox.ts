import { Component } from '@ui/Component';

export class Checkbox extends Component<'input'> {
  constructor(checked: boolean) {
    super('input', {
      attrs: {
        checked: checked,
        title: 'Remember speed',
        type: 'checkbox',
      },
      styles: {
        width: '20px',
        accentColor: '#f00',
        height: '20px',
        margin: '0',
        padding: '0',
      },
    });
  }

  getValue() {
    return this.element.checked;
  }
}
