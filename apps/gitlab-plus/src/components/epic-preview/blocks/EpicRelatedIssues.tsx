// const relationMap: Record<EpicRelation, string> = {
//   blocks: 'Blocks:',
//   is_blocked_by: 'Is blocked by:',
//   relates_to: 'Related to:',
// };
//
// type Groups = Record<EpicRelation, RelatedEpic[]>;

import { useMemo } from 'preact/hooks';

import { Epic, HierarchyWidget } from '../../../types/Epic';
import { Link } from '../../common/base/Link';
import { InfoBlock } from '../../common/bolck/InfoBlock';

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

  if (!issues.length) {
    return null;
  }

  return (
    <InfoBlock title={`Child issues (${issues.length})`}>
      {issues.map((issue) => (
        <Link key={issue.iid} href={issue.webUrl} title={issue.title}>
          #{issue.iid} {issue.title}
        </Link>
      ))}
    </InfoBlock>
  );
}
