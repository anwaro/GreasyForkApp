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
        width: '16px',
        accentColor: 'var(--color-two)',
        appearance: 'auto',
        height: '16px',
        margin: '0',
        padding: '0',
      },
    });
  }

  initEvents(onChange: (state: boolean) => void) {
    this.event('change', () => onChange(this.element.checked));
  }

  setValue(checked: boolean) {
    this.element.checked = checked;
  }
}
