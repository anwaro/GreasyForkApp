import { Service } from '../types/Service';
import { IssuePreviewModal } from '../components/IssuePreviewModal';
import { IssueLink } from '../helpers/IssueLink';
import { IssueProvider } from '../providers/IssueProvider';
import { Events } from '@ui/Events';

export class IssuePreview implements Service {
  private modal = new IssuePreviewModal();
  private issue = new IssueProvider();

  public init() {
    Events.intendHover<HTMLAnchorElement>(
      (element) => IssueLink.validateLink((element as HTMLAnchorElement).href),
      this.onHover.bind(this),
      this.onLeave.bind(this)
    );
  }

  async onHover(event: HTMLElementEventMap['mouseenter']) {
    const anchor = event.target as HTMLAnchorElement;
    const link = IssueLink.parseLink(anchor.href);
    if (!link) {
      return;
    }
    anchor.title = '';
    this.modal.show(event);
    const response = await this.issue.getIssue(link.projectPath, link.issue);
    const relatedIssues = await this.issue.getIssueLinks(
      response.data.project.id.replace(/\D/g, ''),
      response.data.project.issue.iid
    );
    this.modal.updateContent({ ...response.data.project.issue, relatedIssues });
    setTimeout(this.modal.fixPosition.bind(this.modal), 300);
  }

  onLeave() {
    this.modal.hide();
  }
}
