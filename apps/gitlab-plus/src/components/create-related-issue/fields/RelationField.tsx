import { Dom } from '@ui/Dom';

import { issueRelation, IssueRelation } from '../../../types/Issue';
import { _FormField } from '../../common/form/FormField';

export class FormRelation extends _FormField {
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
      children: [
        {
          tag: 'input',
          attrs: {
            id,
            name: 'linked-issue-type-radio',
            type: 'radio',
            value: value,
          },
          classes: 'custom-control-input',
          events: {
            change: this.onChange.bind(this),
          },
        },
        {
          tag: 'label',
          attrs: {
            for: id,
          },
          children: label,
          classes: 'custom-control-label',
        },
      ],
      classes: 'gl-form-radio custom-control custom-radio',
    });
  }

  reset() {
    this.value = '';
  }
}

type Props = {
  setValue: (value: IssueRelation | null) => void;
  value: IssueRelation | null;
};

/*
        {
          tag: 'label',
          attrs: {
            for: id,
          },
          children: label,
          classes: 'custom-control-label',
        },
 */

const labels = (relation: IssueRelation | null) => {
  switch (relation) {
    case 'blocks':
      return 'blocks current issue';
    case 'is_blocked_by':
      return 'is blocked by current issue';
    case 'relates_to':
      return 'relates to current issue';
    default:
      return 'is not related to current issue';
  }
};

export function RelationField({ setValue, value }: Props) {
  return (
    <div class={'linked-issue-type-radio'}>
      {[...issueRelation, null].map((relation) => (
        <div key={relation} class={'gl-form-radio custom-control custom-radio'}>
          <input
            id={`create-related-issue-relation-${relation}`}
            onChange={() => setValue(relation)}
            checked={value === relation}
            class={'custom-control-input'}
            name={'linked-issue-type-radio'}
            type={'radio'}
            value={relation ?? ''}
          />
          <label
            for={`create-related-issue-relation-${relation}`}
            class={'custom-control-label'}
          >
            {labels(relation)}
          </label>
        </div>
      ))}
    </div>
  );
}
