import { render } from 'preact';

import { GitlabButton } from '../components/common/GitlabButton';
import { CreateRelatedIssueModal } from '../components/create-issue/CreateRelatedIssueModal';
import { ShowRelatedIssueModalEvent } from '../components/create-issue/events';
import { LinkParser } from '../helpers/LinkParser';
import { Service } from '../types/Service';

export class CreateRelatedIssue extends Service {
  private isMounted = false;

  constructor() {
    super();
  }

  public init() {
    this.mount();
    setTimeout(this.mount.bind(this), 1000);
    setTimeout(this.mount.bind(this), 3000);
  }

  mount() {
    if (this.isMounted) {
      return;
    }
    const link = LinkParser.parseIssueLink(window.location.href);
    const parent = document.querySelector<HTMLDivElement>(
      '#related-issues [data-testid="crud-actions"]'
    );

    if (!link || !parent) {
      return;
    }
    this.isMounted = true;

    render(
      <GitlabButton
        onClick={() => document.dispatchEvent(ShowRelatedIssueModalEvent)}
      >
        Create related issue
      </GitlabButton>,
      this.root('glp-related-issue-button', parent)
    );
    render(
      <CreateRelatedIssueModal link={link} />,
      this.rootBody('glp-related-issue-modal')
    );
  }
}
