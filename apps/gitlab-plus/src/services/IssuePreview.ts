import { Service } from '../types/Service';
import IssuePreviewModal from '../components/IssuePreviewModal';
import { IssueLink } from '../helpers/IssueLink';
import { IssueProvider } from '../providers/IssueProvider';

export default class IssuePreview implements Service {
  private modal = new IssuePreviewModal();
  private issue = new IssueProvider();

  public init() {
    this.intendHover<HTMLAnchorElement>(
      (element) => IssueLink.validateLink((element as HTMLAnchorElement).href),
      this.onHover.bind(this),
      this.onLeave.bind(this)
    );
  }

  async onHover(event: HTMLElementEventMap['mouseenter']) {
    const link = IssueLink.parseLink((event.target as HTMLAnchorElement).href);
    if (link) {
      this.modal.show(event);
      const issue = await this.issue.getIssue(link.projectPath, link.issue);
      this.modal.updateContent(issue.data.project.issue);
      this.modal.fixPosition(event);
    }
  }

  onLeave() {
    this.modal.hide();
  }

  intendHover<Element extends HTMLElement>(
    validate: (node: EventTarget) => boolean,
    mouseover: (ev: HTMLElementEventMap['mouseover']) => void,
    mouseleave: (ev: HTMLElementEventMap['mouseleave']) => void,
    timeout = 500
  ) {
    let hover = false;
    let id = 0;

    const onHover = (event: HTMLElementEventMap['mouseover']) => {
      if (!event.target || !validate(event.target)) {
        return;
      }
      const element = event.target as Element;
      hover = true;
      element.addEventListener(
        'mouseleave',
        (ev) => {
          mouseleave.call(element, ev);
          clearTimeout(id);
          hover = false;
        },
        { once: true }
      );
      clearTimeout(id);
      id = window.setTimeout(() => {
        if (hover) {
          mouseover.call(element as Element, event);
        }
      }, timeout);
    };

    document.body.addEventListener('mouseover', onHover);
  }
}
