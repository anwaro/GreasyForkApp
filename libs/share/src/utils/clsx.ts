export function clsx(...args: unknown[]): string {
  return args
    .map((item) => {
      if (!item) {
        return '';
      }
      if (typeof item === 'string') {
        return item;
      }
      if (Array.isArray(item)) {
        return clsx(...item);
      }
      if (typeof item === 'object') {
        return clsx(
          Object.entries(item)
            .filter(([key, value]) => value)
            .map(([key]) => key)
        );
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
