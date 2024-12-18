import { useCallback } from 'preact/hooks';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { MilestonesProvider } from '../../../providers/MilestonesProvider';
import { Milestone } from '../../../types/Milestone';
import { AsyncAutocomplete } from '../../common/form/autocomplete/AsyncAutocomplete';

type Props = {
  link: IssueLinkType;
  setValue: (value: Milestone[]) => void;
  value: Milestone[];
};

export function MilestoneField({ link, setValue, value }: Props) {
  const getMilestones = useCallback(
    async (search: string) => {
      const response = await new MilestonesProvider().getMilestones(
        link.projectPath,
        search
      );

      return response.data.workspace.attributes.nodes;
    },
    [link]
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
      name={'milestones'}
      renderLabel={renderLabel}
      value={value}
    />
  );
}
