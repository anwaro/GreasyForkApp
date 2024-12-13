import { useEffect, useState } from 'preact/hooks';

import { IssueLinkType } from '../../helpers/IssueLink';
import { IssueProvider } from '../../providers/IssueProvider';
import { CreateIssueInput, Issuable, IssueRelation } from '../../types/Issue';
import { Label } from '../../types/Label';
import { Milestone } from '../../types/Milestone';
import { Project } from '../../types/Project';
import { User } from '../../types/User';
import { IterationNamed } from './fields/IterationField';

export type FormFields = {
  assignees: User[];
  iteration: IterationNamed | null;
  labels: Label[];
  milestone: Milestone | null;
  project: null | Project;
  relation: IssueRelation | null;
  title: string;
};

const initialState = (): FormFields => ({
  assignees: [],
  iteration: null,
  labels: [],
  milestone: null,
  project: null,
  relation: null,
  title: '',
});

type FormErrors = Record<keyof FormFields, string | undefined>;
const initialError = (): FormErrors => ({
  assignees: undefined,
  iteration: undefined,
  labels: undefined,
  milestone: undefined,
  project: undefined,
  relation: undefined,
  title: undefined,
});

export function useCreateRelatedIssueForm(
  link: IssueLinkType,
  onClose: () => void,
  isVisible: boolean
) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [values, setValues] = useState<FormFields>(initialState());
  const [errors, setErrors] = useState<FormErrors>(initialError());

  const reset = () => {
    setIsLoading(false);
    setValues(initialState());
    setErrors(initialError());
  };

  useEffect(() => {
    if (!isVisible) {
      reset();
    }
  }, [isVisible]);

  const createPayload = () => {
    const data: CreateIssueInput = {
      projectPath: values.project!.fullPath,
      title: values.title,
    };

    if (values.milestone) {
      data['milestoneId'] = values.milestone.id;
    }

    if (values.iteration) {
      data['iterationId'] = values.iteration.id;
      data['iterationCadenceId'] = values.iteration.iterationCadence.id;
    }

    if (values.assignees) {
      data['assigneeIds'] = values.assignees.map((a) => a.id);
    }

    data['labelIds'] = values.labels.map((label) => label.id);

    return data;
  };

  const validate = () => {
    let isValid = true;
    const errors: Partial<FormErrors> = {};
    if (values.title.length < 1) {
      errors.title = 'Title is required';
      isValid = false;
    } else if (values.title.length > 255) {
      errors.title = 'Title is too long';
      isValid = false;
    }
    if (!values.project) {
      errors.project = 'Project must be selected';
      isValid = false;
    }
    setErrors((prev) => ({ ...prev, ...errors }));

    return isValid;
  };

  const createIssue = async (payload: CreateIssueInput) => {
    return await new IssueProvider().createIssue(payload);
  };

  const createRelation = async (issue: Issuable, relation: IssueRelation) => {
    await new IssueProvider().createIssueRelation({
      targetIssueIid: link.issue,
      issueId: issue.iid,
      linkType: relation,
      projectId: issue.projectId,
      targetProjectId: link.projectPath.replace(/\//g, '%2F'),
    });
  };

  const submit = async () => {
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      return;
    }
    const payload = createPayload();
    const response = await createIssue(payload);
    if (values.relation) {
      await createRelation(
        response.data.createIssuable.issuable,
        values.relation
      );
    }
    setIsLoading(false);
    setMessage('Issue was created');
    window.setTimeout(() => onClose(), 3000);
  };

  return {
    actions: {
      reset,
      submit,
    },
    error,
    form: {
      assignees: {
        errors: errors.assignees,
        onChange: (assignees: User[]) => setValues({ ...values, assignees }),
        value: values.assignees,
      },
      iteration: {
        errors: errors.iteration,
        onChange: ([iteration]: IterationNamed[]) =>
          setValues({ ...values, iteration: iteration ?? null }),
        value: values.iteration ? [values.iteration] : [],
      },
      labels: {
        errors: errors.labels,
        onChange: (labels: Label[]) => setValues({ ...values, labels }),
        value: values.labels,
      },
      milestone: {
        errors: errors.milestone,
        onChange: ([milestone]: Milestone[]) =>
          setValues({ ...values, milestone: milestone ?? null }),
        value: values.milestone ? [values.milestone] : [],
      },
      project: {
        errors: errors.project,
        onChange: ([project]: Project[]) =>
          setValues({ ...values, project: project ?? null }),
        value: values.project ? [values.project] : [],
      },
      relation: {
        errors: errors.relation,
        onChange: (relation: IssueRelation | null) =>
          setValues({ ...values, relation }),
        value: values.relation,
      },
      title: {
        errors: errors.title,
        onChange: (title: string) => setValues({ ...values, title }),
        value: values.title,
      },
    },
    isLoading,
    message,
  };
}
