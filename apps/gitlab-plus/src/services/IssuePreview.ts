import { Service } from '../types/Service';
import IssuePreviewModal from '../components/IssuePreviewModal';
import { IssueLink } from '../helpers/IssueLink';
import { IssueProvider } from '../providers/IssueProvider';
import { Events } from '@ui/Events';

export default class IssuePreview implements Service {
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
    if (link) {
      anchor.title = '';
      this.modal.show(event);
      const issue = await this.issue.getIssue(link.projectPath, link.issue);
      this.modal.updateContent(issue.data.project.issue);
      setTimeout(() => {
        this.modal.fixPosition();
      }, 200);
    }
  }

  onLeave() {
    this.modal.hide();
  }
}
