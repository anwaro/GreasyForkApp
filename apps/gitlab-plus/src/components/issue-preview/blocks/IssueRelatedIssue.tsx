import { useMemo } from 'preact/hooks';

import { LabelWidget } from '../../../types/Epic';
import { Issue, IssueRelation, RelatedIssue } from '../../../types/Issue';
import { ListBlock } from '../../common/block/ListBlock';
import { GitlabLinkWithLabel } from '../../common/GitlabLinkWithLabel';

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
    ).filter(([_, issues]) => issues.length) as [
      IssueRelation,
      RelatedIssue[]
    ][];
  }, [issue]);

  const getStatusLabel = (item: RelatedIssue) => {
    const labelsWidget = item.workItem.widgets.find(
      (w): w is LabelWidget => w.type === 'LABELS'
    );
    return labelsWidget?.labels.nodes.find(
      (l) =>
        l.title.toLowerCase().startsWith('status::') ||
        l.title.toLowerCase().startsWith('workflow::')
    );
  };

  if (!issue.linkedWorkItems.nodes.length) {
    return null;
  }

  return (
    <>
      {groups.map(([key, issues]) => (
        <ListBlock
          key={key}
          itemId={(i) => i.workItem.iid}
          items={issues}
          title={`${relationMap[key]} (${issues.length}):`}
          renderItem={(issue) => (
            <GitlabLinkWithLabel
              href={issue.workItem.webUrl}
              label={getStatusLabel(issue)}
              blockHover
            >
              #{issue.workItem.iid} {issue.workItem.title}
            </GitlabLinkWithLabel>
          )}
        />
      ))}
    </>
  );
}
