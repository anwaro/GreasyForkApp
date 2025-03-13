import { useMemo } from 'preact/hooks';

import { Epic, HierarchyWidget, LabelWidget } from '../../../types/Epic';
import { ListBlock } from '../../common/block/ListBlock';
import { GitlabLinkWithLabel } from '../../common/GitlabLinkWithLabel';

type Props = {
  epic: Epic;
};

export function EpicRelatedIssues({ epic }: Props) {
  const issues = useMemo(() => {
    const hierarchyWidget = epic.widgets.find(
      (widget): widget is HierarchyWidget => widget.type === 'HIERARCHY'
    );

    if (!hierarchyWidget) {
      return [];
    }

    return hierarchyWidget.children.nodes;
  }, [epic]);

  const getStatusLabel = (
    item: HierarchyWidget['children']['nodes'][number]
  ) => {
    const labelsWidget = item.widgets.find(
      (w): w is LabelWidget => w.type === 'LABELS'
    );
    console.log(item.title, item.widgets, labelsWidget);
    return labelsWidget?.labels.nodes.find(
      (l) =>
        l.title.toLowerCase().startsWith('status::') ||
        l.title.toLowerCase().startsWith('workflow::')
    );
  };

  return (
    <ListBlock
      icon={'issue-type-issue'}
      itemId={(i) => i.iid}
      items={issues}
      title={`Child issues (${issues.length})`}
      renderItem={(issue) => (
        <GitlabLinkWithLabel
          href={issue.webUrl}
          label={getStatusLabel(issue)}
          title={issue.title}
        >
          #{issue.iid} {issue.title}
        </GitlabLinkWithLabel>
      )}
    />
  );
}
