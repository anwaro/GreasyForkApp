import { useMemo } from 'preact/hooks';

import { LabelHelper } from '../../../helpers/LabelHelper';
import { Issue, IssueRelation, RelatedIssue } from '../../../types/Issue';
import { Link } from '../../common/base/Link';
import { ListBlock } from '../../common/block/ListBlock';
import { StatusIndicator } from '../../common/StatusIndicator';

const relationMap: Record<IssueRelation, string> = {
  blocks: 'Blocks',
  is_blocked_by: 'Is blocked by',
  relates_to: 'Related to',
};

type Groups = Record<IssueRelation, RelatedIssue[]>;

type Props = {
  issue: Issue;
};

export function IssueRelatedIssue({ issue }: Props) {
  const groups = useMemo(() => {
    return Object.entries(
      issue.linkedWorkItems.nodes.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.linkType]: [...acc[issue.linkType], issue],
        }),
        {
          blocks: [],
          is_blocked_by: [],
          relates_to: [],
        } satisfies Groups
      )
    ).filter(([_, issues]) => issues.length) as [
      IssueRelation,
      RelatedIssue[]
    ][];
  }, [issue]);

  if (!issue.linkedWorkItems.nodes.length) {
    return null;
  }

  return groups.map(([key, issues]) => (
    <ListBlock
      key={key}
      itemId={(i) => i.workItem.iid}
      items={issues}
      title={`${relationMap[key]} (${issues.length}):`}
      renderItem={(issue) => (
        <Link href={issue.workItem.webUrl} blockHover>
          <StatusIndicator
            label={LabelHelper.getStatusLabelFromWidgets(
              issue.workItem.widgets
            )}
          />
          #{issue.workItem.iid} {issue.workItem.title}
        </Link>
      )}
    />
  ));
}
