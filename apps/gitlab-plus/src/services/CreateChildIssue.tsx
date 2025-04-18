import { ModalEvents } from '../components/common/modal/events';
import { CreateChildIssueModal } from '../components/create-issue/CreateChildIssueModal';
import { CreateIssueButton } from '../components/create-issue/CreateIssueButton';
import { ServiceName } from '../consts/ServiceName';
import { GitlabHtmlElements } from '../helpers/GitlabHtmlElements';
import { LinkParser } from '../helpers/LinkParser';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';

export class CreateChildIssue extends BaseService {
  public name = ServiceName.CreateChildIssue;

  public init() {
    this.setup(this.mount.bind(this), LinkParser.validateEpicLink);
  }

  mount() {
    const link = RendererHelper.pageLink(LinkParser.parseEpicLink);
    const parent = GitlabHtmlElements.crudActionElement('#childitems');
    if (!link || !parent) {
      return;
    }

    this.ready = true;

    RendererHelper.render(
      'glp-child-issue-button',
      parent,
      <CreateIssueButton
        eventName={ModalEvents.showChildIssueModal}
        label={'Create child issue'}
      />,
      'prepend'
    );

    RendererHelper.renderInBody(
      'glp-child-issue-modal',
      <CreateChildIssueModal link={link} />
    );
  }
}
