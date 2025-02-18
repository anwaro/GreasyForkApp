import { useCallback } from 'preact/hooks';

import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Label } from '../../../types/Label';
import { AsyncAutocomplete } from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabButton } from '../../common/GitlabButton';
import { GitlabLabel } from '../../common/GitlabLabel';

type Props = {
  copyLabels?: VoidFunction;
  projectPath?: string;
  setValue: (value: Label[]) => void;
  value: Label[];
};

export function LabelField({
  copyLabels,
  projectPath,
  setValue,
  value,
}: Props) {
  const getLabels = useCallback(
    async (search: string) => {
      if (!projectPath) {
        return [];
      }
      const response = await new LabelsProvider().getProjectLabels(
        projectPath,
        search
      );
      return response.data.workspace.labels.nodes;
    },
    [projectPath]
  );

  const renderLabel = useCallback((items: Label[]) => {
    return items.length
      ? items.map((i) => i.title).join(', ')
      : 'Select labels';
  }, []);

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
    <>
      <div class={'gl-mt-1 gl-pb-2 gl-flex gl-flex-wrap gl-gap-2'}>
        {value.map((label) => (
          <GitlabLabel
            key={label.id}
            label={label}
            onRemove={() =>
              setValue(value.filter((item) => label.id !== item.id))
            }
          />
        ))}
      </div>
      <div className={'gl-flex gl-gap-1 gl-relative gl-pr-7'}>
        <AsyncAutocomplete
          getValues={getLabels}
          isDisabled={!projectPath}
          name={'labels'}
          onChange={setValue}
          renderLabel={renderLabel}
          renderOption={renderOption}
          value={value}
          isMultiselect
        />
        <div className={'gl-flex gl-absolute gl-h-full gl-right-0'}>
          <GitlabButton
            icon={'labels'}
            onClick={copyLabels}
            title={'Copy labels from parent'}
          />
        </div>
      </div>
    </>
  );
}
