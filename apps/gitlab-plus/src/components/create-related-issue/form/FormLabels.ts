import Dropdown from '../../common/form/Dropdown';
import { LabelsProvider } from '../../../providers/LabelsProvider';
import { Label } from '../../../types/Label';
import { IssueLinkType } from '../../../helpers/IssueLink';
import { LabelComponent } from '../../common/LabelComponent';
import { Dom } from '@ui/Dom';

export class FormLabel extends Dropdown<Label> {
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

  renderItem(item: Label) {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-flex-1 gl-break-anywhere gl-pb-3 gl-pl-4 gl-pt-3',
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

  onChange() {
    this.extra.replaceChildren(
      ...this.value.map((item) =>
        new LabelComponent(item, () => this.onSelect(item)).getElement()
      )
    );
  }
}
