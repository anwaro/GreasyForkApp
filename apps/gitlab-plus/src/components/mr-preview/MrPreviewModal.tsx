import { GitlabMrLink, LinkParser } from '../../helpers/LinkParser';
import { PreviewModal } from '../common/PreviewModal';
import { MrApprovedBy } from './blocks/MrApprovedBy';
import { MrAssignee } from './blocks/MrAssignee';
import { MrBranch } from './blocks/MrBranch';
import { MrDiff } from './blocks/MrDiff';
import { MrDiscussion } from './blocks/MrDiscussion';
import { MrHeader } from './blocks/MrHeading';
import { MrLabels } from './blocks/MrLabels';
import { useFetchMr } from './useFetchMr';

export function MrPreviewModal() {
  const { fetch, mr, reset } = useFetchMr();

  return (
    <PreviewModal<GitlabMrLink>
      validator={LinkParser.validateMrLink}
      fetch={fetch}
      isError={!mr}
      isLoading={mr.isLoading}
      parser={LinkParser.parseMrLink}
      reset={reset}
    >
      {mr.mr && (
        <>
          <MrHeader mr={mr.mr} />
          <MrBranch mr={mr.mr} />
          <MrAssignee mr={mr.mr} />
          <MrApprovedBy mr={mr.mr} />
          <MrLabels mr={mr.mr} />
          <MrDiff mr={mr.mr} />
          <MrDiscussion mr={mr.mr} />
        </>
      )}
    </PreviewModal>
  );
}
