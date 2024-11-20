import Dropdown from '../../common/form/Dropdown';
import { MilestonesProvider } from '../../../providers/MilestonesProvider';
import { RecentProvider } from '../../../providers/RecentProvider';
import { IssueLinkType } from '../../../helpers/IssueLink';
import { Milestone } from '../../../types/Milestone';
import { Dom } from '@ui/Dom';

export default class FormMilestone extends Dropdown<Milestone> {
  private milestones = new MilestonesProvider();
  private recent = new RecentProvider<Milestone>('milestones');
  private searchMilestones: (search: string) => void;

  constructor(private link: IssueLinkType) {
    super('Milestone');
    this.searchMilestones = this.milestones.debounce(this.load.bind(this));

    this.load();
  }

  async load(title = '') {
    const milestones = await this.milestones.getMilestones(
      this.link.projectPath,
      title
    );

    this.updateItems(
      milestones.data.workspace.attributes.nodes,
      this.recent.get()
    );
  }

  getValue() {
    const [value] = this.value;
    if (value) {
      this.recent.add(value);
    }
    return value;
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

  filter(search: string) {
    this.searchMilestones(search);
  }
}
