import { useCallback } from 'preact/hooks';
import { MilestonesProvider } from '../../../providers/MilestonesProvider';
import { Milestone } from '../../../types/Milestone';
import { AsyncAutocomplete } from '../../common/form/autocomplete/AsyncAutocomplete';

type Props = {
  projectPath?: string;
  setValue: (value: Milestone[]) => void;
  value: Milestone[];
};

export function MilestoneField({ projectPath, setValue, value }: Props) {
  const getMilestones = useCallback(
    async (search: string) => {
      if (!projectPath) {
        return [];
      }
      const response = await new MilestonesProvider().getMilestones(
        projectPath,
        search
      );

      return response.data.workspace.attributes.nodes;
    },
    [projectPath]
  );

  const renderLabel = useCallback(([item]: Milestone[]) => {
    return item ? item.title : 'Select milestone';
  }, []);

  const renderOption = useCallback((item: Milestone) => {
    return (
      <span class={'gl-new-dropdown-item-text-wrapper'}>
        <span class={'gl-flex gl-w-full gl-items-center'}>
          <span class={'gl-mr-2 gl-block'}>{item.title}</span>
        </span>
      </span>
    );
  }, []);

  return (
    <AsyncAutocomplete
      onChange={setValue}
      renderOption={renderOption}
      getValues={getMilestones}
      isDisabled={!projectPath}
      name={'milestones'}
      renderLabel={renderLabel}
      value={value}
    />
  );
}
