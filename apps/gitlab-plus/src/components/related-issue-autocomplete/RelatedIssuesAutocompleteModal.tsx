import { Dom } from '@ui/Dom';
import { debounce } from '@utils/debounce';

import { IssueLink, IssueLinkType } from '../../helpers/IssueLink';
import { IssueProvider } from '../../providers/IssueProvider';
import { IssueAutocomplete } from '../../types/Issue';
import { AsyncAutocompleteDropdown } from '../common/form/autocomplete/AsyncAutocompleteDropdown';
import { GitlabIcon } from '../common/GitlabIcon';
import { IconComponent } from '../common/IconComponent';
import { AutocompleteModal } from '../related-issue-autocomplete/AutocompleteModal';
import { useRelatedIssuesAutocompleteModal } from './useRelatedIssuesAutocompleteModal';

export class _RelatedIssuesAutocompleteModal {
  private autocompleteModal: AutocompleteModal<IssueAutocomplete>;
  private input = Dom.element('input');
  private issueProvider = new IssueProvider();
  private link: IssueLinkType | undefined;
  private readyClass = 'glp-input-ready';
  private search: (search: string) => void;

  constructor() {
    this.search = debounce(this.load.bind(this));
    this.link = IssueLink.parseLink(window.location.href);
    this.autocompleteModal = new AutocompleteModal<IssueAutocomplete>(
      this.onSelect.bind(this),
      this.renderItem.bind(this),
      this.search.bind(this)
    );
    document.body.addEventListener('click', (e) => {
      if (e.target !== this.input && !this.input.contains(e.target as Node)) {
        this.autocompleteModal.setVisible(false);
      }
    });
  }

  init(input: HTMLInputElement) {
    const container = input.closest<HTMLElement>(
      '.add-issuable-form-input-wrapper'
    );
    if (!container) {
      return;
    }
    this.autocompleteModal.mount(container);
    this.input = input;
    this.input.classList.add(this.readyClass);
    this.input.addEventListener('focus', this.show.bind(this));
  }

  isMounted(input: HTMLInputElement) {
    return input.classList.contains(this.readyClass);
  }

  async load(term = '') {
    if (!this.link) {
      return;
    }
    const response = await this.issueProvider.getIssues(
      this.link.workspacePath,
      term
    );

    this.autocompleteModal.updateItems([
      ...(response.data.workspace.workItems?.nodes || []),
      ...(response.data.workspace.workItemsByIid?.nodes || []),
      ...(response.data.workspace.workItemsEmpty?.nodes || []),
    ]);
  }

  onSelect(item: IssueAutocomplete) {
    this.input.value = `${item.project.fullPath}#${item.iid} `;
    this.input.dispatchEvent(new Event('input'));
    this.input.dispatchEvent(new Event('change'));
    this.autocompleteModal.setVisible(false);
  }

  renderItem(item: IssueAutocomplete) {
    return Dom.create({
      tag: 'div',
      children: [
        new IconComponent('issue-type-issue', 's16'),
        { tag: 'small', children: item.iid },
        { tag: 'span', children: item.title, classes: 'gl-flex gl-flex-wrap' },
      ],
      classes: 'gl-flex gl-gap-x-2 gl-py-2',
    });
  }

  show() {
    this.autocompleteModal.setVisible(true);
    this.search('');
  }
}

type Props = {
  input: HTMLInputElement;
  link: IssueLinkType;
};

export function RelatedIssuesAutocompleteModal({ input, link }: Props) {
  const { isVisible, onClose, onSelect, options, searchTerm, setSearchTerm } =
    useRelatedIssuesAutocompleteModal(link, input);

  return isVisible ? (
    <div class={'gl-relative gl-w-full gl-new-dropdown !gl-block'}>
      <AsyncAutocompleteDropdown<IssueAutocomplete>
        onClick={onSelect}
        onClose={onClose}
        options={options}
        renderOption={(item) => (
          <div class={'gl-flex gl-gap-x-2 gl-py-2'}>
            <GitlabIcon icon={'issue-type-issue'} size={16} />
            <small>{item.iid}</small>
            <span class={'gl-flex gl-flex-wrap'}>{item.title}</span>
          </div>
        )}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        value={[]}
      />
    </div>
  ) : null;
}
