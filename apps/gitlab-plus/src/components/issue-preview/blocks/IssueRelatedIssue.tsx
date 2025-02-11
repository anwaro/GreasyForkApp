import { useMemo } from 'preact/hooks';

import { IssueRelation, RelatedIssue } from '../../../types/Issue';
import { Link } from '../../common/base/Link';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabLoader } from '../../common/GitlabLoader';

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
    <InfoBlock title={''}>
      {groups.map(([key, issues]) => (
        <div key={key} style={{ marginTop: 10 }}>
          <div class={'item-title gl-flex gl-min-w-0 gl-gap-3'}>
            <span>{relationMap[key as IssueRelation]}</span>
          </div>
          {issues.map((issue) => (
            <Link key={issue.iid} href={issue.webUrl} blockHover>
              #{issue.iid} {issue.title}
            </Link>
          ))}
        </div>
      ))}
    </InfoBlock>
  );
}
