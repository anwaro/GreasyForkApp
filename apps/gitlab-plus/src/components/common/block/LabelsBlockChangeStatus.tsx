import { useCallback } from 'preact/hooks';

import { Label } from '../../../types/Label';
import { AsyncAutocomplete } from '../form/autocomplete/AsyncAutocomplete';
import { GitlabLoader } from '../GitlabLoader';

type Props = {
  isLoading?: boolean;
  name: string;
  onChange: (label: Label) => void;
  options: Label[];
};

export function LabelsBlockChangeStatus({
  isLoading,
  name,
  onChange,
  options,
}: Props) {
  if (isLoading) {
    return <GitlabLoader />;
  }

  const getValues = useCallback(
    async (search: string) => {
      return options.filter((option) => option.title.includes(search));
    },
    [options]
  );

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
    <div className={'gl-py-2'} style={{ width: 130 }}>
      <AsyncAutocomplete<Label>
        hideCheckbox
        buttonSize={'sm'}
        getValues={getValues}
        name={name}
        onChange={([label]) => label && onChange(label)}
        renderLabel={() => 'Change status'}
        renderOption={renderOption}
        value={[]}
      />
    </div>
  );
}
