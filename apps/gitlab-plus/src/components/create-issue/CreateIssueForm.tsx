import { GitlabEpicLink, GitlabIssueLink } from '../../helpers/LinkParser';
import { FormField } from '../common/form/FormField';
import { FormRow } from '../common/form/FormRow';
import { GitlabButton } from '../common/GitlabButton';
import { AssigneesField } from './fields/AssigneesField';
import { ButtonField } from './fields/ButtonField';
import { IterationField } from './fields/IterationField';
import { LabelField } from './fields/LabelsField';
import { MilestoneField } from './fields/MilestoneField';
import { ProjectField } from './fields/ProjectField';
import { RelationField } from './fields/RelationField';
import { TitleField } from './fields/TitleField';
import { useCreateIssueForm } from './useCreateIssueForm';

type Props = {
  isVisible: boolean;
  link: GitlabEpicLink | GitlabIssueLink;
  onClose: () => void;
};

export function CreateIssueForm({ isVisible, link, onClose }: Props) {
  const {
    actions,
    error,
    form,
    isLoading,
    message,
    projectPath,
    showRelations,
  } = useCreateIssueForm({ isVisible, link, onClose });

  return (
    <form class={'crud-body add-tree-form gl-mx-5 gl-my-4 gl-rounded-b-form'}>
      <FormField
        error={form.title.errors}
        hint={'Maximum of 255 characters'}
        title={'Title'}
      >
        <div className={'gl-flex gl-gap-1'}>
          <TitleField
            error={form.title.errors}
            onChange={form.title.onChange}
            value={form.title.value}
          />
          <GitlabButton
            icon={'title'}
            onClick={form.title.copy}
            title={'Copy from parent title'}
          />
        </div>
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
            projectPath={projectPath}
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
            projectPath={projectPath}
            setValue={form.milestone.onChange}
            value={form.milestone.value}
          />
        </FormField>
      </FormRow>
      <FormField error={form.labels.errors} title={'Labels'}>
        <LabelField
          copyLabels={form.labels.copy}
          copyLoading={form.labels.copyLoading}
          projectPath={projectPath}
          setValue={form.labels.onChange}
          value={form.labels.value}
        />
      </FormField>
      {showRelations && (
        <FormField error={form.relation.errors} title={'New issue'}>
          <RelationField
            setValue={form.relation.onChange}
            value={form.relation.value}
          />
        </FormField>
      )}
      <FormField error={error} hint={message} title={''}>
        <FormRow>
          <ButtonField
            isLoading={isLoading}
            create={actions.submit}
            reset={actions.reset}
          />
        </FormRow>
      </FormField>
    </form>
  );
}
