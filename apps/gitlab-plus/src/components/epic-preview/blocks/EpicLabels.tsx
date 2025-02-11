import { useMemo } from 'preact/hooks';

import { Epic, LabelWidget } from '../../../types/Epic';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabLabel } from '../../common/GitlabLabel';

type Props = {
  epic: Epic;
};

export function EpicLabels({ epic }: Props) {
  const labels = useMemo(() => {
    const labelWidget = epic.widgets.find(
      (widget): widget is LabelWidget => widget.type === 'LABELS'
    );
    if (labelWidget) {
      return labelWidget.labels.nodes;
    }
    return [];
  }, [epic]);

  if (!labels.length) {
    return null;
  }

  return (
    <InfoBlock className={'issuable-show-labels'} title={'Labels'}>
      {labels.map((label) => (
        <GitlabLabel key={label.id} label={label} />
      ))}
    </InfoBlock>
  );
}
