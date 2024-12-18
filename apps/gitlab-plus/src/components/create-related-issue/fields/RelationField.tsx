import { issueRelation, IssueRelation } from '../../../types/Issue';

type Props = {
  setValue: (value: IssueRelation | null) => void;
  value: IssueRelation | null;
};

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
