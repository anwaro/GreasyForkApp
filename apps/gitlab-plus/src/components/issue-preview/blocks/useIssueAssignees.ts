import { useCallback, useState } from 'preact/hooks';

import { GitlabIssueLink } from '../../../helpers/LinkParser';
import { IssueProvider } from '../../../providers/IssueProvider';
import { UsersProvider } from '../../../providers/UsersProvider';
import { Issue } from '../../../types/Issue';

type Props = {
  issue: Issue;
  link: GitlabIssueLink;
  refetch?: () => Promise<void>;
};

export function useIssueAssignees({ issue, link, refetch }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const onUpdate = useCallback(async () => {
    setIsLoading(true);

    const user = await new UsersProvider().getCurrentUser();

    await new IssueProvider().issueSetAssignees({
      iid: issue.iid,
      assigneeUsernames: [user.data.currentUser.username],
      projectPath: link.projectPath,
    });

    setIsLoading(false);
    refetch?.();
  }, []);

  return {
    isLoading,
    onUpdate,
  };
}
