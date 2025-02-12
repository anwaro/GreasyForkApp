import { GitlabEpicLink } from '../../helpers/LinkParser';
import { EpicProvider } from '../../providers/EpicProvider';
import { useFetchEntity } from '../common/useFetchEntity';

export function useFetchEpic() {
  return useFetchEntity(async (link: GitlabEpicLink, force = false) => {
    const response = await new EpicProvider(force).getEpic(
      link.workspacePath,
      link.epic
    );
    return response.data.workspace.workItem;
  });
}
