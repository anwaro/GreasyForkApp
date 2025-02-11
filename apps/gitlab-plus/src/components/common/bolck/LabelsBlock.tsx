import { Label } from '../../../types/Label';
import { GitlabLabel } from '../GitlabLabel';
import { InfoBlock } from './InfoBlock';
import { LabelsBlockChangeStatus } from './LabelsBlockChangeStatus';
import { useLabelBlock } from './useLabelBlock';

type Props = {
  labels: Label[];
  onStatusChange?: (projectPath: string, label: Label) => Promise<void>;
  projectPath?: string;
};

export function LabelsBlock({ labels, onStatusChange, projectPath }: Props) {
  const {
    isLoading,
    name,
    onSelectStatus,
    showChangeStatusComponent,
    statusLabels,
  } = useLabelBlock(onStatusChange, projectPath);

  if (!labels.length && !onStatusChange) {
    return null;
  }

  return (
    <InfoBlock
      className={'issuable-show-labels'}
      title={'Labels'}
      rightTitle={
        showChangeStatusComponent && (
          <LabelsBlockChangeStatus
            isLoading={isLoading}
            name={name}
            onChange={onSelectStatus}
            options={statusLabels}
          />
        )
      }
    >
      {labels.map((label) => (
        <GitlabLabel key={label.id} label={label} />
      ))}
    </InfoBlock>
  );
}
