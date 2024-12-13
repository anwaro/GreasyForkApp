import { useCallback } from 'preact/hooks';

import { Dom } from '@ui/Dom';

import { IssueLinkType } from '../../../helpers/IssueLink';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Label } from '../../../types/Label';
import _AsyncAutocomplete, {
  AsyncAutocomplete,
} from '../../common/form/autocomplete/AsyncAutocomplete';
import { GitlabLabel } from '../../common/GitlabLabel';
import { LabelComponent } from '../../common/LabelComponent';

export class _LabelField extends _AsyncAutocomplete<Label> {
  private labels = new LabelsProvider();

  constructor(private link: IssueLinkType) {
    super('Labels', 'labels', true);
    this.extra.classList.add(
      'gl-mt-1',
      'gl-pb-2',
      'gl-flex',
      'gl-flex-wrap',
      'gl-gap-2'
    );
    this.load();
  }

  async load(search = '') {
    const labels = await this.labels.getLabels(this.link.projectPath, search);
    this.updateItems(labels.data.workspace.labels.nodes, search);
  }

  onChange() {
    this.extra.replaceChildren(
      ...this.value.map((item) =>
        new LabelComponent(item, () => this.onSelect(item)).getElement()
      )
    );
  }

  renderItem(item: Label) {
    return Dom.create({
      tag: 'div',
      children: [
        {
          tag: 'span',
          classes: 'dropdown-label-box gl-top-0 gl-mr-3 gl-shrink-0',
          styles: {
            backgroundColor: item.color,
          },
        },
        {
          tag: 'span',
          children: item.title,
        },
      ],
      classes: 'gl-flex gl-flex-1 gl-break-anywhere gl-pb-3 gl-pl-4 gl-pt-3',
    });
  }

  renderLabel(items: Label[]) {
    let label = 'Select label';
    if (items.length !== 0) {
      label = items
        .slice(0, 2)
        .map((i) => i.title)
        .join(', ');
    }
    if (items.length > 2) {
      label += `, ${items.length - 2}+`;
    }
    return Dom.create({
      tag: 'div',
      children: label,
    });
  }
}

type Props = {
  link: IssueLinkType;
  setValue: (value: Label[]) => void;
  value: Label[];
};

export function LabelField({ link, setValue, value }: Props) {
  const getLabels = useCallback(
    async (search: string) => {
      const response = await new LabelsProvider().getLabels(
        link.projectPath,
        search
      );
      return response.data.workspace.labels.nodes;
    },
    [link]
  );

  const renderLabel = useCallback((items: Label[]) => {
    return items.length
      ? items.map((i) => i.title).join(', ')
      : 'Select labels';
  }, []);

  const renderOption = useCallback((item: Label) => {
    return (
      <div
        class={'gl-flex gl-flex-1 gl-break-anywhere gl-pb-3 gl-pl-4 gl-pt-3'}
      >
        <span
          class={'dropdown-label-box gl-top-0 gl-mr-3 gl-shrink-0'}
          style={{ backgroundColor: item.color }}
        />
        <span>{item.title}</span>
      </div>
    );
  }, []);

  return (
    <>
      <div class={'gl-mt-1 gl-pb-2 gl-flex gl-flex-wrap gl-gap-2'}>
        {value.map((label) => (
          <GitlabLabel
            key={label.id}
            onRemove={() =>
              setValue(value.filter((item) => label.id !== item.id))
            }
            label={label}
          />
        ))}
      </div>
      <AsyncAutocomplete
        isMultiselect
        onChange={setValue}
        renderOption={renderOption}
        getValues={getLabels}
        name={'labels'}
        renderLabel={renderLabel}
        value={value}
      />
    </>
  );
}
