import Dropdown from '../../common/form/Dropdown';
import { IterationsProvider } from '../../../providers/IterationsProvider';
import { IssueLinkType } from '../../../helpers/IssueLink';
import { Iteration } from '../../../types/Iteration';
import { Dom } from '@ui/Dom';

type IterationNamed = Iteration & { name: string };

export class FormIteration extends Dropdown<IterationNamed> {
  private iterations = new IterationsProvider();

  constructor(private link: IssueLinkType) {
    super('Iteration', 'iterations');

    this.load();
  }

  async load(search: string = '') {
    const response = await this.iterations.getIterations(
      this.link.workspacePath,
      search
    );
    const iterationsNamed = response.data.workspace.attributes.nodes
      .map((iteration) => ({
        ...iteration,
        name: this.iterationName(iteration),
      }))
      .toSorted((a, b) => a.name.localeCompare(b.name));

    this.updateItems(iterationsNamed, search);
  }

  iterationName(iteration: Iteration) {
    const start = new Date(iteration.startDate).toLocaleDateString();
    const end = new Date(iteration.dueDate).toLocaleDateString();

    return `${iteration.iterationCadence.title}: ${start} - ${end}`;
  }

  renderItem(item: IterationNamed) {
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
            children: item.name,
          },
        },
      ],
    });
  }

  renderLabel([item]: IterationNamed[]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.name : 'Select iteration',
    });
  }

  onChange() {}
}
