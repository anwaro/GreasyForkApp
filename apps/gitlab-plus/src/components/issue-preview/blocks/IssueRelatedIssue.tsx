import { useMemo } from 'preact/hooks';

import { IssueRelation, RelatedIssue } from '../../../types/Issue';
import { GitlabLoader } from '../../common/GitlabLoader';
import { IssueBlock } from './IssueBlock';

const relationMap: Record<IssueRelation, string> = {
  blocks: 'Blocks:',
  is_blocked_by: 'Is blocked by:',
  relates_to: 'Related to:',
};

type Groups = Record<IssueRelation, RelatedIssue[]>;

type Props = {
  isLoading: boolean;
  relatedIssues: RelatedIssue[];
};

export function IssueRelatedIssue({ isLoading, relatedIssues }: Props) {
  const groups = useMemo(() => {
    const initValue: Groups = {
      blocks: [],
      is_blocked_by: [],
      relates_to: [],
    };
    return Object.entries(
      relatedIssues.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.linkType]: [...acc[issue.linkType], issue],
        }),
        initValue
      )
    ).filter(([_, issues]) => issues.length);
  }, [relatedIssues]);

  const onHover = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  if (isLoading) {
    return (
      <div className={'gl-flex gl-items-center gl-justify-center'}>
        <GitlabLoader />
      </div>
    );
  }

  if (!relatedIssues.length) {
    return null;
  }

  return (
    <IssueBlock tile={''}>
      {groups.map(([key, issues]) => (
        <div key={key} style={{ marginTop: 10 }}>
          <div class={'item-title gl-flex gl-min-w-0 gl-gap-3'}>
            <span>{relationMap[key as IssueRelation]}</span>
          </div>
          {issues.map((issue) => (
            <a
              key={issue.iid}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onMouseOver={onHover}
              class={'gl-block gl-link sortable-link'}
              href={issue.webUrl}
            >
              #{issue.iid} {issue.title}
            </a>
          ))}
        </div>
      ))}
    </IssueBlock>
  );
}
