import { render } from 'preact';

import { CreateIssueButton } from '../components/create-related-issue/CreateIssueButton';
import { CreateRelatedIssueModal } from '../components/create-related-issue/CreateRelatedIssueModal';
import { IssueLink } from '../helpers/IssueLink';
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
    const link = IssueLink.parseLink(window.location.href);
    const parent = document.querySelector<HTMLDivElement>(
      '#related-issues [data-testid="crud-actions"]'
    );

    if (!link || !parent) {
      return;
    }
    this.isMounted = true;

    render(
      <CreateIssueButton />,
      this.root('glp-related-issue-button', parent)
    );
    render(
      <CreateRelatedIssueModal link={link} />,
      this.rootBody('glp-related-issue-modal')
    );
  }
}
