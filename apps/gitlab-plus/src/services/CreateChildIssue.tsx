import { render } from 'preact';

import { GitlabButton } from '../components/common/GitlabButton';
import { CreateChildIssueModal } from '../components/create-issue/CreateChildIssueModal';
import { ShowChildIssueModalEvent } from '../components/create-issue/events';
import { LinkParser } from '../helpers/LinkParser';
import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class CreateChildIssue extends BaseService {
  public name = ServiceName.CreateChildIssue;
  private isMounted = false;

  public init() {
    this.runInit(this.mount.bind(this));
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
