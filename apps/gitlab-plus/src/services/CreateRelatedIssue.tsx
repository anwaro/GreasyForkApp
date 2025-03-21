import { render } from 'preact';

import { GitlabButton } from '../components/common/GitlabButton';
import { CreateRelatedIssueModal } from '../components/create-issue/CreateRelatedIssueModal';
import { ShowRelatedIssueModalEvent } from '../components/create-issue/events';
import { LinkParser } from '../helpers/LinkParser';
import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class CreateRelatedIssue extends BaseService {
  public name = ServiceName.CreateRelatedIssue;
  private isMounted = false;

  public init() {
    this.runInit(this.mount.bind(this));
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
