import { useCallback } from 'preact/hooks';

import { Dom } from '@ui/Dom';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { ProjectsProvider } from '../../../providers/ProjectsProvider';
import { Project } from '../../../types/Project';
import _AsyncAutocomplete, {
  AsyncAutocomplete,
} from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabProject } from '../../common/GitlabProject';

export class FormProject extends _AsyncAutocomplete<Project> {
  private projects = new ProjectsProvider();

  constructor(private link: IssueLinkType) {
    super('Project', 'projects');

    this.load();
  }

  async load(search = '') {
    const projects = await this.projects.getProjects(
      this.link.workspacePath,
      search
    );
    this.updateItems(projects.data.group.projects.nodes, search);
  }

  onChange() {
    // pass
  }

  renderItem(item: Project) {
    const image = item.avatarUrl
      ? Dom.create({
          tag: 'img',
          attrs: {
            alt: item.name,
            src: item.avatarUrl,
          },
          classes: 'gl-mr-3 gl-avatar gl-avatar-s32',
        })
      : Dom.create({
          tag: 'div',
          children: item.name[0].toUpperCase(),
          classes:
            'gl-mr-3 gl-avatar gl-avatar-identicon gl-avatar-s32 gl-avatar-identicon-bg1',
        });

    const label = Dom.create({
      tag: 'span',
      children: [
        { tag: 'span', children: item.name, classes: 'gl-mr-2 gl-block' },
        {
          tag: 'span',
          children: item.nameWithNamespace,
          classes: 'gl-block gl-text-secondary',
        },
      ],
    });

    return Dom.create({
      tag: 'span',
      children: [
        {
          tag: 'span',
          children: [image, label],
          classes: 'gl-flex gl-w-full gl-items-center',
        },
      ],
      classes: 'gl-new-dropdown-item-text-wrapper',
    });
  }

  renderLabel([item]: Project[]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.nameWithNamespace : 'Select project',
    });
  }
}

type Props = {
  link: IssueLinkType;
  setValue: (value: Project[]) => void;
  value: Project[];
};

export function ProjectField({ error, link, setValue, value }: Props) {
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
