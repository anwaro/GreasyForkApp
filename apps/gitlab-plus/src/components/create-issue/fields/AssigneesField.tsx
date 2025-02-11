import { useCallback } from 'preact/hooks';

import { UsersProvider } from '../../../providers/UsersProvider';
import { User } from '../../../types/User';
import { AsyncAutocomplete } from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabUser } from '../../common/GitlabUser';

type Props = {
  projectPath?: string;
  setValue: (value: User[]) => void;
  value: User[];
};

export function AssigneesField({ projectPath, setValue, value }: Props) {
  const getUsers = useCallback(
    async (search: string) => {
      if (!projectPath) {
        return [];
      }
      const response = await new UsersProvider().getUsers(projectPath, search);

      return response.data.workspace.users;
    },
    [projectPath]
  );

  const renderLabel = useCallback((items: User[]) => {
    const label = items.map((i) => i.name).join(', ');
    return <div title={label}>{items.length ? label : 'Select assignee'}</div>;
  }, []);

  const renderOption = useCallback((item: User) => {
    return (
      <span class={'gl-new-dropdown-item-text-wrapper'}>
        <GitlabUser user={item} showUsername />
      </span>
    );
  }, []);

  return (
    <AsyncAutocomplete
      getValues={getUsers}
      isDisabled={!projectPath}
      name={'assignees'}
      onChange={setValue}
      renderLabel={renderLabel}
      renderOption={renderOption}
      value={value}
      isMultiselect
    />
  );
}
