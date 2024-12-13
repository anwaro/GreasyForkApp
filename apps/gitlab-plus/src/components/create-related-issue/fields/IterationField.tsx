import { useCallback } from 'preact/hooks';

import { Dom } from '@ui/Dom';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { IterationsProvider } from '../../../providers/IterationsProvider';
import { Iteration } from '../../../types/Iteration';
import _AsyncAutocomplete, {
  AsyncAutocomplete,
} from '../../common/form/autocomplete/AsyncAutocomplete';

export type IterationNamed = Iteration & { name: string };

export class _IterationField extends _AsyncAutocomplete<IterationNamed> {
  private iterations = new IterationsProvider();

  constructor(private link: IssueLinkType) {
    super('Iteration', 'iterations');

    this.load();
  }

  iterationName(iteration: Iteration) {
    const start = new Date(iteration.startDate).toLocaleDateString();
    const end = new Date(iteration.dueDate).toLocaleDateString();

    return `${iteration.iterationCadence.title}: ${start} - ${end}`;
  }

  async load(search = '') {
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

  onChange() {
    // pass
  }

  renderItem(item: IterationNamed) {
    return Dom.create({
      tag: 'span',
      children: [
        {
          tag: 'span',
          children: {
            tag: 'span',
            children: item.name,
            classes: 'gl-mr-2 gl-block',
          },
          classes: 'gl-flex gl-w-full gl-items-center',
        },
      ],
      classes: 'gl-new-dropdown-item-text-wrapper',
    });
  }

  renderLabel([item]: IterationNamed[]) {
    return Dom.create({
      tag: 'div',
      children: item ? item.name : 'Select iteration',
    });
  }
}

type Props = {
  link: IssueLinkType;
  setValue: (value: IterationNamed[]) => void;
  value: IterationNamed[];
};

function iterationName(iteration: Iteration) {
  const start = new Date(iteration.startDate).toLocaleDateString();
  const end = new Date(iteration.dueDate).toLocaleDateString();

  return `${iteration.iterationCadence.title}: ${start} - ${end}`;
}

export function IterationField({ link, setValue, value }: Props) {
  const getUsers = useCallback(
    async (search: string) => {
      const response = await new IterationsProvider().getIterations(
        link.workspacePath,
        search
      );
      return response.data.workspace.attributes.nodes
        .map((iteration) => ({
          ...iteration,
          name: iterationName(iteration),
        }))
        .toSorted((a, b) => a.name.localeCompare(b.name));
    },
    [link]
  );

  const renderLabel = useCallback(([item]: IterationNamed[]) => {
    return item ? item.name : 'Select iteration';
  }, []);

  const renderOption = useCallback((item: IterationNamed) => {
    return (
      <span class={'gl-new-dropdown-item-text-wrapper'}>
        <span class={'gl-flex gl-w-full gl-items-center'}>
          <span class={'gl-mr-2 gl-block'}>{item.name}</span>
        </span>
      </span>
    );
  }, []);

  return (
    <AsyncAutocomplete
      onChange={setValue}
      renderOption={renderOption}
      getValues={getUsers}
      name={'iterations'}
      renderLabel={renderLabel}
      value={value}
    />
  );
}
