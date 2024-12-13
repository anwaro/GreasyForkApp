import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

import { IssueWithRelated } from '../types/Issue';
import { _GitlabLoader } from './common/GitlabLoader';
import { IssueModalContent } from './issue-preview/IssueModalContent';

export class IssuePreviewModal extends Component<'div'> {
  private content = new IssueModalContent();
  private visibleClassName = 'glp-modal-visible';

  constructor() {
    super('div', {
      children: IssuePreviewModal.loader(),
      classes: 'glp-issue-preview-modal',
    });
    this.mount(document.body);
  }

  static loader() {
    return Dom.create({
      tag: 'div',
      children: new _GitlabLoader('2em'),
      classes: 'gl-flex gl-flex-1 gl-items-center gl-justify-center',
    });
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

  show(event: HTMLElementEventMap['mouseenter']) {
    Dom.applyStyles(this.element, {
      left: `${event.clientX + 10}px`,
      top: `${event.clientY + 10}px`,
      transform: 'translateY(0px)',
    });
    this.element.classList.add(this.visibleClassName);
  }

  updateContent(issue: IssueWithRelated) {
    this.content.update(issue);
    this.element.replaceChildren(this.content.getElement());
  }
}
