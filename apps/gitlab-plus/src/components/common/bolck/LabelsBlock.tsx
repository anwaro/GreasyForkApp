import { Label } from '../../../types/Label';
import { GitlabLabel } from '../GitlabLabel';
import { InfoBlock } from './InfoBlock';
import { LabelsBlockChangeStatus } from './LabelsBlockChangeStatus';
import { UpdateStatus, useLabelBlock } from './useLabelBlock';

type Props = {
  labels: Label[];
  updateStatus?: UpdateStatus;
};

export function LabelsBlock({ labels, updateStatus }: Props) {
  const {
    isLoading,
    name,
    onSelectStatus,
    showChangeStatusComponent,
    statusLabels,
  } = useLabelBlock(updateStatus);

  if (!labels.length && !updateStatus) {
    return null;
  }

  return (
    <InfoBlock
      className={'issuable-show-labels'}
      icon={'labels'}
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
