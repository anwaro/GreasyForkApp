import { IssueStatusSelect } from '../components/issue-status-select/IssueStatusSelect';
import { ServiceName } from '../consts/ServiceName';
import { LinkParser } from '../helpers/LinkParser';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';
import { DrawerWorkItemStatus } from './DrawerWorkItemStatus';

export class IssueStatus extends BaseService {
  public name = ServiceName.IssueStatus;

  public init() {
    this.setup(
      this.initIssuesStausSelect.bind(this),
      LinkParser.validateIssueLink
    );

    new DrawerWorkItemStatus('issue', LinkParser.parseIssueLink, (link) => (
      <IssueStatusSelect link={link} />
    ));
  }

  private async initIssuesStausSelect() {
    this.ready = RendererHelper.renderWithLink(
      'glp-issue-status-select',
      '[data-testid="work-item-labels"] [data-testid="edit-button"]',
      LinkParser.parseIssueLink,
      (link) => <IssueStatusSelect link={link} />,
      'after'
    );
  }
}
