import { Service } from '../types/Service';
import { RelatedIssuesAutocompleteModal } from '../components/RelatedIssuesAutocompleteModal';

export class RelatedIssueAutocomplete extends Service {
  private modal = new RelatedIssuesAutocompleteModal();
  private ready = false;

  public init() {
    this.initObserver();
    window.setTimeout(this.initObserver.bind(this), 1000);
    window.setTimeout(this.initObserver.bind(this), 3000);
    window.setTimeout(this.initObserver.bind(this), 5000);
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

  private initAutocomplete(section: HTMLElement) {
    const input = section.querySelector<HTMLInputElement>(
      '#add-related-issues-form-input'
    );

    if (input) {
      this.modal.init(input);
    }
  }
}
