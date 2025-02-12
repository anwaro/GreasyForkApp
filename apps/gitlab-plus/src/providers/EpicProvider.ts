import { EpicResponse, EpicSetLabelsInput } from '../types/Epic';
import { GitlabProvider } from './GitlabProvider';
import { epicQuery, epicSetLabelsMutation } from './query/epic';

export class EpicProvider extends GitlabProvider {
  async getEpic(workspacePath: string, epicId: string) {
    return this.queryCached<EpicResponse>(
      `epic-${workspacePath}-${epicId}`,
      epicQuery,
      {
        iid: epicId,
        cursor: '',
        fullPath: workspacePath,
        pageSize: 50,
      },
      2
    );
  }

  async updateEpicLabels(
    id: string,
    addLabelIds: string[],
    removeLabelIds: string[]
  ) {
    return await this.query(epicSetLabelsMutation, {
      input: {
        id,
        labelsWidget: {
          addLabelIds,
          removeLabelIds,
        },
      },
    } satisfies EpicSetLabelsInput);
  }
}
