import { render } from 'preact';

import { CreateIssueButton } from '../components/create-related-issue/CreateIssueButton';
import { CreateRelatedIssueModal } from '../components/create-related-issue/CreateRelatedIssueModal';
import { IssueLink } from '../helpers/IssueLink';
import { Service } from '../types/Service';

export class CreateRelatedIssue extends Service {
  private isMounted = false;

  public init() {
    this.mount();
    setTimeout(this.mount.bind(this), 1000);
    setTimeout(this.mount.bind(this), 3000);
  }

  mount() {
    const link = IssueLink.parseLink(window.location.href);
    const parent = document.querySelector(
      '#related-issues [data-testid="crud-actions"]'
    );

    if (link && parent && !this.isMounted) {
      this.isMounted = true;

      const buttonRoot = this.root('glp-related-issue-button');
      const modalRoot = this.rootBody('glp-related-issue-modal');
      parent.appendChild(buttonRoot);

      render(
        <CreateIssueButton
          onClick={() => {
            document.dispatchEvent(new CustomEvent('show-modal'));
          }}
        />,
        buttonRoot
      );
      render(<CreateRelatedIssueModal link={link} />, modalRoot);
    }
  }
}
