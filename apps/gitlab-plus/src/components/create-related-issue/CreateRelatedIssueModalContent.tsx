import { Component } from '@ui/Component';
import { Dom, HtmlData } from '@ui/Dom';

import { IssueLink, IssueLinkType } from '../../helpers/IssueLink';
import { IssueProvider } from '../../providers/IssueProvider';
import { CreateIssueInput, IssueRelation } from '../../types/Issue';
import { FormField } from '../common/form/FormField';
import { FormRow } from '../common/form/FormRow';
import { _AssigneesField, AssigneesField } from './fields/AssigneesField';
import { ButtonField } from './fields/ButtonField';
import { _IterationField, IterationField } from './fields/IterationField';
import { _LabelField, LabelField } from './fields/LabelsField';
import { FormMilestone, MilestoneField } from './fields/MilestoneField';
import { FormProject, ProjectField } from './fields/ProjectField';
import { FormRelation, RelationField } from './fields/RelationField';
import { TitleField } from './fields/TitleField';
import { useCreateRelatedIssueForm } from './useCreateRelatedIssueForm';

export class _CreateRelatedIssueModalContent extends Component<'form'> {
  private assignees: _AssigneesField;
  private issueProvider = new IssueProvider();
  private iteration: _IterationField;
  private labels: _LabelField;
  private milestone: FormMilestone;
  private project: FormProject;
  private relation: FormRelation;

  constructor(private link: IssueLinkType, private onClose: () => void) {
    super('form', {
      classes: 'crud-body add-tree-form gl-mx-5 gl-my-4 gl-rounded-b-form',
    });

    this.project = new FormProject(this.link);
    this.labels = new _LabelField(this.link);
    this.milestone = new FormMilestone(this.link);
    this.iteration = new _IterationField(this.link);
    this.assignees = new _AssigneesField(this.link);
    this.relation = new FormRelation();

    this.element.append(
      this.row([this.project, this.milestone]),
      this.row([this.iteration, this.assignees]),
      this.row(this.labels),
      this.row(this.relation),
      Dom.create({
        tag: 'button',
        attrs: {
          type: 'button',
        },
        children: {
          tag: 'span',
          children: 'Add',
          classes: 'gl-button-text',
        },
        classes: 'btn btn-confirm btn-sm gl-button',
        events: {
          click: this.createIssue.bind(this),
        },
      })
    );
  }

  async createIssue() {
    const data = this.getFormValue();
    const link = IssueLink.parseLink(window.location.href);
    if (!data || !link) {
      return;
    }
    const response = await this.issueProvider.createIssue(data);
    this.persistRecently();
    if (this.relation.value) {
      await this.issueProvider.createIssueRelation({
        targetIssueIid: link.issue,
        issueId: response.data.createIssuable.issuable.iid,
        linkType: this.relation.value as IssueRelation,
        projectId: response.data.createIssuable.issuable.projectId,
        targetProjectId: link.projectPath.replace(/\//g, '%2F'),
      });
    }
    this.onClose();
    this.reset();
  }

  getFormValue() {
    const [project] = this.project.getValue();
    if (!project) {
      return;
    }

    const data: CreateIssueInput = {
      projectPath: project.fullPath,
      title: 'this.title.value',
    };

    const [milestone] = this.milestone.getValue();
    if (milestone) {
      data['milestoneId'] = milestone.id;
    }

    const [iteration] = this.iteration.getValue();
    if (iteration) {
      data['iterationId'] = iteration.id;
      data['iterationCadenceId'] = iteration.iterationCadence.id;
    }

    const assignees = this.assignees.getValue();
    if (assignees) {
      data['assigneeIds'] = assignees.map((a) => a.id);
    }
    const labels = this.labels.getValue();
    data['labelIds'] = labels.map((label) => label.id);

    return data;
  }

  reset() {
    this.element.reset();
    this.relation.reset();
    this.project.reset();
    this.milestone.reset();
    this.iteration.reset();
    this.assignees.reset();
    this.labels.reset();
  }

  row(items: HtmlData<'div'>['children']) {
    return Dom.create({
      tag: 'div',
      children: items,
      classes: 'gl-flex gl-gap-x-3',
    });
  }

  private persistRecently() {
    this.project.persistRecent();
    this.milestone.persistRecent();
    this.iteration.persistRecent();
    this.assignees.persistRecent();
    this.labels.persistRecent();
  }
}

type Props = {
  isVisible: boolean;
  link: IssueLinkType;
  onClose: () => void;
};

export function CreateRelatedIssueModalContent({
  isVisible,
  link,
  onClose,
}: Props) {
  const { actions, form, isLoading } = useCreateRelatedIssueForm(
    link,
    onClose,
    isVisible
  );

  return (
    <form class={'crud-body add-tree-form gl-mx-5 gl-my-4 gl-rounded-b-form'}>
      <FormField
        error={form.title.errors}
        hint={'Maximum of 255 characters'}
        title={'Title'}
      >
        <TitleField
          error={form.title.errors}
          onChange={form.title.onChange}
          value={form.title.value}
        />
      </FormField>
      <FormRow>
        <FormField error={form.project.errors} title={'Project'}>
          <ProjectField
            link={link}
            setValue={form.project.onChange}
            value={form.project.value}
          />
        </FormField>
        <FormField error={form.assignees.errors} title={'Assignees'}>
          <AssigneesField
            link={link}
            setValue={form.assignees.onChange}
            value={form.assignees.value}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField error={form.iteration.errors} title={'Iteration'}>
          <IterationField
            link={link}
            setValue={form.iteration.onChange}
            value={form.iteration.value}
          />
        </FormField>
        <FormField error={form.milestone.errors} title={'Milestone'}>
          <MilestoneField
            link={link}
            setValue={form.milestone.onChange}
            value={form.milestone.value}
          />
        </FormField>
      </FormRow>
      <FormField error={form.labels.errors} title={'Labels'}>
        <LabelField
          link={link}
          setValue={form.labels.onChange}
          value={form.labels.value}
        />
      </FormField>
      <FormField error={form.relation.errors} title={'New issue'}>
        <RelationField
          setValue={form.relation.onChange}
          value={form.relation.value}
        />
      </FormField>
      <FormRow>
        <ButtonField
          isLoading={isLoading}
          create={actions.submit}
          reset={actions.reset}
        />
      </FormRow>
    </form>
  );
}
