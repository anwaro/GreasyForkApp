import Dropdown from '../../common/form/Dropdown';
import { UsersProvider } from '../../../providers/UsersProvider';
import { RecentProvider } from '../../../providers/RecentProvider';
import { IssueLinkType } from '../../../helpers/IssueLink';
import { User } from '../../../types/User';
import { Dom } from '@ui/Dom';

export default class FormAssignees extends Dropdown<User> {
  private recent = new RecentProvider<User>('assignees');
  private assignees = new UsersProvider();
  private searchUser: (search: string) => void;

  constructor(private link: IssueLinkType) {
    super('Assignees');
    this.load('');
    this.searchUser = this.assignees.debounce(this.load.bind(this));
  }

  async load(serach: string) {
    const response = await this.assignees.getUsers(
      this.link.projectPath,
      serach
    );

    this.updateItems(response.data.workspace.users, this.recent.get());
  }

  getValue() {
    const [value] = this.value;
    if (value) {
      this.recent.add(value);
    }
    return value;
  }

  renderItem(item: User) {
    const image = Dom.create({
      tag: 'img',
      classes: 'gl-avatar gl-avatar-circle gl-avatar-s32',
      attrs: { src: item.avatarUrl },
    });

    const label = Dom.create({
      tag: 'div',
      classes: 'gl-avatar-labeled-labels !gl-text-left',
      children: [
        {
          tag: 'div',
          classes:
            '-gl-mx-1 -gl-my-1 gl-flex gl-flex-wrap gl-items-center !gl-text-left',
          children: {
            tag: 'span',
            classes: 'gl-avatar-labeled-label',
            children: item.name,
          },
        },
        {
          tag: 'span',
          classes: 'gl-avatar-labeled-sublabel',
          children: item.username,
        },
      ],
    });

    return Dom.create({
      tag: 'span',
      classes:
        'gl-avatar-labeled sidebar-participant gl-relative gl-items-center gl-new-dropdown-item-text-wrapper',
      children: [image, label],
    });
  }

  renderLabel([item]: User[]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.name : 'Select assignee',
    });
  }

  onChange() {}

  filter(search: string) {
    this.searchUser(search);
  }
}
