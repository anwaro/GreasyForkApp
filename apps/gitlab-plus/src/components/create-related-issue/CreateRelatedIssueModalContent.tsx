import { IssueLinkType } from '../../helpers/IssueLink';
import { FormField } from '../common/form/FormField';
import { FormRow } from '../common/form/FormRow';
import { AssigneesField } from './fields/AssigneesField';
import { ButtonField } from './fields/ButtonField';
import { IterationField } from './fields/IterationField';
import { LabelField } from './fields/LabelsField';
import { MilestoneField } from './fields/MilestoneField';
import { ProjectField } from './fields/ProjectField';
import { RelationField } from './fields/RelationField';
import { TitleField } from './fields/TitleField';
import { useCreateRelatedIssueForm } from './useCreateRelatedIssueForm';

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
