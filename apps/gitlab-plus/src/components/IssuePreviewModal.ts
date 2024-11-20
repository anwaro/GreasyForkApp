import IssueLoader from './issue-preview/IssueLoader';
import { Issue } from '../types/Issue';
import { IssueModalContent } from './issue-preview/IssueModalContent';
import { Component } from '@ui/Component';

export default class IssuePreviewModal extends Component<'div'> {
  private loader = new IssueLoader();
  private content = new IssueModalContent();
  private visibleClassName = 'glp-modal-visible';

  constructor() {
    super('div', { classes: 'glp-issue-preview-modal' });
    this.mount(document.body);
  }

  show(event: HTMLElementEventMap['mouseenter']) {
    this.element.appendChild(this.loader.getElement());
    this.element.style.left = `${event.pageX + 10}px`;
    this.element.style.top = `${event.pageY + 10}px`;
    this.element.style.transform = 'translateY(0px)';
    this.element.classList.add(this.visibleClassName);
  }

  fixPosition(event: HTMLElementEventMap['mouseenter']) {
    const dY =
      event.screenY +
      this.element.getBoundingClientRect().height -
      window.innerHeight;

    if (dY > 0) {
      this.element.style.transform = `translateY(-${dY + 15}px)`;
    }
  }

  hide() {
    this.element.classList.remove(this.visibleClassName);
    this.element.replaceChildren();
  }

  updateContent(issue: Issue) {
    this.content.update(issue);
    this.element.replaceChildren(this.content.getElement());
  }
}
