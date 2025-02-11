import { LinkParser } from '../../helpers/LinkParser';
import { PreviewModal } from '../common/PreviewModal';
// import { EpicAssignee } from './blocks/EpicAssignee';
import { EpicHeader } from './blocks/EpicHeading';
// import { EpicIteration } from './blocks/EpicIteration';
import { EpicLabels } from './blocks/EpicLabels';
// import { EpicMergeRequests } from './blocks/EpicMergeRequests';
// import { EpicMilestone } from './blocks/EpicMilestone';
import { EpicRelatedIssues } from './blocks/EpicRelatedIssues';
import { useFetchEpic } from './useFetchEpic';

export function EpicPreviewModal() {
  const { epic, fetch, reset } = useFetchEpic();

  return (
    <PreviewModal
      validator={LinkParser.validateEpicLink}
      fetch={fetch}
      isError={!epic}
      isLoading={epic.isLoading}
      parser={LinkParser.parseEpicLink}
      reset={reset}
    >
      {epic.epic && (
        <>
          <EpicHeader epic={epic.epic} />
          {/*<EpicAssignee epic={epic.epic} />*/}
          <EpicLabels epic={epic.epic} />
          {/*<EpicMilestone epic={epic.epic} />*/}
          {/*<EpicIteration epic={epic.epic} />*/}
          {/*<EpicMergeRequests epic={epic.epic} />*/}
          <EpicRelatedIssues epic={epic.epic} />
        </>
      )}
    </PreviewModal>
  );
}
