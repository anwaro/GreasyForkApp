import AutocompleteModal from './related-issue-autocomplete/AutocompleteModal';
import { IssueAutocomplete } from '../types/Issue';
import { IssueProvider } from '../providers/IssueProvider';
import { IssueLink, IssueLinkType } from '../helpers/IssueLink';
import { IconComponent } from './common/IconComponent';
import { Dom } from '@ui/Dom';

export default class RelatedIssuesAutocompleteModal {
  private readyClass = 'glp-input-ready';
  private input = Dom.element('input');
  private autocompleteModal: AutocompleteModal<IssueAutocomplete>;
  private issueProvider = new IssueProvider();
  private search: (search: string) => void;
  private link: IssueLinkType | undefined;

  constructor() {
    this.search = this.issueProvider.debounce(this.load.bind(this));
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
    if (this.isMounted(input)) {
      return;
    }
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

  show() {
    this.autocompleteModal.setVisible(true);
    this.search('');
  }

  async load(term: string = '') {
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
      classes: 'gl-flex gl-gap-x-2 gl-py-2',
      children: [
        new IconComponent('issue-type-issue', 's16').getElement(),
        { tag: 'small', children: item.iid },
        { tag: 'span', classes: 'gl-flex gl-flex-wrap', children: item.title },
      ],
    });
  }
}
