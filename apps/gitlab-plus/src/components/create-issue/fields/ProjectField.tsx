import { useCallback } from 'preact/hooks';

import { GitlabLink } from '../../../helpers/LinkParser';
import { ProjectsProvider } from '../../../providers/ProjectsProvider';
import { Project } from '../../../types/Project';
import { AsyncAutocomplete } from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabProject } from '../../common/GitlabProject';

type Props = {
  link: GitlabLink;
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

      return response.data.workspace.projects.nodes;
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
      getValues={getProjects}
      name={'projects'}
      onChange={setValue}
      renderLabel={renderLabel}
      renderOption={renderOption}
      value={value}
    />
  );
}
