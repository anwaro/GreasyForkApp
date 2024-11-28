import { Service } from '../types/Service';
import { CreateRelatedIssueModal } from '../components/CreateRelatedIssueModal';
import { CreateButton } from '../components/create-related-issue/CreateButton';

export class CreateRelatedIssue implements Service {
  private modal = new CreateRelatedIssueModal();
  private addButton = new CreateButton();

  public init() {
    this.modal.init();
    this.addButton.event('click', this.modal.show.bind(this.modal));

    this.mountButton();
  }

  mountButton() {
    setTimeout(this.addButton.init.bind(this.addButton), 1000);
    setTimeout(this.addButton.init.bind(this.addButton), 3000);
  }
}
