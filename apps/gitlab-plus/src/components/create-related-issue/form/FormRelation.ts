import { Field } from '../../common/form/Field';
import { Dom } from '@ui/Dom';

export class FormRelation extends Field {
  public value = '';

  constructor() {
    const container = Dom.element('div', 'linked-issue-type-radio');
    super('New issue', container);

    container.append(
      this.radio('blocks current issue', 'blocks'),
      this.radio('is blocked by current issue', 'is_blocked_by'),
      this.radio('relates to current issue', 'related')
    );
  }

  onChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  radio(label: string, value: string) {
    const id = `input-${Math.random()}`;
    return Dom.create({
      tag: 'div',
      classes: 'gl-form-radio custom-control custom-radio',
      children: [
        {
          tag: 'input',
          classes: 'custom-control-input',
          attrs: {
            id,
            name: 'linked-issue-type-radio',
            value: value,
            type: 'radio',
          },
          events: {
            change: this.onChange.bind(this),
          },
        },
        {
          tag: 'label',
          classes: 'custom-control-label',
          attrs: {
            for: id,
          },
          children: label,
        },
      ],
    });
  }

  reset() {
    this.value = '';
  }
}
