import { IssueWithRelated } from '../types/Issue';
import { IssueModalContent } from './issue-preview/IssueModalContent';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';
import { GitlabLoader } from './common/GitlabLoader';

export class IssuePreviewModal extends Component<'div'> {
  private content = new IssueModalContent();
  private visibleClassName = 'glp-modal-visible';

  constructor() {
    super('div', {
      classes: 'glp-issue-preview-modal',
      children: IssuePreviewModal.loader(),
    });
    this.mount(document.body);
  }

  static loader() {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-flex-1 gl-items-center gl-justify-center',
      children: new GitlabLoader('2em'),
    });
  }

  show(event: HTMLElementEventMap['mouseenter']) {
    Dom.applyStyles(this.element, {
      left: `${event.clientX + 10}px`,
      top: `${event.clientY + 10}px`,
      transform: 'translateY(0px)',
    });
    this.element.classList.add(this.visibleClassName);
  }

  fixPosition() {
    const rect = this.element.getBoundingClientRect();
    const dY = rect.height + rect.top - window.innerHeight;

    if (dY > 0) {
      this.element.style.transform = `translateY(-${dY + 15}px)`;
    }
  }

  hide() {
    this.element.classList.remove(this.visibleClassName);
    this.element.replaceChildren(IssuePreviewModal.loader());
    Dom.applyStyles(this.element, {
      transform: 'translateY(0px)',
    });
  }

  updateContent(issue: IssueWithRelated) {
    this.content.update(issue);
    this.element.replaceChildren(this.content.getElement());
  }
}
