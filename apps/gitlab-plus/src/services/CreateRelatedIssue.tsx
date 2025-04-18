import { ModalEvents } from '../components/common/modal/events';
import { CreateIssueButton } from '../components/create-issue/CreateIssueButton';
import { CreateRelatedIssueModal } from '../components/create-issue/CreateRelatedIssueModal';
import { ServiceName } from '../consts/ServiceName';
import { GitlabHtmlElements } from '../helpers/GitlabHtmlElements';
import { LinkParser } from '../helpers/LinkParser';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';

export class CreateRelatedIssue extends BaseService {
  public name = ServiceName.CreateRelatedIssue;

  public init() {
    this.setup(this.mount.bind(this), LinkParser.validateIssueLink);
  }

  mount() {
    const link = LinkParser.parseIssueLink(window.location.href);
    const parent = GitlabHtmlElements.crudActionElement(
      '#related-issues',
      '#linkeditems'
    );

    if (!link || !parent) {
      return;
    }
    this.ready = true;

    RendererHelper.render(
      'glp-related-issue-button',
      parent,
      <CreateIssueButton
        eventName={ModalEvents.showRelatedIssueModal}
        label={'Create related issue'}
      />,
      'prepend'
    );
    RendererHelper.renderInBody(
      'glp-related-issue-modal',
      <CreateRelatedIssueModal link={link} />
    );
  }
}
