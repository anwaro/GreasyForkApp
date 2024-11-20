import Dropdown from '../../common/form/Dropdown';
import { ProjectsProvider } from '../../../providers/ProjectsProvider';
import { RecentProvider } from '../../../providers/RecentProvider';
import { Project } from '../../../types/Project';
import { IssueLinkType } from '../../../helpers/IssueLink';
import { Dom } from '@ui/Dom';

export default class FormProject extends Dropdown<Project> {
  private projects = new ProjectsProvider();
  private recent = new RecentProvider<Project>('projects');
  private searchProjects: (search: string) => void;

  constructor(private link: IssueLinkType) {
    super('Project');

    this.searchProjects = this.projects.debounce(this.load.bind(this));
    this.load();
  }

  async load(search = '') {
    const projects = await this.projects.getProjects(
      this.link.workspacePath,
      search
    );
    this.updateItems(projects.data.group.projects.nodes, this.recent.get());
  }

  getValue() {
    const [value] = this.value;
    if (value) {
      this.recent.add(value);
    }
    return value;
  }

  renderItem(item: Project) {
    const image = item.avatarUrl
      ? Dom.create({
          tag: 'img',
          attrs: {
            src: item.avatarUrl,
            alt: item.name,
          },
          classes: 'gl-mr-3 gl-avatar gl-avatar-s32',
        })
      : Dom.create({
          tag: 'div',
          classes:
            'gl-mr-3 gl-avatar gl-avatar-identicon gl-avatar-s32 gl-avatar-identicon-bg1',
          children: item.name[0].toUpperCase(),
        });

    const label = Dom.create({
      tag: 'span',
      children: [
        { tag: 'span', classes: 'gl-mr-2 gl-block', children: item.name },
        {
          tag: 'span',
          classes: 'gl-block gl-text-secondary',
          children: item.nameWithNamespace,
        },
      ],
    });

    return Dom.create({
      tag: 'span',
      classes: 'gl-new-dropdown-item-text-wrapper',
      children: [
        {
          tag: 'span',
          classes: 'gl-flex gl-w-full gl-items-center',
          children: [image, label],
        },
      ],
    });
  }

  renderLabel([item]: Project[]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.nameWithNamespace : 'Select project',
    });
  }

  onChange() {}

  filter(search: string): void {
    this.searchProjects(search);
  }
}
