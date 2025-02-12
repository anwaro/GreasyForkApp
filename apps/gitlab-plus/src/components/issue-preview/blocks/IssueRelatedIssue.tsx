import { useMemo } from 'preact/hooks';

import { Issue, IssueRelation, RelatedIssue } from '../../../types/Issue';
import { Link } from '../../common/base/Link';
import { InfoBlock } from '../../common/bolck/InfoBlock';

const relationMap: Record<IssueRelation, string> = {
  blocks: 'Blocks:',
  is_blocked_by: 'Is blocked by:',
  relates_to: 'Related to:',
};

type Groups = Record<IssueRelation, RelatedIssue[]>;

type Props = {
  issue: Issue;
};

export function IssueRelatedIssue({ issue }: Props) {
  const groups = useMemo(() => {
    const initValue: Groups = {
      blocks: [],
      is_blocked_by: [],
      relates_to: [],
    };
    return Object.entries(
      issue.linkedWorkItems.nodes.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.linkType]: [...acc[issue.linkType], issue],
        }),
        initValue
      )
    ).filter(([_, issues]) => issues.length);
  }, [issue]);

  if (!issue.linkedWorkItems.nodes.length) {
    return null;
  }

  return (
    <InfoBlock title={''}>
      {groups.map(([key, issues]) => (
        <div key={key} style={{ marginTop: 10 }}>
          <div class={'item-title gl-flex gl-min-w-0 gl-gap-3'}>
            <span>{relationMap[key as IssueRelation]}</span>
          </div>
          {issues.map((issue) => (
            <Link
              key={issue.workItem.iid}
              href={issue.workItem.webUrl}
              blockHover
            >
              #{issue.workItem.iid} {issue.workItem.title}
            </Link>
          ))}
        </div>
      ))}
    </InfoBlock>
  );
}
