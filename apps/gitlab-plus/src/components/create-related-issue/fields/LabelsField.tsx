import { useCallback } from 'preact/hooks';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Label } from '../../../types/Label';
import { AsyncAutocomplete } from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabLabel } from '../../common/GitlabLabel';

type Props = {
  link: IssueLinkType;
  setValue: (value: Label[]) => void;
  value: Label[];
};

export function LabelField({ link, setValue, value }: Props) {
  const getLabels = useCallback(
    async (search: string) => {
      const response = await new LabelsProvider().getLabels(
        link.projectPath,
        search
      );
      return response.data.workspace.labels.nodes;
    },
    [link]
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
            onRemove={() =>
              setValue(value.filter((item) => label.id !== item.id))
            }
            label={label}
          />
        ))}
      </div>
      <AsyncAutocomplete
        isMultiselect
        onChange={setValue}
        renderOption={renderOption}
        getValues={getLabels}
        name={'labels'}
        renderLabel={renderLabel}
        value={value}
      />
    </>
  );
}
