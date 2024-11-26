export function debounce<T extends unknown[]>(
  callback: (...args: T) => void,
  wait: number = 300
) {
  let timer: number;

  return (...args: T) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), wait);
  };
}
