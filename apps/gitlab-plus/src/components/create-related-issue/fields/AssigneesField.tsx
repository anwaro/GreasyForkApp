import { useCallback } from 'preact/hooks';

import { Dom } from '@ui/Dom';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { UsersProvider } from '../../../providers/UsersProvider';
import { User } from '../../../types/User';
import _AsyncAutocomplete, {
  AsyncAutocomplete,
} from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabUser } from '../../common/GitlabUser';

export class _AssigneesField extends _AsyncAutocomplete<User> {
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

  onChange() {
    //pass
  }

  renderItem(item: User) {
    const image = Dom.create({
      tag: 'img',
      attrs: { src: item.avatarUrl },
      classes: 'gl-avatar gl-avatar-circle gl-avatar-s32',
    });

    const label = Dom.create({
      tag: 'div',
      children: [
        {
          tag: 'div',
          children: {
            tag: 'span',
            children: item.name,
            classes: 'gl-avatar-labeled-label',
          },
          classes:
            '-gl-mx-1 -gl-my-1 gl-flex gl-flex-wrap gl-items-center !gl-text-left',
        },
        {
          tag: 'span',
          children: item.username,
          classes: 'gl-avatar-labeled-sublabel',
        },
      ],
      classes: 'gl-avatar-labeled-labels !gl-text-left',
    });

    return Dom.create({
      tag: 'span',
      children: [image, label],
      classes:
        'gl-avatar-labeled sidebar-participant gl-relative gl-items-center gl-new-dropdown-item-text-wrapper',
    });
  }

  renderLabel(items: User[]) {
    const label = items.map((i) => i.name).join(', ');
    return Dom.create({
      tag: 'div',
      attrs: {
        title: label,
      },
      children: items.length ? label : 'Select assignee',
    });
  }
}

type Props = {
  link: IssueLinkType;
  setValue: (value: User[]) => void;
  value: User[];
};

export function AssigneesField({ link, setValue, value }: Props) {
  const getUsers = useCallback(
    async (search: string) => {
      const response = await new UsersProvider().getUsers(
        link.projectPath,
        search
      );

      return response.data.workspace.users;
    },
    [link]
  );

  const renderLabel = useCallback((items: User[]) => {
    const label = items.map((i) => i.name).join(', ');
    return <div title={label}>{items.length ? label : 'Select assignee'}</div>;
  }, []);

  const renderOption = useCallback((item: User) => {
    return (
      <span class={'gl-new-dropdown-item-text-wrapper'}>
        <GitlabUser showUsername user={item} />
      </span>
    );
  }, []);

  return (
    <AsyncAutocomplete
      isMultiselect
      onChange={setValue}
      renderOption={renderOption}
      getValues={getUsers}
      name={'assignees'}
      renderLabel={renderLabel}
      value={value}
    />
  );
}
