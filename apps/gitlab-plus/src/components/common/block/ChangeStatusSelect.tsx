import { useCallback } from 'preact/hooks';

import { Label } from '../../../types/Label';
import { AsyncAutocomplete } from '../form/autocomplete/AsyncAutocomplete';
import { GitlabLoader } from '../GitlabLoader';
import { useChangeStatusSelect } from './useChangeStatusSelect';

type Props = {
  width?: number;
  getStatusLabels: () => Promise<Label[]>;
  label?: string;
  onStausLabelUpdate: (label: Label) => Promise<void>;
  statusLabel?: Label;
};

export function ChangeStatusSelect({
  width = 130,
  getStatusLabels,
  label = 'Change status',
  onStausLabelUpdate,
  statusLabel,
}: Props) {
  const { filterValues, isLoading, name, onSelectStatus } =
    useChangeStatusSelect({
      getStatusLabels,
      onStausLabelUpdate,
      statusLabel,
    });

  if (isLoading) {
    return <GitlabLoader />;
  }

  const renderOption = useCallback((item: Label) => {
    return (
      <div
        class={'gl-flex gl-flex-1 gl-break-anywhere gl-pb-3 gl-pl-4 gl-pt-3'}
      >
        <span
          class={'dropdown-label-box gl-top-0 gl-mr-3 gl-shrink-0'}
          style={{ backgroundColor: item.color }}
        />
        <span>{item.title}</span>
      </div>
    );
  }, []);

  return (
    <div
      className={'gl-py-2'}
      style={{ width }}
      title={`Current ${statusLabel?.title}`}
    >
      <AsyncAutocomplete<Label>
        hideCheckbox
        buttonSize={'sm'}
        getValues={filterValues}
        name={name}
        onChange={([label]) => label && onSelectStatus(label)}
        renderLabel={() => label}
        renderOption={renderOption}
        value={[]}
      />
    </div>
  );
}
