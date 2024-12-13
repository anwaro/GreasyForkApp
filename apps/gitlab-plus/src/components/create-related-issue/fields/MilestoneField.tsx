import { useCallback } from 'preact/hooks';

import { Dom } from '@ui/Dom';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { MilestonesProvider } from '../../../providers/MilestonesProvider';
import { Milestone } from '../../../types/Milestone';
import _AsyncAutocomplete, {
  AsyncAutocomplete,
} from '../../common/form/autocomplete/AsyncAutocomplete';

export class FormMilestone extends _AsyncAutocomplete<Milestone> {
  private milestones = new MilestonesProvider();

  constructor(private link: IssueLinkType) {
    super('Milestone', 'milestones');

    this.load();
  }

  async load(search = '') {
    const milestones = await this.milestones.getMilestones(
      this.link.projectPath,
      search
    );

    this.updateItems(milestones.data.workspace.attributes.nodes, search);
  }

  onChange() {
    // pass
  }

  renderItem(item: Milestone) {
    return Dom.create({
      tag: 'span',
      children: [
        {
          tag: 'span',
          children: {
            tag: 'span',
            children: item.title,
            classes: 'gl-mr-2 gl-block',
          },
          classes: 'gl-flex gl-w-full gl-items-center',
        },
      ],
      classes: 'gl-new-dropdown-item-text-wrapper',
    });
  }

  renderLabel([item]: Milestone[]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.title : 'Select milestone',
    });
  }
}

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
      name={'iterations'}
      renderLabel={renderLabel}
      value={value}
    />
  );
}
