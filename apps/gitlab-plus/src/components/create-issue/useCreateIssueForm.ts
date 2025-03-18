import { useEffect, useState } from 'preact/hooks';

import { LabelHelper } from '../../helpers/LabelHelper';
import {
  GitlabEpicLink,
  GitlabIssueLink,
  LinkParser,
} from '../../helpers/LinkParser';
import { EpicProvider } from '../../providers/EpicProvider';
import { IssueProvider } from '../../providers/IssueProvider';
import { RecentlyProvider } from '../../providers/RecentlyProvider';
import { Epic } from '../../types/Epic';
import {
  CreatedIssue,
  CreateIssueInput,
  Issue,
  IssueRelation,
} from '../../types/Issue';
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

type Props = {
  isVisible: boolean;
  link: GitlabEpicLink | GitlabIssueLink;
  onClose: () => void;
};

export function useCreateIssueForm({ isVisible, link, onClose }: Props) {
  const [values, setValues] = useState<FormFields>(initialState());
  const [errors, setErrors] = useState<FormErrors>(initialError());
  const [parentIssue, setParentIssue] = useState<Issue | null>(null);
  const [parentEpic, setParentEpic] = useState<Epic | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setIsLoading(false);
    setValues(initialState());
    setErrors(initialError());
    setMessage('');
    setError('');
    setParentIssue(null);
    setParentEpic(null);
  };

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

  const persistRecently = () => {
    Object.entries({
      assignees: values.assignees,
      iterations: values.iteration ? [values.iteration] : [],
      labels: values.labels,
      milestones: values.milestone ? [values.milestone] : [],
      projects: values.project ? [values.project] : [],
    }).map(([key, values]) => {
      new RecentlyProvider(key).add(...values);
    });
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

  const createRelation = async (
    issue: CreatedIssue,
    targetIssue: Issue,
    relation: IssueRelation
  ) => {
    await new IssueProvider().createIssueRelation({
      targetIssueIid: targetIssue.iid,
      issueId: issue.iid,
      linkType: relation,
      projectId: issue.projectId,
      targetProjectId: targetIssue.projectId,
    });
  };

  const setIssueEpic = async (issue: CreatedIssue, epic: Epic) => {
    await new IssueProvider().issueSetEpic(issue.id, epic.id);
  };

  const submit = async () => {
    if (!validate()) {
      return;
    }
    setIsLoading(true);
    try {
      setMessage('Creating issue...');
      const payload = createPayload();
      const response = await createIssue(payload);
      persistRecently();

      if (values.relation && parentIssue) {
        setMessage('Creating relation to parent issue...');
        await createRelation(
          response.data.createIssue.issue,
          parentIssue,
          values.relation
        );
      }

      if (parentEpic) {
        setMessage('Linking to epic...');
        await setIssueEpic(response.data.createIssue.issue, parentEpic);
      }

      setMessage('Issue was created');
      window.setTimeout(() => onClose(), 2000);
    } catch (e) {
      setMessage('');
      setError((e as Error).message);
    }
    setIsLoading(false);
  };

  const fetchParent = async () => {
    if (LinkParser.isIssueLink(link)) {
      const issue = await new IssueProvider().getIssue(
        link.projectPath,
        link.issue
      );
      setParentIssue(issue.data.project.issue);
    }
    if (LinkParser.isEpicLink(link)) {
      const epic = await new EpicProvider().getEpic(
        link.workspacePath,
        link.epic
      );
      setParentEpic(epic.data.workspace.workItem);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchParent();
    } else {
      reset();
    }
  }, [isVisible]);

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
        copy: () => {
          if (parentEpic) {
            setValues({
              ...values,
              labels: LabelHelper.getLabelsFromWidgets(parentEpic.widgets),
            });
          }
          if (parentIssue) {
            setValues({ ...values, labels: parentIssue.labels.nodes });
          }
        },
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
        copy: () => {
          const parentTitle = parentIssue?.title || parentEpic?.title;

          if (parentTitle) {
            setValues({
              ...values,
              title: parentTitle,
            });
          }
        },
        errors: errors.title,
        onChange: (title: string) => setValues({ ...values, title }),
        value: values.title,
      },
    },
    isLoading,
    message,
    parentEpic,
    parentIssue,
    projectPath: values.project?.fullPath,
  };
}
