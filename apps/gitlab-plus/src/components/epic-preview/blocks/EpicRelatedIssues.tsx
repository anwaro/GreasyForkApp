import { useMemo } from 'preact/hooks';

import { LabelHelper } from '../../../helpers/LabelHelper';
import { WidgetHelper } from '../../../helpers/WidgetHelper';
import { Epic, HierarchyWidget, WidgetType } from '../../../types/Epic';
import { Link } from '../../common/base/Link';
import { ListBlock } from '../../common/block/ListBlock';
import { StatusIndicator } from '../../common/StatusIndicator';

type Props = {
  epic: Epic;
};

export function EpicRelatedIssues({ epic }: Props) {
  const issues = useMemo(() => {
    const hierarchyWidget = WidgetHelper.getWidget<HierarchyWidget>(
      epic.widgets,
      WidgetType.hierarchy
    );

    return hierarchyWidget?.children?.nodes || [];
  }, [epic]);

  return (
    <ListBlock
      icon={'issue-type-issue'}
      itemId={(i) => i.iid}
      items={issues}
      title={`Child issues (${issues.length})`}
      renderItem={(issue) => (
        <Link href={issue.webUrl} title={issue.title}>
          <StatusIndicator
            label={LabelHelper.getStatusLabelFromWidgets(issue.widgets)}
          />
          #{issue.iid} {issue.title}
        </Link>
      )}
    />
  );
}
