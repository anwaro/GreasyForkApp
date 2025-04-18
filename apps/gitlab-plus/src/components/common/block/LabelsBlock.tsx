import { Label } from '../../../types/Label';
import { GitlabLabel } from '../GitlabLabel';
import { ChangeStatusSelect } from './ChangeStatusSelect';
import { InfoBlock } from './InfoBlock';

export type UpdateLabelStatus = {
  getStatusLabels: () => Promise<Label[]>;
  onStausLabelUpdate: (label: Label) => Promise<void>;
  statusLabel?: Label;
};

type Props = {
  labels: Label[];
  updateStatus?: UpdateLabelStatus;
};

export function LabelsBlock({ labels, updateStatus }: Props) {
  if (!labels.length && !updateStatus) {
    return null;
  }

  return (
    <InfoBlock
      className={'issuable-show-labels'}
      icon={'labels'}
      title={'Labels'}
      rightTitle={
        updateStatus && (
          <ChangeStatusSelect
            getStatusLabels={updateStatus.getStatusLabels}
            onStausLabelUpdate={updateStatus.onStausLabelUpdate}
            statusLabel={updateStatus.statusLabel}
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
