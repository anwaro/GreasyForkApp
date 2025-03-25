import { useState } from 'preact/hooks';

type EntityData<Entity, EntityLink> = {
  entity: Entity;
  link: EntityLink;
};

export function useFetchEntity<Entity, EntityLink>(
  fetcher: (link: EntityLink, force: boolean) => Promise<Entity>
) {
  const [entityData, setEntityData] = useState<EntityData<
    Entity,
    EntityLink
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetch = async (link: EntityLink, force = false) => {
    if (force) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    const entity = await fetcher(link, force);
    setEntityData({ entity, link });
    setIsRefreshing(false);
    setIsLoading(false);
  };

  const reset = () => {
    setEntityData(null);
    setIsRefreshing(false);
    setIsLoading(false);
  };

  return {
    entityData,
    fetch,
    isLoading,
    isRefreshing,
    onRefresh: async () => {
      if (entityData) {
        await fetch(entityData.link, true);
      }
    },
    reset,
  };
}
