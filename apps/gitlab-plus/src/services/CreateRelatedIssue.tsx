import { render } from 'preact';

import { GitlabButton } from '../components/common/GitlabButton';
import { CreateRelatedIssueModal } from '../components/create-issue/CreateRelatedIssueModal';
import { ShowRelatedIssueModalEvent } from '../components/create-issue/events';
import { ServiceName } from '../consts/ServiceName';
import { GitlabHtmlElements } from '../helpers/GitlabHtmlElements';
import { LinkParser } from '../helpers/LinkParser';
import { BaseService } from './BaseService';

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
    const parent = GitlabHtmlElements.crudActionElement(
      '#related-issues',
      '#linkeditems'
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
      this.root('glp-related-issue-button', parent, true)
    );
    render(
      <CreateRelatedIssueModal link={link} />,
      this.rootBody('glp-related-issue-modal')
    );
  }
}
