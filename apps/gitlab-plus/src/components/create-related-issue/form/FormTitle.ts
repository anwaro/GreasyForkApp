import { Field } from '../../common/form/Field';
import { Dom } from '@ui/Dom';

export default class FormTitle extends Field {
  public value = '';

  constructor() {
    const input = Dom.create({
      tag: 'input',
      classes: 'gl-form-input gl-mb-3 form-control is-valid',
      attrs: { placeholder: 'Add a title' },
    });
    super('Title', input, 'Maximum of 255 characters');
    input.addEventListener('input', this.onChange.bind(this));
  }

  onChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  reset() {
    this.value = '';
  }
}
