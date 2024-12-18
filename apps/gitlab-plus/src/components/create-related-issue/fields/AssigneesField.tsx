import { useCallback } from 'preact/hooks';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { UsersProvider } from '../../../providers/UsersProvider';
import { User } from '../../../types/User';
import { AsyncAutocomplete } from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabUser } from '../../common/GitlabUser';

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
