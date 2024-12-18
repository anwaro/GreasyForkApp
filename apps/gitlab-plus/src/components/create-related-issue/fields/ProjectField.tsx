import { useCallback } from 'preact/hooks';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { ProjectsProvider } from '../../../providers/ProjectsProvider';
import { Project } from '../../../types/Project';
import { AsyncAutocomplete } from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabProject } from '../../common/GitlabProject';

type Props = {
  link: IssueLinkType;
  setValue: (value: Project[]) => void;
  value: Project[];
};

export function ProjectField({ link, setValue, value }: Props) {
  const getProjects = useCallback(
    async (search: string) => {
      const response = await new ProjectsProvider().getProjects(
        link.workspacePath,
        search
      );

      return response.data.group.projects.nodes;
    },
    [link]
  );

  const renderLabel = useCallback(([item]: Project[]) => {
    return item ? item.nameWithNamespace : 'Select project';
  }, []);

  const renderOption = useCallback((item: Project) => {
    return (
      <span class={'gl-new-dropdown-item-text-wrapper'}>
        <GitlabProject project={item} />
      </span>
    );
  }, []);

  return (
    <AsyncAutocomplete
      onChange={setValue}
      renderOption={renderOption}
      getValues={getProjects}
      name={'projects'}
      renderLabel={renderLabel}
      value={value}
    />
  );
}
