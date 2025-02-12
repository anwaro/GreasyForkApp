import { GitlabIssueLink } from '../../helpers/LinkParser';
import { IssueProvider } from '../../providers/IssueProvider';
import { useFetchEntity } from '../common/useFetchEntity';

export function useFetchIssue() {
  return useFetchEntity(async (link: GitlabIssueLink, force = false) => {
    const response = await new IssueProvider(force).getIssue(
      link.projectPath,
      link.issue
    );

    console.log(response);
    return response.data.project.issue;
  });
}
