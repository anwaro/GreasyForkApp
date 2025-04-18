import { LinkParser } from '../../helpers/LinkParser';
import { PreviewModal } from '../common/modal/PreviewModal';
import { EpicHeader } from './blocks/EpicHeading';
import { EpicLabels } from './blocks/EpicLabels';
import { EpicRelatedIssues } from './blocks/EpicRelatedIssues';
import { useFetchEpic } from './useFetchEpic';

export function EpicPreviewModal() {
  const { entityData, fetch, isLoading, isRefreshing, reset } = useFetchEpic();

  return (
    <PreviewModal
      validator={LinkParser.validateEpicLink}
      fetch={fetch}
      isError={!entityData}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      parser={LinkParser.parseEpicLink}
      reset={reset}
    >
      {entityData && (
        <>
          <EpicHeader
            epic={entityData.entity}
            onRefresh={() => fetch(entityData.link, true)}
          />
          <EpicLabels
            epic={entityData.entity}
            link={entityData.link}
            refresh={() => fetch(entityData.link, true)}
          />
          <EpicRelatedIssues epic={entityData.entity} />
        </>
      )}
    </PreviewModal>
  );
}
