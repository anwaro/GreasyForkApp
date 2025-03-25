import { GitlabMrLink, LinkParser } from '../../helpers/LinkParser';
import { PreviewModal } from '../common/modal/PreviewModal';
import { MrApprovedBy } from './blocks/MrApprovedBy';
import { MrAssignee } from './blocks/MrAssignee';
import { MrBranch } from './blocks/MrBranch';
import { MrDiff } from './blocks/MrDiff';
import { MrDiscussion } from './blocks/MrDiscussion';
import { MrHeader } from './blocks/MrHeading';
import { MrLabels } from './blocks/MrLabels';
import { useFetchMr } from './useFetchMr';

export function MrPreviewModal() {
  const { entityData, fetch, isLoading, isRefreshing, reset } = useFetchMr();

  return (
    <PreviewModal<GitlabMrLink>
      validator={LinkParser.validateMrLink}
      fetch={fetch}
      isError={!entityData}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      parser={LinkParser.parseMrLink}
      reset={reset}
    >
      {entityData && (
        <>
          <MrHeader
            mr={entityData.entity}
            onRefresh={() => fetch(entityData.link, true)}
          />
          <MrBranch mr={entityData.entity} />
          <MrAssignee mr={entityData.entity} />
          <MrApprovedBy mr={entityData.entity} />
          <MrLabels mr={entityData.entity} />
          <MrDiff mr={entityData.entity} />
          <MrDiscussion mr={entityData.entity} />
        </>
      )}
    </PreviewModal>
  );
}
