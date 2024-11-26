import Dropdown from '../../common/form/Dropdown';
import { MilestonesProvider } from '../../../providers/MilestonesProvider';
import { IssueLinkType } from '../../../helpers/IssueLink';
import { Milestone } from '../../../types/Milestone';
import { Dom } from '@ui/Dom';

export default class FormMilestone extends Dropdown<Milestone> {
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

  renderItem(item: Milestone) {
    return Dom.create({
      tag: 'span',
      classes: 'gl-new-dropdown-item-text-wrapper',
      children: [
        {
          tag: 'span',
          classes: 'gl-flex gl-w-full gl-items-center',
          children: {
            tag: 'span',
            classes: 'gl-mr-2 gl-block',
            children: item.title,
          },
        },
      ],
    });
  }

  renderLabel([item]: Milestone[]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.title : 'Select milestone',
    });
  }

  onChange() {}
}
