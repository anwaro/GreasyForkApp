import { render } from 'preact';

import { GitlabButton } from '../components/common/GitlabButton';
import { CreateChildIssueModal } from '../components/create-issue/CreateChildIssueModal';
import { ShowChildIssueModalEvent } from '../components/create-issue/events';
import { ServiceName } from '../consts/ServiceName';
import { GitlabHtmlElements } from '../helpers/GitlabHtmlElements';
import { LinkParser } from '../helpers/LinkParser';
import { BaseService } from './BaseService';

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
    const parent = GitlabHtmlElements.crudActionElement('#childitems');
    if (!link || !parent) {
      return;
    }
    this.isMounted = true;

    render(
      <GitlabButton
        onClick={() => document.dispatchEvent(ShowChildIssueModalEvent)}
      >
        Create child issue
      </GitlabButton>,
      this.root('glp-child-issue-button', parent, true)
    );
    render(
      <CreateChildIssueModal link={link} />,
      this.rootBody('glp-child-issue-modal')
    );
  }
}
