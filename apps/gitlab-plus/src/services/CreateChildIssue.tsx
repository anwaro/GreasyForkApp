import { render } from 'preact';

import { GitlabButton } from '../components/common/GitlabButton';
import { CreateChildIssueModal } from '../components/create-issue/CreateChildIssueModal';
import { ShowChildIssueModalEvent } from '../components/create-issue/events';
import { LinkParser } from '../helpers/LinkParser';
import { Service } from '../types/Service';

export class CreateChildIssue extends Service {
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
    const link = LinkParser.parseEpicLink(window.location.href);
    const parent = document.querySelector<HTMLDivElement>(
      '#childitems [data-testid="crud-actions"]'
    );

    if (!link || !parent) {
      return;
    }
    this.isMounted = true;

    render(
      <GitlabButton
        onClick={() => document.dispatchEvent(ShowChildIssueModalEvent)}
      >
        Create child item
      </GitlabButton>,
      this.root('glp-child-issue-button', parent, true)
    );
    render(
      <CreateChildIssueModal link={link} />,
      this.rootBody('glp-child-issue-modal')
    );
  }
}
