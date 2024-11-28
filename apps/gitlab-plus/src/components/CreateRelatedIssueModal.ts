import { CreateRelatedIssueModalHeader } from './create-related-issue/CreateRelatedIssueModalHeader';
import { CreateRelatedIssueModalContent } from './create-related-issue/CreateRelatedIssueModalContent';
import { IssueLink } from '../helpers/IssueLink';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

export class CreateRelatedIssueModal extends Component<'div'> {
  private visibleClassName = 'glp-modal-visible';

  constructor() {
    const container = Dom.create({
      tag: 'div',
      classes:
        'glp-create-related-issue-modal crud gl-border gl-rounded-form gl-border-section gl-bg-subtle gl-mt-5',
    });
    super('div', {
      classes: 'glp-create-related-issue-layer',
      children: container,
    });

    const link = IssueLink.parseLink(window.location.href);
    if (link) {
      const form = new CreateRelatedIssueModalContent(
        link,
        this.hide.bind(this)
      );

      container.append(
        new CreateRelatedIssueModalHeader(() => {
          this.hide();
          form.reset();
        }).getElement(),
        form.getElement()
      );
    }
  }

  init() {
    this.mount(document.body);
  }

  show() {
    this.element.classList.add(this.visibleClassName);
  }

  hide() {
    this.element.classList.remove(this.visibleClassName);
  }
}
