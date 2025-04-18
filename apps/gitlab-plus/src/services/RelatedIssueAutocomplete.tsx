import { RelatedIssuesAutocompleteModal } from '../components/related-issue-autocomplete/RelatedIssuesAutocompleteModal';
import { ServiceName } from '../consts/ServiceName';
import { LinkParser } from '../helpers/LinkParser';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';

export class RelatedIssueAutocomplete extends BaseService {
  public name = ServiceName.RelatedIssueAutocomplete;
  private readyClass = 'glp-input-ready';

  public init() {
    this.setup(this.initObserver.bind(this), LinkParser.validateIssueLink);
  }

  private initAutocomplete(section: HTMLElement) {
    const input = section.querySelector<HTMLInputElement>(
      '#add-related-issues-form-input'
    );
    const link = LinkParser.parseIssueLink(window.location.href);

    if (!input || this.isMounted(input) || !link) {
      return;
    }

    const container = input.closest<HTMLElement>(
      '.add-issuable-form-input-wrapper'
    );

    if (!container || document.querySelector('.related-issues-autocomplete')) {
      return;
    }

    RendererHelper.render(
      'related-issues-autocomplete',
      container,
      <RelatedIssuesAutocompleteModal input={input} link={link} />
    );
  }

  private initObserver() {
    const section = document.querySelector<HTMLElement>('#related-issues');

    if (this.ready || !section) {
      return;
    }
    this.ready = true;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.initAutocomplete(section);
        }
      });
    });

    observer.observe(section, {
      childList: true,
    });
  }

  private isMounted(input: HTMLInputElement) {
    return input.classList.contains(this.readyClass);
  }
}
