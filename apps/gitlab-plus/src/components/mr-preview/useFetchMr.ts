import { GitlabMrLink } from '../../helpers/LinkParser';
import { MrProvider } from '../../providers/MrProvider';
import { useFetchEntity } from '../common/modal/useFetchEntity';

export function useFetchMr() {
  return useFetchEntity(async (link: GitlabMrLink, force = false) => {
    const response = await new MrProvider(force).getMr(
      link.projectPath,
      link.mr
    );

    return response.data.workspace.mergeRequest;
  });
}
