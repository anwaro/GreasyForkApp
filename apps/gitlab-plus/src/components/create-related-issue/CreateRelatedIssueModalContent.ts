import { IssueLink, IssueLinkType } from '../../helpers/IssueLink';
import {
  CreateIssueInput,
  CreateIssueLinkInput,
  IssueProvider,
} from '../../providers/IssueProvider';
import FormTitle from './form/FormTitle';
import FormProject from './form/FormProject';
import FormLabel from './form/FormLabels';
import FormMilestone from './form/FormMilestone';
import FormIteration from './form/FormIteration';
import FormAssignees from './form/FormAssignees';
import FormRelation from './form/FormRelation';
import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

export default class CreateRelatedIssueModalContent extends Component<'form'> {
  private issueProvider = new IssueProvider();
  private title: FormTitle;
  private project: FormProject;
  private labels: FormLabel;
  private milestone: FormMilestone;
  private iteration: FormIteration;
  private assignees: FormAssignees;
  private relation: FormRelation;

  constructor(private link: IssueLinkType, private onClose: () => void) {
    super('form', {
      classes: 'crud-body add-tree-form gl-mx-5 gl-my-4 gl-rounded-b-form',
    });

    this.title = new FormTitle();
    this.project = new FormProject(this.link);
    this.labels = new FormLabel(this.link);
    this.milestone = new FormMilestone(this.link);
    this.iteration = new FormIteration(this.link);
    this.assignees = new FormAssignees(this.link);
    this.relation = new FormRelation();

    this.element.append(
      this.title.getElement(),
      this.row(this.project.getElement(), this.milestone.getElement()),
      this.row(this.iteration.getElement(), this.assignees.getElement()),
      this.row(this.labels.getElement()),
      this.row(this.relation.getElement()),
      Dom.create({
        tag: 'button',
        classes: 'btn btn-confirm btn-sm gl-button',
        attrs: {
          type: 'button',
        },
        events: {
          click: this.createIssue.bind(this),
        },
        children: {
          tag: 'span',
          classes: 'gl-button-text',
          children: 'Add',
        },
      })
    );
  }

  row(...items: HTMLElement[]) {
    return Dom.create({
      tag: 'div',
      classes: 'gl-flex gl-gap-x-3',
      children: items,
    });
  }

  reset() {
    this.element.reset();
    this.title.reset();
    this.relation.reset();
    this.project.reset();
    this.milestone.reset();
    this.iteration.reset();
    this.assignees.reset();
    this.labels.reset();
  }

  async createIssue() {
    const data = this.getFormValue();
    const link = IssueLink.parseLink(window.location.href);
    if (!data || !link) {
      return;
    }
    const response = await this.issueProvider.createIssue(data);
    if (this.relation.value) {
      await this.issueProvider.createIssueRelation({
        issueId: response.data.createIssuable.issuable.iid,
        projectId: response.data.createIssuable.issuable.projectId,
        targetProjectId: link.projectPath.replace(/\//g, '%2F'),
        targetIssueIid: link.issue,
        linkType: this.relation.value as CreateIssueLinkInput['linkType'],
      });
    }
    this.onClose();
    this.reset();
  }

  getFormValue() {
    const project = this.project.getValue();
    if (!project) {
      return;
    }

    const data: CreateIssueInput = {
      title: this.title.value,
      projectPath: project.fullPath,
    };

    const milestone = this.milestone.getValue();
    if (milestone) {
      data['milestoneId'] = milestone.id;
    }

    const iteration = this.iteration.getValue();
    if (iteration) {
      data['iterationId'] = iteration.id;
      data['iterationCadenceId'] = iteration.iterationCadence.id;
    }

    const assignees = this.assignees.getValue();
    if (assignees) {
      data['assigneeIds'] = [assignees.id];
    }
    const labels = this.labels.getValue();
    data['labelIds'] = labels.map((label) => label.id);

    return data;
  }
}
