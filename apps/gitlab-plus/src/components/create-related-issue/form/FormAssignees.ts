import Dropdown from '../../common/form/Dropdown';
import { UsersProvider } from '../../../providers/UsersProvider';
import { IssueLinkType } from '../../../helpers/IssueLink';
import { User } from '../../../types/User';
import { Dom } from '@ui/Dom';

export class FormAssignees extends Dropdown<User> {
  private assignees = new UsersProvider();

  constructor(private link: IssueLinkType) {
    super('Assignees', 'assignees', true);
    this.load('');
  }

  async load(search: string) {
    const response = await this.assignees.getUsers(
      this.link.projectPath,
      search
    );

    this.updateItems(response.data.workspace.users, search);
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
}
