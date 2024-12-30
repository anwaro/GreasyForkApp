export function camelizeKeys<R, T = unknown>(data: T): R {
  if (!data || ['string', 'number', 'boolean'].includes(typeof data)) {
    return data as unknown as R;
  }
  if (Array.isArray(data)) {
    return data.map(camelizeKeys) as R;
  }

  const camelize = (key: string) => {
    const _key = key.replace(/[-_\s]+(.)?/g, (_, chr) =>
      chr ? chr.toUpperCase() : ''
    );
    return _key.substring(0, 1).toLowerCase() + _key.substring(1);
  };

  return Object.entries(data).reduce(
    (result, [key, value]) => ({
      ...result,
      [camelize(key)]: camelizeKeys(value),
    }),
    {}
  ) as R;
}
